# GlobalShopCo — Shopify Headless Vertical Slice

## Status

APPROVED — 2026-08-26

## Purpose

This document defines the minimum architecture for the first usable GlobalShopCo Shopify/headless vertical slice.

## Approved Architecture

- Shopify is the commerce backend.
- WordPress is the headless customer-facing frontend.
- Shopify supplies the product/catalogue data.
- WordPress retrieves and displays Shopify product data.
- Shopify handles the commerce and checkout side.
- WordPress sends the customer into the Shopify purchase flow.

## First Vertical Slice

The first slice must demonstrate:

1. A product exists in Shopify.
2. WordPress can retrieve the Shopify product data.
3. WordPress can display the product to a customer.
4. The customer can initiate a purchase.
5. The customer reaches the defined Shopify purchase/checkout flow.
6. The complete flow can be demonstrated using non-production/test data.

## Scope Boundary

The first slice does NOT require:

- multi-channel marketplace integration
- eBay integration
- advanced inventory synchronisation
- customer accounts
- analytics platform
- automation platform
- multi-tenant franchise functionality
- advanced search
- advanced filtering
- production deployment

These may be considered after the first vertical slice is proven.

## Acceptance Criterion

The vertical slice is successful when a test customer can move from:

Shopify product
→ WordPress product page
→ purchase action
→ Shopify commerce/checkout flow

using test/non-production data.

## Owner Decision

Approved by Darrin as the working architecture for the first vertical slice.
