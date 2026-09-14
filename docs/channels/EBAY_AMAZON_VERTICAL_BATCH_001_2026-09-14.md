# GlobalShopCo eBay + Amazon Vertical Batch 001 — 2026-09-14

Status: ACTIVE / RESEARCH + ASSURANCE / FAIL-CLOSED

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

## Batch 001 execution queue

1. Reconcile repo control state against live owner evidence for Marketplace Connect/eBay.
2. Research current public evidence for Dropshipzone/New Aim marketplace restrictions and seller-of-record compatibility.
3. Re-test the strongest product families against current eBay AU and Amazon AU retail ceilings.
4. Identify exact public NewDeals/Dropshipzone-linked products whose supplier-direct retail pricing makes marketplace resale structurally weak.
5. Produce a revised P0/P1/HOLD/REJECT queue.
6. Record unresolved authenticated-data requirements separately from public-research tasks.

## Completion standard

A batch is complete only when the independent tasks above are actually executed and results are recorded. A worker claim or attractive sold-count alone is not completion.

No overall GREEN while exact wholesale, freight, marketplace permission, and channel-specific contribution remain unresolved.

## Execution log

- 2026-09-14: batch file created after repository scan. Execution in progress.
