"use client";

import { ExternalLink, ArrowRight } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

const experience = [
  { company: "Treefin", role: "Product Designer", period: "Present", bg: "#ea580c", letter: "T" },
  { company: "Handshake", role: "Product Design Intern", period: "2024", bg: "#f59e0b", letter: "H", darkText: true },
  { company: "X (Twitter)", role: "Product Design Intern", period: "2023", bg: "#0a0a0a", letter: "𝕏", outlined: true },
  { company: "McKinsey Rice", role: "Product Designer & Developer", period: "2020–2023", bg: "#1e3a5f", letter: "M" },
];

const workNav = ["X (Twitter)", "Handshake", "Forge", "Interface Lab", "About Town"];

function slugify(s: string) {
  return s.toLowerCase().replace(/[\s()]+/g, "");
}

function Divider() {
  return <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", margin: "0 52px" }} />;
}

function NavItem({ children, href, active, isWork, external }: { children: React.ReactNode, href: string, active?: boolean, isWork?: boolean, external?: boolean }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      onMouseMove={handleMouseMove}
      initial="initial"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      style={{
        position: "relative",
        fontSize: isWork ? "12px" : "13px",
        color: active ? "#e5e5e5" : "#888",
        padding: isWork ? "7px 8px 7px 14px" : "8px 10px",
        borderRadius: "6px",
        textDecoration: "none",
        fontWeight: active ? 500 : 400,
        marginBottom: isWork ? "1px" : "3px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: active ? "rgba(255,255,255,0.06)" : "transparent",
      }}
    >
      <motion.div
        variants={{
          initial: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          inset: 0,
          background: useMotionTemplate`radial-gradient(100px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.08), transparent 80%)`,
          zIndex: 0,
        }}
      />
      <motion.div
        variants={{
          initial: { x: 0, color: active ? "#e5e5e5" : "#888" },
          hover: { x: 4, color: "#fff" }
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "6px" }}
      >
        {children}
      </motion.div>
      <motion.div
        variants={{
          initial: { opacity: 0, x: -10, scale: 0.8 },
          hover: { opacity: 1, x: 0, scale: 1 }
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", color: "#666" }}
      >
        {external ? <ExternalLink size={12} strokeWidth={2} /> : <ArrowRight size={12} strokeWidth={2} />}
      </motion.div>
    </motion.a>
  );
}

function WorkSection({
  id, label, category, desc, children,
}: {
  id: string; label: string; category: string; desc: string; children: React.ReactNode;
}) {
  return (
    <section id={id} style={{ padding: "40px 52px 44px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
        <span style={{ fontSize: "13px", fontWeight: 500, color: "#e0e0e0" }}>{label}</span>
        <span style={{ fontSize: "11px", color: "#444" }}>{category}</span>
      </div>
      <p style={{ fontSize: "13px", color: "#555", lineHeight: 1.65, marginBottom: "20px", maxWidth: "520px" }}>{desc}</p>
      {children}
    </section>
  );
}

function ForgeCard() {
  return (
    <div style={{ borderRadius: "16px", height: "340px", background: "#f0f0f0", display: "flex", padding: "20px", gap: "14px", overflow: "hidden" }}>
      {/* Left panel */}
      <div style={{ width: "148px", flexShrink: 0, background: "#fff", borderRadius: "10px", padding: "14px", border: "1px solid #e8e8e8", display: "flex", flexDirection: "column", gap: "10px", overflow: "hidden" }}>
        <div style={{ fontSize: "9px", fontWeight: 700, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.1em" }}>Palette</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
          {["#3b82f6", "#8b5cf6", "#ec4899", "#f97316", "#22c55e", "#06b6d4", "#111", "#888"].map(c => (
            <div key={c} style={{ width: "18px", height: "18px", borderRadius: "50%", background: c, flexShrink: 0 }} />
          ))}
        </div>
        <div style={{ fontSize: "9px", fontWeight: 700, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.1em" }}>Components</div>
        {["Avatar", "Button", "Badge", "Card", "Input"].map(n => (
          <div key={n} style={{ fontSize: "11px", color: "#777", padding: "4px 8px", borderRadius: "5px", background: "#f5f5f5", border: "1px solid #ececec" }}>{n}</div>
        ))}
      </div>
      {/* Right panel */}
      <div style={{ flex: 1, background: "#fff", borderRadius: "10px", padding: "18px", border: "1px solid #e8e8e8", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ fontSize: "14px", fontWeight: 700, color: "#111", marginBottom: "14px" }}>Select Components</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {["Button", "Badge", "Input", "Dropdown", "Modal", "Toast"].map(c => (
            <div key={c} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 10px", borderRadius: "6px", background: "#f8f8f8", border: "1px solid #eee" }}>
              <span style={{ fontSize: "12px", color: "#444", fontWeight: 500 }}>{c}</span>
              <div style={{ width: "14px", height: "14px", borderRadius: "3px", border: "1.5px solid #ddd", flexShrink: 0 }} />
            </div>
          ))}
        </div>
        <div style={{ marginTop: "auto", paddingTop: "12px", borderTop: "1px solid #f0f0f0" }}>
          <span style={{ fontSize: "10px", color: "#bbb" }}>A portfolio website for a digital product designer</span>
        </div>
      </div>
    </div>
  );
}

function InterfaceLabCard() {
  return (
    <div style={{ borderRadius: "16px", height: "340px", background: "#f2f2f4", display: "flex", alignItems: "center", justifyContent: "center", gap: "24px", padding: "32px", overflow: "hidden" }}>
      {[
        { h: 220, bg: "#fff", dark: false },
        { h: 260, bg: "#1a1a2e", dark: true },
        { h: 190, bg: "#fff", dark: false },
      ].map((phone, i) => (
        <div key={i} style={{ width: "108px", height: `${phone.h}px`, borderRadius: "20px", background: phone.bg, border: `1.5px solid ${phone.dark ? "#2a2a4a" : "#e5e5e5"}`, boxShadow: "0 16px 48px rgba(0,0,0,0.10)", overflow: "hidden", flexShrink: 0, padding: "14px 12px", display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ height: "3px", borderRadius: "2px", background: phone.dark ? "#2a2a4a" : "#ebebeb", width: "40%", alignSelf: "center", marginBottom: "6px" }} />
          {[1, 2, 3, 4, 5].map(j => (
            <div key={j} style={{ height: "8px", borderRadius: "4px", background: phone.dark ? (j === 1 ? "#4f46e5" : "#252550") : (j === 1 ? "#e0e0e0" : "#f3f3f3") }} />
          ))}
          {phone.dark && <div style={{ marginTop: "6px", height: "28px", borderRadius: "6px", background: "#4f46e5" }} />}
        </div>
      ))}
      {/* Toggle */}
      <div style={{ width: "52px", height: "28px", borderRadius: "100px", background: "#4ade80", display: "flex", alignItems: "center", padding: "3px", justifyContent: "flex-end", flexShrink: 0, boxShadow: "0 4px 14px rgba(74,222,128,0.4)" }}>
        <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#fff" }} />
      </div>
    </div>
  );
}

function AboutTownCard() {
  return (
    <div style={{ borderRadius: "16px", height: "340px", display: "flex", overflow: "hidden" }}>
      {/* Left – outdoor photo simulation */}
      <div style={{ flex: 1, background: "linear-gradient(160deg, #2c3e50 0%, #1a252f 55%, #0d1a24 100%)", position: "relative", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "24px" }}>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }} />
        <div style={{ background: "rgba(255,255,255,0.93)", borderRadius: "10px", padding: "10px 14px", backdropFilter: "blur(8px)", maxWidth: "180px", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: "11px", fontWeight: 700, color: "#111", marginBottom: "2px" }}>DotBar Station</div>
          <div style={{ fontSize: "10px", color: "#777" }}>📍 0.3 mi away</div>
        </div>
      </div>
      {/* Right – blue app mockup */}
      <div style={{ width: "210px", background: "#2563eb", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "108px", height: "220px", borderRadius: "20px", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", padding: "14px 10px", display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ height: "3px", borderRadius: "2px", background: "rgba(255,255,255,0.5)", width: "40%", alignSelf: "center", marginBottom: "4px" }} />
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

export default function Home() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#121212", color: "#fff", fontFamily: "var(--font-geist-sans)" }}>

      {/* ── SIDEBAR ── */}
      <aside style={{
        width: "196px", minWidth: "196px",
        position: "sticky", top: 0, alignSelf: "flex-start",
        height: "100vh",
        padding: "18px 0",
        display: "flex", flexDirection: "column",
        borderRight: "1px solid rgba(255,255,255,0.07)",
        overflowY: "auto",
      }}>
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "0 14px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: "6px" }}>
          <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "linear-gradient(135deg, #f97316, #dc2626)", flexShrink: 0 }} />
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#e5e5e5" }}>George Kim</span>
        </div>

        <nav style={{ padding: "0 6px", display: "flex", flexDirection: "column", gap: "1px", flex: 1 }}>
          <NavItem href="#" active>
            Home
          </NavItem>

          <span style={{ fontSize: "10px", color: "#444", padding: "12px 10px 4px", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>
            Work
          </span>

          {workNav.map(name => (
            <NavItem key={name} href={`#${slugify(name)}`} isWork>
              {name}
            </NavItem>
          ))}

          <div style={{ height: "14px" }} />

          {["About", "Brief"].map(name => (
            <NavItem key={name} href="#">
              {name}
            </NavItem>
          ))}

          <NavItem href="https://linkedin.com/in/georgekim" external>
            LinkedIn
          </NavItem>
        </nav>
      </aside>

      {/* ── MAIN ── */}
      <main style={{ flex: 1, minWidth: 0 }}>

        {/* HERO */}
        <section style={{ padding: "44px 52px 44px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "22px" }}>
            {/* Avatar */}
            <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "linear-gradient(135deg, #4f46e5, #7c3aed)", flexShrink: 0 }} />
            {/* Identity */}
            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              <span style={{ fontSize: "13px", fontWeight: 500, color: "#d4d4d4" }}>George Kim · Portfolio</span>
              <a href="mailto:hello@georgekim.co" style={{ fontSize: "12px", color: "#4a4a4a", textDecoration: "none" }}>hello@georgekim.co</a>
            </div>
            {/* Available badge */}
            <div style={{ marginLeft: "auto" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "11px", color: "#60a5fa", background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.22)", borderRadius: "100px", padding: "3px 10px", whiteSpace: "nowrap" }}>
                <span style={{ width: "5px", height: "5px", background: "#4ade80", borderRadius: "50%", flexShrink: 0 }} />
                Available for freelance
              </span>
            </div>
          </div>

          <h1 style={{ fontSize: "26px", fontWeight: 600, lineHeight: 1.4, letterSpacing: "-0.022em", color: "#f0f0f0", marginBottom: "12px", maxWidth: "540px" }}>
            Product designer with focus on craft and detailed execution.
          </h1>

          <p style={{ fontSize: "13.5px", color: "#666", lineHeight: 1.65, marginBottom: "4px" }}>
            I design and build digital products & visual interfaces
          </p>
          <p style={{ fontSize: "13px", color: "#444", marginBottom: "22px" }}>
            Welcome to my design corner of web
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "24px" }}>
            {["UX Product", "Interface Design"].map(tag => (
              <span key={tag} style={{ fontSize: "11px", color: "#666", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "100px", padding: "3px 12px" }}>
                {tag}
              </span>
            ))}
          </div>

          <a href="mailto:hello@georgekim.co" style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "#2563eb", color: "#fff", fontWeight: 500, fontSize: "13px", padding: "9px 20px", borderRadius: "100px", textDecoration: "none" }}>
            Get in touch <ArrowRight size={13} />
          </a>
        </section>

        <Divider />

        {/* EXPERIENCE */}
        <section style={{ padding: "36px 52px" }}>
          {experience.map((job, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 0", borderBottom: i < experience.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{ width: "34px", height: "34px", borderRadius: "8px", background: job.bg, border: job.outlined ? "1px solid #2a2a2a" : "none", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 800, color: job.darkText ? "#000" : "#fff", flexShrink: 0 }}>
                  {job.letter}
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 500, color: "#e5e5e5" }}>{job.company}</div>
                  <div style={{ fontSize: "12px", color: "#555", marginTop: "1px" }}>{job.role}</div>
                </div>
              </div>
              <span style={{ fontSize: "12px", color: "#444" }}>{job.period}</span>
            </div>
          ))}
        </section>

        <Divider />

        {/* X (TWITTER) */}
        <WorkSection
          id={slugify("X (Twitter)")}
          label="X (Twitter)"
          category="Product Design Intern · 2023"
          desc="Worked on core product features at X, focusing on engagement surfaces and creator tools alongside senior designers and PMs across multiple squads."
        >
          <div style={{ borderRadius: "16px", height: "340px", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            <span style={{ fontSize: "96px", fontWeight: 900, color: "#fff", lineHeight: 1, fontFamily: "serif" }}>𝕏</span>
          </div>
        </WorkSection>

        {/* HANDSHAKE */}
        <WorkSection
          id={slugify("Handshake")}
          label="Handshake"
          category="Product Design Intern · 2024"
          desc="Redesigned employer-side job posting flows and candidate discovery surfaces, reducing time-to-publish by 40% through iterative data-driven testing."
        >
          <div style={{ borderRadius: "16px", height: "340px", background: "#CCFF00", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            <span style={{ fontSize: "148px", fontWeight: 900, color: "#000", lineHeight: 1 }}>H</span>
          </div>
        </WorkSection>

        {/* FORGE */}
        <WorkSection
          id={slugify("Forge")}
          label="Forge"
          category="Product Design"
          desc="Forge is an Architectural Design System Builder that offers a new way of building a design system with the help of AI tools. Frames, Figma, etc."
        >
          <ForgeCard />
        </WorkSection>

        {/* INTERFACE LAB */}
        <WorkSection
          id={slugify("Interface Lab")}
          label="Interface Lab"
          category="Open Source · Design System"
          desc="A portfolio website for a digital product designer. Open-source component library with accessible, composable primitives and Figma file integration."
        >
          <InterfaceLabCard />
        </WorkSection>

        {/* ABOUT TOWN */}
        <WorkSection
          id={slugify("About Town")}
          label="About Town"
          category="Product Design"
          desc="About Town is an app that helps users know what kind of things might help them decide what kind of area they'd like to live in during their life."
        >
          <AboutTownCard />
        </WorkSection>

        {/* FOOTER */}
        <section style={{ padding: "48px 52px 64px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ fontSize: "13px", color: "#555", lineHeight: 1.7, marginBottom: "18px", maxWidth: "400px" }}>
            If you want to know the details of any project or my availability — get in touch
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            {["Contact", "Email"].map(label => (
              <a key={label} href={label === "Email" ? "mailto:hello@georgekim.co" : "#"}
                style={{ fontSize: "13px", padding: "8px 22px", borderRadius: "100px", border: "1px solid rgba(255,255,255,0.1)", color: "#999", textDecoration: "none" }}>
                {label}
              </a>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
