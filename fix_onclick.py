import os
import glob
import re

for filename in glob.glob('src/**/*.tsx', recursive=True):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # BeautifulSoup forcefully lowercases properties like 'onchange' and 'onclick'.
    # We must enforce React camelCase again.
    content = content.replace('onclick=', 'onClick=')
    content = content.replace('onchange=', 'onChange=')
    content = content.replace('defaultchecked=', 'defaultChecked=')
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("Props successfully translated to camelCase!")
