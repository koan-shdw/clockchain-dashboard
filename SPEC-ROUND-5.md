# Spec — Round 5: Jeff's 09-22 webpage notes (items 5–11, 13 + services page merge)

Date: 2026-09-23. Repos: `clockchain-dashboard` + `clockchain/site` (r2 preview, services page only).
Status: APPROVED 2026-09-23, BUILT same day.
Source: webpage_notes_092226.pdf (items quoted verbatim), services_dashboard_0_2_092226.pdf (mockup for #6), smart_contract_credit_1_0_092226.pdf (mockup for #10), Jeff's Slack follow-ups.
User rulings: wallet = dashboard only; marketing scope = services page only (items 2+3) in the r2 preview, handover report asks Satish content-vs-structure; item 1 (homepage) out; **item 12 NOT built** (Jeff: "please don't implement #12"); Token Management page dead (CCTT credit balance tabled).

## Terminology sweep: "Time Services"

"Timestamp API" the SERVICE becomes **Time Services** everywhere in the app: left nav label, timestamp.html title + page head, search filter checkbox, advanced-search tab, Billing & Usage section heading + plan labels, Payment Methods group. The API endpoints and the docs page keep their technical names (`api/time/*`, Timestamp API reference) — Jeff renamed the service, not the API.

## Item 5 — Logging page copy

Page-head paragraph becomes, verbatim: "Hash any asset with industry-standard hashing, anchor it on-chain, and verify it from any device. You can log manually using the form below, or use our APIs for larger-scale needs."

## Item 6 — Dashboard rebuilt per mockup

Old stat cards and API information card go. New page, top to bottom:

1. "Welcome back, Alexander." head (kept).
2. **Credits & wallet card**: "Clockchain Credits: 6,334.0138" · "Token Balance in Wallet: 4,335.0921 CCTT" · **Disconnect Wallet** button. Clicking it flips to a disconnected state: wallet line hidden, button reads **Connect Wallet** (Jeff: "connect wallet" if no wallet connected). Local mock state only.
3. **My Plans** (one card, three blocks, per mockup):
   - **Logging** — Plan Type: Prepaid · Prepaid Logs Remaining: 5,363 · [Buy More] · "Go to Logging →"
   - **Time API** — Plan Type: Subscription · Monthly Calls Remaining: 12,032 · [Modify Plan] · "Go to Time Services →"
   - **Smart Contracts** — Smart Contract Credit Available Balance: $31.23 · [Buy More] · Autopay: On · Manage (→ new credit page) · Scheduled Contracts: 14 · Committed Balance: $28.42 · "Go to Smart Contracts →"
4. Recent activity table (kept as is).

The italic side notes in the mockup ("if Prepaid: … with buy more link / If subscription: … with modify plan link") are annotations describing the conditional link, not on-screen text — the mock shows the one state drawn.

### Numbers alignment (whole app adopts Jeff's mockup numbers)
- Logs: 5,363 remaining / 4,637 consumed of 10,000 purchased → logging.html stat cards + billing bar (54%).
- Time: 12,032 remaining / 7,968 consumed of 20,000 → billing bar (60% remaining).
- Smart Contracts: available $31.23 · committed $28.42 · total $59.65 · 14 scheduled — dashboard, billing, and the new credit page all agree.

## Item 7 — Search & Verify

- Filter checkbox "Timestamp/APIs" → "Time Services"; advanced tab "Timestamps" → "Time Services".
- Contract rows: detail wording "trigger" → "execution time" (Jeff: instead of "trigger" in result say "execution time").
- Contract rows: the When cell becomes a **Print proof** action (Jeff: instead of "when" have an action to print proof certificate) — wired to the existing certificate.
- Global search: the "Search entire chain" checkbox becomes a two-state toggle **My data | Entire chain**, My data selected by default (Jeff: doesn't make clear the default is your own stuff; "my data" vs "entire chain"). House tab-button pair.
- Print action on results generally: already exists in the row expansion (Proof of log / Print); the contract When-cell action above is the addition.

## Item 8 — Time Services page

timestamp.html: title + h1 + left nav → **Time Services**. Filename stays (links keep working).

## Item 9 — Billing & Usage

- Usage bars thicker: 10px → 16px (Jeff: might be mistaken for a page separator).
- **Logs**: "Payment method for Logs" radio section REMOVED · "manage payment method" link added next to the Subscription radio · "Pay per log (CCTT only)" radio + text REMOVED. (Autopay flow itself = Jeff's "still needed" note, Manage Autopay link stays a mock.)
- **Time Services** (renamed from "Time and Timestamp API"): payment-method section REMOVED · plan heading "Plan Type for Time Services" · "Prepaid blocks of Timestamp API calls" → "Prepaid blocks of Time Service calls" with **buy more** and **manage autopay** links beside it · "manage payment method" link next to Subscription · "Pay per Timestamp API call" radio + text REMOVED.
- **Smart Contract Scheduling**: "Outstanding balance…" row REMOVED · "Charges or credits from the gap…" paragraph REMOVED · replenishment text becomes, verbatim: "You can schedule automatic Smart Contract credits replenishment when your balance falls below a specified threshold" · button becomes **Schedule autopay for Smart Contract credit balance** → links to the new credit page.

## Item 10 — NEW page: Smart Contract Credit Management

`smart-contract-credit.html`, left nav Account group under Pricing (per mockup). Per mockup:

- **Current Smart Contract Credit Available Balance: $31.23** + [Buy More Credits] — explainer: "This is the portion of your credit balance that is available for scheduling new contracts. Any refunds will post to this balance within 24 hours."
- **Current Smart Contract Credit Committed Balance: $28.42** — "This is the portion of your credit balance that is tied to currently-scheduled contracts and is not available for scheduling additional contracts."
- **Current Smart Contract Total Credit Balance: $59.65** — "This is the sum of the available and committed balances."
- **Smart Contract Credit Auto-Pay Settings**: Autopay status On/Off switch (new small house switch primitive, flips locally) · "Threshold to trigger autopay: $5.00 USD" + Update + "$5 minimum" · "Replenishment Amount: $20.00 USD" + Update + "$5 minimum" · "Autopay Payment Method: credit card ending in -9482 · Manage" (→ Payment Methods). Mockup drew card -9876; we show -9482 so it matches the cards on file — flagged here as the one deliberate deviation.

## Item 11 — Payment Methods

Group "Timestamp API" → "Time Services"; group "Smart Contract Token Autopay" → "Smart Contract Credits Autopay".

## Item 13 — Buy More payment step

Every buy action (dashboard Logging + Smart Contracts Buy More, billing Logs Buy more + Time Services buy more, credit page Buy More Credits) opens a small shared chooser instead of a bare toast: "Pay with — Credit card (USD) / Connected wallet (CCTT)", each choice toasts the mock purchase. One shared function in app.js + small CSS. Subscriptions/Modify Plan unaffected (Jeff: only "where you are paying for something in the current flow").

## Marketing site — services page merge (items 2+3, r2 preview repo)

`site/services.html` becomes the single merged page:
- Hero, verbatim: "Three services. One clock." / "Time you can independently verify."
- Three service blocks with Jeff's combined copy verbatim: **Logging** (Timestamp and log any data… + 3 bullets + "Log something →"), **Smart Contract Scheduling & Execution** (Schedule and execute critical services… + 3 bullets + "Go Now →"), **Time Services** (Access, verify and stamp anything… + 3 bullets + "Go Now →").
- Whole box clickable, not just the button (item 3) — each block is one link, existing targets kept.
- Built in the site's existing page grammar; homepage untouched.
- After build: handover report for Satish listing items 1–4 with the content-vs-structure split.

## Housekeeping

- Dashboard: css v=9, js v=8 sweep; DASHBOARD-NOTES round-5 entry; commit + push + live check.
- Site: commit + push origin (r2); never touch the frozen `before` remote.

## Parked
- #12 Smart Contracts page (Jeff rethinking: limit capability goes away, show price for guaranteed execution).
- #1 homepage dropdowns (with Satish handover).
- #4 wallet in marketing headers (dashboard-only ruling).
- Autopay FLOWS for logs/time (Jeff marked "still needed" — future round).
