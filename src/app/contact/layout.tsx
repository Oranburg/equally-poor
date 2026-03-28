import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Equally Poor",
  description:
    "Get in touch with the creator of Equally Poor — questions, data corrections, collaboration proposals, and research inquiries.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
