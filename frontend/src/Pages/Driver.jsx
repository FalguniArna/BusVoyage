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

const STOPS = [
  "Tilagor",
  "Zindabazar",
  "Bondor",
  "Amberkhana",
  "City Centre",
  "Shibganj",
  "MU Campus Gate",
];

const CROWD_OPTIONS = [
  { key: "available",   label: "Seat Available",    color: "#16A34A", light: "#DCFCE7", border: "#86EFAC" },
  { key: "standing",    label: "Standing Only",      color: "#D97706", light: "#FEF3C7", border: "#FCD34D" },
  { key: "overcrowded", label: "Overcrowded",        color: "#DC2626", light: "#FEE2E2", border: "#FCA5A5" },
];

const STATUS_OPTIONS = [
  { key: "not_departed", label: "Not Departed",      color: "#475569", light: "#F1F5F9", border: "#CBD5E1" },
  { key: "running",      label: "Currently Running", color: "#004A99", light: "#EFF6FF", border: "#93C5FD" },
  { key: "arrived",      label: "Arrived at Campus", color: "#16A34A", light: "#DCFCE7", border: "#86EFAC" },
];

export default function Driver() {
  const [currentStop, setCurrentStop] = useState(null);
  const [crowd, setCrowd]             = useState("available");
  const [busStatus, setBusStatus]     = useState("not_departed");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [saved, setSaved]             = useState(false);

  const crowdInfo      = CROWD_OPTIONS.find(c => c.key === crowd);
  const statusInfo     = STATUS_OPTIONS.find(s => s.key === busStatus);
  const completedIndex = currentStop ? STOPS.indexOf(currentStop) : -1;

  function handleUpdate() {
    const now = new Date();
    setLastUpdated(now.toLocaleTimeString("en-BD", { hour: "2-digit", minute: "2-digit" }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div style={s.page}>

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

/* ── SUB-COMPONENTS ── */

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
    </div>
  );
}

function OptionCard({ opt, selected, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        border: `2px solid ${selected ? opt.color : "#E2E8F0"}`,
        borderRadius: 10, padding: "14px 8px 12px",
        textAlign: "center", cursor: "pointer",
        background: selected ? opt.light : "#FAFAFA",
        boxShadow: selected ? `0 0 0 3px ${opt.color}20` : "none",
        transition: "all 0.15s", userSelect: "none",
      }}
    >
      <div style={{
        width: 10, height: 10, borderRadius: "50%",
        background: selected ? opt.color : "#E2E8F0",
        margin: "0 auto 10px",
        boxShadow: selected ? `0 0 0 3px ${opt.color}30` : "none",
      }} />
      <div style={{
        fontSize: 12, lineHeight: 1.4,
        color: selected ? opt.color : "#64748B",
        fontWeight: selected ? 700 : 400,
      }}>
        {opt.label}
      </div>
    </div>
  );
}

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

/* ── STYLES ── */
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