interface FooterLinkItem {
  label: string;
  href: string;
}

interface FooterProps {
  links?: FooterLinkItem[];
  copyright?: string;
}

declare const Footer: (props: FooterProps) => JSX.Element;
export default Footer;
