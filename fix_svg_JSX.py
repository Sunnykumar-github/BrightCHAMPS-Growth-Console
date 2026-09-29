import os
import glob
import re

for filename in glob.glob('src/**/*.tsx', recursive=True):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # SVG Props React camelCase mapping
    content = content.replace('stroke-width=', 'strokeWidth=')
    content = content.replace('stroke-linecap=', 'strokeLinecap=')
    content = content.replace('stroke-linejoin=', 'strokeLinejoin=')
    content = content.replace('fill-opacity=', 'fillOpacity=')
    content = content.replace('fill-rule=', 'fillRule=')
    content = content.replace('clip-rule=', 'clipRule=')
    content = content.replace('clip-path=', 'clipPath=')
    content = content.replace('xmlns:xlink=', 'xmlnsXlink=')
    
    # Other BS4 anomalies
    content = content.replace('<!--', '{/*')
    content = content.replace('-->', '*/}')
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("SVG Props mapped correctly!")
