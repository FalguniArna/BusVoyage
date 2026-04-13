// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import BusTracking    from "./BusTracking";
// import RoutesSchedule from "./RoutesSchedule";
// import Announcements  from "./Announcements";
// import Complaints     from "./Complaints";
// import LostFound      from "./LostFound";

// export default function StudentDashboard() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [activeMenu, setActiveMenu] = useState("dashboard");
//   const [time, setTime] = useState(new Date());

//   useEffect(() => {
//     const savedUser = localStorage.getItem("user");
//     if (!savedUser) { navigate("/login"); return; }
//     const parsed = JSON.parse(savedUser);
//     if (parsed.role !== "student") { navigate("/login"); return; }
//     setUser(parsed);
//   }, []);

//   useEffect(() => {
//     const timer = setInterval(() => setTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   const getGreeting = () => {
//     const h = time.getHours();
//     if (h < 12) return "Good morning";
//     if (h < 17) return "Good afternoon";
//     if (h < 20) return "Good evening";
//     return "Good night";
//   };

//   const formatTime = (d) =>
//     d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

//   const formatDate = (d) =>
//     d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

//   if (!user) return null;

//   const navItems = [
//     { id: "dashboard", icon: "⊞", label: "Dashboard", section: "Overview" },
//     { id: "tracking", icon: "◎", label: "Bus Tracking", section: "Features" },
//     { id: "routes", icon: "≡", label: "Routes & Schedule", section: "Features" },
//     { id: "announcements", icon: "📢", label: "Announcements", badge: 1, section: "Features" },
//     { id: "complaints", icon: "🧾", label: "Complaints", section: "Features" },
//     { id: "lostfound", icon: "🎒", label: "Lost & Found", section: "Features" },
//     { id: "profile", icon: "◻", label: "My Profile", section: "Account" },
//   ];


//   const initials = user.name
//     ? user.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
//     : "ST";

//   // ── Page title for topbar based on active menu ──
//   const pageTitles = {
//     dashboard: `👋 ${getGreeting()}, ${user.name.split(" ")[0]}!`,
//     tracking: "🚌 Bus Tracking",
//     routes: "📅 Routes & Schedule",
//     announcements: "📢 Announcements",
//     complaints: "🧾 Complaints",
//     lostfound: "🎒 Lost & Found",
//     profile: "◻ My Profile",
//   };

//   // ── Placeholder component for pages not built yet ──
//   const ComingSoon = ({ title, icon }) => (
//     <div style={styles.comingSoon}>
//       <div style={styles.comingSoonIcon}>{icon}</div>
//       <h3 style={styles.comingSoonTitle}>{title}</h3>
//       <p style={styles.comingSoonText}>This section is coming soon!</p>
//     </div>
//   );

//   // ── Render content based on active menu ──
//   const renderContent = () => {
//     switch (activeMenu) {

//       case "tracking":      return <BusTracking />;
//       case "routes":        return <RoutesSchedule />;
//       case "announcements": return <Announcements />;
//       case "complaints":    return <Complaints />;
//       case "lostfound":     return <LostFound />;
//       case "profile":       return <ComingSoon title="My Profile" icon="◻" />;

//       default:
//   return (
//     <>
//       {/* Welcome Banner */}
//       <div style={styles.welcome}>
//         <div style={styles.sky}>
//           <div style={styles.sun} />
//           <div style={styles.cloud1} />
//           <div style={styles.cloud2} />
//         </div>
//         <div style={styles.welcomeOverlay}>
//           <div style={styles.welcomeLeft}>
//             <div style={styles.welcomeGreeting}>Ready to ride today? 🚀</div>
//             <div style={styles.welcomeMsg}>
//               Grab your bag, it's almost here!
//             </div>
//           </div>
//           <div style={styles.welcomeTimer}>
//             <div style={styles.timerLabel}>Next departure</div>
//             <div style={styles.timerVal}>07:45</div>
//             <div style={styles.timerRoute}>Tilagor Route</div>
//           </div>
//         </div>
//         <div style={styles.road}>
//           <div style={styles.roadLine} />
//           <div style={styles.metroBus}>🚌</div>
//           <div style={styles.brtcBus}>🚎</div>
//         </div>
//       </div>

//       {/* Quick Access Cards */}
//       <div style={styles.sectionTitle}>Quick Access</div>
//       <div style={styles.cards}>
//         {[
//           {
//             id: "tracking", icon: "🗺️", iconBg: "#eff6ff",
//             title: "Bus Tracking",
//             desc: "Live location + crowd status",
//             chip: "Live", chipBg: "#dcfce7", chipColor: "#166534",
//             link: "Track now →"
//           },
//           {
//             id: "routes", icon: "📅", iconBg: "#fefce8",
//             title: "Routes & Schedule",
//             desc: "Full timetable and stop details",
//             chip: "3 Routes", chipBg: "#f1f5f9", chipColor: "#475569",
//             link: "View →"
//           },
//           {
//             id: "announcements", icon: "📢", iconBg: "#fff7ed",
//             title: "Announcements",
//             desc: "Notices from transport office",
//             chip: "0 New", chipBg: "#fef3c7", chipColor: "#92400e",
//             link: "Read →"
//           },
//           {
//             id: "lostfound", icon: "🎒", iconBg: "#f5f3ff",
//             title: "Lost & Found",
//             desc: "Left something on the bus?",
//             chip: "Search", chipBg: "#f1f5f9", chipColor: "#475569",
//             link: "Search →"
//           },
//         ].map((card) => (
//           <div
//             key={card.id}
//             style={styles.card}
//             onClick={() => setActiveMenu(card.id)}
//             onMouseEnter={e => {
//               e.currentTarget.style.transform = "translateY(-4px)";
//               e.currentTarget.style.borderColor = "#93c5fd";
//               e.currentTarget.style.boxShadow = "0 8px 24px rgba(59,130,246,0.12)";
//             }}
//             onMouseLeave={e => {
//               e.currentTarget.style.transform = "translateY(0)";
//               e.currentTarget.style.borderColor = "#e2e8f0";
//               e.currentTarget.style.boxShadow = "none";
//             }}
//           >
//             <div style={styles.cardHead}>
//               <div style={{ ...styles.cardIcon, background: card.iconBg }}>
//                 {card.icon}
//               </div>
//               <div style={{
//                 ...styles.cardChip,
//                 background: card.chipBg,
//                 color: card.chipColor
//               }}>
//                 {card.chip}
//               </div>
//             </div>
//             <div style={styles.cardTitle}>{card.title}</div>
//             <div style={styles.cardDesc}>{card.desc}</div>
//             <div style={styles.cardLink}>{card.link}</div>
//           </div>
//         ))}
//       </div>

      
//     </>
//   );
//     }
//   };

//   return (
//     <div style={styles.shell}>

//       {/* ── SIDEBAR ── */}
//       <div style={styles.sidebar}>
//         <div style={styles.sbBrand}>
//           <div style={styles.sbLogo}>
//             <div style={styles.sbLogoIcon}>🚌</div>
//             <div>
//               <div style={styles.sbLogoText}>BusVoyage</div>
//               <div style={styles.sbLogoSub}>Metropolitan University</div>
//             </div>
//           </div>
//         </div>

//         <div style={styles.sbUser}>
//           <div style={styles.sbAvatar}>{initials}</div>
//           <div>
//             <div style={styles.sbName}>{user.name}</div>
//             <div style={styles.sbId}>ID: {user.studentId}</div>
//           </div>
//         </div>

//         <div style={styles.sbNav}>
//           {["Overview", "Features", "Account"].map(section => (
//             <div key={section}>
//               <div style={styles.sbSection}>{section}</div>
//               {navItems.filter(i => i.section === section).map(item => (
//                 <div
//                   key={item.id}
//                   style={{
//                     ...styles.sbItem,
//                     ...(activeMenu === item.id ? styles.sbItemActive : {})
//                   }}
//                   onClick={() => setActiveMenu(item.id)}
//                 >
//                   <span style={styles.sbIcon}>{item.icon}</span>
//                   {item.label}
//                   {item.badge && (
//                     <span style={styles.sbBadge}>{item.badge}</span>
//                   )}
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>

//         <div style={styles.sbBottom}>
//           <div style={styles.sbLogout} onClick={handleLogout}>
//             ↪ &nbsp;Logout
//           </div>
//         </div>
//       </div>

//       {/* ── MAIN ── */}
//       <div style={styles.main}>

//         {/* Top Bar */}
//         <div style={styles.topbar}>
//           <div style={styles.topbarTitle}>
//             {pageTitles[activeMenu]}
//           </div>
//           <div style={styles.topbarRight}>
//             <div style={styles.topbarTime}>{formatTime(time)}</div>
//             <div style={styles.topbarDate}>{formatDate(time)}</div>
//             <div style={styles.notifBtn}>
//               🔔
//               <div style={styles.notifDot} />
//             </div>
//             <div style={styles.statusPill}>
//               <div style={styles.statusDot} />
//               <span style={styles.statusTxt}>All buses operational</span>
//             </div>
//           </div>
//         </div>

//         {/* Content — switches based on activeMenu */}
//         <div style={styles.content}>
//           {renderContent()}
//         </div>
//       </div>

//       {/* Animations */}
//       <style>{`
//         @keyframes moveBus1 {
//           0%   { left: -120px; }
//           100% { left: calc(100% + 20px); }
//         }
//         @keyframes moveBus2 {
//           0%   { left: -120px; }
//           100% { left: calc(100% + 20px); }
//         }
//         @keyframes pulseDot {
//           0%, 100% { opacity: 1; }
//           50%       { opacity: 0.4; }
//         }
//         .sb-logout:hover { color: #ef4444 !important; }
//       `}</style>

//     </div>
//   );
// }

// const styles = {
//   shell: {
//     display: "flex", height: "100vh",
//     fontFamily: "'Segoe UI', Arial, sans-serif",
//     background: "#f8fafc", overflow: "hidden"
//   },
//   sidebar: {
//     width: "230px", background: "#0A1628",
//     display: "flex", flexDirection: "column",
//     flexShrink: 0, height: "100vh"
//   },
//   sbBrand: {
//     padding: "18px 20px 14px",
//     borderBottom: "0.5px solid rgba(255,255,255,0.07)"
//   },
//   sbLogo: { display: "flex", alignItems: "center", gap: "10px" },
//   sbLogoIcon: {
//     width: "34px", height: "34px", background: "#1e3a5f",
//     borderRadius: "8px", display: "flex", alignItems: "center",
//     justifyContent: "center", fontSize: "18px"
//   },
//   sbLogoText: { color: "#fff", fontSize: "16px", fontWeight: 700 },
//   sbLogoSub: { color: "#334155", fontSize: "10px", marginTop: "1px" },
//   sbUser: {
//     padding: "12px 20px",
//     borderBottom: "0.5px solid rgba(255,255,255,0.07)",
//     display: "flex", alignItems: "center", gap: "10px"
//   },
//   sbAvatar: {
//     width: "38px", height: "38px", borderRadius: "50%",
//     background: "#1e3a5f", border: "2px solid #3b82f6",
//     display: "flex", alignItems: "center", justifyContent: "center",
//     color: "#60a5fa", fontSize: "13px", fontWeight: 700, flexShrink: 0
//   },
//   sbName: { color: "#e2e8f0", fontSize: "13px", fontWeight: 600 },
//   sbId: { color: "#475569", fontSize: "11px", marginTop: "2px" },
//   sbNav: { padding: "8px 0", flex: 1, overflowY: "auto" },
//   sbSection: {
//     color: "#1e3a5f", fontSize: "10px", fontWeight: 700,
//     letterSpacing: "1px", textTransform: "uppercase",
//     padding: "10px 20px 4px"
//   },
//   sbItem: {
//     display: "flex", alignItems: "center", gap: "10px",
//     padding: "9px 20px", color: "#475569", fontSize: "13px",
//     cursor: "pointer", borderRight: "2px solid transparent",
//     transition: "all 0.2s"
//   },
//   sbItemActive: {
//     background: "rgba(59,130,246,0.1)",
//     color: "#93c5fd", borderRight: "2px solid #3b82f6"
//   },
//   sbIcon: { fontSize: "14px", width: "18px", textAlign: "center" },
//   sbBadge: {
//     marginLeft: "auto", background: "#ef4444",
//     color: "#fff", fontSize: "10px",
//     padding: "1px 6px", borderRadius: "10px"
//   },
//   sbBottom: {
//     padding: "14px 20px",
//     borderTop: "0.5px solid rgba(255,255,255,0.07)"
//   },
//   sbLogout: {
//     display: "flex", alignItems: "center", gap: "8px",
//     color: "#475569", fontSize: "13px", cursor: "pointer"
//   },
//   main: { flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" },
//   topbar: {
//     background: "#fff", padding: "0 24px", height: "54px",
//     display: "flex", alignItems: "center", justifyContent: "space-between",
//     borderBottom: "0.5px solid #e2e8f0", flexShrink: 0
//   },
//   topbarTitle: { fontSize: "14px", fontWeight: 600, color: "#0f172a" },
//   topbarRight: { display: "flex", alignItems: "center", gap: "12px" },
//   topbarTime: { fontSize: "14px", fontWeight: 700, color: "#0f172a" },
//   topbarDate: { fontSize: "12px", color: "#94a3b8" },
//   notifBtn: {
//     width: "32px", height: "32px", borderRadius: "8px",
//     background: "#f1f5f9", border: "0.5px solid #e2e8f0",
//     display: "flex", alignItems: "center", justifyContent: "center",
//     fontSize: "14px", cursor: "pointer", position: "relative"
//   },
//   notifDot: {
//     position: "absolute", top: "5px", right: "5px",
//     width: "7px", height: "7px",
//     background: "#ef4444", borderRadius: "50%",
//     border: "1.5px solid #fff"
//   },
//   statusPill: {
//     display: "flex", alignItems: "center", gap: "5px",
//     background: "#f0fdf4", border: "0.5px solid #bbf7d0",
//     padding: "4px 10px", borderRadius: "20px"
//   },
//   statusDot: { width: "6px", height: "6px", background: "#22c55e", borderRadius: "50%" },
//   statusTxt: { fontSize: "11px", color: "#166634", fontWeight: 500 },
//   content: {
//   flex: 1,
//   padding: "16px 24px",
//   overflowY: "auto",
//   display: "flex",
//   flexDirection: "column",
//   gap: "14px",
//   height: "0", 
//   },       

//   complaintBox: {
//   background: "#fff",
//   border: "0.5px solid #e2e8f0",
//   borderRadius: "12px",
//   padding: "16px 20px",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "space-between",
//   gap: "16px"
// },
// complaintLeft: {
//   display: "flex",
//   alignItems: "center",
//   gap: "14px"
// },
// complaintIcon: { fontSize: "28px" },
// complaintTitle: {
//   fontSize: "14px", fontWeight: 700, color: "#0f172a"
// },
// complaintDesc: {
//   fontSize: "12px", color: "#94a3b8", marginTop: "3px"
// },
// complaintBtn: {
//   padding: "10px 20px",
//   background: "#0A1628",
//   color: "#fff",
//   border: "none",
//   borderRadius: "8px",
//   fontSize: "13px",
//   fontWeight: 600,
//   cursor: "pointer",
//   flexShrink: 0
// },

//   // Welcome banner
//   welcome: {
//     borderRadius: "12px", overflow: "hidden",
//     position: "relative", height: "130px", flexShrink: 0
//   },
//   sky: {
//     position: "absolute", top: 0, left: 0, right: 0,
//     height: "80px", background: "#94bdce"
//   },
//   sun: {
//     position: "absolute", top: "10px", right: "80px",
//     width: "28px", height: "28px",
//     background: "#FFD700", borderRadius: "50%"
//   },
//   cloud1: {
//     position: "absolute", top: "12px", left: "60px",
//     width: "70px", height: "22px",
//     background: "white", borderRadius: "20px", opacity: 0.9
//   },
//   cloud2: {
//     position: "absolute", top: "20px", left: "220px",
//     width: "50px", height: "16px",
//     background: "white", borderRadius: "20px", opacity: 0.85
//   },
//   welcomeOverlay: {
//     position: "absolute", top: 0, left: 0, right: 0,
//     padding: "14px 20px",
//     display: "flex", alignItems: "center", justifyContent: "space-between",
//     height: "80px", background: "rgba(10,22,40,0.55)", zIndex: 2
//   },
//   welcomeLeft: {},
//   welcomeGreeting: { color: "#fff", fontSize: "15px", fontWeight: 700 },
//   welcomeMsg: { color: "#cbd5e1", fontSize: "11px", marginTop: "4px" },
//   welcomeTimer: { textAlign: "right" },
//   timerLabel: {
//     color: "#94a3b8", fontSize: "10px",
//     textTransform: "uppercase", letterSpacing: "0.5px"
//   },
//   timerVal: { color: "#60a5fa", fontSize: "22px", fontWeight: 700, marginTop: "2px" },
//   timerRoute: { color: "#64748b", fontSize: "10px" },
//   road: {
//     position: "absolute", bottom: 0, left: 0, right: 0,
//     height: "52px", background: "#4a4a4a"
//   },
//   roadLine: {
//     position: "absolute", top: "22px", left: 0, right: 0,
//     height: "3px",
//     background: "repeating-linear-gradient(90deg, #fff 0, #fff 28px, transparent 28px, transparent 52px)"
//   },
//   metroBus: {
//     position: "absolute", bottom: "6px", fontSize: "28px",
//     animation: "moveBus1 8s linear infinite"
//   },
//   brtcBus: {
//     position: "absolute", bottom: "6px", fontSize: "28px",
//     animation: "moveBus2 10s 9s linear infinite"
//   },

//   // Stats
//   stats: {
//     display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
//     gap: "12px", flexShrink: 0
//   },
//   stat: {
//     background: "#fff", borderRadius: "10px",
//     padding: "12px 14px", border: "0.5px solid #e2e8f0"
//   },
//   statTop: {
//     display: "flex", alignItems: "center",
//     justifyContent: "space-between", marginBottom: "6px"
//   },
//   statLabel: {
//     fontSize: "10px", color: "#94a3b8",
//     fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px"
//   },
//   statVal: { fontSize: "14px", fontWeight: 700, color: "#0f172a" },
//   statSub: { fontSize: "11px", marginTop: "3px", fontWeight: 500 },
//   sectionTitle: { fontSize: "13px", fontWeight: 700, color: "#0f172a" },

//   // Feature cards
//   cards: {
//   display: "grid",
//   gridTemplateColumns: "repeat(4, 1fr)",
//   gap: "10px"
//   },
//   card: {
//     background: "#fff", borderRadius: "10px",
//     padding: "14px 12px", border: "0.5px solid #e2e8f0",
//     cursor: "pointer",
//     transition: "transform 0.2s, border-color 0.2s, box-shadow 0.2s"
//   },
//   cardHead: {
//     display: "flex", alignItems: "center",
//     justifyContent: "space-between", marginBottom: "8px"
//   },
//   cardIcon: {
//     width: "36px", height: "36px", borderRadius: "10px",
//     display: "flex", alignItems: "center",
//     justifyContent: "center", fontSize: "18px"
//   },
//   cardChip: {
//     fontSize: "10px", padding: "2px 7px",
//     borderRadius: "10px", fontWeight: 600
//   },
//   cardTitle: { fontSize: "12px", fontWeight: 700, color: "#0f172a", marginBottom: "3px" },
//   cardDesc: { fontSize: "10px", color: "#94a3b8", lineHeight: 1.4, marginBottom: "8px" },
//   cardLink: { fontSize: "11px", color: "#3b82f6", fontWeight: 600 },

//   // Coming soon
//   comingSoon: {
//     display: "flex", flexDirection: "column",
//     alignItems: "center", justifyContent: "center",
//     height: "100%", gap: "12px", opacity: 0.6
//   },
//   comingSoonIcon: { fontSize: "48px" },
//   comingSoonTitle: { fontSize: "18px", fontWeight: 700, color: "#0f172a" },
//   comingSoonText: { fontSize: "14px", color: "#94a3b8" }

// };







import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BusTracking    from "./BusTracking";
import RoutesSchedule from "./RoutesSchedule";
import Announcements  from "./Announcements";
import Complaints     from "./Complaints";
import LostFound      from "./LostFound";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [user,       setUser]       = useState(null);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [time,       setTime]       = useState(new Date());

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (!saved) { navigate("/login"); return; }
    const parsed = JSON.parse(saved);
    if (parsed.role !== "student") { navigate("/login"); return; }
    setUser(parsed);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
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
    if (h < 20) return "Good evening";
    return "Good night";
  };

  const formatTime = (d) =>
    d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  const formatDate = (d) =>
    d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  if (!user) return null;

  const initials = user.name
    ? user.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
    : "ST";

  const NAV = [
    { id: "dashboard",     icon: "🏠", label: "Dashboard",        section: "Overview" },
    { id: "tracking",      icon: "🚌", label: "Bus Tracking",      section: "Features" },
    { id: "routes",        icon: "🗺️", label: "Routes & Schedule", section: "Features" },
    { id: "announcements", icon: "📢", label: "Announcements",     section: "Features", badge: 2 },
    { id: "complaints",    icon: "🧾", label: "Complaints",        section: "Features" },
    { id: "lostfound",     icon: "🎒", label: "Lost & Found",      section: "Features" },
    { id: "profile",       icon: "👤", label: "My Profile",        section: "Account"  },
  ];

  const PAGE_TITLES = {
    dashboard:     getGreeting() + ", " + (user.name?.split(" ")[0] || "Student") + "!",
    tracking:      "Bus Tracking",
    routes:        "Routes & Schedule",
    announcements: "Announcements",
    complaints:    "Complaints",
    lostfound:     "Lost & Found",
    profile:       "My Profile",
  };

  const ComingSoon = ({ title, icon }) => (
    <div style={s.comingSoon}>
      <div style={{ fontSize: 52, marginBottom: 16 }}>{icon}</div>
      <h3 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>{title}</h3>
      <p style={{ fontSize: 14, color: "#94a3b8" }}>This section is coming soon!</p>
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
      default:              return <DashboardHome user={user} setActiveMenu={setActiveMenu} getGreeting={getGreeting} />;
    }
  };

  return (
    <div style={s.shell}>

      {/* SIDEBAR */}
      <aside style={s.sidebar}>

        {/* Logo */}
        <div style={s.sbBrand}>
          <div style={s.sbLogoWrap}>
            <div style={s.sbLogoBox}>🚌</div>
            <div>
              <div style={s.sbLogoText}>BusVoyage</div>
              <div style={s.sbLogoSub}>Metropolitan University</div>
            </div>
          </div>
        </div>

        {/* User card */}
        <div style={s.sbUserCard}>
          <div style={s.sbAvatar}>{initials}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={s.sbName}>{user.name}</div>
            <div style={s.sbMeta}>
              <span style={s.sbRolePill}>Student</span>
              <span style={s.sbId}>#{user.studentId}</span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={s.sbNav}>
          {["Overview", "Features", "Account"].map(section => (
            <div key={section} style={{ marginBottom: 4 }}>
              <div style={s.sbSection}>{section}</div>
              {NAV.filter(n => n.section === section).map(item => (
                <div
                  key={item.id}
                  style={{ ...s.sbItem, ...(activeMenu === item.id ? s.sbItemActive : {}) }}
                  onClick={() => setActiveMenu(item.id)}
                >
                  <span style={s.sbIcon}>{item.icon}</span>
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {item.badge && <span style={s.sbBadge}>{item.badge}</span>}
                </div>
              ))}
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div style={s.sbFooter}>
          <div style={s.sbLogout} onClick={handleLogout}
            onMouseEnter={e => e.currentTarget.style.color = "#ef4444"}
            onMouseLeave={e => e.currentTarget.style.color = "#64748b"}>
            <span>↪</span>
            <span>Logout</span>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div style={s.main}>

        {/* Topbar */}
        <header style={s.topbar}>
          <div>
            <div style={s.topbarTitle}>
              {activeMenu === "dashboard" ? "👋 " : ""}{PAGE_TITLES[activeMenu]}
            </div>
            <div style={s.topbarDate}>{formatDate(time)}</div>
          </div>
          <div style={s.topbarRight}>
            <div style={s.timeBadge}>🕐 {formatTime(time)}</div>
            <div style={s.statusPill}>
              <div style={s.statusDot} />
              <span style={s.statusTxt}>All buses operational</span>
            </div>
            <div style={s.notifBtn}>
              🔔
              <div style={s.notifDot} />
            </div>
            <div style={s.avatarSmall}>{initials}</div>
          </div>
        </header>

        {/* Content */}
        <div style={s.content}>
          {renderContent()}
        </div>
      </div>

      <style>{`
        @keyframes busRoll  { 0%{left:-120px} 100%{left:calc(100% + 20px)} }
        @keyframes busRoll2 { 0%{left:-120px} 100%{left:calc(100% + 20px)} }
        @keyframes cloudDrift { 0%{transform:translateX(0)} 100%{transform:translateX(40px)} }
      `}</style>
    </div>
  );
}

/* Dashboard Home Component */
function DashboardHome({ user, setActiveMenu, getGreeting }) {
  const STATS = [
    { icon:"🚌", label:"Buses Active",  val:"5",       sub:"out of 8 total",     color:"#3b82f6", bg:"#eff6ff" },
    { icon:"🟢", label:"My Route",      val:"MU-02",   sub:"Tilagor Route",       color:"#22c55e", bg:"#f0fdf4" },
    { icon:"⏰", label:"Next Bus",      val:"07:45",   sub:"In ~12 minutes",      color:"#f59e0b", bg:"#fffbeb" },
    { icon:"👥", label:"Crowd Status",  val:"Seats OK",sub:"Available on MU-02", color:"#10b981", bg:"#f0fdf4" },
  ];

  const CARDS = [
    { id:"tracking",      icon:"🚌", bg:"#eff6ff", title:"Bus Tracking",       desc:"Live location & crowd status",   chip:"● Live",   chipBg:"#dcfce7", chipColor:"#166534", link:"Track now →" },
    { id:"routes",        icon:"🗺️", bg:"#fefce8", title:"Routes & Schedule",  desc:"Full timetable and stop info",   chip:"3 Routes", chipBg:"#f1f5f9", chipColor:"#475569", link:"View →"      },
    { id:"announcements", icon:"📢", bg:"#fff7ed", title:"Announcements",       desc:"Notices from transport office",  chip:"2 New",    chipBg:"#fef3c7", chipColor:"#92400e", link:"Read →"      },
    { id:"complaints",    icon:"🧾", bg:"#fdf4ff", title:"Complaints",          desc:"Submit or track complaint",      chip:"Submit",   chipBg:"#f1f5f9", chipColor:"#475569", link:"Go →"        },
    { id:"lostfound",     icon:"🎒", bg:"#f5f3ff", title:"Lost & Found",        desc:"Left something on the bus?",    chip:"Search",   chipBg:"#f1f5f9", chipColor:"#475569", link:"Search →"    },
  ];

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>

      {/* Welcome Banner */}
      <div style={d.banner}>
        <div style={d.sky}>
          <div style={d.sun} />
          <div style={{ ...d.cloud, top:12, left:60,   width:80, animationDuration:"6s" }} />
          <div style={{ ...d.cloud, top:22, left:200,  width:55, animationDuration:"9s",  animationDelay:"2s" }} />
          <div style={{ ...d.cloud, top:10, right:160, width:65, animationDuration:"8s",  animationDelay:"1s" }} />
        </div>
        <div style={d.overlay}>
          <div style={{ flex:1 }}>
            <div style={d.greeting}>👋 {getGreeting()}, {user.name?.split(" ")[0]}!</div>
            <div style={d.greetSub}>Ready to ride? Your bus is on the way.</div>
            <div style={d.routeTag}>
              <span style={d.greenDot} />
              Tilagor → MU Campus &nbsp;·&nbsp; MU-02
            </div>
          </div>
          <div style={d.nextCard}>
            <div style={d.nextLabel}>Next Departure</div>
            <div style={d.nextTime}>07:45</div>
            <div style={d.nextRoute}>Tilagor Route</div>
            <div style={d.nextCountdown}>In ~12 min</div>
          </div>
        </div>
        <div style={d.road}>
          <div style={d.roadStripe} />
          <img src="/bus.png" alt="bus"
            style={{ position:"absolute", bottom:4, height:44, zIndex:2, animation:"busRoll 9s linear infinite" }}
            onError={e => { e.target.style.display = "none"; }}
          />
          <span style={{ position:"absolute", bottom:8, fontSize:26, zIndex:1, animation:"busRoll2 14s 10s linear infinite" }}>🚎</span>
        </div>
      </div>

      {/* Stats */}
      <div style={d.statsGrid}>
        {STATS.map((st, i) => (
          <div key={i} style={{ ...d.statCard, borderTop:"3px solid "+st.color }}>
            <div style={{ ...d.statIcon, background:st.bg }}>
              <span style={{ fontSize:18 }}>{st.icon}</span>
            </div>
            <div style={d.statVal}>{st.val}</div>
            <div style={d.statLabel}>{st.label}</div>
            <div style={d.statSub}>{st.sub}</div>
          </div>
        ))}
      </div>

      {/* Quick Access */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ fontSize:13, fontWeight:700, color:"#0f172a" }}>Quick Access</div>
        <div style={{ fontSize:11, color:"#94a3b8" }}>Tap any card to navigate</div>
      </div>
      <div style={d.cardsGrid}>
        {CARDS.map(card => (
          <div key={card.id} style={d.card}
            onClick={() => setActiveMenu(card.id)}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.borderColor = "#93c5fd";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(59,130,246,0.1)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "#e2e8f0";
              e.currentTarget.style.boxShadow = "none";
            }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
              <div style={{ ...d.cardIcon, background:card.bg }}>{card.icon}</div>
              <span style={{ fontSize:10, padding:"2px 7px", borderRadius:10, fontWeight:700, background:card.chipBg, color:card.chipColor }}>{card.chip}</span>
            </div>
            <div style={{ fontSize:12, fontWeight:700, color:"#0f172a", marginBottom:3 }}>{card.title}</div>
            <div style={{ fontSize:10, color:"#94a3b8", lineHeight:1.45, marginBottom:10 }}>{card.desc}</div>
            <div style={{ fontSize:11, color:"#3b82f6", fontWeight:700 }}>{card.link}</div>
          </div>
        ))}
      </div>

      {/* Notice strip */}
      <div style={d.notice}>
        <span style={{ fontSize:16 }}>📢</span>
        <span style={{ flex:1, fontSize:12, color:"#78350f", lineHeight:1.5 }}>
          <b>Notice:</b> Bus MU-03 will be delayed by 15 minutes today due to road construction near Bondor.
        </span>
        <span style={{ fontSize:11, color:"#a16207", flexShrink:0 }}>10 min ago</span>
      </div>
    </div>
  );
}

const d = {
  banner: { borderRadius:14, overflow:"hidden", position:"relative", height:150, flexShrink:0, boxShadow:"0 2px 12px rgba(0,0,0,0.08)" },
  sky:    { position:"absolute", top:0, left:0, right:0, height:96, background:"linear-gradient(180deg,#87ceeb 0%,#b8d8f0 100%)", overflow:"hidden" },
  sun:    { position:"absolute", top:10, right:100, width:30, height:30, borderRadius:"50%", background:"radial-gradient(circle,#FFE566,#FFD700)", boxShadow:"0 0 16px rgba(255,215,0,0.5)" },
  cloud:  { position:"absolute", height:20, background:"rgba(255,255,255,0.92)", borderRadius:20, animation:"cloudDrift 6s ease-in-out infinite alternate" },
  overlay:{ position:"absolute", top:0, left:0, right:0, height:96, background:"rgba(10,22,40,0.48)", padding:"14px 20px", display:"flex", alignItems:"center", gap:20, zIndex:2 },
  greeting:    { color:"#fff", fontSize:16, fontWeight:800, marginBottom:4 },
  greetSub:    { color:"rgba(255,255,255,0.8)", fontSize:12, marginBottom:6 },
  routeTag:    { display:"inline-flex", alignItems:"center", gap:6, background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.2)", color:"#fff", fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:12 },
  greenDot:    { width:7, height:7, borderRadius:"50%", background:"#4ade80", display:"inline-block" },
  nextCard:    { background:"rgba(255,255,255,0.12)", backdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:12, padding:"10px 16px", textAlign:"center", flexShrink:0 },
  nextLabel:   { color:"rgba(255,255,255,0.7)", fontSize:10, textTransform:"uppercase", letterSpacing:1 },
  nextTime:    { color:"#FFE566", fontSize:26, fontWeight:900, lineHeight:1.1, margin:"4px 0" },
  nextRoute:   { color:"rgba(255,255,255,0.8)", fontSize:10 },
  nextCountdown:{ color:"#4ade80", fontSize:11, fontWeight:700, marginTop:3 },
  road:        { position:"absolute", bottom:0, left:0, right:0, height:56, background:"#3d3d3d", overflow:"hidden", zIndex:1 },
  roadStripe:  { position:"absolute", top:24, left:0, right:0, height:4, background:"repeating-linear-gradient(90deg,rgba(255,255,255,0.7) 0,rgba(255,255,255,0.7) 32px,transparent 32px,transparent 64px)" },
  statsGrid:   { display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 },
  statCard:    { background:"#fff", borderRadius:12, padding:"14px 16px", border:"0.5px solid #e2e8f0", display:"flex", flexDirection:"column", gap:4 },
  statIcon:    { width:34, height:34, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:6 },
  statVal:     { fontSize:18, fontWeight:800, color:"#0f172a" },
  statLabel:   { fontSize:11, fontWeight:700, color:"#475569" },
  statSub:     { fontSize:10, color:"#94a3b8" },
  cardsGrid:   { display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:10 },
  card:        { background:"#fff", borderRadius:12, padding:"14px 12px", border:"0.5px solid #e2e8f0", cursor:"pointer", transition:"transform 0.18s,border-color 0.18s,box-shadow 0.18s" },
  cardIcon:    { width:38, height:38, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 },
  notice:      { display:"flex", alignItems:"center", gap:10, background:"#fffbeb", border:"1px solid #fde68a", borderRadius:10, padding:"10px 16px" },
};

const s = {
  shell:   { display:"flex", height:"100vh", fontFamily:"'Segoe UI',Arial,sans-serif", background:"#f1f5f9", overflow:"hidden" },
  sidebar: { width:232, background:"#001f4d", display:"flex", flexDirection:"column", flexShrink:0, height:"100vh" },
  sbBrand: { padding:"18px 20px 14px", borderBottom:"1px solid rgba(255,255,255,0.07)" },
  sbLogoWrap: { display:"flex", alignItems:"center", gap:10 },
  sbLogoBox:  { width:34, height:34, background:"#003580", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 },
  sbLogoText: { color:"#fff", fontSize:15, fontWeight:700 },
  sbLogoSub:  { color:"#4a7fc1", fontSize:10, marginTop:1 },
  sbUserCard: { padding:"12px 20px", borderBottom:"1px solid rgba(255,255,255,0.07)", display:"flex", alignItems:"center", gap:10 },
  sbAvatar:   { width:38, height:38, borderRadius:"50%", background:"#003580", border:"2px solid #3b82f6", display:"flex", alignItems:"center", justifyContent:"center", color:"#60a5fa", fontSize:13, fontWeight:700, flexShrink:0 },
  sbName:     { color:"#e2e8f0", fontSize:13, fontWeight:600, marginBottom:4 },
  sbMeta:     { display:"flex", alignItems:"center", gap:6 },
  sbRolePill: { background:"rgba(59,130,246,0.2)", color:"#60a5fa", fontSize:10, fontWeight:700, padding:"2px 7px", borderRadius:10 },
  sbId:       { color:"#475569", fontSize:10 },
  sbNav:      { padding:"8px 0", flex:1, overflowY:"auto" },
  sbSection:  { color:"#4a7fc1", fontSize:10, fontWeight:700, letterSpacing:"1px", textTransform:"uppercase", padding:"10px 20px 4px" },
  sbItem:     { display:"flex", alignItems:"center", gap:10, padding:"9px 20px", color:"#64748b", fontSize:13, cursor:"pointer", borderRight:"2px solid transparent", transition:"all 0.15s" },
  sbItemActive:{ background:"rgba(59,130,246,0.12)", color:"#93c5fd", borderRight:"2px solid #3b82f6" },
  sbIcon:     { fontSize:14, width:18, textAlign:"center" },
  sbBadge:    { marginLeft:"auto", background:"#ef4444", color:"#fff", fontSize:10, padding:"1px 6px", borderRadius:10 },
  sbFooter:   { padding:"14px 20px", borderTop:"1px solid rgba(255,255,255,0.07)" },
  sbLogout:   { display:"flex", alignItems:"center", gap:8, color:"#64748b", fontSize:13, cursor:"pointer", transition:"color 0.2s" },
  main:       { flex:1, display:"flex", flexDirection:"column", overflow:"hidden" },
  topbar:     { background:"#fff", padding:"0 24px", height:56, display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid #e2e8f0", flexShrink:0 },
  topbarTitle:{ fontSize:15, fontWeight:700, color:"#0f172a" },
  topbarDate: { fontSize:11, color:"#94a3b8", marginTop:2 },
  topbarRight:{ display:"flex", alignItems:"center", gap:10 },
  timeBadge:  { fontSize:12, fontWeight:700, color:"#0f172a", background:"#f1f5f9", border:"0.5px solid #e2e8f0", padding:"5px 10px", borderRadius:8 },
  statusPill: { display:"flex", alignItems:"center", gap:5, background:"#f0fdf4", border:"0.5px solid #bbf7d0", padding:"4px 10px", borderRadius:20 },
  statusDot:  { width:6, height:6, background:"#22c55e", borderRadius:"50%" },
  statusTxt:  { fontSize:11, color:"#166634", fontWeight:500 },
  notifBtn:   { width:32, height:32, borderRadius:8, background:"#f1f5f9", border:"0.5px solid #e2e8f0", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, cursor:"pointer", position:"relative" },
  notifDot:   { position:"absolute", top:5, right:5, width:7, height:7, background:"#ef4444", borderRadius:"50%", border:"1.5px solid #fff" },
  avatarSmall:{ width:30, height:30, borderRadius:"50%", background:"#003580", border:"2px solid #3b82f6", display:"flex", alignItems:"center", justifyContent:"center", color:"#60a5fa", fontSize:11, fontWeight:700 },
  content:    { flex:1, padding:"16px 24px", overflowY:"auto", display:"flex", flexDirection:"column", gap:14, height:0 },
  comingSoon: { display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", gap:12, opacity:0.6 },
};