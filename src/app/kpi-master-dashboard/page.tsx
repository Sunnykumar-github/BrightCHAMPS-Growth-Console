"use client";
import React, { useState, useMemo } from 'react';
import { useKpiStore } from "@/store/useKpiStore";

const KPI_REGISTER = [
  // SECTION 1: MARKETING ENGINE
  { id: 'M1', section: 'Marketing', name: 'Blended CPL', formula: 'Total Ad Spend ÷ Total Leads', current: '$50.00', target: '$25.00', unit: 'USD', cadence: 'Weekly', tier: 'North Star', status: 'Off Track' },
  { id: 'M2', section: 'Marketing', name: 'CPM (Cost per 1,000 impressions)', formula: 'Ad Spend ÷ Impressions × 1,000', current: '$20.00', target: '$18.00', unit: 'USD', cadence: 'Weekly', tier: 'Lever', status: 'Off Track' },
  { id: 'M3', section: 'Marketing', name: 'CTR (Click-Through Rate)', formula: 'Clicks ÷ Impressions', current: '1.60%', target: '1.80%', unit: '%', cadence: 'Weekly', tier: 'Lever', status: 'Off Track' },
  { id: 'M4', section: 'Marketing', name: 'CPC (Cost per Click)', formula: 'CPM ÷ (CTR × 10)', current: '$1.25', target: '$1.00', unit: 'USD', cadence: 'Weekly', tier: 'Diagnostic', status: 'Monitor' },
  { id: 'M5', section: 'Marketing', name: 'Ad Frequency', formula: 'Impressions ÷ Unique Reach', current: 'TBD', target: '< 5.0', unit: 'x', cadence: 'Weekly', tier: 'Guardrail', status: 'Measure' },
  { id: 'M6', section: 'Marketing', name: 'Creative Refresh Cycle', formula: 'Days since last creative rotation', current: 'TBD', target: '≤ 21 days', unit: 'days', cadence: 'Weekly', tier: 'Operational', status: 'Measure' },
  { id: 'M7', section: 'Marketing', name: 'NRI Segment CPL', formula: 'NRI Ad Spend ÷ NRI Leads', current: 'Not live', target: '$14–18', unit: 'USD', cadence: 'Monthly', tier: 'Expansion', status: 'Planned' },
  { id: 'M8', section: 'Marketing', name: 'Hispanic Segment CPL', formula: 'Hispanic Ad Spend ÷ Hispanic Leads', current: 'Not live', target: '$18–24', unit: 'USD', cadence: 'Monthly', tier: 'Expansion', status: 'Planned' },
  { id: 'M9', section: 'Marketing', name: 'Test Budget Reserve %', formula: 'Test Budget ÷ Total Media Budget', current: 'TBD', target: '8%', unit: '%', cadence: 'Monthly', tier: 'Operational', status: 'Measure' },
  { id: 'M10', section: 'Marketing', name: 'Blended CPL (20% audience mix)', formula: 'Weighted avg: mainstream + segment CPL', current: '$50.00', target: '$22.25', unit: 'USD', cadence: 'Monthly', tier: 'Compound', status: 'Planned' },

  // SECTION 2: PRODUCT ENGINE
  { id: 'P1', section: 'Product', name: 'Landing Page CVR', formula: 'Leads ÷ LP Visitors', current: '2.50%', target: '4.00%', unit: '%', cadence: 'Weekly', tier: 'North Star', status: 'Off Track' },
  { id: 'P2', section: 'Product', name: 'Trial Booking Rate', formula: 'Bookings ÷ Leads', current: '60%', target: '60%', unit: '%', cadence: 'Weekly', tier: 'Lever', status: 'On Track' },
  { id: 'P3', section: 'Product', name: 'Demo Show Rate', formula: 'Attended ÷ Booked', current: '65%', target: '65%', unit: '%', cadence: 'Weekly', tier: 'Lever', status: 'On Track' },
  { id: 'P4', section: 'Product', name: 'Lead Quality Index (IQI)', formula: '(Segment Lead-to-Paid Rate ÷ Baseline Rate) × 100', current: '100', target: '≥ 100', unit: 'index', cadence: 'Weekly', tier: 'Guardrail', status: 'On Track' },
  { id: 'P5', section: 'Product', name: 'T1 Experiment CVR Delta', formula: '2-step form CVR - baseline CVR', current: 'Not run', target: '+0.5% pt', unit: 'pp', cadence: 'Monthly', tier: 'Experiment', status: 'Planned' },
  { id: 'P6', section: 'Product', name: 'T4 Embedded Calendar Lift', formula: 'Embedded CVR - redirect CVR', current: 'Not run', target: '+0.3% pt', unit: 'pp', cadence: 'Monthly', tier: 'Experiment', status: 'Planned' },
  { id: 'P7', section: 'Product', name: 'Form Field Count', formula: 'Number of visible fields on initial form', current: 'TBD', target: '≤ 3', unit: 'fields', cadence: 'Monthly', tier: 'Diagnostic', status: 'Measure' },
  { id: 'P8', section: 'Product', name: 'Page Load Speed (LCP)', formula: 'Core Web Vitals: Largest Contentful Paint', current: 'TBD', target: '< 2.5s', unit: 'sec', cadence: 'Monthly', tier: 'Diagnostic', status: 'Measure' },
  { id: 'P9', section: 'Product', name: 'Mobile CVR vs Desktop CVR', formula: 'Mobile lead rate ÷ Desktop lead rate', current: 'TBD', target: '≥ 0.85×', unit: 'ratio', cadence: 'Monthly', tier: 'Diagnostic', status: 'Measure' },
  { id: 'P10', section: 'Product', name: 'ICE Score Average (active tests)', formula: 'Avg of Impact × Confidence × Ease for live tests', current: 'TBD', target: '≥ 400', unit: 'index', cadence: 'Monthly', tier: 'Operational', status: 'Measure' },

  // SECTION 3: FUNNEL / SALES
  { id: 'S1', section: 'Sales/Funnel', name: 'Trial-to-Paid Close Rate', formula: 'Paid Students ÷ Attended Trials', current: '18%', target: '18%', unit: '%', cadence: 'Weekly', tier: 'Lever', status: 'On Track' },
  { id: 'S2', section: 'Sales/Funnel', name: 'Media CAC (Customer Acquisition Cost)', formula: 'CPL ÷ Trial-to-Paid Rate', current: '$714', target: '$357', unit: 'USD', cadence: 'Monthly', tier: 'North Star', status: 'Off Track' },
  { id: 'S3', section: 'Sales/Funnel', name: 'Total Funnel CPL (all costs)', formula: 'Total Spend (media + ops) ÷ Leads', current: 'TBD', target: '< $35', unit: 'USD', cadence: 'Monthly', tier: 'Diagnostic', status: 'Measure' },
  { id: 'S4', section: 'Sales/Funnel', name: 'Revenue per Lead (RPL)', formula: 'Monthly Revenue ÷ Total Monthly Leads', current: 'TBD', target: 'TBD', unit: 'USD', cadence: 'Monthly', tier: 'Diagnostic', status: 'Measure' },
  { id: 'S5', section: 'Sales/Funnel', name: 'Lead-to-Booked (7-day)', formula: 'Bookings within 7 days of lead ÷ Total leads', current: 'TBD', target: '≥ 55%', unit: '%', cadence: 'Weekly', tier: 'Operational', status: 'Measure' },
  { id: 'S6', section: 'Sales/Funnel', name: 'No-Show Rate', formula: '1 – Show Rate', current: '35%', target: '< 30%', unit: '%', cadence: 'Weekly', tier: 'Diagnostic', status: 'Monitor' },
  { id: 'S7', section: 'Sales/Funnel', name: 'Speed-to-Lead (response time)', formula: 'Avg minutes from form submit to first contact', current: 'TBD', target: '< 30 min', unit: 'min', cadence: 'Weekly', tier: 'Operational', status: 'Measure' },

  // SECTION 4: AUDIENCE EXPANSION
  { id: 'A1', section: 'Expansion', name: 'Expansion % of Budget', formula: 'Segment Ad Spend ÷ Total Media Budget', current: '0%', target: '20%', unit: '%', cadence: 'Monthly', tier: 'Lever', status: 'Planned' },
  { id: 'A2', section: 'Expansion', name: 'Blended CPL (with expansion)', formula: '0.8 × $25 + 0.2 × SegCPL', current: '$50.00', target: '$22.25', unit: 'USD', cadence: 'Monthly', tier: 'North Star', status: 'Planned' },
  { id: 'A3', section: 'Expansion', name: 'NRI Segment IQI', formula: '(NRI lead-to-paid rate ÷ baseline rate) × 100', current: 'Not live', target: '≥ 90', unit: 'index', cadence: 'Monthly', tier: 'Guardrail', status: 'Planned' },
  { id: 'A4', section: 'Expansion', name: 'Hispanic Segment IQI', formula: '(Hispanic lead-to-paid rate ÷ baseline rate) × 100', current: 'Not live', target: '≥ 90', unit: 'index', cadence: 'Monthly', tier: 'Guardrail', status: 'Planned' },
  { id: 'A5', section: 'Expansion', name: 'Active Audience Segments', formula: 'Count of live segments with >100 leads', current: '1', target: '4+', unit: 'count', cadence: 'Monthly', tier: 'Operational', status: 'Planned' },

  // SECTION 5: BUSINESS / P&L
  { id: 'B1', section: 'Business', name: 'Paid Students (Monthly New)', formula: 'New paying students in calendar month', current: 'TBD', target: '+50%', unit: 'students', cadence: 'Monthly', tier: 'North Star', status: 'Measure' },
  { id: 'B2', section: 'Business', name: 'Monthly Revenue (USA Math)', formula: 'Avg ASP × Paid Students', current: 'TBD', target: 'TBD', unit: 'USD', cadence: 'Monthly', tier: 'North Star', status: 'Measure' },
  { id: 'B3', section: 'Business', name: 'Payback Period (media spend)', formula: 'CAC ÷ Monthly Gross Margin per Student', current: 'TBD', target: '< 3 months', unit: 'months', cadence: 'Quarterly', tier: 'Diagnostic', status: 'Measure' },
  { id: 'B4', section: 'Business', name: 'LTV:CAC Ratio', formula: 'Estimated LTV ÷ Media CAC', current: 'TBD', target: '≥ 3:1', unit: 'ratio', cadence: 'Quarterly', tier: 'Strategic', status: 'Measure' },
  { id: 'B5', section: 'Business', name: 'Media Spend Efficiency', formula: 'Paid Students ÷ Total Media Spend', current: 'TBD', target: 'Trend ↑', unit: 'students/$', cadence: 'Monthly', tier: 'Diagnostic', status: 'Measure' },

  // SECTION 6: GUARDRAILS
  { id: 'G1', section: 'Guardrails', name: 'CPL vs Target (Delta)', formula: '|Actual CPL – Target CPL|', current: '$25.00', target: '< $5', unit: 'USD', cadence: 'Weekly', tier: 'Guardrail', status: 'Off Track' },
  { id: 'G2', section: 'Guardrails', name: 'Quality Index (Total Traffic)', formula: '(Total lead-to-paid rate ÷ baseline) × 100', current: '100', target: '≥ 100', unit: 'index', cadence: 'Weekly', tier: 'Guardrail', status: 'On Track' },
  { id: 'G3', section: 'Guardrails', name: 'Paid CVR 15% Decline Trip', formula: 'If paid CVR drops 15%+ vs prev 4wk avg: alert', current: 'None', target: 'No alert', unit: 'flag', cadence: 'Weekly', tier: 'Guardrail', status: 'On Track' },
  { id: 'G4', section: 'Guardrails', name: 'One DRI per Engine', formula: 'Single named owner confirmed for each engine', current: 'TBD', target: '3/3 named', unit: 'count', cadence: 'Once', tier: 'Governance', status: 'Measure' },
  { id: 'G5', section: 'Guardrails', name: 'Weekly Review Cadence', formula: 'Mondays: did review happen? Y/N', current: 'TBD', target: '100%', unit: '%', cadence: 'Weekly', tier: 'Governance', status: 'Measure' },
];

const STATUS_COLORS: Record<string, string> = {
  'On Track': 'bg-green-100 text-green-700 border-green-200',
  'Off Track': 'bg-red-100 text-red-700 border-red-200',
  'Monitor': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  'Planned': 'bg-blue-100 text-blue-700 border-blue-200',
  'Measure': 'bg-surface-container-high text-tertiary border-outline-variant/30',
};

const TIER_COLORS: Record<string, string> = {
  'North Star': 'text-primary font-bold',
  'Lever': 'text-secondary font-semibold',
  'Guardrail': 'text-red-700 font-semibold',
  'Diagnostic': 'text-tertiary',
  'Operational': 'text-on-surface',
  'Compound': 'text-purple-700',
  'Expansion': 'text-blue-700',
  'Experiment': 'text-yellow-700',
  'Strategic': 'text-on-surface',
  'Governance': 'text-tertiary',
};

const SECTIONS = ['All', 'Marketing', 'Product', 'Sales/Funnel', 'Expansion', 'Business', 'Guardrails'];
const TIERS = ['All', 'North Star', 'Lever', 'Guardrail', 'Diagnostic', 'Operational'];

export default function KpiMasterDashboardPage() {
  const { baseCpl, blendedCpl } = useKpiStore();
  const [filterSection, setFilterSection] = useState('All');
  const [filterTier, setFilterTier] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return KPI_REGISTER.filter(kpi => {
      if (filterSection !== 'All' && kpi.section !== filterSection) return false;
      if (filterTier !== 'All' && kpi.tier !== filterTier) return false;
      if (filterStatus !== 'All' && kpi.status !== filterStatus) return false;
      if (search && !kpi.name.toLowerCase().includes(search.toLowerCase()) && !kpi.id.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [filterSection, filterTier, filterStatus, search]);

  const summary = useMemo(() => {
    const onTrack = KPI_REGISTER.filter(k => k.status === 'On Track').length;
    const offTrack = KPI_REGISTER.filter(k => k.status === 'Off Track').length;
    const northStars = KPI_REGISTER.filter(k => k.tier === 'North Star').length;
    const guardrails = KPI_REGISTER.filter(k => k.tier === 'Guardrail').length;
    return { onTrack, offTrack, northStars, guardrails, total: KPI_REGISTER.length };
  }, []);

  return (
    <main className="w-full bg-surface">
      <div className="flex flex-col w-full">
        <div className="px-margin-desktop py-space-xl flex flex-col gap-space-xl max-w-[1600px] mx-auto w-full">

          {/* Header */}
          <header className="flex flex-col gap-space-sm pb-space-lg border-b border-outline-variant/30">
            <div className="flex flex-wrap items-center gap-space-sm">
              <span className="font-mono-data-sm text-mono-data-sm uppercase tracking-wider text-primary font-semibold px-2 py-0.5 rounded bg-primary-fixed">Section 8 · KPI Master Dashboard</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-serif">KPI Master Register — {KPI_REGISTER.length} Metrics</h1>
            <p className="font-body-md text-body-md text-tertiary max-w-3xl">
              The complete KPI register for the USA Math Growth Plan. All metrics are organized by engine (Marketing, Product, Funnel, Expansion, Business, Guardrails) and tagged with tier (North Star, Lever, Guardrail, Diagnostic). North Stars are measured weekly; Guardrails require immediate response when breached.
            </p>
            {/* Summary strip */}
            <div className="flex flex-wrap gap-space-md pt-space-md">
              {[
                { label: 'Total KPIs', value: `${summary.total}`, color: 'text-on-surface', bg: 'bg-surface-container-lowest' },
                { label: 'North Stars', value: `${summary.northStars}`, color: 'text-primary', bg: 'bg-primary/10 border-primary/20' },
                { label: 'Guardrails', value: `${summary.guardrails}`, color: 'text-red-700', bg: 'bg-red-50 border-red-200' },
                { label: 'On Track', value: `${summary.onTrack}`, color: 'text-green-700', bg: 'bg-green-50 border-green-200' },
                { label: 'Off Track', value: `${summary.offTrack}`, color: 'text-red-700', bg: 'bg-red-50 border-red-200' },
                { label: 'Current CPL (store)', value: `$${baseCpl.toFixed(2)}`, color: 'text-on-surface', bg: 'bg-surface-container-lowest' },
                { label: 'Target CPL', value: `$${blendedCpl.toFixed(2)}`, color: 'text-primary', bg: 'bg-primary/10 border-primary/20' },
              ].map(kpi => (
                <div key={kpi.label} className={`rounded-lg px-space-md py-space-sm border border-outline-variant/30 flex flex-col ${kpi.bg}`}>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider opacity-70">{kpi.label}</span>
                  <span className={`font-mono-data text-mono-data font-bold tabular-nums ${kpi.color}`}>{kpi.value}</span>
                </div>
              ))}
            </div>
          </header>

          {/* Filters */}
          <div className="flex flex-wrap gap-space-md items-center bg-surface-container-low rounded-lg p-space-md border border-outline-variant/20">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search metric name or ID..."
              className="bg-surface border border-outline-variant/30 rounded px-3 py-1.5 font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary w-48"
            />
            <div className="flex items-center gap-1 flex-wrap">
              <span className="font-label-sm text-label-sm text-tertiary font-semibold">Section:</span>
              {SECTIONS.map(s => (
                <button key={s} onClick={() => setFilterSection(s)}
                  className={`px-2 py-0.5 rounded font-label-sm text-label-sm font-semibold transition-all ${filterSection === s ? 'bg-primary text-surface' : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'}`}
                >{s}</button>
              ))}
            </div>
            <div className="flex items-center gap-1 flex-wrap">
              <span className="font-label-sm text-label-sm text-tertiary font-semibold">Tier:</span>
              {TIERS.map(t => (
                <button key={t} onClick={() => setFilterTier(t)}
                  className={`px-2 py-0.5 rounded font-label-sm text-label-sm font-semibold transition-all ${filterTier === t ? 'bg-primary text-surface' : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'}`}
                >{t}</button>
              ))}
            </div>
            <div className="flex items-center gap-1 flex-wrap">
              <span className="font-label-sm text-label-sm text-tertiary font-semibold">Status:</span>
              {['All', 'On Track', 'Off Track', 'Monitor', 'Planned', 'Measure'].map(s => (
                <button key={s} onClick={() => setFilterStatus(s)}
                  className={`px-2 py-0.5 rounded font-label-sm text-label-sm font-semibold transition-all ${filterStatus === s ? 'bg-primary text-surface' : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'}`}
                >{s}</button>
              ))}
            </div>
            <span className="ml-auto font-mono-data-sm text-mono-data-sm text-tertiary">{filtered.length} of {KPI_REGISTER.length} metrics</span>
          </div>

          {/* Table */}
          <div className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-outline-variant/20 bg-surface-container-low">
                    <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">ID</th>
                    <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Section</th>
                    <th className="px-space-lg py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Metric Name</th>
                    <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Tier</th>
                    <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Current</th>
                    <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Target</th>
                    <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Cadence</th>
                    <th className="px-space-md py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Status</th>
                    <th className="px-space-lg py-space-sm font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Formula</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((kpi, i) => (
                    <tr key={i} className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors">
                      <td className="px-space-md py-space-sm font-mono-data-sm text-mono-data-sm text-primary font-bold">{kpi.id}</td>
                      <td className="px-space-md py-space-sm font-label-sm text-label-sm text-tertiary whitespace-nowrap">{kpi.section}</td>
                      <td className="px-space-lg py-space-sm font-body-md text-body-md text-on-surface">{kpi.name}</td>
                      <td className={`px-space-md py-space-sm font-label-sm text-label-sm whitespace-nowrap ${TIER_COLORS[kpi.tier] || 'text-tertiary'}`}>{kpi.tier}</td>
                      <td className="px-space-md py-space-sm font-mono-data text-mono-data text-on-surface font-semibold tabular-nums whitespace-nowrap">{kpi.current}</td>
                      <td className="px-space-md py-space-sm font-mono-data text-mono-data text-secondary font-bold tabular-nums whitespace-nowrap">{kpi.target}</td>
                      <td className="px-space-md py-space-sm font-label-sm text-label-sm text-tertiary whitespace-nowrap">{kpi.cadence}</td>
                      <td className="px-space-md py-space-sm">
                        <span className={`px-2 py-0.5 rounded border font-label-sm text-label-sm font-semibold whitespace-nowrap ${STATUS_COLORS[kpi.status] || ''}`}>{kpi.status}</span>
                      </td>
                      <td className="px-space-lg py-space-sm font-mono-data-sm text-mono-data-sm text-tertiary">{kpi.formula}</td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={9} className="px-space-lg py-space-xl text-center font-body-md text-body-md text-tertiary">No metrics match your filters.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Legend */}
          <div className="bg-surface-container-low rounded-lg p-space-lg border border-outline-variant/20 grid grid-cols-2 md:grid-cols-4 gap-space-md">
            {[
              { tier: 'North Star', desc: 'Headline outcome metric. Drives the entire plan.' },
              { tier: 'Lever', desc: 'Direct input that changes the North Star output.' },
              { tier: 'Guardrail', desc: 'Boundary. Breach requires immediate response.' },
              { tier: 'Diagnostic', desc: 'Root cause investigation. Measured but not actioned unless lever or guardrail changes.' },
            ].map(item => (
              <div key={item.tier} className="flex flex-col gap-1">
                <span className={`font-label-sm text-label-sm font-semibold ${TIER_COLORS[item.tier] || 'text-on-surface'}`}>{item.tier}</span>
                <span className="font-body-sm text-body-sm text-tertiary">{item.desc}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </main>
  );
}
