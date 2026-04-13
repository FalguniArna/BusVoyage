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
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, formData);
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
            <h2 style={s.cardTitle}>Welcome back</h2>
            <p style={s.cardSub}>Sign in to your BusVoyage account</p>
          </div>

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
                <input
                  style={{ ...s.input, paddingRight: 44 }}
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
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
          <div style={s.divider}>
            <div style={s.divLine} />
            <span style={s.divText}>one portal for all roles</span>
            <div style={s.divLine} />
          </div>

          {/* role chips */}
          <div style={s.roleRow}>
            {[
              { label: "Student", color: "#1d4ed8", bg: "#EFF6FF", border: "#93C5FD" },
              { label: "Driver",  color: "#16a34a", bg: "#DCFCE7", border: "#86EFAC" },
              { label: "Admin",   color: "#dc2626", bg: "#FEE2E2", border: "#FCA5A5" },
            ].map((r, i) => (
              <div key={i} style={{ ...s.roleChip, color: r.color, background: r.bg, border: `1px solid ${r.border}` }}>
                {r.label}
              </div>
            ))}
          </div>
          <p style={s.roleHint}>We'll redirect you automatically based on your role.</p>

          {/* switch */}
          <p style={s.switchText}>
            Don't have an account?{" "}
            <Link to="/register" style={s.switchLink}>Create one →</Link>
          </p>
        </div>

        <p style={s.footNote}>© 2026 BusVoyage · Metropolitan University</p>
      </div>
    </div>
  );
}

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
const s = {
  page: {
    minHeight: "100vh",
    display: "flex",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },

  /* ── LEFT ── */
  left: {
    flex: "0 0 44%",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 48px",
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 32px",
  },

  card: {
    background: "#fff",
    borderRadius: 20,
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
};