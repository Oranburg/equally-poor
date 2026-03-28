import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Equally Poor",
  description:
    "About Equally Poor — a scholarly research platform at the intersection of law, economics, and sociology.",
};

const RESEARCH_QUESTIONS = [
  {
    num: "01",
    title: "Tax Law & Income Distribution",
    text: "How does the legal structure of taxation — marginal rate schedules, capital gains treatment, estate taxation, corporate taxation, and the earned income tax credit — affect the pre-tax and post-tax distribution of income? What can the historical record tell us about the distributional effects of specific rate changes?",
  },
  {
    num: "02",
    title: "Welfare Legislation & Poverty",
    text: "What has been the measurable effect of major welfare legislation — the Social Security Act, the Economic Opportunity Act, Medicare and Medicaid, welfare reform, the Affordable Care Act, and the American Rescue Plan — on official and supplemental poverty rates? How do measurement choices (OPM vs. SPM) affect the answer?",
  },
  {
    num: "03",
    title: "Inequality & Access to Law",
    text: "How does economic inequality affect access to legal institutions — to courts, to legal counsel, to administrative processes? Does rising inequality undermine the formal equality of legal rights by making those rights practically inaccessible to those without resources?",
  },
  {
    num: "04",
    title: "Labor Law & Wage Compression",
    text: "What role has the erosion of labor law — declining union density, stagnant minimum wages, expansion of at-will employment, preemption of local wage ordinances — played in the rise of wage inequality since the 1970s? What does the international comparative evidence suggest about the counterfactual?",
  },
  {
    num: "05",
    title: "Historical Data & Law-and-Economics Methodology",
    text: "What can more than a century of distributional data reveal about the relationship between legal change and economic outcomes? What methodological tools — difference-in-differences, synthetic control, regression discontinuity — are needed to move from the correlations displayed here to causal inference?",
  },
  {
    num: "06",
    title: "Constitutional Structure & Distribution",
    text: "How has constitutional doctrine — on the scope of the taxing power, the commerce clause, the equal protection guarantee, and property rights — constrained or enabled the legal tools available for redistribution? What does the Lochner era reveal about the relationship between constitutional interpretation and distributional outcomes?",
  },
];

const AUDIENCE_CARDS = [
  {
    color: "card--blue",
    title: "Legal Scholars & Practitioners",
    text: "Tax lawyers, labor lawyers, poverty law clinicians, constitutional scholars, and law-and-economics researchers who need accurate long-run distributional data to ground their analysis. The Legal Landscape page and SCOTUS table are designed especially for this audience.",
  },
  {
    color: "card--red",
    title: "Economists & Quantitative Researchers",
    text: "Economists studying inequality, poverty, or the effects of specific policies who want a single platform that presents the standard series alongside their methodological caveats. The Data Explorer's CSV download supports further quantitative analysis.",
  },
  {
    color: "card--green",
    title: "Sociologists & Social Policy Researchers",
    text: "Researchers studying social stratification, poverty, mobility, and the welfare state who need to situate their work in the long-run quantitative context. The timeline and legislation-inequality chart provide the legal context often missing from sociological accounts.",
  },
  {
    color: "card--yellow",
    title: "Policymakers & Journalists",
    text: "Legislators, legislative staff, executive branch analysts, think-tank researchers, and journalists who need reliable, clearly sourced data presented with appropriate caveats. The Key Metrics strip and home-page chart are designed for rapid orientation.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero hero--short" aria-labelledby="about-hero-title">
        <div className="container">
          <p className="hero-eyebrow">Research Platform</p>
          <h1 id="about-hero-title">About This Platform</h1>
          <p>
            Equally Poor is a scholarly research platform at the intersection of law, economics, and
            sociology — dedicated to rigorous, transparent visualization of economic inequality in
            America.
          </p>
        </div>
      </section>

      {/* Creator */}
      <section aria-labelledby="creator-title">
        <div className="container--narrow">
          <div className="section-header">
            <p className="section-eyebrow">Creator</p>
            <h2 className="section-title" id="creator-title">
              Created by Seth C. Oranburg
            </h2>
          </div>
          <p>
            Equally Poor was created by{" "}
            <a href="https://oranburg.law" target="_blank" rel="noopener noreferrer">
              Seth C. Oranburg
            </a>
            , a legal scholar whose work sits at the intersection of law, economics, and empirical
            research. The platform reflects a conviction that the data on American inequality —
            scattered across government agencies, academic datasets, and research archives — needed
            to be brought together in one place, presented with full methodological transparency, and
            mapped against the legal history that shaped it.
          </p>
          <p>
            Building Equally Poor required assembling and harmonizing data from multiple independent
            sources spanning more than a century: the Piketty-Saez top income share series from the
            World Inequality Database, Gini coefficients and poverty rates from the U.S. Census
            Bureau&apos;s Current Population Survey, economic indicators from the Federal Reserve Bank
            of St. Louis (FRED), and detailed microdata from the American Community Survey. Each
            source uses different methodologies, covers different time periods, and measures different
            aspects of inequality and poverty. The power of this platform lies in bringing them
            together — making it possible to see, in a single interactive view, how income
            concentration, distributional inequality, and poverty have moved together (and apart) in
            response to legal and policy changes.
          </p>
          <p>
            The platform is independent — unaffiliated with any political party, advocacy
            organization, or government agency. It is maintained as a scholarly resource and is free
            to use for research and educational purposes.
          </p>
        </div>
      </section>

      {/* Data Sources */}
      <section aria-labelledby="sources-title" style={{ background: "var(--bg-secondary)" }}>
        <div className="container--narrow">
          <div className="section-header">
            <p className="section-eyebrow">Data Integration</p>
            <h2 className="section-title" id="sources-title">
              Bringing the Data Together
            </h2>
            <p className="section-desc">
              One of the core contributions of this platform is integrating data from multiple
              independent sources that are rarely presented side by side.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.25rem",
            }}
          >
            <div className="card card--red">
              <div className="card-title">World Inequality Database</div>
              <p className="card-text">
                Top 10% and Top 1% income share series from Piketty &amp; Saez, covering
                1917&ndash;2022. The longest continuous measure of income concentration in the
                United States.
              </p>
            </div>
            <div className="card card--blue">
              <div className="card-title">U.S. Census Bureau</div>
              <p className="card-text">
                Gini coefficients (1967&ndash;2024), official poverty rates (1959&ndash;2024), and
                the Supplemental Poverty Measure from the Current Population Survey (CPS ASEC).
                Geographic breakdowns via the American Community Survey.
              </p>
            </div>
            <div className="card card--yellow">
              <div className="card-title">Federal Reserve (FRED)</div>
              <p className="card-text">
                Pre-computed time series for poverty rates by demographic group, real median
                household income, Gini ratios, and labor&apos;s share of gross domestic income —
                all from the St. Louis Fed&apos;s research database.
              </p>
            </div>
            <div className="card card--green">
              <div className="card-title">Academic Research</div>
              <p className="card-text">
                Pre-1959 poverty estimates from Smolensky (1965) and Fisher (1986), historical
                annotations, and a comprehensive catalog of federal legislation and Supreme Court
                decisions affecting economic equality.
              </p>
            </div>
          </div>
          <style>{`
            @media (max-width: 768px) {
              .about-sources-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </div>
      </section>

      {/* Why Both Measures */}
      <section aria-labelledby="distinction-title">
        <div className="container--narrow">
          <div className="section-header">
            <p className="section-eyebrow">Analytical Framework</p>
            <h2 className="section-title" id="distinction-title">
              Why Poverty and Inequality Appear on the Same Chart
            </h2>
          </div>
          <p>
            Poverty and inequality are often discussed as though they were the same thing. They are
            not. Poverty measures whether individuals or families fall below a threshold of material
            adequacy — it is an absolute concept. Inequality measures how income or wealth is
            distributed across the entire population — it is a relative concept. A legal
            intervention can reduce one without affecting the other, or even move them in opposite
            directions. This platform presents both together precisely because their divergences are
            as informative as their convergences.
          </p>
          <p>
            Consider the historical record. During the 1980s and 1990s, the official poverty rate
            declined modestly even as the Gini coefficient and top income shares rose sharply. The
            Economic Recovery Tax Act of 1981 and the Tax Reform Act of 1986 concentrated pre-tax
            income at the top while economic growth reduced the poverty headcount. The Earned Income
            Tax Credit — expanded significantly in 1990 and 1993 — is perhaps the clearest example
            of this divergence: it lifts millions of families above the poverty line each year yet has
            essentially no effect on top income shares or the Gini coefficient. Conversely, a
            progressive estate tax might compress wealth concentration at the top while doing nothing
            for families at the bottom. Legal scholars who describe a policy as &ldquo;reducing
            inequality&rdquo; without specifying which measure they mean are making an imprecise
            claim. This platform makes the distinction visible.
          </p>
          <p>
            The historical periods overlaid on the charts add a further dimension. Economic history
            reveals recurring cycles in the social tolerance for inequality. The Gilded Age
            (1870&ndash;1900) produced wealth concentration that triggered the Progressive Era&apos;s
            antitrust laws, income taxation, and labor protections. The postwar Golden Age
            (1947&ndash;1973) combined strong union density, highly progressive taxation, the GI
            Bill, and tight labor markets to achieve something historically rare: simultaneously low
            poverty <em>and</em> compressed inequality. That alignment unraveled after 1980 as top
            tax rates fell, union membership declined, financial deregulation concentrated returns to
            capital, and trade liberalization shifted the wage distribution. Branko Milanovic has
            described these as &ldquo;Kuznets waves&rdquo; — recurring cycles of compression and
            divergence shaped by political and legal choices.
          </p>
          <p>
            There is a genuine analytical tension here that this platform does not attempt to resolve.
            Some degree of income inequality may reflect productive incentives — returns to
            entrepreneurial risk-taking, to innovation, to the deployment of capital in its most
            productive uses. The complete elimination of inequality, as attempted in command
            economies, removes the price signals and incentive structures on which market economies
            depend. At the same time, extreme concentration generates its own pathologies: it distorts
            political institutions, restricts intergenerational mobility, and — as the historical
            record suggests — eventually produces the political instability that demands legal
            correction. Where the balance lies is a normative question that this platform does not
            answer. What it does is present the empirical record clearly enough that legal scholars,
            economists, and policymakers can engage that question with precision rather than with
            slogans.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section
        aria-labelledby="mission-title"
        style={{ background: "var(--bg-secondary)" }}
      >
        <div className="container--narrow">
          <div className="section-header">
            <p className="section-eyebrow">Mission</p>
            <h2 className="section-title" id="mission-title">
              Why This Platform Exists
            </h2>
          </div>
          <p>
            Equally Poor was built on a conviction that understanding the relationship between law and
            economic distribution requires something that neither legal scholarship nor economics
            alone typically provides: a single, carefully sourced, methodologically honest platform
            that places the best available long-run data on both poverty and inequality alongside the
            legal history that shaped them. Tax lawyers advising clients on estate planning, labor
            economists studying the minimum wage, sociologists analyzing poverty trends, and
            constitutional scholars debating the scope of Congress&apos;s taxing power are all
            reasoning, implicitly or explicitly, about the same underlying empirical reality. That
            reality deserves to be visualized clearly, with the right distinctions drawn, and cited
            accurately.
          </p>
          <p>
            The platform takes no position on what the appropriate level of inequality or poverty
            is — those are questions for democratic deliberation informed by values that data alone
            cannot supply. It does insist on two things: methodological honesty and terminological
            precision. Each series displayed here has known limitations, documented series breaks,
            and contested interpretations. The pre-1959 poverty estimates are labeled unofficial
            because they are; the income-timing artifacts in the Piketty-Saez series are explained
            because they matter for interpretation; the Auten-Splinter critique is acknowledged
            because it represents a serious scholarly challenge. And when a legal intervention
            &ldquo;reduces inequality,&rdquo; this platform shows <em>which</em> inequality — and
            whether poverty moved with it, against it, or not at all. The goal is to give
            researchers and practitioners the full picture, including the uncertainties, so they can
            reason from evidence rather than from uncritical acceptance of headline numbers.
          </p>
        </div>
      </section>

      {/* Research Questions */}
      <section
        aria-labelledby="questions-title"
        style={{ background: "var(--bg-secondary)" }}
      >
        <div className="container--narrow">
          <div className="section-header">
            <p className="section-eyebrow">Scholarly Agenda</p>
            <h2 className="section-title" id="questions-title">
              Core Research Questions
            </h2>
            <p className="section-desc">
              The platform is organized around a set of empirical and normative questions that sit at
              the intersection of legal scholarship, economics, and social policy.
            </p>
          </div>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {RESEARCH_QUESTIONS.map((q) => (
              <li
                key={q.num}
                style={{
                  display: "flex",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-headline)",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "var(--red-deep)",
                    lineHeight: 1,
                    flexShrink: 0,
                    width: "2rem",
                    textAlign: "right",
                  }}
                >
                  {q.num}
                </span>
                <div>
                  <strong
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.95rem",
                      color: "var(--text-heading)",
                      display: "block",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {q.title}
                  </strong>
                  {q.text}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Data Commitment */}
      <section aria-labelledby="method-note-title">
        <div className="container--narrow">
          <div className="section-header">
            <p className="section-eyebrow">Data Commitment</p>
            <h2 className="section-title" id="method-note-title">
              Commitment to Source Transparency
            </h2>
          </div>
          <p>
            Every data series displayed on this platform is sourced from peer-reviewed research or
            official government statistics. Primary citations are provided for each series on the{" "}
            <Link href="/methodology">Methodology</Link> page. Where data quality is contested or
            series are unofficial, this is prominently disclosed — including on the charts themselves.
            The pre-1959 poverty estimates are marked &ldquo;unofficial&rdquo; wherever they appear;
            income-timing artifacts in the top income share series are explained in the methodology
            documentation; Census series breaks are documented and their potential magnitude noted.
          </p>
          <p>
            This commitment to source transparency is not merely an academic convention. For lawyers
            and policymakers reasoning from data about what law has done and what law can do, the
            difference between a genuine trend and a measurement artifact, or between a pre-tax and a
            post-tax series, is material. Getting these distinctions right is a prerequisite for sound
            legal reasoning about distribution.
          </p>
          <div className="info-box">
            <strong>Data currency:</strong> The Piketty-Saez series is current through 2022 (March
            2024 update). The Census Gini and official poverty rate are current through 2024
            (September 2025 release). Pre-1959 poverty estimates are historical only. All data will
            be updated as new releases become available.
          </div>
        </div>
      </section>

      {/* Audience */}
      <section
        aria-labelledby="audience-title"
        style={{ background: "var(--bg-secondary)" }}
      >
        <div className="container--narrow">
          <div className="section-header">
            <p className="section-eyebrow">Intended Users</p>
            <h2 className="section-title" id="audience-title">
              Who This Platform Is For
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.25rem",
            }}
          >
            {AUDIENCE_CARDS.map((card) => (
              <div key={card.title} className={`card ${card.color}`}>
                <div className="card-title">{card.title}</div>
                <p className="card-text">{card.text}</p>
              </div>
            ))}
          </div>
          <style>{`
            @media (max-width: 768px) {
              .about-audience-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </div>
      </section>

      {/* Contact & Contribute */}
      <section aria-labelledby="contact-title">
        <div className="container--narrow">
          <div className="section-header">
            <p className="section-eyebrow">Collaboration</p>
            <h2 className="section-title" id="contact-title">
              Contact &amp; Contribute
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.5rem",
              alignItems: "start",
            }}
          >
            <div>
              <h3 style={{ fontSize: "1.15rem", marginBottom: "0.75rem" }}>Research Inquiries</h3>
              <p>
                We welcome correspondence from researchers who identify errors in the data, have
                suggestions for additional series or legislative entries, or are interested in citing
                or extending this platform&apos;s work. Methodological critiques are especially
                welcome — the goal is accuracy, not advocacy.
              </p>
              <p style={{ marginTop: "1rem" }}>
                <Link href="/contact" className="btn btn-primary btn-sm">
                  Contact Us &rarr;
                </Link>
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "1.15rem", marginBottom: "0.75rem" }}>Data &amp; Code</h3>
              <p>
                The underlying data for all series is available for download from the{" "}
                <Link href="/explore">Data Explorer</Link> as a CSV file. The source data is drawn
                from publicly available government and academic sources cited in full on the{" "}
                <Link href="/methodology">Methodology</Link> page. Chart code is written in D3.js v7
                and is available for inspection in the page source.
              </p>
              <p style={{ marginTop: "1rem" }}>
                <Link href="/explore" className="btn btn-outline btn-sm">
                  Download Data (CSV)
                </Link>
              </p>
            </div>
          </div>

          <hr className="divider" style={{ marginTop: "2.5rem" }} />

          <div
            style={{
              background: "var(--bg-secondary)",
              borderRadius: "var(--card-radius)",
              padding: "1.5rem 2rem",
              marginTop: 0,
            }}
          >
            <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem", color: "var(--text-heading)" }}>
              Disclaimer
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", margin: 0 }}>
              This platform is provided for scholarly and educational purposes only. Nothing on this
              platform constitutes legal, financial, tax, or investment advice. Data visualizations
              are provided as-is; users should consult primary sources before relying on any figure
              for research or policy purposes. The platform is affiliated with no political party,
              advocacy organization, or government agency. All errors remain the author&apos;s own.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
