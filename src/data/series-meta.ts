import type { SeriesMeta, SeriesKey } from "./types";

export const SERIES_META: Record<SeriesKey, SeriesMeta> = {
  top10: {
    key: "top10", group: "inequality", label: "Top 10% Income Share",
    shortLabel: "Top 10%", unit: "percent", color: "#B21F2C",
    dashed: false, defaultOn: true, source: "Piketty-Saez (WID)",
  },
  top1: {
    key: "top1", group: "inequality", label: "Top 1% Income Share",
    shortLabel: "Top 1%", unit: "percent", color: "#E96955",
    dashed: false, defaultOn: false, source: "Piketty-Saez (WID)",
  },
  giniHouseholds: {
    key: "giniHouseholds", group: "inequality", label: "Gini Coefficient (Households)",
    shortLabel: "Gini (HH)", unit: "decimal", color: "#2459A9",
    dashed: false, defaultOn: true, source: "Census CPS ASEC", fredId: "GINIALLRH",
  },
  giniFamilies: {
    key: "giniFamilies", group: "inequality", label: "Gini Coefficient (Families)",
    shortLabel: "Gini (Fam)", unit: "decimal", color: "#6DACDE",
    dashed: true, defaultOn: false, source: "Census CPS ASEC", fredId: "GINIALLRF",
  },
  medianIncome: {
    key: "medianIncome", group: "inequality", label: "Real Median Household Income",
    shortLabel: "Median Income", unit: "dollars", color: "#D97706",
    dashed: false, defaultOn: false, source: "Census CPS ASEC", fredId: "MEHOINUSA672N",
  },
  laborShare: {
    key: "laborShare", group: "inequality", label: "Labor Share of GDI",
    shortLabel: "Labor Share", unit: "percent", color: "#9333EA",
    dashed: false, defaultOn: false, source: "BEA via FRED", fredId: "A4002E1A156NBEA",
  },
  poverty: {
    key: "poverty", group: "poverty", label: "Official Poverty Rate (All Persons)",
    shortLabel: "Poverty", unit: "percent", color: "#0A3255",
    dashed: false, defaultOn: true, source: "Census P60-287",
  },
  childPoverty: {
    key: "childPoverty", group: "poverty", label: "Child Poverty Rate (Under 18)",
    shortLabel: "Child Poverty", unit: "percent", color: "#059669",
    dashed: false, defaultOn: false, source: "Census CPS ASEC", fredId: "HSTPOVARU18YAPU18YBPPP",
  },
  elderlyPoverty: {
    key: "elderlyPoverty", group: "poverty", label: "Elderly Poverty Rate (65+)",
    shortLabel: "Elderly Poverty", unit: "percent", color: "#4B5563",
    dashed: false, defaultOn: false, source: "Census CPS ASEC", fredId: "HSTPOVAR65YOBPPP",
  },
  femaleHeadedPoverty: {
    key: "femaleHeadedPoverty", group: "poverty", label: "Female-Headed Household Poverty",
    shortLabel: "Female-HH", unit: "percent", color: "#DB2777",
    dashed: false, defaultOn: false, source: "Census CPS ASEC", fredId: "HSTPOVARPFFWFHNSPBPP",
  },
  povertyPre: {
    key: "povertyPre", group: "poverty", label: "Pre-1959 Poverty Estimates (Unofficial)",
    shortLabel: "Pre-1959*", unit: "percent", color: "#6DACDE",
    dashed: true, defaultOn: false, source: "Smolensky (1965), Fisher (1986)",
  },
  spm: {
    key: "spm", group: "poverty", label: "Supplemental Poverty Measure",
    shortLabel: "SPM", unit: "percent", color: "#059669",
    dashed: true, defaultOn: false, source: "Census CPS ASEC (coming soon)",
  },
};
