import Link from "next/link";
import type { Metadata } from "next";
import HomeChart from "@/components/charts/HomeChart";

export const metadata: Metadata = {
  title: "Equally Poor — Wealth, Inequality & Law in America",
  description:
    "A scholarly platform for visualizing and analyzing the relationship between economic inequality, poverty, and legal structures in America.",
};

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="hero">
        <div className="container">
          <p className="hero-eyebrow">Equally Poor</p>
          <h1>Wealth, Inequality &amp; Law in America</h1>
          <p>
            A scholarly platform for visualizing and analyzing the relationship
            between economic inequality, poverty, and legal structures — for
            lawyers, economists, and social scientists. Built on primary data
            from Piketty-Saez, the U.S. Census Bureau, and the Federal Reserve.
          </p>
          <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/explore" className="btn btn-primary">
              Explore the Data &rarr;
            </Link>
            <Link href="/legal" className="btn btn-secondary">
              Legal Landscape &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── Key Metrics Strip ── */}
      <section style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="stat-card">
              <div className="stat-label">Top 10% Income Share</div>
              <div className="stat-number">46.1%</div>
              <div className="stat-source">Piketty-Saez (excl. capital gains)</div>
              <div className="stat-year">2022</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Gini Coefficient</div>
              <div className="stat-number">0.485</div>
              <div className="stat-source">U.S. Census Bureau, CPS ASEC</div>
              <div className="stat-year">2023</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Official Poverty Rate</div>
              <div className="stat-number">11.5%</div>
              <div className="stat-source">Census Bureau, P60-287</div>
              <div className="stat-year">2023</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Chart Section ── */}
      <section>
        <div className="container">
          <p className="section-eyebrow">Overview</p>
          <h2 className="section-title">
            Three Measures of Inequality, 1967–2024
          </h2>
          <div className="chart-container">
            <HomeChart />
          </div>
        </div>
      </section>

      {/* ── Platform Tools Grid ── */}
      <section style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <p className="section-eyebrow">Platform</p>
          <h2 className="section-title">Tools &amp; Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" style={{ marginTop: "1.5rem" }}>
            <Link href="/explore" className="card card--red" style={{ textDecoration: "none" }}>
              <div className="card-title">Data Explorer</div>
              <div className="card-text">
                Interactive charts with all three inequality series, legislation
                overlays, and configurable time ranges.
              </div>
              <span className="card-link">Explore &rarr;</span>
            </Link>
            <Link href="/legal" className="card card--blue" style={{ textDecoration: "none" }}>
              <div className="card-title">Legal Landscape</div>
              <div className="card-text">
                Timeline of major tax, welfare, and labor legislation mapped
                against inequality trends.
              </div>
              <span className="card-link">View &rarr;</span>
            </Link>
            <Link href="/methodology" className="card card--yellow" style={{ textDecoration: "none" }}>
              <div className="card-title">Methodology</div>
              <div className="card-text">
                Data sources, measurement limitations, and the scholarly
                framework underlying each series.
              </div>
              <span className="card-link">Read &rarr;</span>
            </Link>
            <Link href="/about" className="card card--green" style={{ textDecoration: "none" }}>
              <div className="card-title">About</div>
              <div className="card-text">
                Project origins, contributors, citation guidance, and the
                pedagogical mission of the platform.
              </div>
              <span className="card-link">Learn more &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured Insight ── */}
      <section>
        <div className="container">
          <p className="section-eyebrow">Featured Insight</p>
          <h2 className="section-title">Why This Matters for Law</h2>
          <div className="insight-box" style={{ marginTop: "1.5rem" }}>
            <p>
              Law is not merely a response to economic conditions — it is the
              primary mechanism through which societies structure the
              distribution of income and wealth in the first place. Property
              rights define what can be owned and by whom. Tax law determines how
              much of each dollar an earner keeps across the income distribution.
              Labor law sets the floor on wages and the terms under which workers
              can organize. Social insurance law determines who receives
              transfers and on what conditions. As Thomas Piketty argued in{" "}
              <em>Capital in the Twenty-First Century</em> (2014), the
              compression of inequality during the mid-twentieth century was not
              an inevitable feature of capitalism but the product of deliberate
              legal and political choices — choices that were subsequently
              reversed.
            </p>
            <p>
              The relationship is bidirectional, and this is what makes
              inequality a distinctively legal problem. Concentrated wealth
              generates concentrated political power, which shapes the legal
              institutions that in turn protect that concentration. The legal
              realists of the early twentieth century understood that private
              law — contract, property, tort — was never neutral but always
              reflected and reinforced underlying power distributions.
              Contemporary law-and-economics scholarship has refined but largely
              confirmed this insight: the rules of market exchange are themselves
              distributional choices. Access to courts, to legal counsel, and to
              administrative processes is itself stratified by income in ways
              that compound primary market inequality.
            </p>
            <p>
              This platform documents the quantitative relationship between
              legal change and economic outcomes. It does not take a political
              position on what the appropriate level of inequality is — that is a
              question for democratic deliberation. It does insist that the data
              be read with methodological honesty. Each series has known
              limitations; each spike and trough has plausible legal explanations
              that deserve scrutiny. The juxtaposition of Piketty-Saez income
              share data, Census Gini coefficients, and official poverty rates
              against a timeline of major legislation is not meant to establish
              causation mechanically, but to prompt the kind of careful,
              interdisciplinary inquiry that the intersection of law, economics,
              and sociology demands.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
