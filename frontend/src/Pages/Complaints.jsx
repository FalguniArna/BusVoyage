import { useEffect, useState } from "react";
import axios from "axios";

const statusColors = {
  "Pending":  { bg: "#fef3c7", color: "#92400e" },
  "Reviewed": { bg: "#eff6ff", color: "#1d4ed8" },
  "Resolved": { bg: "#dcfce7", color: "#166534" },
};

export default function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [message, setMessage]       = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess]       = useState("");
  const [error, setError]           = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchComplaints = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/complaints/student/${user.studentId}`)
      .then(res => setComplaints(res.data))
      .catch(() => {});
  };

  useEffect(() => { fetchComplaints(); }, []);

  const handleSubmit = async () => {
    if (!message.trim()) return setError("Please write your complaint first.");
    setSubmitting(true);
    setError("");
    try {
      await axios.post("${import.meta.env.VITE_API_URL}/api/complaints", {
        studentId: user.studentId,
        studentName: user.name,
        message: message.trim()
      });
      setMessage("");
      setSuccess("Your complaint has been submitted successfully!");
      fetchComplaints();
      setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
      setError("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>🧾 Complaints</h2>
      <p style={styles.subtitle}>
        Submit a complaint about your transport experience.
        The admin will review and respond.
      </p>

      {/* Submit box */}
      <div style={styles.submitBox}>
        <div style={styles.submitTitle}>Write your complaint</div>
        <textarea
          style={styles.textarea}
          placeholder="Describe your issue in detail — e.g. bus was late, driver was rude, overcrowding etc."
          value={message}
          onChange={e => { setMessage(e.target.value); setError(""); }}
          rows={4}
        />
        {error   && <p style={styles.errorTxt}>{error}</p>}
        {success && <p style={styles.successTxt}>{success}</p>}
        <button
          style={{
            ...styles.submitBtn,
            opacity: submitting ? 0.7 : 1
          }}
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit Complaint →"}
        </button>
      </div>

      {/* Previous complaints */}
      {complaints.length > 0 && (
        <>
          <div style={styles.sectionTitle}>Your Previous Complaints</div>
          {complaints.map(c => {
            const sc = statusColors[c.status] || statusColors["Pending"];
            return (
              <div key={c._id} style={styles.complaintCard}>
                <div style={styles.complaintTop}>
                  <div style={styles.complaintDate}>
                    {new Date(c.createdAt).toLocaleDateString("en-US", {
                      weekday: "short", month: "short",
                      day: "numeric", year: "numeric"
                    })}
                  </div>
                  <div style={{
                    ...styles.statusBadge,
                    background: sc.bg, color: sc.color
                  }}>
                    {c.status}
                  </div>
                </div>

                {/* Student message */}
                <div style={styles.msgBox}>
                  <div style={styles.msgLabel}>Your complaint:</div>
                  <p style={styles.msgTxt}>{c.message}</p>
                </div>

                {/* Admin reply */}
                {c.adminReply ? (
                  <div style={styles.replyBox}>
                    <div style={styles.replyLabel}>
                      💬 Admin response:
                    </div>
                    <p style={styles.replyTxt}>{c.adminReply}</p>
                  </div>
                ) : (
                  <div style={styles.pendingNote}>
                    ⏳ Waiting for admin response...
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}

      {complaints.length === 0 && (
        <div style={styles.empty}>
          <div style={{ fontSize: "36px" }}>🧾</div>
          <p style={styles.emptyTxt}>No complaints submitted yet.</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: { display: "flex", flexDirection: "column", gap: "16px", paddingBottom: "24px" },
  title: { fontSize: "20px", fontWeight: 700, color: "#0f172a", margin: 0 },
  subtitle: { fontSize: "13px", color: "#94a3b8" },
  submitBox: {
    background: "#fff", borderRadius: "12px",
    border: "0.5px solid #e2e8f0", padding: "20px"
  },
  submitTitle: { fontSize: "14px", fontWeight: 700, color: "#0f172a", marginBottom: "12px" },
  textarea: {
    width: "100%", padding: "12px 14px",
    border: "0.5px solid #e2e8f0", borderRadius: "8px",
    fontSize: "13px", color: "#334155",
    resize: "vertical", lineHeight: 1.6,
    fontFamily: "'Segoe UI', Arial, sans-serif",
    boxSizing: "border-box", marginBottom: "10px"
  },
  errorTxt: { color: "#ef4444", fontSize: "13px", marginBottom: "8px" },
  successTxt: {
    color: "#166534", fontSize: "13px",
    background: "#dcfce7", padding: "8px 12px",
    borderRadius: "6px", marginBottom: "8px"
  },
  submitBtn: {
    padding: "10px 24px", background: "#0A1628",
    color: "#fff", border: "none", borderRadius: "8px",
    fontSize: "13px", fontWeight: 600, cursor: "pointer"
  },
  sectionTitle: { fontSize: "14px", fontWeight: 700, color: "#0f172a" },
  complaintCard: {
    background: "#fff", borderRadius: "12px",
    border: "0.5px solid #e2e8f0", padding: "16px",
    borderLeft: "3px solid #3b82f6"
  },
  complaintTop: {
    display: "flex", justifyContent: "space-between",
    alignItems: "center", marginBottom: "12px"
  },
  complaintDate: { fontSize: "12px", color: "#94a3b8" },
  statusBadge: {
    fontSize: "11px", fontWeight: 700,
    padding: "3px 10px", borderRadius: "10px"
  },
  msgBox: {
    background: "#f8fafc", borderRadius: "8px",
    padding: "10px 14px", marginBottom: "10px"
  },
  msgLabel: { fontSize: "11px", color: "#94a3b8", fontWeight: 600, marginBottom: "4px" },
  msgTxt: { fontSize: "13px", color: "#334155", lineHeight: 1.6, margin: 0 },
  replyBox: {
    background: "#f0fdf4", borderRadius: "8px",
    padding: "10px 14px", border: "0.5px solid #bbf7d0"
  },
  replyLabel: { fontSize: "11px", color: "#166534", fontWeight: 600, marginBottom: "4px" },
  replyTxt: { fontSize: "13px", color: "#166534", lineHeight: 1.6, margin: 0 },
  pendingNote: {
    fontSize: "12px", color: "#94a3b8",
    fontStyle: "italic", padding: "8px 0"
  },
  empty: {
    background: "#fff", borderRadius: "12px",
    border: "0.5px solid #e2e8f0", padding: "40px",
    display: "flex", flexDirection: "column",
    alignItems: "center", gap: "8px"
  },
  emptyTxt: { fontSize: "14px", color: "#94a3b8", margin: 0 }
};