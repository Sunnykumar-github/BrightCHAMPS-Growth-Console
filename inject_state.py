import re

# Patch Executive Summary
with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Make it a client component and import store
header = '"use client";\nimport { useKpiStore } from "@/store/useKpiStore";\n'
if '"use client"' not in content:
    content = header + content

# Inject hook before return
hook_content = '''
export default function Page() {
  const { blendedCpl, iqiFloor, getMonthlyLeads, getBookedDemos, getPaidEnrolments, getNetEfficiencySavings } = useKpiStore();
'''
content = content.replace('export default function Page() {', hook_content)

# Replace target static values in Executive Summary
content = re.sub(r'\$25\.00(?!")', r'${blendedCpl.toFixed(2)}', content)
content = re.sub(r'84\.5', r'{iqiFloor.toFixed(1)}', content)
content = re.sub(r'9,600', r'{getMonthlyLeads().toLocaleString()}', content)
content = re.sub(r'3,840', r'{getBookedDemos().toLocaleString()}', content)
content = re.sub(r'960([^\]]*)', r'{getPaidEnrolments().toLocaleString()}\1', content)
content = content.replace('$240k', '${(getNetEfficiencySavings() / 1000).toFixed(0)}k')

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

# Patch The Model page
# Make it a client component and import store
with open('src/app/the-model/page.tsx', 'r', encoding='utf-8') as f:
    model_content = f.read()

header = '"use client";\nimport { useKpiStore } from "@/store/useKpiStore";\n'
if '"use client"' not in model_content:
    model_content = header + model_content

hook_content_2 = '''
export default function The_ModelPage() {
  const { blendedCpl, setBlendedCpl, iqiFloor, setIqiFloor, conversionRate, setConversionRate } = useKpiStore();
'''
model_content = model_content.replace('export default function The_ModelPage() {', hook_content_2)

# Wire up the inputs. 
# CPL slider
model_content = re.sub(
    r'<input(.*?)max="60" min="20"(.*?)type="range" value="32"(.*?)/>', 
    r'<input\1max="60" min="20"\2type="range" value={blendedCpl} onChange={(e) => setBlendedCpl(Number(e.target.value))}\3/>', 
    model_content
)

# CTR/CVR slider
model_content = re.sub(
    r'<input(.*?)max="8" min="1"(.*?)type="range" value="4"(.*?)/>', 
    r'<input\1max="8" min="1"\2type="range" value={conversionRate} onChange={(e) => setConversionRate(Number(e.target.value))}\3/>', 
    model_content
)

# Replace numeric hard-coded string "$32.50" indicating value
model_content = model_content.replace('$32.50', '${blendedCpl.toFixed(2)}')
model_content = model_content.replace('4.0%', '{conversionRate.toFixed(1)}%')

with open('src/app/the-model/page.tsx', 'w', encoding='utf-8') as f:
    f.write(model_content)

print("Injected state logic successfully!")
