import os
import glob

for filename in glob.glob('src/**/*.tsx', recursive=True):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # SVG props
    content = content.replace('preserveaspectratio=', 'preserveAspectRatio=')
    content = content.replace('colspan=', 'colSpan=')
    content = content.replace('rowspan=', 'rowSpan=')
    content = content.replace('tabindex=', 'tabIndex=')
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("TS types and SVG props fixed again!")
