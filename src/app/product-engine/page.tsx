"use client";
import React, { useState } from 'react';
import { useKpiStore } from "@/store/useKpiStore";

const ICE_EXPERIMENTS = [
  { id: 'T1', name: 'Remove Parent + Child form from LP; use 2-step lead gen', phase: 'M1', category: 'Landing Page', impact: 9, confidence: 8, ease: 9, ice: 728, status: 'Priority' },
  { id: 'T2', name: 'Add social proof (n=10 verified stories) above form', phase: 'M1', category: 'Landing Page', impact: 7, confidence: 9, ease: 8, ice: 504, status: 'Priority' },
  { id: 'T3', name: 'Test "45-second booking" speed headline vs current', phase: 'M1', category: 'Landing Page', impact: 7, confidence: 7, ease: 9, ice: 441, status: 'Priority' },
  { id: 'T4', name: 'Remove redirect; use embedded calendar booking', phase: 'M2', category: 'Booking Flow', impact: 8, confidence: 9, ease: 7, ice: 504, status: 'Queue' },
  { id: 'T5', name: 'WhatsApp OTP confirm (reduces no-show by ~12%)', phase: 'M2', category: 'Booking Flow', impact: 7, confidence: 8, ease: 7, ice: 392, status: 'Queue' },
  { id: 'T6', name: 'Test grade-specific landing pages (Grade 3–5 / 6–8)', phase: 'M2', category: 'Personalization', impact: 8, confidence: 6, ease: 6, ice: 288, status: 'Queue' },
  { id: 'T7', name: 'Exit-intent modal: "Book in 60 sec" offer', phase: 'M3', category: 'Retention', impact: 6, confidence: 7, ease: 8, ice: 336, status: 'Pipeline' },
  { id: 'T8', name: 'A/B test 30s video vs static image above form fold', phase: 'M3', category: 'Creative', impact: 7, confidence: 6, ease: 7, ice: 294, status: 'Pipeline' },
  { id: 'T9', name: 'Add Learning Roadmap preview PDF to lead magnet', phase: 'M3', category: 'Lead Nurture', impact: 6, confidence: 6, ease: 7, ice: 252, status: 'Pipeline' },
  { id: 'T10', name: 'Retargeting carousel for cart-abandoned sessions', phase: 'M4', category: 'Retargeting', impact: 7, confidence: 7, ease: 5, ice: 245, status: 'Later' },
  { id: 'T11', name: 'Bilingual Spanish LP for Hispanic segment', phase: 'M5', category: 'Localization', impact: 8, confidence: 5, ease: 5, ice: 200, status: 'Later' },
  { id: 'T12', name: 'Referral loop: parent shares trial → $10 Amazon credit', phase: 'M6', category: 'Referral', impact: 7, confidence: 4, ease: 6, ice: 168, status: 'Later' },
];

const CVR_BRIDGE = [
  { step: 'Current Baseline', cvr: '2.5%', cpl: '$50.00', driver: 'Long form + redirect to Calendly', change: '—' },
  { step: 'T1: 2-Step Form', cvr: '3.0%', cpl: '$41.67', driver: 'Lower friction on first touch', change: '+0.5%' },
  { step: 'T2: Social Proof', cvr: '3.3%', cpl: '$37.88', driver: 'Trust signals above fold', change: '+0.3%' },
  { step: 'T4: Embedded Calendar', cvr: '3.6%', cpl: '$34.72', driver: 'No redirect drop-off', change: '+0.3%' },
  { step: 'T5: WhatsApp OTP', cvr: '3.8%', cpl: '$32.89', driver: 'Higher intent confirmation', change: '+0.2%' },
  { step: 'T3: Speed Headline', cvr: '4.0%', cpl: '$25.00', driver: 'Message-match to ad creative', change: '+0.2%' },
  { step: 'M6 Benchmark Stretch', cvr: '5.7%', cpl: '$17.54', driver: 'Education benchmark median', change: '+1.7%' },
];

const FUNNEL = [
  { stage: 'Ad Impression', baseline: '500,000', plan: '555,556', delta: '+11%', owner: 'Marketing' },
  { stage: 'Ad Click', baseline: '8,000', plan: '10,000', delta: '+25%', owner: 'Marketing + Creative' },
  { stage: 'Landing Page Visit', baseline: '7,200', plan: '9,500', delta: '+32%', owner: 'Product' },
  { stage: 'Lead (Trial Request)', baseline: '200', plan: '400', delta: '+100%', owner: 'Product' },
  { stage: 'Booked Demo', baseline: '120', plan: '240', delta: '+100%', owner: 'Product + Sales' },
  { stage: 'Attended Demo', baseline: '78', plan: '156', delta: '+100%', owner: 'Sales' },
  { stage: 'Paid Student', baseline: '14', plan: '28', delta: '+100%', owner: 'Sales + CS' },
  { stage: 'Blended CPL', baseline: '$50.00', plan: '$25.00', delta: '-50%', owner: '—' },
  { stage: 'Media CAC', baseline: '$714', plan: '$357', delta: '-50%', owner: '—' },
];

const STATUS_COLOR: Record<string, string> = {
  Priority: 'bg-green-100 text-green-700 border-green-200',
  Queue: 'bg-blue-100 text-blue-700 border-blue-200',
  Pipeline: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  Later: 'bg-surface-container-high text-tertiary border-outline-variant',
};

export default function ProductEnginePage() {
  const { conversionRate, adSpend } = useKpiStore();
  const [activeTab, setActiveTab] = useState<'funnel' | 'cvr' | 'experiments'>('funnel');
  const [filterPhase, setFilterPhase] = useState<string>('All');

  const filteredExps = filterPhase === 'All' ? ICE_EXPERIMENTS : ICE_EXPERIMENTS.filter(e => e.phase === filterPhase);

  const tabs = [
    { id: 'funnel', label: 'Full Funnel Waterfall' },
    { id: 'cvr', label: 'CVR Bridge' },
    { id: 'experiments', label: 'Experiment Backlog (ICE)' },
  ] as const;

  return (
    <main className="w-full bg-surface">
      <div className="flex flex-col w-full">
        <div className="px-margin-desktop py-space-xl flex flex-col gap-space-xl max-w-[1600px] mx-auto w-full">

          {/* Header */}
          <header className="flex flex-col gap-space-sm pb-space-lg border-b border-outline-variant/30">
            <div className="flex flex-wrap items-center gap-space-sm">
              <span className="font-mono-data-sm text-mono-data-sm uppercase tracking-wider text-primary font-semibold px-2 py-0.5 rounded bg-primary-fixed">Engine 02 · Product Engine</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-serif">The Product Engine — CVR from 2.5% to 4.0%</h1>
            <p className="font-body-md text-body-md text-tertiary max-w-3xl">
              Landing CVR is the largest single lever in the CPL formula, contributing $15 of the $25 reduction. It is also the most controllable: every experiment is within BrightChamps' own domain, independent of ad-auction dynamics.
            </p>
            {/* KPI Strip */}
            <div className="flex flex-wrap gap-space-md pt-space-md">
              {[
                { label: 'Baseline CVR', value: '2.5%', note: 'Current measured', color: 'text-on-surface' },
                { label: 'Commit Target CVR', value: '4.0%', note: 'M5 commit', color: 'text-primary' },
                { label: 'Education Benchmark', value: '5.7%', note: '2025 median', color: 'text-secondary' },
                { label: 'CPL Impact', value: '$15 / lead', note: 'CVR lever alone', color: 'text-primary' },
                { label: 'Experiments Planned', value: '12', note: 'ICE-ranked T1–T12', color: 'text-on-surface' },
                { label: 'Current CVR (Store)', value: `${conversionRate.toFixed(1)}%`, note: 'Live setting', color: 'text-secondary' },
              ].map(kpi => (
                <div key={kpi.label} className="bg-surface-container-lowest rounded-lg px-space-md py-space-sm border border-outline-variant/30 flex flex-col">
                  <span className="font-label-sm text-label-sm uppercase text-tertiary tracking-wider">{kpi.label}</span>
                  <span className={`font-mono-data text-mono-data font-bold tabular-nums ${kpi.color}`}>{kpi.value}</span>
                  <span className="font-mono-data-sm text-mono-data-sm text-tertiary">{kpi.note}</span>
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

          {/* TAB: Funnel Waterfall */}
          {activeTab === 'funnel' && (
            <div className="flex flex-col gap-space-lg">
              <div className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 overflow-hidden">
                <div className="px-space-lg py-space-md border-b border-outline-variant/20 flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[18px]">waterfall_chart</span>
                  <h2 className="font-headline-sm text-headline-sm font-serif text-on-surface">Full Funnel: Baseline vs Plan (per $10,000 spend)</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-outline-variant/20 bg-surface-container-low">
                        <th className="px-space-lg py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Funnel Stage</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Baseline</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Plan</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Delta</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Owner</th>
                      </tr>
                    </thead>
                    <tbody>
                      {FUNNEL.map((row, i) => (
                        <tr key={i} className={`border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors ${i >= 7 ? 'bg-surface-container-low font-semibold' : ''}`}>
                          <td className="px-space-lg py-space-sm font-body-md text-body-md text-on-surface">{row.stage}</td>
                          <td className="px-space-md py-space-sm font-mono-data text-mono-data text-tertiary tabular-nums">{row.baseline}</td>
                          <td className="px-space-md py-space-sm font-mono-data text-mono-data text-secondary font-semibold tabular-nums">{row.plan}</td>
                          <td className={`px-space-md py-space-sm font-mono-data text-mono-data font-bold tabular-nums ${row.delta.startsWith('+') ? 'text-secondary' : 'text-primary'
                            }`}>{row.delta}</td>
                          <td className="px-space-md py-space-sm font-label-sm text-label-sm text-tertiary">{row.owner}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Funnel visual bars */}
              <div className="bg-surface-container-lowest rounded-lg p-space-xl border border-outline-variant/30 shadow-sm">
                <h2 className="font-headline-sm text-headline-sm font-serif text-on-surface mb-space-lg">Funnel Conversion Rates</h2>
                <div className="flex flex-col gap-space-md">
                  {[
                    { stage: 'Impression → Click (CTR)', baseline: 1.6, plan: 1.8, max: 3.5, unit: '%' },
                    { stage: 'Click → Lead (Landing CVR)', baseline: 2.5, plan: 4.0, max: 12, unit: '%' },
                    { stage: 'Lead → Booked', baseline: 60, plan: 60, max: 100, unit: '%' },
                    { stage: 'Booked → Attended (Show Rate)', baseline: 65, plan: 65, max: 100, unit: '%' },
                    { stage: 'Attended → Paid (Close Rate)', baseline: 18, plan: 18, max: 40, unit: '%' },
                  ].map(row => (
                    <div key={row.stage} className="flex flex-col gap-1">
                      <div className="flex justify-between items-center">
                        <span className="font-label-md text-label-md text-on-surface font-medium">{row.stage}</span>
                        <div className="flex items-center gap-space-md">
                          <span className="font-mono-data-sm text-mono-data-sm text-tertiary">Baseline: {row.baseline}{row.unit}</span>
                          <span className="font-mono-data text-mono-data font-bold text-secondary tabular-nums">Plan: {row.plan}{row.unit}</span>
                        </div>
                      </div>
                      <div className="w-full h-3 bg-surface-container-high rounded overflow-hidden relative">
                        <div className="absolute h-full bg-tertiary/30 rounded" style={{ width: `${(row.baseline / row.max) * 100}%` }}></div>
                        <div className="absolute h-full bg-secondary rounded" style={{ width: `${(row.plan / row.max) * 100}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: CVR Bridge */}
          {activeTab === 'cvr' && (
            <div className="flex flex-col gap-space-lg">
              <div className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 overflow-hidden">
                <div className="px-space-lg py-space-md border-b border-outline-variant/20 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">architecture</span>
                  <h2 className="font-headline-sm text-headline-sm font-serif text-on-surface">CVR Bridge: 2.5% → 4.0% via Incremental Wins</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-outline-variant/20 bg-surface-container-low">
                        <th className="px-space-lg py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Step</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">CVR After</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">CPL After</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Driver</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">CVR Gain</th>
                      </tr>
                    </thead>
                    <tbody>
                      {CVR_BRIDGE.map((row, i) => (
                        <tr key={i} className={`border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors ${i === 5 ? 'bg-primary/10' : i === 6 ? 'bg-secondary/10' : ''}`}>
                          <td className="px-space-lg py-space-sm font-body-md text-body-md text-on-surface font-medium">{row.step}</td>
                          <td className="px-space-md py-space-sm font-mono-data text-mono-data font-bold text-secondary tabular-nums">{row.cvr}</td>
                          <td className={`px-space-md py-space-sm font-mono-data text-mono-data font-bold tabular-nums ${parseFloat(row.cpl.replace('$', '')) <= 25 ? 'text-green-700' : parseFloat(row.cpl.replace('$', '')) <= 35 ? 'text-yellow-700' : 'text-on-surface'
                            }`}>{row.cpl}</td>
                          <td className="px-space-md py-space-sm font-body-sm text-body-sm text-tertiary">{row.driver}</td>
                          <td className={`px-space-md py-space-sm font-mono-data text-mono-data tabular-nums font-semibold ${row.change === '—' ? 'text-tertiary' : 'text-secondary'}`}>{row.change}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-space-lg py-space-sm bg-surface-container-low border-t border-outline-variant/20">
                  <p className="font-body-sm text-body-sm text-tertiary italic">
                    Each step is a tested, sequenced experiment — not a parallel wishlist. The order matters because step 1 provides a clean baseline, and each subsequent test is run only after the prior result is confirmed. If T1 fails (CVR does not improve), the remainder of the plan is re-sequenced.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB: Experiment Backlog */}
          {activeTab === 'experiments' && (
            <div className="flex flex-col gap-space-lg">
              <div className="flex items-center gap-space-sm">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary font-semibold">Filter by Phase:</span>
                {['All', 'M1', 'M2', 'M3', 'M4', 'M5', 'M6'].map(phase => (
                  <button key={phase} onClick={() => setFilterPhase(phase)}
                    className={`px-3 py-1 rounded font-label-sm text-label-sm font-semibold transition-all ${filterPhase === phase ? 'bg-primary text-surface' : 'bg-surface-container-low text-on-surface hover:bg-surface-container-high'
                      }`}>{phase}</button>
                ))}
              </div>
              <div className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 overflow-hidden">
                <div className="px-space-lg py-space-md border-b border-outline-variant/20 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">science</span>
                  <h2 className="font-headline-sm text-headline-sm font-serif text-on-surface">ICE-Ranked Experiment Backlog (T1–T12)</h2>
                  <span className="ml-auto font-mono-data-sm text-mono-data-sm text-tertiary">ICE = Impact × Confidence × Ease</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-outline-variant/20 bg-surface-container-low">
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">ID</th>
                        <th className="px-space-lg py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Experiment</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Phase</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Category</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary text-center">I</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary text-center">C</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary text-center">E</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary text-center">ICE</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredExps.map((exp, i) => (
                        <tr key={i} className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors">
                          <td className="px-space-md py-space-sm font-mono-data-sm text-mono-data-sm text-primary font-bold">{exp.id}</td>
                          <td className="px-space-lg py-space-sm font-body-md text-body-md text-on-surface">{exp.name}</td>
                          <td className="px-space-md py-space-sm font-mono-data-sm text-mono-data-sm text-tertiary">{exp.phase}</td>
                          <td className="px-space-md py-space-sm font-label-sm text-label-sm text-tertiary">{exp.category}</td>
                          <td className="px-space-md py-space-sm font-mono-data text-mono-data text-on-surface text-center tabular-nums">{exp.impact}</td>
                          <td className="px-space-md py-space-sm font-mono-data text-mono-data text-on-surface text-center tabular-nums">{exp.confidence}</td>
                          <td className="px-space-md py-space-sm font-mono-data text-mono-data text-on-surface text-center tabular-nums">{exp.ease}</td>
                          <td className="px-space-md py-space-sm font-mono-data text-mono-data font-bold text-primary text-center tabular-nums">{exp.ice}</td>
                          <td className="px-space-md py-space-sm">
                            <span className={`px-2 py-0.5 rounded border font-label-sm text-label-sm font-semibold ${STATUS_COLOR[exp.status]}`}>{exp.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="bg-surface-container-low rounded-lg p-space-lg border border-outline-variant/20">
                <p className="font-body-sm text-body-sm text-tertiary">
                  ICE score = Impact × Confidence × Ease (each rated 1–10). Tests are run in phase order, one at a time, with a minimum 500 visits per variant before declaring a result. If the winner is not statistically significant at 95% confidence, the test is extended to 1,000 visits. Failed experiments are archived — the baseline CVR is never assumed to regress unless measured.
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
