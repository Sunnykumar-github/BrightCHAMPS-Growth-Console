with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Inject into home page
if 'const { ' not in content:
    content = content.replace('export default function Page() {', 'export default function Page() {\n  const { blendedCpl, iqiFloor, getMonthlyLeads, getBookedDemos, getPaidEnrolments, getNetEfficiencySavings, exportToCSV, applyPreset } = useKpiStore();\n')

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Home page fixed!")
