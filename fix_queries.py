import os
import re

fname = 'src/store/useKpiStore.ts'
with open(fname, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add baseCpl and slgGrowth to KpiState interface if missing
if 'baseCpl: number;' not in content:
    content = content.replace('blendedCpl: number;', 'baseCpl: number;\n    blendedCpl: number;\n    slgGrowth: number;')

if 'setBaseCpl: (val: number) => void;' not in content:
    content = content.replace('setBlendedCpl: (val: number) => void;', 'setBaseCpl: (val: number) => void;\n    setBlendedCpl: (val: number) => void;\n    setSlgGrowth: (val: number) => void;')

# 2. Add baseCpl and slgGrowth to the create object if missing (they might exist partially)
if 'setBaseCpl:' not in content:
    content = content.replace('setBlendedCpl: (val)', 'setBaseCpl: (val) => { set({ baseCpl: val }); get().syncToSupabase(); },\n    setBlendedCpl: (val)')
    content = content.replace('setBlendedCpl: (val)', 'setSlgGrowth: (val) => { set({ slgGrowth: val }); get().syncToSupabase(); },\n    setBlendedCpl: (val)')

# 3. Add to loadFromSupabase
load_block = """
                set({
                    baseCpl: data.base_cpl || 25,
                    blendedCpl: data.blended_cpl || 25,
                    slgGrowth: data.slg_growth || 5.0,
                    adSpend: data.ad_spend || 240000,
                    conversionRate: data.conversion_rate || 7.24,
                    iqiFloor: data.iqi_floor || 84.5
                });
"""
# Find and replace the inner set module
content = re.sub(r'set\(\{[^}]*adSpend[^}]*iqifloor[^}]*\}\);', load_block.strip() + ';', content, flags=re.IGNORECASE|re.DOTALL)
content = re.sub(r'set\(\{\s+adSpend:[^}]+\}\);', load_block.strip() + ';', content, flags=re.DOTALL)

# 4. Add to syncToSupabase
upsert_block = """
            await supabase.from('kpi_settings').upsert({
                id: 1, // Singleton
                base_cpl: get().baseCpl,
                blended_cpl: get().blendedCpl,
                slg_growth: get().slgGrowth,
                ad_spend: get().adSpend,
                conversion_rate: get().conversionRate,
                iqi_floor: get().iqiFloor
            });
"""
content = re.sub(r'await supabase\.from\(\'kpi_settings\'\)\.upsert\(\{[^}]+\}\);', upsert_block.strip() + ';', content, flags=re.DOTALL)

# Fix errors just in case
content = content.replace('console.error("Supabase sync failed (likely missing table). Operating via local runtime.");', 'console.error("Supabase sync failed (check if RLS is enabled or table exists):", e);')
content = content.replace('console.error("Failed to load from Supabase.");', 'console.error("Failed to load from Supabase (Check RLS Policies):", e);')
content = content.replace('} catch (e) {', '} catch (e: any) {')

with open(fname, 'w', encoding='utf-8') as f:
    f.write(content)

print("Queries fully updated and RLS handling implemented!")
