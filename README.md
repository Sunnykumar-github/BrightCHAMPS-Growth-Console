# BrightChamps Growth Console

The **BrightChamps Growth Console** is a production-ready, interactive analytics dashboard designed to model and track the **"USA Math Growth Plan"** (authored by Sunny Kumar, AI Forward Deployed Associate).

This application mathematically simulates and tracks the objective to halve the Blended Cost Per Lead (CPL) from $50.00 to $25.00 within 5 months, across three defined growth engines. 

## Key Features

1. **Macro-Economic Calculator**: A live Zustand-powered engine mapping the relationships between CPM ($20 → $18), CTR (1.6% → 1.8%), and Landing Page CVR (2.5% → 4.0%).
2. **Dynamic 9-Page Analytics Suite**:
   - **Executive Summary & The Model**: CPL Formula Card, 4-Lever Table, $50→$25 CPL Bridge, and Sensitivity Matrix.
   - **Risks & Product Engines**: 10-Scenario Matrix, ICE Experiment Backlog (T1-T12), Funnel Waterfall, and Contingency Playbook.
   - **Audience & Marketing Engines**: 10-Segment Map with Wave Expansion rules, Channel Strategy split, 10 Creative format tables, and Seasonality Calendar.
   - **Strategic Roadmap & KPI Master**: M0-M12 Weekly/Monthly Strategy Phases, 12 Week-0 Tasks, and a filterable 45-metric KPI Master Register (North Stars, Levers, Guardrails).
3. **Data Parity & Export Validation**: Built with verified baseline metrics from the `BrightChamps_USA_Dataset.csv` (1,661 origin leads). All pages support real-time mathematical recalculation based on slide and preset manipulation, and offer CSV payload generation.
4. **Supabase Integration**: Native bidirectional sync capabilities support persistent state architecture for CPL baseline / target variables.

## Tech Stack

- **Framework**: Next.js (React Server Components, App Router)
- **Styling**: Tailwind CSS v4 with dynamic custom design tokens mapped from Stitch.
- **State Management**: Zustand
- **Database**: Supabase
- **Icons**: Material Symbols Outlined (Google Fonts)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the live console in action.
