"use client";

import { ExplorerProvider } from "@/components/explorer/ExplorerProvider";
import { ControlPanel } from "@/components/explorer/ControlPanel";
import { ExplorerChart } from "@/components/explorer/ExplorerChart";
import { ChartLegend } from "@/components/explorer/ChartLegend";
import { DataTable } from "@/components/explorer/DataTable";
import { CaveatAccordion } from "@/components/explorer/CaveatAccordion";

export default function ExplorePage() {
  return (
    <ExplorerProvider>
      {/* Hero */}
      <section className="hero hero--short" aria-labelledby="explore-hero-title">
        <div className="container">
          <p className="hero-eyebrow">Interactive Analysis</p>
          <h1 id="explore-hero-title">Data Explorer</h1>
          <p>
            Poverty and inequality measured side by side — toggle between
            12 data series, overlay legal events, and explore over a century
            of American economic history.
          </p>
        </div>
      </section>

      {/* Chart Section */}
      <section>
        <div className="container">
          <ControlPanel />
          <div className="chart-container">
            <ExplorerChart />
            <ChartLegend />
          </div>
        </div>
      </section>

      {/* Data Table */}
      <section style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <p className="section-eyebrow">Raw Data</p>
          <h2 className="section-title">Data Table</h2>
          <DataTable />
        </div>
      </section>

      {/* Caveats */}
      <section>
        <div className="container">
          <p className="section-eyebrow">Transparency</p>
          <h2 className="section-title">Methodological Caveats</h2>
          <CaveatAccordion />
        </div>
      </section>
    </ExplorerProvider>
  );
}
