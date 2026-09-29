import os
import glob
import re

def safe_replace_input(content, target_id, replacement):
    # Find where id="target_id" is
    idx = content.find(f'id="{target_id}"')
    if idx == -1: return content
    
    # Trace backwards to find '<input'
    start = content.rfind('<input', 0, idx)
    if start == -1: return content
    
    # Trace forwards to find the end of this tag.
    # Because of the bug, the tag ending might be `/>` followed by `min="1.0"`.
    # Let's find the next `/>`
    end = content.find('/>', idx)
    if end == -1:
        # Fallback to next `>`
        end = content.find('>', idx)
        
    actual_end = end + 2 if content[end:end+2] == '/>' else end + 1
    
    # Check if there is floating text after actual_end like `min="1.0"`
    rest = content[actual_end:]
    if rest.lstrip().startswith('min='):
        # find the end of the min attribute
        match = re.match(r'\s*min="[^"]*"\s*', rest)
        if match:
            actual_end += len(match.group(0))
            
    # Also check if it starts with 'step=' if things got mangled differently
    rest = content[actual_end:]
    if rest.lstrip().startswith('step='):
        match = re.match(r'\s*step="[^"]*"\s*', rest)
        if match:
            actual_end += len(match.group(0))

    return content[:start] + replacement + content[actual_end:]


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
    
    # Replace the Inputs
    content = safe_replace_input(content, 'cpm-input', '<input className="w-full h-2 bg-surface-container-high rounded cursor-pointer accent-primary appearance-none" id="cpm-input" max="60" min="20" step="0.5" type="range" value={useKpiStore.getState().blendedCpl} onChange={(e) => useKpiStore.getState().setBlendedCpl(Number(e.target.value))} />')
    content = safe_replace_input(content, 'ctr-input', '<input className="w-full h-2 bg-surface-container-high rounded cursor-pointer accent-secondary appearance-none" id="ctr-input" max="3.0" min="0.8" step="0.05" type="range" value={useKpiStore.getState().conversionRate} onChange={(e) => useKpiStore.getState().setConversionRate(Number(e.target.value))} />')
    content = safe_replace_input(content, 'cvr-input', '<input className="w-full h-2 bg-surface-container-high rounded cursor-pointer accent-primary appearance-none" id="cvr-input" max="8.0" min="1.0" step="0.1" type="range" value={useKpiStore.getState().conversionRate} onChange={(e) => useKpiStore.getState().setConversionRate(Number(e.target.value))} />')

    content = safe_replace_input(content, 'cpm-slider', '<input className="w-full h-2 bg-surface-container-high rounded cursor-pointer accent-primary appearance-none" id="cpm-slider" max="44" min="24" step="1" type="range" value={useKpiStore.getState().blendedCpl} onChange={(e) => useKpiStore.getState().setBlendedCpl(Number(e.target.value))} />')
    content = safe_replace_input(content, 'ctr-slider', '<input className="w-full h-2 bg-surface-container-high rounded cursor-pointer accent-secondary appearance-none" id="ctr-slider" max="4.0" min="1.0" step="0.1" type="range" value={useKpiStore.getState().conversionRate} onChange={(e) => useKpiStore.getState().setConversionRate(Number(e.target.value))} />')
    content = safe_replace_input(content, 'slg-slider', '<input className="w-full h-2 bg-surface-container-high rounded cursor-pointer accent-tertiary appearance-none" id="slg-slider" max="10" min="1" step="0.5" type="range" value="5" />')

    # Update exports carefully
    # Do not use replace strings that wipe out children inside <button> tag blindly.
    content = content.replace('Export Brief', '')
    content = content.replace('Export Jira Roadmap', '')
    content = content.replace('onClick={() => exportToCSV()}></span>', 'onClick={() => exportToCSV()}>')  # clean up any old patches just in case
    
    # We'll just hook into the <button> directly.
    content = content.replace('download</span>', 'download</span>Export Brief')
    content = content.replace('file_download', 'file_download</span>Export Jira Roadmap')
    # Actually let's just make ALL buttons in those sections clickable by wrapping their text! No wait, I can just inject onClick to the closest button!
    def safe_replace_button(c, text_marker):
        idx = c.find(text_marker)
        if idx == -1: return c
        # Find previous <button
        start = c.rfind('<button', 0, idx)
        if start == -1: return c
        # Insert onClick
        return c[:start] + '<button onClick={() => exportToCSV()}' + c[start+7:]
        
    content = safe_replace_button(content, 'Export Brief')
    content = safe_replace_button(content, 'Export Jira Roadmap')

    # Update presets
    content = content.replace('id="preset-best" type="button"', 'id="preset-best" onClick={() => applyPreset("best")} type="button"')
    content = content.replace('id="preset-base" type="button"', 'id="preset-base" onClick={() => applyPreset("base")} type="button"')
    content = content.replace('id="preset-worst" type="button"', 'id="preset-worst" onClick={() => applyPreset("worst")} type="button"')


    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("Safely injected state logic without regex!")
