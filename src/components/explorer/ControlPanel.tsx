"use client";

import { PresetBar } from "./PresetBar";
import { SeriesGroup } from "./SeriesGroup";
import { OverlayControls } from "./OverlayControls";
import { PeriodControls } from "./PeriodControls";

export function ControlPanel() {
  return (
    <div className="control-panel" role="region" aria-label="Chart controls">
      <PresetBar />
      <div style={{ padding: "0.5rem 0.75rem" }}>
        <SeriesGroup group="inequality" title="Inequality" />
        <SeriesGroup group="poverty" title="Poverty" />
        <OverlayControls />
        <PeriodControls />
      </div>
    </div>
  );
}
