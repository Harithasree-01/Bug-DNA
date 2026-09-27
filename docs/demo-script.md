# Demo script

## 2-minute walkthrough

### 0:00 – 0:20 | Landing screen

Open the landing page and explain the central question: not just "How do I fix this bug?" but "Where has this bug already shown up in our codebase and history?"

Highlight the hero statement: "Every bug leaves a genetic trace." This frames the experience as forensic investigation instead of a generic dashboard.

### 0:20 – 0:45 | Demo case loaded

Click the demo case to load BUG-217. Provide the summary:

- payment-processing project called PayFlow
- bug appears after promotional discount
- previous incident BUG-184 looks similar
- the system is comparing a historical fix against the current execution path

### 0:45 – 1:15 | Investigation room

Walk through the agent cards:

- Historian matched six related incidents
- Code Forensics found a subscription refund branch that bypasses the prior guard
- Test Detective found 18 tests and two missing regression scenarios
- Document Analyst found the docs/code mismatch

This shows the multi-agent workflow without requiring a real backend.

### 1:15 – 1:45 | Mutation detection

Focus on the mutation panel. Explain the core concept: the historical fix was valid in the checkout path, but the same bug family mutated into a new subscription refund path that never got covered.

This is the central hackathon message: same bug family, different execution path, different outcome.

### 1:45 – 2:05 | Regression tests and fix proposal

Show the generated tests for the missing scenarios:

- refund_after_discount()
- refund_after_subscription_discount()
- refund_with_missing_discount_metadata()

Then present the fix diff: guard against missing discount metadata and fall back to a base refund path instead of crashing.

### 2:05 – 2:20 | Final review and case closed

End with the final review summary and the case-closed report. Emphasize that the app produced a coherent historical investigation and regression-aware fix, all from deterministic local data and without external services.

## Presentation message

The product story is simple:

Don't just fix the bug. Find its ancestors.
