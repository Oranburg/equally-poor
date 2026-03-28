"use client";

import { useExplorerState, useExplorerActions } from "./ExplorerProvider";

const PERIOD_PRESETS = [
  { label: "Full (1913\u2013)", start: 1913, end: 2024 },
  { label: "Post-WWII", start: 1946, end: 2024 },
  { label: "1967+ (All series)", start: 1967, end: 2024 },
  { label: "Post-Reagan", start: 1981, end: 2024 },
  { label: "Since 2000", start: 2000, end: 2024 },
];

export function PeriodControls() {
  const { startYear, endYear } = useExplorerState();
  const { setYearRange } = useExplorerActions();

  function handleStart(val: number) {
    if (val >= endYear) val = endYear - 1;
    setYearRange(val, endYear);
  }

  function handleEnd(val: number) {
    if (val <= startYear) val = startYear + 1;
    setYearRange(startYear, val);
  }

  return (
    <div className="control-section">
      <div className="control-section__header">
        <span className="control-section__title">Period</span>
      </div>

      {/* Period preset buttons */}
      <div
        className="preset-group"
        role="group"
        aria-label="Period presets"
        style={{ marginBottom: "0.5rem" }}
      >
        {PERIOD_PRESETS.map((p) => {
          const isActive = startYear === p.start && endYear === p.end;
          return (
            <button
              key={p.label}
              className={`preset-btn${isActive ? " active" : ""}`}
              onClick={() => setYearRange(p.start, p.end)}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      {/* Year range sliders */}
      <div className="range-input" aria-label="Custom year range">
        <label
          htmlFor="year-start"
          className="control-label"
          style={{ minWidth: "auto", fontSize: "0.72rem" }}
        >
          From
        </label>
        <input
          type="range"
          id="year-start"
          min={1913}
          max={2023}
          value={startYear}
          step={1}
          aria-label="Start year"
          onChange={(e) => handleStart(parseInt(e.target.value))}
        />
        <span className="range-value">{startYear}</span>
        <label
          htmlFor="year-end"
          className="control-label"
          style={{ minWidth: "auto", fontSize: "0.72rem" }}
        >
          To
        </label>
        <input
          type="range"
          id="year-end"
          min={1914}
          max={2024}
          value={endYear}
          step={1}
          aria-label="End year"
          onChange={(e) => handleEnd(parseInt(e.target.value))}
        />
        <span className="range-value">{endYear}</span>
      </div>
    </div>
  );
}
