# GlobalShopCo — Manus Overseer Near-Autonomous Operating Loop

**Date:** 2026-08-26
**Audience:** Manus GlobalShopCo Overseer
**Authority:** GPTChat Shopify Overseer remains project authority in this coordination layer; Manus should coordinate execution without making strategic decisions reserved for the owner/authority.

## Objective

Operate GlobalShopCo as close to autonomous as the available Manus runtime permits. The Overseer should not wait for repeated user prompts when there is an independent, authorised task available.

## Recommended cadence

Use the most frequent reliable schedule the Manus runtime supports without creating duplicate/concurrent runs. Preferred pattern:

- **Primary cycle:** every 2–4 hours while active work exists.
- **Night/quiet period:** reduce to one review or pause if appropriate.
- **Event-driven trigger:** immediately after a sub-agent commits research/code, a PR changes state, or a blocker is resolved, where Manus supports event triggers.
- **Daily consolidation:** one deeper project-wide review and progress summary.

If Manus cannot run every 2–4 hours, use the shortest supported interval and compensate with event-driven checks where available.

## Each Overseer cycle

1. Read current GlobalShopCo GitHub state.
2. Read the latest project continuity/decision records.
3. Inspect active issues and PRs.
4. Inspect `docs/research/PRODUCT_RESEARCH_PROGRESS.md` and latest research handoffs.
5. Identify the highest-value unfinished authorised task.
6. Check whether an assigned sub-agent is idle, blocked, stale, or has completed its task.
7. If a sub-agent is available and the next task is clear, issue the next concrete task without waiting for user input.
8. If a task is blocked, record the exact blocker and move to an independent task.
9. Review completed sub-agent work for evidence quality and scope compliance.
10. Update persistent GitHub state.
11. Never create activity merely to appear busy.
12. Stop/escalate only when a genuine owner/authority decision, credential, production change, financial commitment, legal/compliance decision, or unresolved strategic conflict is required.

## Product & Supplier Sub-Agent

The Product & Supplier Sub-Agent should continue through the approved category order:

1. Home Organisation
2. Mobile/Computer Accessories
3. Pet
4. Beauty Accessories
5. Baby/Kids
6. Safety

It should not wait for `CONT` after each product or batch. Manus should proactively assign the next independent research task after a meaningful completion.

Required output is persistent evidence, not status-only messages. Update the product research dashboard and create structured research handoffs.

## Technical sub-agents

Technical work should remain constrained to approved M3 scope. Do not allow catalogue research, analytics, marketplaces, accounts, automation, or multi-tenancy to expand the M3 critical path.

## Concurrency rules

- Do not start duplicate tasks against the same branch/file.
- Before assigning work, check the latest GitHub state.
- Prefer separate branches for independent work.
- Keep production Shopify untouched unless explicitly authorised.
- No credentials in repositories.
- No architecture changes by sub-agents without authority.

## Health / watchdog rules

Mark a task **stale** when it has had no meaningful evidence-producing activity for two scheduled cycles. On stale status:
1. inspect the blocker;
2. attempt an independent continuation or narrower task;
3. reassign if the runtime supports reassignment;
4. record the state in GitHub.

Do not repeatedly prompt an agent with the same instruction if it is blocked by an unavailable capability.

## Human escalation

Escalate to the owner only for:
- strategic direction changes;
- production publication;
- credentials/authentication requiring owner action;
- spending/paid services;
- legally or commercially material commitments;
- unresolved conflicting authority decisions.

Everything else that is reversible, documented, within scope and evidence-based should proceed autonomously.

## Progress visibility

The owner should be able to inspect GitHub at any time. The Overseer should maintain:
- current status;
- completed work;
- active task;
- next task;
- blockers;
- sub-agent health;
- evidence links;
- decisions awaiting approval.

## Success condition

The system should behave like a small supervised project team: agents keep working on authorised tasks, the Overseer keeps them coordinated, GitHub preserves continuity, and the owner is interrupted only for decisions that genuinely require human authority.
