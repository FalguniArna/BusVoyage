// import { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";

// export default function Register() {
//   const navigate = useNavigate();
//   const [step, setStep] = useState(1);
//   const [verifyData, setVerifyData] = useState({ name: "", studentId: "", phone: "" });
//   const [accountData, setAccountData] = useState({ username: "", password: "", confirmPassword: "", studentId: "", name: "" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleVerifyChange = (e) => {
//     setVerifyData({ ...verifyData, [e.target.name]: e.target.value });
//   };

//   const handleAccountChange = (e) => {
//     setAccountData({ ...accountData, [e.target.name]: e.target.value });
//   };

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     try {
//       const res = await axios.post("${import.meta.env.VITE_API_URL}/api/auth/verify-student", verifyData);
//       setAccountData(prev => ({ ...prev, studentId: res.data.studentId, name: res.data.name }));
//       setStep(2);
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError("");
//     if (accountData.password !== accountData.confirmPassword) return setError("Passwords do not match.");
//     if (accountData.password.length < 6) return setError("Password must be at least 6 characters.");
//     setLoading(true);
//     try {
//       await axios.post("${import.meta.env.VITE_API_URL}/api/auth/register", accountData);
//       alert("Registration successful! Please login.");
//       navigate("/login");
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

//         <div style={styles.stepRow}>
//           <div style={{ ...styles.stepDot, background: "#004A99" }}>1</div>
//           <div style={{ ...styles.stepLine, background: step === 2 ? "#004A99" : "#ddd" }} />
//           <div style={{ ...styles.stepDot, background: step === 2 ? "#004A99" : "#ddd" }}>2</div>
//         </div>
//         <p style={styles.stepLabel}>{step === 1 ? "Verify your identity" : "Create your account"}</p>

//         {error && <p style={styles.error}>{error}</p>}

//         {step === 1 && (
//           <form onSubmit={handleVerify}>
//             <label style={styles.label}>Full Name</label>
//             <input style={styles.input} type="text" name="name"
//               placeholder="As registered in university"
//               value={verifyData.name} onChange={handleVerifyChange} required />

//             <label style={styles.label}>Student ID</label>
//             <input style={styles.input} type="text" name="studentId"
//               placeholder="e.g. 231-115-207"
//               value={verifyData.studentId} onChange={handleVerifyChange} required />

//             <label style={styles.label}>Phone Number</label>
//             <input style={styles.input} type="text" name="phone"
//               placeholder="Your registered phone number"
//               value={verifyData.phone} onChange={handleVerifyChange} required />

//             <button style={styles.btn} type="submit" disabled={loading}>
//               {loading ? "Verifying..." : "Verify Identity →"}
//             </button>
//           </form>
//         )}

//         {step === 2 && (
//           <form onSubmit={handleRegister}>
//             <p style={styles.verified}>✅ Verified as: <strong>{accountData.name}</strong></p>

//             <label style={styles.label}>Choose a Username</label>
//             <input style={styles.input} type="text" name="username"
//               placeholder="Pick a unique username"
//               value={accountData.username} onChange={handleAccountChange} required />

//             <label style={styles.label}>Password</label>
//             <input style={styles.input} type="password" name="password"
//               placeholder="At least 6 characters"
//               value={accountData.password} onChange={handleAccountChange} required />

//             <label style={styles.label}>Confirm Password</label>
//             <input style={styles.input} type="password" name="confirmPassword"
//               placeholder="Repeat your password"
//               value={accountData.confirmPassword} onChange={handleAccountChange} required />

//             <button style={styles.btn} type="submit" disabled={loading}>
//               {loading ? "Creating account..." : "Create Account"}
//             </button>

//             <button type="button" style={styles.backBtn}
//               onClick={() => { setStep(1); setError(""); }}>
//               ← Go back
//             </button>
//           </form>
//         )}

//         <p style={styles.switch}>
//           Already have an account? <Link to="/login" style={styles.link}>Login</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   page: { minHeight: "100vh", background: "linear-gradient(to right, #a6aeb6, #3A86FF)", display: "flex", justifyContent: "center", alignItems: "center" },
//   card: { background: "white", padding: "40px", borderRadius: "16px", width: "100%", maxWidth: "420px", boxShadow: "0 10px 30px rgba(0,0,0,0.15)" },
//   logo: { color: "#004A99", textAlign: "center", marginBottom: "20px" },
//   stepRow: { display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "8px" },
//   stepDot: { width: "28px", height: "28px", borderRadius: "50%", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "bold" },
//   stepLine: { width: "60px", height: "3px", margin: "0 6px" },
//   stepLabel: { textAlign: "center", color: "#555", fontSize: "14px", marginBottom: "20px" },
//   label: { display: "block", marginBottom: "6px", color: "#555", fontSize: "14px" },
//   input: { width: "100%", padding: "10px 14px", marginBottom: "14px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" },
//   btn: { width: "100%", padding: "12px", background: "#004A99", color: "white", border: "none", borderRadius: "8px", fontSize: "15px", cursor: "pointer", marginTop: "4px" },
//   backBtn: { width: "100%", padding: "10px", background: "transparent", color: "#004A99", border: "1px solid #004A99", borderRadius: "8px", fontSize: "14px", cursor: "pointer", marginTop: "10px" },
//   error: { color: "#E31E24", marginBottom: "12px", fontSize: "14px", background: "#fff0f0", padding: "8px 12px", borderRadius: "6px" },
//   verified: { fontSize: "14px", color: "#28a745", background: "#f0fff4", padding: "8px 12px", borderRadius: "6px", marginBottom: "16px" },
//   switch: { textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#666" },
//   link: { color: "#004A99", fontWeight: "bold" }
// };




import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [verifyData, setVerifyData] = useState({ name: "", studentId: "", phone: "" });
  const [accountData, setAccountData] = useState({ username: "", password: "", confirmPassword: "", studentId: "", name: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleVerifyChange = (e) =>
    setVerifyData({ ...verifyData, [e.target.name]: e.target.value });

  const handleAccountChange = (e) =>
    setAccountData({ ...accountData, [e.target.name]: e.target.value });

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
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

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (accountData.password !== accountData.confirmPassword)
      return setError("Passwords do not match.");
    if (accountData.password.length < 6)
      return setError("Password must be at least 6 characters.");
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, accountData);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.page}>

      {/* ── LEFT PANEL ── */}
      <div style={s.left}>
        <div style={s.leftOverlay} />
        <div style={s.leftContent}>
          <div style={s.leftLogo}>
            <span style={{ fontSize: 22 }}>🚌</span>
            <span style={s.leftLogoText}>BusVoyage</span>
          </div>
          <h1 style={s.leftTitle}>
            Join your campus<br />
            <span style={s.leftAccent}>transport network.</span>
          </h1>
          <p style={s.leftSub}>
            Real-time bus tracking · Live crowd status<br />
            Smart schedules · Instant announcements
          </p>

          <div style={s.pillRow}>
            <span style={s.pill}>Live Tracking</span>
            <span style={s.pill}>Crowd Status</span>
            <span style={s.pill}>Announcements</span>
          </div>
          <div style={s.pillRow}>
            <span style={s.pill}>Routes</span>
            <span style={s.pill}>Lost & Found</span>
          </div>

          <div style={s.stats}>
            <div style={s.stat}><span style={s.statNum}>8+</span><span style={s.statLabel}>Buses</span></div>
            <div style={s.stat}><span style={s.statNum}>5</span><span style={s.statLabel}>Routes</span></div>
            <div style={s.stat}><span style={s.statNum}>1200+</span><span style={s.statLabel}>Students</span></div>
          </div>

          <p style={s.leftFooter}>Metropolitan University · Sylhet</p>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div style={s.right}>
        <div style={s.card}>

          {/* step indicator */}
          <div style={s.stepWrap}>
            <div style={s.stepTrack}>
              <div style={{ ...s.stepBubble, background: "#004A99", color: "#fff" }}>1</div>
              <div style={{ ...s.stepConnector, background: step === 2 ? "#004A99" : "#E0E7F0" }} />
              <div style={{ ...s.stepBubble, background: step === 2 ? "#004A99" : "#E0E7F0", color: step === 2 ? "#fff" : "#aaa" }}>2</div>
            </div>
            <div style={s.stepLabels}>
              <span style={{ ...s.stepLabelText, color: "#004A99" }}>Verify Identity</span>
              <span style={{ ...s.stepLabelText, color: step === 2 ? "#004A99" : "#aaa" }}>Create Account</span>
            </div>
          </div>

          <h2 style={s.heading}>
            {step === 1 ? "Verify your identity" : "Create your account"}
          </h2>
          <p style={s.subheading}>
            {step === 1
              ? "Enter your university-registered details to continue"
              : "Choose a username and secure password"}
          </p>

          {error && (
            <div style={s.errorBox}>
              <span style={{ fontSize: 14 }}>⚠</span> {error}
            </div>
          )}

          {/* ── STEP 1 ── */}
          {step === 1 && (
            <form onSubmit={handleVerify}>
              <div style={s.fieldGroup}>
                <label style={s.label}>Full Name</label>
                <div style={s.inputWrap}>
                  <span style={s.inputIcon}>👤</span>
                  <input
                    style={s.input}
                    type="text"
                    name="name"
                    placeholder="As registered in university"
                    value={verifyData.name}
                    onChange={handleVerifyChange}
                    required
                  />
                </div>
              </div>

              <div style={s.fieldGroup}>
                <label style={s.label}>Student ID</label>
                <div style={s.inputWrap}>
                  <span style={s.inputIcon}>#</span>
                  <input
                    style={s.input}
                    type="text"
                    name="studentId"
                    placeholder="e.g. 231-115-207"
                    value={verifyData.studentId}
                    onChange={handleVerifyChange}
                    required
                  />
                </div>
              </div>

              <div style={s.fieldGroup}>
                <label style={s.label}>Phone Number</label>
                <div style={s.inputWrap}>
                  <span style={s.inputIcon}>📞</span>
                  <input
                    style={s.input}
                    type="text"
                    name="phone"
                    placeholder="Your registered phone number"
                    value={verifyData.phone}
                    onChange={handleVerifyChange}
                    required
                  />
                </div>
              </div>

              <button style={s.btn} type="submit" disabled={loading}>
                {loading ? "Verifying..." : "Verify Identity →"}
              </button>
            </form>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <form onSubmit={handleRegister}>
              <div style={s.verifiedBadge}>
                <span style={{ fontSize: 15 }}>✓</span>
                Verified as: <strong>{accountData.name}</strong>
              </div>

              <div style={s.fieldGroup}>
                <label style={s.label}>Username</label>
                <div style={s.inputWrap}>
                  <span style={s.inputIcon}>@</span>
                  <input
                    style={s.input}
                    type="text"
                    name="username"
                    placeholder="Pick a unique username"
                    value={accountData.username}
                    onChange={handleAccountChange}
                    required
                  />
                </div>
              </div>

              <div style={s.fieldGroup}>
                <label style={s.label}>Password</label>
                <div style={s.inputWrap}>
                  <span style={s.inputIcon}>🔒</span>
                  <input
                    style={s.input}
                    type={showPass ? "text" : "password"}
                    name="password"
                    placeholder="At least 6 characters"
                    value={accountData.password}
                    onChange={handleAccountChange}
                    required
                  />
                  <button type="button" style={s.eyeBtn} onClick={() => setShowPass(v => !v)}>
                    {showPass ? "🙈" : "👁"}
                  </button>
                </div>
              </div>

              <div style={s.fieldGroup}>
                <label style={s.label}>Confirm Password</label>
                <div style={s.inputWrap}>
                  <span style={s.inputIcon}>🔒</span>
                  <input
                    style={s.input}
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Repeat your password"
                    value={accountData.confirmPassword}
                    onChange={handleAccountChange}
                    required
                  />
                  <button type="button" style={s.eyeBtn} onClick={() => setShowConfirm(v => !v)}>
                    {showConfirm ? "🙈" : "👁"}
                  </button>
                </div>
              </div>

              <button style={s.btn} type="submit" disabled={loading}>
                {loading ? "Creating account..." : "Create Account"}
              </button>

              <button
                type="button"
                style={s.backBtn}
                onClick={() => { setStep(1); setError(""); }}
              >
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

const s = {
  page: {
    minHeight: "100vh",
    display: "flex",
    fontFamily: "'Segoe UI', Arial, sans-serif",
    background: "#F0F4FF",
  },

  /* ── LEFT ── */
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
    position: "absolute", inset: 0,
    background: "linear-gradient(135deg, rgba(0,30,80,0.82) 0%, rgba(0,55,128,0.68) 100%)",
  },
  leftContent: {
    position: "relative", zIndex: 2,
    padding: "48px 44px",
    display: "flex", flexDirection: "column", gap: 0,
  },
  leftLogo: {
    display: "flex", alignItems: "center", gap: 8,
    marginBottom: 40,
  },
  leftLogoText: {
    fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: 0.5,
  },
  leftTitle: {
    fontSize: 34, fontWeight: 900, color: "#fff",
    lineHeight: 1.25, marginBottom: 14,
    textShadow: "0 2px 12px rgba(0,0,0,0.4)",
  },
  leftAccent: { color: "#FFE566" },
  leftSub: {
    fontSize: 14, color: "rgba(255,255,255,0.82)",
    lineHeight: 1.75, marginBottom: 26,
  },
  pillRow: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 },
  pill: {
    background: "rgba(255,255,255,0.15)",
    border: "1px solid rgba(255,255,255,0.3)",
    color: "#fff", fontSize: 12, fontWeight: 600,
    padding: "6px 14px", borderRadius: 20,
    backdropFilter: "blur(6px)",
  },
  stats: {
    display: "flex", gap: 28, marginTop: 32, marginBottom: 32,
  },
  stat: { display: "flex", flexDirection: "column" },
  statNum: { fontSize: 26, fontWeight: 900, color: "#FFE566" },
  statLabel: { fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 2 },
  leftFooter: {
    fontSize: 12, color: "rgba(255,255,255,0.45)",
    display: "flex", alignItems: "center", gap: 6,
  },

  /* ── RIGHT ── */
  right: {
    flex: 1,
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: "40px 24px",
    background: "#F0F4FF",
  },
  card: {
    background: "#fff",
    borderRadius: 20,
    padding: "40px 40px 28px",
    width: "100%", maxWidth: 440,
    boxShadow: "0 8px 40px rgba(0,50,120,0.10)",
  },

  /* step indicator */
  stepWrap: { marginBottom: 28 },
  stepTrack: {
    display: "flex", alignItems: "center", justifyContent: "center",
    marginBottom: 8,
  },
  stepBubble: {
    width: 30, height: 30, borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 13, fontWeight: 700,
    transition: "background 0.3s",
  },
  stepConnector: {
    width: 64, height: 3, margin: "0 6px",
    borderRadius: 2, transition: "background 0.3s",
  },
  stepLabels: {
    display: "flex", justifyContent: "center", gap: 58,
  },
  stepLabelText: {
    fontSize: 12, fontWeight: 600, transition: "color 0.3s",
  },

  heading: {
    fontSize: 22, fontWeight: 800, color: "#0D1B3E",
    marginBottom: 6, textAlign: "center",
  },
  subheading: {
    fontSize: 13, color: "#7A8AA0",
    textAlign: "center", marginBottom: 22,
    lineHeight: 1.6,
  },

  errorBox: {
    background: "#FFF0F0", border: "1px solid #FFCDD2",
    color: "#C62828", fontSize: 13, padding: "10px 14px",
    borderRadius: 8, marginBottom: 16,
    display: "flex", alignItems: "center", gap: 8,
  },
  verifiedBadge: {
    background: "#F0FFF4", border: "1px solid #B2DFDB",
    color: "#1B5E20", fontSize: 13, fontWeight: 600,
    padding: "10px 14px", borderRadius: 8, marginBottom: 18,
    display: "flex", alignItems: "center", gap: 8,
  },

  fieldGroup: { marginBottom: 14 },
  label: {
    display: "block", fontSize: 13, fontWeight: 600,
    color: "#3D4F6B", marginBottom: 6,
  },
  inputWrap: {
    display: "flex", alignItems: "center",
    border: "1.5px solid #D8E3F0", borderRadius: 10,
    overflow: "hidden", background: "#F8FAFF",
    transition: "border-color 0.2s",
  },
  inputIcon: {
    padding: "0 12px", fontSize: 14, color: "#8A9BBF",
    userSelect: "none",
  },
  input: {
    flex: 1, border: "none", outline: "none",
    padding: "11px 4px 11px 0",
    fontSize: 14, color: "#1A2340",
    background: "transparent",
  },
  eyeBtn: {
    background: "none", border: "none",
    padding: "0 12px", cursor: "pointer",
    fontSize: 15, color: "#8A9BBF",
  },

  btn: {
    width: "100%", padding: "13px",
    background: "linear-gradient(135deg, #004A99 0%, #0066CC 100%)",
    color: "#fff", border: "none", borderRadius: 10,
    fontSize: 15, fontWeight: 700, cursor: "pointer",
    marginTop: 6, letterSpacing: 0.3,
    boxShadow: "0 4px 16px rgba(0,74,153,0.3)",
  },
  backBtn: {
    width: "100%", padding: "11px",
    background: "transparent", color: "#004A99",
    border: "1.5px solid #004A99", borderRadius: 10,
    fontSize: 14, fontWeight: 600, cursor: "pointer",
    marginTop: 10,
  },

  switchText: {
    textAlign: "center", fontSize: 13,
    color: "#7A8AA0", marginTop: 20,
  },
  switchLink: {
    color: "#004A99", fontWeight: 700,
    textDecoration: "none",
  },
  footer: {
    textAlign: "center", fontSize: 11,
    color: "#BDC8D8", marginTop: 18,
  },
};