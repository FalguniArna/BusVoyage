import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.user.role === "student") navigate("/student-dashboard");
      else if (res.data.user.role === "driver") navigate("/driver-dashboard");
      else if (res.data.user.role === "admin") navigate("/admin-dashboard");

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
        <h3 style={styles.heading}>Login to your account</h3>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Username</label>
          <input style={styles.input} type="text" name="username"
            placeholder="Your username"
            value={formData.username} onChange={handleChange} required />

          <label style={styles.label}>Password</label>
          <input style={styles.input} type="password" name="password"
            placeholder="Your password"
            value={formData.password} onChange={handleChange} required />

          <button style={styles.btn} type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={styles.switch}>
          Don't have an account? <Link to="/register" style={styles.link}>Register</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "linear-gradient(to right, #a6aeb6, #3A86FF)", display: "flex", justifyContent: "center", alignItems: "center" },
  card: { background: "white", padding: "40px", borderRadius: "16px", width: "100%", maxWidth: "400px", boxShadow: "0 10px 30px rgba(0,0,0,0.15)" },
  logo: { color: "#004A99", textAlign: "center", marginBottom: "4px" },
  heading: { textAlign: "center", color: "#333", marginBottom: "24px" },
  label: { display: "block", marginBottom: "6px", color: "#555", fontSize: "14px" },
  input: { width: "100%", padding: "10px 14px", marginBottom: "16px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" },
  btn: { width: "100%", padding: "12px", background: "#004A99", color: "white", border: "none", borderRadius: "8px", fontSize: "16px", cursor: "pointer", marginTop: "4px" },
  error: { color: "#E31E24", marginBottom: "12px", fontSize: "14px", background: "#fff0f0", padding: "8px 12px", borderRadius: "6px" },
  switch: { textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#666" },
  link: { color: "#004A99", fontWeight: "bold" }
};