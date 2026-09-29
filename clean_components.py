import os
import glob

for filename in glob.glob('src/components/**/*.tsx', recursive=True):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Strip existing "use client" and imports
    content = content.replace('"use client";\n', '')
    content = content.replace("'use client';\n", '')
    content = content.replace('import { useKpiStore } from "@/store/useKpiStore";\n', '')
    
    # Prepend strictly in the valid format
    header = '"use client";\nimport { useKpiStore } from "@/store/useKpiStore";\n'
    content = header + content

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("Components clean!")
