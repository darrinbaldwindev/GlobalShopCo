# Southern Pet — Owned-Site Buy-Cost Ceilings — 2026-09-15

Status: SCREENING ONLY / NOT LAUNCH APPROVAL
Branch: `agent/chatgpt/headless-niche-fill-2026-09-13`
Batch: `docs/batches/VERTICAL_BATCH_2026-09-15_005.md`

## Purpose

Convert current public retail, Southern Pet weight/stock and published dropship freight evidence into maximum item-cost ceilings for the five priority GiGwi SKUs.

These ceilings are decision aids only. Actual Southern Pet trade price remains login-gated and UNKNOWN.

## Screening method

Customer retail is treated as GST-inclusive.

Screening reserves:
- 3% of retail for payment/transaction cost;
- 15% of retail as a contribution buffer;
- published Southern Pet dropship freight, converted from ex-GST to GST-inclusive;
- no returns/damage reserve, making these ceilings optimistic.

Formula:

`maximum item cost incl GST = retail × 0.82 − freight incl GST`

Because Southern Pet states displayed account prices are ex GST, the final comparison ceiling is also shown ex GST.

## Current supplier evidence

Southern Pet publicly lists these five exact SKUs in its dropship catalogue:
- `GDAG2505` GiGwi Duraspikes Rabbit — 0.49 kg — public stock observation 16;
- `GDAG2515` GiGwi Duraspikes Elephant — 0.49 kg — public stock observation 20;
- `GDAG2522` GiGwi Duraspikes Dino T-Rex — 0.49 kg — public stock observation 18;
- `GDAG2600` GiGwi Crunchy Neck Plush Duck Small — 0.4 kg — public stock observed in the 46–55 range across recent crawls;
- `GDAG2610` GiGwi Crunchy Neck Plush Duck Large — 0.9 kg — public stock observed in the 35–107 range across recent crawls.

Stock values are volatile catalogue observations, not reserved inventory.

Published dropship freight is ex GST. For 0–0.49 kg: QLD/WA/ACT capital A$8.50, regional A$9.95, remote A$10.40. For 0.5–0.99 kg: QLD/WA/ACT capital A$9.80, regional A$13.95, remote A$14.55.

## Retail inputs used

The screen deliberately uses low current exact-market item prices where available rather than manufacturer RRP:
- Rabbit: A$27.99 current BIG W exact product observation;
- Elephant: A$23.89 current Celeste exact product observation;
- Dino T-Rex: A$29.99 current Pet Station exact product observation;
- Small Duck: A$14.00 current The Pet Standard exact product observation;
- Large Duck: A$18.50 recent exact-market observation from Alihan via BuyWisely comparison.

These are market observations, not proposed GlobalShopCo retail prices.

## Maximum Southern Pet item cost

| SKU | Product | Retail input | Capital ceiling ex GST | Regional ceiling ex GST | Remote ceiling ex GST | Decision |
|---|---|---:|---:|---:|---:|---|
| `GDAG2522` | Duraspikes Dino T-Rex | A$29.99 | A$13.85 | A$12.41 | A$11.95 | BEST OF FIVE, but trade price must be at or below ~A$11.95 ex GST to support this optimistic nationwide screen |
| `GDAG2505` | Duraspikes Rabbit | A$27.99 | A$12.36 | A$10.92 | A$10.46 | HOLD pending trade price; nationwide ceiling is tight |
| `GDAG2515` | Duraspikes Elephant | A$23.89 | A$9.31 | A$7.85 | A$7.41 | WEAK HOLD; likely fails unless trade pricing is unusually low |
| `GDAG2600` | Crunchy Neck Duck Small | A$14.00 | A$1.94 | A$0.48 | A$0.04 | REJECT as single-item free-delivery product at current market price |
| `GDAG2610` | Crunchy Neck Duck Large | A$18.50 | A$3.99 | negative | negative | REJECT as single-item nationwide free-delivery product at current market price |

## Interpretation

The public freight evidence materially narrows the account-data request:

1. `GDAG2522` is the first price to check. If Southern Pet trade price exceeds roughly A$11.95 ex GST, it fails this optimistic nationwide screen at the current market retail input.
2. `GDAG2505` needs trade price at or below roughly A$10.46 ex GST for the same remote-zone screen.
3. `GDAG2515` needs roughly A$7.41 ex GST or better, making it substantially less promising than earlier item-price-only screening suggested.
4. `GDAG2600` and `GDAG2610` should not consume further single-item sourcing effort unless the commercial model changes to bundling, paid freight, minimum-order thresholds or materially higher defensible retail.

## Important caveat

These ceilings do not include a returns/damage reserve and therefore overstate acceptable buy cost. They are not owner-approved margin targets and are not evidence of profitability.

## Exact next data needed

From an authorised Southern Pet account, capture only:
- current ex-GST trade price for `GDAG2522`, `GDAG2505`, and `GDAG2515` first;
- current stock/feed state;
- confirmation that owned-site dropship use remains permitted.

The two Duck SKUs do not justify priority trade-price lookup under the current free-delivery model.

No Shopify draft was created and no supplier contact/account action was performed.