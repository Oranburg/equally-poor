"use client";

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  type ReactNode,
} from "react";
import type { SeriesKey, SeriesGroup, LegalCategory } from "@/data";
import { SERIES_META, EXPLORER_PRESETS } from "@/data";

/* ── State shape ── */
export interface ExplorerState {
  activeSeries: Record<SeriesKey, boolean>;
  startYear: number;
  endYear: number;
  activePreset: string;
  showAnnotations: boolean;
  legalEventsEnabled: boolean;
  activeLegalCategories: Set<LegalCategory>;
  majorEventsOnly: boolean;
}

/* ── Actions ── */
type Action =
  | { type: "TOGGLE_SERIES"; key: SeriesKey }
  | { type: "SET_GROUP_ALL"; group: SeriesGroup; on: boolean }
  | { type: "APPLY_PRESET"; presetId: string }
  | { type: "SET_YEAR_RANGE"; start: number; end: number }
  | { type: "TOGGLE_LEGAL_CATEGORY"; category: LegalCategory }
  | { type: "TOGGLE_ANNOTATIONS" }
  | { type: "TOGGLE_LEGAL_EVENTS" }
  | { type: "TOGGLE_MAJOR_ONLY" };

/* ── Context value ── */
export interface ExplorerActions {
  toggleSeries: (key: SeriesKey) => void;
  setGroupAll: (group: SeriesGroup, on: boolean) => void;
  applyPreset: (presetId: string) => void;
  setYearRange: (start: number, end: number) => void;
  toggleLegalCategory: (cat: LegalCategory) => void;
  toggleAnnotations: () => void;
  toggleLegalEvents: () => void;
  toggleMajorOnly: () => void;
}

const ExplorerStateCtx = createContext<ExplorerState | null>(null);
const ExplorerActionsCtx = createContext<ExplorerActions | null>(null);

/* ── Initial state from "overview" preset ── */
function buildInitialState(): ExplorerState {
  const overview = EXPLORER_PRESETS.find((p) => p.id === "overview")!;
  const activeSeries = {} as Record<SeriesKey, boolean>;
  for (const key of Object.keys(SERIES_META) as SeriesKey[]) {
    activeSeries[key] = overview.series.includes(key);
  }
  return {
    activeSeries,
    startYear: overview.yearRange[0],
    endYear: overview.yearRange[1],
    activePreset: "overview",
    showAnnotations: overview.showAnnotations,
    legalEventsEnabled: false,
    activeLegalCategories: new Set(overview.legalCategories),
    majorEventsOnly: true,
  };
}

/* ── Reducer ── */
function reducer(state: ExplorerState, action: Action): ExplorerState {
  switch (action.type) {
    case "TOGGLE_SERIES": {
      const next = {
        ...state,
        activeSeries: {
          ...state.activeSeries,
          [action.key]: !state.activeSeries[action.key],
        },
        activePreset: "custom",
      };
      return next;
    }

    case "SET_GROUP_ALL": {
      const updated = { ...state.activeSeries };
      for (const key of Object.keys(SERIES_META) as SeriesKey[]) {
        if (SERIES_META[key].group === action.group) {
          updated[key] = action.on;
        }
      }
      return { ...state, activeSeries: updated, activePreset: "custom" };
    }

    case "APPLY_PRESET": {
      const preset = EXPLORER_PRESETS.find((p) => p.id === action.presetId);
      if (!preset) return state;
      const activeSeries = {} as Record<SeriesKey, boolean>;
      for (const key of Object.keys(SERIES_META) as SeriesKey[]) {
        activeSeries[key] = preset.series.includes(key);
      }
      return {
        ...state,
        activeSeries,
        startYear: preset.yearRange[0],
        endYear: preset.yearRange[1],
        activePreset: preset.id,
        showAnnotations: preset.showAnnotations,
        legalEventsEnabled: preset.legalCategories.length > 0,
        activeLegalCategories: new Set(preset.legalCategories),
        majorEventsOnly: true,
      };
    }

    case "SET_YEAR_RANGE":
      return {
        ...state,
        startYear: action.start,
        endYear: action.end,
        activePreset: "custom",
      };

    case "TOGGLE_LEGAL_CATEGORY": {
      const next = new Set(state.activeLegalCategories);
      if (next.has(action.category)) next.delete(action.category);
      else next.add(action.category);
      return { ...state, activeLegalCategories: next };
    }

    case "TOGGLE_ANNOTATIONS":
      return { ...state, showAnnotations: !state.showAnnotations };

    case "TOGGLE_LEGAL_EVENTS":
      return { ...state, legalEventsEnabled: !state.legalEventsEnabled };

    case "TOGGLE_MAJOR_ONLY":
      return { ...state, majorEventsOnly: !state.majorEventsOnly };

    default:
      return state;
  }
}

/* ── Provider ── */
export function ExplorerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, buildInitialState);

  const actions: ExplorerActions = {
    toggleSeries: useCallback(
      (key: SeriesKey) => dispatch({ type: "TOGGLE_SERIES", key }),
      []
    ),
    setGroupAll: useCallback(
      (group: SeriesGroup, on: boolean) =>
        dispatch({ type: "SET_GROUP_ALL", group, on }),
      []
    ),
    applyPreset: useCallback(
      (presetId: string) => dispatch({ type: "APPLY_PRESET", presetId }),
      []
    ),
    setYearRange: useCallback(
      (start: number, end: number) =>
        dispatch({ type: "SET_YEAR_RANGE", start, end }),
      []
    ),
    toggleLegalCategory: useCallback(
      (cat: LegalCategory) =>
        dispatch({ type: "TOGGLE_LEGAL_CATEGORY", category: cat }),
      []
    ),
    toggleAnnotations: useCallback(
      () => dispatch({ type: "TOGGLE_ANNOTATIONS" }),
      []
    ),
    toggleLegalEvents: useCallback(
      () => dispatch({ type: "TOGGLE_LEGAL_EVENTS" }),
      []
    ),
    toggleMajorOnly: useCallback(
      () => dispatch({ type: "TOGGLE_MAJOR_ONLY" }),
      []
    ),
  };

  return (
    <ExplorerStateCtx.Provider value={state}>
      <ExplorerActionsCtx.Provider value={actions}>
        {children}
      </ExplorerActionsCtx.Provider>
    </ExplorerStateCtx.Provider>
  );
}

/* ── Hooks ── */
export function useExplorerState(): ExplorerState {
  const ctx = useContext(ExplorerStateCtx);
  if (!ctx) throw new Error("useExplorerState must be inside ExplorerProvider");
  return ctx;
}

export function useExplorerActions(): ExplorerActions {
  const ctx = useContext(ExplorerActionsCtx);
  if (!ctx)
    throw new Error("useExplorerActions must be inside ExplorerProvider");
  return ctx;
}
