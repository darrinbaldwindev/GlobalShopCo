# MANUS LARGE VERTICAL BATCH 02 — CORE PORTFOLIO

**Date:** 2026-09-15  
**Status:** Partial completion after wide-research execution-limit failure  
**Scope:** AgentOS, PRS, GlobalShopCo, GlobalShopCo-Headless, `shopify_ebay`, and MyPrimeDelivery. AgentOS Level 2 P0.

## 1. Completion judgment

The requested wide-research workflow was attempted twice. The first run failed because of an orchestration variable error before research began. The corrected run dispatched six lane agents, but the platform stopped the job with `creditNotEnough` before any lane report was created. This document therefore records a **manually validated interim research result**, not a claim that the intended full wide-research batch completed.

The strongest verified evidence concerns Shopify API constraints and terms, eBay OAuth and API quotas, Amazon Shipping API capabilities as a **delivery analogue only**, and Australian Privacy Principles. The product identities and canonical specifications for **PRS, GlobalShopCo, GlobalShopCo-Headless, and MyPrimeDelivery are not established by the evidence available in this session**. They remain `UNKNOWN`; their names must not be mapped silently to similarly named public products.

The safest portfolio direction is to keep **AgentOS as the sole authority and governance boundary**, integrate external commerce and delivery providers behind narrow adapters, and defer product-specific implementation decisions until canonical repositories, API contracts, ownership, and approved data-flow boundaries are supplied.

## 2. Evidence classification

| Label | Meaning used in this report |
|---|---|
| **VERIFIED FACT** | Directly supported by an authoritative source inspected in this session. |
| **REASONABLE INFERENCE** | A design conclusion derived from verified facts, clearly marked and not presented as a source statement. |
| **UNKNOWN** | Not established by an inspected authoritative source, or dependent on unresolved product identity, account configuration, contract, or owner decision. |

## 3. Cross-lane architecture rule

AgentOS Level 2 P0 should own the **delegation, authority, policy, task state, audit evidence, recovery semantics, and approval boundary**. External systems should remain systems of record for their own domain objects. Shopify should remain authoritative for Shopify merchant/store data; eBay should remain authoritative for eBay account and marketplace data; a delivery provider should remain authoritative for its shipment and tracking records. An adapter may translate, validate, retry, reconcile, and emit evidence, but it must not silently become a second scheduler, queue, ledger, registry, memory store, governance engine, persistence authority, or assurance system.

This is a **REASONABLE INFERENCE** from the non-duplication doctrine and the provider constraints below. It is not a statement made by any provider.

| Capability | Single portfolio owner | External adapter responsibility | Prohibited duplication |
|---|---|---|---|
| Authority and approvals | AgentOS control plane | Enforce received scope and reject out-of-scope calls | Provider or model self-authorizing actions |
| Task ledger and execution state | AgentOS | Return idempotency keys, provider IDs, status transitions, and errors | Independent shadow ledger treated as canonical |
| Scheduling and queueing | AgentOS | Respect provider throttles and retry hints | New general-purpose scheduler inside each connector |
| Domain records | Respective provider or approved domain owner | Map and reconcile records | Treating adapter cache as source of truth |
| Audit and assurance | AgentOS evidence boundary | Supply request, response metadata, policy and failure evidence | Unverifiable “success” flags |
| Secrets and credentials | Approved secret/control-plane boundary | Use least-privilege tokens and scoped calls | Credentials embedded in prompts, reports, or logs |

## 4. Lane A — AgentOS Level 2 P0

### Evidence position

**UNKNOWN:** No canonical AgentOS repository, design record, task ledger, execution baseline, or Level 2 P0 contract was available in the session. Consequently, no implementation claim about the current AgentOS runtime, persistence, recovery behavior, or security posture can be verified.

**VERIFIED FACT:** The governing requirement supplied for this batch is that evidence controls completion, material claims must be classified, duplicate control-plane primitives must not be proposed, and no model decides its own authority. This is task doctrine, not external product evidence.

### Implementation recommendation

**DEFER** implementation against an unspecified baseline. The implementation-grade next step is a read-only baseline package containing the canonical repository or approved worktree, source-of-truth backlog, task ledger, executor prompt, authority model, persistence contract, recovery tests, and current evidence log. Without that package, selecting an architecture would be an owner-gated source-of-truth decision.

Once the baseline is available, the likely design should be **BUILD only the missing Level 2 P0 control-plane behavior**, **INTEGRATE** existing durable execution and policy primitives where their contracts are verified, **WRAP** external providers with narrow adapters, and **DEFER** any feature that would introduce a second authority or ambiguous ownership boundary.

### Required P0 acceptance evidence

The executor should not report runtime readiness from a static design alone. Required evidence includes deterministic task identity, explicit delegated authority, denial of out-of-scope actions, append-only audit records, idempotent retries, crash/restart recovery, provider timeout and throttling behavior, secret non-disclosure, tenant/user scoping, and a human-owner gate for consequential external actions. The exact tests and file paths remain **UNKNOWN** until the baseline is supplied.

## 5. Lane B — PRS

### Evidence position

**UNKNOWN:** “PRS” is not uniquely identified by the evidence inspected in this session. Public search results include unrelated products and services, so no product, repository, API contract, pricing schedule, license, data-rights policy, security model, or Australian operating model can safely be attributed to the requested PRS lane.

### Recommendation

**DEFER** product-specific BUILD/INTEGRATE/WRAP decisions. First establish the canonical identity, owner, purpose, repository or vendor URL, environment, and domain records. After identity is verified, assess whether PRS is a domain service, reporting surface, or integration target. It must not be allowed to create a parallel AgentOS authority, task ledger, scheduler, registry, memory, governance, persistence, or assurance layer.

### Owner-gated inputs

The missing inputs are the canonical PRS source, approved integration boundary, data classification, tenancy model, commercial entitlement, and intended role in the portfolio. Treating a similarly named public service as PRS would be an unsafe **REASONABLE INFERENCE** and is not recommended.

## 6. Lane C — GlobalShopCo

### Evidence position

**UNKNOWN:** The requested “GlobalShopCo” product or repository is not established. Search results surfaced similarly named organizations and unrelated commerce services, but no canonical source tying them to this portfolio lane.

### Recommendation

**DEFER** implementation and commercial conclusions. Do not infer that GlobalShopCo means Global Shop Solutions, Global-e, or another platform. A product identity decision is required before comparing APIs, licensing, hosting, data rights, or Australian availability.

If identity is verified, the lane should be assessed as the domain system for its own commerce records. AgentOS should coordinate approved actions and record evidence, while the integration adapter should handle API versioning, pagination, webhooks, rate limits, reconciliation, and failure mapping without becoming a second control plane.

## 7. Lane D — GlobalShopCo-Headless

### Evidence position

**UNKNOWN:** No canonical source establishes the relationship between GlobalShopCo-Headless and GlobalShopCo. It is therefore unknown whether this is a storefront, a deployment profile, a repository, a separate product, or an internal architectural label.

### Recommendation

**DEFER** headless architecture selection until the relationship and contracts are verified. The minimum evidence package must identify the product boundary, storefront and checkout ownership, product/order/customer APIs, event delivery semantics, caching rules, deployment target, payment boundary, and data residency constraints.

A future headless implementation may **BUILD** presentation components and **INTEGRATE** provider APIs, but should not **BUILD** a duplicate authority, scheduler, queue, ledger, or governance layer merely because a headless frontend needs local state or caching. Any cache must be explicitly non-authoritative and bounded by retention and invalidation rules.

## 8. Lane E — `shopify_ebay`

### 8.1 Shopify verified evidence

**VERIFIED FACT:** Shopify documents a maximum input-array size of 250 and a pagination limit of 25,000 objects. Its GraphQL Admin API uses calculated query cost, with documented standard, Advanced, Plus, and enterprise rates of 100, 200, 1,000, and 2,000 points per second respectively. A single GraphQL query may not exceed 1,000 points. Shopify recommends bulk operations for large data volumes and responsible retry, caching, and throttling behavior.[1]

**VERIFIED FACT:** Shopify’s API terms require requesting only the merchant data needed for the application, obtaining merchant permission, following customer-data deletion rules, maintaining a privacy policy, protecting credentials, and keeping service providers contractually bound to protect merchant data. The terms also restrict scraping, systematic data collection, bypassing API restrictions, replicating Shopify products, and using the API to move merchants off Shopify.[2]

**REASONABLE INFERENCE:** The adapter should use GraphQL Admin API for supported operational flows, bulk operations for large backfills, bounded provider-aware retry, and a reconciliation process that records provider IDs and cursors in AgentOS evidence rather than creating a second canonical ledger.

### 8.2 eBay verified evidence

**VERIFIED FACT:** eBay uses OAuth 2.0. Application tokens are used for application-owned or non-user-specific resources, while authorization-code user tokens are used for user-specific data. OAuth scopes constrain the resources and operations available to a token.[3]

**VERIFIED FACT:** eBay publishes default daily API limits that vary by API. Examples include 25,000 Account calls per day, 100,000 Fulfillment Order calls per day, 2 million Inventory calls per day, and 5,000 calls per day for several Buy and traditional APIs. Higher limits may require an Application Growth Check, and some Buy APIs require an additional license.[4]

**REASONABLE INFERENCE:** eBay integration must model scopes per operation, isolate seller tokens, expose quota consumption and reset information to AgentOS, and make approval/retry decisions outside the connector. Default quotas cannot be treated as a universal capacity guarantee because limits vary by API, user, license, and account state.

### 8.3 Recommended implementation pattern

**INTEGRATE** Shopify and eBay through separately scoped provider adapters. **WRAP** provider-specific authentication, pagination, throttling, webhook/event normalization, idempotency, and error translation. **BUILD** only the smallest portfolio-level mapping and reconciliation layer needed to coordinate approved cross-channel workflows. **DEFER** live write operations, token activation, marketplace listing changes, and customer-data synchronization until owner-approved credentials, data flows, and test accounts exist.

| Concern | Shopify | eBay | Portfolio control |
|---|---|---|---|
| Authentication | Shopify app/API credentials and merchant permissions | OAuth 2.0 application/user tokens and scopes | AgentOS receives only approved capability and execution evidence |
| Throughput | GraphQL cost buckets, 250 input arrays, 25,000 pagination, 1,000 single-query cost | API-specific daily quotas and possible license/growth review | Provider-aware throttling, no duplicate general scheduler |
| Large sync | Bulk operations recommended | API-specific bulk/feed choices require endpoint review | Bounded reconciliation job under AgentOS authority |
| Data rights | Minimum necessary merchant data; deletion and privacy obligations | Scope and license dependent; exact retention obligations require endpoint/policy review | Minimize, classify, retain only approved fields |
| Australian implications | Privacy obligations apply when handling personal information | Same, plus marketplace and cross-border data questions | APP assessment, breach/incident process, overseas disclosure review |

## 9. Lane F — MyPrimeDelivery

### Evidence position

**UNKNOWN:** No canonical product, API, repository, contract, or owner record for “MyPrimeDelivery” was available. It must not be assumed to be Amazon Prime, Amazon Shipping, a courier, or an internal service.

**VERIFIED FACT about a separate analogue:** Amazon Shipping API v2 supports rates, shipment purchase, cancellation, tracking, and shipment documents. For off-Amazon channels such as eBay and Shopify, the documentation states that only Amazon Shipping is available, while on-Amazon orders may also support third-party carriers. The documented default quota for rates and shipment purchase is 5 requests per second, and external-channel shipment purchase must occur within 10 minutes of rate creation or the rate token expires.[5]

The Amazon Shipping facts are **not evidence about MyPrimeDelivery**. They are useful only as a comparison baseline if the owner later confirms that the intended lane is Amazon Shipping or a related service.

### Recommendation

**DEFER** implementation and vendor decisions until canonical identity, service area, shipment ownership, tracking contract, cancellation semantics, SLA, pricing, data processing terms, and Australian availability are verified. If the product is confirmed as a delivery API, **INTEGRATE** it behind a provider adapter and **WRAP** rate expiry, label purchase, tracking, cancellation, carrier errors, and idempotency. AgentOS should own approval and evidence, not the delivery provider or model.

## 10. Australian implications

**VERIFIED FACT:** The Office of the Australian Information Commissioner states that the 13 Australian Privacy Principles govern collection, use and disclosure of personal information, organisational governance and accountability, integrity and correction, and individual access rights. A breach can constitute an interference with privacy and lead to regulatory action and penalties.[6]

**REASONABLE INFERENCE:** Any lane handling customer names, addresses, contact details, order histories, delivery instructions, tokens, or tracking data should have an explicit data inventory, purpose limitation, retention rule, access boundary, deletion/correction path, incident process, and overseas-disclosure assessment. Shopify’s provider requirements and the APP framework make third-party processor and cross-border data-flow review material rather than optional documentation.

**UNKNOWN:** No Australian entity structure, hosting region, Privacy Act coverage assessment, APP privacy policy, data retention schedule, breach-response plan, or provider data-processing addendum was available for this portfolio.

## 11. Prioritised next actions

| Priority | Action | Classification | Stop condition |
|---|---|---|---|
| P0 | Provide the canonical AgentOS Level 2 P0 baseline and authority model. | OWNER DECISION REQUIRED | Stop if source of truth or approved worktree is ambiguous. |
| P0 | Identify canonical sources for PRS, GlobalShopCo, GlobalShopCo-Headless, and MyPrimeDelivery. | OWNER DECISION REQUIRED | Stop rather than map names to public lookalikes. |
| P0 | Define the AgentOS/provider boundary and confirm the single owner for authority, ledger, scheduling, persistence, and assurance. | OWNER DECISION REQUIRED | Stop if two systems claim the same authority. |
| P1 | Build a read-only Shopify/eBay capability matrix from the exact endpoints intended for products, inventory, orders, fulfilment, returns, and webhooks. | PREPARE | Stop if required scopes, licensing, or retention terms are unavailable. |
| P1 | Create an Australian data-flow and privacy assessment for commerce and delivery data. | PREPARE | Stop before live customer-data use if APP coverage or overseas disclosure is unresolved. |
| P1 | Design provider contract tests for throttling, pagination, token expiry, duplicate delivery, partial failure, and reconciliation. | PREPARE | Stop before write tests if sandbox accounts and approved credentials are unavailable. |
| P2 | Compare confirmed delivery providers, including Amazon Shipping only if it is actually the intended service. | PREPARE | Stop if MyPrimeDelivery identity remains unresolved. |

## 12. Decisions not made

No provider was activated. No credentials were used. No live customer or merchant data was accessed. No deployment, migration, publication, external communication, or production write was performed. This report is a research and planning artifact. It is not proof of runtime readiness, security readiness, production readiness, or release approval.

## References

[1]: https://shopify.dev/docs/api/usage/limits "Shopify API limits"

[2]: https://www.shopify.com/legal/api-terms "Shopify API License and Terms of Use"

[3]: https://developer.ebay.com/develop/guides/sell/authorization "eBay API authorization"

[4]: https://developer.ebay.com/develop/get-started/api-call-limits "eBay API call limits"

[5]: https://developer-docs-amazon-shipping.readme.io/apis/docs/shipping-api-v2-reference "Amazon Shipping API v2 reference"

[6]: https://www.oaic.gov.au/privacy/australian-privacy-principles "Australian Privacy Principles"
