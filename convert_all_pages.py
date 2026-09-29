import os
import glob
from bs4 import BeautifulSoup
import re

os.makedirs('src/app', exist_ok=True)

def to_jsx(tag):
    if tag is None: return ""
    jsx_str = str(tag)
    # class to className
    jsx_str = jsx_str.replace('class=', 'className=')
    jsx_str = jsx_str.replace('for=', 'htmlFor=')
    
    # replace inline styles
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
    
    # Self closing tags
    jsx_str = jsx_str.replace('crossorigin=""', 'crossOrigin=""')
    jsx_str = re.sub(r'<!--(.*?)-->', r'{/* \1 */}', jsx_str, flags=re.DOTALL)
    jsx_str = re.sub(r'<script.*?</script>', '', jsx_str, flags=re.DOTALL)
    jsx_str = re.sub(r'<hr>', '<hr />', jsx_str)
    jsx_str = re.sub(r'<input([^>]*?)>', r'<input\1 />', jsx_str)
    
    return jsx_str

for html_file in glob.glob('stitch-screens/*.html'):
    filename = os.path.basename(html_file).replace('.html', '')
    slug = filename.replace('_', '-').lower()
    
    # Skip Executive Summary because it's already mapped to / (page.tsx)
    if slug == 'executive-summary':
        continue
        
    with open(html_file, 'r', encoding='utf-8') as f:
        html = f.read()
        
    soup = BeautifulSoup(html, 'html.parser')
    main_content = soup.find('main')
    main_children = "".join([to_jsx(child) for child in main_content.children]) if main_content else ""
    
    os.makedirs(f'src/app/{slug}', exist_ok=True)
    with open(f'src/app/{slug}/page.tsx', 'w', encoding='utf-8') as f:
        f.write(f'''
export default function {filename}Page() {{
  return (
    <>
      <div className="flex flex-col w-full">
        {main_children}
      </div>
    </>
  );
}}
''')

print("All pages created successfully!")
