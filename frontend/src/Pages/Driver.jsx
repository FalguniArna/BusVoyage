<<<<<<< HEAD
import { useState, useEffect } from "react";

/* ─────────────────────────────────────────────
   Color palette — matched to Home page
   Primary:  #2d3436 (dark charcoal)
   Accent:   #f39c12 (orange — hero floor)
   Red:      #E31E24 (CTA, brand dot)
   Navy:     #0f172a / #001225 (sections)
   Light:    #f1f5f9 (how-it-works bg)
───────────────────────────────────────────── */
=======
// import { useState } from "react";

// const STOPS = [
//   "Tilagor",
//   "Zindabazar",
//   "Bondor",
//   "Amberkhana",
//   "City Centre",
//   "Shibganj",
//   "MU Campus Gate",
// ];

// const CROWD_OPTIONS = [
//   { key: "available",   label: "Seat Available",      icon: "💺", color: "#28A745", light: "#e9f7ef" },
//   { key: "standing",    label: "Standing Space Only",  icon: "🧍", color: "#FFA500", light: "#fff8e1" },
//   { key: "overcrowded", label: "Overcrowded",          icon: "🔴", color: "#E31E24", light: "#fdecea" },
// ];

// const STATUS_OPTIONS = [
//   { key: "not_departed", label: "Not Departed Yet",  icon: "🕐", color: "#607D8B", light: "#eceff1" },
//   { key: "running",      label: "Currently Running", icon: "🚌", color: "#004A99", light: "#e3f2fd" },
//   { key: "arrived",      label: "Arrived at Campus", icon: "✅", color: "#28A745", light: "#e9f7ef" },
// ];

// export default function Driver() {
//   const [currentStop, setCurrentStop] = useState(null);
//   const [crowd, setCrowd]             = useState("available");
//   const [busStatus, setBusStatus]     = useState("not_departed");
//   const [lastUpdated, setLastUpdated] = useState(null);
//   const [saved, setSaved]             = useState(false);

//   const crowdInfo  = CROWD_OPTIONS.find(c => c.key === crowd);
//   const statusInfo = STATUS_OPTIONS.find(s => s.key === busStatus);
//   const completedIndex = currentStop ? STOPS.indexOf(currentStop) : -1;

//   function handleUpdate() {
//     const now = new Date();
//     setLastUpdated(now.toLocaleTimeString("en-BD", { hour: "2-digit", minute: "2-digit" }));
//     setSaved(true);
//     setTimeout(() => setSaved(false), 2500);
//   }

//   return (
//     <div style={s.page}>

    
//       <div style={s.topbar}>
//         <div style={s.topLeft}>
//           <div style={s.avatar}>MR</div>
//           <div>
//             <div style={s.driverName}>Md. Rafiqul Islam</div>
//             <div style={s.driverSub}>Bus #MU-04 · Tilagor Route</div>
//           </div>
//         </div>
//         <span style={s.onDuty}>● On Duty</span>
//       </div>

//       <div style={s.summaryStrip}>
//         <SummaryItem label="Bus Status"  badge={`${statusInfo.icon} ${statusInfo.label}`}  bg={statusInfo.light}  color={statusInfo.color} />
//         <div style={s.divider} />
//         <SummaryItem label="Crowd"       badge={`${crowdInfo.icon} ${crowdInfo.label}`}     bg={crowdInfo.light}   color={crowdInfo.color} />
//         <div style={s.divider} />
//         <SummaryItem label="Location"    badge={`📍 ${currentStop || "Not set"}`}           bg="#e3f2fd"           color="#004A99" />
//       </div>

//       {/* Location*/}
//       <div style={s.card}>
//         <CardHeader icon="📍" title="Current Location" sub="Tap the stop where your bus currently is" />
//         <div style={s.stopList}>
//           {STOPS.map((stop, i) => {
//             const isDone    = i < completedIndex;
//             const isCurrent = stop === currentStop;
//             return (
//               <div key={stop} style={s.stopRow} onClick={() => setCurrentStop(stop)}>
//                 <div style={s.lineCol}>
//                   {i !== 0 && <div style={{ ...s.line, background: isDone || isCurrent ? "#28A745" : "#ddd" }} />}
//                   <div style={{
//                     ...s.dot,
//                     background: isCurrent ? "#004A99" : isDone ? "#28A745" : "#ddd",
//                     outline: isCurrent ? "3px solid #b3d0f5" : "none",
//                     outlineOffset: "2px",
//                     transform: isCurrent ? "scale(1.3)" : "scale(1)",
//                   }} />
//                   {i !== STOPS.length - 1 && <div style={{ ...s.line, background: isDone ? "#28A745" : "#ddd" }} />}
//                 </div>
//                 <div style={{
//                   ...s.stopLabel,
//                   color: isCurrent ? "#004A99" : isDone ? "#bbb" : "#2D2D2D",
//                   textDecoration: isDone ? "line-through" : "none",
//                   fontWeight: isCurrent ? "700" : "400",
//                 }}>
//                   {stop}
//                   {isCurrent && <span style={s.hereBadge}>← Here</span>}
//                 </div>
//                 <div style={{ fontSize: 11, color: i > completedIndex ? "#ccc" : "#28A745" }}>
//                   Stop {i + 1}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Seat avail*/}
//       <div style={s.card}>
//         <CardHeader icon="💺" title="Seat Availability" sub="Update current passenger situation" />
//         <div style={s.optionGrid}>
//           {CROWD_OPTIONS.map(opt => (
//             <OptionBtn
//               key={opt.key}
//               opt={opt}
//               selected={crowd === opt.key}
//               onClick={() => setCrowd(opt.key)}
//             />
//           ))}
//         </div>
//       </div>
//       {/*Bus running */}
//       <div style={s.card}>
//         <CardHeader icon="🚦" title="Bus Running Status" sub="Let students know your current trip status" />
//         <div style={s.optionGrid}>
//           {STATUS_OPTIONS.map(opt => (
//             <OptionBtn
//               key={opt.key}
//               opt={opt}
//               selected={busStatus === opt.key}
//               onClick={() => setBusStatus(opt.key)}
//             />
//           ))}
//         </div>
//       </div>

//       {lastUpdated && (
//         <div style={s.lastUpdated}>✓ Last updated at {lastUpdated}</div>
//       )}

//       <button
//         style={{ ...s.updateBtn, background: saved ? "#28A745" : "#004A99" }}
//         onClick={handleUpdate}
//       >
//         {saved ? "✓ Students Notified!" : "Update & Notify Students"}
//       </button>

//     </div>
//   );
// }



// function SummaryItem({ label, badge, bg, color }) {
//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 90 }}>
//       <span style={{ fontSize: 11, color: "#aaa" }}>{label}</span>
//       <span style={{ fontSize: 11, fontWeight: "600", padding: "3px 8px", borderRadius: 20, background: bg, color, display: "inline-block" }}>
//         {badge}
//       </span>
//     </div>
//   );
// }

// function CardHeader({ icon, title, sub }) {
//   return (
//     <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 16 }}>
//       <span style={{ fontSize: 22, marginTop: 2 }}>{icon}</span>
//       <div>
//         <div style={{ fontSize: 15, fontWeight: "700", color: "#2D2D2D" }}>{title}</div>
//         <div style={{ fontSize: 12, color: "#aaa", marginTop: 2 }}>{sub}</div>
//       </div>
//     </div>
//   );
// }

// function OptionBtn({ opt, selected, onClick }) {
//   return (
//     <div
//       onClick={onClick}
//       style={{
//         border: `2px solid ${selected ? opt.color : "#e0e0e0"}`,
//         borderRadius: 10,
//         padding: "14px 8px",
//         textAlign: "center",
//         cursor: "pointer",
//         background: selected ? opt.light : "#fafafa",
//         boxShadow: selected ? `0 0 0 2px ${opt.color}33` : "none",
//         transition: "all 0.15s",
//       }}
//     >
//       <div style={{ fontSize: 22, marginBottom: 6 }}>{opt.icon}</div>
//       <div style={{ fontSize: 11, lineHeight: 1.3, color: selected ? opt.color : "#666", fontWeight: selected ? "700" : "400" }}>
//         {opt.label}
//       </div>
//     </div>
//   );
// }

// const s = {
//   page: {
//     background: "#F8F9FA", fontFamily: "Arial, Helvetica, sans-serif",
//     minHeight: "100vh", padding: "20px",
//     maxWidth: "500px", margin: "0 auto", paddingBottom: "40px",
//   },
//   topbar: {
//     display: "flex", alignItems: "center", justifyContent: "space-between",
//     background: "#004A99", borderRadius: "12px",
//     padding: "14px 20px", marginBottom: "14px",
//   },
//   topLeft: { display: "flex", alignItems: "center", gap: "12px" },
//   avatar: {
//     width: 42, height: 42, borderRadius: "50%", background: "#3A86FF",
//     display: "flex", alignItems: "center", justifyContent: "center",
//     fontWeight: "700", fontSize: 14, color: "#fff",
//   },
//   driverName: { fontSize: 15, fontWeight: "700", color: "#fff" },
//   driverSub:  { fontSize: 12, color: "#a8c8ff", marginTop: 2 },
//   onDuty:     { fontSize: 12, color: "#90ee90", fontWeight: "600" },

//   summaryStrip: {
//     background: "#fff", borderRadius: "10px", padding: "12px 16px",
//     marginBottom: "14px", display: "flex", alignItems: "center",
//     boxShadow: "0 1px 4px rgba(0,0,0,0.06)", gap: "8px", flexWrap: "wrap",
//   },
//   divider: { width: 1, height: 36, background: "#f0f0f0" },

//   card: {
//     background: "#fff", borderRadius: "12px", padding: "18px 20px",
//     marginBottom: "14px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
//   },

//   stopList: { display: "flex", flexDirection: "column" },
//   stopRow: {
//     display: "flex", alignItems: "center", gap: 12,
//     cursor: "pointer", padding: "2px 4px", borderRadius: 6,
//   },
//   lineCol: { display: "flex", flexDirection: "column", alignItems: "center", width: 16, flexShrink: 0 },
//   line:    { width: 2, height: 14 },
//   dot:     { width: 14, height: 14, borderRadius: "50%", flexShrink: 0, transition: "all 0.2s" },
//   stopLabel: { flex: 1, fontSize: 14, padding: "6px 0", transition: "all 0.15s" },
//   hereBadge: {
//     marginLeft: 8, fontSize: 11, background: "#004A99",
//     color: "#fff", padding: "2px 8px", borderRadius: 20, fontWeight: "600",
//   },

//   optionGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 },

//   lastUpdated: { textAlign: "center", fontSize: 12, color: "#28A745", marginBottom: 10 },
//   updateBtn: {
//     width: "100%", color: "#fff", border: "none", borderRadius: 10,
//     padding: "14px", fontSize: 15, fontWeight: "700",
//     cursor: "pointer", transition: "background 0.2s",
//   },
// };




import { useState } from "react";
>>>>>>> 41eb8645a91cfb9c8bb97ffe0379bf1a7ac5b04e

const STOPS = [
  { name: "Tilagor",        icon: "🏘" },
  { name: "Zindabazar",     icon: "🏙" },
  { name: "Bondor",         icon: "🌉" },
  { name: "Amberkhana",     icon: "🏪" },
  { name: "City Centre",    icon: "🏢" },
  { name: "Shibganj",       icon: "🏫" },
  { name: "MU Campus Gate", icon: "🎓" },
];

<<<<<<< HEAD
const CROWD = [
  { key: "available",   label: "Seats Available", color: "#16a34a", light: "#dcfce7", border: "#86efac" },
  { key: "standing",    label: "Standing Only",   color: "#d97706", light: "#fef3c7", border: "#fcd34d" },
  { key: "overcrowded", label: "Overcrowded",     color: "#E31E24", light: "#fee2e2", border: "#fca5a5" },
];

const STATUS = [
  { key: "not_departed", label: "Not Departed",  color: "#475569", light: "#f1f5f9", border: "#cbd5e1" },
  { key: "running",      label: "On the Road",   color: "#f39c12", light: "#fef3c7", border: "#fcd34d" },
  { key: "arrived",      label: "At Campus",     color: "#16a34a", light: "#dcfce7", border: "#86efac" },
=======
const CROWD_OPTIONS = [
  { key: "available",   label: "Seat Available",    color: "#16A34A", light: "#DCFCE7", border: "#86EFAC" },
  { key: "standing",    label: "Standing Only",      color: "#D97706", light: "#FEF3C7", border: "#FCD34D" },
  { key: "overcrowded", label: "Overcrowded",        color: "#DC2626", light: "#FEE2E2", border: "#FCA5A5" },
];

const STATUS_OPTIONS = [
  { key: "not_departed", label: "Not Departed",      color: "#475569", light: "#F1F5F9", border: "#CBD5E1" },
  { key: "running",      label: "Currently Running", color: "#004A99", light: "#EFF6FF", border: "#93C5FD" },
  { key: "arrived",      label: "Arrived at Campus", color: "#16A34A", light: "#DCFCE7", border: "#86EFAC" },
>>>>>>> 41eb8645a91cfb9c8bb97ffe0379bf1a7ac5b04e
];

export default function DriverDashboard() {
  const [stop,        setStop]        = useState(null);
  const [crowd,       setCrowd]       = useState("available");
  const [status,      setStatus]      = useState("not_departed");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [saved,       setSaved]       = useState(false);
  const [time,        setTime]        = useState(new Date());
  const [sideOpen,    setSideOpen]    = useState(false);

<<<<<<< HEAD
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
=======
  const crowdInfo      = CROWD_OPTIONS.find(c => c.key === crowd);
  const statusInfo     = STATUS_OPTIONS.find(s => s.key === busStatus);
  const completedIndex = currentStop ? STOPS.indexOf(currentStop) : -1;
>>>>>>> 41eb8645a91cfb9c8bb97ffe0379bf1a7ac5b04e

  const cInfo    = CROWD.find(c => c.key === crowd);
  const sInfo    = STATUS.find(s => s.key === status);
  const stopIdx  = stop ? STOPS.findIndex(s => s.name === stop) : -1;
  const progress = stopIdx >= 0 ? Math.round(((stopIdx + 1) / STOPS.length) * 100) : 0;

  const fmt = d => d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const fmtShort = d => d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  const fmtDate  = d => d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  function notify() {
    setLastUpdated(fmtShort(new Date()));
    setSaved(true);
    setTimeout(() => setSaved(false), 2800);
  }

  return (
    <div className="dr-root">
      <style>{CSS}</style>

<<<<<<< HEAD
      {/* ══ MOBILE OVERLAY ══ */}
      {sideOpen && <div className="dr-overlay" onClick={() => setSideOpen(false)} />}

      {/* ══ SIDEBAR ══ */}
      <aside className={`dr-side ${sideOpen ? "dr-side-open" : ""}`}>

        {/* brand */}
        <div className="dr-brand">
          <div className="dr-brand-dot" />
          <div>
            <div className="dr-brand-name">BusVoyage</div>
            <div className="dr-brand-sub">Metropolitan University</div>
          </div>
          <button className="dr-side-close" onClick={() => setSideOpen(false)}>✕</button>
        </div>

        {/* driver profile */}
        <div className="dr-profile">
          <div className="dr-avatar">MR</div>
          <div className="dr-profile-info">
            <div className="dr-profile-name">Md. Rafiqul Islam</div>
            <div className="dr-profile-meta">Bus #MU-04 · Tilagor Route</div>
          </div>
          <div className="dr-duty">
            <span className="dr-duty-dot" />
            On Duty
          </div>
        </div>

        {/* live clock */}
        <div className="dr-clock">
          <div className="dr-clock-time">{fmt(time)}</div>
          <div className="dr-clock-date">{fmtDate(time)}</div>
        </div>

        {/* route progress */}
        <div className="dr-route-box">
          <div className="dr-route-label">Active Route</div>
          <div className="dr-route-name">Tilagor → MU Campus</div>
          <div className="dr-route-meta">7 stops · ~35 min total</div>
          <div className="dr-prog-wrap">
            <div className="dr-prog-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="dr-prog-label">
            {stopIdx >= 0 ? `Stop ${stopIdx + 1} of ${STOPS.length}` : "Not started"} — {progress}%
          </div>
        </div>

        {/* status pills */}
        <div className="dr-sb-pills">
          <div className="dr-sb-pill" style={{ background: sInfo.light, color: sInfo.color, border: `1px solid ${sInfo.border}` }}>
            {sInfo.label}
          </div>
          <div className="dr-sb-pill" style={{ background: cInfo.light, color: cInfo.color, border: `1px solid ${cInfo.border}` }}>
            {cInfo.label}
          </div>
        </div>

        {lastUpdated && (
          <div className="dr-notified">
            <span className="dr-notified-dot" />
            Students notified at {lastUpdated}
          </div>
        )}

        <div style={{ flex: 1 }} />

        {/* tips */}
        <div className="dr-tips">
          <div className="dr-tips-title">Driver Tips</div>
          {[
            "Update your stop every time you depart.",
            "Mark 'At Campus' when you reach MU Gate.",
            "Set crowd level before each departure.",
            "Students see your updates instantly.",
          ].map((tip, i) => (
            <div key={i} className="dr-tip-row">
              <span className="dr-tip-num">{i + 1}</span>
              <span className="dr-tip-text">{tip}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* ══ MAIN ══ */}
      <div className="dr-main">

        {/* top bar */}
        <header className="dr-topbar">
          <div className="dr-topbar-left">
            <button className="dr-hamburger" onClick={() => setSideOpen(true)}>
              <span /><span /><span />
            </button>
            <div>
              <div className="dr-topbar-title">Driver Terminal</div>
              <div className="dr-topbar-sub">Update your bus status in real time</div>
            </div>
          </div>
          <div className="dr-topbar-right">
            <div className="dr-topbar-clock">{fmt(time)}</div>
            <div className="dr-topbar-pill"
              style={{ background: sInfo.light, color: sInfo.color, border: `1px solid ${sInfo.border}` }}>
              {sInfo.label}
            </div>
          </div>
        </header>

        {/* scrollable body */}
        <div className="dr-body">

          {/* ── stat cards ── */}
          <div className="dr-stats">
            {[
              { label: "Bus Status",      value: sInfo.label,                           color: sInfo.color,  light: sInfo.light,  border: sInfo.border  },
              { label: "Crowd Level",     value: cInfo.label,                           color: cInfo.color,  light: cInfo.light,  border: cInfo.border  },
              { label: "Current Stop",    value: stop ?? "Not selected",                color: "#f39c12",    light: "#fef3c7",    border: "#fcd34d"     },
              { label: "Route Progress",  value: `${stopIdx >= 0 ? stopIdx+1 : 0}/${STOPS.length} stops`, color: "#0f172a", light: "#f1f5f9", border: "#cbd5e1" },
            ].map((st, i) => (
              <div key={i} className="dr-stat-card" style={{ borderTop: `3px solid ${st.color}` }}>
                <div className="dr-stat-label">{st.label}</div>
                <span className="dr-stat-val"
                  style={{ background: st.light, color: st.color, border: `1px solid ${st.border}` }}>
                  {st.value}
                </span>
              </div>
            ))}
          </div>

          {/* ── 3-col grid ── */}
          <div className="dr-grid">

            {/* COL 1 — stop tracker */}
            <div className="dr-panel">
              <PanelHead title="Current Location" sub="Tap your current stop" accent="#f39c12" />
              <div className="dr-stops">
                {STOPS.map((s, i) => {
                  const done    = i < stopIdx;
                  const current = s.name === stop;
                  return (
                    <div key={s.name} className="dr-stop-row" onClick={() => setStop(s.name)}>
                      <div className="dr-track-col">
                        {i > 0 && <div className="dr-track-line" style={{ background: done || current ? "#f39c12" : "#e2e8f0" }} />}
                        <div className="dr-track-dot" style={{
                          background: current ? "#f39c12" : done ? "#16a34a" : "#e2e8f0",
                          border: current ? "3px solid #fcd34d" : done ? "3px solid #86efac" : "3px solid #e2e8f0",
                          transform: current ? "scale(1.3)" : "scale(1)",
                          boxShadow: current ? "0 0 0 4px rgba(243,156,18,0.15)" : "none",
                        }} />
                        {i < STOPS.length - 1 && <div className="dr-track-line" style={{ background: done ? "#f39c12" : "#e2e8f0" }} />}
                      </div>
                      <div className="dr-stop-content" style={{
                        background: current ? "#fef3c7" : "transparent",
                        border: current ? "1px solid #fcd34d" : "1px solid transparent",
                      }}>
                        <span style={{ fontSize: 15 }}>{s.icon}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{
                            fontSize: 13, fontWeight: current ? 700 : done ? 400 : 500,
                            color: current ? "#fbbf24" : done ? "#4b5563" : "#e2e8f0",
                            textDecoration: done ? "line-through" : "none",
                          }}>
                            {s.name}
                          </div>
                          {current && <div style={{ fontSize: 9, color: "#d97706", fontWeight: 700, marginTop: 2 }}>You are here</div>}
                        </div>
                        <span style={{ fontSize: 10, fontWeight: 600, color: current ? "#f39c12" : done ? "#16a34a" : "#cbd5e1" }}>
                          {i + 1}/{STOPS.length}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* COL 2 — crowd + status */}
            <div className="dr-col2">

              <div className="dr-panel">
                <PanelHead title="Seat Availability" sub="How crowded is your bus?" accent="#f39c12" />
                <div className="dr-opt-grid">
                  {CROWD.map(opt => (
                    <SelCard key={opt.key} opt={opt} selected={crowd === opt.key} onClick={() => setCrowd(opt.key)} />
                  ))}
=======
      {/* ── TOP NAVBAR ── */}
      <div style={s.navbar}>
        <div style={s.navLeft}>
          <span style={{ fontSize: 20 }}>🚌</span>
          <span style={s.navBrand}>BusVoyage</span>
          <span style={s.navSep}>/</span>
          <span style={s.navPage}>Driver Terminal</span>
        </div>
        <div style={s.navRight}>
          <div style={s.dutyBadge}>
            <span style={s.dutyDot} />
            On Duty
          </div>
          <div style={s.avatarCircle}>MR</div>
          <div>
            <div style={s.navName}>Md. Rafiqul Islam</div>
            <div style={s.navSub}>Bus #MU-04 · Tilagor Route</div>
          </div>
        </div>
      </div>

      {/* ── STAT CARDS ROW ── */}
      <div style={s.statsRow}>
        <StatCard
          label="Bus Status"
          value={statusInfo.label}
          color={statusInfo.color}
          bg={statusInfo.light}
          border={statusInfo.border}
          icon="🚦"
        />
        <StatCard
          label="Crowd Level"
          value={crowdInfo.label}
          color={crowdInfo.color}
          bg={crowdInfo.light}
          border={crowdInfo.border}
          icon="💺"
        />
        <StatCard
          label="Current Stop"
          value={currentStop || "Not selected"}
          color="#004A99"
          bg="#EFF6FF"
          border="#93C5FD"
          icon="📍"
        />
        <StatCard
          label="Route Progress"
          value={currentStop
            ? `${completedIndex + 1} / ${STOPS.length} stops`
            : "0 / " + STOPS.length + " stops"}
          color="#7C3AED"
          bg="#F5F3FF"
          border="#C4B5FD"
          icon="🛣️"
        />
      </div>

      {/* ── MAIN 3-COLUMN GRID ── */}
      <div style={s.grid}>

        {/* COL 1 — Stop selector */}
        <div style={s.card}>
          <CardHeader
            title="Current Location"
            sub="Tap the stop where your bus currently is"
            accent="#004A99"
          />
          <div style={s.stopList}>
            {STOPS.map((stop, i) => {
              const isDone    = i < completedIndex;
              const isCurrent = stop === currentStop;
              const isUpcoming = i > completedIndex;
              return (
                <div
                  key={stop}
                  style={{
                    ...s.stopRow,
                    background: isCurrent ? "#EFF6FF" : "transparent",
                  }}
                  onClick={() => setCurrentStop(stop)}
                >
                  <div style={s.lineCol}>
                    {i !== 0 && (
                      <div style={{ ...s.lineSegment, background: isDone || isCurrent ? "#16A34A" : "#E2E8F0" }} />
                    )}
                    <div style={{
                      ...s.dot,
                      background: isCurrent ? "#004A99" : isDone ? "#16A34A" : "#E2E8F0",
                      border: isCurrent
                        ? "3px solid #BFDBFE"
                        : isDone ? "3px solid #BBF7D0"
                        : "3px solid #E2E8F0",
                      transform: isCurrent ? "scale(1.25)" : "scale(1)",
                    }} />
                    {i !== STOPS.length - 1 && (
                      <div style={{ ...s.lineSegment, background: isDone ? "#16A34A" : "#E2E8F0" }} />
                    )}
                  </div>
                  <div style={{ flex: 1, padding: "7px 0" }}>
                    <span style={{
                      fontSize: 14,
                      fontWeight: isCurrent ? 700 : 400,
                      color: isCurrent ? "#004A99" : isDone ? "#94A3B8" : "#1E293B",
                      textDecoration: isDone ? "line-through" : "none",
                    }}>
                      {stop}
                    </span>
                    {isCurrent && <span style={s.hereBadge}>Here</span>}
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 600,
                    color: isUpcoming ? "#CBD5E1" : isCurrent ? "#004A99" : "#16A34A",
                  }}>
                    {i + 1}/{STOPS.length}
                  </span>
>>>>>>> 41eb8645a91cfb9c8bb97ffe0379bf1a7ac5b04e
                </div>
              );
            })}
          </div>
        </div>

        {/* COL 2 — Crowd + Status options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          <div style={s.card}>
            <CardHeader
              title="Seat Availability"
              sub="Update current passenger situation"
              accent="#D97706"
            />
            <div style={s.optionGrid}>
              {CROWD_OPTIONS.map(opt => (
                <OptionCard
                  key={opt.key}
                  opt={opt}
                  selected={crowd === opt.key}
                  onClick={() => setCrowd(opt.key)}
                />
              ))}
            </div>
          </div>

          <div style={s.card}>
            <CardHeader
              title="Bus Running Status"
              sub="Let students know your current trip status"
              accent="#004A99"
            />
            <div style={s.optionGrid}>
              {STATUS_OPTIONS.map(opt => (
                <OptionCard
                  key={opt.key}
                  opt={opt}
                  selected={busStatus === opt.key}
                  onClick={() => setBusStatus(opt.key)}
                />
              ))}
            </div>
          </div>

        </div>

        {/* COL 3 — Summary + Update */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* live summary */}
          <div style={{ ...s.card, background: "linear-gradient(135deg, #003580 0%, #004A99 100%)" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#93C5FD",
              textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>
              Live Summary
            </div>
            <SummaryRow label="Bus"     value="Bus #MU-04"           light />
            <SummaryRow label="Route"   value="Tilagor Route"        light />
            <SummaryRow
              label="Status"
              value={statusInfo.label}
              badge
              color={statusInfo.color}
              bg={statusInfo.light}
              border={statusInfo.border}
              light
            />
            <SummaryRow
              label="Crowd"
              value={crowdInfo.label}
              badge
              color={crowdInfo.color}
              bg={crowdInfo.light}
              border={crowdInfo.border}
              light
            />
            <SummaryRow
              label="Stop"
              value={currentStop || "—"}
              light
            />
            {lastUpdated && (
              <div style={{ marginTop: 14, paddingTop: 12,
                borderTop: "1px solid rgba(255,255,255,0.12)",
                fontSize: 11, color: "#86EFAC", textAlign: "center" }}>
                Last updated at {lastUpdated}
              </div>
<<<<<<< HEAD

              <div className="dr-panel">
                <PanelHead title="Trip Status" sub="Your current trip situation" accent="#2d3436" />
                <div className="dr-opt-grid">
                  {STATUS.map(opt => (
                    <SelCard key={opt.key} opt={opt} selected={status === opt.key} onClick={() => setStatus(opt.key)} />
                  ))}
                </div>
              </div>

              <div className="dr-note-strip">
                Updates are pushed to all students tracking your bus instantly.
              </div>
            </div>

            {/* COL 3 — summary + button */}
            <div className="dr-col3">

              {/* live summary */}
              <div className="dr-summary">
                <div className="dr-sum-head">
                  <span className="dr-sum-live-dot" />
                  Live Summary
                </div>
                {[
                  ["Bus ID",  "Bus #MU-04"],
                  ["Route",   "Tilagor Route"],
                  ["Driver",  "Md. Rafiqul Islam"],
                ].map(([l, v]) => (
                  <div key={l} className="dr-sum-row">
                    <span className="dr-sum-lbl">{l}</span>
                    <span className="dr-sum-val">{v}</span>
                  </div>
                ))}
                <div className="dr-sum-row">
                  <span className="dr-sum-lbl">Status</span>
                  <span className="dr-sum-badge" style={{ color: sInfo.color, background: sInfo.light, border: `1px solid ${sInfo.border}` }}>{sInfo.label}</span>
                </div>
                <div className="dr-sum-row">
                  <span className="dr-sum-lbl">Crowd</span>
                  <span className="dr-sum-badge" style={{ color: cInfo.color, background: cInfo.light, border: `1px solid ${cInfo.border}` }}>{cInfo.label}</span>
                </div>
                <div className="dr-sum-row">
                  <span className="dr-sum-lbl">At Stop</span>
                  <span className="dr-sum-val">{stop ?? "—"}</span>
                </div>
                <div className="dr-sum-row" style={{ border: "none" }}>
                  <span className="dr-sum-lbl">Progress</span>
                  <span className="dr-sum-val">{progress}%</span>
                </div>
                {lastUpdated && (
                  <div className="dr-sum-updated">Notified at {lastUpdated}</div>
                )}
              </div>

              {/* notify button */}
              <button
                className="dr-notify-btn"
                style={{
                  background: saved
                    ? "linear-gradient(135deg,#15803d,#16a34a)"
                    : "linear-gradient(135deg,#2d3436,#1a1a2e)",
                  boxShadow: saved
                    ? "0 6px 24px rgba(22,163,74,0.35)"
                    : "0 6px 24px rgba(45,52,54,0.4)",
                }}
                onClick={notify}
              >
                {saved ? "✓  Students Notified!" : "Update & Notify Students"}
              </button>

              <p className="dr-notify-hint">Tap to push your status live to all students</p>

              {/* watchers */}
              <div className="dr-watchers">
                <div className="dr-watcher-ico">👁</div>
                <div>
                  <div className="dr-watcher-count">24 students</div>
                  <div className="dr-watcher-sub">tracking your bus right now</div>
                </div>
                <span className="dr-live-tag">LIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
=======
            )}
          </div>

          {/* update button */}
          <button
            style={{
              ...s.updateBtn,
              background: saved
                ? "#16A34A"
                : "linear-gradient(135deg, #004A99 0%, #0066CC 100%)",
              boxShadow: saved
                ? "0 4px 20px rgba(22,163,74,0.35)"
                : "0 4px 20px rgba(0,74,153,0.35)",
            }}
            onClick={handleUpdate}
          >
            {saved ? "✓  Students Notified!" : "Update & Notify Students"}
          </button>

          <p style={s.bottomNote}>
            Students see your updates in real time
          </p>

          {/* quick tips */}
          <div style={s.tipsCard}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#475569",
              marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.8 }}>
              Quick Tips
            </div>
            {[
              "Update your stop every time you depart.",
              "Mark 'Arrived' when you reach MU Gate.",
              "Set crowd status before departing each stop.",
            ].map((tip, i) => (
              <div key={i} style={s.tip}>
                <span style={s.tipDot} />
                <span style={{ fontSize: 12, color: "#64748B", lineHeight: 1.5 }}>{tip}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}


function StatCard({ label, value, color, bg, border, icon }) {
  return (
    <div style={{
      flex: 1, background: "#fff", borderRadius: 12,
      padding: "16px 18px",
      border: `1px solid #F1F5F9`,
      boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
    }}>
      <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 600,
        textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8 }}>
        {icon} {label}
      </div>
      <span style={{
        fontSize: 13, fontWeight: 700,
        color, background: bg,
        border: `1px solid ${border}`,
        padding: "4px 12px", borderRadius: 20,
        display: "inline-block",
      }}>
        {value}
      </span>
    </div>
  );
}

function CardHeader({ title, sub, accent }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
        <div style={{ width: 3, height: 16, borderRadius: 2, background: accent, flexShrink: 0 }} />
        <span style={{ fontSize: 15, fontWeight: 700, color: "#0F172A" }}>{title}</span>
      </div>
      <span style={{ fontSize: 12, color: "#94A3B8", paddingLeft: 11 }}>{sub}</span>
>>>>>>> 41eb8645a91cfb9c8bb97ffe0379bf1a7ac5b04e
    </div>
  );
}

<<<<<<< HEAD
/* ── sub-components ── */
function PanelHead({ title, sub, accent }) {
=======
function OptionCard({ opt, selected, onClick }) {
>>>>>>> 41eb8645a91cfb9c8bb97ffe0379bf1a7ac5b04e
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
        <div style={{ width: 4, height: 16, borderRadius: 2, background: accent, flexShrink: 0 }} />
        <span style={{ fontSize: 14, fontWeight: 700, color: "#e2e8f0" }}>{title}</span>
      </div>
      <span style={{ fontSize: 11, color: "#94a3b8", paddingLeft: 12 }}>{sub}</span>
    </div>
  );
}

function SelCard({ opt, selected, onClick }) {
  return (
    <div onClick={onClick} className="dr-sel-card"
      style={{
<<<<<<< HEAD
        border: `2px solid ${selected ? opt.color : "#e2e8f0"}`,
        background: selected ? opt.light : "#fafafa",
        boxShadow: selected ? `0 0 0 3px ${opt.color}22` : "none",
=======
        border: `2px solid ${selected ? opt.color : "#E2E8F0"}`,
        borderRadius: 10, padding: "14px 8px 12px",
        textAlign: "center", cursor: "pointer",
        background: selected ? opt.light : "#FAFAFA",
        boxShadow: selected ? `0 0 0 3px ${opt.color}20` : "none",
        transition: "all 0.15s", userSelect: "none",
>>>>>>> 41eb8645a91cfb9c8bb97ffe0379bf1a7ac5b04e
      }}
    >
      <div style={{
        width: 10, height: 10, borderRadius: "50%",
<<<<<<< HEAD
        background: selected ? opt.color : "#e2e8f0",
        margin: "0 auto 10px",
        boxShadow: selected ? `0 0 0 3px ${opt.color}33` : "none",
      }} />
      <div style={{ fontSize: 11, fontWeight: selected ? 700 : 500, color: selected ? opt.color : "#64748b", lineHeight: 1.4 }}>
=======
        background: selected ? opt.color : "#E2E8F0",
        margin: "0 auto 10px",
        boxShadow: selected ? `0 0 0 3px ${opt.color}30` : "none",
      }} />
      <div style={{
        fontSize: 12, lineHeight: 1.4,
        color: selected ? opt.color : "#64748B",
        fontWeight: selected ? 700 : 400,
      }}>
>>>>>>> 41eb8645a91cfb9c8bb97ffe0379bf1a7ac5b04e
        {opt.label}
      </div>
    </div>
  );
}

<<<<<<< HEAD
/* ══ CSS ══ */
const CSS = `
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.3} }

  /* ── ROOT ── */
  .dr-root {
    display: flex;
    min-height: 100vh;
    font-family: 'Inter','Segoe UI',system-ui,sans-serif;
    background: #1e2530;
  }

  /* ── SIDEBAR ── */
  .dr-side {
    width: 252px;
    background: linear-gradient(180deg, #1a1a2e 0%, #0f172a 50%, #001225 100%);
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    height: 100vh;
    position: sticky;
    top: 0;
    overflow-y: auto;
    border-right: 1px solid rgba(255,255,255,0.06);
    transition: transform 0.28s cubic-bezier(0.4,0,0.2,1);
  }
  .dr-side::-webkit-scrollbar { width: 3px; }
  .dr-side::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 3px; }

  /* ── BRAND ── */
  .dr-brand {
    display: flex; align-items: center; gap: 10px;
    padding: 18px 16px 15px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }
  .dr-brand-dot {
    width: 10px; height: 10px; border-radius: 50%;
    background: #E31E24; flex-shrink: 0;
    animation: pulse 2.5s infinite;
  }
  .dr-brand-name { color: #fff; font-size: 16px; font-weight: 900; letter-spacing: -0.03em; }
  .dr-brand-sub  { color: rgba(255,255,255,0.3); font-size: 10px; margin-top: 1px; }
  .dr-side-close {
    margin-left: auto; background: none; border: none;
    color: rgba(255,255,255,0.4); font-size: 16px; cursor: pointer;
    display: none; padding: 4px;
  }

  /* ── DRIVER PROFILE ── */
  .dr-profile {
    display: flex; align-items: center; gap: 10px;
    padding: 13px 16px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }
  .dr-avatar {
    width: 38px; height: 38px; border-radius: 50%;
    background: linear-gradient(135deg, #2d3436, #f39c12);
    border: 2px solid rgba(243,156,18,0.35);
    display: flex; align-items: center; justify-content: center;
    color: #fff; font-size: 12px; font-weight: 800; flex-shrink: 0;
  }
  .dr-profile-name { color: #e2e8f0; font-size: 12px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .dr-profile-meta { color: rgba(255,255,255,0.3); font-size: 10px; margin-top: 2px; }
  .dr-duty {
    display: flex; align-items: center; gap: 5px;
    background: rgba(22,163,74,0.12);
    border: 1px solid rgba(134,239,172,0.22);
    border-radius: 20px; padding: 4px 9px;
    font-size: 10px; font-weight: 700; color: #4ade80;
    margin-left: auto; flex-shrink: 0; white-space: nowrap;
  }
  .dr-duty-dot {
    width: 6px; height: 6px; border-radius: 50%; background: #4ade80;
    animation: pulse 2s infinite;
  }

  /* ── CLOCK ── */
  .dr-clock {
    padding: 14px 16px 12px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    text-align: center;
  }
  .dr-clock-time { color: #f39c12; font-size: 22px; font-weight: 900; letter-spacing: 1px; font-variant-numeric: tabular-nums; }
  .dr-clock-date { color: rgba(255,255,255,0.28); font-size: 10px; margin-top: 3px; }

  /* ── ROUTE BOX ── */
  .dr-route-box { padding: 14px 16px; border-bottom: 1px solid rgba(255,255,255,0.06); }
  .dr-route-label { color: rgba(255,255,255,0.3); font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 5px; }
  .dr-route-name  { color: #fff; font-size: 13px; font-weight: 700; margin-bottom: 2px; }
  .dr-route-meta  { color: rgba(255,255,255,0.3); font-size: 10px; margin-bottom: 11px; }
  .dr-prog-wrap  { height: 5px; background: rgba(255,255,255,0.07); border-radius: 3px; overflow: hidden; margin-bottom: 5px; }
  .dr-prog-fill  { height: 100%; background: linear-gradient(90deg,#f39c12,#fbbf24); border-radius: 3px; transition: width 0.4s ease; }
  .dr-prog-label { color: rgba(255,255,255,0.3); font-size: 9px; }

  /* ── SIDEBAR PILLS ── */
  .dr-sb-pills { padding: 12px 16px; display: flex; flex-direction: column; gap: 7px; border-bottom: 1px solid rgba(255,255,255,0.06); }
  .dr-sb-pill  { font-size: 11px; font-weight: 600; padding: 5px 12px; border-radius: 20px; text-align: center; }

  .dr-notified { display: flex; align-items: center; gap: 6px; padding: 10px 16px; font-size: 10px; color: #4ade80; }
  .dr-notified-dot { width: 6px; height: 6px; border-radius: 50%; background: #4ade80; flex-shrink: 0; }

  /* ── TIPS ── */
  .dr-tips { padding: 14px 16px; margin: 0 12px; background: rgba(243,156,18,0.07); border-radius: 12px; border: 1px solid rgba(243,156,18,0.15); }
  .dr-tips-title { color: #f39c12; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; }
  .dr-tip-row  { display: flex; gap: 8px; align-items: flex-start; margin-bottom: 8px; }
  .dr-tip-num  { width: 16px; height: 16px; border-radius: 50%; background: rgba(243,156,18,0.18); color: #f39c12; font-size: 9px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
  .dr-tip-text { font-size: 11px; color: rgba(255,255,255,0.4); line-height: 1.5; }

  /* ── MAIN ── */
  .dr-main { flex: 1; display: flex; flex-direction: column; min-width: 0; }

  /* ── TOPBAR ── */
  .dr-topbar {
    background: #fff;
    padding: 0 24px;
    height: 58px;
    display: flex; align-items: center; justify-content: space-between;
    border-bottom: 1px solid #e2e8f0;
    flex-shrink: 0;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    gap: 12px;
  }
  .dr-topbar-left  { display: flex; align-items: center; gap: 12px; }
  .dr-topbar-title { font-size: 16px; font-weight: 800; color: #0f172a; }
  .dr-topbar-sub   { font-size: 10px; color: #94a3b8; margin-top: 1px; }
  .dr-topbar-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
  .dr-topbar-clock { font-size: 12px; font-weight: 700; color: #0f172a; background: #f8fafc; border: 1px solid #e2e8f0; padding: 5px 12px; border-radius: 8px; font-variant-numeric: tabular-nums; }
  .dr-topbar-pill  { font-size: 11px; font-weight: 600; padding: 5px 13px; border-radius: 20px; white-space: nowrap; }

  /* hamburger */
  .dr-hamburger {
    display: none;
    flex-direction: column; gap: 4px;
    background: none; border: none; cursor: pointer; padding: 4px;
  }
  .dr-hamburger span { display: block; width: 20px; height: 2px; background: #0f172a; border-radius: 1px; }

  /* mobile overlay */
  .dr-overlay {
    display: none;
    position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 99;
  }

  /* ── BODY ── */
  .dr-body { flex: 1; overflow-y: auto; padding: 20px 24px 32px; }
  .dr-body::-webkit-scrollbar { width: 5px; }
  .dr-body::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }

  /* ── STATS ── */
  .dr-stats { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; margin-bottom: 20px; }
  .dr-stat-card {
    background: #252d3a; border-radius: 13px; padding: 14px 16px;
    border: 1px solid rgba(255,255,255,0.07);
    box-shadow: 0 1px 4px rgba(0,0,0,0.25);
  }
  .dr-stat-label { font-size: 10px; color: rgba(255,255,255,0.4); font-weight: 600; text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 8px; }
  .dr-stat-val   { font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 20px; display: inline-block; }

  /* ── GRID ── */
  .dr-grid { display: grid; grid-template-columns: 252px 1fr 236px; gap: 16px; align-items: start; }

  /* ── PANEL ── */
  .dr-panel { background: #252d3a; border-radius: 16px; padding: 20px 18px; box-shadow: 0 2px 12px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.07); }

  /* ── STOP TRACKER ── */
  .dr-stops { display: flex; flex-direction: column; }
  .dr-stop-row { display: flex; align-items: stretch; gap: 10px; cursor: pointer; }
  .dr-stop-row:hover .dr-stop-content { background: rgba(243,156,18,0.1) !important; border-color: rgba(243,156,18,0.3) !important; }
  .dr-track-col { display: flex; flex-direction: column; align-items: center; width: 18px; flex-shrink: 0; padding-top: 2px; }
  .dr-track-line{ width: 2px; height: 14px; border-radius: 1px; flex-shrink: 0; }
  .dr-track-dot { width: 14px; height: 14px; border-radius: 50%; flex-shrink: 0; transition: all 0.22s; box-sizing: border-box; }
  .dr-stop-content { flex: 1; display: flex; align-items: center; gap: 8px; padding: 6px 10px; border-radius: 9px; margin: 1px 0; transition: background 0.15s; min-width: 0; }

  /* ── OPTIONS ── */
  .dr-opt-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; }
  .dr-col2     { display: flex; flex-direction: column; gap: 16px; }
  .dr-col3     { display: flex; flex-direction: column; gap: 14px; }

  .dr-sel-card {
    border-radius: 12px; padding: 14px 10px;
    text-align: center; cursor: pointer;
    transition: all 0.18s; user-select: none;
    border: 2px solid #e2e8f0;
  }
  .dr-sel-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.09) !important; }

  /* ── NOTE STRIP ── */
  .dr-note-strip {
    background: #fef3c7; border: 1px solid #fcd34d;
    border-radius: 12px; padding: 12px 14px;
    font-size: 12px; color: #92400e; line-height: 1.5;
  }

  /* ── SUMMARY ── */
  .dr-summary {
    background: linear-gradient(145deg, #1a1a2e 0%, #2d3436 100%);
    border-radius: 16px; padding: 20px 18px;
    box-shadow: 0 8px 32px rgba(45,52,54,0.35);
  }
  .dr-sum-head {
    display: flex; align-items: center; gap: 8px;
    font-size: 11px; font-weight: 700; color: #f39c12;
    text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 16px;
  }
  .dr-sum-live-dot { width: 7px; height: 7px; border-radius: 50%; background: #4ade80; animation: pulse 1.8s infinite; display: inline-block; }
  .dr-sum-row  { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.07); }
  .dr-sum-lbl  { font-size: 11px; color: rgba(255,255,255,0.42); }
  .dr-sum-val  { font-size: 12px; font-weight: 600; color: #fff; }
  .dr-sum-badge{ font-size: 10px; font-weight: 700; padding: 3px 10px; border-radius: 20px; }
  .dr-sum-updated { margin-top: 12px; font-size: 11px; color: #4ade80; text-align: center; }

  /* ── NOTIFY BUTTON ── */
  .dr-notify-btn {
    width: 100%; color: #fff; border: none; border-radius: 13px;
    padding: 15px; font-size: 14px; font-weight: 800; cursor: pointer;
    transition: all 0.22s; letter-spacing: 0.3px; font-family: inherit;
  }
  .dr-notify-btn:hover { transform: translateY(-2px); filter: brightness(1.08); }
  .dr-notify-hint { font-size: 10px; color: #94a3b8; text-align: center; }

  /* ── WATCHERS ── */
  .dr-watchers {
    display: flex; align-items: center; gap: 12px;
    background: #fff; border: 1px solid #e8edf4;
    border-radius: 13px; padding: 13px 15px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  }
  .dr-watcher-ico   { font-size: 20px; }
  .dr-watcher-count { font-size: 14px; font-weight: 800; color: #0f172a; }
  .dr-watcher-sub   { font-size: 10px; color: #94a3b8; }
  .dr-live-tag      { margin-left: auto; background: #fef3c7; color: #d97706; font-size: 9px; font-weight: 800; padding: 3px 8px; border-radius: 6px; letter-spacing: 1px; border: 1px solid #fcd34d; }

  /* ══════════════════════════════
     RESPONSIVE
  ══════════════════════════════ */

  /* Large tablet / small laptop (1100px) */
  @media (max-width: 1100px) {
    .dr-grid  { grid-template-columns: 220px 1fr 210px !important; gap: 12px; }
    .dr-stats { grid-template-columns: repeat(2,1fr) !important; }
    .dr-side  { width: 220px; }
  }

  /* Tablet (900px) */
  @media (max-width: 900px) {
    .dr-grid { grid-template-columns: 1fr 1fr !important; }
    .dr-col3 { grid-column: 1 / -1; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .dr-notify-btn, .dr-notify-hint { grid-column: 1 / -1; }
  }

  /* Tablet portrait (768px) */
  @media (max-width: 768px) {
    .dr-side { position: fixed; z-index: 100; transform: translateX(-100%); height: 100vh; top: 0; left: 0; width: 260px !important; }
    .dr-side-open { transform: translateX(0) !important; }
    .dr-side-close { display: flex !important; }
    .dr-overlay { display: block !important; }
    .dr-hamburger { display: flex !important; }

    .dr-grid  { grid-template-columns: 1fr !important; }
    .dr-col3  { grid-template-columns: 1fr !important; }
    .dr-stats { grid-template-columns: repeat(2,1fr) !important; }
    .dr-opt-grid { grid-template-columns: repeat(3,1fr); }
    .dr-body  { padding: 14px 16px 28px; }
    .dr-topbar { padding: 0 14px; }
  }

  /* Mobile (480px) */
  @media (max-width: 480px) {
    .dr-stats { grid-template-columns: 1fr 1fr !important; }
    .dr-opt-grid { grid-template-columns: 1fr 1fr !important; }
    .dr-topbar-clock { display: none; }
    .dr-body { padding: 12px 12px 24px; }
    .dr-topbar-title { font-size: 14px; }
  }

  /* Small mobile (360px) */
  @media (max-width: 360px) {
    .dr-stats { grid-template-columns: 1fr !important; }
    .dr-topbar-pill { display: none; }
  }
`;
=======
function SummaryRow({ label, value, badge, color, bg, border, light }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "8px 0",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
    }}>
      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>{label}</span>
      {badge ? (
        <span style={{
          fontSize: 11, fontWeight: 700,
          color, background: bg,
          border: `1px solid ${border}`,
          padding: "2px 10px", borderRadius: 20,
        }}>
          {value}
        </span>
      ) : (
        <span style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>{value}</span>
      )}
    </div>
  );
}

const s = {
  page: {
    background: "#F1F5F9",
    fontFamily: "'Segoe UI', Arial, sans-serif",
    minHeight: "100vh",
    padding: "0 0 40px",
  },

  /* navbar */
  navbar: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    background: "#fff",
    borderBottom: "1px solid #E2E8F0",
    padding: "14px 32px",
    marginBottom: 24,
    position: "sticky", top: 0, zIndex: 50,
  },
  navLeft: { display: "flex", alignItems: "center", gap: 10 },
  navBrand: { fontSize: 17, fontWeight: 800, color: "#004A99" },
  navSep: { color: "#CBD5E1", fontSize: 18, margin: "0 2px" },
  navPage: { fontSize: 14, color: "#64748B", fontWeight: 500 },
  navRight: { display: "flex", alignItems: "center", gap: 12 },
  dutyBadge: {
    display: "flex", alignItems: "center", gap: 6,
    background: "#DCFCE7", border: "1px solid #86EFAC",
    borderRadius: 20, padding: "5px 12px",
    fontSize: 12, fontWeight: 600, color: "#16A34A",
  },
  dutyDot: {
    width: 7, height: 7, borderRadius: "50%",
    background: "#16A34A", display: "inline-block",
  },
  avatarCircle: {
    width: 38, height: 38, borderRadius: "50%",
    background: "linear-gradient(135deg, #003580, #004A99)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 13, fontWeight: 700, color: "#fff",
  },
  navName: { fontSize: 13, fontWeight: 700, color: "#0F172A" },
  navSub:  { fontSize: 11, color: "#94A3B8" },

  /* stat cards */
  statsRow: {
    display: "flex", gap: 14,
    padding: "0 32px", marginBottom: 20,
  },

  /* 3-col grid */
  grid: {
    display: "grid",
    gridTemplateColumns: "280px 1fr 260px",
    gap: 16,
    padding: "0 32px",
    alignItems: "start",
  },

  /* card */
  card: {
    background: "#fff", borderRadius: 14,
    padding: "20px 18px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    border: "1px solid #F1F5F9",
  },

  /* stop list */
  stopList: { display: "flex", flexDirection: "column", gap: 2 },
  stopRow: {
    display: "flex", alignItems: "center", gap: 10,
    cursor: "pointer", padding: "2px 8px", borderRadius: 8,
    transition: "background 0.15s",
  },
  lineCol: {
    display: "flex", flexDirection: "column",
    alignItems: "center", width: 18, flexShrink: 0,
  },
  lineSegment: { width: 2, height: 12, borderRadius: 1 },
  dot: {
    width: 14, height: 14, borderRadius: "50%",
    flexShrink: 0, transition: "all 0.2s", boxSizing: "border-box",
  },
  hereBadge: {
    marginLeft: 8, fontSize: 10, fontWeight: 700,
    background: "#004A99", color: "#fff",
    padding: "2px 8px", borderRadius: 20,
  },

  /* option grid */
  optionGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 },

  /* update */
  updateBtn: {
    width: "100%", color: "#fff", border: "none",
    borderRadius: 12, padding: "15px",
    fontSize: 15, fontWeight: 700, cursor: "pointer",
    transition: "all 0.2s", letterSpacing: 0.3,
  },
  bottomNote: {
    textAlign: "center", fontSize: 11,
    color: "#94A3B8", margin: "0",
  },

  /* tips */
  tipsCard: {
    background: "#fff", borderRadius: 14,
    padding: "16px 18px",
    border: "1px solid #F1F5F9",
    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
  },
  tip: {
    display: "flex", gap: 8, alignItems: "flex-start",
    marginBottom: 8,
  },
  tipDot: {
    width: 6, height: 6, borderRadius: "50%",
    background: "#004A99", flexShrink: 0, marginTop: 5,
  },
};
>>>>>>> 41eb8645a91cfb9c8bb97ffe0379bf1a7ac5b04e
