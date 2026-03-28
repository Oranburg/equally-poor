/**
 * One-time script to fetch FRED data series and output TypeScript arrays.
 * Run with: npx tsx scripts/fetch-fred.ts
 *
 * This pulls data from the FRED API once and prints TypeScript-ready arrays
 * to stdout. Copy the output into the appropriate data files.
 * Do NOT call the FRED API at runtime — the site is statically exported.
 */

const API_KEY = "4b1ccd7eddda4ba44b671d12f93ef972";
const BASE = "https://api.stlouisfed.org/fred/series/observations";

interface FredObs {
  date: string;
  value: string;
}

interface FredResponse {
  observations: FredObs[];
}

const SERIES = [
  { id: "GINIALLRF", name: "giniFamiliesData", desc: "Gini Coefficient — Families", transform: "raw" },
  { id: "MEHOINUSA672N", name: "medianIncomeData", desc: "Real Median Household Income (2024 CPI-U-RS dollars)", transform: "raw" },
  { id: "A4002E1A156NBEA", name: "laborShareData", desc: "Labor Share of GDI (employee compensation %)", transform: "divide100" },
  { id: "HSTPOVARU18YAPU18YBPPP", name: "childPovertyData", desc: "Child Poverty Rate (under 18)", transform: "divide100" },
  { id: "HSTPOVAR65YOBPPP", name: "elderlyPovertyData", desc: "Elderly Poverty Rate (65+)", transform: "divide100" },
  { id: "HSTPOVARPFFWFHNSPBPP", name: "femaleHeadedPovertyData", desc: "Female-Headed Household Poverty Rate", transform: "divide100" },
];

async function fetchSeries(seriesId: string): Promise<FredObs[]> {
  const url = `${BASE}?series_id=${seriesId}&api_key=${API_KEY}&file_type=json&sort_order=asc`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`FRED API error for ${seriesId}: ${res.status}`);
  const data: FredResponse = await res.json();
  return data.observations;
}

async function main() {
  for (const series of SERIES) {
    console.log(`\n// ── ${series.desc} ──`);
    console.log(`// Source: FRED ${series.id}`);

    const obs = await fetchSeries(series.id);
    const points = obs
      .filter(o => o.value !== ".")
      .map(o => {
        const year = parseInt(o.date.substring(0, 4));
        let value = parseFloat(o.value);
        if (series.transform === "divide100") {
          value = value / 100;
        }
        return { year, value };
      });

    console.log(`export const ${series.name}: DataPoint[] = [`);
    for (const p of points) {
      const valStr = series.transform === "raw" && series.id === "MEHOINUSA672N"
        ? p.value.toFixed(0)
        : series.transform === "divide100"
        ? p.value.toFixed(4)
        : p.value.toFixed(4);
      console.log(`  { year: ${p.year}, value: ${valStr} },`);
    }
    console.log(`];`);
  }
}

main().catch(console.error);
