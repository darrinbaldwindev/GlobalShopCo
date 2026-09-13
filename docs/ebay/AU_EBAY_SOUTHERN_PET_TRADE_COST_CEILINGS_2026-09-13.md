# GlobalShopCo AU eBay — Southern Pet trade-cost ceilings

Status: DECISION SUPPORT / HOLD
Date: 2026-09-13
Control: GlobalShopCo#17

## Purpose
Convert current public retail and freight evidence into a conservative maximum supplier buy-cost ceiling. These ceilings are NOT verified margins and do not approve any SKU. They are screening thresholds to apply when authorised Southern Pet trade prices become available.

## Current eBay fee scenarios
Fresh eBay Australia evidence shows two materially different seller states from 12 May 2026:

1. Eligible Australia-based seller, no Pro subscription, <= A$25,000 rolling 12-month sales: no transaction/final-value fee. Buyer Protection is charged to the buyer and does not reduce seller payout. Optional/international fees may still apply.
2. Pro Starter: no monthly subscription fee, but 13.4% final-value fee. Current eBay selling-fee material also describes a per-order component for transaction fees; use the exact live account/category fee before publication.

Important: eBay's integration-provider access is described as exclusive to Pro Basic plans and above. Therefore the final Shopify-to-eBay integration design may itself force a paid/Pro state. Do not assume the zero-transaction-fee scenario will be compatible with the selected integration.

## Public price evidence used for screening
Current Australian public observations:
- GiGwi Duraspikes Dino T-Rex: A$20.80 at Pet Essentials; GiGwi Australia A$40.95.
- GiGwi Duraspikes Elephant: A$23.00 at Pet Essentials; GiGwi Australia A$40.95; Celeste sale observation A$23.89.
- GiGwi Duraspikes Rabbit: A$20.50 at Pet Essentials; GiGwi Australia A$36.50.
- GiGwi Crunchy Neck Plush Duck Small: A$14.00 at The Pet Standard; GiGwi Australia range A$19.95-A$29.95 across sizes.
- Large Duck screening price: A$29.95 manufacturer range ceiling only; exact current size-specific competitive price must still be verified before approval.

For fail-closed screening, the lowest current observed price was used where an exact comparable was available.

## Freight basis
Use current Southern Pet published regional-Australia dropship freight as a conservative public screening case:
- 0-0.49 kg: A$9.95 ex GST
- 0.5-0.99 kg: A$13.95 ex GST

Final parcel/cubic treatment remains to be verified. GST/account treatment must be reconciled before approval.

## Screening formula
Maximum supplier buy-cost ceiling = sale price - screening freight - eBay seller fee - 15% sale-price contribution buffer.

The 15% buffer is an internal conservative screen, not a verified target margin. It deliberately excludes unknown integration, returns, advertising, packaging and other operating costs; those can only LOWER the acceptable buy cost.

| SKU | Product | Screen sale price | Freight screen | Ceiling: eligible non-Pro / no transaction fee | Ceiling: Pro Starter 13.4% + A$0.30 screen | Decision |
|---|---|---:|---:|---:|---:|---|
| GDAG2522 | Duraspikes Dino T-Rex | A$20.80 | A$9.95 | A$7.73 | A$4.64 | HOLD — trade cost/permission unknown |
| GDAG2515 | Duraspikes Elephant | A$23.00 | A$9.95 | A$9.60 | A$6.22 | HOLD — strongest current ceiling |
| GDAG2505 | Duraspikes Rabbit | A$20.50 | A$9.95 | A$7.48 | A$4.43 | HOLD — trade cost/permission unknown |
| GDAG2600 | Crunchy Neck Duck Small | A$14.00 | A$9.95 | A$1.95 | -A$0.23 | HOLD / likely reject as single-unit free-delivery Pro SKU |
| GDAG2610 | Crunchy Neck Duck Large | A$29.95* | A$13.95 | A$11.51 | A$7.19 | HOLD — *price is manufacturer range ceiling, not exact comp |

## Interpretation
- `GDAG2515` Elephant is the strongest current single-unit candidate by conservative trade-cost tolerance.
- `GDAG2522` and `GDAG2505` remain plausible only if authorised trade prices are very low.
- `GDAG2600` Small Duck is commercially weak as a single free-delivery SKU; under the Pro Starter screening case it cannot support the 15% buffer even at zero supplier cost. Treat it as bundle/add-on candidate rather than first-wave standalone unless better sale/freight evidence changes the result.
- `GDAG2610` Large Duck cannot be ranked confidently until an exact size-specific competitive sale price and parcel/cubic freight treatment are verified.

## Immediate rejection rule when trade prices arrive
Fail a candidate as a standalone free-delivery pilot SKU if its GST-normalised supplier buy cost is above the applicable ceiling BEFORE integration, returns, advertising or other unresolved operating costs are added. Passing the ceiling does not make a SKU approved; it only permits deeper verification.

## Remaining hard blockers
Written eBay/marketplace approval; authorised trade price; exact GST treatment; final parcel/cubic freight; stock ownership/pre-purchase compatibility with eBay policy; packing/seller identity; buyer-data handling; returns/warranty; exact account/category eBay fees; integration cost and plan requirement; positive final contribution.

No supplier contact, app installation, account connection, purchase, listing publication, production Shopify/eBay mutation, credentials or spend occurred.