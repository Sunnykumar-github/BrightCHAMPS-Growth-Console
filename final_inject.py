import os
import glob
import re

for filename in glob.glob('src/app/**/*.tsx', recursive=True):
    if not filename.endswith('page.tsx'): continue
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. State hook injection
    if '"use client";' not in content:
        content = '"use client";\nimport { useKpiStore } from "@/store/useKpiStore";\n' + content
    content = content.replace('export default function The_ModelPage() {', 'export default function The_ModelPage() {\n  const { blendedCpl, iqiFloor, getMonthlyLeads, getBookedDemos, getPaidEnrolments, getNetEfficiencySavings, exportToCSV, applyPreset } = useKpiStore();\n')
    content = content.replace('export default function Risks_and_ScenariosPage() {', 'export default function Risks_and_ScenariosPage() {\n  const { blendedCpl, iqiFloor, getMonthlyLeads, getBookedDemos, getPaidEnrolments, getNetEfficiencySavings, exportToCSV, applyPreset } = useKpiStore();\n')
    # Actually just do for all
    content = re.sub(
        r'export default function (\w+)Page\(\) \{',
        r'export default function \1Page() {\n  const { blendedCpl, iqiFloor, getMonthlyLeads, getBookedDemos, getPaidEnrolments, getNetEfficiencySavings, exportToCSV, applyPreset } = useKpiStore();\n',
        content
    )
    
    # Clean up any malformed <input> tags by completely wiping them and replacing them with pristine Next.js JSX
    # We will use Regex to capture the whole <input...> tag and replace it with clean versions based on IDs
    if 'id="cpm-input"' in content:
        content = re.sub(r'<input[^>]*id="cpm-input"[^>]*>', '<input className="w-full h-2 bg-surface-container-high rounded cursor-pointer accent-primary appearance-none" id="cpm-input" max="60" min="20" step="0.5" type="range" value={useKpiStore.getState().blendedCpl} onChange={(e) => useKpiStore.getState().setBlendedCpl(Number(e.target.value))} />', content)
    if 'id="ctr-input"' in content:
        content = re.sub(r'<input[^>]*id="ctr-input"[^>]*>', '<input className="w-full h-2 bg-surface-container-high rounded cursor-pointer accent-secondary appearance-none" id="ctr-input" max="3.0" min="0.8" step="0.05" type="range" value={useKpiStore.getState().conversionRate} onChange={(e) => useKpiStore.getState().setConversionRate(Number(e.target.value))} />', content)
    if 'id="cvr-input"' in content:
        content = re.sub(r'<input[^>]*id="cvr-input"[^>]*>', '<input className="w-full h-2 bg-surface-container-high rounded cursor-pointer accent-primary appearance-none" id="cvr-input" max="8.0" min="1.0" step="0.1" type="range" value={useKpiStore.getState().conversionRate} onChange={(e) => useKpiStore.getState().setConversionRate(Number(e.target.value))} />', content)

    # In risks and scenarios:
    if 'id="cpm-slider"' in content:
        content = re.sub(r'<input[^>]*id="cpm-slider"[^>]*>', '<input className="w-full h-2 bg-surface-container-high rounded cursor-pointer accent-primary appearance-none" id="cpm-slider" max="44" min="24" step="1" type="range" value={useKpiStore.getState().blendedCpl} onChange={(e) => useKpiStore.getState().setBlendedCpl(Number(e.target.value))} />', content)
        content = re.sub(r'<input[^>]*id="ctr-slider"[^>]*>', '<input className="w-full h-2 bg-surface-container-high rounded cursor-pointer accent-secondary appearance-none" id="ctr-slider" max="4.0" min="1.0" step="0.1" type="range" value={useKpiStore.getState().conversionRate} onChange={(e) => useKpiStore.getState().setConversionRate(Number(e.target.value))} />', content)
        content = re.sub(r'<input[^>]*id="slg-slider"[^>]*>', '<input className="w-full h-2 bg-surface-container-high rounded cursor-pointer accent-tertiary appearance-none" id="slg-slider" max="10" min="1" step="0.5" type="range" value="5" />', content)

    # Note: re.sub only works if the string is continuous. But since we used BS4, it added newlines!
    # A safer way to replace spanning multiple lines:
    # content = re.sub(r'<input.*?id="cpm-input".*?>', '...', content, flags=re.DOTALL)
    # However, this might grab TOO MUCH if there's another > closing tag further down...
    # But `<input` has NO children in BS4. 
    # Let me just replace the tags safely!

    # Update exports
    content = content.replace('Export Brief', '</span><span style={{position:"absolute", width:"100%", height:"100%", left:0, top:0}} onClick={() => exportToCSV()}></span>Export Brief')
    content = content.replace('Export Jira Roadmap', '</span><span style={{position:"absolute", width:"100%", height:"100%", left:0, top:0}} onClick={() => exportToCSV()}></span>Export Jira Roadmap')
    content = content.replace('type="button">\n<span className="material-symbols-outlined text-[16px]">file_download', 'type="button" onClick={() => exportToCSV()}>\n<span className="material-symbols-outlined text-[16px]">file_download')

    # Update presets
    content = content.replace('id="preset-best" type="button"', 'id="preset-best" onClick={() => applyPreset("best")} type="button"')
    content = content.replace('id="preset-base" type="button"', 'id="preset-base" onClick={() => applyPreset("base")} type="button"')
    content = content.replace('id="preset-worst" type="button"', 'id="preset-worst" onClick={() => applyPreset("worst")} type="button"')

    # Replace numeric strings
    content = re.sub(r'\$25\.00(?!")', r'${useKpiStore.getState().blendedCpl.toFixed(2)}', content)
    content = re.sub(r'84\.5', r'{useKpiStore.getState().iqiFloor.toFixed(1)}', content)
    content = re.sub(r'9,600', r'{useKpiStore.getState().getMonthlyLeads().toLocaleString()}', content)
    content = re.sub(r'3,840', r'{useKpiStore.getState().getBookedDemos().toLocaleString()}', content)
    content = re.sub(r'960([^\]]*)', r'{useKpiStore.getState().getPaidEnrolments().toLocaleString()}\1', content)
    content = content.replace('$240k', '${(useKpiStore.getState().getNetEfficiencySavings() / 1000).toFixed(0)}k')

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

# Apply DOM correction to <input> directly on all tags independently in case regex failed
import bs4
# Wait, just fixing it line by line is safer
