"use client";

import { ExternalLink, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const experience = [
  { company: "PT Madhani Talatah Nusantara", role: "Lead Product Designer", period: "Jul 2025 - Jan 2026", img: "/madhani.png" },
  { company: "Synapsis", role: "Senior Product Designer", period: "Jan 2025 - Jan 2026", img: "/syn-1.png" },
  { company: "Empat Beruang Perkasa", role: "Senior UI/UX Designer (Part-time)", period: "Apr 2023 - Nov 2025", img: "/ebp.png" },
  { company: "majoo", role: "UI/UX Designer", period: "Apr 2022 - Sep 2023", img: "/majoo.png" },
  { company: "Alexander Goshen", role: "UI/UX Designer", period: "Apr 2023 - May 2023", img: "/ag.png" },
  { company: "Sans Brothers", role: "UI/UX Designer", period: "Apr 2022 - Sep 2023", img: "/sb.png" },
];

const workNav = ["X (Twitter)", "Handshake", "Forge", "Interface Lab", "About Town"];

const works = Array.from({ length: 5 }).map((_, i) => ({
  key: `x-${i}`,
  label: "X (Twitter)",
  period: "Apr 2022 - Sep 2023",
  desc: "Worked on core product features at X, focusing on engagement surfaces and creator tools alongside senior designers and PMs across multiple squads.",
}));

function slugify(s: string) {
  return s.toLowerCase().replace(/[\s()]+/g, "");
}

// ─── THEME TOKENS ─────────────────────────────────────────────────────────────

const theme = {
  bg: "var(--background)",
  sidebar: "var(--sidebar)",
  sidebarBorder: "var(--sidebar-border)",
  sidebarDivider: "var(--sidebar-divider)",
  textPrimary: "var(--text-primary)",
  textSecondary: "var(--text-secondary)",
  textMuted: "var(--text-muted)",
  navLabel: "var(--nav-label)",
  heroName: "var(--hero-name)",
  heroRole: "var(--hero-role)",
  heroBody: "var(--hero-body)",
  expRowBorder: "var(--exp-row-border)",
  expRole: "var(--exp-role)",
  expPeriod: "var(--exp-period)",
  workMeta: "var(--work-meta)",
  workDesc: "var(--work-desc)",
  footerDivider: "var(--footer-divider)",
  footerText: "var(--footer-text)",
  footerBtnBorder: "var(--footer-btn-border)",
  footerBtnFg: "var(--footer-btn-fg)",
  btnBg: "var(--btn-bg)",
  btnText: "var(--btn-text)",
} as const;

// ─── ICONS ───────────────────────────────────────────────────────────────────

function VerifiedBadge() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#1c9bf1" style={{ flexShrink: 0 }}>
      <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.68.88-3.34 2.19c-1.39-.46-2.9-.2-3.91.81s-1.27 2.52-.81 3.91C2.63 9.33 1.75 10.57 1.75 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91s2.52 1.27 3.91.81c.66 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 1200 1227" fill="currentColor">
      <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
    </svg>
  );
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function NavItem({
  children, href, active, isWork, external, theme,
}: {
  children: React.ReactNode;
  href: string;
  active?: boolean;
  isWork?: boolean;
  external?: boolean;
  theme: Theme;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -1, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      style={{
        position: "relative",
        fontFamily: "var(--font-inter), system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        fontSize: isWork ? "12px" : "13px",
        padding: isWork ? "5px 8px 5px 14px" : "6px 8px",
        borderRadius: "5px",
        textDecoration: "none",
        fontWeight: active ? 500 : 400,
        display: "flex",
        alignItems: "center",
        justifyContent: external ? "space-between" : "flex-start",
        gap: "4px",
        background: "transparent",
        color: active ? theme.textPrimary : theme.textMuted,
        overflow: "hidden",
      }}
    >
      {!active && (
        <>
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              background: "var(--nav-hover-bg, rgba(255,255,255,0.07))",
              pointerEvents: "none",
            }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          />
          <motion.div
            style={{
              position: "absolute",
              left: 0,
              top: "22%",
              bottom: "22%",
              width: 2,
              borderRadius: 999,
              background: "rgba(229,229,229,0.85)",
              pointerEvents: "none",
            }}
            animate={{
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : -3,
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
        </>
      )}

      <motion.span
        style={{ position: "relative", zIndex: 1 }}
        animate={{
          x: isHovered ? 2 : 0,
          color: isHovered && !active ? theme.textSecondary : active ? theme.textPrimary : theme.textMuted,
        }}
        transition={{ type: "spring", stiffness: 360, damping: 24 }}
      >
        {children}
      </motion.span>
      {external && (
        <motion.span
          style={{ display: "flex", position: "relative", zIndex: 1 }}
          animate={{
            opacity: isHovered ? 1 : 0.55,
            x: isHovered ? 1 : 0,
            rotate: isHovered ? -6 : 0,
          }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <ExternalLink size={10} color={theme.textMuted} />
        </motion.span>
      )}
    </motion.a>
  );
}

type Theme = typeof theme;

// Cards
function ForgeCard() {
  return (
    <div style={{ borderRadius: "16px", height: "340px", background: "#f0f0f0", display: "flex", padding: "20px", gap: "14px", overflow: "hidden" }}>
      <div style={{ width: "148px", flexShrink: 0, background: "#fff", borderRadius: "10px", padding: "14px", border: "1px solid #e8e8e8", display: "flex", flexDirection: "column", gap: "10px", overflow: "hidden" }}>
        <div style={{ fontSize: "9px", fontWeight: 700, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.1em" }}>Palette</div>
        <div style={{ display: "flex", gap: "5px" }}>
          {["#3b82f6", "#8b5cf6", "#ec4899", "#f97316"].map(c => (
            <div key={c} style={{ width: "18px", height: "18px", borderRadius: "50%", background: c, flexShrink: 0 }} />
          ))}
        </div>
        <div style={{ display: "flex", gap: "5px" }}>
          {["#22c55e", "#06b6d4", "#111", "#888"].map(c => (
            <div key={c} style={{ width: "18px", height: "18px", borderRadius: "50%", background: c, flexShrink: 0 }} />
          ))}
        </div>
        <div style={{ fontSize: "9px", fontWeight: 700, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.1em" }}>Components</div>
        <div style={{ fontSize: "11px", color: "#777", padding: "4px 8px", borderRadius: "5px", background: "#f5f5f5", border: "1px solid #ececec" }}>Avatar</div>
      </div>
      <div style={{ flex: 1, background: "#fff", borderRadius: "10px", padding: "18px", border: "1px solid #e8e8e8", display: "flex", flexDirection: "column", gap: "6px", overflow: "hidden" }}>
        <div style={{ fontSize: "14px", fontWeight: 700, color: "#111", marginBottom: "8px" }}>Select Components</div>
        {["Button", "Badge"].map(c => (
          <div key={c} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 10px", borderRadius: "6px", background: "#f8f8f8", border: "1px solid #eee" }}>
            <span style={{ fontSize: "12px", color: "#444", fontWeight: 500 }}>{c}</span>
            <div style={{ width: "14px", height: "14px", borderRadius: "3px", border: "1.5px solid #ddd", flexShrink: 0 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function InterfaceLabCard() {
  return (
    <div style={{ borderRadius: "16px", height: "340px", background: "#f2f2f4", display: "flex", alignItems: "center", justifyContent: "center", gap: "24px", padding: "32px", overflow: "hidden" }}>
      <div style={{ width: "108px", height: "220px", borderRadius: "20px", background: "#fff", border: "1.5px solid #e5e5e5", overflow: "hidden", flexShrink: 0, padding: "14px", display: "flex", flexDirection: "column", gap: "6px" }}>
        <div style={{ height: "3px", borderRadius: "2px", background: "#ebebeb", width: "40%", alignSelf: "center" }} />
        <div style={{ height: "8px", borderRadius: "4px", background: "#e0e0e0" }} />
        <div style={{ height: "8px", borderRadius: "4px", background: "#f3f3f3" }} />
        <div style={{ height: "8px", borderRadius: "4px", background: "#f3f3f3" }} />
      </div>
      <div style={{ width: "108px", height: "260px", borderRadius: "20px", background: "#1a1a2e", border: "1.5px solid #2a2a4a", overflow: "hidden", flexShrink: 0, padding: "14px", display: "flex", flexDirection: "column", gap: "6px" }}>
        <div style={{ height: "3px", borderRadius: "2px", background: "#2a2a4a", width: "40%", alignSelf: "center" }} />
        <div style={{ height: "8px", borderRadius: "4px", background: "#4f46e5" }} />
        <div style={{ height: "8px", borderRadius: "4px", background: "#252550" }} />
        <div style={{ height: "28px", borderRadius: "6px", background: "#4f46e5", marginTop: "6px" }} />
      </div>
      <div style={{ width: "108px", height: "190px", borderRadius: "20px", background: "#fff", border: "1.5px solid #e5e5e5", overflow: "hidden", flexShrink: 0, padding: "14px", display: "flex", flexDirection: "column", gap: "6px" }}>
        <div style={{ height: "3px", borderRadius: "2px", background: "#ebebeb", width: "40%", alignSelf: "center" }} />
        <div style={{ height: "8px", borderRadius: "4px", background: "#e0e0e0" }} />
      </div>
      <div style={{ width: "52px", height: "28px", borderRadius: "100px", background: "#4ade80", display: "flex", alignItems: "center", padding: "3px", justifyContent: "flex-end", flexShrink: 0 }}>
        <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#fff" }} />
      </div>
    </div>
  );
}

function AboutTownCard() {
  return (
    <div style={{ borderRadius: "16px", height: "340px", display: "flex", overflow: "hidden" }}>
      <div style={{ flex: 1, background: "linear-gradient(180deg, #2c3e50 0%, #0d1a24 100%)", position: "relative", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "24px" }}>
        <div style={{ background: "rgba(255,255,255,0.93)", borderRadius: "10px", padding: "10px 14px", maxWidth: "180px" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, color: "#111", marginBottom: "2px" }}>DotBar Station</div>
          <div style={{ fontSize: "10px", color: "#777" }}>📍 0.3 mi away</div>
        </div>
      </div>
      <div style={{ width: "210px", background: "#2563eb", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "108px", height: "220px", borderRadius: "20px", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", padding: "14px 10px", display: "flex", flexDirection: "column", gap: "8px", overflow: "hidden" }}>
          <div style={{ height: "3px", borderRadius: "2px", background: "rgba(255,255,255,0.5)", width: "40%", alignSelf: "center" }} />
          <div style={{ height: "6px", borderRadius: "3px", background: "rgba(255,255,255,0.55)", width: "75%" }} />
          <div style={{ height: "5px", borderRadius: "3px", background: "rgba(255,255,255,0.25)" }} />
          <div style={{ height: "52px", borderRadius: "8px", background: "rgba(255,255,255,0.15)", marginTop: "4px" }} />
          <div style={{ height: "5px", borderRadius: "3px", background: "rgba(255,255,255,0.25)", width: "90%" }} />
          <div style={{ height: "5px", borderRadius: "3px", background: "rgba(255,255,255,0.25)", width: "68%" }} />
          <div style={{ height: "26px", borderRadius: "6px", background: "rgba(255,255,255,0.88)", marginTop: "auto" }} />
        </div>
      </div>
    </div>
  );
}

// ─── COLUMN FOUNTAIN TRANSITION ─────────────────────────────────────────────
// World-class studio technique: columns erupt from bottom, center-first,
// like organ pipes firing or a city skyline snapping into existence.

const COL_COUNT = 10;

function ColumnFountainTransition({
  isTransitioning,
  nextTheme,
}: {
  isTransitioning: boolean;
  nextTheme: "dark" | "light";
}) {
  const bg = nextTheme === "dark" ? "#09090b" : "#fafafa";
  // Glowing accent line on the tip of each column
  const tipGlow = nextTheme === "dark"
    ? "rgba(255,255,255,0.55)"
    : "rgba(24,24,27,0.35)";
  // Subtle glow cap gradient just below the tip
  const capGlow = nextTheme === "dark"
    ? "rgba(255,255,255,0.07)"
    : "rgba(0,0,0,0.04)";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
      }}
    >
      {Array.from({ length: COL_COUNT }).map((_, i) => {
        const center = (COL_COUNT - 1) / 2;
        const distFromCenter = Math.abs(i - center);
        // Center columns fire first, edges follow — fountain effect
        const delay = (distFromCenter / center) * 0.14;
        // Deterministic micro-variation in timing (no Math.random for SSR safety)
        const microJitter = (i % 3) * 0.01;

        return (
          <motion.div
            key={i}
            initial={{ y: "101%" }}
            animate={{
              y: isTransitioning ? ["101%", "0%", "0%", "101%"] : "101%",
            }}
            transition={{
              y: {
                duration: 1.05,
                delay: delay + microJitter,
                times: [0, 0.42, 0.58, 1.0],
                ease: [
                  [0.76, 0, 0.24, 1],  // rise: expo decel — snaps to top
                  "linear",             // hold: completely still
                  [0.76, 0, 0.24, 1],  // retract: expo decel — snaps away
                ],
              },
            }}
            style={{
              flex: 1,
              height: "100%",
              position: "relative",
              // Slight alternating shade for column depth —
              // even columns are the pure bg, odd are 2% lighter/darker
              background: i % 2 === 0 ? bg : bg,
              backgroundImage: `linear-gradient(180deg, ${capGlow} 0%, transparent 12%, transparent 100%)`,
            }}
          >
            {/* Razor-sharp glowing tip line at the very top of each column */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "2px",
                background: tipGlow,
                boxShadow: nextTheme === "dark"
                  ? `0 0 12px 1px rgba(255,255,255,0.3), 0 0 30px 4px rgba(255,255,255,0.06)`
                  : `0 0 12px 1px rgba(0,0,0,0.12), 0 0 24px 2px rgba(0,0,0,0.04)`,
              }}
            />
            {/* Hairline column divider — visible only on the way up */}
            <div
              style={{
                position: "absolute",
                top: 0, bottom: 0,
                right: 0,
                width: "1px",
                background: nextTheme === "dark"
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(0,0,0,0.03)",
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

// Theme Toggle Component
function ThemeToggle({ themeMode, toggleTheme }: { themeMode: "dark" | "light"; toggleTheme: () => void }) {
  return (
    <div style={{ padding: "16px 20px", marginTop: "auto" }}>
      <button
        onClick={toggleTheme}
        style={{
          background: "transparent",
          border: "none",
          padding: 0,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          color: theme.textMuted,
          fontSize: "12px",
          fontFamily: "Inter",
          fontWeight: 500,
          outline: "none",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "10px",
            background: "rgba(255,255,255,0.03)",
            border: `1px solid ${theme.sidebarBorder}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <motion.div
            initial={false}
            animate={{
              y: themeMode === "dark" ? 0 : 40,
              rotate: themeMode === "dark" ? 0 : 90,
              opacity: themeMode === "dark" ? 1 : 0,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ position: "absolute" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </motion.div>
          <motion.div
            initial={false}
            animate={{
              y: themeMode === "light" ? 0 : -40,
              rotate: themeMode === "light" ? 0 : -90,
              opacity: themeMode === "light" ? 1 : 0,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ position: "absolute" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          </motion.div>
        </div>
        <motion.span
          animate={{ color: theme.textSecondary }}
          transition={{ duration: 0.2 }}
        >
          {themeMode === "dark" ? "Dark Mode" : "Light Mode"}
        </motion.span>
      </button>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [copyToastVisible, setCopyToastVisible] = useState(false);
  const [themeMode, setThemeMode] = useState<"dark" | "light">("dark");
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    if (savedTheme) {
      setThemeMode(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      setThemeMode("light");
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeMode);
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    // Last column fully rises at: maxDelay(0.14) + jitter(0.02) + rise_phase(0.42 * 1.05) ≈ 0.60s
    // Switch theme at 0.62s (safely inside the hold window)
    setTimeout(() => {
      setThemeMode(prev => prev === "dark" ? "light" : "dark");
      // All columns retracted by ~1.35s total. Add 100ms buffer.
      setTimeout(() => setIsTransitioning(false), 750);
    }, 620);
  };

  useEffect(() => {
    const email = "hellofarhandy@gmail.com";

    const copyEmail = async () => {
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(email);
        } else {
          const textarea = document.createElement("textarea");
          textarea.value = email;
          textarea.style.position = "fixed";
          textarea.style.opacity = "0";
          document.body.appendChild(textarea);
          textarea.focus();
          textarea.select();
          document.execCommand("copy");
          document.body.removeChild(textarea);
        }
        setCopyToastVisible(true);
        window.setTimeout(() => setCopyToastVisible(false), 1400);
      } catch {
        // Intentionally silent: keep UX non-blocking if copy is unavailable.
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.repeat || event.key.toLowerCase() !== "c") {
        return;
      }

      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      const isEditable =
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        target?.isContentEditable;

      if (isEditable) {
        return;
      }

      void copyEmail();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: theme.bg, color: theme.textPrimary, fontFamily: "var(--font-inter), system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif" }}>

      {/* ── SIDEBAR ── */}
      <aside style={{ width: "196px", minWidth: "196px", position: "fixed", top: 0, left: 0, height: "100vh", display: "flex", flexDirection: "column", borderRight: `1px solid ${theme.sidebarBorder}`, overflowY: "auto", zIndex: 10, background: theme.sidebar }}>
        <nav style={{ padding: "16px 12px", display: "flex", flexDirection: "column", gap: "1px", flex: 1 }}>
          <NavItem href="#" active theme={theme}>Home</NavItem>

          <div style={{ fontFamily: "var(--font-inter), system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif", fontSize: "10px", color: theme.navLabel, padding: "8px 8px 2px", textTransform: "uppercase", letterSpacing: "0.1px", fontWeight: 600 }}>
            Work
          </div>

          {workNav.map(name => (
            <NavItem key={name} href={`#${slugify(name)}`} isWork theme={theme}>{name}</NavItem>
          ))}

          <div style={{ height: "10px" }} />

          {["About", "Brief"].map(name => (
            <NavItem key={name} href="#" theme={theme}>{name}</NavItem>
          ))}

          <NavItem href="https://linkedin.com/in/farhandyakbar" external theme={theme}>LinkedIn</NavItem>
        </nav>

        <ThemeToggle themeMode={themeMode} toggleTheme={toggleTheme} />
      </aside>

      {/* ── MAIN ── */}
      <motion.main
        animate={{
          opacity: isTransitioning ? 0 : 1,
          y: isTransitioning ? 6 : 0,
        }}
        transition={{
          opacity: { duration: 0.25, ease: "easeInOut" },
          y: {
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
            delay: isTransitioning ? 0 : 0.1,
          },
        }}
        style={{ flex: 1, minWidth: 0, marginLeft: "197px" }}
      >

        {/* HERO */}
        <section style={{ padding: "80px 100px 56px", display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* wrap-identity */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* avatar (48x48, radius 14, clip) */}
            <div style={{ width: "48px", height: "48px", borderRadius: "14px", flexShrink: 0, position: "relative", overflow: "hidden", backgroundColor: "#ffffff" }}>
              <img
                src="/WhatsApp Image 2025-09-02 at 21.15.19.jpeg"
                alt=""
                style={{ position: "absolute", width: "49px", height: "86px", left: 0, top: "-19px", objectFit: "cover" }}
              />
              <img
                src="/pp.jpeg"
                alt=""
                style={{ position: "absolute", width: "61px", height: "108px", left: "-6.517px", top: "-30px", objectFit: "cover" }}
              />
            </div>

            {/* wrap-headline */}
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontFamily: "var(--font-plus-jakarta), sans-serif", fontSize: "24px", fontWeight: 600, letterSpacing: "-0.4px", color: theme.heroName }}>
                  Farhandy Akbar
                </span>
                <VerifiedBadge />
              </div>
              <span style={{ fontFamily: "var(--font-plus-jakarta), sans-serif", fontSize: "16px", fontWeight: 400, letterSpacing: "-0.2px", color: theme.heroRole }}>
                Product Designer · Design Engineer
              </span>
            </div>
          </div>

          {/* description (fixed-width 508) */}
          <p style={{ margin: 0, fontFamily: "Inter", fontSize: "14px", fontWeight: 400, lineHeight: 1.5, color: theme.heroBody, maxWidth: "508px", whiteSpace: "pre-line" }}>
            {"I craft digital products that balance form, function, and long-term value.\nMy approach blends product strategy, interface design, and front-end craft to deliver experiences that are clear, engaging, and resilient.\n\nCurrently exploring how AI tools like Claude Code and Antigravity can make creative work faster, more human, and more meaningful."}
          </p>

          {/* wrap-button */}
          <div style={{ display: "flex", gap: "8px" }}>
            <motion.a
              href="#"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 420, damping: 26 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "7px",
                padding: "10px 14px",
                borderRadius: "14px",
                background: theme.btnBg,
                color: theme.btnText,
                textDecoration: "none",
                fontFamily: "Inter",
                fontSize: "12px",
                fontWeight: 500,
              }}
            >
              View Resume
            </motion.a>

            <motion.a
              href="mailto:hello@farhandy.co"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 420, damping: 26 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px 14px",
                borderRadius: "14px",
                background: theme.btnBg,
                color: theme.btnText,
                textDecoration: "none",
              }}
            >
              <Mail size={18} />
            </motion.a>

            <motion.a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 420, damping: 26 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px 14px",
                borderRadius: "14px",
                background: theme.btnBg,
                color: theme.btnText,
                textDecoration: "none",
              }}
            >
              <XIcon />
            </motion.a>
          </div>

          {/* wrap-copy email */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-inter), system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif", fontSize: "12px", fontWeight: 400, color: theme.textMuted, lineHeight: 1.4 }}>
            <span>Press</span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "20px",
                height: "20px",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: 500,
                color: theme.textPrimary,
                background: "var(--copy-key-bg, rgba(255,255,255,0.06))",
                border: `1px solid ${theme.sidebarBorder}`,
                lineHeight: 1,
              }}
            >
              C
            </span>
            <span>to copy my email</span>
          </div>
        </section>

        {/* TEAM */}
        <section style={{ padding: "56px 100px", display: "flex", flexDirection: "column", gap: "8px" }}>
          <span style={{ fontFamily: "var(--font-plus-jakarta), sans-serif", fontSize: "16px", fontWeight: 400, letterSpacing: "-0.2px", color: theme.heroRole }}>
            Team
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {experience.map((job, i) => (
              <div
                key={i}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 0 12px",
                  borderBottom: `1px solid ${theme.expRowBorder}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "4px", background: "#ea580c", overflow: "hidden", flexShrink: 0 }}>
                    <img src={job.img} alt={job.company} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontFamily: "Inter", fontSize: "14px", fontWeight: 500, color: theme.textPrimary }}>
                      {job.company}
                    </span>
                    <span style={{ fontFamily: "Inter", fontSize: "12px", fontWeight: 400, color: theme.expRole }}>
                      {job.role}
                    </span>
                  </div>
                </div>
                <span style={{ fontFamily: "Inter", fontSize: "14px", fontWeight: 400, color: theme.expPeriod }}>
                  {job.period}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* WORKS */}
        <section style={{ padding: "56px 100px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <span style={{ fontFamily: "var(--font-plus-jakarta), sans-serif", fontSize: "16px", fontWeight: 400, letterSpacing: "-0.2px", color: theme.heroRole }}>
            Works
          </span>

          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            {works.map((w) => (
              <div key={w.key} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div
                  id={slugify(w.label)}
                  style={{
                    width: "100%",
                    height: "340px",
                    borderRadius: "8px",
                    background: "#000000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <span style={{ fontFamily: "Inter", fontSize: "96px", fontWeight: 900, color: "#ffffff", lineHeight: 1 }}>
                    𝕏
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ height: "fit-content", width: "100%" }}>
                    <span style={{ fontFamily: "Inter", fontSize: "14px", fontWeight: 500, color: theme.textPrimary }}>
                      {w.label}
                    </span>
                  </div>
                  <span style={{ fontFamily: "Inter", fontSize: "14px", fontWeight: 400, color: theme.workMeta }}>
                    {w.period}
                  </span>
                  <p style={{ margin: 0, fontFamily: "Inter", fontSize: "12px", fontWeight: 400, lineHeight: 1.65, color: theme.workDesc, maxWidth: "520px" }}>
                    {w.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* footerDivider */}
        <div style={{ height: "1px", background: theme.footerDivider, width: "100%" }} />

        {/* FOOTER */}
        <section style={{ width: "100%", padding: "48px 52px 64px", display: "flex", flexDirection: "column" }}>
          <p style={{ margin: 0, width: "400px", fontFamily: "var(--font-inter), system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif", fontSize: "13px", fontWeight: 400, lineHeight: 1.7, color: theme.footerText }}>
            If you want to know the details of any project or my availability — get in touch
          </p>
          <div style={{ width: "100%", height: "18px" }} />
          <div style={{ display: "flex", gap: "10px" }}>
            <a
              href="#"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px 22px",
                borderRadius: "100px",
                border: `1px solid ${theme.footerBtnBorder}`,
                color: theme.footerBtnFg,
                background: "transparent",
                textDecoration: "none",
                fontFamily: "var(--font-inter), system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
                fontSize: "13px",
                fontWeight: 400,
                lineHeight: 1,
              }}
            >
              Contact
            </a>
            <a
              href="mailto:hello@farhandy.co"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px 22px",
                borderRadius: "100px",
                border: `1px solid ${theme.footerBtnBorder}`,
                color: theme.footerBtnFg,
                background: "transparent",
                textDecoration: "none",
                fontFamily: "var(--font-inter), system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
                fontSize: "13px",
                fontWeight: 400,
                lineHeight: 1,
              }}
            >
              Email
            </a>
          </div>
        </section>

      </motion.main>

      <motion.div
        initial={false}
        animate={{
          opacity: copyToastVisible ? 1 : 0,
          y: copyToastVisible ? 0 : 8,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{
          position: "fixed",
          right: "22px",
          bottom: "22px",
          pointerEvents: "none",
          background: theme.btnBg,
          color: theme.btnText,
          border: `1px solid ${theme.sidebarBorder}`,
          borderRadius: "10px",
          padding: "8px 12px",
          fontFamily: "var(--font-inter), system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
          fontSize: "12px",
          fontWeight: 500,
          zIndex: 50,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        Email copied: hellofarhandy@gmail.com
      </motion.div>

      {/* Column Fountain Theme Transition */}
      <ColumnFountainTransition
        isTransitioning={isTransitioning}
        nextTheme={themeMode === "dark" ? "light" : "dark"}
      />
    </div>
  );
}
