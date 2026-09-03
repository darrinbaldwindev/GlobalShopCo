# Eleganter Australia — Authenticated Evidence Request Pack

**Date:** 2026-09-04
**Status:** non-production procurement/review aid
**Purpose:** Convert the remaining public-evidence gaps into a bounded supplier-account verification request for GlobalShopCo.

## Gate this closes

The existing Eleganter evidence establishes a plausible Australian dropship candidate, but it does not establish GlobalShopCo's authenticated trade economics, account acceptance, SKU-level safety evidence, or operational feed/API capability. This pack is designed to request only the evidence needed to decide whether a controlled pilot is commercially and operationally viable.

## Request A — account and channel eligibility

Ask the supplier to confirm in writing:

- GlobalShopCo can open/operate a trade or dropship account using its own website/storefront.
- The account is permitted to sell the requested product categories to Australian customers.
- Any approval, minimum account requirements, ongoing fees, or prohibited channels.
- Whether marketplace selling is excluded; do not assume that website eligibility extends to marketplaces.
- Whether orders may be placed automatically or must be placed manually during an initial pilot.

## Request B — authenticated pricing and freight

For a representative set of 5–10 candidate SKUs, request:

- current trade/dropship unit price excluding GST;
- GST treatment;
- current domestic freight by destination/postcode bands, or the supplier's freight calculation method;
- any handling, pick/pack, remote-area, oversized-item or address-correction charges;
- whether freight is charged per order, per item, or by another rule;
- whether pricing is fixed for a stated period or subject to change without notice.

Do not substitute public retail pricing for trade cost.

## Request C — fulfilment and customer-facing shipping

Confirm:

- normal dispatch SLA and exceptions;
- carrier(s) used;
- tracking availability and when tracking becomes available;
- whether parcels can be sent without supplier retail invoices/marketing material when dropshipping;
- what sender/return address appears on the parcel;
- whether supplier branding is visible;
- how backorders/stockouts are handled;
- whether split shipments can occur.

## Request D — returns, damage and customer service

Confirm:

- change-of-mind return policy for dropship orders;
- faulty/damaged-on-arrival process;
- incorrect-item process;
- customer-not-home/returned-to-sender treatment;
- return freight responsibility in each case;
- refund/credit timing and whether credits are issued to the trade account;
- evidence required for damage/fault claims;
- who communicates directly with the end customer when GlobalShopCo is the seller of record.

## Request E — product safety/compliance evidence

For each candidate SKU intended for sale, request the applicable current evidence, such as:

- model/SKU identifier matching the listing;
- manufacturer/importer/supplier identity;
- applicable Australian mandatory-standard evidence where relevant;
- test report/certificate or supplier compliance declaration where appropriate;
- age grading and warnings;
- material/chemical/magnet/battery information where applicable;
- evidence date and issuing laboratory/body where applicable.

A supplier-level or unrelated-product test report must not be treated as proof for a different SKU.

## Request F — catalogue/feed capability

Confirm whether the supplier provides:

- product feed/API/CSV or another structured catalogue source;
- stable SKU identifiers;
- stock/availability data and update frequency;
- trade price data and update frequency;
- image/description usage permission for retailer listings;
- order-status/tracking feed or API;
- documented rate limits or integration requirements.

If no structured integration exists, record manual-order handling as a pilot constraint rather than inventing an integration.

## Evidence handling rule

Store the supplier response, supporting files, access date, account scope, and evidence identifiers in the restricted procurement/evidence system where available. Do not commit credentials, private portal URLs containing tokens, customer information, or confidential supplier documents to the public repository.

## Decision rule

A positive supplier response does **not** by itself approve a SKU. A pilot candidate requires, at minimum:

1. authenticated account eligibility;
2. authenticated cost and freight evidence;
3. returns/damage handling understood;
4. SKU-level compliance evidence where applicable;
5. fulfilment/tracking behaviour understood;
6. sufficient margin after free-delivery cost and payment/operating costs;
7. no unresolved material legal, safety, or customer-trust blocker.

If any material item remains unknown, retain `HOLD` for that SKU or supplier path.

## Suggested bounded pilot request

Start with no more than 5–10 representative SKUs spanning different price/size/fulfilment profiles. Do not commit purchase volume or customer orders solely to obtain evidence. Use the supplier's normal account/onboarding process and request written confirmation before commercial activation.
