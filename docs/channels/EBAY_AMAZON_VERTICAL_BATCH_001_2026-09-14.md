# GlobalShopCo eBay + Amazon Vertical Batch 001 — 2026-09-14

Status: EXECUTED / RESEARCH + ASSURANCE / FAIL-CLOSED

## Trigger semantics

When the owner says `cont`, `continue`, or `continue autonomously` in the eBay/Amazon Overseer context, execute a full vertical batch rather than a single isolated task.

Each batch must:
1. scan the current GlobalShopCo repository state before acting;
2. reconcile current issues, open PRs, channel docs, live Shopify read-only state, and the latest owner/worker evidence;
3. select the highest-value independent tasks that can be completed without owner intervention;
4. execute as many of those tasks as practical in the same batch;
5. preserve UNKNOWN values and fail closed on missing supplier permission, freight, cost, compliance, or marketplace eligibility;
6. write durable evidence/results back to this batch record or a successor batch record;
7. stop short of publication, purchase, supplier contact, credentials, marketplace connection changes, merge, deploy, or production mutation unless separately authorised.

## Canonical authority

- Shopify remains the canonical product / inventory / price / order authority.
- GlobalShopCo issue #18 is the site-wide launch gate.
- GlobalShopCo issue #17 is the eBay channel gate.
- GlobalShopCo issue #23 is the Amazon channel gate.
- GlobalShopCo issue #9 is the commercial product-validation control point.
- Channel qualification is independent: owned-site approval does not imply eBay or Amazon approval.

## Pre-batch repository scan — verified 2026-09-14

Default branch: `agent/overseer/initial-project-timeline`
Scanned head: `76f64ee677703f90c17f557ffaf059b652c45456`

Key current repo findings:
- `docs/channels/AU_CHANNEL_CANDIDATE_MATRIX_2026-09-13.md` records zero EBAY-READY and zero AMAZON-READY products.
- issue #17 still records Marketplace Connect as HOLD and Omnivore/eBay LINK as the preferred pilot, while owner-provided live Shopify screenshots now show Marketplace Connect already installed and an eBay AU account connected. This is a state contradiction requiring reconciliation, not automatic approval of Marketplace Connect.
- issue #23 remains Amazon PRE-SETUP / research-only. No live Amazon connection has been verified in this batch.
- issue #18 keeps all production publication behind evidence-complete launch gates.
- open research PRs #10, #13, #14 and #15 remain unmerged and contain Home Organisation / freight evidence; do not assume their content is canonical unless independently reconciled.

## Batch execution lanes

### Lane A — repository truth reconciliation
- Reconcile issue #17 / channel docs against the verified live Marketplace Connect + eBay connection state.
- Preserve the distinction between `installed/connected` and `validated/reliable/approved for scale`.
- Do not infer that historical Omnivore preference remains the correct current integration decision.

### Lane B — supplier marketplace eligibility
Priority supplier ecosystems:
1. Dropshipzone / New Aim
2. CJ AU-warehouse-only
3. brand-authorised AU distribution

For each candidate SKU, require evidence for marketplace permission, seller-of-record / packing identity, stock-control safety, returns/warranty, and exact cost/freight.

### Lane C — product economics
Priority families:
1. clear pantry / fridge bin multipacks
2. premium bamboo or quality expandable drawer dividers
3. compact cupboard / under-shelf organisers
4. compact kitchen organisation above commodity price-war tier
5. compact authorised pet accessories

Reject or demote any product where supplier-direct retail pricing already consumes the available marketplace margin.

### Lane D — marketplace fit
For every surviving exact SKU:
- eBay: current sold evidence, delivered price range, dominant-seller risk, free-delivery expectation, seller policy compatibility.
- Amazon: ASIN/review moat, Buy Box / brand-control risk, GTIN/category eligibility, FBA/FBM implications, referral + fulfilment costs, supplier permission.

Classify independently as `EBAY`, `AMAZON`, `BOTH`, `HOLD`, or `REJECT`.

### Lane E — integration assurance
Before any pilot publication:
- verify Marketplace Connect listing mapping behaviour;
- verify inventory update propagation;
- verify order import to Shopify;
- verify tracking/fulfilment-state propagation;
- verify duplicate-listing protection and oversell controls;
- do not test production publication during a known marketplace/API incident.

## Batch 001 executed results

### A. Repo control-state reconciliation — COMPLETE

Issue #17 received a durable reconciliation comment on 2026-09-14.

Verified live owner evidence:
- Shopify Marketplace Connect is already installed.
- eBay Australia account `globalshopco` is already connected.

Therefore the old pre-install assumption in issue #17 is stale. Current gate is not `choose/install an eBay connector`; it is `assure the already-installed connector before publication or scale`.

This does not make Marketplace Connect GREEN. Still unverified:
- mapping correctness;
- inventory propagation;
- eBay order import into Shopify;
- tracking / fulfilment propagation;
- duplicate / oversell protection;
- reliability during eBay API incidents;
- exact eBay pricing-rule behaviour.

### B. Dropshipzone marketplace eligibility — MATERIAL NEW EVIDENCE

Public Dropshipzone guidance explicitly states that Dropshipzone supplier products can be used to dropship on Amazon and eBay and that retailer inventory can be uploaded / integrated into those channels.

Dropshipzone's shipping documentation also states that its postcode-zone shipping model can sync with major marketplaces including Amazon and eBay.

This materially improves the platform-level marketplace-fit state from `UNKNOWN` to `SUPPORTED AT PLATFORM LEVEL`.

However, exact supplier/SKU approval is still not automatic because:
- Dropshipzone's own terms state purchases remain subject to supplier-specific terms;
- supplier onboarding explicitly asks whether a supplier can blind ship and provide tracking;
- eBay and Amazon still require seller-of-record / third-party fulfilment conditions to be satisfied.

Therefore per-SKU classification remains fail-closed until exact supplier evidence confirms packing identity / blind shipping / tracking / returns / stock-control compatibility.

### C. Dropshipzone fulfilment evidence — VERIFIED

Current public Dropshipzone guidance establishes:
- suppliers generally ship from Australian distribution centres;
- dispatch is usually within 1–2 business days after payment;
- suppliers must upload tracking;
- postcode-zone shipping includes Standard, Defined and Advanced templates;
- undeliverable locations can be explicitly represented in SKU data;
- retailer-facing shipping data can be used for marketplace pricing and delivery controls.

This means the main blocker is no longer `does Dropshipzone conceptually support eBay/Amazon?`; it is now `what are the exact retailer price, freight, supplier terms and stock values for each candidate SKU?`.

### D. Product-economics filter — CURRENT PRIORITY

Retain as P0 source/economics targets:
1. premium bamboo / quality expandable drawer-divider multipacks;
2. clear pantry / fridge bin multipacks;
3. compact cupboard / under-shelf organisers above the sub-A$15 commodity tier;
4. compact spice / bottle / pantry organisers with A$25–60 marketplace ceilings;
5. compact authorised pet accessories where brand-direct competition does not remove reseller margin.

P1 / conditional:
- CARLA HOME under-sink organiser — only if authenticated wholesale + freight leaves material headroom below public NewDeals retail and current marketplace ceiling;
- CARLA HOME microwave rack — same condition.

REJECT / first-wave avoid:
- Artiss foldable laptop desk where supplier-direct public retail already undercuts viable marketplace resale;
- Artiss 5-tier corner shelf for the same reason;
- bulky Artiss / Keezi furniture already rejected by prior batches;
- commodity vacuum-storage sets with unresolved leakage / returns risk;
- products whose supplier-direct retail price consumes marketplace contribution.

### E. Integration strategy — REVISED

Do not install a second eBay connector merely because issue #17 historically preferred another integration.

Current strategy:
1. keep Shopify canonical;
2. treat Marketplace Connect as the installed eBay bridge under assurance;
3. validate read/sync behaviour before any listing pilot;
4. only research replacement connectors if Marketplace Connect fails evidence-based acceptance criteria;
5. do not run two marketplace-authority connectors concurrently.

Amazon remains independent. No Amazon connection has been verified in Batch 001.

## Revised queue after Batch 001

### P0 — authenticated data closure
For the first candidate pool, capture from Dropshipzone retailer access:
- exact SKU;
- retailer / wholesale price incl/ex GST treatment;
- current stock;
- dispatch warehouse / supplier identity where visible;
- postcode freight to representative metro + regional destinations;
- supplier-specific marketplace / blind-shipping terms where exposed;
- returns / warranty;
- exact product dimensions / packed weight.

### P0 — connector assurance
Once eBay API/service health is normal:
- inspect Marketplace Connect Listings;
- inspect Mapping;
- inspect Orders;
- verify no duplicate listing state;
- verify one safe inventory-sync path before any publication pilot.

### P1 — exact product candidates
Prioritise exact source candidates in this order:
1. premium bamboo / quality divider set;
2. clear bin multipack;
3. under-shelf / cupboard multipack;
4. compact spice / bottle organiser;
5. compact dish / pantry organiser;
6. compact pet accessory with clear marketplace permission.

### P1 — Amazon setup readiness
Before connecting Amazon:
- verify seller account exists and is eligible;
- verify Marketplace Connect Amazon connection path;
- keep Amazon assortment independent of eBay assortment;
- validate ASIN / GTIN / brand restrictions and Buy Box competition per SKU.

## Authenticated-data requirements that public research cannot close

1. Dropshipzone retailer price for exact SKUs.
2. Exact supplier postcode freight for candidate SKUs.
3. Supplier-specific blind-shipping / packing-identity detail where not public.
4. Live Dropshipzone stock at approval time.
5. Marketplace Connect current listing / mapping / order-sync state inside the installed app.
6. Amazon Seller Central gating / brand eligibility once Amazon is connected.

## Batch conclusion

Batch 001 materially reduced uncertainty:
- Dropshipzone is now verified as supporting Amazon/eBay at platform level.
- The repo's historical eBay connector state was reconciled against actual live Shopify state.
- The eBay integration problem is now assurance, not installation.
- Product research should now bias toward exact authenticated supplier economics, not more generic demand discovery.

Overall state remains AMBER / NO OVERALL GREEN.

No product was published, no marketplace setting changed, no purchase or supplier contact occurred, and no production Shopify mutation was performed.

## Execution log

- 2026-09-14: repository scanned before work.
- 2026-09-14: branch `agent/ebay-amazon/vertical-batch-001` created from exact scanned head.
- 2026-09-14: vertical batch protocol persisted in this file.
- 2026-09-14: issue #17 reconciled with verified live Marketplace Connect + eBay connection state.
- 2026-09-14: Dropshipzone marketplace, shipping, supplier-term and tracking evidence researched and reconciled.
- 2026-09-14: product and integration priorities revised.
- 2026-09-14: Batch 001 execution complete; next `cont` starts with a fresh repo scan and successor batch.
