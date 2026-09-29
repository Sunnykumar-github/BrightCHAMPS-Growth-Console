"use client";
import React, { useState } from 'react';
import { useKpiStore } from "@/store/useKpiStore";

export default function Header() {
  const { exportToCSV, blendedCpl, iqiFloor, applyPreset } = useKpiStore();
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [activeScenario, setActiveScenario] = useState<'best' | 'base' | 'worst'>('base');

  const handlePreset = (type: 'best' | 'base' | 'worst') => {
    setActiveScenario(type);
    applyPreset(type);
    setFilterOpen(false);
  };

  const scenarioLabels = {
    best: 'Best-Case',
    base: 'Base-Case Plan',
    worst: 'Stress-Case',
  };

  return (
    <header className="h-16 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-6 w-full shrink-0">
      {/* Left: Breadcrumb + Active Scenario */}
      <div className="flex items-center gap-4 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary">BrightChamps</span>
          <span className="text-tertiary text-xs">/</span>
          <span className="font-body-md text-body-md font-semibold text-on-surface">Growth Console</span>
        </div>
        <div className="hidden xl:flex items-center gap-1.5 bg-surface-container-high px-3 py-1 rounded">
          <span className={`w-2 h-2 rounded-full ${activeScenario === 'best' ? 'bg-secondary' : activeScenario === 'worst' ? 'bg-error' : 'bg-primary'}`} />
          <span className="font-label-sm text-label-sm text-on-surface font-medium">
            Active: {scenarioLabels[activeScenario]}
          </span>
        </div>
      </div>

      {/* Right: KPI Pills + Actions */}
      <div className="flex items-center gap-4">
        {/* Live KPI Pills */}
        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-primary-fixed px-3 py-1 rounded shadow-sm">
            <span className="font-label-sm text-label-sm text-on-primary-fixed uppercase tracking-wider">Target CPL</span>
            <span className="font-mono-data text-mono-data text-primary font-bold tabular-nums">${blendedCpl.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-secondary-fixed px-3 py-1 rounded shadow-sm">
            <span className="font-label-sm text-label-sm text-on-secondary-fixed uppercase tracking-wider">IQI Floor</span>
            <span className="font-mono-data text-mono-data text-secondary font-bold tabular-nums">≥{iqiFloor.toFixed(1)}</span>
          </div>
          <div className="hidden lg:flex items-center gap-1.5 bg-surface-container-high px-3 py-1 rounded">
            <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider">Horizon</span>
            <span className="font-mono-data text-mono-data text-on-surface font-semibold tabular-nums">Q3 FY25</span>
          </div>
        </div>

        {/* Simulation Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setFilterOpen(!isFilterOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-lowest text-on-surface font-label-md text-label-md rounded shadow-sm hover:bg-surface-container-low transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">tune</span>
            <span className="hidden sm:inline">Simulation Presets</span>
            <span className="material-symbols-outlined text-[16px]">arrow_drop_down</span>
          </button>
          {isFilterOpen && (
            <div className="absolute top-10 right-0 bg-surface shadow-lg rounded-lg border border-outline w-48 z-50 flex flex-col py-1 overflow-hidden">
              {(['best', 'base', 'worst'] as const).map((preset) => (
                <button
                  key={preset}
                  onClick={() => handlePreset(preset)}
                  className={`text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2 ${activeScenario === preset ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-surface-container text-on-surface'
                    }`}
                >
                  <span className={`w-2 h-2 rounded-full ${preset === 'best' ? 'bg-secondary' : preset === 'worst' ? 'bg-error' : 'bg-primary'}`} />
                  {scenarioLabels[preset]}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Export */}
        <button
          onClick={() => exportToCSV()}
          className="flex items-center gap-1 px-3 py-1.5 bg-surface-container-lowest text-on-surface font-label-md text-label-md rounded shadow-sm hover:bg-surface-container-low transition-colors"
          title="Export KPI CSV"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">file_download</span>
          <span className="hidden lg:inline">Export</span>
        </button>

        {/* Share */}
        <button
          onClick={() => {
            if (navigator.clipboard) {
              navigator.clipboard.writeText(window.location.href).then(() => alert('Link copied to clipboard!'));
            } else {
              alert('Share link: ' + window.location.href);
            }
          }}
          className="p-1.5 bg-surface-container-lowest text-on-surface rounded shadow-sm hover:bg-surface-container-low transition-colors"
          title="Share Scenario"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">share</span>
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
        </div>
      </div>
    </header>
  );
}
