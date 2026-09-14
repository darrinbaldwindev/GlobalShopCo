# GlobalShopCo Vertical Batch 005 — Compact Kitchen Exact-SKU Source Hunt

Status: RESEARCH + ASSURANCE / FAIL-CLOSED
Date: 2026-09-14
Parent control: `.overseer/batches/VERTICAL-EXECUTION-BATCH.md`
Base branch observed before execution: `agent/overseer/initial-project-timeline` @ `79d50227fe19826d42c43e7dec15ce245ad58e40`

## Trigger and scope

Owner command `continue autonomously` triggered the full vertical cycle.

No new authenticated supplier pricing, Marketplace Connect state, or supplier permission evidence was available in the repo. Per the replenishment rule, this batch expanded exactly one additional compact Home/Kitchen family using exact Australian-market SKUs rather than generic product concepts.

Family selected: **compact spice / countertop organisers**.

No production Shopify write, listing publication, marketplace mutation, purchase, supplier contact, credential change, merge, deployment, or spend occurred.

## Fresh state checks

- Default GlobalShopCo branch remains `79d50227fe19826d42c43e7dec15ce245ad58e40`.
- Existing canonical vertical batch branch remains unmerged.
- Live Shopify read-only search confirmed neither `V178-36110` nor `V178-36219` currently exists in the Shopify catalogue. They are research/source candidates only.
- Existing active eBay pilot remains capped; new candidates must displace weaker rows rather than expand the pilot indefinitely.

## Exact candidate A — CARLA HOME 3-Tier Detachable Spice Rack Organiser

Identity and package evidence:
- supplier-family SKU: `V178-36110` / public catalogue SKU `36110`;
- brand: CARLA HOME;
- item dimensions: approximately 32 × 38 × 18 cm;
- package dimensions: approximately 39 × 22 × 14 cm;
- package weight: approximately 1.0 kg;
- steel construction, detachable 3-tier / 2-tier configuration;
- public warranty signal: 12 months.

Current Australian public price pressure:
- Mytopia: A$39.95 observed, RRP A$54.95, currently shown out of stock at crawl time;
- BIG W Marketplace: A$44.95, sold/shipped by CARLA Home;
- Harvey Norman Customer Direct: A$47, supplier-delivered;
- Kogan category result has shown this exact-title product around A$37.95.

Public source URLs:
- https://www.mytopia.com.au/carla-home-3-tier-detachable-spice-rack-organiser-black
- https://www.bigw.com.au/product/carla-home-3-tier-detachable-spice-rack-storage-organiser-for-kitchen-countertop/p/9900933227
- https://www.harveynorman.com.au/carla-home-3-tier-detachable-storage-organiser-spice-rack-for-kitchen-countertop-black.html

Commercial screen:
- conservative sustainable marketplace price should not assume a premium above direct CARLA HOME marketplace retail without sold evidence;
- using A$39.95 as a conservative price anchor and the existing Pro screening model (13.4% seller fee + A$0.30 order screen + 15% contribution reserve), maximum combined product-cost + outbound-freight ceiling is approximately **A$28.30** before returns, integration cost, ads, support, and GST reconciliation;
- using A$44.95 only as an upper public-retail anchor gives approximately **A$31.88** combined product-cost + outbound-freight ceiling under the same screen;
- authenticated retailer cost, exact postcode freight, marketplace permission, blind-shipping / seller identity, live stock, and eBay sold evidence remain UNKNOWN.

Decision: **HOLD / SECONDARY SOURCE-HUNT**.

Reason: package weight is favourable, but direct brand/supplier marketplace retail around A$38–45 materially compresses resale room. It should not displace stronger candidates unless authenticated Dropshipzone/NewDeals economics are unusually favourable.

## Exact candidate B — CARLA HOME 2-Tier Wooden Kitchen Countertop Spice Rack

Identity and package evidence:
- exact MPN / supplier-family SKU: `V178-36219`;
- public catalogue SKU: `36219`;
- UPC: `8424345918943` observed on an exact eBay listing;
- brand: CARLA HOME;
- item dimensions: approximately 40 × 42 × 21 cm;
- item/package weight: approximately 0.8 kg;
- natural wood shelves + black metal frame;
- public warranty signal: 12 months.

Current Australian public price pressure:
- Bunnings Marketplace: A$34.95, sold/delivered by Wilson Trading Import Pty Ltd;
- BIG W category observation: about A$34.90 with free delivery;
- Harvey Norman Customer Direct: A$37;
- exact eBay listing observed at A$46.95 from an Australian seller; another exact-MPN eBay listing exposes `V178-36219` and UPC `8424345918943`.

Public source URLs:
- https://www.bunnings.com.au/carla-home-2-tier-wooden-kitchen-countertop-spice-rack-for-storage-of-condiments-oils-jars-seasoning-bottles_p0939811
- https://www.ebay.com.au/itm/326717022832
- https://www.ebay.com.au/itm/157371773640
- https://www.harveynorman.com.au/carla-home-2-tier-wooden-kitchen-countertop-spice-rack-for-storage-of-condiments.html

Commercial screen:
- the eBay A$46.95 ask is not treated as proven sustainable demand because sold-count evidence was not established;
- direct AU retail around A$34.90–37 is the stronger price-pressure signal;
- at A$34.95, the existing Pro screening model yields a maximum combined product-cost + outbound-freight ceiling of approximately **A$24.72** before returns, integration cost, ads, support, and GST reconciliation;
- at the A$46.95 eBay ask, the ceiling would be approximately A$33.32, but that scenario is not accepted as the base case without sell-through evidence.

Decision: **HOLD / LIKELY REJECT FOR FIRST-WAVE EBAY** unless authenticated product cost + freight is exceptionally low.

Reason: compact 0.8 kg weight is attractive, but direct-brand retail pricing below A$35 creates a narrow free-delivery envelope.

## Family conclusion — compact spice racks

This batch did not find a spice-rack SKU strong enough to displace the current top eBay pilot candidates.

What was learned:
1. Compact weight alone is not enough; supplier-direct retail competition is the stronger constraint.
2. CARLA HOME / Wilson Trading appears across major Australian marketplaces, so any related Dropshipzone/NewDeals resale candidate must be screened against the brand's own marketplace pricing before admission.
3. The strongest exact kitchen source hunt should move away from easily syndicated single organisers toward bundles, differentiated multipacks, or products where the supplier does not already dominate direct retail.

## Active eBay pilot after Batch 005

No expansion beyond the existing cap.

1. `GDAG2515` — GiGwi Duraspikes Elephant — P0 HOLD / permission + trade cost.
2. `V178-36023` — CARLA HOME 4-pack bamboo drawer dividers — P0 HOLD / authenticated economics.
3. `GDAG2522` — GiGwi Dino — HOLD.
4. `GDAG2505` — GiGwi Rabbit — HOLD.
5. `V178-36335` — CARLA HOME under-sink organiser — HOLD.
6. `V178-36336` — CARLA HOME microwave rack — HOLD.
7. `V178-36045` — CARLA HOME 8-pack bamboo dividers — HOLD secondary.
8. `GDAG2610` — GiGwi Large Duck — HOLD.

`V178-36110` and `V178-36219` remain outside the active pilot until authenticated economics justify displacement of a stronger row.

## Highest-value authenticated evidence remains unchanged

1. Dropshipzone/NewDeals retailer cost + live stock + postcode freight for `V178-36023`, `V178-36045`, `V178-36335`, `V178-36336`.
2. Exact supplier marketplace permission / blind-shipping / packing-identity terms for those SKUs.
3. Southern Pet trade price + marketplace approval for `GDAG2515`, `GDAG2522`, `GDAG2505`.
4. Marketplace Connect current incident / Listings / Mapping / Orders state before any pilot acceptance test.

## Assurance state

- `V178-36110`: AMBER / HOLD-secondary.
- `V178-36219`: AMBER-RED / likely first-wave reject unless authenticated economics are exceptional.
- compact spice-rack family: AMBER- / no pilot promotion.
- active eBay pilot: AMBER / unchanged.
- overall programme: AMBER / NO OVERALL GREEN.

## Replenished next cycle

If no authenticated supplier/app evidence appears, the next vertical cycle should source-hunt **one exact clear pantry/fridge bin multipack family** with these hard filters:
- Australian stock path;
- current public retail preferably A$35+ delivered;
- package weight preferably <=1.5 kg where evidence exists;
- multipack/bundle differentiation;
- low breakage and low fit/compatibility risk;
- exact SKU/GTIN where public;
- supplier-direct marketplace price checked before admission;
- conservative landed-cost ceiling calculated before any pilot promotion.
