/*
  Oranburg shared footer (React: vite-react and next).

  Visually and structurally identical to design-system/partials/og-footer.html
  and design-system/astro/Footer.astro: same footer[role="contentinfo"] with
  nav[aria-label="Footer"] > ul, same .og-footer class names, same labels.

  Accessibility contract (WCAG 2.2):
    - footer[role="contentinfo"], explicit, one per page.
    - Link cluster lives in nav[aria-label="Footer"] > ul.
    - a:focus-visible outlines live in og-tokens.css (2.4.7 / 2.4.11).

  No invented links: the caller supplies `links`. When `links` is empty the
  footer falls back to the single shared default link (oranburg.law). The hub
  keeps its own full inventory as hub-specific content; do not bake it in here.

  og-tokens.css is imported once at the root layout so the .og-footer rules
  and the design tokens are in scope.
*/
export default function Footer({ links = [], copyright }) {
  const items =
    links.length > 0 ? links : [{ label: "oranburg.law", href: "https://oranburg.law" }];
  return (
    <footer role="contentinfo" className="og-footer">
      <div className="og-footer-inner">
        <nav aria-label="Footer">
          <ul>
            {items.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        {copyright && <p className="og-footer-copyright">{copyright}</p>}
      </div>
    </footer>
  );
}
