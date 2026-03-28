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
            Poverty and inequality are not the same thing — and legal
            interventions affect them differently. This scholarly platform
            brings together data from the World Inequality Database, the
            U.S. Census Bureau, and the Federal Reserve to make both
            visible, side by side, alongside the legal history that shaped
            them.
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

      {/* ── Why Poverty and Inequality Together ── */}
      <section>
        <div className="container">
          <p className="section-eyebrow">Core Distinction</p>
          <h2 className="section-title">
            Poverty and Inequality Are Not the Same Thing
          </h2>
          <div className="insight-box" style={{ marginTop: "1.5rem" }}>
            <p>
              This platform presents poverty rates and inequality measures on
              the same chart for a reason: they are fundamentally different
              things, and legal interventions affect them differently. Poverty
              is absolute — it asks whether individuals fall below a threshold
              of material adequacy. Inequality is relative — it asks how
              income and wealth are distributed across the population. A
              society can reduce poverty while inequality rises (as happened
              during much of the 1980s and 1990s, when poverty declined
              modestly while top income shares surged). A society can also
              compress inequality while poverty remains stubbornly high.
            </p>
            <p>
              This distinction matters enormously for law. When a scholar
              writes that a tax reform &ldquo;reduced inequality,&rdquo; do
              they mean it lowered the Gini coefficient? Compressed the top
              10% income share? Lifted families above the poverty line? These
              are different empirical claims requiring different evidence. The
              Earned Income Tax Credit, for example, is one of the most
              effective anti-poverty tools in American law — it lifts millions
              of families above the poverty threshold each year — yet it has
              little measurable effect on the Gini coefficient or top income
              shares. Conversely, a highly progressive estate tax might reduce
              wealth concentration at the top without changing the poverty
              rate at all. Legal scholars who conflate these measures risk
              imprecise policy analysis; this platform makes the distinction
              visible.
            </p>
            <p>
              The historical periods overlaid on the charts reveal a deeper
              pattern. Societies appear to oscillate between tolerance for
              inequality and demand for redistribution. The Gilded Age
              (1870&ndash;1900) produced extraordinary wealth concentration
              that gave way to the Progressive Era&apos;s trust-busting and
              income taxation. The postwar Golden Age (1947&ndash;1973)
              combined strong unions, progressive taxation, and the GI
              Bill to produce both low poverty and compressed inequality
              simultaneously — a rare alignment. That compression unraveled
              after 1980 as tax rates fell, union density declined, and
              financial deregulation concentrated returns to capital. These
              cycles suggest that some degree of inequality may reflect
              productive incentives — returns to entrepreneurial risk,
              innovation, and capital deployment — while excessive
              concentration generates political instability and demands for
              legal correction. This platform does not prescribe the right
              balance. It documents what the data show, so that legal
              scholars, economists, and policymakers can reason from evidence
              when they debate what the law should do.
            </p>
          </div>
        </div>
      </section>

      {/* ── Why This Matters for Law ── */}
      <section style={{ background: "var(--bg-secondary)" }}>
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
              legal change and economic outcomes. It takes no political
              position on what the appropriate level of inequality or poverty
              is — that is a question for democratic deliberation. It does
              insist that the data be read with methodological honesty and
              that the terms be used precisely. Each series has known
              limitations; each spike and trough has plausible legal explanations
              that deserve scrutiny. By placing income concentration, distributional
              inequality, and poverty measures alongside a timeline of major
              legislation, the platform invites the kind of careful,
              interdisciplinary inquiry that the intersection of law, economics,
              and sociology demands.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
