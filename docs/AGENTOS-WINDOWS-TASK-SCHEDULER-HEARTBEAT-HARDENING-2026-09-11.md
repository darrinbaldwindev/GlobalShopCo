# AgentOS Windows 10/11 Five-Minute Heartbeat

## Production Hardening Recommendation

**Author:** Manus AI  
**Scope:** A local Windows 10/11 heartbeat using **Windows Task Scheduler → `scheduler-tick.mjs` → governed local wake → deterministic worker → durable local evidence**.  
**Recommendation status:** Suitable for production on a managed Windows workstation or server, provided the task is treated as a short-lived, non-interactive launcher and correctness is enforced in the worker rather than delegated to scheduler timing.

> **Core design rule:** Task Scheduler provides an opportunity to invoke the tick; it does not provide exactly-once delivery, durable application semantics, or proof that JavaScript completed successfully. The worker must record an attempt, acquire a singleton, perform idempotent work, atomically publish evidence, and exit with a meaningful code.

## Executive Recommendation

Use one **time-based trigger** anchored to an explicit UTC start boundary, repeating every five minutes indefinitely. Configure the task to run **whether or not the user is logged on**, under a dedicated low-privilege local service identity when all inputs and outputs are local. Use `RunLevel=LeastPrivilege`, an absolute version-pinned `node.exe`, an absolute `.mjs` path, and an explicit working directory. Do not rely on `PATH`, a user profile, mapped drives, shell file associations, or an interactive desktop.

Set `MultipleInstancesPolicy=IgnoreNew`, `ExecutionTimeLimit=PT4M`, `AllowHardTerminate=true`, and an application-level stale-lock recovery mechanism. `IgnoreNew` prevents overlap, while the four-minute limit ensures a normally healthy invocation cannot occupy the five-minute schedule indefinitely. The worker must treat duplicate or delayed ticks as safe and must distinguish **scheduled time**, **actual start time**, **completion time**, and **evidence sequence**.

For a laptop, keep `WakeToRun=false` unless waking the machine every five minutes is explicitly desired. Set `StartWhenAvailable=true` so that a missed start can be attempted after availability returns; Microsoft documents that this is opt-in, applies to infinite repetitions, queues the task, and has a default delay of ten minutes.[1] This is a **catch-up opportunity**, not a replay of every missed five-minute interval. If sleep gaps must be reconstructed, the worker should enumerate missing time windows from its durable checkpoint and process them idempotently.

Use a dedicated service account only when it materially reduces authority or is required for network access. For a strictly local heartbeat, `LOCAL SERVICE` is a practical low-authority choice, subject to a local validation of required directory and event-log rights. If the worker must access network resources, do not use S4U: Microsoft documents that credentials and logon type affect task launch, and S4U/password tasks require **Log on as a batch job**; choose a narrowly scoped gMSA or other approved managed identity instead.[2] Do not grant the worker administrative rights merely to simplify installation.

### Two viable operating models

| Approach | Tradeoffs | Cost | Setup complexity |
|---|---|---:|---:|
|Short-lived Task Scheduler launcher, recommended for the current AgentOS path|Native Windows scheduling, reboot recovery, history, and no resident process; timing can be delayed by sleep, startup, resource pressure, or policy; correctness must be in the worker|Low runtime overhead|Moderate |
|Long-running Windows service hosting the heartbeat loop|Better control over in-process timing and service recovery; requires service lifecycle, update, watchdog, shutdown, and logging design; a resident process increases attack and operational surface|Low runtime overhead, higher engineering cost|High |

The first model is the right default for the proven path. A service becomes preferable only if the heartbeat must remain continuously active during sleep transitions, requires sub-minute precision, or needs service-native dependency ordering and recovery.

## Hardened Task Profile

| Area | Recommended value | Rationale |
|---|---|---|
|Trigger|One time trigger; `Interval=PT5M`; no finite repetition duration|Avoids multiple independent triggers and keeps one stable five-minute cadence. Microsoft defines repetition through the trigger’s repetition pattern and ISO 8601 durations.[3] |
|Start boundary|Explicit UTC timestamp, e.g. `2026-09-11T00:00:00Z`|Makes the schedule auditable and avoids local-time ambiguity around daylight-saving transitions. Test the chosen Windows schema/version on the target build. |
|Missed starts|`StartWhenAvailable=true`|Requests a delayed start after availability returns; Microsoft documents a default ten-minute queue delay.[1] |
|Sleep|`WakeToRun=false` by default|Avoids waking a laptop every five minutes. Use `true` only when the power policy explicitly requires it; the setting wakes the computer and keeps it awake until completion.[4] |
|Battery|`DisallowStartIfOnBatteries=false`; `StopIfGoingOnBatteries=false` for an always-local heartbeat|Prevents power transitions from silently suppressing or terminating a tick. On battery-sensitive endpoints, invert these values and make the availability policy explicit. |
|Network condition|No network prerequisite for the local wake; worker performs bounded connectivity checks if needed|Avoids making the scheduler’s definition of “network available” the application’s readiness signal. |
|Principal|Dedicated low-privilege identity; local-only: `LOCAL SERVICE` or an approved dedicated local account|Avoids dependence on a user session and limits authority. |
|Logon behavior|Run whether user is logged on or not|The heartbeat must survive logout and reboot. Interactive-token tasks require an active user context and are unsuitable for unattended operation. [2] |
|Run level|`LeastPrivilege` / `TASK_RUNLEVEL_LUA`|Microsoft documents that tasks run with low privilege by default under UAC and require `Highest` only when elevation is actually needed.[2] |
|Executable|Absolute path to version-pinned `node.exe`|Avoids PATH changes and runtime substitution. |
|Script|Absolute path to `scheduler-tick.mjs`|Avoids the scheduler’s default directory and ambiguous relative paths. |
|Working directory|Absolute application directory|Microsoft’s PowerShell documentation states that if omitted, the task runs in `%windir%\system32`.[5] |
|Multiple instances|`IgnoreNew`|Prevents overlapping scheduled invocations. The worker still needs its own singleton because manual runs, retries, and alternate launchers can bypass this control. |
|Time limit|`PT4M`|Leaves one minute of separation in the nominal five-minute cadence. The task must be designed to exit; the limit is containment, not normal control flow. |
|Hard termination|`true`|Allows Task Scheduler to terminate a hung process. The worker must write an interrupted-attempt record and recover on the next tick. |
|Task restart|Optional: `RestartOnFailure` with at most two restarts and a one-minute interval|Useful for launch failures, but it can create extra attempts; idempotency and evidence deduplication are mandatory. Do not use restarts to mask deterministic application errors. |
|Priority|Default/background priority is generally sufficient; use priority 7 unless measured starvation is demonstrated|A heartbeat should not compete aggressively with user workloads. Microsoft exposes priority as a task setting.[6] |
|Demand start|Enabled for operator testing, but restricted task-file ACLs|Allows controlled validation without making the task broadly writable. |
|History|Enable Task Scheduler operational logging and retain application logs separately|Scheduler history confirms lifecycle events, not business success. |

## Reliability and Security Analysis

### Accounts and interactive versus non-interactive execution

An interactive-token task depends on a logged-on session. It can appear healthy during development and fail after logout, reboot, session lock, or service-account deployment. The production task should explicitly identify one account rather than a group, run without an interactive session, and use the least privilege required. Microsoft states that task security context, credentials, and logon type are specified at registration; it also documents that password and S4U task launches require `SeBatchLogonRight` / **Log on as a batch job**.[2]

S4U is attractive for local-only work because it avoids storing a user password, but it is not a general network credential mechanism. A managed service identity is the better pattern where the worker needs authenticated network access and the organization supports it. For a purely local evidence pipeline, keep the data local and avoid introducing network credentials at all.

Protect the task definition, application directory, evidence directory, and log directory with explicit ACLs. Microsoft’s `icacls` documentation supports viewing, saving, restoring, and modifying DACLs, including `RX`, `M`, and inheritance controls.[7] The installer or deployment administrator should have write access; the runtime identity should have read/execute access to code and write access only to the evidence and log directories. It should not be able to modify `node.exe`, the launcher, the task-registration script, or its own ACLs.

### Sleep, resume, reboot, and missed runs

A five-minute scheduler does not imply five-minute wall-clock execution when the operating system is asleep, powered off, suspended by battery policy, or not yet ready after reboot. `WakeToRun` can wake a device, but that is a power-policy decision, not a reliability default.[4] `StartWhenAvailable` is useful for a delayed post-resume or post-boot attempt, but Microsoft documents that missed tasks are queued and normally start after a ten-minute delay.[1]

The worker should therefore calculate the current interval from durable state. For each invocation, record a unique `tickId` derived from the intended schedule boundary, then use a compare-and-set or transaction-like file publication step. If the machine was unavailable for forty minutes, the next invocation may either process the eight missed windows or intentionally record a single catch-up event, depending on AgentOS policy. That choice belongs in the governed worker contract, not in undocumented scheduler behavior.

### Overlap, hangs, and stale locks

`IgnoreNew` is necessary but not sufficient. It only governs instances that Task Scheduler recognizes as belonging to the same task. A manually started worker, a second task definition, an orphaned child process, or an update script can still overlap. The worker should acquire a lock using an atomic create operation, write the owner PID, start time, host identity, and a heartbeat timestamp, and release it in a `finally` path.

A stale lock must not be deleted solely because its timestamp is old. Recovery should verify whether the recorded PID still exists, whether its executable path and start time match the lock metadata, and whether the lock age exceeds a conservative threshold such as two schedule intervals plus the maximum expected work time. If the owner is absent and the lock is stale, quarantine the lock and emit a recovery evidence record before acquiring a new lock. If the owner is present but unresponsive, allow the scheduler’s time limit to contain the process, or use a separately governed operator action; do not let every tick kill an arbitrary process based only on a PID.

The worker must be idempotent. A durable evidence record should be written to a temporary file in the same directory, flushed and closed, and then renamed into place under a deterministic name. Node’s filesystem documentation warns that concurrent filesystem modifications are not synchronized or thread-safe and that care is needed to avoid corruption.[8] Do not claim exactly-once behavior from a local file lock; design for at-least-once invocation with deduplicated effects.

### Execution paths, quoting, and working directory

Use `New-ScheduledTaskAction -Execute` with the full path to `node.exe`, pass the script path and fixed arguments through `-Argument`, and set `-WorkingDirectory` explicitly. Microsoft documents that `-Execute` is the executable path, `-Argument` supplies command-line arguments, and omission of `-WorkingDirectory` defaults execution to `%windir%\system32`.[5]

Avoid a shell wrapper unless it is needed for a documented reason. Shell wrappers add quoting layers, inherit shell semantics, and make exit-code propagation easier to get wrong. If a wrapper is unavoidable, use an absolute `cmd.exe` or PowerShell path, quote every path containing spaces, and test the exact registered action. Node’s documentation warns that `.cmd` and `.bat` files on Windows need a terminal or shell and that shell execution with unsanitized input can enable arbitrary command execution.[9]

Do not rely on environment-variable expansion for security-critical paths. Microsoft notes that environment variables in a task’s path, arguments, or working directory are cached when the task engine is launched.[10] Node likewise documents that child-process command lookup depends on `PATH` and that Windows environment variable names are case-insensitive.[9] Pin the runtime and application paths in the task definition; pass only non-secret, fixed configuration as explicit arguments or a read-only configuration file. Keep secrets out of command lines and task XML.

### Node.js updates and rollback

Do not point the task at a mutable “current” Node installation if rollback must be deterministic. Install the application into immutable release directories, for example:

```text
C:\Program Files\AgentOS\releases\2026.09.11-1\app\scheduler-tick.mjs
C:\Program Files\AgentOS\runtimes\node-v22.XX.YY\node.exe
C:\ProgramData\AgentOS\evidence\
C:\ProgramData\AgentOS\logs\
C:\ProgramData\AgentOS\state\
```

An upgrade stages and validates a new release, runs it manually under the target identity, exports the current task XML, registers the new definition, and verifies one tick. Rollback re-registers the previous known-good XML and runtime paths. Retain at least the last two task definitions and application releases. Never update the runtime binary in place while a tick is running.

## Concrete XML Configuration

The following XML is a template. Replace the identity, paths, author, and start boundary after validating them on the target Windows build. The exact account choice must follow the local-only or network-access requirement.

```xml
<?xml version="1.0" encoding="UTF-16"?>
<Task version="1.4"
      xmlns="http://schemas.microsoft.com/windows/2004/02/mit/task">
  <RegistrationInfo>
    <Author>AgentOS deployment</Author>
    <Description>AgentOS governed local five-minute heartbeat</Description>
    <URI>\AgentOS\Heartbeat</URI>
  </RegistrationInfo>
  <Triggers>
    <TimeTrigger>
      <StartBoundary>2026-09-11T00:00:00Z</StartBoundary>
      <Enabled>true</Enabled>
      <Repetition>
        <Interval>PT5M</Interval>
      </Repetition>
    </TimeTrigger>
  </Triggers>
  <Principals>
    <Principal id="AgentOSRuntime">
      <UserId>NT AUTHORITY\LOCAL SERVICE</UserId>
      <LogonType>ServiceAccount</LogonType>
      <RunLevel>LeastPrivilege</RunLevel>
    </Principal>
  </Principals>
  <Settings>
    <MultipleInstancesPolicy>IgnoreNew</MultipleInstancesPolicy>
    <DisallowStartIfOnBatteries>false</DisallowStartIfOnBatteries>
    <StopIfGoingOnBatteries>false</StopIfGoingOnBatteries>
    <AllowHardTerminate>true</AllowHardTerminate>
    <StartWhenAvailable>true</StartWhenAvailable>
    <RunOnlyIfNetworkAvailable>false</RunOnlyIfNetworkAvailable>
    <AllowStartOnDemand>true</AllowStartOnDemand>
    <Enabled>true</Enabled>
    <ExecutionTimeLimit>PT4M</ExecutionTimeLimit>
    <Priority>7</Priority>
    <WakeToRun>false</WakeToRun>
    <RestartOnFailure>
      <Interval>PT1M</Interval>
      <Count>2</Count>
    </RestartOnFailure>
  </Settings>
  <Actions Context="AgentOSRuntime">
    <Exec>
      <Command>C:\Program Files\AgentOS\runtimes\node-v22.XX.YY\node.exe</Command>
      <Arguments>"C:\Program Files\AgentOS\releases\2026.09.11-1\app\scheduler-tick.mjs" --mode=scheduled</Arguments>
      <WorkingDirectory>C:\Program Files\AgentOS\releases\2026.09.11-1\app</WorkingDirectory>
    </Exec>
  </Actions>
</Task>
```

If the device must run the heartbeat on battery, the battery settings above are appropriate. If battery operation is not acceptable, use `DisallowStartIfOnBatteries=true` and `StopIfGoingOnBatteries=true`, and add that policy to the acceptance tests. Do not add a separate boot trigger unless the product explicitly wants a boot-time invocation in addition to the periodic cadence; two triggers can create an intentional duplicate that must be idempotent.

## Concrete PowerShell Registration

Run the installer from an elevated Windows PowerShell session. The XML route is preferred because it makes the full definition reviewable and version-controllable.

```powershell
$ErrorActionPreference = 'Stop'

$TaskPath = '\AgentOS\'
$TaskName = 'Heartbeat'
$XmlPath  = 'C:\ProgramData\AgentOS\deploy\AgentOS-Heartbeat.xml'
$Backup   = 'C:\ProgramData\AgentOS\backup\AgentOS-Heartbeat-before-update.xml'

New-Item -ItemType Directory -Force (Split-Path $Backup) | Out-Null

$existing = Get-ScheduledTask -TaskPath $TaskPath -TaskName $TaskName -ErrorAction SilentlyContinue
if ($existing) {
    Export-ScheduledTask -TaskPath $TaskPath -TaskName $TaskName -Xml $Backup
    Disable-ScheduledTask -TaskPath $TaskPath -TaskName $TaskName | Out-Null
}

[xml]$xml = Get-Content -LiteralPath $XmlPath -Raw
if ($xml.Task.Triggers.TimeTrigger.Repetition.Interval -ne 'PT5M') {
    throw 'Refusing registration: repetition interval is not PT5M.'
}
if ($xml.Task.Settings.MultipleInstancesPolicy -ne 'IgnoreNew') {
    throw 'Refusing registration: multiple-instance policy is not IgnoreNew.'
}

Register-ScheduledTask -TaskPath $TaskPath -TaskName $TaskName -Xml (Get-Content -LiteralPath $XmlPath -Raw) -Force | Out-Null
Enable-ScheduledTask -TaskPath $TaskPath -TaskName $TaskName | Out-Null

$task = Get-ScheduledTask -TaskPath $TaskPath -TaskName $TaskName
$info = Get-ScheduledTaskInfo -TaskPath $TaskPath -TaskName $TaskName
$task | Select-Object TaskName, TaskPath, State, Author, Description
$info | Select-Object LastRunTime, NextRunTime, LastTaskResult, NumberOfMissedRuns
```

For a generated definition, the essential action/settings pattern is:

```powershell
$action = New-ScheduledTaskAction `
  -Execute 'C:\Program Files\AgentOS\runtimes\node-v22.XX.YY\node.exe' `
  -Argument '"C:\Program Files\AgentOS\releases\2026.09.11-1\app\scheduler-tick.mjs" --mode=scheduled' `
  -WorkingDirectory 'C:\Program Files\AgentOS\releases\2026.09.11-1\app'

$trigger = New-ScheduledTaskTrigger `
  -Once `
  -At (Get-Date).AddMinutes(1) `
  -RepetitionInterval (New-TimeSpan -Minutes 5) `
  -RepetitionDuration (New-TimeSpan -Days 3650)

$settings = New-ScheduledTaskSettingsSet `
  -MultipleInstances IgnoreNew `
  -ExecutionTimeLimit (New-TimeSpan -Minutes 4) `
  -StartWhenAvailable `
  -AllowStartIfOnBatteries `
  -DontStopIfGoingOnBatteries `
  -WakeToRun:$false `
  -RestartCount 2 `
  -RestartInterval (New-TimeSpan -Minutes 1) `
  -Priority 7

$principal = New-ScheduledTaskPrincipal `
  -UserId 'NT AUTHORITY\LOCAL SERVICE' `
  -LogonType ServiceAccount `
  -RunLevel LeastPrivilege

Register-ScheduledTask `
  -TaskPath '\AgentOS\' `
  -TaskName 'Heartbeat' `
  -Action $action `
  -Trigger $trigger `
  -Settings $settings `
  -Principal $principal `
  -Description 'AgentOS governed local five-minute heartbeat'
```

The XML form is safer for repeatable deployment because generated cmdlet defaults can vary by module/version and because the complete task can be code-reviewed. Confirm the resulting XML with `Export-ScheduledTask` and compare it to the expected definition.

## Logging and Diagnostics

Enable and monitor the `Microsoft-Windows-TaskScheduler/Operational` channel. Treat scheduler history as launch evidence: it can show registration, launch, completion, missed or rejected starts, and result codes, but it cannot prove that the governed worker wrote correct evidence. Also emit structured application records containing `tickId`, task identity, runtime version, PID, start/end UTC, exit code, lock outcome, worker outcome, evidence path, and error classification.

Security auditing can complement operational history. Microsoft documents Security event **4698** for scheduled-task creation and includes the task name and XML content; it applies to Windows 10-era auditing guidance.[11] Monitor task creation and modification as configuration changes, especially if the task definition or executable path changes unexpectedly.

Useful verification commands include:

```powershell
Get-ScheduledTask -TaskPath '\AgentOS\' -TaskName 'Heartbeat' | Format-List *
Get-ScheduledTaskInfo -TaskPath '\AgentOS\' -TaskName 'Heartbeat' | Format-List *
Export-ScheduledTask -TaskPath '\AgentOS\' -TaskName 'Heartbeat' -Xml 'C:\ProgramData\AgentOS\audit\Heartbeat-live.xml'
Get-WinEvent -LogName 'Microsoft-Windows-TaskScheduler/Operational' -MaxEvents 100 |
  Where-Object Message -match 'AgentOS|Heartbeat' |
  Select-Object TimeCreated, Id, LevelDisplayName, Message
```

## Ranked Risks

| Rank | Severity | Risk | Consequence | Required control |
|---:|---|---|---|---|
| 1 | Critical | Task or runtime path writable by the runtime identity or a standard user|Arbitrary code execution under the task identity; evidence tampering|Immutable release directories, explicit ACLs, administrator-only task deployment, `icacls` review |
| 2 | Critical | Secrets placed in XML, arguments, environment, or broadly readable files|Credential disclosure and lateral movement|Prefer local-only operation; use approved secret storage; never put secrets in command lines or task XML |
| 3 | High | Worker is non-idempotent|Duplicate or replayed work corrupts state or evidence|Deterministic tick IDs, deduplication, atomic publication, durable checkpoint |
| 4 | High | Hung process exceeds one interval|Skipped starts, resource exhaustion, stale state|`ExecutionTimeLimit=PT4M`, `IgnoreNew`, bounded worker operations, stale-run recovery |
| 5 | High | Interactive token or user profile dependency|No execution after logout, reboot, or session lock|Non-interactive principal, absolute paths, explicit working directory, profile-independent configuration |
| 6 | High | Sleep, power policy, or network condition silently suppresses ticks|Gaps in evidence and misleading “healthy” scheduler state|Explicit power policy, `StartWhenAvailable`, worker catch-up policy, health monitor |
| 7 | High | PATH, mutable Node installation, or quoting ambiguity|Wrong runtime, launch failure, or command injection|Absolute paths, versioned runtime, direct `node.exe`, no unsanitized shell input |
| 8 | Medium | Scheduler history treated as business success|False positive monitoring|Application evidence and exit-code contract separate from scheduler history |
| 9 | Medium | Restart-on-failure creates extra work|Duplicate attempts or burst after failures|Small retry budget, backoff, idempotency, explicit failure evidence |
| 10 | Medium | Task update deletes and recreates definition|Loss of history, changed ACLs, registration gap|Export backup, update in place with `-Force`, verify, retain rollback XML |
| 11 | Medium | Stale lock never recovers|Permanent suppression after crash|PID/start-time validation, quarantine, conservative stale threshold, recovery evidence |
| 12 | Low | Excessive priority or wake-to-run policy|User impact, battery drain, unexpected device wake|Priority 7 and `WakeToRun=false` unless a measured requirement justifies change |

## Acceptance Test Matrix

| ID | Test | Procedure | Expected result |
|---|---|---|---|
| A01 | Definition integrity | Export live task XML and compare required fields|Absolute executable/script/working directory; `PT5M`; `IgnoreNew`; `PT4M`; least privilege; intended power settings |
| A02 | Manual demand start | `Start-ScheduledTask` once under the registered identity|One structured attempt, durable evidence, exit code 0 on success |
| A03 | Logout/session lock | Log off or lock the interactive user and wait for a scheduled boundary|Tick still launches without a desktop or profile dependency |
| A04 | Reboot recovery | Reboot; inspect `NextRunTime`, history, and application evidence|Task remains enabled and produces a post-boot or catch-up attempt according to policy |
| A05 | Sleep/resume | Put the device to sleep across one or more boundaries, then resume|No unexpected wake when `WakeToRun=false`; delayed recovery follows `StartWhenAvailable`; missed-window policy is recorded |
| A06 | Battery transition | Start on AC, switch to battery, and reverse using the declared battery policy|Task either continues or stops exactly as documented; no silent policy mismatch |
| A07 | Hung worker | Use a test release that blocks beyond four minutes|Task is contained by the time limit; no permanent overlap; next eligible attempt can recover |
| A08 | Crash before evidence | Force an exception before publication|Nonzero exit, error record, no corrupt final evidence file, next run proceeds |
| A09 | Crash after temporary write | Terminate during temporary-file creation/publication|No partial final record; temporary artifacts are bounded and recoverable |
| A10 | Overlap | Start one long test worker, then trigger another manually and at schedule time|Second recognized task instance is not started; application lock independently prevents duplicate work |
| A11 | Stale lock | Create a lock with a dead PID and old timestamp|Worker quarantines/reports stale lock and recovers; a live matching owner is never deleted solely by age |
| A12 | Path with spaces | Install under `C:\Program Files\AgentOS` and run from scheduler|Script launches with exact arguments and expected working directory |
| A13 | Missing PATH | Replace the service environment with a minimal environment|Absolute Node path still launches; no dependence on user PATH |
| A14 | Node upgrade | Stage a new runtime/release, register it, run once, then restore prior XML|Upgrade and rollback are deterministic; no task points to deleted runtime |
| A15 | ACL review | Run `icacls` on task-related directories and files|Runtime can read/execute code and write only state/evidence/log targets; ordinary users cannot alter code/task definition |
| A16 | Scheduler observability | Enable operational log; run success, failure, timeout, and missed-start scenarios|Events and `Get-ScheduledTaskInfo` distinguish lifecycle outcomes; application logs contain business outcome |
| A17 | Task tampering | Modify or attempt to delete the task as a standard user|Operation is denied; authorized change generates an auditable configuration event |
| A18 | Long sleep gap | Keep the system unavailable for at least 40 minutes|Worker follows the declared replay/catch-up policy and produces no duplicate final effects |
| A19 | Disk-full simulation | Fill a test evidence volume or deny write permission|Worker exits nonzero, emits best-effort diagnostic output, preserves prior evidence, and recovers after capacity/ACL repair |
| A20 | Clock/DST review | Test near DST boundary or change local timezone in a test VM|Tick IDs and evidence timestamps remain unambiguous because schedule anchoring and UTC recording are explicit |

## Upgrade and Rollback Runbook

1. Build a new immutable release and runtime directory, record hashes and versions, and grant the runtime identity read/execute access only.
2. Run the worker manually under the target principal with a test evidence root and verify exit code, logs, lock behavior, and durable publication.
3. Export the live task XML and save it with a release identifier. Validate the proposed XML’s schema and semantic invariants, including task path, principal, action paths, trigger interval, time limit, and instance policy.
4. Disable the task briefly, register the new XML with `-Force`, re-enable it, and immediately inspect the live exported XML. Avoid delete-and-recreate unless task ACL repair or a documented migration requires it.
5. Run one controlled demand-start and wait for the next scheduled boundary. Confirm scheduler result, application result, evidence, and runtime version.
6. If any acceptance condition fails, disable the new task, re-register the backed-up XML, re-enable it, and run the same controlled verification. Do not delete the only known-good release until the new release has passed its observation window.

## Important Limitations

Task Scheduler can provide recurring launch attempts and process containment, but it cannot guarantee exact five-minute wall-clock execution during sleep, shutdown, power policy restrictions, service unavailability, or severe system contention. It cannot guarantee exactly-once execution, atomic business effects, or correctness of the JavaScript event loop. Those properties must be implemented and evidenced by AgentOS.

The recommended `LOCAL SERVICE` example is appropriate only after validating all required local permissions. If the worker calls remote services or writes to network shares, revise the principal and credential design rather than weakening ACLs or elevating the task. If the application eventually requires a continuously running loop, sub-minute precision, or service dependency ordering, reassess the short-lived task model against a Windows service.

## References

[1]: https://learn.microsoft.com/en-us/windows/win32/taskschd/tasksettings-startwhenavailable "TaskSettings.StartWhenAvailable property - Microsoft Learn"
[2]: https://learn.microsoft.com/en-us/windows/win32/taskschd/security-contexts-for-running-tasks "Security Contexts for Tasks - Microsoft Learn"
[3]: https://learn.microsoft.com/en-us/windows/win32/taskschd/repeating-a-task "Repeating a Task - Microsoft Learn"
[4]: https://learn.microsoft.com/en-us/windows/win32/taskschd/taskschedulerschema-settings-tasktype-element "Settings (taskType) Element - Microsoft Learn"
[5]: https://learn.microsoft.com/en-us/powershell/module/scheduledtasks/new-scheduledtaskaction?view=windowsserver2025-ps "New-ScheduledTaskAction - Microsoft Learn"
[6]: https://learn.microsoft.com/en-us/powershell/module/scheduledtasks/new-scheduledtasksettingsset?view=windowsserver2025-ps "New-ScheduledTaskSettingsSet - Microsoft Learn"
[7]: https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/icacls "icacls - Microsoft Learn"
[8]: https://nodejs.org/api/fs.html "File system - Node.js documentation"
[9]: https://nodejs.org/api/child_process.html "Child process - Node.js documentation"
[10]: https://learn.microsoft.com/en-us/windows/win32/taskschd/execaction "ExecAction object - Microsoft Learn"
[11]: https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4698 "4698(S): A scheduled task was created - Microsoft Learn"
[12]: https://learn.microsoft.com/en-us/powershell/module/scheduledtasks/export-scheduledtask "Export-ScheduledTask - Microsoft Learn"
[13]: https://learn.microsoft.com/en-us/powershell/module/scheduledtasks/register-scheduledtask "Register-ScheduledTask - Microsoft Learn"
[14]: https://learn.microsoft.com/en-us/windows/win32/taskschd/taskschedulerschema-multipleinstancespolicy-settingstype-element "MultipleInstancesPolicy element - Microsoft Learn"
[15]: https://learn.microsoft.com/en-us/windows/win32/taskschd/tasksettings-executiontimelimit "TaskSettings.ExecutionTimeLimit property - Microsoft Learn"

> **Implementation decision:** Adopt the hardened Task Scheduler profile above for the current AgentOS path, but make the worker’s idempotency, stale-run recovery, durable evidence contract, and upgrade/rollback procedure release-blocking acceptance criteria.
