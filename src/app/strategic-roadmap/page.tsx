"use client";
import React, { useState } from 'react';

const WEEK0_TASKS = [
  { task: 'Pull actual CPM, CTR, and CPC from Meta Ads Manager (last 30 days, USA only)', owner: 'Marketing', day: 'W0-D1' },
  { task: 'Pull actual landing page CVR from GA4 (ad_click → lead_submitted event)', owner: 'Analytics', day: 'W0-D1' },
  { task: 'Pull lead-to-booked-trial rate from CRM (last 3 months)', owner: 'Sales', day: 'W0-D2' },
  { task: 'Pull trial-show rate and trial-to-paid rate from CRM', owner: 'Sales + CS', day: 'W0-D2' },
  { task: 'Calculate current blended CPL (confirm or revise $50 estimate)', owner: 'Analytics', day: 'W0-D3' },
  { task: 'Calculate current lead-quality index (baseline = 100)', owner: 'Analytics', day: 'W0-D3' },
  { task: 'Run a Hotjar or Microsoft Clarity session recording for 50 LP sessions', owner: 'Product', day: 'W0-D3' },
  { task: 'Tag every funnel stage in Meta Events Manager (impression → click → lead → booked → attended → paid)', owner: 'Analytics + Marketing', day: 'W0-D4' },
  { task: 'Set up weekly automated CPL and quality index report (Google Sheets or Looker Studio)', owner: 'Analytics', day: 'W0-D5' },
  { task: 'Confirm budget authority: who can adjust spend ±20% without approval?', owner: 'Finance + Marketing Lead', day: 'W0-D5' },
  { task: 'Name single owner for each engine (Marketing, Product, Audience)', owner: 'Leadership', day: 'W0-D5' },
  { task: 'Schedule weekly Monday review (30-min standing) with all three engine owners', owner: 'Leadership', day: 'W0-D5' },
];

const PHASES = [
  {
    id: 'M0', label: 'Month 0', title: 'Foundation — Measure Everything', cpl_target: '$50 (baseline)', status: 'Now',
    description: 'The plan cannot start until the baseline is confirmed. This phase installs all measurement and names all owners.',
    tasks: [
      { task: 'Complete all 12 Week 0 measurement tasks (see Week 0 Checklist)', owner: 'All', type: 'Foundation' },
      { task: 'Install full funnel event tracking (impression → lead → paid)', owner: 'Analytics', type: 'Foundation' },
      { task: 'Brief creative agency on first 3 formats (F1, F2, F7)', owner: 'Marketing', type: 'Creative' },
      { task: 'Map all landing page form fields; remove non-essential fields', owner: 'Product', type: 'Product' },
      { task: 'Name DRI (Directly Responsible Individual) for Marketing, Product, Audience engines', owner: 'Leadership', type: 'Governance' },
    ],
  },
  {
    id: 'M1', label: 'Month 1', title: 'Quick Wins — Form & Creative', cpl_target: '$43 target', status: 'Upcoming',
    description: 'Fastest CPL lever: landing page form simplification and social proof. No complex technology required.',
    tasks: [
      { task: 'Launch T1: 2-step lead-gen form (remove parent + child fields from initial form)', owner: 'Product', type: 'Product' },
      { task: 'Launch T2: Add 10 verified parent testimonials above the form fold', owner: 'Product + Marketing', type: 'Product' },
      { task: 'Launch T3: A/B test "45-second booking" vs current headline', owner: 'Product', type: 'Product' },
      { task: 'Activate creative format F1 and F7 (Problem-aware + Speed)', owner: 'Marketing', type: 'Creative' },
      { task: 'Begin NRI Lookalike audience test (5% of budget, IQI tracked separately)', owner: 'Marketing', type: 'Expansion' },
    ],
  },
  {
    id: 'M2', label: 'Month 2', title: 'Booking Flow & Message Match', cpl_target: '$36 target', status: 'Upcoming',
    description: 'Attack the second drop-off point: clicks that reach the LP but do not book. Embedded calendar eliminates the redirect.',
    tasks: [
      { task: 'Launch T4: Embedded calendar booking (remove Calendly redirect)', owner: 'Product', type: 'Product' },
      { task: 'Launch T5: WhatsApp OTP confirmation for booked trials', owner: 'Product', type: 'Product' },
      { task: 'Test grade-specific landing pages (T6): Grade 3–5 vs 6–8', owner: 'Product', type: 'Product' },
      { task: 'Creative rotation: Launch F2 (Student Story) and F3 (UGC parent)', owner: 'Marketing', type: 'Creative' },
      { task: 'Scale NRI wave 1 to 20% if IQI ≥ 90 from M1 result', owner: 'Marketing', type: 'Expansion' },
    ],
  },
  {
    id: 'M3', label: 'Month 3', title: 'Mexican Wave — Validate & Widen', cpl_target: '$30 target', status: 'Planned',
    description: 'If months 1–2 are green, scale. Introduce audience mix at 20% and launch Hispanic bilingual test.',
    tasks: [
      { task: 'Review M1–M2 experiment results with full statistical readout', owner: 'Analytics', type: 'Review' },
      { task: 'Keep winning LP variant as new default; archive losers', owner: 'Product', type: 'Product' },
      { task: 'Launch T7: Exit-intent modal and T8: Video vs static A/B test', owner: 'Product + Marketing', type: 'Product' },
      { task: 'Launch Hispanic bilingual ad (F9) + Spanish LP variant', owner: 'Marketing', type: 'Expansion' },
      { task: 'Weekly quality audit: confirm IQI ≥ 100 for all active segments', owner: 'Analytics', type: 'Governance' },
    ],
  },
  {
    id: 'M4', label: 'Month 4', title: 'Scale What Works', cpl_target: '$27 target', status: 'Planned',
    description: 'No new experiments; double down on what is proven. CPL should be clearly trending to $25.',
    tasks: [
      { task: 'Scale winners: Proven forms, winning creatives, all wave 1 segments', owner: 'All', type: 'Scale' },
      { task: 'Introduce retargeting carousel (T10) for abandoned LP sessions', owner: 'Marketing', type: 'Creative' },
      { task: 'Increase booking capacity: pre-hire 2 additional closers', owner: 'Sales / Ops', type: 'Capacity' },
      { task: 'Pre-load December creative refresh (F1, F5, F6) to be ready for holidays', owner: 'Marketing', type: 'Creative' },
      { task: 'Run monthly P&L check: spending efficiency vs revenue per paid student', owner: 'Finance', type: 'Governance' },
    ],
  },
  {
    id: 'M5', label: 'Month 5', title: '✅ $25 Commit Target', cpl_target: '$25 COMMIT', status: 'Commit',
    description: 'Commit target. All three engines should be producing at plan rates. Quality index must be ≥100.',
    tasks: [
      { task: 'Confirm blended CPL ≤$25 from live account data (not model output)', owner: 'Analytics', type: 'Milestone' },
      { task: 'Confirm quality index ≥100 (lead-to-paid rate at or above baseline)', owner: 'Analytics', type: 'Milestone' },
      { task: 'Activate audience expansion to 20% of total budget if not already done', owner: 'Marketing', type: 'Expansion' },
      { task: 'Publish Month 5 readout to leadership with actual vs plan comparison', owner: 'All', type: 'Governance' },
    ],
  },
  {
    id: 'M6-12', label: 'Months 6–12', title: 'Compound & Expand', cpl_target: '$22.25 → $19.60', status: 'Stretch',
    description: 'Post-commit phase: expand to additional audience segments, lifecycle improvements, and partnership channels.',
    tasks: [
      { task: 'Scale audience expansion to 20–30% of spend; activate wave 2 and 3 segments', owner: 'Marketing', type: 'Expansion' },
      { task: 'Launch referral program (T12) and teacher partnership pilot', owner: 'BD + Marketing', type: 'Expansion' },
      { task: 'Build cohort retention model: identify early indicators of paid-student churn', owner: 'Data', type: 'Lifecycle' },
      { task: 'Quarterly goal: reduce blended CPL to $19.60 (stretch) by M12', owner: 'All', type: 'Milestone' },
    ],
  },
];

const STATUS_COLORS: Record<string, string> = {
  Now: 'bg-primary text-surface',
  Upcoming: 'bg-secondary text-surface',
  Planned: 'bg-surface-container-high text-on-surface border border-outline-variant/40',
  Commit: 'bg-green-700 text-white',
  Stretch: 'bg-purple-700 text-white',
};

const TYPE_COLORS: Record<string, string> = {
  Foundation: 'text-on-surface bg-surface-container-high',
  Product: 'text-secondary bg-secondary/10',
  Creative: 'text-primary bg-primary/10',
  Expansion: 'text-purple-700 bg-purple-50',
  Governance: 'text-tertiary bg-surface-container-high',
  Review: 'text-on-surface bg-yellow-50',
  Scale: 'text-green-700 bg-green-50',
  Capacity: 'text-on-surface bg-blue-50',
  Milestone: 'text-green-700 bg-green-100',
  Lifecycle: 'text-blue-700 bg-blue-50',
};

export default function StrategicRoadmapPage() {
  const [expandedPhase, setExpandedPhase] = useState<string | null>('M0');
  const [activeTab, setActiveTab] = useState<'roadmap' | 'week0' | 'raci'>('roadmap');

  const tabs = [
    { id: 'roadmap', label: 'M0–M12 Roadmap' },
    { id: 'week0', label: 'Week 0 Checklist' },
    { id: 'raci', label: 'RACI Matrix' },
  ] as const;

  return (
    <main className="w-full bg-surface">
      <div className="flex flex-col w-full">
        <div className="px-margin-desktop py-space-xl flex flex-col gap-space-xl max-w-[1600px] mx-auto w-full">

          {/* Header */}
          <header className="flex flex-col gap-space-sm pb-space-lg border-b border-outline-variant/30">
            <div className="flex flex-wrap items-center gap-space-sm">
              <span className="font-mono-data-sm text-mono-data-sm uppercase tracking-wider text-primary font-semibold px-2 py-0.5 rounded bg-primary-fixed">Section 10 · Strategic Roadmap</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-serif">Strategic Roadmap — Month 0 to Month 12</h1>
            <p className="font-body-md text-body-md text-tertiary max-w-3xl">
              The roadmap sequences the three engines so each phase builds on measured results from the previous one. Nothing is assumed to run in parallel unless the dependency is clean. The plan is designed to be executed by the existing team — no new hires are required before Month 4.
            </p>
            <div className="flex flex-wrap gap-space-md pt-space-md">
              {[
                { label: 'Total Phases', value: '7', color: 'text-on-surface' },
                { label: 'Commit Gate', value: 'Month 5', color: 'text-primary' },
                { label: 'Stretch Target', value: 'Month 9', color: 'text-secondary' },
                { label: 'Week 0 Tasks', value: '12', color: 'text-on-surface' },
                { label: 'Experiments', value: 'T1–T12', color: 'text-on-surface' },
                { label: 'Decision Rules', value: 'Pre-committed', color: 'text-secondary' },
              ].map(kpi => (
                <div key={kpi.label} className="bg-surface-container-lowest rounded-lg px-space-md py-space-sm border border-outline-variant/30 flex flex-col">
                  <span className="font-label-sm text-label-sm uppercase text-tertiary tracking-wider">{kpi.label}</span>
                  <span className={`font-mono-data text-mono-data font-bold tabular-nums ${kpi.color}`}>{kpi.value}</span>
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

          {/* TAB: Roadmap */}
          {activeTab === 'roadmap' && (
            <div className="flex flex-col gap-space-md">
              {PHASES.map(phase => (
                <div key={phase.id} className="bg-surface-container-lowest rounded-lg border border-outline-variant/30 shadow-sm overflow-hidden">
                  <button
                    className="w-full px-space-lg py-space-md flex items-center justify-between gap-space-md hover:bg-surface-container-low transition-colors text-left"
                    onClick={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
                  >
                    <div className="flex items-center gap-space-md">
                      <span className={`px-3 py-1 rounded font-mono-data-sm text-mono-data-sm font-bold ${STATUS_COLORS[phase.status]}`}>{phase.label}</span>
                      <div className="flex flex-col text-left">
                        <span className="font-headline-sm text-headline-sm font-serif text-on-surface">{phase.title}</span>
                        <span className="font-mono-data-sm text-mono-data-sm text-tertiary">{phase.description}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-space-sm shrink-0">
                      <span className={`px-2 py-0.5 rounded border font-mono-data-sm text-mono-data-sm font-bold ${phase.status === 'Commit' ? 'bg-green-100 text-green-700 border-green-200' :
                          phase.status === 'Stretch' ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-surface-container-high text-tertiary border-outline-variant/30'
                        }`}>{phase.cpl_target}</span>
                      <span className="material-symbols-outlined text-tertiary text-[20px]">{expandedPhase === phase.id ? 'expand_less' : 'expand_more'}</span>
                    </div>
                  </button>
                  {expandedPhase === phase.id && (
                    <div className="px-space-lg pb-space-lg pt-space-md border-t border-outline-variant/20">
                      <div className="flex flex-col gap-space-sm">
                        {phase.tasks.map((task, i) => (
                          <div key={i} className="flex items-center gap-space-md p-space-sm rounded border border-outline-variant/10 hover:border-outline-variant/40 transition-colors">
                            <span className="w-6 h-6 rounded-full bg-surface-container-high text-tertiary flex items-center justify-center font-mono-data-sm text-mono-data-sm font-bold shrink-0">{i + 1}</span>
                            <span className="font-body-md text-body-md text-on-surface flex-1">{task.task}</span>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="font-label-sm text-label-sm text-tertiary whitespace-nowrap">Owner: {task.owner}</span>
                              <span className={`px-2 py-0.5 rounded font-label-sm text-label-sm font-semibold ${TYPE_COLORS[task.type]}`}>{task.type}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* TAB: Week 0 Checklist */}
          {activeTab === 'week0' && (
            <div className="flex flex-col gap-space-lg">
              <div className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 overflow-hidden">
                <div className="px-space-lg py-space-md border-b border-outline-variant/20 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">checklist</span>
                  <h2 className="font-headline-sm text-headline-sm font-serif text-on-surface">Week 0 Measurement Audit — 12 Tasks</h2>
                  <span className="ml-auto font-mono-data-sm text-mono-data-sm text-secondary font-semibold">Complete before any experiment starts</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-outline-variant/20 bg-surface-container-low">
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">#</th>
                        <th className="px-space-lg py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Task</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Owner</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Day</th>
                      </tr>
                    </thead>
                    <tbody>
                      {WEEK0_TASKS.map((row, i) => (
                        <tr key={i} className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors">
                          <td className="px-space-md py-space-sm font-mono-data-sm text-mono-data-sm text-primary font-bold">{i + 1}</td>
                          <td className="px-space-lg py-space-sm font-body-md text-body-md text-on-surface">{row.task}</td>
                          <td className="px-space-md py-space-sm font-label-sm text-label-sm text-tertiary whitespace-nowrap">{row.owner}</td>
                          <td className="px-space-md py-space-sm font-mono-data-sm text-mono-data-sm text-secondary font-semibold">{row.day}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-space-lg py-space-sm bg-surface-container-low border-t border-outline-variant/20">
                  <p className="font-body-sm text-body-sm text-tertiary italic">
                    No experiment should start until every Week 0 task is complete and reviewed. A plan built on unconfirmed baselines is running on imagination. If the actual CPL differs materially from $50, re-calibrate the glide path before setting any monthly targets.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB: RACI Matrix */}
          {activeTab === 'raci' && (
            <div className="flex flex-col gap-space-lg">
              <div className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 overflow-hidden">
                <div className="px-space-lg py-space-md border-b border-outline-variant/20 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">assignment_ind</span>
                  <h2 className="font-headline-sm text-headline-sm font-serif text-on-surface">RACI Matrix — Who Owns What</h2>
                  <div className="ml-auto flex gap-space-sm">
                    {[{ code: 'R', label: 'Responsible' }, { code: 'A', label: 'Accountable' }, { code: 'C', label: 'Consulted' }, { code: 'I', label: 'Informed' }].map(b => (
                      <span key={b.code} className="font-mono-data-sm text-mono-data-sm text-tertiary border border-outline-variant/30 px-2 py-0.5 rounded">{b.code} = {b.label}</span>
                    ))}
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-outline-variant/20 bg-surface-container-low">
                        <th className="px-space-lg py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Decision / Activity</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary text-center">Marketing</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary text-center">Product</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary text-center">Analytics</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary text-center">Sales/CS</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary text-center">Leadership</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { area: 'Weekly CPL reporting', mkt: 'C', prd: 'C', ana: 'R/A', sal: 'C', ldr: 'I' },
                        { area: 'Ad creative decisions', mkt: 'R/A', prd: 'C', ana: 'I', sal: 'I', ldr: 'I' },
                        { area: 'Landing page experiments', mkt: 'C', prd: 'R/A', ana: 'R', sal: 'I', ldr: 'I' },
                        { area: 'Booking flow changes', mkt: 'I', prd: 'R/A', ana: 'C', sal: 'C', ldr: 'I' },
                        { area: 'Budget reallocation (±20%)', mkt: 'R', prd: 'I', ana: 'C', sal: 'I', ldr: 'A' },
                        { area: 'Kill lever / pause decision', mkt: 'R/A', prd: 'R/A', ana: 'R', sal: 'I', ldr: 'I' },
                        { area: 'Quality index guardrail breach', mkt: 'R', prd: 'R', ana: 'R', sal: 'R', ldr: 'A' },
                        { area: 'Audience segment activation', mkt: 'R/A', prd: 'I', ana: 'C', sal: 'I', ldr: 'I' },
                        { area: 'Hiring / capacity decisions', mkt: 'C', prd: 'C', ana: 'I', sal: 'C', ldr: 'R/A' },
                        { area: 'Monthly plan vs actual review', mkt: 'R', prd: 'R', ana: 'R', sal: 'R', ldr: 'A' },
                      ].map((row, i) => (
                        <tr key={i} className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors">
                          <td className="px-space-lg py-space-sm font-body-md text-body-md text-on-surface">{row.area}</td>
                          {[row.mkt, row.prd, row.ana, row.sal, row.ldr].map((val, j) => (
                            <td key={j} className="px-space-md py-space-sm font-mono-data text-mono-data text-center font-bold">
                              <span className={`px-2 py-0.5 rounded ${val.startsWith('R') ? 'bg-primary/10 text-primary' : val === 'A' ? 'bg-secondary/10 text-secondary' :
                                  val === 'C' ? 'bg-surface-container-high text-tertiary' : 'text-tertiary'
                                }`}>{val}</span>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
