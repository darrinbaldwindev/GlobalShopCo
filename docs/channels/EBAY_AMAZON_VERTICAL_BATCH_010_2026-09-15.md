# eBay / Amazon Vertical Batch 010 — Compact Pet Accessory Source Hunt

Status: ACTIVE / RESEARCH + ASSURANCE / FAIL-CLOSED
Date: 2026-09-15
Branch: `agent/ebay-amazon/vertical-batch-010`
Base: `agent/ebay-amazon/vertical-batch-009`

## Trigger

Owner command `continue autonomously` triggered the standing vertical cycle: fresh repo scan → select highest-value authorised lane → execute the fullest safe batch → verify exact state → replenish next lane.

No Shopify/eBay/Amazon production write, listing publication, supplier contact, purchase, app change, credentials, spend, merge or deployment is authorised.

## Fresh scan

- Canonical/default repo history remains topped by `79d50227fe19826d42c43e7dec15ce245ad58e40` (`docs: adopt portfolio vertical batch execution doctrine`).
- Prior stacked batch head is `agent/ebay-amazon/vertical-batch-009`.
- No new authenticated supplier-price, postcode-freight or Marketplace Connect reliability evidence was found in the canonical repo.
- Per Batch 009 replenishment, this cycle leaves Home Organisation and evaluates one compact pet-accessory family.

## Family selected — West Paw Toppl enrichment toy

Rationale:
- compact and well below the 1.5 kg preference;
- no vehicle-restraint or safety-critical fitment claim;
- established premium retail price band;
- clean UPC/variant identity available in AU retail evidence;
- West Paw explicitly supports retailer/wholesale relationships and lists Australia among international markets, creating a clearer authorised-distribution path than generic marketplace sourcing.

### Exact candidate — West Paw Toppl Large Tangerine

Identity and physical evidence:
- brand: West Paw;
- product: Toppl treat-dispensing/enrichment toy;
- size: Large;
- colour: Tangerine/Orange;
- AU retailer SKU: `ZG084TNG`;
- UPC/barcode: `747473750284`;
- dimensions observed: approximately 9–10 cm class;
- comparable Large variant retail weight evidence is approximately 0.30–0.315 kg.

Current AU price pressure:
- Pet City Large Periwinkle: A$54.95 retail, 0.30 kg;
- Bunnings marketplace Large variants: A$59.95;
- current eBay AU Large Mint: A$47.98 from a high-volume AU seller;
- broader Australian West Paw Toppl Large market commonly falls in approximately A$40–60 before/including delivery depending seller and colour.

Demand/competition interpretation:
- eBay AU has multiple live branded Toppl listings, including exact UPC `747473750284`;
- the product is differentiated from generic lick mats/slow feeders by established brand, material, interlocking-size system and enrichment positioning;
- competition is still real: major retailers and established marketplace sellers already carry West Paw, so brand quality does not eliminate margin pressure.

## Conservative eBay economics screen

Existing screening convention:
- eBay fee screen: 13.4% + A$0.30;
- contribution reserve: 15%;
- ceiling below excludes returns, advertising, integration/support and GST reconciliation.

At A$49.95 delivered:
- maximum combined product cost + outbound freight ≈ A$35.46.

At A$54.95 delivered:
- maximum combined product cost + outbound freight ≈ A$39.04.

Commercial rule:
- do not admit to pilot unless authorised wholesale + AU freight is comfortably below the ceiling, with adequate additional allowance for returns/support and competitive repricing.

## Supplier / authorisation gate

West Paw public retailer documentation states:
- Australia is an international market;
- authorised retailers/wholesale customers exist;
- retailer application and international distributor-finder paths are provided.

However, this cycle does not prove:
- GlobalShopCo is approved as an authorised West Paw retailer;
- the Australian distributor identity available to GlobalShopCo;
- exact wholesale price;
- eBay/Amazon marketplace-reseller permission;
- warranty handling for marketplace sales;
- exact domestic freight to customer postcode.

Therefore authorisation remains UNKNOWN and fail-closed.

## Shopify duplication check

Live Shopify read-only search for barcode `747473750284` or title `West Paw Toppl` returned no matching product. No product was created.

## Decision

`West Paw Toppl Large / UPC 747473750284` → **AMBER / P1 AUTHENTICATED-WHOLESALE TARGET**.

It is stronger than generic pet enrichment products because brand identity, UPC, product quality positioning and AU retail presence are clear. It does **not** displace the capped eight-SKU eBay pilot yet because wholesale cost, freight and marketplace permission are unresolved.

## Comparative lane notes

- West Paw Toppl Large: P1 AMBER — proceed only to authenticated wholesale/permission evidence.
- Kurgo Kibble Carrier: keep secondary; current official AU retail A$34.99 is below the preferred A$35–70 band and leaves less free-delivery headroom.
- LickiMat: remains HOLD due direct-brand/Amazon competition and marketplace-authorisation uncertainty.
- Ruffwear/Kurgo restraint or safety-oriented products: remain outside this batch because fitment/safety claims increase returns/compliance sensitivity.
- Generic lick mats / low-cost slow feeders: remain deprioritised due commodity competition.

## Active pilot impact

The existing capped eight-SKU eBay pilot remains unchanged. No SKU is promoted to GREEN.

## Highest-value authenticated evidence next

1. Identify the authorised Australian West Paw distributor/wholesale path available to GlobalShopCo.
2. Obtain retailer cost for Large Toppl variants including `747473750284` or current equivalent.
3. Obtain domestic freight/dispatch terms and returns/warranty handling.
4. Confirm written permission for eBay Australia and Amazon Australia resale.
5. Only then compare the exact landed cost against the A$49.95–54.95 marketplace screen.

## Assurance state

- product identity: GREEN;
- AU demand/presence: AMBER+;
- supplier authorisation: UNKNOWN;
- wholesale economics: UNKNOWN;
- freight: UNKNOWN;
- eBay fit: AMBER;
- Amazon fit: AMBER/HOLD pending authorised supply and Buy Box competition;
- overall: AMBER / NO OVERALL GREEN.

## Next replenishment

If no authenticated supplier/app evidence appears, Batch 011 should stay in compact pet accessories but test one different authorised-distribution family with:
- clean UPC/GTIN;
- AU stock path;
- <=1.5 kg packed weight;
- A$40–70 credible delivered retail;
- no restraint/safety-critical fitment;
- lower major-retailer price compression than West Paw Toppl.
