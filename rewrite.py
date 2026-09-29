import os
os.system('git filter-branch -f --msg-filter \'echo "September 29, 2026"\' -- --all')
os.system('git push -u origin main -f')
