# eBay / Amazon Vertical Batch 014 — Eleganter density screen

Date: 2026-09-18
Mode: research / assurance only
Base: `agent/ebay-amazon/vertical-batch-013`

## Objective

Continue the owner-authorised high-throughput model by screening a dense single-supplier product cluster rather than isolated one-off ideas. This batch focuses on Eleganter Australia / Kaper Kidz because public evidence exposes exact SKUs, product identity, stock state, dimensional data for several items and a large locally held catalogue.

No product is GREEN/listable unless supplier economics, freight, marketplace permission and fulfilment identity are closed.

## Fresh scan

- PR #34 (`agent/ebay-amazon/vertical-batch-013`) remains open, draft and mergeable.
- Prior stacked marketplace batches remain research-only and unmerged.
- No new authenticated supplier economics, Marketplace Connect mapping/order evidence or Amazon connection evidence was discovered in the repo scan.
- Shopify remains canonical catalogue authority.

## Live Shopify duplicate check

Read-only search across these exact SKUs returned no matches:

`NG23978`, `NG23981`, `NG23976`, `NG23967A`, `NG23965-R4`, `NG23960`, `NG23958-R4`, `NG23973`, `NG23970A`, `NG23970B`, `NG23982`, `NG23663A`, `NG23663B`, `NG23663C`.

No Shopify product was created or modified.

## Supplier-level evidence

Eleganter publicly presents itself as an Australian wholesale supplier/importer with a large wooden/educational toy catalogue. Public catalogue pages expose current SKU-level prices, stock state for many items, MOQ/carton information and postcode shipping calculators. Independent wholesale marketplace evidence also identifies Eleganter Australia as a wholesale supplier based in Slacks Creek, QLD.

Important limitation: public catalogue pricing must not be assumed to be the final authenticated reseller tier. The public prices are frequently close to major-retailer pricing, so marketplace economics remain unproven until the actual approved-account price and single-order freight are known.

## 14-SKU density screen

| SKU | Product | Public supplier price / signal | Public identity evidence | Initial screen | Reason |
|---|---|---:|---|---|---|
| NG23978 | Wooden Box Transportation & Street Sign Set | ~A$48.40 inc GST | GTIN `9354963014644`; independent AU retailer weight ~0.82–0.96 kg | P1 DEEP VERIFY | Clean identity, compact, low breakage; public retail around A$50 leaves no room at public supplier price, so authenticated trade tier is decisive. |
| NG23981 | Wooden Car Carrier with 4 Cars | ~A$47.30–52.95 | GTIN `9354963014651`; shipping weight ~0.76 kg | P1 DEEP VERIFY | Clean identity and compact; public retail around A$53 means public supplier price is too high for marketplace economics. |
| NG23976 | Wooden Fire Engine Playset | ~A$58–65.94 | GTIN `9354963014637`; exact supplier weight ~1.316 kg | P1 DEEP VERIFY | Strong identity/data quality and within weight target; public price is effectively retail-level, requiring substantial authenticated trade discount. |
| NG23973 | Wooden Recycling Garbage Truck Playset | ~A$63.80–65.94 | GTIN `9354963014620`; exact supplier weight ~1.316 kg | P2 HOLD | Identity clean, but major-retailer price around A$66 leaves essentially no room at public supplier price. |
| NG23960 | Wooden Ocean Music Set 4 Pc | A$35.95 | GTIN `9354963014552`; weight ~0.34 kg | P2 HOLD | Excellent freight profile but RRP ~A$39.95 makes margin structurally thin unless approved trade price is materially lower. |
| NG23970A | Wooden Tractor with Farm Animal Red | ~A$38.50 | exact supplier SKU; public AU product identity available | P2 HOLD | Compact family, but public price is already close to likely retail/eBay band. |
| NG23970B | Wooden Tractor with Farm Animal Green | ~A$43.95 | exact supplier SKU | P2 HOLD | Same family; public economics appear worse than red variant absent trade discount. |
| NG23982 | Wooden Transportation Set | ~A$28.60 | exact supplier SKU | P2 / MARGIN FRAGILE | Low ASP gives little room for product + free freight after fees. |
| NG23967A | Wooden Music Set 3 Pc Xylophone Set Orange | ~A$40.95 | exact supplier SKU | P2 HOLD | Public supplier price too close to likely retail; barcode/packed data should be reconciled before deeper economics. |
| NG23965-R4 | Wooden Ocean Maraca 4 Pc | ~A$38.50–40.95 | exact supplier pack SKU | P2 HOLD | Pack format may differentiate, but public price still leaves little free-delivery headroom. |
| NG23958-R4 | Wooden Pull Back Biplane / Glider 4 Pc | ~A$44.00–47.95 | exact supplier pack SKU | P2 HOLD | Useful bundle form, but authenticated economics required; public pricing is not enough. |
| NG23663A | Calm & Breezy Tractor Rubber Wheels Red | ~A$30.95 | exact supplier SKU | REJECT FIRST-WAVE / HOLD | Low ASP; comparable variants retail around mid-A$30s with free shipping, making public-price resale uneconomic. |
| NG23663B | Calm & Breezy Tractor Rubber Wheels Blue | ~A$29.70–30.95 | exact supplier SKU; independent AU seller weight around 0.47 kg | REJECT FIRST-WAVE / HOLD | Excellent weight but insufficient public margin. |
| NG23663C | Calm & Breezy Tractor Rubber Wheels Green | ~A$29.70–30.95 | GTIN `9354963006281`; shipping weight ~0.45 kg | REJECT FIRST-WAVE / HOLD | Clean identity and very light, but competing AU retail around A$36/free shipping leaves no sustainable reseller headroom at public supplier price. |

## Exact identity corrections / confirmations

Public evidence independently supports:

- `NG23978` → GTIN `9354963014644`; AU retailer weight around 0.82–0.96 kg.
- `NG23981` → GTIN `9354963014651`; shipping weight around 0.76 kg.
- `NG23976` → GTIN `9354963014637`; exact supplier weight around 1.316 kg.
- `NG23973` → GTIN `9354963014620`; exact supplier weight around 1.316 kg.
- `NG23960` → GTIN `9354963014552`; weight around 0.34 kg.
- `NG23663C` → GTIN `9354963006281`; shipping weight around 0.45 kg.

These identifiers are stronger than worker-generated pseudo-identifiers and can be retained as canonical research identities.

## Commercial conclusion

Eleganter is a useful **supplier-density path**, but public catalogue access does not itself solve the economics. The public prices are frequently within only a few dollars of major-retailer prices, which means the supplier is valuable only if an authenticated reseller/dropship tier provides materially lower cost or other structural advantages.

This batch therefore does **not** count 14 products toward the 100 verified-product milestone. It produces:

- 3 P1 deep-verification candidates: `NG23978`, `NG23981`, `NG23976`.
- 8 P2 / HOLD or margin-fragile candidates: `NG23973`, `NG23960`, `NG23970A`, `NG23970B`, `NG23982`, `NG23967A`, `NG23965-R4`, `NG23958-R4`.
- 3 low-ASP tractor variants rejected/held from first wave: `NG23663A/B/C`.
- 0 fully verified/listable products.

## Gate to promotion

For any Eleganter/Kaper Kidz SKU to become GREEN/listable, require all of:

1. approved GlobalShopCo wholesale/dropship account or equivalent authorised source;
2. authenticated net unit cost, with GST treatment clear;
3. exact single-order freight to postcode 4560 or deterministic freight table;
4. written eBay marketplace permission and Amazon permission separately if relevant;
5. blind-shipping / packing-slip / seller-identity compliance;
6. exact packed weight/dimensions and canonical GTIN;
7. live stock/availability method;
8. returns/warranty workflow compatible with marketplace obligations;
9. competitive eBay AU price that still clears the conservative landed-cost ceiling.

## Replenished next queue

Batch 015 should not add another toy family merely for breadth. Priority is to attack a different high-density supplier path where public or authenticated economics are more likely to close — preferably DropshipOnly, Southern Pet Supplies, Petgo, or a supplier already connected to Shopify. Screen 15–25 exact SKUs, but immediately reject low-ASP commodity items and open-catalogue clones where price compression makes the free-delivery model structurally weak.

## Safety / authority

No supplier contact, account creation, Shopify product creation/update, eBay/Amazon listing publication, Marketplace Connect change, purchase, spend, merge or deployment occurred.
