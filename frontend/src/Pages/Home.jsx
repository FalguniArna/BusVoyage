import React, { useEffect, useRef, useState } from "react";
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

function useReveal() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
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

function StatCounter({ target, suffix = "" }) {
  const [val, ref] = useCounter(target);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

const GALLERY = [
  "/bus1.png",
  "/bus5.jpg",
  "/bus2.jpeg",
  "/bus3.jpeg",
  "/mu.jpg",
  "/bus.png",
];

const FEATURES = [
  { icon: "📡", title: "Live Bus Tracking",    desc: "See exactly where your bus is — real-time updates from drivers.",  bg: "rgba(227,30,36,0.10)",  line: "#E31E24" },
  { icon: "💺", title: "Crowd Status",          desc: "Know seat availability before you walk to the stop.",              bg: "rgba(0,43,91,0.10)",    line: "#002B5B" },
  { icon: "🔔", title: "Smart Announcements",   desc: "Instant transport notices — no more WhatsApp chaos.",              bg: "rgba(255,193,7,0.15)",  line: "#d97706" },
  { icon: "🧾", title: "Complaints & Feedback", desc: "Report issues and track resolution — all in one place.",           bg: "rgba(0,43,91,0.06)",    line: "#002B5B" },
];

const STEPS = [
  { icon: "📝", title: "Register", desc: "Sign up with your MU student ID in under 2 minutes.", color: "#E31E24" },
  { icon: "🔍", title: "Track",    desc: "Open the live board — see every bus in real time.",   color: "#002B5B" },
  { icon: "🚌", title: "Board",    desc: "You know where it is — no guessing, no waiting.",     color: "#1d4ed8" },
  { icon: "✅", title: "Arrive",   desc: "Reach campus on time, every single day.",              color: "#16a34a" },
];

const IMPACTS = [
  { num: 8,    suffix: "+", label: "Active Buses"  },
  { num: 5,    suffix: "",  label: "Routes"         },
  { num: 1200, suffix: "+", label: "Daily Students" },
  { num: 98,   suffix: "%", label: "On-Time Rate"   },
  { num: 32,   suffix: "",  label: "Bus Stops"      },
];

const MAIN_ROUTES = [
  { route: "Modina Market, Ambarkhana, Chouhatta, Kumarpara, Tilagor, Campus",        arrival: "08:10 AM", departure: "—",        bus: "11-0018", driver: "Sajib",   for: "Teacher Transport" },
  { route: "Campus, Shahi Eidgah, Kumarpara, Chouhatta, Rikabibazar, Subidbazar",     arrival: "—",        departure: "04:00 PM", bus: "11-0010", driver: "Shahdat", for: "Teacher Transport" },
  { route: "Subidbazar, Rikabibazar, Kumarpara, Shahi Eidgah, Tilagor, Campus",       arrival: "09:27 AM", departure: "—",        bus: "11-0967", driver: "Monir",   for: "Teacher & Staff"   },
  { route: "Campus, Shahi Eidgah, Kumarpara, Chouhatta, Rikabibazar, Subidbazar",     arrival: "—",        departure: "06:00 PM", bus: "11-0010", driver: "Shahdat", for: "Teacher & Staff"   },
  { route: "Subidbazar, Ambarkhana, Shahi Eidgah, Tilagor, Campus",                   arrival: "08:10 AM", departure: "05:00 PM", bus: "11-0944", driver: "Nasir",   for: "Student"           },
  { route: "Rikabibazar, Chouhatta, Kumarpara, Shahi Eidgah, Tilagor, Campus",        arrival: "08:15 AM", departure: "02:30 PM", bus: "11-0967", driver: "Monir",   for: "Student"           },
  { route: "Rikabibazar, Subidbazar, Ambarkhana, Shahi Eidgah, Tilagor, Campus",      arrival: "08:10 AM", departure: "02:30 PM", bus: "11-0900", driver: "Farid",   for: "Student"           },
  { route: "Temukhi, Modina Market, Subidbazar, Ambarkhana, Tilagor, Campus",         arrival: "08:02 AM", departure: "05:00 PM", bus: "BRTC",    driver: "—",       for: "Student"           },
  { route: "Modina Market, Subidbazar, Ambarkhana, Shahi Eidgah, Tilagor, Campus",    arrival: "08:10 AM", departure: "02:30 PM", bus: "BRTC",    driver: "—",       for: "Student"           },
  { route: "Humayun Rashid Chottor, Kumarpara, Shibgonj, Tilagor, Campus",            arrival: "08:15 AM", departure: "05:00 PM", bus: "BRTC",    driver: "—",       for: "Student"           },
];

const SHUTTLE = [
  { dep: "09:10 AM", arr: "—",        bus: "11-0018", driver: "Sajib"   },
  { dep: "10:05 AM", arr: "09:30 AM", bus: "11-0018", driver: "Sajib"   },
  { dep: "11:00 AM", arr: "10:30 AM", bus: "11-0018", driver: "Sajib"   },
  { dep: "—",        arr: "11:30 AM", bus: "11-0018", driver: "Sajib"   },
  { dep: "12:05 PM", arr: "—",        bus: "11-0010", driver: "Shahdat" },
  { dep: "01:00 PM", arr: "12:30 PM", bus: "11-0010", driver: "Shahdat" },
];

const RIKABI_TEMP = [
  { time: "12:00 PM", type: "Departure", bus: "11-0967", driver: "Monir"  },
  { time: "12:35 PM", type: "Arrival",   bus: "11-0967", driver: "Monir"  },
  { time: "12:35 PM", type: "Arrival",   bus: "11-0944", driver: "Nasir"  },
  { time: "01:35 PM", type: "Arrival",   bus: "11-0900", driver: "Farid"  },
];

function remarksColor(r) {
  if (r === "Student")           return { bg: "rgba(96,165,250,0.18)",  color: "#60a5fa" };
  if (r === "Teacher Transport") return { bg: "rgba(251,191,36,0.18)",  color: "#fbbf24" };
  return                                { bg: "rgba(74,222,128,0.18)",  color: "#4ade80" };
}

function SupportModal({ type, onClose }) {
  const [submitted, setSubmitted] = useState(false);

  if (type === "help") return (
    <div style={modal.overlay} onClick={onClose}>
      <div style={{ ...modal.box, maxWidth: 560 }} onClick={e => e.stopPropagation()}>
        <div style={modal.header}>
          <div><div style={modal.pill}>FAQ</div><h2 style={modal.title}>Help Center</h2></div>
          <button style={modal.close} onClick={onClose}>✕</button>
        </div>
        {[
          { q: "How do I track my bus?",           a: "Log in and open Live Tracking. You'll see all active buses updated in real time." },
          { q: "How do I check seat availability?", a: "Visit the Crowd Status page. Each bus shows current occupancy." },
          { q: "What if my bus is delayed?",        a: "You'll get an instant notification in the Announcements panel." },
          { q: "Can I use BusVoyage on mobile?",    a: "Yes — the site is fully mobile responsive." },
          { q: "How do I reset my password?",       a: "Click 'Forgot password?' on the Sign In page and follow the instructions." },
        ].map((f, i) => (
          <div key={i} style={{ border: "1px solid #e2e8f0", borderRadius: 10, padding: "12px 16px", background: "#f8fafc", marginBottom: 10 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#0f172a", marginBottom: 4 }}>❓ {f.q}</div>
            <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6 }}>{f.a}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={modal.overlay} onClick={onClose}>
      <div style={{ ...modal.box, maxWidth: 520 }} onClick={e => e.stopPropagation()}>
        <div style={modal.header}>
          <div>
            <div style={modal.pill}>{type === "contact" ? "Get in Touch" : "Report"}</div>
            <h2 style={modal.title}>{type === "contact" ? "Contact Us" : "Report an Issue"}</h2>
          </div>
          <button style={modal.close} onClick={onClose}>✕</button>
        </div>
        {submitted ? (
          <div style={{ textAlign: "center", padding: "36px 20px" }}>
            <div style={{ fontSize: 48, marginBottom: 14 }}>✅</div>
            <div style={{ fontWeight: 700, fontSize: 17, color: "#0f172a", marginBottom: 8 }}>Submitted!</div>
            <div style={{ fontSize: 13, color: "#64748b" }}>We'll respond within 24–48 hours.</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {type === "contact" && (
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 4 }}>
                {[
                  { icon: "📧", l: "Email",  v: "busvoyage@mu.ac.bd"   },
                  { icon: "🏫", l: "Office", v: "CSE Dept, MU, Sylhet" },
                  { icon: "🕐", l: "Hours",  v: "Sun–Thu 9AM–5PM"      },
                ].map((c, i) => (
                  <div key={i} style={{ flex: 1, minWidth: 120, background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: "12px", textAlign: "center" }}>
                    <div style={{ fontSize: 20, marginBottom: 5 }}>{c.icon}</div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", marginBottom: 3 }}>{c.l}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#0f172a" }}>{c.v}</div>
                  </div>
                ))}
              </div>
            )}
            {type === "report" && (
              <select style={fi}>
                <option>Bus delay / not showing up</option>
                <option>Driver behaviour</option>
                <option>App / website bug</option>
                <option>Safety concern</option>
                <option>Other</option>
              </select>
            )}
            <input placeholder="Your name"   style={fi} />
            <input placeholder="Student ID"  style={fi} />
            <textarea placeholder="Your message..." rows={4} style={{ ...fi, resize: "vertical" }} />
            <button style={sb} onClick={() => setSubmitted(true)}>Submit →</button>
          </div>
        )}
      </div>
    </div>
  );
}

const fi = { width: "100%", padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, color: "#0f172a", background: "#f8fafc", outline: "none", fontFamily: "inherit" };
const sb = { width: "100%", padding: "13px", background: "#0f172a", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" };

const modal = {
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", backdropFilter: "blur(4px)" },
  box:     { background: "#fff", borderRadius: 18, padding: "28px 28px 24px", width: "100%", maxWidth: 560, maxHeight: "88vh", overflowY: "auto", boxShadow: "0 24px 64px rgba(0,0,0,0.28)" },
  header:  { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 },
  pill:    { background: "#f1f5f9", color: "#E31E24", padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700, marginBottom: 8, display: "inline-block", textTransform: "uppercase" },
  title:   { fontSize: 22, fontWeight: 900, color: "#0f172a", marginBottom: 4 },
  close:   { background: "#f1f5f9", border: "none", width: 34, height: 34, borderRadius: "50%", cursor: "pointer", fontSize: 16, color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
};

export default function Home() {
  const navigate = useNavigate();
  const [supportModal, setSupportModal] = useState(null);
  const [mobileMenu,   setMobileMenu]   = useState(false);
  const [schedTab,     setSchedTab]     = useState(0);
  const [galSlide,     setGalSlide]     = useState(0);

  const scrollToTop      = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToTimetable = () => document.getElementById("timetable-section")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={s.page}>
      <style>{CSS}</style>

      {supportModal && <SupportModal type={supportModal} onClose={() => setSupportModal(null)} />}

      <nav style={s.nav}>
        <div style={s.brand}>
          <div style={s.brandDot} />
          <span style={s.brandName}>BusVoyage</span>
          <span style={s.brandMU} className="hide-xs">· MU</span>
        </div>
        <div style={s.navCenter} className="nav-desktop">
          {[
            { label: "Home",              action: scrollToTop },
            { label: "Routes & Schedule", action: scrollToTimetable },
            { label: "About",             action: () => navigate("/about") },
          ].map((l, i) => (
            <span key={i} style={s.navLink} className="nav-link-hover" onClick={l.action}>{l.label}</span>
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
            { label: "Home",              action: () => { scrollToTop();       setMobileMenu(false); } },
            { label: "Routes & Schedule", action: () => { scrollToTimetable(); setMobileMenu(false); } },
            { label: "About",             action: () => { navigate("/about");  setMobileMenu(false); } },
          ].map((l, i) => (
            <div key={i} style={s.mobileLink} onClick={l.action}>{l.label}</div>
          ))}
          <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
            <button style={{ ...s.navSignIn, flex: 1 }} onClick={() => { navigate("/login");    setMobileMenu(false); }}>Sign In</button>
            <button style={{ ...s.navSignUp, flex: 1 }} onClick={() => { navigate("/register"); setMobileMenu(false); }}>Sign Up →</button>
          </div>
        </div>
      )}

      {/* HERO */}
      <section style={s.hero}>
        <div style={s.heroBg} />
        <div style={s.heroFloorArea} />
        <div style={s.heroBody}>
          <div style={s.heroImageCol} className="hero-fade-1 hero-img-col">
            <div style={s.busWrapper}>
              <img src="/buss.png" alt="MU Bus" style={s.busImgStatic}
                onError={e => { e.target.style.opacity = "0.1"; }} />
            </div>
          </div>
          <div style={s.heroTextCol}>
            <div style={s.heroEyebrow} className="hero-fade-1">Campus Transport · Metropolitan University</div>
            <h1 style={s.heroH1} className="hero-fade-2">
              Embark on a<br />
              <span style={s.heroBold}>Unforgettable Journey</span><br />
              with BusVoyage
            </h1>
            <p style={s.heroP} className="hero-fade-3">
              Real-time tracking, live seat occupancy insights, and optimised schedules
              designed for the entire MU community.
            </p>
            <div className="hero-fade-4" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button style={s.btnBook}  onClick={() => navigate("/about")}>About Us</button>
              <button style={s.btnTrack} onClick={scrollToTimetable}>Routes &amp; Schedule →</button>
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

      {/* FEATURES */}
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

      {/* ROUTES & SCHEDULE */}
      <section id="timetable-section" style={s.routeSec}>
        <div style={s.routeInner}>
          <Reveal>
            <div style={s.secPillW}>Live Updates</div>
            <h2 style={{ ...s.secH2, color: "#fff", marginBottom: 12 }}>Routes &amp;<br />Schedules</h2>
            <p style={{ color: "rgba(255,255,255,0.42)", fontSize: 14, lineHeight: 1.75, maxWidth: 340, marginBottom: 28 }}>
              Real MU bus timetable — all routes serving Metropolitan University, Sylhet.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
              {["Main Routes", "Shuttle Service", "Rikabibazar Temp"].map((t, i) => (
                <button key={i} onClick={() => setSchedTab(i)} style={{
                  padding: "9px 20px", borderRadius: 8, border: "none", cursor: "pointer",
                  fontSize: 13, fontWeight: 700,
                  background: schedTab === i ? "#E31E24" : "rgba(255,255,255,0.07)",
                  color: schedTab === i ? "#fff" : "rgba(255,255,255,0.55)",
                  transition: "all 0.2s",
                }}>{t}</button>
              ))}
            </div>
          </Reveal>

          {schedTab === 0 && (
            <Reveal delay={0.15}>
              <div style={{ overflowX: "auto", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)" }}>
                <table style={s.darkTable}>
                  <thead>
                    <tr>
                      {["Route", "Arrival", "Departure", "Bus No.", "Driver", "For"].map(h => (
                        <th key={h} style={s.darkTh}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {MAIN_ROUTES.map((r, i) => {
                      const rc = remarksColor(r.for);
                      return (
                        <tr key={i} style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.04)" : "transparent" }}>
                          <td style={s.darkTd}>{r.route}</td>
                          <td style={{ ...s.darkTd, color: r.arrival !== "—" ? "#4ade80" : "#4a5568", fontWeight: r.arrival !== "—" ? 700 : 400 }}>{r.arrival}</td>
                          <td style={{ ...s.darkTd, color: r.departure !== "—" ? "#f87171" : "#4a5568", fontWeight: r.departure !== "—" ? 700 : 400 }}>{r.departure}</td>
                          <td style={{ ...s.darkTd, fontWeight: 700, color: "#fff" }}>{r.bus}</td>
                          <td style={s.darkTd}>{r.driver}</td>
                          <td style={s.darkTd}>
                            <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 12, background: rc.bg, color: rc.color }}>{r.for}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Reveal>
          )}

          {schedTab === 1 && (
            <Reveal delay={0.15}>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 16 }}>
                Campus–Tilagor–Campus shuttle runs throughout the day.
              </p>
              <div style={{ overflowX: "auto", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)" }}>
                <table style={s.darkTable}>
                  <thead>
                    <tr>
                      {["Route", "Departure from Campus", "Arrival at Campus", "Bus No.", "Driver"].map(h => (
                        <th key={h} style={s.darkTh}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {SHUTTLE.map((r, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.04)" : "transparent" }}>
                        <td style={s.darkTd}>Campus – Tilagor – Campus</td>
                        <td style={{ ...s.darkTd, color: r.dep !== "—" ? "#f87171" : "#4a5568", fontWeight: r.dep !== "—" ? 700 : 400 }}>{r.dep}</td>
                        <td style={{ ...s.darkTd, color: r.arr !== "—" ? "#4ade80" : "#4a5568", fontWeight: r.arr !== "—" ? 700 : 400 }}>{r.arr}</td>
                        <td style={{ ...s.darkTd, fontWeight: 700, color: "#fff" }}>{r.bus}</td>
                        <td style={s.darkTd}>{r.driver}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          )}

          {schedTab === 2 && (
            <Reveal delay={0.15}>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 16 }}>
                Campus – Rikabibazar – Campus (Temporary schedule)
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {RIKABI_TEMP.map((r, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "14px 18px", minWidth: 200 }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: r.type === "Departure" ? "#f87171" : "#4ade80", marginBottom: 5 }}>
                      {r.type === "Departure" ? "⬆" : "⬇"} {r.time}
                    </div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{r.type} · Bus {r.bus} · {r.driver}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          <Reveal delay={0.2}>
            <div style={{ marginTop: 20, padding: "10px 14px", background: "rgba(227,30,36,0.08)", borderRadius: 8, fontSize: 12, color: "rgba(255,255,255,0.5)", border: "1px solid rgba(227,30,36,0.2)" }}>
              ⚠️ Schedules may vary due to traffic. Check Live Tracking for real-time updates.
            </div>
          </Reveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
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

      {/* GALLERY */}
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
              <Reveal key={galSlide + i} delay={i * 0.07}>
                <div style={{ ...s.galTile, backgroundImage: `url('${src}')` }} className="gal-tile" />
              </Reveal>
            ))}
          </div>
          <button onClick={() => setGalSlide(Math.max(0, galSlide - 3))} disabled={galSlide === 0}
            style={{ ...s.galArrow, left: -56, opacity: galSlide === 0 ? 0.35 : 1 }}>←</button>
          <button onClick={() => setGalSlide(Math.min(GALLERY.length - 3, galSlide + 3))} disabled={galSlide >= GALLERY.length - 3}
            style={{ ...s.galArrow, right: -56, opacity: galSlide >= GALLERY.length - 3 ? 0.35 : 1 }}>→</button>
          <div style={{ textAlign: "center", marginTop: 16, color: "rgba(255,255,255,0.45)", fontSize: 13 }}>
            {galSlide + 1}–{Math.min(galSlide + 3, GALLERY.length)} of {GALLERY.length}
          </div>
        </div>
      </section>

      {/* IMPACT */}
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

      {/* CTA */}
      <section style={s.ctaSec}>
        <div style={s.ctaGlow} />
        <Reveal>
          <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
            <div style={s.ctaPill}>Get Onboard</div>
            <h2 style={s.ctaH2}>Ready to ride smarter?</h2>
            <p style={s.ctaP}>Join 1,200+ Metropolitan University students who never miss their bus.</p>
            <div style={s.ctaBtns}>
              <button style={s.ctaPrimary}   onClick={() => navigate("/register")}>Create Free Account →</button>
              <button style={s.ctaSecondary} onClick={() => navigate("/login")}>Sign In</button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
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
                { label: "Home",              action: scrollToTop },
                { label: "Routes & Schedule", action: scrollToTimetable },
                { label: "About Us",          action: () => navigate("/about") },
              ].map(l => <div key={l.label} style={s.footerLink} onClick={l.action}>{l.label}</div>)}
            </div>
            <div>
              <div style={s.footerHead}>Account</div>
              {[
                { label: "Sign In", action: () => navigate("/login")    },
                { label: "Sign Up", action: () => navigate("/register") },
              ].map(l => <div key={l.label} style={s.footerLink} onClick={l.action}>{l.label}</div>)}
            </div>
            <div>
              <div style={s.footerHead}>Support</div>
              {[
                { label: "Help Center",  action: () => setSupportModal("help")    },
                { label: "Contact",      action: () => setSupportModal("contact") },
                { label: "Report Issue", action: () => setSupportModal("report")  },
              ].map(l => <div key={l.label} style={s.footerLink} onClick={l.action}>{l.label}</div>)}
            </div>
          </div>
        </div>
        <div style={s.footerRule} />
        <div style={s.footerBottom}>
          <span>© 2026 BusVoyage · Metropolitan University</span>
        </div>
      </footer>
    </div>
  );
}

const CSS = `
  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior:smooth; }
  button { font-family:inherit; cursor:pointer; }

  @keyframes heroFade { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
  .hero-fade-1 { animation:heroFade 0.8s ease 0.2s both; }
  .hero-fade-2 { animation:heroFade 0.8s ease 0.4s both; }
  .hero-fade-3 { animation:heroFade 0.8s ease 0.6s both; }
  .hero-fade-4 { animation:heroFade 0.8s ease 0.8s both; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }

  .nav-link-hover:hover { color:#fff !important; }
  .lift:hover     { transform:translateY(-6px) !important; box-shadow:0 18px 44px rgba(0,0,0,0.10) !important; transition:0.3s; }
  .liftDark:hover { transform:translateY(-3px) !important; background:rgba(255,255,255,0.09) !important; transition:0.3s; }
  .gal-tile { transition:transform 0.25s ease; cursor:pointer; }
  .gal-tile:hover { transform:scale(1.03); }

  .nav-desktop { display:flex; }
  .nav-mobile  { display:none !important; }
  .hide-xs     { display:inline; }

  @media (max-width:900px) {
    .nav-desktop  { display:none !important; }
    .nav-mobile   { display:flex !important; }
    .hero-img-col { display:none !important; }
    .feat-grid    { grid-template-columns:repeat(2,1fr) !important; }
    .how-row      { flex-wrap:wrap !important; }
    .gal-grid     { grid-template-columns:repeat(2,1fr) !important; }
    .impact-sec   { flex-wrap:wrap !important; gap:24px !important; padding:40px 24px !important; }
    .footer-top   { flex-direction:column !important; gap:32px !important; }
    .footer-cols  { flex-wrap:wrap !important; gap:24px !important; }
  }
  @media (max-width:600px) {
    .feat-grid   { grid-template-columns:1fr !important; }
    .gal-grid    { grid-template-columns:1fr !important; }
    .stats-strip { flex-wrap:wrap !important; gap:10px !important; padding:16px 20px !important; }
    .strip-div   { display:none !important; }
    .how-line    { display:none !important; }
    .hide-xs     { display:none !important; }
  }
`;

const s = {
  page: { fontFamily: "'Inter','Segoe UI',sans-serif", background: "#f8f9fa" },

  /* NAV — always solid, no scroll toggle */
  nav: {
    position: "fixed", top: 0, left: 0, right: 0,
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "0 60px", height: 62, zIndex: 1000,
    background: "#0f172a",
    boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
  },
  brand:       { display: "flex", alignItems: "center", gap: 9, color: "#fff" },
  brandDot:    { width: 9, height: 9, borderRadius: "50%", background: "#E31E24", animation: "pulse 2.5s infinite", flexShrink: 0 },
  brandName:   { fontWeight: 900, fontSize: 19, color: "#fff" },
  brandMU:     { opacity: 0.45, fontSize: 14, color: "#fff" },
  navCenter:   { display: "flex", gap: 28, fontSize: 14, fontWeight: 500 },
  navLink:     { color: "rgba(255,255,255,0.7)", cursor: "pointer", transition: "color 0.2s" },
  navRight:    { display: "flex", gap: 10 },
  navSignIn:   { padding: "7px 20px", background: "transparent", border: "1px solid rgba(255,255,255,0.28)", color: "#fff", borderRadius: 8, fontSize: 13, fontWeight: 600 },
  navSignUp:   { padding: "8px 22px", background: "#E31E24", border: "none", color: "#fff", borderRadius: 8, fontWeight: 700, fontSize: 13, boxShadow: "0 3px 12px rgba(227,30,36,0.4)" },
  hamburger:   { background: "transparent", border: "none", cursor: "pointer", padding: 8, display: "flex", flexDirection: "column", gap: 5 },
  ham:         { display: "block", width: 22, height: 2, background: "#fff", borderRadius: 2 },
  mobileDrawer:{ position: "fixed", top: 62, left: 0, right: 0, background: "#0f172a", zIndex: 999, padding: "18px 24px 22px", borderBottom: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 8px 24px rgba(0,0,0,0.3)" },
  mobileLink:  { padding: "12px 0", fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.85)", cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.07)" },

  hero:          { position: "relative", minHeight: 660, background: "#2d3436", display: "flex", flexDirection: "column", justifyContent: "flex-start", overflow: "hidden", paddingTop: 90, paddingBottom: 140 },
  heroBg:        { position: "absolute", inset: 0, backgroundImage: "url('/mu.jpg')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.15 },
  heroFloorArea: { position: "absolute", bottom: 0, width: "100%", height: "36%", background: "#f39c12", opacity: 0.92 },
  heroBody:      { position: "relative", zIndex: 10, display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "0 60px", gap: 40 },
  heroImageCol:  { flex: 1.2, display: "flex", justifyContent: "center" },
  busWrapper:    { width: "100%", maxWidth: 700, position: "relative", bottom: "-54px" },
  busImgStatic:  { width: "100%", height: "auto", filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.4))" },
  heroTextCol:   { flex: 1, color: "#fff", paddingTop: 80 },
  heroEyebrow:   { fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", color: "rgba(255,229,102,0.85)", marginBottom: 16 },
  heroH1:        { fontSize: "clamp(26px,4vw,46px)", fontWeight: 900, lineHeight: 1.2, marginBottom: 18, color: "#fff" },
  heroBold:      { color: "#FFE566", textDecoration: "underline", textDecorationColor: "#E31E24" },
  heroP:         { fontSize: "clamp(13px,1.5vw,15px)", lineHeight: 1.7, color: "rgba(255,255,255,0.82)", marginBottom: 26, maxWidth: 460 },
  btnBook:       { background: "#1e272e", color: "#fff", padding: "13px 30px", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 14 },
  btnTrack:      { background: "rgba(255,255,255,0.1)", color: "#fff", padding: "13px 26px", border: "1.5px solid rgba(255,255,255,0.3)", borderRadius: 8, fontWeight: 600, fontSize: 14 },

  statsStrip: { position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(15,23,42,0.92)", backdropFilter: "blur(12px)", display: "flex", padding: "22px 40px", zIndex: 20, borderTop: "1px solid rgba(255,255,255,0.08)" },
  stripItem:  { flex: 1, textAlign: "left" },
  stripLabel: { fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.38)", marginBottom: 6, letterSpacing: 1.5, textTransform: "uppercase" },
  stripVal:   { fontSize: "clamp(16px,2vw,20px)", fontWeight: 900, color: "#fff" },
  stripDiv:   { width: 1, background: "rgba(255,255,255,0.09)", margin: "0 16px" },

  featSec:  { padding: "80px clamp(24px,6vw,70px)", background: "#fff" },
  secPill:  { background: "#f1f2f6", color: "#E31E24", padding: "5px 14px", borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 16, display: "inline-block", textTransform: "uppercase" },
  secPillW: { background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.65)", padding: "5px 14px", borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 16, display: "inline-block", textTransform: "uppercase" },
  secH2:    { fontSize: "clamp(22px,3vw,36px)", fontWeight: 900, color: "#1e272e", lineHeight: 1.2, marginBottom: 44 },
  featGrid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 },
  featCard: { padding: "26px 20px", background: "#fff", borderRadius: 16, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", border: "1px solid #f1f2f6", position: "relative", overflow: "hidden" },
  featIcon: { width: 50, height: 50, borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 16 },
  featTitle:{ fontWeight: 800, fontSize: 15, color: "#1e272e", marginBottom: 8 },
  featDesc: { fontSize: 13, color: "#636e72", lineHeight: 1.65 },
  featBar:  { height: 3, width: 34, marginTop: 14, borderRadius: 2 },

  routeSec:   { padding: "80px clamp(24px,6vw,60px)", background: "#0a0f1e" },
  routeInner: { maxWidth: 1200, margin: "0 auto" },
  darkTable:  { width: "100%", borderCollapse: "collapse", fontSize: 13, background: "transparent" },
  darkTh:     { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.65)", padding: "11px 14px", textAlign: "left", fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", whiteSpace: "nowrap", borderBottom: "1px solid rgba(255,255,255,0.1)" },
  darkTd:     { padding: "11px 14px", color: "rgba(255,255,255,0.65)", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: 13 },

  howSec:  { padding: "80px clamp(24px,6vw,80px)", background: "#f1f5f9", textAlign: "center" },
  howRow:  { display: "flex", justifyContent: "center", gap: 0, maxWidth: 900, margin: "0 auto", flexWrap: "wrap" },
  howStep: { flex: 1, minWidth: 160, position: "relative", padding: "0 16px" },
  howNum:  { width: 44, height: 44, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 18, margin: "0 auto 18px" },
  howLine: { position: "absolute", top: 22, left: "58%", right: "-42%", height: 2, background: "#CBD5E1" },
  howIcon: { fontSize: 32, marginBottom: 12 },
  howTitle:{ fontSize: 14, fontWeight: 800, color: "#1e272e", marginBottom: 7 },
  howDesc: { fontSize: 12, color: "#64748b", lineHeight: 1.6, maxWidth: 168, margin: "0 auto" },

  galSec:   { padding: "80px clamp(24px,6vw,80px)", background: "#000e22" },
  galGrid:  { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, maxWidth: 1200, margin: "0 auto" },
  galTile:  { height: 240, borderRadius: 16, backgroundSize: "cover", backgroundPosition: "center", backgroundColor: "#112244" },
  galArrow: { position: "absolute", top: "50%", transform: "translateY(-50%)", background: "#E31E24", color: "#fff", border: "none", width: 42, height: 42, borderRadius: "50%", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" },

  impactSec:  { display: "flex", justifyContent: "space-around", flexWrap: "wrap", padding: "52px 80px", background: "#0f172a", borderTop: "3px solid #f39c12" },
  impactItem: { textAlign: "center", padding: "10px 16px" },
  impactNum:  { fontSize: 40, fontWeight: 900, color: "#f39c12", lineHeight: 1 },
  impactLabel:{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: 1.5, marginTop: 6 },

  ctaSec:      { padding: "80px clamp(24px,6vw,80px)", background: "#0f172a", textAlign: "center", position: "relative", overflow: "hidden" },
  ctaGlow:     { position: "absolute", top: -120, left: "50%", transform: "translateX(-50%)", width: 600, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(227,30,36,0.13) 0%, transparent 70%)", pointerEvents: "none" },
  ctaPill:     { display: "inline-block", background: "rgba(227,30,36,0.15)", color: "#E31E24", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", padding: "5px 14px", borderRadius: 20, marginBottom: 20 },
  ctaH2:       { fontSize: "clamp(24px,4vw,46px)", fontWeight: 900, color: "#fff", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 14 },
  ctaP:        { fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 },
  ctaBtns:     { display: "flex", gap: 14, justifyContent: "center", marginTop: 32, flexWrap: "wrap" },
  ctaPrimary:  { padding: "14px 32px", background: "#E31E24", color: "#fff", border: "none", borderRadius: 10, fontWeight: 800, cursor: "pointer", fontSize: 15, boxShadow: "0 6px 24px rgba(227,30,36,0.4)" },
  ctaSecondary:{ padding: "14px 26px", background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.22)", borderRadius: 10, fontWeight: 600, cursor: "pointer", fontSize: 15 },

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
};
