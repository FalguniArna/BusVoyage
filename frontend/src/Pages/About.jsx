import { useNavigate } from "react-router-dom";

const TEAM = [
  { name:"Md. Rakibul Hasan", role:"Full Stack Developer",  sub:"Backend & API Design",       avatar:"RH", color:"#004A99", bg:"#EFF6FF", border:"#93C5FD" },
  { name:"Nusrat Jahan",      role:"Frontend Developer",    sub:"UI/UX & React",              avatar:"NJ", color:"#16A34A", bg:"#DCFCE7", border:"#86EFAC" },
  { name:"Tanvir Ahmed",      role:"Backend Developer",     sub:"Database & Authentication",  avatar:"TA", color:"#7C3AED", bg:"#F5F3FF", border:"#C4B5FD" },
  { name:"Sadia Islam",       role:"UI Designer",           sub:"Figma & Prototyping",        avatar:"SI", color:"#D97706", bg:"#FEF3C7", border:"#FCD34D" },
];

const TECH = [
  { name:"Next.js",    role:"Frontend Framework",  color:"#0F172A" },
  { name:"React.js",   role:"UI Library",          color:"#0369A1" },
  { name:"Node.js",    role:"Runtime",             color:"#16A34A" },
  { name:"Express.js", role:"Backend Framework",   color:"#475569" },
  { name:"MongoDB",    role:"Database",            color:"#16A34A" },
  { name:"JWT",        role:"Authentication",      color:"#DC2626" },
  { name:"Chart.js",   role:"Data Visualization",  color:"#D97706" },
  { name:"Vercel",     role:"Deployment",          color:"#7C3AED" },
];

const FEATURES = [
  { icon:"🚌", title:"Live Bus Tracking",    desc:"Students see real-time bus status and route progress, updated by drivers.",          color:"#004A99", bg:"#EFF6FF" },
  { icon:"💺", title:"Crowd Status",          desc:"Drivers report seat availability so students know what to expect before arriving.",  color:"#16A34A", bg:"#DCFCE7" },
  { icon:"📢", title:"Announcements",         desc:"Transport admins post urgent or general notices directly to all students.",         color:"#DC2626", bg:"#FEE2E2" },
  { icon:"🧾", title:"Complaints & Feedback", desc:"Students submit transport complaints and track their resolution status.",           color:"#D97706", bg:"#FEF3C7" },
  { icon:"🔍", title:"Lost & Found",          desc:"Items lost on buses can be reported and tracked through a dedicated module.",       color:"#7C3AED", bg:"#F5F3FF" },
  { icon:"🛡️", title:"Role-Based Access",     desc:"Three separate portals for Students, Drivers, and Admins with verified login.",    color:"#0369A1", bg:"#EFF6FF" },
];

const PROBLEMS = [
  { icon:"⏳", title:"Uncertain waiting times",  desc:"Students stood at stops with no idea if the bus had already passed." },
  { icon:"📱", title:"WhatsApp chaos",            desc:"Transport updates were buried in a group full of unrelated notices." },
  { icon:"📞", title:"Unsafe driver calls",       desc:"Students called drivers mid-route to check location — a safety hazard." },
  { icon:"☀️", title:"No arrival information",   desc:"During hot Sylhet summers, students waited with no ETA whatsoever." },
];

export default function AboutUs() {
  const navigate = useNavigate();

  return (
    <div style={s.page}>

      {/* Navbar */}
      <nav style={s.nav}>
        <div style={s.navLeft}>
          <span style={{ fontSize: 22 }}>🚌</span>
          <span style={s.navBrand}>BusVoyage</span>
        </div>
        <div style={{ display:"flex", gap:14, alignItems:"center" }}>
          <span style={s.navLink} onClick={() => navigate("/")}>Home</span>
          <button style={s.loginBtn}    onClick={() => navigate("/login")}>Login</button>
          <button style={s.registerBtn} onClick={() => navigate("/register")}>Register</button>
        </div>
      </nav>

      {/* Hero */}
      <section style={s.hero}>
        <div style={s.heroGlow} />
        <div style={s.heroContent}>
          <div style={s.heroBadge}>🏫 Metropolitan University · Sylhet · CSE Department</div>
          <h1 style={s.heroTitle}>
            About <span style={s.heroAccent}>BusVoyage</span>
          </h1>
          <p style={s.heroSub}>
            A student-built web platform solving real commuting problems at Metropolitan University —
            making campus transport predictable, safe, and stress-free.
          </p>
          <div style={s.heroStats}>
            {[["8+","Buses Tracked"],["5","Routes Covered"],["3","User Roles"],["1 Month","To Build"]].map(([v,l]) => (
              <div key={l} style={s.heroStat}>
                <span style={s.heroStatVal}>{v}</span>
                <span style={s.heroStatLabel}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem */}
      <section style={{ ...s.section, background:"#fff" }}>
        <div style={s.sectionLabel}>The Problem</div>
        <h2 style={s.sectionTitle}>Why BusVoyage was built</h2>
        <p style={s.sectionSub}>Students at MU faced daily frustration with university transport — no information, no system, just uncertainty.</p>
        <div style={s.problemGrid}>
          {PROBLEMS.map((p, i) => (
            <div key={i} style={s.problemCard}>
              <div style={s.problemIcon}>{p.icon}</div>
              <div style={s.problemTitle}>{p.title}</div>
              <div style={s.problemDesc}>{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ ...s.section, background:"#F0F4FF" }}>
        <div style={s.sectionLabel}>What We Built</div>
        <h2 style={s.sectionTitle}>Core features of BusVoyage</h2>
        <div style={s.featuresGrid}>
          {FEATURES.map((f, i) => (
            <div key={i} style={s.featureCard}>
              <div style={{ ...s.featureIcon, background:f.bg }}>
                <span style={{ fontSize:24 }}>{f.icon}</span>
              </div>
              <div style={{ fontSize:14, fontWeight:700, color:"#0F172A", marginBottom:7 }}>{f.title}</div>
              <div style={{ fontSize:13, color:"#64748B", lineHeight:1.65 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section style={{ ...s.section, background:"#fff" }}>
        <div style={s.sectionLabel}>Technology</div>
        <h2 style={s.sectionTitle}>Built with the MERN stack</h2>
        <p style={s.sectionSub}>BusVoyage uses a modern JavaScript stack throughout — one language from frontend to backend, allowing the team to move fast.</p>
        <div style={s.techGrid}>
          {TECH.map((t, i) => (
            <div key={i} style={{ ...s.techCard, borderTop:`3px solid ${t.color}` }}>
              <div style={{ fontSize:15, fontWeight:800, color:t.color, marginBottom:4 }}>{t.name}</div>
              <div style={{ fontSize:12, color:"#94A3B8", fontWeight:500 }}>{t.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section style={{ ...s.section, background:"#F0F4FF" }}>
        <div style={s.sectionLabel}>The Team</div>
        <h2 style={s.sectionTitle}>Built by MU students, for MU students</h2>
        <p style={s.sectionSub}>BusVoyage is a university project developed by Computer Science & Engineering students at Metropolitan University, Sylhet.</p>
        <div style={s.teamGrid}>
          {TEAM.map((m, i) => (
            <div key={i} style={s.teamCard}>
              <div style={{ ...s.teamAvatar, background:m.bg, color:m.color, border:`2.5px solid ${m.border}` }}>
                {m.avatar}
              </div>
              <div style={{ fontSize:15, fontWeight:700, color:"#0F172A", marginBottom:3 }}>{m.name}</div>
              <div style={{ fontSize:13, fontWeight:600, color:m.color, marginBottom:2 }}>{m.role}</div>
              <div style={{ fontSize:12, color:"#94A3B8" }}>{m.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={s.cta}>
        <div style={s.ctaInner}>
          <h2 style={s.ctaTitle}>Ready to ride smarter?</h2>
          <p style={s.ctaSub}>Join hundreds of MU students who never miss their bus again.</p>
          <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
            <button style={s.ctaBtn}     onClick={() => navigate("/register")}>Create Account →</button>
            <button style={s.ctaOutline} onClick={() => navigate("/")}>Back to Home</button>
          </div>
        </div>
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
            <div style={s.footerLink} onClick={() => navigate("/")}>Home</div>
            <div style={s.footerLink}>Routes</div>
            <div style={s.footerLink}>Schedule</div>
          </div>
          <div>
            <div style={s.footerHead}>Support</div>
            <div style={s.footerLink}>Help Center</div>
            <div style={s.footerLink}>Contact</div>
            <div style={s.footerLink}>Report Issue</div>
          </div>
        </div>
        <div style={s.copyright}>© 2026 BusVoyage · Metropolitan University · CSE Department</div>
      </footer>
    </div>
  );
}

const s = {
  page: { fontFamily:"'Segoe UI',Arial,sans-serif", background:"#F0F4FF", margin:0 },

  nav: {
    position:"sticky", top:0, zIndex:100,
    display:"flex", justifyContent:"space-between", alignItems:"center",
    padding:"14px 40px",
    background:"rgba(255,255,255,0.97)", backdropFilter:"blur(10px)",
    boxShadow:"0 1px 12px rgba(0,0,0,0.07)",
  },
  navLeft:     { display:"flex", alignItems:"center", gap:8 },
  navBrand:    { fontSize:18, fontWeight:800, color:"#004A99" },
  navLink:     { fontSize:14, color:"#555", cursor:"pointer", fontWeight:500 },
  loginBtn:    { padding:"8px 18px", border:"1.5px solid #004A99", color:"#004A99", background:"white", borderRadius:8, fontWeight:600, cursor:"pointer", fontSize:14 },
  registerBtn: { padding:"8px 18px", background:"#004A99", color:"white", border:"none", borderRadius:8, fontWeight:600, cursor:"pointer", fontSize:14 },

  hero: {
    position:"relative",
    background:"linear-gradient(135deg, #002255 0%, #003580 50%, #004A99 100%)",
    padding:"90px 40px 70px", overflow:"hidden",
  },
  heroGlow: {
    position:"absolute", inset:0,
    backgroundImage:"radial-gradient(circle at 15% 50%, rgba(255,229,102,0.08) 0%, transparent 55%), radial-gradient(circle at 85% 20%, rgba(255,255,255,0.04) 0%, transparent 50%)",
  },
  heroContent:   { position:"relative", zIndex:2, maxWidth:720, margin:"0 auto", textAlign:"center" },
  heroBadge: {
    display:"inline-block",
    background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)",
    color:"#93C5FD", fontSize:11, fontWeight:700,
    letterSpacing:1, textTransform:"uppercase",
    padding:"6px 18px", borderRadius:20, marginBottom:22,
  },
  heroTitle:     { fontSize:44, fontWeight:900, color:"#fff", lineHeight:1.2, marginBottom:18, textShadow:"0 2px 20px rgba(0,0,0,0.4)" },
  heroAccent:    { color:"#FFE566" },
  heroSub:       { fontSize:16, color:"rgba(255,255,255,0.82)", lineHeight:1.75, marginBottom:44, maxWidth:560, margin:"0 auto 44px" },
  heroStats:     { display:"flex", justifyContent:"center", gap:52, flexWrap:"wrap" },
  heroStat:      { display:"flex", flexDirection:"column", alignItems:"center" },
  heroStatVal:   { fontSize:30, fontWeight:900, color:"#FFE566" },
  heroStatLabel: { fontSize:12, color:"rgba(255,255,255,0.65)", marginTop:3, fontWeight:500 },

  section:    { padding:"64px 40px" },
  sectionLabel:{ fontSize:11, fontWeight:700, color:"#004A99", letterSpacing:2.5, textTransform:"uppercase", marginBottom:10 },
  sectionTitle:{ fontSize:28, fontWeight:800, color:"#0F172A", marginBottom:12, lineHeight:1.3 },
  sectionSub:  { fontSize:14, color:"#64748B", lineHeight:1.75, marginBottom:36, maxWidth:620 },

  problemGrid: { display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginTop:32 },
  problemCard: { background:"#F8FAFF", borderRadius:14, padding:"22px 20px", border:"1px solid #E2E8F0" },
  problemIcon: { fontSize:28, marginBottom:12 },
  problemTitle:{ fontSize:14, fontWeight:700, color:"#0F172A", marginBottom:6 },
  problemDesc: { fontSize:13, color:"#64748B", lineHeight:1.65 },

  featuresGrid:{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:18, marginTop:32 },
  featureCard: { background:"#fff", borderRadius:14, padding:"24px 22px", border:"1px solid #E2E8F0", boxShadow:"0 1px 6px rgba(0,0,0,0.05)" },
  featureIcon: { width:52, height:52, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:14 },

  techGrid: { display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginTop:32 },
  techCard: { background:"#F8FAFF", borderRadius:12, padding:"18px", border:"1px solid #E2E8F0" },

  teamGrid: { display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:18, marginTop:32 },
  teamCard: { background:"#fff", borderRadius:16, padding:"28px 20px", textAlign:"center", border:"1px solid #E2E8F0", boxShadow:"0 1px 4px rgba(0,0,0,0.04)" },
  teamAvatar: { width:64, height:64, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, fontWeight:800, margin:"0 auto 16px" },

  cta: { background:"linear-gradient(135deg,#002255 0%,#004A99 100%)", padding:"80px 40px" },
  ctaInner:   { maxWidth:560, margin:"0 auto", textAlign:"center" },
  ctaTitle:   { fontSize:32, fontWeight:900, color:"#fff", marginBottom:12 },
  ctaSub:     { fontSize:15, color:"rgba(255,255,255,0.75)", marginBottom:32 },
  ctaBtn:     { padding:"13px 30px", background:"#E31E24", color:"#fff", border:"none", borderRadius:10, fontWeight:700, fontSize:15, cursor:"pointer", boxShadow:"0 4px 16px rgba(227,30,36,0.4)" },
  ctaOutline: { padding:"13px 26px", background:"rgba(255,255,255,0.12)", color:"#fff", border:"1.5px solid rgba(255,255,255,0.4)", borderRadius:10, fontWeight:600, fontSize:15, cursor:"pointer" },

  footer:     { background:"#001833", color:"#fff", padding:"48px 40px 28px" },
  footerGrid: { display:"grid", gridTemplateColumns:"2fr 1fr 1fr", gap:40, marginBottom:32 },
  footerLogo: { fontSize:18, fontWeight:800, marginBottom:10 },
  footerSub:  { fontSize:13, color:"#7aa8d8", lineHeight:1.8 },
  footerHead: { fontSize:12, fontWeight:700, marginBottom:14, color:"#fff", textTransform:"uppercase", letterSpacing:1 },
  footerLink: { fontSize:13, color:"#7aa8d8", marginBottom:10, cursor:"pointer" },
  copyright:  { textAlign:"center", fontSize:12, color:"#4a7ab0", borderTop:"1px solid rgba(255,255,255,0.08)", paddingTop:20 },
};