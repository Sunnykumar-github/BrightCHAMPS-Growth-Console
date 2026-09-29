"use client";
import React, { useState } from 'react';

const CREATIVE_FORMATS = [
  { id: 'F1', format: 'Cold-audience Problem-Aware Video (15s)', channel: 'Meta, Instagram Reels', ctr_target: '2.0–2.4%', stage: 'Awareness', priority: 'P1' },
  { id: 'F2', format: 'Student Story Testimonial (30s)', channel: 'Meta, YouTube', ctr_target: '1.8–2.0%', stage: 'Awareness → Interest', priority: 'P1' },
  { id: 'F3', format: 'Parent-to-Parent Endorsement (UGC style)', channel: 'Meta, Instagram', ctr_target: '2.0–2.5%', stage: 'Trust', priority: 'P1' },
  { id: 'F4', format: 'US Academic Benchmark Static (infographic)', channel: 'Meta', ctr_target: '1.6–1.8%', stage: 'Awareness', priority: 'P2' },
  { id: 'F5', format: 'Grade-Specific Direct Offer (Grade 3–5)', channel: 'Meta, Google', ctr_target: '1.8–2.2%', stage: 'Conversion', priority: 'P1' },
  { id: 'F6', format: 'Grade-Specific Direct Offer (Grade 6–8)', channel: 'Meta, Google', ctr_target: '1.8–2.2%', stage: 'Conversion', priority: 'P2' },
  { id: 'F7', format: '"45-Second Slot" Booking Velocity Ad', channel: 'Meta', ctr_target: '2.0–2.4%', stage: 'Conversion', priority: 'P1' },
  { id: 'F8', format: 'Desi / NRI Community Testimonial (Hindi/Tamil)', channel: 'Meta + Community Pages', ctr_target: '2.2–2.8%', stage: 'Trust — Expansion', priority: 'P2' },
  { id: 'F9', format: 'Bilingual Spanish Offer Ad (Bilingüe)', channel: 'Meta, Spanish Google', ctr_target: '2.0–2.5%', stage: 'Expansion', priority: 'P2' },
  { id: 'F10', format: 'Retargeting Carousel (3-frame: benefit → social proof → offer)', channel: 'Meta', ctr_target: '1.6–2.0%', stage: 'Retargeting', priority: 'P2' },
];

const CHANNEL_STRATEGY = [
  { channel: 'Meta (Facebook + Instagram)', spend: '45%', note: 'Primary prospecting. Lookalike audiences based on paying student list.', cpl_target: '$25', action: 'Main engine. Refresh creatives every 3 weeks min.' },
  { channel: 'Google Search (paid)', spend: '35%', note: '"Math tutor online USA" and grade-specific terms. High purchase intent.', cpl_target: '$30', action: 'Defensive coverage. Scale if Meta CPMs surge seasonally.' },
  { channel: 'YouTube Pre-Roll (15–30s)', spend: '20%', note: 'Brand recall and retargeting. Lower direct-response CPL but assists conversion.', cpl_target: '$38', action: 'Assist channel. Measure assisted CPL, not stand-alone.' },
  { channel: 'WhatsApp + Community Groups', spend: '0% paid', note: 'NRI diaspora activation. Near-zero CPL but capped reach. Expansion segment.', cpl_target: '$8–12', action: 'Test manual outreach in M3–M4 before paid amplification.' },
  { channel: 'Partnership / Referral (SEL)', spend: '0% paid', note: 'School-adjacent partnerships for SEL-integrated programs.", cpl_target: "$5–10', action: 'Governance and BD effort only. Needs 6-month runway to close.' },
];

const SEASONALITY = [
  { month: 'Sep (M0)', label: 'Back-to-School', cpm: 'High', action: 'Activate; match creative to "new school year" messaging. CPM headwind — offset with CVR.' },
  { month: 'Oct', label: 'Mid-Term Run', cpm: 'Normal', action: 'Core testing window. Launch T1–T3 experiments.' },
  { month: 'Nov', label: 'Holiday Run-Up', cpm: 'Rising', action: 'Freeze creative testing. Use proven variants. Pre-load December creatives.' },
  { month: 'Dec', label: 'Holiday Break', cpm: 'Very High', action: '⚠️ CPM peaks. Scale only retargeting. Pause prospecting expansion if CPM > $25.' },
  { month: 'Jan (M4)', label: 'New Year Surge', cpm: 'Falling', action: '✅ Best CPM window. Accelerate expansion spend. Launch audience segments.' },
  { month: 'Feb–Mar (M5)', label: 'Core Season', cpm: 'Normal', action: 'Commit target window. Validate $25 CPL. Launch bilingual ads.' },
  { month: 'Apr–May', label: 'Pre-Summer', cpm: 'Normal', action: 'Demand gen for summer program. Maintain CVR gains.' },
  { month: 'Jun–Aug', label: 'Summer Push', cpm: 'Low-Normal', action: 'Expansion and partnership activation. Test SEL segment.' },
];

const KILL_SIGNALS = [
  { signal: 'CPL > $45 for 2 weeks', action: 'Kill lowest-performing ad set. Brief new creatives within 5 days.' },
  { signal: 'CTR < 1.4% on any format', action: 'Pause format within 72hrs. Request new creative brief.' },
  { signal: 'Frequency > 5.0', action: 'Auto-pause via ad account rule. Rotate new creative within 72hrs.' },
  { signal: 'Quality index < 90', action: 'Freeze all new audience expansion. Tighten targeting. Escalate.' },
  { signal: 'CPC > $2.00 sustained', action: 'Shift 15% budget from affected channel to Google Search.' },
];

export default function MarketingEnginePage() {
  const [activeTab, setActiveTab] = useState<'channel' | 'creative' | 'seasonality' | 'kill'>('channel');

  const tabs = [
    { id: 'channel', label: 'Channel Strategy' },
    { id: 'creative', label: 'Creative System' },
    { id: 'seasonality', label: 'Seasonality Calendar' },
    { id: 'kill', label: 'Kill Signals' },
  ] as const;

  return (
    <main className="w-full bg-surface">
      <div className="flex flex-col w-full">
        <div className="px-margin-desktop py-space-xl flex flex-col gap-space-xl max-w-[1600px] mx-auto w-full">

          {/* Header */}
          <header className="flex flex-col gap-space-sm pb-space-lg border-b border-outline-variant/30">
            <div className="flex flex-wrap items-center gap-space-sm">
              <span className="font-mono-data-sm text-mono-data-sm uppercase tracking-wider text-primary font-semibold px-2 py-0.5 rounded bg-primary-fixed">Engine 01 · Marketing Engine</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-serif">The Marketing Engine — CPM & CTR</h1>
            <p className="font-body-md text-body-md text-tertiary max-w-3xl">
              The marketing engine is responsible for moving CPM from $20 to $18 and CTR from 1.6% to 1.8%. Together these levers contribute $10 of the $25 CPL reduction. The creative system is the mechanism; channel strategy determines where it runs.
            </p>
            <div className="flex flex-wrap gap-space-md pt-space-md">
              {[
                { label: 'CPM Target', value: '$18', note: 'from $20 baseline' },
                { label: 'CTR Target', value: '1.80%', note: 'from 1.6% baseline' },
                { label: 'Channel Split', value: '45/35/20', note: 'Meta/Google/YouTube' },
                { label: 'CPL Contribution', value: '-$10', note: 'Marketing Engine alone' },
                { label: 'Creative Rotation', value: '3-week', note: 'minimum refresh cycle' },
                { label: 'Test Reserve', value: '8%', note: 'of media budget' },
              ].map(kpi => (
                <div key={kpi.label} className="bg-surface-container-lowest rounded-lg px-space-md py-space-sm border border-outline-variant/30 flex flex-col">
                  <span className="font-label-sm text-label-sm uppercase text-tertiary tracking-wider">{kpi.label}</span>
                  <span className="font-mono-data text-mono-data font-bold tabular-nums text-primary">{kpi.value}</span>
                  <span className="font-mono-data-sm text-mono-data-sm text-tertiary">{kpi.note}</span>
                </div>
              ))}
            </div>
          </header>

          {/* Tabs */}
          <div className="flex gap-1 border-b border-outline-variant/30 overflow-x-auto">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`px-space-md py-space-sm font-label-md text-label-md font-semibold whitespace-nowrap border-b-2 transition-colors -mb-px ${activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-tertiary hover:text-on-surface'
                  }`}>{tab.label}</button>
            ))}
          </div>

          {/* TAB: Channel Strategy */}
          {activeTab === 'channel' && (
            <div className="flex flex-col gap-space-lg">
              <div className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 overflow-hidden">
                <div className="px-space-lg py-space-md border-b border-outline-variant/20 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">campaign</span>
                  <h2 className="font-headline-sm text-headline-sm font-serif text-on-surface">Channel Strategy & Budget Allocation</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-outline-variant/20 bg-surface-container-low">
                        <th className="px-space-lg py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Channel</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Budget Share</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">CPL Target</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Rationale</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {CHANNEL_STRATEGY.map((row, i) => (
                        <tr key={i} className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors">
                          <td className="px-space-lg py-space-sm font-body-md text-body-md text-on-surface font-semibold">{row.channel}</td>
                          <td className="px-space-md py-space-sm font-mono-data text-mono-data font-bold text-primary tabular-nums">{row.spend}</td>
                          <td className="px-space-md py-space-sm font-mono-data text-mono-data text-secondary font-semibold tabular-nums">{row.cpl_target}</td>
                          <td className="px-space-md py-space-sm font-body-sm text-body-sm text-tertiary">{row.note}</td>
                          <td className="px-space-md py-space-sm font-body-sm text-body-sm text-on-surface">{row.action}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Channel bar visual */}
              <div className="bg-surface-container-lowest rounded-lg p-space-xl border border-outline-variant/30 shadow-sm">
                <p className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary font-semibold mb-space-md">Budget Allocation (Paid Spend)</p>
                <div className="w-full h-6 bg-surface-container-high rounded overflow-hidden flex">
                  <div className="h-full bg-primary flex items-center justify-center" style={{ width: '45%' }} title="Meta: 45%">
                    <span className="font-mono-data-sm text-mono-data-sm text-surface font-bold">Meta 45%</span>
                  </div>
                  <div className="h-full bg-secondary flex items-center justify-center" style={{ width: '35%' }} title="Google: 35%">
                    <span className="font-mono-data-sm text-mono-data-sm text-surface font-bold">Google 35%</span>
                  </div>
                  <div className="h-full bg-tertiary flex items-center justify-center" style={{ width: '20%' }} title="YouTube: 20%">
                    <span className="font-mono-data-sm text-mono-data-sm text-surface font-bold">YT 20%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: Creative System */}
          {activeTab === 'creative' && (
            <div className="flex flex-col gap-space-lg">
              <div className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 overflow-hidden">
                <div className="px-space-lg py-space-md border-b border-outline-variant/20 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">palette</span>
                  <h2 className="font-headline-sm text-headline-sm font-serif text-on-surface">Creative System — 10 Formats Library</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-outline-variant/20 bg-surface-container-low">
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">ID</th>
                        <th className="px-space-lg py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Format / Concept</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Channel</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Stage</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">CTR Target</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Priority</th>
                      </tr>
                    </thead>
                    <tbody>
                      {CREATIVE_FORMATS.map((row, i) => (
                        <tr key={i} className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors">
                          <td className="px-space-md py-space-sm font-mono-data-sm text-mono-data-sm text-primary font-bold">{row.id}</td>
                          <td className="px-space-lg py-space-sm font-body-md text-body-md text-on-surface">{row.format}</td>
                          <td className="px-space-md py-space-sm font-body-sm text-body-sm text-tertiary">{row.channel}</td>
                          <td className="px-space-md py-space-sm font-label-sm text-label-sm text-on-surface">{row.stage}</td>
                          <td className="px-space-md py-space-sm font-mono-data-sm text-mono-data-sm text-secondary font-semibold tabular-nums">{row.ctr_target}</td>
                          <td className="px-space-md py-space-sm">
                            <span className={`px-2 py-0.5 rounded border font-label-sm text-label-sm font-semibold ${row.priority === 'P1' ? 'bg-primary/10 text-primary border-primary/30' : 'bg-surface-container-high text-tertiary border-outline-variant'
                              }`}>{row.priority}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-space-lg py-space-sm bg-surface-container-low border-t border-outline-variant/20">
                  <p className="font-body-sm text-body-sm text-tertiary italic">Rule: Every P1 format must have at minimum 2 variants in test at any time. No single creative should run more than 21 days without rotation. At frequency 4.5, a replacement must be ready within 72hrs.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB: Seasonality Calendar */}
          {activeTab === 'seasonality' && (
            <div className="flex flex-col gap-space-lg">
              <div className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 overflow-hidden">
                <div className="px-space-lg py-space-md border-b border-outline-variant/20 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">calendar_month</span>
                  <h2 className="font-headline-sm text-headline-sm font-serif text-on-surface">Seasonality & CPM Calendar — Sep 2026 to Sep 2027</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-outline-variant/20 bg-surface-container-low">
                        <th className="px-space-lg py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Month</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Label</th>
                        <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">CPM Environment</th>
                        <th className="px-space-lg py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Action / Strategy</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SEASONALITY.map((row, i) => (
                        <tr key={i} className={`border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors ${row.cpm === 'Very High' ? 'bg-red-50/50' : row.cpm === 'Low-Normal' ? 'bg-green-50/50' : ''
                          }`}>
                          <td className="px-space-lg py-space-sm font-mono-data text-mono-data text-on-surface font-semibold">{row.month}</td>
                          <td className="px-space-md py-space-sm font-label-sm text-label-sm text-on-surface">{row.label}</td>
                          <td className={`px-space-md py-space-sm font-mono-data-sm text-mono-data-sm font-semibold ${row.cpm === 'Very High' ? 'text-red-700' : row.cpm === 'High' || row.cpm === 'Rising' ? 'text-yellow-700' : row.cpm === 'Low-Normal' ? 'text-green-700' : 'text-on-surface'
                            }`}>{row.cpm}</td>
                          <td className="px-space-lg py-space-sm font-body-sm text-body-sm text-tertiary">{row.action}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: Kill Signals */}
          {activeTab === 'kill' && (
            <div className="flex flex-col gap-space-lg">
              <div className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 overflow-hidden">
                <div className="px-space-lg py-space-md border-b border-outline-variant/20 flex items-center gap-2">
                  <span className="material-symbols-outlined text-red-600 text-[18px]">stop_circle</span>
                  <h2 className="font-headline-sm text-headline-sm font-serif text-on-surface">Creative Kill Signals — Pre-Committed Decision Rules</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-outline-variant/20 bg-surface-container-low">
                        <th className="px-space-lg py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Trigger Signal</th>
                        <th className="px-space-lg py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Pre-Committed Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {KILL_SIGNALS.map((row, i) => (
                        <tr key={i} className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors">
                          <td className="px-space-lg py-space-md font-mono-data text-mono-data text-red-700 font-semibold">{row.signal}</td>
                          <td className="px-space-lg py-space-md font-body-md text-body-md text-on-surface">{row.action}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="bg-surface-container-low rounded-lg p-space-lg border border-outline-variant/20">
                <p className="font-body-sm text-body-sm text-tertiary">
                  Kill signals are pre-committed: the person monitoring the account does not need management approval to pause a creative — only to pause an entire channel or budget category. This removes decision latency and prevents emotional attachment to underperforming creatives. Rules must be reviewed and confirmed at the start of each monthly cycle.
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
