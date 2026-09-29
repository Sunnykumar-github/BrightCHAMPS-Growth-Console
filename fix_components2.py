import os
import glob

for filename in glob.glob('src/components/**/*.tsx', recursive=True):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # The bug: Missing useKpiStore import if "use client" was already present, skipping the injection block
    if 'import { useKpiStore }' not in content:
        content = 'import { useKpiStore } from "@/store/useKpiStore";\n' + content
        
    if '"use client";' not in content:
        content = '"use client";\n' + content

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("Forced useKpiStore import on all components!")
