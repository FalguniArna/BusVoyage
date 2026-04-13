import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";


export default function Register() {
  const navigate = useNavigate();

  const [step,       setStep]       = useState(1);
  const [verifyData, setVerifyData] = useState({ name: "", studentId: "", phone: "" });
  const [accountData, setAccountData] = useState({
    username: "", password: "", confirmPassword: "", studentId: "", name: "",
  });

  const [error,       setError]       = useState("");
  const [loading,     setLoading]     = useState(false);
  const [showPass,    setShowPass]    = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onVerifyChange  = e => setVerifyData ({ ...verifyData,  [e.target.name]: e.target.value });
  const onAccountChange = e => setAccountData({ ...accountData, [e.target.name]: e.target.value });

  const handleVerify = async e => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/verify-student`, verifyData);
      setAccountData(prev => ({ ...prev, studentId: res.data.studentId, name: res.data.name }));
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async e => {
    e.preventDefault();
    setError("");
    if (accountData.password !== accountData.confirmPassword)
      return setError("Passwords do not match.");
    if (accountData.password.length < 6)
      return setError("Password must be at least 6 characters.");
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, accountData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => { setStep(1); setError(""); };

  return (
    <div style={s.page}>
      <style>{CSS}</style>

      {/* ════ LEFT PANEL ════ */}
      <div style={s.left} className="reg-left">
        <div style={s.leftOverlay} />
        <div style={s.leftContent}>

          {/* Brand — same as login */}
          <div style={s.leftBrand} onClick={() => navigate("/")} role="button">
            <span style={{ fontSize: 22 }}>🚌</span>
            <span style={s.leftBrandName}>BusVoyage</span>
            <span style={s.brandMU}>· MU</span>
          </div>

          <h1 style={s.leftTitle}>
            Join your campus<br />
            <span style={s.leftAccent}>transport network.</span>
          </h1>
          <p style={s.leftSub}>
            Real-time bus tracking · Live crowd status<br />
            Smart schedules · Instant announcements
          </p>

          {/* Feature pills */}
          <div style={s.pillRow}>
            {["Live Tracking", "Crowd Status", "Announcements"].map(p => (
              <span key={p} style={s.pill}>{p}</span>
            ))}
          </div>
          <div style={{ ...s.pillRow, marginBottom: 32 }}>
            {["Routes", "Lost & Found"].map(p => (
              <span key={p} style={s.pill}>{p}</span>
            ))}
          </div>

          {/* Stats */}
          <div style={s.statsRow}>
            {[["8+","Buses"],["5","Routes"],["1200+","Students"]].map(([n, l]) => (
              <div key={l} style={s.stat}>
                <span style={s.statNum}>{n}</span>
                <span style={s.statLabel}>{l}</span>
              </div>
            ))}
          </div>

          <p style={s.leftFooter}>Metropolitan University · Sylhet</p>
        </div>
      </div>

      {/* ════ RIGHT PANEL ════ */}
      <div style={s.right}>
        <div style={s.card}>

          {/* Mobile brand (shows only on small screens) */}
          <div style={s.mobileBrand} className="mobile-brand" onClick={() => navigate("/")}>
            <span>🚌</span>
            <span style={{ fontWeight: 800, fontSize: 16, color: "#0d1b3e" }}>BusVoyage</span>
            <span style={{ color: "#94a3b8", fontSize: 13 }}>· MU</span>
          </div>

          {/* Step indicator */}
          <div style={s.stepRow}>
            <div style={s.stepTrack}>
              <div style={{ ...s.stepBubble, background: "#004A99", color: "#fff" }}>1</div>
              <div style={{ ...s.stepLine, background: step === 2 ? "#004A99" : "#e0e7f0" }} />
              <div style={{
                ...s.stepBubble,
                background: step === 2 ? "#004A99" : "#e0e7f0",
                color: step === 2 ? "#fff" : "#94a3b8",
              }}>2</div>
            </div>
            <div style={s.stepLabels}>
              <span style={{ ...s.stepLabel, color: "#004A99" }}>Verify Identity</span>
              <span style={{ ...s.stepLabel, color: step === 2 ? "#004A99" : "#94a3b8" }}>Create Account</span>
            </div>
          </div>

          {/* Heading */}
          <h2 style={s.heading}>
            {step === 1 ? "Verify your identity" : "Create your account"}
          </h2>
          <p style={s.subheading}>
            {step === 1
              ? "Enter your university-registered details to continue"
              : "Choose a username and a secure password"}
          </p>

          {/* Error */}
          {error && (
            <div style={s.errorBox}>
              <span>⚠</span> {error}
            </div>
          )}

          {/* ── STEP 1 ── */}
          {step === 1 && (
            <form onSubmit={handleVerify}>
              <Field label="Full Name" icon="👤">
                <input
                  style={s.input}
                  type="text"
                  name="name"
                  placeholder="As registered at university"
                  value={verifyData.name}
                  onChange={onVerifyChange}
                  required
                />
              </Field>
              <Field label="Student ID" icon="#">
                <input
                  style={s.input}
                  type="text"
                  name="studentId"
                  placeholder="e.g. 231-115-207"
                  value={verifyData.studentId}
                  onChange={onVerifyChange}
                  required
                />
              </Field>
              <Field label="Phone Number" icon="📞">
                <input
                  style={s.input}
                  type="text"
                  name="phone"
                  placeholder="Your registered phone number"
                  value={verifyData.phone}
                  onChange={onVerifyChange}
                  required
                />
              </Field>
              <button style={s.primaryBtn} type="submit" disabled={loading}>
                {loading ? "Verifying…" : "Verify Identity →"}
              </button>
            </form>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <form onSubmit={handleRegister}>
              <div style={s.verifiedBadge}>
                <span>✓</span>
                Verified as: <strong>{accountData.name}</strong>
              </div>
              <Field label="Username" icon="@">
                <input
                  style={s.input}
                  type="text"
                  name="username"
                  placeholder="Pick a unique username"
                  value={accountData.username}
                  onChange={onAccountChange}
                  required
                />
              </Field>
              <Field label="Password" icon="🔒">
                <input
                  style={s.input}
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="At least 6 characters"
                  value={accountData.password}
                  onChange={onAccountChange}
                  required
                />
                <button type="button" style={s.eyeBtn} onClick={() => setShowPass(v => !v)}>
                  {showPass ? "🙈" : "👁"}
                </button>
              </Field>
              <Field label="Confirm Password" icon="🔒">
                <input
                  style={s.input}
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Repeat your password"
                  value={accountData.confirmPassword}
                  onChange={onAccountChange}
                  required
                />
                <button type="button" style={s.eyeBtn} onClick={() => setShowConfirm(v => !v)}>
                  {showConfirm ? "🙈" : "👁"}
                </button>
              </Field>
              <button style={s.primaryBtn} type="submit" disabled={loading}>
                {loading ? "Creating account…" : "Create Account →"}
              </button>
              <button type="button" style={s.backBtn} onClick={goBack}>
                ← Go back
              </button>
            </form>
          )}

          <p style={s.switchText}>
            Already have an account?{" "}
            <Link to="/login" style={s.switchLink}>Sign in →</Link>
          </p>

          <p style={s.footer}>© 2026 BusVoyage · Metropolitan University</p>
        </div>
      </div>
    </div>
  );
}

/* ── Reusable field wrapper ── */
function Field({ label, icon, children }) {
  return (
    <div style={f.group}>
      <label style={f.label}>{label}</label>
      <div style={f.wrap}>
        <span style={f.icon}>{icon}</span>
        {children}
      </div>
    </div>
  );
}

const f = {
  group: { marginBottom: 14 },
  label: { display: "block", fontSize: 11, fontWeight: 700, color: "#3d4f6b", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.6 },
  wrap:  { display: "flex", alignItems: "center", border: "1.5px solid #d8e3f0", borderRadius: 10, overflow: "hidden", background: "#f8faff", transition: "border-color 0.2s" },
  icon:  { padding: "0 12px", fontSize: 14, color: "#8a9bbf", userSelect: "none", flexShrink: 0 },
};

/* ════ CSS ════ */
const CSS = `
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  button { font-family: inherit; }

  input:focus { outline: none; }
  div[style*="border: 1.5px solid #d8e3f0"]:focus-within {
    border-color: #004A99 !important;
    box-shadow: 0 0 0 3px rgba(0,74,153,0.08);
  }

  @keyframes fadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }
  @keyframes slideIn { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:none} }

  .mobile-brand { display: none !important; }

  /* ── RESPONSIVE ── */
  @media (max-width: 860px) {
    .reg-left { display: none !important; }
    .mobile-brand { display: flex !important; }
  }

  @media (max-width: 480px) {
    /* card full width on mobile */
    div[style*="maxWidth: 440"] {
      padding: 28px 18px 20px !important;
      border-radius: 14px !important;
    }
  }
`;

/* ════ STYLES ════ */
const s = {
  page: {
    minHeight: "100vh",
    display: "flex",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    background: "#f0f4ff",
  },

  /* ── Left panel ── */
  left: {
    flex: "0 0 42%",
    position: "relative",
    overflow: "hidden",
    backgroundImage: "url('/mu.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
  },
  leftOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(135deg, rgba(0,30,80,0.85) 0%, rgba(0,55,128,0.70) 100%)",
  },
  leftContent: {
    position: "relative",
    zIndex: 2,
    padding: "48px 44px",
    display: "flex",
    flexDirection: "column",
    animation: "slideIn 0.6s ease both",
  },
  leftBrand: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 40,
    cursor: "pointer",
  },
  leftBrandName: { fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: 0.5 },
  brandMU: { opacity: 0.45, fontSize: 14, color: "#fff" },
  leftTitle: {
    fontSize: "clamp(24px,2.6vw,34px)",
    fontWeight: 900,
    color: "#fff",
    lineHeight: 1.25,
    marginBottom: 14,
    textShadow: "0 2px 12px rgba(0,0,0,0.4)",
  },
  leftAccent: { color: "#FFE566" },
  leftSub: {
    fontSize: 14,
    color: "rgba(255,255,255,0.80)",
    lineHeight: 1.75,
    marginBottom: 26,
  },

  pillRow: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 },
  pill: {
    background: "rgba(255,255,255,0.15)",
    border: "1px solid rgba(255,255,255,0.3)",
    color: "#fff",
    fontSize: 12,
    fontWeight: 600,
    padding: "6px 14px",
    borderRadius: 20,
    backdropFilter: "blur(6px)",
  },

  statsRow: { display: "flex", gap: 28, marginBottom: 32, flexWrap: "wrap" },
  stat:     { display: "flex", flexDirection: "column" },
  statNum:  { fontSize: 26, fontWeight: 900, color: "#FFE566" },
  statLabel:{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 2 },

  leftFooter: { fontSize: 12, color: "rgba(255,255,255,0.4)" },

  /* ── Right panel ── */
  right: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    background: "#f0f4ff",
  },
  card: {
    background: "#fff",
    borderRadius: 20,
    padding: "38px 38px 26px",
    width: "100%",
    maxWidth: 440,
    boxShadow: "0 8px 40px rgba(0,50,120,0.10)",
    animation: "fadeIn 0.4s ease both",
  },

  /* Mobile brand shown on small screens */
  mobileBrand: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 24,
    cursor: "pointer",
  },

  /* Step indicator */
  stepRow:    { marginBottom: 26 },
  stepTrack:  { display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 },
  stepBubble: {
    width: 30, height: 30, borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 13, fontWeight: 700, flexShrink: 0,
    transition: "background 0.3s",
  },
  stepLine:   { width: 64, height: 3, margin: "0 6px", borderRadius: 2, transition: "background 0.3s" },
  stepLabels: { display: "flex", justifyContent: "center", gap: 58 },
  stepLabel:  { fontSize: 11, fontWeight: 600, transition: "color 0.3s" },

  heading: {
    fontSize: 22,
    fontWeight: 800,
    color: "#0d1b3e",
    marginBottom: 6,
    textAlign: "center",
  },
  subheading: {
    fontSize: 13,
    color: "#7a8aa0",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 1.6,
  },

  errorBox: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#fff0f0",
    border: "1px solid #ffcdd2",
    color: "#c62828",
    fontSize: 13,
    padding: "10px 14px",
    borderRadius: 8,
    marginBottom: 16,
  },

  verifiedBadge: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#f0fff4",
    border: "1px solid #b2dfdb",
    color: "#1b5e20",
    fontSize: 13,
    fontWeight: 600,
    padding: "10px 14px",
    borderRadius: 8,
    marginBottom: 18,
    flexWrap: "wrap",
  },

  input: {
    flex: 1,
    border: "none",
    outline: "none",
    padding: "12px 4px 12px 0",
    fontSize: 14,
    color: "#1a2340",
    background: "transparent",
    width: "100%",
    minWidth: 0,
  },
  eyeBtn: {
    background: "none",
    border: "none",
    padding: "0 12px",
    cursor: "pointer",
    fontSize: 15,
    color: "#8a9bbf",
    flexShrink: 0,
  },

  primaryBtn: {
    width: "100%",
    padding: "13px",
    background: "linear-gradient(135deg, #004A99 0%, #0066CC 100%)",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    marginTop: 6,
    letterSpacing: 0.3,
    boxShadow: "0 4px 16px rgba(0,74,153,0.3)",
    transition: "opacity 0.18s, transform 0.18s",
  },
  backBtn: {
    width: "100%",
    padding: "11px",
    background: "transparent",
    color: "#004A99",
    border: "1.5px solid #004A99",
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    marginTop: 10,
  },

  switchText: { textAlign: "center", fontSize: 13, color: "#7a8aa0", marginTop: 20 },
  switchLink: { color: "#004A99", fontWeight: 700, textDecoration: "none" },
  footer:     { textAlign: "center", fontSize: 11, color: "#bdc8d8", marginTop: 18 },
};