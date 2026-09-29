import os
from bs4 import BeautifulSoup
import re

# 1. Parse original HTML for the header ONLY
html_file = 'stitch-screens/Executive_Summary.html'
with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

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
    
    # Inject button hooks manually here on the clean JSX
    jsx_str = re.sub(r'<button([^>]*>(?:(?!</button>).)*?)(file_download)(.*?)</button>', 
                     r'<button onClick={() => exportToCSV()}\1\2\3</button>', jsx_str, flags=re.DOTALL)
                     
    return jsx_str

header = soup.find('header')
header_jsx = to_jsx(header)
# BS4 self-closing tag fix
header_jsx = header_jsx.replace('/ >', '/>')

with open('src/components/Header.tsx', 'w', encoding='utf-8') as f:
    f.write(f'''"use client";
import {{ useKpiStore }} from "@/store/useKpiStore";

export default function Header() {{
  const {{ exportToCSV }} = useKpiStore();
  
  return (
    {header_jsx}
  );
}}
''')

print("Clean Header Generation Done!")
