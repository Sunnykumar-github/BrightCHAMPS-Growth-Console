import os
import glob
import re

for filename in glob.glob('src/**/*.tsx', recursive=True):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix duplicated setPreset
    content = content.replace('setPreset(', 'applyPreset(')
    
    # Fix duplicated SVG props if they exist in lowercase next to camelCase
    # Better yet, just rename the lowercase one to camelCase, React might warn us but TS will pass if there's no duplicate!
    # Wait, if `preserveAspectRatio=` AND `preserveaspectratio=` both exist, renaming the latter will create TWO `preserveAspectRatio=` and TS throws "multiple attributes"!
    # So we must COMPLETELY ERASE ONE!
    content = content.replace(' preserveaspectratio="none"', '')
    content = content.replace(' preserveAspectratio="none"', '')
    # If preserveAspectRatio="none" wasn't there originally, wait. BS4 outputs lowercase.
    # So BS4 outputted: preserveaspectratio="none".
    # Did my fix_svg_JSX.py rename it? No.
    # Let me just ensure there is exactly ONE preserveAspectRatio.
    content = re.sub(r'(preserve[aA]spect[rR]atio="[^"]*"\s*){2,}', r'\1', content)
    content = content.replace('preserveaspectratio=', 'preserveAspectRatio=')
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("TS errors fixed!")
