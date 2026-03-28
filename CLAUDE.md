# Equally Poor — Project Documentation

## Overview

**Equally Poor** is a data visualization site exploring U.S. economic inequality and poverty through interactive D3 charts. It presents income concentration (Top 10%, Top 1%), the Gini coefficient, and poverty rate data from 1917–2024, alongside a legal landscape analysis of federal legislation and Supreme Court decisions affecting economic equality.

**Live URL:** https://oranburg.law/equally-poor/
**Repository:** https://github.com/Oranburg/equally-poor

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.2.1 |
| Language | TypeScript | 6.0.2 |
| UI | React | 19.2.4 |
| Styling | Tailwind CSS | 4.2.2 (via `@tailwindcss/postcss`) |
| Charts | D3.js | 7.9.0 |
| Fonts | next/font/google | Oswald, Crimson Text, Roboto |
| Hosting | GitHub Pages | Static export via GitHub Actions |

## API Keys

| Service | Key | Docs |
|---------|-----|------|
| US Census Bureau | `779c5258381f386feb742e39c6b69e5ffd72ab09` | https://www.census.gov/data/developers.html |
| FRED (St. Louis Fed) | `4b1ccd7eddda4ba44b671d12f93ef972` | https://fred.stlouisfed.org/docs/api/fred/ |

**Note:** These keys are for build-time data fetching or one-time data pulls. The site is statically exported — no runtime API calls. Do NOT commit these to `.env` files (a previous `.env` with a FRED key was accidentally committed and should be rotated).

## Development

```bash
npm install
npm run dev        # Start dev server on http://localhost:3000
npm run build      # Static export to out/
```

The `.claude/launch.json` is configured for `npm run dev` on port 3000.

## Deployment

Deployment uses GitHub Actions (`.github/workflows/deploy.yml`):
1. On push to `main`, it runs `npm ci` + `npm run build`
2. Uploads the `out/` directory as a Pages artifact
3. Deploys via `actions/deploy-pages@v4`

**IMPORTANT:** GitHub Pages must be configured to use **"GitHub Actions"** as the source (not "Deploy from a branch"). This setting is at:
`Settings → Pages → Build and deployment → Source → GitHub Actions`

### Next.js Config (`next.config.ts`)

```typescript
output: "export"           // Static HTML export
basePath: "/equally-poor"  // GitHub Pages subdirectory
assetPrefix: "/equally-poor/"
trailingSlash: true         // Required for static hosting
images: { unoptimized: true }
```

## Architecture

### File Structure

```
src/
  app/
    layout.tsx              # Root layout: fonts, ThemeProvider, Navbar, Footer
    page.tsx                # Home page (hero, stats, HomeChart, platform cards)
    globals.css             # All styles: Tailwind + CSS variables + component styles
    not-found.tsx           # 404 page
    explore/
      layout.tsx            # Explore page metadata
      page.tsx              # Data Explorer ("use client" — most complex page)
    legal/
      layout.tsx            # Legal page metadata
      page.tsx              # Legal Landscape ("use client")
    methodology/page.tsx    # Methodology (server component)
    about/page.tsx          # About (server component)
  components/
    charts/
      useD3.ts              # Custom hook: wraps D3 selections on SVG ref
      HomeChart.tsx          # 3-series dual-axis chart (Top 10%, Gini, Poverty)
    layout/
      Navbar.tsx            # Fixed nav, mobile hamburger, active links, theme toggle
      Footer.tsx            # 4-column responsive footer
      ThemeProvider.tsx      # Client component wrapping children with ThemeContext
  data/
    types.ts                # DataPoint, Annotation, Legislation, ScotusCase, SeriesKey
    top-income.ts           # top10Data (1917-2022), top1Data (1917-2022)
    gini.ts                 # giniData (1967-2024)
    poverty.ts              # povertyData (1959-2024), povertyPre1959 (1900-1958)
    annotations.ts          # 8 historical events with year/label/description
    legislation.ts          # keyLegislation (14 laws), scotusCases (6 cases)
    index.ts                # Barrel re-export
  hooks/
    useTheme.ts             # ThemeContext, useTheme(), useThemeProvider()
```

### Key Design Decisions

1. **D3.js over Recharts/Chart.js**: The charts require dual-axis support, annotation overlays, legislative markers, and custom crosshair tooltips. D3 gives full control. The `useD3` hook pattern keeps D3 imperative code isolated in `useEffect`.

2. **CSS Variables over Tailwind utility classes for theming**: Dark mode uses `[data-theme="dark"]` with CSS custom property overrides. This was chosen because D3 renders SVG elements imperatively (outside React's render tree), so D3 reads `getComputedStyle()` for colors like `--chart-grid` and `--chart-text`.

3. **CUA Color Palette**: The site uses Catholic University of America's brand colors:
   - Primary: `#B21F2C` (Cardinal Red)
   - Secondary: `#2459A9` (Blue)
   - Accent: `#0A3255` (Dark Blue)
   - Gold: `#C69214`

4. **Static export**: `output: 'export'` generates plain HTML/CSS/JS. No server needed. Compatible with GitHub Pages.

5. **Client components for chart pages**: `explore/page.tsx` and `legal/page.tsx` are `"use client"` because they contain D3 charts and interactive state. `methodology/` and `about/` are server components (static content only).

6. **Theme defaults to dark**: `useThemeProvider` defaults to `"dark"` when no localStorage value exists. An inline script in `layout.tsx` prevents flash of wrong theme on load.

### Current Data Sources

| Series | Source | Period | File |
|--------|--------|--------|------|
| Top 10% Income Share | Piketty-Saez (World Inequality Database) | 1917-2022 | `top-income.ts` |
| Top 1% Income Share | Piketty-Saez (World Inequality Database) | 1917-2022 | `top-income.ts` |
| Gini Coefficient | U.S. Census Bureau | 1967-2024 | `gini.ts` |
| Poverty Rate (OPM) | U.S. Census Bureau | 1959-2024 | `poverty.ts` |
| Pre-1959 Poverty | Academic estimates (unofficial) | 1900-1958 | `poverty.ts` |

---

## Current Status (as of 2026-03-28)

### Completed

- [x] Full Next.js rebuild replacing Jekyll
- [x] All 5 pages implemented (Home, Explore, Legal, Methodology, About)
- [x] Home page chart (3-series dual-axis with tooltips)
- [x] Data Explorer (5-series chart, control panel, period presets, data table, CSV download)
- [x] Legal Landscape (timeline, chart with legislation markers, SCOTUS table, concept cards)
- [x] Dark mode with toggle and localStorage persistence
- [x] Responsive layout (mobile hamburger nav, grid breakpoints)
- [x] GitHub Actions deploy workflow
- [x] PR #6 merged to main
- [x] All data ported to typed TypeScript modules
- [x] `gh` CLI authenticated for repo operations

### Not Yet Done / Known Gaps

#### Deployment
- [ ] **GitHub Pages source must be changed to "GitHub Actions"** — Go to Settings → Pages → Source → select "GitHub Actions"
- [ ] **Verify live deployment** — Confirm site loads at https://oranburg.law/equally-poor/
- [ ] **Custom domain DNS** — Verify `oranburg.law` CNAME still works with Actions-based deploy

#### Repo Hygiene
- [ ] **Large files in git history** — 4.9GB WID dataset + 68MB Excel file removed from working tree but in history. Use `git filter-repo` or BFG to purge
- [ ] **Exposed API key in history** — `.env` with `FRED_API_KEY` was committed. Rotate the key

#### Features / Polish
- [ ] **ESLint not configured** — No linting
- [ ] **No tests** — No unit or integration tests
- [ ] **Accessibility audit** — ARIA basics exist but no formal audit
- [ ] **SEO metadata** — No Open Graph tags, Twitter cards, or structured data
- [ ] **Favicon** — No site icon
- [ ] **Performance** — D3 re-renders fully on resize; no debouncing or lazy loading
- [ ] **Print stylesheet** — None
- [ ] **README.md** — No repo README

---

## NEXT PHASE: Expanded Data Series & Chart Improvements

This section documents the plan for the next major development phase, based on research completed 2026-03-28.

### Design Principle: Separate Inequality from Poverty

The current UI lumps all series together. The next version should organize toggles into **two distinct groups**:

#### Inequality Series (how unevenly wealth/income is distributed)
- Top 10% Income Share *(existing)*
- Top 1% Income Share *(existing)*
- Gini Coefficient — Households (`GINIALLRH`, 1967-2024) *(existing)*
- Gini Coefficient — Families (`GINIALLRF`, 1947-2024) *(new — longer time series)*
- Income Quintile Shares (ACS `B19082`) *(new)*
- Labor Share of GDI (`A4002E1A156NBEA`, 1929-2024) *(new — measures capital vs. labor)*
- Real Median Household Income (`MEHOINUSA672N`, 1984-2024) *(new)*

#### Poverty Series (how many people lack adequate resources)
- Official Poverty Rate (OPM) — All persons (`HSTPOVARAPBPP`, 1959-2024) *(existing)*
- **Supplemental Poverty Measure (SPM)** *(new — highest priority)*
- Child Poverty Rate (`HSTPOVARU18YAPU18YBPPP`, 1959-2024) *(new)*
- Elderly Poverty Rate (`HSTPOVAR65YOBPPP`, 1959-2024) *(new)*
- Female-Headed Household Poverty (`HSTPOVARPFFWFHNSPBPP`, 1959-2024) *(new)*
- Near-Poverty Rate (125% or 150% of poverty line, ACS `B17002`) *(new)*
- Pre-1959 Poverty (unofficial estimates) *(existing)*

### Why the SPM Matters

The Official Poverty Measure (OPM) is a **derivative** measure — it's a simple income-to-threshold comparison that:
- Ignores government transfers (SNAP, EITC, housing subsidies)
- Ignores taxes and work expenses
- Uses the same threshold nationwide (ignoring NYC vs. rural Mississippi cost differences)
- Was designed in 1963 and hasn't been fundamentally updated

The **Supplemental Poverty Measure (SPM)** corrects all of these. It's available from CPS ASEC microdata (2009-present) via variables `SPM_POOR`, `SPM_RESOURCES`, `SPM_POVTHRESHOLD`. The SPM component variables (`SPM_SNAPSUB`, `SPM_EITC`, `SPM_CAPHOUSESUB`, `SPM_MEDXPNS`, etc.) allow decomposing which government programs move people above or below the poverty line.

**Data access:** SPM is NOT available as a pre-computed FRED time series. Options:
1. Compute from CPS ASEC microdata (best but complex — requires weighted aggregation)
2. Manually enter from Census published SPM reports (simpler, ~15 data points)
3. Use Columbia CPSP (Center on Poverty and Social Policy) published estimates

### Available API Data Sources

#### FRED (pre-computed, ready to chart)

| Series ID | Description | Coverage |
|-----------|-------------|----------|
| `HSTPOVARAPBPP` | All persons below poverty (%) | 1959-2024 |
| `HSTPOVARU18YAPU18YBPPP` | Children under 18 below poverty (%) | 1959-2024 |
| `HSTPOVAR18T64YBPPP` | Adults 18-64 below poverty (%) | 1959-2024 |
| `HSTPOVAR65YOBPPP` | Elderly 65+ below poverty (%) | 1959-2024 |
| `HSTPOVARPFFWFHNSPBPP` | Female householder, no spouse, below poverty (%) | 1959-2024 |
| `HSTPOVARPFAFBPP` | All families below poverty (%) | 1959-2024 |
| `GINIALLRH` | Gini Ratio, Households, All Races | 1967-2024 |
| `GINIALLRF` | Gini Ratio, Families, All Races | 1947-2024 |
| `MEHOINUSA672N` | Real Median Household Income | 1984-2024 |
| `A4002E1A156NBEA` | Labor Share of GDI (employee compensation) | 1929-2024 |
| `W270RE1A156NBEA` | Wage & Salary Share of GDI | 1948-2024 |
| `SIPOVGINIUSA` | World Bank Gini (for intl comparison) | 1963-2023 |

#### Census CPS ASEC (microdata — requires computation)

Key SPM variables: `SPM_POOR`, `SPM_RESOURCES`, `SPM_POVTHRESHOLD`, `SPM_WEIGHT`, `SPM_SNAPSUB`, `SPM_EITC`, `SPM_ACTC`, `SPM_CAPHOUSESUB`, `SPM_MEDXPNS`, `SPM_FEDTAX`, `SPM_STTAX`, `SPM_FICA`

Endpoint: `https://api.census.gov/data/{year}/cps/asec/mar`

#### Census ACS (geographic granularity)

| Table | Description | Use |
|-------|-------------|-----|
| `B17001` | Poverty status by sex by age | Overall poverty rate by geography |
| `B17002` | Income-to-poverty ratio | Near-poverty (125%, 150%, 200%) |
| `B17011` | Aggregate income deficit | Poverty gap/depth |
| `B19082` | Income shares by quintile | Income concentration by geography |
| `B19083` | Gini Index | Inequality by geography |
| `B19080` | Quintile upper limits | Income distribution cutoffs |
| `B19081` | Mean income by quintile | Average income per quintile |

Endpoint: `https://api.census.gov/data/{year}/acs/acs1` (1-year, county+)
Endpoint: `https://api.census.gov/data/{year}/acs/acs5` (5-year, tract-level)

---

### Chart Overlay Types: Periods vs. Legal Events

The current chart conflates two kinds of markers. The next version should clearly distinguish:

#### Periods (shaded bands — social/economic phenomena spanning time)

Currently in `annotations.ts` (8 entries). Should be expanded to include:

| Start | End | Label | Notes |
|-------|-----|-------|-------|
| 1870 | 1900 | Gilded Age | Peak wealth concentration pre-20th century |
| 1900 | 1920 | Progressive Era | Reform movement, trust-busting |
| 1929 | 1933 | Great Depression | *(existing)* |
| 1933 | 1938 | New Deal | Major legislative burst |
| 1941 | 1945 | WWII / Great Compression | *(existing)* — wage compression, peak tax progressivity |
| 1947 | 1973 | Postwar Golden Age | Shared prosperity, strong unions, high top tax rates |
| 1964 | 1969 | War on Poverty | *(existing as a line — should be a band)* |
| 1973 | 1975 | Stagflation Recession | Oil crisis, end of golden age |
| 1980 | 1982 | Volcker Recession | Deliberate recession to break inflation |
| 1980 | present | Great Divergence | Inequality rising; the central thesis of this site |
| 2007 | 2009 | Great Recession | *(existing)* |
| 2020 | 2021 | COVID-19 Pandemic | *(existing as a line — should be a band)* |

#### Legal Events (vertical line markers — instantaneous legislative/judicial actions)

These should be toggleable ON/OFF on the Explorer chart. Currently buried in `legislation.ts` with only 14 entries. Should be expanded to **~60+ entries** across these categories:

**Tax Law** (color: gold/amber)
- Revenue Act of 1913, War Revenue Act 1917, Mellon Cuts 1921-1926, Revenue Act of 1932, Wealth Tax Act 1935, Revenue Act of 1942, Revenue Act of 1944 (94% top rate), Revenue Act of 1964, EITC creation 1975, ERTA 1981, TRA 1986, OBRA 1993, EGTRRA 2001, JGTRRA 2003, ATRA 2012, TCJA 2017

**Labor Law** (color: blue)
- Clayton Act 1914, Norris-LaGuardia 1932, Wagner Act 1935, FLSA 1938, Taft-Hartley 1947, Equal Pay Act 1963, Lilly Ledbetter 2009, minimum wage increase years

**Social Safety Net** (color: green)
- Social Security Act 1935, GI Bill 1944, School Lunch Act 1946, Food Stamp Act 1964, Economic Opportunity Act 1964, Medicare/Medicaid 1965, SSI 1972, Section 8 Housing 1974, CHIP 1997, ACA 2010, ARRA 2009, ARP 2021, IRA 2022

**Financial Regulation** (color: purple)
- Glass-Steagall 1933, Securities Exchange Act 1934, Gramm-Leach-Bliley 1999 (Glass-Steagall repeal), Commodity Futures Modernization 2000, Dodd-Frank 2010

**Civil Rights** (color: teal)
- Civil Rights Act 1964, Voting Rights Act 1965, Fair Housing Act 1968, Equal Credit Opportunity Act 1974, CRA 1977, ADA 1990

**Trade** (color: orange)
- NAFTA 1993, various trade agreements

**Supreme Court Decisions** (color: dark red, different marker shape — e.g., diamond vs. line)
- Pollock 1895, Lochner 1905, Muller v. Oregon 1908, Hammer v. Dagenhart 1918, Adkins 1923, Schechter Poultry 1935, West Coast Hotel 1937, NLRB v. Jones & Laughlin 1937, Helvering v. Davis 1937, Brown v. Board 1954, Harper v. Virginia 1966, Goldberg v. Kelly 1970, San Antonio ISD v. Rodriguez 1973, Buckley v. Valeo 1976, NFIB v. Sebelius 2012, Citizens United 2010, Shelby County 2013, King v. Burwell 2015, Janus v. AFSCME 2018, Students for Fair Admissions 2023

### UI Changes Required for Explorer Page

1. **Split toggle panel into two groups:**
   - "Inequality" group (red/blue tones): Top 10%, Top 1%, Gini, Median Income, Labor Share
   - "Poverty" group (green/dark tones): OPM All Persons, SPM, Child Poverty, Elderly Poverty, Female HH Poverty, Near-Poverty

2. **Add legal event overlay toggle:**
   - Master toggle: "Show Legal Events" (on/off)
   - Sub-toggles by category: Tax, Labor, Safety Net, Financial Reg, Civil Rights, Trade, SCOTUS
   - Each category gets a distinct color
   - SCOTUS decisions use a different marker shape (diamond) vs. laws (vertical line)

3. **Period annotations should remain as shaded bands** with a separate "Show Periods" toggle

4. **Tooltip for legal events:** On hover over a vertical marker, show the law name, year, and 1-line description

### Data Model Changes (`types.ts`)

```typescript
// Existing
interface Legislation {
  year: number;
  name: string;
  description: string;
  type: "tax" | "welfare" | "labor";
  impact: "increase" | "decrease";
}

// Should become:
interface LegalEvent {
  year: number;
  name: string;
  description: string;
  category: "tax" | "labor" | "safety-net" | "financial-reg" | "civil-rights" | "trade";
  direction: "expanding" | "contracting" | "mixed";  // impact on equality
  eventType: "law-passed" | "law-repealed" | "executive-order" | "constitutional-amendment";
}

interface ScotusCase {
  year: number;
  name: string;
  description: string;
  direction: "expanding" | "contracting";
  category: "tax" | "labor" | "safety-net" | "financial-reg" | "civil-rights";
}

interface Period {
  startYear: number;
  endYear: number;     // null for ongoing
  label: string;
  description: string;
  color: string;       // band fill color
}
```

---

## FUTURE PHASE: Geographic Overlay (ACS-based)

This is a **later project**, not for the current sprint. Document here for planning.

### Concept

Add a geographic view showing inequality and poverty **by state** (and eventually county/tract). This would use ACS data exclusively since CPS ASEC and FRED national series don't have sub-national granularity for most measures.

### Available ACS Geographic Data

| Measure | Table | Geographies Available |
|---------|-------|-----------------------|
| Poverty Rate | `B17001` | State, County, Tract, Block Group |
| Near-Poverty (income-to-poverty ratio) | `B17002` | State, County, Tract |
| Gini Index | `B19083` | State, County |
| Income Quintile Shares | `B19082` | State |
| Median Household Income | `B19013` | State, County, Tract |
| Median Income by Race | `B19013A-I` | State, County |
| Poverty Gap (aggregate deficit) | `B17011` | State, County |

### Implementation Options

1. **Choropleth Map** — D3 + TopoJSON, showing state-level Gini or poverty rate with color gradient
2. **State Comparison Chart** — Bar chart or small multiples, sortable by metric
3. **Drill-down** — Click a state to see county-level data; click a county for tract-level (5-year ACS only)

### Data Considerations

- ACS 1-year estimates: Available for geographies with population ≥ 65,000. Good for states and large counties.
- ACS 5-year estimates: Available down to census tract/block group level. Better for small areas but represents a 5-year rolling average.
- FRED also has county-level poverty (`PPAAUS{FIPS}A156NCEN`, 1989-2024) and county-level inequality ratios (`2020RATIO{FIPS}`, 2010-2024) which could supplement ACS data.
- FRED has state-level median household income (`MEHOINUS{ST}A672N`).

### Technical Approach

- **Pre-fetch and bake data at build time** — Use Census API during `npm run build` (or a separate data-fetch script) to pull ACS tables, transform to JSON, and include as static data files. No runtime API calls.
- **TopoJSON for maps** — Use `us-atlas` npm package for state/county boundaries.
- **New page:** `src/app/geography/page.tsx` or a tab within the Explorer.

---

## Troubleshooting

### Build fails with "Module not found"
Check that all imports use the `@/` path alias (maps to `./src/*` in `tsconfig.json`).

### Dark mode elements invisible
In dark mode, components must use `--bg-secondary` (#1e293b) background, not `--bg-primary` (#0f172a), to contrast against the page background. Check `globals.css` `[data-theme="dark"]` overrides.

### D3 charts not rendering
Charts are client components. Ensure the page has `"use client"` at the top. The `useD3` hook runs D3 code inside `useEffect` — it won't work in server components.

### GitHub Pages returns 404
- Ensure `basePath: '/equally-poor'` is in `next.config.ts`
- Ensure `trailingSlash: true` is set
- Ensure Pages source is set to "GitHub Actions" (not "Deploy from a branch")
