import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Explorer",
  description:
    "Equally Poor Data Explorer — interactive visualization of U.S. income inequality and poverty, 1913–2024.",
};

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
