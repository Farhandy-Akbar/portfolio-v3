"use client";

import { ExternalLink, Mail } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue, AnimatePresence } from "framer-motion";
import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const experience = [
  { company: "PT Madhani Talatah Nusantara", role: "Lead Product Designer", period: "Jul 2025 - Jan 2026", img: "/madhani.png" },
  { company: "Synapsis", role: "Senior Product Designer", period: "Jan 2025 - Jan 2026", img: "/syn-1.png" },
  { company: "Empat Beruang Perkasa", role: "Senior UI/UX Designer (Part-time)", period: "Apr 2023 - Nov 2025", img: "/ebp.png" },
  { company: "majoo", role: "UI/UX Designer", period: "Apr 2022 - Sep 2023", img: "/majoo.png" },
  { company: "Alexander Goshen", role: "UI/UX Designer", period: "Apr 2023 - May 2023", img: "/ag.png" },
  { company: "Sans Brothers", role: "UI/UX Designer", period: "Apr 2022 - Sep 2023", img: "/sb.png" },
];

const workNav = ["X (Twitter)", "Handshake"];

function slugify(s: string) {
  return s.toLowerCase().replace(/[\s()]+/g, "");
}

// ─── THEME TOKENS ─────────────────────────────────────────────────────────────

function buildTheme(isDark: boolean) {
  return {
    bg:           isDark ? "#121212" : "#f5f5f5",
    sidebar:      isDark ? "#121212" : "#f0f0f0",
    sidebarBorder:isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)",
    divider:      isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.08)",
    brandBorder:  isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.09)",
    footerBorder: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.09)",
    textPrimary:  isDark ? "#e5e5e5" : "#111111",
    textSecondary:isDark ? "#969696" : "#555555",
    textMuted:    isDark ? "#484848" : "#6b7280",
    navLabel:     isDark ? "#383838" : "#909090",
    heroName:     isDark ? "#d4d4d4" : "#1a1a1a",
    heroBody:     isDark ? "#ffffff" : "#222222",
    brandName:    isDark ? "#e5e5e5" : "#111111",
    expRowBorder: isDark ? "#282828" : "#e2e2e2",
    expName:      isDark ? "#e5e5e5" : "#111111",
    expRole:      isDark ? "#969696" : "#6b7280",
    expPeriod:    isDark ? "#969696" : "#787878",
    workLabel:    isDark ? "#e0e0e0" : "#111111",
    workCategory: isDark ? "#444444" : "#6b7280",
    workDesc:     isDark ? "#555555" : "#555555",
    btnBg:        isDark ? "#ffffff" : "#1a1a1a",
    btnFg:        isDark ? "#1a1a1a" : "#f5f5f5",
    footerText:   isDark ? "#555555" : "#555555",
    footerBtnBorder: isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.18)",
    footerBtnFg: isDark ? "#999999" : "#555555",
  };
}

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

type Theme = ReturnType<typeof buildTheme>;

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
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [hovered, setHovered] = useState(false);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const isDark = theme.bg === "#121212";
  const glowColor = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)";
  const baseColor  = active ? theme.textPrimary : theme.textMuted;
  const hoverColor = active ? theme.textPrimary : theme.textSecondary;
  const currentColor = hovered ? hoverColor : baseColor;

  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      style={{
        position: "relative",
        fontSize: isWork ? "12px" : "13px",
        padding: isWork ? "5px 8px 5px 14px" : "6px 8px",
        borderRadius: "5px",
        textDecoration: "none",
        fontWeight: active ? 500 : 400,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "4px",
        overflow: "hidden",
        background: "transparent",
      }}
    >
      {!active && (
        <motion.div
          variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
          transition={{ duration: 0.25 }}
          style={{
            position: "absolute",
            inset: 0,
            // eslint-disable-next-line react-hooks/rules-of-hooks
            background: useMotionTemplate`radial-gradient(80px circle at ${mouseX}px ${mouseY}px, ${glowColor}, transparent 80%)`,
            pointerEvents: "none",
          }}
        />
      )}
      <motion.span
        variants={{ rest: { x: 0 }, hover: { x: 3 } }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        style={{ position: "relative", zIndex: 1, color: currentColor, transition: "color 0.2s ease" }}
      >
        {children}
      </motion.span>
      {external && (
        <motion.span
          variants={{ rest: { opacity: 0.4 }, hover: { opacity: 1 } }}
          transition={{ duration: 0.2 }}
          style={{ position: "relative", zIndex: 1, display: "flex" }}
        >
          <ExternalLink size={10} color={theme.textMuted} />
        </motion.span>
      )}
    </motion.a>
  );
}

function SectionDivider({ theme }: { theme: Theme }) {
  return (
    <div style={{ padding: "0 52px" }}>
      <div style={{ height: "1px", background: theme.divider, transition: "background 0.3s" }} />
    </div>
  );
}

function WorkSection({
  id, label, category, desc, children, theme,
}: {
  id: string; label: string; category: string; desc: string;
  children: React.ReactNode; theme: Theme;
}) {
  return (
    <section id={id} style={{ padding: "40px 100px 44px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
        <span style={{ fontSize: "13px", fontWeight: 500, color: theme.workLabel, transition: "color 0.3s" }}>{label}</span>
        <span style={{ fontSize: "11px", color: theme.workCategory, transition: "color 0.3s" }}>{category}</span>
      </div>
      <div style={{ height: "6px" }} />
      <p style={{ fontSize: "13px", color: theme.workDesc, lineHeight: 1.65, marginBottom: "20px", maxWidth: "520px", transition: "color 0.3s" }}>{desc}</p>
      {children}
    </section>
  );
}

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

// ─── THEME TOGGLE ─────────────────────────────────────────────────────────────

function ThemeToggle({ isDark, onToggle, theme }: { isDark: boolean; onToggle: () => void; theme: Theme }) {
  return (
    <motion.button
      onClick={onToggle}
      whileTap={{ scale: 0.92 }}
      whileHover="hover"
      initial="rest"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      style={{
        display: "flex", alignItems: "center", gap: "8px",
        background: "transparent", border: "1px solid", borderColor: theme.sidebarBorder,
        borderRadius: "10px", padding: "7px 12px", cursor: "pointer",
        color: theme.textMuted, fontSize: "11px", fontFamily: "var(--font-geist-sans)",
        fontWeight: 500, width: "100%", transition: "border-color 0.3s, color 0.3s, background 0.3s",
        overflow: "hidden", position: "relative",
      }}
    >
      <motion.div
        variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
        transition={{ duration: 0.2 }}
        style={{ position: "absolute", inset: 0, background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)", pointerEvents: "none" }}
      />
      <div style={{ width: "16px", height: "16px", position: "relative", flexShrink: 0 }}>
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div key="moon" initial={{ rotate: -30, opacity: 0, scale: 0.7 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: 30, opacity: 0, scale: 0.7 }} transition={{ duration: 0.22, ease: "easeInOut" }} style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </motion.div>
          ) : (
            <motion.div key="sun" initial={{ rotate: 30, opacity: 0, scale: 0.7 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: -30, opacity: 0, scale: 0.7 }} transition={{ duration: 0.22, ease: "easeInOut" }} style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <motion.span variants={{ rest: { x: 0 }, hover: { x: 2 } }} transition={{ type: "spring", stiffness: 400, damping: 28 }} style={{ position: "relative", zIndex: 1 }}>
        {isDark ? "Dark Mode" : "Light Mode"}
      </motion.span>
    </motion.button>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const theme = buildTheme(isDark);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: theme.bg, color: theme.textPrimary, fontFamily: "var(--font-geist-sans)", transition: "background 0.3s, color 0.3s" }}>

      {/* ── SIDEBAR ── */}
      <aside style={{ width: "196px", minWidth: "196px", position: "fixed", top: 0, left: 0, height: "100vh", padding: "18px 0", display: "flex", flexDirection: "column", borderRight: `1px solid ${theme.sidebarBorder}`, overflowY: "auto", zIndex: 10, background: theme.sidebar, transition: "background 0.3s, border-color 0.3s" }}>
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "0 20px 20px", borderBottom: `1px solid ${theme.brandBorder}`, transition: "border-color 0.3s" }}>
          <span style={{ fontSize: "13px", fontWeight: 600, color: theme.brandName, transition: "color 0.3s" }}>Farhandy Akbar</span>
        </div>

        <nav style={{ padding: "16px 12px", display: "flex", flexDirection: "column", gap: "1px", flex: 1 }}>
          <NavItem href="#" active theme={theme}>Home</NavItem>

          <div style={{ fontSize: "10px", color: theme.navLabel, padding: "8px 8px 2px", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, transition: "color 0.3s" }}>
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

        {/* Theme Toggle */}
        <div style={{ padding: "12px", borderTop: `1px solid ${theme.sidebarBorder}`, transition: "border-color 0.3s" }}>
          <ThemeToggle isDark={isDark} onToggle={() => setIsDark(d => !d)} theme={theme} />
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main style={{ flex: 1, minWidth: 0, marginLeft: "196px", transition: "background 0.3s" }}>

        {/* HERO */}
        <section style={{ padding: "80px 100px 56px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* wrap-identity */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* avatar */}
              <div style={{ width: "48px", height: "48px", borderRadius: "14px", flexShrink: 0, position: "relative", overflow: "hidden", backgroundColor: "#fff" }}>
                <div style={{ position: "absolute", width: "49px", height: "86px", top: "-19px", left: "0px", backgroundImage: "url('/WhatsApp Image 2025-09-02 at 21.15.19.jpeg')", backgroundSize: "cover" }} />
                <div style={{ position: "absolute", width: "61px", height: "108px", top: "-30px", left: "-6.52px", backgroundImage: "url('/pp.jpeg')", backgroundSize: "cover" }} />
              </div>
              {/* wrap-headline */}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {/* wrap-name */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "24px", fontWeight: 600, color: theme.heroName, fontFamily: "var(--font-plus-jakarta), sans-serif", letterSpacing: "-0.4px", transition: "color 0.3s" }}>
                    Farhandy Akbar
                  </span>
                  <VerifiedBadge />
                </div>
                <span style={{ fontSize: "16px", color: theme.textSecondary, fontFamily: "var(--font-plus-jakarta), sans-serif", letterSpacing: "-0.2px", transition: "color 0.3s" }}>
                  Product Designer · Design Engineer
                </span>
              </div>
            </div>

            {/* Description */}
            <p style={{ fontSize: "14px", color: theme.heroBody, lineHeight: 1.5, maxWidth: "508px", margin: 0, transition: "color 0.3s" }}>
              I craft digital products that balance form, function, and long-term value.
              My approach blends product strategy, interface design, and front-end craft to deliver experiences that are clear, engaging, and resilient.
              <br /><br />
              Currently exploring how AI tools like Claude Code and Antigravity can make creative work faster, more human, and more meaningful.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: "flex", gap: "8px" }}>
              {/* View Resume */}
              <motion.a
                href="#"
                whileHover={{ scale: 1.04, backgroundColor: isDark ? "#e8e8e8" : "#333333" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                style={{ display: "inline-flex", alignItems: "center", gap: "7px", backgroundColor: theme.btnBg, color: theme.btnFg, fontWeight: 500, fontSize: "12px", fontFamily: "var(--font-geist-sans)", padding: "10px 14px", borderRadius: "14px", textDecoration: "none", cursor: "pointer" }}
              >
                View Resume
              </motion.a>
              {/* Mail */}
              <motion.a
                href="mailto:hello@farhandy.co"
                whileHover={{ scale: 1.08, backgroundColor: isDark ? "#e8e8e8" : "#333333" }}
                whileTap={{ scale: 0.92, rotate: -8 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                style={{ display: "inline-flex", alignItems: "center", backgroundColor: theme.btnBg, color: theme.btnFg, padding: "10px 14px", borderRadius: "14px", textDecoration: "none", cursor: "pointer" }}
              >
                <Mail size={16} />
              </motion.a>
              {/* X */}
              <motion.a
                href="https://x.com" target="_blank" rel="noreferrer"
                whileHover={{ scale: 1.08, backgroundColor: isDark ? "#e8e8e8" : "#333333" }}
                whileTap={{ scale: 0.92, rotate: 8 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                style={{ display: "inline-flex", alignItems: "center", backgroundColor: theme.btnBg, color: theme.btnFg, padding: "10px 14px", borderRadius: "14px", textDecoration: "none", cursor: "pointer" }}
              >
                <XIcon />
              </motion.a>
            </div>
          </div>
        </section>

        {/* EXPERIENCE — EFtDV: padding 56 100, gap 8 */}
        <section style={{ padding: "56px 100px", display: "flex", flexDirection: "column", gap: "8px" }}>
          {/* Team label */}
          <span style={{ fontSize: "16px", color: theme.textSecondary, fontFamily: "var(--font-plus-jakarta), sans-serif", letterSpacing: "-0.2px", transition: "color 0.3s" }}>
            Team
          </span>
          {/* Z7q85: gap 4 between rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {experience.map((job, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0 12px", borderBottom: `1px solid ${theme.expRowBorder}`, transition: "border-color 0.3s" }}>
                {/* expRow left: gap 14 */}
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  {/* icon: 32x32 */}
                  <div style={{ width: "32px", height: "32px", borderRadius: "4px", background: "#ea580c", flexShrink: 0, overflow: "hidden" }}>
                    <img src={job.img} alt={job.company} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                  {/* info stack: gap 2 */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontSize: "14px", fontWeight: 500, color: theme.expName, transition: "color 0.3s" }}>{job.company}</span>
                    <span style={{ fontSize: "12px", color: theme.expRole, transition: "color 0.3s" }}>{job.role}</span>
                  </div>
                </div>
                <span style={{ fontSize: "14px", color: theme.expPeriod, transition: "color 0.3s" }}>{job.period}</span>
              </div>
            ))}
          </div>
        </section>

        <SectionDivider theme={theme} />

        {/* X (TWITTER) */}
        <WorkSection
          id={slugify("X (Twitter)")}
          label="X (Twitter)"
          category="Product Design Intern · 2023"
          desc="Worked on core product features at X, focusing on engagement surfaces and creator tools alongside senior designers and PMs across multiple squads."
          theme={theme}
        >
          <motion.div
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            style={{ borderRadius: "8px", height: "340px", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", cursor: "pointer" }}
          >
            <motion.span
              whileHover={{ scale: 1.12, rotate: -4 }}
              whileTap={{ scale: 0.9, rotate: 4 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              style={{ fontSize: "96px", fontWeight: 900, color: "#fff", lineHeight: 1, fontFamily: "serif", display: "block" }}
            >
              𝕏
            </motion.span>
          </motion.div>
        </WorkSection>

        <SectionDivider theme={theme} />

        {/* HANDSHAKE */}
        <WorkSection
          id={slugify("Handshake")}
          label="Handshake"
          category="Product Design Intern · 2024"
          desc="Redesigned employer-side job posting flows and candidate discovery surfaces, reducing time-to-publish by 40% through iterative data-driven testing."
          theme={theme}
        >
          <motion.div
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            style={{ borderRadius: "8px", height: "340px", background: "#CCFF00", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", cursor: "pointer" }}
          >
            <motion.span
              whileHover={{ scale: 1.1, y: -8 }}
              whileTap={{ scale: 0.92, y: 4 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              style={{ fontSize: "148px", fontWeight: 900, color: "#000", lineHeight: 1, display: "block" }}
            >
              H
            </motion.span>
          </motion.div>
        </WorkSection>

        {/* hsDivider */}
        <div style={{ height: "1px", background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.08)", transition: "background 0.3s" }} />

        {/* FOOTER */}
        <section style={{ padding: "48px 52px 64px", transition: "border-color 0.3s" }}>
          <p style={{ fontSize: "13px", color: theme.footerText, lineHeight: 1.7, marginBottom: "18px", maxWidth: "400px", transition: "color 0.3s" }}>
            If you want to know the details of any project or my availability — get in touch
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            {["Contact", "Email"].map(label => (
              <a key={label} href={label === "Email" ? "mailto:hello@farhandy.co" : "#"}
                style={{ fontSize: "13px", padding: "8px 22px", borderRadius: "100px", border: `1px solid ${theme.footerBtnBorder}`, color: theme.footerBtnFg, textDecoration: "none", transition: "border-color 0.3s, color 0.3s" }}>
                {label}
              </a>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
