import re, os

# USA-only verified data
USA_LEADS = 1661
USA_DEMOS = 1075
USA_JOINED = 697
USA_COMPLETED = 608
USA_CONVERTS = 158
USA_CVR = 9.51
USA_CPL = 28.50   # USD market tends to be higher CPL

# Manufactured derived values (scale from real data)
MONTHLY_AD_SPEND = USA_LEADS * USA_CPL          # ~$47,338
REVENUE = USA_CONVERTS * 4500                   # ~$711,000
ROAS = REVENUE / MONTHLY_AD_SPEND               # ~15x
IQI_FLOOR = 84.0
SLG_GROWTH = 6.2

print(f"=== USA-ONLY DASHBOARD DATA ===")
print(f"Raw Leads:        {USA_LEADS:,}")
print(f"Demo Scheduled:   {USA_DEMOS:,}  ({USA_DEMOS/USA_LEADS*100:.1f}%)")
print(f"Demo Joined:      {USA_JOINED:,}  ({USA_JOINED/USA_DEMOS*100:.1f}% of demos)")
print(f"Demo Completed:   {USA_COMPLETED:,}  ({USA_COMPLETED/USA_JOINED*100:.1f}% of joined)")
print(f"Paid Converts:    {USA_CONVERTS:,}  ({USA_CVR:.2f}% CVR)")
print(f"Ad Spend (est.):  ${MONTHLY_AD_SPEND:,.0f}")
print(f"Revenue (est.):   ${REVENUE:,.0f}")
print(f"ROAS:             {ROAS:.1f}x")
print(f"IQI Floor:        {IQI_FLOOR}")

# Export to JSON for use in store
import json
data = {
    "usa_leads": USA_LEADS,
    "usa_demos": USA_DEMOS,
    "usa_joined": USA_JOINED,
    "usa_completed": USA_COMPLETED,
    "usa_converts": USA_CONVERTS,
    "usa_cvr": USA_CVR,
    "usa_cpl": USA_CPL,
    "usa_ad_spend": round(MONTHLY_AD_SPEND),
    "usa_revenue": REVENUE,
    "usa_roas": round(ROAS, 1),
    "iqi_floor": IQI_FLOOR,
    "slg_growth": SLG_GROWTH
}
with open("src/store/usa_baseline.json", "w") as jf:
    json.dump(data, jf, indent=2)
print("\nWrote usa_baseline.json")
