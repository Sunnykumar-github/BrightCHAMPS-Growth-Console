import os
import glob

for filename in glob.glob('src/**/*.tsx', recursive=True):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Strip existing "use client"; from anywhere in the file
    content = content.replace('"use client";\n', '')
    content = content.replace("'use client';\n", '')
    
    # Prepend it exactly at the very top
    if 'layout.tsx' not in filename:  # standard layout should be server component unless required, but wait I made layout string inject "use client" earlier in step 341.
        pass
    
    # Just force "use client" for all components since it's an interactive dashboard
    content = '"use client";\n' + content

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("Directive fixed!")
