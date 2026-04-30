import { useState } from "react";
import { useNavigate } from "react-router-dom";


const T = {
  en: {
    brandMU: "· MU",
    navHome: "Home",
    navAbout: "About",
    navRoutes: "Routes & Schedule",
    signIn: "Sign In",
    signUp: "Sign Up →",
    heroBadge: "🏫 Metropolitan University · Sylhet · CSE Department",
    heroH1a: "About ",
    heroH1b: "BusVoyage",
    heroP: "A student-built web platform solving real commuting problems at Metropolitan University — making campus transport predictable, safe, and stress-free for everyone.",
    heroStats: [["8+","Buses Tracked"],["5","Routes"],["3","User Roles"],["1 Month","Built In"]],
    probPill: "The Problem",
    probH2: "Why BusVoyage was built",
    probP: "Students at MU faced daily frustration — no information, no system, just uncertainty and wasted time.",
    problems: [
      { icon: "⏳", title: "No ETA, no info",       desc: "Students stood at stops with zero idea if the bus had passed or was minutes away." },
      { icon: "📱", title: "WhatsApp chaos",         desc: "Transport updates buried in groups full of unrelated messages." },
      { icon: "📞", title: "Unsafe driver calls",    desc: "Students called drivers mid-route to confirm location — dangerous and unreliable." },
      { icon: "☀️", title: "Hot waits, no shelter", desc: "During Sylhet summers, students waited with no reliable arrival estimate." },
    ],
    featPill: "What We Built",
    featH2: "Core features of BusVoyage",
    features: [
      { icon: "📡", title: "Live Bus Tracking",    desc: "Students see real-time bus status updated by drivers — no more guessing.",         color: "#60a5fa", bg: "rgba(96,165,250,0.12)"  },
      { icon: "💺", title: "Crowd Status",          desc: "Know seat availability before you walk to the stop.",                              color: "#4ade80", bg: "rgba(74,222,128,0.12)"  },
      { icon: "📢", title: "Announcements",         desc: "Transport admins post urgent notices directly — no more WhatsApp chaos.",          color: "#f87171", bg: "rgba(248,113,113,0.12)" },
      { icon: "🧾", title: "Complaints & Feedback", desc: "Submit complaints and track whether they have been resolved.",                     color: "#fbbf24", bg: "rgba(251,191,36,0.12)"  },
      { icon: "🔍", title: "Lost & Found",          desc: "Report and track items lost on buses through a dedicated module.",                 color: "#c084fc", bg: "rgba(192,132,252,0.12)" },
      { icon: "🛡️", title: "Role-Based Access",     desc: "Three separate portals for Students, Drivers, and Admins — all verified.",        color: "#38bdf8", bg: "rgba(56,189,248,0.12)"  },
    ],
    techPill: "Technology",
    techH2: "Built with the MERN stack",
    techP: "One language from frontend to backend — JavaScript throughout, so the whole team could ship faster.",
    techRows: [
      { label: "Frontend",               color: "#38bdf8", items: [{ name: "React v18",  role: "UI Library",  color: "#38bdf8" },{ name: "Vite v5",    role: "Build Tool",  color: "#a78bfa" },{ name: "Axios v1",   role: "HTTP Client", color: "#a78bfa" },{ name: "VS Code",    role: "IDE",         color: "#34d399" }] },
      { label: "Backend & Database",      color: "#4ade80", items: [{ name: "Node.js v20",      role: "Runtime",        color: "#4ade80" },{ name: "Express.js v4",    role: "Framework",      color: "#86efac" },{ name: "MongoDB Atlas v6", role: "Cloud Database", color: "#4ade80" },{ name: "Mongoose ODM v8",  role: "Data Modeling",  color: "#22c55e" }] },
      { label: "Security & Tools",        color: "#f87171", items: [{ name: "JWT v9",       role: "Authentication",   color: "#f87171" },{ name: "Bcrypt.js v2", role: "Password Hashing", color: "#fbbf24" },{ name: "Dotenv v16",   role: "Env Config",       color: "#94a3b8" },{ name: "Vercel",       role: "Frontend Deploy",  color: "#c084fc" }] },
      { label: "Version Control & More",  color: "#4ade80", items: [{ name: "Git / GitHub", role: "Version Control", color: "#4ade80" },{ name: "Render",       role: "Backend Deploy",  color: "#fb923c" },{ name: "Postman",      role: "API Testing",     color: "#60a5fa" }] },
    ],
    teamPill: "The Team",
    teamH2: "Architecting the Future : The Minds Behind the Innovation",
    teamP: "BusVoyage is a CSE project by Metropolitan University students — built in one month, from idea to deployment.",
    team: [
      { name: "Falguni Datta Arna",    role: "Full Stack Developer",  sub: "Frontend · Backend · Database · Security", avatar: "FA", color: "#60a5fa", bg: "rgba(96,165,250,0.14)",  border: "rgba(96,165,250,0.35)",  desc: "Built both the frontend UI and backend APIs, along with database design and security implementation — driving the full product from idea to deployment.", img: "/falguni.jpg" },
      { name: "Shahrin Nahar Suhana",  role: "Frontend Developer",    sub: "UI Design · React · Page Layouts",          avatar: "SS", color: "#f472b6", bg: "rgba(244,114,182,0.14)", border: "rgba(244,114,182,0.35)", desc: "Designed and built the user interface including the Home page, all page layouts, and the overall look and feel of BusVoyage.", img: "/suhana.jpg" },
    ],
    faqPill: "Help Center",
    faqH2: "Common questions answered.",
    faqs: [
      { q: "Who can use BusVoyage?",               a: "Any student, driver, or admin at MU Sylhet. Each role gets a dedicated verified portal." },
      { q: "Is it free to use?",                   a: "Yes — completely free for all MU students. Sign up with your student ID." },
      { q: "Does it track buses in real time?",    a: "Yes. Drivers manually update their status each trip, giving live location and crowd info." },
      { q: "What if I lose something on the bus?", a: "Use the Lost & Found module to report the item. Admins review and contact you if recovered." },
      { q: "Can I submit a complaint?",            a: "Yes. The complaint module lets you describe the issue and track resolution." },
    ],
    contact: [
      { icon: "📧", title: "Email Support",    sub: "transport@metrouni.edu.bd"            },
      { icon: "📍", title: "Transport Office", sub: "Admin Building, 2nd Floor, MU Campus"  },
      { icon: "🕐", title: "Office Hours",     sub: "Sun–Thu, 9:00 AM – 5:00 PM"           },
    ],
    ctaPill: "Get Onboard",
    ctaH2: "Ready to ride smarter?",
    ctaP: "Join hundreds of MU students who never miss their bus again.",
    ctaPrimary: "Create Free Account →",
    ctaOutline: "Back to Home",
    footerSub: "Campus Bus Tracking System\nMetropolitan University, Sylhet",
    footerTag: "CSE Department · 2026",
    footerCols: [
      { head: "Navigate", links: [["Home","/"],["About","/about"]] },
      { head: "Account",  links: [["Sign In","/login"],["Sign Up","/register"]] },
      { head: "Support",  links: [["Routes & Schedule","routes"],["Contact","contact"]] },
    ],
    footerBottom: "© 2026 BusVoyage · Metropolitan University · CSE Department",
    footerMade: "Made with ❤️ in Sylhet",
  },
  bn: {
    brandMU: "· এমইউ",
    navHome: "হোম",
    navAbout: "আমাদের সম্পর্কে",
    navRoutes: "রুট ও সময়সূচি",
    signIn: "সাইন ইন",
    signUp: "সাইন আপ →",
    heroBadge: "🏫 মেট্রোপলিটন বিশ্ববিদ্যালয় · সিলেট · সিএসই বিভাগ",
    heroH1a: "পরিচিতি ",
    heroH1b: "BusVoyage",
    heroP: "মেট্রোপলিটন বিশ্ববিদ্যালয়ের শিক্ষার্থীদের তৈরি একটি ওয়েব প্ল্যাটফর্ম যা ক্যাম্পাস পরিবহনকে নির্ভরযোগ্য, নিরাপদ ও ঝামেলামুক্ত করে।",
    heroStats: [["৮+","ট্র্যাক করা বাস"],["৫","রুট"],["৩","ব্যবহারকারী ভূমিকা"],["১ মাস","নির্মাণে"]],
    probPill: "সমস্যা",
    probH2: "কেন BusVoyage তৈরি হয়েছে",
    probP: "এমইউ-এর শিক্ষার্থীরা প্রতিদিন হতাশার মুখোমুখি হতো — কোনো তথ্য নেই, কোনো সিস্টেম নেই, শুধু অনিশ্চয়তা এবং  সময় অপচয়।",
    problems: [
      { icon: "⏳", title: "কোনো তথ্য নেই",         desc: "শিক্ষার্থীরা স্টপে দাঁড়িয়ে থাকতেন বাস কখন আসবে তা না জেনেই।" },
      { icon: "📱", title: "হোয়াটসঅ্যাপ বিশৃঙ্খলা",      desc: "পরিবহন আপডেট অসম্পর্কিত বার্তার ভিড়ে হারিয়ে যেত।" },
      { icon: "📞", title: "অনিরাপদ কল",              desc: "শিক্ষার্থীরা রুটের মাঝে চালককে ফোন করতেন — বিপজ্জনক ও অবিশ্বস্ত।" },
      { icon: "☀️", title: "গরমে দীর্ঘ অপেক্ষা",    desc: "সিলেটের গ্রীষ্মে কোনো নির্ভরযোগ্য আগমন সময় ছাড়াই অপেক্ষা করতে হত।" },
    ],
    featPill: "আমরা কী তৈরি করেছি",
    featH2: "BusVoyage-এর মূল বৈশিষ্ট্য",
    features: [
      { icon: "📡", title: "লাইভ বাস ট্র্যাকিং",    desc: "চালকের আপডেটে রিয়েল-টাইমে বাসের অবস্থান দেখুন।",             color: "#60a5fa", bg: "rgba(96,165,250,0.12)"  },
      { icon: "💺", title: "ভিড়ের অবস্থা",           desc: "স্টপে যাওয়ার আগেই আসন পাওয়া যাচ্ছে কিনা জানুন।",           color: "#4ade80", bg: "rgba(74,222,128,0.12)"  },
      { icon: "📢", title: "ঘোষণা",                   desc: "পরিবহন অ্যাডমিন সরাসরি জরুরি বিজ্ঞপ্তি পোস্ট করেন।",        color: "#f87171", bg: "rgba(248,113,113,0.12)" },
      { icon: "🧾", title: "অভিযোগ ও প্রতিক্রিয়া",  desc: "অভিযোগ জমা দিন এবং সমাধান ট্র্যাক করুন।",                   color: "#fbbf24", bg: "rgba(251,191,36,0.12)"  },
      { icon: "🔍", title: "হারানো ও পাওয়া",          desc: "বাসে হারানো জিনিস রিপোর্ট ও ট্র্যাক করুন।",                  color: "#c084fc", bg: "rgba(192,132,252,0.12)" },
      { icon: "🛡️", title: "ভূমিকা-ভিত্তিক অ্যাক্সেস","desc": "শিক্ষার্থী, চালক ও অ্যাডমিনের জন্য আলাদা যাচাইকৃত পোর্টাল।", color: "#38bdf8", bg: "rgba(56,189,248,0.12)"  },
    ],
    techPill: "প্রযুক্তি",
    techH2: "MERN স্ট্যাক দিয়ে তৈরি",
    techP: "ফ্রন্টেন্ড থেকে ব্যাকএন্ড — সর্বত্র JavaScript, যাতে পুরো টিম দ্রুত কাজ করতে পারে।",
    techRows: [
      { label: "ফ্রন্টেন্ড",              color: "#38bdf8", items: [{ name: "React v18",  role: "UI লাইব্রেরি",  color: "#38bdf8" },{ name: "Vite v5",    role: "বিল্ড টুল",   color: "#a78bfa" },{ name: "Axios v1",   role: "HTTP ক্লায়েন্ট", color: "#a78bfa" },{ name: "VS Code",    role: "আইডিই",       color: "#34d399" }] },
      { label: "ব্যাকএন্ড ও ডেটাবেস",    color: "#4ade80", items: [{ name: "Node.js v20",      role: "রানটাইম",        color: "#4ade80" },{ name: "Express.js v4",    role: "ফ্রেমওয়ার্ক",    color: "#86efac" },{ name: "MongoDB Atlas v6", role: "ক্লাউড ডেটাবেস", color: "#4ade80" },{ name: "Mongoose ODM v8",  role: "ডেটা মডেলিং",   color: "#22c55e" }] },
      { label: "সিকিউরিটি ও টুলস",       color: "#f87171", items: [{ name: "JWT v9",       role: "অথেন্টিকেশন",    color: "#f87171" },{ name: "Bcrypt.js v2", role: "পাসওয়ার্ড হ্যাশিং", color: "#fbbf24" },{ name: "Dotenv v16",   role: "এনভ কনফিগ",    color: "#94a3b8" },{ name: "Vercel",       role: "ফ্রন্টেন্ড ডেপ্লয়", color: "#c084fc" }] },
      { label: "ভার্সন কন্ট্রোল ও আরো",  color: "#4ade80", items: [{ name: "Git / GitHub", role: "ভার্সন কন্ট্রোল", color: "#4ade80" },{ name: "Render",       role: "ব্যাকএন্ড ডেপ্লয়", color: "#fb923c" },{ name: "Postman",      role: "API টেস্টিং",    color: "#60a5fa" }] },
    ],
    teamPill: "টিম",
    teamH2: "ভবিষ্যতের রূপকার : উদ্ভাবনের পেছনের মেধাবীরা",
    teamP: "BusVoyage মেট্রোপলিটন বিশ্ববিদ্যালয়ের শিক্ষার্থীদের একটি CSE প্রজেক্ট — ধারণা থেকে ডেপ্লয়মেন্ট পর্যন্ত এক মাসে তৈরি।",
    team: [
      { name: "ফাল্গুনী দত্ত অর্ণা",    role: "ফুল স্ট্যাক ডেভেলপার",  sub: "ফ্রন্টেন্ড · ব্যাকএন্ড · ডেটাবেস · সিকিউরিটি", avatar: "FA", color: "#60a5fa", bg: "rgba(96,165,250,0.14)",  border: "rgba(96,165,250,0.35)",  desc: "ফ্রন্টেন্ড UI এবং ব্যাকএন্ড API উভয়ই তৈরি করেছেন, ডেটাবেস ডিজাইন ও সিকিউরিটি বাস্তবায়নসহ — সম্পূর্ণ পণ্যটি ধারণা থেকে ডেপ্লয়মেন্ট পর্যন্ত পরিচালনা করেছেন।", img: "/falguni.jpg" },
      { name: "শাহরিন নাহার সুহানা",  role: "ফ্রন্টেন্ড ডেভেলপার",   sub: "UI ডিজাইন · React · পেজ লেআউট",                    avatar: "SS", color: "#f472b6", bg: "rgba(244,114,182,0.14)", border: "rgba(244,114,182,0.35)", desc: "হোম পেজসহ সকল পেজ লেআউট এবং BusVoyage-এর সামগ্রিক রূপ ও অনুভূতি ডিজাইন ও তৈরি করেছেন।", img: "/suhana.jpg" },
    ],
    faqPill: "সহায়তা কেন্দ্র",
    faqH2: "সাধারণ প্রশ্নের উত্তর।",
    faqs: [
      { q: "BusVoyage কে ব্যবহার করতে পারবেন?",    a: "MU সিলেটের যেকোনো শিক্ষার্থী, চালক বা অ্যাডমিন। প্রতিটি ভূমিকার জন্য আলাদা যাচাইকৃত পোর্টাল আছে।" },
      { q: "এটি কি বিনামূল্যে?",                    a: "হ্যাঁ — সকল MU শিক্ষার্থীর জন্য সম্পূর্ণ বিনামূল্যে। স্টুডেন্ট আইডি দিয়ে সাইন আপ করুন।" },
      { q: "এটি কি রিয়েল-টাইমে বাস ট্র্যাক করে?", a: "হ্যাঁ। চালকরা প্রতিটি ট্রিপে ম্যানুয়ালি স্ট্যাটাস আপডেট করেন।" },
      { q: "বাসে কিছু হারিয়ে গেলে কী করব?",        a: "Lost & Found মডিউল ব্যবহার করে রিপোর্ট করুন। অ্যাডমিন পর্যালোচনা করে যোগাযোগ করবেন।" },
      { q: "অভিযোগ জমা দিতে পারব?",                a: "হ্যাঁ। অভিযোগ মডিউলে সমস্যা বর্ণনা করুন এবং সমাধান ট্র্যাক করুন।" },
    ],
    contact: [
      { icon: "📧", title: "ইমেইল সহায়তা",  sub: "transport@metrouni.edu.bd"                   },
      { icon: "📍", title: "পরিবহন অফিস",    sub: "অ্যাডমিন ভবন, ২য় তলা, MU ক্যাম্পাস"      },
      { icon: "🕐", title: "অফিস সময়",       sub: "রবি–বৃহস্পতি, সকাল ৯টা – বিকাল ৫টা"       },
    ],
    ctaPill: "যোগ দিন",
    ctaH2: "স্মার্টভাবে যাত্রা করতে প্রস্তুত?",
    ctaP: "শত শত MU শিক্ষার্থীর সাথে যোগ দিন যারা কখনো বাস মিস করেন না।",
    ctaPrimary: "বিনামূল্যে অ্যাকাউন্ট তৈরি করুন →",
    ctaOutline: "হোমে ফিরুন",
    footerSub: "ক্যাম্পাস বাস ট্র্যাকিং সিস্টেম\nমেট্রোপলিটন বিশ্ববিদ্যালয়, সিলেট",
    footerTag: "সিএসই বিভাগ · ২০২৬",
    footerCols: [
      { head: "নেভিগেট",   links: [["হোম","/"],["আমাদের সম্পর্কে","/about"]] },
      { head: "অ্যাকাউন্ট", links: [["সাইন ইন","/login"],["সাইন আপ","/register"]] },
      { head: "সহায়তা",    links: [["রুট ও সময়সূচি","routes"],["যোগাযোগ","contact"]] },
    ],
    footerBottom: "© ২০২৬ BusVoyage · মেট্রোপলিটন বিশ্ববিদ্যালয় · সিএসই বিভাগ",
    footerMade: "❤️ সিলেটে তৈরি",
  },
};

// ─── FAQ ITEM ────────────────────────────────────────────────────────────────
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(o => !o)} style={{ ...faqSt.item, ...(open ? faqSt.open : {}) }}>
      <div style={faqSt.q}>
        <span>{q}</span>
        <span style={{ ...faqSt.arrow, transform: open ? "rotate(180deg)" : "none" }}>▾</span>
      </div>
      {open && <div style={faqSt.a}>{a}</div>}
    </div>
  );
}
const faqSt = {
  item:  { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "17px 20px", cursor: "pointer", marginBottom: 10 },
  open:  { background: "rgba(0,43,91,0.28)", borderColor: "rgba(96,165,250,0.3)" },
  q:     { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 14, fontWeight: 700, color: "#fff" },
  arrow: { fontSize: 18, color: "#60a5fa", transition: "transform 0.2s", flexShrink: 0 },
  a:     { fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.06)" },
};

// ─── SECTION HEADER ──────────────────────────────────────────────────────────
function SectionHeader({ dark, pill, h2, p }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{ display: "inline-block", background: dark ? "rgba(255,255,255,0.1)" : "#e8f0ff", color: dark ? "rgba(255,255,255,0.7)" : "#002B5B", fontSize: 11, fontWeight: 700, padding: "6px 14px", borderRadius: 20, marginBottom: 14, textTransform: "uppercase", letterSpacing: 1 }}>{pill}</div>
      <h2 style={{ fontSize: "clamp(20px,3.5vw,38px)", fontWeight: 900, color: dark ? "#fff" : "#1A1A2E", lineHeight: 1.18, marginBottom: p ? 12 : 0, letterSpacing: "-0.02em" }}>{h2}</h2>
      {p && <p style={{ fontSize: 14, color: dark ? "rgba(255,255,255,0.45)" : "#64748b", lineHeight: 1.75, maxWidth: 560 }}>{p}</p>}
    </div>
  );
}

// ─── LANGUAGE SWITCHER ───────────────────────────────────────────────────────
function LangSwitcher({ lang, setLang }) {
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 1500, background: "#0f172a", border: "1.5px solid rgba(255,255,255,0.15)", borderRadius: 40, padding: "8px 14px", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>🌐</span>
      {["en", "bn"].map(l => (
        <button key={l} onClick={() => setLang(l)} style={{ padding: "5px 14px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, background: lang === l ? "#E31E24" : "transparent", color: lang === l ? "#fff" : "rgba(255,255,255,0.5)", transition: "all 0.2s" }}>
          {l === "en" ? "EN" : "বাং"}
        </button>
      ))}
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function AboutUs() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("en");
  const [mobileMenu, setMobileMenu] = useState(false);
  const t = T[lang];

  const goToTimetable = () => {
    navigate("/");
    setTimeout(() => document.getElementById("timetable-section")?.scrollIntoView({ behavior: "smooth" }), 300);
  };

  return (
    <div style={s.page}>
      <style>{CSS}</style>
      <LangSwitcher lang={lang} setLang={setLang} />

      {/* ── NAV ── */}
      <nav style={s.nav}>
        <div style={s.brand} onClick={() => navigate("/")}>
          <div style={s.brandDot} />
          <span style={s.brandName}>BusVoyage</span>
          <span style={s.brandMU} className="hide-xs">{t.brandMU}</span>
        </div>
        <div style={s.navLinks} className="nav-desktop">
          <span style={s.navLink} onClick={() => navigate("/")}>{t.navHome}</span>
          <span style={s.navLinkActive}>{t.navAbout}</span>
          <span style={s.navLink} onClick={goToTimetable}>{t.navRoutes}</span>
        </div>
        <div style={s.navRight} className="nav-desktop">
          <button style={s.navSignIn} onClick={() => navigate("/login")}>{t.signIn}</button>
          <button style={s.navSignUp} onClick={() => navigate("/register")}>{t.signUp}</button>
        </div>
        <button style={s.hamburger} className="nav-mobile" onClick={() => setMobileMenu(v => !v)}>
          <span style={s.ham} /><span style={s.ham} /><span style={s.ham} />
        </button>
      </nav>

      {mobileMenu && (
        <div style={s.mobileDrawer}>
          {[
            { label: t.navHome,   action: () => { navigate("/");       setMobileMenu(false); } },
            { label: t.navAbout,  action: () => { setMobileMenu(false); } },
            { label: t.navRoutes, action: () => { goToTimetable();     setMobileMenu(false); } },
          ].map((l, i) => <div key={i} style={s.mobileLink} onClick={l.action}>{l.label}</div>)}
          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <button style={{ ...s.navSignIn, flex: 1 }} onClick={() => { navigate("/login");    setMobileMenu(false); }}>{t.signIn}</button>
            <button style={{ ...s.navSignUp, flex: 1 }} onClick={() => { navigate("/register"); setMobileMenu(false); }}>{t.signUp}</button>
          </div>
        </div>
      )}

      {/* ── HERO ── */}
      <section style={s.hero}>
        <div style={s.heroGlow1} /><div style={s.heroGlow2} />
        <div style={s.stripeW} /><div style={s.stripeR} /><div style={s.stripeB} />
        <div style={s.heroInner}>
          <div style={s.heroBadge} className="fade-1">{t.heroBadge}</div>
          <h1 style={s.heroH1} className="fade-2">
            {t.heroH1a}<span style={s.heroAccent}>{t.heroH1b}</span>
          </h1>
          <p style={s.heroP} className="fade-3">{t.heroP}</p>
          <div style={s.heroStats} className="fade-4">
            {t.heroStats.map(([v, l]) => (
              <div key={l} style={s.heroStat}>
                <div style={s.heroStatVal}>{v}</div>
                <div style={s.heroStatLabel}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE PROBLEM ── */}
      <section style={{ ...s.sec, background: "#fff" }}>
        <div style={s.secInner}>
          <SectionHeader pill={t.probPill} h2={t.probH2} p={t.probP} />
          <div style={s.probGrid} className="prob-grid">
            {t.problems.map((p, i) => (
              <div key={i} style={s.probCard} className="lift">
                <div style={{ fontSize: 28, marginBottom: 13 }}>{p.icon}</div>
                <div style={s.probTitle}>{p.title}</div>
                <div style={s.probDesc}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ ...s.sec, background: "#020d1f" }}>
        <div style={s.secInner}>
          <SectionHeader dark pill={t.featPill} h2={t.featH2} />
          <div style={s.featGrid} className="feat-grid">
            {t.features.map((f, i) => (
              <div key={i} style={s.featCard} className="liftDark">
                <div style={{ ...s.featIconBox, background: f.bg }}><span style={{ fontSize: 22 }}>{f.icon}</span></div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.65 }}>{f.desc}</div>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: f.color }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECHNOLOGY ── */}
      <section style={{ ...s.sec, background: "#001833" }}>
        <div style={s.secInner}>
          <SectionHeader dark pill={t.techPill} h2={t.techH2} p={t.techP} />
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {t.techRows.map((row, ri) => (
              <div key={ri}>
                <div style={s.techRowLabel}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: row.color, flexShrink: 0 }} />
                  <span>{row.label}</span>
                </div>
                <div style={s.techCardsRow} className="tech-row">
                  {row.items.map((item, i) => (
                    <div key={i} style={{ ...s.techCard, borderTop: `3px solid ${item.color}` }} className="liftDark">
                      <div style={{ fontSize: 16, fontWeight: 800, color: item.color, marginBottom: 8 }}>{item.name}</div>
                      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>{item.role}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section style={{ ...s.sec, background: "#020d1f" }}>
        <div style={s.secInner}>
          <SectionHeader dark pill={t.teamPill} h2={t.teamH2} p={t.teamP} />
          <div style={s.teamGrid} className="team-grid">
            {t.team.map((member, i) => (
              <div key={i} style={s.teamCard} className="liftDark">
                <div style={{ ...s.teamAvatarWrap, border: `2.5px solid ${member.border}`, background: member.bg }}>
                  <img src={member.img} alt={member.name} style={s.teamPhoto}
                    onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
                  <div style={{ ...s.teamInitials, color: member.color, display: "none" }}>{member.avatar}</div>
                </div>
                <div style={s.teamName}>{member.name}</div>
                <div style={{ ...s.teamRole, color: member.color }}>{member.role}</div>
                <div style={s.teamSub}>{member.sub}</div>
                <div style={s.teamDesc}>{member.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ ...s.sec, background: "#001833" }}>
        <div style={s.secInner}>
          <SectionHeader dark pill={t.faqPill} h2={t.faqH2} />
          <div style={{ marginTop: 32, marginBottom: 36 }}>
            {t.faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
          </div>
          <div style={s.contactRow} className="contact-row">
            {t.contact.map((c, i) => (
              <div key={i} style={s.contactCard}>
                <div style={{ fontSize: 26, marginBottom: 10 }}>{c.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 5 }}>{c.title}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>{c.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={s.ctaSec}>
        <div style={s.ctaGlow1} /><div style={s.ctaGlow2} />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          <div style={s.ctaPill}>{t.ctaPill}</div>
          <h2 style={s.ctaH2}>{t.ctaH2}</h2>
          <p style={s.ctaP}>{t.ctaP}</p>
          <div style={s.ctaBtns}>
            <button style={s.ctaPrimary} onClick={() => navigate("/register")}>{t.ctaPrimary}</button>
            <button style={s.ctaOutline} onClick={() => navigate("/")}>{t.ctaOutline}</button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={s.footer}>
        <div style={s.footerTop} className="footer-top">
          <div>
            <div style={s.footerBrand}>🚌 BusVoyage</div>
            <div style={s.footerSub}>{t.footerSub}</div>
            <div style={s.footerTag}>{t.footerTag}</div>
          </div>
          <div style={s.footerCols} className="footer-cols">
            {t.footerCols.map((col, ci) => (
              <div key={ci}>
                <div style={s.footerHead}>{col.head}</div>
                {col.links.map(([label, path]) => (
                  <div key={label} style={s.footerLink} onClick={() => {
                    if (path === "routes") goToTimetable();
                    else if (path === "contact") window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
                    else navigate(path);
                  }}>{label}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div style={s.footerRule} />
        <div style={s.footerBottom}>
          <span>{t.footerBottom}</span>
          <span style={{ color: "#E31E24" }}>{t.footerMade}</span>
        </div>
      </footer>
    </div>
  );
}

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior:smooth; }
  button { font-family:inherit; cursor:pointer; }

  @keyframes fadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:none} }
  .fade-1 { animation:fadeUp 0.7s ease 0.1s  both; }
  .fade-2 { animation:fadeUp 0.7s ease 0.25s both; }
  .fade-3 { animation:fadeUp 0.7s ease 0.4s  both; }
  .fade-4 { animation:fadeUp 0.7s ease 0.55s both; }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.25} }

  .lift:hover     { transform:translateY(-5px) !important; box-shadow:0 16px 40px rgba(0,0,0,0.18) !important; transition:0.3s; }
  .liftDark:hover { transform:translateY(-3px) !important; background:rgba(255,255,255,0.07) !important; transition:0.3s; }

  /* Desktop */
  .nav-desktop { display:flex !important; }
  .nav-mobile  { display:none !important; }
  .hide-xs     { display:inline !important; }

  /* ≤900px — tablet */
  @media (max-width:900px) {
    .nav-desktop  { display:none !important; }
    .nav-mobile   { display:flex !important; }
    .hide-xs      { display:none !important; }
    .prob-grid    { grid-template-columns:1fr 1fr !important; }
    .feat-grid    { grid-template-columns:1fr 1fr !important; }
    .team-grid    { grid-template-columns:1fr 1fr !important; gap:20px !important; }
    .contact-row  { flex-direction:column !important; }
    .footer-top   { flex-direction:column !important; gap:32px !important; }
    .footer-cols  { flex-wrap:wrap !important; gap:24px !important; }
    .tech-row     { grid-template-columns:repeat(2,1fr) !important; }
  }

  /* ≤600px — mobile */
  @media (max-width:600px) {
    .prob-grid  { grid-template-columns:1fr !important; }
    .feat-grid  { grid-template-columns:1fr !important; }
    .team-grid  { grid-template-columns:1fr !important; }
    .tech-row   { grid-template-columns:1fr 1fr !important; }
  }
`;

// ─── STYLES ───────────────────────────────────────────────────────────────────
const s = {
  page: { fontFamily: "'Segoe UI',system-ui,sans-serif", background: "#020d1f", color: "#1A1A2E" },

  nav:          { position: "sticky", top: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 clamp(16px,4vw,52px)", height: 62, background: "rgba(2,13,31,0.97)", backdropFilter: "blur(18px)", boxShadow: "0 1px 0 rgba(255,255,255,0.06)" },
  brand:        { display: "flex", alignItems: "center", gap: 8, cursor: "pointer" },
  brandDot:     { width: 9, height: 9, borderRadius: "50%", background: "#E31E24", animation: "blink 2.5s infinite" },
  brandName:    { fontSize: 18, fontWeight: 900, color: "#fff" },
  brandMU:      { fontSize: 13, color: "rgba(255,255,255,0.4)", fontWeight: 500 },
  navLinks:     { display: "flex", gap: 28 },
  navLink:      { fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.6)", cursor: "pointer", transition: "color 0.2s" },
  navLinkActive:{ fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer" },
  navRight:     { display: "flex", gap: 10, alignItems: "center" },
  navSignIn:    { padding: "7px 20px", background: "transparent", border: "1px solid rgba(255,255,255,0.28)", color: "#fff", borderRadius: 7, fontSize: 13 },
  navSignUp:    { padding: "8px 22px", background: "#E31E24", border: "none", color: "#fff", borderRadius: 7, fontWeight: 700, fontSize: 13 },
  hamburger:    { background: "transparent", border: "none", cursor: "pointer", padding: 8, display: "flex", flexDirection: "column", gap: 5 },
  ham:          { display: "block", width: 22, height: 2, background: "#fff", borderRadius: 2 },
  mobileDrawer: { position: "fixed", top: 62, left: 0, right: 0, background: "rgba(2,13,31,0.99)", zIndex: 199, padding: "18px 24px 22px", borderBottom: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 8px 24px rgba(0,0,0,0.5)" },
  mobileLink:   { padding: "12px 0", fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.85)", cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.07)" },

  hero:         { position: "relative", background: "#020d1f", padding: "100px clamp(16px,5vw,52px) 80px", overflow: "hidden" },
  heroGlow1:    { position: "absolute", top: -80, left: "20%", width: 480, height: 480, background: "radial-gradient(circle, rgba(0,43,91,0.35), transparent 70%)", pointerEvents: "none" },
  heroGlow2:    { position: "absolute", bottom: -40, right: "15%", width: 320, height: 320, background: "radial-gradient(circle, rgba(0,80,180,0.2), transparent 70%)", pointerEvents: "none" },
  stripeW:      { position: "absolute", left: 0,  top: 0, bottom: 0, width: 5, background: "rgba(255,255,255,0.9)", zIndex: 2 },
  stripeR:      { position: "absolute", left: 9,  top: 0, bottom: 0, width: 4, background: "#E31E24", zIndex: 2 },
  stripeB:      { position: "absolute", left: 17, top: 0, bottom: 0, width: 4, background: "#002B5B", zIndex: 2 },
  heroInner:    { position: "relative", zIndex: 10, maxWidth: 720, margin: "0 auto", textAlign: "center" },
  heroBadge:    { display: "inline-block", background: "rgba(0,43,91,0.4)", backdropFilter: "blur(8px)", border: "1px solid rgba(96,165,250,0.3)", color: "#60a5fa", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", padding: "7px 18px", borderRadius: 20, marginBottom: 24 },
  heroH1:       { fontSize: "clamp(26px,5vw,50px)", fontWeight: 900, color: "#fff", lineHeight: 1.15, marginBottom: 20, letterSpacing: "-0.02em" },
  heroAccent:   { color: "#FFE566" },
  heroP:        { fontSize: "clamp(14px,1.6vw,16px)", color: "rgba(255,255,255,0.65)", lineHeight: 1.8, marginBottom: 44, display: "block", maxWidth: 520, margin: "0 auto 44px" },
  heroStats:    { display: "flex", justifyContent: "center", gap: "clamp(20px,4vw,44px)", flexWrap: "wrap" },
  heroStat:     { textAlign: "center" },
  heroStatVal:  { fontSize: "clamp(20px,3vw,28px)", fontWeight: 900, color: "#FFE566", marginBottom: 4 },
  heroStatLabel:{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 500, textTransform: "uppercase", letterSpacing: 1 },

  sec:     { padding: "80px clamp(16px,5vw,52px)" },
  secInner:{ maxWidth: 1180, margin: "0 auto" },

  probGrid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginTop: 32 },
  probCard: { background: "#f8fafc", borderRadius: 16, padding: "22px 18px", border: "1px solid #e2e8f0" },
  probTitle:{ fontSize: 14, fontWeight: 800, color: "#1A1A2E", marginBottom: 8 },
  probDesc: { fontSize: 13, color: "#64748b", lineHeight: 1.65 },

  featGrid:   { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 32 },
  featCard:   { background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: "22px 18px", border: "1px solid rgba(255,255,255,0.08)", position: "relative", overflow: "hidden" },
  featIconBox:{ width: 48, height: 48, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 },

  techRowLabel: { display: "flex", alignItems: "center", gap: 10, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.38)", marginBottom: 14 },
  techCardsRow: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 },
  techCard:     { background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: "22px 20px", border: "1px solid rgba(255,255,255,0.08)", minHeight: 90, display: "flex", flexDirection: "column", justifyContent: "center" },

  teamGrid:      { display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 28, marginTop: 40, maxWidth: 720, margin: "40px auto 0" },
  teamCard:      { background: "rgba(255,255,255,0.04)", borderRadius: 20, padding: "36px clamp(16px,3vw,28px)", textAlign: "center", border: "1px solid rgba(255,255,255,0.08)" },
  teamAvatarWrap:{ width: 100, height: 100, borderRadius: "50%", margin: "0 auto 20px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" },
  teamPhoto:     { width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%", display: "block" },
  teamInitials:  { fontSize: 26, fontWeight: 800, width: "100%", height: "100%", alignItems: "center", justifyContent: "center" },
  teamName:      { fontSize: 17, fontWeight: 800, color: "#fff", marginBottom: 6 },
  teamRole:      { fontSize: 14, fontWeight: 700, marginBottom: 5 },
  teamSub:       { fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 14 },
  teamDesc:      { fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.75 },

  contactRow: { display: "flex", gap: 14, flexWrap: "wrap" },
  contactCard:{ flex: 1, minWidth: 180, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "20px 18px", textAlign: "center" },

  ctaSec:    { padding: "90px clamp(16px,5vw,52px)", background: "#001833", position: "relative", overflow: "hidden", textAlign: "center" },
  ctaGlow1:  { position: "absolute", top: -80, left: "25%", width: 400, height: 400, background: "radial-gradient(circle, rgba(227,30,36,0.14), transparent 70%)", pointerEvents: "none" },
  ctaGlow2:  { position: "absolute", bottom: -60, right: "20%", width: 300, height: 300, background: "radial-gradient(circle, rgba(0,43,91,0.2), transparent 70%)", pointerEvents: "none" },
  ctaPill:   { display: "inline-block", background: "rgba(227,30,36,0.14)", color: "#E31E24", fontSize: 11, fontWeight: 800, padding: "6px 16px", borderRadius: 30, marginBottom: 20 },
  ctaH2:     { fontSize: "clamp(22px,4vw,44px)", fontWeight: 900, color: "#fff", marginBottom: 16 },
  ctaP:      { fontSize: 15, color: "rgba(255,255,255,0.55)", marginBottom: 36 },
  ctaBtns:   { display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" },
  ctaPrimary:{ padding: "14px 30px", background: "#E31E24", color: "#fff", border: "none", borderRadius: 10, fontWeight: 800, fontSize: 15 },
  ctaOutline:{ padding: "14px 26px", background: "rgba(255,255,255,0.06)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.2)", borderRadius: 10, fontWeight: 600, fontSize: 15 },

  footer:      { padding: "60px clamp(16px,5vw,52px) 28px", background: "#000c18", color: "#fff" },
  footerTop:   { display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 40, marginBottom: 44 },
  footerBrand: { fontSize: 20, fontWeight: 900, marginBottom: 10 },
  footerSub:   { color: "rgba(255,255,255,0.3)", lineHeight: 1.7, fontSize: 13, marginBottom: 12, whiteSpace: "pre-line" },
  footerTag:   { fontSize: 11, color: "rgba(255,255,255,0.22)" },
  footerCols:  { display: "flex", gap: 48, flexWrap: "wrap" },
  footerHead:  { fontWeight: 800, marginBottom: 16, fontSize: 11, color: "#E31E24", letterSpacing: 1, textTransform: "uppercase" },
  footerLink:  { color: "rgba(255,255,255,0.38)", fontSize: 13, marginBottom: 10, cursor: "pointer" },
  footerRule:  { height: 1, background: "rgba(255,255,255,0.05)", marginBottom: 22 },
  footerBottom:{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, fontSize: 12, color: "rgba(255,255,255,0.2)" },
};
