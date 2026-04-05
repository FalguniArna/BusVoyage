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
  { key: "available",   label: "Seat Available",      icon: "💺", color: "#28A745", light: "#e9f7ef" },
  { key: "standing",    label: "Standing Space Only",  icon: "🧍", color: "#FFA500", light: "#fff8e1" },
  { key: "overcrowded", label: "Overcrowded",          icon: "🔴", color: "#E31E24", light: "#fdecea" },
];

const STATUS_OPTIONS = [
  { key: "not_departed", label: "Not Departed Yet",  icon: "🕐", color: "#607D8B", light: "#eceff1" },
  { key: "running",      label: "Currently Running", icon: "🚌", color: "#004A99", light: "#e3f2fd" },
  { key: "arrived",      label: "Arrived at Campus", icon: "✅", color: "#28A745", light: "#e9f7ef" },
];

export default function Driver() {
  const [currentStop, setCurrentStop] = useState(null);
  const [crowd, setCrowd]             = useState("available");
  const [busStatus, setBusStatus]     = useState("not_departed");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [saved, setSaved]             = useState(false);

  const crowdInfo  = CROWD_OPTIONS.find(c => c.key === crowd);
  const statusInfo = STATUS_OPTIONS.find(s => s.key === busStatus);
  const completedIndex = currentStop ? STOPS.indexOf(currentStop) : -1;

  function handleUpdate() {
    const now = new Date();
    setLastUpdated(now.toLocaleTimeString("en-BD", { hour: "2-digit", minute: "2-digit" }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div style={s.page}>

    
      <div style={s.topbar}>
        <div style={s.topLeft}>
          <div style={s.avatar}>MR</div>
          <div>
            <div style={s.driverName}>Md. Rafiqul Islam</div>
            <div style={s.driverSub}>Bus #MU-04 · Tilagor Route</div>
          </div>
        </div>
        <span style={s.onDuty}>● On Duty</span>
      </div>

      <div style={s.summaryStrip}>
        <SummaryItem label="Bus Status"  badge={`${statusInfo.icon} ${statusInfo.label}`}  bg={statusInfo.light}  color={statusInfo.color} />
        <div style={s.divider} />
        <SummaryItem label="Crowd"       badge={`${crowdInfo.icon} ${crowdInfo.label}`}     bg={crowdInfo.light}   color={crowdInfo.color} />
        <div style={s.divider} />
        <SummaryItem label="Location"    badge={`📍 ${currentStop || "Not set"}`}           bg="#e3f2fd"           color="#004A99" />
      </div>

      {/* Location*/}
      <div style={s.card}>
        <CardHeader icon="📍" title="Current Location" sub="Tap the stop where your bus currently is" />
        <div style={s.stopList}>
          {STOPS.map((stop, i) => {
            const isDone    = i < completedIndex;
            const isCurrent = stop === currentStop;
            return (
              <div key={stop} style={s.stopRow} onClick={() => setCurrentStop(stop)}>
                <div style={s.lineCol}>
                  {i !== 0 && <div style={{ ...s.line, background: isDone || isCurrent ? "#28A745" : "#ddd" }} />}
                  <div style={{
                    ...s.dot,
                    background: isCurrent ? "#004A99" : isDone ? "#28A745" : "#ddd",
                    outline: isCurrent ? "3px solid #b3d0f5" : "none",
                    outlineOffset: "2px",
                    transform: isCurrent ? "scale(1.3)" : "scale(1)",
                  }} />
                  {i !== STOPS.length - 1 && <div style={{ ...s.line, background: isDone ? "#28A745" : "#ddd" }} />}
                </div>
                <div style={{
                  ...s.stopLabel,
                  color: isCurrent ? "#004A99" : isDone ? "#bbb" : "#2D2D2D",
                  textDecoration: isDone ? "line-through" : "none",
                  fontWeight: isCurrent ? "700" : "400",
                }}>
                  {stop}
                  {isCurrent && <span style={s.hereBadge}>← Here</span>}
                </div>
                <div style={{ fontSize: 11, color: i > completedIndex ? "#ccc" : "#28A745" }}>
                  Stop {i + 1}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Seat avail*/}
      <div style={s.card}>
        <CardHeader icon="💺" title="Seat Availability" sub="Update current passenger situation" />
        <div style={s.optionGrid}>
          {CROWD_OPTIONS.map(opt => (
            <OptionBtn
              key={opt.key}
              opt={opt}
              selected={crowd === opt.key}
              onClick={() => setCrowd(opt.key)}
            />
          ))}
        </div>
      </div>
      {/*Bus running */}
      <div style={s.card}>
        <CardHeader icon="🚦" title="Bus Running Status" sub="Let students know your current trip status" />
        <div style={s.optionGrid}>
          {STATUS_OPTIONS.map(opt => (
            <OptionBtn
              key={opt.key}
              opt={opt}
              selected={busStatus === opt.key}
              onClick={() => setBusStatus(opt.key)}
            />
          ))}
        </div>
      </div>

      {lastUpdated && (
        <div style={s.lastUpdated}>✓ Last updated at {lastUpdated}</div>
      )}

      <button
        style={{ ...s.updateBtn, background: saved ? "#28A745" : "#004A99" }}
        onClick={handleUpdate}
      >
        {saved ? "✓ Students Notified!" : "Update & Notify Students"}
      </button>

    </div>
  );
}



function SummaryItem({ label, badge, bg, color }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 90 }}>
      <span style={{ fontSize: 11, color: "#aaa" }}>{label}</span>
      <span style={{ fontSize: 11, fontWeight: "600", padding: "3px 8px", borderRadius: 20, background: bg, color, display: "inline-block" }}>
        {badge}
      </span>
    </div>
  );
}

function CardHeader({ icon, title, sub }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 16 }}>
      <span style={{ fontSize: 22, marginTop: 2 }}>{icon}</span>
      <div>
        <div style={{ fontSize: 15, fontWeight: "700", color: "#2D2D2D" }}>{title}</div>
        <div style={{ fontSize: 12, color: "#aaa", marginTop: 2 }}>{sub}</div>
      </div>
    </div>
  );
}

function OptionBtn({ opt, selected, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        border: `2px solid ${selected ? opt.color : "#e0e0e0"}`,
        borderRadius: 10,
        padding: "14px 8px",
        textAlign: "center",
        cursor: "pointer",
        background: selected ? opt.light : "#fafafa",
        boxShadow: selected ? `0 0 0 2px ${opt.color}33` : "none",
        transition: "all 0.15s",
      }}
    >
      <div style={{ fontSize: 22, marginBottom: 6 }}>{opt.icon}</div>
      <div style={{ fontSize: 11, lineHeight: 1.3, color: selected ? opt.color : "#666", fontWeight: selected ? "700" : "400" }}>
        {opt.label}
      </div>
    </div>
  );
}

const s = {
  page: {
    background: "#F8F9FA", fontFamily: "Arial, Helvetica, sans-serif",
    minHeight: "100vh", padding: "20px",
    maxWidth: "500px", margin: "0 auto", paddingBottom: "40px",
  },
  topbar: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    background: "#004A99", borderRadius: "12px",
    padding: "14px 20px", marginBottom: "14px",
  },
  topLeft: { display: "flex", alignItems: "center", gap: "12px" },
  avatar: {
    width: 42, height: 42, borderRadius: "50%", background: "#3A86FF",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: "700", fontSize: 14, color: "#fff",
  },
  driverName: { fontSize: 15, fontWeight: "700", color: "#fff" },
  driverSub:  { fontSize: 12, color: "#a8c8ff", marginTop: 2 },
  onDuty:     { fontSize: 12, color: "#90ee90", fontWeight: "600" },

  summaryStrip: {
    background: "#fff", borderRadius: "10px", padding: "12px 16px",
    marginBottom: "14px", display: "flex", alignItems: "center",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)", gap: "8px", flexWrap: "wrap",
  },
  divider: { width: 1, height: 36, background: "#f0f0f0" },

  card: {
    background: "#fff", borderRadius: "12px", padding: "18px 20px",
    marginBottom: "14px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },

  stopList: { display: "flex", flexDirection: "column" },
  stopRow: {
    display: "flex", alignItems: "center", gap: 12,
    cursor: "pointer", padding: "2px 4px", borderRadius: 6,
  },
  lineCol: { display: "flex", flexDirection: "column", alignItems: "center", width: 16, flexShrink: 0 },
  line:    { width: 2, height: 14 },
  dot:     { width: 14, height: 14, borderRadius: "50%", flexShrink: 0, transition: "all 0.2s" },
  stopLabel: { flex: 1, fontSize: 14, padding: "6px 0", transition: "all 0.15s" },
  hereBadge: {
    marginLeft: 8, fontSize: 11, background: "#004A99",
    color: "#fff", padding: "2px 8px", borderRadius: 20, fontWeight: "600",
  },

  optionGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 },

  lastUpdated: { textAlign: "center", fontSize: 12, color: "#28A745", marginBottom: 10 },
  updateBtn: {
    width: "100%", color: "#fff", border: "none", borderRadius: 10,
    padding: "14px", fontSize: 15, fontWeight: "700",
    cursor: "pointer", transition: "background 0.2s",
  },
};