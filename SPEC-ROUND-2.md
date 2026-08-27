# Spec — Dashboard Round 2: Log Creation Form

Date: 2026-08-27. Repo: `clockchain-dashboard` (live at koan-shdw.github.io/clockchain-dashboard).
Status: APPROVED 2026-08-27, BUILT same day.
Source: Jeff Ravetto's design (create_log_design 1.0 PDF + 1.1 ODG) + the 7 locked choices + design notes, all team-approved 2026-08-27.
Scope: `logging.html` only, plus shared CSS/JS it needs. Everything stays a static mock — except hashing, which is real (see 4).
Round 3 (encourage-use items) is separate and starts only after this ships.

## 1. Page order (locked choice 4)

Top to bottom on `logging.html`:

1. Stat cards (see 2)
2. **Create log** — the new two-zone form (see 3–5)
3. **Search & verify** — existing card, unchanged, now full-width below the form
4. **Recent logging activity** — existing table, unchanged except submit prepends to it (see 7)

Page head copy unchanged.

## 2. Stat cards

Keep the existing 4-card row, relabel to Jeff's semantics with consistent mock numbers:

- **Logs remaining** — `1,000 / 1,500` (remaining / purchased)
- **Consumed · all-time** — `500`
- **Purchased · all-time** — `1,500`
- **Block height** — live, unchanged

## 3. The two zones (design note 1)

The create form is one full-width card split into two labelled zones:

- **Hashed zone** (top): lock icon + heading "Hashed" + caption *"Only the fingerprint goes on chain. The content itself is never stored."*
- Divider line.
- **Public zone** (bottom): globe icon + heading "Public" + caption *"Readable by anyone, forever."*

Zones are visually distinct: hashed zone on `--surface-2` with the accent left border (like `.card.accent`), public zone plain. The layout does the teaching; no paragraph of instructions.

## 4. Hashed zone: three tabs + one hash row (locked choices 1, 2, 3, 6)

Three tabs using the existing `.tabs` / `ccTab` grammar (one input visible at a time, replaces Jeff's radios):

- **I have a hash** — mono input, placeholder `0x…`, max 128 hex chars. Input IS the hash; it flows straight to the hash row.
- **Hash text for me** — textarea, 128 chars, counter. Hashed live as they type (debounced ~300ms).
- **Hash a file for me** — drag-and-drop box (dashed border, upload icon, "Drop a file or click to browse"). On drop/pick: shows file name + size, hash computes in the browser. Caption under the box: *"Hashed locally. The file never leaves your machine."*

Below the tabs, ONE hash row (there is no Hash button — hashing is live):

- API-key grammar: mono value, Copy button (`ccCopy`).
- Caption: *"This is the hash that will be stored on the Clockchain."*
- **Hash type** select on the same row: `SHA-256` only for now. Implementation keeps an algo map keyed by the option value so adding/swapping types later is one line. In "I have a hash" mode the select is the user's claim about their own hash.
- Empty state (nothing entered yet): row shows `—` and the Preview button is disabled.

Hashing is REAL: `crypto.subtle.digest('SHA-256', …)` on the text (UTF-8) or file bytes (`file.arrayBuffer()`). Works on GitHub Pages (https). No fake hashes.

## 5. Public zone: four optional fields

Per Jeff's mock, all optional, two-column grid (stacks on mobile):

- **Asset Name** — text, 128, counter
- **Asset ID** — text, 128, counter
- **Additional Info** — textarea, 512, counter
- **Version #** — text, 10 numeric chars, counter

Counters in the existing small `--fg-3` style, `n/128 characters`.

Below the zones: **Preview** button (btn-primary), disabled until the hash row has a value.

## 6. Preview step (locked choices 5, 7 + design notes 5, 6)

Preview swaps the form card's content in place — same screen, no navigation. It renders as a **receipt**, styled with the existing `.kv` / table grammar:

- Heading: "Preview — this is what goes on the Clockchain"
- **Hashed** section: the hash (mono) + hash type.
- **Public** section: only the filled fields, as label/value rows. If all four are empty: *"No public text will be stored."* — silence is a visible choice.
- **Anchor** section: projected block `#<live height>` and consensus time (both live-ticking via `data-live`), marked "estimated at submission".
- Cost line: *"This uses 1 log. 999 remain after."* (computed from the remaining stat)
- Buttons: **Back** (btn-outline, returns to the form with everything intact) and **Submit** (btn-primary — this is the ONLY place Submit exists).

## 7. Submit (mock)

- Toast: "Log anchored to block #<height>".
- Prepends a row to Recent logging activity: short hash, Asset Name (or "—"), current block, now UTC, Verified pill.
- Logs remaining stat decrements on the page.
- Form resets to the empty hashed-zone state.
- No backend, nothing persists across reload.

## 8. Implementation homes

- Form markup: `logging.html`.
- Form logic (tabs feed, live hashing, preview swap, submit): inline `<script>` on `logging.html`, like the contracts wallet mock. `app.js` untouched except nothing.
- Zone/tab/drop-box/receipt styles: `app.css` (shared system, one place).
- Cache-bust `app.css?v=3` across all pages (`app.js` stays `?v=2` if unchanged).

## Housekeeping

- Commit includes this spec; DASHBOARD-NOTES.md gets a round-2 entry.
- Copy fixes vs Jeff's mock: "stared" → "stored"; radio sentences shortened into tab labels (meaning unchanged).

## Parked for round 3 (approved, not in this build)

Share/verify link, first-log-free onboarding, templates, drop-a-file-anywhere, API recipes card, email receipt, lifetime count, "Integrate time into your project" starter card (also answers the open opening-dashboard question).

## Open questions (do not block the build)

- Whether hash type is stored publicly on chain — Satish. Preview shows it next to the hash for now; hiding it is a one-line change.
- Client-side file hashing as the real product behaviour — Satish. The mock does it client-side regardless.
