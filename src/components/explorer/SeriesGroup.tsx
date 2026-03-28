"use client";

import { useState } from "react";
import type { SeriesGroup as SeriesGroupType, SeriesKey } from "@/data";
import { SERIES_META } from "@/data";
import { useExplorerState, useExplorerActions } from "./ExplorerProvider";

interface Props {
  group: SeriesGroupType;
  title: string;
}

export function SeriesGroup({ group, title }: Props) {
  const { activeSeries } = useExplorerState();
  const { toggleSeries, setGroupAll } = useExplorerActions();
  const [collapsed, setCollapsed] = useState(false);

  const entries = (Object.values(SERIES_META)).filter(
    (m) => m.group === group
  );

  const activeCount = entries.filter((m) => activeSeries[m.key]).length;

  return (
    <div className="control-section">
      <div className="control-section__header">
        <button
          className="control-section__title"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
          onClick={() => setCollapsed((v) => !v)}
          aria-expanded={!collapsed}
        >
          {collapsed ? "\u25B8" : "\u25BE"} {title}
          {collapsed && (
            <span style={{ fontWeight: 400, marginLeft: "0.5rem" }}>
              ({activeCount} active)
            </span>
          )}
        </button>
        <div className="control-section__actions">
          <button onClick={() => setGroupAll(group, true)}>All</button>
          <button onClick={() => setGroupAll(group, false)}>None</button>
        </div>
      </div>

      {!collapsed && (
        <div className="toggle-group" role="group" aria-label={`${title} series`}>
          {entries.map((meta) => {
            const isActive = activeSeries[meta.key];
            const isSpm = meta.key === "spm";

            return (
              <button
                key={meta.key}
                className={`toggle-btn${isActive ? " active" : ""}`}
                aria-pressed={isActive}
                disabled={isSpm}
                title={isSpm ? "Coming soon" : meta.label}
                style={{
                  borderLeft: `4px solid ${meta.color}`,
                  ...(isActive
                    ? {
                        background: meta.color,
                        color: "#fff",
                        borderColor: meta.color,
                      }
                    : {}),
                  ...(isSpm ? { opacity: 0.4, cursor: "not-allowed" } : {}),
                }}
                onClick={() => {
                  if (!isSpm) toggleSeries(meta.key as SeriesKey);
                }}
              >
                {meta.shortLabel}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
