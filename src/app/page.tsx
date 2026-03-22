"use client";

import { ExternalLink, Mail } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

// ─── DATA ────────────────────────────────────────────────────────────────────

const experience = [
  { company: "Treefin", role: "Product Designer", period: "Present", bg: "#ea580c", letter: "T" },
  { company: "Synapsis", role: "Product Designer", period: "Present", bg: "#ea580c", letter: "T" },
  { company: "majoo", role: "Product Designer", period: "Present", bg: "#ea580c", letter: "T" },
  { company: "Sans Brothers", role: "Product Designer", period: "Present", bg: "#ea580c", letter: "T" },
];

const workNav = ["X (Twitter)", "Handshake", "Forge", "Interface Lab", "About Town"];

function slugify(s: string) {
  return s.toLowerCase().replace(/[\s()]+/g, "");
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

function NavItem({
  children, href, active, isWork, external,
}: {
  children: React.ReactNode;
  href: string;
  active?: boolean;
  isWork?: boolean;
  external?: boolean;
}) {
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
      {/* Radial glow that follows mouse — hidden when active */}
      {!active && (
        <motion.div
          variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
          transition={{ duration: 0.25 }}
          style={{
            position: "absolute",
            inset: 0,
            background: useMotionTemplate`radial-gradient(80px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.07), transparent 80%)`,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Label — slides right + brightens on hover */}
      <motion.span
        variants={{
          rest: { x: 0, color: active ? "#e5e5e5" : "#484848" },
          hover: { x: 3, color: active ? "#fff" : "#c8c8c8" },
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        style={{ position: "relative", zIndex: 1 }}
      >
        {children}
      </motion.span>

      {/* Icon — fades in on hover */}
      {external && (
        <motion.span
          variants={{ rest: { opacity: 0.4 }, hover: { opacity: 1 } }}
          transition={{ duration: 0.2 }}
          style={{ position: "relative", zIndex: 1, display: "flex" }}
        >
          <ExternalLink size={10} color="#888" />
        </motion.span>
      )}
    </motion.a>
  );
}

function SectionDivider() {
  return (
    <div style={{ padding: "0 52px" }}>
      <div style={{ height: "1px", background: "rgba(255,255,255,0.05)" }} />
    </div>
  );
}

function WorkSection({
  id, label, category, desc, children,
}: {
  id: string; label: string; category: string; desc: string; children: React.ReactNode;
}) {
  return (
    <section id={id} style={{ padding: "40px 52px 44px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
        <span style={{ fontSize: "13px", fontWeight: 500, color: "#e0e0e0" }}>{label}</span>
        <span style={{ fontSize: "11px", color: "#444" }}>{category}</span>
      </div>
      <div style={{ height: "6px" }} />
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
      {/* Right panel */}
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
      {/* Phone 1 */}
      <div style={{ width: "108px", height: "220px", borderRadius: "20px", background: "#fff", border: "1.5px solid #e5e5e5", overflow: "hidden", flexShrink: 0, padding: "14px", display: "flex", flexDirection: "column", gap: "6px" }}>
        <div style={{ height: "3px", borderRadius: "2px", background: "#ebebeb", width: "40%", alignSelf: "center" }} />
        <div style={{ height: "8px", borderRadius: "4px", background: "#e0e0e0" }} />
        <div style={{ height: "8px", borderRadius: "4px", background: "#f3f3f3" }} />
        <div style={{ height: "8px", borderRadius: "4px", background: "#f3f3f3" }} />
      </div>
      {/* Phone 2 */}
      <div style={{ width: "108px", height: "260px", borderRadius: "20px", background: "#1a1a2e", border: "1.5px solid #2a2a4a", overflow: "hidden", flexShrink: 0, padding: "14px", display: "flex", flexDirection: "column", gap: "6px" }}>
        <div style={{ height: "3px", borderRadius: "2px", background: "#2a2a4a", width: "40%", alignSelf: "center" }} />
        <div style={{ height: "8px", borderRadius: "4px", background: "#4f46e5" }} />
        <div style={{ height: "8px", borderRadius: "4px", background: "#252550" }} />
        <div style={{ height: "28px", borderRadius: "6px", background: "#4f46e5", marginTop: "6px" }} />
      </div>
      {/* Phone 3 */}
      <div style={{ width: "108px", height: "190px", borderRadius: "20px", background: "#fff", border: "1.5px solid #e5e5e5", overflow: "hidden", flexShrink: 0, padding: "14px", display: "flex", flexDirection: "column", gap: "6px" }}>
        <div style={{ height: "3px", borderRadius: "2px", background: "#ebebeb", width: "40%", alignSelf: "center" }} />
        <div style={{ height: "8px", borderRadius: "4px", background: "#e0e0e0" }} />
      </div>
      {/* Toggle */}
      <div style={{ width: "52px", height: "28px", borderRadius: "100px", background: "#4ade80", display: "flex", alignItems: "center", padding: "3px", justifyContent: "flex-end", flexShrink: 0 }}>
        <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#fff" }} />
      </div>
    </div>
  );
}

function AboutTownCard() {
  return (
    <div style={{ borderRadius: "16px", height: "340px", display: "flex", overflow: "hidden" }}>
      {/* Left – map/outdoor */}
      <div style={{ flex: 1, background: "linear-gradient(180deg, #2c3e50 0%, #0d1a24 100%)", position: "relative", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "24px" }}>
        <div style={{ background: "rgba(255,255,255,0.93)", borderRadius: "10px", padding: "10px 14px", maxWidth: "180px" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, color: "#111", marginBottom: "2px" }}>DotBar Station</div>
          <div style={{ fontSize: "10px", color: "#777" }}>📍 0.3 mi away</div>
        </div>
      </div>
      {/* Right – blue app mockup */}
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

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#121212", color: "#fff", fontFamily: "var(--font-geist-sans)" }}>

      {/* ── SIDEBAR ── */}
      <aside style={{
        width: "196px", minWidth: "196px",
        position: "fixed", top: 0, left: 0,
        height: "100vh",
        padding: "18px 0",
        display: "flex", flexDirection: "column",
        borderRight: "1px solid rgba(255,255,255,0.07)",
        overflowY: "auto",
        zIndex: 10,
        background: "#121212",
      }}>
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "0 14px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: "6px" }}>
          <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "transparent", border: "1px solid #333", flexShrink: 0 }} />
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#e5e5e5" }}>George Kim</span>
        </div>

        <nav style={{ padding: "16px 12px", display: "flex", flexDirection: "column", gap: "1px", flex: 1 }}>
          <NavItem href="#" active>Home</NavItem>

          <div style={{ fontSize: "10px", color: "#444", padding: "8px 8px 2px", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>
            Work
          </div>

          {workNav.map(name => (
            <NavItem key={name} href={`#${slugify(name)}`} isWork>{name}</NavItem>
          ))}

          <div style={{ height: "10px" }} />

          {["About", "Brief"].map(name => (
            <NavItem key={name} href="#">{name}</NavItem>
          ))}

          <NavItem href="https://linkedin.com/in/georgekim" external>LinkedIn</NavItem>
        </nav>
      </aside>

      {/* ── MAIN ── */}
      <main style={{ flex: 1, minWidth: 0, marginLeft: "196px" }}>

        {/* HERO */}
        <section style={{ padding: "80px 56px 56px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>

            {/* wrap-identity */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Avatar — 48×48 clip, image 49×86 at y:-19 (sesuai Pencil) */}
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                flexShrink: 0,
                backgroundImage: "url('/avatar.jpg')",
                backgroundSize: "49px 86px",
                backgroundPosition: "0px -19px",
                backgroundRepeat: "no-repeat",
                backgroundColor: "#fff",
              }} />

              {/* Name + role */}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{
                    fontSize: "22px", fontWeight: 600, color: "#d4d4d4",
                    fontFamily: "var(--font-plus-jakarta), sans-serif",
                    letterSpacing: "-0.4px",
                  }}>
                    Farhandy Akbar
                  </span>
                  <VerifiedBadge />
                </div>
                <span style={{
                  fontSize: "16px", color: "#969696",
                  fontFamily: "var(--font-plus-jakarta), sans-serif",
                  letterSpacing: "-0.2px",
                }}>
                  Product Designer · Design Engineer
                </span>
              </div>
            </div>

            {/* Description */}
            <p style={{ fontSize: "14px", color: "#fff", lineHeight: 1.5, maxWidth: "508px", margin: 0 }}>
              I craft digital products that balance form, function, and long-term value.
              My approach blends product strategy, interface design, and front-end craft to deliver experiences that are clear, engaging, and resilient.
              <br /><br />
              Currently exploring how AI tools like Claude Code and Antigravity can make creative work faster, more human, and more meaningful.
            </p>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "8px" }}>
              <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "#fff", color: "#252525", fontWeight: 500, fontSize: "12px", fontFamily: "var(--font-geist-sans)", padding: "10px 14px", borderRadius: "14px", textDecoration: "none" }}>
                View Resume
              </a>
              <a href="mailto:hello@farhandy.co" style={{ display: "inline-flex", alignItems: "center", background: "#fff", color: "#000", padding: "10px 14px", borderRadius: "14px", textDecoration: "none" }}>
                <Mail size={16} />
              </a>
              <a href="https://x.com" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", background: "#fff", color: "#000", padding: "10px 14px", borderRadius: "14px", textDecoration: "none" }}>
                <XIcon />
              </a>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section style={{ padding: "56px" }}>
          <span style={{
            fontSize: "16px", color: "#969696", display: "block", marginBottom: "8px",
            fontFamily: "var(--font-plus-jakarta), sans-serif",
            letterSpacing: "-0.2px",
          }}>
            Team
          </span>
          <div>
            {experience.map((job, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid #282828",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: job.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 800, color: "#fff", flexShrink: 0 }}>
                    {job.letter}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "12px", fontWeight: 500, color: "#e5e5e5" }}>{job.company}</span>
                    <span style={{ fontSize: "12px", color: "#969696" }}>{job.role}</span>
                  </div>
                </div>
                <span style={{ fontSize: "12px", color: "#444" }}>{job.period}</span>
              </div>
            ))}
          </div>
        </section>

        <SectionDivider />

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

        <SectionDivider />

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

        <SectionDivider />

        {/* FORGE */}
        <WorkSection
          id={slugify("Forge")}
          label="Forge"
          category="Product Design"
          desc="Forge is an Architectural Design System Builder that offers a new way of building a design system with the help of AI tools like Frames and Figma."
        >
          <ForgeCard />
        </WorkSection>

        <SectionDivider />

        {/* INTERFACE LAB */}
        <WorkSection
          id={slugify("Interface Lab")}
          label="Interface Lab"
          category="Open Source · Design System"
          desc="A portfolio website for a digital product designer. Open-source component library with accessible, composable primitives and Figma file integration."
        >
          <InterfaceLabCard />
        </WorkSection>

        <SectionDivider />

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
