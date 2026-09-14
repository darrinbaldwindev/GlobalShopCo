# GlobalShopCo Vertical Execution Batch

Status: ACTIVE / RESEARCH + ASSURANCE / FAIL-CLOSED
Date: 2026-09-14
Branch: `agent/ebay-amazon/vertical-batch-003`
Base head scanned: `79d50227fe19826d42c43e7dec15ce245ad58e40`

## Trigger

Per `.overseer/VERTICAL-BATCH-ADOPTION.md`, owner commands `cont`, `continue`, `continue autonomously`, and `continue autonomously vertically` trigger a full vertical cycle:

1. fresh-scan repo and active channel state;
2. select the highest-value authorised work;
3. execute the fullest safe useful batch;
4. verify exact changed state/evidence;
5. fresh-scan again;
6. replenish the next batch;
7. durably log progress and blockers.

No production Shopify writes, listing publication, purchases, supplier contact, credentials, marketplace connection changes, merge, deployment, or spend are authorised by this batch.

## Fresh-scan findings

### Repository

- Default branch `agent/overseer/initial-project-timeline` advanced from the prior observed head to `79d50227fe19826d42c43e7dec15ce245ad58e40` with the portfolio vertical-batch adoption doctrine.
- Existing eBay control remains issue #17.
- Existing Amazon control remains issue #23.
- Existing site-wide launch gate remains issue #18.
- Shopify remains the canonical product/catalogue/inventory/order authority.

### Amazon work already advanced elsewhere

Issue #23 comments record an independent non-production Amazon preflight branch `agent/chatgpt/amazon-au-preflight` with:
- evidence contract commit `26e4c02ff8ba13cf589b847d191293b7a1d46f10`;
- gate implementation head `0ecfa8578bba158fae013a8cf77d817f0717678e`;
- pure advisory `amazon-channel-gate.mjs` plus deterministic tests;
- reported 15/15 synthetic test pass;
- no real SKU declared Amazon-ready.

Do not duplicate that gate. This batch consumes its assurance state and continues product/channel evidence.

### Live Shopify read-only state observed in current Overseer session

The current catalogue remains pre-launch. Key exact research SKUs include:
- `V178-36335` — CARLA HOME 2 Tier Under-Sink Organiser — DRAFT — A$49.95 — inventory 0.
- `V178-36336` — CARLA HOME 2 Tier Adjustable Microwave Oven Rack — DRAFT — A$59.95 — inventory 0.
- `V238-SUPDZ-41319004242000` — Kitchee 3 Tier Over-Door Shower Caddy — DRAFT — A$84.95 — inventory 0.
- `V238-SUPDZ-41011690831952` — Adjustable Bamboo Bath Tray Caddy — DRAFT — A$99.00 — inventory 0.
- `FURNI-WALL-COR-WH` — Artiss 5 Tier Corner Floating Wall Shelf — DRAFT — A$39.95 — inventory 0.
- `LA-DESK-C-56-FOLD-WD` — Artiss Foldable Laptop Desk — DRAFT — A$37.95 — inventory 0.
- research-only branded candidates such as LickiMat, Kurgo, Ruffwear, Frida, Munchkin and others remain A$0/review-required drafts and are not channel-ready.

## Batch 003 mission

Convert the current evidence into a compact 5–10 SKU pilot decision matrix, separate product demand from actual reseller opportunity, re-check the marketplace integration risk, and narrow the next authenticated-data request.

## Lane A — eBay pilot candidate matrix

The strongest exact supplier-evidenced lane remains Southern Pet / GiGwi because the repo already contains exact SKUs, public stock observations, weights, freight bands and explicit marketplace-permission rules.

| SKU | Product | Supplier | Public weight / stock | eBay permission | Public economics screen | Decision |
|---|---|---|---|---|---|---|
| `GDAG2515` | GiGwi Duraspikes Elephant | Southern Pet Supplies | 0.49 kg / 20 observed | PERMISSION-REQUIRED | screen retail A$23.00; freight A$9.95 ex GST; supplier-cost ceiling A$9.60 non-Pro or A$6.22 Pro screen | P0 HOLD — strongest current GiGwi ceiling |
| `GDAG2522` | GiGwi Duraspikes Dino T-Rex | Southern Pet Supplies | 0.49 kg / 18 observed | PERMISSION-REQUIRED | retail A$20.80; freight A$9.95; ceiling A$7.73 non-Pro / A$4.64 Pro | HOLD — only viable at very low trade cost |
| `GDAG2505` | GiGwi Duraspikes Rabbit | Southern Pet Supplies | 0.49 kg / 16 observed | PERMISSION-REQUIRED | retail A$20.50; freight A$9.95; ceiling A$7.48 non-Pro / A$4.43 Pro | HOLD — only viable at very low trade cost |
| `GDAG2600` | GiGwi Crunchy Neck Plush Duck Small | Southern Pet Supplies | 0.4 kg / 55 observed | PERMISSION-REQUIRED | retail A$14.00; freight A$9.95; ceiling A$1.95 non-Pro / negative under Pro screen | REJECT standalone / possible bundle only |
| `GDAG2610` | GiGwi Crunchy Neck Plush Duck Large | Southern Pet Supplies | 0.9 kg / 107 observed | PERMISSION-REQUIRED | manufacturer-range screen A$29.95; freight A$13.95; ceiling A$11.51 non-Pro / A$7.19 Pro | HOLD — exact retail comp still insufficient |

No GiGwi SKU is eBay-ready because written marketplace approval and trade cost remain unresolved.

## Lane B — NewDeals / Dropshipzone exact Shopify candidates

| SKU | Product | Supplier path | Current Shopify draft | Marketplace permission | Commercial state |
|---|---|---|---|---|---|
| `V178-36335` | CARLA HOME 2 Tier Under-Sink Organiser | NewDeals / Dropshipzone | A$49.95 | UNKNOWN per exact supplier/SKU | HOLD — public retail already compresses headroom; authenticate trade + freight |
| `V178-36336` | CARLA HOME 2 Tier Microwave Rack | NewDeals / Dropshipzone | A$59.95 | UNKNOWN per exact supplier/SKU | HOLD — authenticate trade + freight before further work |
| `V238-SUPDZ-41319004242000` | Kitchee 3 Tier Shower Caddy | NewDeals / Dropshipzone | A$84.95 | UNKNOWN | HOLD / likely reject — syndicated identical-product competition and weak differentiation |
| `V238-SUPDZ-41011690831952` | Bamboo Bath Tray Caddy | NewDeals / Dropshipzone | A$99.00 | UNKNOWN | HOLD — exact wholesale/freight needed; public supplier-direct retail constrains resale |
| `FURNI-WALL-COR-WH` | Artiss 5 Tier Corner Shelf | NewDeals / Dropshipzone | A$39.95 | UNKNOWN | REJECT first wave — supplier-direct retail/eBay ceiling leaves insufficient headroom |
| `LA-DESK-C-56-FOLD-WD` | Artiss Foldable Laptop Desk | NewDeals / Dropshipzone | A$37.95 | UNKNOWN | REJECT first wave — public supplier-direct/eBay pricing plus quality complaints undermine margin/returns |

This lane is structurally weaker than the GiGwi lane until authenticated retailer pricing, exact postcode freight and seller-of-record/blind-shipping evidence are available.

## Lane C — premium drawer-divider opportunity

Fresh current eBay AU evidence supports a distinct premium tier:
- 6-piece adjustable dividers around A$34.99 delivered with 182 sold on one high-volume listing;
- 8-pack adjustable dividers around A$34.99 delivered;
- 9-pack adjustable dividers around A$44.99–A$51.58 delivered;
- 10-pack bamboo sets around A$51.75–A$53.99 delivered;
- 4-pack bamboo sets commonly around A$42–A$57 delivered.

Exact public benchmark `4PCS-XGB-HJG` is a four-piece adjustable bamboo model, but it is only a market benchmark, not an approved supplier SKU.

Decision:
- keep premium 4–10 pack bamboo / durable expandable dividers as P0 SOURCE-HUNT;
- reject low-value single/divider commodity race unless landed cost is exceptional;
- require an exact Australian supplier SKU before adding to the channel pilot matrix.

## Lane D — Marketplace Connect reliability gate

Official Shopify documentation states Marketplace Connect supports Amazon and eBay and can sync listings, orders and inventory.

However, the newest publicly visible Shopify App Store reviews from September 1–9, 2026 repeatedly report eBay-specific failures including:
- inventory not syncing;
- eBay connections ceasing to work;
- delayed/new listings not appearing;
- images/prices/inventory sync problems;
- stores switching to alternative providers after weeks of unresolved failures.

This corroborates the owner's earlier in-app eBay API degradation warning.

Decision:
- KEEP Marketplace Connect installed/connected; do not disconnect based on public reviews alone.
- DO NOT use current installation as proof of production reliability.
- DO NOT publish a pilot through Marketplace Connect until read-only/app-state evidence shows the eBay incident is resolved and a safe acceptance test can be run.
- Keep alternative integration research alive; do not install a second connector yet.
- Amazon support remains a separate lane: Marketplace Connect officially supports Amazon, but no live Amazon connection is verified and issue #23 remains PRE-SETUP.

## Revised P0 / P1 / HOLD / REJECT queue

### P0 — highest-value authenticated-data targets
1. Southern Pet `GDAG2515` authorised trade cost + written marketplace approval.
2. Southern Pet `GDAG2522` authorised trade cost + written marketplace approval.
3. Southern Pet `GDAG2505` authorised trade cost + written marketplace approval.
4. NewDeals/Dropshipzone exact retailer price + postcode freight for `V178-36335`.
5. NewDeals/Dropshipzone exact retailer price + postcode freight for `V178-36336`.
6. Find exact AU supplier SKU for premium 4–10 pack drawer dividers.

### P1
- compact bottle/spice/pantry organisers with differentiated A$25–60 price band;
- authorised compact pet accessories with low return risk;
- clear pantry/fridge multipacks where cubic freight remains manageable.

### HOLD
- `GDAG2610` pending exact price and trade economics;
- LickiMat pending marketplace-reseller permission and direct-brand competition assessment;
- Frida/Kurgo/Ruffwear pending authorised AU supply and marketplace terms;
- Kitchee shower caddy and bamboo bath tray pending authenticated economics.

### REJECT / DEPRIORITISE FIRST WAVE
- `GDAG2600` as standalone free-delivery SKU;
- Artiss corner shelf `FURNI-WALL-COR-WH`;
- Artiss laptop desk `LA-DESK-C-56-FOLD-WD`;
- bulky Artiss/Keezi furniture;
- commodity vacuum bags;
- generic sub-A$20 organisers without exceptional landed economics.

## Authenticated evidence now worth collecting

Only these owner/account-level values are high priority:

1. Southern Pet authorised trade price for `GDAG2515`, `GDAG2522`, `GDAG2505`, `GDAG2610`.
2. Southern Pet written eBay/Amazon marketplace approval status and seller-of-record packing terms.
3. Dropshipzone retailer price, live stock and postcode freight for `V178-36335` and `V178-36336`.
4. Exact supplier-level blind-shipping / seller-identity terms for those NewDeals/Dropshipzone SKUs.
5. Marketplace Connect current Listings / Mapping / Orders screens and any current incident banner.
6. Amazon account connection state only if/when the owner already has an authorised Seller account.

## Assurance state

- Shopify catalogue safety: AMBER — pre-launch drafts remain safely non-active.
- eBay product shortlist: AMBER — comparison-ready but permission/cost blockers remain.
- Amazon product shortlist: AMBER/PRE-SETUP — deterministic advisory gate exists elsewhere; real SKU evidence incomplete.
- Marketplace Connect eBay reliability: RED for production pilot today based on unresolved recent failure evidence; installation itself may remain in place.
- Marketplace Connect Amazon: UNKNOWN/AMBER — officially supported, live connection unverified.
- Overall programme: AMBER / NO OVERALL GREEN.

## Batch completion / next replenishment

Completed in this batch:
- fresh repo scan against new vertical doctrine;
- reconciled existing Amazon preflight work to avoid duplicate implementation;
- built a comparison-ready compact eBay pilot matrix from exact current repo evidence;
- revalidated premium drawer-divider market tier;
- rechecked current public Marketplace Connect reliability evidence;
- narrowed authenticated evidence requests to only values that can change commercial decisions.

Next full batch should:
1. fresh-scan repo and this file;
2. inspect any new authenticated supplier or Marketplace Connect evidence;
3. if none exists, expand one category only with exact AU supplier SKUs rather than generic product families;
4. calculate conservative contribution ceilings before adding a candidate to the pilot;
5. keep no more than 5–10 serious pilot SKUs in the active eBay lane;
6. preserve all UNKNOWNs and fail closed.

---

## Batch 004 continuation — exact AU source hunt

Fresh-scan state before execution:
- default branch remains `79d50227fe19826d42c43e7dec15ce245ad58e40`;
- draft PR #25 remains open/unmerged and mergeable;
- no new authenticated supplier or Marketplace Connect evidence was available in the repo;
- therefore this cycle followed the replenishment rule and expanded exactly one category with exact AU-source candidates: premium drawer dividers.

### New exact candidate 1 — CARLA HOME 4 Pack Bamboo Adjustable Kitchen Drawer Dividers

Verified public identity:
- exact SKU / catalogue number: `V178-36023`;
- brand: CARLA HOME;
- pack: 4 dividers;
- size: adjustable 44–55 cm;
- package dimensions: approximately 10 × 56 × 7 cm;
- package weight: approximately 1.3 kg;
- current Bunnings Marketplace retail observation: A$44.95 delivered, sold and delivered by Wilson Trading Import Pty Ltd;
- other current Australian retail observations span about A$54.99–A$66.99;
- current exact-title eBay observations are materially higher at roughly A$56.99 and above, with some branded listings around A$86–A$92 and no evidence here that those higher asks represent healthy sell-through.

Commercial interpretation:
- this is now an exact AU-market candidate, not merely a generic product-family hypothesis;
- the Bunnings A$44.95 delivered benchmark is the key conservative retail-pressure signal;
- do not use the A$86–A$92 eBay asks as the base price without sold evidence;
- marketplace permission, authenticated Dropshipzone/NewDeals trade price, exact postcode freight and seller-of-record/blind-shipping terms remain UNKNOWN;
- provisional eBay classification: `HOLD / P0 AUTHENTICATED-ECONOMICS TARGET`.

Conservative Pro-fee screening at an exact-title eBay price of A$56.99, using 13.4% + A$0.30 seller-fee screen and 15% contribution reserve:
- combined product-cost + outbound-freight ceiling ≈ A$40.50 before returns, integration cost, advertising, support and GST reconciliation;
- this is a SCREENING CEILING only, not an approved margin;
- because Bunnings sells the exact item at A$44.95 delivered, real sustainable marketplace pricing may need to be materially below A$56.99, so acceptable landed cost should be lower than A$40.50.

### New exact candidate 2 — CARLA HOME 8 Pack Bamboo Adjustable Kitchen Drawer Dividers

Verified public identity:
- exact SKU / MPN: `V178-36045`;
- EAN/UPC: `0705514360458`;
- brand: CARLA HOME;
- pack: 8 dividers;
- package dimensions: approximately 9 × 60 × 16 cm;
- package weight: approximately 2.5 kg;
- current Australian public retail observations around A$96.75–A$103.60;
- exact eBay listing observed at A$111.00 from an Australian seller with 95.3% positive feedback and no returns accepted.

Commercial interpretation:
- exact SKU identity and Australian retail/eBay presence are now verified;
- the 2.5 kg packed weight materially weakens the free-delivery advantage relative to the 4-pack;
- higher selling price creates more gross-dollar headroom, but exact supplier freight becomes more important;
- no sold-count evidence found in this cycle that justifies treating A$111 as proven demand;
- provisional classification: `HOLD / SECONDARY`, behind `V178-36023` until authenticated cost/freight arrives.

### New exact market evidence — CARLA HOME pantry organiser

The existing archived Shopify SKU `V178-36126` now has stronger exact-product retail pressure evidence:
- Bunnings Marketplace: A$49.95 delivered, seller Wilson Trading Import Pty Ltd;
- Harvey Norman Customer Direct: A$46 with delivery promotion, product reference `36126-WT`;
- NewDeals public retail has also shown this family around A$49.99 delivered.

This confirms the former Shopify A$69.95 draft was not marketplace-competitive without a much lower authenticated trade cost. Keep `V178-36126` out of the first-wave eBay pilot unless trade price + freight supports a substantially lower retail position.

### Supplier-ecosystem evidence tightened

Dropshipzone public category pages continue to expose product breadth while keeping the decision-critical fields behind authenticated retailer login:
- price;
- stock level;
- supplier performance;
- shipping.

Dropshipzone public FAQ separately confirms AU suppliers must hold physical Australian inventory, be GST registered and provide a 12-month warranty, but this does not by itself prove marketplace permission, blind shipping or exact SKU economics.

### Batch 004 pilot ranking change

Active eBay pilot/research queue is now capped to serious exact candidates:
1. `GDAG2515` — Southern Pet / GiGwi Elephant — HOLD, strongest permission-required pet candidate.
2. `V178-36023` — CARLA HOME 4-pack bamboo dividers — NEW P0 HOLD, exact SKU now verified.
3. `GDAG2522` — Southern Pet / GiGwi Dino — HOLD.
4. `GDAG2505` — Southern Pet / GiGwi Rabbit — HOLD.
5. `V178-36335` — CARLA HOME under-sink organiser — HOLD.
6. `V178-36336` — CARLA HOME microwave rack — HOLD.
7. `V178-36045` — CARLA HOME 8-pack bamboo dividers — HOLD / secondary due 2.5 kg freight.
8. `GDAG2610` — GiGwi Large Duck — HOLD pending exact comp/economics.

Removed from active first-wave pilot:
- `GDAG2600` standalone;
- `V178-36126` over-door pantry organiser unless authenticated trade economics strongly overturn current public retail pressure;
- Artiss corner shelf;
- Artiss laptop desk;
- bulky storage/furniture candidates.

### Batch 004 next authenticated-data request

Highest-value exact values now are:
1. Dropshipzone/NewDeals authenticated retailer cost + live stock + postcode freight for `V178-36023`.
2. Same for `V178-36045`.
3. Same for `V178-36335` and `V178-36336`.
4. Supplier-specific marketplace permission / blind-shipping / packing-identity terms for those four SKUs.
5. Southern Pet trade price + marketplace approval for `GDAG2515`, `GDAG2522`, `GDAG2505`.
6. Marketplace Connect current incident / Listings / Mapping / Orders state before any pilot acceptance test.

### Batch 004 assurance state

- Premium drawer-divider family: AMBER+, because exact supplier-family SKUs are now identified; economics still locked.
- `V178-36023`: AMBER / P0 HOLD.
- `V178-36045`: AMBER / HOLD-secondary.
- `V178-36126`: RED/HOLD for first-wave eBay unless authenticated economics overturn retail compression.
- Southern Pet compact GiGwi: AMBER / PERMISSION-REQUIRED.
- Marketplace Connect eBay pilot: RED/HOLD until reliability and incident state clear.
- Overall programme: AMBER / NO OVERALL GREEN.

### Replenished next cycle

Next autonomous cycle should:
1. fresh-scan repo and exact branch head;
2. inspect any authenticated supplier/app evidence first;
3. if none exists, source-hunt one additional exact compact Home/Kitchen SKU family only;
4. prefer exact SKUs with package weight under ~1.5 kg and current Australian retail above ~A$35;
5. calculate conservative landed-cost ceilings before admission to the active 5–10 SKU pilot;
6. keep the active pilot capped and remove weaker candidates rather than continuously expanding it.
