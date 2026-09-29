import re

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Strip all instances of the hook:
hook_str = "const { blendedCpl, iqiFloor, getMonthlyLeads, getBookedDemos, getPaidEnrolments, getNetEfficiencySavings, exportToCSV, applyPreset } = useKpiStore();"
content = content.replace(hook_str, "")
# Strip the older bad hook:
content = content.replace("const { blendedCpl, iqiFloor, getMonthlyLeads, getBookedDemos, getPaidEnrolments, getNetEfficiencySavings } = useKpiStore();", "")
# Remove double newlines if any
content = content.replace('\n\n\n', '\n')

# Add exactly ONE correctly
content = re.sub(r'(export default function [^)]+\)\s*\{)', 
                 r'\1\n  const { blendedCpl, iqiFloor, getMonthlyLeads, getBookedDemos, getPaidEnrolments, getNetEfficiencySavings, exportToCSV, applyPreset } = useKpiStore();\n',
                 content, count=1)

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("page.tsx duplicate stripped successfully!")
