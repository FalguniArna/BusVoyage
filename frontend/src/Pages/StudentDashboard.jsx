import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BusTracking from "./BusTracking";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) { navigate("/login"); return; }
    const parsed = JSON.parse(savedUser);
    if (parsed.role !== "student") { navigate("/login"); return; }
    setUser(parsed);
  }, []);

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const getGreeting = () => {
    const h = time.getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  const formatTime = (d) =>
    d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  const formatDate = (d) =>
    d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  if (!user) return null;

  const navItems = [
    { id: "dashboard", icon: "⊞", label: "Dashboard", section: "Overview" },
    { id: "tracking", icon: "◎", label: "Bus Tracking", section: "Features" },
    { id: "routes", icon: "≡", label: "Routes & Schedule", section: "Features" },
    { id: "announcements", icon: "📢", label: "Announcements", badge: 2, section: "Features" },
    { id: "complaints", icon: "🧾", label: "Complaints", section: "Features" },
    { id: "lostfound", icon: "🎒", label: "Lost & Found", section: "Features" },
    { id: "profile", icon: "◻", label: "My Profile", section: "Account" },
  ];

  const cards = [
    {
      id: "tracking", icon: "🗺️", iconBg: "#eff6ff",
      title: "Bus Tracking",
      desc: "Live location + crowd status in one place",
      chip: "Live", chipBg: "#dcfce7", chipColor: "#166534",
      link: "Track now →"
    },
    {
      id: "routes", icon: "📅", iconBg: "#fefce8",
      title: "Routes & Schedule",
      desc: "Full timetable and all stop details",
      chip: "3 Routes", chipBg: "#f1f5f9", chipColor: "#475569",
      link: "View →"
    },
    {
      id: "announcements", icon: "📢", iconBg: "#fff7ed",
      title: "Announcements",
      desc: "Important notices from transport office",
      chip: "2 New", chipBg: "#fef3c7", chipColor: "#92400e",
      link: "Read →"
    },
    {
      id: "complaints", icon: "🧾", iconBg: "#fff1f2",
      title: "Complaints",
      desc: "Had a bad experience? Tell us",
      chip: "Report", chipBg: "#f1f5f9", chipColor: "#475569",
      link: "Submit →"
    },
    {
      id: "lostfound", icon: "🎒", iconBg: "#f5f3ff",
      title: "Lost & Found",
      desc: "Left something on the bus?",
      chip: "Search", chipBg: "#f1f5f9", chipColor: "#475569",
      link: "Search →"
    },
  ];

  // Get initials from name
  const initials = user.name
    ? user.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
    : "ST";

  return (
    <div style={styles.shell}>

      {/* ── SIDEBAR ── */}
      <div style={styles.sidebar}>

        {/* Brand */}
        <div style={styles.sbBrand}>
          <div style={styles.sbLogo}>
            <div style={styles.sbLogoIcon}>🚌</div>
            <div>
              <div style={styles.sbLogoText}>BusVoyage</div>
              <div style={styles.sbLogoSub}>Metropolitan University</div>
            </div>
          </div>
        </div>

        {/* User */}
        <div style={styles.sbUser}>
          <div style={styles.sbAvatar}>{initials}</div>
          <div>
            <div style={styles.sbName}>{user.name}</div>
            <div style={styles.sbId}>ID: {user.studentId}</div>
          </div>
        </div>

        {/* Nav */}
        <div style={styles.sbNav}>
          {["Overview", "Features", "Account"].map(section => (
            <div key={section}>
              <div style={styles.sbSection}>{section}</div>
              {navItems.filter(i => i.section === section).map(item => (
                <div
                  key={item.id}
                  style={{
                    ...styles.sbItem,
                    ...(activeMenu === item.id ? styles.sbItemActive : {})
                  }}
                  onClick={() => setActiveMenu(item.id)}
                >
                  <span style={styles.sbIcon}>{item.icon}</span>
                  {item.label}
                  {item.badge && (
                    <span style={styles.sbBadge}>{item.badge}</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Logout */}
        <div style={styles.sbBottom}>
          <div style={styles.sbLogout} onClick={handleLogout}>
            ↪ &nbsp;Logout
          </div>
        </div>
      </div>

      {/* ── MAIN ── */}
      <div style={styles.main}>

        {/* Top Bar */}
        <div style={styles.topbar}>
          <div style={styles.topbarTitle}>
            👋 {getGreeting()}, {user.name.split(" ")[0]}!
          </div>
          <div style={styles.topbarRight}>
            <div style={styles.topbarTime}>{formatTime(time)}</div>
            <div style={styles.topbarDate}>{formatDate(time)}</div>
            <div style={styles.notifBtn}>
              🔔
              <div style={styles.notifDot} />
            </div>
            <div style={styles.statusPill}>
              <div style={styles.statusDot} />
              <span style={styles.statusTxt}>All buses operational</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={styles.content}>

          {/* Welcome Banner with bus animation */}
          <div style={styles.welcome}>
            {/* Sky layer */}
            <div style={styles.sky}>
              <div style={styles.sun} />
              <div style={styles.cloud1} />
              <div style={styles.cloud2} />
            </div>

            {/* Welcome text overlay */}
            <div style={styles.welcomeOverlay}>
              <div style={styles.welcomeLeft}>
                <div style={styles.welcomeGreeting}>
                  Ready to ride today? 🚀
                </div>
                <div style={styles.welcomeMsg}>
                  Tilagor Route — grab your bag, it's almost here!
                </div>
              </div>
              <div style={styles.welcomeTimer}>
                <div style={styles.timerLabel}>Next departure</div>
                <div style={styles.timerVal}>07:45</div>
                <div style={styles.timerRoute}>Tilagor Route</div>
              </div>
            </div>

            {/* Road + bus animation */}
            <div style={styles.road}>
              <div style={styles.roadLine} />
              {/* Metro bus */}
              <div style={styles.metroBus}>🚌</div>
              {/* BRTC Double decker */}
              <div style={styles.brtcBus}>🚎</div>
            </div>
          </div>

          {/* Stat Cards */}
          <div style={styles.stats}>
            {[
              { icon: "🚌", label: "Active Buses", val: "3 Running", sub: "● On schedule", subColor: "#22c55e" },
              { icon: "👥", label: "Crowd Status", val: "Seats Available", sub: "● Comfortable ride", subColor: "#22c55e" },
              { icon: "📢", label: "Notices", val: "2 Unread", sub: "● Tap to read", subColor: "#f59e0b" },
            ].map((s, i) => (
              <div key={i} style={styles.stat}>
                <div style={styles.statTop}>
                  <span style={{ fontSize: 20 }}>{s.icon}</span>
                  <span style={styles.statLabel}>{s.label}</span>
                </div>
                <div style={styles.statVal}>{s.val}</div>
                <div style={{ ...styles.statSub, color: s.subColor }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Section Title */}
          <div style={styles.sectionTitle}>Quick Access</div>

          {/* Feature Cards */}
          <div style={styles.cards}>
            {cards.map((card, i) => (
              <div
                key={card.id}
                style={{
                  ...styles.card,
                  animationDelay: `${i * 0.3}s`
                }}
                onClick={() => setActiveMenu(card.id)}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "#93c5fd";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(59,130,246,0.12)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={styles.cardHead}>
                  <div style={{ ...styles.cardIcon, background: card.iconBg }}>
                    {card.icon}
                  </div>
                  <div style={{
                    ...styles.cardChip,
                    background: card.chipBg,
                    color: card.chipColor
                  }}>
                    {card.chip}
                  </div>
                </div>
                <div style={styles.cardTitle}>{card.title}</div>
                <div style={styles.cardDesc}>{card.desc}</div>
                <div style={styles.cardLink}>{card.link}</div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Animations injected via style tag */}
      <style>{`
        @keyframes moveBus1 {
          0%   { left: -120px; }
          100% { left: calc(100% + 20px); }
        }
        @keyframes moveBus2 {
          0%   { left: -120px; }
          100% { left: calc(100% + 20px); }
        }
        @keyframes cloudDrift {
          0%   { transform: translateX(0); }
          100% { transform: translateX(200px); }
        }
        @keyframes cloudDrift2 {
          0%   { transform: translateX(0); }
          100% { transform: translateX(160px); }
        }
        @keyframes floatCard {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-4px); }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
        .metro-bus-anim {
          animation: moveBus1 8s linear infinite;
        }
        .brtc-bus-anim {
          animation: moveBus2 10s 9s linear infinite;
        }
        .cloud-anim-1 {
          animation: cloudDrift 30s linear infinite;
        }
        .cloud-anim-2 {
          animation: cloudDrift2 22s 5s linear infinite;
        }
        .card-float {
          animation: floatCard 4s ease-in-out infinite;
        }
        .pulse-dot {
          animation: pulseDot 1.5s ease-in-out infinite;
        }
      `}</style>

    </div>
  );
}

const styles = {
  shell: {
    display: "flex",
    height: "100vh",
    fontFamily: "'Segoe UI', Arial, sans-serif",
    background: "#f8fafc",
    overflow: "hidden"
  },

  // ── SIDEBAR ──
  sidebar: {
    width: "230px",
    background: "#0A1628",
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    height: "100vh"
  },
  sbBrand: {
    padding: "18px 20px 14px",
    borderBottom: "0.5px solid rgba(255,255,255,0.07)"
  },
  sbLogo: { display: "flex", alignItems: "center", gap: "10px" },
  sbLogoIcon: {
    width: "34px", height: "34px",
    background: "#1e3a5f",
    borderRadius: "8px",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "18px"
  },
  sbLogoText: { color: "#fff", fontSize: "16px", fontWeight: 700 },
  sbLogoSub: { color: "#334155", fontSize: "10px", marginTop: "1px" },
  sbUser: {
    padding: "12px 20px",
    borderBottom: "0.5px solid rgba(255,255,255,0.07)",
    display: "flex", alignItems: "center", gap: "10px"
  },
  sbAvatar: {
    width: "38px", height: "38px",
    borderRadius: "50%",
    background: "#1e3a5f",
    border: "2px solid #3b82f6",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#60a5fa", fontSize: "13px", fontWeight: 700,
    flexShrink: 0
  },
  sbName: { color: "#e2e8f0", fontSize: "13px", fontWeight: 600 },
  sbId: { color: "#475569", fontSize: "11px", marginTop: "2px" },
  sbNav: { padding: "8px 0", flex: 1, overflowY: "auto" },
  sbSection: {
    color: "#1e3a5f",
    fontSize: "10px", fontWeight: 700,
    letterSpacing: "1px",
    textTransform: "uppercase",
    padding: "10px 20px 4px"
  },
  sbItem: {
    display: "flex", alignItems: "center", gap: "10px",
    padding: "9px 20px",
    color: "#475569", fontSize: "13px",
    cursor: "pointer",
    borderRight: "2px solid transparent",
    transition: "all 0.2s"
  },
  sbItemActive: {
    background: "rgba(59,130,246,0.1)",
    color: "#93c5fd",
    borderRight: "2px solid #3b82f6"
  },
  sbIcon: { fontSize: "14px", width: "18px", textAlign: "center" },
  sbBadge: {
    marginLeft: "auto",
    background: "#ef4444", color: "#fff",
    fontSize: "10px", padding: "1px 6px",
    borderRadius: "10px"
  },
  sbBottom: {
    padding: "14px 20px",
    borderTop: "0.5px solid rgba(255,255,255,0.07)"
  },
  sbLogout: {
    display: "flex", alignItems: "center", gap: "8px",
    color: "#475569", fontSize: "13px",
    cursor: "pointer"
  },

  // ── MAIN ──
  main: {
    flex: 1, display: "flex",
    flexDirection: "column",
    overflow: "hidden"
  },
  topbar: {
    background: "#fff",
    padding: "0 24px", height: "54px",
    display: "flex", alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "0.5px solid #e2e8f0",
    flexShrink: 0
  },
  topbarTitle: { fontSize: "14px", fontWeight: 600, color: "#0f172a" },
  topbarRight: { display: "flex", alignItems: "center", gap: "12px" },
  topbarTime: { fontSize: "14px", fontWeight: 700, color: "#0f172a" },
  topbarDate: { fontSize: "12px", color: "#94a3b8" },
  notifBtn: {
    width: "32px", height: "32px",
    borderRadius: "8px",
    background: "#f1f5f9",
    border: "0.5px solid #e2e8f0",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "14px", cursor: "pointer",
    position: "relative"
  },
  notifDot: {
    position: "absolute", top: "5px", right: "5px",
    width: "7px", height: "7px",
    background: "#ef4444", borderRadius: "50%",
    border: "1.5px solid #fff"
  },
  statusPill: {
    display: "flex", alignItems: "center", gap: "5px",
    background: "#f0fdf4",
    border: "0.5px solid #bbf7d0",
    padding: "4px 10px", borderRadius: "20px"
  },
  statusDot: {
    width: "6px", height: "6px",
    background: "#22c55e", borderRadius: "50%"
  },
  statusTxt: { fontSize: "11px", color: "#166534", fontWeight: 500 },

  // ── CONTENT ──
  content: {
    flex: 1, padding: "16px 24px",
    overflowY: "auto",
    display: "flex", flexDirection: "column", gap: "14px"
  },

  // Welcome banner
  welcome: {
    borderRadius: "12px",
    overflow: "hidden",
    position: "relative",
    height: "130px",
    flexShrink: 0
  },
  sky: {
    position: "absolute", top: 0, left: 0, right: 0,
    height: "80px",
    background: "#87CEEB"
  },
  sun: {
    position: "absolute", top: "10px", right: "80px",
    width: "28px", height: "28px",
    background: "#FFD700", borderRadius: "50%"
  },
  cloud1: {
    position: "absolute", top: "12px", left: "60px",
    width: "70px", height: "22px",
    background: "white", borderRadius: "20px",
    opacity: 0.9
  },
  cloud2: {
    position: "absolute", top: "20px", left: "220px",
    width: "50px", height: "16px",
    background: "white", borderRadius: "20px",
    opacity: 0.85
  },
  welcomeOverlay: {
    position: "absolute", top: 0, left: 0, right: 0,
    padding: "14px 20px",
    display: "flex", alignItems: "center",
    justifyContent: "space-between",
    height: "80px",
    background: "rgba(10,22,40,0.55)",
    zIndex: 2
  },
  welcomeLeft: {},
  welcomeGreeting: { color: "#fff", fontSize: "15px", fontWeight: 700 },
  welcomeMsg: { color: "#cbd5e1", fontSize: "11px", marginTop: "4px" },
  welcomeTimer: { textAlign: "right" },
  timerLabel: {
    color: "#94a3b8", fontSize: "10px",
    textTransform: "uppercase", letterSpacing: "0.5px"
  },
  timerVal: { color: "#60a5fa", fontSize: "22px", fontWeight: 700, marginTop: "2px" },
  timerRoute: { color: "#64748b", fontSize: "10px" },
  road: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    height: "52px",
    background: "#4a4a4a"
  },
  roadLine: {
    position: "absolute", top: "22px", left: 0, right: 0,
    height: "3px",
    background: "repeating-linear-gradient(90deg, #fff 0, #fff 28px, transparent 28px, transparent 52px)"
  },
  metroBus: {
    position: "absolute", bottom: "6px",
    fontSize: "28px",
    animation: "moveBus1 8s linear infinite"
  },
  brtcBus: {
    position: "absolute", bottom: "6px",
    fontSize: "28px",
    animation: "moveBus2 10s 9s linear infinite"
  },

  // Stats
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
    flexShrink: 0
  },
  stat: {
    background: "#fff",
    borderRadius: "10px",
    padding: "12px 14px",
    border: "0.5px solid #e2e8f0"
  },
  statTop: {
    display: "flex", alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "6px"
  },
  statLabel: {
    fontSize: "10px", color: "#94a3b8",
    fontWeight: 600, textTransform: "uppercase",
    letterSpacing: "0.5px"
  },
  statVal: { fontSize: "14px", fontWeight: 700, color: "#0f172a" },
  statSub: { fontSize: "11px", marginTop: "3px", fontWeight: 500 },

  sectionTitle: {
    fontSize: "13px", fontWeight: 700,
    color: "#0f172a"
  },

  // Feature cards
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "10px"
  },
  card: {
    background: "#fff",
    borderRadius: "10px",
    padding: "14px 12px",
    border: "0.5px solid #e2e8f0",
    cursor: "pointer",
    transition: "transform 0.2s, border-color 0.2s, box-shadow 0.2s"
  },
  cardHead: {
    display: "flex", alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "8px"
  },
  cardIcon: {
    width: "36px", height: "36px",
    borderRadius: "10px",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "18px"
  },
  cardChip: {
    fontSize: "10px", padding: "2px 7px",
    borderRadius: "10px", fontWeight: 600
  },
  cardTitle: { fontSize: "12px", fontWeight: 700, color: "#0f172a", marginBottom: "3px" },
  cardDesc: { fontSize: "10px", color: "#94a3b8", lineHeight: 1.4, marginBottom: "8px" },
  cardLink: { fontSize: "11px", color: "#3b82f6", fontWeight: 600 }
};