import os
import re

for filename in ['src/app/page.tsx', 'src/components/Sidebar.tsx', 'src/components/Header.tsx']:
    if os.path.exists(filename):
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
            
        content = re.sub(r'<script.*?</script>', '', content, flags=re.DOTALL)
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)

print("Script tags removed!")
