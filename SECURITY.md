# Security Policy

Please do not report secrets, raw Antigravity probe payloads, cookies, CSRF tokens, emails, session IDs, transcript paths, or local absolute paths in public issues.

For sensitive reports, use a private disclosure channel provided by the project maintainers.

`agy-hud statusline` renders only sanitized HUD fields from stdin plus local config/cache files. If the quota cache is stale or missing, it may start a detached background refresh that contacts only the local Antigravity loopback server.
