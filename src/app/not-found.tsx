import Link from "next/link";

export default function NotFound() {
  return (
    <section className="hero" style={{ minHeight: "60vh", display: "flex", alignItems: "center" }}>
      <div className="container" style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "6rem", marginBottom: "0.5rem", opacity: 0.3 }}>404</h1>
        <h2 style={{ color: "white", marginBottom: "1rem" }}>Page Not Found</h2>
        <p style={{ marginBottom: "2rem" }}>
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/" className="btn btn-primary">
          Return Home
        </Link>
      </div>
    </section>
  );
}
