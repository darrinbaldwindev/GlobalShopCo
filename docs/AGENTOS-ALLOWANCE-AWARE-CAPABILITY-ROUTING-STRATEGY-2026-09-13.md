# AgentOS Allowance-Aware Capability Routing Strategy

**Audience:** AgentOS Overseer and engineering team  
**Research date:** 13 September 2026 (Australia/Sydney)  
**Status:** Design recommendation; no provider activation, credential use, repository write, or production change was performed.  
**Author:** Manus AI

## Executive summary

AgentOS should treat provider capacity as a governed portfolio of **capabilities, authorities, allowances, and evidence**, not as a list of API keys. The routing decision must first establish that the requested action is permitted. It must then select a provider that can perform the capability at the required quality, within the available allowance and reset horizon, at acceptable cost and latency, with the required verifier.

The core recommendation is to build a **provider-neutral allowance ledger and policy-gated router**. The ledger should ingest provider-reported remaining quota, account balance, rate-limit headers, plan metadata, reset times, expiration dates, and recent observed consumption. The router should use that information only after an authority gate. Availability is not authority: a free browser session may be available while the requested account operation remains prohibited; an email quota may remain while the recipient, content, or action lacks approval.

AgentOS should **integrate** Manus, OpenAI, Gemini, Claude, OpenRouter, Tavily, Exa, AgentMail, Browserbase, GitHub Copilot, Cloudflare AI Gateway, Langfuse, Braintrust, and n8n where their interfaces provide useful capability or governance leverage. It should **adapt** LiteLLM and Ollama as portable control-plane components, and **build** the allowance ledger, policy gate, lease system, scheduler, verifier contracts, and audit model. It should **defer** provider-specific autonomous action flows that cannot expose authority, quota, or audit evidence.

The use-it-or-lose-it rule must be narrow. AgentOS may spend expiring allowance only on **already-authorized, useful work** that advances a live objective, reduces known uncertainty, improves a registered artifact, performs an approved evaluation, or refreshes an explicitly requested monitoring target. It must reject filler prompts, synthetic activity, duplicate research, speculative browsing, and work created solely to consume credits.

The recommended deterministic route order is:

> **Authority/policy gate → capability fit → quality floor → allowance remaining/reset horizon → cost → latency → verifier requirements → route selection → fallback.**

This ordering prevents cheap or expiring capacity from weakening governance. The design also makes reset behavior explicit: rolling token buckets, calendar-day quotas, monthly credits, subscription-cycle credits, prepaid balances, and local compute are separate allowance classes and must not be compared as if they were interchangeable.

## Scope and evidence method

This report covers AI agents, model APIs, research and search, coding, browser and computer use, email, automation, evaluation, observability, gateways, local runtimes, and model routing. Claims about current plans, quotas, prices, or reset behavior are based on official provider pages retrieved during this research. Where a provider exposes account-specific values only in a dashboard, the report records the public rule and marks the live value as **unknown until observed**.

The original wide-research fan-out was attempted, but the workflow stopped before returning provider results because the session lacked sufficient execution credits. This report therefore uses a bounded source-first synthesis rather than presenting failed subagent output as evidence. Public limits change frequently. AgentOS must treat this document as a policy and architecture baseline, not as a substitute for live account telemetry.

## Design principles

### Authority precedes availability

A capability is **available** when a provider account, runtime, or plan appears able to perform it. A capability is **authorized** only when AgentOS policy, the task owner, the data classification, the target system, and any required human approval permit the action. The router must never infer authorization from a valid credential, remaining credits, a successful dry run, or a provider's published feature list.

### Allowances are typed resources

AgentOS should model an allowance as a typed resource with a quantity, unit, scope, reset or expiry rule, confidence, and evidence source. Examples include requests per minute, requests per day, tokens per minute, monthly credits, browser hours, workflow executions, email messages per day, storage, concurrency slots, local GPU time, and prepaid dollars. A monthly credit and a daily request quota cannot be substituted merely because both are numerically positive.

### Quality floors are hard constraints

The router must reject a candidate below the task's quality floor before considering cost or expiry. A cheap model may be suitable for classification or extraction but not for a safety-sensitive decision, a high-impact code change, or a research report that requires primary-source verification.

### Verifiers are part of the route

A provider route is incomplete unless it includes a verifier contract. Examples include schema validation, compiler and test execution, source citation checks, browser-state assertions, email policy checks, human review, or independent model comparison. A route with no available verifier must be rejected for tasks that require one.

### Fail closed for authority and data risk

Provider outage, unknown allowance, stale telemetry, or quota uncertainty may trigger a capability fallback. They must not bypass a policy gate, data residency rule, approval requirement, or destructive-action restriction.

## Capability and allowance matrix

The matrix distinguishes documented provider facts from AgentOS recommendations. Prices and limits below are public plan values or public rules retrieved on the research date; account-specific availability can differ.

| Provider or component | Primary capability | Public allowance model and reset behavior | API or tool access | Governance risks | Best-fit AgentOS tasks | Recommendation |
|---|---|---|---|---|---|---|
| Manus | Research, browser/computer work, coding, websites, slides, Wide Research, scheduled tasks, Cloud Computer | Public pricing lists a Free plan with 300 refresh credits daily and 4,000 monthly credits, plus 20 concurrent and 20 scheduled tasks. Paid plans list larger monthly credits and the same daily refresh allowance. Exact reset timezone and expiry semantics are not stated on the public pricing page. [1] | Product UI and configured Manus capabilities; exact programmatic surface is account/session dependent | Credit accounting may be product-specific; task authority must not be inferred from plan access; scheduled and concurrent tasks can amplify spend | Governed research, bounded browser tasks, artifact production, orchestrated research when the task is already authorized | **INTEGRATE** as a governed capability provider; **BUILD** a local shadow ledger and policy wrapper |
| OpenAI | General and reasoning models, tools, batch, embeddings, audio, agents | Limits are organization/project scoped and vary by model. Public headers expose remaining requests/tokens and reset durations. Public usage tiers include a Free tier in allowed geographies and paid tiers whose monthly approved usage limits rise with qualification; exact account limits are dashboard values. [2] | API, tools, agent APIs, headers, dashboard | Model/version drift, spend limit confusion, organization-wide contention, sensitive-data retention and provider terms | High-quality synthesis, structured extraction, coding, tool-use planning, independent verification | **INTEGRATE** behind the neutral router and explicit spend caps |
| Google Gemini | Multimodal models, search/grounding, batch, embeddings, image/audio variants | Limits use RPM, TPM, and RPD. RPD quotas reset at midnight Pacific time. Limits are per project rather than API key, vary by model and tier, and actual capacity is not guaranteed. [3] | Gemini API, AI Studio, Google Cloud controls, batch | Project-wide contention, preview-model instability, cloud billing coupling, region and data-policy requirements | Multimodal analysis, batch work, long-context transformations, low-cost classification where quality is verified | **INTEGRATE** with project-level quota accounting and Pacific reset normalization |
| Anthropic Claude | Strong reasoning, long-context analysis, coding, tool use | API limits include monthly spend caps and token-bucket rate limits. Start, Build, and Scale public spend caps are documented; spend-cap access resumes at 00:00 UTC on the first day of the next month unless raised. Rate limits replenish continuously rather than at fixed intervals. [4] | Messages API, tools, prompt caching, Console | Monthly cap can look like a transient 429 but is not retryable; cached-token accounting differs from total-token accounting; organization/workspace scope matters | Long-context analysis, coding, policy interpretation, high-quality drafting, verifier roles | **INTEGRATE** with cap-aware failure classification and cache-aware cost accounting |
| OpenRouter | Provider-neutral model access and model fallback | Public documentation states 20 RPM for free models, 50 free-model requests per day with no credits, and 1,000 RPD when the account has at least $10 in credits. Account and per-key credit limits are separate from rate limits. [5] | OpenAI-compatible API, model catalog, provider routing, limits endpoint and headers | Upstream provider heterogeneity, free-model availability changes, cross-provider terms, difficult provenance unless captured | Low-cost experiments, fallback models, model comparison, non-sensitive tasks with provenance logging | **INTEGRATE** as an optional marketplace route; never use free models as an authority bypass |
| LiteLLM | Unified proxy, provider/model routing, budgets, spend tracking | Provider, model, and tag budgets can be configured over seconds, minutes, hours, days, or months. LiteLLM can skip providers over budget and expose remaining budget; multi-instance tracking uses Redis. Tag budgets are documented as an Enterprise feature. [6] | Proxy and Python SDK with OpenAI-compatible interface; Prometheus metrics | Self-hosted control plane becomes security-critical; incorrect token pricing or Redis state can misroute; license boundaries for enterprise controls | Portable routing, budget enforcement, per-team quotas, provider failover, metrics | **ADAPT** as a routing substrate, not as the full AgentOS authority layer |
| Cloudflare AI Gateway | Gateway analytics, caching, rate limiting, logging, DLP, guardrails, unified billing | Core gateway features are free on all plans. Workers Free persistent logs allow 100,000 logs total across gateways; paid allows 10 million logs per gateway. Unified Billing adds a 5% fee to purchased credits. [7] | Gateway endpoint, dashboards, caching, rate limits, DLP, Logpush on paid | Log retention and third-party routing; DLP profile scope; unified billing fee; gateway availability can be confused with model authority | Central telemetry, caching, provider egress control, prompt/response inspection, rate limiting | **INTEGRATE** for edge governance and observability where data policy permits |
| Ollama | Local open-model runtime and hosted open-model access | Local models run on the user's hardware and are described as unlimited apart from local resources. Public hosted plans include monthly usage credits; Free resets monthly from signup date, paid plans reset monthly on subscription start date, and included usage does not roll over. [8] | Local REST API, Python libraries, hosted cloud models, tool calling for supported models | Local model quality and prompt-injection exposure; hardware capacity is not a free SLA; cloud and local privacy properties differ | Offline classification, redaction, routing prechecks, deterministic transforms, low-risk coding assistance | **ADAPT** for local fallback and privacy-preserving preprocessing; **BUILD** hardware admission controls |
| Tavily | Search, extract, map, crawl, research for agents | Free plan provides 1,000 API credits per month without a card. Basic search costs one credit; advanced search costs two; research has documented per-request minimum and maximum boundaries. [9] | Search and extraction APIs, SDKs, agent-oriented research endpoints | Search-source quality, prompt injection in retrieved pages, monthly quota burn, citation gaps | Discovery, source retrieval, URL extraction, bounded research expansion | **INTEGRATE** with domain allowlists, deduplication, citation and injection scanning |
| Exa | Search, contents, answer, deep search, monitors, agent research | New accounts receive $20 free credits and the free tier adds $10 monthly. Public pricing specifies request and effort rates; the page describes prepaid credits rather than a free request quota. [10] | Search, contents, answer, monitors, agent API, MCP and SDKs | Prepaid balance and generated summaries can obscure source provenance; deep-search cost variance; enrichment data sensitivity | Research, web monitoring, structured discovery, citation-backed synthesis | **INTEGRATE** for higher-value research, with per-task spend leases |
| AgentMail | Agent inboxes, sending, receiving, threads, webhooks, MCP, SMTP relay | Free plan lists three inboxes, 3,000 emails/month, 100 emails/day, and 3 GB storage. Developer lists monthly, daily, and five-minute caps. Reset timezone and rollover are not stated publicly. [11] | SDKs, API, MCP server, webhooks, WebSockets, SMTP relay | Email is an external side effect; deliverability, identity, recipient consent, and content approval matter more than quota | Drafting, inbox triage, internal notifications, approved transactional messages | **INTEGRATE** only behind recipient, content, sending-volume, and approval policies |
| GitHub Copilot | IDE completion, chat, CLI, coding agent, model access | Public plan docs list AI-credit allowances, including Pro $10 with 1,000 base credits, Pro+ $39 with 3,900, Max $100 with 10,000, and monthly totals including flex allotments. Free and Student also have allowances. [12] | IDE, GitHub UI, CLI, coding agent, organizational controls | Repository access, code exfiltration, autonomous changes, plan/seat policy, monthly-credit ambiguity | Code explanation, tests, bounded patch generation, issue-to-PR workflows with review | **INTEGRATE** for human-reviewed coding; **DEFER** autonomous merge/deploy authority |
 Browserbase | Managed browsers, agent runs, search/fetch, runtime, browser sessions | Free plan lists three concurrent browsers, one browser hour, three agent runs, 1,000 search calls, 1,000 fetch calls, and 15-minute sessions. Paid plans list larger included hours and runs. [13] | Browser sessions, agent infrastructure, search/fetch, runtime, identity features | Account login, CAPTCHA, personal data, irreversible web actions, session recordings, site terms | Read-only research, test automation, approved transactional workflows with confirmation gates | **INTEGRATE** for read-only and sandboxed workflows; use human confirmation for consequential actions |
 Langfuse | Tracing, token/cost tracking, evaluations, OpenTelemetry, prompt and agent observability | Hosted Hobby is free with 50k units/month and 30-day data access. Self-hosting is free software; retention and operations become the user's responsibility. [14] | SDKs, API, OpenTelemetry, LiteLLM integration, self-hosted Docker/Kubernetes | Sensitive prompt logging, retention, false confidence from incomplete traces, self-hosted security burden | Audit trails, route-quality measurement, allowance reconciliation, verifier evidence | **INTEGRATE** or **BUILD ON** it for observability; redact before logging |
 Braintrust | Evaluations, logs, scores, datasets, built-in model usage | Starter has $0 platform fee and public limits of 1 GB processed data/month, 10k scores/month, 14-day retention, and $10/month built-in model credits; unused model credits do not roll over. [15] | SDKs, experiments, online/offline evaluation, built-in models | Evaluation data can contain secrets; on-demand charges after included limits; SaaS data residency | Regression tests, route judges, scorecards, release gates | **INTEGRATE** for evaluation; require data classification and spend caps |
 n8n | Workflow automation, webhooks, integrations, code steps, agent workflows | Cloud Starter is listed at €20/month billed annually with 2.5k executions and 2,300 AI credits/month; a Community Edition is available for self-hosting. [16] | Cloud and self-hosted workflows, webhooks, API, code nodes | Workflow loops, secret sprawl, uncontrolled retries, external side effects, license and operational burden | Deterministic scheduling, connector workflows, bounded post-processing | **INTEGRATE** for approved orchestration; **BUILD** idempotency and action leases outside the workflow engine |
 Mistral, DeepSeek, Groq, Together, Fireworks | Strong alternative model APIs and hosted open models | Allowances vary by provider, model, account, and promotion. They should be admitted only after live account telemetry and documented pricing/limits are captured. | Usually OpenAI-compatible APIs, SDKs, or hosted inference | Rapid product and limit changes, data handling variance, uncertain free-tier continuity | Cheap classification, batch transforms, code and reasoning fallbacks after quality tests | **DEFER/INTEGRATE selectively** after evidence registration |
 Perplexity, Exa, Brave, SerpAPI, Semantic Scholar | Research, web search, academic search, answer synthesis | Free or trial allowances vary by account and product. Exa has documented recurring free credits; other sources require live verification before routing. [10] | Search APIs, browser/search tools, academic APIs | Citation quality, source duplication, search-result injection, terms and rate limits | Discovery and corroboration, not sole authority for high-impact claims | **INTEGRATE selectively** with source diversity and citation checks |

## Deterministic routing policy

### Request normalization

Every request becomes a normalized `TaskIntent` containing the requested capability, objective, data classification, target systems, user or owner, deadline, quality floor, latency class, cost ceiling, side-effect class, verifier requirement, and duplicate-detection key. The duplicate key should be derived from the normalized objective, source scope, artifact version, and allowed freshness window.

### Candidate evaluation sequence

1. **Authority and policy gate.** Check user authority, task authority, data classification, provider approval, target-system permission, side-effect class, required human approval, and applicable legal or organizational policy. Reject candidates that fail. Do not downgrade this gate because allowance is expiring.
2. **Capability fit.** Check modality, context length, tool support, browser features, search coverage, email primitives, code access, region, and required output format.
3. **Quality floor.** Apply hard minimums for benchmark score, schema accuracy, citation completeness, code-test success, browser assertion success, or prior task-family performance.
4. **Allowance remaining and reset horizon.** Estimate required units and compare them with remaining units, concurrency, rate windows, balance, and expiry. Prefer a capacity that can complete the task without leaving a hard deadline exposed.
5. **Cost.** Compare expected incremental cost, including provider fees, gateway fees, egress, storage, browser time, and verifier cost. A free allowance has opportunity cost and may be reserved for a better fit.
6. **Latency.** Select among remaining candidates by deadline class, queue time, time to first result, and worst-case fallback time.
7. **Verifier requirements.** Ensure a verifier is available and itself authorized and budgeted. Reject any route whose verifier cannot inspect the output at the required assurance level.
8. **Route selection.** Acquire a lease on the allowance and side-effect budget before execution. Record the route decision, evidence timestamps, and expected consumption.
9. **Fallback.** On classified transient failure, release or reconcile the lease and choose the next candidate that passes all prior gates. Do not retry a hard policy, authority, billing, or quota-cap failure.

### Allowance score

Allowance is a constraint first and a score second. A candidate is ineligible when `remaining < predicted_p95_cost`, the reset occurs after the task deadline, or the account state is unknown for a hard quota. Among eligible candidates, use:

```text
score(candidate) =
    1000 * policy_pass
  + 100  * capability_fit
  + 100  * quality_margin
  +  10  * verifier_strength
  +   3  * expiry_urgency
  -   2  * expected_cost_normalized
  -   1  * latency_normalized
  -   1  * uncertainty_penalty
```

`policy_pass`, `capability_fit`, and verifier eligibility are binary gates, not soft preferences. `expiry_urgency` may increase only for work that already exists in the queue or is a registered maintenance objective.

### Pseudocode

```text
route(task, now):
    intent = normalize(task)
    if not policy.authorized(intent):
        return DENY("authority or policy failure")

    if duplicate_registry.has_unexpired_equivalent(intent):
        return REUSE_OR_JOIN(existing_task)

    candidates = registry.providers_for(intent.capabilities)
    candidates = [c for c in candidates if c.status in {enabled, observed}]
    candidates = [c for c in candidates if authority.permits(c, intent)]
    candidates = [c for c in candidates if capability_match(c, intent)]
    candidates = [c for c in candidates if quality(c, intent) >= intent.quality_floor]
    candidates = [c for c in candidates
                  if verifier_available(c, intent.verifier_requirements)]

    estimates = predict_consumption(intent, candidates)
    candidates = [c for c in candidates
                  if allowance_known_or_safe(c, intent)
                  and allowance_remaining(c) >= estimates[c].p95
                  and deadline_can_be_met(c, intent.deadline)]

    if candidates is empty:
        return FALLBACK_OR_QUEUE(classify_no_candidate_reason(candidates))

    for c in sort_by_policy_order(candidates, now):
        lease = acquire_atomic_lease(
            provider=c.provider,
            allowance_bucket=estimates[c].bucket,
            units=estimates[c].p95,
            side_effect_budget=intent.side_effect_budget,
            ttl=deadline_to_lease_ttl(intent.deadline))
        if lease.acquired:
            audit.record_decision(intent, c, lease, evidence_snapshot(c))
            result = execute(c, intent, lease)
            if result.success:
                verified = verify(result, intent.verifier_requirements)
                if verified:
                    reconcile_lease(lease, result.actual_consumption)
                    audit.record_success(result, verified)
                    return result
                quarantine(result)
            if is_retryable(result.error):
                reconcile_lease(lease, result.actual_consumption)
                continue
            audit.record_failure(result)
            return FAIL_CLOSED(result.error)

    return FALLBACK_OR_QUEUE("all eligible candidates lost lease or failed")
```

## Data model

| Entity | Required fields |
|---|---|
| Provider | `provider_id`, `service`, `capabilities`, `regions`, `data_policy`, `terms_version`, `enabled`, `authority_class`, `health_status`, `last_verified_at` |
| Account | `account_id`, `provider_id`, `owner`, `credential_ref`, `project_or_workspace`, `plan`, `billing_mode`, `approved_scopes`, `data_class_max`, `activation_status` |
| Capability | `capability_id`, `modality`, `tool_support`, `context_limit`, `quality_profile`, `side_effect_class`, `required_verifier`, `supported_regions` |
| Allowance bucket | `bucket_id`, `account_id`, `unit`, `scope`, `limit`, `remaining`, `reserved`, `consumed`, `reset_rule`, `reset_at`, `expires_at`, `rollover`, `source`, `observed_at`, `confidence`, `unknown_reason` |
| Telemetry observation | `provider_request_id`, `request_units`, `response_units`, `headers`, `status`, `retry_after`, `reset_hints`, `cost`, `latency_ms`, `model`, `tool_calls`, `data_class` |
| Task intent | `task_id`, `owner`, `objective_hash`, `capabilities`, `quality_floor`, `deadline`, `latency_class`, `cost_ceiling`, `data_class`, `side_effect_class`, `authority_evidence`, `verifier_requirements`, `freshness_window` |
| Lease | `lease_id`, `task_id`, `bucket_id`, `units_reserved`, `side_effect_budget`, `acquired_at`, `expires_at`, `state`, `idempotency_key`, `reconciled_units` |
| Route decision | `task_id`, `candidate_set_hash`, `selected_provider`, `selection_reason`, `policy_version`, `quality_version`, `evidence_snapshot`, `fallback_order`, `decision_at` |
| Verifier result | `task_id`, `verifier_id`, `checks`, `scores`, `evidence_refs`, `human_required`, `pass`, `failed_controls`, `verified_at` |
| Audit event | `event_id`, `actor`, `task_id`, `action`, `payload_hash`, `provider`, `allowance_delta`, `authority_basis`, `timestamp`, `retention_class` |

## Scheduler and heartbeat behavior

The scheduler should maintain three queues: **live objectives**, **approved maintenance**, and **blocked or awaiting authority**. Only the first two may consume allowance. A heartbeat should refresh telemetry, compute reset horizons, reconcile leases, detect duplicate objectives, and evaluate whether already-registered maintenance work can safely be advanced.

The heartbeat must not invent work to use credits. It may select a registered maintenance item when all of the following hold:

* the item has an owner and a current objective identifier;
* the output has a declared destination, such as a test dataset, source index, regression suite, cache, or approved report;
* the item is not equivalent to completed work inside its freshness window;
* the expected output is useful even if no allowance were expiring;
* the route passes the same authority, quality, and verifier gates as interactive work;
* the expected consumption fits a bounded lease; and
* the item is not a prohibited external side effect.

For expiring allowances, calculate `urgency = useful_work_remaining / time_until_reset`. Use urgency to order eligible work, not to create new work. Reserve a small safety margin, such as 10–20% of a bucket, for interactive tasks unless an owner explicitly changes the reservation policy. Use-it-or-lose-it execution should prefer batch APIs, local models, cache warming for registered sources, benchmark refreshes, and test-suite runs over redundant prose generation.

Heartbeat intervals should be adaptive. Run frequently enough to observe the shortest relevant reset window, but cap the minimum interval and apply jitter to avoid synchronized provider load. A suggested rule is `interval = clamp(min(reset_horizon / 20, 15 minutes), 1 minute, 6 hours)` for allowance monitoring, with provider-specific rate limits and terms taking precedence.

## Availability versus authority matrix

| Situation | Available? | Authorized? | Action |
|---|---:|---:|---|
| API key works but provider is not approved for the data class | Yes | No | Deny and audit |
| Free quota remains for a model below the quality floor | Yes | Irrelevant | Reject candidate |
| Browser session can log in to a personal account but task lacks owner approval | Yes | No | Do not open or act |
| Email quota remains but recipient consent or message approval is absent | Yes | No | Draft only or deny |
| Local model is available but its evaluation profile is stale | Yes | Unknown | Use only for low-risk tasks or refresh evaluation |
| Provider is approved but live allowance telemetry is stale | Maybe | Yes | Route only within conservative safe budget or queue |
| Monthly credit is expiring and a registered benchmark is due | Yes | Yes | Run bounded benchmark with verifier |
| Monthly credit is expiring and no useful work is queued | Yes | No work | Let it expire |

## Failure modes and responses

| Failure mode | Detection | Safe response |
|---|---|---|
| Unknown or stale allowance | Observation age exceeds policy TTL | Use conservative reserve, query telemetry, or queue; never assume free |
| Rate limit 429 | Provider status and retry headers | Honor reset or retry-after; use a different eligible route only after policy and quality checks |
| Monthly spend cap | Provider error identifies enforced cap | Stop retries until reset or approved limit change; do not treat as transient |
| Free-tier exhaustion | Account endpoint, headers, or 402/429 | Re-route only if the fallback is approved; record opportunity cost |
| Provider outage or overload | 5xx, timeout, status feed | Retry boundedly, then fail over; preserve verifier requirements |
| Duplicate task | Objective hash and freshness registry | Join existing task, reuse artifact, or require explicit refresh |
| Partial browser side effect | Post-action assertion fails | Stop, preserve evidence, alert owner, do not blindly replay |
| Email sent twice | Idempotency key or provider message ID mismatch | Quarantine, suppress retry, require reconciliation |
| Search injection | Retrieved content contains instructions or tool requests | Treat content as untrusted data; sanitize and continue only with source policy |
| Verifier disagreement | Independent checks diverge | Quarantine output and escalate according to task impact |
| Gateway log loss | Missing trace or log acknowledgement | Mark audit incomplete; do not claim successful verification |
| Local runtime overload | Queue saturation, OOM, latency spike | Apply admission control, reduce concurrency, or route to approved hosted fallback |

## Abuse and safety controls

AgentOS should implement the following controls before enabling allowance-aware routing in production:

1. **No filler-work rule.** A task must have a registered objective, owner, expected artifact, and verifier before it can consume expiring capacity.
2. **No duplicate-work rule.** Use objective hashes, source snapshots, artifact versions, and freshness windows to join or reuse equivalent work.
3. **Side-effect classes.** Classify actions as read-only, reversible write, externally visible write, financial, legal, medical, security-sensitive, or destructive. Require progressively stronger authorization and verification.
4. **Provider allowlist.** Maintain approved provider, account, model, region, and data-class combinations. A capability registry entry alone does not approve use.
5. **Per-task and per-owner budgets.** Enforce reservations independently of provider limits so a shared allowance cannot be consumed by one actor or loop.
6. **Atomic leases.** Reserve allowance and side-effect budgets transactionally. Reconcile actual usage after completion and release unused reservations.
7. **Retry budgets.** Bound retries by task, provider, and error class. Never retry policy, authorization, billing, or permanent quota errors.
8. **Prompt and output hygiene.** Redact secrets and personal data before observability export. Treat search and browser content as untrusted input.
9. **Independent verification.** For high-impact outputs, require a separate verifier, deterministic test, source cross-check, or human review.
10. **Audit completeness.** Preserve the policy version, evidence snapshot, route candidates, allowance reservation, provider response metadata, verifier evidence, and final disposition.
11. **No account farming.** Do not create accounts, rotate keys, or distribute load to evade provider limits or terms.
12. **Kill switches.** Provide provider, capability, task-family, owner, and side-effect kill switches that fail closed without deleting audit evidence.

## Test plan

### Invariants

* No task executes without a passing authority gate.
* No candidate below the quality floor is selected even when its allowance is expiring.
* No lease reserves more units than the bucket can safely provide.
* No external side effect executes without the required approval and idempotency key.
* A failed verifier never produces a final artifact marked verified.
* Duplicate tasks within the freshness window do not consume a second allowance lease.
* Provider account and API-key availability never changes the authority decision.
* Unknown reset behavior is represented as unknown, not as a guessed date.
* Monthly, daily, rolling, prepaid, and local allowances remain distinct units.
* Every successful route has an audit event and a reconciled allowance delta.

### Scenarios

| Scenario | Expected result |
|---|---|
| Free daily refresh expires in two hours and an approved benchmark is queued | Run the benchmark only if it passes all gates and fits a bounded lease |
| Free daily refresh expires and no useful work exists | Do nothing; allow expiry |
| OpenRouter free-model quota remains but model fails quality floor | Reject and use an approved higher-quality route if budgeted |
| Gemini RPD exhausted before midnight Pacific | Queue or use another approved route; do not retry until reset |
| Claude monthly cap reached | Stop retries until UTC monthly reset or approved cap change |
| OpenAI rate-limit header reports 10 seconds to reset | Delay or use a qualified fallback; preserve task deadline logic |
| AgentMail daily quota remains but recipient policy fails | Deny sending; drafting may be allowed if separately authorized |
| Browser task reaches login and asks for a purchase | Stop before purchase and require the dedicated confirmation workflow |
| Local Ollama model is available but GPU queue is full | Apply admission control and route to a verified fallback |
| Search results contain tool-use instructions | Strip instructions, retain source content, and continue only under source policy |
| Verifier finds a citation mismatch | Quarantine report and schedule targeted re-research rather than duplicate full research |
| Two schedulers race for the same allowance | One atomic lease succeeds; the other joins or queues |

## Top 10 implementation steps

1. **Define the policy vocabulary.** Standardize authority classes, data classifications, capability IDs, side-effect classes, quality floors, verifier types, and allowance units.
2. **Build the provider registry.** Register providers, accounts, models, tools, regions, data policies, terms versions, and approval status without storing raw credentials in the registry.
3. **Implement the allowance ledger.** Support rolling token buckets, calendar resets, subscription-cycle resets, prepaid balances, monthly credits, concurrency, storage, and local compute.
4. **Add telemetry adapters.** Read provider headers, account endpoints, dashboards where authorized, gateway metrics, and observed consumption. Record evidence timestamps and confidence.
5. **Implement atomic leases.** Reserve allowance, concurrency, and side-effect budgets together. Reconcile actual consumption and recover expired leases safely.
6. **Ship the policy-gated router.** Implement the mandated sequence and deterministic tie-breaking. Make unknowns explicit and fail closed for high-impact tasks.
7. **Add duplicate and artifact registries.** Hash objectives, source scope, artifact versions, and freshness windows. Prefer joining and reuse over re-execution.
8. **Create verifier contracts.** Add schema, compiler/test, citation, browser assertion, email policy, and human-review verifiers with machine-readable outcomes.
9. **Instrument observability safely.** Use Langfuse, Braintrust, Cloudflare AI Gateway, or an internal equivalent after redaction. Track route quality, allowance forecast error, cost, latency, and verifier failures.
10. **Run shadow mode before activation.** Compare router decisions with current behavior, simulate resets and outages, exercise safety scenarios, review audit trails, then enable one low-risk capability family at a time. No provider activation should occur as part of this design exercise.

## Final decision table

| Decision | Components | Rationale |
|---|---|---|
| BUY | Browserbase for managed browser infrastructure; hosted observability or research APIs where operational burden exceeds license cost | Buy specialized infrastructure when session isolation, managed browsers, or high-quality search materially reduce risk and time |
| INTEGRATE | Manus, OpenAI, Gemini, Claude, OpenRouter, Tavily, Exa, AgentMail, GitHub Copilot, Cloudflare AI Gateway, Langfuse, Braintrust, n8n | Use provider strengths behind neutral interfaces and policy gates |
| ADAPT | LiteLLM, Ollama, Browser Use/open browser stacks, self-hosted n8n and Langfuse | Adapt as portable substrates with AgentOS-owned authority, leasing, and audit controls |
| BUILD | Allowance ledger, provider telemetry adapters, policy gate, deterministic router, leases, duplicate registry, scheduler, verifier contracts, audit model | These are the governance differentiators and must remain provider-neutral |
| DEFER | Autonomous merge/deploy, unconfirmed purchases, account/key rotation to evade limits, filler-work generators, provider-specific routes with unknown authority or data handling | Defer until authority, reversibility, verification, and terms are explicit |

## References

[1]: https://manus.im/pricing "Manus Pricing Plans"
[2]: https://developers.openai.com/api/docs/guides/rate-limits "OpenAI API Rate Limits"
[3]: https://ai.google.dev/gemini-api/docs/rate-limits "Gemini API Rate Limits"
[4]: https://platform.claude.com/docs/en/api/rate-limits "Claude API Rate Limits"
[5]: https://openrouter.ai/docs/api_reference/limits "OpenRouter Limits"
[6]: https://docs.litellm.ai/docs/proxy/provider_budget_routing "LiteLLM Budget Routing"
[7]: https://developers.cloudflare.com/ai-gateway/reference/pricing/ "Cloudflare AI Gateway Pricing"
[8]: https://ollama.com/pricing "Ollama Pricing"
[9]: https://docs.tavily.com/documentation/api-credits "Tavily Credits and Pricing"
[10]: https://exa.ai/docs/reference/pricing "Exa API Pricing"
[11]: https://www.agentmail.to/pricing "AgentMail Pricing"
[12]: https://docs.github.com/en/copilot/get-started/plans "Plans for GitHub Copilot"
[13]: https://www.browserbase.com/pricing "Browserbase Pricing"
[14]: https://langfuse.com/pricing "Langfuse Pricing"
[15]: https://www.braintrust.dev/docs/plans-and-limits "Braintrust Plans and Limits"
[16]: https://n8n.io/pricing/ "n8n Plans and Pricing"

## Caveat on time-sensitive claims

Provider pricing, quotas, product names, model availability, and terms may change without notice. Before any implementation or activation, AgentOS should re-fetch the official source, capture the account-specific allowance, and obtain the required owner or policy approval. This report intentionally does not activate providers, use credentials, create accounts, spend credits, or modify production systems.

---

**End of report.**

*Note: The report is a design artifact. Its recommendations are not evidence that any provider is currently enabled or authorized for AgentOS.*

