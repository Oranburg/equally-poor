import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Landscape",
  description:
    "Equally Poor Legal Landscape — how legislation has shaped economic inequality in America since 1913.",
};

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
