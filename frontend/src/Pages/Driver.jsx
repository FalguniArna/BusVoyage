import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const CROWD = [
  { key: "Seats Available", label: "Seats Available", color: "#16a34a", light: "#dcfce7", border: "#86efac" },
  { key: "Standing Only",   label: "Standing Only",   color: "#d97706", light: "#fef3c7", border: "#fcd34d" },
  { key: "Overcrowded",     label: "Overcrowded",     color: "#E31E24", light: "#fee2e2", border: "#fca5a5" },
];

const STATUS = [
  { key: "not_departed", label: "Not Departed", color: "#475569", light: "#f1f5f9", border: "#cbd5e1" },
  { key: "running",      label: "On the Road",  color: "#f39c12", light: "#fef3c7", border: "#fcd34d" },
  { key: "arrived",      label: "At Campus",    color: "#16a34a", light: "#dcfce7", border: "#86efac" },
];

function parseStops(route) {
  if (!route) return ["Not departed yet"];
  const cleaned = route
    .replace(/→/g, ",")   
    .replace(/–/g, ",")   
    .split(",")
    .map(s => s.trim())
    .filter(s => s.length > 0);
  return ["Not departed yet", ...cleaned, "Arrived at Campus"];
}

export default function DriverDashboard() {
  const navigate = useNavigate();
  const [user, setUser]           = useState(null);
  const [buses, setBuses]         = useState([]);
  const [edits, setEdits]         = useState({});
  const [saving, setSaving]       = useState(null);
  const [saved, setSaved]         = useState(null);
  const [loading, setLoading]     = useState(true);
  const [sideOpen, setSideOpen]   = useState(false);
  const [time, setTime]           = useState(new Date());
  const [activeBus, setActiveBus] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) { navigate("/login"); return; }
    const parsed = JSON.parse(savedUser);
    if (parsed.role !== "driver") { navigate("/login"); return; }
    setUser(parsed);
    fetchMyBuses(parsed.name);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const fetchMyBuses = async (name) => {
    try {
      const res = await axios.get(`${API}/api/buses/driver/${name}`);
      setBuses(res.data);
      // Set active bus to first one by default
      if (res.data.length > 0) setActiveBus(res.data[0]._id);
      // Initialize edits
      const initEdits = {};
      res.data.forEach(b => {
        initEdits[b._id] = {
          isActive:        b.isActive || false,
          currentLocation: b.currentLocation || "Not departed yet",
          crowdStatus:     b.crowdStatus || "Unknown",
          tripStatus:      b.isActive ? "running" : "not_departed",
          comment:         b.comment || "",
        };
      });
      setEdits(initEdits);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (busId, field, value) => {
    setEdits(prev => ({
      ...prev,
      [busId]: { ...prev[busId], [field]: value }
    }));
  };

  const handleSave = async (busId) => {
    setSaving(busId);
    try {
      const edit = edits[busId];
      // Map tripStatus to isActive
      const isActive = edit.tripStatus === "running" || edit.tripStatus === "arrived";
      await axios.patch(`${API}/api/buses/${busId}/status`, {
        isActive,
        currentLocation: edit.currentLocation,
        crowdStatus:     edit.crowdStatus,
        comment:         edit.comment,
      });
      setSaved(busId);
      setTimeout(() => setSaved(null), 3000);
      fetchMyBuses(user.name);
    } catch (err) {
      alert("Failed to update. Please try again.");
    } finally {
      setSaving(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const fmt      = d => d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const fmtShort = d => d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  const fmtDate  = d => d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  // Currently selected bus and its edit state
  const currentBus  = buses.find(b => b._id === activeBus);
  const currentEdit = activeBus ? (edits[activeBus] || {}) : {};
  const cInfo       = CROWD.find(c => c.key === currentEdit.crowdStatus) || CROWD[0];
  const sInfo       = STATUS.find(s => s.key === currentEdit.tripStatus) || STATUS[0];

const busStops = currentBus ? parseStops(currentBus.route) : ["Not departed yet"];
const stopIdx  = busStops.indexOf(currentEdit.currentLocation);
const progress = stopIdx > 0 ? Math.round((stopIdx / (busStops.length - 1)) * 100) : 0;

  if (!user) return null;

  return (
    <div className="dr-root">
      <style>{CSS}</style>

      {sideOpen && <div className="dr-overlay" onClick={() => setSideOpen(false)} />}

      {/* ══ SIDEBAR ══ */}
      <aside className={`dr-side ${sideOpen ? "dr-side-open" : ""}`}>

        <div className="dr-brand">
          <div className="dr-brand-dot" />
          <div>
            <div className="dr-brand-name">BusVoyage</div>
            <div className="dr-brand-sub">Metropolitan University</div>
          </div>
          <button className="dr-side-close" onClick={() => setSideOpen(false)}>✕</button>
        </div>

        <div className="dr-profile">
          <div className="dr-avatar">
            {user.name ? user.name.charAt(0).toUpperCase() : "D"}
          </div>
          <div className="dr-profile-info">
            <div className="dr-profile-name">{user.name}</div>
            <div className="dr-profile-meta">
              {buses.length > 0 ? `${buses.length} bus${buses.length > 1 ? "es" : ""} assigned` : "No buses assigned"}
            </div>
          </div>
          <div className="dr-duty">
            <span className="dr-duty-dot" />
            On Duty
          </div>
        </div>

        <div className="dr-clock">
          <div className="dr-clock-time">{fmt(time)}</div>
          <div className="dr-clock-date">{fmtDate(time)}</div>
        </div>

        {/* Bus selector — if driver has multiple buses */}
        {buses.length > 1 && (
          <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 8 }}>
              Select Bus
            </div>
            {buses.map(b => (
              <div
                key={b._id}
                onClick={() => setActiveBus(b._id)}
                style={{
                  padding: "8px 10px", borderRadius: 8, marginBottom: 4,
                  cursor: "pointer", fontSize: 12, fontWeight: 600,
                  background: activeBus === b._id ? "rgba(243,156,18,0.15)" : "rgba(255,255,255,0.04)",
                  color: activeBus === b._id ? "#f39c12" : "rgba(255,255,255,0.5)",
                  border: `1px solid ${activeBus === b._id ? "rgba(243,156,18,0.3)" : "rgba(255,255,255,0.06)"}`,
                }}
              >
                🚌 {b.busNumber} — {b.serviceType}
              </div>
            ))}
          </div>
        )}

        {currentBus && (
  <div className="dr-route-box">
    <div className="dr-route-label">Active Bus</div>
    <div className="dr-route-name">{currentBus.busNumber}</div>
    <div className="dr-route-meta">{currentBus.route}</div>

    {/* Departure time */}
    {currentBus.departureTime && (
      <div style={{
        marginTop: 8, marginBottom: 10,
        background: "rgba(243,156,18,0.12)",
        border: "1px solid rgba(243,156,18,0.3)",
        borderRadius: 8, padding: "6px 10px",
        display: "flex", alignItems: "center", gap: 6
      }}>
        <span style={{ fontSize: 12 }}>🕐</span>
        <div>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>Scheduled Departure</div>
          <div style={{ fontSize: 14, fontWeight: 800, color: "#f39c12" }}>{currentBus.departureTime}</div>
        </div>
      </div>
    )}

    <div className="dr-prog-wrap">
      <div className="dr-prog-fill" style={{ width: `${progress}%` }} />
    </div>
    <div className="dr-prog-label">
      {currentEdit.currentLocation || "Not started"} — {progress}%
    </div>
  </div>
)}

        <div className="dr-sb-pills">
          <div className="dr-sb-pill" style={{ background: sInfo.light, color: sInfo.color, border: `1px solid ${sInfo.border}` }}>
            {sInfo.label}
          </div>
          <div className="dr-sb-pill" style={{ background: cInfo.light, color: cInfo.color, border: `1px solid ${cInfo.border}` }}>
            {cInfo.label}
          </div>
        </div>

        {saved && (
          <div className="dr-notified">
            <span className="dr-notified-dot" />
            Students notified at {fmtShort(new Date())}
          </div>
        )}

        <div style={{ flex: 1 }} />

        <div className="dr-tips">
          <div className="dr-tips-title">Driver Tips</div>
          {[
            "Update your location every time you depart a stop.",
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

        <div style={{ padding: "14px 16px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <button
            onClick={handleLogout}
            style={{ width: "100%", padding: 9, background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)", borderRadius: 8, cursor: "pointer", fontSize: 13 }}
          >
            ↪ Logout
          </button>
        </div>
      </aside>

      {/* ══ MAIN ══ */}
      <div className="dr-main">

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
            <div className="dr-topbar-pill" style={{ background: sInfo.light, color: sInfo.color, border: `1px solid ${sInfo.border}` }}>
              {sInfo.label}
            </div>
          </div>
        </header>

        <div className="dr-body">

          {loading && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 300, gap: 12 }}>
              <div style={{ width: 32, height: 32, border: "3px solid rgba(255,255,255,0.1)", borderTop: "3px solid #f39c12", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>Loading your buses...</p>
            </div>
          )}

          {!loading && buses.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 24px", color: "rgba(255,255,255,0.3)" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🚍</div>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>No buses assigned</div>
              <div style={{ fontSize: 13 }}>Contact admin to get assigned to a bus.</div>
            </div>
          )}

          {!loading && currentBus && (
            <>
              {/* Stat cards */}
              <div className="dr-stats">
                {[
                  { label: "Bus Number",      value: currentBus.busNumber,                    color: "#f39c12", light: "#fef3c7",    border: "#fcd34d"  },
  { label: "Departure Time",  value: currentBus.departureTime || "Not set",   color: "#f39c12", light: "#fef3c7",    border: "#fcd34d"  },
  { label: "Trip Status",     value: sInfo.label,                             color: sInfo.color, light: sInfo.light, border: sInfo.border },
  { label: "Crowd Level",     value: cInfo.label,                             color: cInfo.color, light: cInfo.light, border: cInfo.border },
  { label: "Current Stop",    value: currentEdit.currentLocation || "Not set", color: "#0f172a", light: "#f1f5f9",   border: "#cbd5e1"  },
                ].map((st, i) => (
                  <div key={i} className="dr-stat-card" style={{ borderTop: `3px solid ${st.color}` }}>
                    <div className="dr-stat-label">{st.label}</div>
                    <span className="dr-stat-val" style={{ background: st.light, color: st.color, border: `1px solid ${st.border}` }}>
                      {st.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* 3-col grid */}
              <div className="dr-grid">

                {/* COL 1 — location */}
                <div className="dr-panel">
                  <PanelHead title="Current Location" sub="Select your current stop" accent="#f39c12" />
                  <div className="dr-stops">
                    {busStops.map((stop, i) => {
                      const done    = i < stopIdx;
                      const current = stop === currentEdit.currentLocation;
                      return (
                        <div key={stop} className="dr-stop-row"
                          onClick={() => handleEdit(activeBus, "currentLocation", stop)}>
                          <div className="dr-track-col">
                            {i > 0 && <div className="dr-track-line" style={{ background: done || current ? "#f39c12" : "#e2e8f0" }} />}
                            <div className="dr-track-dot" style={{
                              background: current ? "#f39c12" : done ? "#16a34a" : "#e2e8f0",
                              border: current ? "3px solid #fcd34d" : done ? "3px solid #86efac" : "3px solid #e2e8f0",
                              transform: current ? "scale(1.3)" : "scale(1)",
                              boxShadow: current ? "0 0 0 4px rgba(243,156,18,0.15)" : "none",
                            }} />
                           {/* i < LOCATION_STOPS.length - 1 && <div className="dr-track-line" style={{ background: done ? "#f39c12" : "#e2e8f0" }} /> */}
                          </div>
                          <div className="dr-stop-content" style={{
                            background: current ? "#fef3c7" : "transparent",
                            border: current ? "1px solid #fcd34d" : "1px solid transparent",
                          }}>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{
                                fontSize: 13, fontWeight: current ? 700 : done ? 400 : 500,
                                color: current ? "#fbbf24" : done ? "#4b5563" : "#e2e8f0",
                                textDecoration: done ? "line-through" : "none",
                              }}>
                                {stop}
                              </div>
                              {current && <div style={{ fontSize: 9, color: "#d97706", fontWeight: 700, marginTop: 2 }}>You are here</div>}
                            </div>
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
                        <SelCard key={opt.key} opt={opt}
                          selected={currentEdit.crowdStatus === opt.key}
                          onClick={() => handleEdit(activeBus, "crowdStatus", opt.key)} />
                      ))}
                    </div>
                  </div>

                  <div className="dr-panel">
                    <PanelHead title="Trip Status" sub="Your current trip situation" accent="#2d3436" />
                    <div className="dr-opt-grid">
                      {STATUS.map(opt => (
                        <SelCard key={opt.key} opt={opt}
                          selected={currentEdit.tripStatus === opt.key}
                          onClick={() => handleEdit(activeBus, "tripStatus", opt.key)} />
                      ))}
                    </div>
                  </div>

                  {/* Comment */}
                  <div className="dr-panel">
                    <PanelHead title="Comment" sub="Optional note for students" accent="#475569" />
                    <input
                      style={{ width: "100%", padding: "9px 12px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e2e8f0", fontSize: 13, fontFamily: "inherit", boxSizing: "border-box" }}
                      placeholder="e.g. Slight delay due to traffic"
                      value={currentEdit.comment || ""}
                      onChange={e => handleEdit(activeBus, "comment", e.target.value)}
                    />
                  </div>

                  <div className="dr-note-strip">
                    Updates are pushed to all students tracking your bus instantly.
                  </div>
                </div>

                {/* COL 3 — summary + save */}
                <div className="dr-col3">

                  <div className="dr-summary">
                    <div className="dr-sum-head">
                      <span className="dr-sum-live-dot" />
                      Live Summary
                    </div>
                    {[
                      ["Bus No.",  currentBus.busNumber],
                      ["Route",   currentBus.route],
                      ["Driver",  user.name],
                      ["Service", currentBus.serviceType],
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
                    <div className="dr-sum-row" style={{ border: "none" }}>
                      <span className="dr-sum-lbl">Location</span>
                      <span className="dr-sum-val" style={{ fontSize: 11 }}>{currentEdit.currentLocation || "—"}</span>
                    </div>
                    {saved === activeBus && (
                      <div className="dr-sum-updated">✅ Updated at {fmtShort(new Date())}</div>
                    )}
                  </div>

                  <button
                    className="dr-notify-btn"
                    style={{
                      background: saved === activeBus
                        ? "linear-gradient(135deg,#15803d,#16a34a)"
                        : "linear-gradient(135deg,#2d3436,#1a1a2e)",
                      boxShadow: saved === activeBus
                        ? "0 6px 24px rgba(22,163,74,0.35)"
                        : "0 6px 24px rgba(45,52,54,0.4)",
                      opacity: saving === activeBus ? 0.7 : 1
                    }}
                    onClick={() => handleSave(activeBus)}
                    disabled={saving === activeBus}
                  >
                    {saving === activeBus ? "Saving..." : saved === activeBus ? "✓ Students Notified!" : "Update & Notify Students"}
                  </button>

                  <p className="dr-notify-hint">Tap to push your status live to all students</p>

                  <div className="dr-watchers">
                    <div className="dr-watcher-ico">👁</div>
                    <div>
                      <div className="dr-watcher-count">Live tracking</div>
                      <div className="dr-watcher-sub">students see updates instantly</div>
                    </div>
                    <span className="dr-live-tag">LIVE</span>
                  </div>

                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function PanelHead({ title, sub, accent }) {
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
        border: `2px solid ${selected ? opt.color : "#e2e8f0"}`,
        background: selected ? opt.light : "#fafafa",
        boxShadow: selected ? `0 0 0 3px ${opt.color}22` : "none",
      }}>
      <div style={{
        width: 10, height: 10, borderRadius: "50%",
        background: selected ? opt.color : "#e2e8f0",
        margin: "0 auto 10px",
        boxShadow: selected ? `0 0 0 3px ${opt.color}33` : "none",
      }} />
      <div style={{ fontSize: 11, fontWeight: selected ? 700 : 500, color: selected ? opt.color : "#64748b", lineHeight: 1.4 }}>
        {opt.label}
      </div>
    </div>
  );
}

const CSS = `
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.3} }
  @keyframes spin { to { transform: rotate(360deg); } }

  .dr-root { display:flex; min-height:100vh; font-family:'Inter','Segoe UI',system-ui,sans-serif; background:#1e2530; }
  .dr-side { width:252px; background:linear-gradient(180deg,#1a1a2e 0%,#0f172a 50%,#001225 100%); display:flex; flex-direction:column; flex-shrink:0; height:100vh; position:sticky; top:0; overflow-y:auto; border-right:1px solid rgba(255,255,255,0.06); transition:transform 0.28s cubic-bezier(0.4,0,0.2,1); }
  .dr-side::-webkit-scrollbar { width:3px; } .dr-side::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.08); border-radius:3px; }
  .dr-brand { display:flex; align-items:center; gap:10px; padding:18px 16px 15px; border-bottom:1px solid rgba(255,255,255,0.07); }
  .dr-brand-dot { width:10px; height:10px; border-radius:50%; background:#E31E24; flex-shrink:0; animation:pulse 2.5s infinite; }
  .dr-brand-name { color:#fff; font-size:16px; font-weight:900; letter-spacing:-0.03em; }
  .dr-brand-sub  { color:rgba(255,255,255,0.3); font-size:10px; margin-top:1px; }
  .dr-side-close { margin-left:auto; background:none; border:none; color:rgba(255,255,255,0.4); font-size:16px; cursor:pointer; display:none; padding:4px; }
  .dr-profile { display:flex; align-items:center; gap:10px; padding:13px 16px; border-bottom:1px solid rgba(255,255,255,0.07); }
  .dr-avatar { width:38px; height:38px; border-radius:50%; background:linear-gradient(135deg,#2d3436,#f39c12); border:2px solid rgba(243,156,18,0.35); display:flex; align-items:center; justify-content:center; color:#fff; font-size:14px; font-weight:800; flex-shrink:0; }
  .dr-profile-name { color:#e2e8f0; font-size:12px; font-weight:600; } .dr-profile-meta { color:rgba(255,255,255,0.3); font-size:10px; margin-top:2px; }
  .dr-duty { display:flex; align-items:center; gap:5px; background:rgba(22,163,74,0.12); border:1px solid rgba(134,239,172,0.22); border-radius:20px; padding:4px 9px; font-size:10px; font-weight:700; color:#4ade80; margin-left:auto; flex-shrink:0; }
  .dr-duty-dot { width:6px; height:6px; border-radius:50%; background:#4ade80; animation:pulse 2s infinite; }
  .dr-clock { padding:14px 16px 12px; border-bottom:1px solid rgba(255,255,255,0.06); text-align:center; }
  .dr-clock-time { color:#f39c12; font-size:22px; font-weight:900; letter-spacing:1px; } .dr-clock-date { color:rgba(255,255,255,0.28); font-size:10px; margin-top:3px; }
  .dr-route-box { padding:14px 16px; border-bottom:1px solid rgba(255,255,255,0.06); }
  .dr-route-label { color:rgba(255,255,255,0.3); font-size:9px; font-weight:700; text-transform:uppercase; letter-spacing:1.2px; margin-bottom:5px; }
  .dr-route-name { color:#fff; font-size:13px; font-weight:700; margin-bottom:2px; } .dr-route-meta { color:rgba(255,255,255,0.3); font-size:10px; margin-bottom:11px; }
  .dr-prog-wrap { height:5px; background:rgba(255,255,255,0.07); border-radius:3px; overflow:hidden; margin-bottom:5px; }
  .dr-prog-fill { height:100%; background:linear-gradient(90deg,#f39c12,#fbbf24); border-radius:3px; transition:width 0.4s ease; }
  .dr-prog-label { color:rgba(255,255,255,0.3); font-size:9px; }
  .dr-sb-pills { padding:12px 16px; display:flex; flex-direction:column; gap:7px; border-bottom:1px solid rgba(255,255,255,0.06); }
  .dr-sb-pill { font-size:11px; font-weight:600; padding:5px 12px; border-radius:20px; text-align:center; }
  .dr-notified { display:flex; align-items:center; gap:6px; padding:10px 16px; font-size:10px; color:#4ade80; }
  .dr-notified-dot { width:6px; height:6px; border-radius:50%; background:#4ade80; flex-shrink:0; }
  .dr-tips { padding:14px 16px; margin:0 12px; background:rgba(243,156,18,0.07); border-radius:12px; border:1px solid rgba(243,156,18,0.15); }
  .dr-tips-title { color:#f39c12; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:1px; margin-bottom:10px; }
  .dr-tip-row { display:flex; gap:8px; align-items:flex-start; margin-bottom:8px; }
  .dr-tip-num { width:16px; height:16px; border-radius:50%; background:rgba(243,156,18,0.18); color:#f39c12; font-size:9px; font-weight:700; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:1px; }
  .dr-tip-text { font-size:11px; color:rgba(255,255,255,0.4); line-height:1.5; }
  .dr-main { flex:1; display:flex; flex-direction:column; min-width:0; }
  .dr-topbar { background:#fff; padding:0 24px; height:58px; display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid #e2e8f0; flex-shrink:0; gap:12px; }
  .dr-topbar-left { display:flex; align-items:center; gap:12px; } .dr-topbar-title { font-size:16px; font-weight:800; color:#0f172a; } .dr-topbar-sub { font-size:10px; color:#94a3b8; margin-top:1px; }
  .dr-topbar-right { display:flex; align-items:center; gap:10px; flex-shrink:0; }
  .dr-topbar-clock { font-size:12px; font-weight:700; color:#0f172a; background:#f8fafc; border:1px solid #e2e8f0; padding:5px 12px; border-radius:8px; }
  .dr-topbar-pill { font-size:11px; font-weight:600; padding:5px 13px; border-radius:20px; white-space:nowrap; }
  .dr-hamburger { display:none; flex-direction:column; gap:4px; background:none; border:none; cursor:pointer; padding:4px; }
  .dr-hamburger span { display:block; width:20px; height:2px; background:#0f172a; border-radius:1px; }
  .dr-overlay { display:none; position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:99; }
  .dr-body { flex:1; overflow-y:auto; padding:20px 24px 32px; }
  .dr-stats { display:grid; grid-template-columns:repeat(5,1fr); gap:12px; margin-bottom:20px; }
  .dr-stat-card { background:#252d3a; border-radius:13px; padding:14px 16px; border:1px solid rgba(255,255,255,0.07); }
  .dr-stat-label { font-size:10px; color:rgba(255,255,255,0.4); font-weight:600; text-transform:uppercase; letter-spacing:0.6px; margin-bottom:8px; }
  .dr-stat-val { font-size:11px; font-weight:700; padding:4px 10px; border-radius:20px; display:inline-block; }
  .dr-grid { display:grid; grid-template-columns:252px 1fr 236px; gap:16px; align-items:start; }
  .dr-panel { background:#252d3a; border-radius:16px; padding:20px 18px; border:1px solid rgba(255,255,255,0.07); }
  .dr-stops { display:flex; flex-direction:column; }
  .dr-stop-row { display:flex; align-items:stretch; gap:10px; cursor:pointer; }
  .dr-stop-row:hover .dr-stop-content { background:rgba(243,156,18,0.1)!important; border-color:rgba(243,156,18,0.3)!important; }
  .dr-track-col { display:flex; flex-direction:column; align-items:center; width:18px; flex-shrink:0; padding-top:2px; }
  .dr-track-line { width:2px; height:14px; border-radius:1px; flex-shrink:0; }
  .dr-track-dot { width:14px; height:14px; border-radius:50%; flex-shrink:0; transition:all 0.22s; box-sizing:border-box; }
  .dr-stop-content { flex:1; display:flex; align-items:center; gap:8px; padding:6px 10px; border-radius:9px; margin:1px 0; transition:background 0.15s; min-width:0; }
  .dr-opt-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
  .dr-col2 { display:flex; flex-direction:column; gap:16px; } .dr-col3 { display:flex; flex-direction:column; gap:14px; }
  .dr-sel-card { border-radius:12px; padding:14px 10px; text-align:center; cursor:pointer; transition:all 0.18s; user-select:none; }
  .dr-sel-card:hover { transform:translateY(-2px); }
  .dr-note-strip { background:#fef3c7; border:1px solid #fcd34d; border-radius:12px; padding:12px 14px; font-size:12px; color:#92400e; line-height:1.5; }
  .dr-summary { background:linear-gradient(145deg,#1a1a2e 0%,#2d3436 100%); border-radius:16px; padding:20px 18px; }
  .dr-sum-head { display:flex; align-items:center; gap:8px; font-size:11px; font-weight:700; color:#f39c12; text-transform:uppercase; letter-spacing:1.2px; margin-bottom:16px; }
  .dr-sum-live-dot { width:7px; height:7px; border-radius:50%; background:#4ade80; animation:pulse 1.8s infinite; display:inline-block; }
  .dr-sum-row { display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.07); }
  .dr-sum-lbl { font-size:11px; color:rgba(255,255,255,0.42); } .dr-sum-val { font-size:12px; font-weight:600; color:#fff; }
  .dr-sum-badge { font-size:10px; font-weight:700; padding:3px 10px; border-radius:20px; }
  .dr-sum-updated { margin-top:12px; font-size:11px; color:#4ade80; text-align:center; }
  .dr-notify-btn { width:100%; color:#fff; border:none; border-radius:13px; padding:15px; font-size:14px; font-weight:800; cursor:pointer; transition:all 0.22s; font-family:inherit; }
  .dr-notify-btn:hover { transform:translateY(-2px); filter:brightness(1.08); }
  .dr-notify-hint { font-size:10px; color:#94a3b8; text-align:center; }
  .dr-watchers { display:flex; align-items:center; gap:12px; background:#fff; border:1px solid #e8edf4; border-radius:13px; padding:13px 15px; }
  .dr-watcher-ico { font-size:20px; } .dr-watcher-count { font-size:14px; font-weight:800; color:#0f172a; } .dr-watcher-sub { font-size:10px; color:#94a3b8; }
  .dr-live-tag { margin-left:auto; background:#fef3c7; color:#d97706; font-size:9px; font-weight:800; padding:3px 8px; border-radius:6px; letter-spacing:1px; border:1px solid #fcd34d; }
  @media(max-width:1100px){ .dr-grid{grid-template-columns:220px 1fr 210px!important;gap:12px;} .dr-stats{grid-template-columns:repeat(2,1fr)!important;} .dr-side{width:220px;} }
  @media(max-width:900px){ .dr-grid{grid-template-columns:1fr 1fr!important;} .dr-col3{grid-column:1/-1;display:grid;grid-template-columns:1fr 1fr;gap:12px;} .dr-notify-btn,.dr-notify-hint{grid-column:1/-1;} }
  @media(max-width:768px){ .dr-side{position:fixed;z-index:100;transform:translateX(-100%);height:100vh;top:0;left:0;width:260px!important;} .dr-side-open{transform:translateX(0)!important;} .dr-side-close{display:flex!important;} .dr-overlay{display:block!important;} .dr-hamburger{display:flex!important;} .dr-grid{grid-template-columns:1fr!important;} .dr-col3{grid-template-columns:1fr!important;} .dr-stats{grid-template-columns:repeat(2,1fr)!important;} .dr-body{padding:14px 16px 28px;} .dr-topbar{padding:0 14px;} }
  @media(max-width:480px){ .dr-stats{grid-template-columns:1fr 1fr!important;} .dr-opt-grid{grid-template-columns:1fr 1fr!important;} .dr-topbar-clock{display:none;} }
`;