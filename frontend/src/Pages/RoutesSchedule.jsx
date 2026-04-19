export default function RoutesSchedule() {
  const ROUTES = [
    { name: "MU-01", path: "Tilagor ↔ Campus", first: "07:00 AM", last: "06:00 PM", frequency: "Every 30 min" },
    { name: "MU-02", path: "Sylhet Gate ↔ Campus", first: "07:15 AM", last: "06:15 PM", frequency: "Every 35 min" },
    { name: "MU-03", path: "Airport ↔ Campus", first: "08:00 AM", last: "05:30 PM", frequency: "Hourly" },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Routes & Schedule</h2>
          <p style={styles.subtitle}>
            Official bus route plan for Metropolitan University students.
          </p>
        </div>
      </div>

      <div style={styles.card}>
        {ROUTES.map(route => (
          <div key={route.name} style={styles.routeRow}>
            <div>
              <div style={styles.routeName}>{route.name}</div>
              <div style={styles.routePath}>{route.path}</div>
            </div>
            <div style={styles.routeInfo}>
              <span>{route.first} - {route.last}</span>
              <span style={styles.frequency}>{route.frequency}</span>
            </div>
          </div>
        ))}
      </div>

      <p style={styles.note}>
        📌 Schedule is subject to change. Check announcements for updates.
      </p>
    </div>
  );
}

const styles = {
  page: {
    display: "flex", flexDirection: "column", gap: "18px",
    paddingBottom: "24px", minWidth: 0,
  },
  header: {
    display: "flex", flexDirection: "column", gap: "6px",
  },
  title: { fontSize: "22px", fontWeight: 800, color: "#e2e8f0", margin: 0 },
  subtitle: { fontSize: "14px", color: "#94a3b8", margin: 0, maxWidth: "560px" },
  card: {
    display: "grid",
    gap: "12px",
    padding: "18px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
  },
  routeRow: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    gap: "12px", padding: "14px 16px",
    background: "rgba(255,255,255,0.03)", borderRadius: "14px",
    flexWrap: "wrap",
  },
  routeName: { fontSize: "15px", fontWeight: 700, color: "#f8fafc" },
  routePath: { fontSize: "13px", color: "#94a3b8", marginTop: "4px" },
  routeInfo: {
    display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px",
    fontSize: "13px", color: "#cbd5e1", minWidth: "140px",
  },
  frequency: { color: "#7dd3fc", fontWeight: 700 },
  note: {
    fontSize: "12px", color: "#94a3b8",
    background: "rgba(255,255,255,0.04)", padding: "14px 16px",
    borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)",
  },
};