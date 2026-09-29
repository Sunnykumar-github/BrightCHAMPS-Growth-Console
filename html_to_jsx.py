import os
from bs4 import BeautifulSoup
import re

html_file = 'stitch-screens/Executive_Summary.html'
with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

def to_jsx(tag):
    if tag is None: return ""
    jsx_str = str(tag)
    # class to className
    jsx_str = jsx_str.replace('class=', 'className=')
    jsx_str = jsx_str.replace('for=', 'htmlFor=')
    
    # replace inline styles
    def style_repl(match):
        style_str = match.group(1)
        # simplistic conversion for common styles
        # e.g., 'width: 45%' -> {{ width: '45%' }}
        style_dict = []
        for prop in style_str.split(';'):
            prop = prop.strip()
            if not prop: continue
            if ':' in prop:
                k, v = prop.split(':', 1)
                k = k.strip()
                # camelCase keys if dash
                parts = k.split('-')
                k_cam = parts[0] + ''.join(p.capitalize() for p in parts[1:])
                v = v.strip().replace("'", '"')
                style_dict.append(f"{k_cam}: '{v}'")
        if not style_dict: return ""
        return "style={{ " + ", ".join(style_dict) + " }}"
    jsx_str = re.sub(r'style="([^"]*)"', style_repl, jsx_str)
    
    # Self closing tags
    jsx_str = jsx_str.replace('crossorigin=""', 'crossOrigin=""')
    
    return jsx_str

aside = soup.find('aside')
header = soup.find('header')
main_content = soup.find('main')
main_children = "".join([to_jsx(child) for child in main_content.children]) if main_content else ""

os.makedirs('src/components', exist_ok=True)

with open('src/components/Sidebar.tsx', 'w', encoding='utf-8') as f:
    f.write(f'''
import Link from 'next/link';
export default function Sidebar() {{
  return (
    {to_jsx(aside)}
  );
}}
''')

with open('src/components/Header.tsx', 'w', encoding='utf-8') as f:
    f.write(f'''
export default function Header() {{
  return (
    {to_jsx(header)}
  );
}}
''')

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(f'''
export default function Page() {{
  return (
    <>
      <div className="flex flex-col w-full">
        {main_children}
      </div>
    </>
  );
}}
''')

print("Components successfully extracted!")
