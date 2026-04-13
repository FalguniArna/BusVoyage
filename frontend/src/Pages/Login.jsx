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
//       const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, formData);
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
<<<<<<< HEAD
  const [selectedRole, setSelectedRole] = useState(null);

  const roleCredentials = {
    Student: { username: "student123", password: "Student@123" },
    Driver: { username: "driver456", password: "Driver@123" },
    Admin: { username: "admin789", password: "Admin@123" },
  };
=======

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
>>>>>>> 41eb8645a91cfb9c8bb97ffe0379bf1a7ac5b04e

  const handleRoleClick = (roleName) => {
    setSelectedRole(roleName);
    setFormData(roleCredentials[roleName]);
    setError("");
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
<<<<<<< HEAD
=======

>>>>>>> 41eb8645a91cfb9c8bb97ffe0379bf1a7ac5b04e
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
<<<<<<< HEAD
      <style>{CSS}</style>

      {/* ── LEFT PANEL ── */}
      <div style={s.left}>
        {/* mu.jpg background */}
        <div style={s.leftBg} />
        {/* dark overlay matching home hero */}
        <div style={s.leftOverlay} />
        {/* orange floor strip — matches home hero floor */}
        <div style={s.leftFloor} />

        <div style={s.leftInner}>
          {/* brand */}
          <div style={s.brand}>
            <span style={s.brandDot} />
            <span style={s.brandName}>BusVoyage</span>
            <span style={s.brandMU}>· MU</span>
          </div>

          <h1 style={s.tagline}>
            Your campus<br />commute,{" "}
            <span style={s.taglineAccent}>simplified.</span>
          </h1>
          <p style={s.taglineSub}>
            Real-time bus tracking · Live crowd status<br />
            Smart schedules · Instant announcements
          </p>

          {/* feature pills */}
          <div style={s.pills}>
            {["Live Tracking", "Crowd Status", "Announcements", "Routes"].map((p, i) => (
              <span key={i} style={s.pill}>{p}</span>
            ))}
          </div>

          {/* stats */}
          <div style={s.statsRow}>
            {[["8+", "Buses"], ["5", "Routes"], ["1200+", "Students"]].map(([v, l], i) => (
              <div key={i} style={s.stat}>
                <div style={s.statVal}>{v}</div>
                <div style={s.statLabel}>{l}</div>
              </div>
            ))}
          </div>

          <div style={s.uniTag}>Metropolitan University · Sylhet</div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div style={s.right}>
        <div style={s.card}>

          {/* header */}
          <div style={s.cardHeader}>
            <div style={s.lockIcon}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                stroke="#1e272e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
=======

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
>>>>>>> 41eb8645a91cfb9c8bb97ffe0379bf1a7ac5b04e
            <h2 style={s.cardTitle}>Welcome back</h2>
            <p style={s.cardSub}>Sign in to your BusVoyage account</p>
          </div>

<<<<<<< HEAD
          {/* error */}
          {error && (
            <div style={s.errorBox}>
              <span style={{ fontSize: 14 }}>⚠</span>
              {error}
            </div>
          )}

          {/* form */}
          <form onSubmit={handleSubmit}>

            <div style={s.fieldWrap}>
              <label style={s.label}>Username</label>
              <div style={s.inputWrap}>
                <span style={s.inputIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
=======
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
>>>>>>> 41eb8645a91cfb9c8bb97ffe0379bf1a7ac5b04e
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

<<<<<<< HEAD
            <div style={s.fieldWrap}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
                <label style={{ ...s.label, marginBottom: 0 }}>Password</label>
                <span style={s.forgot}>Forgot password?</span>
              </div>
              <div style={s.inputWrap}>
                <span style={s.inputIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
=======
            {/* Password */}
            <div style={s.fieldWrap}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <label style={s.label}>Password</label>
                <span style={s.forgot}>Forgot password?</span>
              </div>
              <div style={s.inputWrap}>
                <span style={s.inputIcon}>🔒</span>
>>>>>>> 41eb8645a91cfb9c8bb97ffe0379bf1a7ac5b04e
                <input
                  style={{ ...s.input, paddingRight: 44 }}
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
<<<<<<< HEAD
                <button
                  type="button"
                  style={s.eyeBtn}
                  onClick={() => setShowPass(v => !v)}
                  tabIndex={-1}
                >
                  {showPass
                    ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ ...s.submitBtn, opacity: loading ? 0.82 : 1 }}
              className="submitBtn"
            >
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>

          {/* divider */}
=======
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
>>>>>>> 41eb8645a91cfb9c8bb97ffe0379bf1a7ac5b04e
          <div style={s.divider}>
            <div style={s.divLine} />
            <span style={s.divText}>one portal for all roles</span>
            <div style={s.divLine} />
          </div>

<<<<<<< HEAD
          {/* role chips */}
          <div style={s.roleRow}>
            {[
              { label: "Student", color: "#1d4ed8", bg: "#EFF6FF", border: "#93C5FD" },
              { label: "Driver",  color: "#16a34a", bg: "#DCFCE7", border: "#86EFAC" },
              { label: "Admin",   color: "#dc2626", bg: "#FEE2E2", border: "#FCA5A5" },
            ].map((r, i) => (
              <div
                key={i}
                onClick={() => handleRoleClick(r.label)}
                style={{
                  ...s.roleChip,
                  color: r.color,
                  background: selectedRole === r.label ? r.bg : "#f8fafc",
                  border: `2px solid ${selectedRole === r.label ? r.border : "#e2e8f0"}`,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  transform: selectedRole === r.label ? "scale(1.05)" : "scale(1)",
                }}
              >
                {r.label}
              </div>
            ))}
          </div>
          <p style={s.roleHint}>Click a role to auto-fill demo credentials.</p>

          {/* switch */}
=======
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
>>>>>>> 41eb8645a91cfb9c8bb97ffe0379bf1a7ac5b04e
          <p style={s.switchText}>
            Don't have an account?{" "}
            <Link to="/register" style={s.switchLink}>Create one →</Link>
          </p>
        </div>

<<<<<<< HEAD
        <p style={s.footNote}>© 2026 BusVoyage · Metropolitan University</p>
=======
        <p style={s.footNote}>© 2026 BusVoyage • Metropolitan University</p>
>>>>>>> 41eb8645a91cfb9c8bb97ffe0379bf1a7ac5b04e
      </div>
    </div>
  );
}

<<<<<<< HEAD
/* ════ CSS ════ */
const CSS = `
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }

  .submitBtn:hover:not(:disabled) {
    background: #1a1a2e !important;
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(30,39,46,0.35) !important;
    transition: all 0.2s ease;
  }

  input:focus {
    border-color: #1e272e !important;
    background: #fff !important;
    box-shadow: 0 0 0 3px rgba(30,39,46,0.08) !important;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    .login-page {
      flex-direction: column !important;
    }
    .login-left {
      min-height: 260px !important;
      flex: none !important;
      padding: 36px 28px 80px !important;
    }
    .login-left h1 {
      font-size: 26px !important;
    }
    .login-right {
      flex: 1 !important;
      padding: 32px 20px !important;
    }
    .login-card {
      padding: 28px 20px !important;
    }
    .login-stats {
      gap: 20px !important;
    }
    .login-pills {
      gap: 6px !important;
    }
  }

  @media (max-width: 480px) {
    .login-left { display: none !important; }
    .login-right { padding: 24px 16px !important; }
    .login-card { border-radius: 16px !important; padding: 24px 18px !important; }
  }
`;

/* ════ STYLES ════ */
=======
>>>>>>> 41eb8645a91cfb9c8bb97ffe0379bf1a7ac5b04e
const s = {
  page: {
    minHeight: "100vh",
    display: "flex",
<<<<<<< HEAD
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },

  /* ── LEFT ── */
  left: {
    flex: "0 0 44%",
    position: "relative",
=======
    fontFamily: "'Segoe UI', Arial, sans-serif",
  },

  /* Left — mu.jpg background, same as home hero */
  left: {
    flex: "1 1 45%",
    backgroundImage: "url('/mu.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center top",
>>>>>>> 41eb8645a91cfb9c8bb97ffe0379bf1a7ac5b04e
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 48px",
<<<<<<< HEAD
    overflow: "hidden",
    minHeight: "100vh",
  },
  leftBg: {
    position: "absolute", inset: 0,
    backgroundImage: "url('/mu.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center top",
    opacity: 1,
  },
  /* dark overlay — same as home hero */
  leftOverlay: {
    position: "absolute", inset: 0,
    background: "linear-gradient(160deg, rgba(0,10,30,0.93) 0%, rgba(0,20,50,0.88) 60%, rgba(0,30,60,0.82) 100%)",
    zIndex: 1,
  },
  /* orange floor strip — matches home heroFloorArea */
  leftFloor: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    height: "28%",
    background: "#f39c12",
    opacity: 0.85,
    zIndex: 1,
    clipPath: "polygon(0 30%, 100% 0%, 100% 100%, 0 100%)",
  },

  leftInner: {
    position: "relative", zIndex: 2, maxWidth: 380,
  },

  brand: { display: "flex", alignItems: "center", gap: 8, marginBottom: 32 },
  brandDot: {
    width: 10, height: 10, borderRadius: "50%",
    background: "#E31E24",
    display: "inline-block",
    animation: "pulse 2.5s infinite",
    flexShrink: 0,
  },
  brandName: { fontSize: 20, fontWeight: 900, color: "#fff", letterSpacing: "-0.03em" },
  brandMU:   { fontSize: 13, color: "rgba(255,255,255,0.38)", fontWeight: 500 },

  tagline: {
    fontSize: 32, fontWeight: 900, color: "#fff",
    lineHeight: 1.25, marginBottom: 14,
  },
  taglineAccent: { color: "#f39c12" },
  taglineSub: {
    fontSize: 13, color: "rgba(255,255,255,0.68)",
    lineHeight: 1.75, marginBottom: 26,
  },

  pills: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 30 },
  pill: {
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "#fff", fontSize: 11, fontWeight: 600,
    padding: "6px 13px", borderRadius: 20,
  },

  statsRow: {
    display: "flex", gap: 28,
    borderTop: "1px solid rgba(255,255,255,0.15)",
    paddingTop: 20, marginBottom: 24,
  },
  stat:      { textAlign: "center" },
  statVal:   { fontSize: 22, fontWeight: 900, color: "#f39c12" },
  statLabel: { fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 2 },

  uniTag: {
    fontSize: 12, color: "rgba(255,255,255,0.45)",
    borderTop: "1px solid rgba(255,255,255,0.1)",
    paddingTop: 16,
  },

  /* ── RIGHT ── */
  right: {
    flex: 1,
    background: "#f1f5f9",
=======
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
>>>>>>> 41eb8645a91cfb9c8bb97ffe0379bf1a7ac5b04e
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 32px",
  },

  card: {
    background: "#fff",
    borderRadius: 20,
<<<<<<< HEAD
    padding: "38px 34px",
    width: "100%", maxWidth: 440,
    boxShadow: "0 4px 40px rgba(0,0,0,0.09)",
    border: "1px solid #e8ecf1",
  },

  cardHeader: { textAlign: "center", marginBottom: 28 },
  lockIcon: {
    width: 56, height: 56, borderRadius: "50%",
    background: "#f1f5f9",
    border: "1px solid #e2e8f0",
    display: "flex", alignItems: "center", justifyContent: "center",
    margin: "0 auto 14px",
  },
  cardTitle: { fontSize: 22, fontWeight: 900, color: "#1e272e", marginBottom: 6 },
  cardSub:   { fontSize: 13, color: "#94a3b8" },

  errorBox: {
    display: "flex", alignItems: "center", gap: 10,
    background: "#FEF2F2", border: "1px solid #FECACA",
    color: "#dc2626", fontSize: 13, fontWeight: 500,
    padding: "10px 14px", borderRadius: 10, marginBottom: 20,
  },

  fieldWrap: { marginBottom: 16 },
  label:     { display: "block", fontSize: 12, fontWeight: 700, color: "#475569", marginBottom: 7, textTransform: "uppercase", letterSpacing: 0.5 },
  inputWrap: { position: "relative", display: "flex", alignItems: "center" },
  inputIcon: {
    position: "absolute", left: 13,
    display: "flex", alignItems: "center",
    pointerEvents: "none",
  },
  input: {
    width: "100%", padding: "11px 14px 11px 42px",
    border: "1.5px solid #e2e8f0",
    borderRadius: 10, fontSize: 14, color: "#1e272e",
    background: "#f8fafc",
    outline: "none", boxSizing: "border-box",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  eyeBtn: {
    position: "absolute", right: 12,
    background: "none", border: "none",
    cursor: "pointer",
    display: "flex", alignItems: "center",
    padding: 4,
  },
  forgot: {
    fontSize: 12, color: "#64748b",
    cursor: "pointer", fontWeight: 600,
    transition: "color 0.2s",
  },

  submitBtn: {
    width: "100%", padding: "13px",
    background: "#1e272e",
    color: "#fff", border: "none", borderRadius: 10,
    fontSize: 15, fontWeight: 800, cursor: "pointer",
    marginTop: 6,
    boxShadow: "0 4px 16px rgba(30,39,46,0.28)",
    letterSpacing: 0.3,
    transition: "all 0.2s ease",
  },

  divider: { display: "flex", alignItems: "center", gap: 10, margin: "22px 0" },
  divLine: { flex: 1, height: 1, background: "#f1f5f9" },
  divText: { fontSize: 11, color: "#cbd5e1", fontWeight: 600, whiteSpace: "nowrap" },

  roleRow:  { display: "flex", gap: 8, justifyContent: "center", marginBottom: 8 },
  roleChip: { fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20 },
  roleHint: { textAlign: "center", fontSize: 11, color: "#94a3b8", marginBottom: 22 },

  switchText: { textAlign: "center", fontSize: 13, color: "#64748b", marginTop: 4 },
  switchLink: { color: "#1e272e", fontWeight: 800, textDecoration: "none" },

  footNote: { marginTop: 20, fontSize: 12, color: "#94a3b8", textAlign: "center" },
=======
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
>>>>>>> 41eb8645a91cfb9c8bb97ffe0379bf1a7ac5b04e
};