# Research Artifact Persistence Convention

## Purpose

Research deliverables produced for the Shopify-to-eBay and AgentOS workstream must be persisted in the repository rather than remaining only in the sandbox or chat attachments. This preserves provenance, supports review, and makes future maintenance auditable.

## Required repository locations

| Artifact | Repository location | Requirement |
|---|---|---|
|Final research brief or decision document|`docs/`|Use an uppercase subject and ISO date, for example `AGENTOS-WINDOWS-TASK-SCHEDULER-HEARTBEAT-HARDENING-2026-09-11.md`. |
|Raw wide-research output|`docs/` unless a subject-specific evidence directory exists|Preserve the machine-readable `.json` and tabular `.csv` output with the same subject/date stem and a `-WIDE-RESEARCH` suffix. |
|Execution or validation log|`docs/` or the subject-specific evidence directory|Include commands run, validation results, source failures, and unresolved caveats. Never include credentials, access tokens, or other secrets. |
|Reusable scripts, XML, or PowerShell|`scripts/`, `ops/`, or the subject-specific implementation directory|Commit only reviewable, non-secret source files. Keep environment-specific paths and secrets parameterized. |

## Naming and provenance

Every final brief should state its scope, author, date, source hierarchy, assumptions, limitations, and references. Research artifacts should retain the original raw output when it is useful for reproducibility, including failed or partial source tracks. Files must use UTC or an explicit timezone for timestamps and ISO `YYYY-MM-DD` dates in filenames.

## Git workflow

Before starting, inspect the current branch and working tree. Do not overwrite unrelated user changes. Add the final brief, raw outputs, and logs in one reviewable commit. Verify the staged file list, inspect the diff, run any available repository checks, and push to the current working branch only when the user has requested repository persistence. After pushing, verify the remote branch and commit identifier.

## Future default

For future research or generated technical deliverables in this workstream, save the final artifact and supporting raw data/logs under `docs/`, commit them with a focused message, and push them to the active branch. If the task concerns a different repository, apply the same convention in that repository. Do not persist secrets, private credentials, or unreviewed temporary files.

## Current adoption

This convention was added together with the AgentOS Windows Task Scheduler heartbeat hardening brief and its wide-research JSON/CSV outputs on 2026-09-11.
