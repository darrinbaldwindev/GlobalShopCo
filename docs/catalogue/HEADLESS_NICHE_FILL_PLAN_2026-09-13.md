# GlobalShopCo — Headless Niche Catalogue Fill Plan — 2026-09-13

Status: ACTIVE RESEARCH / NON-PRODUCTION

## Purpose

Create a dedicated catalogue-fill lane for the product categories that already have implementation-ready headless storefront routes in `GlobalShopCo-Headless`.

Shopify remains the sole product/variant/price/inventory/cart/checkout/order authority. The headless sites are presentation/merchandising layers only.

No product becomes ACTIVE from this plan alone. Publication still requires current commercial approval, safe current price/stock, supplier evidence, free-delivery economics, returns/compliance checks and any category-specific gates.

## Canonical headless product categories

Current `GlobalShopCo-Headless` priority product routes:

1. Home Organisation
2. Pet
3. Baby
4. Safety
5. Mobile & Computer Accessories

Marketplace routes (`Shopify to eBay`, `Shopify to Amazon`) are channel views and are not independent catalogue-fill targets.

## Current Shopify assortment audit

### Home Organisation

Current state: MOST ADVANCED.

Commercial test drafts exist, including:
- Kitchee 3 Tier Over-Door Shower Caddy — `V238-SUPDZ-41319004242000`
- Adjustable Bamboo Bath Tray Caddy — `V238-SUPDZ-41011690831952`
- Artiss 5 Tier Corner Floating Wall Shelf — `FURNI-WALL-COR-WH`
- CARLA HOME 2 Tier Under-Sink Organiser — `V178-36335`
- CARLA HOME 2 Tier Adjustable Microwave Oven Rack — `V178-36336`

Weak candidates have already been archived. Continue exact competitor/economics validation rather than padding the category.

### Pet

Current state: LARGE RESEARCH SEED / ZERO OWNED-SITE COMMERCIAL APPROVAL.

Existing Shopify records are mostly A$0 `review-required` placeholders and therefore must not render on the headless site.

Strongest current owned-site research lane: Southern Pet Supplies.

Public evidence currently exists for exact SKU, listed weight, stock observation and freight bands for:
- `GDAG2522` — GiGwi Duraspikes Dino T-Rex
- `GDAG2515` — GiGwi Duraspikes Elephant
- `GDAG2505` — GiGwi Duraspikes Rabbit
- `GDAG2600` — GiGwi Crunchy Neck Plush Duck Small
- `GDAG2610` — GiGwi Crunchy Neck Plush Duck Large

Trade buy cost is still login/account gated and therefore UNKNOWN. The Southern Pet marketplace restriction affects marketplace fulfilment; do not infer that the owned Shopify/headless channel is approved or disapproved without checking the supplier's ordinary dropship/customer terms.

Pet fill target before headless commercial launch: 10 defensible owned-site candidates across at least four subcategories, with at least 5 fully economically qualified.

Preferred first Pet subcategories:
- Toys & Enrichment
- Feeding & Hydration
- Walking & Travel
- Pet Storage
- Home & Cleanup
- Safety & Visibility

Avoid first-wave ingestibles, medications, high-return electronics and unsupported safety/performance claims.

### Baby

Current state: RESEARCH PLACEHOLDERS ONLY.

Existing Shopify records such as Munchkin Miracle 360 Trainer Cup, Frida Baby rinser, Skip Hop portable changing station, Safety 1st magnetic locks and baby gates remain A$0 review records, not sale-ready products.

Promising supplier lane: 3 Little Crowns / other Australian baby wholesalers and dropship suppliers with explicit domestic fulfilment and usable product data.

Baby fill target before headless commercial launch: 10 defensible candidates across at least four subcategories, with at least 5 fully economically qualified and category-specific safety/compliance evidence where applicable.

Preferred first Baby subcategories:
- Feeding
- Bath & Care
- Travel & Portable Care
- Nursery organisation
- Home organisation

Defer powered monitors, sleep-positioning products and high-liability products until electrical/regulatory/claim evidence is explicit.

### Safety

Current state: RESEARCH PLACEHOLDERS ONLY; highest verification burden.

Safety overlaps Baby and Pet. A product may legitimately appear in more than one headless vertical, but Shopify identity must remain singular.

Preferred first Safety subcategories:
- Baby Proofing
- Pet Travel Safety
- Home Containment
- Night Visibility

Monitoring & Alerts should follow only when electrical/radio/compliance evidence is complete.

Safety fill target: start with low-complexity physical products whose claims can be evidenced. Require exact Australian compliance/standards evidence where a standard is material; ANSI/ASTM/EN references must not be presented as AS/NZS compliance.

### Mobile & Computer Accessories

Current state: ONE strong commercial test draft.

Current strongest candidate:
- `LA-DESK-C-56-FOLD-WD` — Artiss Foldable Laptop Desk Bed Table — Oak

NewDeals public pricing proved heavily compressed for many commodity electronics. Do not fill the category with near-retail supplier pricing.

Mobile/Computer fill target: 8–10 candidates, favouring passive low-compliance accessories first.

Preferred first subcategories:
- Laptop Desks & Stands
- Desk Organisation
- Device Protection
- Travel Accessories

Defer Charging & Power and powered connectivity products until electrical/compliance economics are materially stronger.

## Fill sequence

### Wave 1 — Pet

Why first:
- explicit headless priority;
- strongest market evidence in current repo;
- substantial existing research;
- current Southern Pet work already provides exact SKU/stock/freight evidence;
- broad editorial/subcategory depth.

Immediate tasks:
1. Reuse the Southern Pet exact-SKU evidence for owned-site screening.
2. Verify ordinary dropship/owned-site permission separately from marketplace permission.
3. Obtain or evidence trade buy cost when authorised/account data becomes available.
4. Screen landed free-delivery economics against exact current Australian retail comps.
5. Create Shopify DRAFT qualification records only for candidates that survive initial economics.
6. Expand beyond plush toys into feeding, storage, travel and cleanup to avoid a one-subcategory site.

### Wave 2 — Baby

1. Verify 3 Little Crowns dropship mechanics and exact acquisition economics.
2. Prefer low-liability bath, feeding, changing/travel and organisation products.
3. Build 10-candidate screen; require compliance evidence where material.
4. Create only controlled Shopify DRAFT qualification records.

### Wave 3 — Safety

1. Reuse cross-vertical Baby/Pet products where appropriate.
2. Add specialist low-complexity home-proofing/visibility products.
3. Keep standards/claims fail-closed.

### Wave 4 — Mobile & Computer Accessories

Continue supplier diversification rather than further NewDeals commodity-electronics screening.

### Parallel — Home Organisation

Finish the remaining commercial validation on existing surviving drafts and replace failures only when needed.

## Product qualification minimum evidence

Before a new headless-niche Shopify DRAFT is treated as a serious commercial candidate, record:

- exact product title;
- exact SKU/model/barcode where available;
- supplier identity and first-party source;
- ordinary dropship/fulfilment eligibility;
- Australian stock/dispatch evidence;
- supplier buy/input cost or explicit UNKNOWN;
- freight/free-delivery evidence;
- exact current market comparisons;
- proposed owned-site retail price;
- gross/contribution screen;
- returns/warranty terms;
- relevant compliance/claim evidence;
- headless category/subcategory fit;
- risks/UNKNOWNs;
- evidence date.

Never use supplier RRP/compare-at price as substitute for exact market evidence.

## Shopify draft tagging convention

For new controlled qualification drafts, use category tags compatible with headless queries plus evidence-state tags. Examples:

- `pet`
- `baby-safety` when genuinely appropriate to Baby/Safety
- `pet-safety` when genuinely appropriate to Pet/Safety
- `home-proofing`
- `night-walk-visibility`
- `mobile-computer-accessories`
- `supplier:<supplier>`
- `qualification-draft`
- `not-publication-approved`
- `price-recheck-required`
- `exact-competitor-verified` only when actually verified
- `free-delivery-evidence` only when supported

Do not use a broad safety tag merely to increase cross-site exposure.

## Headless readiness target

A niche should be considered commercially useful for first launch when it has:

- at least 5 fully qualified products;
- preferably 10+ defensible products across multiple subcategories;
- no A$0/research placeholders exposed;
- current prices and stock safe to display;
- coherent editorial/category depth;
- at least one plausible bundle/cross-sell path;
- enough assortment to make the niche site useful rather than a thin landing page.

## Immediate disposition

1. PET — START FILL NOW.
2. BABY — NEXT.
3. SAFETY — BUILD FROM CROSS-VERTICAL + SPECIALIST PRODUCTS.
4. MOBILE & COMPUTER — CONTINUE SUPPLIER DIVERSIFICATION.
5. HOME ORGANISATION — CONTINUE VALIDATION / REPLACEMENT, NOT BLIND SCALE.

No ACTIVE publication, supplier contact, purchase, credentials, production deployment or marketplace publication is authorised by this document.
