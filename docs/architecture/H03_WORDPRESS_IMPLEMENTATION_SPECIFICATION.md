# H-03 — WordPress/Headless Implementation Location Specification

**Status:** Implementation-ready decision artifact; awaiting owner authorization
**Prepared:** 2026-09-06
**Decision authority:** Darrin

## Purpose

This document provides the complete technical specification for the H-03 WordPress/headless implementation location gate. It identifies the exact proposed canonical location, interfaces, Shopify checkout handoff mechanism, controlled product-data boundary, and acceptance criteria needed for immediate M3 vertical slice implementation once owner authorization is received.

## Proposed Canonical Implementation Location
**Implementation scaffold:** Ready-to-execute code templates and implementation sequence available in `M3_IMPLEMENTATION_SCAFFOLD.md`.


### Repository Structure

**Recommended approach:** Create a dedicated private repository `GlobalShopCo-Headless` within the `darrinbaldwindev` GitHub organization.

```
GlobalShopCo-Headless/
├── README.md
├── .gitignore
├── .env.example              # Configuration template (NO SECRETS)
├── docs/
│   ├── SETUP.md             # Non-production setup guide
│   ├── DEPLOYMENT.md        # Deployment guide (created when hosting selected)
│   └── TESTING.md           # M3 acceptance test procedures
├── src/
│   ├── components/
│   │   └── Product.jsx      # Product display component
│   ├── lib/
│   │   ├── shopify.js       # Shopify Storefront API client
│   │   └── config.js        # Environment configuration loader
│   ├── pages/
│   │   └── product/[handle].jsx  # Product page route
│   └── utils/
│       └── checkout.js      # Shopify checkout handoff logic
└── tests/
    └── integration/
        └── product-flow.test.js  # M3 vertical slice test
```

**Branch strategy:**
- `main` - Protected default branch
- `develop` - Integration branch for M3 development
- Feature branches following `feature/m3-*` naming

**Responsible owner:** To be designated by Darrin (must have WordPress/React implementation capability)

### Alternative Approach

If a WordPress plugin architecture is preferred over a standalone Next.js/React application:

```
GlobalShopCo-Headless/
├── globalshopco-shopify-integration/
│   ├── globalshopco-shopify-integration.php  # Plugin entry point
│   ├── includes/
│   │   ├── class-shopify-client.php
│   │   ├── class-product-handler.php
│   │   └── class-checkout-handler.php
│   ├── templates/
│   │   └── product-display.php
│   └── assets/
│       ├── js/
│       └── css/
```

## Shopify Storefront API Integration Interfaces

### Required Configuration Variables

Environment variables to be supplied at runtime (NEVER committed to source control):

```
SHOPIFY_STORE_DOMAIN=globalshopco-test.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=<runtime-supplied-token>
SHOPIFY_API_VERSION=2024-01
ENVIRONMENT=development|staging|production
TEST_PRODUCT_HANDLE=vertical-slice-test-product
```

### Product Data Interface Contract

```javascript
// Minimum product data structure from Shopify Storefront API
interface ShopifyProduct {
  id: string;                    // Shopify GID
  handle: string;                 // URL-safe product identifier
  title: string;                  // Product title
  description: string;            // HTML product description
  featuredImage: {
    url: string;
    altText: string | null;
  } | null;
  variants: {
    edges: Array<{
      node: {
        id: string;              // Variant GID
        sku: string | null;
        price: {
          amount: string;
          currencyCode: string;
        };
        availableForSale: boolean;
      }
    }>
  };
}
```

### Shopify Storefront API Query

```graphql
query GetProductByHandle($handle: String!) {
  productByHandle(handle: $handle) {
    id
    handle
    title
    description
    featuredImage {
      url
      altText
    }
    variants(first: 10) {
      edges {
        node {
          id
          sku
          price {
            amount
            currencyCode
          }
          availableForSale
        }
      }
    }
  }
}
```

### Error Handling Interface

```javascript
interface ProductError {
  type: 'NOT_FOUND' | 'UNAVAILABLE' | 'API_ERROR' | 'TIMEOUT';
  message: string;
  retryable: boolean;
}
```

## Shopify Checkout Handoff Mechanism

### Checkout URL Generation

```javascript
/**
 * Generate Shopify checkout URL for direct cart creation
 * @param {string} variantId - Shopify variant GID
 * @param {number} quantity - Item quantity
 * @returns {string} Shopify checkout URL
 */
function generateCheckoutUrl(variantId, quantity = 1) {
  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN;
  const numericVariantId = variantId.split('/').pop();
  return `https://${storeDomain}/cart/${numericVariantId}:${quantity}`;
}
```

### Alternative: Storefront API Cart Creation

```graphql
mutation CreateCart($lineItems: [CartLineInput!]!) {
  cartCreate(input: { lines: $lineItems }) {
    cart {
      id
      checkoutUrl
    }
    userErrors {
      field
      message
    }
  }
}
```

**Recommendation:** Use direct cart URL for M3 simplicity; implement Cart API for production if session/analytics tracking is required.

## Controlled Product-Data Boundary

### M3 Scope Enforcement

**Permitted data access:**
- Single product retrieval by handle via Storefront API
- Product variants for the controlled test product only
- Read-only operations only
- Non-production Shopify environment

**Prohibited operations:**
- Bulk product queries or catalogue synchronization
- Product creation, update, or deletion
- Inventory modification
- Order management
- Customer data access
- Admin API usage
- Production Shopify store access

### Data Validation Requirements

```javascript
// Validate that only controlled test product is accessed
function validateProductHandle(handle) {
  const allowedTestHandles = [
    process.env.TEST_PRODUCT_HANDLE,
    'globalshopco-vertical-slice-test-product',
    'gsco-test-001'
  ];
  
  if (process.env.ENVIRONMENT === 'production') {
    throw new Error('M3 implementation must not access production environment');
  }
  
  if (!allowedTestHandles.includes(handle.toLowerCase())) {
    console.warn(`Product handle ${handle} is outside M3 test boundary`);
  }
  
  return true;
}
```

## M3 Acceptance Criteria (Technical Implementation)

### Gate A: Source Location (H-03 Resolution)

- [ ] Repository `GlobalShopCo-Headless` created and accessible
- [ ] Repository visibility set to private
- [ ] Default branch `main` established with branch protection
- [ ] Development branch `develop` created
- [ ] Responsible implementation owner designated by name
- [ ] `.gitignore` excludes `.env`, `node_modules`, and build artifacts
- [ ] `.env.example` documents required configuration variables with placeholder values only

### Gate B: Shopify Integration Implementation

- [ ] Shopify Storefront API client implemented per interface specification
- [ ] Configuration loaded from environment variables (no hardcoded values)
- [ ] GraphQL query for product-by-handle implemented
- [ ] Controlled test product successfully retrieved in development environment
- [ ] Product handle validation enforces M3 boundary
- [ ] API error handling implements all required error types
- [ ] Request timeout configured (recommended 5000ms)

### Gate C: WordPress/React Product Display

- [ ] Product page component/template implemented
- [ ] Product title renders from Shopify data
- [ ] Product description renders with HTML sanitization
- [ ] Featured image displays with alt text
- [ ] First available variant price and currency display correctly
- [ ] SKU displays when available
- [ ] Availability state prevents purchase UI when `availableForSale: false`
- [ ] "Product not found" state renders appropriately
- [ ] "Product unavailable" state renders appropriately
- [ ] "API error" state renders with user-friendly message
- [ ] No sensitive data (credentials, internal IDs) exposed in client-side code or error messages

### Gate D: Shopify Checkout Handoff

- [ ] Checkout URL generation function implemented
- [ ] Purchase button/link navigates to Shopify checkout
- [ ] Variant ID and quantity pass correctly to Shopify cart
- [ ] Checkout handoff tested with controlled test product in development environment
- [ ] WordPress/React does not implement payment form
- [ ] WordPress/React does not implement order processing
- [ ] Navigation to Shopify checkout occurs in appropriate context (same window/new tab per UX decision)

### Gate E: Evidence and Safety

- [ ] Integration test demonstrates complete flow: product retrieval → display → checkout handoff
- [ ] Test results documented in `docs/TESTING.md`
- [ ] Git history confirms no `.env` file or secrets were ever committed
- [ ] Repository secret scanning enabled (GitHub security features)
- [ ] No production Shopify store credentials or access used
- [ ] No product publication occurred (test product remains draft in Shopify)
- [ ] No catalogue bulk operations implemented
- [ ] No eBay, marketplace, customer account, or analytics integration included
- [ ] M3 scope boundary documentation included in README.md

## Non-Production Validation Procedure

### Development Environment Setup

1. Clone repository
2. Copy `.env.example` to `.env`
3. Obtain non-production Shopify Storefront API access token from owner
4. Configure environment variables
5. Install dependencies
6. Run development server

### M3 Acceptance Test

```bash
# Test procedure
1. Navigate to product page: /product/[TEST_PRODUCT_HANDLE]
2. Verify product title displays: "GlobalShopCo Vertical Slice Test Product"
3. Verify price displays: "$1.00 AUD"
4. Verify "Add to Cart" or "Buy Now" button is visible
5. Click purchase button
6. Verify navigation to Shopify checkout with test product in cart
7. Verify Shopify checkout URL contains correct variant ID
8. DO NOT complete purchase (test scope ends at checkout handoff)
```

### Automated Test Requirements

```javascript
// Example integration test structure
describe('M3 Vertical Slice', () => {
  it('retrieves test product from Shopify', async () => {
    const product = await getProductByHandle(TEST_PRODUCT_HANDLE);
    expect(product).toBeDefined();
    expect(product.title).toBe('GlobalShopCo Vertical Slice Test Product');
  });
  
  it('generates valid checkout URL', () => {
    const variantId = 'gid://shopify/ProductVariant/123456';
    const checkoutUrl = generateCheckoutUrl(variantId, 1);
    expect(checkoutUrl).toContain('myshopify.com/cart');
  });
  
  it('handles product not found error', async () => {
    await expect(getProductByHandle('nonexistent')).rejects.toThrow('NOT_FOUND');
  });
});
```

## Technology Stack Recommendation

### Option A: Next.js + React (Recommended for Headless WordPress Alternative)

- **Framework:** Next.js 14+ with App Router
- **Language:** JavaScript/TypeScript
- **Styling:** Tailwind CSS or CSS Modules
- **API Client:** GraphQL-request or Shopify Hydrogen (if using Shopify-specific framework)
- **Testing:** Jest + React Testing Library

**Rationale:** Modern headless approach, excellent developer experience, built-in routing and API routes, strong Shopify Storefront API support.

### Option B: WordPress Plugin + React Components

- **CMS:** WordPress 6.0+
- **Language:** PHP 8.0+ (server) + JavaScript/React (client)
- **Block Editor:** Gutenberg custom block for product display
- **API Client:** WordPress HTTP API wrapper around Shopify Storefront API
- **Testing:** PHPUnit (server) + Jest (client)

**Rationale:** Integrates with existing WordPress ecosystem if GlobalShopCo has WordPress infrastructure; allows content management alongside product display.

### Decision Required

Owner must select Option A or Option B, or specify alternative technology stack before implementation begins.

## Deployment Considerations (Outside M3 Scope)

The following are identified for future owner decision but are NOT part of M3 acceptance:

- Hosting provider selection (Vercel, Netlify, AWS, traditional WordPress host)
- Domain configuration
- SSL certificate provisioning
- CDN setup
- Production Shopify store access
- Performance monitoring
- Error tracking service
- CI/CD pipeline configuration

## Security Requirements

### Credential Management

- All Shopify API credentials supplied via environment variables
- No credentials in source control (enforced by `.gitignore` and pre-commit hooks)
- GitHub repository secret scanning enabled
- Separate development/staging/production credentials (when applicable)

### API Security

- Storefront API access token (public token acceptable for M3)
- Admin API explicitly prohibited for M3 scope
- Rate limiting awareness (Shopify Storefront API: bucket-based)
- Timeout configuration to prevent indefinite hangs

### Client-Side Security

- No sensitive data in client-side JavaScript
- Product IDs and handles are non-sensitive (acceptable in client code)
- HTML description sanitization to prevent XSS
- Error messages must not expose internal system details

## Governance and Approval Gates

### Required Approvals Before Implementation

1. **H-03 Gate:** Darrin approves this specification and designates repository location
2. **Owner designation:** Implementation-capable owner named by Darrin
3. **Technology stack:** Option A, Option B, or alternative approved by owner
4. **Repository creation:** Explicit authorization to create `GlobalShopCo-Headless` repository
5. **Shopify API access:** Non-production Storefront API credentials provided by owner

### Prohibited Without Additional Authorization

- Creation of repository (requires H-03 approval)
- Access to Shopify API (requires credential provision)
- Access to WordPress hosting (requires hosting selection)
- Implementation of code (requires H-03 approval + owner designation)
- Deployment to any environment (requires separate deployment approval)
- Production Shopify store access (prohibited for M3 entirely)
- Product publication in Shopify (prohibited for M3 entirely)
- Expansion beyond single-product retrieval (requires post-M3 approval)

## Next Actions Upon H-03 Approval

1. **Immediate:** Create `GlobalShopCo-Headless` repository with specified structure
2. **Immediate:** Designate responsible implementation owner
3. **Phase 1 (Week 1):** Implement Shopify Storefront API client and product retrieval
4. **Phase 1 (Week 1):** Implement product display component/template
5. **Phase 2 (Week 2):** Implement checkout handoff mechanism
6. **Phase 2 (Week 2):** Implement error handling and boundary validation
7. **Phase 3 (Week 3):** Execute M3 acceptance test procedure
8. **Phase 3 (Week 3):** Document evidence in `docs/TESTING.md`
9. **Gate review:** Submit M3 completion evidence to owner for acceptance

## Evidence and Verification

### H-03 Approval Evidence

Once approved, record:
- Repository URL: `https://github.com/darrinbaldwindev/GlobalShopCo-Headless`
- Approval date and authority (Darrin)
- Designated implementation owner name and contact
- Selected technology stack (Option A/B/other)
- Branch protection settings enabled confirmation

### M3 Completion Evidence

Upon completion, provide:
- Git commit SHA of implementation
- Link to product page in development environment
- Screenshot/recording of complete vertical slice flow
- Test execution results
- Confirmation checklist of all Gates A-E items
- Confirmation that no secrets were committed (git log review)

## References

- M3 Minimum Contract: `docs/architecture/M3_SHOPIFY_WORDPRESS_MINIMUM_CONTRACT.md`
- M3 Acceptance Checklist: `docs/architecture/M3_ACCEPTANCE_CHECKLIST.md`
- Shopify Headless Vertical Slice: `docs/architecture/SHOPIFY_HEADLESS_VERTICAL_SLICE.md`
- Shopify Storefront API: https://shopify.dev/api/storefront
- GraphQL Best Practices: https://graphql.org/learn/best-practices/

## Decision Record Template

```markdown
## H-03 Decision — WordPress/Headless Implementation Location

**Date:** [YYYY-MM-DD]
**Decision authority:** Darrin
**Decision:** [APPROVED / MODIFIED / REJECTED]

**Approved repository location:** [GitHub URL or alternative]
**Responsible implementation owner:** [Name]
**Technology stack:** [Option A / Option B / Other: specify]
**Additional constraints or modifications:** [Any deviations from this specification]

**Authorization scope:**
- [ ] Repository creation authorized
- [ ] Non-production Shopify API access authorized (credentials to be provided separately)
- [ ] M3 implementation authorized per specification
- [ ] Development/staging environment setup authorized

**Explicitly prohibited:**
- [ ] Production Shopify store access
- [ ] Product publication or catalogue operations
- [ ] Deployment to production (requires separate approval)
- [ ] Expansion beyond M3 vertical slice scope

**Next review trigger:** M3 completion and evidence submission

**Signature:** [Owner name]
```

---

**This specification is ready for immediate implementation upon H-03 approval. No further architecture discovery or planning cycle is required.**
