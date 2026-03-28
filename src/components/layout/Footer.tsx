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
              Created by{" "}
              <a
                href="https://oranburg.law"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "rgba(255,255,255,0.85)", textDecoration: "underline" }}
              >
                Seth C. Oranburg
              </a>
              . Built on peer-reviewed data with full methodological transparency.
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
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Primary Sources */}
          <div>
            <h4 className="footer-heading">Data Sources</h4>
            <ul className="footer-nav">
              <li>
                <a href="https://gabriel-zucman.eu/usdina/" target="_blank" rel="noopener noreferrer">
                  World Inequality Database
                </a>
              </li>
              <li>
                <a href="https://www.census.gov/programs-surveys/cps.html" target="_blank" rel="noopener noreferrer">
                  U.S. Census Bureau (CPS)
                </a>
              </li>
              <li>
                <a href="https://fred.stlouisfed.org/" target="_blank" rel="noopener noreferrer">
                  Federal Reserve (FRED)
                </a>
              </li>
              <li>
                <a href="https://www.census.gov/programs-surveys/acs" target="_blank" rel="noopener noreferrer">
                  American Community Survey
                </a>
              </li>
            </ul>
          </div>

          {/* Creator & Affiliation */}
          <div>
            <h4 className="footer-heading">Creator</h4>
            <ul className="footer-nav">
              <li>
                <a
                  href="https://oranburg.law"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "rgba(255,255,255,0.75)" }}
                >
                  Seth C. Oranburg
                </a>
              </li>
              <li>Independent scholarly platform</li>
              <li>No political affiliation</li>
              <li>
                <Link href="/contact" style={{ color: "rgba(255,255,255,0.75)" }}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-attribution">
            Data sourced from{" "}
            <a href="https://gabriel-zucman.eu/usdina/" target="_blank" rel="noopener noreferrer">
              Piketty &amp; Saez (World Inequality Database)
            </a>
            ;{" "}
            <a href="https://www.census.gov/programs-surveys/cps.html" target="_blank" rel="noopener noreferrer">
              U.S. Census Bureau CPS ASEC
            </a>
            ;{" "}
            <a href="https://fred.stlouisfed.org/" target="_blank" rel="noopener noreferrer">
              Federal Reserve Bank of St. Louis (FRED)
            </a>
            ;{" "}
            <a href="https://www.census.gov/programs-surveys/acs" target="_blank" rel="noopener noreferrer">
              American Community Survey
            </a>
            .
          </p>
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Seth C. Oranburg. All rights reserved. For scholarly and educational use only.
          </p>
        </div>
      </div>
    </footer>
  );
}
