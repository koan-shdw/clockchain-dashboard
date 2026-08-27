# Dashboard Notes — round 1 (from website notes, 2026-08-11)

Work happens in this repo, separate from the site. Round-1 build shipped 2026-08-11, spec in SPEC-ROUND-1.md.
Round 2 (Jeff Ravetto's Log Creation form redesign, team-approved) built 2026-08-27, spec in SPEC-ROUND-2.md. Round 3 = encourage-use items, parked in that spec.

1. **Connections section** — DONE. Sidebar group with API (new api-keys.html: table, reveal/copy, mock generate + revoke) and MCP (links to docs/mcp.html, highlights in sidebar).
2. **Top right corner** titles next to the numbers — DONE ("Clockchain Time" / "Clockchain Block Height" labels, hidden under 980px).
3. Remove "API" from "Timestamp API" — DONE in sidebar, page title, dashboard card. Docs keep "Timestamp API reference" (it is the API's name).
4. "Live Benchmarking" → **"Network Status"** — DONE (labels and titles; file stays benchmarking.html so links hold).
5. **Opening dashboard**: rethink what info belongs on it — **OPEN, waiting on Jeff.**
6. **Light mode** — DONE. Topbar sun/moon toggle, dark default, remembered per browser.

## Repo facts

- Seeded 2026-08-11 from the site repo's `app/` folder (state as of site commit `f4da0a4`; includes Satish's backend-connection work through `cd22522`).
- The site repo keeps its own `app/` copy — the marketing site links into it. This repo is the dashboard's home going forward.
- Live at: https://koan-shdw.github.io/clockchain-dashboard/
