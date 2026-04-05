import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={s.page}>

      <nav style={s.nav}>
        <div style={s.logo}>
          <span style={{ fontSize: 24 }}>🚌</span>
          <span style={s.logoText}>BusVoyage</span>
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          <button style={s.loginBtn}    onClick={() => navigate("/login")}>Login</button>
          <button style={s.registerBtn} onClick={() => navigate("/register")}>Register</button>
        </div>
      </nav>

      <section style={s.heroWrap}>
        <div style={s.campusBg} />
        <div style={s.darkOverlay} />

        <div style={s.heroOverlay}>
          <h1 style={s.heroTitle}>
            Campus Bus<br />
            <span style={s.heroAccent}>Tracking System</span>
          </h1>
          <p style={s.heroSub}>Track buses · Check routes · Stay updated in real-time</p>
          <button style={s.ctaBtn} onClick={() => navigate("/register")}>Get Started →</button>
        </div>

        <div style={s.roadScene}>
          <div style={s.road}>
            <div style={s.roadYellowTop} />
            <div style={s.roadYellowBot} />
            <div className="road-dash" />
          </div>
          <img src="/bus.png" alt="MU Bus" className="hero-bus" />
        </div>

      </section>

      <section style={s.section}>
        <div style={s.sectionLabel}>What We Offer</div>
  
        <div style={s.featuresGrid}>
          {FEATURES.map((f, i) => (
            <div key={i} style={s.featureCard}>
              <div style={{ ...s.featureIcon, background: f.bg }}>
                <span style={{ fontSize: 28 }}>{f.icon}</span>
              </div>
              <h3 style={s.featureName}>{f.title}</h3>
              <p style={s.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={s.twoCol}>
        <div style={s.card}>
          <div style={s.cardHeader}>
            <span style={{ fontSize: 22 }}>🛣️</span>
            <h3 style={s.cardTitle}>Active Routes</h3>
          </div>
          {ROUTES.map((r, i) => (
            <div key={i} style={s.routeRow}>
              <div>
                <div style={s.routeName}>{r.name}</div>
                <div style={s.routeSub}>{r.stops} stops · {r.time}</div>
              </div>
              <span style={{ ...s.badge, background: r.bg, color: r.color }}>{r.status}</span>
            </div>
          ))}
        </div>

        <div style={s.card}>
          <div style={s.cardHeader}>
            <span style={{ fontSize: 22 }}>🕐</span>
            <h3 style={s.cardTitle}>Bus Schedule</h3>
          </div>
          {TIMES.map((t, i) => (
            <div key={i} style={s.timeRow}>
              <div>
                <div style={s.routeName}>{t.title}</div>
                <div style={s.routeSub}>{t.desc}</div>
              </div>
              <span style={s.timeTag}>{t.time}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ ...s.section, background: "#fff" }}>
        <div style={s.sectionLabel}>Simple Process</div>
        <h2 style={s.sectionTitle}>How BusVoyage works</h2>
        <div style={s.stepsRow}>
          {STEPS.map((step, i) => (
            <div key={i} style={s.step}>
              <div style={{ ...s.stepNum, background: step.color }}>{i + 1}</div>
              <div style={{ fontSize: 34, marginBottom: 10 }}>{step.icon}</div>
              <div style={s.stepTitle}>{step.title}</div>
              <div style={s.stepDesc}>{step.desc}</div>
              {i < STEPS.length - 1 && <div style={s.stepArrow}>→</div>}
            </div>
          ))}
        </div>
      </section>

      <footer style={s.footer}>
        <div style={s.footerGrid}>
          <div>
            <div style={s.footerLogo}>🚌 BusVoyage</div>
            <p style={s.footerSub}>Campus Bus Tracking System<br />Metropolitan University, Sylhet</p>
          </div>
          <div>
            <div style={s.footerHead}>Quick Links</div>
            <div style={s.footerLink}>Routes</div>
            <div style={s.footerLink}>Live Map</div>
            <div style={s.footerLink}>Schedule</div>
          </div>
          <div>
            <div style={s.footerHead}>Support</div>
            <div style={s.footerLink}>Help Center</div>
            <div style={s.footerLink}>Contact</div>
            <div style={s.footerLink}>Report Issue</div>
          </div>
        </div>
        <div style={s.copyright}>© 2026 BusVoyage • Metropolitan University</div>
      </footer>

    </div>
  );
}

const FEATURES = [
  { 
    icon: "🚌", 
    title: "Live Bus Tracking",   
     desc: "See exactly where your bus is — updated by drivers in real time.", bg: "#e3f2fd" },
  { icon: "💺", title: "Crowd Status",         
     desc: "Know if seats are available before you reach the stop.",           bg: "#e9f7ef" },
  { icon: "📢", title: "Announcements",       
      desc: "Get urgent transport notices instantly.",                         
       bg: "#fdecea" },
  { icon: "🧾", title: "Complaints & Feedback", desc: "Report issues directly to the transport office easily.",           bg: "#fff8e1" },
];

const ROUTES = [
  { name: "Tilagor Route",     stops: "7", time: "~35 min", status: "Active",  color: "#28A745", bg: "#e9f7ef" },
  { name: "Amberkhana Route",  stops: "5", time: "~25 min", status: "On Time", color: "#004A99", bg: "#e3f2fd" },
  { name: "City Centre Route", stops: "6", time: "~40 min", status: "Delayed", color: "#E31E24", bg: "#fdecea" },
];

const TIMES = [
  { title: "Morning Trip",   desc: "Picks up from all stops", time: "07:00 – 09:00" },
  { title: "Hourly Shuttle", desc: "Campus ↔ Zindabazar",    time: "Every Hour"     },
  { title: "Afternoon Trip", desc: "Returns from campus",     time: "16:00 – 18:00" },
];

const STEPS = [
  { icon: "📝", title: "Register", desc: "Sign up with your student ID",        color: "#004A99" },
  { icon: "🔍", title: "Track",    desc: "See live bus location & crowd status", color: "#28A745" },
  { icon: "🚌", title: "Board",    desc: "Catch your bus stress-free",           color: "#E31E24" },
  { icon: "✅", title: "Arrive",   desc: "Reach campus on time, every time",     color: "#FFA500" },
];

const s = {
  page: { fontFamily: "'Segoe UI', Arial, sans-serif", background: "#F8F9FA", margin: 0 },

  nav: {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "14px 40px",
    background: "rgba(255,255,255,0.96)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
  },
  logo:        { display: "flex", alignItems: "center", gap: 8 },

  logoText:    { fontSize: 20, fontWeight: 800, color: "#004A99" },

  loginBtn:    { padding: "8px 18px", border: "1.5px solid #004A99", color: "#004A99", background: "white", borderRadius: 8, fontWeight: 600, cursor: "pointer", fontSize: 14 },

  registerBtn: { padding: "8px 18px", background: "#004A99", color: "white", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer", fontSize: 14 },

  heroWrap: {
    marginTop: 64,
    height: "88vh",
    minHeight: 520,
    position: "relative",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },

  campusBg: {
    position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
    backgroundImage: "url('/mu.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center top",
    filter: "brightness(0.82) saturate(1.1)",
  },

  darkOverlay: {
    position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
    background: "linear-gradient(to bottom, rgba(0,15,50,0.52) 0%, rgba(0,15,50,0.18) 55%, transparent 78%)",
  },

  heroOverlay: {
    position: "absolute",
    top: "34%", left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    zIndex: 10,
    width: "90%", maxWidth: 640,
  },
  heroTitle:  { 
    fontSize: 46, 
    fontWeight: 900, 
    color: "#fff", 
    lineHeight: 1.2, 
    marginBottom: 14,
     textShadow: "0 2px 20px rgba(0,0,0,0.65)" },
  heroAccent: { color: "#FFE566" },
  heroSub:    { 
    fontSize: 16, 
    color: "rgba(255,255,255,0.92)", 
    marginBottom: 28,
     fontWeight: 500, 
     textShadow: "0 1px 8px rgba(0,0,0,0.5)" },

  ctaBtn:  { 
    padding: "14px 32px", 
    background: "#E31E24",
     color: "#fff", 
     border: "none", 
     borderRadius: 10, 
     fontWeight: 700, 
     fontSize: 15, 
     cursor: "pointer", 
     boxShadow: "0 4px 18px rgba(227,30,36,0.4)" },

  roadScene: {
    position: "absolute",
    bottom: 0, left: 0, right: 0,
    height: 90,
    zIndex: 5,
  },

  road: {
    position: "absolute",
    height:90,
    top: 0, left: 0, right: 0, bottom: 0,
    background: "linear-gradient(to bottom, #455A64 0%, #37474F 50%, #2E3B40 100%)",
    boxShadow: "inset 0 4px 10px rgba(0,0,0,0.35)",
    overflow: "hidden",
  },

  roadYellowTop: {
    position: "absolute", top: 0, left: 0, right: 0,
    height: 5,
    background: "linear-gradient(to right, #FFD600, #FFC107, #FFD600)",
  },
  roadYellowBot: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    height: 5,
    background: "linear-gradient(to right, #FFD600, #FFC107, #FFD600)",
  },

  section:      { padding: "60px 40px" },
  sectionLabel: { 
    fontSize: 18, 
    fontWeight: 700, 
    color: "#004A99", 
    letterSpacing: 2,
     textTransform: "uppercase", 
     marginBottom: 8 
    },
  sectionTitle: { 
    fontSize: 28, 
    fontWeight: 800, 
    color: "#2D2D2D",
     marginBottom: 36, 
     maxWidth: 500 },

  featuresGrid: {
     display: "grid", 
     gridTemplateColumns: "repeat(4,1fr)",
      gap: 20 },
  featureCard:  { 
    background: "#fff", 
    padding: "26px 22px", 
    borderRadius: 16, 
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)", 
    border: "1px solid #f0f0f0" 
  },
  featureIcon:  { 
    width: 56,
     height: 56, 
     borderRadius: 14, 
     display: "flex", 
     alignItems: "center", 
     justifyContent: "center", 
     marginBottom: 14 },
  featureName:  { 
    fontSize: 15,
     fontWeight: 700, 
     color: "#2D2D2D",
      marginBottom: 8 },
  featureDesc:  { 
    fontSize: 13, 
    color: "#888", 
    lineHeight: 1.6 
  },

  twoCol:    
   { 
    display: "grid", 
    gridTemplateColumns: "1fr 1fr", gap: 24, padding: "0 40px 60px" 
  },
  card:       {
     background: "#fff", 
     borderRadius: 16, 
     padding: 24, 
     boxShadow: "0 2px 12px rgba(0,0,0,0.06)", 
     border: "1px solid #f0f0f0" 
    },
  cardHeader: { 
    display: "flex", 
    alignItems: "center",
     gap: 10,
    marginBottom: 20 
    },
  cardTitle:  
  { 
    fontSize: 16, 
    fontWeight: 800, 
    color: "#2D2D2D" 
  },
  routeRow:   { 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    padding: "12px 0", 
    borderBottom: "1px solid #f5f5f5" 
  },
  routeName:  { 
    fontSize: 14, 
    fontWeight: 600, 
    color: "#2D2D2D",
     marginBottom: 3 },
  routeSub:   {
     fontSize: 12, 
     color: "#aaa" 
    },
  badge:      { 
    fontSize: 11, 
    fontWeight: 700, 
    padding: "4px 12px", 
    borderRadius: 20 
  },
  timeRow:    { 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center",
     padding: "12px 14px", 
     borderRadius: 10, 
     background: "#f8f9fa", 
     marginBottom: 10 
    },
  timeTag:    { 
    fontSize: 12, 
    fontWeight: 700, 
    color: "#004A99", 
    background: "#e3f2fd", 
    padding: "4px 10px", 
    borderRadius: 8 
  },

  stepsRow:  { 
    display: "flex", 
    alignItems: "flex-start", 
    justifyContent: "center", 
    gap: 8, flexWrap: "wrap" 
  },
  step:      { 
    flex: 1, 
    minWidth: 160, 
    maxWidth: 200, 
    textAlign: "center", 
    padding: "20px 16px", 
    position: "relative" 
  },
  stepNum:   { 
    width: 36, 
    height: 36, 
    borderRadius: "50%", 
    color: "#fff", 
    fontWeight: 800, 
    fontSize: 16, 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
    margin: "0 auto 12px"
   },
  stepTitle: {
     fontSize: 14, 
     fontWeight: 700, 
     color: "#2D2D2D", 
     marginBottom: 6 
    },
  stepDesc:  { 
    fontSize: 12, 
    color: "#888",
     lineHeight: 1.5 
    },
  stepArrow: { 
    position: "absolute", 
    right: -10, top: "42%", 
    fontSize: 22, color: "#ccc"
   },

  footer:    
   { 
    background: "#002B5B", 
    color: "#fff",
     padding: "48px 40px 28px" 
  },
  footerGrid: {
     display: "grid", 
     gridTemplateColumns: "2fr 1fr 1fr", gap: 40, marginBottom: 32 
    },
  footerLogo: { 
    fontSize: 20, 
    fontWeight: 800, 
    marginBottom: 10 
  },
  footerSub:  { 
    fontSize: 13, 
    color: "#a8c8ff", 
    lineHeight: 1.7 
  },
  footerHead: { 
    fontSize: 13, 
    fontWeight: 700, 
    marginBottom: 14 
  },
  footerLink: { 
    fontSize: 13, 
    color: "#a8c8ff", 
    marginBottom: 8, 
    cursor: "pointer" },
  copyright:  {
     textAlign: "center", 
     fontSize: 13, 
     color: "#6b9ecf", 
     borderTop: "1px solid rgba(255,255,255,0.12)", 
     paddingTop: 20
     },
};