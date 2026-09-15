# GlobalShopCo Vertical Execution Batch — 2026-09-15 — Batch 005

Status: EXECUTED / NON-PRODUCTION
Branch: `agent/chatgpt/headless-niche-fill-2026-09-13`
Starting branch head: `8361edc83ca4b1bcf82c267fea0c5cc3d176e72f`

## Fresh scan

### GlobalShopCo
- Default line still reports latest public/default commit `79d50227fe19826d42c43e7dec15ce245ad58e40`.
- Active niche-fill branch began Batch 005 at `8361edc83ca4b1bcf82c267fea0c5cc3d176e72f`.
- Batch 004 ranked supplier unlocks with Southern Pet first and Eleganter second.
- Home Organisation and Mobile & Computer Accessories remain at zero surviving commercial qualification drafts after exact-market pruning.

### GlobalShopCo-Headless
- Main still begins from `c3e2960961fd60ef33ddb531577173fd3ff7cb17`.
- Non-production branch `agent/chatgpt/baby-generic-tag-2026-09-14` already contained the Baby query fix: `tag:baby OR tag:baby-safety`, while Safety remained restricted to actual safety-use tags.
- Verification found one stale contract line still saying Baby maps only to `baby-safety`; that mismatch was corrected by an explicit non-production mapping override and regression fixture rather than weakening the main fail-closed contract.

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

## Executed work

### A — Baby headless category isolation
On `GlobalShopCo-Headless` branch `agent/chatgpt/baby-generic-tag-2026-09-14`:
- existing config confirmed Baby query is `tag:baby OR tag:baby-safety`;
- Safety query remains `tag:baby-safety OR tag:pet-safety OR tag:home-proofing OR tag:night-walk-visibility`;
- created `docs/storefront/BABY-CATEGORY-MAPPING-OVERRIDE-2026-09-15.md` at commit `e650203edc7472ae9f98a3c31e6b60d70841a9d4` to supersede the stale Baby mapping line in the older rendering contract until consolidation;
- created `fixtures/storefront/baby-category-isolation.json` at commit `e8950bde089c753559ee1203635971c113b97cdc`.

Fixture cases prove the intended isolation:
1. approved `baby` product → Baby true, Safety false;
2. approved `baby-safety` product → Baby true, Safety true;
3. `baby` + `qualification-draft`/`not-publication-approved` → excluded everywhere;
4. unrelated product → excluded from Baby and Safety.

No Level-2 fixture was modified. No merge/deploy occurred.

### B — Southern Pet five-SKU cost ceilings
Created `docs/catalogue/SOUTHERN_PET_OWNED_SITE_COST_CEILINGS_2026-09-15.md` at commit `61a9af4cedcddfbafbee6afff4dd5043d2023582`.

Current public supplier evidence still supports exact identities/weights and published dropship freight. Trade price remains login-gated.

Using conservative current exact-market item prices and the Batch 005 screening reserves, maximum Southern Pet item-cost ceilings for a remote-zone nationwide free-delivery model are approximately:
- `GDAG2522` Dino T-Rex: **A$11.95 ex GST** — strongest of five;
- `GDAG2505` Rabbit: **A$10.46 ex GST** — tight HOLD;
- `GDAG2515` Elephant: **A$7.41 ex GST** — weak HOLD;
- `GDAG2600` Small Duck: ~A$0.04 ex GST — reject as single-item free-delivery product;
- `GDAG2610` Large Duck: negative remote-zone ceiling — reject as single-item free-delivery product.

This reduces the authorised-account lookup priority from five prices to three: Dino first, Rabbit second, Elephant third.

### C — Eleganter `CA3044` freight ceiling
Created `docs/catalogue/ELEGANTER_CA3044_FREIGHT_CEILING_2026-09-15.md` at commit `dcb1fc9413e065d00818fb3059be3f929686418c`.

Current first-party Eleganter catalogue lists `CA3044` at A$25.95 inc GST. Current exact-market evidence is dispersed: an available single-set observation around A$44.95 exists, while lower exact anchors around A$24.95 and a two-pack equivalent near A$23.38 per set also exist.

Under the same optimistic screening assumptions:
- retail A$34.95 supports only about **A$2.71 freight** after the A$25.95 item input;
- retail A$39.95 supports about **A$6.81 freight**;
- retail A$44.95 supports about **A$10.91 freight**.

Therefore `CA3044` remains HOLD, not Shopify-draft-ready. The exact unlock is an authenticated dropship checkout-rate observation plus confirmation of account item-price/GST treatment. If true freight materially exceeds A$10.91, even the high-retail scenario fails this optimistic screen.

## Shopify disposition

No Shopify mutation was justified or performed in Batch 005.

Reason: the strongest candidates remain account-data gated and the current ceilings are not evidence of a viable actual buy cost.

## Result

Batch 005 materially reduced uncertainty without adding catalogue noise:
- Baby category semantics are now regression-fixtured and isolated from Safety;
- Southern Pet account lookup is narrowed to three prices, with two SKUs eliminated from single-item free-delivery consideration;
- `CA3044` has a precise freight/data gate instead of a generic supplier blocker.

No overall GREEN. No merge. No deployment. No supplier contact. No purchase. No credentials used.

## Successor queue

Next autonomous batch should:
1. refresh exact current market prices for the three surviving Southern Pet Duraspikes SKUs and calculate bundle/2-item economics to see whether freight dilution materially improves viability;
2. screen Southern Pet adjacent low-weight, higher-ticket products using the same freight ceiling method rather than repeating the rejected Duck economics;
3. screen Eleganter adjacent higher-retail compact Baby products where the A$25–45 retail band may support dropship freight better than `CA3044`;
4. keep Shopify at zero new drafts until actual supplier economics cross the relevant ceiling.
