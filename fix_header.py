import re

with open('src/components/Header.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Inject destructuring if it's not there
if 'const { exportToCSV }' not in content:
    content = content.replace('export default function Header() {', 'export default function Header() {\n  const { exportToCSV } = useKpiStore();\n')

with open('src/components/Header.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Header fixed!")
