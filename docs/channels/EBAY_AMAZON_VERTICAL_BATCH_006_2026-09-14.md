# GlobalShopCo eBay/Amazon Vertical Batch 006

Status: ACTIVE / RESEARCH + ASSURANCE / FAIL-CLOSED
Date: 2026-09-14
Base branch: `agent/ebay-amazon/vertical-batch-005`
Base head: `6598684322e96b9a01aa8ccd4081fa4d1494f08e`

## Trigger

Owner command `continue autonomously` invoked the portfolio vertical-batch cycle: fresh scan, execute highest-value safe work, verify, replenish, and durably log. No production Shopify/eBay/Amazon mutation, listing publication, supplier contact, purchase, credentials, spend, merge or deployment is authorised.

## Fresh-scan state

- GlobalShopCo default branch remains `agent/overseer/initial-project-timeline` at `79d50227fe19826d42c43e7dec15ce245ad58e40`.
- No newer canonical commit was found in the repo scan.
- No new authenticated Dropshipzone/Southern Pet/Marketplace Connect evidence was available in repository state.
- Batch 005 replenishment therefore directs one exact compact Home/Kitchen source hunt only: clear pantry/fridge-bin multipacks.
- Live Shopify read-only search found no existing products with `CAH-67362`, `67362`, `CAH-67361`, or `67361`, so this batch does not duplicate an existing Shopify draft.

## Mission

Test exact Australian clear fridge/pantry organiser multipacks against the current GlobalShopCo hard gates:

1. exact source identity;
2. AU retail presence;
3. package weight / freight exposure;
4. commodity price pressure on eBay AU;
5. conservative free-delivery economics;
6. authenticated supplier data still required before admission to pilot.

## Exact candidate A — CARLA HOME 7 Pack Clear Stackable Fridge Organizer Bins with Lids

Verified public identity:
- seller/brand path: CARLA HOME / Wilson Trading family;
- exact marketplace identifier: `CAH-67362`;
- EAN/UPC: `8424345988809`;
- pack: 7 bins;
- composition: one 4.5L, two 1.5L, four 475mL;
- food-grade BPA-free PET;
- removable drain-tray design;
- item/package dimensions: about 36.9 x 24.1 x 13.7 cm packaged;
- package weight: about 1.89 kg;
- Australian public retail observations: about A$105.68 member / A$108.95 non-member at Matt Blatt; about A$118.95 in a recent BIG W category observation; Woolworths Everyday Market lists the exact family sold and shipped by CARLA Home with free shipping to Sydney and dispatch within 2 days.

Marketplace pressure:
- eBay AU is highly commoditised in this family: 6-pack clear bins around A$35.99–A$42; 5-pack large clear bins around A$39–A$46; 10-pack generic fridge/pantry organisers around A$99; many lower-price alternatives have sold-count evidence.
- therefore the exact CARLA retail asks above A$100 are not accepted as sustainable eBay pricing without exact sold evidence.

Conservative eBay screening:
- use A$59.95 as a provisional differentiated-price screen rather than the >A$100 retail asks;
- using the existing Pro screen of 13.4% + A$0.30 and a 15% contribution reserve, maximum combined supplier-cost + outbound-freight is about A$42.62 before returns, integration, support, advertising and GST reconciliation;
- at A$49.95 sustainable sell price, the same ceiling falls to about A$35.46;
- because package weight is 1.89 kg, actual freight could consume a material share of this ceiling.

Decision: `HOLD / SECONDARY`.

Reason: exact identity and AU availability are good, but package weight misses the preferred <1.5 kg target and eBay generic competition is much cheaper. It does not displace the current active pilot without exceptionally strong authenticated trade cost and freight.

## Exact candidate B — CARLA HOME 10 Pack Clear Stackable Fridge Organizer Bins with Lids

Verified public identity:
- exact marketplace identifier: `CAH-67361`;
- EAN/UPC: `8424345988779`;
- pack: 10 bins;
- composition: one 6.5L, three 1.5L, six 475mL;
- food-grade BPA-free PET;
- packaged dimensions about 34.96 x 33.75 x 13.6 cm;
- package weight about 2.9 kg;
- BIG W public retail observation: A$159.95;
- CARLA-family overseas marketplace evidence carries the exact identifier and product specification.

Marketplace pressure:
- eBay AU search shows materially cheaper generic alternatives, including 14-pack around A$34.95, 6-pack around A$35.99–A$42, 10-bin formats around A$69–A$99, and high-volume commodity storage-box sellers.
- the CARLA 10-pack therefore faces strong price-compression risk despite its lids/drain-tray differentiation.

Conservative eBay screening:
- use A$69.95 as a provisional upper competitive screen rather than the A$159.95 public retail ask;
- Pro 13.4% + A$0.30 plus 15% contribution reserve gives maximum combined supplier-cost + outbound-freight of about A$49.78 before returns, integration, support, advertising and GST reconciliation;
- 2.9 kg package weight makes freight materially worse than the 7-pack and the preferred compact-pilot profile.

Decision: `REJECT FIRST WAVE / HOLD RESEARCH`.

Reason: excessive packed weight plus strong commodity competition. Only an unusually low authenticated landed cost would justify reopening.

## Family-level conclusion

The original hypothesis that clear pantry/fridge bins are automatically a strong BOTH-channel family is too broad.

Refined rule:
- compact 4–6 pack clear bins around or below ~1.5 kg remain worth source hunting;
- 7-pack `CAH-67362` is secondary because it is already 1.89 kg;
- 10-pack `CAH-67361` is not a first-wave GlobalShopCo eBay candidate at 2.9 kg;
- exact AU-stock alternatives need to combine better packed density with retail differentiation rather than simply more pieces.

## Active eBay pilot cap

No candidate from Batch 006 displaces the existing capped pilot. Keep active queue unchanged:

1. `GDAG2515` — Southern Pet / GiGwi Duraspikes Elephant — HOLD / permission-required.
2. `V178-36023` — CARLA HOME 4-pack bamboo drawer dividers — P0 HOLD.
3. `GDAG2522` — GiGwi Duraspikes Dino — HOLD.
4. `GDAG2505` — GiGwi Duraspikes Rabbit — HOLD.
5. `V178-36335` — CARLA HOME under-sink organiser — HOLD.
6. `V178-36336` — CARLA HOME microwave rack — HOLD.
7. `V178-36045` — CARLA HOME 8-pack bamboo dividers — HOLD / secondary.
8. `GDAG2610` — GiGwi Large Duck — HOLD.

Batch 006 bench:
- `CAH-67362` — HOLD / secondary, not admitted.
- `CAH-67361` — REJECT first wave.

## Authenticated evidence priority

No new owner action is needed for these fridge-bin SKUs yet. Authenticated effort should remain concentrated on candidates that can still enter the pilot:

1. `V178-36023` Dropshipzone/NewDeals retailer price, stock and Bli Bli / representative metro-regional freight.
2. `V178-36335` same.
3. `V178-36336` same.
4. `V178-36045` same if the first three remain viable.
5. supplier-specific marketplace/blind-shipping/seller-identity terms.
6. Southern Pet trade pricing and written marketplace approval for `GDAG2515`, `GDAG2522`, `GDAG2505`.
7. current Marketplace Connect incident / Listings / Mapping / Orders state.

## Assurance state

- Clear fridge-bin family: AMBER / narrowed.
- `CAH-67362`: AMBER-HOLD / secondary.
- `CAH-67361`: RED for first wave.
- Existing eBay pilot: AMBER / unchanged.
- Marketplace Connect eBay production pilot: RED/HOLD pending reliability evidence.
- Overall programme: AMBER / NO OVERALL GREEN.

## Next replenished cycle

If authenticated supplier/app evidence still has not arrived, the next batch should source-hunt one exact **compact bottle/can organiser or lazy-Susan/pantry-riser family**, preferring:
- AU stock;
- packed weight <=1.5 kg;
- delivered retail >=A$35;
- exact SKU/GTIN;
- low breakage and low compatibility risk;
- supplier-direct retail not already sitting below the marketplace ceiling;
- conservative contribution ceiling calculated before pilot admission.
