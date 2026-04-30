import { useEffect, useState } from "react";
import axios from "axios";

const crowdConfig = {
  "Seats Available": { bg: "#dcfce7", color: "#166534", dot: "#22c55e" },
  "Standing Only":   { bg: "#fef3c7", color: "#92400e", dot: "#f59e0b" },
  "Overcrowded":     { bg: "#fee2e2", color: "#991b1b", dot: "#ef4444" },
  "Unknown":         { bg: "#f1f5f9", color: "#475569", dot: "#94a3b8" },
};

export default function BusTracking() {
  const [activeBuses, setActiveBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [error, setError] = useState("");

  const fetchBuses = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/buses`);
      const active = res.data.filter(
        b => b.isActive === true || b.isActive === "true"
      );
      setActiveBuses(active);
      setLastUpdated(new Date());
      setError("");
    } catch (err) {
      setError("Could not load bus data. Make sure the server is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuses();
    const interval = setInterval(fetchBuses, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return (
    <div style={styles.centered}>
      <div style={styles.spinner} />
      <p style={styles.loadingTxt}>Loading active buses...</p>
    </div>
  );

  if (error) return (
    <div style={styles.centered}>
      <p style={styles.errorTxt}>{error}</p>
      <button style={styles.retryBtn} onClick={fetchBuses}>Retry</button>
    </div>
  );

  return (
    <div style={styles.page}>

      {/* Header */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>🚌 Live Bus Tracking</h2>
          <p style={styles.subtitle}>
            Last updated: {lastUpdated.toLocaleTimeString()} · 
            Auto-refreshes every 30s
          </p>
        </div>
        {/* <button style={styles.refreshBtn} onClick={fetchBuses}>
          ↻ Refresh now
        </button> */}
      </div>

      {/* Status bar */}
      <div style={styles.statusBar}>
        <div style={styles.statusPill}>
          <div style={{
            ...styles.statusDot,
            background: activeBuses.length > 0 ? "#22c55e" : "#94a3b8",
            animation: activeBuses.length > 0 ? "pulseDot 1.5s infinite" : "none"
          }} />
          <span style={styles.statusTxt}>
            {activeBuses.length > 0
              ? `${activeBuses.length} bus${activeBuses.length > 1 ? "es" : ""} currently running`
              : "No buses currently running"}
          </span>
        </div>
      </div>

      {/* No buses running */}
      {activeBuses.length === 0 && (
        <div style={styles.emptyBox}>
          <div style={styles.emptyIcon}>🚌</div>
          <h3 style={styles.emptyTitle}>No buses on the road right now</h3>
          <p style={styles.emptyText}>
            When a driver marks their bus as active, it will appear here automatically.
          </p>
        </div>
      )}

      {/* Active bus list */}
      {activeBuses.length > 0 && (
        <div style={styles.listBox}>

          {/* Table header */}
          <div style={styles.tableHead}>
            <span style={styles.col1}>Bus No. / Type</span>
            <span style={styles.col2}>Route</span>
            <span style={styles.col3}>Current Location</span>
            <span style={styles.col4}>Driver</span>
            <span style={styles.col5}>Crowd Status</span>
            <span style={styles.col6}>Comment</span>
          </div>

          {/* Bus rows */}
          {activeBuses.map((bus, i) => {
            const crowd = crowdConfig[bus.crowdStatus] || crowdConfig["Unknown"];
            return (
              <BusRow key={bus._id} bus={bus} crowd={crowd} index={i} />
            );
          })}

        </div>
      )}

    </div>
  );
}

function BusRow({ bus, crowd, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.row,
        background: hovered ? "#f8fafc" : index % 2 === 0 ? "#fff" : "#fafafa",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Bus number + type */}
      <div style={styles.col1}>
        <div style={styles.busNum}>{bus.busNumber}</div>
        <span style={{
          ...styles.typeBadge,
          background: bus.busType === "BRTC" ? "#fef3c7" : "#eff6ff",
          color: bus.busType === "BRTC" ? "#92400e" : "#1d4ed8",
        }}>
          {bus.busType === "BRTC" ? "🚌 BRTC" : "🚍 Metro"}
        </span>
      </div>

      {/* Route */}
      <div style={styles.col2}>
        <div style={styles.routeTxt}>{bus.route}</div>
        <span style={styles.serviceTag}>{bus.serviceType}</span>
      </div>

      {/* Current location */}
      <div style={styles.col3}>
        <div style={styles.locationTxt}>
          📍 {bus.currentLocation || "Not updated yet"}
        </div>
      </div>

      {/* Driver */}
      <div style={styles.col4}>
        <div style={styles.driverTxt}>👤 {bus.driverName}</div>
      </div>

      {/* Crowd status */}
      <div style={styles.col5}>
        <div style={{
          ...styles.crowdBadge,
          background: crowd.bg,
          color: crowd.color
        }}>
          <div style={{ ...styles.crowdDot, background: crowd.dot }} />
          {bus.crowdStatus}
        </div>
      </div>

      {/* Comment */}
      <div style={styles.col6}>
        <span style={styles.commentTxt}>{bus.comment || "—"}</span>
      </div>
    </div>
  );
}

const col = {
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
  paddingRight: "12px"
};

const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    paddingBottom: "32px",
  },

  centered: {
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    minHeight: "300px", gap: "12px"
  },
  spinner: {
    width: "32px", height: "32px",
    border: "3px solid #e2e8f0",
    borderTop: "3px solid #3b82f6",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite"
  },
  loadingTxt: { color: "#94a3b8", fontSize: "14px" },
  errorTxt: { color: "#ef4444", fontSize: "14px" },
  retryBtn: {
    padding: "8px 20px", background: "#3b82f6",
    color: "#fff", border: "none",
    borderRadius: "8px", cursor: "pointer",
    fontSize: "13px", fontWeight: 600
  },

  header: {
    display: "flex", alignItems: "flex-start",
    justifyContent: "space-between"
  },
  title: { fontSize: "20px", fontWeight: 700, color: "#0f172a", margin: 0 },
  subtitle: { fontSize: "12px", color: "#94a3b8", marginTop: "4px" },
  refreshBtn: {
    padding: "8px 16px", background: "#fff",
    border: "0.5px solid #e2e8f0", borderRadius: "8px",
    fontSize: "13px", color: "#3b82f6",
    cursor: "pointer", fontWeight: 600,
    flexShrink: 0
  },

  statusBar: { display: "flex", alignItems: "center" },
  statusPill: {
    display: "flex", alignItems: "center", gap: "8px",
    background: "#fff", border: "0.5px solid #e2e8f0",
    padding: "8px 16px", borderRadius: "20px"
  },
  statusDot: {
    width: "8px", height: "8px", borderRadius: "50%"
  },
  statusTxt: { fontSize: "13px", color: "#475569", fontWeight: 600 },

  emptyBox: {
    background: "#fff", borderRadius: "12px",
    border: "0.5px solid #e2e8f0",
    padding: "60px 24px",
    display: "flex", flexDirection: "column",
    alignItems: "center", gap: "12px"
  },
  emptyIcon: { fontSize: "48px" },
  emptyTitle: { fontSize: "16px", fontWeight: 700, color: "#0f172a", margin: 0 },
  emptyText: {
    fontSize: "13px", color: "#94a3b8",
    textAlign: "center", maxWidth: "360px", lineHeight: 1.6
  },

  listBox: {
    background: "#fff", borderRadius: "12px",
    border: "0.5px solid #e2e8f0",
    overflow: "hidden"
  },

  tableHead: {
    display: "flex", alignItems: "center",
    padding: "10px 16px",
    background: "#f8fafc",
    borderBottom: "0.5px solid #e2e8f0",
    fontSize: "10px", fontWeight: 700,
    color: "#94a3b8", textTransform: "uppercase",
    letterSpacing: "0.6px"
  },

  row: {
    display: "flex", alignItems: "center",
    padding: "14px 16px",
    borderBottom: "0.5px solid #f1f5f9",
    transition: "background 0.15s",
    borderLeft: "3px solid #22c55e",
  },

  col1: { ...col, width: "110px" },
  col2: { ...col, flex: 1 },
  col3: { ...col, width: "160px" },
  col4: { ...col, width: "100px" },
  col5: { ...col, width: "140px" },
  col6: { ...col, width: "120px", paddingRight: 0 },

  busNum: { fontSize: "14px", fontWeight: 700, color: "#0f172a", marginBottom: "3px" },
  typeBadge: {
    fontSize: "10px", fontWeight: 600,
    padding: "2px 7px", borderRadius: "10px",
    display: "inline-block"
  },
  routeTxt: {
    fontSize: "12px", color: "#334155",
    lineHeight: 1.5, fontWeight: 500, marginBottom: "4px"
  },
  serviceTag: {
    fontSize: "10px", fontWeight: 600,
    padding: "2px 7px", borderRadius: "10px",
    background: "#eff6ff", color: "#1d4ed8",
    display: "inline-block"
  },
  locationTxt: { fontSize: "12px", color: "#334155", fontWeight: 500 },
  driverTxt: { fontSize: "12px", color: "#475569" },
  crowdBadge: {
    display: "inline-flex", alignItems: "center", gap: "5px",
    fontSize: "11px", fontWeight: 600,
    padding: "4px 8px", borderRadius: "10px"
  },
  crowdDot: { width: "6px", height: "6px", borderRadius: "50%", flexShrink: 0 },
  commentTxt: {
    fontSize: "12px", color: "#94a3b8",
    fontStyle: "italic"
  },
};