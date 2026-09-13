# AU channel candidate matrix — 2026-09-13

Status: RESEARCH / FAIL-CLOSED. This matrix does not publish, approve, purchase, contact suppliers, connect marketplaces, or mutate Shopify production state.

Canonical authorities:
- Shopify = catalogue, product, inventory, price, order and checkout authority.
- GlobalShopCo #18 = site-wide launch gate.
- GlobalShopCo #17 = eBay channel gate.
- GlobalShopCo #23 = Amazon channel gate.

Channel approval is independent. Owned-site qualification does not imply eBay or Amazon approval; eBay approval does not imply Amazon approval; Amazon approval does not imply eBay approval; MyPrimeDelivery evidence is not Amazon approval.

## Strongest currently evidenced family — Southern Pet / GiGwi

| SKU | Product | Public weight | Public stock observation | Owned site | eBay | Amazon | Primary blocker / next evidence |
|---|---|---:|---:|---|---|---|---|
| GDAG2515 | GiGwi Duraspikes Elephant | 0.49 kg | 20 | HOLD — economics incomplete | PERMISSION-REQUIRED | PERMISSION-REQUIRED | authorised trade cost; exact packed/cubic freight; written marketplace approval; seller/packing identity; returns; tax-normalised contribution |
| GDAG2522 | GiGwi Duraspikes Dino T-Rex | 0.49 kg | 18 | HOLD — economics incomplete | PERMISSION-REQUIRED | PERMISSION-REQUIRED | same evidence set; strong current retail-comparison coverage |
| GDAG2505 | GiGwi Duraspikes Rabbit | 0.49 kg | 16 | HOLD — economics incomplete | PERMISSION-REQUIRED | PERMISSION-REQUIRED | same evidence set |
| GDAG2600 | GiGwi Crunchy Neck Plush Duck Small | 0.4 kg | 55 | HOLD — economics weak/incomplete | PERMISSION-REQUIRED | PERMISSION-REQUIRED | trade cost plus marketplace approval; free-delivery economics are especially compressed |
| GDAG2610 | GiGwi Crunchy Neck Plush Duck Large | 0.9 kg | 107 | HOLD — economics incomplete | PERMISSION-REQUIRED | PERMISSION-REQUIRED | higher freight band; exact size-specific retail/economics plus marketplace approval |

Public supplier evidence already narrows these candidates materially: exact SKU identity, listed weights, observed stock and published dropship freight bands exist. Southern Pet's public terms require prior written general-manager approval before its dropship service is used to fulfil Amazon, eBay or other marketplace orders. Therefore none is marketplace-ready.

Current eBay economics work ranks GDAG2515 strongest by conservative trade-cost tolerance, with GDAG2522 and GDAG2505 next; GDAG2600 is particularly fragile as a single-unit free-delivery SKU. This ranking is a research priority only, not approval.

## Other current supplier families

| Family | Owned site | eBay | Amazon | Reason / next evidence |
|---|---|---|---|---|
| Eleganter owned-site dropship | RESEARCH/HOLD per exact SKU | NOT-ELIGIBLE under recorded terms | NOT-ELIGIBLE under recorded terms | repo evidence records programme as retailer-owned-website only and excluding third-party marketplaces; reclassify only if supplier terms change |
| NewDeals / Dropshipzone Home Organisation | HOLD / UNKNOWN by exact SKU | UNKNOWN / HOLD | UNKNOWN / HOLD | marketplace permission, packing/seller identity, exact wholesale, freight/landed cost, stock/fulfilment model and channel economics unresolved |
| Existing A$0 / review-required Baby/Pet/Safety Shopify placeholders | RESEARCH ONLY | NOT A CANDIDATE | NOT A CANDIDATE | fail publication gate before channel evaluation |

## Promotion order

1. Close owned-site commercial evidence first; no marketplace can bypass this gate.
2. For Southern Pet, prioritise GDAG2515, GDAG2522 and GDAG2505 for exact trade-cost and freight reconciliation.
3. Keep all five Southern Pet candidates PERMISSION-REQUIRED for eBay and Amazon until written marketplace approval exists.
4. Do not spend time trying to promote Eleganter marketplace candidates while current recorded terms prohibit them.
5. Treat NewDeals/Dropshipzone as a separate evidence lane; do not infer marketplace rights from ordinary dropshipping support.
6. Once a SKU passes owned-site qualification, evaluate #17 and #23 independently and record channel-specific economics.

## Headless rendering disposition

- Ordinary category pages may render editorial content with zero approved products.
- `/shopify-ebay/` may show research/editorial status but must not render a product as eBay-ready unless #17 passes for that exact SKU.
- `/shopify-amazon/` may show research/editorial status but must not render a product as Amazon-ready unless #23 passes for that exact SKU.
- Candidate classifications in this document are internal evidence states, not customer claims.

## Current counts

- Fully launch-ready owned-site products: 0.
- EBAY-READY products: 0.
- AMAZON-READY products: 0.
- Southern Pet exact-SKU marketplace candidates with materially useful public evidence: 5, all PERMISSION-REQUIRED.

No overall GREEN.