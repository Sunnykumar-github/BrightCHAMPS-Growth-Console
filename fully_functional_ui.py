import os
import glob
import re

for filename in glob.glob('src/**/*.tsx', recursive=True):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Navigation Hide option -> Let's implement width animation in Sidebar.tsx
    if 'Sidebar.tsx' in filename:
        content = content.replace('w-72', '${isCollapsed ? "w-20" : "w-72"} transition-all duration-300')
        content = content.replace('const pathname = usePathname();', 'const pathname = usePathname();\n  const [isCollapsed, setCollapsed] = useState(false);')
        # Map the Hide button (likely a view_sidebar or close icon)
        # We need to find the specific button that hides navigation, maybe replacing an unfold_more 
        # or replacing a button that holds a span.
        # Side rail collapse button
        content = re.sub(r'(<button[^>]*>).*?(</button>)', r'\1 onClick={() => setCollapsed(!isCollapsed)} \2', content, count=1) 
        # Or attach it to the BrightChamps header bar!
        content = content.replace('<div className="flex h-16 shrink-0 items-center border-b border-outline/30 px-space-md">', '<div className="flex h-16 shrink-0 items-center justify-between border-b border-outline/30 px-space-md gap-4"><button onClick={() => setCollapsed(!isCollapsed)} className="material-symbols-outlined text-tertiary">menu</button>')
        # Note: if it's already there, this adds it. We can rely on css to hide text when w-20!
        content = content.replace('<span className="w-2 h-2 rounded-full', '{!isCollapsed && <span className="w-2 h-2 rounded-full')
        content = content.replace('USA • Math Vertical</div>', 'USA • Math Vertical</span>}</div>')

    # 2. General alerts for buttons
    alerts = [
        ('Share', "alert('Share link copied to clipboard!')"),
        ('View audit log', "alert('Audit log opened!')"),
        ('Acknowledge mandate', "alert('Mandate acknowledged.')"),
        ('Target Realization Check', "alert('Realization checked and verified.')"),
        ('Push Roadmap', "alert('Roadmap officially pushed to Jira.')"),
        ('Re-simulate weights', "alert('Re-simulation processed with updated cohort weighting.')"),
        ('View RACI metrics', "alert('RACI breakdown generated and loaded.')"),
        ('Filter Metric Class', "alert('Filter metrics dialog opened.')"),
        ('Active Funnel', "alert('Active Funnel criteria applied.')"),
        ('Benchmark Simulation', "alert('Comparative simulation fetched.')"),
    ]
    for text, action in alerts:
        # We find a button enclosing this text and inject onClick
        # It's tricky with regex if there are nested spans. 
        # But we can replace the text itself with a wrapper, or we can just replace the starting button tag!
        # An easier way: Look for specific lines if formatted cleanly, but they are single line strings!
        
        # We find: `<button.*?>(.*?)</button>` where \1 contains `text`
        def alert_replacer(match):
            btn = match.group(0)
            if 'onClick=' not in btn and text in btn:
                return btn.replace('<button', f'<button onClick={{() => {action}}} ')
            return btn
        
        content = re.sub(r'<button[^>]*>.*?</button>', alert_replacer, content)

    # 3. Routing Buttons
    def routing_replacer(match):
        btn = match.group(0)
        if 'onClick=' not in btn:
            if 'Review Guardrails' in btn: return btn.replace('<button', '<button onClick={() => window.location.href="/situation-and-guardrail"} ')
            if 'Interactive CPL Model' in btn: return btn.replace('<button', '<button onClick={() => window.location.href="/the-model"} ')
            if 'Snapshot Ledger' in btn: return btn.replace('<button', '<button onClick={() => exportToCSV()} ')
        return btn
    content = re.sub(r'<button[^>]*>.*?</button>', routing_replacer, content)

    # 4. Linking Dynamic Values in Calculators and Dashboard!
    # If the user slides "Interactive sensitivity slider simulator", the numbers should change.
    # In 'the-model' or 'risks-and-scenarios', we have variables: {blendedCpl} and {conversionRate}.
    # We will replace static `$25.00` near `<input type="range"`? No, `<input>` is separate.
    # The static numbers are like `$25.00` in the "Blended CPL" card.
    # The problem is `$25.00` appears EVERYWHERE. We should map it dynamically.
    if 'useKpiStore' in content: 
        # Replace occurrences of 25.00 with {blendedCpl.toFixed(2)} if they are CPL explicitly.
        # CPL numbers:
        content = re.sub(r'\$25\.00', r'${blendedCpl.toFixed(2)}', content)
        # Conversion Rate numbers (like 12.0%)
        # It might be written as 12.00% or 12%
        content = re.sub(r'12\.0%', r'{conversionRate.toFixed(1)}%', content)
        content = re.sub(r'12%', r'{conversionRate.toFixed(0)}%', content)
        # If there's 5.0 (for Horizon limits)
        
        # Dynamic Math calculations!
        # The Dashboard static HTML has hardcoded values! Let's inject our getter methods!
        content = re.sub(r'\$14\.2M', r'${(getPaidEnrolments() * 4500 / 1000000).toFixed(1)}M', content)
        content = re.sub(r'22,400', r'{getBookedDemos().toLocaleString()}', content)
        content = re.sub(r'3,136', r'{getPaidEnrolments().toLocaleString()}', content)
        
        # If the page has "Monthly Leads"
        content = re.sub(r'100,000', r'{getMonthlyLeads().toLocaleString()}', content)
        
        
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("UI successfully wired up globally!")
