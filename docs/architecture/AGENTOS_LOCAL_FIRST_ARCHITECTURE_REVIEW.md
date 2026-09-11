# AgentOS Local-First Architecture Review

**Focus:** Local files, persistent memory, privacy, and data governance  
**Decision goal:** Select the safest practical architecture for a mass-market AI operating layer that works with ordinary users’ local files and persistent AI memory while preserving zero-cloud-by-default behavior, model/provider agnosticism, explicit permissions, and deterministic governance.  
**Author:** Manus AI  
**Date:** 2026-09-11

## Executive decision

AgentOS should adopt a **local encrypted data plane with rebuildable derived indexes and a policy-enforced memory plane**. The system of record should be a per-user, per-install encrypted SQLite database containing metadata, permissions, provenance, policy state, memory records, and audit receipts. Original files and generated files should remain in user-selected filesystem locations unless the user explicitly enables an AgentOS-managed vault. Full-text indexes, embeddings, thumbnails, OCR output, and caches should be treated as sensitive derived data.

The recommended Windows-first design is:

1. Generate a random per-install data-encryption key and wrap it with Windows DPAPI for the current user. DPAPI normally binds decryption to the same user credentials and computer and includes a keyed integrity check.[1]
2. Use SQLCipher or an equivalently audited full-database encryption layer for SQLite. SQLCipher documents 256-bit AES full-database encryption and cross-platform operation.[2]
3. Use SQLite FTS5 for lexical retrieval and add vector search only behind a narrow, versioned adapter. FTS5 supports incremental maintenance, rebuilds, and contentless or external-content designs.[3]
4. Treat embeddings as sensitive derivatives, not anonymous metadata. Published research demonstrates inversion and sensitive-attribute inference against text embeddings, including under a transfer-attack threat model without direct access to the original embedding model.[4]
5. Treat memory as a typed, user-visible data product rather than an automatic transcript. Durable memory requires provenance, sensitivity, confidence, expiry, correction, deletion, and retrieval scope.
6. Keep authorization outside the model. Models may propose searches, writes, memory updates, or remote calls, but application code must authorize them using capabilities, path scopes, classifications, and approvals. OWASP recommends least privilege, untrusted-content separation, validation, memory isolation, expiry, and human approval for high-risk actions.[5]

This design does not promise secrecy from malware that already controls the active Windows account, nor can it retract data already disclosed to a remote provider. It does provide the strongest practical default for a consumer desktop product: offline indexing and memory, explicit file scopes, controlled disclosure, deterministic deletion semantics, and provider-neutral storage.

## Non-negotiable principles

| Principle | Required behavior |
|---|---|
| Local-first | Indexing, retrieval, embeddings, memory, logs, and governance work offline by default. |
| Zero-cloud-by-default | No file, embedding, prompt, receipt, or memory record leaves the device without a visible policy decision. |
| Data minimization | Store the smallest derivative needed for the enabled feature. |
| Capability security | Every file operation has an explicit capability containing operation, path, data class, purpose, and expiry. |
| Model/provider agnosticism | Retrieval, memory, policy, and storage use stable application contracts independent of model vendor. |
| Deterministic governance | Policy decisions, approvals, receipts, retention, and deletion are code-enforced and reproducible. |
| User legibility | Users can inspect indexed locations, memory entries, remote disclosures, retention, and deletion status. |

## Scope and assumptions

This review covers local files, file-derived data, local model context, explicit provider calls, persistent memory, storage encryption, retention, deletion, export, backup, and auditability. It does not revisit remote-worker transport, scheduler A→B→C recovery, multi-provider routing, or generic V1 release assurance.

The target is a Windows-first desktop application with future portability to macOS and Linux. BitLocker should be used when available as defense in depth. BitLocker protects whole volumes from offline theft and decommissioning; it is not a substitute for application-level encryption while Windows is running.[6]

## Threat model

### Assets

| Asset | Examples | Primary concern |
|---|---|---|
| Source files | Documents, photos, email exports, code, tax records, health records | Unauthorized reading, unintended indexing, stale copies |
| File metadata | Names, paths, timestamps, sizes, hashes, ACLs | Sensitive inference even without contents |
| Lexical indexes | FTS terms, snippets, token statistics | Search leakage and backup disclosure |
| Embeddings | Dense vectors for chunks and memories | Inversion, attribute inference, cross-scope retrieval |
| Cached context | Prompt assembly, retrieved chunks, tool results | Plaintext leakage, injection, stale authority |
| Credentials and keys | Provider tokens, wrapped DEK, export passphrases | Account compromise and irreversible disclosure |
| Prompts and outputs | User messages, tool arguments, generated text | Privacy leakage and provenance ambiguity |
| Receipts and logs | Policy decisions, approvals, errors | Secondary disclosure and linkability |
| Generated files | Drafts, exports, transformed files | Accidental overwrite, unsafe path, excess retention |
| Long-lived memory | Preferences, facts, goals, inferred traits | Poisoning, unfair personalization, difficult deletion |

### Adversaries and failure modes

The architecture should address accidental over-broad folder selection, malicious or compromised documents, prompt injection in files, a malicious plugin or model, another local user, stolen or decommissioned hardware, cloud-provider over-collection after opt-in, backup leakage, stale indexes, corrupted indexes, and memory poisoning.

The model must be treated as an **untrusted policy client**. Retrieved content must be labeled as data, not instructions. Tool calls must be separately authorized. High-impact writes, deletes, exports, remote disclosures, and permission changes require an approval token bound to exact parameters and a short expiry.

Application-level encryption protects data when the application is closed or storage is copied. It cannot fully protect plaintext held in process memory during an active session from malware running as the same user. DPAPI is normally user- and machine-bound, which improves local protection but complicates migration and recovery.[1]

## Data governance classes

Classification should be applied to source files and inherited by chunks, OCR, thumbnails, embeddings, summaries, memories, prompts, outputs, and receipts unless a verified transformation explicitly changes it.

| Class | Examples | Default indexing | Default remote disclosure | Retention |
|---|---|---|---|---|
| C0: Public/low sensitivity | Public notes and selected references | FTS and local embeddings allowed | Only with active provider policy | User-configurable |
| C1: Personal | Correspondence, resumes, household documents | FTS allowed; local embeddings allowed | Denied by default | Purpose-bound |
| C2: Sensitive | Financial, health, legal, identity documents | FTS only if explicitly enabled; embeddings off by default | Denied unless operation is approved | Shortest useful period |
| C3: Restricted | Keys, passwords, recovery phrases | Never content-indexed; minimize metadata | Denied | No persistence outside source |

User overrides must be explicit, scoped, reversible, and recorded. A summary of a sensitive document remains sensitive by default.

## Reference architecture

```text
User files and generated files
        |
        v
File capability broker -> scanner/parser -> normalized chunks
        |                         |                 |
        |                         +-> classification |
        |                                           v
        |                          encrypted SQLite system of record
        |                         /      |       |        \
        |                        /       |       |         \
      policy ledger          FTS5    vector   memory   receipts
        |                               index   service
        v                                 |       |
   disclosure gate <----- prompt assembler ------+
        |
  local model or explicit remote provider
```

The **file capability broker** is the only component allowed to resolve user paths. It enforces canonicalization, symlink and junction handling, allowed roots, read/write/delete operation, file-type limits, classification, purpose, and expiry. Parsers run with resource limits and no write access to user files. A document instruction is never an AgentOS instruction.

The **encrypted SQLite system of record** contains stable IDs, source fingerprints, chunk provenance, policy state, memory records, index manifests, approval tokens, and receipts. Large original files remain external by default. The **retrieval service** filters by policy before ranking and before context assembly. The **memory service** is separate from transcript storage and accepts typed candidates through validation.

## Windows-first encrypted storage and key hierarchy

Generate a random per-install data-encryption key using an approved cryptographic random source. Store only a DPAPI-protected copy for the current user. Bind DPAPI protection to an application purpose string and optional additional entropy. Keep the plaintext key out of logs, crash dumps, URLs, filenames, and diagnostics.

Use an encrypted SQLite layer for the database, journal, WAL, temporary database files, and backup artifacts. Configure temporary directories so sensitive temporary files do not fall back to unencrypted system locations. If a library cannot guarantee encryption of temporary or sidecar files, place the complete working directory inside an encrypted vault or disable that feature.

Use BitLocker as defense in depth, not as the only control. TPM-backed startup protection is valuable against offline disk access.[6]

For portability, use Keychain on macOS and Secret Service/libsecret or an explicit passphrase-backed key file on Linux. Keep the database format platform-neutral; only the key-wrapping adapter should be platform-specific. Recovery must use a user-held export key or passphrase if DPAPI is unavailable. The product must not claim recoverability it cannot provide.

## SQLite, FTS, and vector-index comparison

| Approach | Strengths | Weaknesses | Recommendation |
|---|---|---|---|
| SQLite tables only | Minimal dependencies, portable, transactional metadata | Limited semantic retrieval at larger scale | Required canonical store; enough for small installs |
| SQLite + FTS5 | Mature lexical search, one transaction boundary, rebuild support | Index size and merge cost | Default retrieval layer |
| SQLite + vector extension | One encrypted store, simple backup, portable adapter | Extension supply chain and maturity variation | Optional local semantic layer |
| Embedded vector database | Specialized ANN performance | Separate encryption, backup, deletion, and consistency surface | Avoid as initial system of record |
| Sidecar ANN index | Can optimize large collections | More complex crash recovery and deletion | Later optimization only; always rebuildable |

SQLite documents WAL for concurrency and an online backup API for hot, consistent backups.[7] FTS5 stores persistent shadow tables and incrementally merges b-trees, so index maintenance must be included in performance and deletion tests.[3] Every index should be disposable: canonical source observations and chunk records determine whether an index is complete, stale, or rebuildable.

The first implementation should use SQLite tables plus FTS5. Add vector search only after establishing an index manifest containing embedding model ID, dimension, normalization, quantization, scope, classification, and creation version. If the embedding model changes, rebuild rather than mix incompatible vectors.

## File indexing and retrieval

Indexing must be opt-in by root, visible in the UI, incremental, pausable, and revocable. Defaults should exclude operating-system directories, browser profiles, credential stores, cloud-sync metadata, hidden application data, and restricted filename patterns. Selecting a parent folder must not imply unrestricted access forever.

The scanner should record a source ID, canonical path representation, file identity where available, size, modification time, content hash, parser version, classification, and index status. It should detect moves and replacements without silently merging histories. A changed source invalidates derived chunks and embeddings; stale data must not remain eligible after revocation or deletion.

Parsing should be content-type aware, resource-limited, and isolated from mutation capabilities. Parser output should preserve page, section, byte, or character offsets so every retrieved statement is traceable to a source version. OCR and image extraction are separate derived artifacts with their own classification and retention.

Retrieval should: resolve the session and purpose; filter by capability, user, classification, revocation, and retention; retrieve lexical and semantic candidates; remove stale or ineligible candidates; label remaining content as untrusted source data; assemble minimum necessary context; and record a redacted receipt containing source IDs, policy decision, model boundary, and hashes.

The model must not issue a path glob, arbitrary SQL query, or unrestricted search request. It may request a structured search with bounded scope, query length, result count, and classification ceiling.

## Persistent memory semantics

Persistent memory should be divided into four stores:

| Store | Purpose | Default lifetime | User control |
|---|---|---|---|
| Working context | Current task state and retrieved snippets | Session or short TTL | Clear session |
| Episodic record | User-visible interaction history or receipt | Explicitly enabled | Inspect, export, delete |
| Semantic memory | Durable preference, fact, goal, or constraint | Until expiry or correction | Inspect, correct, pin, delete |
| Policy memory | Permissions, denials, retention, provider choices | Until changed or revoked | Inspect, revoke, audit |

A memory candidate should contain a stable ID, type, content, source references, created time, last confirmed time, confidence, sensitivity, scope, expiry, status, and provenance graph. Durable memory should be suggested and reviewed by default. An optional setting may allow automatic capture only for narrowly typed, low-risk preferences. Sensitive traits should not be inferred into durable memory for convenience.

Memory writes should be validated for length, sensitivity, injection markers, provenance, scope, and duplication. Memory retrieval should use only records whose scope and purpose match the active task. Memory can inform a response but cannot authorize file access, remote disclosure, deletion, or other external action. Inferred memories should have lower trust and shorter expiry.

Deletion must propagate from the memory record to embeddings, summaries, caches, export queues, and index manifests. The product should report exact local actions and residual limits rather than promise metaphysical forgetting.

## Permissions and user experience

Permission UI should expose **what**, **where**, **why**, **for how long**, and **what leaves the device**. A structured statement might say: “Read PDFs in `Documents/Research` for local search until revoked; do not write or upload; sensitive files excluded.”

Permissions must be separate for metadata read, content read, local indexing, model submission, durable memory, file creation, overwrite, deletion, local models, and remote providers. One-time approval must be distinct from standing permission. Revocation must immediately deny new operations, invalidate derived candidates, cancel queued work, and initiate deletion.

Before any remote call, show the provider, purpose, data classes, selected source IDs, approximate payload size, known retention or training setting, and redaction status. If the user has not enabled remote processing for the relevant class, deny locally. Revocation cannot retract data already sent to an external provider; the UI must say so.

## Provider-agnostic boundary and remote opt-in

The core contract should be:

```text
Policy-filtered context + task request
        -> model adapter
        -> structured result proposal
        -> deterministic validator and policy gate
```

Storage and governance must not depend on provider-specific conversation formats. Provider adapters receive only minimum allowed context and return a structured response with model identity, capability claims, usage metadata, and proposed tool actions. An adapter must not read the local database directly.

Remote processing is an explicit capability containing provider, purpose, data class, scope, and expiry. “Use cloud AI” is too broad. Redaction is defense in depth, not a guarantee that sensitive meaning has been removed. Embeddings should be generated locally by default and should not be treated as a safe substitute for source text.[4]

## Retention, deletion, export, backup, and recovery

Retention is purpose- and class-bound. Working context expires quickly. Parser caches and thumbnails have short, configurable lifetimes. Embeddings are deleted when their source is removed, semantic indexing is disabled, or the embedding model is retired. Receipts contain minimal redacted evidence and must not become a shadow transcript.

Deletion should be a state machine: requested, policy-checked, source unlinked, derived data invalidated, indexes rebuilt or compacted, caches cleared, export queues canceled, and completed. Every step should be idempotent. The receipt should identify what was deleted, what was retained by explicit policy, and what could not be verified because it was outside the device.

For SQLite, use the official backup mechanism rather than copying a live database file blindly, especially with WAL enabled.[7] Backups must be encrypted, versioned, integrity-checked, and excluded from ordinary search. Automatic backup must be opt-in or clearly disclosed because a backup is another copy of every local derivative.

Export should support policy and receipts only; memory and metadata; or a complete encrypted archive including selected derived data and source copies. Import must not automatically restore broad permissions or remote-provider settings. Imported data should begin in a locked scope until reviewed.

## Audit receipts and deterministic governance

A receipt should include an event ID, time, actor/session class, policy version, operation, capability ID, source IDs or content hashes, data classes, destination class, decision, approval binding, and result status. It should exclude raw prompts, full paths where unnecessary, file contents, secrets, and unrestricted model outputs.

Receipts should be hash-chained or otherwise integrity-protected in the encrypted store. This detects local tampering but does not prove that no external copy exists. The user activity view and technical diagnostic export should have separate redaction rules.

Governance decisions must be reproducible from policy version, capability, classification, scope, and operation. If a model requests “search all documents,” the policy evaluator returns a bounded decision or denial. Unknown classification uses the more restrictive policy or requires a scope-specific user choice.

## Abuse-case matrix

| Abuse case | Required control | Verification evidence |
|---|---|---|
| Malicious instruction in a document | Treat retrieved text as untrusted data; isolate instructions from content | Injection corpus shows no unauthorized tool or disclosure |
| Sensitive file selected accidentally | Restricted defaults, preview, classification warnings, reversible indexing | Selection and policy tests |
| Memory poisoning | Validate, scope, expire, provenance-tag, and quarantine | Poisoning tests show rejection or review |
| Stale deleted content retrieved | Revocation invalidates candidates before ranking | Delete-and-retrieve tests |
| Embedding database copied | Encrypt database and sidecars; treat vectors as sensitive | Offline copy cannot open without key |
| Remote disclosure bypass | Provider call requires structured capability and disclosure decision | Denial tests for C2/C3 and unapproved providers |
| Path traversal or junction escape | Canonicalize and enforce allowed roots at operation time | Filesystem adversarial tests |
| Plugin overreach | Broker all file and memory access; no ambient filesystem access | Capability matrix and sandbox tests |
| Backup leakage | Encrypt backups and disclose destinations | Restore and inspection tests |
| User deletes memory | Propagate deletion to derivatives and show residual limits | End-to-end deletion receipt |

## Phased implementation plan

**Phase 0 — Governance contract.** Define classes, capability schema, retention states, receipt schema, memory types, provider disclosure schema, and deletion state machine. Acceptance requires every flow to have a named purpose, classification, retention, and deletion path.

**Phase 1 — Local canonical store.** Implement encrypted SQLite, DPAPI-wrapped per-install key, platform key adapter, migrations, integrity checks, and encrypted export/import. Add source registry, folder scopes, revocation, and redacted receipts. Acceptance requires offline operation, safe key-unavailable failure, deterministic migrations, and restore tests.

**Phase 2 — Safe file indexing.** Add the read-only capability broker, parser isolation, source fingerprints, chunk provenance, FTS5, incremental updates, stale-data invalidation, and rebuild commands. Acceptance requires path-boundary, restricted-default, deletion, and crash-consistency tests.

**Phase 3 — Governed memory.** Add typed candidates, user review, provenance, sensitivity, expiry, correction, quarantine, and derivative deletion. Acceptance requires poisoning, cross-scope isolation, export, selective deletion, and no-memory-by-default tests.

**Phase 4 — Local semantic retrieval.** Add a local embedding adapter and vector index behind a versioned interface. Acceptance requires deterministic rebuilds, encrypted storage, model-version migration, vector deletion, and injection-resistance tests.

**Phase 5 — Explicit remote opt-in.** Add provider adapters behind the disclosure gate, with data-class and purpose scopes, redaction, payload previews, capability declarations, and denial-by-default tests.

## Owner decisions and limitations

The owner must decide whether a user-created recovery passphrase is mandatory for portability or optional for users who accept DPAPI-bound recovery. The owner must also decide default retention for episodic records and whether semantic indexing is enabled for C1 personal data by default.

The architecture cannot guarantee secrecy from malware with equivalent access to the active Windows account. It cannot retract data already disclosed to a remote provider. It cannot prove that an external backup system deleted every copy. It cannot guarantee that an embedding is non-sensitive. These limitations belong in product documentation and relevant UI disclosures.

A design specification, static analysis, adversarial test suite, or local prototype is not proof of runtime security or production readiness. Runtime assurance requires implementation-specific testing, dependency review, platform hardening, upgrade testing, and independent security assessment.

## Final recommendation

Adopt the **encrypted SQLite canonical store plus FTS5-first retrieval, optional local vector adapter, typed governed memory, and capability-based disclosure gate** as the AgentOS local-file and memory foundation. Keep original files outside the vault by default, make all derived data sensitive and rebuildable, use DPAPI to wrap application keys rather than as the portable data format, use BitLocker as defense in depth, and keep the model outside the authorization boundary.

This is the safest practical architecture because it reduces independent persistence systems, makes offline operation normal, keeps remote disclosure explicit, gives ordinary users understandable controls, and turns privacy and deletion into deterministic application behavior rather than model prompting.

## References

[1]: https://learn.microsoft.com/en-us/windows/win32/api/dpapi/nf-dpapi-cryptprotectdata "CryptProtectData function (dpapi.h)"
[2]: https://www.zetetic.net/sqlcipher/ "SQLCipher - Full Database Encryption for SQLite"
[3]: https://www.sqlite.org/fts5.html "SQLite FTS5 Extension"
[4]: https://arxiv.org/html/2406.10280v1 "Transferable Embedding Inversion Attack: Uncovering Privacy Risks in Text Embeddings without Model Queries"
[5]: https://cheatsheetseries.owasp.org/cheatsheets/AI_Agent_Security_Cheat_Sheet.html "AI Agent Security Cheat Sheet"
[6]: https://learn.microsoft.com/en-us/windows/security/operating-system-security/data-protection/bitlocker/ "BitLocker overview"
[7]: https://www.sqlite.org/docs.html "SQLite Documentation"
[8]: https://www.nist.gov/privacy-framework "NIST Privacy Framework"
[9]: https://genai.owasp.org/llmrisk/llm01-prompt-injection/ "LLM01:2025 Prompt Injection"
[10]: https://csrc.nist.gov/glossary/term/least_privilege "NIST Glossary: Least Privilege"
[11]: https://www.sqlite.org/backup.html "SQLite Online Backup API"
[12]: https://www.sqlite.org/wal.html "SQLite Write-Ahead Logging"
[13]: https://www.sqlite.org/loadext.html "SQLite Run-Time Loadable Extensions"
[14]: https://faiss.ai/index.html "Welcome to Faiss Documentation"
[15]: https://www.microsoft.com/en-us/security/blog/2026/06/22/guarding-ai-memory/ "Guarding AI memory"
[16]: https://arxiv.org/html/2605.11032v1 "Portable Agent Memory: A Protocol for Provenance and Deletion"
[17]: https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html "Authorization Cheat Sheet"
