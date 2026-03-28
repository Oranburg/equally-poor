"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import * as d3 from "d3";
import { top10Data, keyLegislation, scotusCases, annotations } from "@/data";
import type { DataPoint, Legislation } from "@/data";

export default function LegalPage() {
  // ── Timeline filter state ──
  const [timelineFilter, setTimelineFilter] = useState<
    "all" | "tax" | "welfare" | "labor"
  >("all");

  // ── Chart refs ──
  const chartWrapperRef = useRef<HTMLDivElement>(null);
  const chartSvgRef = useRef<SVGSVGElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);

  function cssVar(name: string): string {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(name)
      .trim();
  }

  const TYPE_COLORS: Record<string, string> = {
    tax: "var(--catholic-red)",
    welfare: "var(--bright-blue)",
    labor: "#8a6500",
  };

  const filteredLegislation =
    timelineFilter === "all"
      ? keyLegislation
      : keyLegislation.filter((l) => l.type === timelineFilter);

  // ── Legislation Chart ──
  const buildChart = useCallback(() => {
    if (!chartSvgRef.current || !chartWrapperRef.current) return;

    const MARGIN = { top: 24, right: 40, bottom: 45, left: 65 };
    const totalW = Math.max(chartWrapperRef.current.clientWidth || 900, 480);
    const totalH = 440;
    const W = totalW - MARGIN.left - MARGIN.right;
    const H = totalH - MARGIN.top - MARGIN.bottom;

    const svgEl = d3.select(chartSvgRef.current);
    svgEl.selectAll("*").remove();

    const svg = svgEl.attr("width", totalW).attr("height", totalH);
    const g = svg
      .append("g")
      .attr("transform", `translate(${MARGIN.left},${MARGIN.top})`);

    // Scales
    const xScale = d3
      .scaleLinear()
      .domain([1917, 2022])
      .range([0, W]);

    const yExtent = d3.extent(top10Data, (d) => d.value) as [number, number];
    const yScale = d3
      .scaleLinear()
      .domain([yExtent[0] * 0.95, yExtent[1] * 1.05])
      .range([H, 0])
      .nice();

    // Gridlines
    g.append("g")
      .attr("class", "grid")
      .selectAll("line")
      .data(yScale.ticks(7))
      .join("line")
      .attr("x1", 0)
      .attr("x2", W)
      .attr("y1", (d) => yScale(d))
      .attr("y2", (d) => yScale(d))
      .attr("stroke", cssVar("--chart-grid"))
      .attr("stroke-dasharray", "3 3");

    // Annotation bands (Great Depression, WWII, Great Recession)
    annotations.forEach((ann) => {
      if (ann.type === "band" && ann.end) {
        if (ann.year > 2022 || ann.end < 1917) return;
        const x1 = xScale(Math.max(ann.year, 1917));
        const x2 = xScale(Math.min(ann.end, 2022));
        g.append("rect")
          .attr("x", x1)
          .attr("y", 0)
          .attr("width", x2 - x1)
          .attr("height", H)
          .attr("fill", ann.color)
          .attr("opacity", 0.08);
        g.append("text")
          .attr("x", (x1 + x2) / 2)
          .attr("y", 12)
          .attr("text-anchor", "middle")
          .attr("font-family", "Roboto, sans-serif")
          .attr("font-size", "9px")
          .attr("fill", ann.color)
          .attr("font-weight", "600")
          .text(ann.label);
      }
    });

    // Legislation vertical lines
    const tip = tipRef.current;
    keyLegislation.forEach((leg) => {
      if (leg.year < 1917 || leg.year > 2022) return;
      const x = xScale(leg.year);
      const lineColor =
        leg.type === "tax"
          ? "#B21F2C"
          : leg.type === "welfare"
            ? "#2459A9"
            : "#8a6500";
      const opacity = leg.effect === "increase" ? 0.7 : 0.7;

      g.append("line")
        .attr("x1", x)
        .attr("x2", x)
        .attr("y1", 0)
        .attr("y2", H)
        .attr("stroke", lineColor)
        .attr("stroke-width", 1.5)
        .attr("stroke-dasharray", "5 3")
        .attr("opacity", opacity)
        .style("cursor", "pointer")
        .on("mouseover", function (event: MouseEvent) {
          d3.select(this).attr("stroke-width", 3).attr("opacity", 1);
          if (tip) {
            tip.innerHTML = `<strong>${leg.year}</strong><br>${leg.title}`;
            tip.classList.add("visible");
            tip.style.left =
              Math.min(event.clientX + 14, window.innerWidth - 240) + "px";
            tip.style.top = event.clientY - 28 + "px";
          }
        })
        .on("mousemove", function (event: MouseEvent) {
          if (tip) {
            tip.style.left =
              Math.min(event.clientX + 14, window.innerWidth - 240) + "px";
            tip.style.top = event.clientY - 28 + "px";
          }
        })
        .on("mouseout", function () {
          d3.select(this).attr("stroke-width", 1.5).attr("opacity", opacity);
          if (tip) tip.classList.remove("visible");
        });
    });

    // Axes
    const xTicks = W < 500 ? 5 : 10;
    g.append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0,${H})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.format("d") as (d: d3.NumberValue) => string).ticks(xTicks));

    g.append("g")
      .attr("class", "axis")
      .call(
        d3
          .axisLeft(yScale)
          .ticks(7)
          .tickFormat((d) => (Number(d) * 100).toFixed(0) + "%")
      );

    // Y axis label
    svg
      .append("text")
      .attr("x", -(MARGIN.top + H / 2))
      .attr("y", 15)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .attr("font-family", "Roboto, sans-serif")
      .attr("font-size", "11px")
      .attr("fill", cssVar("--chart-text"))
      .text("Top 10% Income Share");

    // Top 10% line
    const filteredData = top10Data.filter(
      (d) => d.year >= 1917 && d.year <= 2022
    );
    const lineGen = d3
      .line<DataPoint>()
      .defined((d) => d.value != null)
      .x((d) => xScale(d.year))
      .y((d) => yScale(d.value))
      .curve(d3.curveMonotoneX);

    g.append("path")
      .datum(filteredData)
      .attr("d", lineGen)
      .attr("stroke", "#B21F2C")
      .attr("stroke-width", 2.5)
      .attr("fill", "none");
  }, []);

  useEffect(() => {
    buildChart();
    const ro = new ResizeObserver(() => buildChart());
    if (chartWrapperRef.current) ro.observe(chartWrapperRef.current);
    return () => ro.disconnect();
  }, [buildChart]);

  useEffect(() => {
    const handler = () => buildChart();
    window.addEventListener("themechange", handler);
    return () => window.removeEventListener("themechange", handler);
  }, [buildChart]);

  return (
    <>
      {/* Hero */}
      <section className="hero" aria-labelledby="legal-hero-title">
        <div className="container">
          <p className="hero-eyebrow">Law &amp; Economic Distribution</p>
          <h1 id="legal-hero-title">Law &amp; Inequality</h1>
          <p>
            How legislation, taxation, and regulation have shaped &mdash; and
            been shaped by &mdash; economic inequality in America. An interactive
            timeline of major legal interventions from the 16th Amendment through
            the American Rescue Plan.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", marginTop: "1.25rem" }}>
            <a href="#timeline" className="btn btn-primary">
              View Timeline
            </a>
            <a href="#legislation-chart" className="btn btn-secondary">
              Legislation &amp; Trends Chart
            </a>
          </div>
        </div>
      </section>

      {/* Conceptual Framework */}
      <section aria-labelledby="legal-intro-title">
        <div className="container--narrow">
          <div className="section-header">
            <p className="section-eyebrow">Conceptual Framework</p>
            <h2 className="section-title" id="legal-intro-title">
              Law as the Architecture of Distribution
            </h2>
          </div>
          <p>
            Law is the primary mechanism through which societies structure the
            distribution of income and wealth. Property rights determine what can
            be owned and by whom; contract law governs the terms on which labor
            and capital may be exchanged; tax law specifies how much of each
            dollar of income the state claims from earners at different points in
            the distribution; and social insurance law determines who receives
            transfers and under what conditions. These are not neutral background
            rules &mdash; they are distributive choices made through political
            processes and enforced through public institutions. The historical
            record examined on this platform reflects over a century of such
            choices, with measurable consequences for the income shares held by
            the wealthy and the poverty rates experienced by those at the bottom.
          </p>
          <p>
            The relationship between law and inequality is bidirectional, and this
            is what makes inequality a distinctively legal and political problem
            rather than a purely economic one. Concentrated wealth generates
            concentrated political power, which shapes the legal institutions that
            in turn protect and extend that concentration. As Jacob Hacker and
            Paul Pierson documented in{" "}
            <em>Winner-Take-All Politics</em> (2010), the rise in top income
            shares since the 1970s was not the product of impersonal market forces
            alone but of organized political action by economic elites who shaped
            tax law, financial regulation, corporate governance rules, and labor
            law to their advantage. Legal realists from Robert Hale to Duncan
            Kennedy had long argued that private law &mdash; property, contract,
            tort &mdash; was never neutral but always reflected and reinforced
            underlying power distributions. The data now available allow us to
            test these claims quantitatively.
          </p>
          <p>
            This platform documents key legal interventions from 1913 to the
            present and situates them against measurable trends in income
            concentration and poverty. The timeline below codes legislation by
            type &mdash; tax law, welfare and social insurance, and labor
            regulation &mdash; because these three domains have historically been
            the most consequential for the distribution of primary and secondary
            income. The chart below the timeline overlays major legislation
            against the Piketty-Saez top-income series, allowing visual
            inspection of the relationship between legal change and distributional
            outcome. Causation is difficult to establish from aggregate data
            alone; readers are encouraged to consult the primary empirical
            literature cited in the{" "}
            <Link href="/methodology">Methodology</Link> section for more
            rigorous analyses.
          </p>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section
        id="timeline"
        aria-labelledby="timeline-title"
        style={{ background: "var(--off-white)" }}
      >
        <div className="container">
          <div className="section-header">
            <p className="section-eyebrow">1913 &ndash; 2021</p>
            <h2 className="section-title" id="timeline-title">
              Key Legal Interventions
            </h2>
            <p className="section-desc">
              Major federal legislation affecting the distribution of income and
              wealth. Color-coded by legal domain.
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.75rem",
                marginTop: "1rem",
              }}
              role="list"
              aria-label="Legend"
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  fontFamily: "var(--font-ui)",
                  fontSize: "0.82rem",
                }}
              >
                <span
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "var(--catholic-red)",
                    display: "inline-block",
                  }}
                />{" "}
                Tax Legislation
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  fontFamily: "var(--font-ui)",
                  fontSize: "0.82rem",
                }}
              >
                <span
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "var(--bright-blue)",
                    display: "inline-block",
                  }}
                />{" "}
                Welfare &amp; Social Policy
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  fontFamily: "var(--font-ui)",
                  fontSize: "0.82rem",
                }}
              >
                <span
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "#8a6500",
                    display: "inline-block",
                  }}
                />{" "}
                Labor Law
              </span>
            </div>

            {/* Filter buttons */}
            <div
              className="toggle-group"
              style={{ marginTop: "1rem" }}
              role="group"
              aria-label="Filter timeline by type"
            >
              {(
                [
                  ["all", "All"],
                  ["tax", "Tax"],
                  ["welfare", "Welfare"],
                  ["labor", "Labor"],
                ] as [typeof timelineFilter, string][]
              ).map(([value, label]) => (
                <button
                  key={value}
                  className={`toggle-btn${timelineFilter === value ? " active" : ""}`}
                  style={
                    timelineFilter === value
                      ? {
                          background: "var(--catholic-blue)",
                          color: "#fff",
                          borderColor: "var(--catholic-blue)",
                        }
                      : {}
                  }
                  onClick={() => setTimelineFilter(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Timeline items */}
          <div
            className="timeline"
            aria-label="Legislative timeline"
          >
            {filteredLegislation.map((leg, i) => (
              <div
                className="timeline-item"
                key={i}
                data-type={leg.type}
              >
                <div className="timeline-year">{leg.year}</div>
                <div className="timeline-title">
                  {leg.title}
                  <span
                    className={`timeline-badge timeline-badge--${leg.type} timeline-badge--${leg.effect}`}
                  >
                    {leg.type} &middot; {leg.effect}
                  </span>
                </div>
                <div className="timeline-desc">{leg.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legislation & Inequality Chart */}
      <section id="legislation-chart" aria-labelledby="leg-chart-title">
        <div className="container">
          <div className="section-header">
            <p className="section-eyebrow">Data Visualization</p>
            <h2 className="section-title" id="leg-chart-title">
              Legislation &amp; Top Income Share, 1913&ndash;2022
            </h2>
            <p className="section-desc">
              The Piketty-Saez Top 10% income share (excl. capital gains)
              overlaid with major legislative milestones. Red lines mark tax cuts
              or regressive legislation; blue lines mark progressive taxes or
              social programs.
            </p>
          </div>
          <div className="chart-container">
            <div className="chart-title">
              Top 10% Income Share with Legislative Markers
            </div>
            <div className="chart-subtitle">
              Vertical lines = major legislation. Hover over lines for details.
              Shaded bands = major economic disruptions.
            </div>
            <div className="chart-wrapper" ref={chartWrapperRef}>
              <svg
                ref={chartSvgRef}
                role="img"
                aria-label="Top 10% income share with legislative markers overlaid"
              />
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.75rem 1.5rem",
                marginTop: "0.75rem",
                fontFamily: "var(--font-ui)",
                fontSize: "0.82rem",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <span
                  style={{
                    width: "20px",
                    height: "3px",
                    background: "var(--catholic-red)",
                    display: "inline-block",
                  }}
                />{" "}
                Top 10% Income Share
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <span
                  style={{
                    width: "20px",
                    height: "2px",
                    background: "var(--catholic-red)",
                    display: "inline-block",
                    borderTop: "2px dashed var(--catholic-red)",
                  }}
                />{" "}
                Tax Cut / Regressive
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <span
                  style={{
                    width: "20px",
                    height: "2px",
                    background: "var(--bright-blue)",
                    display: "inline-block",
                    borderTop: "2px dashed var(--bright-blue)",
                  }}
                />{" "}
                Progressive Tax / Social Program
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <span
                  style={{
                    width: "20px",
                    height: "2px",
                    background: "#8a6500",
                    display: "inline-block",
                    borderTop: "2px dashed #8a6500",
                  }}
                />{" "}
                Labor Law
              </span>
            </div>
            <p className="chart-source">
              Source: Piketty &amp; Saez (2024 update); legislation from U.S.
              Statutes at Large. See{" "}
              <Link href="/methodology">Methodology</Link> for caveats on causal
              interpretation.
            </p>
          </div>
        </div>
      </section>

      {/* Key Legal Domains */}
      <section
        aria-labelledby="concepts-title"
        style={{ background: "var(--off-white)" }}
      >
        <div className="container">
          <div className="section-header">
            <p className="section-eyebrow">Legal Analysis</p>
            <h2 className="section-title" id="concepts-title">
              Key Legal Domains
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            <div className="concept-card concept-card--red">
              <span className="concept-icon" aria-hidden="true">
                &#x1F4B0;
              </span>
              <h3>Tax Law &amp; Distribution</h3>
              <p style={{ fontSize: "0.975rem", color: "var(--text-gray)" }}>
                The progressivity of the federal income tax has fluctuated
                dramatically since the 16th Amendment. Top marginal rates reached
                94% during World War II and fell to 28% following the 1986 Tax
                Reform Act. Research by Emmanuel Saez and Gabriel Zucman shows
                that the U.S. tax system as a whole (including payroll taxes,
                state and local taxes, and consumption taxes) is now roughly
                proportional across most of the income distribution, with the
                very wealthy facing lower effective rates than the upper-middle
                class. This shift from a progressive to a roughly flat effective
                structure coincides precisely with the rise in top income shares
                documented in the Piketty-Saez data.
              </p>
            </div>
            <div className="concept-card concept-card--blue">
              <span className="concept-icon" aria-hidden="true">
                &#x1F3ED;
              </span>
              <h3>Labor Law &amp; Wages</h3>
              <p style={{ fontSize: "0.975rem", color: "var(--text-gray)" }}>
                The Fair Labor Standards Act (1938) established the federal
                minimum wage and overtime protections, compressing the wage
                distribution from the bottom. The real value of the federal
                minimum wage peaked in 1968 at approximately $12.50 in 2024
                dollars; it has not been increased since 2009. David Card and
                Alan Krueger&apos;s seminal 1994 study showed that state minimum
                wage increases did not reduce employment as classical theory
                predicted, opening a large empirical literature on wage-setting
                in monopsonistic labor markets. Arindrajit Dube&apos;s 2019 NBER
                paper finds that minimum wage increases reduce poverty and
                compress wages at the bottom of the distribution. The decline of
                union density &mdash; from ~35% in the mid-1950s to under 10%
                today &mdash; has been linked by Lawrence Katz and Alan Krueger
                to a substantial portion of the rise in wage inequality.
              </p>
            </div>
            <div className="concept-card concept-card--teal">
              <span className="concept-icon" aria-hidden="true">
                &#x1F3E5;
              </span>
              <h3>Social Insurance &amp; Transfers</h3>
              <p style={{ fontSize: "0.975rem", color: "var(--text-gray)" }}>
                Social insurance programs &mdash; Social Security, Medicare,
                Medicaid, SNAP, housing vouchers, and the EITC &mdash;
                substantially redistribute income below what market outcomes
                would produce. The official poverty rate, which counts only
                pre-tax cash income, does not capture most of these transfers and
                therefore understates their effect. When the Supplemental Poverty
                Measure is used, social insurance programs lift tens of millions
                above the poverty line annually. The 2021 expansion of the Child
                Tax Credit under the American Rescue Plan reduced child poverty
                by approximately 30% in 2021; its expiration in January 2022
                reversed much of that gain within months, providing a natural
                experiment in the distributional effects of social insurance
                design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SCOTUS Cases */}
      <section aria-labelledby="scotus-title">
        <div className="container">
          <div className="section-header">
            <p className="section-eyebrow">Constitutional Law</p>
            <h2 className="section-title" id="scotus-title">
              Key Supreme Court Decisions
            </h2>
            <p className="section-desc">
              Selected Supreme Court cases that have shaped the legal framework
              for taxation, labor regulation, and social insurance.
            </p>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table
              className="scotus-table"
              aria-label="Key Supreme Court decisions affecting inequality"
            >
              <thead>
                <tr>
                  <th scope="col">Case</th>
                  <th scope="col">Year</th>
                  <th scope="col">Issue</th>
                  <th scope="col">Holding &amp; Significance</th>
                </tr>
              </thead>
              <tbody>
                {scotusCases.map((sc, i) => (
                  <tr key={i}>
                    <td>
                      <span className="case-name">{sc.name}</span>
                    </td>
                    <td>{sc.year}</td>
                    <td>{sc.issue}</td>
                    <td>{sc.holding}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Tooltip */}
      <div className="chart-tooltip" ref={tipRef} />
    </>
  );
}
