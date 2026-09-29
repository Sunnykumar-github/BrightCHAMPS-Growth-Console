import re

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Instead of checking string matches, use regex to inject right after the export statement!
content = re.sub(r'(export default function [^)]+\)\s*\{)', 
                 r'\1\n  const { blendedCpl, iqiFloor, getMonthlyLeads, getBookedDemos, getPaidEnrolments, getNetEfficiencySavings, exportToCSV, applyPreset } = useKpiStore();\n',
                 content)

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("page.tsx hook injected successfully!")
