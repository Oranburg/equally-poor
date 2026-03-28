import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand column */}
          <div>
            <div className="footer-logo">EQUALLY POOR</div>
            <p className="footer-tagline">
              A scholarly research platform visualizing wealth, inequality &amp; law in America.
              Built on peer-reviewed data with full methodological transparency.
            </p>
          </div>

          {/* Platform links */}
          <div>
            <h4 className="footer-heading">Platform</h4>
            <ul className="footer-nav">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/explore">Data Explorer</Link></li>
              <li><Link href="/legal">Legal Landscape</Link></li>
              <li><Link href="/methodology">Methodology</Link></li>
              <li><Link href="/about">About</Link></li>
            </ul>
          </div>

          {/* Primary Sources */}
          <div>
            <h4 className="footer-heading">Primary Sources</h4>
            <ul className="footer-nav">
              <li>
                <a href="https://gabriel-zucman.eu/usdina/" target="_blank" rel="noopener noreferrer">
                  Piketty-Saez Series
                </a>
              </li>
              <li>
                <a href="https://fred.stlouisfed.org/series/GINIALLRH" target="_blank" rel="noopener noreferrer">
                  FRED: Census Gini
                </a>
              </li>
              <li>
                <a href="https://www.census.gov/library/publications/2025/demo/p60-287.html" target="_blank" rel="noopener noreferrer">
                  Census Poverty Data
                </a>
              </li>
            </ul>
          </div>

          {/* Affiliation */}
          <div>
            <h4 className="footer-heading">Affiliation</h4>
            <ul className="footer-nav">
              <li>Independent scholarly platform</li>
              <li>No political affiliation</li>
              <li>
                <a href="mailto:research@equallypoor.org" style={{ color: "rgba(255,255,255,0.75)" }}>
                  research@equallypoor.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-attribution">
            Data sourced from{" "}
            <a href="https://gabriel-zucman.eu/usdina/" target="_blank" rel="noopener noreferrer">
              Piketty &amp; Saez (2024 update)
            </a>
            ;{" "}
            <a href="https://fred.stlouisfed.org/series/GINIALLRH" target="_blank" rel="noopener noreferrer">
              U.S. Census Bureau CPS ASEC
            </a>
            ;{" "}
            <a href="https://www.census.gov/library/publications/2025/demo/p60-287.html" target="_blank" rel="noopener noreferrer">
              Shrider, <em>Poverty in the United States: 2024</em>, P60-287 (2025)
            </a>
            .
          </p>
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Equally Poor. All rights reserved. For scholarly and educational use only.
          </p>
        </div>
      </div>
    </footer>
  );
}
