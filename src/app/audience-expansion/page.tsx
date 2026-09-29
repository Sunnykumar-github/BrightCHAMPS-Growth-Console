"use client";
import React, { useState } from 'react';

const SEGMENTS = [
  { id: 'S1', name: 'Indian-American NRI (South Indian)', tam: '2.1M HH', cpl_est: '$14–18', wave: 1, notes: 'Highest propensity. Tamil/Telugu community groups. Existing BrightChamps brand recognition.', signal: 'Booked trial rate likely 25–30% higher than baseline.' },
  { id: 'S2', name: 'Indian-American NRI (North Indian)', tam: '1.8M HH', cpl_est: '$16–20', wave: 1, notes: 'Hindi-speaking communities. Facebook Groups + WhatsApp outreach.', signal: 'Lookalike audience of existing students expected high hit rate.' },
  { id: 'S3', name: 'South Asian STEM Professional HH', tam: '1.5M HH', cpl_est: '$18–22', wave: 1, notes: 'Dual-income tech families. LinkedIn + Meta targeting by employer/industry.', signal: 'High Average Selling Price. Strong repeat purchase & referral.' },
  { id: 'S4', name: 'General High-Income US Family (NY, CA, TX)', tam: '4.2M HH', cpl_est: '$22–28', wave: 2, notes: 'Mainstream US parents. Benchmark competition high. Requires heavy social proof.', signal: 'Primary volume driver. CPL likely baseline, not a discount play.' },
  { id: 'S5', name: 'Hispanic Bilingual STEM (Bilingüe)', tam: '12M HH', cpl_est: '$18–24', wave: 2, notes: 'Spanish-first or bilingual households. Separate LP and ad creative required.', signal: 'Low competitive CPM for Spanish language ads. Underserved.' },
  { id: 'S6', name: 'Chinese-American STEM Family', tam: '1.2M HH', cpl_est: '$20–25', wave: 2, notes: 'WeChat community groups. Mandarin landing page optional.', signal: 'High academic pressure households. Good conversion profile.' },
  { id: 'S7', name: 'African-American STEM-Focus HH', tam: '3.8M HH', cpl_est: '$22–30', wave: 3, notes: 'Requires cultural alignment in creative and voice. Partnership with STEM org.', signal: 'Underserved. Requires community credibility building before ads.' },
  { id: 'S8', name: 'Teachers / School Admin Referrals', tam: 'Partnership', cpl_est: '$5–10', wave: 3, notes: 'SEL partner program. Requires BD effort and 6-month runway.', signal: 'Very high quality leads. Acquisition is BD cost, not media cost.' },
  { id: 'S9', name: 'Homeschool Community US', tam: '3.5M students', cpl_est: '$15–20', wave: 3, notes: 'Highly engaged, word-of-mouth community. Facebook Groups primary.', signal: 'Referral rate likely 3× mainstream. Community trust is currency.' },
  { id: 'S10', name: 'Military / Veteran Family', tam: '1.1M HH', cpl_est: '$12–18', wave: 4, notes: 'AUSA and base community access. Patriot branding resonates.', signal: 'Very loyal cohort. High CLTV. Low ad cost on military networks.' },
];

const LOCALIZATION = [
  { market: 'Hindi-speaking NRI', actions: ['Create 2 ads in Hindi + English mix', 'Localize landing page headline (H1)', 'WhatsApp community outreach script', 'Testimonial in Hindi from existing parent'] },
  { market: 'Spanish-Bilingual (US Hispanic)', actions: ['Full Spanish LP variant (URL: /es)', 'Google Search in Spanish keyword set', 'Bilingual ad creative (F9)', 'Spanish customer support flow for trial'] },
  { market: 'Tamil/Telugu NRI', actions: ['Tamil community Facebook group outreach', 'South Indian cultural references in creative', 'Coordinate with BrightChamps India for testimonials', 'Track CPL separately to measure community effect'] },
];

const VALIDATION = [
  { phase: 'Week 0–2', action: 'Baseline measurement', detail: 'Track lead-to-booked-to-show-to-paid rates for ALL traffic. This is the denominator for the quality index.' },
  { phase: 'Month 1 (Test)', action: 'Soft launch NRI segment', detail: 'Run 2 ad sets: 1 NRI Lookalike + 1 NRI Interest. Budget: 8% of media spend. Measure CPL and quality index separately.' },
  { phase: 'Month 1 Result', action: 'Decision gate', detail: 'If NRI CPL < $35 AND quality index ≥ 90: proceed to wave 1 scale. If quality index < 80: pause and run audience diagnostic.' },
  { phase: 'Month 2', action: 'Scale wave 1 to 20% of budget', detail: 'Increase NRI to 20% of spend. Add Hispanic test (5% budget).' },
  { phase: 'Month 3', action: 'Hispanic decision gate', detail: 'If Hispanic CPL < mainstream AND quality ≥ baseline: scale to 10%. Launch bilingual LP (F9).' },
  { phase: 'Month 4–6', action: 'Wave 2 activation', detail: 'Add General High-Income, Chinese-American. Maintain total expansion at ≤30% of budget until blended CPL confirmed ≤$25.' },
  { phase: 'Month 6+', action: 'Wave 3 activation', detail: 'Partnership channels, teacher referrals, homeschool community. These require non-media effort alongside ads.' },
];

const WAVE_COLORS: Record<number, string> = {
  1: 'bg-green-100 text-green-700 border-green-200',
  2: 'bg-blue-100 text-blue-700 border-blue-200',
  3: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  4: 'bg-purple-100 text-purple-700 border-purple-200',
};

export default function AudienceExpansionPage() {
  const [activeTab, setActiveTab] = useState<'segments' | 'localization' | 'validation'>('segments');
  const [filterWave, setFilterWave] = useState<number | null>(null);

  const filteredSegs = filterWave !== null ? SEGMENTS.filter(s => s.wave === filterWave) : SEGMENTS;

  const tabs = [
    { id: 'segments', label: '10-Segment Map' },
    { id: 'localization', label: 'Localization Playbook' },
    { id: 'validation', label: 'Validation Methodology' },
  ] as const;

  return (
    <main className="w-full bg-surface">
      <div className="flex flex-col w-full">
        <div className="px-margin-desktop py-space-xl flex flex-col gap-space-xl max-w-[1600px] mx-auto w-full">

          {/* Header */}
          <header className="flex flex-col gap-space-sm pb-space-lg border-b border-outline-variant/30">
            <div className="flex flex-wrap items-center gap-space-sm">
              <span className="font-mono-data-sm text-mono-data-sm uppercase tracking-wider text-primary font-semibold px-2 py-0.5 rounded bg-primary-fixed">Engine 03 · Audience Expansion</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-serif">Audience Expansion — 10 Segments, 4 Waves</h1>
            <p className="font-body-md text-body-md text-tertiary max-w-3xl">
              The audience expansion engine targets under-indexed, high-propensity segments. At 20% of budget, the blended CPL drops from $25 to $22.25 because CPL within these segments averages $14–18. The segments are activated in waves to preserve quality.
            </p>
            <div className="flex flex-wrap gap-space-md pt-space-md">
              {[
                { label: 'Wave 1 Segments', value: '3', note: 'Activate M1–M2', color: 'bg-green-100 text-green-700' },
                { label: 'NRI TAM', value: '5.4M HH', note: 'Indian-American households', color: 'bg-surface-container-lowest text-on-surface border-outline-variant/30 border' },
                { label: 'Hispanic TAM', value: '12M HH', note: 'Bilingual US households', color: 'bg-surface-container-lowest text-on-surface border-outline-variant/30 border' },
                { label: 'Blended CPL (20% mix)', value: '$22.25', note: 'vs $25 baseline', color: 'bg-primary/10 text-primary border-primary/30 border' },
                { label: 'Est. Expansion CPL', value: '$14–18', note: 'NRI wave 1', color: 'bg-secondary/10 text-secondary border-secondary/30 border' },
                { label: 'Quality Guardrail', value: 'IQI ≥ 90', note: 'Required to activate each wave', color: 'bg-surface-container-lowest text-on-surface border-outline-variant/30 border' },
              ].map(kpi => (
                <div key={kpi.label} className={`rounded-lg px-space-md py-space-sm flex flex-col ${kpi.color}`}>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider opacity-70">{kpi.label}</span>
                  <span className="font-mono-data text-mono-data font-bold tabular-nums">{kpi.value}</span>
                  <span className="font-mono-data-sm text-mono-data-sm opacity-70">{kpi.note}</span>
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

          {/* TAB: 10-Segment Map */}
          {activeTab === 'segments' && (
            <div className="flex flex-col gap-space-lg">
              <div className="flex items-center gap-space-sm">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary font-semibold">Filter Wave:</span>
                <button onClick={() => setFilterWave(null)} className={`px-3 py-1 rounded font-label-sm text-label-sm font-semibold transition-all ${filterWave === null ? 'bg-primary text-surface' : 'bg-surface-container-low text-on-surface hover:bg-surface-container-high'}`}>All</button>
                {[1, 2, 3, 4].map(w => (
                  <button key={w} onClick={() => setFilterWave(w)}
                    className={`px-3 py-1 rounded font-label-sm text-label-sm font-semibold transition-all ${filterWave === w ? 'bg-primary text-surface' : 'bg-surface-container-low text-on-surface hover:bg-surface-container-high'}`}>
                    Wave {w}
                  </button>
                ))}
              </div>
              <div className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-outline-variant/20 bg-surface-container-low">
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">ID</th>
                        <th className="px-space-lg py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Segment</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">TAM</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Est CPL</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Wave</th>
                        <th className="px-space-lg py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Notes</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Signal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSegs.map((row, i) => (
                        <tr key={i} className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors">
                          <td className="px-space-md py-space-sm font-mono-data-sm text-mono-data-sm text-primary font-bold">{row.id}</td>
                          <td className="px-space-lg py-space-sm font-body-md text-body-md text-on-surface font-medium">{row.name}</td>
                          <td className="px-space-md py-space-sm font-mono-data-sm text-mono-data-sm text-on-surface tabular-nums">{row.tam}</td>
                          <td className="px-space-md py-space-sm font-mono-data text-mono-data text-secondary font-semibold tabular-nums">{row.cpl_est}</td>
                          <td className="px-space-md py-space-sm">
                            <span className={`px-2 py-0.5 rounded border font-label-sm text-label-sm font-semibold ${WAVE_COLORS[row.wave]}`}>Wave {row.wave}</span>
                          </td>
                          <td className="px-space-lg py-space-sm font-body-sm text-body-sm text-tertiary max-w-sm">{row.notes}</td>
                          <td className="px-space-md py-space-sm font-body-sm text-body-sm text-on-surface max-w-xs">{row.signal}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: Localization Playbook */}
          {activeTab === 'localization' && (
            <div className="flex flex-col gap-space-lg">
              {LOCALIZATION.map((loc, i) => (
                <div key={i} className="bg-surface-container-lowest rounded-lg p-space-xl border border-outline-variant/30 shadow-sm">
                  <h2 className="font-headline-sm text-headline-sm font-serif text-on-surface mb-space-md">{loc.market}</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
                    {loc.actions.map((action, j) => (
                      <li key={j} className="flex items-start gap-2 font-body-md text-body-md text-on-surface">
                        <span className="w-5 h-5 rounded-full bg-primary-fixed text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{j + 1}</span>
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="bg-surface-container-low rounded-lg p-space-lg border border-outline-variant/20">
                <p className="font-body-sm text-body-sm text-tertiary">
                  Localization does not mean translation only. It means message, evidence, and channel alignment. A Hindi-language ad pointing to an English-only landing page will convert worse than either a purely English or purely Hindi experience. Every localization step requires the full ad-to-LP-to-booking chain to be consistent.
                </p>
              </div>
            </div>
          )}

          {/* TAB: Validation Methodology */}
          {activeTab === 'validation' && (
            <div className="flex flex-col gap-space-lg">
              <div className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 overflow-hidden">
                <div className="px-space-lg py-space-md border-b border-outline-variant/20 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                  <h2 className="font-headline-sm text-headline-sm font-serif text-on-surface">Segment Validation: Gate-by-Gate Methodology</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-outline-variant/20 bg-surface-container-low">
                        <th className="px-space-lg py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Phase</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Action</th>
                        <th className="px-space-lg py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Detail</th>
                      </tr>
                    </thead>
                    <tbody>
                      {VALIDATION.map((row, i) => (
                        <tr key={i} className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors">
                          <td className="px-space-lg py-space-sm font-mono-data-sm text-mono-data-sm text-primary font-semibold whitespace-nowrap">{row.phase}</td>
                          <td className="px-space-md py-space-sm font-body-md text-body-md text-on-surface font-medium whitespace-nowrap">{row.action}</td>
                          <td className="px-space-lg py-space-sm font-body-sm text-body-sm text-tertiary">{row.detail}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="bg-surface-container-low rounded-lg p-space-lg border border-outline-variant/20">
                <p className="font-body-sm text-body-sm text-tertiary">
                  The quality index is computed per segment, not just for total traffic. A segment that delivers a $14 CPL but a quality index of 75 destroys economics downstream — those leads never pay. The quality gate must be confirmed before any segment is permitted to exceed 5% of total budget.
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
