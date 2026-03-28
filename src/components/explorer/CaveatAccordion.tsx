"use client";

import { useState } from "react";
import { useExplorerState } from "./ExplorerProvider";

const CAVEATS = [
  {
    title: "Piketty-Saez: Income-Timing Artifacts",
    body: `The Piketty-Saez top income share series is constructed from IRS individual income tax returns. As a result, spikes in the series sometimes reflect changes in the timing of income realization rather than changes in underlying income distribution. The most prominent example is the 2012 spike: in anticipation of higher capital gains rates taking effect in 2013, high-income taxpayers accelerated capital gains realizations into 2012, producing a sharp spike that reversed the following year. Similar anticipatory behavior is visible before the Tax Reform Act of 1986 and after the 2001 and 2003 Bush tax cuts. These spikes are genuine tax data — they are not errors — but they should be interpreted as behavioral responses to legal changes, not as independent evidence of sudden distributional shifts.`,
  },
  {
    title: "Piketty-Saez vs. Auten-Splinter: A Contested Measurement",
    body: `Gerald Auten and David Splinter (2024) have published an alternative series using the same IRS data with different methodological choices — particularly regarding the treatment of underreported income, retirement income, and imputed corporate retained earnings. Their series shows a materially smaller increase in top income shares since 1960. The debate is ongoing and unresolved within the economics profession. This platform displays the original Piketty-Saez series because it is the most widely cited and has the longest continuous track record, but users should be aware that the magnitude of the top-share increase is contested. See the Methodology page for citations to both series.`,
  },
  {
    title: "Census Gini: Series Breaks (1993, 2013-14, 2017-18)",
    body: `The Census Bureau's Gini coefficient series contains three known methodological breaks that affect year-over-year comparisons: (1) In 1993, the Census redesigned the income questions in the CPS, producing a one-time jump in measured inequality of approximately 0.02 points. (2) In 2013-14, the Census implemented a new processing system (CATI/CAPI) and revised income topcoding, producing another discontinuity. (3) In 2017-18, the Census updated income imputation and question redesign. These breaks mean that precise year-over-year changes spanning these breaks should be interpreted with caution. The long-run trend (rising inequality from the late 1970s to the present) is robust across all versions of the data, but the exact magnitude of increase is affected by which methodology is used.`,
  },
  {
    title: "Official Poverty Measure: Known Limitations",
    body: `The Official Poverty Measure (OPM), established in 1963 by Mollie Orshansky at the Social Security Administration, defines poverty thresholds based on a multiple of the cost of a minimum food diet. It has several well-documented limitations: (1) It counts only pre-tax cash income, ignoring the EITC, SNAP, housing subsidies, Medicaid, and other in-kind transfers that now constitute a large fraction of the safety net. (2) It uses the same thresholds nationwide, ignoring geographic variation in the cost of living. (3) It does not deduct taxes, work expenses, or medical costs from income. The Supplemental Poverty Measure (SPM), published by the Census Bureau since 2011, addresses most of these limitations. The OPM and SPM often produce materially different poverty rates, especially for children (where the SPM is typically lower due to counting SNAP, EITC, and CTC) and the elderly (where the SPM is typically higher due to deducting medical out-of-pocket costs).`,
  },
  {
    title: "Pre-1959 Poverty Estimates: Unofficial & Uncertain",
    body: `There was no official poverty measure before the 1960s and no national household survey before the 1947 CPS. The pre-1959 estimates displayed here are derived from Eugene Smolensky's 1965 work and Gordon Fisher's 1986 analysis, both of which used indirect methods (backcasting from fragmentary income data, extrapolating from consumption patterns, and adjusting for household size distributions). Fisher himself withdrew his estimates from formal publication in 1999, citing concerns about their reliability. These figures are displayed because they are the best available long-run estimates, but they carry considerably wider uncertainty bands than the post-1959 official series. They should be treated as rough indicators of magnitude and trend direction, not as precise measurements.`,
  },
];

export function CaveatAccordion() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const state = useExplorerState();

  const toggleItem = (idx: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <div>
      {/* Pre-1959 warning */}
      {state.activeSeries.povertyPre && (
        <div className="caveat-box" style={{ marginBottom: "1rem" }}>
          <strong>Pre-1959 estimates are unofficial.</strong> These figures are
          derived from indirect methods and carry wide uncertainty. See Caveat
          #5 below for details.
        </div>
      )}

      {CAVEATS.map((caveat, idx) => (
        <div className="accordion" key={idx}>
          <button
            className="accordion-trigger"
            onClick={() => toggleItem(idx)}
            aria-expanded={openItems.has(idx)}
          >
            <span>{caveat.title}</span>
            <span className="accordion-icon">+</span>
          </button>
          <div className={`accordion-body ${openItems.has(idx) ? "open" : ""}`}>
            <p>{caveat.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
