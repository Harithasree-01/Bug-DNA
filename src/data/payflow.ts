import type { Agent, Bug, CaseFile, Commit, Evidence, TestCase } from '../types';

const currentBug: Bug = {
  id: 'BUG-217',
  title: 'Refund fails after promotional discount',
  description: 'Refund calculation fails when a discounted subscription is refunded.',
  errorType: 'TypeError',
  module: 'Payments',
  trigger: 'Discounted subscription refund',
  rootWeakness: 'Missing discount metadata guard',
  status: 'active',
  mutation: 'subscriptionRefund() → discount metadata → same weakness → uncovered path',
  historicalAncestor: 'BUG-184',
  dnaSimilarity: 87,
  stackTrace: [
    'TypeError: Cannot read properties of undefined',
    'at calculateRefund()',
    'at processRefund()',
    'at subscriptionRefund()',
    'at checkout()',
  ],
};

const historicalBug: Bug = {
  id: 'BUG-184',
  title: 'Refund calculation crashes after checkout discount',
  description: 'Legacy checkout refund bug triggered by discount metadata access.',
  errorType: 'TypeError',
  module: 'Payments',
  trigger: 'Checkout refund',
  rootWeakness: 'Missing discount metadata guard',
  status: 'historical',
  mutation: 'checkout() → discount metadata → previous fix → covered',
  historicalAncestor: 'N/A',
  dnaSimilarity: 87,
  stackTrace: [
    'TypeError: Cannot read properties of undefined',
    'at calculateRefund()',
    'at processRefund()',
    'at checkout()',
    'at orderComplete()',
  ],
};

const agentList: Agent[] = [
  {
    name: 'HISTORIAN',
    phase: 'COMPLETE',
    summary: 'Found 6 related incidents and 32 relevant commits.',
    findings: ['Matched BUG-184 in Git history', 'Found checkout refund lineage', 'Compared refund variants across branches'],
  },
  {
    name: 'CODE FORENSICS',
    phase: 'COMPLETE',
    summary: 'Found 4 related functions and an alternate subscription path.',
    findings: ['calculateRefund() is shared across flows', 'subscriptionRefund() bypasses checkout guard', 'Discount metadata is not revalidated downstream'],
  },
  {
    name: 'TEST DETECTIVE',
    phase: 'EVIDENCE FOUND',
    summary: 'Found 18 tests and 2 missing regression scenarios.',
    findings: ['Old tests covered checkout discount only', 'Subscription refund path remains untested', 'Regression gap is at discount metadata guard'],
  },
  {
    name: 'DOCUMENT ANALYST',
    phase: 'COMPLETE',
    summary: 'Found a documentation/code mismatch in the refund policy.',
    findings: ['Docs mention discount-aware refunds', 'Implementation assumes metadata exists', 'Policy language and code path diverge'],
  },
];

const evidence: Evidence[] = [
  {
    id: 'current-incident',
    type: 'CURRENT INCIDENT',
    title: 'Current incident: BUG-217',
    description: 'Refund fails after promotional discount.',
    detail: 'Discounted subscription refund reaches calculateRefund() without a guard for absent discount metadata.',
  },
  {
    id: 'historical-incident',
    type: 'HISTORICAL INCIDENT',
    title: 'Ancient match: BUG-184',
    description: 'Refund calculation crashes after checkout discount.',
    detail: 'Similar signature but different execution path: checkout vs subscription refund.',
  },
  {
    id: 'stack-trace',
    type: 'STACK TRACE',
    title: 'Stack trace pattern',
    description: 'TypeError in calculateRefund()',
    detail: 'Null propagation through discount metadata while processing a refund path.',
  },
  {
    id: 'git-commit',
    type: 'GIT COMMIT',
    title: 'Related commit a83f2',
    description: 'Fix applied to checkout discount guard.',
    detail: 'Commit a83f2 added metadata validation for standard checkout flows, but missed subscription entries.',
  },
  {
    id: 'previous-fix',
    type: 'PREVIOUS FIX',
    title: 'Past fix coverage',
    description: 'Checkout path guarded against discount metadata',
    detail: 'The patch handled standard checkout refund but never reached subscription refund mutation.',
  },
  {
    id: 'test',
    type: 'TEST',
    title: 'Regression test gap',
    description: 'Existing test coverage misses subscription discount refund',
    detail: 'The old suite validated checkout discount but not mobile or subscription flow coverage.',
  },
  {
    id: 'documentation',
    type: 'DOCUMENTATION',
    title: 'Policy mismatch',
    description: 'docs/refund-policy.md claims all discount returns are supported',
    detail: 'Implementation assumptions do not match documentation for subscription discounts without metadata.',
  },
];

const commits: Commit[] = [
  {
    hash: 'a83f2',
    message: 'Guard refund calculations against missing discount metadata',
    summary: 'Fixed standard checkout refund case with null-check around discount details.',
    author: 'S. Lee',
    timestamp: '2024-03-18',
  },
  {
    hash: '51c7d',
    message: 'Add subscription refund path to payment service',
    summary: 'Introduced new route for subscription refunds without discount metadata validation.',
    author: 'K. Patel',
    timestamp: '2024-06-12',
  },
  {
    hash: 'c02a9',
    message: 'Merge discount policy update',
    summary: 'Updated docs but left refund method behavior unchanged.',
    author: 'M. Thomas',
    timestamp: '2024-07-05',
  },
];

const tests: TestCase[] = [
  {
    id: 'refund-after-discount',
    name: 'refund_after_discount()',
    scenario: 'Discounted checkout refund',
    expectedBehavior: 'System calculates discounted refund without crashing.',
    risk: 'Low',
    code: `it('refund_after_discount', () => {
  const transaction = {
    customerId: 'cus_88',
    amount: 120,
    discount: { amount: 20 },
  };

  expect(calculateRefund(transaction)).toBe(100);
});`,
  },
  {
    id: 'refund-after-subscription-discount',
    name: 'refund_after_subscription_discount()',
    scenario: 'Subscription refund with discount metadata still present',
    expectedBehavior: 'Subscription refund path reuses discounted refund logic safely.',
    risk: 'Medium',
    code: `it('refund_after_subscription_discount', () => {
  const transaction = {
    customerId: 'cus_109',
    amount: 90,
    discount: { amount: 15 },
    subscriptionId: 'sub_7',
  };

  expect(calculateRefund(transaction)).toBe(75);
});`,
  },
  {
    id: 'refund-with-missing-discount-metadata',
    name: 'refund_with_missing_discount_metadata()',
    scenario: 'Refund without discount metadata',
    expectedBehavior: 'System falls back to base refund instead of throwing.',
    risk: 'High',
    code: `it('refund_with_missing_discount_metadata', () => {
  const transaction = {
    customerId: 'cus_127',
    amount: 80,
    subscriptionId: 'sub_12',
    discount: undefined,
  };

  expect(calculateRefund(transaction)).toBe(80);
});`,
  },
];

const impactMap = [
  { label: 'calculateDiscount()', critical: true, affected: true },
  { label: 'checkout()', critical: true, affected: true },
  { label: 'processPayment()', critical: true, affected: true },
  { label: 'calculateRefund()', critical: true, affected: true },
  { label: 'generateInvoice()', critical: false, affected: true },
  { label: 'subscriptionRefund()', critical: true, affected: true },
  { label: 'discount metadata', critical: true, affected: true },
  { label: 'refundPolicy', critical: false, affected: false },
];

export const payflowCase: CaseFile = {
  id: 'case-bug-217',
  project: 'PayFlow',
  bugId: 'BUG-217',
  title: 'BUG-217 — Refund fails after promotional discount',
  description: 'Trace the bug through historical incidents before patching the wrong path twice.',
  currentBug,
  historicalBug,
  agents: agentList,
  evidence,
  commits,
  testSuite: tests,
  findings: [
    {
      title: 'Mutation detected',
      description: 'Historical fix covered checkout path but not subscription refund path.',
      status: 'pass',
    },
    {
      title: 'Regression risk',
      description: 'Discount metadata guard is missing in alternate refund flow.',
      status: 'warning',
    },
    {
      title: 'Documentation mismatch',
      description: 'Policy documentation says discount refunds are supported across all flows.',
      status: 'info',
    },
  ],
  stages: [
    { id: 1, label: '01 REPORT', status: 'done' },
    { id: 2, label: '02 EXTRACT DNA', status: 'done' },
    { id: 3, label: '03 HUNT HISTORY', status: 'done' },
    { id: 4, label: '04 FIND MUTATION', status: 'active' },
    { id: 5, label: '05 GENERATE TESTS', status: 'upcoming' },
    { id: 6, label: '06 PROPOSE FIX', status: 'upcoming' },
    { id: 7, label: '07 VERIFY', status: 'upcoming' },
    { id: 8, label: '08 CASE CLOSED', status: 'upcoming' },
  ],
  impactMap,
  generatorSummary: {
    functionsAnalyzed: 14,
    relevantFunctions: 4,
    existingTests: 18,
    relevantTests: 7,
    missingRegressionScenarios: 2,
  },
  report: {
    mutationDetected: true,
    dnaSimilarity: 87,
    historicalAncestor: 'BUG-184',
    filesAnalyzed: 14,
    commitsAnalyzed: 32,
    relatedIssues: 6,
    testsAnalyzed: 18,
    regressionTestsGenerated: 3,
  },
};

export const caseStages = payflowCase.stages;
