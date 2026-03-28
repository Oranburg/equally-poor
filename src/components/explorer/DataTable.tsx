"use client";

import { useMemo, useState } from "react";
import { useExplorerState } from "./ExplorerProvider";
import { SERIES_META } from "@/data/series-meta";
import {
  top10Data, top1Data, giniData, giniFamiliesData,
  medianIncomeData, laborShareData,
  povertyData, childPovertyData, elderlyPovertyData,
  femaleHeadedPovertyData, povertyPre,
} from "@/data";
import type { DataPoint, SeriesKey } from "@/data/types";

const DATA_MAP: Partial<Record<SeriesKey, DataPoint[]>> = {
  top10: top10Data,
  top1: top1Data,
  giniHouseholds: giniData,
  giniFamilies: giniFamiliesData,
  medianIncome: medianIncomeData,
  laborShare: laborShareData,
  poverty: povertyData,
  childPoverty: childPovertyData,
  elderlyPoverty: elderlyPovertyData,
  femaleHeadedPoverty: femaleHeadedPovertyData,
  povertyPre: povertyPre,
};

function lookup(data: DataPoint[], year: number): number | null {
  const d = data.find((p) => p.year === year);
  return d ? d.value : null;
}

function formatValue(value: number | null, unit: string): string {
  if (value === null) return "—";
  if (unit === "percent") return `${(value * 100).toFixed(1)}%`;
  if (unit === "decimal") return value.toFixed(3);
  if (unit === "dollars") return `$${value.toLocaleString()}`;
  return value.toString();
}

export function DataTable() {
  const state = useExplorerState();
  const [filter, setFilter] = useState("");

  const activeKeys = useMemo(
    () =>
      (Object.keys(state.activeSeries) as SeriesKey[]).filter(
        (k) => state.activeSeries[k] && DATA_MAP[k]
      ),
    [state.activeSeries]
  );

  const allYears = useMemo(() => {
    const yearSet = new Set<number>();
    for (const key of activeKeys) {
      const data = DATA_MAP[key];
      if (!data) continue;
      for (const d of data) {
        if (d.year >= state.startYear && d.year <= state.endYear) {
          yearSet.add(d.year);
        }
      }
    }
    return [...yearSet].sort((a, b) => b - a);
  }, [activeKeys, state.startYear, state.endYear]);

  const filteredYears = useMemo(
    () =>
      filter
        ? allYears.filter((y) => String(y).includes(filter))
        : allYears,
    [allYears, filter]
  );

  const downloadCSV = () => {
    const headers = ["Year", ...activeKeys.map((k) => SERIES_META[k].label)];
    const rows = allYears.map((year) => {
      const vals = activeKeys.map((k) => {
        const data = DATA_MAP[k];
        if (!data) return "";
        const v = lookup(data, year);
        return v !== null ? v.toString() : "";
      });
      return [year, ...vals].join(",");
    });
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "equally-poor-data.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (activeKeys.length === 0) {
    return (
      <p style={{ color: "var(--text-muted)", fontStyle: "italic" }}>
        Select at least one series to see data.
      </p>
    );
  }

  return (
    <div>
      <div className="table-controls">
        <input
          type="text"
          className="table-search"
          placeholder="Filter by year..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button className="btn btn-outline btn-sm" onClick={downloadCSV}>
          Download CSV
        </button>
      </div>
      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Year</th>
              {activeKeys.map((k) => (
                <th key={k}>{SERIES_META[k].shortLabel}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredYears.slice(0, 100).map((year) => (
              <tr key={year}>
                <td>{year}</td>
                {activeKeys.map((k) => {
                  const data = DATA_MAP[k];
                  const v = data ? lookup(data, year) : null;
                  return (
                    <td key={k}>
                      {formatValue(v, SERIES_META[k].unit)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredYears.length > 100 && (
        <p
          style={{
            fontSize: "0.8rem",
            color: "var(--text-muted)",
            marginTop: "0.5rem",
          }}
        >
          Showing first 100 of {filteredYears.length} rows. Use the filter
          or download CSV for full data.
        </p>
      )}
    </div>
  );
}
