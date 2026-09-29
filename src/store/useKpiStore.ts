import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface KpiState {
    adSpend: number;
    baseCpl: number;
    blendedCpl: number;
    slgGrowth: number;
    conversionRate: number;
    iqiFloor: number;

    getMonthlyLeads: () => number;
    getBookedDemos: () => number;
    getPaidEnrolments: () => number;
    getNetEfficiencySavings: () => number;

    setAdSpend: (val: number) => void;
    setBaseCpl: (val: number) => void;
    setBlendedCpl: (val: number) => void;
    setSlgGrowth: (val: number) => void;
    setConversionRate: (val: number) => void;
    setIqiFloor: (val: number) => void;

    applyPreset: (type: 'best' | 'base' | 'worst') => void;
    exportToCSV: () => void;
    syncToSupabase: () => Promise<void>;
    loadFromSupabase: () => Promise<void>;
}

// ── USA-Only Verified Baseline (extracted from BrightChamps_USA_Dataset.csv) ──
// Total USA Leads: 1,661 | Demos Scheduled: 1,075 (64.7%) | Joined: 697 (64.8%)
// Completed: 608 (87.2%) | Paid Converts: 158 (9.51% CVR) | Estimated CPL: $28.50

export const useKpiStore = create<KpiState>((set, get) => ({
    adSpend: 83050,          // USA monthly spend = 1,661 leads × $50.00 Current CPL
    baseCpl: 50.00,          // Current CPL baseline (unoptimized)
    blendedCpl: 25.00,       // Required target blended CPL (after optimization)
    slgGrowth: 6.2,
    conversionRate: 9.51,    // USA actual CVR from dataset
    iqiFloor: 84.0,

    // USA-only derived metrics
    getMonthlyLeads: () => Math.round(get().adSpend / get().blendedCpl),
    getBookedDemos: () => Math.round(get().getMonthlyLeads() * 0.647),   // 64.7% demo schedule rate (USA actual)
    getPaidEnrolments: () => Math.round(get().getMonthlyLeads() * (get().conversionRate / 100)),
    getNetEfficiencySavings: () => (get().getMonthlyLeads() * get().baseCpl) - get().adSpend,

    setAdSpend: (val) => { set({ adSpend: val }); get().syncToSupabase(); },
    setBaseCpl: (val) => { set({ baseCpl: val }); get().syncToSupabase(); },
    setBlendedCpl: (val) => { set({ blendedCpl: val }); get().syncToSupabase(); },
    setSlgGrowth: (val) => { set({ slgGrowth: val }); get().syncToSupabase(); },
    setConversionRate: (val) => { set({ conversionRate: val }); get().syncToSupabase(); },
    setIqiFloor: (val) => { set({ iqiFloor: val }); get().syncToSupabase(); },

    applyPreset: (type) => {
        switch (type) {
            // Preset CPL values match the Stitch HTML design spec exactly
            case 'best':
                // Best: Highly optimized funnel
                set({ blendedCpl: 21.50, conversionRate: 12.0, slgGrowth: 8.0, adSpend: 83050, iqiFloor: 88.0 });
                break;
            case 'base':
                // Base: Target objective $25.00 CPL
                set({ blendedCpl: 25.00, conversionRate: 9.51, slgGrowth: 6.2, adSpend: 83050, iqiFloor: 84.0 });
                break;
            case 'worst':
                // Stress: Failure to optimize, stuck at Current target CPL of 50
                set({ blendedCpl: 50.00, conversionRate: 5.5, slgGrowth: 2.0, adSpend: 83050, iqiFloor: 75.0 });
                break;
        }
        get().syncToSupabase();
    },

    exportToCSV: () => {
        const data = [
            ['Metric', 'Value'],
            ['Ad Spend Baseline ($)', get().adSpend.toString()],
            ['Target CPL ($)', get().blendedCpl.toString()],
            ['Target Conversion Rate (%)', get().conversionRate.toString()],
            ['Target IQI Floor', get().iqiFloor.toString()],
            ['Monthly Leads Volume', get().getMonthlyLeads().toString()],
            ['Booked Demos', get().getBookedDemos().toString()],
            ['Paid Enrolments', get().getPaidEnrolments().toString()],
            ['Recalculated Efficiency Savings ($)', get().getNetEfficiencySavings().toString()]
        ];
        let csvContent = "data:text/csv;charset=utf-8," + data.map(e => e.join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "brightchamps_kpi_export.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },

    syncToSupabase: async () => {
        try {
            await supabase.from('kpi_settings').upsert({
                id: 1,
                base_cpl: get().baseCpl,
                blended_cpl: get().blendedCpl,
                slg_growth: get().slgGrowth,
                ad_spend: get().adSpend,
                conversion_rate: get().conversionRate,
                iqi_floor: get().iqiFloor
            });
        } catch (e: any) {
            console.error("Supabase sync failed (check if RLS is enabled or table exists):", e);
        }
    },

    loadFromSupabase: async () => {
        try {
            const { data, error } = await supabase.from('kpi_settings').select('*').eq('id', 1).single();
            if (data && !error) {
                set({
                    adSpend: data.ad_spend || 83050,
                    baseCpl: data.base_cpl || 50.00,
                    blendedCpl: data.blended_cpl || 25.00,
                    slgGrowth: data.slg_growth || 6.2,
                    conversionRate: data.conversion_rate || 9.51,
                    iqiFloor: data.iqi_floor || 84.0
                });
            } else if (error) {
                console.error("Failed to load from Supabase (Check RLS Policies):", error);
            }
        } catch (e: any) {
            console.error("Failed to load from Supabase:", e);
        }
    }
}));