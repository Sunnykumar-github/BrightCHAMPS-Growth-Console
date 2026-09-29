import os
import re

fname = 'src/store/useKpiStore.ts'
with open(fname, 'r', encoding='utf-8') as f:
    content = f.read()

# Update initial state
# conversionRate: 12, -> 7.24
content = re.sub(r'conversionRate:\s*[\d\.]+,', 'conversionRate: 7.24,', content)

# getMonthlyLeads: () => 100000, -> 5000
if 'getMonthlyLeads:' in content:
    content = re.sub(r'getMonthlyLeads:\s*\(\)\s*=>\s*[\d]+', 'getMonthlyLeads: () => 5000', content)
else:
    # If not present, we will rely on injecting it
    pass

if 'getBookedDemos:' in content:
    content = re.sub(r'getBookedDemos:\s*\(\)\s*=>\s*[\d]+', 'getBookedDemos: () => 3229', content)

# But wait, did I even put getMonthlyLeads inside useKpiStore previously?
# Let's check if it exists:
if 'getPaidEnrolments' not in content:
    # It probably didn't exist! Let's inject them securely into the store!
    insert_block = """
  conversionRate: 7.24,
  getMonthlyLeads: () => 5000,
  getBookedDemos: () => 3229,
  getPaidEnrolments: () => (5000 * get().conversionRate / 100),
"""
    # Just insert it before baseCpl
    content = content.replace('  baseCpl:', insert_block + '  baseCpl:')

with open(fname, 'w', encoding='utf-8') as f:
    f.write(content)

print("Real Dataset initialized in Global Store!")
