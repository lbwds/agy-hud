# Changelog

## 0.1.2

- Added activity-triggered quota refresh when a live status-line payload arrives while cached quota still looks untouched.
- Added a lightweight status-line refresh state file and debounce so full placeholder quota can recover without waiting for the normal stale-cache window.
- Added regression coverage for a new live conversation starting with a fresh `100% left` quota cache.
- Updated docs for activity-triggered background quota refresh behavior.

## 0.1.1

- Fixed status-line model display after switching to Claude models.
- Shortened Claude model labels to `Sonnet 4.6` and `Opus 4.6`.
- Added non-blocking background quota cache refresh for stale or missing cache files.
- Updated English and Chinese docs for the Node.js runtime requirement and background quota refresh behavior.

## 0.1.0

- Initial TypeScript/Node.js implementation of the Antigravity CLI status-line HUD.
- Added renderer, config loading, quota cache reading, local quota refresh, fast git branch detection, bundled plugin packaging, and CI/release workflows.
- Added configurable agent state, context value format, and quota remaining/used display.
- Added quota refresh fallback for the current `agy` loopback server when the older `language_server --csrf_token` process is not present.
- Omitted fake quota placeholders when usage data is missing and hid reset countdowns for untouched `100% left` quota.
