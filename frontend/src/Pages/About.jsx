import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TEAM = [
  { name:"Md. Rakibul Hasan", role:"Full Stack Developer",  sub:"Backend & API Design",      avatar:"RH", color:"#60a5fa", bg:"rgba(96,165,250,0.12)",  border:"rgba(96,165,250,0.3)"  },
  { name:"Nusrat Jahan",      role:"Frontend Developer",    sub:"UI/UX & React",             avatar:"NJ", color:"#4ade80", bg:"rgba(74,222,128,0.12)",  border:"rgba(74,222,128,0.3)"  },
  { name:"Tanvir Ahmed",      role:"Backend Developer",     sub:"Database & Authentication", avatar:"TA", color:"#c084fc", bg:"rgba(192,132,252,0.12)", border:"rgba(192,132,252,0.3)" },
  { name:"Sadia Islam",       role:"UI Designer",           sub:"Figma & Prototyping",       avatar:"SI", color:"#fbbf24", bg:"rgba(251,191,36,0.12)",  border:"rgba(251,191,36,0.3)"  },
];

const TECH = [
  { name:"Next.js",    role:"Frontend Framework",  color:"#60a5fa" },
  { name:"React.js",   role:"UI Library",          color:"#38bdf8" },
  { name:"Node.js",    role:"Runtime",             color:"#4ade80" },
  { name:"Express.js", role:"Backend Framework",   color:"#94a3b8" },
  { name:"MongoDB",    role:"Database",            color:"#4ade80" },
  { name:"JWT",        role:"Authentication",      color:"#f87171" },
  { name:"Chart.js",   role:"Data Visualization",  color:"#fbbf24" },
  { name:"Vercel",     role:"Deployment",          color:"#c084fc" },
];

const FEATURES = [
  { icon:"📡", title:"Live Bus Tracking",    desc:"Students see real-time bus status updated by drivers — no more guessing.",           color:"#60a5fa", bg:"rgba(96,165,250,0.12)"  },
  { icon:"💺", title:"Crowd Status",          desc:"Know if seats are available before you even walk to the stop.",                      color:"#4ade80", bg:"rgba(74,222,128,0.12)"  },
  { icon:"📢", title:"Announcements",         desc:"Transport admins post urgent notices directly — no more WhatsApp chaos.",            color:"#f87171", bg:"rgba(248,113,113,0.12)" },
  { icon:"🧾", title:"Complaints & Feedback", desc:"Submit complaints and track whether they've been resolved.",                         color:"#fbbf24", bg:"rgba(251,191,36,0.12)"  },
  { icon:"🔍", title:"Lost & Found",          desc:"Report and track items lost on buses through a dedicated module.",                   color:"#c084fc", bg:"rgba(192,132,252,0.12)" },
  { icon:"🛡️", title:"Role-Based Access",     desc:"Three separate portals for Students, Drivers, and Admins — all verified.",         color:"#38bdf8", bg:"rgba(56,189,248,0.12)"  },
];

const PROBLEMS = [
  { icon:"⏳", title:"No ETA, no info",       desc:"Students stood at stops with zero idea if the bus had already passed or was minutes away." },
  { icon:"📱", title:"WhatsApp chaos",         desc:"Transport updates were buried in a group full of lost-and-found and random notices."       },
  { icon:"📞", title:"Unsafe driver calls",    desc:"Students called drivers mid-route to confirm location — dangerous and unreliable."         },
  { icon:"☀️", title:"Hot waits, no shelter", desc:"During Sylhet summers, students baked in the sun with no reliable arrival estimate."        },
];

const FAQ = [
  { q:"Who can use BusVoyage?",               a:"Any student, driver, or administrator at Metropolitan University, Sylhet. Each role gets a dedicated, verified portal." },
  { q:"Is it free to use?",                   a:"Yes — completely free for all MU students. Just sign up with your student ID and you're in." },
  { q:"Does it track buses in real time?",    a:"Yes. Drivers update their status manually during each trip, giving students live location and crowd info." },
  { q:"What if I lose something on the bus?", a:"Use the Lost & Found module to report the item. Admins review and contact you if it's recovered." },
  { q:"Can I submit a complaint?",            a:"Absolutely. The complaint module lets you describe the issue and track whether it's been resolved." },
];

/* ── FAQ accordion item — fixed: useState imported at top, no require() ── */
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{ ...faq.item, ...(open ? faq.itemOpen : {}) }}
      onClick={() => setOpen(o => !o)}
    >
      <div style={faq.q}>
        <span>{q}</span>
        <span style={{ ...faq.arrow, transform: open ? "rotate(180deg)" : "none" }}>▾</span>
      </div>
      {open && <div style={faq.a}>{a}</div>}
    </div>
  );
}

const faq = {
  item:     { background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:12, padding:"18px 22px", cursor:"pointer", marginBottom:10, transition:"all 0.2s" },
  itemOpen: { background:"rgba(0,43,91,0.25)", borderColor:"rgba(96,165,250,0.3)" },
  q:        { display:"flex", justifyContent:"space-between", alignItems:"center", fontSize:14, fontWeight:700, color:"#fff" },
  arrow:    { fontSize:18, color:"#60a5fa", transition:"transform 0.2s", flexShrink:0 },
  a:        { fontSize:13, color:"rgba(255,255,255,0.6)", lineHeight:1.7, marginTop:12, paddingTop:12, borderTop:"1px solid rgba(255,255,255,0.06)" },
};

export default function AboutUs() {
  const navigate = useNavigate();

  return (
    <div style={s.page}>
      <style>{CSS}</style>

      {/* ── NAVBAR ── */}
      <nav style={s.nav}>
        <div style={s.brand} onClick={() => navigate("/")}>
          <div style={s.brandDot} />
          <span style={s.brandName}>BusVoyage</span>
          <span style={s.brandMU}>· MU</span>
        </div>
        <div style={s.navLinks}>
          <span style={s.navLink} onClick={() => navigate("/")}>Home</span>
          <span style={{ ...s.navLink, color:"#fff" }}>About</span>
        </div>
        <div style={s.navRight}>
          <button style={s.navSignIn} onClick={() => navigate("/login")}>Sign In</button>
          <button style={s.navSignUp} onClick={() => navigate("/register")}>Sign Up →</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={s.hero}>
        <div style={s.heroGlow1} />
        <div style={s.heroGlow2} />
        <div style={s.stripeWhite} />
        <div style={s.stripeRed} />
        <div style={s.stripeBlue} />

        <div style={s.heroInner}>
          <div style={s.heroBadge} className="fade-1">
            🏫 Metropolitan University · Sylhet · CSE Department
          </div>
          <h1 style={s.heroH1} className="fade-2">
            About <span style={s.heroAccent}>BusVoyage</span>
          </h1>
          <p style={s.heroP} className="fade-3">
            A student-built web platform solving real commuting problems at
            Metropolitan University — making campus transport predictable,
            safe, and stress-free for everyone.
          </p>
          <div style={s.heroStats} className="fade-4">
            {[["8+","Buses Tracked"],["5","Routes"],["3","User Roles"],["1 Month","Built In"]].map(([v,l]) => (
              <div key={l} style={s.heroStat}>
                <div style={s.heroStatVal}>{v}</div>
                <div style={s.heroStatLabel}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE PROBLEM ── */}
      <section style={{ ...s.sec, background:"#fff" }}>
        <div style={s.secInner}>
          <div style={s.pill}>The Problem</div>
          <h2 style={s.secH2}>Why BusVoyage<br />was built</h2>
          <p style={s.secP}>
            Students at MU faced daily frustration — no information,
            no system, just uncertainty and wasted time.
          </p>
          <div style={s.problemGrid}>
            {PROBLEMS.map((p, i) => (
              <div key={i} style={s.problemCard} className="lift">
                <div style={s.problemIconWrap}>{p.icon}</div>
                <div style={s.problemTitle}>{p.title}</div>
                <div style={s.problemDesc}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ ...s.sec, background:"#020d1f" }}>
        <div style={s.secInner}>
          <div style={{ ...s.pill, ...s.pillW }}>What We Built</div>
          <h2 style={{ ...s.secH2, color:"#fff" }}>Core features<br />of BusVoyage</h2>
          <div style={s.featGrid}>
            {FEATURES.map((f, i) => (
              <div key={i} style={s.featCard} className="liftDark">
                <div style={{ ...s.featIconBox, background: f.bg }}>
                  <span style={{ fontSize:22 }}>{f.icon}</span>
                </div>
                <div style={{ ...s.featTitle, color:"#fff" }}>{f.title}</div>
                <div style={s.featDesc}>{f.desc}</div>
                <div style={{ ...s.featAccent, background: f.color }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section style={{ ...s.sec, background:"#001833" }}>
        <div style={s.secInner}>
          <div style={{ ...s.pill, ...s.pillW }}>Technology</div>
          <h2 style={{ ...s.secH2, color:"#fff" }}>Built with the<br />MERN stack</h2>
          <p style={s.secPW}>
            One language from frontend to backend — JavaScript throughout,
            so the whole team could ship faster.
          </p>
          <div style={s.techGrid}>
            {TECH.map((t, i) => (
              <div key={i} style={{ ...s.techCard, borderTop:`3px solid ${t.color}` }} className="liftDark">
                <div style={{ fontSize:15, fontWeight:800, color:t.color, marginBottom:4 }}>{t.name}</div>
                <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", fontWeight:500 }}>{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section style={{ ...s.sec, background:"#020d1f" }}>
        <div style={s.secInner}>
          <div style={{ ...s.pill, ...s.pillW }}>The Team</div>
          <h2 style={{ ...s.secH2, color:"#fff" }}>MU students,<br />building for MU.</h2>
          <p style={s.secPW}>
            BusVoyage is a university project by CSE students at
            Metropolitan University, Sylhet — built in one month,
            from idea to deployment.
          </p>
          <div style={s.teamGrid}>
            {TEAM.map((m, i) => (
              <div key={i} style={s.teamCard} className="liftDark">
                <div style={{ ...s.teamAvatar, background: m.bg, color: m.color, border:`2px solid ${m.border}` }}>
                  {m.avatar}
                </div>
                <div style={s.teamName}>{m.name}</div>
                <div style={{ ...s.teamRole, color: m.color }}>{m.role}</div>
                <div style={s.teamSub}>{m.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ / HELP CENTER ── */}
      <section style={{ ...s.sec, background:"#001833" }}>
        <div style={s.secInner}>
          <div style={{ ...s.pill, ...s.pillW }}>Help Center</div>
          <h2 style={{ ...s.secH2, color:"#fff" }}>Common questions<br />answered.</h2>
          <div style={s.faqList}>
            {FAQ.map((f, i) => (
              <FaqItem key={i} q={f.q} a={f.a} />
            ))}
          </div>
          <div style={s.contactRow}>
            <div style={s.contactCard}>
              <div style={s.contactIcon}>📧</div>
              <div style={s.contactTitle}>Email Support</div>
              <div style={s.contactSub}>transport@metrouni.edu.bd</div>
            </div>
            <div style={s.contactCard}>
              <div style={s.contactIcon}>📍</div>
              <div style={s.contactTitle}>Transport Office</div>
              <div style={s.contactSub}>Admin Building, 2nd Floor, MU Campus</div>
            </div>
            <div style={s.contactCard}>
              <div style={s.contactIcon}>🕐</div>
              <div style={s.contactTitle}>Office Hours</div>
              <div style={s.contactSub}>Sun – Thu, 9:00 AM – 5:00 PM</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={s.ctaSec}>
        <div style={s.ctaGlow1} />
        <div style={s.ctaGlow2} />
        <div style={{ position:"relative", zIndex:2, textAlign:"center" }}>
          <div style={{ ...s.pill, ...s.pillRed, display:"inline-block", marginBottom:20 }}>Get Onboard</div>
          <h2 style={s.ctaH2}>Ready to ride smarter?</h2>
          <p style={s.ctaP}>Join hundreds of MU students who never miss their bus again.</p>
          <div style={s.ctaBtns}>
            <button style={s.ctaPrimary}  onClick={() => navigate("/register")}>Create Free Account →</button>
            <button style={s.ctaOutline}  onClick={() => navigate("/")}>Back to Home</button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={s.footer}>
        <div style={s.footerTop}>
          <div>
            <div style={s.footerBrand}>🚌 BusVoyage</div>
            <div style={s.footerSub}>Campus Bus Tracking System<br />Metropolitan University, Sylhet</div>
            <div style={s.footerTag}>CSE Department · 2026</div>
          </div>
          <div style={s.footerCols}>
            {[
              { head:"Navigate",  links:[["Home","/"],["About","/about"],["Routes","/"]] },
              { head:"Account",   links:[["Sign In","/login"],["Sign Up","/register"]] },
              { head:"Support",   links:[["Report Issue","/"],["Contact","/"]] },
            ].map((col, i) => (
              <div key={i}>
                <div style={s.footerHead}>{col.head}</div>
                {col.links.map(([l, path]) => (
                  <div key={l} style={s.footerLink} onClick={() => navigate(path)}>{l}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div style={s.footerRule} />
        <div style={s.footerBottom}>
          <span>© 2026 BusVoyage · Metropolitan University · CSE Department</span>
          <span style={{ color:"#E31E24" }}>Made with ❤️ in Sylhet</span>
        </div>
      </footer>
    </div>
  );
}

const CSS = `
  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior: smooth; }
  button { font-family: inherit; cursor: pointer; }

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(22px); }
    to   { opacity:1; transform:none; }
  }
  .fade-1 { animation: fadeUp 0.7s ease 0.1s  both; }
  .fade-2 { animation: fadeUp 0.7s ease 0.25s both; }
  .fade-3 { animation: fadeUp 0.7s ease 0.4s  both; }
  .fade-4 { animation: fadeUp 0.7s ease 0.55s both; }

  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.25} }

  .lift:hover     { transform:translateY(-5px) !important; box-shadow:0 16px 40px rgba(0,0,0,0.18) !important; transition:0.3s; }
  .liftDark:hover { transform:translateY(-3px) !important; background:rgba(255,255,255,0.07) !important; transition:0.3s; }

  @media (max-width: 900px) {
    .prob-grid  { grid-template-columns: 1fr 1fr !important; }
    .feat-grid  { grid-template-columns: 1fr 1fr !important; }
    .tech-grid  { grid-template-columns: repeat(2,1fr) !important; }
    .team-grid  { grid-template-columns: 1fr 1fr !important; }
  }
  @media (max-width: 600px) {
    .nav-links  { display: none !important; }
    .prob-grid  { grid-template-columns: 1fr !important; }
    .feat-grid  { grid-template-columns: 1fr !important; }
    .team-grid  { grid-template-columns: 1fr 1fr !important; }
  }
`;

/* ════ STYLES ════ */
const s = {
  page: { fontFamily:"'Segoe UI',system-ui,sans-serif", background:"#020d1f", color:"#1A1A2E" },

  /* NAV */
  nav: {
    position:"sticky", top:0, zIndex:200,
    display:"flex", alignItems:"center", justifyContent:"space-between",
    padding:"0 52px", height:62,
    background:"rgba(2,13,31,0.97)", backdropFilter:"blur(18px)",
    boxShadow:"0 1px 0 rgba(255,255,255,0.06)",
  },
  brand:    { display:"flex", alignItems:"center", gap:8, cursor:"pointer" },
  brandDot: { width:9, height:9, borderRadius:"50%", background:"#E31E24", animation:"blink 2.5s infinite" },
  brandName:{ fontSize:18, fontWeight:900, color:"#fff" },
  brandMU:  { fontSize:13, color:"rgba(255,255,255,0.4)", fontWeight:500 },
  navLinks: { display:"flex", gap:28 },
  navLink:  { fontSize:13, fontWeight:500, color:"rgba(255,255,255,0.6)", cursor:"pointer" },
  navRight: { display:"flex", gap:10, alignItems:"center" },
  navSignIn:{ padding:"7px 20px", background:"transparent", border:"1px solid rgba(255,255,255,0.28)", color:"#fff", borderRadius:7, fontSize:13 },
  navSignUp:{ padding:"8px 22px", background:"#E31E24", border:"none", color:"#fff", borderRadius:7, fontWeight:700, fontSize:13 },

  /* HERO */
  hero: {
    position:"relative", background:"#020d1f",
    padding:"110px 52px 80px", overflow:"hidden",
  },
  heroGlow1:   { position:"absolute", top:-80, left:"20%", width:480, height:480, background:"radial-gradient(circle, rgba(0,43,91,0.35), transparent 70%)", pointerEvents:"none" },
  heroGlow2:   { position:"absolute", bottom:-40, right:"15%", width:320, height:320, background:"radial-gradient(circle, rgba(0,80,180,0.2), transparent 70%)", pointerEvents:"none" },
  stripeWhite: { position:"absolute", left:0,  top:0, bottom:0, width:5, background:"rgba(255,255,255,0.9)", zIndex:2 },
  stripeRed:   { position:"absolute", left:9,  top:0, bottom:0, width:4, background:"#E31E24", zIndex:2 },
  stripeBlue:  { position:"absolute", left:17, top:0, bottom:0, width:4, background:"#002B5B", zIndex:2 },

  heroInner:     { position:"relative", zIndex:10, maxWidth:720, margin:"0 auto", textAlign:"center" },
  heroBadge:     { display:"inline-block", background:"rgba(0,43,91,0.4)", backdropFilter:"blur(8px)", border:"1px solid rgba(96,165,250,0.3)", color:"#60a5fa", fontSize:11, fontWeight:700, letterSpacing:1.5, textTransform:"uppercase", padding:"7px 18px", borderRadius:20, marginBottom:24 },
  heroH1:        { fontSize:"clamp(32px,5vw,52px)", fontWeight:900, color:"#fff", lineHeight:1.15, marginBottom:20, letterSpacing:"-0.02em" },
  heroAccent:    { color:"#FFE566" },
  heroP:         { fontSize:16, color:"rgba(255,255,255,0.65)", lineHeight:1.8, marginBottom:44, maxWidth:520, display:"block", margin:"0 auto 44px" },
  heroStats:     { display:"flex", justifyContent:"center", gap:48, flexWrap:"wrap" },
  heroStat:      { textAlign:"center" },
  heroStatVal:   { fontSize:30, fontWeight:900, color:"#FFE566", marginBottom:4 },
  heroStatLabel: { fontSize:12, color:"rgba(255,255,255,0.5)", fontWeight:500, textTransform:"uppercase", letterSpacing:1 },

  /* SECTIONS */
  sec:     { padding:"88px 52px" },
  secInner:{ maxWidth:1180, margin:"0 auto" },

  pill:    { display:"inline-block", background:"#e8f0ff", color:"#002B5B", fontSize:11, fontWeight:700, padding:"6px 14px", borderRadius:20, marginBottom:16, textTransform:"uppercase", letterSpacing:1 },
  pillW:   { background:"rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.75)" },
  pillRed: { background:"rgba(227,30,36,0.15)", color:"#f87171" },

  secH2:   { fontSize:"clamp(24px,3.5vw,40px)", fontWeight:900, color:"#1A1A2E", lineHeight:1.18, marginBottom:12, letterSpacing:"-0.02em" },
  secP:    { fontSize:14, color:"#64748b", lineHeight:1.75, marginBottom:40, maxWidth:560 },
  secPW:   { fontSize:14, color:"rgba(255,255,255,0.5)", lineHeight:1.75, marginBottom:40, maxWidth:560 },

  /* PROBLEMS */
  problemGrid:    { display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginTop:32 },
  problemCard:    { background:"#f8fafc", borderRadius:16, padding:"24px 20px", border:"1px solid #e2e8f0" },
  problemIconWrap:{ fontSize:28, marginBottom:14 },
  problemTitle:   { fontSize:14, fontWeight:800, color:"#1A1A2E", marginBottom:8 },
  problemDesc:    { fontSize:13, color:"#64748b", lineHeight:1.65 },

  /* FEATURES */
  featGrid:   { display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginTop:32 },
  featCard:   { background:"rgba(255,255,255,0.04)", borderRadius:16, padding:"24px 20px", border:"1px solid rgba(255,255,255,0.08)", position:"relative", overflow:"hidden" },
  featIconBox:{ width:50, height:50, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:14 },
  featTitle:  { fontSize:15, fontWeight:700, marginBottom:8 },
  featDesc:   { fontSize:13, color:"rgba(255,255,255,0.5)", lineHeight:1.65 },
  featAccent: { position:"absolute", bottom:0, left:0, right:0, height:3 },

  /* TECH */
  techGrid: { display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginTop:32 },
  techCard: { background:"rgba(255,255,255,0.04)", borderRadius:12, padding:"18px 16px", border:"1px solid rgba(255,255,255,0.08)" },

  /* TEAM */
  teamGrid:   { display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:18, marginTop:32 },
  teamCard:   { background:"rgba(255,255,255,0.04)", borderRadius:18, padding:"28px 20px", textAlign:"center", border:"1px solid rgba(255,255,255,0.08)" },
  teamAvatar: { width:66, height:66, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, fontWeight:800, margin:"0 auto 16px" },
  teamName:   { fontSize:14, fontWeight:700, color:"#fff", marginBottom:4 },
  teamRole:   { fontSize:13, fontWeight:600, marginBottom:4 },
  teamSub:    { fontSize:12, color:"rgba(255,255,255,0.4)" },

  /* FAQ */
  faqList: { marginTop:32, marginBottom:40 },

  /* CONTACT */
  contactRow:  { display:"flex", gap:16, flexWrap:"wrap" },
  contactCard: { flex:1, minWidth:200, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:14, padding:"22px 20px", textAlign:"center" },
  contactIcon: { fontSize:28, marginBottom:12 },
  contactTitle:{ fontSize:14, fontWeight:700, color:"#fff", marginBottom:6 },
  contactSub:  { fontSize:13, color:"rgba(255,255,255,0.45)", lineHeight:1.6 },

  /* CTA */
  ctaSec:     { padding:"100px 52px", background:"#001833", position:"relative", overflow:"hidden", textAlign:"center" },
  ctaGlow1:   { position:"absolute", top:-80, left:"20%", width:400, height:400, background:"radial-gradient(circle, rgba(0,43,91,0.25), transparent 70%)", pointerEvents:"none" },
  ctaGlow2:   { position:"absolute", bottom:-60, right:"15%", width:300, height:300, background:"radial-gradient(circle, rgba(0,80,180,0.15), transparent 70%)", pointerEvents:"none" },
  ctaH2:      { fontSize:"clamp(26px,4vw,46px)", fontWeight:900, color:"#fff", marginBottom:16 },
  ctaP:       { fontSize:16, color:"rgba(255,255,255,0.55)", marginBottom:36 },
  ctaBtns:    { display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" },
  ctaPrimary: { padding:"14px 32px", background:"#E31E24", color:"#fff", border:"none", borderRadius:10, fontWeight:800, fontSize:15 },
  ctaOutline: { padding:"14px 28px", background:"rgba(255,255,255,0.06)", color:"#fff", border:"1.5px solid rgba(255,255,255,0.22)", borderRadius:10, fontWeight:600, fontSize:15 },

  /* FOOTER */
  footer:      { padding:"64px 52px 32px", background:"#000c18", color:"#fff" },
  footerTop:   { display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:40, marginBottom:48 },
  footerBrand: { fontSize:20, fontWeight:900, marginBottom:10 },
  footerSub:   { color:"rgba(255,255,255,0.35)", lineHeight:1.7, fontSize:13, marginBottom:12 },
  footerTag:   { fontSize:11, color:"rgba(255,255,255,0.2)" },
  footerCols:  { display:"flex", gap:48, flexWrap:"wrap" },
  footerHead:  { fontWeight:800, marginBottom:16, fontSize:11, color:"#60a5fa", letterSpacing:1.5, textTransform:"uppercase" },
  footerLink:  { color:"rgba(255,255,255,0.4)", fontSize:13, marginBottom:10, cursor:"pointer" },
  footerRule:  { height:1, background:"rgba(255,255,255,0.05)", marginBottom:24 },
  footerBottom:{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:10, fontSize:12, color:"rgba(255,255,255,0.2)" },
};