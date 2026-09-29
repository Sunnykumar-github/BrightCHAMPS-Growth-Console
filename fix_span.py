import os
import glob
import re

for filename in glob.glob('src/**/*.tsx', recursive=True):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    content = content.replace('colspan=', 'colSpan=')
    content = content.replace('rowspan=', 'rowSpan=')

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("colspan fixed!")
