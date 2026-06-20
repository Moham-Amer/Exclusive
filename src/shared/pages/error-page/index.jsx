// Friendly fallback shown when any route crashes, instead of a raw stack trace.
// Used as the router's errorElement. Uses a plain <a> (full reload to home) so
// it works even if the error came from the router/layout itself.
export function ErrorPage() {
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "24px",
        background: "#fff",
      }}
    >
      <h2 style={{ color: "#DB4444", fontSize: "2rem", marginBottom: 12 }}>
        Oops — something went wrong
      </h2>
      <p style={{ color: "#555", fontSize: 16, marginBottom: 24, maxWidth: 420 }}>
        An unexpected error occurred. Let&apos;s get you back on track.
      </p>
      <a
        href="/"
        style={{
          background: "#DB4444",
          color: "#fff",
          textDecoration: "none",
          borderRadius: 6,
          padding: "12px 32px",
          fontSize: 16,
          fontWeight: 500,
        }}
      >
        Back to Home
      </a>
    </div>
  );
}
