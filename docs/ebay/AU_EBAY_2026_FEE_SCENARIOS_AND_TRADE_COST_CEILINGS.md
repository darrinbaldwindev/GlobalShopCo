# GlobalShopCo — AU eBay 2026 fee scenarios and trade-cost ceiling method

**Control issue:** `GlobalShopCo#17`  
**Status:** ECONOMICS METHOD / NOT SKU APPROVAL

## Why this exists
Current eBay Australia fee rules create materially different economics depending on the seller's account state. Do not hard-code one final-value-fee assumption across the GlobalShopCo pilot until the actual eBay account/plan state is verified.

## Current public fee evidence
### Scenario A — eligible Australia-based seller without a Pro plan
Current eBay AU guidance states that eligible Australia-based sellers without a Pro plan and with up to A$25,000 in sales over the past 12 months can sell without transaction/final-value fees. Optional listing upgrades and other activity-specific costs may still apply. eBay also operates Buyer Protection for these listings, with the buyer-facing Buyer Protection fee added by eBay rather than treated here as seller transaction fee.

### Scenario B — Pro / transaction-fee seller
Current eBay AU guidance states that transaction fees apply to Pro sellers and to Australia-based sellers moved to Pro Starter after exceeding the applicable sales threshold. For the generic 'most categories' example, Pro Starter uses a A$0.30 fixed order fee plus a 13.4% variable final-value fee on the sale amount up to A$4,000. Exact category/plan treatment must be verified before publication.

## Do not mix fee states
For every candidate, keep both scenarios until the actual seller account state is known:

`Scenario A residual = delivered sale price - delivered freight cash cost - product cash cost - integration allowance - returns/risk allowance - other channel costs`

`Scenario B residual = delivered sale price - eBay transaction fee - delivered freight cash cost - product cash cost - integration allowance - returns/risk allowance - other channel costs`

GST registration/input-tax-credit treatment must be reconciled separately before final margin approval. Do not mix GST-inclusive revenue with GST-exclusive supplier inputs without an explicit tax normalization step.

## Current Duraspikes retail anchors
Fresh public Australian evidence currently includes:
- Dino T-Rex: A$26.00 at The Pet Standard; A$29.99 at Pet Station; A$40.95 at GiGwi Australia.
- Elephant: A$29.99 at Pet Station; A$40.95 at GiGwi Australia.
- Rabbit: A$36.50 at GiGwi Australia.

These are retail anchors, not automatically defendable eBay prices.

## Illustrative Scenario B fee amounts
Using the current generic Pro Starter 'most categories' example of 13.4% + A$0.30/order, the approximate seller transaction fee would be:

| Delivered sale amount | Approx transaction fee |
|---:|---:|
| A$26.00 | A$3.78 |
| A$29.99 | A$4.32 |
| A$36.50 | A$5.19 |
| A$40.95 | A$5.79 |

This is a planning illustration only. Verify the exact listing category and plan before SKU approval.

## Freight interaction for the four sub-0.5 kg Southern Pet candidates
Current Southern Pet public dropship freight bands for 0–0.49 kg are A$8.50 ex GST to WA/ACT/QLD capital city, A$9.95 ex GST regional and A$10.40 ex GST remote. Exact freight still depends on final cubic weight/postcode.

Because the sale-price range for these toys is relatively compressed, trade cost is the decisive missing variable. Once the authorised trade price is available, compute a maximum acceptable buy-cost ceiling rather than asking whether the SKU 'looks profitable'.

## Required trade-cost ceiling method
For each candidate and fee scenario:

1. choose an evidence-backed delivered sale-price case (conservative/base/strong);
2. subtract the scenario-specific eBay fee;
3. subtract destination-weighted freight using verified packed/cubic treatment;
4. subtract integration/channel allowance;
5. subtract returns/refund/remake/risk allowance;
6. subtract target contribution buffer;
7. tax-normalize the result;
8. the remainder is the **maximum acceptable supplier buy cost**.

If the actual trade cost exceeds that ceiling, reject the SKU even if gross retail mark-up looks attractive.

## Gate
No Southern Pet candidate becomes `EBAY-READY` until:
- actual eBay account/fee scenario is verified;
- exact listing category is known;
- written marketplace permission exists;
- actual trade price exists;
- packed/cubic freight is reconciled;
- integration cost/allowance is known;
- conservative contribution is positive with a deliberate buffer.

Current state remains `0 EBAY-READY`.