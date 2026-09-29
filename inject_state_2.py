import re
import os
import glob

# Ensure client components across all pages
for filename in glob.glob('src/app/**/*.tsx', recursive=True):
    if not filename.endswith('page.tsx'): continue
    
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Skip files already fully processed
    if '"use client";' not in content:
        header = '"use client";\nimport { useKpiStore } from "@/store/useKpiStore";\n'
        content = header + content
        
        # Inject hook:
        # Match "export default function SomethingPage() {"
        content = re.sub(
            r'export default function (\w+)Page\(\) \{',
            r'export default function \1Page() {\n  const { blendedCpl, iqiFloor, getMonthlyLeads, getBookedDemos, getPaidEnrolments, getNetEfficiencySavings } = useKpiStore();\n',
            content
        )
        
        # Replace static values throughout the remaining dashboard screens:
        content = re.sub(r'\$25\.00(?!")', r'${blendedCpl.toFixed(2)}', content)
        content = re.sub(r'84\.5', r'{iqiFloor.toFixed(1)}', content)
        content = re.sub(r'9,600', r'{getMonthlyLeads().toLocaleString()}', content)
        content = re.sub(r'3,840', r'{getBookedDemos().toLocaleString()}', content)
        content = re.sub(r'960([^\]]*)', r'{getPaidEnrolments().toLocaleString()}\1', content)
        content = content.replace('$240k', '${(getNetEfficiencySavings() / 1000).toFixed(0)}k')

        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)

print("Safely injected state logic!")
