DAILY/FREE-REFRESH CREDIT VERIFICATION: **Not verifiable and not claimed.** The session allowed a Lite-effort workflow setting, but no selectable or auditable daily/free-refresh capacity was exposed. The bounded parallel retry spawned four Lite workstreams and then failed with `creditNotEnough`; no workstream result is treated as evidence.

# Executive findings

**Scope and evidence status.** This is a read-only assurance/research report. The user-provided claims that the narrow worker-consent states `PRE_AUTHORIZED / CONFIRMATION_REQUIRED / PROHIBITED` passed exact-head AgentOS tests and independent PRS assurance are recorded as **claims requiring repository-level reproduction**, not verified facts. The sandbox inventory found no AgentOS, PRS, GlobalShopCo, backlog, progress-log, or Git repository copy from which to verify revisions, tests, receipts, or prior assurance. Accordingly, there is **no basis for implementation PASS, assurance PASS, or overall GREEN**, and this report does not certify production readiness.

**Primary conclusion.** The next safe gate is not “enable PowerShell.” It is a canonical-boundary composition proof: demonstrate that the existing authority, consent, policy, capability, risk, budget, approval, receipt, verification, scheduler, worker-registry, persistence, Green, and PRS primitives are composed exactly once, with explicit correlation and recovery semantics. Until that proof and independent failure-injection assurance exist, even bounded `DRY_RUN` local-wake should remain a non-invoking simulation.

**Commercial conclusion.** The smallest commercially useful GlobalShopCo action is a read-only, evidence-per-row pilot worksheet for a very small candidate set, populated only from public supplier/catalogue and eBay evidence. A candidate cannot become “viable” when freight/landed cost, exact SKU/EAN, stock/fulfilment, or permission is missing. No supplier contact, purchase, app install, listing, credential change, or production Shopify/eBay write is needed.

# AgentOS exact next gate

## Gate objective

Build a composition-only governed execution boundary around canonical existing primitives. The boundary must accept one immutable execution intent and return one auditable outcome without inventing a second authority or state machine. It must prove:

1. **One decision owner.** Consent, policy, capability, risk, budget, approval/human gate, scheduler, worker registry, persistence, receipt, verification, Green, and PRS remain authoritative in their existing systems. The adapter translates contracts; it does not re-decide them.
2. **Deny-before-invoke.** `PROHIBITED`, missing/invalid approval, stale approval, policy mismatch, capability mismatch, risk threshold failure, budget-reservation failure, correlation failure, or worker-safety failure must terminate before any provider/worker invocation. The test must include a spy provider proving zero calls and zero side effects.
3. **Single-use identity.** One immutable execution/attempt id and a canonical idempotency key bind task, mission, delivery, request, wake, host, worker, policy snapshot, approval, budget reservation, invocation, receipt, and verification. Replays must return the existing outcome or a typed conflict—not invoke twice.
4. **Budget atomicity.** Reserve before invoke; reconcile exactly once after a terminal outcome; release or mark an explicit unresolved liability on pre-invoke failure; never debit twice; never report success with an unaccounted reservation.
5. **Receipt durability.** Persist an intent/decision receipt before invocation, then an invocation/side-effect receipt and terminal verification receipt. A crash after provider return but before local receipt must be recoverable by idempotency/reconciliation, not guessed as “not run.”
6. **Post-side-effect verification.** A provider return code is not sufficient. Verification must query the canonical observable state or a deterministic DRY_RUN ledger and classify `VERIFIED`, `NOT_VERIFIED`, `UNKNOWN`, or `CONFLICT`. Side effects without verification cannot become Green.
7. **Stale-state rejection.** Consent, policy, capability, budget, approval, worker registration, host binding, and wake envelope must carry revision/expiry data. A stale snapshot fails closed and records the mismatch.
8. **Worker/provider safety.** The worker is allowlisted by immutable registry identity and version; provider/action/arguments are schema-validated; environment, host, path, network, elevation, timeout, output-size, secret, and cancellation controls are explicit. Windows task identity and privilege are not inferred from a friendly name.

Microsoft’s primary guidance supports treating PowerShell language mode and Windows task security context as independent controls: language mode determines permitted language elements, and App Control policies can force ConstrainedLanguage; JEA can restrict sessions to defined commands and NoLanguage. Windows Task Scheduler tasks run under a specified security context, with credentials/logon type and a separate run-level/elevation setting. These facts support the need for explicit worker/provider controls; they do **not** prove the AgentOS boundary is safe. Sources: [PowerShell language modes](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_language_modes?view=powershell-7.6) and [Task Scheduler security contexts](https://learn.microsoft.com/en-us/windows/win32/taskschd/security-contexts-for-running-tasks).

## Smallest safe implementation sequence

1. **Freeze and identify the exact head.** Record repository, branch, commit, canonical primitive paths, test commands, and environment assumptions. If the exact head cannot be supplied or reproduced, stop as `BLOCKED`.
2. **Produce an interface map, not new authority.** For each primitive, document input/output types, owner, revision/expiry, failure taxonomy, persistence point, idempotency key, and whether it is authoritative. Mark adapters and prohibited duplicate logic.
3. **Implement a pure boundary planner.** Given an immutable intent and snapshots, produce either a typed denial or a single invocation plan. The planner must have no provider call, scheduler registration, persistence mutation, or hidden approval behavior.
4. **Add the pre-invoke transaction.** Persist the decision/intent receipt and reserve budget only after all denials are cleared, using an atomic/idempotent operation. Make failed reservation fail closed.
5. **Add an invocation journal and exactly-once attempt protocol.** Persist `READY_TO_INVOKE` with the idempotency key before calling the provider. Recovery must reconcile `READY_TO_INVOKE` and `INVOKED_UNKNOWN` without a blind retry.
6. **Add post-invoke reconciliation and verification.** Persist raw provider outcome only in the approved evidence boundary; verify canonical state; reconcile budget; persist terminal receipt; classify unresolved states as `UNKNOWN`/`CONFLICT`, never Green.
7. **Add a non-invoking DRY_RUN local-wake harness.** It may exercise envelopes, denials, receipts, budget simulation, crash recovery, and verification against a fake ledger, but must prove zero PowerShell/provider/task-scheduler calls.
8. **Run PRS failure injection against the exact head.** Implementation test success is necessary but not sufficient. Overall Green remains withheld until independent PRS evidence meets the matrix below and all unknowns are closed or explicitly accepted by the owner.

## Deterministic tests required before any bounded DRY_RUN local-wake

- Every consent state: pre-authorized proceeds only when all other gates pass; confirmation-required pauses at the human gate; prohibited denies with zero invocation.
- Approval adapter: valid, wrong-scope, expired, superseded, duplicate, missing, and malformed approvals; verify no approval widening or identity substitution.
- Denial ordering: inject failures at each pre-invoke gate and assert provider spy count `0`, scheduler side effect count `0`, and no budget debit.
- Budget: reserve success, reserve rejection, timeout, duplicate reserve, reconcile success, reconcile failure, release failure, process crash at each boundary; assert no double debit and explicit unresolved liability.
- Receipts: persistence unavailable before invoke; crash after decision receipt; crash after `READY_TO_INVOKE`; crash after provider invoke before receipt; replay recovery; receipt corruption; out-of-order receipt; verify no false success.
- Verification: provider success with missing state, delayed state, contradictory state, partial state, and verification timeout; assert `UNKNOWN`/`CONFLICT`, not Green.
- Duplicate invocation: same request/wake replay, concurrent replay, retry after timeout, duplicate scheduler wake, and worker restart; assert one provider attempt or safe reconciliation.
- Correlation: mismatched task/mission/delivery/request/wake/host/worker IDs, stale host binding, wrong tenant/owner, wrong provider/action, and cross-attempt receipt; assert fail closed.
- Provider/worker controls: unregistered worker, version drift, disallowed command/path/network/elevation, malformed arguments, secret in arguments/output, timeout, cancellation, oversized output, and unexpected child process.
- DRY_RUN proof: instrument all invocation, scheduler, filesystem-write, network, and elevation seams; assert zero real calls and a complete simulated receipt chain.

# PRS failure-injection matrix

| ID | Failure injection | Expected invariant | Evidence required | Classification |
|---|---|---|---|---|
| P1 | `CONFIRMATION_REQUIRED` with no approval | Stops before invoke; no reserve/debit | provider spy, receipt, budget ledger | Implementation PASS only if local test passes; PRS PASS only after independent replay |
| P2 | `PROHIBITED` with forged/late approval | Denial remains authoritative; zero invoke | approval/policy traces and zero-call proof | Same distinction |
| P3 | Approval wrong scope/owner/revision | Fail closed; no authority substitution | canonical IDs and rejection code | Same distinction |
| P4 | Budget reserve rejects/times out | No invoke; no orphan debit, or explicit recoverable liability | reserve/release/reconcile ledger | Same distinction |
| P5 | Crash after decision receipt before `READY_TO_INVOKE` | Recovery is non-invoking and idempotent | restart replay and receipt chain | Same distinction |
| P6 | Crash after `READY_TO_INVOKE` before provider call | No blind duplicate; deterministic recovery state | journal and provider spy | Same distinction |
| P7 | Crash after provider side effect before receipt | Reconcile by idempotency/canonical state; never assume not-run | provider-side evidence plus local recovery | Same distinction |
| P8 | Provider success but verification missing/delayed/contradictory | `UNKNOWN` or `CONFLICT`, not success/Green | verification attempts and terminal classification | Same distinction |
| P9 | Duplicate wake/retry/concurrent invocation | One effect or safe provider reconciliation | concurrency log, idempotency key, provider count | Same distinction |
| P10 | Stale policy/consent/worker/host revision | Fail closed before invoke | snapshot revisions and rejection receipt | Same distinction |
| P11 | Correlation mismatch across task/mission/delivery/request/wake/host | No cross-context execution or receipt attribution | correlation matrix and negative tests | Same distinction |
| P12 | Unregistered/version-drifted worker or unsafe provider args | Reject; no scheduler/provider call | registry, schema, path/elevation/network checks | Same distinction |
| P13 | Receipt store unavailable/corrupt/out of order | No false terminal Green; recovery state explicit | persistence fault traces | Same distinction |
| P14 | DRY_RUN escape attempt | Zero real PowerShell/task/provider/network/elevation effects | instrumented environment and host audit | Same distinction |

**Status model:** **Implementation PASS** means the AgentOS exact-head tests pass under the stated environment and evidence is reproducible. **Assurance PASS** means PRS independently ran the failure injections against the same exact head and confirmed the invariants, including negative evidence. **Overall GREEN** would require both, plus closure or owner-approved disposition of material unknowns and any applicable release gates. None of those statuses is achieved or certified by this report.

# GlobalShopCo next commercial action

Create one read-only **pilot evidence worksheet** for no more than five compact Home Organisation candidates already in the pilot scope. Do not contact suppliers. For each row, require evidence links and fields:

| Field | Acceptable evidence / decision rule |
|---|---|
| Supplier and Australian fulfilment location | Public supplier/trade page; otherwise `UNKNOWN` |
| Exact product identity | SKU, EAN/GTIN, brand/model, pack quantity, dimensions/weight; no exact identity = reject |
| Trade/wholesale cost | Public trade price or existing authorised evidence; missing = `UNKNOWN`, no margin claim |
| GST treatment | GST-inclusive/exclusive basis and tax-invoice capability; ATO requires specific tax-invoice details, including seller identity, ABN, date, description, and GST information for sub-$1,000 taxable sales ([ATO](https://www.ato.gov.au/businesses-and-organisations/gst-excise-and-indirect-taxes/gst/tax-invoices)) |
| Freight and landed cost | Destination-specific product + freight + packaging + applicable tax/fees; missing freight = reject, not an estimate |
| Stock and fulfilment | Current stock signal, dispatch SLA, tracking, Australian return address; otherwise `UNKNOWN` |
| Marketplace permission | Explicit supplier/reseller/marketplace permission or contract evidence; missing = reject because margin depends on permission |
| Returns/warranty | Supplier terms plus Australian consumer-law handling; ACCC states consumer guarantees are automatic and cannot be removed, and differ from optional warranties ([ACCC](https://www.accc.gov.au/consumers/buying-products-and-services/consumer-rights-and-guarantees)) |
| Delivered eBay AU comps | At least several comparable delivered listings, matched by condition, pack, brand/model, and delivery area; record observed price, postage, date, and listing URL; do not use an asking-price-only comp |
| eBay fees | Use the account’s applicable fee regime. eBay states eligible Australia-based sellers without Pro and at or below AU$25,000 trailing sales may have free selling, but postage/labels and other fees can still apply; international delivery, Pro status, performance, and account conditions change the result ([eBay fees](https://www.ebay.com.au/help/selling/fees-credits-invoices/selling-fees-managed-payments-sellers-without-ebay-store?id=4822)) |
| Free-delivery contribution | Calculate the seller-funded delivery amount explicitly from the observed destination and parcel assumptions; missing dimensions/weight/carrier price = `UNKNOWN` |
| Shopify cost context | Record the actual plan and payment setup. Shopify’s public pricing page lists plan, payment, and third-party transaction-fee components, but it is not a substitute for the account’s actual Australian charges ([Shopify pricing](https://www.shopify.com/au/pricing)) |
| Margin result | `VIABLE`, `REJECT`, or `UNKNOWN`; `VIABLE` only when exact identity, permission, freight/landed cost, stock/fulfilment, returns exposure, comps, and applicable fees are evidenced |

Use a conservative contribution formula: `delivered eBay price − GST/tax treatment − applicable eBay fees − buyer-free-delivery cost − landed product cost − expected returns/warranty reserve − other known per-order costs`. Do not fill missing terms with averages. The output is an evidence backlog and reject list, not a listing or purchasing decision.

# Blockers and UNKNOWNs

- No local canonical AgentOS/PRS/GlobalShopCo repository, exact commit, test output, receipt schema, budget ledger, or prior assurance record was available.
- The stated exact-head test and PRS results are not independently reproducible here.
- No evidence identifies which existing primitive owns approval adaptation, budget reservation, receipt persistence, verification, scheduler, worker registry, or recovery.
- No proof exists here of atomicity, idempotency, crash recovery, stale-state handling, or provider/worker controls.
- No actual GlobalShopCo candidate list, supplier evidence, account fee regime, shipping profile, or eBay delivered-comp dataset was supplied.
- Public eBay, Shopify, ATO, ACCC, and Microsoft pages establish external rules and concepts; they do not prove this portfolio’s configuration, permissions, margins, runtime security, or readiness.
- The user requested no external writes; none were made. No supplier contact, purchase, app install, listing publication, credential change, deployment, merge, or production write occurred.

# Smallest safe next actions

1. **AgentOS owner/coordinator:** provide or expose the canonical exact-head repository, revision, primitive map, and reproducible test commands. Until then, keep local-wake non-invoking and status `BLOCKED` for implementation assurance.
2. **AgentOS executor:** produce the composition/interface map and pure pre-invoke planner before touching PowerShell or Task Scheduler.
3. **PRS:** run P1–P14 against that exact head, preserving raw evidence, negative-call counts, crash/restart traces, and classification. Report implementation PASS and assurance PASS separately; do not issue overall Green from implementation tests alone.
4. **GlobalShopCo analyst:** fill the five-row evidence worksheet from public sources only; reject rows missing exact SKU/EAN, permission, or freight/landed cost; preserve every other gap as `UNKNOWN`.
5. **Portfolio owner:** decide only after the above evidence whether to authorize a later bounded execution experiment. This report itself authorizes no execution.

## Sources

- Microsoft, [about_Language_Modes](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_language_modes?view=powershell-7.6).
- Microsoft, [Security Contexts for Running Tasks](https://learn.microsoft.com/en-us/windows/win32/taskschd/security-contexts-for-running-tasks).
- eBay Australia, [Selling fees without a Pro plan](https://www.ebay.com.au/help/selling/fees-credits-invoices/selling-fees-managed-payments-sellers-without-ebay-store?id=4822).
- Australian Competition and Consumer Commission, [Consumer rights and guarantees](https://www.accc.gov.au/consumers/buying-products-and-services/consumer-rights-and-guarantees).
- Australian Taxation Office, [Tax invoices](https://www.ato.gov.au/businesses-and-organisations/gst-excise-and-indirect-taxes/gst/tax-invoices).
- Shopify Australia, [Pricing](https://www.shopify.com/au/pricing).

**Final status: NOT GREEN; no production-readiness certification.**
