# GlobalShopCo eBay/Amazon Vertical Batch 009 — OXO Organiser Source Hunt

Status: ACTIVE / RESEARCH + ASSURANCE / FAIL-CLOSED
Date: 2026-09-14
Base: `agent/ebay-amazon/vertical-batch-008` @ `15fa99eb4c4b1f96127f6f51c412cbffc94e45e2`
Branch: `agent/ebay-amazon/vertical-batch-009`

## Trigger / execution rule

Owner command `continue autonomously` triggers a full vertical cycle. This batch fresh-scanned repo state, checked live Shopify read-only duplication, and—because no authenticated supplier or Marketplace Connect evidence had appeared—source-hunted exactly one differentiated AU-available organiser family outside the heavily syndicated CARLA HOME lane.

No production Shopify/eBay/Amazon mutation, listing publication, supplier contact, purchase, credential change, app change, merge, deployment or spend is authorised.

## Fresh-scan findings

- Canonical/default repository head remains `79d50227fe19826d42c43e7dec15ce245ad58e40` (`docs: adopt portfolio vertical batch execution doctrine`).
- Batch 008 draft PR #29 remains the latest stacked research branch before this batch.
- No new authenticated supplier-cost, postcode-freight, marketplace-permission or Marketplace Connect incident evidence was available in the repo at cycle start.
- Shopify remains the canonical catalogue authority.
- Live Shopify read-only search for SKUs `48703`, `48695`, and `48685` returned no products, so no duplicate catalogue entry exists for the exact candidates screened here.

## Batch mission

Move away from generic/supplier-syndicated CARLA HOME catalogue pressure and test one cleaner branded organiser family with:
- exact SKU/GTIN identity;
- Australian retail availability;
- compact/light physical profile where verifiable;
- credible A$35+ consumer pricing;
- stronger product differentiation than anonymous organisers;
- lower catalogue-data ambiguity.

Selected family: **OXO Good Grips drawer organisers / drawer dividers**.

## Candidate A — OXO Good Grips Dresser Drawer Divider, 2 Pack

### Exact identity

- Brand: OXO Good Grips
- Australian SKU: `48685`
- MPN also observed internationally: `13227200`
- GTIN / UPC: `0719812684277` / `719812684277`
- Product: expandable dresser drawer divider, 2 pack
- Mechanism: tool-free tension/locking handle
- Expandable range: approximately 11–17 in / up to about 43 cm
- Material: plastic with foam gripping surfaces
- Public eBay product data reports item weight around 1 kg; this is a marketplace product-data field and should be confirmed against supplier packed-weight data before freight approval.

### Current Australian price pressure

Observed public AU retail / eBay evidence:
- OXO Australia direct retail: A$47.95.
- Harris Scarfe current sale: A$35.99 (full price A$59.99).
- eBay AU product page: A$34.99 + A$4.99 postage (~A$39.98 delivered), plus other current listings around A$43.87–46 delivered.
- One exact eBay AU listing at A$52.64 has only 1 sold, so that higher ask should not be treated as proven sustainable demand.

### Economics screen

Use A$43.95 as a conservative-but-plausible delivered eBay screen rather than OXO Australia's direct A$47.95 ask.

Existing screening method:
- seller fee screen: 13.4% + A$0.30;
- contribution reserve: 15%;
- combined supplier product cost + outbound freight ceiling = sell price × (1 - 0.134 - 0.15) - A$0.30.

At A$43.95:
- combined product-cost + outbound-freight ceiling ≈ A$31.17 before returns, advertising, integration, support and GST reconciliation.

At the stronger eBay delivered pressure near A$39.98:
- combined cost + freight ceiling ≈ A$28.33.

Therefore authenticated landed economics need to be materially below A$28–31 to leave a practical operating buffer.

### Reseller-opportunity assessment

Positives:
- exact SKU + GTIN are clean;
- recognised brand and differentiated locking mechanism reduce generic commodity risk;
- AU retail availability is broad enough to prove local product presence;
- approximate weight signal is around 1 kg, compatible with the compact first-wave bias if supplier packed weight confirms it;
- eBay AU listings exist, including a visible sold signal.

Negatives / blockers:
- OXO itself sells direct in Australia;
- major AU retailers discount it into the mid-A$30s, compressing reseller headroom;
- authorised wholesale / marketplace-reseller terms are UNKNOWN;
- exact trade cost, exact packed weight and postcode freight are UNKNOWN;
- direct-brand and large-retailer competition makes Buy Box / price competitiveness a real issue even if demand exists.

Decision: **AMBER / P1 BRAND-DIRECT WHOLESALE TARGET — NOT PILOT-READY.**

This is commercially cleaner than many anonymous organiser candidates, but it does not displace the existing P0 pilot until authorised wholesale cost and freight prove margin.

## Candidate B — OXO Good Grips Large Expandable Kitchen Tool Drawer Organiser

### Exact identity

- Brand: OXO Good Grips
- SKU / vendor code: `48703`
- Australian retailer product code example: Kitchen Warehouse `#514095`
- Dimensions: approximately 41.5 × 45.9 × 6.3 cm; OXO describes expansion to roughly 46 × 42 × 6 cm
- Features: adjustable dividers, storage cup, non-slip feet, removable components

### Current AU price pressure

- OXO Australia direct retail: A$45.95.
- Public price-comparison evidence shows multiple AU retailers around A$33–36 plus shipping; some free-delivery marketplace offers around A$42–45.
- Kitchen Warehouse confirms exact vendor code `48703` and established Australian retail distribution.

### Economics screen

Using A$44.95 delivered as a practical upper eBay/DTC marketplace screen:
- combined product-cost + outbound-freight ceiling ≈ A$31.88 before returns, ads, integration, support and GST reconciliation.

Using A$39.95 delivered to reflect lower-retailer pressure:
- combined cost + freight ceiling ≈ A$28.30.

### Assessment

This product is differentiated and cleanly identified, but broad retail discounting means a reseller needs a genuine wholesale advantage. Exact packed weight was not verified in this cycle, so freight cannot be declared GREEN.

Decision: **AMBER / SECONDARY HOLD.**

## Candidate C — OXO Good Grips Expandable Kitchen Tool Drawer Organiser

- SKU: `48695`
- OXO Australia sale price: A$37.95 (RRP A$49.95)
- exact dimensions: expands to ~33 × 42 × 6 cm
- broad AU retail pricing includes sub-A$30 product-only offers plus freight.

At A$37.95 delivered:
- combined cost + freight ceiling ≈ A$26.88.

The lower selling-price band makes this less attractive for GlobalShopCo free-delivery marketplace economics than `48685` or `48703`.

Decision: **REJECT FIRST WAVE / HOLD AS BENCHMARK.**

## Family-level conclusion

The OXO test changes the sourcing thesis in a useful way:

1. **Brand differentiation helps, but does not automatically create margin.**
2. Major-retailer discounting can compress a branded SKU as severely as supplier-direct syndication compresses a generic SKU.
3. The strongest OXO candidate is `48685`, because it has:
   - clean GTIN/SKU identity;
   - compact approximate weight;
   - a recognisable mechanical differentiation;
   - current AU eBay presence;
   - A$40+ delivered marketplace observations.
4. Even `48685` stays AMBER until authorised wholesale terms, exact packed weight and postcode freight are known.
5. `48703` is a useful second candidate but has retail-price compression and a missing packed-weight fact.
6. `48695` is below the preferred free-delivery price band and should not enter the first-wave pilot.

## Pilot ranking impact

The capped eight-SKU active eBay pilot is **unchanged**.

`48685` is added only to the **P1 authenticated-source queue**, not the active pilot.

Reason: adding more AMBER SKUs without private economics would dilute focus. Existing P0 candidates still have better supplier-path evidence or higher decision value.

## Authenticated evidence now worth collecting for OXO

Only pursue if a real trade path is available:
1. authorised Australian wholesale/distributor price for SKU `48685`;
2. confirmation that eBay Australia and Amazon Australia resale is permitted;
3. supplier packed dimensions and packed weight;
4. AU warehouse stock and dispatch SLA;
5. postcode freight to representative Queensland metro/regional destinations;
6. blind-shipping / seller-of-record packing terms;
7. warranty/returns process for trade resellers.

If no authorised wholesale route exists, remove OXO from sourcing and retain it only as a quality/price benchmark.

## Assurance state

- OXO `48685`: **AMBER / P1**.
- OXO `48703`: **AMBER / SECONDARY HOLD**.
- OXO `48695`: **RED/HOLD FIRST WAVE**.
- Branded organiser sourcing thesis: **AMBER** — better quality/data integrity, but margin still unproven.
- Existing eight-SKU eBay pilot: **UNCHANGED / AMBER**.
- Marketplace Connect eBay production pilot: **RED/HOLD** pending current reliability evidence and safe acceptance testing.
- Overall GlobalShopCo eBay/Amazon programme: **AMBER / NO OVERALL GREEN**.

## Replenished next cycle

On the next autonomous cycle:
1. fresh-scan repo and new authenticated evidence first;
2. if none exists, stop expanding Home Organisation horizontally for one cycle;
3. source-hunt one compact AU-stock **pet accessory** with exact SKU/GTIN, <1.5 kg packed weight, A$35–70 credible retail, and clear reseller/distributor path;
4. prefer a product without safety/restraint claims and without manufacturer-dominated Amazon Buy Box;
5. apply the same contribution ceiling before pilot admission;
6. keep the active eBay pilot capped at 5–10 serious SKUs and remove weaker candidates instead of accumulating AMBER research.