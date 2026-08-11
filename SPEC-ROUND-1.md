# Spec — Dashboard Round 1

Date: 2026-08-11. Repo: `clockchain-dashboard` (live at koan-shdw.github.io/clockchain-dashboard).
Status: AWAITING APPROVAL. Covers dashboard notes items 1, 2, 3, 4, 6. Item 5 (rethink opening dashboard) parked for Jeff.
Everything stays a static mock: no real keys, no backend.

## 1. Connections group (notes item 1)

New sidebar group **Connections**, placed between Services and Network:

- **API** → new page `api-keys.html`. Icon: key. Content:
  - Page head: "API Keys" + one-line sub ("Generate, manage, and revoke keys for the Clockchain API.").
  - **Your keys** card: table of keys (Name, Key masked with Reveal/Copy, Created, Last used, Status) seeded with the two existing mock keys (1 production, 1 test). Each row gets a **Revoke** button: confirm via toast, row flips to a "Revoked" pill and fades.
  - **Generate key** card: name field + environment choice (production / test), button creates a new masked `cc_live_…` / `cc_test_…` row in the table (random hex, mock only) + toast. New key shown once in full with a Copy button, like real consoles do.
  - Footer link row: API reference → `docs/timestamp-api.html`.
- **MCP** → links to the existing `docs/mcp.html`. Icon: plug. `mcp.html` gets `data-nav="mcp"` so the sidebar highlights MCP (today it highlights Docs).

The "API information" card on the opening dashboard stays where it is this round; its "Generate new key" button now links to `api-keys.html` instead of firing a mock toast. Opening-dashboard rethink is item 5, Jeff's round.

## 2. Top-right corner titles (notes item 2)

Topbar clock (`app.js` renderTopbar) becomes two labelled stats:

- `CLOCKCHAIN TIME` label above/next to the ticking time
- `CLOCKCHAIN BLOCK HEIGHT` label next to the block number

Small mono uppercase labels in `--fg-3`, numbers unchanged, live dot stays. Labels hide below 900px so the topbar doesn't overflow on mobile.

## 3. Timestamp rename (notes item 3)

"Timestamp API" → **"Timestamp"** in dashboard chrome:

- sidebar label (`app.js` NAV)
- `timestamp.html` topbar `data-title` + page `<h1>`
- opening dashboard service card heading

Docs keep their names ("Timestamp API reference" is an API doc; unchanged).

## 4. Network Status rename (notes item 4)

"Live Benchmarking" → **"Network Status"**:

- sidebar label (`app.js` NAV)
- `benchmarking.html` topbar `data-title` + `<h1>` ("Live Time Benchmarking" → "Network Status")
- opening dashboard card head ("Live benchmarking" → "Network status")
- the in-page mention in `docs/mcp.html`

File stays `benchmarking.html`, no links break.

## 6. Light mode (notes item 6)

- `app.css`: light palette under `:root[data-theme="light"]` — bg `#f4f6f4`, alt `#eef1ee`, surface white, fg near-black, lines to black-alphas, softer shadow, `color-scheme:light`; accent shifts to the site's darker daylight green for contrast on white. Dark values stay the default (no attribute = dark).
- Toggle: sun/moon button in the topbar (rendered by `renderTopbar`, so it's on every page). Click flips `data-theme` on `<html>`, saves to `localStorage('ccapp-theme')`.
- Anti-flash: one-line inline script in each page `<head>` (all 7 root pages + 3 docs pages) applies the saved theme before paint.
- Default: dark.

## Housekeeping

- Cache-bust: `app.css?v=2`, `app.js?v=2` across all pages.
- Commit includes this spec; DASHBOARD-NOTES.md gets items 1–4, 6 marked done, item 5 marked waiting on Jeff.

## Parked

- Item 5: opening dashboard content rethink, with Jeff.
