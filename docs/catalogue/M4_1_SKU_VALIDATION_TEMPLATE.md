# M4.1 — SKU Validation Template

**Status:** Ready for evidence collection
**Date:** 2026-08-26

This is the next validation layer after category-level research. It deliberately does not approve products for launch.

## Required evidence per SKU

| Field | Required evidence |
|---|---|
| Product | Exact product/model/SKU |
| Supplier | Supplier name + supplier product reference |
| Supplier status | Wholesale/dropship/trade eligibility confirmed |
| Landed cost | Product cost + known mandatory supplier charges |
| Delivery | Shipping cost, destination coverage and expected delivery time |
| Selling price | Proposed GlobalShopCo price + comparable market prices |
| Gross margin | Calculation before/after delivery proposition |
| Free-delivery viability | Maximum fulfilment cost the SKU can absorb while meeting target margin |
| Stock | Current/expected availability evidence |
| Returns/warranty | Supplier terms and likely customer-risk level |
| Compliance | Australian regulatory/safety requirements checked where applicable |
| Shopify taxonomy | Product type, category, tags/collections |
| Vertical mapping | Baby/Pet/Safety/Home/Tech/etc. approved verticals |
| Risk | Low/Medium/High with reason |
| Decision | Research / Candidate / Hold / Reject / Launch-ready |

## Validation rules

1. A supplier platform being reputable is not sufficient evidence that an individual SKU is launch-ready.
2. A low product cost is not sufficient if freight destroys the free-delivery economics.
3. High-risk, regulated, fragile, bulky or high-return products require additional validation.
4. Products may map to multiple WordPress verticals, but Shopify remains the single master product record.
5. No product should be published as launch-ready without evidence for supplier, cost, delivery, returns/warranty and applicable compliance.
6. Where a price or supplier claim cannot be independently verified, mark it **unverified** rather than estimating it as fact.

## Initial validation batches

### Batch A — Home organisation
Target: compact storage, organisation and practical household products.

### Batch B — Mobile/computer accessories
Target: lightweight, low-complexity accessories with manageable warranty/obsolescence risk.

### Batch C — Pet accessories
Target: compact grooming, walking, feeding, travel and toy products; exclude regulated medicines, pesticides/parasiticides, food and perishables from the initial batch.

### Batch D — Beauty accessories
Target: non-regulated tools/accessories with clear product claims and supplier documentation.

### Batch E — Baby/Kids
Target: only products where Australian safety/compliance requirements and supplier documentation are clear.

## Output standard

The result of M4.1 should be a scored shortlist, not a bulk product upload. The shortlist becomes an input to the Shopify catalogue build only after commercial and compliance validation.
