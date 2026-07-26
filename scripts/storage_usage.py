#!/usr/bin/env python3
"""Collect storage usage breakdown by category for HA dashboard charts."""
import json
import os
import subprocess


def main():
    base = "/config"
    db = os.path.join(base, "home-assistant_v2.db")
    addons = "/addon_configs"
    frigate = os.path.join(addons, "ccab4aaf_frigate-fa")
    media = "/media"

    def du(path):
        try:
            r = subprocess.run(
                ["du", "-sb", path], capture_output=True, text=True, timeout=30
            )
            return int(r.stdout.split()[0])
        except Exception:
            return 0

    ha_total = du(base)
    db_size = os.path.getsize(db) if os.path.exists(db) else 0
    ha_config = ha_total - db_size
    frigate_size = du(frigate) if os.path.exists(frigate) else 0
    total_addons = du(addons)
    other_addons = total_addons - frigate_size
    media_size = du(media)

    try:
        r = subprocess.run(
            ["df", "-B1", "/"], capture_output=True, text=True, timeout=10
        )
        parts = r.stdout.strip().split("\n")[1].split()
        total = int(parts[1])
        used = int(parts[2])
        free = int(parts[3])
    except Exception:
        total = 0
        used = 0
        free = 0

    categorized = ha_config + db_size + total_addons + media_size
    other = max(0, used - categorized)

    output = {
        "ha_config_gb": round(ha_config / 1e9, 2),
        "database_gb": round(db_size / 1e9, 2),
        "frigate_gb": round(frigate_size / 1e9, 2),
        "other_addons_gb": round(other_addons / 1e9, 2),
        "media_gb": round(media_size / 1e9, 2),
        "other_gb": round(other / 1e9, 2),
        "free_gb": round(free / 1e9, 2),
        "state": round(categorized / 1e9, 2),
    }
    print(json.dumps(output))


if __name__ == "__main__":
    main()
