# Equally Poor — Project Documentation

## Overview

**Equally Poor** is a data visualization site exploring U.S. economic inequality through interactive D3 charts. It presents income concentration (Top 10%, Top 1%), the Gini coefficient, and poverty rate data from 1917–2024, alongside a legal landscape analysis of federal legislation and Supreme Court decisions affecting economic equality.

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

### Data Sources

| Series | Source | Period | File |
|--------|--------|--------|------|
| Top 10% Income Share | Piketty-Saez (World Inequality Database) | 1917-2022 | `top-income.ts` |
| Top 1% Income Share | Piketty-Saez (World Inequality Database) | 1917-2022 | `top-income.ts` |
| Gini Coefficient | U.S. Census Bureau | 1967-2024 | `gini.ts` |
| Poverty Rate | U.S. Census Bureau | 1959-2024 | `poverty.ts` |
| Pre-1959 Poverty | Academic estimates (unofficial) | 1900-1958 | `poverty.ts` |

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
- [ ] **GitHub Pages source must be changed to "GitHub Actions"** — Currently may still be set to "Deploy from a branch" (Jekyll). Go to Settings → Pages → Source → select "GitHub Actions"
- [ ] **Verify live deployment** — After changing the Pages source, confirm the site loads at https://oranburg.law/equally-poor/
- [ ] **Custom domain DNS** — The repo likely has a CNAME for `oranburg.law`. Verify this still works with the Actions-based deploy

#### Old Files Not Yet Cleaned from Git History
- [ ] **Large files in git history** — The repo was 5.9GB due to a 4.9GB WID dataset (`data/wid_all_data/`) and a 68MB Excel file. These were removed from the working tree but remain in git history. Use `git filter-repo` or BFG Repo Cleaner to purge them if repo size is a concern
- [ ] **Exposed API key in history** — `.env` file with `FRED_API_KEY` was committed in earlier history. The key should be rotated on the FRED website

#### Features / Polish
- [ ] **ESLint not configured** — No `.eslintrc` or ESLint dependency. Consider adding `next lint` for code quality
- [ ] **No tests** — No unit or integration tests exist. Consider adding tests for data modules and chart rendering
- [ ] **Accessibility audit** — ARIA labels exist on nav elements but a full a11y audit (keyboard navigation, screen reader testing, color contrast ratios) has not been done
- [ ] **SEO metadata** — Basic metadata exists in layout.tsx but Open Graph tags, Twitter cards, and structured data are not implemented
- [ ] **Favicon / site icons** — No favicon or PWA manifest configured
- [ ] **404 page styling** — `not-found.tsx` exists but may need polish
- [ ] **Explorer chart: annotation markers** — The annotation data (`annotations.ts`) is defined but the Explorer chart's annotation rendering may need visual testing and refinement
- [ ] **Pre-1959 poverty data toggle** — `povertyPre1959` data exists in `poverty.ts` but the Explorer page's handling of it (warning banner, dashed line style) should be verified
- [ ] **Print stylesheet** — No print-optimized styles
- [ ] **Performance** — D3 charts re-render fully on resize. Could benefit from debouncing. No lazy loading of chart components

#### Content
- [ ] **README.md** — No README in the repository. Should be created with project overview, setup instructions, and contribution guidelines
- [ ] **Bibliography links** — The methodology page has bibliography entries but external links should be verified as working
- [ ] **Legal page content review** — The legislative timeline and SCOTUS cases should be reviewed for accuracy by the site author

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
