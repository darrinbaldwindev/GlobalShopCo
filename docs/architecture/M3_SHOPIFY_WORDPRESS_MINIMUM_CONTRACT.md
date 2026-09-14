# M3 — Shopify → WordPress Minimum Integration Contract

**Status:** Prepared for non-production implementation planning; not a production API specification.

## Purpose

Define the smallest data and behaviour boundary required for the first GlobalShopCo vertical slice:

**Shopify test product → WordPress retrieval → product display → Shopify checkout**

This document deliberately excludes catalogue synchronisation, customer accounts, order management, analytics, eBay/marketplaces, automation and multi-tenant functionality.

## Source of truth

Shopify remains the commerce source of truth for product, variant, price, inventory/availability, cart and checkout. WordPress consumes the required presentation data and initiates the Shopify purchase flow.

## Minimum product representation

The WordPress presentation layer must be able to obtain:

- Shopify product ID
- Product handle
- Title
- Description
- Featured image URL/alt text when available
- At least one available variant ID
- SKU when available
- Display price
- Currency
- Availability/inventory state sufficient to prevent an unavailable item being presented as purchasable
- A stable purchase/checkout handoff target

## Error and empty states

The implementation must explicitly handle:

1. Product not found
2. Product exists but has no purchasable variant
3. Product unavailable/out of stock
4. Missing optional image/SKU data
5. Shopify/API request failure or timeout
6. Checkout handoff failure

No failure state should expose credentials, internal tokens or sensitive configuration.

## Configuration boundary

Non-production configuration must be supplied through the runtime/environment rather than committed secrets. Expected configuration names should be documented, but secret values must never be stored in Git.

Suggested categories:

- Shopify store/domain identifier
- Storefront API endpoint/version
- Storefront API public access configuration as applicable
- Non-production product/handle used for validation
- WordPress environment indicator

## Checkout boundary

WordPress should not implement payment processing or duplicate Shopify order logic. The first slice only needs to initiate the approved Shopify checkout/cart flow using the selected product variant and quantity.

## Acceptance evidence

A successful M3 demonstration should show:

1. Controlled Shopify test product exists in non-production state.
2. WordPress retrieves the product through the approved Shopify Storefront API path.
3. Product information renders correctly.
4. Variant/availability state is represented correctly.
5. Purchase action reaches the Shopify checkout flow without WordPress handling payment.
6. Failure/empty behaviour can be demonstrated or tested.
7. No secrets are present in source control.

## Scope gate

This contract is intentionally insufficient for production launch. Production concerns such as caching strategy, rate limiting, monitoring, SEO, consent/privacy, accessibility audit, performance budgets, fulfilment, tax/shipping rules and operational recovery require separate acceptance criteria before release.
