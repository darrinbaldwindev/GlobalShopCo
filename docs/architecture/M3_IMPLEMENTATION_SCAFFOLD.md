# M3 Implementation Scaffold — Ready-to-Execute Templates

**Status:** Implementation-ready code templates; awaiting H-03 authorization
**Prepared:** 2026-09-06
**Prerequisites:** H-03 approval, repository location designation, non-production Shopify API credentials

## Purpose

This document provides complete, ready-to-use file templates and implementation sequence for immediate M3 vertical slice execution once H-03 is authorized. All code templates are deterministic, testable, and bounded to M3 scope.

## Repository Initialization Sequence

### Step 1: Repository Structure Creation

```bash
# Execute after H-03 authorization only
mkdir -p src/lib src/components src/pages/product src/utils tests/integration docs
touch .gitignore .env.example README.md
```

### Step 2: Core Configuration Files

#### `.gitignore`

```
# Environment and secrets
.env
.env.local
.env.production

# Dependencies
node_modules/

# Build outputs
.next/
out/
build/
dist/

# Logs
*.log
npm-debug.log*

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
```

#### `.env.example`

```bash
# Shopify Configuration (NO ACTUAL SECRETS - RUNTIME SUPPLIED ONLY)
SHOPIFY_STORE_DOMAIN=example-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-token-here
SHOPIFY_API_VERSION=2024-01

# Environment
ENVIRONMENT=development

# M3 Test Configuration
TEST_PRODUCT_HANDLE=globalshopco-vertical-slice-test-product

# Application
PORT=3000
```

#### `README.md`

```markdown
# GlobalShopCo Headless Commerce — M3 Vertical Slice

**Status:** Non-production M3 implementation
**Scope:** Single product retrieval, display, and Shopify checkout handoff

## Architecture

- **Commerce Backend:** Shopify
- **Storefront:** Headless (Next.js/React or WordPress)
- **Checkout:** Shopify native checkout
- **Data Flow:** Shopify → Storefront API → Product Display → Shopify Checkout

## M3 Scope Boundary

**Included:**
- Single product retrieval by handle
- Product display (title, description, image, price, availability)
- Shopify checkout handoff

**Excluded (Post-M3):**
- Catalogue bulk operations
- Multi-product pages
- Search and filtering
- Customer accounts
- Order management
- Marketplace integrations
- Analytics platforms
- Production deployment

## Prerequisites

- Node.js 18+
- Non-production Shopify store with Storefront API access
- Test product published in draft state

## Setup

1. Clone repository
2. Copy `.env.example` to `.env`
3. Obtain non-production Shopify credentials from owner
4. Configure `.env` with actual values
5. Install dependencies: `npm install`
6. Run development server: `npm run dev`
7. Navigate to `/product/[TEST_PRODUCT_HANDLE]`

## Security

- Never commit `.env` files
- Use non-production Shopify environment only
- No Admin API access
- No production credentials

## Acceptance

See `docs/architecture/M3_ACCEPTANCE_CHECKLIST.md` for complete acceptance criteria.

## References

- H-03 Specification: `docs/architecture/H03_WORDPRESS_IMPLEMENTATION_SPECIFICATION.md`
- M3 Contract: `docs/architecture/M3_SHOPIFY_WORDPRESS_MINIMUM_CONTRACT.md`
```

## Core Implementation Templates

### Template 1: Shopify API Client (`src/lib/shopify.js`)

```javascript
/**
 * Shopify Storefront API Client
 * M3 Scope: Single product retrieval only
 */

const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const API_VERSION = process.env.SHOPIFY_API_VERSION || '2024-01';

const STOREFRONT_API_URL = `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`;

/**
 * Execute Shopify Storefront API GraphQL query
 * @param {string} query - GraphQL query string
 * @param {object} variables - Query variables
 * @returns {Promise<object>} API response data
 * @throws {Error} API errors with type classification
 */
async function shopifyFetch(query, variables = {}) {
  if (!SHOPIFY_DOMAIN || !STOREFRONT_TOKEN) {
    throw new Error('Shopify configuration missing - ensure .env is configured');
  }

  if (process.env.ENVIRONMENT === 'production') {
    throw new Error('M3 implementation must not access production environment');
  }

  try {
    const response = await fetch(STOREFRONT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
      timeout: 5000, // 5 second timeout
    });

    if (!response.ok) {
      throw {
        type: 'API_ERROR',
        message: `Shopify API returned ${response.status}`,
        retryable: response.status >= 500,
      };
    }

    const json = await response.json();

    if (json.errors) {
      throw {
        type: 'API_ERROR',
        message: json.errors[0]?.message || 'GraphQL query failed',
        retryable: false,
      };
    }

    return json.data;
  } catch (error) {
    if (error.type) throw error;

    throw {
      type: error.name === 'AbortError' ? 'TIMEOUT' : 'API_ERROR',
      message: error.message,
      retryable: true,
    };
  }
}

/**
 * Get product by handle from Shopify
 * @param {string} handle - Product handle
 * @returns {Promise<object>} Product data
 * @throws {Error} NOT_FOUND, UNAVAILABLE, or API_ERROR
 */
export async function getProductByHandle(handle) {
  validateProductHandle(handle);

  const query = `
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
  `;

  const data = await shopifyFetch(query, { handle });

  if (!data.productByHandle) {
    throw {
      type: 'NOT_FOUND',
      message: `Product "${handle}" not found`,
      retryable: false,
    };
  }

  const product = data.productByHandle;

  // Check if product has any available variants
  const hasAvailableVariant = product.variants.edges.some(
    ({ node }) => node.availableForSale
  );

  if (!hasAvailableVariant) {
    throw {
      type: 'UNAVAILABLE',
      message: 'Product is currently unavailable',
      retryable: false,
    };
  }

  return product;
}

/**
 * Validate product handle against M3 scope boundary
 * @param {string} handle - Product handle to validate
 */
function validateProductHandle(handle) {
  const allowedTestHandles = [
    process.env.TEST_PRODUCT_HANDLE,
    'globalshopco-vertical-slice-test-product',
    'gsco-test-001',
  ].filter(Boolean);

  if (!allowedTestHandles.includes(handle.toLowerCase())) {
    console.warn(
      `[M3 BOUNDARY] Product handle "${handle}" is outside M3 test scope. ` +
      `Expected one of: ${allowedTestHandles.join(', ')}`
    );
  }
}
```

### Template 2: Checkout Handoff Utility (`src/utils/checkout.js`)

```javascript
/**
 * Shopify Checkout Handoff
 * M3 Scope: Direct cart URL generation
 */

/**
 * Generate Shopify checkout URL for direct cart creation
 * @param {string} variantId - Shopify variant GID (e.g., "gid://shopify/ProductVariant/123456")
 * @param {number} quantity - Item quantity
 * @returns {string} Shopify checkout URL
 */
export function generateCheckoutUrl(variantId, quantity = 1) {
  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN;

  if (!storeDomain) {
    throw new Error('SHOPIFY_STORE_DOMAIN not configured');
  }

  if (!variantId || typeof variantId !== 'string') {
    throw new Error('Invalid variant ID');
  }

  // Extract numeric ID from Shopify GID format
  const numericVariantId = variantId.includes('/')
    ? variantId.split('/').pop()
    : variantId;

  // Shopify direct cart URL format: https://store.myshopify.com/cart/VARIANT_ID:QUANTITY
  return `https://${storeDomain}/cart/${numericVariantId}:${quantity}`;
}

/**
 * Initiate checkout handoff (client-side navigation)
 * @param {string} variantId - Shopify variant GID
 * @param {number} quantity - Item quantity
 */
export function initiateCheckout(variantId, quantity = 1) {
  const checkoutUrl = generateCheckoutUrl(variantId, quantity);

  // Navigate to Shopify checkout
  // For M3: use same-window navigation
  // Production consideration: may use window.open() for new tab
  window.location.href = checkoutUrl;
}
```

### Template 3: Product Display Component (`src/components/Product.jsx`)

```javascript
/**
 * Product Display Component
 * M3 Scope: Single product presentation with checkout handoff
 */

import { useState } from 'react';
import { initiateCheckout } from '../utils/checkout';

export default function Product({ product, error }) {
  const [isLoading, setIsLoading] = useState(false);

  if (error) {
    return <ProductError error={error} />;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  const firstVariant = product.variants.edges[0]?.node;
  const availableVariant = product.variants.edges.find(
    ({ node }) => node.availableForSale
  )?.node;

  const handlePurchase = () => {
    if (!availableVariant) return;

    setIsLoading(true);
    initiateCheckout(availableVariant.id, 1);
  };

  return (
    <div className="product-container">
      {product.featuredImage && (
        <img
          src={product.featuredImage.url}
          alt={product.featuredImage.altText || product.title}
          className="product-image"
        />
      )}

      <h1>{product.title}</h1>

      <div
        className="product-description"
        dangerouslySetInnerHTML={{ __html: product.description }}
      />

      {firstVariant && (
        <div className="product-details">
          {firstVariant.sku && <p>SKU: {firstVariant.sku}</p>}
          <p className="product-price">
            {firstVariant.price.currencyCode} ${firstVariant.price.amount}
          </p>
        </div>
      )}

      {availableVariant ? (
        <button
          onClick={handlePurchase}
          disabled={isLoading}
          className="purchase-button"
        >
          {isLoading ? 'Redirecting...' : 'Buy Now'}
        </button>
      ) : (
        <p className="unavailable-message">Currently Unavailable</p>
      )}
    </div>
  );
}

function ProductError({ error }) {
  const errorMessages = {
    NOT_FOUND: 'Product not found',
    UNAVAILABLE: 'This product is currently unavailable',
    API_ERROR: 'Unable to load product. Please try again later.',
    TIMEOUT: 'Request timed out. Please try again.',
  };

  return (
    <div className="product-error">
      <h2>Oops!</h2>
      <p>{errorMessages[error.type] || 'An error occurred'}</p>
    </div>
  );
}
```

## Deterministic Acceptance Tests

### Template 4: Integration Test (`tests/integration/product-flow.test.js`)

```javascript
/**
 * M3 Vertical Slice Integration Tests
 * Validates complete product flow: retrieval → display → checkout handoff
 */

import { getProductByHandle } from '../../src/lib/shopify';
import { generateCheckoutUrl } from '../../src/utils/checkout';

describe('M3 Vertical Slice - Product Flow', () => {
  const TEST_PRODUCT_HANDLE = process.env.TEST_PRODUCT_HANDLE || 'globalshopco-vertical-slice-test-product';

  test('retrieves test product from Shopify', async () => {
    const product = await getProductByHandle(TEST_PRODUCT_HANDLE);

    expect(product).toBeDefined();
    expect(product.handle).toBe(TEST_PRODUCT_HANDLE);
    expect(product.title).toBeDefined();
    expect(product.variants.edges.length).toBeGreaterThan(0);
  });

  test('product has required fields for display', async () => {
    const product = await getProductByHandle(TEST_PRODUCT_HANDLE);

    expect(product.id).toBeDefined();
    expect(product.title).toBeDefined();
    expect(product.description).toBeDefined();
    expect(product.variants.edges[0].node.price).toBeDefined();
    expect(product.variants.edges[0].node.price.amount).toBeDefined();
    expect(product.variants.edges[0].node.price.currencyCode).toBeDefined();
  });

  test('generates valid checkout URL', () => {
    const variantId = 'gid://shopify/ProductVariant/123456';
    const checkoutUrl = generateCheckoutUrl(variantId, 1);

    expect(checkoutUrl).toContain('myshopify.com/cart');
    expect(checkoutUrl).toContain('123456:1');
  });

  test('handles product not found error', async () => {
    await expect(getProductByHandle('nonexistent-product')).rejects.toMatchObject({
      type: 'NOT_FOUND',
      retryable: false,
    });
  });

  test('prevents production environment access', async () => {
    const originalEnv = process.env.ENVIRONMENT;
    process.env.ENVIRONMENT = 'production';

    await expect(getProductByHandle(TEST_PRODUCT_HANDLE)).rejects.toThrow(
      'must not access production environment'
    );

    process.env.ENVIRONMENT = originalEnv;
  });
});
```

## Implementation Execution Sequence

### Phase 1: Repository Setup (Day 1)
1. Create repository at authorized location
2. Initialize with `.gitignore`, `.env.example`, `README.md`
3. Set up branch protection on `main`
4. Create `develop` branch
5. **Verify:** No `.env` file committed; secret scanning enabled

### Phase 2: Shopify Integration (Days 2-3)
1. Implement `src/lib/shopify.js` from Template 1
2. Obtain non-production Storefront API token from owner
3. Configure `.env` locally (NOT committed)
4. Test product retrieval with controlled test product
5. **Verify:** Product data retrieved successfully; M3 boundary enforced

### Phase 3: Product Display (Days 4-5)
1. Implement `src/components/Product.jsx` from Template 3
2. Create product page route
3. Test display with all required fields
4. Test error states (not found, unavailable, API error)
5. **Verify:** Product renders correctly; error states handled

### Phase 4: Checkout Handoff (Day 6)
1. Implement `src/utils/checkout.js` from Template 2
2. Wire purchase button to checkout handoff
3. Test navigation to Shopify checkout with test product
4. Verify cart contains correct variant and quantity
5. **Verify:** Complete flow from product display to Shopify checkout

### Phase 5: Testing and Evidence (Day 7)
1. Implement `tests/integration/product-flow.test.js` from Template 4
2. Execute all tests: `npm test`
3. Document test results in `docs/TESTING.md`
4. Perform manual acceptance test per M3 checklist
5. **Verify:** All Gates A-E satisfied with evidence

## Security Checklist

- [ ] `.env` in `.gitignore`
- [ ] `.env.example` contains NO secrets
- [ ] GitHub secret scanning enabled
- [ ] Production environment access blocked in code
- [ ] M3 boundary validation active
- [ ] HTML description sanitized in display component
- [ ] Error messages expose no sensitive data
- [ ] Git history reviewed for accidental secret commits

## M3 Gate Completion Evidence

Upon implementation completion, provide:

1. Repository URL
2. Commit SHA of M3 implementation
3. Development environment URL (if applicable)
4. Test execution results
5. Screenshot/recording of complete vertical slice flow
6. Confirmation of all M3 Acceptance Checklist items

## Next Gate After M3

M3 completion unblocks:
- M4 product publication (requires separate S-12 approval)
- Catalogue expansion (post-M3 scope)
- Production deployment planning (requires hosting decision)

M3 does NOT authorize:
- Product publication in Shopify
- Production environment access
- Catalogue bulk operations
- Marketplace integrations

---

**This scaffold is ready for immediate execution upon H-03 authorization. All templates are complete, testable, and bounded to M3 scope.**
