import os
from bs4 import BeautifulSoup
import re

def to_jsx(tag):
    if tag is None: return ""
    jsx_str = str(tag)
    jsx_str = jsx_str.replace('class=', 'className=')
    jsx_str = jsx_str.replace('for=', 'htmlFor=')
    def style_repl(match):
        style_str = match.group(1)
        style_dict = []
        for prop in style_str.split(';'):
            prop = prop.strip()
            if not prop: continue
            if ':' in prop:
                k, v = prop.split(':', 1)
                k = k.strip()
                parts = k.split('-')
                k_cam = parts[0] + ''.join(p.capitalize() for p in parts[1:])
                v = v.strip().replace("'", '"')
                style_dict.append(f"{k_cam}: '{v}'")
        if not style_dict: return ""
        return "style={{ " + ", ".join(style_dict) + " }}"
    jsx_str = re.sub(r'style="([^"]*)"', style_repl, jsx_str)
    jsx_str = jsx_str.replace('crossorigin=""', 'crossOrigin=""')
    jsx_str = re.sub(r'<!--(.*?)-->', r'{/* \1 */}', jsx_str, flags=re.DOTALL)
    jsx_str = re.sub(r'<script.*?</script>', '', jsx_str, flags=re.DOTALL)
    jsx_str = re.sub(r'<hr>', '<hr />', jsx_str)
    jsx_str = re.sub(r'<input([^>]*?)>', r'<input\1 />', jsx_str)
    
    # SVG and numeric props
    jsx_str = jsx_str.replace('viewbox=', 'viewBox=')
    jsx_str = jsx_str.replace('stroke-linecap=', 'strokeLinecap=')
    jsx_str = jsx_str.replace('stroke-width=', 'strokeWidth=')
    jsx_str = jsx_str.replace('stroke-linejoin=', 'strokeLinejoin=')
    jsx_str = jsx_str.replace('fill-rule=', 'fillRule=')
    jsx_str = jsx_str.replace('clip-rule=', 'clipRule=')
    
    jsx_str = jsx_str.replace('preserveaspectratio=', 'preserveAspectRatio=')
    jsx_str = jsx_str.replace('colspan=', 'colSpan=')
    jsx_str = jsx_str.replace('rowspan=', 'rowSpan=')
    jsx_str = jsx_str.replace('tabindex=', 'tabIndex=')
    
    jsx_str = re.sub(r'colSpan="(\d+)"', r'colSpan={\1}', jsx_str)
    jsx_str = re.sub(r'rowSpan="(\d+)"', r'rowSpan={\1}', jsx_str)
    jsx_str = re.sub(r'tabIndex="(-?\d+)"', r'tabIndex={\1}', jsx_str)
    
    return jsx_str

with open('stitch-screens/Executive_Summary.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')
main_content = soup.find('main')
main_children = "".join([to_jsx(child) for child in main_content.children]) if main_content else ""

jsx_content = f'''"use client";
import {{ useKpiStore }} from "@/store/useKpiStore";

export default function Page() {{
  const {{ blendedCpl, iqiFloor, getMonthlyLeads, getBookedDemos, getPaidEnrolments, getNetEfficiencySavings }} = useKpiStore();

  return (
    <>
      <div className="flex flex-col w-full">
        {main_children}
      </div>
    </>
  );
}}
'''

# State Replacements
jsx_content = re.sub(r'\$25\.00(?!")', r'${blendedCpl.toFixed(2)}', jsx_content)
jsx_content = re.sub(r'84\.5', r'{iqiFloor.toFixed(1)}', jsx_content)
jsx_content = re.sub(r'9,600', r'{getMonthlyLeads().toLocaleString()}', jsx_content)
jsx_content = re.sub(r'3,840', r'{getBookedDemos().toLocaleString()}', jsx_content)
jsx_content = re.sub(r'960([^\]]*)', r'{getPaidEnrolments().toLocaleString()}\1', jsx_content)
jsx_content = jsx_content.replace('$240k', '${(getNetEfficiencySavings() / 1000).toFixed(0)}k')

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(jsx_content)

print("page.tsx restored beautifully!")
