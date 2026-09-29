import os
import re

fname = 'src/components/Header.tsx'
with open(fname, 'r', encoding='utf-8') as f:
    content = f.read()

# Find all useKpiStore() destructures
destructures = re.findall(r'const\s+\{([^\}]+)\}\s*=\s*useKpiStore\(\)\s*;', content)
if len(destructures) > 1:
    all_vars = set()
    for d in destructures:
        for v in d.split(','):
            all_vars.add(v.strip())
    
    # Remove all useKpiStore lines
    content = re.sub(r'const\s+\{[^\}]+\}\s*=\s*useKpiStore\(\)\s*;\n?', '', content)
    
    # Re-insert consolidated line right after the component declaration
    consolidated = f"  const {{ {', '.join(v for v in all_vars if v)} }} = useKpiStore();\n"
    content = content.replace('export default function Header() {', 'export default function Header() {\n' + consolidated)
    
with open(fname, 'w', encoding='utf-8') as f:
    f.write(content)
    
print("Duplicate variables deduplicated!")
