"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import * as d3 from "d3";
import {
  top10Data,
  top1Data,
  giniData,
  povertyData,
  povertyPre,
  annotations,
} from "@/data";
import type { DataPoint, SeriesKey } from "@/data";

export default function ExplorePage() {
  // ── State ──
  const [active, setActive] = useState<Record<SeriesKey, boolean>>({
    top10: true,
    top1: true,
    gini: true,
    poverty: true,
    povertyPre: false,
  });
  const [startYear, setStartYear] = useState(1913);
  const [endYear, setEndYear] = useState(2024);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [giniRightAxis, setGiniRightAxis] = useState(true);
  const [activePreset, setActivePreset] = useState("all");
  const [tableFilter, setTableFilter] = useState("");
  const [openCaveats, setOpenCaveats] = useState<Set<number>>(new Set());

  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);

  // ── Constants ──
  const COLORS: Record<SeriesKey, string> = {
    top10: "#B21F2C",
    top1: "#E96955",
    gini: "#2459A9",
    poverty: "#0A3255",
    povertyPre: "#6DACDE",
  };

  const LABELS: Record<SeriesKey, string> = {
    top10: "Top 10% Income Share (excl. cap gains)",
    top1: "Top 1% Income Share (incl. cap gains)",
    gini: "Gini Coefficient",
    poverty: "Official Poverty Rate",
    povertyPre: "Pre-1959 Estimates (unofficial)",
  };

  const DATA_MAP: Record<SeriesKey, DataPoint[]> = useMemo(
    () => ({
      top10: top10Data,
      top1: top1Data,
      gini: giniData,
      poverty: povertyData,
      povertyPre: povertyPre,
    }),
    []
  );

  const PRESETS = [
    { id: "all", label: "All (1913\u2013)", start: 1913, end: 2024 },
    { id: "postWWII", label: "Post-WWII", start: 1946, end: 2024 },
    { id: "1967", label: "1967+ (All series)", start: 1967, end: 2024 },
    { id: "reagan", label: "Post-Reagan", start: 1981, end: 2024 },
    { id: "2000", label: "Since 2000", start: 2000, end: 2024 },
  ];

  // ── Helpers ──
  function cssVar(name: string): string {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(name)
      .trim();
  }

  function getSeriesData(key: SeriesKey): DataPoint[] {
    return (DATA_MAP[key] || []).filter(
      (d) => d.year >= startYear && d.year <= endYear
    );
  }

  // ── Chart ──
  const buildChart = useCallback(() => {
    if (!svgRef.current || !wrapperRef.current) return;

    const MARGIN = { top: 24, right: 80, bottom: 45, left: 65 };
    const totalW = Math.max(wrapperRef.current.clientWidth || 900, 480);
    const totalH = 520;
    const W = totalW - MARGIN.left - MARGIN.right;
    const H = totalH - MARGIN.top - MARGIN.bottom;

    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll("*").remove();

    const svg = svgEl.attr("width", totalW).attr("height", totalH);
    const g = svg
      .append("g")
      .attr("transform", `translate(${MARGIN.left},${MARGIN.top})`);

    const activeKeys = (Object.keys(active) as SeriesKey[]).filter(
      (k) => active[k]
    );

    // X scale
    const allYears: number[] = [];
    activeKeys.forEach((k) =>
      getSeriesData(k).forEach((d) => allYears.push(d.year))
    );
    if (allYears.length === 0) return;
    const xScale = d3
      .scaleLinear()
      .domain([Math.min(...allYears), Math.max(...allYears)])
      .range([0, W]);

    // Separate gini from left axis
    const inequalityKeys = activeKeys.filter((k) => k !== "gini");
    const giniActive = activeKeys.includes("gini") && giniRightAxis;

    // Left y-scale
    let leftMin = 0.05,
      leftMax = 0.6;
    inequalityKeys.forEach((k) => {
      getSeriesData(k).forEach((d) => {
        leftMin = Math.min(leftMin, d.value * 0.95);
        leftMax = Math.max(leftMax, d.value * 1.05);
      });
    });
    if (!giniActive && activeKeys.includes("gini")) {
      getSeriesData("gini").forEach((d) => {
        leftMin = Math.min(leftMin, d.value * 0.95);
        leftMax = Math.max(leftMax, d.value * 1.05);
      });
    }
    const yLeft = d3
      .scaleLinear()
      .domain([leftMin, leftMax])
      .range([H, 0])
      .nice();

    // Right y-scale: Gini
    const yRight = d3.scaleLinear().domain([0.35, 0.55]).range([H, 0]);

    // Gridlines
    g.append("g")
      .attr("class", "grid")
      .selectAll("line")
      .data(yLeft.ticks(7))
      .join("line")
      .attr("x1", 0)
      .attr("x2", W)
      .attr("y1", (d) => yLeft(d))
      .attr("y2", (d) => yLeft(d))
      .attr("stroke", cssVar("--chart-grid"))
      .attr("stroke-dasharray", "3 3");

    // Vertical decade ticks
    const decadeTicks = d3.range(
      Math.ceil(startYear / 10) * 10,
      endYear + 1,
      10
    );
    g.append("g")
      .attr("class", "grid")
      .selectAll("line.vline")
      .data(decadeTicks)
      .join("line")
      .attr("x1", (d) => xScale(d))
      .attr("x2", (d) => xScale(d))
      .attr("y1", 0)
      .attr("y2", H)
      .attr("stroke", cssVar("--chart-grid"))
      .attr("stroke-dasharray", "2 4");

    // Annotations
    if (showAnnotations) {
      annotations.forEach((ann) => {
        if (ann.year < startYear || ann.year > endYear) return;
        if (ann.type === "band" && ann.end) {
          const x1 = xScale(ann.year);
          const x2 = xScale(Math.min(ann.end, endYear));
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
        } else {
          const x = xScale(ann.year);
          g.append("line")
            .attr("x1", x)
            .attr("x2", x)
            .attr("y1", 0)
            .attr("y2", H)
            .attr("stroke", ann.color)
            .attr("stroke-width", 1)
            .attr("stroke-dasharray", "5 3")
            .attr("opacity", 0.7);
          g.append("text")
            .attr("x", x + 3)
            .attr("y", 12)
            .attr("font-family", "Roboto, sans-serif")
            .attr("font-size", "9px")
            .attr("fill", ann.color)
            .attr("font-weight", "600")
            .text(ann.label);
        }
      });
    }

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
          .axisLeft(yLeft)
          .ticks(7)
          .tickFormat((d) => (Number(d) * 100).toFixed(0) + "%")
      );

    if (giniActive) {
      g.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${W},0)`)
        .call(
          d3
            .axisRight(yRight)
            .ticks(6)
            .tickFormat((d) => Number(d).toFixed(2))
        );

      svg
        .append("text")
        .attr("x", MARGIN.left + W + 70)
        .attr("y", MARGIN.top + H / 2)
        .attr(
          "transform",
          `rotate(90,${MARGIN.left + W + 70},${MARGIN.top + H / 2})`
        )
        .attr("text-anchor", "middle")
        .attr("font-family", "Roboto, sans-serif")
        .attr("font-size", "11px")
        .attr("fill", cssVar("--chart-text"))
        .text("Gini Coefficient");
    }

    svg
      .append("text")
      .attr("x", -(MARGIN.top + H / 2))
      .attr("y", 15)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .attr("font-family", "Roboto, sans-serif")
      .attr("font-size", "11px")
      .attr("fill", cssVar("--chart-text"))
      .text("Share / Rate (%)");

    // Draw series lines
    const seriesDefs: {
      key: SeriesKey;
      yScale: d3.ScaleLinear<number, number>;
      dashed: boolean;
    }[] = [
      { key: "top10", yScale: yLeft, dashed: false },
      { key: "top1", yScale: yLeft, dashed: false },
      {
        key: "gini",
        yScale: giniActive ? yRight : yLeft,
        dashed: false,
      },
      { key: "poverty", yScale: yLeft, dashed: false },
      { key: "povertyPre", yScale: yLeft, dashed: true },
    ];

    seriesDefs.forEach((s) => {
      if (!active[s.key]) return;
      const data = getSeriesData(s.key);
      if (!data.length) return;
      const lineGen = d3
        .line<DataPoint>()
        .defined((d) => d.value != null)
        .x((d) => xScale(d.year))
        .y((d) => s.yScale(d.value))
        .curve(d3.curveMonotoneX);

      g.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", lineGen)
        .attr("stroke", COLORS[s.key])
        .attr("stroke-width", s.key === "povertyPre" ? 2 : 2.5)
        .attr("stroke-dasharray", s.dashed ? "6 4" : null)
        .attr("fill", "none");
    });

    // Hover overlay
    const bisect = d3.bisector<DataPoint, number>((d) => d.year).left;
    const overlay = g
      .append("rect")
      .attr("width", W)
      .attr("height", H)
      .attr("fill", "none")
      .attr("pointer-events", "all")
      .style("cursor", "crosshair");

    const hLine = g
      .append("line")
      .attr("stroke", cssVar("--chart-text"))
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "4 2")
      .attr("y1", 0)
      .attr("y2", H)
      .style("opacity", 0);

    const tip = tipRef.current;

    overlay
      .on("mousemove", function (event: MouseEvent) {
        const [mx] = d3.pointer(event, g.node());
        const yr = Math.round(xScale.invert(mx));
        hLine.attr("x1", xScale(yr)).attr("x2", xScale(yr)).style("opacity", 1);

        let html = `<strong>${yr}</strong><br>`;
        seriesDefs.forEach((s) => {
          if (!active[s.key]) return;
          const data = getSeriesData(s.key);
          const idx = bisect(data, yr);
          const candidates = [data[idx - 1], data[idx]].filter(Boolean);
          if (!candidates.length) return;
          const d = candidates.reduce((a, b) =>
            Math.abs(b.year - yr) < Math.abs(a.year - yr) ? b : a
          );
          if (Math.abs(d.year - yr) > 2) return;
          let fmt: (v: number) => string;
          if (s.key === "gini") {
            fmt = (v) => v.toFixed(3);
          } else {
            fmt = (v) => (v * 100).toFixed(1) + "%";
          }
          html += `<span style="color:${COLORS[s.key]}">\u25A0</span> ${LABELS[s.key].split(" ").slice(0, 3).join(" ")}: <b>${fmt(d.value)}</b><br>`;
        });

        if (tip) {
          tip.innerHTML = html;
          tip.classList.add("visible");
          tip.style.left =
            Math.min(event.clientX + 14, window.innerWidth - 240) + "px";
          tip.style.top = event.clientY - 28 + "px";
        }
      })
      .on("mouseleave", () => {
        hLine.style("opacity", 0);
        if (tip) tip.classList.remove("visible");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, startYear, endYear, showAnnotations, giniRightAxis]);

  useEffect(() => {
    buildChart();
    const handleResize = () => {
      buildChart();
    };
    const ro = new ResizeObserver(handleResize);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, [buildChart]);

  // Listen for theme changes to redraw
  useEffect(() => {
    const handler = () => buildChart();
    window.addEventListener("themechange", handler);
    return () => window.removeEventListener("themechange", handler);
  }, [buildChart]);

  // ── Series toggle ──
  function toggleSeries(key: SeriesKey) {
    setActive((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  // ── Preset ──
  function selectPreset(id: string, start: number, end: number) {
    setActivePreset(id);
    setStartYear(start);
    setEndYear(end);
  }

  // ── Range sliders ──
  function handleStartYear(val: number) {
    if (val >= endYear) val = endYear - 1;
    setStartYear(val);
    setActivePreset("");
  }
  function handleEndYear(val: number) {
    if (val <= startYear) val = startYear + 1;
    setEndYear(val);
    setActivePreset("");
  }

  // ── Accordion ──
  function toggleCaveat(idx: number) {
    setOpenCaveats((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }

  // ── Data Table ──
  const allYears = useMemo(() => {
    const years = new Set<number>();
    [top10Data, top1Data, giniData, povertyData].forEach((arr) =>
      arr.forEach((d) => {
        if (d.year >= startYear && d.year <= endYear) years.add(d.year);
      })
    );
    return [...years].sort((a, b) => b - a);
  }, [startYear, endYear]);

  function lookup(arr: DataPoint[], year: number): number | null {
    const d = arr.find((r) => r.year === year);
    return d ? d.value : null;
  }

  const filteredYears = useMemo(() => {
    const q = tableFilter.trim();
    if (!q) return allYears;
    return allYears.filter((yr) => String(yr).includes(q));
  }, [allYears, tableFilter]);

  function downloadCSV() {
    let csv = "Year,Top10PctShare,Top1PctShare,GiniCoefficient,PovertyRate\n";
    allYears.forEach((yr) => {
      const t10 = lookup(top10Data, yr);
      const t1 = lookup(top1Data, yr);
      const gin = lookup(giniData, yr);
      const pov = lookup(povertyData, yr);
      csv += `${yr},${t10 !== null ? t10.toFixed(4) : ""},${t1 !== null ? t1.toFixed(4) : ""},${gin !== null ? gin.toFixed(4) : ""},${pov !== null ? pov.toFixed(4) : ""}\n`;
    });
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "equally-poor-data.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  // ── Caveats data ──
  const caveats = [
    {
      title: "Piketty-Saez: Income-Timing Artifacts",
      body: "The 1986 Tax Reform Act reduced the top marginal rate from 50% to 28% effective in 1987. High-income taxpayers accelerated income realization into 1986, producing an artificial spike in top income shares that year. Similarly, before the 2013 rate increase, income was pulled forward into 2012, causing another spike. These are measurement artifacts, not genuine changes in inequality.",
    },
    {
      title: "Piketty-Saez vs. Auten-Splinter: A Contested Measurement",
      body: 'Gerald Auten and David Splinter, in Income Inequality in the United States: Using Tax Data to Measure Long-Term Trends (Journal of Political Economy, 2024), argue that after accounting for taxes paid, government transfers received, and adjustments for non-filers, post-tax-and-transfer inequality has increased far less than Piketty-Saez indicate. The debate turns on how to allocate corporate retained earnings, government transfers, and non-cash benefits. This platform presents the Piketty-Saez series because it is the most widely cited and internally consistent over the longest time horizon, but readers should consult the Auten-Splinter series for a contrasting view.',
    },
    {
      title: "Census Gini: Series Breaks (1993, 2013-14, 2017-18)",
      body: "The Census Gini series contains three documented discontinuities. In 1993, the Census Bureau switched to computer-assisted telephone interviewing (CATI), which increased reported income. In 2013\u201314, the income questions in the CPS ASEC were redesigned, producing a measurable upward shift in reported income inequality. In 2017\u201318, processing updates changed how certain income items were coded. These breaks mean that long-run trend comparisons should be made with caution. The Census Bureau publishes estimates on both old and new processing bases at transition points.",
    },
    {
      title: "Official Poverty Measure: Known Limitations",
      body: "The Official Poverty Measure (OPM) uses thresholds developed by Mollie Orshansky in 1963\u201364, based on the cost of a USDA Economy Food Plan multiplied by three (reflecting that food then consumed ~1/3 of family budgets). Updated only for CPI since 1969, these thresholds have not been adjusted for changes in living standards. The OPM counts only pre-tax cash income, excluding SNAP, Medicaid, housing subsidies, and the Earned Income Tax Credit (EITC) \u2014 which means it cannot capture the full effect of anti-poverty programs. The Supplemental Poverty Measure (SPM), published annually by the Census Bureau since 2009, is widely preferred by researchers as it counts more income sources and uses updated thresholds. Readers should consult SPM data for policy analysis.",
    },
    {
      title: "Pre-1959 Poverty Estimates: Unofficial & Uncertain",
      body: 'No household survey capable of supporting official poverty estimates existed before 1947. The pre-1959 estimates displayed here when selected come from two sources: (1) Gordon M. Fisher (ASPE/HHS, 1986), covering 1947\u20131958 \u2014 these estimates were withdrawn by Fisher himself in 1999 and should not be cited as authoritative; and (2) Robert D. Plotnick, Eugene Smolensky, Eirik Evenhouse, and Siobhan Reilly, "The Twentieth-Century Record of Inequality and Poverty in the United States," in The Cambridge Economic History of the United States, vol. III (2000), covering 1914\u20131946. Plotnick et al. themselves caution: "It strikes us as unreasonable to assert that 60% of Americans were poor in 1920" \u2014 the numbers depend entirely on how Orshansky thresholds are backdated. These figures are displayed for illustrative historical context only.',
    },
  ];

  // ── Button style helpers ──
  function seriesBtnStyle(key: SeriesKey) {
    if (active[key]) {
      return {
        background: COLORS[key],
        color: "#fff",
        borderColor: COLORS[key],
      };
    }
    return {};
  }

  function toggleBtnStyle(isActive: boolean) {
    if (isActive) {
      return {
        background: "#0A3255",
        color: "#fff",
        borderColor: "#0A3255",
      };
    }
    return {};
  }

  return (
    <>
      {/* Hero */}
      <section className="hero hero--short" aria-labelledby="explore-hero-title">
        <div className="container">
          <p className="hero-eyebrow">Interactive Visualization</p>
          <h1 id="explore-hero-title">Data Explorer</h1>
          <p>
            Explore four decades-spanning measures of income inequality and
            poverty in the United States. Toggle series, filter by historical
            period, and overlay legislative milestones. All data sourced from
            peer-reviewed and government sources &mdash; see{" "}
            <Link href="/methodology" style={{ color: "var(--light-blue)" }}>
              Methodology
            </Link>{" "}
            for full caveats.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section
        aria-labelledby="explorer-section-title"
        style={{
          background: "var(--off-white)",
          paddingTop: "2rem",
          paddingBottom: "3rem",
        }}
      >
        <div className="container--wide">
          <h2 className="sr-only" id="explorer-section-title">
            Interactive Chart Controls
          </h2>

          {/* Control Panel */}
          <div
            className="control-panel"
            role="region"
            aria-label="Chart controls"
          >
            {/* Series Row */}
            <div className="control-row">
              <span className="control-label" id="series-label">
                Series
              </span>
              <div
                className="toggle-group"
                role="group"
                aria-labelledby="series-label"
              >
                {(
                  [
                    ["top10", "Top 10% Share"],
                    ["top1", "Top 1% Share"],
                    ["gini", "Gini Coefficient"],
                    ["poverty", "Poverty Rate"],
                    ["povertyPre", "Pre-1959 Estimates*"],
                  ] as [SeriesKey, string][]
                ).map(([key, label]) => (
                  <button
                    key={key}
                    className={`toggle-btn${active[key] ? " active" : ""}`}
                    data-series={key}
                    aria-pressed={active[key]}
                    style={seriesBtnStyle(key)}
                    onClick={() => toggleSeries(key)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Period Row */}
            <div className="control-row">
              <span className="control-label" id="period-label">
                Period
              </span>
              <div
                className="preset-group"
                role="group"
                aria-labelledby="period-label"
              >
                {PRESETS.map((p) => (
                  <button
                    key={p.id}
                    className={`preset-btn${activePreset === p.id ? " active" : ""}`}
                    onClick={() => selectPreset(p.id, p.start, p.end)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
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
                  onChange={(e) => handleStartYear(parseInt(e.target.value))}
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
                  onChange={(e) => handleEndYear(parseInt(e.target.value))}
                />
                <span className="range-value">{endYear}</span>
              </div>
            </div>

            {/* Annotations + Gini Axis Row */}
            <div className="control-row">
              <span className="control-label" id="annot-label">
                Annotations
              </span>
              <div
                className="toggle-group"
                role="group"
                aria-labelledby="annot-label"
              >
                <button
                  className={`toggle-btn${showAnnotations ? " active" : ""}`}
                  aria-pressed={showAnnotations}
                  style={toggleBtnStyle(showAnnotations)}
                  onClick={() => setShowAnnotations((v) => !v)}
                >
                  Show Historical Events
                </button>
              </div>
              <span
                className="control-label"
                style={{ marginLeft: "1.5rem" }}
                id="axis-label"
              >
                Right Axis
              </span>
              <div
                className="toggle-group"
                role="group"
                aria-labelledby="axis-label"
              >
                <button
                  className={`toggle-btn${giniRightAxis ? " active" : ""}`}
                  aria-pressed={giniRightAxis}
                  style={toggleBtnStyle(giniRightAxis)}
                  onClick={() => setGiniRightAxis((v) => !v)}
                >
                  Gini on Right Axis
                </button>
              </div>
            </div>
          </div>

          {/* Pre-1959 caveat */}
          {active.povertyPre && (
            <div className="caveat-box">
              <strong>Warning &mdash; Unofficial Estimates:</strong> Pre-1959
              poverty data are econometric backcasts with no underlying household
              survey. The 1947&ndash;1958 estimates (Fisher 1986) were withdrawn
              by their author in 1999. The 1914&ndash;1946 estimates (Plotnick et
              al. 2000) are highly uncertain. Do not use for quantitative analysis
              without reading the full{" "}
              <Link href="/methodology">methodology</Link>.
            </div>
          )}

          {/* Main Chart */}
          <div className="chart-container" style={{ padding: "1.5rem 1rem" }}>
            <div className="chart-title">
              U.S. Income Inequality &amp; Poverty, 1913&ndash;2024
            </div>
            <div className="chart-subtitle">
              Hover over the chart to see values. Click legend items to toggle
              individual series.
            </div>
            <div className="chart-wrapper" ref={wrapperRef}>
              <svg
                ref={svgRef}
                role="img"
                aria-label="Multi-series inequality chart with interactive controls"
              />
            </div>
            <div className="chart-legend" aria-label="Chart series legend">
              {(Object.keys(active) as SeriesKey[])
                .filter((k) => active[k])
                .map((key) => (
                  <div
                    key={key}
                    className="legend-item"
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleSeries(key)}
                    aria-label={`Toggle ${LABELS[key]}`}
                  >
                    <span
                      className="legend-swatch"
                      style={
                        key === "povertyPre"
                          ? {
                              background: "none",
                              borderTop: `3px dashed ${COLORS[key]}`,
                            }
                          : { background: COLORS[key] }
                      }
                    />
                    <span>{LABELS[key]}</span>
                  </div>
                ))}
            </div>
            <p className="chart-source">
              Sources: Piketty &amp; Saez (2024); Census Bureau CPS ASEC;
              Shrider, P60-287 (2025); Plotnick et al. (2000) [pre-1959,
              unofficial].{" "}
              <Link href="/methodology">Full methodology &rarr;</Link>
            </p>
          </div>

          {/* Data Table */}
          <div style={{ marginTop: "2.5rem" }}>
            <div className="table-controls">
              <h2
                style={{
                  fontSize: "1.2rem",
                  color: "var(--catholic-blue)",
                  fontFamily: "var(--font-headline)",
                }}
              >
                Data Table
              </h2>
              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <input
                  type="text"
                  className="table-search"
                  placeholder="Filter by year\u2026"
                  aria-label="Filter table by year"
                  value={tableFilter}
                  onChange={(e) => setTableFilter(e.target.value)}
                />
                <button
                  className="btn btn-outline btn-sm"
                  aria-label="Download data as CSV"
                  onClick={downloadCSV}
                >
                  Download CSV
                </button>
              </div>
            </div>
            <div className="data-table-wrapper">
              <table
                className="data-table"
                aria-label="Inequality data by year"
              >
                <thead>
                  <tr>
                    <th scope="col">Year</th>
                    <th scope="col">Top 10% Share</th>
                    <th scope="col">Top 1% Share</th>
                    <th scope="col">Gini</th>
                    <th scope="col">Poverty Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredYears.map((yr) => {
                    const t10 = lookup(top10Data, yr);
                    const t1 = lookup(top1Data, yr);
                    const gin = lookup(giniData, yr);
                    const pov = lookup(povertyData, yr);
                    return (
                      <tr key={yr}>
                        <td>{yr}</td>
                        <td>
                          {t10 !== null
                            ? (t10 * 100).toFixed(1) + "%"
                            : "\u2014"}
                        </td>
                        <td>
                          {t1 !== null
                            ? (t1 * 100).toFixed(1) + "%"
                            : "\u2014"}
                        </td>
                        <td>
                          {gin !== null ? gin.toFixed(3) : "\u2014"}
                        </td>
                        <td>
                          {pov !== null
                            ? (pov * 100).toFixed(1) + "%"
                            : "\u2014"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Caveats Accordion */}
          <div style={{ marginTop: "2.5rem" }}>
            <h2
              style={{
                fontSize: "1.2rem",
                color: "var(--catholic-blue)",
                fontFamily: "var(--font-headline)",
                marginBottom: "1rem",
              }}
            >
              Data Caveats &amp; Series Notes
            </h2>

            {caveats.map((c, i) => (
              <div className="accordion" key={i}>
                <button
                  className="accordion-trigger"
                  aria-expanded={openCaveats.has(i)}
                  aria-controls={`caveat-${i + 1}`}
                  onClick={() => toggleCaveat(i)}
                >
                  {c.title}
                  <span className="accordion-icon" aria-hidden="true">
                    +
                  </span>
                </button>
                <div
                  className={`accordion-body${openCaveats.has(i) ? " open" : ""}`}
                  id={`caveat-${i + 1}`}
                  role="region"
                >
                  {c.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tooltip */}
      <div className="chart-tooltip" ref={tipRef} />
    </>
  );
}
