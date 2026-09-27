# BUG DNA architecture

## High-level architecture

```text
+-------------------+     +---------------------+
| Browser UI        | --> | App shell           |
| (React + Vite)    |     | Investigation flow  |
+-------------------+     +----------+----------+
                                       |
                                       v
                         +---------------------------+
                         | Demo data layer           |
                         | src/data/payflow.ts       |
                         | - bugs                   |
                         | - commits                |
                         | - tests                 |
                         | - evidence              |
                         +------------+--------------+
                                      |
                 +--------------------+--------------------+
                 |                                         |
                 v                                         v
      +---------------------+                   +------------------------+
      | Investigation room   |                   | Case evaluation        |
      | - Historian          |                   | - similarity match     |
      | - Code Forensics     |                   | - mutation analysis    |
      | - Test Detective     |                   | - root cause summary   |
      | - Document Analyst   |                   | - final report         |
      +---------------------+                   +------------------------+
                 |
                 v
      +---------------------------+
      | Evidence and findings UI  |
      | - timeline                |
      | - impact map              |
      | - regression tests       |
      | - fix proposal           |
      +---------------------------+
```

## Why this structure matters

The UI is intentionally decoupled from the data source. The prototype uses a local dataset, but the same screen can later consume:

- GitHub Issues API output
- repository or git log analysis
- bug triage heuristics
- LLM-generated summaries

The logic remains deterministic and demo-safe while preserving a clear integration seam for real tools.

## Data model

Core types live in src/types/index.ts and include:

- Bug
- Commit
- TestCase
- Evidence
- Agent
- CodePathNode
- Finding
- CaseFile

This keeps the investigation flow strongly typed and makes it easy to extend the demo to additional repositories and incidents.

## Execution flow

1. Landing page loads the seeded case.
2. The investigation runner activates the stage list and agents.
3. The evidence board and mutation board surface historical patterns.
4. The test panel generates missing regression cases.
5. The diff proposal and verification panel complete the closed case report.

## Future integration plan

A future production version could replace the local data source with adapter modules such as:

- services/git.ts for git ancestry and commit analysis
- services/github.ts for issue and PR retrieval
- services/llm.ts for summary or similarity scoring
- services/tests.ts for actual generated test execution

The UI would continue to render from the same type-safe data contract without requiring a redesign.
