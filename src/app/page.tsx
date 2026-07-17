"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        padding: "24px",
        background: "var(--background)",
        color: "var(--foreground)",
        fontFamily: "var(--font-inter), var(--font-geist-sans), Arial, sans-serif",
        textAlign: "center",
        opacity: mounted ? 1 : 0,
        transition: "opacity 600ms ease",
      }}
    >
      <div
        style={{
          fontSize: "clamp(48px, 10vw, 96px)",
          fontWeight: 700,
          letterSpacing: "-2px",
          lineHeight: 1,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        } as React.CSSProperties}
      >
        Coming Soon
      </div>

      <div
        style={{
          fontSize: "16px",
          fontWeight: 400,
          color: "var(--text-secondary)",
          maxWidth: "420px",
          lineHeight: 1.6,
        }}
      >
        Farhandy Akbar &middot; Digital Product Designer
      </div>

      <div
        style={{
          fontSize: "13px",
          fontWeight: 400,
          color: "var(--text-muted)",
          lineHeight: 1.5,
        }}
      >
        Portfolio sedang dipersiapkan. Segera kembali.
      </div>

      <a
        href="https://linkedin.com/in/farhandyakbar"
        target="_blank"
        rel="noreferrer"
        style={{
          marginTop: "8px",
          fontSize: "13px",
          fontWeight: 500,
          color: "var(--text-primary)",
          border: "1px solid var(--footer-btn-border)",
          borderRadius: "6px",
          padding: "8px 16px",
          textDecoration: "none",
        }}
      >
        Hubungi saya
      </a>
    </main>
  );
}