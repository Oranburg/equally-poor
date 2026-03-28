"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import * as d3 from "d3";
import { useD3 } from "./useD3";
import { top10Data, giniData, povertyData } from "@/data";
import type { DataPoint } from "@/data";

const MARGIN = { top: 20, right: 70, bottom: 40, left: 60 };
const HEIGHT = 500;

const COLORS = {
  top10: "#B21F2C",
  gini: "#2459A9",
  poverty: "#0A3255",
};

const LABELS = {
  top10: "Top 10% Income Share",
  gini: "Gini Coefficient",
  poverty: "Poverty Rate",
};

// Filter all series to the overlap period: 1967-2022
const overlapStart = 1967;
const overlapEnd = 2022;

function filterRange(data: DataPoint[]): DataPoint[] {
  return data.filter((d) => d.year >= overlapStart && d.year <= overlapEnd);
}

const top10Filtered = filterRange(top10Data);
const giniFiltered = filterRange(giniData);
const povertyFiltered = filterRange(povertyData);

export default function HomeChart() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(800);

  // Track container width via ResizeObserver
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        if (w > 0) setWidth(w);
      }
    });
    ro.observe(wrapper);
    return () => ro.disconnect();
  }, []);

  const renderChart = useCallback(
    (svg: d3.Selection<SVGSVGElement, unknown, null, undefined>) => {
      svg.selectAll("*").remove();

      const innerWidth = width - MARGIN.left - MARGIN.right;
      const innerHeight = HEIGHT - MARGIN.top - MARGIN.bottom;

      // Read CSS variable colors
      const styles = getComputedStyle(document.documentElement);
      const chartGrid = styles.getPropertyValue("--chart-grid").trim() || "#e8e8e8";
      const chartText = styles.getPropertyValue("--chart-text").trim() || "#555555";

      // Scales
      const x = d3
        .scaleLinear()
        .domain([overlapStart, overlapEnd])
        .range([0, innerWidth]);

      // Left axis: percentage (5%-60%) for top10 & poverty
      const yLeft = d3
        .scaleLinear()
        .domain([0.05, 0.60])
        .range([innerHeight, 0]);

      // Right axis: Gini (0.35-0.55)
      const yRight = d3
        .scaleLinear()
        .domain([0.35, 0.55])
        .range([innerHeight, 0]);

      const g = svg
        .attr("width", width)
        .attr("height", HEIGHT)
        .append("g")
        .attr("transform", `translate(${MARGIN.left},${MARGIN.top})`);

      // Gridlines
      g.append("g")
        .attr("class", "grid")
        .selectAll("line")
        .data(yLeft.ticks(6))
        .join("line")
        .attr("x1", 0)
        .attr("x2", innerWidth)
        .attr("y1", (d) => yLeft(d))
        .attr("y2", (d) => yLeft(d))
        .attr("stroke", chartGrid)
        .attr("stroke-dasharray", "3,3");

      // X axis
      const xAxis = g
        .append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(
          d3
            .axisBottom(x)
            .ticks(10)
            .tickFormat((d) => String(d))
        );
      xAxis.selectAll("text").attr("fill", chartText);
      xAxis.selectAll("line, path").attr("stroke", chartGrid);

      // Left Y axis
      const yLeftAxis = g
        .append("g")
        .attr("class", "axis")
        .call(
          d3
            .axisLeft(yLeft)
            .ticks(6)
            .tickFormat((d) => `${(+d * 100).toFixed(0)}%`)
        );
      yLeftAxis.selectAll("text").attr("fill", chartText);
      yLeftAxis.selectAll("line, path").attr("stroke", chartGrid);

      // Left Y axis label
      g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -MARGIN.left + 14)
        .attr("x", -innerHeight / 2)
        .attr("text-anchor", "middle")
        .attr("font-family", "var(--font-body)")
        .attr("font-size", "11px")
        .attr("fill", chartText)
        .text("Percentage (%)");

      // Right Y axis
      const yRightAxis = g
        .append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${innerWidth},0)`)
        .call(
          d3
            .axisRight(yRight)
            .ticks(5)
            .tickFormat((d) => (+d).toFixed(2))
        );
      yRightAxis.selectAll("text").attr("fill", chartText);
      yRightAxis.selectAll("line, path").attr("stroke", chartGrid);

      // Right Y axis label
      g.append("text")
        .attr("transform", "rotate(90)")
        .attr("y", -(width - MARGIN.left) + 14)
        .attr("x", innerHeight / 2)
        .attr("text-anchor", "middle")
        .attr("font-family", "var(--font-body)")
        .attr("font-size", "11px")
        .attr("fill", chartText)
        .text("Gini Coefficient");

      // Line generators
      const lineTop10 = d3
        .line<DataPoint>()
        .x((d) => x(d.year))
        .y((d) => yLeft(d.value))
        .curve(d3.curveMonotoneX);

      const lineGini = d3
        .line<DataPoint>()
        .x((d) => x(d.year))
        .y((d) => yRight(d.value))
        .curve(d3.curveMonotoneX);

      const linePoverty = d3
        .line<DataPoint>()
        .x((d) => x(d.year))
        .y((d) => yLeft(d.value))
        .curve(d3.curveMonotoneX);

      // Draw lines
      g.append("path")
        .datum(top10Filtered)
        .attr("fill", "none")
        .attr("stroke", COLORS.top10)
        .attr("stroke-width", 2.5)
        .attr("d", lineTop10);

      g.append("path")
        .datum(giniFiltered)
        .attr("fill", "none")
        .attr("stroke", COLORS.gini)
        .attr("stroke-width", 2.5)
        .attr("d", lineGini);

      g.append("path")
        .datum(povertyFiltered)
        .attr("fill", "none")
        .attr("stroke", COLORS.poverty)
        .attr("stroke-width", 2.5)
        .attr("d", linePoverty);

      // Crosshair line
      const crosshair = g
        .append("line")
        .attr("y1", 0)
        .attr("y2", innerHeight)
        .attr("stroke", chartText)
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "4,4")
        .attr("opacity", 0);

      // Hover dots
      const dotTop10 = g
        .append("circle")
        .attr("r", 4)
        .attr("fill", COLORS.top10)
        .attr("opacity", 0);
      const dotGini = g
        .append("circle")
        .attr("r", 4)
        .attr("fill", COLORS.gini)
        .attr("opacity", 0);
      const dotPoverty = g
        .append("circle")
        .attr("r", 4)
        .attr("fill", COLORS.poverty)
        .attr("opacity", 0);

      // Bisector for hover
      const bisect = d3.bisector<DataPoint, number>((d) => d.year).left;

      function findClosest(data: DataPoint[], year: number): DataPoint | null {
        const i = bisect(data, year, 1);
        const d0 = data[i - 1];
        const d1 = data[i];
        if (!d0) return d1 ?? null;
        if (!d1) return d0;
        return year - d0.year > d1.year - year ? d1 : d0;
      }

      // Invisible overlay for mouse events
      g.append("rect")
        .attr("width", innerWidth)
        .attr("height", innerHeight)
        .attr("fill", "none")
        .attr("pointer-events", "all")
        .on("mousemove", (event: MouseEvent) => {
          const [mx] = d3.pointer(event);
          const year = x.invert(mx);

          const t10 = findClosest(top10Filtered, year);
          const gin = findClosest(giniFiltered, year);
          const pov = findClosest(povertyFiltered, year);

          if (!t10 || !gin || !pov) return;

          const snappedYear = Math.round(year);
          const cx = x(snappedYear);

          crosshair.attr("x1", cx).attr("x2", cx).attr("opacity", 1);

          dotTop10
            .attr("cx", x(t10.year))
            .attr("cy", yLeft(t10.value))
            .attr("opacity", 1);
          dotGini
            .attr("cx", x(gin.year))
            .attr("cy", yRight(gin.value))
            .attr("opacity", 1);
          dotPoverty
            .attr("cx", x(pov.year))
            .attr("cy", yLeft(pov.value))
            .attr("opacity", 1);

          // Update tooltip
          const tooltip = tooltipRef.current;
          if (tooltip) {
            tooltip.innerHTML = `
              <strong>${snappedYear}</strong><br/>
              <span style="color:${COLORS.top10}">Top 10%:</span> ${(t10.value * 100).toFixed(1)}%<br/>
              <span style="color:${COLORS.gini}">Gini:</span> ${gin.value.toFixed(3)}<br/>
              <span style="color:${COLORS.poverty}">Poverty:</span> ${(pov.value * 100).toFixed(1)}%
            `;
            tooltip.classList.add("visible");

            // Position tooltip near cursor
            const rect = (event.currentTarget as SVGRectElement).closest("svg")!.getBoundingClientRect();
            const tipX = rect.left + MARGIN.left + cx + 15;
            const tipY = event.clientY - 40;
            tooltip.style.left = `${tipX}px`;
            tooltip.style.top = `${tipY}px`;

            // Flip if near right edge
            if (tipX + 200 > window.innerWidth) {
              tooltip.style.left = `${rect.left + MARGIN.left + cx - 200}px`;
            }
          }
        })
        .on("mouseleave", () => {
          crosshair.attr("opacity", 0);
          dotTop10.attr("opacity", 0);
          dotGini.attr("opacity", 0);
          dotPoverty.attr("opacity", 0);
          const tooltip = tooltipRef.current;
          if (tooltip) {
            tooltip.classList.remove("visible");
          }
        });
    },
    [width]
  );

  const svgRef = useD3(renderChart, [renderChart]);

  return (
    <div>
      <div ref={wrapperRef} className="chart-wrapper">
        <svg ref={svgRef} />
      </div>
      <div ref={tooltipRef} className="chart-tooltip" />
      <div className="chart-legend">
        <span className="legend-item">
          <span className="legend-swatch" style={{ background: COLORS.top10 }} />
          {LABELS.top10}
        </span>
        <span className="legend-item">
          <span className="legend-swatch" style={{ background: COLORS.gini }} />
          {LABELS.gini}
        </span>
        <span className="legend-item">
          <span className="legend-swatch" style={{ background: COLORS.poverty }} />
          {LABELS.poverty}
        </span>
      </div>
    </div>
  );
}
