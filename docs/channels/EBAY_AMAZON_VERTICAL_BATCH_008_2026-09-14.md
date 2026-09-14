# GlobalShopCo eBay/Amazon Vertical Batch 008 — Shelf / Pull-Out Organiser Source Hunt

Status: RESEARCH + ASSURANCE / FAIL-CLOSED
Date: 2026-09-14
Branch: `agent/ebay-amazon/vertical-batch-008`
Base: Batch 007 head `5a28d996d79efe7903ff08ba4ce9c2e5a9e406a5`

## Fresh-scan state

- Draft PR #28 is still open, unmerged, draft and mergeable.
- No new authenticated supplier price/freight or Marketplace Connect incident evidence was available before execution.
- Shopify live read-only search found no existing product matching `Expandable Cabinet Shelf`, SKU `36221`, or `V178-36221`; no duplicate catalogue entry was created.
- Existing eight-SKU eBay pilot remains capped. Batch 008 may only displace a candidate if a new exact SKU has stronger evidence and economics.

## Batch mission

Per the replenished queue from Batch 007, source-hunt exactly one non-glass compact Home/Kitchen organiser family: expandable shelf / pull-out cabinet organisers. Require exact AU marketplace identity, current public retail pressure, packed-weight evidence, contribution screening, and catalogue-data integrity before pilot admission.

## Candidate A — CARLA HOME Expandable Cabinet Shelf Organiser, 18 cm White

Public AU identity:
- BIG W article: `9901766020`;
- brand: CARLA Home;
- title: `Expandable Cabinet Shelf Organizers, 18 cm (White)`;
- expandable shelf range: 36–60 cm;
- item dimensions: about 36 × 20.5 × 18 cm;
- package dimensions: about 39 × 23 × 7 cm;
- item/package weight: about 1.7 kg;
- quoted load capacity: up to 10 kg;
- current BIG W marketplace ask observed around A$127.95–138.95, sold by CARLA Home.

Marketplace pressure:
- current eBay AU expandable cabinet-shelf listings span roughly A$28.90–60.23 for generic adjustable metal/stackable organisers;
- representative current asks include about A$46.43, A$50.39, A$51.03, A$59.46 and A$60.23;
- higher A$87–100 asks exist but lack evidence here of healthy sell-through.

Conservative screen:
- use A$49.95 as a credible first-pass eBay retail screen rather than CARLA Home's A$127+ direct-marketplace ask;
- using existing Pro-fee screen of 13.4% + A$0.30 and 15% contribution reserve, maximum combined supplier cost + outbound freight ≈ A$35.46 before returns, integration, support, advertising and GST reconciliation.

Decision:
- `REJECT FIRST WAVE / RESEARCH HOLD`.
- Reason: 1.7 kg exceeds the preferred ≤1.5 kg target, direct-brand retail is implausibly far above current eBay competition, and the credible eBay price leaves limited room for free-delivery economics.
- Do not add to Shopify or active pilot without authenticated trade cost/freight showing exceptional economics.

## Candidate B — CARLA HOME 2 Pack Pull Out Cabinet Organiser Expandable Drawers

Public AU identity:
- CARLA Home product path / model: `36221`;
- Kogan marketplace identifier: `CAH-36221`;
- EAN: `8424345828181`;
- pack quantity: 2;
- width expands from 32 to 52 cm;
- each drawer approximately 52 × 42 × 8 cm;
- material: heavy-duty metal/carbon steel;
- CARLA Home direct price: A$79.95 with free shipping signal;
- Kogan carries the same exact identified product, sold by Carla Home.

Critical data-integrity conflict:
- CARLA Home's own product page says each drawer weighs 1.5 kg and the entire package weighs about 4 kg;
- Kogan's syndicated exact-product listing says item weight 1.5 kg and package weight 1.5 kg;
- both cannot be true for the same exact 2-pack.

Marketplace pressure:
- current eBay AU under-sink/pull-out cabinet organisers include exact-adjacent 2-pack products around A$46–57 delivered, plus many generic alternatives around A$30–56;
- this compresses CARLA Home's A$79.95 direct price as an eBay benchmark.

Conservative screen:
- use A$56.95 as a generous current-market retail screen for a 2-pack pull-out organiser;
- at the same fee/reserve model, maximum combined supplier cost + outbound freight ≈ A$40.48 before unresolved operating costs;
- if package weight is actually about 4 kg, outbound freight can consume a large share of that ceiling.

Decision:
- `RED / DATA-INTEGRITY HOLD / REJECT FIRST WAVE`.
- The unresolved 1.5 kg vs ~4 kg package-weight contradiction independently fails publication assurance.
- Even after data repair, the product must beat a tight ~A$40.48 product+freight ceiling at an eBay-credible price before consideration.

## Family conclusion

Expandable shelf and pull-out organiser demand is plausible, but this batch did not find a candidate strong enough to displace the existing eight-SKU pilot.

Rules reinforced:
1. Supplier-direct marketplace asks are not accepted as sustainable resale prices when eBay comparables are materially lower.
2. Exact packed weight must be reconciled across supplier-syndicated feeds before freight modelling or publication.
3. A contradictory core attribute is a hard fail-closed gate even when product demand looks attractive.
4. Prefer future organisers at ≤1.5 kg packed and with current credible AU marketplace price ≥A$35 where supplier-direct competition does not already dominate.

## Active pilot impact

No change to the existing eight-SKU active eBay pilot.

New research states:
- BIG W `9901766020` expandable 18 cm shelf: `REJECT FIRST WAVE / HOLD`.
- CARLA Home/Kogan `36221` / `CAH-36221` / EAN `8424345828181`: `RED / DATA-INTEGRITY HOLD`.

## Authenticated evidence still worth collecting first

1. Dropshipzone/NewDeals trade cost + Bli Bli / representative metro-regional freight for `V178-36023`, `V178-36045`, `V178-36335`, `V178-36336`.
2. Supplier-specific blind-shipping / seller-identity / marketplace-permission terms for those exact SKUs.
3. Southern Pet trade cost + written eBay/Amazon permission for `GDAG2515`, `GDAG2522`, `GDAG2505`.
4. Marketplace Connect current incident banner plus Listings / Mapping / Orders state.

## Assurance state

- Batch 008 family: RED/HOLD first wave.
- Active eBay pilot: AMBER, unchanged.
- Marketplace Connect production pilot: RED/HOLD until reliability evidence clears.
- Overall programme: AMBER / NO OVERALL GREEN.

## Next replenishment

If authenticated supplier/app evidence is still absent on the next owner `cont`, source-hunt exactly one compact Home/Kitchen family that is materially different from CARLA Home's heavily syndicated marketplace catalogue. Preference order:
1. branded or differentiated pantry/cabinet organiser with AU stock;
2. package weight ≤1.5 kg;
3. credible AU/eBay retail ≥A$35;
4. clean exact SKU/GTIN and non-contradictory package data;
5. supplier-direct marketplace price that does not already eliminate reseller headroom.
