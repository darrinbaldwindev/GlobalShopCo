# EBAY / AMAZON VERTICAL BATCH 013 — EVIDENCE RECONCILIATION

Date: 2026-09-18

## PURPOSE

Continue the owner-authorised high-throughput marketplace research programme toward 100 genuinely listable eBay Australia products.

This batch does not expand breadth blindly. It reconciles the Gemini / Perplexity / Grok / Claude research handoffs against primary/public sources, removes false certainty, and identifies the closest candidates to real commercial verification.

No Shopify, eBay or Amazon production mutation was authorised or performed. No supplier contact, purchase, spend, account creation, listing publication, app change, merge or deployment was performed.

## FRESH STATE

- Batch 012 PR #33 is open, draft, unmerged and currently mergeable.
- Batch 013 is stacked from Batch 012 head `87ea4a5ac05d12a88b18ca42ed3cca24ca776986`.
- Live Shopify duplicate check across the exact Batch 013 test set returned no matching existing products for:
  - `BAM-B-SR14-NT` / `9350062200575`
  - `NG23976` / `9354963014637`
  - `NG23960` / `9354963014552`
  - `3 Tier Can Rack White`
  - `Refrigerator Storage Box`

## WORKER RECONCILIATION RESULT

The combined worker research materially increased candidate breadth, but also exposed why public research cannot be accepted as verification without reconciliation.

Key conclusion:

**0 products are yet fully verified/listable.**

The strongest worker output is useful as a discovery queue, not as a final truth source.

Repeated blockers remain:

1. authenticated wholesale cost;
2. exact single-order freight to postcode 4560;
3. written eBay/Amazon marketplace permission;
4. blind-shipping / packing identity terms;
5. live supplier stock;
6. exact packed weight/dimensions where public sources conflict or omit them.

## PUBLIC EVIDENCE DEEP CHECK — 8 CANDIDATES

### 1. Artiss Bamboo Shoe Rack Shoe Bench 10 Pairs

Identity:
- SKU: `BAM-B-SR14-NT`
- GTIN: `9350062200575`
- Artiss official page confirms exact SKU, barcode and Australian stock.

Critical reconciliation:
- Worker research classified packed weight as about 1.45 kg and therefore within the preferred compact threshold.
- Public exact-product sources contradict this materially:
  - Artiss official product data exposes a 5,000 g variant weight.
  - ShoppingSmart lists shipping weight 4.5 kg and carton approximately 0.76 x 0.32 x 0.085 m.
  - Harvey Norman lists weight 5 kg.

Commercial implication:
- This is not a <=1.5 kg compact candidate.
- Public retail competition is already approximately A$41.84–55.20 in visible Australian channels.
- Regional free-delivery economics are therefore substantially weaker than the worker screen implied.

Decision: **REJECT FIRST WAVE / WORKER-DATA CORRECTION**.

Reason: exact identity is good, but freight weight and public price pressure invalidate the prior P1 classification.

### 2. Kaper Kidz Wooden Fire Engine Playset

Identity:
- SKU/model: `NG23976`
- GTIN: `9354963014637`
- Eleganter Australia and KG Electronic independently agree on the exact identity.

Public exact-product evidence:
- Eleganter lists in stock, MOQ 1, carton qty 12, dimensions about 0.268 x 0.130 x 0.118 m and weight 1.316 kg.
- KG Electronic lists shipping weight 1.320 kg and the same GTIN/model.
- Harvey Norman confirms exact GTIN/model and 12-month manufacturer warranty.

Risks:
- child/toy compliance must be evidenced, not inferred from marketing language;
- authenticated trade price remains required;
- freight to 4560 remains account/checkout dependent;
- explicit marketplace permission remains unknown.

Decision: **P1 — DEEP VERIFY**.

This is one of the cleanest exact-identity candidates found so far because product identity and public logistics data reconcile across multiple sources.

### 3. Kaper Kidz Wooden Ocean Music Set 4 Pc

Identity:
- SKU/model: `NG23960`
- Eleganter official barcode: `9354963014552`
- public weight: 0.340 kg
- dimensions approximately 0.230 x 0.160 x 0.050 m
- MOQ 1; carton qty 24; in stock at time of check.

Critical reconciliation:
- worker output supplied barcode `9354963014583` for `NG23960`.
- Eleganter's primary product page gives `9354963014552`.

Decision: **DATA-INTEGRITY HOLD → P1 AFTER ID REPAIR**.

The product itself is compact and commercially interesting, but the worker-supplied GTIN must not be propagated. Canonical source identity is required before Marketplace Connect mapping.

### 4. Soko & Co / L.T. Williams 3 Tier Can Rack White

Identity:
- Soko public SKU: `SKL0063`
- retail price observed: A$29.95
- exact dimensions: 37 x 20 x 27 cm
- powder-coated steel construction.

Critical reconciliation:
- worker output used pseudo-model `SOKO-CAN-3W`; this is not the public merchant SKU.
- Soko is a retail operation; public wholesale/dropship terms and marketplace permission remain unproven.
- standard public shipping begins at A$9.50, with regional/remote and bulky exceptions.

Decision: **P2 / SUPPLIER-PATH HOLD**.

Demand/category fit is plausible, but this cannot progress until a genuine wholesale/dropship route is proved. Retail availability is not enough.

### 5. Storage Organisers Sliding Can Organiser

Primary public evidence:
- exact product page exists;
- current public price observed A$34.81 sale / A$40.95 RRP;
- dimensions 38.3 x 25 x 8 cm;
- 30-day change-of-mind returns;
- dispatch 1–2 business days.

Critical reconciliation:
- worker output used pseudo-model `SO-CAN-SLIDE`; no public canonical supplier SKU/GTIN was established in the research.
- no public wholesale/dropship path was established.

Decision: **P2 / IDENTITY + SUPPLIER-PATH HOLD**.

Good category candidate, but not yet a valid dropship source candidate.

### 6. DropshipOnly Refrigerator Storage Box / Fridge Organiser

Primary public evidence:
- exact product page exists;
- dimensions 31.2 x 15.7 x 16 cm;
- food-grade PP construction;
- package described as 4 x 5L refrigerator storage boxes;
- no minimum quantity required;
- supplier states dispatch in 24 hours and 3–7 business days for rural Australia;
- 30-day unused/original-packaging return/refund terms.

Still missing publicly:
- canonical platform SKU/GTIN;
- packed weight;
- authenticated product cost;
- exact freight charge to 4560;
- blind-shipping identity;
- written eBay/Amazon permission.

Decision: **P1 — ACCOUNT-GATED DEEP VERIFY**.

This is stronger than a generic category idea because the exact supplier page and fulfilment model are public, but no false GREEN is permitted.

### 7. Soko & Co / Williams Ware Bamboo Kitchen Drawer Dividers 2 Pack

Primary public evidence:
- public retail price A$44.95;
- 2-pack, spring-loaded bamboo;
- expands approximately 46.5–57 cm;
- 3-year manufacturer warranty;
- public product was sold out at time of check.

Risks:
- public retail source, not yet established wholesale/dropship path;
- regional shipping is checkout dependent;
- stock unavailable at time of check;
- marketplace permission unknown.

Decision: **P2 / WATCHLIST**.

The product family remains strategically attractive, but this exact retail source is not yet a launch supply path.

### 8. Soko & Co / Williams Ware 45cm Wide Bamboo Pantry Shelf Matte Black

Primary public evidence:
- public SKU: `SKL9660`;
- price A$49.95;
- dimensions 45 x 26 x 17 cm;
- powder-coated steel + bamboo;
- in stock at time of check;
- public shipping starts A$9.50 and final shipping depends on address and weight/volume.

Risks:
- wholesale/dropship path unproved;
- packed weight not public in checked source;
- regional shipping unknown;
- marketplace permission unknown.

Decision: **P2 / SUPPLIER-PATH HOLD**.

## RECONCILED SHORTLIST

### P1 — DEEP VERIFY

1. `NG23976` — Kaper Kidz Wooden Fire Engine Playset
2. `NG23960` — Kaper Kidz Wooden Ocean Music Set 4 Pc — after GTIN repair to `9354963014552`
3. DropshipOnly Refrigerator Storage Box / Fridge Organiser — exact platform SKU/GTIN still required

### P2 — KEEP IN PIPELINE

4. Soko `SKL0063` — 3 Tier Can Rack White
5. Storage Organisers Sliding Can Organiser
6. Williams Ware Bamboo Kitchen Drawer Dividers 2 Pack
7. Soko `SKL9660` — 45cm Wide Bamboo Pantry Shelf Matte Black

### REJECT FIRST WAVE

8. Artiss `BAM-B-SR14-NT` — weight/freight reality invalidates compact-product thesis.

## IMPORTANT EVIDENCE-HYGIENE FINDINGS

1. Worker labels such as VERIFIED FACT are not inherited into the canonical pipeline.
2. Pseudo-SKUs created for convenience must never be treated as supplier SKUs.
3. GTIN discrepancies are hard holds until canonical identity is repaired.
4. Item weight and shipping/packed weight must not be conflated.
5. Retail-site presence does not prove wholesale access, dropshipping or marketplace permission.
6. Category demand does not prove exact-product demand.
7. Open catalogue scale is not the same as viable SKU scale.

## THROUGHPUT MODEL

Continue screening 10–25 candidates per batch, but use two lanes:

### Lane A — public evidence closure
High-throughput identity/spec/demand/quality checks.

### Lane B — authenticated closure
Only products that survive Lane A proceed to:
- wholesale cost;
- live stock;
- exact postcode freight;
- marketplace permission;
- blind-shipping / seller identity;
- final contribution economics.

This preserves high throughput without inventing GREEN products.

## NEXT BATCH QUEUE

Batch 014 should:

1. process a further 12–20 exact candidates from suppliers with real wholesale/dropship paths, not retail-only catalogues;
2. prioritise Eleganter/Kaper Kidz exact compact SKUs, Southern Pet dropship accessories, DropshipOnly exact product pages, and authenticated Dropshipzone/New Aim candidates;
3. reject candidates immediately where public exact weight exceeds the compact economics threshold unless ASP/differentiation clearly compensates;
4. canonicalise every SKU/GTIN against a primary source;
5. use Shopify live duplicate checks before admission;
6. keep the target at 100 listable products, but do not count any product as listable until all commercial gates close.

## CURRENT OVERALL STATUS

- Fully verified/listable: **0**
- P1 from this reconciliation batch: **3**
- P2 from this reconciliation batch: **4**
- First-wave reject from this reconciliation batch: **1**
- Overall marketplace launch state: **AMBER / NO OVERALL GREEN**
