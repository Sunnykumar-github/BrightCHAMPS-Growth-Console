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
    
    # Sliders logic (safe string replace)
    def clean_replace(c, c_id, val_name, max_val, min_val, step_val, accent):
        start_id = c.find(f'id="{c_id}"')
        if start_id == -1: return c
        # find the <input container around it
        start_tag = c.rfind('<input', 0, start_id)
        # find the closest /> or > 
        end_tag = c.find('/>', start_id)
        if end_tag == -1: end_tag = c.find('>', start_id)
        end_tag += 2 if c[end_tag:end_tag+2] == '/>' else 1
        
        # also consume floating string characters like `min="1.0"` if any exist from BS4 bugs
        rest = c[end_tag:]
        match_min = re.match(r'\s*min="[^"]*"\s*', rest)
        if match_min: end_tag += len(match_min.group(0))
        rest = c[end_tag:]
        match_step = re.match(r'\s*step="[^"]*"\s*', rest)
        if match_step: end_tag += len(match_step.group(0))
        rest = c[end_tag:]
        match_val = re.match(r'\s*value="[^"]*"\s*', rest)
        if match_val: end_tag += len(match_val.group(0))

        replacement = f'<input className="w-full h-2 bg-surface-container-high rounded cursor-pointer accent-{accent} appearance-none" id="{c_id}" max="{max_val}" min="{min_val}" step="{step_val}" type="range" '
        if c_id == 'slg-slider':
            replacement += 'value="5" ' # static
        else:
            replacement += f'value={{useKpiStore.getState().{val_name}}} onChange={{(e) => useKpiStore.getState().set{val_name.capitalize()}(Number(e.target.value))}} '
        replacement += '/>'
        
        return c[:start_tag] + replacement + c[end_tag:]

    content = clean_replace(content, 'cpm-input', 'blendedCpl', '60', '20', '0.5', 'primary')
    content = clean_replace(content, 'ctr-input', 'conversionRate', '3.0', '0.8', '0.05', 'secondary')
    content = clean_replace(content, 'cvr-input', 'conversionRate', '8.0', '1.0', '0.1', 'primary')
    
    content = clean_replace(content, 'cpm-slider', 'blendedCpl', '44', '24', '1', 'primary')
    content = clean_replace(content, 'ctr-slider', 'conversionRate', '4.0', '1.0', '0.1', 'secondary')
    content = clean_replace(content, 'slg-slider', 'blendedCpl', '10', '1', '0.5', 'tertiary')

    # Now carefully patch the buttons! We'll just replace the start of the button `<button` with `<button onClick={() => exportToCSV()}` for specific known buttons
    # Button 1: Export Brief
    # In stitch output, it looks like: <button className="..."><span>Export Brief</span></button>
    content = re.sub(r'<button([^>]*>.*?Export Brief.*?</button>)', r'<button onClick={() => exportToCSV()}\1', content, flags=re.DOTALL)
    # Button 2: Export Jira Roadmap
    content = re.sub(r'<button([^>]*>.*?Export Jira Roadmap.*?</button>)', r'<button onClick={() => exportToCSV()}\1', content, flags=re.DOTALL)
    
    # Top bar download buttons
    content = re.sub(r'<button([^>]*>.*?file_download.*?</button>)', r'<button onClick={() => exportToCSV()}\1', content, flags=re.DOTALL)

    # Note: re.sub with .*? inside <button> tag works perfectly because we stop at earliest </button>. 
    # BUT we need to make sure we don't accidentally match across multiple buttons.
    # To fix this, change .*? to (?:(?!<button).)*?  to ensure we don't cross button boundaries!
    content = re.sub(r'<button([^>]*>(?:(?!</button>).)*?)(Export Brief|Export Jira Roadmap)(.*?)</button>', 
                     r'<button onClick={() => exportToCSV()}\1\2\3</button>', content, flags=re.DOTALL)
    content = re.sub(r'<button([^>]*>(?:(?!</button>).)*?)(file_download)(.*?)</button>', 
                     r'<button onClick={() => exportToCSV()}\1\2\3</button>', content, flags=re.DOTALL)

    # Remove any duplicate onClick injections just in case!
    content = content.replace('onClick={() => exportToCSV()} onClick={() => exportToCSV()}', 'onClick={() => exportToCSV()}')

    # Presets
    def preset_replace(c, pid, val):
        idx = c.find(f'id="{pid}"')
        if idx == -1: return c
        start = c.rfind('<button', 0, idx)
        if start == -1: return c
        return c[:start] + f'<button onClick={{() => applyPreset("{val}")}} ' + c[start+8:]
        
    content = preset_replace(content, 'preset-best', 'best')
    content = preset_replace(content, 'preset-base', 'base')
    content = preset_replace(content, 'preset-worst', 'worst')

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("Safe inject completely done!")
