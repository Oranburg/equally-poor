"use client";

import { EXPLORER_PRESETS } from "@/data";
import { useExplorerState, useExplorerActions } from "./ExplorerProvider";

export function PresetBar() {
  const { activePreset } = useExplorerState();
  const { applyPreset } = useExplorerActions();

  return (
    <>
      {/* Desktop pills */}
      <div className="preset-bar" role="group" aria-label="Preset views">
        {EXPLORER_PRESETS.map((p) => (
          <button
            key={p.id}
            className={`preset-pill${activePreset === p.id ? " active" : ""}`}
            title={p.description}
            onClick={() => applyPreset(p.id)}
          >
            {p.label}
          </button>
        ))}
        {activePreset === "custom" && (
          <span className="preset-pill preset-pill--custom" aria-live="polite">
            Custom
          </span>
        )}
      </div>

      {/* Mobile select */}
      <select
        className="preset-select"
        value={activePreset}
        onChange={(e) => {
          if (e.target.value !== "custom") applyPreset(e.target.value);
        }}
        aria-label="Choose a preset view"
      >
        {EXPLORER_PRESETS.map((p) => (
          <option key={p.id} value={p.id}>
            {p.label}
          </option>
        ))}
        {activePreset === "custom" && (
          <option value="custom" disabled>
            Custom
          </option>
        )}
      </select>
    </>
  );
}
