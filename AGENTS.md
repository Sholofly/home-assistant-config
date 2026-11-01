# Home Assistant configuration (Sholofly)

Live Home Assistant config (root = git root). Prefer MCP/hab for runtime state; this repo is source of truth for defined behavior.

## Layout

- `configuration.yaml` only enables packages: every `integrations/*.yaml` is merged as a package. Add new config there, not in `configuration.yaml`.
- `integrations/`: one file per domain/feature; may contain helper domains too (`phone_noa.yaml` defines `input_text`/`input_datetime`).
- `entities/`, `customizations/globs/`, `blueprints/`: included by integrations via `!include_dir_*`.
- `automations.yaml`, `scripts.yaml`, `scenes.yaml`: root lists. Automation entries are UI-managed and have `id` values; keep all entries/IDs when hand-editing and reload with `automation.reload`.
- `lovelace/` is empty: dashboards are storage-mode (`.storage`); use HA/HAB tools, not YAML.
- `custom_components/beatify`: integration with frontend assets and Vitest tests. `custom_components/lghorizon` has codeowner `@Sholofly` and is maintained in this repo. Other entries are HACS-managed installs; leave them alone unless the task is specifically about them.
- `esphome/`: top-level device configs plus `common/`, `devices/`, `boards/`, `archive/`.

## Validation

- HA config (CI): `cp .stubs/fake_secrets.yaml secrets.yaml && hass -c . --script check_config`. `secrets.yaml` is gitignored; never commit the real one. MCP `validate_config`/`check_config_syntax` also work.
  - CI runs stable/beta/dev with `.stubs/fake_secrets.yaml`; remarklint and (disabled) yamllint are in `.github/workflows/homeassistant.yaml`.
- ESPHome (CI): copy stubs to `esphome/secrets.yaml` and `esphome/common/secrets.yaml`, then `for f in $(find ./esphome -maxdepth 1 -type f -name "*.yaml" -not -name "secrets.yaml"); do esphome config "$f"; done`.
  - Only max-depth-1 configs are checked in CI; manually run `esphome config` for any touched include.
- YAML style: `.yamllint`, `.prettierrc.yaml` (2 spaces, double quotes, 120 columns). Prettier auto-formats; it will not convert flow style or normalize booleans. Keep block style sequences/mappings and lowercase booleans. yamllint treats truthy values as errors.
- Beatify JS: `cd custom_components/beatify/www/js && npx vitest run`; single file: `npx vitest run __tests__/<name>.test.js`.
- Customization goes in `customizations/globs/` (merged named) via `integrations/homeassistant.yaml`.

## Gotchas

- `automations.yaml` uses modern trigger/condition/action keys, not legacy `trigger:`/`platform:` shorthand.
- Lovelace is storage-mode; dashboards are not editable as YAML.
- Recorder keeps 1 day (`purge_keep_days: 1`) and excludes button/update/event/etc. (see `integrations/recorder.yaml`); do not assume long history.
- ESPHome configs share via `!include` and `packages:`; new shared snippets belong in `esphome/common/`.
- Beatify serves both raw `.js` and `.min.js`/`.gz` assets; there is no minifier in repo. When editing frontend JS, update the corresponding `.min.js`/`.gz` where referenced by HTML.
- Never read/write `.storage`, `.cloud`, `deps`, DBs, logs; use MCP/hab.
- `secrets.yaml` and many runtime stores are gitignored (`zigbee2mqtt/`, `tts/`, `_backup/`).