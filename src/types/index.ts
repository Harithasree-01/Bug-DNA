export type AgentPhase = 'IDLE' | 'ANALYZING' | 'EVIDENCE FOUND' | 'COMPLETE';

export interface Bug {
  id: string;
  title: string;
  description: string;
  errorType: string;
  module: string;
  trigger: string;
  rootWeakness: string;
  stackTrace: string[];
  dnaSimilarity?: number;
  historicalAncestor?: string;
  status: 'active' | 'historical' | 'resolved';
  mutation: string;
}

export interface Commit {
  hash: string;
  message: string;
  summary: string;
  author: string;
  timestamp: string;
}

export interface TestCase {
  id: string;
  name: string;
  scenario: string;
  expectedBehavior: string;
  risk: string;
  code: string;
}

export interface Evidence {
  id: string;
  type: 'CURRENT INCIDENT' | 'HISTORICAL INCIDENT' | 'STACK TRACE' | 'GIT COMMIT' | 'PREVIOUS FIX' | 'TEST' | 'DOCUMENTATION';
  title: string;
  description: string;
  detail: string;
}

export interface Agent {
  name: string;
  phase: AgentPhase;
  summary: string;
  findings: string[];
}

export interface CodePathNode {
  label: string;
  critical: boolean;
  affected?: boolean;
}

export interface Finding {
  title: string;
  description: string;
  status: 'pass' | 'warning' | 'info';
}

export interface InvestigationStage {
  id: number;
  label: string;
  status: 'done' | 'active' | 'upcoming';
}

export interface CaseFile {
  id: string;
  project: string;
  bugId: string;
  title: string;
  description: string;
  currentBug: Bug;
  historicalBug: Bug;
  agents: Agent[];
  evidence: Evidence[];
  commits: Commit[];
  testSuite: TestCase[];
  findings: Finding[];
  stages: InvestigationStage[];
  impactMap: CodePathNode[];
  generatorSummary: {
    functionsAnalyzed: number;
    relevantFunctions: number;
    existingTests: number;
    relevantTests: number;
    missingRegressionScenarios: number;
  };
  report: {
    mutationDetected: boolean;
    dnaSimilarity: number;
    historicalAncestor: string;
    filesAnalyzed: number;
    commitsAnalyzed: number;
    relatedIssues: number;
    testsAnalyzed: number;
    regressionTestsGenerated: number;
  };
}
