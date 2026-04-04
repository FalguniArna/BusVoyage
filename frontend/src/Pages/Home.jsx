import React from "react"; 
export default function App(){ 
  return ( <div style={styles.page}>

      {/* Navbar */}
      <div style={styles.nav}>
        <h2 style={styles.logo}>🚌 BusVoyage</h2>
        <div>
          <button style={styles.loginBtn}>Login</button>
          <button style={styles.registerBtn}>Register</button>
        </div>
      </div>

      {/* Hero */}
      <section style={styles.heroSection}>

      
<img 
  src="/bus.png" 
  alt="bus"
  className="bus-animate"
/>

    
        <div style={styles.circle1}></div>
        <div style={styles.circle2}></div>

        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            University Bus <br /> Management System
          </h1>

          <p style={styles.heroText}>
            Track buses in real-time, check routes, and stay updated easily.
          </p>

          <button style={styles.heroBtn}>Get Started</button>
        </div>
      </section>

  {/* Features */}
<div style={styles.section}>
  <h2 style={styles.title}>Core Features</h2>

  <div style={styles.featuresGrid}>
    <div style={styles.featureCard}>
      <div style={{fontSize:28}}>🚌</div>
      <h3 style={{fontWeight:"600", marginTop:"10px"}}>Live Bus Tracking</h3>
      <p style={styles.desc}>Real-time tracking system</p>
    </div>
    <div style={styles.featureCard}>
      <div style={{fontSize:28}}>👥</div>
      <h3 style={{fontWeight:"600", marginTop:"10px"}}>Crowd Status</h3>
      <p style={styles.desc}>Check seat availability</p>
    </div>
    <div style={styles.featureCard}>
      <div style={{fontSize:28}}>📢</div>
      <h3 style={{fontWeight:"600", marginTop:"10px"}}>Announcements</h3>
      <p style={styles.desc}>Stay updated easily</p>
    </div>
    <div style={styles.featureCard}>
      <div style={{fontSize:28}}>🧾</div>
      <h3 style={{fontWeight:"600", marginTop:"10px"}}>Complaints</h3>
      <p style={styles.desc}>Report issues quickly</p>
    </div>
  </div>
</div>
      {/*routes times*/}
      <div style={styles.twoCol}>

        <div style={styles.card}>
          <h3 style={styles.title}>Routes</h3>

          <Route name="Tilagor Route" status="Active" color="#28A745" />
          <Route name="Amberkhana Route" status="On Time" color="#004A99" />
          <Route name="City Route" status="Delayed" color="#E31E24" />

        </div>

        <div style={styles.card}>
          <h3 style={styles.title}>Bus Times</h3>

          <TimeBox title="Morning" time="07:00 - 09:00" />
          <TimeBox title="Shuttle" time="Every Hour" />
          <TimeBox title="Afternoon" time="16:00 - 18:00" />

        </div>

      </div>

      {/* gallery */}
      <div style={styles.section}>
        <h2 style={styles.title}>Photo Gallery</h2>

        <div style={styles.gallery}>
          <img src="/s1.jpg" style={styles.galleryImg} />
          <img src="/download.jpg" style={styles.galleryImg} />
          <img src="/s2.jpg" style={styles.galleryImg} />
        </div>
      </div>

      {/* Footer*/}
      <div style={styles.footer}>

        <div style={styles.footerGrid}>
          <div>
            <h3>🚌 BusVoyage</h3>
            <p>Campus Bus Tracking System</p>
          </div>

          <div>
            <h4>Links</h4>
            <p>Routes</p>
            <p>Live Map</p>
          </div>

          <div>
            <h4>Support</h4>
            <p>Help Center</p>
            <p>Contact</p>
          </div>
        </div>

        <div style={styles.copyright}>
          © 2026 BusVoyage • Metropolitan University
        </div>
      </div>

    </div>
  );
}

/* components */

const Feature = ({ icon, title, desc }) => (
  <div style={styles.featureCard}>
    <div style={{ fontSize: 28 }}>{icon}</div>
    <h4>{title}</h4>
    <p style={styles.desc}>{desc}</p>
  </div>
);

const Route = ({ name, status, color }) => (
  <div style={styles.row}>
    <b>{name}</b>
    <span style={{ color }}>{status}</span>
  </div>
);

const TimeBox = ({ title, time }) => (
  <div style={styles.timeBox}>
    <b>{title}</b>
    <span>{time}</span>
  </div>
);

/* Styles */

const styles = {
  page: { background: "#F8F9FA", fontFamily: "Arial" },

  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 40px",
    background: "#fff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
  },

  logo: { color: "#004A99" },

  loginBtn: {
    marginRight: "10px",
    padding: "8px 16px",
    border: "1px solid #004A99",
    color: "#004A99",
    background: "white",
    borderRadius: "6px"
  },

  registerBtn: {
    padding: "8px 16px",
    background: "#004A99",
    color: "white",
    border: "none",
    borderRadius: "6px"
  },

heroSection: {
    height: "80vh",
    background: "linear-gradient(to right, #a6aeb6, #3A86FF)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "visible"
  },
  heroContent: {
    textAlign: "center",
    color: "white",
    zIndex: 2
  },

  heroTitle: {
    fontSize: "40px",
    marginBottom: "20px"
  },

  heroText: {
    marginBottom: "20px"
  },

  heroBtn: {
    padding: "12px 25px",
    background: "white",
    color: "#004A99",
    border: "none",
    borderRadius: "8px"
  },
  circle1: {
    width: "200px",
    height: "200px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "50%",
    position: "absolute",
    top: "50px",
    left: "50px",
    animation: "float 6s infinite"
  },

  circle2: {
    width: "300px",
    height: "300px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "50%",
    position: "absolute",
    bottom: "50px",
    right: "50px",
    animation: "float 8s infinite"
  },

  section: { padding: "40px" },

  title: { color: "#004A99", marginBottom: "20px" },
featuresGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "20px",
  marginTop: "20px"
},
  featureCard: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
  },

  desc: { fontSize: "14px", color: "#666" },

  twoCol: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    padding: "40px"
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px"
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px"
  },

  timeBox: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    marginBottom: "10px"
  },

  gallery: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: "20px"
  },

  galleryImg: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px"
  },

  footer: {
    background: "#002B5B",
    color: "white",
    padding: "40px"
  },

  footerGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: "20px"
  },

  copyright: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "14px",
    color: "#ccc",
    borderTop: "2px solid rgba(255,255,255,0.2)",
    paddingTop: "20px"
  }

  
};