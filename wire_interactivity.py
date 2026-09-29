import re
import os
import glob

# 1. Update Layout to load supabase on mount
with open('src/app/layout.tsx', 'r', encoding='utf-8') as f:
    layout_content = f.read()

if 'useKpiStore' not in layout_content:
    layout_content = '"use client";\nimport { useEffect } from "react";\nimport { useKpiStore } from "@/store/useKpiStore";\n' + layout_content
    # Strip metadata export because "use client" on layout.tsx cancels out metadata in next.js
    layout_content = re.sub(r'export const metadata: Metadata = \{[^}]*\};', '', layout_content)
    # Inject useEffect
    layout_content = layout_content.replace(
        'export default function RootLayout({', 
        'export default function RootLayout({\n  useEffect(() => { useKpiStore.getState().loadFromSupabase(); }, []);\n'
    )
with open('src/app/layout.tsx', 'w', encoding='utf-8') as f:
    f.write(layout_content)


# 2. Iterate pages to hook up exports and presets
for filename in glob.glob('src/app/**/*.tsx', recursive=True):
    if not filename.endswith('page.tsx'): continue
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
        
    original = content
    
    # Ensure exportToCSV and applyPreset are imported
    if '{ useKpiStore }' in content:
        # We need to make sure exportToCSV gets destructured
        if 'exportToCSV' not in content:
            content = content.replace('} = useKpiStore();', ', exportToCSV, applyPreset } = useKpiStore();')
            
    # Hook up preset buttons in the-model
    content = content.replace('id="preset-best"  type="button"', 'id="preset-best" onClick={() => applyPreset("best")} type="button"')
    content = content.replace('id="preset-base"  type="button"', 'id="preset-base" onClick={() => applyPreset("base")} type="button"')
    content = content.replace('id="preset-worst"  type="button"', 'id="preset-worst" onClick={() => applyPreset("worst")} type="button"')

    # Hook up download buttons generically where the text is Export or Download
    # Executive summary
    content = re.sub(r'(<button.*?>.*?)Export Brief', r'\1 onClick={() => exportToCSV()} >Export Brief', content, flags=re.DOTALL)
    
    # Kpi master dashboard download icon button
    if 'kpi-master-dashboard' in filename:
        content = content.replace('type="button">\n<span className="material-symbols-outlined text-[16px]">file_download', 'type="button" onClick={() => exportToCSV()}>\n<span className="material-symbols-outlined text-[16px]">file_download')

    # Strategic roadmap Jira download
    content = re.sub(r'(<button.*?>.*?)Export Jira Roadmap', r'\1 onClick={() => exportToCSV()} >Export Jira Roadmap', content, flags=re.DOTALL)

    if content != original:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)

# 3. Create initialization SQL script for Supabase in root directory
with open('supabase_ddl.sql', 'w') as f:
    f.write("""
CREATE TABLE IF NOT EXISTS public.kpi_settings (
  id integer PRIMARY KEY,
  ad_spend float,
  blended_cpl float,
  conversion_rate float,
  iqi_floor float
);

-- Note: Depending on RLS policies, you might need to enable anon access.
ALTER TABLE public.kpi_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all for anon" ON public.kpi_settings FOR ALL USING (true);
""")

print("Interactivity wired successfully.")
