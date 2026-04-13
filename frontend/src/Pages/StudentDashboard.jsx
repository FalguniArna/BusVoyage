import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BusTracking    from "./BusTracking";
import RoutesSchedule from "./RoutesSchedule";
import Announcements  from "./Announcements";
import Complaints     from "./Complaints";
import LostFound      from "./LostFound";

/* ═══════════════════════════════════════════════════════════
   STUDENT DASHBOARD  —  BusVoyage · Metropolitan University
   Layout : Fixed left sidebar + scrollable right content
   Theme  : White content area, dark navy sidebar, blue accents
   Design : Clean card-based, professional, no heavy animations
═══════════════════════════════════════════════════════════ */

/* ─── Navigation config ─── */
const NAV = [
  { section: "Main",      id: "dashboard",     label: "Dashboard",        icon: "🏠" },
  { section: "Transport", id: "tracking",      label: "Live Tracking",    icon: "📍", badge: null },
  { section: "Transport", id: "routes",        label: "Routes & Schedule",icon: "🗺️"  },
  { section: "Transport", id: "announcements", label: "Announcements",    icon: "📣", badge: 2 },
  { section: "Services",  id: "complaints",    label: "Complaints",       icon: "💬" },
  { section: "Services",  id: "lostfound",     label: "Lost & Found",     icon: "🎒" },
  { section: "Account",   id: "profile",       label: "My Profile",       icon: "👤" },
];

const NAV_SECTIONS = ["Main", "Transport", "Services", "Account"];

export default function StudentDashboard() {
  const navigate = useNavigate();

  const [user,       setUser]       = useState(null);
  const [active,     setActive]     = useState("dashboard");
  const [time,       setTime]       = useState(new Date());
  const [sbOpen,     setSbOpen]     = useState(false); // mobile sidebar toggle

  /* Auth guard */
  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (!raw) { navigate("/login"); return; }
    const u = JSON.parse(raw);
    if (u.role !== "student") { navigate("/login"); return; }
    setUser(u);
  }, []);

  /* Live clock */
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  if (!user) return null;

  /* Helpers */
  const initials = user.name
    ? user.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
    : "ST";

  const firstName = user.name?.split(" ")[0] ?? "Student";

  const greeting = () => {
    const h = time.getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    if (h < 20) return "Good evening";
    return "Good night";
  };

  const fmtTime = (d) =>
    d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  const fmtDate = (d) =>
    d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const selectMenu = (id) => {
    setActive(id);
    setSbOpen(false); // close sidebar on mobile after selection
  };

  /* Page title map */
  const PAGE_TITLES = {
    dashboard:     `${greeting()}, ${firstName}!`,
    tracking:      "Live Bus Tracking",
    routes:        "Routes & Schedule",
    announcements: "Announcements",
    complaints:    "Complaints",
    lostfound:     "Lost & Found",
    profile:       "My Profile",
  };

  /* Content renderer */
  const renderPage = () => {
    switch (active) {
      case "tracking":      return <BusTracking />;
      case "routes":        return <RoutesSchedule />;
      case "announcements": return <Announcements />;
      case "complaints":    return <Complaints />;
      case "lostfound":     return <LostFound />;
      case "profile":       return <ComingSoon icon="👤" title="My Profile" />;
      default:              return <DashboardHome user={user} greeting={greeting} firstName={firstName} onNavigate={selectMenu} />;
    }
  };

  return (
    <div style={layout.root}>
      <style>{GLOBAL_CSS}</style>

      {/* ════════ SIDEBAR ════════ */}
      <aside style={{ ...layout.sidebar, ...(sbOpen ? layout.sidebarVisible : {}) }}>

        {/* Logo */}
        <div style={sb.brand}>
          <div style={sb.brandIcon}>🚌</div>
          <div>
            <div style={sb.brandName}>BusVoyage</div>
            <div style={sb.brandSub}>Metropolitan University</div>
          </div>
        </div>

        {/* User card */}
        <div style={sb.userCard}>
          <div style={sb.avatar}>{initials}</div>
          <div style={{ minWidth: 0 }}>
            <div style={sb.userName}>{user.name}</div>
            <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 3 }}>
              <span style={sb.rolePill}>Student</span>
              <span style={sb.userId}>#{user.studentId}</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={sb.nav}>
          {NAV_SECTIONS.map(section => {
            const items = NAV.filter(n => n.section === section);
            return (
              <div key={section} style={{ marginBottom: 8 }}>
                <div style={sb.sectionLabel}>{section}</div>
                {items.map(item => {
                  const isOn = active === item.id;
                  return (
                    <button
                      key={item.id}
                      style={{ ...sb.navItem, ...(isOn ? sb.navItemOn : {}) }}
                      onClick={() => selectMenu(item.id)}
                    >
                      <span style={sb.navIcon}>{item.icon}</span>
                      <span style={{ flex: 1, textAlign: "left" }}>{item.label}</span>
                      {item.badge && <span style={sb.badge}>{item.badge}</span>}
                      {isOn && <span style={sb.activePill} />}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={sb.footer}>
          <div style={sb.divider} />
          <button style={sb.logoutBtn} onClick={handleLogout}>
            <span>⎋</span> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile backdrop */}
      {sbOpen && (
        <div style={layout.backdrop} onClick={() => setSbOpen(false)} />
      )}

      {/* ════════ MAIN AREA ════════ */}
      <div style={layout.main}>

        {/* Top bar */}
        <header style={topbar.wrap}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Hamburger — mobile only */}
            <button style={topbar.ham} onClick={() => setSbOpen(o => !o)}>
              <span style={topbar.hamLine} />
              <span style={topbar.hamLine} />
              <span style={topbar.hamLine} />
            </button>
            <div>
              <div style={topbar.title}>{PAGE_TITLES[active]}</div>
              <div style={topbar.date}>{fmtDate(time)}</div>
            </div>
          </div>

          <div style={topbar.right}>
            <div style={topbar.clock}>🕐 {fmtTime(time)}</div>
            <div style={topbar.statusPill}>
              <span style={topbar.statusDot} />
              <span style={topbar.statusText}>All buses running</span>
            </div>
            <button style={topbar.bell}>
              🔔
              <span style={topbar.bellDot} />
            </button>
            <div style={topbar.ava}>{initials}</div>
          </div>
        </header>

        {/* Page content */}
        <main style={layout.content}>
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DASHBOARD HOME
═══════════════════════════════════════════════════════════ */
function DashboardHome({ user, greeting, firstName, onNavigate }) {

  const STATS = [
    { icon: "🚌", label: "Active Buses",  value: "5 / 8",     sub: "Fleet operational",   color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe" },
    { icon: "📍", label: "My Route",      value: "MU-02",      sub: "Tilagor → Campus",    color: "#059669", bg: "#ecfdf5", border: "#6ee7b7" },
    { icon: "⏰", label: "Next Bus",      value: "07:45",      sub: "≈ 12 min away",       color: "#d97706", bg: "#fffbeb", border: "#fcd34d" },
    { icon: "💺", label: "Crowd Status",  value: "Seats Free", sub: "Low occupancy now",   color: "#7c3aed", bg: "#f5f3ff", border: "#c4b5fd" },
  ];

  const SHORTCUTS = [
    { id: "tracking",      icon: "📍", title: "Live Tracking",      desc: "See where your bus is now",       badge: "● Live",   bBg: "#dcfce7", bColor: "#166534" },
    { id: "routes",        icon: "🗺️", title: "Routes & Schedules", desc: "Full timetable for all 5 routes", badge: "5 routes", bBg: "#f1f5f9", bColor: "#475569" },
    { id: "announcements", icon: "📣", title: "Announcements",       desc: "Latest notices from transport",   badge: "2 new",    bBg: "#fef3c7", bColor: "#92400e" },
    { id: "complaints",    icon: "💬", title: "Complaints",          desc: "Report or track an issue",        badge: "Open",     bBg: "#f1f5f9", bColor: "#475569" },
    { id: "lostfound",     icon: "🎒", title: "Lost & Found",        desc: "Search or report lost items",     badge: "Search",   bBg: "#f1f5f9", bColor: "#475569" },
  ];

  const ACTIVITY = [
    { icon: "📢", text: "Bus MU-03 delayed 15 min — road work near Bondor", time: "10 min ago",  color: "#f59e0b" },
    { icon: "✅", text: "Your complaint #C-041 has been resolved",           time: "2 hours ago", color: "#10b981" },
    { icon: "🚌", text: "Bus MU-01 is now on the Amberkhana route",          time: "Yesterday",   color: "#3b82f6" },
  ];

  return (
    <div style={dh.page}>

      {/* ── Welcome banner ── */}
      <div style={dh.welcomeBanner}>
        <div style={dh.bannerLeft}>
          <div style={dh.bannerEyebrow}>
            <span style={dh.liveDot} />
            Tilagor → MU Campus · Route MU-02
          </div>
          <div style={dh.bannerGreeting}>👋 {greeting()}, {firstName}!</div>
          <div style={dh.bannerSub}>Your campus transport hub — track, ride and arrive on time.</div>
          <button
            style={dh.bannerCta}
            onClick={() => onNavigate("tracking")}
          >
            📍 Track My Bus
          </button>
        </div>

        <div style={dh.bannerRight}>
          {/* Next bus info card */}
          <div style={dh.nextCard}>
            <div style={dh.nextCardLabel}>Next Departure</div>
            <div style={dh.nextCardTime}>07:45</div>
            <div style={dh.nextCardRoute}>Tilagor Route · MU-02</div>
            <div style={dh.nextCardEta}>⏱ In approximately 12 minutes</div>
          </div>
          {/* Route progress */}
          <div style={dh.routeCard}>
            <div style={dh.routeCardLabel}>Route Progress Today</div>
            <div style={dh.progressBar}>
              <div style={{ ...dh.progressFill, width: "57%" }} />
            </div>
            <div style={dh.routeCardSub}>Stop 4 of 7 — 57% complete</div>
          </div>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div style={dh.sectionHead}>
        <span style={dh.sectionTitle}>Today's Overview</span>
      </div>

      <div style={dh.statsGrid}>
        {STATS.map((st, i) => (
          <div
            key={i}
            style={{
              ...dh.statCard,
              borderTop: `3px solid ${st.color}`,
              background: "#fff",
            }}
          >
            <div style={{ ...dh.statIconBox, background: st.bg, border: `1px solid ${st.border}` }}>
              <span style={{ fontSize: 20 }}>{st.icon}</span>
            </div>
            <div style={dh.statValue}>{st.value}</div>
            <div style={dh.statLabel}>{st.label}</div>
            <div style={dh.statSub}>{st.sub}</div>
          </div>
        ))}
      </div>

      {/* ── Quick Access ── */}
      <div style={dh.sectionHead}>
        <span style={dh.sectionTitle}>Quick Access</span>
        <span style={dh.sectionHint}>Tap any card to open</span>
      </div>

      <div style={dh.shortcutGrid}>
        {SHORTCUTS.map(sc => (
          <button
            key={sc.id}
            style={dh.scCard}
            className="sc-card"
            onClick={() => onNavigate(sc.id)}
          >
            <div style={dh.scHeader}>
              <div style={dh.scIconBox}>{sc.icon}</div>
              <span style={{ ...dh.scBadge, background: sc.bBg, color: sc.bColor }}>
                {sc.badge}
              </span>
            </div>
            <div style={dh.scTitle}>{sc.title}</div>
            <div style={dh.scDesc}>{sc.desc}</div>
            <div style={dh.scLink}>Open →</div>
          </button>
        ))}
      </div>

      {/* ── Bottom two-column section ── */}
      <div style={dh.bottomGrid}>

        {/* Recent activity */}
        <div style={dh.card}>
          <div style={dh.cardHead}>
            <span style={dh.cardTitle}>Recent Activity</span>
            <span style={dh.cardHint}>Last 24 hours</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {ACTIVITY.map((a, i) => (
              <div key={i} style={dh.actRow}>
                <div style={{ ...dh.actDot, background: a.color }} />
                <span style={dh.actIcon}>{a.icon}</span>
                <span style={dh.actText}>{a.text}</span>
                <span style={dh.actTime}>{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick stats panel */}
        <div style={dh.card}>
          <div style={dh.cardHead}>
            <span style={dh.cardTitle}>My Transport Card</span>
          </div>
          <div style={dh.transportCard}>
            <div style={dh.tcRow}>
              <span style={dh.tcLabel}>Student Name</span>
              <span style={dh.tcValue}>{user.name}</span>
            </div>
            <div style={dh.tcRow}>
              <span style={dh.tcLabel}>Student ID</span>
              <span style={dh.tcValue}>#{user.studentId}</span>
            </div>
            <div style={dh.tcRow}>
              <span style={dh.tcLabel}>Assigned Route</span>
              <span style={{ ...dh.tcValue, color: "#2563eb", fontWeight: 700 }}>Tilagor · MU-02</span>
            </div>
            <div style={dh.tcRow}>
              <span style={dh.tcLabel}>Card Status</span>
              <span style={dh.tcActive}>● Active</span>
            </div>
            <div style={dh.tcRow}>
              <span style={dh.tcLabel}>Trips This Month</span>
              <span style={dh.tcValue}>23 trips</span>
            </div>
            <div style={dh.tcRow}>
              <span style={dh.tcLabel}>On-Time Rate</span>
              <span style={{ ...dh.tcValue, color: "#059669" }}>96%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   COMING SOON
═══════════════════════════════════════════════════════════ */
function ComingSoon({ icon, title }) {
  return (
    <div style={cs.wrap}>
      <div style={cs.icon}>{icon}</div>
      <div style={cs.title}>{title}</div>
      <div style={cs.sub}>This section is coming soon — stay tuned!</div>
    </div>
  );
}

const cs = {
  wrap:  { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "60%", gap: 12, color: "#94a3b8" },
  icon:  { fontSize: 56 },
  title: { fontSize: 20, fontWeight: 700, color: "#0f172a" },
  sub:   { fontSize: 14, color: "#94a3b8" },
};

/* ═══════════════════════════════════════════════════════════
   LAYOUT STYLES
═══════════════════════════════════════════════════════════ */
const layout = {
  root: {
    display: "flex",
    height: "100vh",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    background: "#f1f5f9",
    overflow: "hidden",
  },
  sidebar: {
    width: 248,
    flexShrink: 0,
    background: "#0c1a3a",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    borderRight: "1px solid rgba(255,255,255,0.05)",
    zIndex: 200,
    transition: "transform 0.25s ease",
  },
  /* On mobile, sidebar slides in from left */
  sidebarVisible: {
    position: "fixed",
    transform: "translateX(0)",
  },
  backdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    zIndex: 199,
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    minWidth: 0,
  },
  content: {
    flex: 1,
    overflowY: "auto",
    padding: "24px",
    height: 0,
  },
};

/* ═══════════════════════════════════════════════════════════
   SIDEBAR STYLES
═══════════════════════════════════════════════════════════ */
const sb = {
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "20px 16px 16px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  brandIcon: {
    width: 38, height: 38,
    background: "rgba(37,99,235,0.25)",
    border: "1px solid rgba(96,165,250,0.3)",
    borderRadius: 10,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 20, flexShrink: 0,
  },
  brandName: { color: "#f8fafc", fontSize: 15, fontWeight: 800 },
  brandSub:  { color: "#4a6fa5", fontSize: 10, marginTop: 1 },

  userCard: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "12px 16px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    background: "rgba(255,255,255,0.03)",
  },
  avatar: {
    width: 40, height: 40,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
    border: "2px solid rgba(96,165,250,0.35)",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#fff", fontSize: 14, fontWeight: 700, flexShrink: 0,
  },
  userName: {
    color: "#e2e8f0", fontSize: 12, fontWeight: 600,
    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
    maxWidth: 140,
  },
  rolePill: {
    background: "rgba(37,99,235,0.2)",
    border: "1px solid rgba(96,165,250,0.2)",
    color: "#93c5fd",
    fontSize: 9, fontWeight: 700,
    padding: "2px 8px", borderRadius: 20,
    textTransform: "uppercase", letterSpacing: 0.5,
  },
  userId: { color: "#4a6fa5", fontSize: 10 },

  nav:          { flex: 1, overflowY: "auto", padding: "10px 10px" },
  sectionLabel: {
    fontSize: 9, fontWeight: 700, color: "#2d5091",
    textTransform: "uppercase", letterSpacing: 1.4,
    padding: "10px 8px 4px",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: 9,
    width: "100%",
    padding: "9px 8px",
    background: "transparent",
    border: "none",
    borderRadius: 8,
    color: "#617fad",
    fontSize: 12.5,
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.14s",
    position: "relative",
    marginBottom: 2,
    textAlign: "left",
  },
  navItemOn: {
    background: "rgba(37,99,235,0.15)",
    color: "#93c5fd",
    fontWeight: 600,
  },
  navIcon:    { fontSize: 15, width: 20, textAlign: "center", flexShrink: 0 },
  badge:      { background: "#ef4444", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 10, flexShrink: 0 },
  activePill: {
    position: "absolute", right: 0, top: "18%", bottom: "18%",
    width: 3, borderRadius: "3px 0 0 3px", background: "#3b82f6",
  },

  footer:    { padding: "8px 10px 16px" },
  divider:   { height: 1, background: "rgba(255,255,255,0.05)", marginBottom: 10 },
  logoutBtn: {
    display: "flex", alignItems: "center", gap: 8,
    width: "100%", padding: "9px 8px",
    background: "transparent", border: "none",
    color: "#617fad", fontSize: 12.5, fontWeight: 500,
    cursor: "pointer", borderRadius: 8, transition: "color 0.15s",
  },
};

/* ═══════════════════════════════════════════════════════════
   TOPBAR STYLES
═══════════════════════════════════════════════════════════ */
const topbar = {
  wrap: {
    background: "#fff",
    height: 60,
    padding: "0 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #e2e8f0",
    flexShrink: 0,
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    gap: 12,
  },
  title: { fontSize: 15, fontWeight: 700, color: "#0f172a" },
  date:  { fontSize: 11, color: "#94a3b8", marginTop: 1 },
  right: { display: "flex", alignItems: "center", gap: 10, flexShrink: 0 },

  clock: {
    fontSize: 12, fontWeight: 700, color: "#1e293b",
    background: "#f8fafc", border: "1px solid #e2e8f0",
    padding: "5px 12px", borderRadius: 8,
    fontVariantNumeric: "tabular-nums",
    whiteSpace: "nowrap",
  },
  statusPill: {
    display: "flex", alignItems: "center", gap: 5,
    background: "#f0fdf4", border: "1px solid #bbf7d0",
    padding: "5px 12px", borderRadius: 20,
  },
  statusDot:  { width: 6, height: 6, borderRadius: "50%", background: "#22c55e", flexShrink: 0 },
  statusText: { fontSize: 11, color: "#15803d", fontWeight: 600, whiteSpace: "nowrap" },

  bell: {
    position: "relative", width: 36, height: 36,
    background: "#f8fafc", border: "1px solid #e2e8f0",
    borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 16, cursor: "pointer", flexShrink: 0,
  },
  bellDot: {
    position: "absolute", top: 7, right: 7,
    width: 7, height: 7, borderRadius: "50%",
    background: "#ef4444", border: "1.5px solid #fff",
  },

  ava: {
    width: 34, height: 34, borderRadius: "50%",
    background: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
    border: "2px solid rgba(59,130,246,0.35)",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#fff", fontSize: 12, fontWeight: 700, flexShrink: 0,
  },

  /* Hamburger — shown on mobile via CSS */
  ham: {
    display: "none", // shown via CSS media query
    flexDirection: "column", gap: 4,
    width: 36, height: 36,
    background: "#f8fafc", border: "1px solid #e2e8f0",
    borderRadius: 8, cursor: "pointer", padding: "0 9px",
    alignItems: "center", justifyContent: "center",
    flexShrink: 0,
  },
  hamLine: { display: "block", height: 2, width: "100%", background: "#334155", borderRadius: 2 },
};

/* ═══════════════════════════════════════════════════════════
   DASHBOARD HOME STYLES
═══════════════════════════════════════════════════════════ */
const dh = {
  page: { display: "flex", flexDirection: "column", gap: 20 },

  /* Welcome banner */
  welcomeBanner: {
    background: "linear-gradient(135deg, #0f2d6e 0%, #1a4ab3 100%)",
    borderRadius: 16,
    padding: "28px 28px 24px",
    display: "flex",
    gap: 24,
    alignItems: "flex-start",
    boxShadow: "0 4px 24px rgba(15,45,110,0.25)",
    flexWrap: "wrap",
  },
  bannerLeft: { flex: 1, minWidth: 200 },
  bannerEyebrow: {
    display: "inline-flex", alignItems: "center", gap: 7,
    background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)",
    color: "#93c5fd", fontSize: 11, fontWeight: 600,
    padding: "4px 12px", borderRadius: 20, marginBottom: 12,
  },
  liveDot: {
    width: 6, height: 6, borderRadius: "50%", background: "#4ade80",
    display: "inline-block", flexShrink: 0,
  },
  bannerGreeting: { color: "#fff", fontSize: 24, fontWeight: 800, marginBottom: 6, lineHeight: 1.2 },
  bannerSub:      { color: "rgba(255,255,255,0.65)", fontSize: 13, marginBottom: 20, lineHeight: 1.6 },
  bannerCta: {
    background: "#fff", color: "#0f2d6e",
    border: "none", borderRadius: 10,
    padding: "10px 22px", fontSize: 13, fontWeight: 700,
    cursor: "pointer", boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
    transition: "opacity 0.15s",
  },

  bannerRight: { display: "flex", gap: 12, flexWrap: "wrap" },

  nextCard: {
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.18)",
    backdropFilter: "blur(8px)",
    borderRadius: 12, padding: "14px 20px", minWidth: 160,
  },
  nextCardLabel:{ color: "rgba(255,255,255,0.6)", fontSize: 10, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 },
  nextCardTime: { color: "#fef08a", fontSize: 30, fontWeight: 900, lineHeight: 1, marginBottom: 4 },
  nextCardRoute:{ color: "rgba(255,255,255,0.75)", fontSize: 11, marginBottom: 4 },
  nextCardEta:  { color: "#4ade80", fontSize: 11, fontWeight: 600 },

  routeCard: {
    background: "rgba(255,255,255,0.10)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 12, padding: "14px 20px", minWidth: 160,
    display: "flex", flexDirection: "column", gap: 10,
  },
  routeCardLabel: { color: "rgba(255,255,255,0.6)", fontSize: 10, textTransform: "uppercase", letterSpacing: 1 },
  progressBar: { height: 8, background: "rgba(255,255,255,0.15)", borderRadius: 4, overflow: "hidden" },
  progressFill: { height: "100%", background: "linear-gradient(90deg,#4ade80,#22d3ee)", borderRadius: 4 },
  routeCardSub: { color: "rgba(255,255,255,0.6)", fontSize: 11 },

  /* Section headings */
  sectionHead: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
  },
  sectionTitle: { fontSize: 14, fontWeight: 700, color: "#0f172a" },
  sectionHint:  { fontSize: 11, color: "#94a3b8" },

  /* Stats */
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 14,
  },
  statCard: {
    borderRadius: 14, padding: "16px",
    border: "1px solid #e8edf4",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
    display: "flex", flexDirection: "column", gap: 4,
  },
  statIconBox: {
    width: 42, height: 42, borderRadius: 10,
    display: "flex", alignItems: "center", justifyContent: "center",
    marginBottom: 8, flexShrink: 0,
  },
  statValue: { fontSize: 18, fontWeight: 800, color: "#0f172a" },
  statLabel: { fontSize: 12, fontWeight: 600, color: "#475569" },
  statSub:   { fontSize: 11, color: "#94a3b8" },

  /* Shortcuts */
  shortcutGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: 12,
  },
  scCard: {
    background: "#fff",
    borderRadius: 14,
    padding: "16px 14px",
    border: "1px solid #e8edf4",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
    cursor: "pointer", textAlign: "left",
    transition: "transform 0.15s, box-shadow 0.15s, border-color 0.15s",
  },
  scHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 },
  scIconBox:{ width: 38, height: 38, background: "#f0f4f9", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 },
  scBadge:  { fontSize: 9, padding: "3px 8px", borderRadius: 10, fontWeight: 700 },
  scTitle:  { fontSize: 12, fontWeight: 700, color: "#0f172a", marginBottom: 4 },
  scDesc:   { fontSize: 10.5, color: "#64748b", lineHeight: 1.5, marginBottom: 10 },
  scLink:   { fontSize: 11, color: "#2563eb", fontWeight: 700 },

  /* Bottom grid */
  bottomGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
    paddingBottom: 8,
  },

  /* Generic card */
  card: {
    background: "#fff",
    borderRadius: 14,
    padding: "18px 20px",
    border: "1px solid #e8edf4",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
  },
  cardHead: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: { fontSize: 13, fontWeight: 700, color: "#0f172a" },
  cardHint:  { fontSize: 10, color: "#94a3b8" },

  /* Activity */
  actRow: {
    display: "flex", alignItems: "center", gap: 10,
    padding: "10px 12px",
    background: "#f8fafc",
    borderRadius: 10, border: "1px solid #f1f5f9",
  },
  actDot:  { width: 8, height: 8, borderRadius: "50%", flexShrink: 0 },
  actIcon: { fontSize: 16, flexShrink: 0 },
  actText: { flex: 1, fontSize: 12, color: "#334155", lineHeight: 1.4, minWidth: 0 },
  actTime: { fontSize: 10, color: "#94a3b8", whiteSpace: "nowrap", flexShrink: 0 },

  /* Transport card */
  transportCard: { display: "flex", flexDirection: "column", gap: 0 },
  tcRow: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "10px 0", borderBottom: "1px solid #f1f5f9",
  },
  tcLabel:  { fontSize: 12, color: "#64748b" },
  tcValue:  { fontSize: 12, fontWeight: 600, color: "#0f172a" },
  tcActive: { fontSize: 11, fontWeight: 700, color: "#059669", background: "#dcfce7", padding: "2px 10px", borderRadius: 20 },
};

/* ═══════════════════════════════════════════════════════════
   GLOBAL CSS
═══════════════════════════════════════════════════════════ */
const GLOBAL_CSS = `
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  button { font-family: inherit; }

  /* Scrollbar — sidebar */
  aside::-webkit-scrollbar { width: 3px; }
  aside::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }

  /* Scrollbar — content */
  main::-webkit-scrollbar { width: 5px; }
  main::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 5px; }

  /* Sidebar nav hover */
  button:hover[style*="617fad"] { background: rgba(37,99,235,0.08) !important; color: #93c5fd !important; }

  /* Logout hover */
  button:hover[style*="logoutBtn"] { color: #ef4444 !important; }

  /* Shortcut card hover */
  .sc-card:hover {
    transform: translateY(-3px) !important;
    box-shadow: 0 8px 24px rgba(37,99,235,0.12) !important;
    border-color: #93c5fd !important;
  }

  /* Banner CTA hover */
  button[style*="bannerCta"]:hover { opacity: 0.9; }

  /* ─── RESPONSIVE ─── */

  /* Desktop ≥1280px — sidebar always visible */
  @media (min-width: 1280px) {
    aside { position: relative !important; transform: none !important; }
  }

  /* Tablet 768–1279px — sidebar hidden by default, slide in on toggle */
  @media (max-width: 1279px) {
    aside { position: fixed !important; transform: translateX(-100%) !important; }
    aside[style*="sidebarVisible"],
    aside[style*="translateX(0)"] { transform: translateX(0) !important; }

    /* Hamburger visible */
    button[style*="display: \"none\""] { display: flex !important; }

    /* Stats 2 col */
    div[style*="repeat(4, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; }

    /* Shortcuts 3 col */
    div[style*="repeat(5, 1fr)"] { grid-template-columns: repeat(3, 1fr) !important; }

    /* Status text hide on tablet */
    span[style*="statusText"] { display: none !important; }
  }

  /* Mobile ≤767px */
  @media (max-width: 767px) {
    /* Shortcuts 2 col */
    div[style*="repeat(5, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; }

    /* Bottom grid stacked */
    div[style*="1fr 1fr"] { grid-template-columns: 1fr !important; }

    /* Banner right hidden on very small */
    div[style*="bannerRight"] { display: none !important; }

    /* Content padding tight */
    main[style*="padding: 24px"] { padding: 14px !important; }

    /* Clock hide */
    div[style*="tabular-nums"] { display: none !important; }

    /* Stats 2 col */
    div[style*="repeat(4, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; }
  }

  @media (max-width: 480px) {
    div[style*="repeat(3, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; }
    div[style*="repeat(2, 1fr)"][style*="statsGrid"] { grid-template-columns: 1fr 1fr !important; }
  }
`;
