import os
import re

for filename in ['src/app/page.tsx', 'src/components/Sidebar.tsx', 'src/components/Header.tsx']:
    if os.path.exists(filename):
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
            
        content = re.sub(r'<!--(.*?)-->', r'{/* \1 */}', content, flags=re.DOTALL)
        
        # also fix <hr> if any
        content = re.sub(r'<hr>', '<hr />', content)
        # also fix <input> if any
        content = re.sub(r'<input([^>]*?)>', r'<input\1 />', content)
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)

print("Comments fixed!")
