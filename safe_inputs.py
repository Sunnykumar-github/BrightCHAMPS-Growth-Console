import os
import glob
import re

for filename in glob.glob('src/app/**/*.tsx', recursive=True):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. State hook injection
    if '"use client";' not in content:
        content = '"use client";\nimport { useKpiStore } from "@/store/useKpiStore";\n' + content
    
    content = re.sub(
        r'export default function (\w+)Page\(\) \{',
        r'export default function \1Page() {\n  const { blendedCpl, iqiFloor, getMonthlyLeads, getBookedDemos, getPaidEnrolments, getNetEfficiencySavings, exportToCSV, applyPreset } = useKpiStore();\n',
        content
    )
    
    # We will use Regex with re.DOTALL to capture the badly separated <input ... />
    # Also find any floating tags like `min="1.0"`!
    # Instead, let's just wipe out everything between `<div className="mt-space-sm">` and `</div>` where the input lives?
    
    content = re.sub(r'<input[^>]*?id="cpm-input"[^>]*?>.*?/>(?:min="[^"]*")?', '<input className="w-full h-2 bg-surface-container-high rounded cursor-pointer accent-primary appearance-none" id="cpm-input" max="60" min="20" step="0.5" type="range" value={useKpiStore.getState().blendedCpl} onChange={(e) => useKpiStore.getState().setBlendedCpl(Number(e.target.value))} />', content, flags=re.DOTALL)
    content = re.sub(r'<input[^>]*?id="ctr-input"[^>]*?>.*?/>(?:min="[^"]*")?', '<input className="w-full h-2 bg-surface-container-high rounded cursor-pointer accent-secondary appearance-none" id="ctr-input" max="3.0" min="0.8" step="0.05" type="range" value={useKpiStore.getState().conversionRate} onChange={(e) => useKpiStore.getState().setConversionRate(Number(e.target.value))} />', content, flags=re.DOTALL)
    content = re.sub(r'<input[^>]*?id="cvr-input"[^>]*?>.*?/>(?:min="[^"]*")?', '<input className="w-full h-2 bg-surface-container-high rounded cursor-pointer accent-primary appearance-none" id="cvr-input" max="8.0" min="1.0" step="0.1" type="range" value={useKpiStore.getState().conversionRate} onChange={(e) => useKpiStore.getState().setConversionRate(Number(e.target.value))} />', content, flags=re.DOTALL)

    # In risks and scenarios:
    content = re.sub(r'<input[^>]*?id="cpm-slider"[^>]*?>.*?/>(?:min="[^"]*")?', '<input className="w-full h-2 bg-surface-container-high rounded cursor-pointer accent-primary appearance-none" id="cpm-slider" max="44" min="24" step="1" type="range" value={useKpiStore.getState().blendedCpl} onChange={(e) => useKpiStore.getState().setBlendedCpl(Number(e.target.value))} />', content, flags=re.DOTALL)
    content = re.sub(r'<input[^>]*?id="ctr-slider"[^>]*?>.*?/>(?:min="[^"]*")?', '<input className="w-full h-2 bg-surface-container-high rounded cursor-pointer accent-secondary appearance-none" id="ctr-slider" max="4.0" min="1.0" step="0.1" type="range" value={useKpiStore.getState().conversionRate} onChange={(e) => useKpiStore.getState().setConversionRate(Number(e.target.value))} />', content, flags=re.DOTALL)
    content = re.sub(r'<input[^>]*?id="slg-slider"[^>]*?>.*?/>(?:min="[^"]*")?', '<input className="w-full h-2 bg-surface-container-high rounded cursor-pointer accent-tertiary appearance-none" id="slg-slider" max="10" min="1" step="0.5" type="range" value="5" />', content, flags=re.DOTALL)

    # Update exports
    content = content.replace('Export Brief', '</span><span style={{position:"absolute", width:"100%", height:"100%", left:0, top:0}} onClick={() => exportToCSV()}></span>Export Brief')
    content = content.replace('Export Jira Roadmap', '</span><span style={{position:"absolute", width:"100%", height:"100%", left:0, top:0}} onClick={() => exportToCSV()}></span>Export Jira Roadmap')
    content = content.replace('type="button">\n<span className="material-symbols-outlined text-[16px]">file_download', 'type="button" onClick={() => exportToCSV()}>\n<span className="material-symbols-outlined text-[16px]">file_download')

    # Update presets
    content = content.replace('id="preset-best" type="button"', 'id="preset-best" onClick={() => applyPreset("best")} type="button"')
    content = content.replace('id="preset-base" type="button"', 'id="preset-base" onClick={() => applyPreset("base")} type="button"')
    content = content.replace('id="preset-worst" type="button"', 'id="preset-worst" onClick={() => applyPreset("worst")} type="button"')


    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("Safely injected state logic!")
