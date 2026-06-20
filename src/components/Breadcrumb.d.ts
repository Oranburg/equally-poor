interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  trail?: BreadcrumbItem[];
  current?: string;
}

declare const Breadcrumb: (props: BreadcrumbProps) => JSX.Element;
export default Breadcrumb;
