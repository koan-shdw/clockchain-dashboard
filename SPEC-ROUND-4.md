# Spec — Dashboard Round 4: One search page, row expansion + proof, service tabs, global toggle, Stripe button

Date: 2026-09-10. Repo: `clockchain-dashboard`.
Status: APPROVED 2026-09-10, BUILT same day.
Source: team feedback 09-10 + Jeff's note (he's defining result attributes per type; Timestamp API call search still under discussion; Smart Contract fields need thought). User confirmed: global = whole chain vs your events; advanced merges into the one page.

## 1. One search page

`advanced-search.html` dies (becomes a redirect to search.html, like index.html). Everything lives on `search.html`:

- Big box + Search Clockchain button, as now.
- **Advanced search** button below it expands an advanced panel in place; while open it reads **← Simple search** and collapses the panel. No more missed text link.
- Sidebar unchanged (one Search & Verify entry).

## 2. Service tabs in the advanced panel

House tab grammar (same as Create Log's input tabs). Three buttons swap the field set in place:

- **Logs** — the current advanced fields: Hash, Unhashed Content + Hash Type, User ID, Asset ID, Asset Name, Block Height, Version.
- **Timestamps** — date/time entry + Block Height, either direction: enter a time → get the block, enter a block → get the time (Jeff's block↔time conversion). Result renders as a conversion card above the results table. Mock math: linear mapping anchored to the live height ticker. Plus a docs link: "Using the Timestamp API →" to docs/timestamp-api.html.
- **Smart Contracts** — DRAFT, flagged in the UI: Contract name, Status (Scheduled / Executed / Canceled), Trigger date range. Placeholder until the team lands the real fields.

Running an advanced search scopes to that tab's service (the results filter checkboxes sync to match). Simple mode keeps the checkboxes as-is.

## 3. Date/time entry (the smoothest-method answer)

Native `<input type="date">` + `<input type="time" step="1">`, styled to the house theme. That gives typing AND a built-in calendar dropdown, time to the second, zero libraries, full keyboard flow — this is the fastest method, and it satisfies both asks (best entry method + dropdown cal/time selector) with one control. The fake `25-Aug-2026` text inputs in every date filter row get replaced with the same native inputs.

## 4. Row expansion + Proof of Log

Every results row gets a chevron at the end. Click expands a full-width detail panel under the row:

- **Log**: full hash + type, asset name / ID / version, user ID, block, consensus time, reference key.
- **API call**: endpoint, response code, block, consensus time, reference key.
- **Contract**: name, trigger time, status, paid estimate, reference key.
- Per-type scheme: a type pill + tinted left border on the panel (log = house green, API = muted blue, contract = muted amber — quiet tints, not a new palette).
- Actions per panel: **Proof of log** (opens a printable certificate in a new tab — self-contained HTML, no app chrome: Clockchain header, hash, public fields, block, consensus time, reference key, quicklink URL), **Print** (opens the same certificate and fires the print dialog), **Copy quicklink**.
- Jeff is defining the exact attributes per type; these panels use our current fields and his list swaps in when it lands.

## 5. Global search toggle

Checkbox in the filter row: "Search entire chain" — **default off**. Off = your events only (usr_9d4f). On = all users' public events. Mock: two extra canned rows from other user IDs that only surface when the toggle is on.

## 6. Billing: Stripe portal button

Research answer already given to the team (Stripe Customer Portal, backend keys, no user OAuth). In the mock: a **Manage billing** button on Billing & Usage and on Payment Methods — toast "Mockup: opens the Stripe customer portal". Nothing else changes on the money pages this round.

## Housekeeping

- search.js grows the expansion/conversion/global logic (v=2); css v=5, js v=4 sweep.
- DASHBOARD-NOTES round-4 entry; spec committed with the build.

## Parked (team's court)

- Smart Contract search fields (tab ships as DRAFT).
- Result attributes per type (Jeff).
- Timestamp API call search beyond block↔time (Jeff + Ken).
