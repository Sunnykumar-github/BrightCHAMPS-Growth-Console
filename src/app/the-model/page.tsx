"use client";
import React, { useState, useMemo } from 'react';
import { useKpiStore } from "@/store/useKpiStore";

const CPL_BRIDGE = [
  { step: 'Baseline', cpm: '$20.00', ctr: '1.6%', cvr: '2.5%', cpl: '$50.00', change: '—' },
  { step: 'CPM to $18', cpm: '$18.00', ctr: '1.6%', cvr: '2.5%', cpl: '$45.00', change: '-$5.00' },
  { step: 'CTR to 1.8%', cpm: '$18.00', ctr: '1.8%', cvr: '2.5%', cpl: '$40.00', change: '-$5.00' },
  { step: 'CVR to 4.0%', cpm: '$18.00', ctr: '1.8%', cvr: '4.0%', cpl: '$25.00', change: '-$15.00' },
  { step: '+ 20% Audience Mix', cpm: 'blended', ctr: 'blended', cvr: 'blended', cpl: '$22.25', change: '-$2.75' },
];

const GLIDE_PATH = [
  { month: 'M0 (Now)', cpm: '$20.00', ctr: '1.60%', cvr: '2.5%', exp: '0%', cpl: '$50.0', commit: false },
  { month: 'M1', cpm: '$20.00', ctr: '1.65%', cvr: '2.8%', exp: '0%', cpl: '$43.3', commit: false },
  { month: 'M2', cpm: '$19.50', ctr: '1.70%', cvr: '3.2%', exp: '0%', cpl: '$35.8', commit: false },
  { month: 'M3', cpm: '$19.00', ctr: '1.75%', cvr: '3.6%', exp: '0%', cpl: '$30.2', commit: false },
  { month: 'M4', cpm: '$18.50', ctr: '1.80%', cvr: '3.8%', exp: '0%', cpl: '$27.0', commit: false },
  { month: 'M5', cpm: '$18.00', ctr: '1.80%', cvr: '4.0%', exp: '0%', cpl: '$25.0', commit: true },
  { month: 'M6', cpm: '$18.00', ctr: '1.80%', cvr: '4.0%', exp: '20%', cpl: '$22.3', commit: false },
  { month: 'M7', cpm: '$18.00', ctr: '1.80%', cvr: '4.1%', exp: '20%', cpl: '$21.7', commit: false },
  { month: 'M9', cpm: '$18.00', ctr: '1.85%', cvr: '4.2%', exp: '25%', cpl: '$20.1', commit: false },
  { month: 'M12', cpm: '$18.00', ctr: '1.85%', cvr: '4.3%', exp: '25%', cpl: '$19.6', stretch: true },
];

const CVR_SENSITIVITY = [
  { cvr: '2.5%', ctr160: '$45.00', ctr170: '$42.35', ctr180: '$40.00', ctr190: '$37.94', ctr220: '$32.73', note: 'Baseline' },
  { cvr: '3.0%', ctr160: '$37.50', ctr170: '$35.29', ctr180: '$33.33', ctr190: '$31.58', ctr220: '$27.27', note: '' },
  { cvr: '3.3%', ctr160: '$34.09', ctr170: '$32.09', ctr180: '$30.30', ctr190: '$28.72', ctr220: '$24.79', note: '' },
  { cvr: '3.6%', ctr160: '$31.25', ctr170: '$29.41', ctr180: '$27.78', ctr190: '$26.32', ctr220: '$22.73', note: '' },
  { cvr: '4.0%', ctr160: '$28.13', ctr170: '$26.47', ctr180: '$25.00', ctr190: '$23.68', ctr220: '$20.45', note: '✅ Plan' },
  { cvr: '4.5%', ctr160: '$25.00', ctr170: '$23.53', ctr180: '$22.22', ctr190: '$21.05', ctr220: '$18.18', note: '✅' },
  { cvr: '5.0%', ctr160: '$22.50', ctr170: '$21.18', ctr180: '$20.00', ctr190: '$18.95', ctr220: '$16.36', note: '✅' },
  { cvr: '5.7%', ctr160: '$19.74', ctr170: '$18.57', ctr180: '$17.54', ctr190: '$16.61', ctr220: '$14.35', note: 'Benchmark' },
];

const METRIC_DEFS = [
  { metric: 'CPM', formula: 'Media cost ÷ impressions × 1,000', why: 'Price of attention. Driven by auction competition and ad relevance.' },
  { metric: 'CTR', formula: 'Link clicks ÷ impressions', why: 'Signal of creative and audience fit. Below median usually means a creative problem.' },
  { metric: 'CPC', formula: 'Media cost ÷ clicks = CPM ÷ (1,000 × CTR)', why: 'Price of a visit. Baseline $1.25, plan $1.00.' },
  { metric: 'Landing CVR', formula: 'Leads (booked trials) ÷ landing-page sessions', why: 'Share of paid visits that become leads. The biggest single lever in this plan.' },
  { metric: 'CPL (headline)', formula: 'Media cost ÷ leads = CPM ÷ (1,000 × CTR × CVR)', why: 'The number the founder asked us to halve.' },
  { metric: 'Cost per booked trial', formula: 'CPL ÷ lead-to-booked rate', why: 'Removes leads that never book a slot.' },
  { metric: 'Cost per attended trial', formula: 'CPL ÷ (booked rate × show rate)', why: 'The first quality-adjusted cost.' },
  { metric: 'CAC (media only)', formula: 'CPL ÷ (booked × show × paid rates)', why: 'Cost to acquire one paying student, before sales cost.' },
  { metric: 'Lead-quality index', formula: 'Weighted composite of booked, show and paid rates vs. baseline = 100', why: 'The guardrail. Tracked next to CPL every week.' },
];

function cplColor(val: string) {
  const n = parseFloat(val.replace('$', ''));
  if (n <= 25) return 'bg-green-100 text-green-800 font-bold';
  if (n <= 35) return 'bg-yellow-50 text-yellow-800';
  return 'text-tertiary';
}

export default function TheModelPage() {
  const { applyPreset, adSpend, baseCpl } = useKpiStore();
  const [cpm, setCpm] = useState(20.0);
  const [ctr, setCtr] = useState(1.6);
  const [cvr, setCvr] = useState(2.5);
  const [activePreset, setActivePreset] = useState<'best' | 'base' | 'worst'>('base');
  const [activeTab, setActiveTab] = useState<'model' | 'bridge' | 'sensitivity' | 'definitions' | 'glidepath'>('model');

  const cpl = useMemo(() => cpm / (10 * ctr * cvr), [cpm, ctr, cvr]);
  const leads = useMemo(() => Math.round(adSpend / cpl), [adSpend, cpl]);
  const bookedTrials = Math.round(leads * 0.60);
  const attendedTrials = Math.round(bookedTrials * 0.65);
  const paidStudents = Math.round(attendedTrials * 0.18);
  const cac = paidStudents > 0 ? adSpend / paidStudents : 0;
  const cplReduction = (((baseCpl - cpl) / baseCpl) * 100).toFixed(1);

  function handlePreset(type: 'best' | 'base' | 'worst') {
    setActivePreset(type);
    if (type === 'best') { setCpm(17); setCtr(2.0); setCvr(5.0); }
    else if (type === 'base') { setCpm(18); setCtr(1.8); setCvr(4.0); }
    else { setCpm(20); setCtr(1.7); setCvr(3.0); }
    applyPreset(type);
  }

  const tabs = [
    { id: 'model', label: 'Live Calculator' },
    { id: 'bridge', label: '$50 → $25 Bridge' },
    { id: 'sensitivity', label: 'Sensitivity Grid' },
    { id: 'definitions', label: 'Metric Definitions' },
    { id: 'glidepath', label: 'CPL Glide Path' },
  ] as const;

  return (
    <main className="w-full bg-surface">
      <div className="flex flex-col w-full">
        <div className="px-margin-desktop py-space-xl flex flex-col gap-space-xl max-w-[1600px] mx-auto w-full">

          {/* Header */}
          <header className="flex flex-col gap-space-sm pb-space-lg border-b border-outline-variant/30">
            <div className="flex flex-wrap items-center gap-space-sm">
              <span className="font-mono-data-sm text-mono-data-sm uppercase tracking-wider text-primary font-semibold px-2 py-0.5 rounded bg-primary-fixed">Section 3 · Unit Economics</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
              <div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-serif">The Unit-Economics Model</h1>
                <p className="font-body-md text-body-md text-tertiary mt-1 max-w-3xl">
                  CPL = CPM ÷ (1,000 × CTR × CVR). CPL falls when CPM falls, and it falls just as much when CTR or CVR rises by the same proportion. That symmetry is why the plan pulls both engines together rather than betting on one.
                </p>
              </div>
            </div>
            {/* Formula Banner */}
            <div className="bg-primary px-space-lg py-space-md rounded-lg flex flex-col sm:flex-row sm:items-center gap-space-md">
              <div className="flex flex-col">
                <span className="font-mono-data-sm text-mono-data-sm text-surface/70 uppercase tracking-widest">Deterministic Formula</span>
                <span className="font-mono-data text-mono-data text-surface font-bold text-2xl tracking-tight">CPL = CPM ÷ (1,000 × CTR × CVR)</span>
              </div>
              <div className="h-px sm:h-10 sm:w-px bg-surface/20"></div>
              <div className="flex gap-space-lg text-surface">
                <div><span className="font-label-sm text-label-sm text-surface/70 block uppercase">CPM ↓</span><span className="font-mono-data-sm text-mono-data-sm font-semibold">Marketing owns</span></div>
                <div><span className="font-label-sm text-label-sm text-surface/70 block uppercase">CTR ↑</span><span className="font-mono-data-sm text-mono-data-sm font-semibold">Creative owns</span></div>
                <div><span className="font-label-sm text-label-sm text-surface/70 block uppercase">CVR ↑</span><span className="font-mono-data-sm text-mono-data-sm font-semibold">Product owns</span></div>
              </div>
            </div>
          </header>

          {/* Preset Buttons */}
          <div className="flex gap-space-sm items-center">
            <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider font-semibold">Scenario Presets:</span>
            {(['best', 'base', 'worst'] as const).map(p => (
              <button key={p} onClick={() => handlePreset(p)}
                className={`px-space-md py-2 rounded font-label-md text-label-md font-semibold capitalize transition-all ${activePreset === p
                    ? p === 'best' ? 'bg-secondary text-surface shadow-sm' : p === 'base' ? 'bg-primary text-surface shadow-sm' : 'bg-on-surface text-surface shadow-sm'
                    : 'bg-surface-container-low text-on-surface hover:bg-surface-container-high'
                  }`}
              >{p === 'best' ? '🎯 Best Case' : p === 'base' ? '✅ Base Plan' : '⚠️ Worst Case'}</button>
            ))}
            <div className="ml-auto flex items-center gap-space-sm">
              <span className="font-label-sm text-label-sm text-tertiary">Live CPL:</span>
              <span className={`font-mono-data text-mono-data font-bold text-xl tabular-nums px-3 py-1 rounded ${cpl <= 25 ? 'text-green-700 bg-green-100' : cpl <= 35 ? 'text-yellow-700 bg-yellow-100' : 'text-red-700 bg-red-100'}`}>
                ${cpl.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 border-b border-outline-variant/30 overflow-x-auto">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`px-space-md py-space-sm font-label-md text-label-md font-semibold whitespace-nowrap border-b-2 transition-colors -mb-px ${activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-tertiary hover:text-on-surface'
                  }`}>{tab.label}</button>
            ))}
          </div>

          {/* TAB: Live Calculator */}
          {activeTab === 'model' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
              {/* Sliders */}
              <div className="lg:col-span-5 bg-surface-container-lowest rounded-lg p-space-xl shadow-sm border border-outline-variant/30 flex flex-col gap-space-lg">
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-tertiary font-semibold flex items-center gap-2 mb-space-md">
                    <span className="material-symbols-outlined text-[16px]">tune</span>
                    Input Parameter Console
                  </span>
                </div>

                {/* CPM Slider */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label className="font-label-md text-label-md font-semibold text-on-surface">CPM — Cost Per Mille</label>
                    <span className="font-mono-data text-mono-data font-bold text-primary tabular-nums">${cpm.toFixed(2)}</span>
                  </div>
                  <input type="range" min={10} max={30} step={0.5} value={cpm} onChange={e => setCpm(Number(e.target.value))}
                    className="w-full accent-primary" />
                  <div className="flex justify-between font-mono-data-sm text-mono-data-sm text-tertiary tabular-nums">
                    <span>$10</span><span>Baseline $20 → Plan $18</span><span>$30</span>
                  </div>
                </div>

                {/* CTR Slider */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label className="font-label-md text-label-md font-semibold text-on-surface">CTR — Click-Through Rate</label>
                    <span className="font-mono-data text-mono-data font-bold text-primary tabular-nums">{ctr.toFixed(2)}%</span>
                  </div>
                  <input type="range" min={0.5} max={3.5} step={0.05} value={ctr} onChange={e => setCtr(Number(e.target.value))}
                    className="w-full accent-primary" />
                  <div className="flex justify-between font-mono-data-sm text-mono-data-sm text-tertiary tabular-nums">
                    <span>0.5%</span><span>Baseline 1.6% → Plan 1.8%</span><span>3.5%</span>
                  </div>
                </div>

                {/* CVR Slider */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label className="font-label-md text-label-md font-semibold text-on-surface">Landing CVR — Conversion Rate</label>
                    <span className="font-mono-data text-mono-data font-bold text-secondary tabular-nums">{cvr.toFixed(2)}%</span>
                  </div>
                  <input type="range" min={0.5} max={12} step={0.1} value={cvr} onChange={e => setCvr(Number(e.target.value))}
                    className="w-full accent-secondary" />
                  <div className="flex justify-between font-mono-data-sm text-mono-data-sm text-tertiary tabular-nums">
                    <span>0.5%</span><span>Baseline 2.5% → Plan 4.0%</span><span>12%</span>
                  </div>
                </div>

                <div className="pt-space-md border-t border-outline-variant/20">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary">CPL Reduction vs. $50 baseline</span>
                    <span className={`font-mono-data-sm text-mono-data-sm px-2 py-0.5 rounded font-bold uppercase tracking-wider ${parseFloat(cplReduction) > 0 ? 'bg-on-primary-container text-primary-container' : 'bg-red-100 text-red-700'}`}>
                      {parseFloat(cplReduction) >= 0 ? '-' : '+'}{Math.abs(parseFloat(cplReduction)).toFixed(1)}% Reduction
                    </span>
                  </div>
                  <span className="font-mono-data-sm text-mono-data-sm text-on-primary-container/70 mt-1">vs ${baseCpl.toFixed(2)} USA run-rate</span>
                </div>
              </div>

              {/* Output KPIs */}
              <div className="lg:col-span-7 grid grid-cols-2 gap-space-md content-start">
                {[
                  { label: 'Blended CPL', value: `$${cpl.toFixed(2)}`, sub: `Target: $25.00`, color: cpl <= 25 ? 'text-green-700' : cpl <= 35 ? 'text-yellow-700' : 'text-red-700' },
                  { label: 'Cost Per Click', value: `$${(cpm / (ctr * 10)).toFixed(2)}`, sub: 'Baseline: $1.25', color: 'text-primary' },
                  { label: 'Monthly Leads', value: leads.toLocaleString(), sub: `at $${adSpend.toLocaleString()} media budget`, color: 'text-on-surface' },
                  { label: 'Booked Trials', value: bookedTrials.toLocaleString(), sub: '60% book rate', color: 'text-on-surface' },
                  { label: 'Attended Trials', value: attendedTrials.toLocaleString(), sub: '65% show rate', color: 'text-on-surface' },
                  { label: 'Paid Students', value: paidStudents.toLocaleString(), sub: '18% paid rate', color: 'text-secondary' },
                  { label: 'Media CAC', value: `$${cac.toFixed(0)}`, sub: 'Baseline: $712', color: 'text-secondary' },
                  { label: 'CPL vs Target', value: `${cpl <= 25 ? '✅' : cpl <= 35 ? '⚠️' : '❌'} ${cpl <= 25 ? 'On Target' : cpl <= 35 ? 'Close' : 'Escalate'}`, sub: '$25 commit / $20 stretch', color: cpl <= 25 ? 'text-green-700' : cpl <= 35 ? 'text-yellow-700' : 'text-red-700' },
                ].map((kpi, i) => (
                  <div key={i} className="bg-surface-container-lowest rounded-lg p-space-lg shadow-sm border border-outline-variant/30 flex flex-col gap-1">
                    <span className="font-label-sm text-label-sm uppercase text-tertiary">{kpi.label}</span>
                    <span className={`font-stat-display font-serif tabular-nums ${kpi.color}`} style={{ fontSize: '2rem', lineHeight: 1 }}>{kpi.value}</span>
                    <span className="font-mono-data-sm text-mono-data-sm text-tertiary">{kpi.sub}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: CPL Bridge */}
          {activeTab === 'bridge' && (
            <div className="flex flex-col gap-space-lg">
              <div className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 overflow-hidden">
                <div className="px-space-lg py-space-md border-b border-outline-variant/20 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">architecture</span>
                  <h2 className="font-headline-sm text-headline-sm font-serif text-on-surface">The Bridge from $50 to $25</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-outline-variant/20 bg-surface-container-low">
                        {['Step', 'CPM', 'CTR', 'CVR', 'CPL', 'Change'].map(h => (
                          <th key={h} className="px-space-lg py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {CPL_BRIDGE.map((row, i) => (
                        <tr key={i} className={`border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors ${i === 0 ? '' : i === 4 ? 'bg-secondary/10' : ''}`}>
                          <td className="px-space-lg py-space-sm font-body-md text-body-md text-on-surface font-medium">{row.step}</td>
                          <td className="px-space-md py-space-sm font-mono-data text-mono-data text-on-surface tabular-nums">{row.cpm}</td>
                          <td className="px-space-md py-space-sm font-mono-data text-mono-data text-on-surface tabular-nums">{row.ctr}</td>
                          <td className={`px-space-md py-space-sm font-mono-data text-mono-data tabular-nums ${i === 3 ? 'text-secondary font-bold' : 'text-on-surface'}`}>{row.cvr}</td>
                          <td className={`px-space-md py-space-sm font-mono-data text-mono-data tabular-nums font-semibold ${i === 3 || i === 4 ? 'text-primary font-bold' : 'text-on-surface'}`}>{row.cpl}</td>
                          <td className={`px-space-md py-space-sm font-mono-data text-mono-data tabular-nums ${row.change === '—' ? 'text-tertiary' : 'text-secondary font-semibold'}`}>{row.change}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="bg-surface-container-low rounded-lg p-space-lg border border-outline-variant/20">
                <p className="font-body-md text-body-md text-on-surface font-medium mb-2">Order matters because the levers multiply.</p>
                <p className="font-body-sm text-body-sm text-tertiary">The product engine contributes $15 of the $25 reduction because CVR moves 60% while CPM moves 10% and CTR 12.5%. Neither engine alone reaches $25 — Product-only lands at ~$31 and marketing-only at $40. The plan needs both, which is why owners must share one weekly review.</p>
              </div>
            </div>
          )}

          {/* TAB: Sensitivity Grid */}
          {activeTab === 'sensitivity' && (
            <div className="flex flex-col gap-space-lg">
              <div className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 overflow-hidden">
                <div className="px-space-lg py-space-md border-b border-outline-variant/20">
                  <h2 className="font-headline-sm text-headline-sm font-serif text-on-surface">CPL Sensitivity at CPM = $18 — Which CTR × CVR Combinations Reach $25?</h2>
                  <p className="font-body-sm text-body-sm text-tertiary mt-1">Green = ≤$25 target met. Yellow = $25–$35 close. White = misses.</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-outline-variant/20 bg-surface-container-low">
                        <th className="px-space-lg py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">CVR ↓ / CTR →</th>
                        {['1.60%', '1.70%', '1.80%', '1.90%', '2.20%'].map(h => (
                          <th key={h} className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary text-center">{h}</th>
                        ))}
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      {CVR_SENSITIVITY.map((row, i) => (
                        <tr key={i} className="border-b border-outline-variant/10">
                          <td className="px-space-lg py-space-sm font-mono-data text-mono-data text-on-surface font-semibold tabular-nums">{row.cvr}</td>
                          {[row.ctr160, row.ctr170, row.ctr180, row.ctr190, row.ctr220].map((val, j) => (
                            <td key={j} className={`px-space-md py-space-sm font-mono-data text-mono-data tabular-nums text-center rounded ${cplColor(val)}`}>{val}</td>
                          ))}
                          <td className="px-space-md py-space-sm font-label-sm text-label-sm text-secondary font-semibold">{row.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                {[
                  { title: 'Minimum Viable Path', body: 'CTR 1.6% (no creative gain at all) still reaches $25 if CVR reaches 4.5%. CTR 1.8% needs CVR 4.0%. CTR 2.2% needs only CVR 3.3%.' },
                  { title: 'Asymmetry to Exploit', body: 'Landing CVR is fully within BrightChamps\' control and can be tested within days. CTR and CPM depend partly on auction dynamics. Prioritize CVR early.' },
                  { title: '⚠️ Warning Cell', body: 'CTR 2.2% with CVR 2.5% still costs $32.70. Better creative that does not convert is the most common way to feel busy without moving CPL.' },
                ].map((c, i) => (
                  <div key={i} className="bg-surface-container-lowest rounded-lg p-space-lg border border-outline-variant/30 shadow-sm">
                    <p className="font-body-md text-body-md text-on-surface font-semibold mb-2">{c.title}</p>
                    <p className="font-body-sm text-body-sm text-tertiary">{c.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: Metric Definitions */}
          {activeTab === 'definitions' && (
            <div className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 overflow-hidden">
              <div className="px-space-lg py-space-md border-b border-outline-variant/20 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">menu_book</span>
                <h2 className="font-headline-sm text-headline-sm font-serif text-on-surface">Metric Definitions (Section 2.4)</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-outline-variant/20 bg-surface-container-low">
                      <th className="px-space-lg py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary w-40">Metric</th>
                      <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Formula</th>
                      <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Why It Matters</th>
                    </tr>
                  </thead>
                  <tbody>
                    {METRIC_DEFS.map((row, i) => (
                      <tr key={i} className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors">
                        <td className="px-space-lg py-space-sm font-body-md text-body-md text-on-surface font-semibold">{row.metric}</td>
                        <td className="px-space-md py-space-sm font-mono-data-sm text-mono-data-sm text-on-surface">{row.formula}</td>
                        <td className="px-space-md py-space-sm font-body-sm text-body-sm text-tertiary">{row.why}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: CPL Glide Path */}
          {activeTab === 'glidepath' && (
            <div className="flex flex-col gap-space-lg">
              <div className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 overflow-hidden">
                <div className="px-space-lg py-space-md border-b border-outline-variant/20 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">trending_down</span>
                  <h2 className="font-headline-sm text-headline-sm font-serif text-on-surface">Expected Blended CPL by Month</h2>
                  <span className="ml-auto font-mono-data-sm text-mono-data-sm text-secondary font-semibold">Commit: $25 by M5 · Stretch: $20 by M9</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-outline-variant/20 bg-surface-container-low">
                        {['Month', 'CPM', 'CTR', 'CVR', 'Expansion', 'Blended CPL'].map(h => (
                          <th key={h} className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {GLIDE_PATH.map((row, i) => (
                        <tr key={i} className={`border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors ${(row as any).commit ? 'bg-primary/10' : (row as any).stretch ? 'bg-secondary/10' : ''
                          }`}>
                          <td className="px-space-md py-space-sm font-mono-data text-mono-data font-semibold text-on-surface whitespace-nowrap">
                            {row.month}
                            {(row as any).commit && <span className="ml-2 text-xs bg-primary text-surface px-1.5 py-0.5 rounded font-bold">COMMIT</span>}
                            {(row as any).stretch && <span className="ml-2 text-xs bg-secondary text-surface px-1.5 py-0.5 rounded font-bold">STRETCH</span>}
                          </td>
                          <td className="px-space-md py-space-sm font-mono-data text-mono-data text-on-surface tabular-nums">{row.cpm}</td>
                          <td className="px-space-md py-space-sm font-mono-data text-mono-data text-on-surface tabular-nums">{row.ctr}</td>
                          <td className="px-space-md py-space-sm font-mono-data text-mono-data text-on-surface tabular-nums">{row.cvr}</td>
                          <td className="px-space-md py-space-sm font-mono-data text-mono-data text-tertiary tabular-nums">{row.exp}</td>
                          <td className={`px-space-md py-space-sm font-mono-data text-mono-data font-bold tabular-nums ${parseFloat(row.cpl) <= 25 ? 'text-green-700' : parseFloat(row.cpl) <= 35 ? 'text-yellow-700' : 'text-red-700'
                            }`}>${row.cpl}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="bg-surface-container-low rounded-lg p-space-lg border border-outline-variant/20">
                <p className="font-body-sm text-body-sm text-tertiary">Commit: $25 by month 5 and sustained. Stretch: $20 by month 9 if expansion and partnerships perform. The plan does not assume the stretch. Short-term targets (days 30–90) protect against drift and prove the mechanics. Long-term targets (months 6–12) capture the compounding effect of expansion, partnerships and lifecycle improvements.</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
