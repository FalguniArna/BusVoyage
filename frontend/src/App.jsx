// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./Pages/Home";
// import Login from "./Pages/Login";
// import Register from "./Pages/Register";
// import StudentDashboard from "./Pages/StudentDashboard";
// import Driver from "./Pages/Driver";
// import Admin from "./Pages/Admin";
// import About from "./Pages/About";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/student-dashboard" element={<StudentDashboard />} />
//         <Route path="/driver" element={<Driver />} />
//            <Route path="/admin" element={<Admin />} />
//             <Route path="/about" element={<About />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }





import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import StudentDashboard from "./Pages/StudentDashboard";
import Driver from "./Pages/Driver";
import Admin from "./Pages/Admin";
import About from "./Pages/About";
//import { Admin } from "mongodb";

function WakingUp({ elapsed }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0A1628",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Segoe UI', Arial, sans-serif",
      gap: 20
    }}>
      {/* Spinning bus */}
      <div style={{ fontSize: 56, animation: "spin 1.5s linear infinite" }}>🚌</div>

      <div style={{ textAlign: "center" }}>
        <div style={{ color: "#fff", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
          BusVoyage
        </div>
        <div style={{ color: "#64748b", fontSize: 14 }}>
          Starting up the server, please wait...
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        width: 260, height: 4,
        background: "rgba(255,255,255,0.1)",
        borderRadius: 4, overflow: "hidden"
      }}>
        <div style={{
          height: "100%",
          width: `${Math.min((elapsed / 50) * 100, 95)}%`,
          background: "linear-gradient(90deg, #3b82f6, #60a5fa)",
          borderRadius: 4,
          transition: "width 1s ease"
        }} />
      </div>

      <div style={{ color: "#475569", fontSize: 12 }}>
        {elapsed < 10 && "Connecting to server..."}
        {elapsed >= 10 && elapsed < 25 && "Server is starting up..."}
        {elapsed >= 25 && elapsed < 40 && "Almost ready..."}
        {elapsed >= 40 && "Taking a bit longer than usual..."}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: translateX(-30px) scaleX(1); }
          49% { transform: translateX(30px) scaleX(1); }
          50% { transform: translateX(30px) scaleX(-1); }
          99% { transform: translateX(-30px) scaleX(-1); }
          100% { transform: translateX(-30px) scaleX(1); }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  const [backendReady, setBackendReady] = useState(false);
  const [elapsed, setElapsed]           = useState(0);

  useEffect(() => {
  const counter = setInterval(() => {
    setElapsed(e => e + 1);
  }, 1000);

  // Force show site after clicking live link no matter what
  const forceShow = setTimeout(() => {
    setBackendReady(true);
    clearInterval(counter);
  }, 0);

  const tryWake = async () => {
    try {
      const res = await fetch(`https://busvoyage.onrender.com/ping`);
      if (res.ok) {
        setBackendReady(true);
        clearInterval(counter);
        clearTimeout(forceShow);
      } else {
        setTimeout(tryWake, 3000);
      }
    } catch {
      setTimeout(tryWake, 3000);
    }
  };

  tryWake();
  return () => {
    clearInterval(counter);
    clearTimeout(forceShow);
  };
}, []);

  if (!backendReady) {
    return <WakingUp elapsed={elapsed} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/student-dashboard/:page" element={<StudentDashboard />} />
        <Route path="/driver" element={<Driver />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/:page" element={<Admin />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}