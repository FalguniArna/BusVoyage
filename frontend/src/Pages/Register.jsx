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

  const handleVerifyChange = (e) => {
    setVerifyData({ ...verifyData, [e.target.name]: e.target.value });
  };

  const handleAccountChange = (e) => {
    setAccountData({ ...accountData, [e.target.name]: e.target.value });
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/verify-student", verifyData);
      setAccountData(prev => ({ ...prev, studentId: res.data.studentId, name: res.data.name }));
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (accountData.password !== accountData.confirmPassword) return setError("Passwords do not match.");
    if (accountData.password.length < 6) return setError("Password must be at least 6 characters.");
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/register", accountData);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.logo}>🚌 BusVoyage</h2>

        <div style={styles.stepRow}>
          <div style={{ ...styles.stepDot, background: "#004A99" }}>1</div>
          <div style={{ ...styles.stepLine, background: step === 2 ? "#004A99" : "#ddd" }} />
          <div style={{ ...styles.stepDot, background: step === 2 ? "#004A99" : "#ddd" }}>2</div>
        </div>
        <p style={styles.stepLabel}>{step === 1 ? "Verify your identity" : "Create your account"}</p>

        {error && <p style={styles.error}>{error}</p>}

        {step === 1 && (
          <form onSubmit={handleVerify}>
            <label style={styles.label}>Full Name</label>
            <input style={styles.input} type="text" name="name"
              placeholder="As registered in university"
              value={verifyData.name} onChange={handleVerifyChange} required />

            <label style={styles.label}>Student ID</label>
            <input style={styles.input} type="text" name="studentId"
              placeholder="e.g. 231-115-207"
              value={verifyData.studentId} onChange={handleVerifyChange} required />

            <label style={styles.label}>Phone Number</label>
            <input style={styles.input} type="text" name="phone"
              placeholder="Your registered phone number"
              value={verifyData.phone} onChange={handleVerifyChange} required />

            <button style={styles.btn} type="submit" disabled={loading}>
              {loading ? "Verifying..." : "Verify Identity →"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleRegister}>
            <p style={styles.verified}>✅ Verified as: <strong>{accountData.name}</strong></p>

            <label style={styles.label}>Choose a Username</label>
            <input style={styles.input} type="text" name="username"
              placeholder="Pick a unique username"
              value={accountData.username} onChange={handleAccountChange} required />

            <label style={styles.label}>Password</label>
            <input style={styles.input} type="password" name="password"
              placeholder="At least 6 characters"
              value={accountData.password} onChange={handleAccountChange} required />

            <label style={styles.label}>Confirm Password</label>
            <input style={styles.input} type="password" name="confirmPassword"
              placeholder="Repeat your password"
              value={accountData.confirmPassword} onChange={handleAccountChange} required />

            <button style={styles.btn} type="submit" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </button>

            <button type="button" style={styles.backBtn}
              onClick={() => { setStep(1); setError(""); }}>
              ← Go back
            </button>
          </form>
        )}

        <p style={styles.switch}>
          Already have an account? <Link to="/login" style={styles.link}>Login</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "linear-gradient(to right, #a6aeb6, #3A86FF)", display: "flex", justifyContent: "center", alignItems: "center" },
  card: { background: "white", padding: "40px", borderRadius: "16px", width: "100%", maxWidth: "420px", boxShadow: "0 10px 30px rgba(0,0,0,0.15)" },
  logo: { color: "#004A99", textAlign: "center", marginBottom: "20px" },
  stepRow: { display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "8px" },
  stepDot: { width: "28px", height: "28px", borderRadius: "50%", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "bold" },
  stepLine: { width: "60px", height: "3px", margin: "0 6px" },
  stepLabel: { textAlign: "center", color: "#555", fontSize: "14px", marginBottom: "20px" },
  label: { display: "block", marginBottom: "6px", color: "#555", fontSize: "14px" },
  input: { width: "100%", padding: "10px 14px", marginBottom: "14px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" },
  btn: { width: "100%", padding: "12px", background: "#004A99", color: "white", border: "none", borderRadius: "8px", fontSize: "15px", cursor: "pointer", marginTop: "4px" },
  backBtn: { width: "100%", padding: "10px", background: "transparent", color: "#004A99", border: "1px solid #004A99", borderRadius: "8px", fontSize: "14px", cursor: "pointer", marginTop: "10px" },
  error: { color: "#E31E24", marginBottom: "12px", fontSize: "14px", background: "#fff0f0", padding: "8px 12px", borderRadius: "6px" },
  verified: { fontSize: "14px", color: "#28a745", background: "#f0fff4", padding: "8px 12px", borderRadius: "6px", marginBottom: "16px" },
  switch: { textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#666" },
  link: { color: "#004A99", fontWeight: "bold" }
};