export default function RoutesSchedule() {
  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Routes & Schedule</h2>
      <p style={styles.subtitle}>
        Official bus schedule provided by Metropolitan University
      </p>
      <div style={styles.imgBox}>
        <img
          src="/schedule.jpeg"
          alt="Bus Schedule"
          style={styles.img}
        />
      </div>
      <p style={styles.note}>
        📌 Schedule is subject to change. Check announcements for updates.
      </p>
    </div>
  );
}

const styles = {
  page: {
    display: "flex", flexDirection: "column", gap: "16px",
    paddingBottom: "24px"
  },
  title: { fontSize: "20px", fontWeight: 700, color: "#0f172a", margin: 0 },
  subtitle: { fontSize: "13px", color: "#94a3b8", marginTop: "2px" },
  imgBox: {
    background: "#fff", borderRadius: "12px",
    border: "0.5px solid #e2e8f0",
    padding: "16px", textAlign: "center"
  },
  img: {
    width: "100%", maxWidth: "900px",
    borderRadius: "8px", cursor: "zoom-in"
  },
  note: {
    fontSize: "12px", color: "#94a3b8",
    background: "#fff", padding: "12px 16px",
    borderRadius: "8px", border: "0.5px solid #e2e8f0"
  }
};