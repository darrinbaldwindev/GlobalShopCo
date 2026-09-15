# GlobalShopCo Vertical Execution Batch — 2026-09-15 — Batch 005

Status: ACTIVE / NON-PRODUCTION
Branch: `agent/chatgpt/headless-niche-fill-2026-09-13`
Starting branch head: `8361edc83ca4b1bcf82c267fea0c5cc3d176e72f`

## Fresh scan

### GlobalShopCo
- Default line still reports latest public/default commit `79d50227fe19826d42c43e7dec15ce245ad58e40`.
- Active niche-fill branch begins Batch 005 at `8361edc83ca4b1bcf82c267fea0c5cc3d176e72f`.
- Batch 004 ranked supplier unlocks with Southern Pet first and Eleganter second.
- Home Organisation and Mobile & Computer Accessories remain at zero surviving commercial qualification drafts after exact-market pruning.

### GlobalShopCo-Headless
- Main still begins from `c3e2960961fd60ef33ddb531577173fd3ff7cb17`.
- Non-production branch `agent/chatgpt/baby-generic-tag-2026-09-14` contains the Baby query fix: `tag:baby OR tag:baby-safety`, while Safety remains restricted to actual safety-use tags.
- No merge or deployment authority is inferred.

## Batch objective

1. Verify the Baby generic-tag change against current storefront contracts and add a fail-closed regression fixture where appropriate.
2. Convert Southern Pet public stock/weight/freight evidence into owned-site maximum buy-cost ceilings for the five priority GiGwi SKUs.
3. Convert Eleganter `CA3044` into a freight-sensitive decision ceiling using current exact public item price and market evidence.
4. Preserve UNKNOWN where authenticated supplier account data remains unavailable.

## Screening assumptions

Any cost ceiling in this batch is a decision aid, not an approved margin target. Unless a product-specific artifact states otherwise:
- customer retail is GST-inclusive;
- supplier freight is converted to GST-inclusive where supplier publishes ex-GST rates;
- payment/transaction reserve: 3% of retail (screening assumption only);
- contribution buffer: 15% of retail after freight and payment reserve (screening assumption only);
- no returns reserve is added unless explicitly stated, so ceilings are optimistic and must not be treated as launch approval.

## Hard boundaries
- No ACTIVE Shopify publication.
- No new qualification draft without credible acquisition + freight + current market evidence.
- No supplier contact, account application, purchase, credential use or financial commitment.
- No merge/deploy.
- Do not weaken fail-closed storefront filters.
- Do not mutate Level-2 fixture state.
