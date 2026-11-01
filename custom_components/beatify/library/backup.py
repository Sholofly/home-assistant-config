"""Backup / restore for the enriched library pool.

The pool is the single expensive artifact this integration produces: hours of
rate-limited MusicBrainz lookups and Deezer verification. Until now it was
protected only by whatever backs up ``/config`` — and a user reinstalling the
integration, moving to a new HA host, or clearing ``/config/beatify`` lost all
of it with no in-app way to save or recover it first.

This module holds the PURE logic (bundle assembly, validation, merging) so it
is unit-testable without Home Assistant; the HTTP plumbing lives in
``server/library_views.py``.

Design notes
------------
* A backup bundle carries the pool AND the library settings, so restoring on a
  fresh install reproduces the user's configuration, not just their data.
* Restores support two modes. ``replace`` is a true restore. ``merge`` unions
  two pools by track URI and is what makes the feature more than insurance:
  a user can scan on one machine, back up, and fold the result into another
  pool — or recover a partially-corrupted pool without losing new work.
* Percentiles are pool-relative, so any merge MUST be re-finalized
  (``finalize_pool``) rather than carrying stale percentile values across.
* URIs are only valid for the Music Assistant server that produced them, so a
  bundle records its source config entry; restoring elsewhere is allowed (the
  name-based playback fallback usually still resolves tracks) but reported.
"""

from __future__ import annotations

import time
from typing import Any

BACKUP_SCHEMA = 1

# Guard rails for untrusted uploads. A pool is large but bounded; anything
# beyond these limits is either corrupt or hostile, and we refuse it before
# spending memory on it.
MAX_SONGS = 2_000_000
_REQUIRED_ENTRY_KEYS = ("uri_ma_library",)


def build_backup_bundle(
    pool: dict[str, Any],
    settings: dict[str, Any] | None,
    *,
    provider_version: str,
    created_at: int | None = None,
) -> dict[str, Any]:
    """Assemble a backup bundle from a pool and the library settings. Pure."""
    return {
        "_backup_schema": BACKUP_SCHEMA,
        "_created_at": int(created_at if created_at is not None else time.time()),
        "_provider_version": provider_version,
        "pool": pool,
        "settings": settings or {},
    }


def validate_backup_bundle(data: Any) -> tuple[dict[str, Any] | None, str | None]:
    """Validate an uploaded bundle. Returns ``(bundle, error)``. Pure.

    Accepts both a full bundle and a BARE POOL: users who copied
    ``library_pool.json`` off disk by hand (the only option before this
    feature existed) should not be told their file is invalid.
    """
    if not isinstance(data, dict):
        return None, "Backup file is not a JSON object"

    # Bare pool -> wrap it so the rest of the pipeline sees one shape.
    if "pool" not in data and isinstance(data.get("songs"), list):
        data = {
            "_backup_schema": BACKUP_SCHEMA,
            "_created_at": int(data.get("_built_at") or 0),
            "_provider_version": str(data.get("_engine_version") or "unknown"),
            "pool": data,
            "settings": {},
        }

    schema = data.get("_backup_schema")
    if schema is not None and not isinstance(schema, int):
        return None, "Backup file has an invalid schema marker"
    if isinstance(schema, int) and schema > BACKUP_SCHEMA:
        return None, (
            f"Backup was written by a newer version (schema {schema}); "
            f"update the provider before restoring it"
        )

    pool = data.get("pool")
    if not isinstance(pool, dict):
        return None, "Backup contains no pool"
    songs = pool.get("songs")
    if not isinstance(songs, list):
        return None, "Backup pool contains no song list"
    if len(songs) > MAX_SONGS:
        return None, f"Backup pool is implausibly large ({len(songs)} songs)"

    usable = 0
    for entry in songs:
        if not isinstance(entry, dict):
            return None, "Backup pool contains a malformed song entry"
        if all(entry.get(k) for k in _REQUIRED_ENTRY_KEYS):
            usable += 1
    if songs and usable == 0:
        return None, "No song in the backup has a library URI — wrong file?"

    settings = data.get("settings")
    if settings is not None and not isinstance(settings, dict):
        return None, "Backup contains invalid settings"

    return data, None


def _entry_rank(entry: dict[str, Any]) -> tuple[int, int, int, int]:
    """Quality ranking used to pick a winner when both pools have a URI.

    Prefers, in order: a more trusted year, having popularity data, having
    genres, and a higher genre-check version. This means a merge can only
    improve an entry — never trade a MusicBrainz-verified year for a tag year
    just because the other file happened to be newer.
    """
    try:
        conf = int(entry.get("year_confidence") or 0)
    except (TypeError, ValueError):
        conf = 0
    has_pop = 1 if entry.get("global_score") is not None else 0
    has_genres = 1 if entry.get("genres") else 0
    flag = entry.get("genres_checked")
    if flag is True:
        genre_v = 1
    else:
        try:
            genre_v = int(flag or 0)
        except (TypeError, ValueError):
            genre_v = 0
    return (conf, has_pop, has_genres, genre_v)


def merge_pool_entries(
    current: dict[str, Any] | None,
    incoming: dict[str, Any],
) -> tuple[dict[str, dict[str, Any]], dict[str, int]]:
    """Union two pools by track URI, keeping the better entry. Pure.

    Returns ``(entries_by_uri, stats)``. The caller is responsible for running
    the result through ``finalize_pool`` — percentiles and familiarity bands
    are pool-relative and MUST be recomputed after any merge.
    """
    entries: dict[str, dict[str, Any]] = {}
    for song in (current or {}).get("songs", []) or []:
        uri = song.get("uri_ma_library")
        if uri:
            entries[uri] = song

    added = improved = kept = skipped = 0
    for song in incoming.get("songs", []) or []:
        if not isinstance(song, dict):
            skipped += 1
            continue
        uri = song.get("uri_ma_library")
        if not uri:
            skipped += 1
            continue
        existing = entries.get(uri)
        if existing is None:
            entries[uri] = song
            added += 1
        elif _entry_rank(song) > _entry_rank(existing):
            entries[uri] = song
            improved += 1
        else:
            kept += 1

    stats = {
        "added": added,
        "improved": improved,
        "kept": kept,
        "skipped": skipped,
        "total": len(entries),
    }
    return entries, stats


def describe_bundle(bundle: dict[str, Any]) -> dict[str, Any]:
    """Human-facing summary of a bundle, for the confirmation UI. Pure."""
    pool = bundle.get("pool") or {}
    songs = pool.get("songs") or []
    return {
        "songs": len(songs),
        "usable": pool.get("_usable_count"),
        "built_at": pool.get("_built_at"),
        "created_at": bundle.get("_created_at"),
        "provider_version": bundle.get("_provider_version"),
        "config_entry_id": pool.get("_config_entry_id"),
        "has_settings": bool(bundle.get("settings")),
    }
