import os
import re

# ================= Header Logic =================
with open('src/components/Header.tsx', 'r', encoding='utf-8') as f:
    header_content = f.read()

# Replace Base-Case filter button with an interactive Dropdown
header_popup = '''
      <div className="relative">
        <button onClick={() => setFilterOpen(!isFilterOpen)} className="flex items-center gap-1.5 px-space-sm py-1.5 bg-surface-container-lowest text-on-surface font-label-md text-label-md rounded shadow-[0_1px_2px_rgba(28,32,41,0.04)] hover:bg-surface-container-low transition-colors" type="button">
          <span className="material-symbols-outlined text-[16px]">tune</span>
          <span className="hidden sm:inline">Simulation Filter</span>
          <span className="material-symbols-outlined text-[16px]">arrow_drop_down</span>
        </button>
        {isFilterOpen && (
          <div className="absolute top-10 left-0 bg-surface shadow-md rounded border border-outline w-40 z-50 flex flex-col py-1">
            <button onClick={() => { applyPreset("best"); setFilterOpen(false); }} className="text-left px-3 py-2 hover:bg-surface-container text-sm">Best-Case</button>
            <button onClick={() => { applyPreset("base"); setFilterOpen(false); }} className="text-left px-3 py-2 hover:bg-surface-container text-sm">Base-Case Plan</button>
            <button onClick={() => { applyPreset("worst"); setFilterOpen(false); }} className="text-left px-3 py-2 hover:bg-surface-container text-sm">Stress-Case</button>
          </div>
        )}
      </div>
'''

header_content = header_content.replace('export default function Header() {', 'import { useState } from "react";\nexport default function Header() {\n  const [isFilterOpen, setFilterOpen] = useState(false);\n  const { applyPreset } = useKpiStore();')

# Use regex to replace the Base-Case button safely
header_content = re.sub(
    r'<button[^>]*><span[^>]*>tune</span>.*?arrow_drop_down.*?</span></button>',
    header_popup,
    header_content,
    flags=re.DOTALL
)

with open('src/components/Header.tsx', 'w', encoding='utf-8') as f:
    f.write(header_content)


# ================= Sidebar Logic =================
with open('src/components/Sidebar.tsx', 'r', encoding='utf-8') as f:
    sidebar_content = f.read()

sidebar_popup = '''
      <div className="relative mt-2">
        <button onClick={() => setVerticalOpen(!isVerticalOpen)} className="flex w-full items-center justify-between px-space-md py-1.5 bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md rounded">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            {vertical}
          </div>
          <span className="material-symbols-outlined text-[16px]">unfold_more</span>
        </button>
        {isVerticalOpen && (
          <div className="absolute top-10 left-0 bg-surface shadow-md rounded border border-outline w-full z-50 flex flex-col py-1">
            <button onClick={() => { setVertical("USA • Math Vertical"); setVerticalOpen(false); }} className="text-left px-3 py-2 hover:bg-surface-container text-sm">USA • Math Vertical</button>
            <button onClick={() => { setVertical("UK • Science Vertical"); setVerticalOpen(false); }} className="text-left px-3 py-2 hover:bg-surface-container text-sm">UK • Science Vertical</button>
            <button onClick={() => { setVertical("India • Coding"); setVerticalOpen(false); }} className="text-left px-3 py-2 hover:bg-surface-container text-sm">India • Coding</button>
          </div>
        )}
      </div>
'''

sidebar_content = sidebar_content.replace('export default function Sidebar() {', 'import { useState } from "react";\nexport default function Sidebar() {\n  const [isVerticalOpen, setVerticalOpen] = useState(false);\n  const [vertical, setVertical] = useState("USA • Math Vertical");')

sidebar_content = re.sub(
    r'<div[^>]*><button[^>]*>.*?USA • Math Vertical.*?unfold_more.*?</span></button></div>',
    sidebar_popup,
    sidebar_content,
    flags=re.DOTALL
)
# Just in case the wrapper is slightly different
sidebar_content = re.sub(
    r'<button[^>]*>.*?USA • Math Vertical.*?unfold_more.*?</span></button>',
    sidebar_popup,
    sidebar_content,
    flags=re.DOTALL
)

with open('src/components/Sidebar.tsx', 'w', encoding='utf-8') as f:
    f.write(sidebar_content)

print("Dropdowns upgraded to stateful components!")
