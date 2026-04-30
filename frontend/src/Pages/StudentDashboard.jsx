// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import BusTracking    from "./BusTracking";
// import RoutesSchedule from "./RoutesSchedule";
// import Announcements  from "./Announcements";
// import Complaints     from "./Complaints";
// import LostFound      from "./LostFound";


// const NAV = [
//   { section: "Main",      id: "dashboard",     label: "Dashboard",         icon: "🏠" },
//   { section: "Transport", id: "tracking",      label: "Live Tracking",     icon: "📍", badge: null },
//   { section: "Transport", id: "routes",        label: "Routes & Schedule", icon: "🗺️" },
//   { section: "Transport", id: "announcements", label: "Announcements",     icon: "📣", badge: 1 },
//   { section: "Services",  id: "complaints",    label: "Complaints",        icon: "💬" },
//   { section: "Services",  id: "lostfound",     label: "Lost & Found",      icon: "🎒" },
//   { section: "Account",   id: "profile",       label: "My Profile",        icon: "👤" },
// ];

// const NAV_SECTIONS = ["Main", "Transport", "Services", "Account"];

// export default function StudentDashboard() {
//   const navigate = useNavigate();

//   const [user,   setUser]   = useState(null);
//   const [active, setActive] = useState("dashboard");
//   const [time,   setTime]   = useState(new Date());
//   const [sbOpen, setSbOpen] = useState(false);

//   useEffect(() => {
//     const raw = localStorage.getItem("user");
//     if (!raw) { navigate("/login"); return; }
//     const u = JSON.parse(raw);
//     if (u.role !== "student") { navigate("/login"); return; }
//     setUser(u);
//   }, []);

//   useEffect(() => {
//     const t = setInterval(() => setTime(new Date()), 1000);
//     return () => clearInterval(t);
//   }, []);

//   if (!user) return null;

//   const initials  = user.name
//     ? user.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
//     : "ST";
//   const firstName = user.name?.split(" ")[0] ?? "Student";

//   const greeting = () => {
//     const h = time.getHours();
//     if (h < 12) return "Good morning";
//     if (h < 17) return "Good afternoon";
//     if (h < 20) return "Good evening";
//     return "Good night";
//   };

//   const fmtTime = (d) =>
//     d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

//   const fmtDate = (d) =>
//     d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   const selectMenu = (id) => {
//     console.log('selectMenu called with id:', id);
//     setActive(id);
//     setSbOpen(false);
//   };

//   const PAGE_TITLES = {
//     dashboard:     `${greeting()}, ${firstName}!`,
//     tracking:      "Live Bus Tracking",
//     routes:        "Routes & Schedule",
//     announcements: "Announcements",
//     complaints:    "Complaints",
//     lostfound:     "Lost & Found",
//     profile:       "My Profile",
//   };

//   const renderPage = () => {
//     switch (active) {
//       case "tracking":      return <BusTracking />;
//       case "routes":        return <RoutesSchedule />;
//       case "announcements": return <Announcements />;
//       case "complaints":    return <Complaints />;
//       case "lostfound":     return <LostFound />;
//       case "profile":       return <ComingSoon icon="👤" title="My Profile" />;
//       default:
//         return (
//           <DashboardHome
//             user={user}
//             greeting={greeting}
//             firstName={firstName}
//             onNavigate={selectMenu}
//           />
//         );
//     }
//   };

//   return (
//     <div style={L.root}>
//       <style>{CSS}</style>

//       {/* ════ SIDEBAR ════ */}
//       <aside style={{ ...L.sidebar, ...(sbOpen ? L.sbOpen : {}) }}>

//         {/* Brand */}
//         <div style={sb.brand}>
//           <div style={sb.brandIcon}>🚌</div>
//           <div>
//             <div style={sb.brandName}>BusVoyage</div>
//             <div style={sb.brandSub}>Metropolitan University</div>
//           </div>
//         </div>

//         {/* User card */}
//         <div style={sb.userCard}>
//           <div style={sb.avatar}>{initials}</div>
//           <div style={{ minWidth: 0 }}>
//             <div style={sb.userName}>{user.name}</div>
//             <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 3 }}>
//               <span style={sb.rolePill}>Student</span>
//               <span style={sb.userId}>#{user.studentId}</span>
//             </div>
//           </div>
//         </div>

//         {/* Nav */}
//         <nav style={sb.nav}>
//           {NAV_SECTIONS.map(section => (
//             <div key={section} style={{ marginBottom: 6 }}>
//               <div style={sb.sectionLabel}>{section}</div>
//               {NAV.filter(n => n.section === section).map(item => {
//                 const on = active === item.id;
//                 return (
//                   <button
//                     key={item.id}
//                     style={{ ...sb.item, ...(on ? sb.itemOn : {}) }}
//                     onClick={() => selectMenu(item.id)}
//                   >
//                     <span style={sb.itemIcon}>{item.icon}</span>
//                     <span style={{ flex: 1, textAlign: "left" }}>{item.label}</span>
//                     {item.badge && <span style={sb.badge}>{item.badge}</span>}
//                     {on && <span style={sb.activeLine} />}
//                   </button>
//                 );
//               })}
//             </div>
//           ))}
//         </nav>

//         {/* Footer */}
//         <div style={sb.footer}>
//           <div style={sb.divider} />
//           <button style={sb.logout} onClick={handleLogout}>
//             <span>⎋</span> Sign Out
//           </button>
//         </div>
//       </aside>

//       {/* Mobile backdrop */}
//       {sbOpen && <div style={L.backdrop} onClick={() => setSbOpen(false)} />}

//       {/* ════ MAIN ════ */}
//       <div style={L.main}>

//         {/* Top bar */}
//         <header style={tb.bar}>
//           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//             <button className="ham-btn" style={tb.ham} onClick={() => setSbOpen(o => !o)}>
//               <span style={tb.hamLine} /><span style={tb.hamLine} /><span style={tb.hamLine} />
//             </button>
//             <div>
//               <div style={tb.title}>{PAGE_TITLES[active]}</div>
//               <div style={tb.date}>{fmtDate(time)}</div>
//             </div>
//           </div>

//           <div style={tb.right}>
//             <div style={tb.clock}>{fmtTime(time)}</div>
//             <div style={tb.statusPill}>
//               <span style={tb.dot} />
//               <span className="status-txt" style={tb.statusTxt}>All buses running</span>
//             </div>
//             <button style={tb.bell}>
//               🔔<span style={tb.bellDot} />
//             </button>
//             <div style={tb.ava}>{initials}</div>
//           </div>
//         </header>

//         {/* Content */}
//         <main style={L.content}>{renderPage()}</main>
//       </div>
//     </div>
//   );
// }


// function DashboardHome({ user, greeting, firstName, onNavigate }) {

//   const SHORTCUTS = [
//     { id: "tracking",      icon: "📍", title: "Live Tracking",      desc: "See where your bus is now",       badge: "● Live",   bBg: "rgba(16,185,129,0.15)",  bColor: "#4ade80" },
//     { id: "routes",        icon: "🗺️", title: "Routes & Schedules", desc: "Full timetable for all 5 routes", badge: "5 routes", bBg: "rgba(255,255,255,0.06)", bColor: "#94a3b8" },
//     { id: "announcements", icon: "📣", title: "Announcements",       desc: "Latest notices from transport",   badge: "1 new",    bBg: "rgba(245,158,11,0.15)",  bColor: "#fbbf24" },
//     { id: "complaints",    icon: "💬", title: "Complaints",          desc: "Report or track an issue",        badge: "Open",     bBg: "rgba(255,255,255,0.06)", bColor: "#94a3b8" },
//     { id: "lostfound",     icon: "🎒", title: "Lost & Found",        desc: "Search or report lost items",     badge: "Search",   bBg: "rgba(255,255,255,0.06)", bColor: "#94a3b8" },
//   ];

//   const ACTIVITY = [
//     { icon: "📢", text: "Bus MU-03 delayed 15 min — road work near Bondor", time: "10 min ago",  color: "#f59e0b" },
//     { icon: "✅", text: "Your complaint #C-041 has been resolved",           time: "2 hours ago", color: "#10b981" },
//     { icon: "🚌", text: "Bus MU-01 is now on the Amberkhana route",          time: "Yesterday",   color: "#3b82f6" },
//   ];

//   return (
//     <div style={dh.page}>

//       {/* ── Welcome banner ── */}
//       <div style={dh.banner}>
//         {/* left */}
//         <div style={dh.bannerLeft}>
//           <div style={dh.eyebrow}>
//             <span style={dh.liveDot} />
//             Tilagor → MU Campus · Route MU-02
//           </div>
//           <div style={dh.greet}>👋 {greeting()}, {firstName}!</div>
//           <div style={dh.greetSub}>
//             Your campus transport hub — track, ride and arrive on time.
//           </div>
//           <button style={dh.ctaBtn} onClick={() => onNavigate("tracking")}>
//             📍 Track My Bus
//           </button>
//         </div>

//         {/* right — next bus + progress */}
//         <div style={dh.bannerRight}>
//           <div style={dh.nextCard}>
//             <div style={dh.ncLabel}>NEXT DEPARTURE</div>
//             <div style={dh.ncTime}>07:45</div>
//             <div style={dh.ncRoute}>Tilagor Route · MU-02</div>
//             <div style={dh.ncEta}>⏱ In approximately 12 minutes</div>
//           </div>
//           <div style={dh.progressCard}>
//             <div style={dh.pcLabel}>ROUTE PROGRESS TODAY</div>
//             <div style={dh.progressBar}>
//               <div style={{ ...dh.progressFill, width: "57%" }} />
//             </div>
//             <div style={dh.pcSub}>Stop 4 of 7 — 57% complete</div>
//           </div>
//         </div>
//       </div>

//       {/* ── Quick Access ── */}
//       <div style={dh.secHead}>
//         <span style={dh.secTitle}>Quick Access</span>
//         <span style={dh.secHint}>Tap any card to open</span>
//       </div>

//       <div style={dh.shortcutGrid} className="shortcut-grid">
//         {SHORTCUTS.map(sc => (
//           <button
//             key={sc.id}
//             className="sc-card"
//             style={dh.scCard}
//             onClick={() => { console.log('shortcut clicked:', sc.id); onNavigate(sc.id); }}
//           >
//             <div style={dh.scTop}>
//               <div style={dh.scIcon}>{sc.icon}</div>
//               <span style={{ ...dh.scBadge, background: sc.bBg, color: sc.bColor }}>
//                 {sc.badge}
//               </span>
//             </div>
//             <div style={dh.scTitle}>{sc.title}</div>
//             <div style={dh.scDesc}>{sc.desc}</div>
//             <div style={dh.scLink}>Open →</div>
//           </button>
//         ))}
//       </div>

//       {/* ── Bottom row ── */}
//       <div style={dh.bottomRow} className="bottom-row">

//         {/* Recent activity */}
//         <div style={dh.panel}>
//           <div style={dh.panelHead}>
//             <span style={dh.panelTitle}>Recent Activity</span>
//             <span style={dh.panelHint}>Last 24 hours</span>
//           </div>
//           {ACTIVITY.map((a, i) => (
//             <div key={i} style={dh.actRow}>
//               <span style={{ ...dh.actDot, background: a.color }} />
//               <span style={dh.actIcon}>{a.icon}</span>
//               <span style={dh.actText}>{a.text}</span>
//               <span style={dh.actTime}>{a.time}</span>
//             </div>
//           ))}
//         </div>

//         {/* Transport card */}
//         <div style={dh.panel}>
//           <div style={dh.panelHead}>
//             <span style={dh.panelTitle}>My Transport Card</span>
//             <span style={dh.tcActivePill}>● Active</span>
//           </div>
//           {[
//             ["Student Name",    user.name],
//             ["Student ID",      `#${user.studentId}`],
//             ["Assigned Route",  "Tilagor · MU-02", "#60a5fa"],
//             ["Trips This Month","23 trips"],
//             ["On-Time Rate",    "96%", "#4ade80"],
//           ].map(([label, value, color]) => (
//             <div key={label} style={dh.tcRow}>
//               <span style={dh.tcLabel}>{label}</span>
//               <span style={{ ...dh.tcValue, ...(color ? { color } : {}) }}>{value}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


// function ComingSoon({ icon, title }) {
//   return (
//     <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"60%", gap:12 }}>
//       <div style={{ fontSize: 56 }}>{icon}</div>
//       <div style={{ fontSize: 20, fontWeight: 700, color: "#e2e8f0" }}>{title}</div>
//       <div style={{ fontSize: 14, color: "#4a6fa5" }}>This section is coming soon — stay tuned!</div>
//     </div>
//   );
// }

// const cs = {
//   wrap:  { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "60%", gap: 12, color: "#94a3b8" },
//   icon:  { fontSize: 56 },
//   title: { fontSize: 20, fontWeight: 700, color: "#0f172a" },
//   sub:   { fontSize: 14, color: "#94a3b8" },
// };

// /* ═══════════════════════════════════════════════════════════
//    LAYOUT STYLES
// ═══════════════════════════════════════════════════════════ */
// const layout = {
//   root: {
//     display: "flex",
//     height: "100vh",
//     fontFamily: "'Segoe UI', system-ui, sans-serif",
//     background: "#0d1b2e",       
//     overflow: "hidden",
//     color: "#e2e8f0",
//   },
//   sidebar: {
//     width: 248,
//     flexShrink: 0,
//     background: "#060f1e",      
//     display: "flex",
//     flexDirection: "column",
//     height: "100vh",
//     borderRight: "1px solid rgba(255,255,255,0.05)",
//     zIndex: 200,
//     transition: "transform 0.25s ease",
//   },
//   sbOpen: {
//     position: "fixed",
//     transform: "translateX(0)",
//   },
//   backdrop: {
//     position: "fixed", inset: 0,
//     background: "rgba(0,0,0,0.55)",
//     zIndex: 199,
//   },
//   main: {
//     flex: 1,
//     display: "flex",
//     flexDirection: "column",
//     overflow: "hidden",
//     minWidth: 0,
//   },
//   content: {
//     flex: 1,
//     overflowY: "auto",
//     padding: "24px",
//     height: 0,
//   },
// };

// /* ═══════════════════════════════════════════════════════════
//    SIDEBAR STYLES
// ═══════════════════════════════════════════════════════════ */
// const sb = {
//   brand: {
//     display: "flex", alignItems: "center", gap: 10,
//     padding: "20px 16px 16px",
//     borderBottom: "1px solid rgba(255,255,255,0.05)",
//   },
//   brandIcon: {
//     width: 36, height: 36,
//     background: "rgba(59,130,246,0.18)",
//     border: "1px solid rgba(96,165,250,0.28)",
//     borderRadius: 10,
//     display: "flex", alignItems: "center", justifyContent: "center",
//     fontSize: 18, flexShrink: 0,
//   },
//   brandName: { color: "#f1f5f9", fontSize: 15, fontWeight: 800 },
//   brandSub:  { color: "#2d5091", fontSize: 10, marginTop: 1 },

//   userCard: {
//     display: "flex", alignItems: "center", gap: 10,
//     padding: "12px 16px",
//     borderBottom: "1px solid rgba(255,255,255,0.05)",
//     background: "rgba(255,255,255,0.02)",
//   },
//   avatar: {
//     width: 38, height: 38, borderRadius: "50%",
//     background: "linear-gradient(135deg,#1d4ed8,#3b82f6)",
//     border: "2px solid rgba(96,165,250,0.3)",
//     display: "flex", alignItems: "center", justifyContent: "center",
//     color: "#fff", fontSize: 13, fontWeight: 700, flexShrink: 0,
//   },
//   userName: {
//     color: "#cbd5e1", fontSize: 12, fontWeight: 600,
//     whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 140,
//   },
//   rolePill: {
//     background: "rgba(59,130,246,0.18)", border: "1px solid rgba(96,165,250,0.2)",
//     color: "#60a5fa", fontSize: 9, fontWeight: 700,
//     padding: "2px 8px", borderRadius: 20,
//     textTransform: "uppercase", letterSpacing: 0.5,
//   },
//   userId: { color: "#2d5091", fontSize: 10 },

//   nav:          { flex: 1, overflowY: "auto", padding: "10px 10px" },
//   sectionLabel: {
//     fontSize: 9, fontWeight: 700, color: "#1e3a6e",
//     textTransform: "uppercase", letterSpacing: 1.4,
//     padding: "10px 8px 4px",
//   },
//   item: {
//     display: "flex", alignItems: "center", gap: 9,
//     width: "100%", padding: "9px 8px",
//     background: "transparent", border: "none",
//     borderRadius: 8, color: "#4a6fa5",
//     fontSize: 12.5, fontWeight: 500,
//     cursor: "pointer", transition: "all 0.14s",
//     position: "relative", marginBottom: 2,
//   },
//   itemOn: {
//     background: "rgba(59,130,246,0.12)",
//     color: "#93c5fd", fontWeight: 600,
//   },
//   itemIcon:   { fontSize: 14, width: 20, textAlign: "center", flexShrink: 0 },
//   badge:      { background: "#ef4444", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 10, flexShrink: 0 },
//   activeLine: {
//     position: "absolute", right: 0, top: "18%", bottom: "18%",
//     width: 3, borderRadius: "3px 0 0 3px", background: "#3b82f6",
//   },
//   footer:  { padding: "8px 10px 16px" },
//   divider: { height: 1, background: "rgba(255,255,255,0.04)", marginBottom: 10 },
//   logout: {
//     display: "flex", alignItems: "center", gap: 8,
//     width: "100%", padding: "9px 8px",
//     background: "transparent", border: "none",
//     color: "#4a6fa5", fontSize: 12.5, fontWeight: 500,
//     cursor: "pointer", borderRadius: 8, transition: "color 0.15s",
//   },
// };

// /* ═══════════════════════════════════════════════════════════
//    TOPBAR STYLES
// ═══════════════════════════════════════════════════════════ */
// const topbar = {
//   wrap: {
//     background: "#fff",
//     height: 60,
//     padding: "0 24px",
//     display: "flex", alignItems: "center", justifyContent: "space-between",
//     borderBottom: "1px solid rgba(255,255,255,0.05)",
//     flexShrink: 0,
//     gap: 12,
//     boxShadow: "0 1px 0 rgba(255,255,255,0.04)",
//   },
//   title: { fontSize: 15, fontWeight: 700, color: "#f1f5f9" },
//   date:  { fontSize: 11, color: "#2d5091", marginTop: 1 },
//   right: { display: "flex", alignItems: "center", gap: 10, flexShrink: 0 },

//   clock: {
//     fontSize: 13, fontWeight: 700, color: "#f59e0b",   
//     background: "rgba(245,158,11,0.1)",
//     border: "1px solid rgba(245,158,11,0.2)",
//     padding: "5px 12px", borderRadius: 8,
//     fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap",
//   },
//   statusPill: {
//     display: "flex", alignItems: "center", gap: 6,
//     background: "rgba(16,185,129,0.1)",
//     border: "1px solid rgba(16,185,129,0.25)",
//     padding: "5px 12px", borderRadius: 20,
//   },
//   dot:       { width: 6, height: 6, borderRadius: "50%", background: "#10b981", flexShrink: 0 },
//   statusTxt: { fontSize: 11, color: "#34d399", fontWeight: 600, whiteSpace: "nowrap" },

//   bell: {
//     position: "relative", width: 36, height: 36,
//     background: "rgba(255,255,255,0.04)",
//     border: "1px solid rgba(255,255,255,0.08)",
//     borderRadius: 9,
//     display: "flex", alignItems: "center", justifyContent: "center",
//     fontSize: 16, cursor: "pointer", flexShrink: 0,
//   },
//   bellDot: {
//     position: "absolute", top: 7, right: 7,
//     width: 7, height: 7, borderRadius: "50%",
//     background: "#ef4444", border: "1.5px solid #0a1628",
//   },
//   ava: {
//     width: 34, height: 34, borderRadius: "50%",
//     background: "linear-gradient(135deg,#1d4ed8,#3b82f6)",
//     border: "2px solid rgba(59,130,246,0.35)",
//     display: "flex", alignItems: "center", justifyContent: "center",
//     color: "#fff", fontSize: 12, fontWeight: 700, flexShrink: 0,
//   },
//   ham: {
//     flexDirection: "column", gap: 4,
//     width: 36, height: 36,
//     background: "rgba(255,255,255,0.04)",
//     border: "1px solid rgba(255,255,255,0.08)",
//     borderRadius: 8, cursor: "pointer", padding: "0 9px",
//     alignItems: "center", justifyContent: "center", flexShrink: 0,
//   },
//   hamLine: { display: "block", height: 2, width: "100%", background: "#94a3b8", borderRadius: 2 },
// };

// const dh = {
//   page: { display: "flex", flexDirection: "column", gap: 20 },

//   banner: {
//     background: "linear-gradient(135deg, #0a1e45 0%, #0f2d6e 100%)",
//     border: "1px solid rgba(59,130,246,0.2)",
//     borderRadius: 16,
//     padding: "28px",
//     display: "flex", gap: 24, alignItems: "flex-start",
//     boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
//     flexWrap: "wrap",
//   },
//   bannerLeft: { flex: 1, minWidth: 200 },
//   eyebrow: {
//     display: "inline-flex", alignItems: "center", gap: 7,
//     background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.2)",
//     color: "#60a5fa", fontSize: 11, fontWeight: 600,
//     padding: "4px 12px", borderRadius: 20, marginBottom: 12,
//   },
//   liveDot: {
//     width: 6, height: 6, borderRadius: "50%", background: "#4ade80",
//     display: "inline-block", flexShrink: 0,
//   },
//   greet:    { color: "#f1f5f9", fontSize: 24, fontWeight: 800, marginBottom: 6, lineHeight: 1.2 },
//   greetSub: { color: "#4a6fa5", fontSize: 13, marginBottom: 20, lineHeight: 1.6 },
//   ctaBtn: {
//     background: "#3b82f6", color: "#fff",
//     border: "none", borderRadius: 10,
//     padding: "10px 22px", fontSize: 13, fontWeight: 700,
//     cursor: "pointer",
//     boxShadow: "0 4px 16px rgba(59,130,246,0.35)",
//     transition: "opacity 0.15s",
//   },

//   bannerRight: { display: "flex", gap: 12, flexWrap: "wrap" },

//   nextCard: {
//     background: "rgba(255,255,255,0.05)",
//     border: "1px solid rgba(255,255,255,0.1)",
//     borderRadius: 12, padding: "14px 20px", minWidth: 160,
//   },
//   ncLabel: { color: "#2d5091", fontSize: 9, textTransform: "uppercase", letterSpacing: 1.5, fontWeight: 700, marginBottom: 8 },
//   ncTime:  { color: "#fbbf24", fontSize: 30, fontWeight: 900, lineHeight: 1, marginBottom: 4 },
//   ncRoute: { color: "#4a6fa5", fontSize: 11, marginBottom: 4 },
//   ncEta:   { color: "#4ade80", fontSize: 11, fontWeight: 600 },

//   progressCard: {
//     background: "rgba(255,255,255,0.04)",
//     border: "1px solid rgba(255,255,255,0.08)",
//     borderRadius: 12, padding: "14px 20px", minWidth: 160,
//     display: "flex", flexDirection: "column", gap: 10,
//   },
//   pcLabel:      { color: "#2d5091", fontSize: 9, textTransform: "uppercase", letterSpacing: 1.5, fontWeight: 700 },
//   progressBar:  { height: 8, background: "rgba(255,255,255,0.08)", borderRadius: 4, overflow: "hidden" },
//   progressFill: { height: "100%", background: "linear-gradient(90deg,#3b82f6,#06b6d4)", borderRadius: 4 },
//   pcSub:        { color: "#4a6fa5", fontSize: 11 },


//   secHead:  { display: "flex", justifyContent: "space-between", alignItems: "center" },
//   secTitle: { fontSize: 13, fontWeight: 700, color: "#e2e8f0" },
//   secHint:  { fontSize: 11, color: "#2d5091" },


//   statsGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(4, 1fr)",
//     gap: 14,
//   },
//   statCard: {
//     background: "#0a1628",
//     border: "1px solid rgba(255,255,255,0.06)",
//     borderRadius: 14, padding: "16px",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
//     display: "flex", flexDirection: "column", gap: 4,
//   },
//   statIcon: {
//     width: 42, height: 42, borderRadius: 10,
//     display: "flex", alignItems: "center", justifyContent: "center",
//     marginBottom: 8, flexShrink: 0,
//   },
//   statValue: { fontSize: 18, fontWeight: 800 },
//   statLabel: { fontSize: 12, fontWeight: 600, color: "#64748b" },
//   statSub:   { fontSize: 11, color: "#2d5091" },

//   shortcutGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
//     gap: 12,
//   },
//   scCard: {
//     background: "#0a1628",
//     border: "1px solid rgba(255,255,255,0.06)",
//     borderRadius: 14, padding: "16px 14px",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
//     cursor: "pointer", textAlign: "left",
//     transition: "transform 0.15s, box-shadow 0.15s, border-color 0.15s",
//   },
//   scTop:   { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 },
//   scIcon:  { width: 38, height: 38, background: "rgba(255,255,255,0.05)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 },
//   scBadge: { fontSize: 9, padding: "3px 8px", borderRadius: 10, fontWeight: 700 },
//   scTitle: { fontSize: 12, fontWeight: 700, color: "#e2e8f0", marginBottom: 4 },
//   scDesc:  { fontSize: 10.5, color: "#4a6fa5", lineHeight: 1.5, marginBottom: 10 },
//   scLink:  { fontSize: 11, color: "#3b82f6", fontWeight: 700 },


//   bottomRow: {
//     display: "grid", gridTemplateColumns: "1fr 1fr",
//     gap: 16, paddingBottom: 8,
//   },

  
//   panel: {
//     background: "#0a1628",
//     border: "1px solid rgba(255,255,255,0.06)",
//     borderRadius: 14, padding: "18px 20px",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
//   },
//   panelHead: {
//     display: "flex", justifyContent: "space-between", alignItems: "center",
//     marginBottom: 14,
//   },
//   panelTitle: { fontSize: 13, fontWeight: 700, color: "#e2e8f0" },
//   panelHint:  { fontSize: 10, color: "#2d5091" },

  
//   actRow: {
//     display: "flex", alignItems: "center", gap: 10,
//     padding: "10px 12px", marginBottom: 8,
//     background: "rgba(255,255,255,0.03)",
//     border: "1px solid rgba(255,255,255,0.05)",
//     borderRadius: 10,
//   },
//   actDot:  { width: 7, height: 7, borderRadius: "50%", flexShrink: 0 },
//   actIcon: { fontSize: 15, flexShrink: 0 },
//   actText: { flex: 1, fontSize: 12, color: "#94a3b8", lineHeight: 1.4, minWidth: 0 },
//   actTime: { fontSize: 10, color: "#2d5091", whiteSpace: "nowrap", flexShrink: 0 },

  
//   tcActivePill: {
//     fontSize: 10, fontWeight: 700, color: "#4ade80",
//     background: "rgba(74,222,128,0.12)",
//     border: "1px solid rgba(74,222,128,0.2)",
//     padding: "2px 10px", borderRadius: 20,
//   },
//   tcRow: {
//     display: "flex", justifyContent: "space-between", alignItems: "center",
//     padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,0.04)",
//   },
//   tcLabel: { fontSize: 12, color: "#2d5091" },
//   tcValue: { fontSize: 12, fontWeight: 600, color: "#94a3b8" },
// };

// /* ═══════════════════════════════════════════════════════════
//    GLOBAL CSS
// ═══════════════════════════════════════════════════════════ */
// const GLOBAL_CSS = `
//   *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
//   button { font-family: inherit; }

//   aside::-webkit-scrollbar { width: 3px; }
//   aside::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 3px; }
//   main::-webkit-scrollbar { width: 5px; }
//   main::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 5px; }

//   /* Sidebar item hover */
//   button[style*="4a6fa5"]:hover {
//     background: rgba(59,130,246,0.08) !important;
//     color: #93c5fd !important;
//   }

//   /* Logout hover */
//   button[style*="logoutBtn"]:hover,
//   button[style*="logout"]:hover { color: #ef4444 !important; }

//   /* Shortcut card hover */
//   .sc-card:hover {
//     transform: translateY(-3px) !important;
//     box-shadow: 0 8px 24px rgba(0,0,0,0.4) !important;
//     border-color: rgba(59,130,246,0.4) !important;
//   }

//   /* CTA hover */
//   button[style*="3b82f6"]:hover { opacity: 0.88; }

//   /* Hamburger — hidden on desktop, shown on mobile/tablet */
//   .ham-btn { display: none !important; }

//   /* ─── RESPONSIVE ─── */

//   @media (min-width: 1280px) {
//     aside { position: relative !important; transform: none !important; }
//   }

//   @media (max-width: 1279px) {
//     aside { position: fixed !important; transform: translateX(-100%) !important; }
//     aside[style*="translateX(0)"] { transform: translateX(0) !important; }
//     .ham-btn { display: flex !important; }
//     .status-txt { display: none !important; }
//   }

//   @media (max-width: 1024px) {
//     /* Stats 2-col */
//     div[style*="repeat(4, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; }
//     /* Shortcuts 3-col */
//     .shortcut-grid { grid-template-columns: repeat(3, 1fr) !important; }
//   }

//   @media (max-width: 767px) {
//     .shortcut-grid { grid-template-columns: repeat(2, 1fr) !important; }
//     .bottom-row { grid-template-columns: 1fr !important; }
//     div[style*="repeat(5, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; }
//     div[style*="1fr 1fr"]        { grid-template-columns: 1fr !important; }
//     div[style*="repeat(4, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; }
//     div[style*="bannerRight"]    { display: none !important; }
//     main { padding: 14px !important; }
//     div[style*="tabular-nums"]   { display: none !important; }
//   }

//   @media (max-width: 480px) {
//     div[style*="repeat(3, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; }
//   }
// `;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BusTracking    from "./BusTracking";
import RoutesSchedule from "./RoutesSchedule";
import Announcements  from "./Announcements";
import Complaints     from "./Complaints";
import LostFound      from "./LostFound";

const NAV = [
  { section: "Main",      id: "dashboard",     label: "Dashboard",         icon: "🏠" },
  { section: "Transport", id: "tracking",      label: "Live Tracking",     icon: "📍", badge: null },
  { section: "Transport", id: "routes",        label: "Routes & Schedule", icon: "🗺️" },
  { section: "Transport", id: "announcements", label: "Announcements",     icon: "📣", badge: 1 },
  { section: "Services",  id: "complaints",    label: "Complaints",        icon: "💬" },
  { section: "Services",  id: "lostfound",     label: "Lost & Found",      icon: "🎒" },
  { section: "Account",   id: "profile",       label: "My Profile",        icon: "👤" },
];

const NAV_SECTIONS = ["Main", "Transport", "Services", "Account"];

export default function StudentDashboard() {
  const navigate = useNavigate();

  const [user,   setUser]   = useState(null);
  const [active, setActive] = useState("dashboard");
  const [time,   setTime]   = useState(new Date());
  const [sbOpen, setSbOpen] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (!raw) { navigate("/login"); return; }
    const u = JSON.parse(raw);
    if (u.role !== "student") { navigate("/login"); return; }
    setUser(u);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  if (!user) return null;

  const initials  = user.name
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
    console.log('selectMenu called with id:', id);
    setActive(id);
    setSbOpen(false);
  };

  const PAGE_TITLES = {
    dashboard:     `${greeting()}, ${firstName}!`,
    tracking:      "Live Bus Tracking",
    routes:        "Routes & Schedule",
    announcements: "Announcements",
    complaints:    "Complaints",
    lostfound:     "Lost & Found",
    profile:       "My Profile",
  };

  const renderPage = () => {
    switch (active) {
      case "tracking":      return <BusTracking />;
      case "routes":        return <RoutesSchedule />;
      case "announcements": return <Announcements />;
      case "complaints":    return <Complaints />;
      case "lostfound":     return <LostFound />;
      case "profile":       return <ComingSoon icon="👤" title="My Profile" />;
      default:
        return (
          <DashboardHome
            user={user}
            greeting={greeting}
            firstName={firstName}
            onNavigate={selectMenu}
          />
        );
    }
  };

  return (
    <div style={L.root}>
      <style>{CSS}</style>

      {/* ════ SIDEBAR ════ */}
      <aside style={{ ...L.sidebar, ...(sbOpen ? L.sbOpen : {}) }}>

        {/* Brand */}
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

        {/* Nav */}
        <nav style={sb.nav}>
          {NAV_SECTIONS.map(section => (
            <div key={section} style={{ marginBottom: 6 }}>
              <div style={sb.sectionLabel}>{section}</div>
              {NAV.filter(n => n.section === section).map(item => {
                const on = active === item.id;
                return (
                  <button
                    key={item.id}
                    style={{ ...sb.item, ...(on ? sb.itemOn : {}) }}
                    onClick={() => selectMenu(item.id)}
                  >
                    <span style={sb.itemIcon}>{item.icon}</span>
                    <span style={{ flex: 1, textAlign: "left" }}>{item.label}</span>
                    {item.badge && <span style={sb.badge}>{item.badge}</span>}
                    {on && <span style={sb.activeLine} />}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div style={sb.footer}>
          <div style={sb.divider} />
          <button style={sb.logout} onClick={handleLogout}>
            <span>⎋</span> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile backdrop */}
      {sbOpen && <div style={L.backdrop} onClick={() => setSbOpen(false)} />}

      {/* ════ MAIN ════ */}
      <div style={L.main}>

        {/* Top bar */}
        <header style={tb.bar}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button className="ham-btn" style={tb.ham} onClick={() => setSbOpen(o => !o)}>
              <span style={tb.hamLine} /><span style={tb.hamLine} /><span style={tb.hamLine} />
            </button>
            <div>
              <div style={tb.title}>{PAGE_TITLES[active]}</div>
              <div style={tb.date}>{fmtDate(time)}</div>
            </div>
          </div>

          <div style={tb.right}>
            <div style={tb.clock}>{fmtTime(time)}</div>
            <div style={tb.statusPill}>
              <span style={tb.dot} />
              <span className="status-txt" style={tb.statusTxt}>All buses running</span>
            </div>
            <button style={tb.bell}>
              🔔<span style={tb.bellDot} />
            </button>
            <div style={tb.ava}>{initials}</div>
          </div>
        </header>

        {/* Content */}
        <main style={L.content}>{renderPage()}</main>
      </div>
    </div>
  );
}


function DashboardHome({ user, greeting, firstName, onNavigate }) {

  const SHORTCUTS = [
    { id: "tracking",      icon: "📍", title: "Live Tracking",      desc: "See where your bus is now",       badge: "● Live",   bBg: "rgba(16,185,129,0.15)",  bColor: "#4ade80" },
    { id: "routes",        icon: "🗺️", title: "Routes & Schedules", desc: "Full timetable for all 5 routes", badge: "5 routes", bBg: "rgba(255,255,255,0.06)", bColor: "#94a3b8" },
    { id: "announcements", icon: "📣", title: "Announcements",       desc: "Latest notices from transport",   badge: "1 new",    bBg: "rgba(245,158,11,0.15)",  bColor: "#fbbf24" },
    { id: "complaints",    icon: "💬", title: "Complaints",          desc: "Report or track an issue",        badge: "Open",     bBg: "rgba(255,255,255,0.06)", bColor: "#94a3b8" },
    { id: "lostfound",     icon: "🎒", title: "Lost & Found",        desc: "Search or report lost items",     badge: "Search",   bBg: "rgba(255,255,255,0.06)", bColor: "#94a3b8" },
  ];

  const ACTIVITY = [
    { icon: "📢", text: "Bus MU-03 delayed 15 min — road work near Bondor", time: "10 min ago",  color: "#f59e0b" },
    { icon: "✅", text: "Your complaint #C-041 has been resolved",           time: "2 hours ago", color: "#10b981" },
    { icon: "🚌", text: "Bus MU-01 is now on the Amberkhana route",          time: "Yesterday",   color: "#3b82f6" },
  ];

  return (
    <div style={dh.page}>

      {/* ── Welcome banner ── */}
      <div style={dh.banner}>
        {/* left */}
        <div style={dh.bannerLeft}>
          <div style={dh.eyebrow}>
            <span style={dh.liveDot} />
            Tilagor → MU Campus · Route MU-02
          </div>
          <div style={dh.greet}>👋 {greeting()}, {firstName}!</div>
          <div style={dh.greetSub}>
            Your campus transport hub — track, ride and arrive on time.
          </div>
          <button style={dh.ctaBtn} onClick={() => onNavigate("tracking")}>
            📍 Track My Bus
          </button>
        </div>

        {/* right — next bus + progress */}
        <div style={dh.bannerRight}>
          <div style={dh.nextCard}>
            <div style={dh.ncLabel}>NEXT DEPARTURE</div>
            <div style={dh.ncTime}>07:45</div>
            <div style={dh.ncRoute}>Tilagor Route · MU-02</div>
            <div style={dh.ncEta}>⏱ In approximately 12 minutes</div>
          </div>
          <div style={dh.progressCard}>
            <div style={dh.pcLabel}>ROUTE PROGRESS TODAY</div>
            <div style={dh.progressBar}>
              <div style={{ ...dh.progressFill, width: "57%" }} />
            </div>
            <div style={dh.pcSub}>Stop 4 of 7 — 57% complete</div>
          </div>
        </div>
      </div>

      {/* ── Quick Access ── */}
      <div style={dh.secHead}>
        <span style={dh.secTitle}>Quick Access</span>
        <span style={dh.secHint}>Tap any card to open</span>
      </div>

      <div style={dh.shortcutGrid} className="shortcut-grid">
        {SHORTCUTS.map(sc => (
          <button
            key={sc.id}
            className="sc-card"
            style={dh.scCard}
            onClick={() => { console.log('shortcut clicked:', sc.id); onNavigate(sc.id); }}
          >
            <div style={dh.scTop}>
              <div style={dh.scIcon}>{sc.icon}</div>
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

      {/* ── Bottom row ── */}
      <div style={dh.bottomRow} className="bottom-row">

        {/* Recent activity */}
        <div style={dh.panel}>
          <div style={dh.panelHead}>
            <span style={dh.panelTitle}>Recent Activity</span>
            <span style={dh.panelHint}>Last 24 hours</span>
          </div>
          {ACTIVITY.map((a, i) => (
            <div key={i} style={dh.actRow}>
              <span style={{ ...dh.actDot, background: a.color }} />
              <span style={dh.actIcon}>{a.icon}</span>
              <span style={dh.actText}>{a.text}</span>
              <span style={dh.actTime}>{a.time}</span>
            </div>
          ))}
        </div>

        {/* Transport card */}
        <div style={dh.panel}>
          <div style={dh.panelHead}>
            <span style={dh.panelTitle}>My Transport Card</span>
            <span style={dh.tcActivePill}>● Active</span>
          </div>
          {[
            ["Student Name",    user.name],
            ["Student ID",      `#${user.studentId}`],
            ["Assigned Route",  "Tilagor · MU-02", "#60a5fa"],
            ["Trips This Month","23 trips"],
            ["On-Time Rate",    "96%", "#4ade80"],
          ].map(([label, value, color]) => (
            <div key={label} style={dh.tcRow}>
              <span style={dh.tcLabel}>{label}</span>
              <span style={{ ...dh.tcValue, ...(color ? { color } : {}) }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


function ComingSoon({ icon, title }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"60%", gap:12 }}>
      <div style={{ fontSize: 56 }}>{icon}</div>
      <div style={{ fontSize: 20, fontWeight: 700, color: "#e2e8f0" }}>{title}</div>
      <div style={{ fontSize: 14, color: "#4a6fa5" }}>This section is coming soon — stay tuned!</div>
    </div>
  );
}


const L = {
  root: {
    display: "flex",
    height: "100vh",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    background: "#0d1b2e",       
    overflow: "hidden",
    color: "#e2e8f0",
  },
  sidebar: {
    width: 248,
    flexShrink: 0,
    background: "#060f1e",      
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    borderRight: "1px solid rgba(255,255,255,0.05)",
    zIndex: 200,
    transition: "transform 0.25s ease",
  },
  sbOpen: {
    position: "fixed",
    transform: "translateX(0)",
  },
  backdrop: {
    position: "fixed", inset: 0,
    background: "rgba(0,0,0,0.55)",
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


const sb = {
  brand: {
    display: "flex", alignItems: "center", gap: 10,
    padding: "20px 16px 16px",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  },
  brandIcon: {
    width: 36, height: 36,
    background: "rgba(59,130,246,0.18)",
    border: "1px solid rgba(96,165,250,0.28)",
    borderRadius: 10,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 18, flexShrink: 0,
  },
  brandName: { color: "#f1f5f9", fontSize: 15, fontWeight: 800 },
  brandSub:  { color: "#2d5091", fontSize: 10, marginTop: 1 },

  userCard: {
    display: "flex", alignItems: "center", gap: 10,
    padding: "12px 16px",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    background: "rgba(255,255,255,0.02)",
  },
  avatar: {
    width: 38, height: 38, borderRadius: "50%",
    background: "linear-gradient(135deg,#1d4ed8,#3b82f6)",
    border: "2px solid rgba(96,165,250,0.3)",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#fff", fontSize: 13, fontWeight: 700, flexShrink: 0,
  },
  userName: {
    color: "#cbd5e1", fontSize: 12, fontWeight: 600,
    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 140,
  },
  rolePill: {
    background: "rgba(59,130,246,0.18)", border: "1px solid rgba(96,165,250,0.2)",
    color: "#60a5fa", fontSize: 9, fontWeight: 700,
    padding: "2px 8px", borderRadius: 20,
    textTransform: "uppercase", letterSpacing: 0.5,
  },
  userId: { color: "#2d5091", fontSize: 10 },

  nav:          { flex: 1, overflowY: "auto", padding: "10px 10px" },
  sectionLabel: {
    fontSize: 9, fontWeight: 700, color: "#1e3a6e",
    textTransform: "uppercase", letterSpacing: 1.4,
    padding: "10px 8px 4px",
  },
  item: {
    display: "flex", alignItems: "center", gap: 9,
    width: "100%", padding: "9px 8px",
    background: "transparent", border: "none",
    borderRadius: 8, color: "#4a6fa5",
    fontSize: 12.5, fontWeight: 500,
    cursor: "pointer", transition: "all 0.14s",
    position: "relative", marginBottom: 2,
  },
  itemOn: {
    background: "rgba(59,130,246,0.12)",
    color: "#93c5fd", fontWeight: 600,
  },
  itemIcon:   { fontSize: 14, width: 20, textAlign: "center", flexShrink: 0 },
  badge:      { background: "#ef4444", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 10, flexShrink: 0 },
  activeLine: {
    position: "absolute", right: 0, top: "18%", bottom: "18%",
    width: 3, borderRadius: "3px 0 0 3px", background: "#3b82f6",
  },
  footer:  { padding: "8px 10px 16px" },
  divider: { height: 1, background: "rgba(255,255,255,0.04)", marginBottom: 10 },
  logout: {
    display: "flex", alignItems: "center", gap: 8,
    width: "100%", padding: "9px 8px",
    background: "transparent", border: "none",
    color: "#4a6fa5", fontSize: 12.5, fontWeight: 500,
    cursor: "pointer", borderRadius: 8, transition: "color 0.15s",
  },
};


const tb = {
  bar: {
    background: "#0a1628",      
    height: 60,
    padding: "0 24px",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    flexShrink: 0,
    gap: 12,
    boxShadow: "0 1px 0 rgba(255,255,255,0.04)",
  },
  title: { fontSize: 15, fontWeight: 700, color: "#f1f5f9" },
  date:  { fontSize: 11, color: "#2d5091", marginTop: 1 },
  right: { display: "flex", alignItems: "center", gap: 10, flexShrink: 0 },

  clock: {
    fontSize: 13, fontWeight: 700, color: "#f59e0b",   
    background: "rgba(245,158,11,0.1)",
    border: "1px solid rgba(245,158,11,0.2)",
    padding: "5px 12px", borderRadius: 8,
    fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap",
  },
  statusPill: {
    display: "flex", alignItems: "center", gap: 6,
    background: "rgba(16,185,129,0.1)",
    border: "1px solid rgba(16,185,129,0.25)",
    padding: "5px 12px", borderRadius: 20,
  },
  dot:       { width: 6, height: 6, borderRadius: "50%", background: "#10b981", flexShrink: 0 },
  statusTxt: { fontSize: 11, color: "#34d399", fontWeight: 600, whiteSpace: "nowrap" },

  bell: {
    position: "relative", width: 36, height: 36,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 9,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 16, cursor: "pointer", flexShrink: 0,
  },
  bellDot: {
    position: "absolute", top: 7, right: 7,
    width: 7, height: 7, borderRadius: "50%",
    background: "#ef4444", border: "1.5px solid #0a1628",
  },
  ava: {
    width: 34, height: 34, borderRadius: "50%",
    background: "linear-gradient(135deg,#1d4ed8,#3b82f6)",
    border: "2px solid rgba(59,130,246,0.35)",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#fff", fontSize: 12, fontWeight: 700, flexShrink: 0,
  },
  ham: {
    flexDirection: "column", gap: 4,
    width: 36, height: 36,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 8, cursor: "pointer", padding: "0 9px",
    alignItems: "center", justifyContent: "center", flexShrink: 0,
  },
  hamLine: { display: "block", height: 2, width: "100%", background: "#94a3b8", borderRadius: 2 },
};

const dh = {
  page: { display: "flex", flexDirection: "column", gap: 20 },

  banner: {
    background: "linear-gradient(135deg, #0a1e45 0%, #0f2d6e 100%)",
    border: "1px solid rgba(59,130,246,0.2)",
    borderRadius: 16,
    padding: "28px",
    display: "flex", gap: 24, alignItems: "flex-start",
    boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
    flexWrap: "wrap",
  },
  bannerLeft: { flex: 1, minWidth: 200 },
  eyebrow: {
    display: "inline-flex", alignItems: "center", gap: 7,
    background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.2)",
    color: "#60a5fa", fontSize: 11, fontWeight: 600,
    padding: "4px 12px", borderRadius: 20, marginBottom: 12,
  },
  liveDot: {
    width: 6, height: 6, borderRadius: "50%", background: "#4ade80",
    display: "inline-block", flexShrink: 0,
  },
  greet:    { color: "#f1f5f9", fontSize: 24, fontWeight: 800, marginBottom: 6, lineHeight: 1.2 },
  greetSub: { color: "#4a6fa5", fontSize: 13, marginBottom: 20, lineHeight: 1.6 },
  ctaBtn: {
    background: "#3b82f6", color: "#fff",
    border: "none", borderRadius: 10,
    padding: "10px 22px", fontSize: 13, fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 4px 16px rgba(59,130,246,0.35)",
    transition: "opacity 0.15s",
  },

  bannerRight: { display: "flex", gap: 12, flexWrap: "wrap" },

  nextCard: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 12, padding: "14px 20px", minWidth: 160,
  },
  ncLabel: { color: "#2d5091", fontSize: 9, textTransform: "uppercase", letterSpacing: 1.5, fontWeight: 700, marginBottom: 8 },
  ncTime:  { color: "#fbbf24", fontSize: 30, fontWeight: 900, lineHeight: 1, marginBottom: 4 },
  ncRoute: { color: "#4a6fa5", fontSize: 11, marginBottom: 4 },
  ncEta:   { color: "#4ade80", fontSize: 11, fontWeight: 600 },

  progressCard: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 12, padding: "14px 20px", minWidth: 160,
    display: "flex", flexDirection: "column", gap: 10,
  },
  pcLabel:      { color: "#2d5091", fontSize: 9, textTransform: "uppercase", letterSpacing: 1.5, fontWeight: 700 },
  progressBar:  { height: 8, background: "rgba(255,255,255,0.08)", borderRadius: 4, overflow: "hidden" },
  progressFill: { height: "100%", background: "linear-gradient(90deg,#3b82f6,#06b6d4)", borderRadius: 4 },
  pcSub:        { color: "#4a6fa5", fontSize: 11 },


  secHead:  { display: "flex", justifyContent: "space-between", alignItems: "center" },
  secTitle: { fontSize: 13, fontWeight: 700, color: "#e2e8f0" },
  secHint:  { fontSize: 11, color: "#2d5091" },


  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 14,
  },
  statCard: {
    background: "#0a1628",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 14, padding: "16px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
    display: "flex", flexDirection: "column", gap: 4,
  },
  statIcon: {
    width: 42, height: 42, borderRadius: 10,
    display: "flex", alignItems: "center", justifyContent: "center",
    marginBottom: 8, flexShrink: 0,
  },
  statValue: { fontSize: 18, fontWeight: 800 },
  statLabel: { fontSize: 12, fontWeight: 600, color: "#64748b" },
  statSub:   { fontSize: 11, color: "#2d5091" },

  shortcutGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: 12,
  },
  scCard: {
    background: "#0a1628",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 14, padding: "16px 14px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
    cursor: "pointer", textAlign: "left",
    transition: "transform 0.15s, box-shadow 0.15s, border-color 0.15s",
  },
  scTop:   { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 },
  scIcon:  { width: 38, height: 38, background: "rgba(255,255,255,0.05)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 },
  scBadge: { fontSize: 9, padding: "3px 8px", borderRadius: 10, fontWeight: 700 },
  scTitle: { fontSize: 12, fontWeight: 700, color: "#e2e8f0", marginBottom: 4 },
  scDesc:  { fontSize: 10.5, color: "#4a6fa5", lineHeight: 1.5, marginBottom: 10 },
  scLink:  { fontSize: 11, color: "#3b82f6", fontWeight: 700 },


  bottomRow: {
    display: "grid", gridTemplateColumns: "1fr 1fr",
    gap: 16, paddingBottom: 8,
  },

  
  panel: {
    background: "#0a1628",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 14, padding: "18px 20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
  },
  panelHead: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    marginBottom: 14,
  },
  panelTitle: { fontSize: 13, fontWeight: 700, color: "#e2e8f0" },
  panelHint:  { fontSize: 10, color: "#2d5091" },

  
  actRow: {
    display: "flex", alignItems: "center", gap: 10,
    padding: "10px 12px", marginBottom: 8,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.05)",
    borderRadius: 10,
  },
  actDot:  { width: 7, height: 7, borderRadius: "50%", flexShrink: 0 },
  actIcon: { fontSize: 15, flexShrink: 0 },
  actText: { flex: 1, fontSize: 12, color: "#94a3b8", lineHeight: 1.4, minWidth: 0 },
  actTime: { fontSize: 10, color: "#2d5091", whiteSpace: "nowrap", flexShrink: 0 },

  
  tcActivePill: {
    fontSize: 10, fontWeight: 700, color: "#4ade80",
    background: "rgba(74,222,128,0.12)",
    border: "1px solid rgba(74,222,128,0.2)",
    padding: "2px 10px", borderRadius: 20,
  },
  tcRow: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,0.04)",
  },
  tcLabel: { fontSize: 12, color: "#2d5091" },
  tcValue: { fontSize: 12, fontWeight: 600, color: "#94a3b8" },
};


const CSS = `
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  button { font-family: inherit; }

  aside::-webkit-scrollbar { width: 3px; }
  aside::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 3px; }
  main::-webkit-scrollbar { width: 5px; }
  main::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 5px; }

  /* Sidebar item hover */
  button[style*="4a6fa5"]:hover {
    background: rgba(59,130,246,0.08) !important;
    color: #93c5fd !important;
  }

  /* Logout hover */
  button[style*="logoutBtn"]:hover,
  button[style*="logout"]:hover { color: #ef4444 !important; }

  /* Shortcut card hover */
  .sc-card:hover {
    transform: translateY(-3px) !important;
    box-shadow: 0 8px 24px rgba(0,0,0,0.4) !important;
    border-color: rgba(59,130,246,0.4) !important;
  }

  /* CTA hover */
  button[style*="3b82f6"]:hover { opacity: 0.88; }

  /* Hamburger — hidden on desktop, shown on mobile/tablet */
  .ham-btn { display: none !important; }

  /* ─── RESPONSIVE ─── */

  @media (min-width: 1280px) {
    aside { position: relative !important; transform: none !important; }
  }

  @media (max-width: 1279px) {
    aside { position: fixed !important; transform: translateX(-100%) !important; }
    aside[style*="translateX(0)"] { transform: translateX(0) !important; }
    .ham-btn { display: flex !important; }
    .status-txt { display: none !important; }
  }

  @media (max-width: 1024px) {
    /* Stats 2-col */
    div[style*="repeat(4, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; }
    /* Shortcuts 3-col */
    .shortcut-grid { grid-template-columns: repeat(3, 1fr) !important; }
  }

  @media (max-width: 767px) {
    .shortcut-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .bottom-row { grid-template-columns: 1fr !important; }
    div[style*="repeat(5, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; }
    div[style*="1fr 1fr"]        { grid-template-columns: 1fr !important; }
    div[style*="repeat(4, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; }
    div[style*="bannerRight"]    { display: none !important; }
    main { padding: 14px !important; }
    div[style*="tabular-nums"]   { display: none !important; }
  }

  @media (max-width: 480px) {
    div[style*="repeat(3, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; }
  }
`;
