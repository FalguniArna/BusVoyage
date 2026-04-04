import { useEffect, useState } from "react";
import axios from "axios";

const crowdColors = {
  "Seats Available": { bg: "#dcfce7", color: "#166534", dot: "#22c55e" },
  "Standing Only":   { bg: "#fef3c7", color: "#92400e", dot: "#f59e0b" },
  "Overcrowded":     { bg: "#fee2e2", color: "#991b1b", dot: "#ef4444" },
  "Unknown":         { bg: "#f1f5f9", color: "#475569", dot: "#94a3b8" },
};

const serviceColors = {
  "Regular":              { bg: "#eff6ff", color: "#1d4ed8" },
  "Tilaghar Shuttle":      { bg: "#f0fdf4", color: "#15803d" },
  "Rikabibazar Shuttle": { bg: "#fdf4ff", color: "#7e22ce" },
  "Darbast Shuttle":     { bg: "#fff7ed", color: "#c2410c" },
};

export default function BusTracking() {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterRoute, setFilterRoute] = useState("All");
  const [filterBus, setFilterBus] = useState("All");
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const fetchBuses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/buses");
      setBuses(res.data);
      setLastUpdated(new Date());
    } catch (err) {
      setError("Could not load bus data. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuses();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchBuses, 30000);
    return () => clearInterval(interval);
  }, []);

  // Get unique bus numbers and routes for filters
  const busNumbers = ["All", ...new Set(buses.map(b => b.busNumber))];
  const routes = ["All", "Regular", "Tilagor Shuttle", "Rickabibazar Shuttle", "Darbesht Shuttle"];

  // Apply filters
  const filtered = buses.filter(b => {
    const matchRoute = filterRoute === "All" || b.serviceType === filterRoute;
    const matchBus = filterBus === "All" || b.busNumber === filterBus;
    return matchRoute && matchBus;
  });

  const activeBuses = filtered.filter(b => b.isActive);
  const scheduledBuses = filtered.filter(b => !b.isActive);

  if (loading) return (
    <div style={styles.loadingWrap}>
      <div style={styles.loadingSpinner} />
      <p style={styles.loadingText}>Loading bus data...</p>
    </div>
  );

  if (error) return (
    <div style={styles.errorWrap}>
      <p style={styles.errorText}>{error}</p>
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
        <button style={styles.refreshBtn} onClick={fetchBuses}>
          ↻ Refresh
        </button>
      </div>

      {/* Summary Pills */}
      <div style={styles.summaryRow}>
        <div style={styles.summaryPill}>
          <div style={{ ...styles.summaryDot, background: "#22c55e" }} />
          <span style={styles.summaryTxt}>
            {activeBuses.length} Active
          </span>
        </div>
        <div style={styles.summaryPill}>
          <div style={{ ...styles.summaryDot, background: "#94a3b8" }} />
          <span style={styles.summaryTxt}>
            {scheduledBuses.length} Scheduled
          </span>
        </div>
        <div style={styles.summaryPill}>
          <div style={{ ...styles.summaryDot, background: "#3b82f6" }} />
          <span style={styles.summaryTxt}>
            {filtered.length} Total
          </span>
        </div>
      </div>

      {/* Filters */}
      <div style={styles.filterRow}>
        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>Service Type</label>
          <select
            style={styles.select}
            value={filterRoute}
            onChange={e => setFilterRoute(e.target.value)}
          >
            {routes.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>Bus Number</label>
          <select
            style={styles.select}
            value={filterBus}
            onChange={e => setFilterBus(e.target.value)}
          >
            {busNumbers.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Buses */}
      {activeBuses.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <div style={styles.sectionDot} />
            <span style={styles.sectionTitle}>Currently Running</span>
          </div>
          <div style={styles.listHeader}>
            <span style={{ flex: 1.2 }}>Bus No. / Type</span>
            <span style={{ flex: 2.5 }}>Route</span>
            <span style={{ flex: 1.2 }}>Current Location</span>
            <span style={{ flex: 1 }}>Driver</span>
            <span style={{ flex: 1 }}>Crowd Status</span>
            <span style={{ flex: 1.2 }}>Comment</span>
          </div>
          {activeBuses.map(bus => (
            <BusRow key={bus._id} bus={bus} />
          ))}
        </div>
      )}

      {/* Scheduled Buses */}
      {scheduledBuses.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <div style={{ ...styles.sectionDot, background: "#94a3b8" }} />
            <span style={styles.sectionTitle}>Scheduled (Not Yet Departed)</span>
          </div>
          <div style={styles.listHeader}>
            <span style={{ flex: 1.2 }}>Bus No. / Type</span>
            <span style={{ flex: 2.5 }}>Route</span>
            <span style={{ flex: 1.2 }}>Departure</span>
            <span style={{ flex: 1 }}>Driver</span>
            <span style={{ flex: 1 }}>Status</span>
            <span style={{ flex: 1.2 }}>Service</span>
          </div>
          {scheduledBuses.map(bus => (
            <BusRow key={bus._id} bus={bus} scheduled />
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div style={styles.emptyWrap}>
          <p style={styles.emptyText}>No buses match your filters.</p>
        </div>
      )}

    </div>
  );
}

function BusRow({ bus, scheduled }) {
  const crowd = crowdColors[bus.crowdStatus] || crowdColors["Unknown"];
  const service = serviceColors[bus.serviceType] || serviceColors["Regular"];

  return (
    <div style={{
      ...styles.row,
      borderLeft: scheduled
        ? "3px solid #e2e8f0"
        : "3px solid #22c55e",
      opacity: scheduled ? 0.85 : 1
    }}>

      {/* Bus No + Type */}
      <div style={{ flex: 1.2 }}>
        <div style={styles.busNum}>{bus.busNumber}</div>
        <div style={{
          ...styles.busTypeBadge,
          background: bus.busType === "BRTC" ? "#fef3c7" : "#eff6ff",
          color: bus.busType === "BRTC" ? "#92400e" : "#1d4ed8"
        }}>
          {bus.busType === "BRTC" ? "🚌 BRTC Double Decker" : "🚍 Metro Bus"}
        </div>
      </div>

      {/* Route */}
      <div style={{ flex: 2.5 }}>
        <div style={styles.routeTxt}>{bus.route}</div>
        <div style={{
          ...styles.serviceTag,
          background: service.bg,
          color: service.color
        }}>
          {bus.serviceType}
        </div>
      </div>

      {/* Location or Departure time */}
      <div style={{ flex: 1.2 }}>
        {scheduled ? (
          <div style={styles.depTime}>
            🕐 {bus.departureTime || "—"}
          </div>
        ) : (
          <div style={styles.locationTxt}>
            📍 {bus.currentLocation}
          </div>
        )}
      </div>

      {/* Driver */}
      <div style={{ flex: 1 }}>
        <div style={styles.driverTxt}>👤 {bus.driverName}</div>
      </div>

      {/* Crowd / Status */}
      <div style={{ flex: 1 }}>
        {scheduled ? (
          <div style={styles.scheduledBadge}>Scheduled</div>
        ) : (
          <div style={{
            ...styles.crowdBadge,
            background: crowd.bg,
            color: crowd.color
          }}>
            <div style={{
              ...styles.crowdDot,
              background: crowd.dot
            }} />
            {bus.crowdStatus}
          </div>
        )}
      </div>

      {/* Comment or Service */}
      <div style={{ flex: 1.2 }}>
        <div style={styles.commentTxt}>
          {bus.comment || "—"}
        </div>
      </div>

    </div>
  );
}

const styles = {
  page: {
    padding: "0",
    height: "100%",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },
  header: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between"
  },
  title: { fontSize: "18px", fontWeight: 700, color: "#0f172a", margin: 0 },
  subtitle: { fontSize: "12px", color: "#94a3b8", marginTop: "4px" },
  refreshBtn: {
    padding: "7px 14px",
    background: "#fff",
    border: "0.5px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "13px",
    color: "#3b82f6",
    cursor: "pointer",
    fontWeight: 600
  },
  summaryRow: { display: "flex", gap: "10px" },
  summaryPill: {
    display: "flex", alignItems: "center", gap: "6px",
    background: "#fff",
    border: "0.5px solid #e2e8f0",
    padding: "6px 12px",
    borderRadius: "20px"
  },
  summaryDot: { width: "8px", height: "8px", borderRadius: "50%" },
  summaryTxt: { fontSize: "12px", color: "#475569", fontWeight: 600 },
  filterRow: { display: "flex", gap: "12px", alignItems: "flex-end" },
  filterGroup: { display: "flex", flexDirection: "column", gap: "4px" },
  filterLabel: { fontSize: "11px", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" },
  select: {
    padding: "7px 12px",
    border: "0.5px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "13px",
    color: "#0f172a",
    background: "#fff",
    cursor: "pointer",
    minWidth: "160px"
  },
  section: {
    background: "#fff",
    borderRadius: "12px",
    border: "0.5px solid #e2e8f0",
    overflow: "hidden"
  },
  sectionHeader: {
    display: "flex", alignItems: "center", gap: "8px",
    padding: "12px 16px",
    borderBottom: "0.5px solid #e2e8f0",
    background: "#f8fafc"
  },
  sectionDot: {
    width: "8px", height: "8px",
    borderRadius: "50%", background: "#22c55e"
  },
  sectionTitle: { fontSize: "13px", fontWeight: 700, color: "#0f172a" },
  listHeader: {
    display: "flex",
    padding: "8px 16px",
    background: "#f8fafc",
    borderBottom: "0.5px solid #e2e8f0",
    fontSize: "10px",
    fontWeight: 700,
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    gap: "12px"
  },
  row: {
    display: "flex",
    alignItems: "center",
    padding: "12px 16px",
    borderBottom: "0.5px solid #f1f5f9",
    gap: "12px",
    transition: "background 0.15s"
  },
  busNum: { fontSize: "14px", fontWeight: 700, color: "#0f172a" },
  busTypeBadge: {
    fontSize: "10px", fontWeight: 600,
    padding: "2px 7px", borderRadius: "10px",
    marginTop: "3px", display: "inline-block"
  },
  routeTxt: {
    fontSize: "12px", color: "#334155",
    lineHeight: 1.4, fontWeight: 500
  },
  serviceTag: {
    fontSize: "10px", fontWeight: 600,
    padding: "2px 7px", borderRadius: "10px",
    marginTop: "4px", display: "inline-block"
  },
  depTime: { fontSize: "13px", fontWeight: 600, color: "#0f172a" },
  locationTxt: { fontSize: "12px", color: "#334155", fontWeight: 500 },
  driverTxt: { fontSize: "12px", color: "#475569" },
  crowdBadge: {
    display: "flex", alignItems: "center", gap: "5px",
    fontSize: "11px", fontWeight: 600,
    padding: "4px 8px", borderRadius: "10px"
  },
  crowdDot: { width: "6px", height: "6px", borderRadius: "50%" },
  scheduledBadge: {
    fontSize: "11px", fontWeight: 600,
    color: "#94a3b8", background: "#f1f5f9",
    padding: "4px 8px", borderRadius: "10px",
    display: "inline-block"
  },
  commentTxt: { fontSize: "12px", color: "#94a3b8", fontStyle: "italic" },
  loadingWrap: {
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    height: "200px", gap: "12px"
  },
  loadingText: { fontSize: "14px", color: "#94a3b8" },
  loadingSpinner: {
    width: "28px", height: "28px",
    border: "3px solid #e2e8f0",
    borderTop: "3px solid #3b82f6",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite"
  },
  errorWrap: {
    display: "flex", flexDirection: "column",
    alignItems: "center", gap: "12px", padding: "40px"
  },
  errorText: { fontSize: "14px", color: "#ef4444" },
  retryBtn: {
    padding: "8px 16px", background: "#3b82f6",
    color: "#fff", border: "none",
    borderRadius: "8px", cursor: "pointer"
  },
  emptyWrap: {
    display: "flex", alignItems: "center",
    justifyContent: "center", padding: "40px"
  },
  emptyText: { fontSize: "14px", color: "#94a3b8" }
};