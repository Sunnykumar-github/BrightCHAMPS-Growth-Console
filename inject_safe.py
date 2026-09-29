import re
import os
import glob

# Ensure client components across all pages
for filename in glob.glob('src/app/**/*.tsx', recursive=True):
    if not filename.endswith('page.tsx'): continue
    
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Skip files already fully processed
    if '"use client";' not in content:
        header = '"use client";\nimport { useKpiStore } from "@/store/useKpiStore";\n'
        content = header + content
        
        # Inject hook:
        content = re.sub(
            r'export default function (\w+)Page\(\) \{',
            r'export default function \1Page() {\n  const { blendedCpl, iqiFloor, getMonthlyLeads, getBookedDemos, getPaidEnrolments, getNetEfficiencySavings, exportToCSV, applyPreset } = useKpiStore();\n',
            content
        )
        
        # Replace static values throughout the remaining dashboard screens:
        content = re.sub(r'\$25\.00(?!")', r'${blendedCpl.toFixed(2)}', content)
        content = re.sub(r'84\.5', r'{iqiFloor.toFixed(1)}', content)
        content = re.sub(r'9,600', r'{getMonthlyLeads().toLocaleString()}', content)
        content = re.sub(r'3,840', r'{getBookedDemos().toLocaleString()}', content)
        content = re.sub(r'960([^\]]*)', r'{getPaidEnrolments().toLocaleString()}\1', content)
        content = content.replace('$240k', '${(getNetEfficiencySavings() / 1000).toFixed(0)}k')

        # Connect Sliders to State (if they missed earlier)
        content = re.sub(
            r'<input(.*?)max="60" min="20"(.*?)type="range" value="[3-9]+"/\>', 
             r'<input\1max="60" min="20"\2type="range" value={blendedCpl} onChange={(e) => useKpiStore.getState().setBlendedCpl(Number(e.target.value))}/>', 
             content
        )

        content = re.sub(
             r'<input(.*?)max="3.0" min="0.8"(.*?)type="range" value="1.8"/\>', 
             r'<input\1max="3.0" min="0.8"\2type="range" value={useKpiStore.getState().conversionRate} onChange={(e) => useKpiStore.getState().setConversionRate(Number(e.target.value))}/>', 
             content
        )
        content = re.sub(
             r'<input(.*?)max="8.0" min="1.0"(.*?)type="range" value="4.0"/\>', 
             r'<input\1max="8.0" min="1.0"\2type="range" value={useKpiStore.getState().conversionRate} onChange={(e) => useKpiStore.getState().setConversionRate(Number(e.target.value))}/>', 
             content
        )

        # Wire up presets
        content = content.replace('id="preset-best" type="button"', 'id="preset-best" onClick={() => applyPreset("best")} type="button"')
        content = content.replace('id="preset-base" type="button"', 'id="preset-base" onClick={() => applyPreset("base")} type="button"')
        content = content.replace('id="preset-worst" type="button"', 'id="preset-worst" onClick={() => applyPreset("worst")} type="button"')
        
        # We will wrap the button's internal content with a span instead of messing up trailing spans
        content = content.replace('<span>Export Brief</span>', '<span onClick={() => exportToCSV()}>Export Brief</span>')
        content = content.replace('<span>Export Jira Roadmap</span>', '<span onClick={() => exportToCSV()}>Export Jira Roadmap</span>')
        content = content.replace('type="button">\n<span className="material-symbols-outlined text-[16px]">file_download', 'type="button" onClick={() => exportToCSV()}>\n<span className="material-symbols-outlined text-[16px]">file_download')


        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)

print("Safely injected state logic!")
