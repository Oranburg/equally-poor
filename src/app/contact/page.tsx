"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";

const SUBJECT_OPTIONS = [
  "Research Inquiry",
  "Data Correction or Suggestion",
  "Methodology Question",
  "Collaboration Proposal",
  "Citation Request",
  "General Feedback",
  "Other",
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(SUBJECT_OPTIONS[0]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  // Construct the recipient dynamically to avoid bot scraping
  const getRecipient = useCallback(() => {
    const parts = ["seth", "oranburg", "law"];
    return `${parts[0]}@${parts[1]}.${parts[2]}`;
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const recipient = getRecipient();
    const subjectLine = `[Equally Poor] ${subject}`;
    const body = `From: ${name} (${email})\n\n${message}`;

    // Open the user's email client with the form data pre-filled
    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;

    setStatus("sent");
  };

  return (
    <>
      {/* Hero */}
      <section className="hero hero--short" aria-labelledby="contact-hero-title">
        <div className="container">
          <p className="hero-eyebrow">Get in Touch</p>
          <h1 id="contact-hero-title">Contact</h1>
          <p>
            Questions about the data, suggestions for new series, or interested in collaboration?
            We welcome scholarly correspondence of all kinds.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section aria-labelledby="form-title">
        <div className="container--narrow">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "3rem",
              alignItems: "start",
            }}
          >
            {/* Form */}
            <div>
              <div className="section-header">
                <h2 className="section-title" id="form-title" style={{ fontSize: "1.5rem" }}>
                  Send a Message
                </h2>
              </div>

              {status === "sent" ? (
                <div className="info-box" style={{ marginTop: "1rem" }}>
                  <strong>Your email client should have opened.</strong>
                  <p style={{ marginTop: "0.5rem" }}>
                    If your email client did not open automatically, you can reach us by sending
                    an email with your message. Thank you for your interest in Equally Poor.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="btn btn-outline btn-sm"
                    style={{ marginTop: "1rem" }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} style={{ marginTop: "0.5rem" }}>
                  <div style={{ marginBottom: "1.25rem" }}>
                    <label
                      htmlFor="contact-name"
                      style={{
                        display: "block",
                        fontFamily: "var(--font-ui)",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        marginBottom: "0.35rem",
                        color: "var(--text-heading)",
                      }}
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      style={{
                        width: "100%",
                        padding: "0.6rem 0.8rem",
                        borderRadius: "var(--card-radius)",
                        border: "1px solid var(--border-color)",
                        background: "var(--bg-primary)",
                        color: "var(--text-body)",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.95rem",
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: "1.25rem" }}>
                    <label
                      htmlFor="contact-email"
                      style={{
                        display: "block",
                        fontFamily: "var(--font-ui)",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        marginBottom: "0.35rem",
                        color: "var(--text-heading)",
                      }}
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      style={{
                        width: "100%",
                        padding: "0.6rem 0.8rem",
                        borderRadius: "var(--card-radius)",
                        border: "1px solid var(--border-color)",
                        background: "var(--bg-primary)",
                        color: "var(--text-body)",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.95rem",
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: "1.25rem" }}>
                    <label
                      htmlFor="contact-subject"
                      style={{
                        display: "block",
                        fontFamily: "var(--font-ui)",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        marginBottom: "0.35rem",
                        color: "var(--text-heading)",
                      }}
                    >
                      Subject
                    </label>
                    <select
                      id="contact-subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "0.6rem 0.8rem",
                        borderRadius: "var(--card-radius)",
                        border: "1px solid var(--border-color)",
                        background: "var(--bg-primary)",
                        color: "var(--text-body)",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.95rem",
                      }}
                    >
                      {SUBJECT_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div style={{ marginBottom: "1.25rem" }}>
                    <label
                      htmlFor="contact-message"
                      style={{
                        display: "block",
                        fontFamily: "var(--font-ui)",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        marginBottom: "0.35rem",
                        color: "var(--text-heading)",
                      }}
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Your message..."
                      rows={6}
                      style={{
                        width: "100%",
                        padding: "0.6rem 0.8rem",
                        borderRadius: "var(--card-radius)",
                        border: "1px solid var(--border-color)",
                        background: "var(--bg-primary)",
                        color: "var(--text-body)",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.95rem",
                        resize: "vertical",
                      }}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Open in Email Client &rarr;
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div style={{ paddingTop: "2.5rem" }}>
              <div
                style={{
                  background: "var(--bg-secondary)",
                  borderRadius: "var(--card-radius)",
                  padding: "1.5rem",
                  border: "1px solid var(--border-color)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "1rem",
                    fontWeight: 700,
                    marginBottom: "1rem",
                    color: "var(--text-heading)",
                  }}
                >
                  We Especially Welcome
                </h3>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  {[
                    "Data corrections or error reports",
                    "Suggestions for new data series",
                    "Legislative or case entries we missed",
                    "Methodological critiques",
                    "Collaboration on research",
                    "Citation questions",
                  ].map((item) => (
                    <li
                      key={item}
                      style={{
                        fontSize: "0.88rem",
                        color: "var(--text-body)",
                        paddingLeft: "1.2rem",
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          color: "var(--catholic-red)",
                          fontWeight: 700,
                        }}
                      >
                        &bull;
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: "1.5rem" }}>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-muted)",
                    lineHeight: 1.5,
                  }}
                >
                  The goal of this platform is accuracy, not advocacy. Methodological critiques
                  are not just welcome — they are essential.
                </p>
                <p style={{ marginTop: "1rem" }}>
                  <Link
                    href="/about"
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--catholic-blue)",
                      fontWeight: 600,
                    }}
                  >
                    &larr; Back to About
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <style>{`
            @media (max-width: 768px) {
              .container--narrow > div:first-child {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
        </div>
      </section>
    </>
  );
}
