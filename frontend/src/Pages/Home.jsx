<<<<<<< HEAD
import React, { useEffect, useRef, useState } from "react";
=======
// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function Home() {
//   const navigate = useNavigate();

//   return (
//     <div style={s.page}>

//       <nav style={s.nav}>
//         <div style={s.logo}>
//           <span style={{ fontSize: 24 }}>🚌</span>
//           <span style={s.logoText}>BusVoyage</span>
//         </div>
//         <div style={{ display: "flex", gap: 14 }}>
//           <button style={s.loginBtn}    onClick={() => navigate("/login")}>Login</button>
//           <button style={s.registerBtn} onClick={() => navigate("/register")}>Register</button>
//         </div>
//       </nav>

//       <section style={s.heroWrap}>
//         <div style={s.campusBg} />
//         <div style={s.darkOverlay} />

//         <div style={s.heroOverlay}>
//           <h1 style={s.heroTitle}>
//             Campus Bus<br />
//             <span style={s.heroAccent}>Tracking & Management System</span>
//           </h1>
//           <p style={s.heroSub}>Track Buses · Check Routes & Schedules · Stay Updated in Real-time</p>
//           <button style={s.ctaBtn} onClick={() => navigate("/register")}>Get Started →</button>
//         </div>

//         <div style={s.roadScene}>
//           <div style={s.road}>
//             <div style={s.roadYellowTop} />
//             <div style={s.roadYellowBot} />
//             <div className="road-dash" />
//           </div>
//           <img src="/bus.png" alt="MU Bus" className="hero-bus" />
//         </div>

//       </section>

//       <section style={s.section}>
//         <div style={s.sectionLabel}>What We Offer</div>
  
//         <div style={s.featuresGrid}>
//           {FEATURES.map((f, i) => (
//             <div key={i} style={s.featureCard}>
//               <div style={{ ...s.featureIcon, background: f.bg }}>
//                 <span style={{ fontSize: 28 }}>{f.icon}</span>
//               </div>
//               <h3 style={s.featureName}>{f.title}</h3>
//               <p style={s.featureDesc}>{f.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section style={s.twoCol}>
//         <div style={s.card}>
//           <div style={s.cardHeader}>
//             <span style={{ fontSize: 22 }}>🛣️</span>
//             <h3 style={s.cardTitle}>Active Routes</h3>
//           </div>
//           {ROUTES.map((r, i) => (
//             <div key={i} style={s.routeRow}>
//               <div>
//                 <div style={s.routeName}>{r.name}</div>
//                 <div style={s.routeSub}>{r.stops} stops · {r.time}</div>
//               </div>
//               <span style={{ ...s.badge, background: r.bg, color: r.color }}>{r.status}</span>
//             </div>
//           ))}
//         </div>

//         <div style={s.card}>
//           <div style={s.cardHeader}>
//             <span style={{ fontSize: 22 }}>🕐</span>
//             <h3 style={s.cardTitle}>Bus Schedule</h3>
//           </div>
//           {TIMES.map((t, i) => (
//             <div key={i} style={s.timeRow}>
//               <div>
//                 <div style={s.routeName}>{t.title}</div>
//                 <div style={s.routeSub}>{t.desc}</div>
//               </div>
//               <span style={s.timeTag}>{t.time}</span>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section style={{ ...s.section, background: "#fff" }}>
//         <div style={s.sectionLabel}>Simple Process</div>
//         <h2 style={s.sectionTitle}>How BusVoyage works</h2>
//         <div style={s.stepsRow}>
//           {STEPS.map((step, i) => (
//             <div key={i} style={s.step}>
//               <div style={{ ...s.stepNum, background: step.color }}>{i + 1}</div>
//               <div style={{ fontSize: 34, marginBottom: 10 }}>{step.icon}</div>
//               <div style={s.stepTitle}>{step.title}</div>
//               <div style={s.stepDesc}>{step.desc}</div>
//               {i < STEPS.length - 1 && <div style={s.stepArrow}>→</div>}
//             </div>
//           ))}
//         </div>
//       </section>

//       <footer style={s.footer}>
//         <div style={s.footerGrid}>
//           <div>
//             <div style={s.footerLogo}>🚌 BusVoyage</div>
//             <p style={s.footerSub}>Campus Bus Tracking System<br />Metropolitan University, Sylhet</p>
//           </div>
//           <div>
//             <div style={s.footerHead}>Quick Links</div>
//             <div style={s.footerLink}>Routes</div>
//             <div style={s.footerLink}>Live Map</div>
//             <div style={s.footerLink}>Schedule</div>
//           </div>
//           <div>
//             <div style={s.footerHead}>Support</div>
//             <div style={s.footerLink}>Help Center</div>
//             <div style={s.footerLink}>Contact</div>
//             <div style={s.footerLink}>Report Issue</div>
//           </div>
//         </div>
//         <div style={s.copyright}>© 2026 BusVoyage • Metropolitan University</div>
//       </footer>

//     </div>
//   );
// }

// const FEATURES = [
//   { 
//     icon: "🚌", 
//     title: "Live Bus Tracking",   
//      desc: "See exactly where your bus is — updated by drivers in real time.", bg: "#e3f2fd" },
//   { icon: "💺", title: "Crowd Status",         
//      desc: "Know if seats are available before you reach the stop.",           bg: "#e9f7ef" },
//   { icon: "📢", title: "Announcements",       
//       desc: "Get urgent transport notices instantly.",                         
//        bg: "#fdecea" },
//   { icon: "🧾", title: "Complaints & Feedback", desc: "Report issues directly to the transport office easily.",           bg: "#fff8e1" },
// ];

// const ROUTES = [
//   { name: "Tilagor Route",     stops: "7", time: "~35 min", status: "Active",  color: "#28A745", bg: "#e9f7ef" },
//   { name: "Amberkhana Route",  stops: "5", time: "~25 min", status: "On Time", color: "#004A99", bg: "#e3f2fd" },
//   { name: "City Centre Route", stops: "6", time: "~40 min", status: "Delayed", color: "#E31E24", bg: "#fdecea" },
// ];

// const TIMES = [
//   { title: "Morning Trip",   desc: "Picks up from all stops", time: "07:00 – 09:00" },
//   { title: "Hourly Shuttle", desc: "Campus ↔ Zindabazar",    time: "Every Hour"     },
//   { title: "Afternoon Trip", desc: "Returns from campus",     time: "16:00 – 18:00" },
// ];

// const STEPS = [
//   { icon: "📝", title: "Register", desc: "Sign up with your student ID",        color: "#004A99" },
//   { icon: "🔍", title: "Track",    desc: "See live bus location & crowd status", color: "#28A745" },
//   { icon: "🚌", title: "Board",    desc: "Catch your bus stress-free",           color: "#E31E24" },
//   { icon: "✅", title: "Arrive",   desc: "Reach campus on time, every time",     color: "#FFA500" },
// ];

// const s = {
//   page: { fontFamily: "'Segoe UI', Arial, sans-serif", background: "#F8F9FA", margin: 0 },

//   nav: {
//     position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
//     display: "flex", justifyContent: "space-between", alignItems: "center",
//     padding: "14px 40px",
//     background: "rgba(255,255,255,0.96)",
//     backdropFilter: "blur(10px)",
//     boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
//   },
//   logo:        { display: "flex", alignItems: "center", gap: 8 },

//   logoText:    { fontSize: 20, fontWeight: 800, color: "#004A99" },

//   loginBtn:    { padding: "8px 18px", border: "1.5px solid #004A99", color: "#004A99", background: "white", borderRadius: 8, fontWeight: 600, cursor: "pointer", fontSize: 14 },

//   registerBtn: { padding: "8px 18px", background: "#004A99", color: "white", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer", fontSize: 14 },

//   heroWrap: {
//     marginTop: 64,
//     height: "88vh",
//     minHeight: 520,
//     position: "relative",
//     overflow: "hidden",
//     display: "flex",
//     flexDirection: "column",
//   },

//   campusBg: {
//     position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
//     backgroundImage: "url('/mu.jpg')",
//     backgroundSize: "cover",
//     backgroundPosition: "center top",
//     filter: "brightness(0.82) saturate(1.1)",
//   },

//   darkOverlay: {
//     position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
//     background: "linear-gradient(to bottom, rgba(0,15,50,0.52) 0%, rgba(0,15,50,0.18) 55%, transparent 78%)",
//   },

//   heroOverlay: {
//     position: "absolute",
//     top: "34%", left: "50%",
//     transform: "translate(-50%, -50%)",
//     textAlign: "center",
//     zIndex: 10,
//     width: "90%", maxWidth: 640,
//   },
//   heroTitle:  { 
//     fontSize: 46, 
//     fontWeight: 900, 
//     color: "#fff", 
//     lineHeight: 1.2, 
//     marginBottom: 14,
//      textShadow: "0 2px 20px rgba(0,0,0,0.65)" },
//   heroAccent: { color: "#FFE566" },
//   heroSub:    { 
//     fontSize: 16, 
//     color: "rgba(255,255,255,0.92)", 
//     marginBottom: 28,
//      fontWeight: 500, 
//      textShadow: "0 1px 8px rgba(0,0,0,0.5)" },

//   ctaBtn:  { 
//     padding: "14px 32px", 
//     background: "#E31E24",
//      color: "#fff", 
//      border: "none", 
//      borderRadius: 10, 
//      fontWeight: 700, 
//      fontSize: 15, 
//      cursor: "pointer", 
//      boxShadow: "0 4px 18px rgba(227,30,36,0.4)" },

//   roadScene: {
//     position: "absolute",
//     bottom: 0, left: 0, right: 0,
//     height: 90,
//     zIndex: 5,
//   },

//   road: {
//     position: "absolute",
//     height:90,
//     top: 0, left: 0, right: 0, bottom: 0,
//     background: "linear-gradient(to bottom, #455A64 0%, #37474F 50%, #2E3B40 100%)",
//     boxShadow: "inset 0 4px 10px rgba(0,0,0,0.35)",
//     overflow: "hidden",
//   },

//   roadYellowTop: {
//     position: "absolute", top: 0, left: 0, right: 0,
//     height: 5,
//     background: "linear-gradient(to right, #FFD600, #FFC107, #FFD600)",
//   },
//   roadYellowBot: {
//     position: "absolute", bottom: 0, left: 0, right: 0,
//     height: 5,
//     background: "linear-gradient(to right, #FFD600, #FFC107, #FFD600)",
//   },

//   section:      { padding: "60px 40px" },
//   sectionLabel: { 
//     fontSize: 18, 
//     fontWeight: 700, 
//     color: "#004A99", 
//     letterSpacing: 2,
//      textTransform: "uppercase", 
//      marginBottom: 8 
//     },
//   sectionTitle: { 
//     fontSize: 28, 
//     fontWeight: 800, 
//     color: "#2D2D2D",
//      marginBottom: 36, 
//      maxWidth: 500 },

//   featuresGrid: {
//      display: "grid", 
//      gridTemplateColumns: "repeat(4,1fr)",
//       gap: 20 },
//   featureCard:  { 
//     background: "#fff", 
//     padding: "26px 22px", 
//     borderRadius: 16, 
//     boxShadow: "0 2px 12px rgba(0,0,0,0.06)", 
//     border: "1px solid #f0f0f0" 
//   },
//   featureIcon:  { 
//     width: 56,
//      height: 56, 
//      borderRadius: 14, 
//      display: "flex", 
//      alignItems: "center", 
//      justifyContent: "center", 
//      marginBottom: 14 },
//   featureName:  { 
//     fontSize: 15,
//      fontWeight: 700, 
//      color: "#2D2D2D",
//       marginBottom: 8 },
//   featureDesc:  { 
//     fontSize: 13, 
//     color: "#888", 
//     lineHeight: 1.6 
//   },

//   twoCol:    
//    { 
//     display: "grid", 
//     gridTemplateColumns: "1fr 1fr", gap: 24, padding: "0 40px 60px" 
//   },
//   card:       {
//      background: "#fff", 
//      borderRadius: 16, 
//      padding: 24, 
//      boxShadow: "0 2px 12px rgba(0,0,0,0.06)", 
//      border: "1px solid #f0f0f0" 
//     },
//   cardHeader: { 
//     display: "flex", 
//     alignItems: "center",
//      gap: 10,
//     marginBottom: 20 
//     },
//   cardTitle:  
//   { 
//     fontSize: 16, 
//     fontWeight: 800, 
//     color: "#2D2D2D" 
//   },
//   routeRow:   { 
//     display: "flex", 
//     justifyContent: "space-between", 
//     alignItems: "center", 
//     padding: "12px 0", 
//     borderBottom: "1px solid #f5f5f5" 
//   },
//   routeName:  { 
//     fontSize: 14, 
//     fontWeight: 600, 
//     color: "#2D2D2D",
//      marginBottom: 3 },
//   routeSub:   {
//      fontSize: 12, 
//      color: "#aaa" 
//     },
//   badge:      { 
//     fontSize: 11, 
//     fontWeight: 700, 
//     padding: "4px 12px", 
//     borderRadius: 20 
//   },
//   timeRow:    { 
//     display: "flex", 
//     justifyContent: "space-between", 
//     alignItems: "center",
//      padding: "12px 14px", 
//      borderRadius: 10, 
//      background: "#f8f9fa", 
//      marginBottom: 10 
//     },
//   timeTag:    { 
//     fontSize: 12, 
//     fontWeight: 700, 
//     color: "#004A99", 
//     background: "#e3f2fd", 
//     padding: "4px 10px", 
//     borderRadius: 8 
//   },

//   stepsRow:  { 
//     display: "flex", 
//     alignItems: "flex-start", 
//     justifyContent: "center", 
//     gap: 8, flexWrap: "wrap" 
//   },
//   step:      { 
//     flex: 1, 
//     minWidth: 160, 
//     maxWidth: 200, 
//     textAlign: "center", 
//     padding: "20px 16px", 
//     position: "relative" 
//   },
//   stepNum:   { 
//     width: 36, 
//     height: 36, 
//     borderRadius: "50%", 
//     color: "#fff", 
//     fontWeight: 800, 
//     fontSize: 16, 
//     display: "flex", 
//     alignItems: "center", 
//     justifyContent: "center", 
//     margin: "0 auto 12px"
//    },
//   stepTitle: {
//      fontSize: 14, 
//      fontWeight: 700, 
//      color: "#2D2D2D", 
//      marginBottom: 6 
//     },
//   stepDesc:  { 
//     fontSize: 12, 
//     color: "#888",
//      lineHeight: 1.5 
//     },
//   stepArrow: { 
//     position: "absolute", 
//     right: -10, top: "42%", 
//     fontSize: 22, color: "#ccc"
//    },

//   footer:    
//    { 
//     background: "#002B5B", 
//     color: "#fff",
//      padding: "48px 40px 28px" 
//   },
//   footerGrid: {
//      display: "grid", 
//      gridTemplateColumns: "2fr 1fr 1fr", gap: 40, marginBottom: 32 
//     },
//   footerLogo: { 
//     fontSize: 20, 
//     fontWeight: 800, 
//     marginBottom: 10 
//   },
//   footerSub:  { 
//     fontSize: 13, 
//     color: "#a8c8ff", 
//     lineHeight: 1.7 
//   },
//   footerHead: { 
//     fontSize: 13, 
//     fontWeight: 700, 
//     marginBottom: 14 
//   },
//   footerLink: { 
//     fontSize: 13, 
//     color: "#a8c8ff", 
//     marginBottom: 8, 
//     cursor: "pointer" },
//   copyright:  {
//      textAlign: "center", 
//      fontSize: 13, 
//      color: "#6b9ecf", 
//      borderTop: "1px solid rgba(255,255,255,0.12)", 
//      paddingTop: 20
//      },
// };



import React from "react";
>>>>>>> 41eb8645a91cfb9c8bb97ffe0379bf1a7ac5b04e
import { useNavigate } from "react-router-dom";
function useCounter(target, duration = 1800) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let start = null;
      const step = ts => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        setVal(Math.floor(p * target));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return [val, ref];
}

/* ── scroll*/
function useReveal() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function Reveal({ children, delay = 0 }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "none" : "translateY(28px)",
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
    }}>{children}</div>
  );
}

<<<<<<< HEAD
function StatCounter({ target, suffix = "" }) {
  const [val, ref] = useCounter(target);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}


const GALLERY = [
  "/bus1.png",
  "/bus5.jpg",
  "/bus2.jpeg",
  "/bus1.png",
  "/bus5.jpg",
  "/bus2.jpeg",
];

const FEATURES = [
  { icon: "📡", title: "Live Bus Tracking",     desc: "See exactly where your bus is — real-time updates from drivers.",  bg: "rgba(227,30,36,0.10)",  line: "#E31E24" },
  { icon: "💺", title: "Crowd Status",          desc: "Know seat availability before you walk to the stop.",              bg: "rgba(0,43,91,0.10)",    line: "#002B5B" },
  { icon: "🔔", title: "Smart Announcements",   desc: "Instant transport notices — no more WhatsApp chaos.",              bg: "rgba(255,193,7,0.15)",  line: "#d97706" },
  { icon: "🧾", title: "Complaints & Feedback", desc: "Report issues and track resolution — all in one place.",           bg: "rgba(0,43,91,0.06)",    line: "#002B5B" },
];

const ROUTES = [
  { name: "Tilagor Route",     stops: "7", time: "~35 min", status: "Active",  color: "#22c55e" },
  { name: "Amberkhana Route",  stops: "5", time: "~25 min", status: "On Time", color: "#60a5fa" },
  { name: "City Centre Route", stops: "6", time: "~40 min", status: "Delayed", color: "#f87171" },
];

const TIMES = [
  { title: "Morning Trip",   desc: "All stops",            time: "07:00 – 09:00" },
  { title: "Hourly Shuttle", desc: "Campus ↔ Zindabazar", time: "Every Hour"    },
  { title: "Evening Return", desc: "From campus",          time: "16:00 – 18:00" },
];

const STEPS = [
  { icon: "📝", title: "Register", desc: "Sign up with your MU student ID in under 2 minutes.", color: "#E31E24" },
  { icon: "🔍", title: "Track",    desc: "Open the live board — see every bus in real time.",    color: "#002B5B" },
  { icon: "🚌", title: "Board",    desc: "You know where it is — no guessing, no waiting.",      color: "#1d4ed8" },
  { icon: "✅", title: "Arrive",   desc: "Reach campus on time, every single day.",               color: "#16a34a" },
];

const IMPACTS = [
  { num: 8,    suffix: "+", label: "Active Buses"   },
  { num: 5,    suffix: "",  label: "Routes"          },
  { num: 1200, suffix: "+", label: "Daily Students" },
  { num: 98,   suffix: "%", label: "On-Time Rate"   },
  { num: 32,   suffix: "",  label: "Bus Stops"      },
];

/* ── Routes Modal ── */
function RoutesModal({ onClose }) {
  return (
    <div style={modal.overlay} onClick={onClose}>
      <div style={modal.box} onClick={e => e.stopPropagation()}>
        <div style={modal.header}>
          <div>
            <div style={modal.pill}>All Routes</div>
            <h2 style={modal.title}>Bus Routes</h2>
            <p style={modal.sub}>Covering all major areas around Metropolitan University, Sylhet</p>
=======
      {/* Navbar */}
      <nav style={s.nav}>
        <div style={s.logo}>
          <span style={{ fontSize: 24 }}>🚌</span>
          <span style={s.logoText}>BusVoyage</span>
        </div>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <span style={s.navLink} onClick={() => navigate("/about")}>About Us</span>
          <button style={s.loginBtn}    onClick={() => navigate("/login")}>Login</button>
          <button style={s.registerBtn} onClick={() => navigate("/register")}>Register</button>
        </div>
      </nav>

      {/* Hero */}
      <section style={s.heroWrap}>
        <div style={s.campusBg} />
        <div style={s.darkOverlay} />

        <div style={s.heroOverlay}>
          <h1 style={s.heroTitle}>
            Campus Bus<br />
            <span style={s.heroAccent}>Management System</span>
          </h1>
          <p style={s.heroSub}>Track buses · Check routes · Stay updated in real-time</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button style={s.ctaRed} onClick={() => navigate("/register")}>Get Started →</button>
          </div>
        </div>

        {/* Road + Bus */}
        <div style={s.roadScene}>
          <div style={s.road}>
            <div style={s.roadYellowTop} />
            <div style={s.roadYellowBot} />
            <div style={s.dashTrack}>
              {[0,1,2,3,4,5,6,7,8,9].map(i => (
                <div key={i} style={s.dash} />
              ))}
            </div>
          </div>
          <img src="/bus.png" alt="MU Bus" style={s.heroBus} />
        </div>
      </section>

      {/* Features */}
      <section style={{ ...s.section, background: "#EEF3FF" }}>
        <div style={s.sectionLabel}>What We Offer</div>
        <h2 style={s.sectionTitle}>Everything for a smooth commute</h2>
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

      {/* Routes & Times */}
      <section style={{ background: "#F8F9FA", padding: "60px 40px" }}>
        <div style={s.twoCol}>
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
        </div>
      </section>

      {/* How it works */}
      <section style={{ ...s.section, background: "#EBF5EB" }}>
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

      {/* Photo Gallery */}
      <section style={{ ...s.section, background: "#fff" }}>
        <div style={s.sectionLabel}>Photo Gallery</div>
        <h2 style={s.sectionTitle}>Our Campus & Fleet</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px" }}>
          <img src="/bus1.jpeg" alt="Bus 1" style={galleryImg} />
          <img src="/bus1.jpeg" alt="Bus 2" style={galleryImg} />
          <img src="/bus1.jpeg" alt="Bus 3" style={galleryImg} />
        </div>
      </section>

      {/* Stats strip */}
      <section style={s.statsStrip}>
        {STATS.map((st, i) => (
          <div key={i} style={s.statBox}>
            <div style={s.statIcon}>{st.icon}</div>
            <div style={s.statVal}>{st.value}</div>
            <div style={s.statLabel}>{st.label}</div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer style={s.footer}>
        <div style={s.footerGrid}>
          <div>
            <div style={s.footerLogo}>🚌 BusVoyage</div>
            <p style={s.footerSub}>Campus Bus Tracking System<br />Metropolitan University, Sylhet</p>
          </div>
          <div>
            <div style={s.footerHead}>Quick Links</div>
            <div style={s.footerLink} onClick={() => navigate("/about")}>About Us</div>
            <div style={s.footerLink}>Routes</div>
            <div style={s.footerLink}>Schedule</div>
          </div>
          <div>
            <div style={s.footerHead}>Support</div>
            <div style={s.footerLink}>Help Center</div>
            <div style={s.footerLink}>Contact</div>
            <div style={s.footerLink}>Report Issue</div>
>>>>>>> 41eb8645a91cfb9c8bb97ffe0379bf1a7ac5b04e
          </div>
          <button style={modal.close} onClick={onClose}>✕</button>
        </div>
<<<<<<< HEAD
        <div style={modal.routeList}>
          {[
            { name: "Tilagor Route", color: "#22c55e", status: "Active", stops: ["MU Campus Gate", "Kumarpara", "Tilagor Lake", "Tilagor Bazar", "Tilagor Residential", "East Tilagor", "Tilagor End Stop"], time: "~35 min", freq: "Every 45 min" },
            { name: "Amberkhana Route", color: "#60a5fa", status: "On Time", stops: ["MU Campus Gate", "Zindabazar", "Chowhatta", "Laldighirpar", "Amberkhana"], time: "~25 min", freq: "Every 30 min" },
            { name: "City Centre Route", color: "#f87171", status: "Delayed", stops: ["MU Campus Gate", "Subhanighat", "Court Point", "Rikabibazar", "Bandarbazar", "Chowkidekhi"], time: "~40 min", freq: "Every 60 min" },
            { name: "South Surma Route", color: "#a78bfa", status: "Active", stops: ["MU Campus Gate", "Lalkhan", "South Surma Bridge", "Mohajirpara", "Pathantula"], time: "~30 min", freq: "Every 45 min" },
            { name: "Airport Route", color: "#fb923c", status: "On Time", stops: ["MU Campus Gate", "Modina Market", "Kumargaon", "Airport Road", "Osmani Airport"], time: "~50 min", freq: "Every 90 min" },
          ].map((r, i) => (
            <div key={i} style={modal.routeCard}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: r.color, flexShrink: 0 }} />
                  <span style={modal.routeName}>{r.name}</span>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ ...modal.badge, color: r.color, borderColor: r.color + "44" }}>{r.status}</span>
                  <span style={modal.timeBadge}>{r.time}</span>
                </div>
              </div>
              <div style={modal.stopRow}>
                {r.stops.map((stop, j) => (
                  <React.Fragment key={j}>
                    <span style={modal.stop}>{stop}</span>
                    {j < r.stops.length - 1 && <span style={modal.arrow}>→</span>}
                  </React.Fragment>
                ))}
              </div>
              <div style={modal.freq}>🕐 Frequency: {r.freq}</div>
            </div>
          ))}
        </div>
      </div>
=======
        <div style={s.copyright}>© 2026 BusVoyage • Metropolitan University</div>
      </footer>

      <style>{`
        @keyframes busDrive {
          0%   { left: -280px; }
          100% { left: 110vw;  }
        }
        @keyframes roadDash {
          0%   { transform: translateX(0);      }
          100% { transform: translateX(-140px); }
        }
      `}</style>
>>>>>>> 41eb8645a91cfb9c8bb97ffe0379bf1a7ac5b04e
    </div>
  );
}

<<<<<<< HEAD
/* ── Schedule Modal ── */
function ScheduleModal({ onClose }) {
  const days = ["Monday–Friday", "Saturday", "Sunday"];
  const [activeDay, setActiveDay] = useState(0);
  const schedules = [
    [
      { route: "All Routes", trips: [{ label: "First departure", time: "07:00 AM" }, { label: "Morning peak", time: "07:00–09:00 AM" }, { label: "Hourly shuttle", time: "Every hour" }, { label: "Evening peak", time: "04:00–06:00 PM" }, { label: "Last departure", time: "06:30 PM" }] },
      { route: "Tilagor Route", trips: [{ label: "Trip 1", time: "07:00 AM" }, { label: "Trip 2", time: "08:30 AM" }, { label: "Trip 3", time: "12:00 PM" }, { label: "Trip 4", time: "03:00 PM" }, { label: "Trip 5", time: "05:00 PM" }] },
      { route: "Amberkhana Route", trips: [{ label: "Trip 1", time: "07:15 AM" }, { label: "Trip 2", time: "08:45 AM" }, { label: "Trip 3", time: "12:15 PM" }, { label: "Trip 4", time: "03:15 PM" }, { label: "Trip 5", time: "05:15 PM" }] },
    ],
    [
      { route: "All Routes", trips: [{ label: "First departure", time: "08:00 AM" }, { label: "Mid-morning", time: "08:00–10:00 AM" }, { label: "Afternoon", time: "01:00 PM" }, { label: "Last departure", time: "05:00 PM" }] },
      { route: "Tilagor Route", trips: [{ label: "Trip 1", time: "08:00 AM" }, { label: "Trip 2", time: "01:00 PM" }, { label: "Trip 3", time: "04:00 PM" }] },
    ],
    [
      { route: "Weekend Service", trips: [{ label: "Only morning trip", time: "09:00 AM" }, { label: "Return trip", time: "02:00 PM" }] },
    ],
  ];
  return (
    <div style={modal.overlay} onClick={onClose}>
      <div style={{ ...modal.box, maxWidth: 700 }} onClick={e => e.stopPropagation()}>
        <div style={modal.header}>
          <div>
            <div style={modal.pill}>Timetable</div>
            <h2 style={modal.title}>Bus Schedule</h2>
            <p style={modal.sub}>Daily departure times for all routes</p>
          </div>
          <button style={modal.close} onClick={onClose}>✕</button>
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {days.map((d, i) => (
            <button key={i} onClick={() => setActiveDay(i)} style={{
              padding: "8px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
              background: activeDay === i ? "#0f172a" : "#f1f5f9",
              color: activeDay === i ? "#fff" : "#64748b",
              transition: "all 0.2s",
            }}>{d}</button>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {schedules[activeDay].map((sc, i) => (
            <div key={i} style={{ background: "#f8fafc", borderRadius: 12, padding: "16px 18px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#0f172a", marginBottom: 12 }}>{sc.route}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {sc.trips.map((t, j) => (
                  <div key={j} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: "8px 14px", minWidth: 130 }}>
                    <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 3 }}>{t.label}</div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: "#E31E24" }}>{t.time}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 18, padding: "12px 16px", background: "rgba(227,30,36,0.06)", borderRadius: 8, fontSize: 12, color: "#64748b", border: "1px solid rgba(227,30,36,0.15)" }}>
          ⚠️ Schedules may vary due to traffic and weather. Check the Live Tracking board for real-time updates.
        </div>
      </div>
    </div>
  );
}

/* ── Support Modals ── */
function SupportModal({ type, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const configs = {
    help: {
      title: "Help Center", pill: "FAQ & Support",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { q: "How do I track my bus in real time?", a: "Log into your BusVoyage account and visit the Live Tracking page. You'll see all active buses on the map." },
            { q: "How do I check seat availability?", a: "Go to Crowd Status in the dashboard. Each bus shows current occupancy updated every few minutes." },
            { q: "What if my bus is delayed?", a: "You'll receive an instant notification via the Announcements panel. Drivers update status in real time." },
            { q: "How do I reset my password?", a: "Click 'Forgot password?' on the Sign In page and follow the instructions sent to your registered phone." },
            { q: "Can I use BusVoyage on my phone?", a: "Yes! The site is fully mobile responsive. Just open it in your mobile browser." },
          ].map((faq, i) => (
            <div key={i} style={{ border: "1px solid #e2e8f0", borderRadius: 10, padding: "14px 16px", background: "#f8fafc" }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#0f172a", marginBottom: 6 }}>❓ {faq.q}</div>
              <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6 }}>{faq.a}</div>
            </div>
          ))}
        </div>
      )
    },
    contact: {
      title: "Contact Us", pill: "Get in Touch",
      content: submitted ? (
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
          <div style={{ fontWeight: 700, fontSize: 18, color: "#0f172a", marginBottom: 8 }}>Message sent!</div>
          <div style={{ fontSize: 14, color: "#64748b" }}>We'll get back to you within 24 hours.</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[{ icon: "📧", label: "Email", val: "busvoyage@mu.ac.bd" }, { icon: "📞", label: "Phone", val: "+880 821-000000" }, { icon: "🏫", label: "Office", val: "CSE Dept, MU, Sylhet" }].map((c, i) => (
              <div key={i} style={{ flex: 1, minWidth: 140, background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: "14px", textAlign: "center" }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{c.icon}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{c.label}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{c.val}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 8 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#0f172a", marginBottom: 12 }}>Send a Message</div>
            <input placeholder="Your name" style={formInput} />
            <input placeholder="Your student ID" style={{ ...formInput, marginTop: 10 }} />
            <textarea placeholder="Your message..." rows={4} style={{ ...formInput, marginTop: 10, resize: "vertical" }} />
            <button style={{ ...submitBtn, marginTop: 12 }} onClick={() => setSubmitted(true)}>Send Message →</button>
          </div>
        </div>
      )
    },
    report: {
      title: "Report an Issue", pill: "Report",
      content: submitted ? (
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
          <div style={{ fontWeight: 700, fontSize: 18, color: "#0f172a", marginBottom: 8 }}>Issue reported!</div>
          <div style={{ fontSize: 14, color: "#64748b" }}>Our team will review and respond within 48 hours.</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, marginBottom: 4 }}>
            Use this form to report bus delays, driver issues, app bugs, or any transport-related problems.
          </div>
          <div>
            <label style={formLabel}>Issue Type</label>
            <select style={formInput}>
              <option>Bus delay / not showing up</option>
              <option>Driver behaviour</option>
              <option>App / website bug</option>
              <option>Incorrect route information</option>
              <option>Safety concern</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label style={formLabel}>Route (if applicable)</label>
            <select style={formInput}>
              <option>All routes</option>
              <option>Tilagor Route</option>
              <option>Amberkhana Route</option>
              <option>City Centre Route</option>
              <option>South Surma Route</option>
              <option>Airport Route</option>
            </select>
          </div>
          <div>
            <label style={formLabel}>Your Student ID</label>
            <input placeholder="e.g. 231-115-207" style={formInput} />
          </div>
          <div>
            <label style={formLabel}>Description</label>
            <textarea placeholder="Describe the issue in detail..." rows={4} style={{ ...formInput, resize: "vertical" }} />
          </div>
          <button style={submitBtn} onClick={() => setSubmitted(true)}>Submit Report →</button>
        </div>
      )
    }
  };
  const cfg = configs[type];
  return (
    <div style={modal.overlay} onClick={onClose}>
      <div style={{ ...modal.box, maxWidth: 600 }} onClick={e => e.stopPropagation()}>
        <div style={modal.header}>
          <div>
            <div style={modal.pill}>{cfg.pill}</div>
            <h2 style={modal.title}>{cfg.title}</h2>
          </div>
          <button style={modal.close} onClick={onClose}>✕</button>
        </div>
        {cfg.content}
      </div>
    </div>
  );
}

const formInput = { width: "100%", padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, color: "#0f172a", background: "#f8fafc", outline: "none", fontFamily: "inherit" };
const formLabel = { display: "block", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 };
const submitBtn = { width: "100%", padding: "13px", background: "#0f172a", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" };

const modal = {
  overlay:   { position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", backdropFilter: "blur(4px)" },
  box:       { background: "#fff", borderRadius: 18, padding: "32px 32px 28px", width: "100%", maxWidth: 800, maxHeight: "85vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.25)" },
  header:    { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 },
  pill:      { background: "#f1f5f9", color: "#E31E24", padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 8, display: "inline-block", textTransform: "uppercase" },
  title:     { fontSize: 24, fontWeight: 900, color: "#0f172a", marginBottom: 4 },
  sub:       { fontSize: 13, color: "#64748b" },
  close:     { background: "#f1f5f9", border: "none", width: 36, height: 36, borderRadius: "50%", cursor: "pointer", fontSize: 16, color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  routeCard: { background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12, padding: "16px 18px", marginBottom: 12 },
  routeName: { fontWeight: 800, fontSize: 15, color: "#0f172a" },
  badge:     { fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, border: "1px solid" },
  timeBadge: { fontSize: 12, fontWeight: 700, color: "#E31E24", background: "rgba(227,30,36,0.1)", padding: "4px 10px", borderRadius: 6 },
  stopRow:   { display: "flex", flexWrap: "wrap", alignItems: "center", gap: 4, marginBottom: 8 },
  stop:      { fontSize: 12, fontWeight: 600, color: "#0f172a", background: "#fff", border: "1px solid #e2e8f0", padding: "3px 9px", borderRadius: 6 },
  arrow:     { color: "#94a3b8", fontSize: 12 },
  freq:      { fontSize: 12, color: "#64748b" },
  routeList: { display: "flex", flexDirection: "column" },
=======
const FEATURES = [
  { icon:"🚌", title:"Live Bus Tracking",    desc:"See exactly where your bus is — updated by drivers in real time.", bg:"#dbeafe" },
  { icon:"💺", title:"Crowd Status",          desc:"Know if seats are available before you reach the stop.",           bg:"#dcfce7" },
  { icon:"📢", title:"Announcements",         desc:"Get urgent transport notices instantly.",                          bg:"#fee2e2" },
  { icon:"🧾", title:"Complaints & Feedback", desc:"Report issues directly to the transport office easily.",           bg:"#fef9c3" },
];
const ROUTES = [
  { name:"Tilagor Route",     stops:"7", time:"~35 min", status:"Active",  color:"#28A745", bg:"#e9f7ef" },
  { name:"Amberkhana Route",  stops:"5", time:"~25 min", status:"On Time", color:"#004A99", bg:"#e3f2fd" },
  { name:"City Centre Route", stops:"6", time:"~40 min", status:"Delayed", color:"#E31E24", bg:"#fdecea" },
];
const TIMES = [
  { title:"Morning Trip",   desc:"Picks up from all stops", time:"07:00 – 09:00" },
  { title:"Hourly Shuttle", desc:"Campus ↔ Zindabazar",    time:"Every Hour"     },
  { title:"Afternoon Trip", desc:"Returns from campus",     time:"16:00 – 18:00" },
];
const STEPS = [
  { icon:"📝", title:"Register", desc:"Sign up with your student ID",        color:"#004A99" },
  { icon:"🔍", title:"Track",    desc:"See live bus location & crowd status", color:"#28A745" },
  { icon:"🚌", title:"Board",    desc:"Catch your bus stress-free",           color:"#E31E24" },
  { icon:"✅", title:"Arrive",   desc:"Reach campus on time, every time",     color:"#FFA500" },
];
const STATS = [
  { icon:"🚌", value:"8",    label:"Total Buses"    },
  { icon:"🛣️", value:"5",    label:"Active Routes"  },
  { icon:"👥", value:"1200+",label:"Daily Students" },
  { icon:"⏱️", value:"98%",  label:"On-Time Rate"   },
  { icon:"📍", value:"32",   label:"Bus Stops"      },
];

const galleryImg = {
  width:"100%", height:"200px",
  objectFit:"cover", borderRadius:"10px", display:"block",
>>>>>>> 41eb8645a91cfb9c8bb97ffe0379bf1a7ac5b04e
};

/* ══════════ MAIN ══════════ */
export default function Home() {
  const navigate = useNavigate();
  const [scrolled,     setScrolled]    = useState(false);
  const [showRoutes,   setShowRoutes]  = useState(false);
  const [showSchedule, setShowSchedule]= useState(false);
  const [supportModal, setSupportModal]= useState(null);
  const [mobileMenu,   setMobileMenu]  = useState(false);
  const [galSlide,     setGalSlide]    = useState(0);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={s.page}>
      <style>{CSS}</style>

      {showRoutes   && <RoutesModal   onClose={() => setShowRoutes(false)} />}
      {showSchedule && <ScheduleModal onClose={() => setShowSchedule(false)} />}
      {supportModal && <SupportModal  type={supportModal} onClose={() => setSupportModal(null)} />}

      {/* ══ NAVBAR ══ */}
      <nav style={{ ...s.nav, ...(scrolled ? s.navSolid : {}) }}>
        <div style={s.brand}>
          <div style={s.brandDot} />
          <span style={s.brandName}>BusVoyage</span>
          <span style={s.brandMU} className="hide-xs">· MU</span>
        </div>
        <div style={s.navCenter} className="nav-desktop">
          {[
            { label: "Home",     action: null },
            { label: "Routes",   action: () => setShowRoutes(true) },
            { label: "Schedule", action: () => setShowSchedule(true) },
            { label: "About",    action: () => navigate("/about") },
          ].map((l, i) => (
            <span key={i} style={s.navLink} onClick={l.action}>{l.label}</span>
          ))}
        </div>
        <div style={s.navRight} className="nav-desktop">
          <button style={s.navSignIn} onClick={() => navigate("/login")}>Sign In</button>
          <button style={s.navSignUp} onClick={() => navigate("/register")}>Sign Up →</button>
        </div>
        <button style={s.hamburger} className="nav-mobile" onClick={() => setMobileMenu(v => !v)}>
          <span style={s.ham} /><span style={s.ham} /><span style={s.ham} />
        </button>
      </nav>

      {mobileMenu && (
        <div style={s.mobileDrawer}>
          {[
            { label: "Home",     action: () => setMobileMenu(false) },
            { label: "Routes",   action: () => { setShowRoutes(true);   setMobileMenu(false); } },
            { label: "Schedule", action: () => { setShowSchedule(true); setMobileMenu(false); } },
            { label: "About",    action: () => { navigate("/about");    setMobileMenu(false); } },
          ].map((l, i) => (
            <div key={i} style={s.mobileLink} onClick={l.action}>{l.label}</div>
          ))}
          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <button style={{ ...s.navSignIn, flex: 1 }} onClick={() => { navigate("/login");    setMobileMenu(false); }}>Sign In</button>
            <button style={{ ...s.navSignUp, flex: 1 }} onClick={() => { navigate("/register"); setMobileMenu(false); }}>Sign Up →</button>
          </div>
        </div>
      )}

      {/* ══ HERO ══ */}
      <section style={s.hero}>
        <div style={s.heroBg} />
        <div style={s.heroFloorArea} />
        <div style={s.heroBody}>
          <div style={s.heroImageCol} className="hero-fade-1 hero-img-col">
            <div style={s.busWrapper}>
              <img src="/buss.png" alt="Metropolitan University Bus" style={s.busImgStatic}
                onError={e => { e.target.style.opacity = "0.15"; }} />
            </div>
          </div>
          <div style={s.heroTextCol}>
            <h1 style={s.heroH1} className="hero-fade-2">
              Embark on a <br />
              <span style={s.heroBold}>Unforgettable Journey</span><br />
              with BusVoyage
            </h1>
            <p style={s.heroP} className="hero-fade-3">
              Our platform delivers precision real-time tracking, live seat occupancy insights,
              and optimized schedules designed exclusively for the MU community.
              Navigating through the bustling heart of Sylhet has never been smoother.
            </p>
            <div className="hero-fade-4">
              <button style={s.btnBook} onClick={() => navigate("/about")}>About Us</button>
            </div>
          </div>
        </div>
        <div style={s.statsStrip} className="stats-strip">
          {[
            { label: "BUSES ACTIVE", val: "8+"      },
            { label: "ROUTES",       val: "5"       },
            { label: "TO CAMPUS",    val: "~35 min" },
            { label: "DAILY RIDERS", val: "1,200+"  },
            { label: "ON-TIME RATE", val: "98%"     },
          ].map((st, i, arr) => (
            <React.Fragment key={i}>
              <div style={s.stripItem}>
                <div style={s.stripLabel}>{st.label}</div>
                <div style={s.stripVal}>{st.val}</div>
              </div>
              {i < arr.length - 1 && <div style={s.stripDiv} className="strip-div" />}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ══ FEATURES ══ */}
      <section style={s.featSec}>
        <Reveal>
          <div style={s.secPill}>What We Offer</div>
          <h2 style={s.secH2}>Built for MU students,<br />every single day.</h2>
        </Reveal>
        <div style={s.featGrid} className="feat-grid">
          {FEATURES.map((f, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={s.featCard} className="lift">
                <div style={{ ...s.featIcon, background: f.bg }}>{f.icon}</div>
                <div style={s.featTitle}>{f.title}</div>
                <div style={s.featDesc}>{f.desc}</div>
                <div style={{ ...s.featBar, background: f.line }} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ ROUTES + SCHEDULE ══ */}
      <section style={s.routeSec}>
        <div style={s.routeGrid} className="route-grid">
          <Reveal>
            <div style={s.secPillW}>Live Updates</div>
            <h2 style={{ ...s.secH2, color: "#fff" }}>Routes &amp;<br />Schedules</h2>
            <p style={s.routeSubP}>Three major routes cover all key areas around Metropolitan University, Sylhet.</p>
          </Reveal>
          <div style={s.routeRight}>
            {ROUTES.map((r, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={s.rCard} className="liftDark">
                  <div style={{ ...s.rDot, background: r.color }} />
                  <div style={{ flex: 1 }}>
                    <div style={s.rName}>{r.name}</div>
                    <div style={s.rMeta}>{r.stops} stops · {r.time}</div>
                  </div>
                  <span style={{ ...s.rBadge, color: r.color, borderColor: r.color + "44" }}>{r.status}</span>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.35}>
              <div style={s.schedCard}>
                <div style={s.schedHead}>Today's Schedule</div>
                {TIMES.map((t, i) => (
                  <div key={i} style={s.schedRow}>
                    <div>
                      <div style={s.schedTitle}>{t.title}</div>
                      <div style={s.schedSub}>{t.desc}</div>
                    </div>
                    <div style={s.schedTime}>{t.time}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section style={s.howSec}>
        <Reveal>
          <div style={s.secPill}>Simple Process</div>
          <h2 style={s.secH2}>From sign-up<br />to smooth ride.</h2>
        </Reveal>
        <div style={s.howRow} className="how-row">
          {STEPS.map((st, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={s.howStep}>
                <div style={{ ...s.howNum, background: st.color }}>{i + 1}</div>
                {i < STEPS.length - 1 && <div style={s.howLine} className="how-line" />}
                <div style={s.howIcon}>{st.icon}</div>
                <div style={s.howTitle}>{st.title}</div>
                <div style={s.howDesc}>{st.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ GALLERY — slider with 3 images visible ══ */}
      <section style={s.galSec}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={s.secPillW}>Photo Gallery</div>
            <h2 style={{ ...s.secH2, color: "#fff", marginBottom: 0 }}>Our campus &amp; fleet.</h2>
          </div>
        </Reveal>

        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
          <div style={s.galGrid} className="gal-grid">
            {GALLERY.slice(galSlide, galSlide + 3).map((src, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div
                  style={{ ...s.galTile, backgroundImage: `url('${src}')` }}
                  className="gal-tile"
                />
              </Reveal>
            ))}
          </div>
          
          {/* Navigation Buttons */}
          <button
            onClick={() => setGalSlide(Math.max(0, galSlide - 3))}
            disabled={galSlide === 0}
            style={{
              position: "absolute", left: -60, top: "50%", transform: "translateY(-50%)",
              background: galSlide === 0 ? "#666" : "#E31E24", color: "#fff", border: "none",
              width: 44, height: 44, borderRadius: "50%", cursor: galSlide === 0 ? "default" : "pointer",
              fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center",
              opacity: galSlide === 0 ? 0.4 : 1, transition: "all 0.2s"
            }}
          >
            ←
          </button>
          
          <button
            onClick={() => setGalSlide(Math.min(GALLERY.length - 3, galSlide + 3))}
            disabled={galSlide >= GALLERY.length - 3}
            style={{
              position: "absolute", right: -60, top: "50%", transform: "translateY(-50%)",
              background: galSlide >= GALLERY.length - 3 ? "#666" : "#E31E24", color: "#fff", border: "none",
              width: 44, height: 44, borderRadius: "50%", cursor: galSlide >= GALLERY.length - 3 ? "default" : "pointer",
              fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center",
              opacity: galSlide >= GALLERY.length - 3 ? 0.4 : 1, transition: "all 0.2s"
            }}
          >
            →
          </button>

          {/* Slide Counter */}
          <div style={{ textAlign: "center", marginTop: 20, color: "#fff", fontSize: 13 }}>
            {galSlide + 1} - {Math.min(galSlide + 3, GALLERY.length)} of {GALLERY.length}
          </div>
        </div>
      </section>

      {/* ══ IMPACT NUMBERS ══ */}
      <section style={s.impactSec} className="impact-sec">
        {IMPACTS.map((imp, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div style={s.impactItem}>
              <div style={s.impactNum}><StatCounter target={imp.num} suffix={imp.suffix} /></div>
              <div style={s.impactLabel}>{imp.label}</div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* ══ CTA ══ */}
      <section style={s.ctaSec}>
        <div style={s.ctaGlow} />
        <Reveal>
          <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
            <div style={s.ctaPill}>Get Onboard</div>
            <h2 style={s.ctaH2}>Ready to ride smarter?</h2>
            <p style={s.ctaP}>Join 1,200+ Metropolitan University students who never miss their bus.</p>
            <div style={s.ctaBtns}>
              <button style={s.ctaPrimary} onClick={() => navigate("/register")}>Create Free Account →</button>
              <button style={s.ctaSecondary} onClick={() => navigate("/login")}>Sign In</button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={s.footer}>
        <div style={s.footerTop} className="footer-top">
          <div>
            <div style={s.footerBrand}>🚌 BusVoyage</div>
            <div style={s.footerSub}>Campus Bus Tracking System<br />Metropolitan University, Sylhet</div>
            <div style={s.footerTag}>CSE Department · 2026</div>
          </div>
          <div style={s.footerCols} className="footer-cols">
            <div>
              <div style={s.footerHead}>Navigate</div>
              {[
                { label: "Home",     action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
                { label: "Routes",   action: () => setShowRoutes(true) },
                { label: "Schedule", action: () => setShowSchedule(true) },
              ].map(l => <div key={l.label} style={s.footerLink} onClick={l.action}>{l.label}</div>)}
            </div>
            <div>
              <div style={s.footerHead}>Account</div>
              {[
                { label: "Sign In",  action: () => navigate("/login") },
                { label: "Sign Up",  action: () => navigate("/register") },
                { label: "About Us", action: () => navigate("/about") },
              ].map(l => <div key={l.label} style={s.footerLink} onClick={l.action}>{l.label}</div>)}
            </div>
            <div>
              <div style={s.footerHead}>Support</div>
              {[
                { label: "Help Center",  action: () => setSupportModal("help") },
                { label: "Contact",      action: () => setSupportModal("contact") },
                { label: "Report Issue", action: () => setSupportModal("report") },
              ].map(l => <div key={l.label} style={s.footerLink} onClick={l.action}>{l.label}</div>)}
            </div>
          </div>
        </div>
        <div style={s.footerRule} />
        <div style={s.footerBottom}><span>© 2026 BusVoyage · Metropolitan University</span></div>
      </footer>
    </div>
  );
}

/* ════ CSS ════ */
const CSS = `
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }

  @keyframes heroFade {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: none; }
  }
  .hero-fade-1 { animation: heroFade 0.8s ease 0.2s both; }
  .hero-fade-2 { animation: heroFade 0.8s ease 0.4s both; }
  .hero-fade-3 { animation: heroFade 0.8s ease 0.6s both; }
  .hero-fade-4 { animation: heroFade 0.8s ease 0.8s both; }

  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }

  .lift { transition: transform 0.25s ease, box-shadow 0.25s ease !important; }
  .lift:hover { transform: translateY(-6px) !important; box-shadow: 0 18px 44px rgba(0,0,0,0.10) !important; }

  .liftDark { transition: transform 0.2s ease, background 0.2s ease !important; }
  .liftDark:hover { transform: translateY(-3px) !important; background: rgba(255,255,255,0.09) !important; }

  .gal-tile {
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    cursor: pointer;
  }
  .gal-tile:hover {
    transform: scale(1.03);
    box-shadow: 0 12px 32px rgba(0,0,0,0.5) !important;
  }

  button { font-family: inherit; }

  .nav-desktop { display: flex; }
  .nav-mobile  { display: none !important; }
  .hide-xs     { display: inline; }

  @media (max-width: 900px) {
    .nav-desktop  { display: none !important; }
    .nav-mobile   { display: flex !important; }
    .hero-img-col { display: none !important; }
    .feat-grid    { grid-template-columns: repeat(2,1fr) !important; }
    .route-grid   { grid-template-columns: 1fr !important; }
    .how-row      { flex-wrap: wrap !important; }
    .gal-grid     { grid-template-columns: repeat(2,1fr) !important; }
    .impact-sec   { padding: 20px 24px !important; gap: 12px !important; }
    .footer-top   { flex-direction: column !important; gap: 32px !important; }
    .footer-cols  { flex-wrap: wrap !important; gap: 24px !important; }
  }

  @media (max-width: 600px) {
    .feat-grid   { grid-template-columns: 1fr !important; }
    .gal-grid    { grid-template-columns: repeat(2,1fr) !important; }
    .stats-strip { flex-wrap: wrap !important; gap: 12px !important; bottom: 12px !important; left: 16px !important; right: 16px !important; }
    .strip-div   { display: none !important; }
    .how-line    { display: none !important; }
    .hide-xs     { display: none !important; }
    .impact-sec  { padding: 16px 16px !important; }
  }
`;

/* ════ STYLES ════ */
const s = {
<<<<<<< HEAD
  page: { fontFamily: "'Inter', 'Segoe UI', sans-serif", background: "#f8f9fa" },

  nav:       { position: "fixed", top: 0, width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 60px", zIndex: 1000, transition: "0.3s" },
  navSolid:  { background: "#0f172a", boxShadow: "0 2px 10px rgba(0,0,0,0.15)" },
  brand:     { display: "flex", alignItems: "center", gap: "10px", color: "#fff" },
  brandDot:  { width: "10px", height: "10px", background: "#E31E24", borderRadius: "50%", animation: "pulse 2.5s infinite", flexShrink: 0 },
  brandName: { fontWeight: 800, fontSize: "20px", color: "#fff" },
  brandMU:   { opacity: 0.5, fontSize: "14px", color: "#fff" },
  navCenter: { display: "flex", gap: "30px", fontSize: "14px", fontWeight: 500 },
  navLink:   { color: "rgba(255,255,255,0.75)", cursor: "pointer", transition: "color 0.2s" },
  navRight:  { display: "flex", gap: "12px" },
  navSignIn: { background: "transparent", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", padding: "8px 20px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: 600 },
  navSignUp: { background: "#E31E24", border: "none", color: "#fff", padding: "8px 22px", borderRadius: "8px", fontWeight: 700, cursor: "pointer", fontSize: "13px", boxShadow: "0 3px 12px rgba(227,30,36,0.35)" },
  hamburger: { background: "transparent", border: "none", cursor: "pointer", padding: 8, display: "flex", flexDirection: "column", gap: 5 },
  ham:       { display: "block", width: 22, height: 2, background: "#fff", borderRadius: 2 },
  mobileDrawer: { position: "fixed", top: 64, left: 0, right: 0, background: "#0f172a", zIndex: 999, padding: "20px 24px 24px", borderBottom: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 8px 24px rgba(0,0,0,0.3)" },
  mobileLink:   { padding: "12px 0", fontSize: 16, fontWeight: 600, color: "rgba(255,255,255,0.85)", cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.07)" },

  hero:          { position: "relative", height: "100vh", minHeight: 500, background: "#2d3436", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden" },
  heroBg:        { position: "absolute", inset: 0, backgroundImage: "url('/mu.jpg')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.15 },
  heroFloorArea: { position: "absolute", bottom: 0, width: "100%", height: "45%", background: "#f39c12", opacity: 0.9 },
  heroBody:      { position: "relative", zIndex: 10, display: "flex", alignItems: "center", padding: "0 60px", gap: "40px" },
  heroImageCol:  { flex: 1.2, display: "flex", justifyContent: "center" },
  busWrapper:    { width: "100%", maxWidth: "700px" },
  busImgStatic:  { width: "100%", height: "auto", filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.4))" },
  heroTextCol:   { flex: 1, color: "#fff", paddingTop: "100px" },
  heroH1:        { fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, lineHeight: 1.2, marginBottom: "20px" },
  heroBold:      { color: "#fff", textDecoration: "underline", textDecorationColor: "#E31E24" },
  heroP:         { fontSize: "clamp(13px,1.5vw,16px)", lineHeight: 1.65, opacity: 0.88, marginBottom: "30px", maxWidth: "500px" },
  btnBook:       { background: "#1e272e", color: "#fff", padding: "14px 36px", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "15px", cursor: "pointer" },
  statsStrip:    { position: "absolute", bottom: 32, left: "60px", right: "60px", background: "rgba(15,23,42,0.85)", backdropFilter: "blur(10px)", display: "flex", padding: "20px 26px", borderRadius: "14px", zIndex: 20, border: "1px solid rgba(255,255,255,0.07)" },
  stripItem:     { flex: 1, textAlign: "left" },
  stripLabel:    { fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.42)", marginBottom: "6px", letterSpacing: 1.2, textTransform: "uppercase" },
  stripVal:      { fontSize: "clamp(16px,2vw,20px)", fontWeight: 900, color: "#fff" },
  stripDiv:      { width: "1px", background: "rgba(255,255,255,0.1)", margin: "0 16px" },

  featSec:   { padding: "80px clamp(24px,6vw,80px)", background: "#fff" },
  secPill:   { background: "#f1f2f6", color: "#E31E24", padding: "5px 15px", borderRadius: "20px", fontSize: "11px", fontWeight: 700, letterSpacing: 1, marginBottom: "18px", display: "inline-block", textTransform: "uppercase" },
  secPillW:  { background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.65)", padding: "5px 15px", borderRadius: "20px", fontSize: "11px", fontWeight: 700, letterSpacing: 1, marginBottom: "18px", display: "inline-block", textTransform: "uppercase" },
  secH2:     { fontSize: "clamp(24px,3vw,38px)", fontWeight: 900, color: "#1e272e", lineHeight: 1.2, marginBottom: 44 },
  featGrid:  { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "22px" },
  featCard:  { padding: "28px 22px", background: "#fff", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", border: "1px solid #f1f2f6", position: "relative", overflow: "hidden" },
  featIcon:  { width: "52px", height: "52px", borderRadius: "13px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", marginBottom: "18px" },
  featTitle: { fontWeight: 800, fontSize: "15px", color: "#1e272e", marginBottom: "9px" },
  featDesc:  { fontSize: "13px", color: "#636e72", lineHeight: 1.65 },
  featBar:   { height: "3px", width: "36px", marginTop: "16px", borderRadius: "2px" },

  routeSec:   { padding: "80px clamp(24px,6vw,80px)", background: "#0f172a" },
  routeGrid:  { display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "56px", maxWidth: 1200, margin: "0 auto", alignItems: "start" },
  routeSubP:  { color: "rgba(255,255,255,0.42)", marginTop: "12px", fontSize: 14, lineHeight: 1.75, maxWidth: 260 },
  routeRight: { display: "flex", flexDirection: "column", gap: "10px" },
  rCard:      { display: "flex", alignItems: "center", gap: 14, padding: "16px 18px", background: "rgba(255,255,255,0.05)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.07)" },
  rDot:       { width: "10px", height: "10px", borderRadius: "50%", flexShrink: 0 },
  rName:      { color: "#fff", fontWeight: 700, fontSize: 14, marginBottom: 3 },
  rMeta:      { color: "rgba(255,255,255,0.38)", fontSize: "12px" },
  rBadge:     { marginLeft: "auto", fontSize: "11px", fontWeight: 700, padding: "3px 11px", borderRadius: "20px", border: "1px solid" },
  schedCard:  { padding: "20px 20px", background: "rgba(255,255,255,0.04)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.07)" },
  schedHead:  { fontSize: 14, fontWeight: 800, color: "#fff", marginBottom: 16 },
  schedRow:   { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" },
  schedTitle: { fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 2 },
  schedSub:   { fontSize: 11, color: "rgba(255,255,255,0.38)" },
  schedTime:  { fontSize: 11, fontWeight: 700, color: "#E31E24", background: "rgba(227,30,36,0.12)", padding: "4px 10px", borderRadius: 6, whiteSpace: "nowrap" },

  howSec:   { padding: "80px clamp(24px,6vw,80px)", background: "#f1f5f9", textAlign: "center" },
  howRow:   { display: "flex", justifyContent: "center", gap: 0, maxWidth: 900, margin: "0 auto", flexWrap: "wrap" },
  howStep:  { flex: 1, minWidth: 160, position: "relative", padding: "0 16px" },
  howNum:   { width: 44, height: 44, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 18, margin: "0 auto 18px" },
  howLine:  { position: "absolute", top: 22, left: "58%", right: "-42%", height: 2, background: "#CBD5E1" },
  howIcon:  { fontSize: 32, marginBottom: 12 },
  howTitle: { fontSize: 14, fontWeight: 800, color: "#1e272e", marginBottom: 7 },
  howDesc:  { fontSize: 12, color: "#64748b", lineHeight: 1.6, maxWidth: 168, margin: "0 auto" },

  
 galSec: { 
  padding: "80px clamp(24px, 6vw, 80px)", 
  background: "#000e22" 
},
galGrid: {
  display: "grid",
  
  gridTemplateColumns: "repeat(3, 1fr)", 
  gap: 20, 
  maxWidth: 1200, 
  margin: "0 auto",
},
galTile: {
  height: 240, 
  width: "100%",
  borderRadius: 16,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundColor: "#112244",
  cursor: "pointer",
  transition: "transform 0.3s ease",
  aspectRatio: "16/10",
},

  lbBg:    { position: "fixed", inset: 0, background: "rgba(0,0,0,0.93)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center" },
  lbBox:   { position: "relative", borderRadius: 12, overflow: "hidden", background: "#000", maxWidth: "90vw" },
  lbImg:   { maxWidth: "86vw", maxHeight: "80vh", display: "block", objectFit: "contain" },
  lbNav:   { position: "absolute", top: "50%", transform: "translateY(-50%)", zIndex: 10, background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", fontSize: 28, cursor: "pointer", borderRadius: "50%", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center" },
  lbClose: { position: "absolute", top: 10, right: 12, zIndex: 10, background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", fontSize: 16, cursor: "pointer", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" },
  
  impactSec:   { display: "flex", justifyContent: "space-around", alignItems: "center", padding: "28px 80px", background: "#E31E24", flexWrap: "wrap", gap: 16 },
  impactItem:  { textAlign: "center", padding: "0 20px", flex: 1, minWidth: 100 },
  impactNum:   { fontSize: 32, fontWeight: 900, color: "#fff", lineHeight: 1, marginBottom: 4 },
  impactLabel: { fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.75)", textTransform: "uppercase", letterSpacing: 1.2 },

  ctaSec:       { padding: "80px clamp(24px,6vw,80px)", background: "#0f172a", textAlign: "center", position: "relative", overflow: "hidden" },
  ctaGlow:      { position: "absolute", top: -120, left: "50%", transform: "translateX(-50%)", width: 600, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(227,30,36,0.13) 0%, transparent 70%)", pointerEvents: "none" },
  ctaPill:      { display: "inline-block", background: "rgba(227,30,36,0.15)", color: "#E31E24", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", padding: "5px 14px", borderRadius: 20, marginBottom: 20 },
  ctaH2:        { fontSize: "clamp(26px,4vw,48px)", fontWeight: 900, color: "#fff", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 14 },
  ctaP:         { fontSize: 16, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 },
  ctaBtns:      { display: "flex", gap: 14, justifyContent: "center", marginTop: 32, flexWrap: "wrap" },
  ctaPrimary:   { padding: "14px 34px", background: "#E31E24", color: "#fff", border: "none", borderRadius: 10, fontWeight: 800, cursor: "pointer", fontSize: 16, boxShadow: "0 6px 24px rgba(227,30,36,0.4)" },
  ctaSecondary: { padding: "14px 28px", background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.22)", borderRadius: 10, fontWeight: 600, cursor: "pointer", fontSize: 16 },

  footer:       { background: "#060f18", padding: "56px clamp(24px,6vw,80px) 28px", color: "#fff" },
  footerTop:    { display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 40, marginBottom: 44 },
  footerBrand:  { fontSize: 20, fontWeight: 900, marginBottom: 10 },
  footerSub:    { fontSize: 13, color: "rgba(255,255,255,0.28)", lineHeight: 1.7, marginBottom: 12 },
  footerTag:    { display: "inline-block", fontSize: 11, color: "#E31E24", background: "rgba(227,30,36,0.1)", border: "1px solid rgba(227,30,36,0.25)", padding: "3px 12px", borderRadius: 20, fontWeight: 600 },
  footerCols:   { display: "flex", gap: 52, flexWrap: "wrap" },
  footerHead:   { fontSize: 10, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", color: "#f39c12", marginBottom: 16 },
  footerLink:   { fontSize: 13, color: "rgba(255,255,255,0.32)", marginBottom: 10, cursor: "pointer", transition: "color 0.2s" },
  footerRule:   { height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 24 },
  footerBottom: { display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, fontSize: 12, color: "rgba(255,255,255,0.2)" },
=======
  page: { fontFamily:"'Segoe UI',Arial,sans-serif", background:"#F8F9FA", margin:0 },
  nav: {
    position:"fixed", top:0, left:0, right:0, zIndex:100,
    display:"flex", justifyContent:"space-between", alignItems:"center",
    padding:"14px 40px",
    background:"rgba(255,255,255,0.96)", backdropFilter:"blur(10px)",
    boxShadow:"0 2px 16px rgba(0,0,0,0.08)",
  },
  logo:        { display:"flex", alignItems:"center", gap:8 },
  logoText:    { fontSize:20, fontWeight:800, color:"#004A99" },
  navLink:     { fontSize:14, color:"#555", cursor:"pointer", fontWeight:500 },
  loginBtn:    { padding:"8px 18px", border:"1.5px solid #004A99", color:"#004A99", background:"white", borderRadius:8, fontWeight:600, cursor:"pointer", fontSize:14 },
  registerBtn: { padding:"8px 18px", background:"#004A99", color:"white", border:"none", borderRadius:8, fontWeight:600, cursor:"pointer", fontSize:14 },

  heroWrap: {
    marginTop:64, height:"88vh", minHeight:520,
    position:"relative", overflow:"hidden",
  },
  campusBg: {
    position:"absolute", top:0, left:0, right:0, bottom:0,
    backgroundImage:"url('/mu.jpg')",
    backgroundSize:"cover", backgroundPosition:"center top",
    filter:"brightness(0.82) saturate(1.1)",
  },
  darkOverlay: {
    position:"absolute", top:0, left:0, right:0, bottom:0,
    background:"linear-gradient(to bottom, rgba(0,15,50,0.55) 0%, rgba(0,15,50,0.2) 55%, transparent 78%)",
  },
  heroOverlay: {
    position:"absolute", top:"32%", left:"50%",
    transform:"translate(-50%,-50%)",
    textAlign:"center", zIndex:10, width:"90%", maxWidth:640,
  },
  heroTitle:  { fontSize:46, fontWeight:900, color:"#fff", lineHeight:1.2, marginBottom:14, textShadow:"0 2px 20px rgba(0,0,0,0.65)" },
  heroAccent: { color:"#FFE566" },
  heroSub:    { fontSize:16, color:"rgba(255,255,255,0.92)", marginBottom:28, fontWeight:500, textShadow:"0 1px 8px rgba(0,0,0,0.5)" },
  ctaRed:     { padding:"13px 28px", background:"#E31E24", color:"#fff", border:"none", borderRadius:10, fontWeight:700, fontSize:15, cursor:"pointer", boxShadow:"0 4px 18px rgba(227,30,36,0.4)" },

  roadScene: { position:"absolute", bottom:0, left:0, right:0, height:90, zIndex:5 },
  road: {
    position:"absolute", top:0, left:0, right:0, height:90,
    background:"linear-gradient(to bottom, #455A64 0%, #37474F 50%, #2E3B40 100%)",
    boxShadow:"inset 0 4px 10px rgba(0,0,0,0.35)", overflow:"hidden",
  },
  roadYellowTop: { position:"absolute", top:0, left:0, right:0, height:5, background:"linear-gradient(to right,#FFD600,#FFC107,#FFD600)" },
  roadYellowBot: { position:"absolute", bottom:0, left:0, right:0, height:5, background:"linear-gradient(to right,#FFD600,#FFC107,#FFD600)" },

  dashTrack: {
    position:"absolute", top:"50%", left:0,
    display:"flex", gap:80, marginTop:-3,
    animation:"roadDash 4s linear infinite",
  },
  dash: { width:60, height:6, background:"white", borderRadius:3, opacity:0.75, flexShrink:0 },

  heroBus: {
    position:"absolute", bottom:8, left:0,
    height:72, zIndex:10,
    animation:"busDrive 11s linear infinite",
    transform:"scaleX(-1)",
  },

  section:      { padding:"60px 40px" },
  sectionLabel: { fontSize:13, fontWeight:700, color:"#004A99", letterSpacing:2, textTransform:"uppercase", marginBottom:8 },
  sectionTitle: { fontSize:28, fontWeight:800, color:"#2D2D2D", marginBottom:36, maxWidth:500 },
  featuresGrid: { display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20 },
  featureCard:  { background:"#fff", padding:"26px 22px", borderRadius:16, boxShadow:"0 2px 12px rgba(0,0,0,0.06)", border:"1px solid #e8edf5" },
  featureIcon:  { width:56, height:56, borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:14 },
  featureName:  { fontSize:15, fontWeight:700, color:"#2D2D2D", marginBottom:8 },
  featureDesc:  { fontSize:13, color:"#888", lineHeight:1.6 },
  twoCol:       { display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 },
  card:         { background:"#fff", borderRadius:16, padding:24, boxShadow:"0 2px 12px rgba(0,0,0,0.06)", border:"1px solid #f0f0f0" },
  cardHeader:   { display:"flex", alignItems:"center", gap:10, marginBottom:20 },
  cardTitle:    { fontSize:16, fontWeight:800, color:"#2D2D2D" },
  routeRow:     { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 0", borderBottom:"1px solid #f5f5f5" },
  routeName:    { fontSize:14, fontWeight:600, color:"#2D2D2D", marginBottom:3 },
  routeSub:     { fontSize:12, color:"#aaa" },
  badge:        { fontSize:11, fontWeight:700, padding:"4px 12px", borderRadius:20 },
  timeRow:      { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 14px", borderRadius:10, background:"#f8f9fa", marginBottom:10 },
  timeTag:      { fontSize:12, fontWeight:700, color:"#004A99", background:"#e3f2fd", padding:"4px 10px", borderRadius:8 },
  stepsRow:     { display:"flex", alignItems:"flex-start", justifyContent:"center", gap:8, flexWrap:"wrap" },
  step:         { flex:1, minWidth:160, maxWidth:200, textAlign:"center", padding:"20px 16px", position:"relative" },
  stepNum:      { width:36, height:36, borderRadius:"50%", color:"#fff", fontWeight:800, fontSize:16, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px" },
  stepTitle:    { fontSize:14, fontWeight:700, color:"#2D2D2D", marginBottom:6 },
  stepDesc:     { fontSize:12, color:"#555", lineHeight:1.5 },
  stepArrow:    { position:"absolute", right:-10, top:"42%", fontSize:22, color:"#aaa" },
  statsStrip:   { display:"flex", justifyContent:"center", background:"#004A99", padding:"28px 40px", flexWrap:"wrap" },
  statBox:      { flex:1, minWidth:140, textAlign:"center", padding:"10px 20px", borderRight:"1px solid rgba(255,255,255,0.15)" },
  statIcon:     { fontSize:24, marginBottom:6 },
  statVal:      { fontSize:28, fontWeight:900, color:"#FFE566" },
  statLabel:    { fontSize:12, color:"rgba(255,255,255,0.8)", marginTop:3 },
  footer:       { background:"#002B5B", color:"#fff", padding:"48px 40px 28px" },
  footerGrid:   { display:"grid", gridTemplateColumns:"2fr 1fr 1fr", gap:40, marginBottom:32 },
  footerLogo:   { fontSize:20, fontWeight:800, marginBottom:10 },
  footerSub:    { fontSize:13, color:"#a8c8ff", lineHeight:1.7 },
  footerHead:   { fontSize:13, fontWeight:700, marginBottom:14 },
  footerLink:   { fontSize:13, color:"#a8c8ff", marginBottom:8, cursor:"pointer" },
  copyright:    { textAlign:"center", fontSize:13, color:"#6b9ecf", borderTop:"1px solid rgba(255,255,255,0.12)", paddingTop:20 },
>>>>>>> 41eb8645a91cfb9c8bb97ffe0379bf1a7ac5b04e
};