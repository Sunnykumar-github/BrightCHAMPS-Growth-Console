"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { num: '01', icon: 'dashboard', label: 'Executive Summary', href: '/' },
  { num: '02', icon: 'verified_user', label: 'Situation & Guardrail', href: '/situation-and-guardrail' },
  { num: '03', icon: 'calculate', label: 'The Model', href: '/the-model' },
  { num: '04', icon: 'campaign', label: 'Marketing Engine', href: '/marketing-engine' },
  { num: '05', icon: 'rocket_launch', label: 'Product Engine', href: '/product-engine' },
  { num: '06', icon: 'groups', label: 'Audience Expansion', href: '/audience-expansion' },
  { num: '07', icon: 'alt_route', label: 'Strategic Roadmap', href: '/strategic-roadmap' },
  { num: '08', icon: 'table_chart', label: 'KPI Master Dashboard', href: '/kpi-master-dashboard' },
  { num: '09', icon: 'query_stats', label: 'Risks & Scenarios', href: '/risks-and-scenarios' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`left-0 h-full bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between min-h-screen transition-all duration-300 overflow-hidden ${isCollapsed ? 'w-16' : 'w-72'
        }`}
    >
      <div className="flex flex-col">
        {/* Logo Header */}
        <div className="p-4 bg-surface-container-low border-b border-outline/20">
          <div className="flex items-center justify-between gap-2">
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold truncate">BrightChamps</span>
                <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight truncate">Growth Console</span>
              </div>
            )}
            <button
              onClick={() => setCollapsed(!isCollapsed)}
              className="p-1 text-tertiary hover:text-on-surface transition-colors rounded hover:bg-surface-container shrink-0"
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <span className="material-symbols-outlined text-[20px]">
                {isCollapsed ? 'menu_open' : 'dock_to_right'}
              </span>
            </button>
          </div>
          {!isCollapsed && (
            <div className="mt-2 flex items-center justify-between bg-surface-container-lowest px-2 py-1 rounded shadow-sm">
              <span className="font-mono-data-sm text-mono-data-sm text-on-surface-variant flex items-center gap-1 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                USA · Math Vertical
              </span>
              <span className="font-mono-data-sm text-mono-data-sm font-semibold text-primary tabular-nums shrink-0">$25 CPL</span>
            </div>
          )}
        </div>

        {/* Nav Section Label */}
        {!isCollapsed && (
          <div className="px-4 pt-3 pb-1">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary block">Operational Vectors</span>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex flex-col px-2 gap-0.5 py-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={isCollapsed ? item.label : undefined}
                className={`flex items-center gap-3 px-2 py-2 rounded transition-colors ${isActive
                    ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm border-r-4 border-primary'
                    : 'text-on-surface hover:bg-surface-container-high'
                  }`}
              >
                <span className="font-mono-data-sm text-mono-data-sm text-tertiary tabular-nums shrink-0">{item.num}</span>
                <span className="material-symbols-outlined text-[18px] shrink-0">{item.icon}</span>
                {!isCollapsed && (
                  <span className="font-body-md text-body-md truncate">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 bg-surface-container-low border-t border-outline/20 flex flex-col gap-3">
          <div className="bg-surface-container-lowest p-3 rounded shadow-sm">
            <div className="flex items-center justify-between text-tertiary mb-1">
              <span className="font-label-sm text-label-sm uppercase tracking-wider">Target Audience</span>
              <span className="material-symbols-outlined text-[14px]">lock</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface font-medium truncate">Founder's Office & Execs</p>
            <div className="mt-1 pt-1 flex items-center justify-between font-mono-data-sm text-mono-data-sm text-tertiary">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />Live v2.4
              </span>
              <span className="tabular-nums">FY26 Plan</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
              </div>
              <div className="min-w-0">
                <p className="font-body-md text-body-md font-semibold text-on-surface truncate">Sunny Kumar</p>
                <p className="font-label-sm text-label-sm text-tertiary truncate">Founder's Office</p>
              </div>
            </div>
            <button className="p-1 text-tertiary hover:text-on-surface transition-colors" type="button">
              <span className="material-symbols-outlined text-[18px]">unfold_more</span>
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
