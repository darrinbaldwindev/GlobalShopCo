# GlobalShopCo — AU eBay Supplier Eligibility Matrix — 2026-09-12

**Status:** RESEARCH / CHANNEL-GATING ONLY — NOT LAUNCH-READY  
**Control issue:** `GlobalShopCo#17`  
**Channel architecture:** Shopify remains the canonical catalogue/order/inventory source. eBay is a downstream sales channel only.

## Purpose

Convert existing GlobalShopCo supplier/product evidence into an explicit eBay eligibility view without inventing supplier permission, wholesale pricing, freight, stock rights, or fulfilment terms.

Classification values:

- **EBAY-ELIGIBLE** — evidence supports eBay/marketplace fulfilment and the current eBay AU third-party-fulfilment conditions.
- **PERMISSION-REQUIRED** — supplier supports dropshipping but marketplace/eBay fulfilment requires prior written approval or a separate agreement.
- **NOT-ELIGIBLE** — supplier terms prohibit marketplace/eBay fulfilment or the documented fulfilment model conflicts with the channel gate.
- **UNKNOWN** — evidence is insufficient; fail closed and do not publish.

## Current classification

| Supplier / SKU | Product | eBay classification | Evidence-backed reason | Remaining commercial blockers | Pilot status |
|---|---|---|---|---|---|
| Southern Pet Supplies / `GDAG2610` | GiGwi Crunchy Neck Plush Duck — Large | **PERMISSION-REQUIRED** | Supplier supports dropshipping but explicitly requires prior written approval for marketplace fulfilment including eBay. | Trade cost/login; explicit approval; stock-control method; seller-identity/packing evidence; realised free-delivery contribution. | HOLD |
| Southern Pet Supplies / `GDAG2600` | GiGwi Crunchy Neck Plush Duck — Small | **PERMISSION-REQUIRED** | Same marketplace-approval restriction. Public weight/stock/freight bands exist. | Trade cost/login; explicit approval; stock-control method; seller-identity/packing evidence; realised free-delivery contribution. | HOLD |
| Southern Pet Supplies / `GDAG2522` | GiGwi Duraspikes Dino T-Rex | **PERMISSION-REQUIRED** | Same marketplace-approval restriction. | Trade cost/login; explicit approval; stock-control method; seller-identity/packing evidence; realised free-delivery contribution. | HOLD |
| Southern Pet Supplies / `GDAG2515` | GiGwi Duraspikes Elephant | **PERMISSION-REQUIRED** | Same marketplace-approval restriction. | Trade cost/login; explicit approval; stock-control method; seller-identity/packing evidence; realised free-delivery contribution. | HOLD |
| Southern Pet Supplies / `GDAG2505` | GiGwi Duraspikes Rabbit | **PERMISSION-REQUIRED** | Same marketplace-approval restriction. | Trade cost/login; explicit approval; stock-control method; seller-identity/packing evidence; realised free-delivery contribution. | HOLD |
| Eleganter / `NG23272-R3` | Kaper Kidz Wooden Jointed Crocodile/Giraffe Fidget Toy Set of 3 | **NOT-ELIGIBLE** | Public dropship programme is limited to the retailer's own website and explicitly excludes eBay and other third-party platforms. | Supplier terms would need to change or a separately documented authorised channel arrangement would be required. | REJECT FOR EBAY |
| Eleganter / `TH293` | Tooky Toy Animal Stacking Game | **NOT-ELIGIBLE** | Same own-website-only restriction. | Same. | REJECT FOR EBAY |
| Eleganter / `TKD002` | Tooky Toy Wooden Baby Gym | **NOT-ELIGIBLE** | Same own-website-only restriction. | Same; additionally bulky/weight risk is unattractive for eBay free-delivery economics. | REJECT FOR EBAY |
| Eleganter / `NG23636-R3` | Kaper Kidz Calm & Breezy Twist & Lock Robot Cube Set of 3 | **NOT-ELIGIBLE** | Same own-website-only restriction. | Same. | REJECT FOR EBAY |
| Eleganter / `NG23637-R3` | Kaper Kidz Calm & Breezy Twist & Lock Blocks Set of 3 | **NOT-ELIGIBLE** | Same own-website-only restriction. | Same. | REJECT FOR EBAY |
| Eleganter / `LT044` | Tookyland Pom-Pom Monster Craft Kit | **NOT-ELIGIBLE** | Same own-website-only restriction. | Same. | REJECT FOR EBAY |
| Eleganter / `TKD004` | Tooky Toy Animal Roller Elephant | **NOT-ELIGIBLE** | Same own-website-only restriction. | Same. | REJECT FOR EBAY |
| Eleganter / `TY385` | Tooky Toy Block Pattern Puzzle | **NOT-ELIGIBLE** | Same own-website-only restriction. | Same. | REJECT FOR EBAY |
| K&A / `H9016` | 6L plastic storage box with removable dividers | **UNKNOWN** | Exact product identity/cost evidence exists, but current GlobalShopCo evidence does not establish eBay/marketplace permission, eBay-compatible fulfilment, or landed freight. | Marketplace permission; stock ownership/fulfilment model; freight; stock; seller-identity/packing; returns; eBay-inclusive contribution. | HOLD |
| CWS / `SG118655` | 3L storage basket | **UNKNOWN** | Exact SKU and public price exist, but candidate freight and eBay/marketplace fulfilment evidence remain incomplete. | Marketplace permission; per-destination freight; GST/price basis; stock; returns; eBay-inclusive contribution. | HOLD |
| K&A / `KAMP061` | A4 organiser/basket | **UNKNOWN** | Cost evidence exists but eBay/marketplace permission, freight and exact channel fulfilment evidence are absent. | Same category of blockers as H9016. | HOLD |
| K&A / `KAK103` | A4 storage tray | **UNKNOWN** | Cost evidence exists but eBay/marketplace permission, freight and exact channel fulfilment evidence are absent. | Same. | HOLD |
| K&A / `KA003644` | 9.5L handled storage basket | **UNKNOWN** | Cost evidence exists but eBay/marketplace permission, freight and exact channel fulfilment evidence are absent. | Same. | HOLD |
| United Living / `15510` | Boxsweden Clear Storage Box 10L | **UNKNOWN** | Exact supplier SKU/EAN and independent retail identity are verified, but supplier wholesale price, freight, dropship/marketplace permission, stock rights and net contribution remain unknown. | Wholesale; supplier freight; marketplace permission; stock; fulfilment/packing identity; eBay-inclusive contribution. | HOLD |

## Immediate interpretation

### No current SKU is eBay-pilot-ready

The existing evidence pool contains:

- **5 PERMISSION-REQUIRED Southern Pet SKUs** — promising because public stock, weight and freight bands exist, but GlobalShopCo cannot classify them as eBay-eligible until explicit marketplace approval and trade economics are available.
- **8 NOT-ELIGIBLE Eleganter SKUs** under the supplier's published own-website-only dropship restriction.
- **Home Organisation UNKNOWN/HOLD candidates** because eBay permission and/or freight/fulfilment economics are not proven.

This means the correct next action is **not** to install an eBay app and publish the current catalogue. The catalogue gate comes first.

## Best current pilot path

The Southern Pet group is the strongest existing route toward a future eBay pilot because:

1. exact SKUs are already identified;
2. listed weights are known;
3. public stock was visible at evidence capture;
4. dropship freight bands are published;
5. Australian retail-price observations exist; and
6. the supplier explicitly contemplates marketplace fulfilment — but requires prior written approval.

That is materially stronger than a supplier whose marketplace position is completely unknown, but it remains **PERMISSION-REQUIRED**, not eligible.

## Required evidence before any Southern Pet SKU may advance

1. written marketplace/eBay approval for GlobalShopCo;
2. authorised trade cost for the exact SKU;
3. confirmation of the permitted stock/ownership and ordering model under current eBay AU rules;
4. confirmation that packing slips/invoices identify GlobalShopCo appropriately and do not mislead the buyer about the seller;
5. contractual/data-handling compatibility for eBay buyer information;
6. safe inventory synchronisation method and stock buffer;
7. final parcel/cubic-weight treatment where different from listed product weight;
8. returns/warranty workflow;
9. eBay selling fee and integration-cost allowance;
10. conservative/base/strong free-delivery contribution calculation.

## Integration implication

The integration recommendation remains **eBay LINK by Omnivore as the preferred pilot candidate**, subject to owner approval before install/connection/cost. Integration should follow supplier/SKU eligibility evidence, not precede it.

## Evidence sources already held in this repository

- `docs/catalogue/AU_PET_SKU_EVIDENCE_SNAPSHOT_2026-09-03.md`
- `docs/catalogue/AU_ELEGANTER_WOODEN_TOY_DROPSHIP_EVIDENCE_2026-09-03.md`
- Home Organisation M4.1 research/reconciliation documents and `GlobalShopCo#9`
- eBay channel control issue `GlobalShopCo#17`

## Hard boundary

No supplier contact, marketplace approval request, app installation, eBay account connection, production Shopify mutation, listing publication, purchase/pre-purchase, credentials, financial commitment, merge or deployment was performed in creating this matrix.

**Current channel state:** ACTIVE / RESEARCH-GATED / ZERO EBAY-PILOT-READY SKUS.
