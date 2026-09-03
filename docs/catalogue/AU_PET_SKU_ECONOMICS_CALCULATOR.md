# GlobalShopCo — AU Pet SKU Economics Calculator

**Status:** decision-support template / NOT a launch approval
**Date:** 2026-09-03

## Purpose

Provide a repeatable calculation gate for the five currently prioritised GiGwi SKUs in `AU_PET_SKU_EVIDENCE_SNAPSHOT_2026-09-03.md`.

This document is a calculator specification, not evidence of supplier cost, achievable selling price, or realised margin. Unknown inputs must remain unknown until independently verified.

## Core calculation

For a customer-facing price that includes Australian GST:

`selling_price_ex_GST = customer_price_inc_GST / 1.10`

`contribution_before_payment_marketing = selling_price_ex_GST - supplier_cost_ex_GST - dropship_freight_ex_GST - mandatory_order_costs_ex_GST`

`contribution_margin = contribution_before_payment_marketing / selling_price_ex_GST`

Do not treat product weight as final freight weight. Confirm parcel/cubic-weight treatment with the supplier.

## Required inputs per SKU

| Input | Status | Rule |
|---|---|---|
| Exact supplier SKU | VERIFIED for current candidates | Match catalogue SKU exactly |
| Supplier product cost | UNKNOWN | Obtain through authorised trade account/quote |
| Supplier freight | PARTIAL | Use published band only until parcel/cubic treatment is confirmed |
| Customer selling price | UNKNOWN | Select only after market-price reconciliation |
| GST treatment | ASSUMPTION | Confirm accounting treatment before launch |
| Payment cost | UNKNOWN | Insert actual selected payment method/rate |
| Marketing/customer acquisition cost | UNKNOWN | Do not assume zero for launch economics |
| Returns/warranty allowance | UNKNOWN | Confirm supplier and consumer-law treatment |

## Current market reference points

These are public observations captured 2026-09-03 and are reference inputs only:

| Product family | Public reference | Observation |
|---|---|---:|
| Duraspikes Dino T-Rex | GiGwi Australia | $40.95 |
| Duraspikes Elephant | GiGwi Australia | $40.95 |
| Duraspikes Rabbit | GiGwi Australia | $36.50 |
| Crunchy Neck Duck | GiGwi Australia | $19.95–$29.95 depending on variant |
| Duraspikes Elephant | Pet Circle | $30.99 observed |
| Duraspikes Rabbit | Pet Circle | $37.99 observed |
| Duraspikes Dino T-Rex | The Pet Standard | $26.00 observed |
| Duraspikes Elephant | The Pet Standard | $26.00 observed |
| Duraspikes Rabbit | The Pet Standard | $24.00 observed |

Market prices are volatile and may include promotions, clearance, membership benefits, marketplace conditions or different fulfilment terms. They must not be copied as GlobalShopCo pricing without reconciliation.

## Freight reference

For the current supplier evidence:

- 0–0.49 kg band: published freight varies by destination, including $7.60 VIC/NSW capital, $8.50 WA/ACT/QLD capital, $9.65 long-haul interstate metro, $9.95 regional and $10.40 remote; SA metro is published at $7.05.
- 0.5–0.99 kg band: published freight varies by destination, including $9.35 VIC/NSW capital, $9.80 WA/ACT/QLD capital, $13.15 long-haul interstate metro, $13.95 regional and $14.55 remote; SA metro is published at $7.05.

These values are supplier-published reference bands and exclude GST. Reconfirm before commercial use.

## Break-even supplier-cost test

For any proposed customer price and destination:

`maximum_supplier_cost_for_zero_contribution = selling_price_ex_GST - freight_ex_GST - mandatory_order_costs_ex_GST`

For a target contribution margin `m`:

`maximum_supplier_cost = selling_price_ex_GST * (1 - m) - freight_ex_GST - mandatory_order_costs_ex_GST`

Run at minimum:

- **Conservative:** lower defensible selling price + higher representative freight + higher returns/payment allowance.
- **Base:** selected market reference price + representative freight + verified operating costs.
- **Strong:** defensible upper selling price + favourable but realistic freight exposure + verified operating costs.

## Decision gate

A SKU is **NOT launch-ready** until all of the following are verified:

1. Authorised supplier cost for the exact SKU.
2. Defensible Australian market selling-price range.
3. Final parcel/cubic-weight freight treatment.
4. Free-delivery contribution remains acceptable under Conservative scenario.
5. Payment, returns, warranty and mandatory-order costs are included.
6. Product compliance/consumer-law obligations are reviewed.
7. Supplier stock/fulfilment reliability is acceptable.

### Decision states

- **UNKNOWN:** insufficient evidence.
- **CANDIDATE:** evidence supports further economics work.
- **ECONOMICS PASS:** all required cost inputs verified and scenario gate passed.
- **LAUNCH-READY:** economics pass plus operational/compliance gates passed.
- **REJECT:** fails a defined disqualifier or economics threshold.

No state may be promoted solely because a public retail price looks attractive.

## Immediate next action

Obtain authorised Southern Pet trade costs for the exact SKUs, then populate the calculator using current supplier freight bands and a reconciled market-price range. If trade pricing cannot be obtained, preserve the blocker and do not infer it from retail pricing or competitor discounts.

## Source references

- Southern Pet Supplies catalogue and SKU evidence: https://www.southernpetsupplies.com.au/category/dog-products/dog-toys/toys-plush/
- GiGwi Australia public catalogue: https://www.gigwipets.com/product-category/dog/
- Pet Circle GiGwi catalogue: https://www.petcircle.com.au/gigwi
- The Pet Standard GiGwi collection: https://thepetstandard.com.au/collections/vendors?q=gigwi
