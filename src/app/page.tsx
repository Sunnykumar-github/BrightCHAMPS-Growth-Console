"use client";
import React, { useState } from 'react';
import { useKpiStore } from "@/store/useKpiStore";

const LEVER_TABLE = [
  { lever: 'Marketing Engine: CPM', today: '$20', plan: '$18', effect: '$50.00 → $45.00', owner: 'Marketing' },
  { lever: 'Marketing Engine: CTR', today: '1.6%', plan: '1.8%', effect: '$45.00 → $40.00', owner: 'Marketing & Creative' },
  { lever: 'Product Engine: Landing CVR', today: '2.5%', plan: '4.0%', effect: '$40.00 → $25.00', owner: 'Product, Design, Data' },
  { lever: 'Audience Expansion (20% of spend)', today: '0%', plan: '20%', effect: '$25.00 → $22.25', owner: 'Marketing' },
];

const MILESTONES = [
  { label: 'Month 1', cpl: '$43', note: 'Quick wins — form cut + creative refresh' },
  { label: 'Month 3', cpl: '$30', note: 'Form + message match + lookalikes firing' },
  { label: 'Month 5', cpl: '$25', note: '✅ Commit target reached' },
  { label: 'Month 12', cpl: '$20', note: '🎯 Stretch target — expansion + partnerships' },
];

const DECISIONS = [
  'Approve a Week 0 measurement audit so illustrative baselines are replaced with account actuals.',
  'Approve landing-page and booking-flow capacity (design, front-end, analytics) for a rolling experiment program.',
  'Ring-fence an 8% test reserve of media budget for new formats and audience segments.',
  'Adopt the guardrail and kill rules as standing policy and name a single owner per engine with weekly review authority.',
];

export default function Page() {
  const { blendedCpl, baseCpl, conversionRate, iqiFloor, adSpend } = useKpiStore();
  const [activeTab, setActiveTab] = useState<'situation' | 'thesis' | 'decisions'>('situation');

  const monthlyLeads = Math.round(adSpend / blendedCpl);
  const baseLeads = Math.round(adSpend / baseCpl);
  const savingsIfHoldLeads = Math.round((baseCpl - blendedCpl) * baseLeads);

  return (
    <main className="w-full bg-surface">
      <div className="flex flex-col w-full">
        <div className="px-margin-desktop py-space-xl flex flex-col gap-space-xl max-w-[1600px] mx-auto w-full">

          {/* Top Header */}
          <header className="flex flex-col gap-space-md pb-space-lg border-b border-outline-variant/30">
            <div className="flex flex-wrap items-center gap-space-sm">
              <span className="font-mono-data-sm text-mono-data-sm uppercase tracking-wider text-primary font-semibold px-2 py-0.5 rounded bg-primary-fixed">BrightChamps · USA Math Vertical</span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary">|</span>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-container-high text-on-surface">
                <span className="material-symbols-outlined text-[14px] text-tertiary">person</span>
                <span className="font-label-sm text-label-sm font-medium">Sunny Kumar · AI Forward Deployed Associate · Founder's Office</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                <span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider">September 29, 2026</span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
              <div className="flex flex-col gap-space-xs max-w-4xl">
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-serif">
                  From $50 to $25 — A Growth Plan for USA Math
                </h1>
                <p className="font-body-md text-body-md text-tertiary max-w-3xl">
                  Halving cost per lead through a marketing engine, a product engine and audience expansion, while protecting lead quality with a hard guardrail.
                </p>
              </div>
              <button
                className="px-space-md py-2 bg-on-surface text-surface rounded shadow-sm hover:opacity-90 font-label-md text-label-md font-semibold transition-opacity flex items-center gap-1.5 shrink-0"
                onClick={() => window.print()} type="button">
                <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                Export Brief
              </button>
            </div>
          </header>

          {/* Hero: $50 → $25 Anchor */}
          <section className="bg-surface-container-lowest rounded-lg p-space-xl shadow-sm border border-outline-variant/30 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="flex items-center gap-space-sm mb-space-xs">
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-tertiary font-semibold">Primary Efficiency Target</span>
                  <span className="font-mono-data-sm text-mono-data-sm text-secondary bg-secondary-fixed px-2 py-0.5 rounded font-semibold tabular-nums">-50.0% Unit Cost</span>
                </div>
                <div className="flex items-baseline gap-space-sm">
                  <span className="font-stat-display text-primary-container tracking-tight tabular-nums font-serif select-none" style={{ fontSize: '5rem', lineHeight: '1' }}>
                    $50 <span className="text-tertiary font-normal" style={{ fontSize: '3.5rem' }}>→</span> $25
                  </span>
                </div>
                <div className="mt-space-md flex flex-wrap items-center gap-space-lg text-tertiary">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider">Baseline CPL</span>
                    <span className="font-mono-data text-mono-data text-on-surface font-semibold tabular-nums">$50.00 USD</span>
                  </div>
                  <div className="h-6 w-px bg-outline-variant/40"></div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider">Target CPL</span>
                    <span className="font-mono-data text-mono-data text-primary font-bold tabular-nums">${blendedCpl.toFixed(2)} USD</span>
                  </div>
                  <div className="h-6 w-px bg-outline-variant/40"></div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider">Timeline</span>
                    <span className="font-mono-data text-mono-data text-secondary font-bold tabular-nums">5 Months</span>
                  </div>
                </div>

                {/* CPL Formula Pill */}
                <div className="mt-space-lg px-space-md py-space-sm bg-primary/10 border border-primary/30 rounded-lg">
                  <p className="font-mono-data-sm text-mono-data-sm text-tertiary uppercase tracking-widest mb-1">The Formula</p>
                  <p className="font-mono-data text-mono-data font-bold text-on-surface text-lg">
                    CPL = CPM ÷ (1,000 × CTR × CVR)
                  </p>
                  <p className="font-body-sm text-body-sm text-tertiary mt-1">
                    CPL falls equally when CPM falls, or when CTR or CVR rises by the same proportion. That symmetry is why the plan pulls both engines together.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7 flex flex-col justify-center lg:border-l lg:border-outline-variant/30 lg:pl-space-xl">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary-container font-semibold mb-space-xs flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">psychology</span>
                  The Thesis
                </span>
                <blockquote className="font-headline-md text-headline-md text-on-surface font-serif italic leading-relaxed text-balance">
                  "CPL is not one number to push on. It is the output of three levers, each owned by a different team."
                </blockquote>
                <div className="mt-space-lg grid grid-cols-3 gap-space-md pt-space-md border-t border-outline-variant/20">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-tertiary uppercase">CPM (seen)</span>
                    <span className="font-mono-data text-mono-data font-semibold text-on-surface tabular-nums">Marketing</span>
                    <span className="font-mono-data-sm text-mono-data-sm text-primary tabular-nums mt-0.5">$20 → $18</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-tertiary uppercase">CTR (click)</span>
                    <span className="font-mono-data text-mono-data font-semibold text-on-surface tabular-nums">Creative</span>
                    <span className="font-mono-data-sm text-mono-data-sm text-primary tabular-nums mt-0.5">1.6% → 1.8%</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-tertiary uppercase">CVR (convert)</span>
                    <span className="font-mono-data text-mono-data font-semibold text-on-surface tabular-nums">Product</span>
                    <span className="font-mono-data-sm text-mono-data-sm text-secondary tabular-nums mt-0.5">2.5% → 4.0%</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tab Navigation */}
          <div className="flex gap-1 border-b border-outline-variant/30">
            {(['situation', 'thesis', 'decisions'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-space-md py-space-sm font-label-md text-label-md capitalize font-semibold border-b-2 transition-colors -mb-px ${activeTab === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-tertiary hover:text-on-surface'
                  }`}
              >
                {tab === 'situation' ? 'The Situation' : tab === 'thesis' ? 'The Numbers' : 'Decisions Requested'}
              </button>
            ))}
          </div>

          {/* Tab: Situation */}
          {activeTab === 'situation' && (
            <section className="flex flex-col gap-space-xl">
              {/* Lever Table */}
              <div className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 overflow-hidden">
                <div className="px-space-lg py-space-md border-b border-outline-variant/20 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">tune</span>
                  <h2 className="font-headline-sm text-headline-sm font-serif text-on-surface">The Three Levers — In One Table</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-outline-variant/20 bg-surface-container-low">
                        <th className="px-space-lg py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Lever</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Today</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Plan</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Effect on CPL</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Owner</th>
                      </tr>
                    </thead>
                    <tbody>
                      {LEVER_TABLE.map((row, i) => (
                        <tr key={i} className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors">
                          <td className="px-space-lg py-space-sm font-body-md text-body-md text-on-surface font-medium">{row.lever}</td>
                          <td className="px-space-md py-space-sm font-mono-data text-mono-data text-tertiary tabular-nums">{row.today}</td>
                          <td className="px-space-md py-space-sm font-mono-data text-mono-data text-secondary font-semibold tabular-nums">{row.plan}</td>
                          <td className="px-space-md py-space-sm font-mono-data text-mono-data text-primary font-bold tabular-nums">{row.effect}</td>
                          <td className="px-space-md py-space-sm font-label-sm text-label-sm text-on-surface">{row.owner}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-space-lg py-space-sm bg-surface-container-low border-t border-outline-variant/20">
                  <p className="font-body-sm text-body-sm text-tertiary italic">
                    Every plan value sits below the published 2025 benchmark median for its lever (Meta CTR median ~2.19%, education landing-page conversion median ~5.7%). The plan does not need heroic execution on any one lever — it needs three ordinary improvements to land together.
                  </p>
                </div>
              </div>

              {/* Success Milestones */}
              <div>
                <div className="flex items-center gap-2 mb-space-md">
                  <span className="material-symbols-outlined text-secondary text-[18px]">flag</span>
                  <h2 className="font-headline-sm text-headline-sm font-serif text-on-surface">What Success Looks Like</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
                  {MILESTONES.map((m, i) => (
                    <div key={i} className={`rounded-lg p-space-lg border flex flex-col gap-2 ${i === 2 ? 'bg-primary/10 border-primary/40' : i === 3 ? 'bg-secondary/10 border-secondary/40' : 'bg-surface-container-lowest border-outline-variant/30'}`}>
                      <span className="font-mono-data-sm text-mono-data-sm uppercase tracking-widest text-tertiary">{m.label}</span>
                      <span className="font-stat-display text-on-surface font-serif tabular-nums" style={{ fontSize: '2.5rem', lineHeight: '1' }}>{m.cpl}</span>
                      <span className="font-body-sm text-body-sm text-tertiary">{m.note}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* At Constant $100K Budget callout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
                <div className="bg-surface-container-lowest rounded-lg p-space-lg border border-outline-variant/30 shadow-sm">
                  <h3 className="font-headline-sm text-headline-sm font-serif text-on-surface mb-space-md">Option A: Hold $100K Budget</h3>
                  <div className="flex flex-col gap-space-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-label-sm text-label-sm text-tertiary uppercase">Monthly Leads Today</span>
                      <span className="font-mono-data text-mono-data text-on-surface font-semibold tabular-nums">~2,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-label-sm text-label-sm text-tertiary uppercase">Monthly Leads at Plan</span>
                      <span className="font-mono-data text-mono-data text-secondary font-bold tabular-nums">~4,000</span>
                    </div>
                    <div className="h-px bg-outline-variant/30 my-1"></div>
                    <p className="font-body-sm text-body-sm text-secondary font-semibold">+100% lead velocity. Growth is the priority. Requires sales + teacher capacity to double.</p>
                  </div>
                </div>
                <div className="bg-surface-container-lowest rounded-lg p-space-lg border border-outline-variant/30 shadow-sm">
                  <h3 className="font-headline-sm text-headline-sm font-serif text-on-surface mb-space-md">Option B: Hold Lead Volume</h3>
                  <div className="flex flex-col gap-space-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-label-sm text-label-sm text-tertiary uppercase">Monthly Spend Today</span>
                      <span className="font-mono-data text-mono-data text-on-surface font-semibold tabular-nums">$100,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-label-sm text-label-sm text-tertiary uppercase">Monthly Spend at Plan</span>
                      <span className="font-mono-data text-mono-data text-primary font-bold tabular-nums">$50,000</span>
                    </div>
                    <div className="h-px bg-outline-variant/30 my-1"></div>
                    <p className="font-body-sm text-body-sm text-primary font-semibold">$50K/month released. Efficiency is the priority. Released budget needs a use.</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Tab: The Numbers (Thesis) */}
          {activeTab === 'thesis' && (
            <section className="flex flex-col gap-space-lg">
              {/* Benchmark calibration */}
              <div className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 overflow-hidden">
                <div className="px-space-lg py-space-md border-b border-outline-variant/20 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">analytics</span>
                  <h2 className="font-headline-sm text-headline-sm font-serif text-on-surface">Baseline Calibration — Why $50 is Correct</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-outline-variant/20 bg-surface-container-low">
                        <th className="px-space-lg py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Input</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Baseline</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Benchmark (2025)</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Reading</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors">
                        <td className="px-space-lg py-space-sm font-body-md text-body-md text-on-surface font-medium">CPM</td>
                        <td className="px-space-md py-space-sm font-mono-data text-mono-data text-on-surface tabular-nums">$20</td>
                        <td className="px-space-md py-space-sm font-body-sm text-body-sm text-tertiary">Meta median ~$13–$14; competitive verticals up to ~$20.70</td>
                        <td className="px-space-md py-space-sm font-body-sm text-body-sm text-on-surface">Parenting and education compete for the same parent attention — top of range is plausible.</td>
                      </tr>
                      <tr className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors">
                        <td className="px-space-lg py-space-sm font-body-md text-body-md text-on-surface font-medium">CTR</td>
                        <td className="px-space-md py-space-sm font-mono-data text-mono-data text-on-surface tabular-nums">1.6%</td>
                        <td className="px-space-md py-space-sm font-body-sm text-body-sm text-tertiary">Meta 2025 median ~2.19%</td>
                        <td className="px-space-md py-space-sm font-body-sm text-body-sm text-on-surface">Below median — usually signals creative fatigue or loose targeting.</td>
                      </tr>
                      <tr className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors">
                        <td className="px-space-lg py-space-sm font-body-md text-body-md text-on-surface font-medium">Landing CVR</td>
                        <td className="px-space-md py-space-sm font-mono-data text-mono-data text-on-surface tabular-nums">2.5%</td>
                        <td className="px-space-md py-space-sm font-body-sm text-body-sm text-tertiary">Education median ~5.7%; lead-gen avg ~11.9%</td>
                        <td className="px-space-md py-space-sm font-body-sm text-body-sm text-on-surface">A parent + child + slot form is heavy — low baseline is plausible and leaves room.</td>
                      </tr>
                      <tr className="hover:bg-surface-container-low transition-colors">
                        <td className="px-space-lg py-space-sm font-body-md text-body-md text-on-surface font-semibold">Resulting CPL</td>
                        <td className="px-space-md py-space-sm font-mono-data text-mono-data text-primary font-bold tabular-nums">$50.00</td>
                        <td className="px-space-md py-space-sm font-mono-data-sm text-mono-data-sm text-tertiary">$20 ÷ (1,000 × 0.016 × 0.025)</td>
                        <td className="px-space-md py-space-sm font-body-sm text-body-sm text-secondary font-semibold">Matches the brief exactly.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Audience Mix Effect */}
              <div className="bg-surface-container-lowest rounded-lg p-space-lg shadow-sm border border-outline-variant/30">
                <h2 className="font-headline-sm text-headline-sm font-serif text-on-surface mb-space-md flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-tertiary">groups</span>
                  Audience Expansion Mix Effect on Blended CPL
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-space-md">
                  {[
                    { share: '0%', cpl: '$25.00', qi: '100' },
                    { share: '10%', cpl: '$23.55', qi: '104' },
                    { share: '20%', cpl: '$22.25', qi: '108' },
                    { share: '30%', cpl: '$21.09', qi: '112' },
                    { share: '40%', cpl: '$20.05', qi: '116' },
                  ].map((row, i) => (
                    <div key={i} className={`rounded p-space-md flex flex-col gap-1 border ${i === 2 ? 'border-secondary/40 bg-secondary/10' : 'border-outline-variant/20'}`}>
                      <span className="font-label-sm text-label-sm uppercase text-tertiary">{row.share} mix</span>
                      <span className="font-mono-data text-mono-data font-bold text-primary tabular-nums">{row.cpl}</span>
                      <span className="font-mono-data-sm text-mono-data-sm text-secondary tabular-nums">IQI {row.qi}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-space-sm font-body-sm text-body-sm text-tertiary italic">Blended CPL computed on leads per dollar. Quality index credits only audience-fit shifts (+0.4 pts per 1% of spend). In live operation the index is computed from measured downstream rates.</p>
              </div>

              {/* Funnel Waterfall Per $10K */}
              <div className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 overflow-hidden">
                <div className="px-space-lg py-space-md border-b border-outline-variant/20 flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[18px]">waterfall_chart</span>
                  <h2 className="font-headline-sm text-headline-sm font-serif text-on-surface">Full Funnel: Per $10,000 of Media Spend</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-outline-variant/20 bg-surface-container-low">
                        <th className="px-space-lg py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Stage</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Baseline</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Plan</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { stage: 'Impressions', base: '500,000', plan: '555,556', change: '+11%' },
                        { stage: 'Clicks', base: '8,000', plan: '10,000', change: '+25%' },
                        { stage: 'Cost per Click', base: '$1.25', plan: '$1.00', change: '-20%' },
                        { stage: 'Leads (booked trials requested)', base: '200', plan: '400', change: '+100%' },
                        { stage: 'Booked Trials (60% of leads)', base: '120', plan: '240', change: '+100%' },
                        { stage: 'Attended Trials (65% of booked)', base: '78', plan: '156', change: '+100%' },
                        { stage: 'Paid Students (18% of attended)', base: '14.0', plan: '28.1', change: '+100%' },
                        { stage: 'Media Cost per Paid Student', base: '$712', plan: '$356', change: '-50%' },
                      ].map((row, i) => (
                        <tr key={i} className={`border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors ${i === 7 ? 'font-semibold bg-surface-container-low' : ''}`}>
                          <td className="px-space-lg py-space-sm font-body-md text-body-md text-on-surface">{row.stage}</td>
                          <td className="px-space-md py-space-sm font-mono-data text-mono-data text-tertiary tabular-nums">{row.base}</td>
                          <td className="px-space-md py-space-sm font-mono-data text-mono-data text-secondary font-semibold tabular-nums">{row.plan}</td>
                          <td className="px-space-md py-space-sm font-mono-data text-mono-data tabular-nums"
                            style={{ color: row.change.startsWith('-') && row.stage !== 'Media Cost per Paid Student' ? 'inherit' : row.change.startsWith('+') ? 'var(--color-secondary)' : 'var(--color-primary)' }}
                          >{row.change}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-space-lg py-space-sm bg-surface-container-low border-t border-outline-variant/20">
                  <p className="font-body-sm text-body-sm text-tertiary italic">Downstream rates (60% book, 65% attend, 18% pay) are illustrative and identical in both columns — assumes quality holds. Section 8 tests what happens when it does not.</p>
                </div>
              </div>
            </section>
          )}

          {/* Tab: Decisions Requested */}
          {activeTab === 'decisions' && (
            <section className="flex flex-col gap-space-lg">
              <div className="bg-surface-container-lowest rounded-lg p-space-xl shadow-sm border border-outline-variant/30">
                <div className="flex items-center gap-2 mb-space-lg">
                  <span className="material-symbols-outlined text-primary text-[18px]">how_to_vote</span>
                  <h2 className="font-headline-sm text-headline-sm font-serif text-on-surface">Decisions Requested</h2>
                  <span className="font-mono-data-sm text-mono-data-sm bg-primary-fixed text-primary px-2 py-0.5 rounded font-semibold">4 Items</span>
                </div>
                <div className="flex flex-col gap-space-md">
                  {DECISIONS.map((d, i) => (
                    <div key={i} className="flex items-start gap-space-md p-space-md rounded border border-outline-variant/20 hover:border-primary/40 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold font-mono-data shrink-0">{i + 1}</div>
                      <p className="font-body-md text-body-md text-on-surface">{d}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Honest Scope Note */}
              <div className="bg-surface-container-low rounded-lg p-space-lg border border-outline-variant/20 flex gap-space-md">
                <span className="material-symbols-outlined text-tertiary text-[22px] shrink-0 mt-0.5">info</span>
                <div>
                  <p className="font-headline-sm text-headline-sm font-serif text-on-surface mb-1">Honest Scope Note</p>
                  <p className="font-body-md text-body-md text-tertiary">
                    No account data was available for this plan. Baselines are calibrated to reproduce the stated $50 CPL using published 2025 platform benchmarks. Treat every figure as a hypothesis to be confirmed or replaced in the first 14 days. The structure of the plan, the guardrails and the decision rules do not depend on the exact baseline.
                  </p>
                </div>
              </div>

              {/* Guardrail Protocol */}
              <div className="bg-surface-container-lowest rounded-lg p-space-lg border border-secondary/40 shadow-sm flex gap-space-md">
                <div className="w-10 h-10 rounded bg-secondary text-surface flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">verified_user</span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-space-xs">
                    <span className="font-headline-sm text-headline-sm font-serif text-on-surface">The Guardrail — Non-Negotiable</span>
                    <span className="font-mono-data-sm text-mono-data-sm text-secondary bg-secondary-fixed px-1.5 py-0.5 rounded font-semibold">Active</span>
                  </div>
                  <p className="font-body-md text-body-md text-tertiary">
                    Halving CPL is easy if quality is allowed to fall: loosen targeting, buy junk traffic, and $25 arrives while the business quietly breaks. Every recommendation therefore travels with a <strong className="text-on-surface">lead-quality index that must stay at or above 100</strong>. A relative drop of more than <strong className="text-on-surface">15% in lead-to-paid conversion pauses the responsible lever</strong>. The mathematical limit is generous — halving CPL leaves room for quality to fall by up to 50% before cost per paid student worsens — but the plan uses a far tighter tripwire on purpose.
                  </p>
                  <div className="flex gap-space-md mt-2">
                    {[{ band: 'Green', range: '≥ 100', action: 'Continue — eligible to scale', color: 'text-green-700 bg-green-50 border-green-200' },
                    { band: 'Amber', range: '90–99', action: 'Hold budget, investigate, fix within 2 wks', color: 'text-yellow-700 bg-yellow-50 border-yellow-200' },
                    { band: 'Red', range: '< 90', action: 'Pause responsible lever; escalate', color: 'text-red-700 bg-red-50 border-red-200' }].map(b => (
                      <div key={b.band} className={`rounded p-space-sm border flex flex-col ${b.color}`}>
                        <span className="font-mono-data-sm text-mono-data-sm font-bold">{b.band} ({b.range})</span>
                        <span className="font-body-sm text-body-sm">{b.action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

        </div>
      </div>
    </main>
  );
}
