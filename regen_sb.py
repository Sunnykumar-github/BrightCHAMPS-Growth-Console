import os
from bs4 import BeautifulSoup
import re

def camel_case_style(style_str):
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
    return "{" + ", ".join(style_dict) + "}"

def fix_svg_props(jsx_str):
    jsx_str = jsx_str.replace('stroke-width=', 'strokeWidth=')
    jsx_str = jsx_str.replace('stroke-linecap=', 'strokeLinecap=')
    jsx_str = jsx_str.replace('stroke-linejoin=', 'strokeLinejoin=')
    jsx_str = jsx_str.replace('fill-opacity=', 'fillOpacity=')
    jsx_str = jsx_str.replace('fill-rule=', 'fillRule=')
    jsx_str = jsx_str.replace('clip-rule=', 'clipRule=')
    jsx_str = jsx_str.replace('clip-path=', 'clipPath=')
    jsx_str = jsx_str.replace('xmlns:xlink=', 'xmlnsXlink=')
    return jsx_str

with open('stitch-screens/Executive_Summary.html', 'r', encoding='utf-8') as f:
    main_html = BeautifulSoup(f.read(), 'html.parser')

sidebar_tag = main_html.find('aside')
for s in sidebar_tag('script'): s.extract()
cls = sidebar_tag.get('class', [])
for bad in ['fixed', 'top-0', 'bottom-0']:
    if bad in cls: cls.remove(bad)
sidebar_tag['class'] = cls + ['min-h-screen']

for a in sidebar_tag.find_all('a'):
    path = a.get('data-path', '')
    route = '/' if path == 'executive-summary' else f'/{path}'
    a.name = 'Link'
    a['href'] = route
    old_class = " ".join([c for c in a.get('class', []) if c not in ["bg-primary-100", "text-primary-900", "border-r-4", "border-primary", "text-surface-on-variant", "hover:bg-surface-container"]])
    a['className'] = f'{old_class} ${{pathname === "{route}" ? "bg-primary-100 text-primary-900 border-r-4 border-primary" : "text-surface-on-variant hover:bg-surface-container"}}'
    if 'class' in a.attrs: del a['class']
    if 'data-path' in a.attrs: del a['data-path']

jsx_str = str(sidebar_tag)
jsx_str = jsx_str.replace('class=', 'className=')
jsx_str = jsx_str.replace('for=', 'htmlFor=')
jsx_str = re.sub(r'style="([^"]*)"', lambda m: f"style={{{camel_case_style(m.group(1))}}}", jsx_str)
jsx_str = jsx_str.replace('crossorigin=""', 'crossOrigin=""')
jsx_str = jsx_str.replace('/ >', '/>')
jsx_str = jsx_str.replace('checked=""', 'defaultChecked')
jsx_str = fix_svg_props(jsx_str)

sidebar_jsx = re.sub(r'className="([^"]*\$\{pathname[^"]*)"', r'className={`\1`}', jsx_str)

# 1. Apply Width transition
sidebar_jsx = sidebar_jsx.replace('w-72', '${isCollapsed ? "w-20" : "w-72"} transition-all duration-300')
# 2. Wrap `className="... ${...} ..."` into `className={`... ${...} ...`}` safely!
# If it has a ${} inside className="", replace quotes with backticks and wrap in braces
def class_backtick(match):
    s = match.group(1)
    if '${' in s:
        return f'className={{`{s}`}}'
    return match.group(0)
sidebar_jsx = re.sub(r'className="([^"]*)"', class_backtick, sidebar_jsx)

# 3. Strip text from buttons dynamically if collapsed context exists
sidebar_jsx = sidebar_jsx.replace('<span className="w-2 h-2 rounded-full', '{!isCollapsed && <span className="w-2 h-2 rounded-full')

sidebar_popup = '''
      <div className="relative mt-2">
        <button onClick={() => setVerticalOpen(!isVerticalOpen)} className="flex w-full items-center justify-between px-space-md py-1.5 bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md rounded">
          <div className="flex items-center gap-2">
            {!isCollapsed && <span className="w-2 h-2 rounded-full bg-secondary"></span>}
            {!isCollapsed && <span>{vertical}</span>}
          </div>
          {!isCollapsed && <span className="material-symbols-outlined text-[16px]">unfold_more</span>}
        </button>
        {isVerticalOpen && !isCollapsed && (
          <div className="absolute top-10 left-0 bg-surface shadow-md rounded border border-outline w-full z-50 flex flex-col py-1">
            <button onClick={() => { setVertical("USA • Math Vertical"); setVerticalOpen(false); }} className="text-left px-3 py-2 hover:bg-surface-container text-sm">USA • Math Vertical</button>
            <button onClick={() => { setVertical("UK • Science Vertical"); setVerticalOpen(false); }} className="text-left px-3 py-2 hover:bg-surface-container text-sm">UK • Science Vertical</button>
            <button onClick={() => { setVertical("India • Coding"); setVerticalOpen(false); }} className="text-left px-3 py-2 hover:bg-surface-container text-sm">India • Coding</button>
          </div>
        )}
      </div>
'''
sidebar_jsx = re.sub(
    r'<div[^>]*><button[^>]*>.*?USA • Math Vertical.*?unfold_more.*?</span></button></div>',
    sidebar_popup,
    sidebar_jsx,
    flags=re.DOTALL
)

sidebar_jsx = re.sub(
    r'<button[^>]*><span[^>]*>view_sidebar.*?</span></button>',
    r'<button onClick={() => setCollapsed(!isCollapsed)} className="ml-auto flex items-center justify-center p-1 hover:bg-surface-container rounded transition-colors"><span className="material-symbols-outlined text-tertiary">view_sidebar</span></button>',
    sidebar_jsx
)

# And to make sure labels inside Links hide when collapsed!
# E.g. <span className="font-label-md">Executive Summary</span>
sidebar_jsx = sidebar_jsx.replace('<span className="font-label-md">', '{!isCollapsed && <span className="font-label-md">')
sidebar_jsx = sidebar_jsx.replace('</span></Link>', '</span>}</Link>')
# Some tags might have tracking-wider? wait
sidebar_jsx = sidebar_jsx.replace('<span className="font-label-sm', '{!isCollapsed && <span className="font-label-sm')
sidebar_jsx = sidebar_jsx.replace('MAIN ENGINE</span>', 'MAIN ENGINE</span>}')
sidebar_jsx = sidebar_jsx.replace('SYSTEM TOOLS</span>', 'SYSTEM TOOLS</span>}')

with open('src/components/Sidebar.tsx', 'w', encoding='utf-8') as f:
    f.write('''"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setCollapsed] = useState(false);
  const [isVerticalOpen, setVerticalOpen] = useState(false);
  const [vertical, setVertical] = useState("USA • Math Vertical");
  return (
    ''' + sidebar_jsx + '''
  );
}
''')

print("Sidebar successfully rewritten!")
