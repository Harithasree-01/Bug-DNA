import { useMemo, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Binary,
  CheckCircle2,
  ChevronRight,
  Database,
  GitBranch,
  Microscope,
  ShieldCheck,
  Sparkles,
  TestTube,
  TriangleAlert,
} from 'lucide-react';
import { payflowCase } from './data/payflow';

const demoViews = ['home', 'investigation', 'mutation', 'tests', 'fix', 'verify', 'closed'] as const;
type DemoView = (typeof demoViews)[number];

const getStageIndex = (view: DemoView) => demoViews.indexOf(view);

function App() {
  const [activeView, setActiveView] = useState<DemoView>('home');
  const [selectedEvidenceId, setSelectedEvidenceId] = useState('current-incident');
  const [copied, setCopied] = useState(false);
  const [verificationComplete, setVerificationComplete] = useState(false);

  const caseFile = payflowCase;

  const selectedEvidence = useMemo(
    () => caseFile.evidence.find((item) => item.id === selectedEvidenceId) ?? caseFile.evidence[0],
    [selectedEvidenceId, caseFile.evidence],
  );

  const openInvestigation = () => {
    setActiveView('investigation');
  };

  const showMutation = () => {
    setActiveView('mutation');
  };

  const showTests = () => {
    setActiveView('tests');
  };

  const showFix = () => {
    setActiveView('fix');
  };

  const showVerify = () => {
    setActiveView('verify');
  };

  const showClosed = () => {
    setActiveView('closed');
  };

  const copyTest = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1300);
    } catch (error) {
      console.error('Copy failed', error);
    }
  };

  const renderHome = () => (
    <div className="space-y-8">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-lab-900/80 p-8 shadow-glass backdrop-blur-xl">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.34em] text-trace/80">
            <Sparkles className="h-4 w-4" />
            forensic debugging suite
          </div>
          <h1 className="mt-6 font-display text-5xl text-white md:text-7xl">BUG DNA</h1>
          <p className="mt-4 max-w-xl text-xl text-lab-200">Every bug leaves a genetic trace.</p>
          <p className="mt-6 max-w-xl text-base leading-7 text-lab-300">
            Trace today&apos;s bug through your codebase, Git history, previous fixes, and tests — before
            you fix the wrong thing twice.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={openInvestigation}
              className="rounded-full border border-trace/60 bg-trace/10 px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-trace shadow-glow transition hover:bg-trace/20"
            >
              Start investigation
            </button>
            <button
              onClick={openInvestigation}
              className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-lab-100 transition hover:border-white/20 hover:bg-white/10"
            >
              Load demo case
            </button>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-[10px] uppercase tracking-[0.28em] text-lab-400">Traditional debugging</div>
              <p className="mt-2 text-lg text-white">&ldquo;How do I fix this?&rdquo;</p>
            </div>
            <div className="rounded-2xl border border-trace/30 bg-trace/10 p-4">
              <div className="text-[10px] uppercase tracking-[0.28em] text-trace">BUG DNA</div>
              <p className="mt-2 text-lg text-white">&ldquo;Where have we seen this bug&apos;s DNA before?&rdquo;</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-lab-900/80 p-6 shadow-glass backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-lab-400">Current incident</div>
              <div className="mt-2 text-xl font-semibold text-white">BUG-217</div>
            </div>
            <div className="rounded-full border border-trace/50 bg-trace/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-trace">
              TypeError
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_center,_rgba(57,224,192,0.18),_transparent_60%)] p-4">
            <div className="absolute inset-0 bg-grid-fine bg-[length:18px_18px] opacity-40" />
            <div className="relative space-y-5">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.32em] text-lab-300">
                <span>calculateRefund()</span>
                <span>BUG-184</span>
              </div>
              <DnaStrand
                leftLabel="TypeError"
                centerLabel="calculateRefund()"
                rightLabel="BUG-184"
                accent="trace"
              />
              <div className="mt-2 h-px bg-gradient-to-r from-transparent via-trace/50 to-transparent" />
              <div className="flex justify-between text-[10px] uppercase tracking-[0.3em] text-lab-300">
                <span>subscriptionRefund()</span>
                <span>null</span>
              </div>
              <DnaStrand
                leftLabel="subscriptionRefund()"
                centerLabel="null"
                rightLabel="BUG-217"
                accent="signal.rose"
              />
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-signal-amber/20 bg-signal-amber/10 p-4 text-sm text-lab-100">
            <div className="mb-2 flex items-center gap-2 text-signal-amber">
              <Binary className="h-4 w-4" />
              Signal match
            </div>
            <div>87% DNA Similarity based on matched error family, code path, null-value propagation, and transaction condition.</div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderInvestigation = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.34em] text-lab-400">Investigation room</div>
          <h2 className="mt-2 font-display text-4xl text-white">PayFlow / BUG-217</h2>
        </div>
        <div className="rounded-full border border-trace/30 bg-trace/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-trace">
          87% forensic confidence
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-4">
        {caseFile.agents.map((agent) => (
          <div key={agent.name} className="rounded-2xl border border-white/10 bg-lab-900/80 p-5 shadow-glass">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.28em] text-lab-300">{agent.name}</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[9px] uppercase tracking-[0.18em] text-lab-200">
                {agent.phase}
              </span>
            </div>
            <div className="mt-4 text-sm text-lab-200">{agent.summary}</div>
            <ul className="mt-4 space-y-2 text-sm text-lab-300">
              {agent.findings.map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-trace" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-white/10 bg-lab-900/80 p-6 shadow-glass">
          <div className="flex items-center justify-between">
            <div className="text-xs uppercase tracking-[0.3em] text-lab-400">Genome match</div>
            <button onClick={showMutation} className="inline-flex items-center gap-2 rounded-full border border-trace/40 bg-trace/10 px-3 py-2 text-[10px] uppercase tracking-[0.28em] text-trace hover:bg-trace/20">
              Find mutation <ChevronRight className="h-3 w-3" />
            </button>
          </div>
          <div className="mt-6 space-y-5">
            <DnaMatchRow label="BUG-184" value="checkout()" details="discount metadata" />
            <DnaMatchRow label="previous fix" value="covered" details="guard installed" />
            <DnaMatchRow label="BUG-217" value="subscriptionRefund()" details="same weakness" />
            <DnaMatchRow label="current state" value="NOT covered" details="missing regression path" />
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-lab-900/80 p-6 shadow-glass">
          <div className="text-xs uppercase tracking-[0.3em] text-lab-400">Evidence board</div>
          <div className="mt-4 space-y-3">
            {caseFile.evidence.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedEvidenceId(item.id)}
                className={`w-full rounded-2xl border p-3 text-left transition ${
                  selectedEvidenceId === item.id
                    ? 'border-trace/50 bg-trace/10 text-white'
                    : 'border-white/10 bg-black/20 text-lab-200 hover:border-white/20'
                }`}
              >
                <div className="text-[10px] uppercase tracking-[0.22em] text-lab-400">{item.type}</div>
                <div className="mt-2 font-medium">{item.title}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="rounded-3xl border border-white/10 bg-lab-900/80 p-6 shadow-glass">
        <div className="text-xs uppercase tracking-[0.3em] text-lab-400">Selected evidence</div>
        <div className="mt-4 flex items-start gap-4">
          <div className="rounded-xl border border-trace/35 bg-trace/10 p-3 text-trace">
            <Database className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xl font-medium text-white">{selectedEvidence.title}</div>
            <div className="mt-2 text-lab-300">{selectedEvidence.description}</div>
            <div className="mt-3 rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-lab-200">
              {selectedEvidence.detail}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMutation = () => (
    <div className="space-y-8">
      <div className="rounded-3xl border border-trace/40 bg-trace/10 p-6 shadow-glow">
        <div className="text-xs uppercase tracking-[0.34em] text-trace">Mutation detection</div>
        <h2 className="mt-3 font-display text-4xl text-white">Same bug family. Different execution path.</h2>
        <p className="mt-4 max-w-3xl text-lab-200">
          The historical fix is valid for the checkout path, but the subscription refund path re-enters the same
          discount guard without the equivalent coverage.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-lab-900/80 p-6 shadow-glass">
          <div className="text-xs uppercase tracking-[0.3em] text-lab-400">BUG-184</div>
          <div className="mt-5 space-y-4 text-lab-200">
            <div className="flex items-center gap-3"><span className="text-trace">checkout()</span><ArrowRight className="h-4 w-4 text-lab-400" /><span>discount metadata</span></div>
            <div className="flex items-center gap-3"><span>previous fix</span><ArrowRight className="h-4 w-4 text-lab-400" /><span>covered</span></div>
          </div>
        </div>

        <div className="rounded-3xl border border-rose-400/30 bg-rose-500/10 p-6 shadow-glass">
          <div className="text-xs uppercase tracking-[0.3em] text-rose-200">BUG-217</div>
          <div className="mt-5 space-y-4 text-lab-100">
            <div className="flex items-center gap-3"><span className="text-rose-200">subscriptionRefund()</span><ArrowRight className="h-4 w-4 text-lab-400" /><span>discount metadata</span></div>
            <div className="flex items-center gap-3"><span>same weakness</span><ArrowRight className="h-4 w-4 text-lab-400" /><span>NOT covered</span></div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-lab-900/80 p-6 shadow-glass">
        <div className="flex items-start gap-4">
          <div className="rounded-xl border border-rose-400/40 bg-rose-500/10 p-3 text-rose-200">
            <TriangleAlert className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-lab-400">Mutation summary</div>
            <h3 className="mt-2 text-3xl font-semibold text-white">MUTATION DETECTED</h3>
            <p className="mt-4 text-lab-200">
              The historical fix does not fully cover the current incident. The same bug family persisted under a different execution path.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTests = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-lab-400">Regression test generator</div>
          <h2 className="mt-2 font-display text-4xl text-white">Missing coverage exposed</h2>
        </div>
        <div className="rounded-full border border-signal-amber/40 bg-signal-amber/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-signal-amber">
          2 missing scenarios
        </div>
      </div>

      <div className="space-y-5">
        {caseFile.testSuite.map((test) => (
          <div key={test.id} className="rounded-3xl border border-white/10 bg-lab-900/80 p-5 shadow-glass">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-lab-400">{test.name}</div>
                <div className="mt-2 text-xl font-medium text-white">{test.scenario}</div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => copyTest(test.code)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-lab-100 hover:border-white/20"
                >
                  {copied ? 'Copied' : 'Copy test'}
                </button>
                <button
                  onClick={showFix}
                  className="rounded-full border border-trace/40 bg-trace/10 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-trace hover:bg-trace/20"
                >
                  View test
                </button>
              </div>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                <div className="text-[10px] uppercase tracking-[0.22em] text-lab-400">Expected behavior</div>
                <div className="mt-2 text-lab-200">{test.expectedBehavior}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                <div className="text-[10px] uppercase tracking-[0.22em] text-lab-400">Risk</div>
                <div className="mt-2 text-lab-200">{test.risk}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                <div className="text-[10px] uppercase tracking-[0.22em] text-lab-400">Status</div>
                <div className="mt-2 text-lab-200">Generated</div>
              </div>
            </div>

            <pre className="mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-lab-100">
              <code>{test.code}</code>
            </pre>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFix = () => (
    <div className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-lab-900/80 p-6 shadow-glass">
        <div className="text-xs uppercase tracking-[0.3em] text-lab-400">Root cause</div>
        <h2 className="mt-2 font-display text-4xl text-white">calculateRefund() assumes discount metadata always exists.</h2>
        <p className="mt-4 text-lab-200">
          The historical fix handled the standard checkout path, but subscription refunds can reach the same function without the guard.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
          <div className="text-xs uppercase tracking-[0.28em] text-lab-400">Old</div>
          <pre className="mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-[#0a0f14] p-4 text-sm text-lab-200">
            <code>{`const discount = transaction.discount;
return discount.amount;`}</code>
          </pre>
        </div>
        <div className="rounded-3xl border border-trace/50 bg-trace/10 p-5">
          <div className="text-xs uppercase tracking-[0.28em] text-trace">Proposed</div>
          <pre className="mt-4 overflow-x-auto rounded-2xl border border-trace/30 bg-[#08110f] p-4 text-sm text-white">
            <code>{`const discount = transaction.discount;

if (!discount) {
  return calculateBaseRefund(transaction);
}

return calculateDiscountedRefund(transaction, discount);`}</code>
          </pre>
        </div>
      </div>
    </div>
  );

  const renderVerify = () => (
    <div className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-lab-900/80 p-6 shadow-glass">
        <div className="text-xs uppercase tracking-[0.3em] text-lab-400">Final code review</div>
        <h2 className="mt-2 font-display text-4xl text-white">Verification checklist</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            'Root cause addressed',
            'Historical failure mode considered',
            'Regression tests generated',
            'Alternate code path covered',
            'One edge case requires review',
          ].map((item, index) => (
            <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-3 text-lab-100">
              <div className={index === 4 ? 'text-signal-amber' : 'text-trace'}>
                {index === 4 ? <TriangleAlert className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
              </div>
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex gap-4">
          {!verificationComplete ? (
            <button
              onClick={() => {
                setVerificationComplete(true);
                setActiveView('closed');
              }}
              className="rounded-full border border-trace/40 bg-trace/10 px-5 py-3 text-sm uppercase tracking-[0.22em] text-trace hover:bg-trace/20"
            >
              Run final verification
            </button>
          ) : (
            <div className="rounded-full border border-trace/40 bg-trace/10 px-5 py-3 text-sm uppercase tracking-[0.22em] text-trace">
              Verification complete
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderClosed = () => (
    <div className="space-y-8">
      <div className="rounded-3xl border border-trace/40 bg-trace/10 p-8 shadow-glow">
        <div className="text-xs uppercase tracking-[0.34em] text-trace">Case closed</div>
        <h2 className="mt-3 font-display text-5xl text-white">CASE #BUG-217</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Status" value="Resolved" />
          <StatCard label="DNA similarity" value="87%" />
          <StatCard label="Historical ancestor" value="BUG-184" />
          <StatCard label="Mutation detected" value="YES" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Files analyzed" value="14" />
        <StatCard label="Commits analyzed" value="32" />
        <StatCard label="Related issues" value="6" />
        <StatCard label="Regression tests generated" value="3" />
      </div>

      <div className="rounded-3xl border border-white/10 bg-lab-900/80 p-6 shadow-glass">
        <div className="text-xs uppercase tracking-[0.3em] text-lab-400">Investigation brief</div>
        <div className="mt-4 space-y-3 text-lab-200">
          <p>Bug family: seasonal refund mutation following promotional discount logic.</p>
          <p>Root cause: calculateRefund() accessed transaction.discount.amount without guarding for missing metadata.</p>
          <p>Historical pattern: checkout flow had a previous fix, but the subscription path bypassed it.</p>
        </div>
      </div>
    </div>
  );

  const mainContent = {
    home: renderHome(),
    investigation: renderInvestigation(),
    mutation: renderMutation(),
    tests: renderTests(),
    fix: renderFix(),
    verify: renderVerify(),
    closed: renderClosed(),
  }[activeView];

  return (
    <div className="min-h-screen bg-lab-950 text-lab-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(57,224,192,0.15),_transparent_35%)]" />
      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-8 md:px-8">
        <header className="mb-8 rounded-3xl border border-white/10 bg-lab-900/70 p-4 shadow-glass backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-trace/40 bg-trace/10 text-trace shadow-glow">
                <Microscope className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display text-2xl text-white">BUG DNA</div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-lab-400">forensic lab</div>
              </div>
            </div>

            <nav className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.26em] text-lab-300">
              {demoViews.map((view) => {
                const active = activeView === view;
                return (
                  <button
                    key={view}
                    onClick={() => setActiveView(view)}
                    className={`rounded-full border px-3 py-2 transition ${
                      active
                        ? 'border-trace/40 bg-trace/10 text-trace'
                        : 'border-white/10 bg-black/20 text-lab-300 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {view}
                  </button>
                );
              })}
            </nav>
          </div>
        </header>

        <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-7">
          {caseFile.stages.map((stage) => (
            <div
              key={stage.id}
              className={`rounded-2xl border p-3 text-left ${
                stage.status === 'done'
                  ? 'border-trace/40 bg-trace/10 text-trace'
                  : stage.status === 'active'
                    ? 'border-signal-amber/40 bg-signal-amber/10 text-signal-amber'
                    : 'border-white/10 bg-black/20 text-lab-400'
              }`}
            >
              <div className="text-[9px] uppercase tracking-[0.24em]">{stage.label}</div>
            </div>
          ))}
        </div>

        {mainContent}

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <ActionCard title="Trace code" icon={<GitBranch className="h-4 w-4" />} onClick={() => setActiveView('investigation')} />
          <ActionCard title="Generate tests" icon={<TestTube className="h-4 w-4" />} onClick={showTests} />
          <ActionCard title="Propose fix" icon={<ShieldCheck className="h-4 w-4" />} onClick={showFix} />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-lab-900/80 p-5 shadow-glass">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-lab-400">Achievement badges</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {['FIRST TRACE', 'ANCESTOR FOUND', 'MUTATION DETECTED', 'REGRESSION SHIELD', 'CASE CLOSED'].map((badge) => (
                <span key={badge} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[9px] uppercase tracking-[0.22em] text-lab-200">
                  {badge}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-full border border-trace/40 bg-trace/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-trace">
            <BadgeCheck className="h-4 w-4" />
            Analysis confidence 87%
          </div>
        </div>
      </div>
    </div>
  );
}

function DnaStrand({
  leftLabel,
  centerLabel,
  rightLabel,
  accent,
}: {
  leftLabel: string;
  centerLabel: string;
  rightLabel: string;
  accent: 'trace' | 'signal.rose';
}) {
  const colorClass = accent === 'trace' ? 'text-trace border-trace/40' : 'text-rose-200 border-rose-400/40';

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center text-[10px] uppercase tracking-[0.28em] text-lab-300">
      <div className={`rounded-full border bg-black/20 px-3 py-2 ${colorClass}`}>{leftLabel}</div>
      <div className="relative h-8 w-16">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-full w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`h-6 w-6 rounded-full border ${colorClass}`} />
        </div>
      </div>
      <div className={`rounded-full border bg-black/20 px-3 py-2 ${colorClass}`}>{rightLabel}</div>
    </div>
  );
}

function DnaMatchRow({ label, value, details }: { label: string; value: string; details: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs uppercase tracking-[0.2em] text-lab-400">
        <span>{label}</span>
        <span className="text-trace">{value}</span>
      </div>
      <div className="mt-2 text-lab-200">{details}</div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="text-[10px] uppercase tracking-[0.28em] text-lab-400">{label}</div>
      <div className="mt-3 text-2xl font-semibold text-white">{value}</div>
    </div>
  );
}

function ActionCard({
  title,
  icon,
  onClick,
}: {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between rounded-2xl border border-white/10 bg-lab-900/80 p-4 text-left text-lab-100 transition hover:border-white/20 hover:bg-lab-800"
    >
      <span className="flex items-center gap-3">
        <span className="rounded-xl border border-trace/30 bg-trace/10 p-2 text-trace">{icon}</span>
        <span className="text-sm uppercase tracking-[0.2em]">{title}</span>
      </span>
      <ChevronRight className="h-4 w-4 text-lab-400" />
    </button>
  );
}

export default App;
