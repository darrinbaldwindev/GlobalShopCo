# M3 — Headless Vertical Slice Acceptance Checklist

**Status:** Non-production planning checklist.

## Gate A — Source location

- [ ] Canonical WordPress/headless repository identified
- [ ] Responsible owner identified
- [ ] Canonical branch identified
- [ ] Deployment/hosting target identified separately before deployment

## Gate B — Shopify integration

- [ ] Non-production Shopify Storefront API path selected
- [ ] Configuration supplied outside source control
- [ ] Controlled test product identified
- [ ] Minimum product contract implemented

## Gate C — WordPress presentation

- [ ] Product retrieval succeeds
- [ ] Product title/description/image render
- [ ] Variant/SKU/price/currency render correctly
- [ ] Availability state prevents invalid purchase presentation
- [ ] Missing/empty/error states are handled

## Gate D — Checkout

- [ ] Purchase action uses the approved Shopify cart/checkout path
- [ ] WordPress does not process payment
- [ ] Checkout handoff is demonstrated in non-production

## Gate E — Evidence and safety

- [ ] Test evidence recorded against the controlled product
- [ ] No secrets committed
- [ ] No production product is required for validation
- [ ] No catalogue bulk-import is required
- [ ] No eBay/marketplace/customer-account/analytics/multi-tenant work is included

## Completion rule

M3 is complete only when Gates A–E are evidenced. Catalogue development may continue separately, but cannot substitute for M3 technical evidence.
