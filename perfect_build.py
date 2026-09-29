import os
import glob
from bs4 import BeautifulSoup
import re

os.makedirs('src/app', exist_ok=True)
os.makedirs('src/components', exist_ok=True)

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

def to_jsx(tag):
    if tag is None: return ""
    jsx_str = str(tag)
    jsx_str = jsx_str.replace('class=', 'className=')
    jsx_str = jsx_str.replace('for=', 'htmlFor=')
    jsx_str = re.sub(r'style="([^"]*)"', lambda m: f"style={{{camel_case_style(m.group(1))}}}", jsx_str)
    jsx_str = jsx_str.replace('crossorigin=""', 'crossOrigin=""')
    
    # BS4 specific self-closing tags fix
    jsx_str = jsx_str.replace('/ >', '/>')
    jsx_str = jsx_str.replace('checked=""', 'defaultChecked')
    
    return jsx_str

screens = glob.glob('stitch-screens/*.html')
if not screens:
    print("NO SCREENS FOUND")
    exit(1)

main_html = None
with open('stitch-screens/Executive_Summary.html', 'r', encoding='utf-8') as f:
    main_html = BeautifulSoup(f.read(), 'html.parser')

# ==========================================
# 1. SIDEBAR Component
# ==========================================
sidebar_tag = main_html.find('aside')
# REMOVE fixed positioning to allow Flexbox to handle layout flawlessly!
cls = sidebar_tag.get('class', [])
for bad in ['fixed', 'top-0', 'bottom-0']:
    if bad in cls: cls.remove(bad)
sidebar_tag['class'] = cls + ['min-h-screen']

# Fix links
for a in sidebar_tag.find_all('a'):
    path = a.get('data-path', '')
    route = '/' if path == 'executive-summary' else f'/{path}'
    a.name = 'Link'
    a['href'] = route
    a['className'] = f'{" ".join(a.get("class", []))} ${{pathname === "{route}" ? "bg-primary-100 text-primary-900 border-r-4 border-primary" : "text-surface-on-variant hover:bg-surface-container"}}'
    if 'class' in a.attrs: del a['class']
    if 'data-path' in a.attrs: del a['data-path']

sidebar_jsx = to_jsx(sidebar_tag)
sidebar_jsx = sidebar_jsx.replace('<Link', '<Link onClick={() => {}}')  # dummy just in case
# The `{...}` expression got escaped. Let's fix it by manually crafting the sidebar class logic if needed, but it's simpler to do it natively.
# Wait, string replacement of className="" to className={}
sidebar_jsx = re.sub(r'className="([^"]*\$\{pathname[^"]*)"', r'className={`\1`}', sidebar_jsx)

with open('src/components/Sidebar.tsx', 'w', encoding='utf-8') as f:
    f.write('''"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  return (
    ''' + sidebar_jsx + '''
  );
}
''')

# ==========================================
# 2. HEADER Component
# ==========================================
header_tag = main_html.find('header')
cls = header_tag.get('class', [])
for bad in ['fixed', 'top-0', 'left-72', 'right-0', 'z-30']:
    if bad in cls: cls.remove(bad)
if 'w-full' not in cls: cls.append('w-full')
if 'shrink-0' not in cls: cls.append('shrink-0')
header_tag['class'] = cls

# Find download button (has file_download span in it)
for btn in header_tag.find_all('button'):
    if 'file_download' in str(btn):
        btn['onClick'] = 'MAGIC_EXPORT_HOOK'

# Find the specific dropdown button that shouldn't download!
# Just add nothing into it!

header_jsx = to_jsx(header_tag).replace('"MAGIC_EXPORT_HOOK"', '{() => exportToCSV()}')

with open('src/components/Header.tsx', 'w', encoding='utf-8') as f:
    f.write('''"use client";
import React from 'react';
import { useKpiStore } from "@/store/useKpiStore";

export default function Header() {
  const { exportToCSV } = useKpiStore();
  return (
    ''' + header_jsx + '''
  );
}
''')

# ==========================================
# 3. PAGES Components
# ==========================================
for screen in screens:
    basename = os.path.basename(screen).replace('.html', '')
    route = '/' if basename == 'Executive_Summary' else f'/{basename.replace("_", "-").lower()}'
    
    with open(screen, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
        
    main_tag = soup.find('main')
    if not main_tag: continue
    
    # Remove pt-16 since flexbox solves top padding natively
    cls = main_tag.get('class', [])
    if 'pt-16' in cls: cls.remove('pt-16')
    if 'min-h-screen' in cls: cls.remove('min-h-screen')
    main_tag['class'] = cls

    # Map inputs to Zustand natively inside DOM tree
    for node in main_tag.find_all('input'):
        n_id = node.get('id', '')
        if 'cpm-input' in n_id or 'cpm-slider' in n_id:
            node['value'] = 'HOOK_VAL_BLENDEDCPL'
            node['onChange'] = 'HOOK_CHANGE_BLENDEDCPL'
        elif 'ctr-input' in n_id or 'ctr-slider' in n_id or 'cvr-input' in n_id:
            node['value'] = 'HOOK_VAL_CONVERSIONRATE'
            node['onChange'] = 'HOOK_CHANGE_CONVERSIONRATE'
        elif 'slg-slider' in n_id:
             del node['value']
             node['defaultValue'] = '5'
             
    # Map export buttons exactly based on text
    for btn in main_tag.find_all('button'):
        text = btn.get_text(separator=" ", strip=True)
        if 'Export Brief' in text or 'Export Jira Roadmap' in text:
            btn['onClick'] = 'MAGIC_EXPORT_HOOK'
        elif 'Base Case' in text:
            btn['onClick'] = 'MAGIC_PRESET_BASE'
        elif 'Best Case' in text:
            btn['onClick'] = 'MAGIC_PRESET_BEST'
        elif 'Worst Case' in text:
            btn['onClick'] = 'MAGIC_PRESET_WORST'

    main_jsx = to_jsx(main_tag)
    main_jsx = main_jsx.replace('"HOOK_VAL_BLENDEDCPL"', '{blendedCpl}')
    main_jsx = main_jsx.replace('"HOOK_CHANGE_BLENDEDCPL"', '{(e) => setBlendedCpl(Number(e.target.value))}')
    main_jsx = main_jsx.replace('"HOOK_VAL_CONVERSIONRATE"', '{conversionRate}')
    main_jsx = main_jsx.replace('"HOOK_CHANGE_CONVERSIONRATE"', '{(e) => setConversionRate(Number(e.target.value))}')
    main_jsx = main_jsx.replace('"MAGIC_EXPORT_HOOK"', '{() => exportToCSV()}')
    main_jsx = main_jsx.replace('"MAGIC_PRESET_BASE"', '{() => applyPreset("base")}')
    main_jsx = main_jsx.replace('"MAGIC_PRESET_BEST"', '{() => applyPreset("best")}')
    main_jsx = main_jsx.replace('"MAGIC_PRESET_WORST"', '{() => applyPreset("worst")}')

    out_dir = 'src/app' if route == '/' else f'src/app{route}'
    os.makedirs(out_dir, exist_ok=True)
    
    with open(f'{out_dir}/page.tsx', 'w', encoding='utf-8') as f:
        f.write('''"use client";
import React from 'react';
import { useKpiStore } from "@/store/useKpiStore";

export default function Page() {
  const { blendedCpl, conversionRate, setBlendedCpl, setConversionRate, exportToCSV, applyPreset, iqiFloor, getMonthlyLeads, getBookedDemos, getPaidEnrolments, getNetEfficiencySavings } = useKpiStore();

  return (
    ''' + main_jsx + '''
  );
}
''')

# ==========================================
# 4. LAYOUT Component (Natively Fixed!)
# ==========================================
with open('src/app/layout.tsx', 'w', encoding='utf-8') as f:
    f.write('''"use client";
import React, { useEffect } from "react";
import { Source_Serif_4, IBM_Plex_Sans } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import "./globals.css";
import { useKpiStore } from "@/store/useKpiStore";

const Source_Serif_4_var = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif-4",
});

const IBM_Plex_Sans_var = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    useKpiStore.getState().loadFromSupabase();
  }, []);

  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
        <title>BrightChamps Console</title>
      </head>
      <body className={`${Source_Serif_4_var.variable} ${IBM_Plex_Sans_var.variable} bg-surface`}>
        <div className="flex w-full min-h-screen overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col h-screen overflow-hidden">
            <Header />
            <div className="flex-1 overflow-y-auto w-full">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
''')

print("DOM flawlessly rebuilt.")
