"use client";

import { useRef, useEffect, useCallback, useMemo } from "react";
import * as d3 from "d3";
import Link from "next/link";
import type { DataPoint, SeriesKey, UnitType, LegalEvent } from "@/data";
import {
  top10Data,
  top1Data,
  giniData,
  giniFamiliesData,
  medianIncomeData,
  laborShareData,
  povertyData,
  childPovertyData,
  elderlyPovertyData,
  femaleHeadedPovertyData,
  povertyPre,
  annotations,
  legalEvents,
  SERIES_META,
  LEGAL_CATEGORY_COLORS,
  LEGAL_CATEGORY_LABELS,
} from "@/data";
import { useExplorerState } from "./ExplorerProvider";

/* ── Static data map ── */
const DATA_MAP: Partial<Record<SeriesKey, DataPoint[]>> = {
  top10: top10Data,
  top1: top1Data,
  giniHouseholds: giniData,
  giniFamilies: giniFamiliesData,
  medianIncome: medianIncomeData,
  laborShare: laborShareData,
  poverty: povertyData,
  childPoverty: childPovertyData,
  elderlyPoverty: elderlyPovertyData,
  femaleHeadedPoverty: femaleHeadedPovertyData,
  povertyPre: povertyPre,
};

/* ── Helpers ── */
function cssVar(name: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

function formatValue(value: number, unit: UnitType): string {
  switch (unit) {
    case "percent":
      return (value * 100).toFixed(1) + "%";
    case "decimal":
      return value.toFixed(3);
    case "dollars":
      return "$" + value.toLocaleString();
  }
}

export function ExplorerChart() {
  const state = useExplorerState();
  const {
    activeSeries,
    startYear,
    endYear,
    showAnnotations,
    legalEventsEnabled,
    activeLegalCategories,
    majorEventsOnly,
  } = state;

  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);

  /* ── Derived: active keys ── */
  const activeKeys = useMemo(
    () =>
      (Object.keys(activeSeries) as SeriesKey[]).filter(
        (k) => activeSeries[k] && DATA_MAP[k]
      ),
    [activeSeries]
  );

  /* ── Derived: filtered legal events ── */
  const filteredLegalEvents = useMemo(() => {
    if (!legalEventsEnabled) return [];
    return legalEvents.filter((e) => {
      if (!activeLegalCategories.has(e.category)) return false;
      if (majorEventsOnly && !e.major) return false;
      if (e.year < startYear || e.year > endYear) return false;
      return true;
    });
  }, [
    legalEventsEnabled,
    activeLegalCategories,
    majorEventsOnly,
    startYear,
    endYear,
  ]);

  /* ── Smart axis logic ── */
  const axisAssignment = useMemo(() => {
    const activeUnits = new Set<UnitType>();
    activeKeys.forEach((k) => activeUnits.add(SERIES_META[k].unit));

    let leftUnit: UnitType = "percent";
    let rightUnit: UnitType | null = null;

    if (activeUnits.has("percent")) {
      leftUnit = "percent";
      // Find second unit
      for (const u of activeUnits) {
        if (u !== "percent") {
          rightUnit = u;
          break;
        }
      }
    } else {
      // No percent series — first unit goes left
      const units = [...activeUnits];
      leftUnit = units[0] || "percent";
      if (units.length > 1) rightUnit = units[1];
    }

    return { leftUnit, rightUnit };
  }, [activeKeys]);

  /* ── Build chart ── */
  const buildChart = useCallback(() => {
    if (!svgRef.current || !wrapperRef.current) return;

    const MARGIN = { top: 24, right: axisAssignment.rightUnit ? 80 : 40, bottom: 45, left: 65 };
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

    /* ── Helper: get series data in range ── */
    function getSeriesData(key: SeriesKey): DataPoint[] {
      return (DATA_MAP[key] || []).filter(
        (d) => d.year >= startYear && d.year <= endYear
      );
    }

    if (activeKeys.length === 0) {
      g.append("text")
        .attr("x", W / 2)
        .attr("y", H / 2)
        .attr("text-anchor", "middle")
        .attr("font-family", "Roboto, sans-serif")
        .attr("font-size", "14px")
        .attr("fill", cssVar("--text-muted"))
        .text("Select at least one data series to display.");
      return;
    }

    /* ── X scale ── */
    const allYears: number[] = [];
    activeKeys.forEach((k) =>
      getSeriesData(k).forEach((d) => allYears.push(d.year))
    );
    if (allYears.length === 0) return;
    const xScale = d3
      .scaleLinear()
      .domain([Math.min(...allYears), Math.max(...allYears)])
      .range([0, W]);

    /* ── Y scales ── */
    const { leftUnit, rightUnit } = axisAssignment;

    const leftKeys = activeKeys.filter(
      (k) => SERIES_META[k].unit === leftUnit
    );
    const rightKeys = rightUnit
      ? activeKeys.filter((k) => SERIES_META[k].unit === rightUnit)
      : [];

    function computeDomain(keys: SeriesKey[]): [number, number] {
      let min = Infinity,
        max = -Infinity;
      keys.forEach((k) => {
        getSeriesData(k).forEach((d) => {
          if (d.value < min) min = d.value;
          if (d.value > max) max = d.value;
        });
      });
      if (!isFinite(min)) return [0, 1];
      const pad = (max - min) * 0.05 || 0.01;
      return [min - pad, max + pad];
    }

    const [leftMin, leftMax] = computeDomain(leftKeys);
    const yLeft = d3
      .scaleLinear()
      .domain([leftMin, leftMax])
      .range([H, 0])
      .nice();

    let yRight: d3.ScaleLinear<number, number> | null = null;
    if (rightUnit && rightKeys.length) {
      const [rMin, rMax] = computeDomain(rightKeys);
      yRight = d3.scaleLinear().domain([rMin, rMax]).range([H, 0]).nice();
    }

    function getYScale(key: SeriesKey) {
      if (yRight && SERIES_META[key].unit === rightUnit) return yRight;
      return yLeft;
    }

    /* ── 1. Grid lines ── */
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

    /* ── 2. Annotation bands/lines ── */
    if (showAnnotations) {
      annotations.forEach((ann) => {
        if (ann.year < startYear || ann.year > endYear) return;
        if (ann.type === "band" && ann.end) {
          const x1 = xScale(Math.max(ann.year, startYear));
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

    /* ── 3. Legal event markers (behind data lines) ── */
    const tip = tipRef.current;
    if (legalEventsEnabled && filteredLegalEvents.length > 0) {
      // Cluster events within 12px of each other
      const pxThreshold = 12;
      const sortedEvents = [...filteredLegalEvents].sort(
        (a, b) => a.year - b.year
      );
      const clusters: LegalEvent[][] = [];
      let currentCluster: LegalEvent[] = [];

      sortedEvents.forEach((evt) => {
        if (
          currentCluster.length === 0 ||
          Math.abs(
            xScale(evt.year) -
              xScale(currentCluster[currentCluster.length - 1].year)
          ) <= pxThreshold
        ) {
          currentCluster.push(evt);
        } else {
          clusters.push(currentCluster);
          currentCluster = [evt];
        }
      });
      if (currentCluster.length) clusters.push(currentCluster);

      clusters.forEach((cluster) => {
        const primaryEvt = cluster[0];
        const x = xScale(primaryEvt.year);
        const color = LEGAL_CATEGORY_COLORS[primaryEvt.category];

        const line = g
          .append("line")
          .attr("x1", x)
          .attr("x2", x)
          .attr("y1", 0)
          .attr("y2", H)
          .attr("stroke", color)
          .attr("stroke-width", 1)
          .attr("opacity", 0.3)
          .style("cursor", "pointer");

        // SCOTUS diamond marker
        if (primaryEvt.category === "scotus") {
          g.append("path")
            .attr("d", d3.symbol().type(d3.symbolDiamond).size(40)())
            .attr("transform", `translate(${x}, 8)`)
            .attr("fill", color)
            .attr("opacity", 0.6);
        }

        // Hover behavior
        const tooltipHtml = cluster
          .map(
            (e) =>
              `<small style="color:${LEGAL_CATEGORY_COLORS[e.category]}">\u2696 ${e.title} (${e.year})</small><br/><small>${e.description}</small>`
          )
          .join("<br/>");

        line
          .on("mouseover", function (event: MouseEvent) {
            d3.select(this).attr("stroke-width", 2.5).attr("opacity", 0.7);
            if (tip) {
              tip.innerHTML = tooltipHtml;
              tip.classList.add("visible");
              tip.style.left =
                Math.min(event.clientX + 14, window.innerWidth - 280) + "px";
              tip.style.top = event.clientY - 28 + "px";
            }
          })
          .on("mousemove", function (event: MouseEvent) {
            if (tip) {
              tip.style.left =
                Math.min(event.clientX + 14, window.innerWidth - 280) + "px";
              tip.style.top = event.clientY - 28 + "px";
            }
          })
          .on("mouseout", function () {
            d3.select(this).attr("stroke-width", 1).attr("opacity", 0.3);
            if (tip) tip.classList.remove("visible");
          });
      });
    }

    /* ── 4. Data series lines ── */
    activeKeys.forEach((key) => {
      const data = getSeriesData(key);
      if (!data.length) return;
      const meta = SERIES_META[key];
      const yScale = getYScale(key);

      const lineGen = d3
        .line<DataPoint>()
        .defined((d) => d.value != null)
        .x((d) => xScale(d.year))
        .y((d) => yScale(d.value))
        .curve(d3.curveMonotoneX);

      g.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", lineGen)
        .attr("stroke", meta.color)
        .attr("stroke-width", meta.dashed ? 2 : 2.5)
        .attr("stroke-dasharray", meta.dashed ? "6 4" : null)
        .attr("fill", "none");
    });

    /* ── 5. Axes ── */
    const xTicks = W < 500 ? 5 : 10;
    g.append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0,${H})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickFormat(d3.format("d") as (d: d3.NumberValue) => string)
          .ticks(xTicks)
      );

    // Left axis
    const leftTickFormat = (d: d3.NumberValue): string => {
      const v = Number(d);
      if (leftUnit === "percent") return (v * 100).toFixed(0) + "%";
      if (leftUnit === "decimal") return v.toFixed(2);
      return "$" + v.toLocaleString();
    };

    g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(yLeft).ticks(7).tickFormat(leftTickFormat));

    // Left axis label
    const leftLabel =
      leftUnit === "percent"
        ? "Share / Rate (%)"
        : leftUnit === "decimal"
          ? "Gini Coefficient"
          : "Real Dollars ($)";

    svg
      .append("text")
      .attr("x", -(MARGIN.top + H / 2))
      .attr("y", 15)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .attr("font-family", "Roboto, sans-serif")
      .attr("font-size", "11px")
      .attr("fill", cssVar("--chart-text"))
      .text(leftLabel);

    // Right axis
    if (yRight && rightUnit) {
      const rightTickFormat = (d: d3.NumberValue): string => {
        const v = Number(d);
        if (rightUnit === "percent") return (v * 100).toFixed(0) + "%";
        if (rightUnit === "decimal") return v.toFixed(2);
        return "$" + v.toLocaleString();
      };

      g.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${W},0)`)
        .call(d3.axisRight(yRight).ticks(6).tickFormat(rightTickFormat));

      const rightLabel =
        rightUnit === "percent"
          ? "Share / Rate (%)"
          : rightUnit === "decimal"
            ? "Gini Coefficient"
            : "Real Dollars ($)";

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
        .text(rightLabel);
    }

    /* ── 6. Hover overlay with crosshair + tooltip ── */
    const bisect = d3.bisector<DataPoint, number>((d) => d.year).left;
    g.append("rect")
      .attr("width", W)
      .attr("height", H)
      .attr("fill", "none")
      .attr("pointer-events", "all")
      .style("cursor", "crosshair")
      .on("mousemove", function (event: MouseEvent) {
        const [mx] = d3.pointer(event, g.node());
        const yr = Math.round(xScale.invert(mx));

        // Crosshair
        hLine
          .attr("x1", xScale(yr))
          .attr("x2", xScale(yr))
          .style("opacity", 1);

        let html = `<strong>${yr}</strong><br/>`;
        activeKeys.forEach((key) => {
          const data = getSeriesData(key);
          const idx = bisect(data, yr);
          const candidates = [data[idx - 1], data[idx]].filter(Boolean);
          if (!candidates.length) return;
          const d = candidates.reduce((a, b) =>
            Math.abs(b.year - yr) < Math.abs(a.year - yr) ? b : a
          );
          if (Math.abs(d.year - yr) > 2) return;
          const meta = SERIES_META[key];
          html += `<span style="color:${meta.color}">\u25A0</span> ${meta.shortLabel}: <b>${formatValue(d.value, meta.unit)}</b><br/>`;
        });

        // Legal events near hover year
        if (legalEventsEnabled && filteredLegalEvents.length) {
          const nearEvents = filteredLegalEvents.filter(
            (e) => Math.abs(e.year - yr) <= 3
          );
          if (nearEvents.length) {
            html += `<hr style="margin:4px 0;border-color:var(--border-color)"/>`;
            nearEvents.forEach((e) => {
              html += `<small style="color:${LEGAL_CATEGORY_COLORS[e.category]}">\u2696 ${e.title} (${e.year})</small><br/>`;
            });
          }
        }

        if (tip) {
          tip.innerHTML = html;
          tip.classList.add("visible");
          tip.style.left =
            Math.min(event.clientX + 14, window.innerWidth - 280) + "px";
          tip.style.top = event.clientY - 28 + "px";
        }
      })
      .on("mouseleave", () => {
        hLine.style("opacity", 0);
        if (tip) tip.classList.remove("visible");
      });

    const hLine = g
      .append("line")
      .attr("stroke", cssVar("--chart-text"))
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "4 2")
      .attr("y1", 0)
      .attr("y2", H)
      .style("opacity", 0)
      .style("pointer-events", "none");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeKeys, startYear, endYear, showAnnotations, legalEventsEnabled, filteredLegalEvents, axisAssignment]);

  /* ── Effects ── */
  useEffect(() => {
    buildChart();
    const ro = new ResizeObserver(() => buildChart());
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, [buildChart]);

  useEffect(() => {
    const handler = () => buildChart();
    window.addEventListener("themechange", handler);
    return () => window.removeEventListener("themechange", handler);
  }, [buildChart]);

  /* ── Axis info banner ── */
  const { leftUnit, rightUnit } = axisAssignment;
  const unitLabel = (u: UnitType) =>
    u === "percent"
      ? "Share / Rate (%)"
      : u === "decimal"
        ? "Gini Coefficient"
        : "Real Dollars ($)";

  return (
    <>
      {/* Pre-1959 caveat */}
      {activeSeries.povertyPre && (
        <div className="caveat-box">
          <strong>Warning &mdash; Unofficial Estimates:</strong> Pre-1959
          poverty data are econometric backcasts with no underlying household
          survey. The 1947&ndash;1958 estimates (Fisher 1986) were withdrawn by
          their author in 1999. The 1914&ndash;1946 estimates (Plotnick et al.
          2000) are highly uncertain. Do not use for quantitative analysis
          without reading the full{" "}
          <Link href="/methodology">methodology</Link>.
        </div>
      )}

      {/* Axis info banner */}
      {rightUnit && (
        <div className="axis-info-banner">
          Left axis: {unitLabel(leftUnit)} &middot; Right axis:{" "}
          {unitLabel(rightUnit)}
        </div>
      )}

      <div className="chart-title">
        U.S. Income Inequality &amp; Poverty, {startYear}&ndash;{endYear}
      </div>
      <div className="chart-subtitle">
        Hover over the chart to see values.
        {legalEventsEnabled &&
          " Dashed vertical lines mark legal events."}
      </div>
      <div className="chart-wrapper" ref={wrapperRef}>
        <svg
          ref={svgRef}
          role="img"
          aria-label="Multi-series inequality and poverty chart with interactive controls"
        />
      </div>
      <p className="chart-source">
        Sources: Piketty &amp; Saez (2024); Census Bureau CPS ASEC; Shrider,
        P60-287 (2025); Plotnick et al. (2000) [pre-1959, unofficial].{" "}
        <Link href="/methodology">Full methodology &rarr;</Link>
      </p>

      {/* Tooltip */}
      <div className="chart-tooltip" ref={tipRef} />
    </>
  );
}
