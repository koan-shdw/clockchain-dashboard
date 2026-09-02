# Spec — Dashboard Round 3: Search & Verify, Quicklink, Pricing, Billing & Usage, Payment Methods

Date: 2026-09-02. Repo: `clockchain-dashboard`.
Status: APPROVED 2026-09-02, BUILT same day.
Source: Jeff's five mockups (billing_and_usage_0_3, pricing_0_1, payment_methods_0_1, verify_0_1, advanced_search_0_1, all 090126) + team discussion. Everything is front-end mock; no answer from Satish blocks any of it (his answers may later rename the key format, drop one search field, or kill the Payment Methods page).
The earlier encourage-use list stays parked EXCEPT the verify link, which merges with Jeff's quicklink here (same mechanism).

## 1. New pages and navigation

Four new pages, one rebuild:

| Page | File | Sidebar |
|---|---|---|
| Search & Verify | `search.html` | Overview group, under Dashboard, id `search` |
| Advanced Search | `advanced-search.html` | no sidebar entry, linked from Search (highlights `search`) |
| Pricing | `pricing.html` | Account group, id `pricing` |
| Billing & Usage | `account.html` (rebuilt) | Account group, renamed from "Billing & Tokens" to "Billing & Usage" |
| Payment Methods | `payment-methods.html` | Account group, id `payments` |

NAV lives in `app.js`. Account group order: Billing & Usage, Payment Methods, Pricing.

## 2. Quicklink (the verify link)

- Every logged event has a customer-facing reference key. Mock format: `CC-XXXX-XXXX` (A–Z, 2–9, no ambiguous chars). Shaped like a real key; swaps when Satish confirms the real one.
- The three canned activity logs each get a fixed key.
- `search.html?q=CC-…` runs the query on load. That URL **is** the shareable link — the quicklink and the round-3 verify link are one mechanism.
- A quicklink query renders a **receipt panel** above the results: type, hash (mono), hash type, public fields, block, consensus time (Clockchain Time), Verified pill, and a "Copy link" button that copies the URL.
- Create-log submit (logging.html) now also mints a key: shown in the success toast and stored for the session, so it's searchable until reload. Preview receipt gains a "Reference key · issued at submission" line.

## 3. Search & Verify (`search.html`)

Per Jeff's mock, in our grammar:

- Page head: "Search & Verify" + his intro copy (block height, hash, asset ID, user ID, or a quicklink).
- One large input + **Search Clockchain** (btn-primary) + "Advanced search →" link on the right.
- Results section:
  - Filter row: three checkboxes (Logging, Timestamp/APIs, Smart Contracts, first two checked).
  - Date radios: Today / Last 30 days / All time / Custom + two date inputs. Cosmetic in the mock except All time.
  - Results table: Type / Detail / Block / Status / When — same table grammar as Recent Activity, canned rows (3 logs, 1 API call, 1 contract).
- Mock matching: query matches hash prefix, asset name substring, block number, or quicklink. Type checkboxes filter for real. No match → "No matches on the chain for that query."

## 4. Advanced Search (`advanced-search.html`)

- Same filter row + date radios.
- Fields, per Jeff: Hash · Unhashed Content + Hash Type select (Any / SHA-256) · User ID · Asset ID · Asset Name · Block Height · Version.
- All filled fields AND-match over the canned rows; same results table.
- Unhashed Content ships as drawn, flagged in code comment as pending Satish (may not be searchable system-side).

## 5. Pricing (`pricing.html`)

Jeff's prose and placeholder numbers restructured into our grammar:

- Intro paragraph (his copy: three services, pricing managed per service, link to Billing & Usage).
- **Prepaid blocks**: explainer + two rate tables (Logs 1k→100k, Timestamp API 10k→250k), USD and CCTT columns.
- **Subscription**: card row per service — Log Basic / Pro / Enterprise, TS-Basic / TS-Pro / TS-Enterprise with the footnote inclusions; Enterprise cards get "Contact us" (mock).
- **Per-use billing**: explainer + the two per-unit rates; CCTT-only note.
- **Smart Contract Scheduling**: his estimate/credit/debit/15%-cancel copy in a docs-note card.
- Numbers are placeholders by his own instruction — one data object in the page so they're swappable in one place.

## 6. Billing & Usage (`account.html` rebuilt)

Replaces the current Billing & Tokens page. The API-keys card there goes (api-keys.html owns keys). Four sections, each our accordion (`.acc`, all open by default) matching Jeff's collapsible sections:

- **Logs**: usage bar (1,000 remaining / 500 consumed of 1,500 — our canonical numbers, not Jeff's) + Buy More button. Payment method radios: card ending -9482 / CCTT tokens, each with Manage link. Plan radios: Prepaid blocks (Autopay: Off — Manage Autopay) / Subscription (prorate note) / Pay per log (CCTT only, applies-after note). "Change payment plan for Logs" button.
- **Time and Timestamp API**: "4 days remaining in plan month (resets Oct 1, 2026 at midnight Clockchain Time)", usage bar 12,408 consumed / 7,592 remaining of 20,000, same method + plan radios, current plan Developer.
- **Smart Contract Scheduling**: Pending total $427.64 (8,552.8000 CCTT), Outstanding $0.00, the variance/15% note, "Schedule auto-replenish token balance" button.
- **Billing History**: filter checkboxes + date radios + the existing three-row table.
- All buttons and Manage links are ccMock toasts; radios switch locally.
- **Token balance chip**: `Clockchain Token Balance · 15,326.0382716 CCTT` as an extra topbar stat, shown only on Billing, Pricing, and Payment Methods (page opts in via a body attribute; app.js renders it).

New shared CSS: usage bar (accent fill on faded track — no red hatching, house palette), checkbox filter row.

## 7. Payment Methods (`payment-methods.html`)

- **Cards on file**: three canned cards, Update / Delete links; the primary-anywhere card has no Delete, with Jeff's explainer line.
- **Which card pays for each service**: three groups (Logs, Timestamp API, Smart Contract Token Autopay), PRIMARY pill on the current card, "Make primary" links swap the pill locally.
- No card-entry form anywhere — mock stays clear of payment credentials entirely.

## 8. Logging page tweak

The Search & Verify card on logging.html slims down: input + button now navigate to `search.html?q=…`. One search, one home. (Supersedes the round-2 layout lock for that card.)

## Housekeeping

- Cache-bust: `app.css?v=4` and `app.js?v=3` across all pages (both files change).
- DASHBOARD-NOTES.md gets a round-3 entry; commit includes this spec.
- Copy style: sentence case, our voice; Jeff's meaning kept verbatim where he wrote user-facing lines.

## Known rework risk (accepted)

- Billing & Usage may be rebuilt when the team simplifies the offer (3 services × 3 plans × 2 methods).
- Payment Methods may shrink to a link if the processor holds the cards.
- Quicklink key format and the Unhashed Content field await Satish's answers.
