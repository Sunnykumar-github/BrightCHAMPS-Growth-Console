import os
import glob
import re

for filename in glob.glob('src/app/**/*.tsx', recursive=True):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # The bug was `setConversionrate`, we need `setConversionRate`
    content = content.replace('setConversionrate', 'setConversionRate')
    content = content.replace('setBlendedcpl', 'setBlendedCpl')

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("Fixed capitalization bugs!")
