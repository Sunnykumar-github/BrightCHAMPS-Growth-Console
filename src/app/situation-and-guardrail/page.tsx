"use client";
import React from 'react';
import { useKpiStore } from "@/store/useKpiStore";

export default function Page() {
  const { blendedCpl, conversionRate, setBlendedCpl, setConversionRate, exportToCSV, applyPreset, iqiFloor, getMonthlyLeads, getBookedDemos, getPaidEnrolments, getNetEfficiencySavings } = useKpiStore();

  return (
    <main className="w-full bg-surface"><div className="flex flex-col w-full">
{/* Top Context & Ledger Breadcrumb Header */}
<section className="px-margin-desktop py-space-lg flex flex-col md:flex-row md:items-end justify-between gap-space-md bg-surface-container-low/40">
<div className="flex flex-col max-w-3xl min-w-0">
<div className="flex items-center gap-space-sm mb-space-xs">
<span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-mono-data-sm text-mono-data-sm uppercase tracking-wider font-semibold">Stage 02 // Protocol</span>
<span className="text-tertiary font-mono-data-sm text-mono-data-sm">EXEC-REF: US-MTH-25CPL</span>
</div>
<h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight text-balance">
        Situation Assessment &amp; Non-Negotiable Guardrails
      </h1>
<p className="font-body-lg text-body-lg text-tertiary mt-1">
        Framing the unit economic problem before capital allocation. Disciplined balance between aggressive acquisition efficiency and sales pipeline integrity.
      </p>
</div>
{/* Live Telemetry / Verification Stamp */}
<div className="flex items-center gap-space-md shrink-0 bg-surface-container-lowest p-space-md rounded shadow-sm">
<div className="w-10 h-10 rounded bg-secondary/10 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[24px]">verified</span>
</div>
<div className="flex flex-col">
<div className="flex items-center gap-1.5">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Governance Status</span>
<span className="w-2 h-2 rounded-full bg-secondary"></span>
</div>
<span className="font-mono-data text-mono-data text-on-surface font-semibold">Strict Lock Active</span>
<span className="font-mono-data-sm text-mono-data-sm text-tertiary">Review Cycle: Bi-Weekly</span>
</div>
</div>
</section>
{/* Content Canvas Area */}
<div className="px-margin-desktop py-space-xl flex flex-col gap-space-xl">
{/* Matched Pair Dual Readout: Inseparable Set */}
<section className="flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[18px]">link</span>
<span className="font-label-sm text-label-sm uppercase tracking-wider font-bold text-on-surface">Dual-Vector Governance Mandate</span>
</div>
<span className="font-mono-data-sm text-mono-data-sm text-tertiary">Twin-Criterion Threshold Architecture</span>
</div>
<div className="relative bg-surface-container-lowest rounded shadow-sm p-space-lg">
<div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg relative z-10">
{/* Metric A: Blended CPL (Amber / Cost Compression) */}
<div className="bg-surface-container-low/70 rounded p-space-lg flex flex-col justify-between relative overflow-hidden group">
<div className="absolute top-0 left-0 bottom-0 w-1.5 bg-primary-container"></div>
<div className="flex items-start justify-between mb-space-md pl-2">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-primary-container font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-[15px]">trending_down</span>
                  Headline Metric // Acquisition
                </span>
<span className="font-headline-sm text-headline-sm text-on-surface mt-0.5">Blended Cost-Per-Lead (CPL)</span>
</div>
<span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-mono-data-sm text-mono-data-sm font-bold tabular-nums">
                Target: -50.0%
              </span>
</div>
<div className="grid grid-cols-3 gap-space-sm pl-2 py-space-sm bg-surface-container-lowest/80 rounded my-space-sm">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-tertiary uppercase">Current Baseline</span>
<span className="font-stat-display text-stat-display text-on-surface tabular-nums mt-1">$50<span className="text-headline-sm text-tertiary">.00</span></span>
<span className="font-mono-data-sm text-mono-data-sm text-tertiary">US Math Blend</span>
</div>
<div className="flex flex-col justify-center items-center">
<span className="material-symbols-outlined text-primary-container text-[24px]">arrow_forward</span>
<span className="font-mono-data-sm text-mono-data-sm text-primary-container font-semibold mt-1">9-Mo Horizon</span>
</div>
<div className="flex flex-col items-end">
<span className="font-label-sm text-label-sm text-primary-container uppercase font-bold">Planned Target</span>
<span className="font-stat-display text-stat-display text-primary-container tabular-nums mt-1">$25<span className="text-headline-sm text-primary-container/80">.00</span></span>
<span className="font-mono-data-sm text-mono-data-sm text-primary font-semibold">Maximum Cap</span>
</div>
</div>
{/* Mini Progress Visual */}
<div className="flex flex-col gap-1 pl-2 mt-space-xs">
<div className="flex justify-between font-mono-data-sm text-mono-data-sm text-tertiary">
<span>Pacing Curve</span>
<span className="text-primary-container font-medium">Compression Phase 1 of 3</span>
</div>
<div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden flex">
<div className="h-full bg-primary-container rounded-full transition-all duration-500" style={{width: '50%'}}></div>
</div>
</div>
</div>
{/* Metric B: Guardrail Metric (Lead Quality Index - Emerald) */}
<div className="bg-surface-container-low/70 rounded p-space-lg flex flex-col justify-between relative overflow-hidden group">
<div className="absolute top-0 left-0 bottom-0 w-1.5 bg-secondary"></div>
<div className="flex items-start justify-between mb-space-md pl-2">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-[15px]">security</span>
                  Guardrail Floor // Economics
                </span>
<span className="font-headline-sm text-headline-sm text-on-surface mt-0.5">Lead Quality Index (IQI)</span>
</div>
<span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-mono-data-sm text-mono-data-sm font-bold tabular-nums">
                Floor: ≥ 80.0
              </span>
</div>
<div className="grid grid-cols-3 gap-space-sm pl-2 py-space-sm bg-surface-container-lowest/80 rounded my-space-sm">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-tertiary uppercase">Current Baseline</span>
<span className="font-stat-display text-stat-display text-on-surface tabular-nums mt-1">84<span className="text-headline-sm text-tertiary">.5</span></span>
<span className="font-mono-data-sm text-mono-data-sm text-secondary font-medium">Safe Margin (+4.5)</span>
</div>
<div className="flex flex-col justify-center items-center">
<span className="material-symbols-outlined text-secondary text-[24px]">verified_user</span>
<span className="font-mono-data-sm text-mono-data-sm text-secondary font-semibold mt-1">Non-Negotiable</span>
</div>
<div className="flex flex-col items-end">
<span className="font-label-sm text-label-sm text-secondary uppercase font-bold">Planned Target</span>
<span className="font-stat-display text-stat-display text-secondary tabular-nums mt-1">86<span className="text-headline-sm text-secondary/80">.2</span></span>
<span className="font-mono-data-sm text-mono-data-sm text-tertiary">Scale Index Optimum</span>
</div>
</div>
{/* Mini Progress Visual */}
<div className="flex flex-col gap-1 pl-2 mt-space-xs">
<div className="flex justify-between font-mono-data-sm text-mono-data-sm text-tertiary">
<span>Threshold Envelope</span>
<span className="text-secondary font-medium">Buffer Above Redline: 4.5 pts</span>
</div>
<div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden flex relative">
<div className="absolute left-[80%] top-0 bottom-0 w-0.5 bg-error z-10" title="Hard Floor 80.0"></div>
<div className="h-full bg-secondary rounded-full transition-all duration-500" style={{width: '84.5%'}}></div>
</div>
</div>
</div>
</div>
{/* Binding Lock Operational Rule */}
<div className="mt-space-md pt-space-md flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm bg-surface-container p-space-md rounded">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-primary text-[20px] shrink-0">emergency_home</span>
<p className="font-body-md text-body-md text-on-surface">
<strong className="font-semibold text-primary">Inseparable Covenant:</strong> These metrics travel strictly as a pair. No bonus trigger, creative scaling allowance, or budget expansion milestone is unlocked unless both CPL ≤ ${blendedCpl.toFixed(2)} and IQI ≥ 80.0 conditions are simultaneously verified.
            </p>
</div>
<div className="flex items-center gap-2 shrink-0">
<span className="px-2.5 py-1 rounded bg-surface-container-lowest font-mono-data-sm text-mono-data-sm text-on-surface font-semibold shadow-sm">
              COUPLED PROTOCOL
            </span>
</div>
</div>
</div>
</section>
{/* Two-Column Architectural Analysis: The Mandate vs. The Trap */}
<section className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">
{/* The Ask: Aggressive Cost Compression */}
<div className="bg-surface-container-lowest rounded shadow-sm p-space-lg flex flex-col justify-between relative overflow-hidden">
<div className="flex flex-col">
{/* Top Tag & Title */}
<div className="flex items-center justify-between mb-space-sm">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-primary-container font-bold">Directive 01 // Acquisition Vector</span>
</div>
<span className="px-2 py-0.5 rounded bg-primary-fixed/60 font-mono-data-sm text-mono-data-sm text-on-primary-fixed font-semibold">
              The Mandate
            </span>
</div>
<h2 className="font-headline-md text-headline-md text-on-surface tracking-tight mb-space-md">
            Aggressive Cost Compression
          </h2>
<p className="font-body-md text-body-md text-tertiary mb-space-lg">
            Capital efficiency mandate dictated by macro private market realities. Scaling the US Mathematics business requires drastically lower friction at the top of the funnel without injecting capital bloat.
          </p>
{/* Channel Cost Breakdown Ribbon */}
<div className="bg-surface-container-low rounded p-space-md mb-space-lg">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary block mb-2 font-semibold">Current US Channel Baselines (CPL)</span>
<div className="grid grid-cols-3 gap-2">
<div className="bg-surface-container-lowest p-2 rounded flex flex-col">
<span className="font-mono-data-sm text-mono-data-sm text-tertiary">Meta Paid</span>
<span className="font-headline-sm text-headline-sm text-on-surface tabular-nums font-bold mt-0.5">$54.00</span>
<span className="font-mono-data-sm text-mono-data-sm text-primary-container mt-1">High Vol</span>
</div>
<div className="bg-surface-container-lowest p-2 rounded flex flex-col">
<span className="font-mono-data-sm text-mono-data-sm text-tertiary">Google Search</span>
<span className="font-headline-sm text-headline-sm text-on-surface tabular-nums font-bold mt-0.5">$48.00</span>
<span className="font-mono-data-sm text-mono-data-sm text-secondary mt-1">High Intent</span>
</div>
<div className="bg-surface-container-lowest p-2 rounded flex flex-col">
<span className="font-mono-data-sm text-mono-data-sm text-tertiary">YouTube Ads</span>
<span className="font-headline-sm text-headline-sm text-on-surface tabular-nums font-bold mt-0.5">$42.00</span>
<span className="font-mono-data-sm text-mono-data-sm text-tertiary mt-1">Scale Stage</span>
</div>
</div>
</div>
{/* Structured Bullet System with Visual Anchors */}
<div className="flex flex-col gap-space-md">
<div className="flex items-start gap-space-sm">
<div className="w-6 h-6 rounded bg-primary-fixed flex items-center justify-center shrink-0 mt-0.5">
<span className="font-mono-data-sm text-mono-data-sm font-bold text-on-primary-fixed">1</span>
</div>
<div className="flex flex-col">
<p className="font-body-md text-body-md text-on-surface">
<strong className="font-semibold text-on-surface">Blended Baseline:</strong> Current blended cost-per-lead stands at <span className="font-mono-data text-mono-data font-bold text-on-surface tabular-nums">$50.00</span> across US Math paid channels (Meta: $54, Google Search: $48, YouTube: $42).
                </p>
</div>
</div>
<div className="flex items-start gap-space-sm">
<div className="w-6 h-6 rounded bg-primary-fixed flex items-center justify-center shrink-0 mt-0.5">
<span className="font-mono-data-sm text-mono-data-sm font-bold text-on-primary-fixed">2</span>
</div>
<div className="flex flex-col">
<p className="font-body-md text-body-md text-on-surface">
<strong className="font-semibold text-on-surface">Explicit Board Mandate:</strong> Direct directive to compress blended CPL to <span className="font-mono-data text-mono-data font-bold text-primary-container tabular-nums">${blendedCpl.toFixed(2)}</span> within a 9-month timeframe strictly without increasing marketing OPEX or SDR compensation.
                </p>
</div>
</div>
<div className="flex items-start gap-space-sm">
<div className="w-6 h-6 rounded bg-primary-fixed flex items-center justify-center shrink-0 mt-0.5">
<span className="font-mono-data-sm text-mono-data-sm font-bold text-on-primary-fixed">3</span>
</div>
<div className="flex flex-col">
<p className="font-body-md text-body-md text-on-surface">
<strong className="font-semibold text-on-surface">Scale Requirement:</strong> Requires an unprecedented <span className="font-mono-data text-mono-data font-bold text-primary-container tabular-nums">50.0% blended efficiency gain</span> across messaging, offer design, routing mechanics, and creative lifecycle testing.
                </p>
</div>
</div>
<div className="flex items-start gap-space-sm">
<div className="w-6 h-6 rounded bg-error-container flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-error text-[16px]">warning</span>
</div>
<div className="flex flex-col">
<p className="font-body-md text-body-md text-on-surface">
<strong className="font-semibold text-error">Downside Hazard:</strong> Naive cost optimization routinely drives media buyers to broad clickbait hooks, purchasing bottom-funnel low-intent leads who immediately drop out before Demo attendance.
                </p>
</div>
</div>
</div>
</div>
<div className="mt-space-lg pt-space-md bg-surface-container-low p-space-sm rounded flex items-center justify-between">
<span className="font-mono-data-sm text-mono-data-sm text-tertiary">Operational Weighting: 50%</span>
<span className="font-label-sm text-label-sm text-primary-container font-semibold uppercase">Velocity Criterion</span>
</div>
</div>
{/* The Trap: The Quality Guardrail */}
<div className="bg-surface-container-lowest rounded shadow-sm p-space-lg flex flex-col justify-between relative overflow-hidden">
<div className="flex flex-col">
{/* Top Tag & Title */}
<div className="flex items-center justify-between mb-space-sm">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">Directive 02 // Pipeline Guardrail</span>
</div>
<span className="px-2 py-0.5 rounded bg-secondary-fixed/60 font-mono-data-sm text-mono-data-sm text-on-secondary-fixed font-semibold">
              The Trap
            </span>
</div>
<h2 className="font-headline-md text-headline-md text-on-surface tracking-tight mb-space-md">
            The Quality Trap: Unit Economic Collapse
          </h2>
<p className="font-body-md text-body-md text-tertiary mb-space-lg">
            Cheap leads appear triumphant on media dashboards while silently devastating unit economics inside the sales chamber. True CAC increases when sales conversion velocity drops.
          </p>
{/* Diagnostic Contrast Block */}
<div className="bg-surface-container-low rounded p-space-md mb-space-lg">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary block mb-2 font-semibold">Downstream Pipeline Exposure</span>
<div className="grid grid-cols-2 gap-2">
<div className="bg-surface-container-lowest p-2 rounded flex flex-col">
<span className="font-mono-data-sm text-mono-data-sm text-tertiary">SDR Capacity Drain</span>
<span className="font-headline-sm text-headline-sm text-error tabular-nums font-bold mt-0.5">+4.8 hrs</span>
<span className="font-mono-data-sm text-mono-data-sm text-error mt-1">Wasted/Rep/Day</span>
</div>
<div className="bg-surface-container-lowest p-2 rounded flex flex-col">
<span className="font-mono-data-sm text-mono-data-sm text-tertiary">Trial Close Threshold</span>
<span className="font-headline-sm text-headline-sm text-on-surface tabular-nums font-bold mt-0.5">&lt; {conversionRate.toFixed(1)}%</span>
<span className="font-mono-data-sm text-mono-data-sm text-secondary mt-1">Economic Redline</span>
</div>
</div>
</div>
{/* Structured Bullet System with Visual Anchors */}
<div className="flex flex-col gap-space-md">
<div className="flex items-start gap-space-sm">
<div className="w-6 h-6 rounded bg-secondary-fixed flex items-center justify-center shrink-0 mt-0.5">
<span className="font-mono-data-sm text-mono-data-sm font-bold text-on-secondary-fixed">1</span>
</div>
<div className="flex flex-col">
<p className="font-body-md text-body-md text-on-surface">
<strong className="font-semibold text-on-surface">SDR Capacity Destruction:</strong> Lead generation without qualification inflates SDR outbound queues with dead numbers, collapsing close rates below the <span className="font-mono-data text-mono-data font-bold text-error tabular-nums">{conversionRate.toFixed(1)}% breakeven barrier</span>.
                </p>
</div>
</div>
<div className="flex items-start gap-space-sm">
<div className="w-6 h-6 rounded bg-secondary-fixed flex items-center justify-center shrink-0 mt-0.5">
<span className="font-mono-data-sm text-mono-data-sm font-bold text-on-secondary-fixed">2</span>
</div>
<div className="flex flex-col">
<p className="font-body-md text-body-md text-on-surface">
<strong className="font-semibold text-on-surface">Non-Negotiable Threshold:</strong> The Lead Quality Index (IQI) must remain firmly <span className="font-mono-data text-mono-data font-bold text-secondary tabular-nums">≥ 80.0</span> at all times (baseline: 84.5, strategic target: 86.2).
                </p>
</div>
</div>
<div className="flex items-start gap-space-sm">
<div className="w-6 h-6 rounded bg-secondary-fixed flex items-center justify-center shrink-0 mt-0.5">
<span className="font-mono-data-sm text-mono-data-sm font-bold text-on-secondary-fixed">3</span>
</div>
<div className="flex flex-col">
<p className="font-body-md text-body-md text-on-surface">
<strong className="font-semibold text-on-surface">Hard Proxies:</strong> Strict intake validation: Verified parent mobile contact, household bracket <span className="font-mono-data text-mono-data font-bold text-on-surface tabular-nums">&gt;$85k</span> or clear Math enrichment intent, and student age verification (6-16).
                </p>
</div>
</div>
<div className="flex items-start gap-space-sm">
<div className="w-6 h-6 rounded bg-error-container flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-error text-[16px]">pause_circle</span>
</div>
<div className="flex flex-col">
<p className="font-body-md text-body-md text-on-surface">
<strong className="font-semibold text-error">Kill Switch Protocol:</strong> Any pilot ad set producing CPL &lt; ${blendedCpl.toFixed(2)} but dragging IQI under 80.0 is automatically throttled and terminated within <span className="font-mono-data text-mono-data font-bold text-on-surface tabular-nums">48 hours</span>.
                </p>
</div>
</div>
</div>
</div>
<div className="mt-space-lg pt-space-md bg-surface-container-low p-space-sm rounded flex items-center justify-between">
<span className="font-mono-data-sm text-mono-data-sm text-tertiary">Operational Weighting: 50%</span>
<span className="font-label-sm text-label-sm text-secondary font-semibold uppercase">Protective Criterion</span>
</div>
</div>
</section>
{/* Visual Process Interlock: How The Two Work In Tandem */}
<section className="bg-surface-container-lowest rounded shadow-sm p-space-lg flex flex-col gap-space-md">
<div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
<div>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary font-bold">Execution Dynamics</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface tracking-tight">The Self-Correcting Interlock Mechanism</h3>
</div>
<div className="flex items-center gap-2">
<span className="px-2 py-1 rounded bg-surface-container font-mono-data-sm text-mono-data-sm text-tertiary">Feedback Cadence: Daily at 00:00 UTC</span>
</div>
</div>
{/* Process Diagram Strip */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-space-md pt-space-sm">
<div className="bg-surface-container-low/60 rounded p-space-md flex flex-col justify-between relative">
<div className="flex items-center justify-between mb-space-sm">
<span className="font-mono-data-sm text-mono-data-sm font-bold text-tertiary">STAGE 01</span>
<span className="material-symbols-outlined text-primary text-[18px]">ads_click</span>
</div>
<span className="font-body-md text-body-md font-semibold text-on-surface">Targeted Acquisition</span>
<p className="font-mono-data-sm text-mono-data-sm text-tertiary mt-1">Algorithmic targeting focused on US curriculum pain-points.</p>
<div className="mt-space-sm pt-space-xs flex items-center justify-between font-mono-data-sm text-mono-data-sm">
<span className="text-tertiary">Pacing</span>
<span className="text-primary-container font-semibold">CPL ≤ $25</span>
</div>
</div>
<div className="bg-surface-container-low/60 rounded p-space-md flex flex-col justify-between relative">
<div className="flex items-center justify-between mb-space-sm">
<span className="font-mono-data-sm text-mono-data-sm font-bold text-tertiary">STAGE 02</span>
<span className="material-symbols-outlined text-secondary text-[18px]">fact_check</span>
</div>
<span className="font-body-md text-body-md font-semibold text-on-surface">Intake Friction Gate</span>
<p className="font-mono-data-sm text-mono-data-sm text-tertiary mt-1">Multi-step enrichment survey checks grade, goal, and verified OTP.</p>
<div className="mt-space-sm pt-space-xs flex items-center justify-between font-mono-data-sm text-mono-data-sm">
<span className="text-tertiary">Filter Rate</span>
<span className="text-secondary font-semibold">~24% Dropped</span>
</div>
</div>
<div className="bg-surface-container-low/60 rounded p-space-md flex flex-col justify-between relative">
<div className="flex items-center justify-between mb-space-sm">
<span className="font-mono-data-sm text-mono-data-sm font-bold text-tertiary">STAGE 03</span>
<span className="material-symbols-outlined text-tertiary text-[18px]">balance</span>
</div>
<span className="font-body-md text-body-md font-semibold text-on-surface">IQI Telemetry Audit</span>
<p className="font-mono-data-sm text-mono-data-sm text-tertiary mt-1">Scored lead packet sent to CRM. IQI computed on 4 composite dimensions.</p>
<div className="mt-space-sm pt-space-xs flex items-center justify-between font-mono-data-sm text-mono-data-sm">
<span className="text-tertiary">Threshold</span>
<span className="text-on-surface font-semibold">IQI ≥ 80.0</span>
</div>
</div>
<div className="bg-surface-container-low/60 rounded p-space-md flex flex-col justify-between relative">
<div className="flex items-center justify-between mb-space-sm">
<span className="font-mono-data-sm text-mono-data-sm font-bold text-error">STAGE 04</span>
<span className="material-symbols-outlined text-error text-[18px]">gavel</span>
</div>
<span className="font-body-md text-body-md font-semibold text-on-surface">Automated Action</span>
<p className="font-mono-data-sm text-mono-data-sm text-tertiary mt-1">If IQI &lt; 80, automated webhook shuts campaign adset within 48h.</p>
<div className="mt-space-sm pt-space-xs flex items-center justify-between font-mono-data-sm text-mono-data-sm">
<span className="text-tertiary">Enforcement</span>
<span className="text-error font-semibold">Zero Bypass</span>
</div>
</div>
</div>
</section>
{/* Guardrail Dimension Matrix Table */}
<section className="bg-surface-container-lowest rounded shadow-sm p-space-lg flex flex-col gap-space-md">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
<div>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">Verification Matrix</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface tracking-tight">Lead Quality Index (IQI) Dimension Matrix</h3>
<p className="font-body-md text-body-md text-tertiary mt-0.5">The four non-negotiable vectors comprising the composite 100-point IQI index.</p>
</div>
<div className="flex items-center gap-space-sm self-start sm:self-auto">
<div className="flex items-center gap-1.5 px-3 py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-mono-data-sm text-mono-data-sm font-semibold">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            All 4 In Safe Zone
          </div>
</div>
</div>
{/* Dense Ledger Table */}
<div className="overflow-x-auto w-full">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low text-tertiary font-label-sm text-label-sm uppercase tracking-wider">
<th className="py-2.5 px-space-md font-bold text-left">Quality Dimension</th>
<th className="py-2.5 px-space-md font-bold text-center">Weight</th>
<th className="py-2.5 px-space-md font-bold text-right">Current Score</th>
<th className="py-2.5 px-space-md font-bold text-right">Guardrail Floor</th>
<th className="py-2.5 px-space-md font-bold text-left">Measurement Freq</th>
<th className="py-2.5 px-space-md font-bold text-left">Enforcement Protocol Trigger</th>
<th className="py-2.5 px-space-md font-bold text-right">Status</th>
</tr>
</thead>
<tbody className="divide-y divide-transparent font-body-md text-body-md">
{/* Row 1: Demo Attendance */}
<tr className="hover:bg-surface-container-low/40 transition-colors">
<td className="py-space-md px-space-md">
<div className="flex items-center gap-space-sm">
<div className="w-8 h-8 rounded bg-primary-fixed/40 flex items-center justify-center text-primary shrink-0">
<span className="material-symbols-outlined text-[18px]">co_present</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-semibold text-on-surface">Demo Attendance Rate</span>
<span className="font-mono-data-sm text-mono-data-sm text-tertiary truncate">Parents who complete scheduled 1:1 math evaluation</span>
</div>
</div>
</td>
<td className="py-space-md px-space-md text-center font-mono-data-sm text-mono-data-sm text-tertiary">35%</td>
<td className="py-space-md px-space-md text-right font-mono-data text-mono-data font-bold text-on-surface tabular-nums">44.8%</td>
<td className="py-space-md px-space-md text-right font-mono-data text-mono-data font-bold text-primary-container tabular-nums">≥ 42.0%</td>
<td className="py-space-md px-space-md font-mono-data-sm text-mono-data-sm text-tertiary">Rolling 7-Day Window</td>
<td className="py-space-md px-space-md">
<span className="font-mono-data-sm text-mono-data-sm text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded">
                  Drop below 42% halts campaign source in 48h
                </span>
</td>
<td className="py-space-md px-space-md text-right">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-mono-data-sm text-mono-data-sm font-bold tabular-nums">
<span className="w-1 h-1 rounded-full bg-secondary"></span>+2.8% PASS
                </span>
</td>
</tr>
{/* Row 2: Parent Income Qualification */}
<tr className="hover:bg-surface-container-low/40 transition-colors">
<td className="py-space-md px-space-md">
<div className="flex items-center gap-space-sm">
<div className="w-8 h-8 rounded bg-secondary-fixed/40 flex items-center justify-center text-secondary shrink-0">
<span className="material-symbols-outlined text-[18px]">payments</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-semibold text-on-surface">Parent Income Qualification</span>
<span className="font-mono-data-sm text-mono-data-sm text-tertiary truncate">Household &gt;$85k bracket or active math tutoring history</span>
</div>
</div>
</td>
<td className="py-space-md px-space-md text-center font-mono-data-sm text-mono-data-sm text-tertiary">25%</td>
<td className="py-space-md px-space-md text-right font-mono-data text-mono-data font-bold text-on-surface tabular-nums">85.2%</td>
<td className="py-space-md px-space-md text-right font-mono-data text-mono-data font-bold text-secondary tabular-nums">≥ 82.0%</td>
<td className="py-space-md px-space-md font-mono-data-sm text-mono-data-sm text-tertiary">Real-time Batching</td>
<td className="py-space-md px-space-md">
<span className="font-mono-data-sm text-mono-data-sm text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded">
                  Drop below 82% triggers form strictness increase
                </span>
</td>
<td className="py-space-md px-space-md text-right">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-mono-data-sm text-mono-data-sm font-bold tabular-nums">
<span className="w-1 h-1 rounded-full bg-secondary"></span>+3.2% PASS
                </span>
</td>
</tr>
{/* Row 3: Phone Reachability */}
<tr className="hover:bg-surface-container-low/40 transition-colors">
<td className="py-space-md px-space-md">
<div className="flex items-center gap-space-sm">
<div className="w-8 h-8 rounded bg-surface-container-high flex items-center justify-center text-on-surface-variant shrink-0">
<span className="material-symbols-outlined text-[18px]">phone_in_talk</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-semibold text-on-surface">Phone Reachability</span>
<span className="font-mono-data-sm text-mono-data-sm text-tertiary truncate">First 3 call attempts connected via verified US carriers</span>
</div>
</div>
</td>
<td className="py-space-md px-space-md text-center font-mono-data-sm text-mono-data-sm text-tertiary">20%</td>
<td className="py-space-md px-space-md text-right font-mono-data text-mono-data font-bold text-on-surface tabular-nums">92.4%</td>
<td className="py-space-md px-space-md text-right font-mono-data text-mono-data font-bold text-secondary tabular-nums">≥ 91.0%</td>
<td className="py-space-md px-space-md font-mono-data-sm text-mono-data-sm text-tertiary">Daily 24-hr Roll</td>
<td className="py-space-md px-space-md">
<span className="font-mono-data-sm text-mono-data-sm text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded">
                  Drop below 91% injects SMS OTP pre-qualification
                </span>
</td>
<td className="py-space-md px-space-md text-right">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-mono-data-sm text-mono-data-sm font-bold tabular-nums">
<span className="w-1 h-1 rounded-full bg-secondary"></span>+1.4% PASS
                </span>
</td>
</tr>
{/* Row 4: Post-Demo NPS */}
<tr className="hover:bg-surface-container-low/40 transition-colors">
<td className="py-space-md px-space-md">
<div className="flex items-center gap-space-sm">
<div className="w-8 h-8 rounded bg-primary-fixed/40 flex items-center justify-center text-primary-container shrink-0">
<span className="material-symbols-outlined text-[18px]">star</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-semibold text-on-surface">Post-Demo Evaluation Score</span>
<span className="font-mono-data-sm text-mono-data-sm text-tertiary truncate">Parent-rated satisfaction score immediately post-demo (1-5 scale)</span>
</div>
</div>
</td>
<td className="py-space-md px-space-md text-center font-mono-data-sm text-mono-data-sm text-tertiary">20%</td>
<td className="py-space-md px-space-md text-right font-mono-data text-mono-data font-bold text-on-surface tabular-nums">4.72 / 5.0</td>
<td className="py-space-md px-space-md text-right font-mono-data text-mono-data font-bold text-secondary tabular-nums">≥ 4.60</td>
<td className="py-space-md px-space-md font-mono-data-sm text-mono-data-sm text-tertiary">Weekly Aggregated</td>
<td className="py-space-md px-space-md">
<span className="font-mono-data-sm text-mono-data-sm text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded">
                  Drop below 4.6 prompts curriculum rep review
                </span>
</td>
<td className="py-space-md px-space-md text-right">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-mono-data-sm text-mono-data-sm font-bold tabular-nums">
<span className="w-1 h-1 rounded-full bg-secondary"></span>+0.12 PASS
                </span>
</td>
</tr>
</tbody>
</table>
</div>
{/* Table Footnote / Compliance Stamp */}
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pt-space-xs text-tertiary font-mono-data-sm text-mono-data-sm">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">lock_reset</span>
          Enforcement Engine: Connected to HubSpot CRM &amp; Meta Marketing API via Automated Webhooks
        </span>
<span className="text-on-surface font-semibold">Last System Verification: 18 mins ago</span>
</div>
</section>
{/* Operational Sign-off & Execution Confirmation Strip */}
<section className="bg-surface-container-lowest rounded shadow-sm p-space-lg flex flex-col md:flex-row md:items-center justify-between gap-space-md mb-space-xl">
<div className="flex items-center gap-space-md">
<div className="w-12 h-12 rounded bg-surface-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-on-surface text-[26px]">rule</span>
</div>
<div className="flex flex-col">
<h4 className="font-headline-sm text-headline-sm text-on-surface">Execution Protocol Commitment</h4>
<p className="font-body-md text-body-md text-tertiary">
            Growth marketing, product engineering, and sales ops have ratified these operational guardrails for FY25.
          </p>
</div>
</div>
<div className="flex items-center gap-space-sm shrink-0">
<button className="px-space-md py-2 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors flex items-center gap-1.5" type="button">
<span className="material-symbols-outlined text-[16px]">history</span>
<span>View Audit Log</span>
</button>
<button className="px-space-md py-2 rounded bg-primary-container text-on-primary-container hover:opacity-95 font-label-md text-label-md font-semibold transition-opacity flex items-center gap-1.5" type="button">
<span className="material-symbols-outlined text-[16px]">check_circle</span>
<span>Acknowledge Mandate</span>
</button>
</div>
</section>
</div>
</div>
</main>
  );
}
