export interface DataPoint {
  year: number;
  value: number;
}

export interface Annotation {
  year: number;
  label: string;
  type: "band" | "line";
  end?: number;
  color: string;
  description?: string;
}

export type SeriesKey =
  | "top10" | "top1"
  | "giniHouseholds" | "giniFamilies"
  | "medianIncome" | "laborShare"
  | "poverty" | "childPoverty" | "elderlyPoverty"
  | "femaleHeadedPoverty" | "povertyPre" | "spm";

export type SeriesGroup = "inequality" | "poverty";
export type UnitType = "percent" | "decimal" | "dollars";

export interface SeriesMeta {
  key: SeriesKey;
  group: SeriesGroup;
  label: string;
  shortLabel: string;
  unit: UnitType;
  color: string;
  dashed: boolean;
  defaultOn: boolean;
  source: string;
  fredId?: string;
}

export type LegalCategory =
  | "tax" | "labor" | "safetyNet" | "financialReg"
  | "civilRights" | "trade" | "scotus";

export interface LegalEvent {
  year: number;
  title: string;
  category: LegalCategory;
  direction: "expanding" | "contracting" | "mixed";
  description: string;
  major: boolean;
}

// Keep ScotusCase for the legal page table (separate from chart markers)
export interface ScotusCase {
  name: string;
  year: number;
  issue: string;
  holding: string;
}

export interface ExplorerPreset {
  id: string;
  label: string;
  description: string;
  series: SeriesKey[];
  legalCategories: LegalCategory[];
  showAnnotations: boolean;
  yearRange: [number, number];
}

export const LEGAL_CATEGORY_COLORS: Record<LegalCategory, string> = {
  tax: "#D97706",
  labor: "#2459A9",
  safetyNet: "#059669",
  financialReg: "#7C3AED",
  civilRights: "#0D9488",
  trade: "#EA580C",
  scotus: "#991B1B",
};

export const LEGAL_CATEGORY_LABELS: Record<LegalCategory, string> = {
  tax: "Tax",
  labor: "Labor",
  safetyNet: "Safety Net",
  financialReg: "Financial Reg.",
  civilRights: "Civil Rights",
  trade: "Trade",
  scotus: "SCOTUS",
};
