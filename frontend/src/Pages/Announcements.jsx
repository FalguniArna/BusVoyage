import { useEffect, useState } from "react";
import axios from "axios";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/announcements")
      .then(res => {
        setAnnouncements(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={styles.centered}>
      <div style={styles.spinner} />
    </div>
  );

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.title}>📢 Announcements</h2>
        <p style={styles.subtitle}>
          Official notices from the transport office
        </p>
      </div>

      {announcements.length === 0 && (
        <div style={styles.empty}>
          <div style={{ fontSize: "40px" }}>📭</div>
          <p style={styles.emptyTxt}>No announcements yet.</p>
          <p style={styles.emptySubTxt}>
            Check back later for updates from the transport office.
          </p>
        </div>
      )}

      {announcements.map(a => (
        <div key={a._id} style={styles.card}>
          <div style={styles.cardTop}>
            <div style={styles.cardIcon}>📢</div>
            <div style={styles.cardMeta}>
              <div style={styles.cardTitle}>{a.title}</div>
              <div style={styles.cardDate}>
                Posted by {a.postedBy} ·{" "}
                {new Date(a.createdAt).toLocaleDateString("en-US", {
                  weekday: "short", month: "short",
                  day: "numeric", year: "numeric"
                })}
              </div>
            </div>
            <div style={styles.newBadge}>Notice</div>
          </div>
          <p style={styles.cardMsg}>{a.message}</p>
          {a.imageUrl && (
            <img
              src={`http://localhost:5000${a.imageUrl}`}
              alt="Notice"
              style={styles.noticeImg}
            />
          )}
        </div>
      ))}
    </div>
  );
}

const styles = {
  page: { display: "flex", flexDirection: "column", gap: "14px", paddingBottom: "24px" },
  centered: { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" },
  spinner: {
    width: "28px", height: "28px",
    border: "3px solid #e2e8f0", borderTop: "3px solid #3b82f6",
    borderRadius: "50%", animation: "spin 0.8s linear infinite"
  },
  header: { display: "flex", flexDirection: "column", gap: "4px" },
  title: { fontSize: "20px", fontWeight: 700, color: "#0f172a", margin: 0 },
  subtitle: { fontSize: "13px", color: "#94a3b8" },
  empty: {
    background: "#fff", borderRadius: "12px", border: "0.5px solid #e2e8f0",
    padding: "60px 24px", display: "flex", flexDirection: "column",
    alignItems: "center", gap: "8px"
  },
  emptyTxt: { fontSize: "16px", fontWeight: 600, color: "#0f172a", margin: 0 },
  emptySubTxt: { fontSize: "13px", color: "#94a3b8" },
  card: {
    background: "#fff", borderRadius: "12px",
    border: "0.5px solid #e2e8f0", padding: "16px 20px",
    borderLeft: "3px solid #3b82f6"
  },
  cardTop: { display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "10px" },
  cardIcon: {
    width: "36px", height: "36px", background: "#fff7ed",
    borderRadius: "8px", display: "flex", alignItems: "center",
    justifyContent: "center", fontSize: "18px", flexShrink: 0
  },
  cardMeta: { flex: 1 },
  cardTitle: { fontSize: "14px", fontWeight: 700, color: "#0f172a" },
  cardDate: { fontSize: "11px", color: "#94a3b8", marginTop: "3px" },
  newBadge: {
    background: "#eff6ff", color: "#1d4ed8",
    fontSize: "10px", fontWeight: 700,
    padding: "3px 8px", borderRadius: "10px", flexShrink: 0
  },
  cardMsg: { fontSize: "13px", color: "#334155", lineHeight: 1.6, margin: "0 0 12px" },
  noticeImg: {
    width: "100%", borderRadius: "8px",
    border: "0.5px solid #e2e8f0", marginTop: "8px"
  }
};