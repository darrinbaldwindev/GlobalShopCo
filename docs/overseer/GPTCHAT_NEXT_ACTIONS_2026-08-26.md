# GPTChat Overseer — Next Actions

**Date:** 2026-08-26

## Current state

The approved architecture is Shopify commerce/product source + headless WordPress storefront + Shopify checkout. M3 is not architecturally blocked; it is implementation-location/evidence blocked.

## Immediate execution order

1. Identify the authoritative WordPress/headless implementation repository or hosting location.
2. Use `docs/architecture/M3_SHOPIFY_WORDPRESS_MINIMUM_CONTRACT.md` as the implementation contract.
3. Build only the first vertical slice: controlled Shopify test product -> WordPress retrieval -> product display -> Shopify checkout.
4. Capture reproducible acceptance evidence before expanding scope.
5. Keep M4 catalogue research parallel and non-blocking.
6. Keep Shopify candidate products in draft until the M4 publication gate is satisfied.

## Scope protection

Do not allow M3 to expand into marketplace integrations, customer accounts, analytics, automation, multi-tenancy or full catalogue migration.

## Coordination

Manus Overseer should treat the M3 contract, acceptance checklist, and H-03 implementation specification as the current decision package. The H-03 specification (`docs/architecture/H03_WORDPRESS_IMPLEMENTATION_SPECIFICATION.md`) provides the complete implementation-ready technical specification including exact proposed canonical location, interfaces, Shopify checkout handoff mechanism, controlled product-data boundary, and acceptance criteria. Any proposed implementation location should be recorded before code is treated as authoritative.

## Decision rule

