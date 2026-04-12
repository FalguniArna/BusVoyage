// import { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";

// export default function Login() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ username: "", password: "" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     try {
//       const res = await axios.post("${import.meta.env.VITE_API_URL}/api/auth/login", formData);
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));

//       if (res.data.user.role === "student") navigate("/student-dashboard");
//       else if (res.data.user.role === "driver") navigate("/driver-dashboard");
//       else if (res.data.user.role === "admin") navigate("/admin-dashboard");

//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.page}>
//       <div style={styles.card}>
//         <h2 style={styles.logo}>🚌 BusVoyage</h2>
//         <h3 style={styles.heading}>Login to your account</h3>

//         {error && <p style={styles.error}>{error}</p>}

//         <form onSubmit={handleSubmit}>
//           <label style={styles.label}>Username</label>
//           <input style={styles.input} type="text" name="username"
//             placeholder="Your username"
//             value={formData.username} onChange={handleChange} required />

//           <label style={styles.label}>Password</label>
//           <input style={styles.input} type="password" name="password"
//             placeholder="Your password"
//             value={formData.password} onChange={handleChange} required />

//           <button style={styles.btn} type="submit" disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <p style={styles.switch}>
//           Don't have an account? <Link to="/register" style={styles.link}>Register</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   page: { minHeight: "100vh", background: "linear-gradient(to right, #a6aeb6, #3A86FF)", display: "flex", justifyContent: "center", alignItems: "center" },
//   card: { background: "white", padding: "40px", borderRadius: "16px", width: "100%", maxWidth: "400px", boxShadow: "0 10px 30px rgba(0,0,0,0.15)" },
//   logo: { color: "#004A99", textAlign: "center", marginBottom: "4px" },
//   heading: { textAlign: "center", color: "#333", marginBottom: "24px" },
//   label: { display: "block", marginBottom: "6px", color: "#555", fontSize: "14px" },
//   input: { width: "100%", padding: "10px 14px", marginBottom: "16px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" },
//   btn: { width: "100%", padding: "12px", background: "#004A99", color: "white", border: "none", borderRadius: "8px", fontSize: "16px", cursor: "pointer", marginTop: "4px" },
//   error: { color: "#E31E24", marginBottom: "12px", fontSize: "14px", background: "#fff0f0", padding: "8px 12px", borderRadius: "6px" },
//   switch: { textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#666" },
//   link: { color: "#004A99", fontWeight: "bold" }
// };



import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate  = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("${import.meta.env.VITE_API_URL}/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      const role = res.data.user.role;
      if (role === "student") navigate("/student-dashboard");
      else if (role === "driver") navigate("/driver-dashboard");
      else if (role === "admin") navigate("/admin-dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.page}>

      {/* ── Left panel — university background + branding ── */}
      <div style={s.left}>
        {/* Same dark overlay as home page hero */}
        <div style={s.leftOverlay} />

        <div style={s.leftInner}>
          <div style={s.brand}>🚌 BusVoyage</div>
          <h1 style={s.tagline}>
            Your campus commute,<br />
            <span style={s.taglineAccent}>simplified.</span>
          </h1>
          <p style={s.taglineSub}>
            Real-time bus tracking · Live crowd status<br />
            Smart schedules · Instant announcements
          </p>

          {/* Feature pills */}
          <div style={s.pills}>
            {["🚌 Live Tracking", "💺 Crowd Status", "📢 Announcements", "🛣️ Routes"].map((p, i) => (
              <span key={i} style={s.pill}>{p}</span>
            ))}
          </div>

          {/* Stats */}
          <div style={s.statsRow}>
            {[["8+", "Buses"], ["5", "Routes"], ["1200+", "Students"]].map(([v, l], i) => (
              <div key={i} style={s.stat}>
                <div style={s.statVal}>{v}</div>
                <div style={s.statLabel}>{l}</div>
              </div>
            ))}
          </div>

          {/* University name at bottom */}
          <div style={s.uniTag}>🏫 Metropolitan University · Sylhet</div>
        </div>
      </div>

      {/* ── Right panel — form ── */}
      <div style={s.right}>
        <div style={s.card}>

          {/* Header */}
          <div style={s.cardHeader}>
            <div style={s.cardIcon}>🔐</div>
            <h2 style={s.cardTitle}>Welcome back</h2>
            <p style={s.cardSub}>Sign in to your BusVoyage account</p>
          </div>

          {/* Error */}
          {error && (
            <div style={s.errorBox}>
              <span style={{ fontSize: 16 }}>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>

            {/* Username */}
            <div style={s.fieldWrap}>
              <label style={s.label}>Username</label>
              <div style={s.inputWrap}>
                <span style={s.inputIcon}>👤</span>
                <input
                  style={s.input}
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div style={s.fieldWrap}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <label style={s.label}>Password</label>
                <span style={s.forgot}>Forgot password?</span>
              </div>
              <div style={s.inputWrap}>
                <span style={s.inputIcon}>🔒</span>
                <input
                  style={{ ...s.input, paddingRight: 44 }}
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span style={s.eyeBtn} onClick={() => setShowPass(v => !v)}>
                  {showPass ? "🙈" : "👁️"}
                </span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{ ...s.btn, opacity: loading ? 0.8 : 1 }}
            >
              {loading ? "⏳ Signing in..." : "Sign In →"}
            </button>
          </form>

          {/* Divider */}
          <div style={s.divider}>
            <div style={s.divLine} />
            <span style={s.divText}>one portal for all roles</span>
            <div style={s.divLine} />
          </div>

          {/* Role chips */}
          <div style={s.roleRow}>
            {[
              { icon: "🎓", role: "Student", color: "#004A99", bg: "#e3f2fd" },
              { icon: "🚌", role: "Driver",  color: "#28A745", bg: "#e9f7ef" },
              { icon: "⚙️", role: "Admin",   color: "#E31E24", bg: "#fdecea" },
            ].map((r, i) => (
              <div key={i} style={{ ...s.roleChip, background: r.bg, color: r.color }}>
                {r.icon} {r.role}
              </div>
            ))}
          </div>
          <p style={s.roleHint}>We'll redirect you automatically based on your role.</p>

          {/* Switch */}
          <p style={s.switchText}>
            Don't have an account?{" "}
            <Link to="/register" style={s.switchLink}>Create one →</Link>
          </p>
        </div>

        <p style={s.footNote}>© 2026 BusVoyage • Metropolitan University</p>
      </div>
    </div>
  );
}

const s = {
  page: {
    minHeight: "100vh",
    display: "flex",
    fontFamily: "'Segoe UI', Arial, sans-serif",
  },

  /* Left — mu.jpg background, same as home hero */
  left: {
    flex: "1 1 45%",
    backgroundImage: "url('/mu.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center top",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 48px",
    position: "relative",
    overflow: "hidden",
  },

  /* Overlay — matches home page darkOverlay */
  leftOverlay: {
    position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
    background: "linear-gradient(135deg, rgba(0,43,91,0.82) 0%, rgba(0,74,153,0.7) 100%)",
    zIndex: 1,
  },

  leftInner: {
    position: "relative", zIndex: 2, maxWidth: 400,
  },

  brand: {
    fontSize: 22, fontWeight: 800, color: "#fff",
    marginBottom: 28, letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 34, fontWeight: 900, color: "#fff",
    lineHeight: 1.25, marginBottom: 14,
  },
  taglineAccent: { color: "#FFE566" },
  taglineSub: {
    fontSize: 14, color: "rgba(255,255,255,0.78)",
    lineHeight: 1.7, marginBottom: 28,
  },

  pills: { display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 32 },
  pill: {
    background: "rgba(255,255,255,0.14)",
    border: "1px solid rgba(255,255,255,0.28)",
    color: "#fff", fontSize: 12, fontWeight: 600,
    padding: "7px 14px", borderRadius: 20,
  },

  statsRow: {
    display: "flex", gap: 32,
    borderTop: "1px solid rgba(255,255,255,0.18)",
    paddingTop: 22, marginBottom: 28,
  },
  stat:      { textAlign: "center" },
  statVal:   { fontSize: 24, fontWeight: 900, color: "#FFE566" },
  statLabel: { fontSize: 11, color: "rgba(255,255,255,0.7)", marginTop: 2 },

  uniTag: {
    fontSize: 12, color: "rgba(255,255,255,0.6)",
    borderTop: "1px solid rgba(255,255,255,0.12)",
    paddingTop: 16,
  },

  /* Right */
  right: {
    flex: "1 1 55%",
    background: "#F8F9FA",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 32px",
  },

  card: {
    background: "#fff",
    borderRadius: 20,
    padding: "40px 36px",
    width: "100%",
    maxWidth: 440,
    boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
    border: "1px solid #eef0f4",
  },

  cardHeader:  { textAlign: "center", marginBottom: 28 },
  cardIcon:    { fontSize: 36, marginBottom: 10 },
  cardTitle:   { fontSize: 24, fontWeight: 800, color: "#002B5B", marginBottom: 6 },
  cardSub:     { fontSize: 14, color: "#888" },

  errorBox: {
    display: "flex", alignItems: "center", gap: 10,
    background: "#fff0f0", border: "1px solid #fcc",
    color: "#E31E24", fontSize: 13, fontWeight: 500,
    padding: "10px 14px", borderRadius: 10, marginBottom: 20,
  },

  fieldWrap: { marginBottom: 18 },
  label:     { display: "block", fontSize: 13, fontWeight: 600, color: "#444", marginBottom: 7 },
  inputWrap: { position: "relative" },
  inputIcon: {
    position: "absolute", left: 13, top: "50%",
    transform: "translateY(-50%)", fontSize: 16,
    pointerEvents: "none",
  },
  input: {
    width: "100%", padding: "11px 14px 11px 40px",
    border: "1.5px solid #e0e4ec",
    borderRadius: 10, fontSize: 14, color: "#2D2D2D",
    background: "#fafbff",
    outline: "none", boxSizing: "border-box",
  },
  eyeBtn: {
    position: "absolute", right: 12, top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer", fontSize: 16, userSelect: "none",
  },
  forgot: {
    fontSize: 12, color: "#004A99",
    cursor: "pointer", fontWeight: 600,
  },

  btn: {
    width: "100%", padding: "13px",
    background: "linear-gradient(135deg, #004A99, #1565C0)",
    color: "#fff", border: "none", borderRadius: 10,
    fontSize: 15, fontWeight: 700, cursor: "pointer",
    marginTop: 6,
    boxShadow: "0 4px 16px rgba(0,74,153,0.35)",
  },

  divider: {
    display: "flex", alignItems: "center", gap: 10,
    margin: "22px 0",
  },
  divLine: { flex: 1, height: 1, background: "#eee" },
  divText: { fontSize: 11, color: "#bbb", fontWeight: 600, whiteSpace: "nowrap" },

  roleRow:  { display: "flex", gap: 8, justifyContent: "center", marginBottom: 8 },
  roleChip: {
    fontSize: 12, fontWeight: 700,
    padding: "5px 12px", borderRadius: 20,
  },
  roleHint: {
    textAlign: "center", fontSize: 11,
    color: "#aaa", marginBottom: 24,
  },

  switchText: { textAlign: "center", fontSize: 14, color: "#666", marginTop: 4 },
  switchLink: { color: "#004A99", fontWeight: 700, textDecoration: "none" },

  footNote: {
    marginTop: 20, fontSize: 12,
    color: "#bbb", textAlign: "center",
  },
};