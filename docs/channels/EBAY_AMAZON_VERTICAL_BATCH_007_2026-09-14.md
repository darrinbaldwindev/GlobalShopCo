# GlobalShopCo eBay/Amazon Vertical Batch 007 — Rotating organiser source hunt

Status: RESEARCH / ASSURANCE / FAIL-CLOSED
Date: 2026-09-14
Base: Batch 006 head `2809177a8e6fe0f3adcbdda53eaa4ed617d073e7`
Control: eBay issue #17 / Amazon issue #23

## Fresh-scan state

- Canonical/default repository head remains `79d50227fe19826d42c43e7dec15ce245ad58e40` (`docs: adopt portfolio vertical batch execution doctrine`).
- Batch 006 remains a stacked draft research branch/PR; no merge occurred.
- No new authenticated supplier cost, freight, supplier-permission, Marketplace Connect incident, listing, mapping or order evidence was found before this cycle.
- Per replenishment rule, this batch source-hunts one compact Home/Kitchen family only and does not broaden categories.
- Shopify remains canonical. No production writes, publication, supplier contact, purchase, credential, marketplace-setting, merge or deployment action is authorised.

## Family selected

Rotating countertop spice organisers / compact lazy-Susan-adjacent kitchen organisers.

Selection rationale:
- compact footprint;
- current Australian retail presence;
- potential A$35–A$55 delivered price band;
- differentiated utility relative to generic flat organisers;
- but glass-content breakage, packed weight and source-feed consistency must pass before pilot admission.

## Exact candidate A — CARLA HOME rotating spice rack, 12-glass-jar title / 2 kg pack

Verified public marketplace identifiers:
- Bunnings Marketplace I/N `0939829`;
- BIG W article `9901430085`;
- seller/fulfiller shown publicly: Wilson Trading Import Pty Ltd / CARLA HOME;
- current Bunnings and BIG W retail: A$44.95 delivered/online-only;
- item dimensions about 25 × 20 × 20 cm;
- package dimensions about 27 × 21 × 21 cm;
- package weight about 2 kg.

### Data-integrity finding

The public product title says 12 glass jars, but public descriptive copy on the same marketplace pages also refers to 20 premium glass jars while later text again says 12 refillable jars. This is a material source-feed inconsistency.

Assurance consequence:
- exact supplier SKU / GTIN is not publicly verified in this cycle;
- jar count cannot be considered deterministic from public feed text;
- listing publication would risk title/spec mismatch and customer-return exposure;
- therefore this product cannot enter the eBay/Amazon pilot even if margin later appears adequate until canonical supplier attributes are resolved.

### Conservative eBay screen

Use public delivered retail A$44.95 rather than higher speculative marketplace asks.

Existing conservative Pro screening model:
- seller fee screen: 13.4% + A$0.30;
- contribution reserve: 15% of sale price;
- combined supplier-cost + outbound-freight ceiling ≈ A$31.88 before returns, integration, advertising, support and GST reconciliation.

Because this is a 2 kg glass-containing product, the real acceptable supplier + freight number should be materially below A$31.88.

Decision: **REJECT FIRST-WAVE / HOLD FOR DATA REPAIR**.

## Exact candidate B — CARLA HOME rotating spice rack, 12-glass-jar title / 1 kg pack

Verified public marketplace identifier:
- Bunnings Marketplace I/N `0939840`;
- current delivered retail A$34.95;
- item dimensions about 15 × 30 × 15 cm;
- package dimensions about 30 × 15 × 15 cm;
- package weight about 1 kg.

### Data-integrity finding

The page title identifies a 12-jar product, while top-level promotional text refers to 16 refillable glass jars and the detailed feature section returns to 12 jars. This is a second independent public feed inconsistency within the same CARLA HOME rotating-spice family.

Commercial interpretation:
- the lighter 1 kg pack is structurally better for free-delivery economics than candidate A;
- however current retail at A$34.95 sharply limits available margin;
- exact supplier SKU / EAN remains UNKNOWN publicly;
- catalogue ambiguity increases wrong-item/returns risk.

Conservative Pro screening at A$34.95:
- combined supplier-cost + outbound-freight ceiling ≈ A$24.72 before returns, integration, advertising, support and GST reconciliation.

Decision: **HOLD / LIKELY REJECT FIRST-WAVE** unless authenticated source data proves an unusually low trade + freight cost and deterministic product attributes.

## Market pressure check

Current eBay AU evidence shows rotating spice-rack competition already exists across branded and generic products. A 20-jar stainless rotating organiser is listed at A$108.95 from a large seller, but that listing is China-located and does not establish a sustainable Australian same-SKU price. Generic rotating spice racks also compete at much lower price points in AU retail channels.

Conclusion:
- do not anchor GlobalShopCo pricing to high unsupported eBay asks;
- use credible Australian supplier-direct/major-retailer delivered prices as the fail-closed ceiling;
- demand is plausible, but reseller opportunity is not yet proven.

## Supplier-direct competition finding

CARLA HOME is publicly presented as a brand of Wilson Trading Import Pty Ltd, and Wilson Trading is the seller/deliverer on major Australian marketplace listings. That means GlobalShopCo may be reselling against the brand owner/supplier's own retail offers.

Implication:
- a product can have good retail demand and still be a poor reseller opportunity;
- supplier-direct marketplace competition must remain a mandatory gate for every NewDeals/Dropshipzone/CARLA HOME SKU.

## Pilot impact

No rotating-spice SKU is admitted to the active first-wave eBay pilot.

The capped serious pilot remains unchanged from Batch 006:
1. `GDAG2515` — GiGwi Duraspikes Elephant — HOLD / permission-required.
2. `V178-36023` — CARLA HOME 4-pack bamboo drawer dividers — P0 HOLD.
3. `GDAG2522` — GiGwi Duraspikes Dino T-Rex — HOLD.
4. `GDAG2505` — GiGwi Duraspikes Rabbit — HOLD.
5. `V178-36335` — CARLA HOME under-sink organiser — HOLD.
6. `V178-36336` — CARLA HOME microwave rack — HOLD.
7. `V178-36045` — CARLA HOME 8-pack bamboo dividers — HOLD / secondary.
8. `GDAG2610` — GiGwi Crunchy Neck Duck Large — HOLD.

## New governance rule from Batch 007

For supplier-syndicated products, fail closed when the same public product feed contains contradictory core attributes such as pack count, size, weight, model or included components.

A candidate requires deterministic canonical source attributes before marketplace publication, even if price and demand pass.

## Authenticated evidence worth collecting

Highest-value values remain:
1. Dropshipzone/NewDeals authenticated retailer cost + stock + postcode freight for `V178-36023`, `V178-36045`, `V178-36335`, `V178-36336`.
2. Supplier-specific marketplace permission / blind-shipping / seller-identity terms for those four SKUs.
3. Southern Pet trade cost + written eBay/Amazon approval for `GDAG2515`, `GDAG2522`, `GDAG2505`.
4. Marketplace Connect Listings / Mapping / Orders state and current incident status.
5. For rotating-spice products only if revisited: exact supplier SKU/GTIN and canonical jar-count/specification source.

## Assurance state

- Rotating spice organiser family: **RED/HOLD first wave** due catalogue inconsistency + glass/weight + supplier-direct competition.
- CARLA HOME data-feed consistency: **RED for these exact public records until canonical attributes are reconciled**.
- Active eBay pilot: **AMBER**, unchanged; no SKU eBay-ready.
- Amazon lane: **AMBER/PRE-SETUP**, unchanged; no SKU Amazon-ready.
- Marketplace Connect eBay production pilot: **RED/HOLD** pending reliability evidence.
- Overall programme: **AMBER / NO OVERALL GREEN**.

## Replenished next autonomous cycle

If no authenticated evidence arrives, source-hunt exactly one additional compact Home/Kitchen family with these preferred gates:
- exact AU supplier SKU/GTIN visible;
- deterministic public attributes across retailers;
- packed weight <=1.5 kg where possible;
- current credible AU delivered retail >=A$35;
- no obvious supplier-direct price compression;
- low breakage and low compatibility risk.

Recommended next family: compact pantry riser / expandable shelf or non-glass lazy Susan, not another glass spice rack.
