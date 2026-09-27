# BUG DNA

BUG DNA is an AI-assisted debugging prototype for the IBM Bob 2.0 Hackathon. It helps developers investigate whether a new bug is a mutation of a historical failure instead of simply fixing the current symptom.

## 1. Problem

Teams often fix bugs in isolation. A broken refund path, a missing null guard, or a discount edge case can appear again in a different code path and be fixed twice without learning from the earlier fix. The cost is duplicated investigation, weak regression tests, and silent system risk.

## 2. Solution

BUG DNA converts a bug report into a forensic profile: error family, module, stack trace, trigger, and mutation pattern. It compares the current incident with historical issues, checks prior fixes, validates code paths, and highlights whether the old fix actually covered the new path.

## 3. Why historical debugging matters

The key insight is that bugs are often not unique. They repeat with a different execution path. A prior fix can cover checkout refunds and still miss subscription refunds, creating the exact regression pattern this tool is built to expose.

## 4. BUG DNA workflow

1. Report the current incident
2. Extract the bug signature from stack trace and code path
3. Hunt historical issue matches and commit ancestry
4. Detect mutation between old and new execution paths
5. Generate missing regression tests
6. Propose a root-cause fix
7. Run a final review and verification
8. Close the case with a forensic summary

## 5. Agent architecture

The investigation room models several specialized agents:

- HISTORIAN: scans previous incidents and relevant commits
- CODE FORENSICS: traces impacted functions and mutation paths
- TEST DETECTIVE: checks existing coverage and identifies missing scenarios
- DOCUMENT ANALYST: compares docs and implementation
- DNA CORRELATOR: ties the evidence together and scores similarity
- ROOT CAUSE ANALYST: determines the actual failure and historical coverage gap
- VERIFICATION AGENT: checks the fix, tests, and readiness

This prototype uses deterministic local demo data so it works without external services. The data and agent logic are separated so GitHub, Git, and LLM connectors can be introduced later.

## 6. Demo data

The default demo is built around a fictional repository called PayFlow. The case tells one coherent story:

- Current report: BUG-217
- Historical ancestor: BUG-184
- Similarity signal: 87% based on shared error type, module, stack path, and null propagation
- Mutation: the historical fix covered checkout but not subscription refund

The demo data lives in src/data/payflow.ts and includes seeded bug history, commits, tests, and evidence.

## 7. Technology stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React
- Framer Motion is not required for the first demo but can be added later if needed

## 8. How to run

```bash
npm install
npm run dev
```

Then open the local Vite URL in the browser.

For a full production build:

```bash
npm run build
npm run preview
```

## 9. Future GitHub, Git, and LLM integrations

This prototype is intentionally built for demo-only local data. The code is structured for future connectors:

- GitHub API for issue and PR matching
- git log or repository analysis for ancestry and evolution
- LLM-assisted summarization and bug similarity analysis
- CI-based test execution and report export

No external API calls are required for the demo, and no false claims are made about real live repository queries.

## 10. Files to inspect

- src/App.tsx — main dashboard and investigation flow
- src/data/payflow.ts — demo repository evidence and case data
- src/types/index.ts — type contracts for the project
- docs/architecture.md — architecture notes and ASCII layout
- docs/demo-script.md — presentation walkthrough
