import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BusTracking    from "./BusTracking";
import RoutesSchedule from "./RoutesSchedule";
import Announcements  from "./Announcements";
import Complaints     from "./Complaints";
import LostFound      from "./LostFound";

export default function StudentDashboard() {
  const navigate = useNavigate();

  const [user,        setUser]        = useState(null);
  const [activeMenu,  setActiveMenu]  = useState("dashboard");
  const [time,        setTime]        = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(true);   // collapsible on mobile

  // ── Auth guard
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (!saved) { navigate("/login"); return; }
    const parsed = JSON.parse(saved);
    if (parsed.role !== "student") { navigate("/login"); return; }
    setUser(parsed);
  }, []);

  // ── Live clock
  useEffect(() => {
    const tick = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);

  // ── Close sidebar on small screens when a menu item is tapped
  const handleMenuSelect = (id) => {
    setActiveMenu(id);
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

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

  if (!user) return null;

  const initials = user.name
    ? user.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
    : "ST";

  // ── Navigation definition
  const NAV_GROUPS = [
    {
      label: "Overview",
      items: [
        { id: "dashboard", icon: "⊞", label: "Dashboard" },
      ],
    },
    {
      label: "Transport",
      items: [
        { id: "tracking",      icon: "📍", label: "Live Tracking",    badge: null },
        { id: "routes",        icon: "🗺",  label: "Routes & Schedule", badge: null },
        { id: "announcements", icon: "📣", label: "Announcements",    badge: 2    },
      ],
    },
    {
      label: "My Services",
      items: [
        { id: "complaints", icon: "💬", label: "Complaints"  },
        { id: "lostfound",  icon: "🎒", label: "Lost & Found" },
        { id: "profile",    icon: "👤", label: "My Profile"  },
      ],
    },
  ];

  const PAGE_TITLE = {
    dashboard:     `${greeting()}, ${user.name?.split(" ")[0] ?? "Student"}`,
    tracking:      "Live Bus Tracking",
    routes:        "Routes & Schedule",
    announcements: "Announcements",
    complaints:    "Complaints",
    lostfound:     "Lost & Found",
    profile:       "My Profile",
  };

  const ComingSoon = ({ title, icon }) => (
    <div style={cs.empty}>
      <div style={cs.emptyIcon}>{icon}</div>
      <div style={cs.emptyTitle}>{title}</div>
      <div style={cs.emptySub}>This section is coming soon — stay tuned!</div>
    </div>
  );

  const renderContent = () => {
    switch (activeMenu) {
      case "tracking":      return <BusTracking />;
      case "routes":        return <RoutesSchedule />;
      case "announcements": return <Announcements />;
      case "complaints":    return <Complaints />;
      case "lostfound":     return <LostFound />;
      case "profile":       return <ComingSoon title="My Profile" icon="👤" />;
      default:
        return (
          <DashboardHome
            user={user}
            time={time}
            greeting={greeting}
            fmtTime={fmtTime}
            setActiveMenu={handleMenuSelect}
          />
        );
    }
  };

  return (
    <div style={sh.root}>
      <style>{GLOBAL_CSS}</style>

      {/* ══════════ SIDEBAR ══════════ */}
      <aside style={{ ...sh.sidebar, ...(sidebarOpen ? {} : sh.sidebarHidden) }}>

        {/* Brand */}
        <div style={sh.sbTop}>
          <div style={sh.sbLogo}>
            <div style={sh.sbLogoIcon}>🚌</div>
            <div>
              <div style={sh.sbLogoName}>BusVoyage</div>
              <div style={sh.sbLogoSub}>Metropolitan University</div>
            </div>
          </div>
        </div>

        {/* User card */}
        <div style={sh.sbUser}>
          <div style={sh.sbAva}>{initials}</div>
          <div style={{ minWidth: 0 }}>
            <div style={sh.sbUserName}>{user.name}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3 }}>
              <span style={sh.sbRoleBadge}>Student</span>
              <span style={sh.sbUserId}>#{user.studentId}</span>
            </div>
          </div>
        </div>

        {/* Nav groups */}
        <nav style={sh.sbNav}>
          {NAV_GROUPS.map(group => (
            <div key={group.label} style={{ marginBottom: 6 }}>
              <div style={sh.sbGroupLabel}>{group.label}</div>
              {group.items.map(item => {
                const isActive = activeMenu === item.id;
                return (
                  <button
                    key={item.id}
                    style={{ ...sh.sbItem, ...(isActive ? sh.sbItemOn : {}) }}
                    onClick={() => handleMenuSelect(item.id)}
                  >
                    <span style={sh.sbItemIcon}>{item.icon}</span>
                    <span style={{ flex: 1, textAlign: "left" }}>{item.label}</span>
                    {item.badge && (
                      <span style={sh.sbBadge}>{item.badge}</span>
                    )}
                    {isActive && <span style={sh.sbActiveLine} />}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Sidebar footer */}
        <div style={sh.sbBottom}>
          <div style={sh.sbDivider} />
          <button style={sh.sbLogout} onClick={handleLogout}>
            <span>⎋</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile overlay backdrop */}
      {sidebarOpen && (
        <div
          style={sh.backdrop}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ══════════ MAIN ══════════ */}
      <div style={sh.main}>

        {/* Top bar */}
        <header style={sh.topbar}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Hamburger (always visible on mobile) */}
            <button
              style={sh.hamburger}
              onClick={() => setSidebarOpen(o => !o)}
              aria-label="Toggle sidebar"
            >
              <span style={sh.hamLine} />
              <span style={sh.hamLine} />
              <span style={sh.hamLine} />
            </button>
            <div>
              <div style={sh.tbTitle}>{PAGE_TITLE[activeMenu]}</div>
              <div style={sh.tbDate}>{fmtDate(time)}</div>
            </div>
          </div>

          <div style={sh.tbRight}>
            <div style={sh.tbClock}>🕐 {fmtTime(time)}</div>
            <div style={sh.tbStatus}>
              <span style={sh.tbStatusDot} />
              <span style={sh.tbStatusTxt}>All buses running</span>
            </div>
            <button style={sh.tbBell} aria-label="Notifications">
              🔔
              <span style={sh.tbBellDot} />
            </button>
            <div style={sh.tbAva}>{initials}</div>
          </div>
        </header>

        {/* Scrollable content area */}
        <main style={sh.content}>
          {renderContent()}
        </main>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes busRide   { from { left: -130px } to { left: calc(100% + 20px) } }
        @keyframes busRide2  { from { left: -130px } to { left: calc(100% + 20px) } }
        @keyframes cloudMove { 0% { transform: translateX(0) } 100% { transform: translateX(36px) } }
        @keyframes pulseGlow { 0%,100% { opacity:1 } 50% { opacity:.35 } }
        @keyframes fadeSlide { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:none } }
        @keyframes countUp   { from { opacity:0; transform:scale(.88) } to { opacity:1; transform:scale(1) } }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   DASHBOARD HOME
───────────────────────────────────────────────────────────── */
function DashboardHome({ user, time, greeting, fmtTime, setActiveMenu }) {

  const firstName = user.name?.split(" ")[0] ?? "Student";

  const STATS = [
    { icon: "🚌", label: "Active Buses",  value: "5 / 8",    note: "Fleet online",       accent: "#3b82f6", light: "#eff6ff" },
    { icon: "📍", label: "My Route",      value: "MU-02",     note: "Tilagor → Campus",   accent: "#10b981", light: "#ecfdf5" },
    { icon: "⏰", label: "Next Bus",      value: "07:45",     note: "≈ 12 min away",      accent: "#f59e0b", light: "#fffbeb" },
    { icon: "💺", label: "Crowd Status",  value: "Seats Free",note: "Low occupancy",      accent: "#8b5cf6", light: "#f5f3ff" },
  ];

  const SHORTCUTS = [
    { id: "tracking",      icon: "📍", title: "Live Tracking",    desc: "See where your bus is right now",  badge: "● Live",   badgeBg: "#dcfce7", badgeColor: "#166534" },
    { id: "routes",        icon: "🗺",  title: "Routes & Schedules", desc: "Full timetable for all 5 routes", badge: "3 routes", badgeBg: "#f1f5f9", badgeColor: "#475569" },
    { id: "announcements", icon: "📣", title: "Announcements",     desc: "Latest notices from transport",    badge: "2 new",    badgeBg: "#fef3c7", badgeColor: "#92400e" },
    { id: "complaints",    icon: "💬", title: "Submit Complaint",  desc: "Report an issue, track updates",   badge: "Open",     badgeBg: "#f1f5f9", badgeColor: "#475569" },
    { id: "lostfound",     icon: "🎒", title: "Lost & Found",      desc: "Report or search for lost items",  badge: "Search",   badgeBg: "#f1f5f9", badgeColor: "#475569" },
  ];

  const RECENT = [
    { icon: "📢", text: "Bus MU-03 delayed 15 min — road work near Bondor", time: "10 min ago",  color: "#f59e0b" },
    { icon: "✅", text: "Your complaint #C-041 has been resolved",           time: "2 hours ago", color: "#10b981" },
    { icon: "🚌", text: "Bus MU-01 is now on the Amberkhana route",          time: "Yesterday",   color: "#3b82f6" },
  ];

  return (
    <div style={dh.wrap}>

      {/* ── Welcome hero banner ── */}
      <div style={dh.banner}>
        {/* Sky scene */}
        <div style={dh.sky}>
          <div style={dh.sun} />
          <div style={{ ...dh.cloud, top: 10, left: 70,   width: 80,  animationDuration: "7s"  }} />
          <div style={{ ...dh.cloud, top: 20, left: 220,  width: 55,  animationDuration: "10s", animationDelay: "2s" }} />
          <div style={{ ...dh.cloud, top:  8, right: 140, width: 68,  animationDuration: "9s",  animationDelay: "1s" }} />
        </div>

        {/* Dark overlay + text content */}
        <div style={dh.bannerContent}>
          <div style={{ flex: 1 }}>
            <div style={dh.bannerTag}>
              <span style={dh.greenPulse} />
              Live · Tilagor → MU Campus
            </div>
            <div style={dh.bannerGreet}>👋 {greeting()}, {firstName}!</div>
            <div style={dh.bannerSub}>Your campus ride tracker — always on time.</div>
          </div>

          {/* Next bus card */}
          <div style={dh.nextBusCard}>
            <div style={dh.nbLabel}>Next departure</div>
            <div style={dh.nbTime}>07:45</div>
            <div style={dh.nbRoute}>Tilagor Route · MU-02</div>
            <div style={dh.nbCountdown}>⏱ In ~12 minutes</div>
          </div>
        </div>

        {/* Road with animated bus */}
        <div style={dh.road}>
          <div style={dh.roadLine} />
          <img
            src="/bus.png"
            alt="bus"
            style={dh.busImg}
            onError={e => { e.target.style.display = "none"; }}
          />
          <span style={dh.busEmoji}>🚎</span>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div style={dh.statsRow}>
        {STATS.map((st, i) => (
          <div
            key={i}
            style={{ ...dh.statCard, borderTop: `3px solid ${st.accent}`, animationDelay: `${i * 0.08}s` }}
            className="dash-stat"
          >
            <div style={{ ...dh.statIconBox, background: st.light }}>
              <span style={{ fontSize: 18 }}>{st.icon}</span>
            </div>
            <div style={dh.statValue}>{st.value}</div>
            <div style={dh.statLabel}>{st.label}</div>
            <div style={dh.statNote}>{st.note}</div>
          </div>
        ))}
      </div>

      {/* ── Quick access ── */}
      <div style={dh.sectionHeader}>
        <div style={dh.sectionTitle}>Quick Access</div>
        <div style={dh.sectionHint}>Tap to navigate</div>
      </div>

      <div style={dh.shortcutsGrid}>
        {SHORTCUTS.map((sc, i) => (
          <button
            key={sc.id}
            style={{ ...dh.scCard, animationDelay: `${i * 0.07}s` }}
            className="dash-card"
            onClick={() => setActiveMenu(sc.id)}
          >
            <div style={dh.scTop}>
              <div style={dh.scIcon}>{sc.icon}</div>
              <span style={{ ...dh.scBadge, background: sc.badgeBg, color: sc.badgeColor }}>
                {sc.badge}
              </span>
            </div>
            <div style={dh.scTitle}>{sc.title}</div>
            <div style={dh.scDesc}>{sc.desc}</div>
            <div style={dh.scArrow}>Go →</div>
          </button>
        ))}
      </div>

      {/* ── Recent activity ── */}
      <div style={dh.sectionHeader}>
        <div style={dh.sectionTitle}>Recent Activity</div>
        <div style={dh.sectionHint}>Last 24 hours</div>
      </div>

      <div style={dh.activityList}>
        {RECENT.map((item, i) => (
          <div key={i} style={dh.activityItem}>
            <div style={{ ...dh.activityDot, background: item.color }} />
            <span style={dh.activityIcon}>{item.icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={dh.activityText}>{item.text}</div>
            </div>
            <div style={dh.activityTime}>{item.time}</div>
          </div>
        ))}
      </div>

    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   STYLES — Shell
───────────────────────────────────────────────────────────── */
const sh = {
  root: {
    display: "flex",
    height: "100vh",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    background: "#f0f4f9",
    overflow: "hidden",
    position: "relative",
  },

  /* ── Sidebar ── */
  sidebar: {
    width: 240,
    background: "linear-gradient(180deg, #020e22 0%, #001540 100%)",
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    height: "100vh",
    transition: "transform 0.28s cubic-bezier(.4,0,.2,1)",
    zIndex: 100,
    borderRight: "1px solid rgba(255,255,255,0.06)",
  },
  sidebarHidden: {
    transform: "translateX(-100%)",
    position: "fixed",
  },

  backdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    zIndex: 99,
    display: "none",    // shown via media query in GLOBAL_CSS
  },

  sbTop: {
    padding: "20px 18px 16px",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
  },
  sbLogo: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  sbLogoIcon: {
    width: 36,
    height: 36,
    background: "rgba(59,130,246,0.2)",
    border: "1px solid rgba(59,130,246,0.35)",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    flexShrink: 0,
  },
  sbLogoName: { color: "#fff", fontSize: 15, fontWeight: 800, letterSpacing: "-0.01em" },
  sbLogoSub:  { color: "#3b6dbf", fontSize: 10, marginTop: 1 },

  sbUser: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "12px 18px",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
  },
  sbAva: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    background: "linear-gradient(135deg,#1d4ed8,#3b82f6)",
    border: "2px solid rgba(96,165,250,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: 13,
    fontWeight: 700,
    flexShrink: 0,
  },
  sbUserName: { color: "#e2e8f0", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  sbRoleBadge:{ background: "rgba(59,130,246,0.18)", color: "#60a5fa", fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 8, letterSpacing: "0.5px", textTransform: "uppercase" },
  sbUserId:   { color: "#3b6dbf", fontSize: 10 },

  sbNav: {
    flex: 1,
    overflowY: "auto",
    padding: "8px 10px",
  },
  sbGroupLabel: {
    fontSize: 9,
    fontWeight: 700,
    color: "#2a5298",
    textTransform: "uppercase",
    letterSpacing: "1.2px",
    padding: "10px 10px 5px",
  },
  sbItem: {
    display: "flex",
    alignItems: "center",
    gap: 9,
    width: "100%",
    padding: "9px 10px",
    background: "transparent",
    border: "none",
    borderRadius: 9,
    color: "#5a7fad",
    fontSize: 12,
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.15s",
    position: "relative",
    marginBottom: 1,
  },
  sbItemOn: {
    background: "rgba(59,130,246,0.14)",
    color: "#93c5fd",
    fontWeight: 600,
  },
  sbItemIcon: { fontSize: 14, width: 18, textAlign: "center", flexShrink: 0 },
  sbBadge: {
    background: "#ef4444",
    color: "#fff",
    fontSize: 9,
    fontWeight: 700,
    padding: "2px 6px",
    borderRadius: 8,
    flexShrink: 0,
  },
  sbActiveLine: {
    position: "absolute",
    right: 0,
    top: "20%",
    bottom: "20%",
    width: 3,
    background: "#3b82f6",
    borderRadius: "3px 0 0 3px",
  },

  sbBottom: { padding: "10px 10px 16px", marginTop: "auto" },
  sbDivider:{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 10 },
  sbLogout: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    width: "100%",
    background: "transparent",
    border: "none",
    color: "#5a7fad",
    fontSize: 12,
    fontWeight: 500,
    cursor: "pointer",
    padding: "8px 10px",
    borderRadius: 9,
    transition: "color 0.2s",
  },

  /* ── Hamburger ── */
  hamburger: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 4,
    width: 34,
    height: 34,
    background: "#f1f5f9",
    border: "0.5px solid #e2e8f0",
    borderRadius: 8,
    cursor: "pointer",
    padding: "0 8px",
    flexShrink: 0,
  },
  hamLine: {
    display: "block",
    height: 2,
    background: "#334155",
    borderRadius: 2,
    width: "100%",
  },

  /* ── Main ── */
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    minWidth: 0,
  },

  topbar: {
    background: "#fff",
    padding: "0 20px",
    height: 58,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #e2e8f0",
    flexShrink: 0,
    gap: 12,
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
  },
  tbTitle: { fontSize: 15, fontWeight: 700, color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  tbDate:  { fontSize: 11, color: "#94a3b8", marginTop: 1 },
  tbRight: { display: "flex", alignItems: "center", gap: 8, flexShrink: 0 },
  tbClock: { fontSize: 11, fontWeight: 700, color: "#0f172a", background: "#f8fafc", border: "0.5px solid #e2e8f0", padding: "5px 10px", borderRadius: 8, whiteSpace: "nowrap" },
  tbStatus:{ display: "flex", alignItems: "center", gap: 5, background: "#f0fdf4", border: "0.5px solid #bbf7d0", padding: "4px 10px", borderRadius: 20 },
  tbStatusDot: { width: 6, height: 6, background: "#22c55e", borderRadius: "50%", animation: "pulseGlow 2s infinite" },
  tbStatusTxt: { fontSize: 10, color: "#15803d", fontWeight: 600, whiteSpace: "nowrap" },
  tbBell: {
    position: "relative",
    width: 34,
    height: 34,
    background: "#f8fafc",
    border: "0.5px solid #e2e8f0",
    borderRadius: 9,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 15,
    cursor: "pointer",
    flexShrink: 0,
  },
  tbBellDot: { position: "absolute", top: 6, right: 6, width: 7, height: 7, background: "#ef4444", borderRadius: "50%", border: "1.5px solid #fff" },
  tbAva: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    background: "linear-gradient(135deg,#1d4ed8,#3b82f6)",
    border: "2px solid rgba(59,130,246,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: 11,
    fontWeight: 700,
    flexShrink: 0,
  },

  content: {
    flex: 1,
    overflowY: "auto",
    padding: "18px 20px",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    height: 0,
  },
};

/* ─────────────────────────────────────────────────────────────
   STYLES — Dashboard Home
───────────────────────────────────────────────────────────── */
const dh = {
  wrap: { display: "flex", flexDirection: "column", gap: 14, animation: "fadeSlide 0.45s ease both" },

  /* Banner */
  banner: {
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
    height: 158,
    flexShrink: 0,
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
  sky: {
    position: "absolute",
    top: 0, left: 0, right: 0,
    height: 102,
    background: "linear-gradient(180deg, #5baadc 0%, #a8d4f0 100%)",
    overflow: "hidden",
  },
  sun: {
    position: "absolute",
    top: 12, right: 90,
    width: 28, height: 28,
    borderRadius: "50%",
    background: "radial-gradient(circle, #ffe87a, #ffcd00)",
    boxShadow: "0 0 20px rgba(255,205,0,0.55)",
  },
  cloud: {
    position: "absolute",
    height: 18,
    background: "rgba(255,255,255,0.88)",
    borderRadius: 20,
    animation: "cloudMove 7s ease-in-out infinite alternate",
  },
  bannerContent: {
    position: "absolute",
    top: 0, left: 0, right: 0,
    height: 102,
    background: "rgba(6,18,40,0.52)",
    backdropFilter: "blur(2px)",
    padding: "14px 20px",
    display: "flex",
    alignItems: "center",
    gap: 16,
    zIndex: 2,
  },
  bannerTag: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.18)",
    color: "#fff",
    fontSize: 10,
    fontWeight: 600,
    padding: "3px 10px",
    borderRadius: 12,
    marginBottom: 6,
  },
  greenPulse: {
    width: 6, height: 6,
    borderRadius: "50%",
    background: "#4ade80",
    display: "inline-block",
    animation: "pulseGlow 1.8s infinite",
  },
  bannerGreet: { color: "#fff", fontSize: 17, fontWeight: 800, marginBottom: 3 },
  bannerSub:   { color: "rgba(255,255,255,0.72)", fontSize: 11 },

  nextBusCard: {
    background: "rgba(255,255,255,0.12)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: 12,
    padding: "10px 16px",
    textAlign: "center",
    flexShrink: 0,
  },
  nbLabel:    { color: "rgba(255,255,255,0.65)", fontSize: 9, textTransform: "uppercase", letterSpacing: 1 },
  nbTime:     { color: "#ffe566", fontSize: 26, fontWeight: 900, lineHeight: 1.1, margin: "4px 0 2px" },
  nbRoute:    { color: "rgba(255,255,255,0.72)", fontSize: 9, marginBottom: 3 },
  nbCountdown:{ color: "#4ade80", fontSize: 10, fontWeight: 700 },

  road: {
    position: "absolute",
    bottom: 0, left: 0, right: 0,
    height: 56,
    background: "#2d3748",
    overflow: "hidden",
    zIndex: 1,
  },
  roadLine: {
    position: "absolute",
    top: 25, left: 0, right: 0,
    height: 4,
    background: "repeating-linear-gradient(90deg, rgba(255,255,255,0.6) 0, rgba(255,255,255,0.6) 30px, transparent 30px, transparent 60px)",
  },
  busImg: {
    position: "absolute",
    bottom: 4,
    height: 42,
    zIndex: 2,
    animation: "busRide 10s linear infinite",
  },
  busEmoji: {
    position: "absolute",
    bottom: 8,
    fontSize: 24,
    zIndex: 1,
    animation: "busRide2 15s 8s linear infinite",
  },

  /* Stats */
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 10,
  },
  statCard: {
    background: "#fff",
    borderRadius: 13,
    padding: "14px 15px",
    border: "0.5px solid #e8edf4",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
    display: "flex",
    flexDirection: "column",
    gap: 3,
    animation: "countUp 0.5s ease both",
  },
  statIconBox: {
    width: 34, height: 34,
    borderRadius: 9,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
    flexShrink: 0,
  },
  statValue: { fontSize: 17, fontWeight: 800, color: "#0f172a" },
  statLabel: { fontSize: 11, fontWeight: 600, color: "#475569" },
  statNote:  { fontSize: 10, color: "#94a3b8" },

  /* Section headers */
  sectionHeader: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  sectionTitle:  { fontSize: 13, fontWeight: 700, color: "#0f172a" },
  sectionHint:   { fontSize: 10, color: "#94a3b8" },

  /* Shortcuts */
  shortcutsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: 10,
  },
  scCard: {
    background: "#fff",
    borderRadius: 13,
    padding: "14px 12px",
    border: "0.5px solid #e8edf4",
    cursor: "pointer",
    textAlign: "left",
    transition: "transform 0.18s, box-shadow 0.18s, border-color 0.18s",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
    animation: "fadeSlide 0.5s ease both",
  },
  scTop:   { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 },
  scIcon:  { width: 36, height: 36, background: "#f0f4f9", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 },
  scBadge: { fontSize: 9, padding: "2px 7px", borderRadius: 8, fontWeight: 700 },
  scTitle: { fontSize: 11, fontWeight: 700, color: "#0f172a", marginBottom: 3 },
  scDesc:  { fontSize: 10, color: "#94a3b8", lineHeight: 1.5, marginBottom: 8 },
  scArrow: { fontSize: 11, color: "#3b82f6", fontWeight: 700 },

  /* Activity feed */
  activityList: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    paddingBottom: 8,
  },
  activityItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: "#fff",
    borderRadius: 11,
    padding: "12px 14px",
    border: "0.5px solid #e8edf4",
    boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
  },
  activityDot:  { width: 8, height: 8, borderRadius: "50%", flexShrink: 0 },
  activityIcon: { fontSize: 16, flexShrink: 0 },
  activityText: { fontSize: 12, color: "#334155", lineHeight: 1.4 },
  activityTime: { fontSize: 10, color: "#94a3b8", flexShrink: 0, whiteSpace: "nowrap" },
};

/* ─────────────────────────────────────────────────────────────
   STYLES — ComingSoon
───────────────────────────────────────────────────────────── */
const cs = {
  empty:     { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "60%", gap: 10, opacity: 0.55, animation: "fadeSlide 0.4s ease both" },
  emptyIcon: { fontSize: 52 },
  emptyTitle:{ fontSize: 18, fontWeight: 700, color: "#0f172a" },
  emptySub:  { fontSize: 13, color: "#94a3b8" },
};

/* ─────────────────────────────────────────────────────────────
   GLOBAL CSS  — responsive breakpoints + hover utility
───────────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  /* Sidebar scroll-bar */
  aside::-webkit-scrollbar { width: 4px; }
  aside::-webkit-scrollbar-track { background: transparent; }
  aside::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }

  /* Content scroll-bar */
  main::-webkit-scrollbar { width: 5px; }
  main::-webkit-scrollbar-track { background: #f0f4f9; }
  main::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }

  /* Sidebar nav hover */
  button[style*="sbItem"]:hover,
  .sb-item:hover { background: rgba(59,130,246,0.08) !important; color: #93c5fd !important; }

  /* Dashboard cards hover */
  .dash-card:hover {
    transform: translateY(-3px) !important;
    box-shadow: 0 8px 24px rgba(59,130,246,0.12) !important;
    border-color: #93c5fd !important;
  }

  /* Logout hover */
  button[style*="sbLogout"]:hover { color: #ef4444 !important; }

  /* ── RESPONSIVE ── */

  /* Large desktop: sidebar always open, hamburger subtle */
  @media (min-width: 1024px) {
    /* Nothing special — default layout is full sidebar */
  }

  /* Tablet: sidebar overlaid, hamburger triggers it */
  @media (max-width: 1023px) {
    /* sidebar is fixed overlay when open */
    aside { position: fixed !important; height: 100vh !important; }
    /* backdrop visible */
    div[style*="backdrop"] { display: block !important; }

    /* topbar status text hidden to save space */
    .tb-status-txt { display: none !important; }

    /* stats 2 columns */
    .stats-row { grid-template-columns: repeat(2, 1fr) !important; }

    /* shortcuts 3 columns */
    .sc-grid { grid-template-columns: repeat(3, 1fr) !important; }
  }

  @media (max-width: 640px) {
    /* stats 2 columns */
    .stats-row  { grid-template-columns: repeat(2, 1fr) !important; }
    /* shortcuts 2 columns */
    .sc-grid    { grid-template-columns: repeat(2, 1fr) !important; }
    /* clock hidden on very small */
    .tb-clock   { display: none !important; }
    /* topbar padding tighter */
    header[style*="topbar"] { padding: 0 12px !important; }
    main[style*="content"]  { padding: 12px !important; }
  }

  @media (max-width: 400px) {
    .sc-grid { grid-template-columns: 1fr 1fr !important; }
  }
`;
