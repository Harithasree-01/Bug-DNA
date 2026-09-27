# 🧬 BUG DNA

**Every bug leaves a genetic trace.**

A hackathon prototype for the **IBM Bob 2.0 Hackathon**. BUG DNA is a developer-forensics tool
for debugging and regression testing: instead of only fixing the bug in front of you, it
reconstructs the bug's "DNA" from your stack trace, code path, Git history, previous issues,
previous fixes, tests, and documentation — then tells you whether this bug has a family history,
and whether the old fix actually covers the new incident.

> Traditional debugging asks: *how do I fix this bug?*
> BUG DNA asks: *where have we seen this bug's DNA before, and what did we miss last time?*

---

## 1. Problem

Developers usually fix bugs by reading the current stack trace and the surrounding source. But
similar bugs often already exist somewhere in the project's history — an old issue, an old fix, a
related test, a documentation claim that no longer matches the code. Skipping that history causes:

- duplicated debugging effort
- repeated bugs
- incomplete fixes that patch one path but miss a sibling path
- missed related code paths
- unnecessary rework
- weak regression coverage

## 2. Solution

BUG DNA treats a bug report the way a forensics lab treats evidence. It extracts a "DNA profile"
from the report (error type, affected module, mutation, trigger, code path), runs a set of
investigator agents in parallel over the project's history, finds the closest historical match,
and — critically — highlights **how the current bug differs** from its ancestor. That difference
is usually exactly what the old fix didn't cover.

## 3. How BUG DNA works

1. **Report** — the developer submits a bug (title, description, stack trace, repo, file).
2. **DNA extraction** — the report is distilled into an error type, module, mutation, trigger and
   code path.
3. **The Investigation Room** — five agents run in parallel: Historian (Git history), DNA Matcher
   (similar bugs), Code Forensics (affected functions), Test Detective (coverage gaps), and
   Document Analyst (docs vs. behavior).
4. **DNA match** — the closest historical incident is shown, with matched signals and — just as
   important — the *differences* from the current bug.
5. **The mutation** — the historical fix's covered path and the current bug's new,
   unprotected path are shown as two related strands.
6. **Impact map** — a dependency chain shows which functions are downstream of the fix, plus a
   documentation-vs-behavior discrepancy the investigation surfaced along the way.
7. **Regression tests** — tests are generated for the scenarios the old fix and old tests missed.
8. **Fix proposal** — root cause plus a concise before/after diff.
9. **AI code review** — correctness, regression risk, test coverage, maintainability and security,
   each with a verdict and a note.
10. **Case closed** — a final forensic report summarizing the investigation, exportable as a file.

## 4. Developer workflow improved

**Debugging + regression testing.** BUG DNA shortens the loop between "a bug was reported" and "a
verified, regression-safe fix exists" by front-loading the historical research a developer would
otherwise do manually (or skip).

## 5. Multi-agent architecture

The Investigation Room models five specialized agents running concurrently, each with its own
status machine (`idle → analyzing → found evidence → complete`), progress, and evidence list. In
this prototype the agents run against seeded local data on a timer to demonstrate the concurrency
model; see [`docs/architecture.md`](docs/architecture.md) for how each agent's `services/` module
is structured so a real integration (GitHub API, git log, an LLM call) can be dropped in later
without changing the UI.

## 6. Demo flow

The included demo case is **BUG-217** on a fictional payment-processing project, **PayFlow**.
BUG-217 looks like a known incident, **BUG-184**, which was already fixed — but the old fix only
covered the standard checkout path, and BUG-217 travels through a newer subscription-refund path
that bypasses it. See [`docs/demo-script.md`](docs/demo-script.md) for the full walkthrough.

## 7. Technology used

- React 18 + TypeScript
- Vite
- Tailwind CSS
- lucide-react icons
- No backend, no external APIs, no auth — all data is seeded locally in `src/data/payflow.ts`

## 8. How to run

```bash
npm install
npm run dev
```

Then open the printed local URL. Click **Load demo case — BUG-217** on the landing page for the
fastest path through the full investigation, or **Start an investigation** to fill out a bug
report yourself (the demo always resolves against the seeded PayFlow project).

```bash
npm run build    # type-check and produce a production build
npm run preview  # preview the production build locally
```

## 9. Future integrations

This prototype is intentionally structured so the following can be added without reworking the
UI:

- **GitHub / Git integration** — replace the seeded commit history in `src/data/payflow.ts` with
  real `git log` output or the GitHub API, behind a `services/git.ts` module.
- **Issue tracker integration** — pull previous issues from GitHub Issues, Jira or Linear instead
  of the seeded `HistoricalMatch` data.
- **LLM-backed matching** — replace the deterministic similarity score with an embedding-based or
  LLM-scored comparison across stack traces, diffs and issue text.
- **Real regression test execution** — wire "Add to test suite" to actually write a test file and
  run it in CI.
- **Multi-project support** — the current demo is scoped to one seeded repository; the data layer
  is already shaped to support more than one `CaseFile`.

---

### Demo-data disclaimer

Everything under **Historical Hunt**, **DNA Match**, **Impact Map**, and the generated tests is
seeded demo data for the fictional "PayFlow" project, computed locally with no external services.
Similarity percentages are labeled as *"similarity based on this demo's matching signals,"* not a
scientific or statistical claim.
