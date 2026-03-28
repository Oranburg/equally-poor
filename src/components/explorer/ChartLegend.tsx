"use client";

import { useExplorerState, useExplorerActions } from "./ExplorerProvider";
import { SERIES_META } from "@/data/series-meta";
import type { SeriesKey } from "@/data/types";

export function ChartLegend() {
  const state = useExplorerState();
  const actions = useExplorerActions();
  const activeKeys = (Object.keys(state.activeSeries) as SeriesKey[]).filter(
    (k) => state.activeSeries[k]
  );

  if (activeKeys.length === 0) return null;

  return (
    <div className="chart-legend">
      {activeKeys.map((key) => {
        const meta = SERIES_META[key];
        if (!meta) return null;
        return (
          <span
            key={key}
            className="legend-item"
            onClick={() => actions.toggleSeries(key)}
            title={`Click to hide ${meta.shortLabel}`}
          >
            <span
              className="legend-swatch"
              style={{
                background: meta.dashed ? "transparent" : meta.color,
                borderBottom: meta.dashed
                  ? `2px dashed ${meta.color}`
                  : "none",
                height: meta.dashed ? "0" : "3px",
              }}
            />
            {meta.shortLabel}
          </span>
        );
      })}
    </div>
  );
}
