"use client";
import React, { useState } from 'react';

const SCENARIOS = [
  { id: 'S1', label: 'Plan (Base Case)', cpm: '$18', ctr: '1.80%', cvr: '4.0%', cpl: '$25.00', mix: '20%', blended: '$22.25', likelihood: '—', quality: '100', status: 'base' },
  { id: 'S2', label: 'Best Case — All Levers', cpm: '$17', ctr: '2.00%', cvr: '5.0%', cpl: '$17.00', mix: '30%', blended: '$14.74', likelihood: 'Optimistic', quality: '112', status: 'best' },
  { id: 'S3', label: 'Marketing Outperforms', cpm: '$16', ctr: '2.20%', cvr: '4.0%', cpl: '$18.18', mix: '20%', blended: '$16.20', likelihood: 'Plausible', quality: '105', status: 'best' },
  { id: 'S4', label: 'Product Outperforms', cpm: '$20', ctr: '1.60%', cvr: '6.0%', cpl: '$20.83', mix: '20%', blended: '$18.56', likelihood: 'Plausible', quality: '108', status: 'best' },
  { id: 'S5', label: 'CTR Stalls (creative fatigue)', cpm: '$18', ctr: '1.60%', cvr: '4.0%', cpl: '$28.13', mix: '20%', blended: '$25.08', likelihood: 'Common risk', quality: '100', status: 'warn' },
  { id: 'S6', label: 'CVR Regresses', cpm: '$18', ctr: '1.80%', cvr: '3.0%', cpl: '$33.33', mix: '20%', blended: '$29.70', likelihood: 'Common risk', quality: '88', status: 'warn' },
  { id: 'S7', label: 'Auction Heat (CPM surge)', cpm: '$22', ctr: '1.80%', cvr: '4.0%', cpl: '$30.56', mix: '20%', blended: '$27.22', likelihood: 'Seasonal', quality: '100', status: 'warn' },
  { id: 'S8', label: 'Quality Deteriorates', cpm: '$18', ctr: '1.80%', cvr: '4.0%', cpl: '$25.00', mix: '20%', blended: '$22.25', likelihood: 'Lookalike risk', quality: '82', status: 'red' },
  { id: 'S9', label: 'All Levers Slow', cpm: '$20', ctr: '1.70%', cvr: '3.5%', cpl: '$33.61', mix: '10%', blended: '$30.25', likelihood: 'Collective risk', quality: '92', status: 'red' },
  { id: 'S10', label: 'Worst Case', cpm: '$22', ctr: '1.60%', cvr: '2.8%', cpl: '$49.11', mix: '0%', blended: '$49.11', likelihood: 'Low (baseline)', quality: '78', status: 'worst' },
];

const RISKS = [
  {
    id: 'R1', title: 'Landing Page CVR Regression', probability: 'Medium', severity: 'High',
    desc: 'Form changes, A/B test pollution, or page errors cause CVR to fall back toward baseline. Since CVR is the largest lever, a 1% drop adds ~$6 to CPL.',
    signals: ['CPL week-over-week rise ≥ 15%', 'Lead volume drops without budget change', 'Heatmap shows drop-off before form submit'],
    mitigations: ['Freeze production form; rollback test variants', 'Re-run session recordings for error detection', 'Hard kill rule: pause new variant if CVR < 3.0% for 72hrs'],
  },
  {
    id: 'R2', title: 'Creative Fatigue / CTR Stall', probability: 'High', severity: 'Medium',
    desc: 'Existing ad creatives lose performance as audiences see them repeatedly. CTR slips from 1.8% back toward 1.6%, offsetting marketing gains.',
    signals: ['CTR declining for 2 consecutive weeks', 'Frequency > 4.5 for primary audiences', 'Cost per click rising without CPM change'],
    mitigations: ['Rotate minimum 2 new creative concepts per month', 'Automate fatigue triggers: pause at frequency > 5', 'Keep 8% budget in test reserve for rapid creative launches'],
  },
  {
    id: 'R3', title: 'Lead Quality Degradation', probability: 'Medium', severity: 'Critical',
    desc: 'Quality falls when lookalike targeting broadens reach to lower-intent users. Guardrail quality index tracks this. A quality drop below 90 signals real deterioration.',
    signals: ['Lead-quality index < 90', '15%+ relative drop in lead-to-paid conversion', 'Show rate declining week-over-week'],
    mitigations: ['Pause responsible targeting lever immediately', 'Tighten Lookalike → switch to Retargeting or Interest', 'Escalate to weekly review — management authority required to restart'],
  },
  {
    id: 'R4', title: 'CPM Auction Surge (Competition)', probability: 'Medium', severity: 'Medium',
    desc: 'Back-to-school season (Aug–Sep) and Q4 holiday advertising elevates CPM by 20–35%, reversing CPM gains and adding $4–$7 to CPL.',
    signals: ['CPM rising with no targeting changes', 'Back-to-school season or Q4 calendar dates', 'Competitor spend visible via Meta Ads Library'],
    mitigations: ['Pre-plan creative refreshes for seasonal peaks', 'Shift budget to Google Search (less CPM-sensitive) during surges', 'Increase CVR target to compensate ($20.25 CPL at CPM $22 + CVR 4.5%)'],
  },
  {
    id: 'R5', title: 'Capacity Bottleneck (Sales / Teachers)', probability: 'Low-to-Medium', severity: 'High',
    desc: 'Doubling lead volume requires doubling booked trial capacity. If sales or teacher slots do not scale, quality leads go unbooked, raising effective CAC.',
    signals: ['Booking rate declining despite growing leads', 'Lead → trial lag time increasing', 'Sales team flagging unworked leads in CRM'],
    mitigations: ['Set 4-week advance warning: alert when leads/week exceeds current capacity × 1.8', 'Pre-hire 2 closers and 4 trial teachers before M3', 'Pause paid spend if booking rate < 50% for 2 consecutive weeks'],
  },
];

const CONTINGENCY = [
  { scenario: 'CTR stalls at 1.6%', action: 'Accelerate creative refresh; double new concept cadence; pause fatigued creatives' },
  { scenario: 'CVR < 3.0%', action: 'Freeze all LP variants; rollback to best-prior LP; run user session recordings within 48hrs' },
  { scenario: 'Quality index < 90', action: 'Pause responsible lever immediately; escalate; tighten targeting; do not restart without management sign-off' },
  { scenario: 'CPM surges +20%', action: 'Shift 20% budget to Google Search; run seasonal creative; negotiate creative deals; increase CVR target' },
  { scenario: 'Month 3 CPL > $38', action: 'Escalate to leadership; re-run baseline audit; kill lowest-ROI creative sets; request budget freeze review' },
  { scenario: 'Month 5 CPL > $30', action: 'Plan is off-track. Activate crisis review: pause audience expansion; focus entirely on CVR recovery' },
];

const STATUS_STYLES: Record<string, string> = {
  base: 'bg-blue-50 text-blue-700 border-blue-200',
  best: 'bg-green-50 text-green-700 border-green-200',
  warn: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  red: 'bg-orange-50 text-orange-700 border-orange-200',
  worst: 'bg-red-50 text-red-700 border-red-200',
};

export default function RisksAndScenariosPage() {
  const [activeTab, setActiveTab] = useState<'scenarios' | 'risks' | 'contingency'>('scenarios');
  const [expandedRisk, setExpandedRisk] = useState<string | null>(null);

  const tabs = [
    { id: 'scenarios', label: '10-Scenario Matrix' },
    { id: 'risks', label: 'Risk Register' },
    { id: 'contingency', label: 'Contingency Playbook' },
  ] as const;

  return (
    <main className="w-full bg-surface">
      <div className="flex flex-col w-full">
        <div className="px-margin-desktop py-space-xl flex flex-col gap-space-xl max-w-[1600px] mx-auto w-full">

          {/* Header */}
          <header className="flex flex-col gap-space-sm pb-space-lg border-b border-outline-variant/30">
            <div className="flex flex-wrap items-center gap-space-sm">
              <span className="font-mono-data-sm text-mono-data-sm uppercase tracking-wider text-primary font-semibold px-2 py-0.5 rounded bg-primary-fixed">Section 9 · Risk & Resilience</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-serif">Risks, Scenarios & Contingency</h1>
            <p className="font-body-md text-body-md text-tertiary max-w-3xl">
              This section stress-tests the plan across 10 levers-and-conditions scenarios, maintains a ranked risk register, and provides a contingency playbook so decisions never have to be improvised.
            </p>
            {/* Risk Score Banner */}
            <div className="flex flex-wrap gap-space-md pt-space-md">
              {[
                { label: 'Overall Plan Risk', value: 'MEDIUM', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
                { label: 'Highest Risk Lever', value: 'Landing CVR', color: 'bg-orange-100 text-orange-800 border-orange-300' },
                { label: 'Base Case CPL', value: '$25.00', color: 'bg-green-100 text-green-800 border-green-300' },
                { label: 'Worst-Case CPL', value: '$49.11', color: 'bg-red-100 text-red-800 border-red-300' },
                { label: 'Best-Case CPL', value: '$14.74', color: 'bg-blue-100 text-blue-800 border-blue-300' },
              ].map(b => (
                <div key={b.label} className={`px-space-md py-space-sm rounded border ${b.color} flex flex-col`}>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider opacity-70">{b.label}</span>
                  <span className="font-mono-data text-mono-data font-bold">{b.value}</span>
                </div>
              ))}
            </div>
          </header>

          {/* Tabs */}
          <div className="flex gap-1 border-b border-outline-variant/30">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`px-space-md py-space-sm font-label-md text-label-md font-semibold border-b-2 transition-colors -mb-px ${activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-tertiary hover:text-on-surface'
                  }`}>{tab.label}</button>
            ))}
          </div>

          {/* TAB: 10-Scenario Matrix */}
          {activeTab === 'scenarios' && (
            <div className="flex flex-col gap-space-lg">
              <div className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 overflow-hidden">
                <div className="px-space-lg py-space-md border-b border-outline-variant/20 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">table_chart</span>
                  <h2 className="font-headline-sm text-headline-sm font-serif text-on-surface">All 10 Scenarios — CPL Outcome Analysis</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-outline-variant/20 bg-surface-container-low">
                        {['ID', 'Scenario', 'CPM', 'CTR', 'CVR', 'Solo CPL', 'Exp Mix', 'Blended CPL', 'Likelihood', 'Quality Index'].map(h => (
                          <th key={h} className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {SCENARIOS.map((row, i) => (
                        <tr key={i} className={`border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors`}>
                          <td className="px-space-md py-space-sm font-mono-data-sm text-mono-data-sm text-tertiary font-semibold">{row.id}</td>
                          <td className="px-space-md py-space-sm font-body-md text-body-md text-on-surface font-medium whitespace-nowrap max-w-52">{row.label}</td>
                          <td className="px-space-md py-space-sm font-mono-data text-mono-data text-on-surface tabular-nums">{row.cpm}</td>
                          <td className="px-space-md py-space-sm font-mono-data text-mono-data text-on-surface tabular-nums">{row.ctr}</td>
                          <td className="px-space-md py-space-sm font-mono-data text-mono-data text-on-surface tabular-nums">{row.cvr}</td>
                          <td className="px-space-md py-space-sm font-mono-data text-mono-data tabular-nums font-semibold text-on-surface">{row.cpl}</td>
                          <td className="px-space-md py-space-sm font-mono-data text-mono-data text-tertiary tabular-nums">{row.mix}</td>
                          <td className={`px-space-md py-space-sm font-mono-data text-mono-data tabular-nums font-bold rounded`}>
                            <span className={`px-2 py-0.5 rounded border text-sm ${STATUS_STYLES[row.status]}`}>{row.blended}</span>
                          </td>
                          <td className="px-space-md py-space-sm font-body-sm text-body-sm text-tertiary">{row.likelihood}</td>
                          <td className={`px-space-md py-space-sm font-mono-data text-mono-data tabular-nums font-bold ${parseInt(row.quality) >= 100 ? 'text-green-700' : parseInt(row.quality) >= 90 ? 'text-yellow-700' : 'text-red-700'
                            }`}>{row.quality}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-space-lg py-space-sm bg-surface-container-low border-t border-outline-variant/20">
                  <p className="font-body-sm text-body-sm text-tertiary italic">Quality index: weighted composite of lead-to-booked, booked-to-attended, and attended-to-paid rates vs. baseline. Baseline = 100. Green ≥100, Amber 90–99, Red &lt;90.</p>
                </div>
              </div>

              {/* Range summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
                <div className="bg-green-50 border border-green-200 rounded-lg p-space-lg flex flex-col gap-2">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-green-700 font-semibold">Best Realistic Outcome</span>
                  <span className="font-stat-display text-green-800 font-serif tabular-nums" style={{ fontSize: '2.5rem', lineHeight: 1 }}>$14.74</span>
                  <span className="font-body-sm text-body-sm text-green-700">All levers outperform with 30% audience mix. IQI 112.</span>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-space-lg flex flex-col gap-2">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-blue-700 font-semibold">Committed Plan Target</span>
                  <span className="font-stat-display text-blue-800 font-serif tabular-nums" style={{ fontSize: '2.5rem', lineHeight: 1 }}>$25.00</span>
                  <span className="font-body-sm text-body-sm text-blue-700">Base case (S1). Blended to $22.25 with 20% expansion.</span>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-space-lg flex flex-col gap-2">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-red-700 font-semibold">Worst Case</span>
                  <span className="font-stat-display text-red-800 font-serif tabular-nums" style={{ fontSize: '2.5rem', lineHeight: 1 }}>$49.11</span>
                  <span className="font-body-sm text-body-sm text-red-700">No traction on any lever — essentially the status quo. IQI 78 triggers full pause.</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB: Risk Register */}
          {activeTab === 'risks' && (
            <div className="flex flex-col gap-space-md">
              {RISKS.map(risk => (
                <div key={risk.id} className="bg-surface-container-lowest rounded-lg border border-outline-variant/30 shadow-sm overflow-hidden">
                  <button
                    className="w-full px-space-lg py-space-md flex items-center justify-between gap-space-md hover:bg-surface-container-low transition-colors text-left"
                    onClick={() => setExpandedRisk(expandedRisk === risk.id ? null : risk.id)}
                  >
                    <div className="flex items-center gap-space-md">
                      <span className="font-mono-data-sm text-mono-data-sm text-primary bg-primary-fixed px-2 py-0.5 rounded font-bold">{risk.id}</span>
                      <span className="font-headline-sm text-headline-sm font-serif text-on-surface">{risk.title}</span>
                    </div>
                    <div className="flex items-center gap-space-sm shrink-0">
                      <span className={`px-2 py-0.5 rounded border font-label-sm text-label-sm font-semibold ${risk.severity === 'Critical' ? 'bg-red-100 text-red-700 border-red-200' :
                          risk.severity === 'High' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                            'bg-yellow-100 text-yellow-700 border-yellow-200'
                        }`}>{risk.severity}</span>
                      <span className={`px-2 py-0.5 rounded border font-label-sm text-label-sm font-semibold ${risk.probability === 'High' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-surface-container-high text-tertiary border-outline-variant/30'
                        }`}>{risk.probability}</span>
                      <span className="material-symbols-outlined text-tertiary text-[20px]">{expandedRisk === risk.id ? 'expand_less' : 'expand_more'}</span>
                    </div>
                  </button>
                  {expandedRisk === risk.id && (
                    <div className="px-space-lg pb-space-lg pt-space-md border-t border-outline-variant/20 flex flex-col gap-space-md">
                      <p className="font-body-md text-body-md text-tertiary">{risk.desc}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                        <div>
                          <p className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary font-semibold mb-2">Early Warning Signals</p>
                          <ul className="flex flex-col gap-1">
                            {risk.signals.map((s, i) => (
                              <li key={i} className="flex items-start gap-2 font-body-sm text-body-sm text-on-surface">
                                <span className="w-1.5 h-1.5 rounded-full bg-tertiary shrink-0 mt-1.5"></span>{s}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary font-semibold mb-2">Mitigations & Kill Rules</p>
                          <ul className="flex flex-col gap-1">
                            {risk.mitigations.map((m, i) => (
                              <li key={i} className="flex items-start gap-2 font-body-sm text-body-sm text-on-surface">
                                <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0 mt-1.5"></span>{m}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* TAB: Contingency Playbook */}
          {activeTab === 'contingency' && (
            <div className="flex flex-col gap-space-lg">
              <div className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 overflow-hidden">
                <div className="px-space-lg py-space-md border-b border-outline-variant/20 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">rule</span>
                  <h2 className="font-headline-sm text-headline-sm font-serif text-on-surface">Contingency Playbook — Pre-Decided Actions</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-outline-variant/20 bg-surface-container-low">
                        <th className="px-space-lg py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">If This Happens</th>
                        <th className="px-space-lg py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Do This</th>
                      </tr>
                    </thead>
                    <tbody>
                      {CONTINGENCY.map((row, i) => (
                        <tr key={i} className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors">
                          <td className="px-space-lg py-space-md font-mono-data text-mono-data text-primary font-semibold">{row.scenario}</td>
                          <td className="px-space-lg py-space-md font-body-md text-body-md text-on-surface">{row.action}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-space-lg py-space-sm bg-surface-container-low border-t border-outline-variant/20">
                  <p className="font-body-sm text-body-sm text-tertiary italic">
                    The value of a contingency playbook is that decisions are made before the crisis, when there is time to reason clearly. The playbook must be reviewed monthly and every decision should be logged with date, trigger and outcome.
                  </p>
                </div>
              </div>

              {/* Weekly Rhythm */}
              <div className="bg-surface-container-lowest rounded-lg p-space-xl border border-outline-variant/30 shadow-sm">
                <h2 className="font-headline-sm text-headline-sm font-serif text-on-surface mb-space-md flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-tertiary">schedule</span>
                  Weekly Review Rhythm (Section 11.6)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  <div>
                    <p className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary font-semibold mb-2">Every Monday Morning</p>
                    <ul className="flex flex-col gap-1.5">
                      {['Pull CPL, CTR, CVR, quality index from live data', 'Compare to glide path targets for current month', 'Flag any trigger from the contingency table', 'Circulate to all three engine owners before 10am'].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 font-body-sm text-body-sm text-on-surface">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0 mt-1.5"></span>{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary font-semibold mb-2">Scale vs Kill Decision Rules</p>
                    <ul className="flex flex-col gap-1.5">
                      {[
                        'Scale: CPL ≤ target AND quality index ≥100 for 2 consecutive weeks',
                        'Hold: CPL within 10% of target OR quality index 90–99',
                        'Kill single lever: CPL 15%+ above target OR quality index dropping week-over-week',
                        'Escalate: CPL > 20% above target for 2+ weeks',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 font-body-sm text-body-sm text-on-surface">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5"></span>{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
