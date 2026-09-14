# GlobalShopCo Vertical Execution Batch — 2026-09-14 — Batch 004

Status: ACTIVE / NON-PRODUCTION
Branch: `agent/chatgpt/headless-niche-fill-2026-09-13`
Starting branch head: `cbdd3c2d594718fe3e438ca2a81646f4d354dc87`

## Fresh scan

### GlobalShopCo
- Default line remains at `79d50227fe19826d42c43e7dec15ce245ad58e40`.
- Active niche-fill branch begins Batch 004 at `cbdd3c2d594718fe3e438ca2a81646f4d354dc87`.
- Batch 003 cleaned Home Organisation and Mobile & Computer Accessories back to zero surviving commercial drafts after exact-market erosion checks.
- Pet and Baby therefore remain the highest-value product-rich niches, with acquisition/freight economics as the principal blocker.

### GlobalShopCo-Headless
- Main remains at `c3e2960961fd60ef33ddb531577173fd3ff7cb17`.
- `/baby/` still uses `shopify_query: 'tag:baby-safety'` while Baby assortment includes feeding, bath/care, travel, nursery and ordinary early-development products.
- This is a semantic contract defect: ordinary Baby products would either be omitted or incorrectly tagged as safety products.

## Batch objective

1. Repair Baby category inclusion semantics in the headless config without widening the Safety category.
2. Rank Pet/Baby supplier/account unlocks by immediate SKU-decision value so owner-authorised onboarding can be sequenced efficiently.
3. Preserve fail-closed publication and economics gates.

## Task stack

### A — Baby generic-tag headless contract fix
On a separate non-production GlobalShopCo-Headless branch:
- change Baby query to `tag:baby OR tag:baby-safety`;
- leave Safety query unchanged;
- document that `baby-safety` is only for real safety-use products;
- do not deploy or merge.

### B — Pet/Baby commercial unlock ranking
Rank supplier/account data requests by:
- number of candidate SKUs immediately decidable;
- evidence already available publicly;
- freight clarity;
- assortment breadth;
- likely operational fit with owned-site dropshipping;
- compliance/returns complexity.

### C — Exact owner data packet
For the top-ranked supplier lanes, define the exact minimum data needed to convert HOLD candidates into PASS/REJECT decisions without another broad discovery cycle.

### D — Shopify mutation gate
Create no new qualification DRAFT merely because a product is attractive. Require credible acquisition cost + freight + exact-market evidence first.

## Hard boundaries
- No ACTIVE publication.
- No merge/deploy.
- No supplier contact, account application, purchase or credential change.
- No invented wholesale cost, freight, margin, permission or compliance.
- Do not weaken headless fail-closed filters.
- Do not mutate Level-2 fixture state.
