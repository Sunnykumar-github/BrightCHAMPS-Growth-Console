import os
import glob
import re

for filename in glob.glob('src/**/*.tsx', recursive=True):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'useKpiStore()' in content:
        # Match something like `const { exportToCSV } = useKpiStore();`
        # And ensure it has all the getters and state variables we injected!
        needed = 'blendedCpl, conversionRate, getPaidEnrolments, getBookedDemos, getMonthlyLeads'
        
        # We can just replace any useKpiStore call with a robust one
        def store_replacer(match):
            old = match.group(0)
            # if we already injected it, skip
            if 'blendedCpl' in old: return old
            # extract what was there
            inside = re.search(r'\{([^}]+)\}', old)
            if inside:
                existing = inside.group(1).strip()
                return f'const {{ {existing}, {needed} }} = useKpiStore();'
            else:
                return f'const {{ {needed} }} = useKpiStore();'
                
        content = re.sub(r'const\s+\{.*\}\s*=\s*useKpiStore\(\)\s*;', store_replacer, content)
        
        # If the original didn't even have useKpiStore destructuring, but we injected `{blended...`, it would fail.
        # But we only injected if `useKpiStore` was in content!
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)

# Add Logo to Sidebar
with open('src/components/Sidebar.tsx', 'r', encoding='utf-8') as f:
    sidebar = f.read()

logo_html = '<img src="https://brightchamps.com/wp-content/uploads/2023/11/logo.png" className="w-8 h-8 object-contain shrink-0" alt="BrightChamps" />'

# Replace BrightChamps text if it exists, or just put it before the text
sidebar = sidebar.replace('<span className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary">', logo_html + '{!isCollapsed && <span className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary ml-2">')

# Favicon in layout.tsx
if os.path.exists('src/app/layout.tsx'):
    with open('src/app/layout.tsx', 'r', encoding='utf-8') as f:
        layout = f.read()
    
    # We can inject favicon via Next.js metadata!
    if 'export const metadata: Metadata =' in layout:
        layout = layout.replace('export const metadata: Metadata = {', 'export const metadata: Metadata = {\n  icons: {\n    icon: "https://brightchamps.com/favicon.ico",\n  },')
    elif '</head>' in layout:
        layout = layout.replace('</head>', '<link rel="icon" href="https://brightchamps.com/favicon.ico" /></head>')
        
    with open('src/app/layout.tsx', 'w', encoding='utf-8') as f:
        f.write(layout)

print("Dependencies and Corporate Assets configured!")
