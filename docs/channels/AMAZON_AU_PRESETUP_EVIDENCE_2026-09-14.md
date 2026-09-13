# Amazon AU pre-setup evidence gate — 2026-09-14

Status: **RESEARCH / PRE-SETUP ONLY**

Canonical channel control: GlobalShopCo issue #23.

Shopify remains the canonical catalogue, product, inventory and order authority for GlobalShopCo. This document does not authorize Amazon seller setup, app installation, credentials, listing publication, supplier contact, inventory purchase, FBA shipment, advertising spend or production Shopify mutation.

## Fresh official evidence checked 2026-09-14

### Amazon Australia seller fees

Official Amazon Australia pricing states:
- Individual plan: A$0.99 excl. GST per unit sold.
- Professional plan: A$49.95 excl. GST per month while active listings exist.
- Referral fees are charged per sale and vary by category; most are between 6% and 15%.
- Fulfilment costs depend on seller-fulfilled versus Amazon fulfilment options and other optional programs can add costs.

Source: https://sell.amazon.com.au/pricing

### Amazon Australia third-party fulfilment / dropshipping

Official Amazon Australia fulfilment guidance says third-party fulfilment is permitted only where GlobalShopCo is clearly the seller of record. A compliant third-party arrangement must ensure GlobalShopCo is the only seller identified on packing slips, invoices, external packaging and other customer-facing fulfilment material; conflicting third-party identity must be removed; and GlobalShopCo remains responsible for returns and applicable Amazon policies.

Source: https://sell.amazon.com.au/fulfil

### Shopify Marketplace Connect

Official Shopify documentation currently lists Amazon as a supported Marketplace Connect marketplace. Marketplace Connect can sync Shopify products, listings, inventory and orders with connected marketplaces. Amazon product requirements remain marketplace-specific; identifiers such as GTIN/UPC/MPN/EAN may be required unless an applicable exemption exists.

Sources:
- https://help.shopify.com/en/manual/online-sales-channels/marketplaces/marketplace-connect
- https://help.shopify.com/en/manual/online-sales-channels/marketplaces/marketplace-connect/products/requirements

## Deterministic preflight classification contract

An exact SKU must fail closed unless every required field below has current evidence.

### `AMAZON-ELIGIBLE`

Requires all of:
1. exact supplier and exact SKU/product identity;
2. GTIN/EAN/UPC/MPN evidence or a known valid exemption path;
3. Amazon category/product eligibility known;
4. brand/IP/reseller restrictions checked;
5. supplier marketplace permission proven;
6. seller-of-record packing/invoice/external-packaging compatibility proven;
7. fulfilment mode selected for the exact SKU: FBM or FBA;
8. if FBM: dispatch origin, handling time, tracking and return path known;
9. exact wholesale cost and GST treatment known;
10. exact outbound freight, or applicable FBA inbound/fulfilment/storage costs, known;
11. applicable Amazon selling-plan allocation included;
12. exact referral-fee category known;
13. returns/refund/warranty exposure known;
14. proposed Amazon selling price evidenced;
15. conservative contribution remains positive after all known costs;
16. no unresolved compliance/restricted-product blocker;
17. no critical UNKNOWN remains.

### `PERMISSION-REQUIRED`

Use when ordinary supply/dropshipping is possible but written marketplace permission or seller-of-record fulfilment permission is still required.

### `NOT-ELIGIBLE`

Use when current supplier terms, fulfilment identity, category restriction or product requirement conflicts with Amazon policy.

### `UNKNOWN / HOLD`

Use whenever evidence is incomplete. Missing freight, permission, exact identity, fulfilment compatibility, category eligibility or economics is sufficient to keep the SKU on HOLD.

## First-wave family disposition

| Candidate family | Current Amazon state | Evidence reason |
| --- | --- | --- |
| Southern Pet / GiGwi | `PERMISSION-REQUIRED` | Existing portfolio evidence records prior written approval as required for marketplace fulfilment. |
| Eleganter dropship products | `NOT-ELIGIBLE` | Existing portfolio evidence records owned-site-only dropship terms excluding Amazon/eBay unless terms change. |
| NewDeals / Dropshipzone Home Organisation | `UNKNOWN / HOLD` | Marketplace permission, seller-of-record packing identity, exact wholesale/freight and Amazon-specific economics remain unresolved. |
| A$0 / review-required placeholders | `NOT A CHANNEL CANDIDATE` | Research placeholders are not exact evidence-complete SKUs. |

No family above is declared Amazon-ready by this document.

## Minimum non-production verifier to implement next

A pure, fixture-driven `amazon_channel_gate` should consume an exact-SKU evidence record and return only one of:
- `AMAZON-ELIGIBLE`
- `PERMISSION-REQUIRED`
- `NOT-ELIGIBLE`
- `UNKNOWN-HOLD`

Minimum deterministic denial fixtures:
1. missing exact SKU/identifier evidence;
2. missing marketplace permission;
3. supplier identity appears on packing material;
4. freight/FBA cost unknown;
5. referral-fee category unknown;
6. negative/unknown conservative contribution;
7. A$0/review-required placeholder;
8. stale evidence timestamp or source identity mismatch.

The verifier must not connect to Amazon, Shopify, Marketplace Connect or a supplier. It must not create a second catalogue, inventory ledger or order authority. Its output is advisory gating evidence only.

## Current disposition

**AMBER / PRE-SETUP.** The policy and integration baseline is sufficiently explicit to implement the non-production fixture-driven gate, but no SKU is Amazon-ready and no seller/integration setup is authorized.