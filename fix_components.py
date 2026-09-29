import os
import glob
import re

for filename in glob.glob('src/components/**/*.tsx', recursive=True):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # The bug: Missing useKpiStore import and destructuring in Header/Sidebar
    if '"use client";' not in content:
        content = '"use client";\nimport { useKpiStore } from "@/store/useKpiStore";\n' + content
        
    content = re.sub(
        r'export default function (\w+)\((.*?)\) \{',
        r'export default function \1(\2) {\n  const { exportToCSV, applyPreset } = useKpiStore();\n',
        content
    )

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("Fixed Components hooks!")
