"use client";

import { useState } from "react";
import type { LegalCategory } from "@/data";
import { LEGAL_CATEGORY_COLORS, LEGAL_CATEGORY_LABELS } from "@/data";
import { useExplorerState, useExplorerActions } from "./ExplorerProvider";

const ALL_CATEGORIES: LegalCategory[] = [
  "tax",
  "labor",
  "safetyNet",
  "financialReg",
  "civilRights",
  "trade",
  "scotus",
];

export function OverlayControls() {
  const {
    showAnnotations,
    legalEventsEnabled,
    activeLegalCategories,
    majorEventsOnly,
  } = useExplorerState();
  const {
    toggleAnnotations,
    toggleLegalEvents,
    toggleLegalCategory,
    toggleMajorOnly,
  } = useExplorerActions();

  const [open, setOpen] = useState(false);

  return (
    <div className="overlay-section">
      <button
        className="overlay-section__trigger"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{open ? "\u25BE" : "\u25B8"} Overlays</span>
        <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>
          {showAnnotations ? "Periods on" : "Periods off"}
          {legalEventsEnabled ? " / Legal on" : ""}
        </span>
      </button>

      <div className={`overlay-section__body${open ? " open" : ""}`}>
        {/* Historical Periods */}
        <div style={{ marginBottom: "0.5rem" }}>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "var(--font-body)",
              fontSize: "0.78rem",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={showAnnotations}
              onChange={toggleAnnotations}
            />
            Historical Periods (shaded bands)
          </label>
        </div>

        {/* Legal Events master toggle */}
        <div style={{ marginBottom: "0.5rem" }}>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "var(--font-body)",
              fontSize: "0.78rem",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={legalEventsEnabled}
              onChange={toggleLegalEvents}
            />
            Legal Event Markers
          </label>
        </div>

        {/* Category toggles */}
        {legalEventsEnabled && (
          <div style={{ marginTop: "0.4rem" }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.3rem",
                marginBottom: "0.5rem",
              }}
            >
              {ALL_CATEGORIES.map((cat) => {
                const isActive = activeLegalCategories.has(cat);
                const color = LEGAL_CATEGORY_COLORS[cat];
                return (
                  <button
                    key={cat}
                    className={`legal-toggle${isActive ? " active" : ""}`}
                    style={
                      isActive
                        ? { background: color, borderColor: color, color: "#fff" }
                        : { borderColor: color, color }
                    }
                    onClick={() => toggleLegalCategory(cat)}
                    aria-pressed={isActive}
                  >
                    {LEGAL_CATEGORY_LABELS[cat]}
                  </button>
                );
              })}
            </div>

            {/* Major events only */}
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "var(--font-body)",
                fontSize: "0.72rem",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={majorEventsOnly}
                onChange={toggleMajorOnly}
              />
              Major events only
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
