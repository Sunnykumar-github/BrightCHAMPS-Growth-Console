import os
import glob
import re

for filename in glob.glob('src/**/*.tsx', recursive=True):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # SVG props
    content = content.replace('viewbox=', 'viewBox=')
    content = content.replace('stroke-linecap=', 'strokeLinecap=')
    content = content.replace('stroke-width=', 'strokeWidth=')
    content = content.replace('stroke-linejoin=', 'strokeLinejoin=')
    content = content.replace('fill-rule=', 'fillRule=')
    content = content.replace('clip-rule=', 'clipRule=')

    # Remove inline string event handlers to satisfy TS
    content = re.sub(r'onChange="[^"]*"', '', content)
    content = re.sub(r'onClick="[^"]*"', '', content)
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("TS types and SVG props fixed!")
