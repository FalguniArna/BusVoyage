import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const BN_DIGITS = ["০","১","২","৩","৪","৫","৬","৭","৮","৯"];
const toBnNum = (str) => String(str).replace(/[0-9]/g, d => BN_DIGITS[d]);

function fmtTimeBn(date) {
  let h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  if (h > 12) h -= 12;
  if (h === 0) h = 12;
  return `${toBnNum(String(h).padStart(2,"0"))}:${toBnNum(String(m).padStart(2,"0"))}:${toBnNum(String(s).padStart(2,"0"))}`;
}

function fmtTimeShortBn(date) {
  let h = date.getHours();
  const m = date.getMinutes();
  if (h > 12) h -= 12;
  if (h === 0) h = 12;
  return `${toBnNum(String(h).padStart(2,"0"))}:${toBnNum(String(m).padStart(2,"0"))}`;
}

const BN_WEEKDAYS = ["রবিবার","সোমবার","মঙ্গলবার","বুধবার","বৃহস্পতিবার","শুক্রবার","শনিবার"];
const BN_MONTHS   = ["জানুয়ারি","ফেব্রুয়ারি","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগস্ট","সেপ্টেম্বর","অক্টোবর","নভেম্বর","ডিসেম্বর"];

function fmtDateBn(date) {
  return `${BN_WEEKDAYS[date.getDay()]}, ${toBnNum(date.getDate())} ${BN_MONTHS[date.getMonth()]}`;
}

function fmtDepTimeBn(str) {
  if (!str) return str;
  const [hRaw, mRaw] = str.split(":");
  const h = parseInt(hRaw, 10);
  let h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${toBnNum(String(h12).padStart(2,"0"))}:${toBnNum((mRaw || "00").padStart(2,"0"))}`;
}

const SERVICE_BN = {
  Regular: "প্রতিদিন",
  Express: "এক্সপ্রেস",
  Special: "বিশেষ",
  Night:   "রাতের",
  Morning: "সকালের",
  Evening: "বিকালের",
};

const STOP_BN = {
  "Subid Bazar":         "সুবিদবাজার",
  "SubidBazar":          "সুবিদবাজার",
  "Shubidbazar":         "সুবিদবাজার",
  "Amberkhana":          "আম্বরখানা",
  "Amber Khana":         "আম্বরখানা",
  "Shahi Eidgah":        "শাহী ঈদগাহ",
  "Tilagor":             "টিলাগর",
  "Campus":              "ক্যাম্পাস",
  "MU Gate":             "MU গেট",
  "Not departed yet":    "এখনো ছাড়েনি",
  "Arrived at Campus":   "ক্যাম্পাসে পৌঁছেছে",
};

const DRIVER_BN = {
  Fahim:   "ফাহিম",
  Rahim:   "রহিম",
  Karim:   "করিম",
  Salam:   "সালাম",
  Hasan:   "হাসান",
  Hossain: "হোসাইন",
};

const toStopBn    = (s) => STOP_BN[s]    || s;
const toServiceBn = (s) => SERVICE_BN[s] || s;
const toDriverBn  = (s) => DRIVER_BN[s]  || s;
const toRouteBn   = (s) => {
  if (!s) return s;
  return s.split(/[,→–]/).map(p => toStopBn(p.trim())).join(" → ");
};

function parseStops(route, t) {
  if (!route) return [t.notDepartedYet];
  const cleaned = route
    .replace(/→/g, ",")
    .replace(/–/g, ",")
    .split(",")
    .map(s => s.trim())
    .filter(s => s.length > 0);
  return [t.notDepartedYet, ...cleaned, t.arrivedCampus];
}

const TRANSLATIONS = {
  en: {
    brandName: "BusVoyage",
    brandSub: "Metropolitan University",
    onDuty: "On Duty",
    busesAssigned: (n) => `${n} bus${n > 1 ? "es" : ""} assigned`,
    noBusesAssigned: "No buses assigned",
    scheduledDeparture: "Scheduled Departure",
    selectBus: "Select Bus",
    activeBus: "Active Bus",
    notStarted: "Not started",
    driverTips: "Driver Tips",
    tips: [
      "Update your location every time you depart a stop.",
      "Mark 'At Campus' when you reach MU Gate.",
      "Set crowd level before each departure.",
      "Students see your updates instantly.",
    ],
    logout: "Logout",
    driverTerminal: "Driver Terminal",
    updateRealtime: "Update your bus status in real time",
    loadingBuses: "Loading your buses...",
    noBusesTitle: "No buses assigned",
    noBusesSub: "Contact admin to get assigned to a bus.",
    busNumber: "Bus Number",
    departureTime: "Departure Time",
    notSet: "Not set",
    tripStatus: "Trip Status",
    crowdLevel: "Crowd Level",
    currentStop: "Current Stop",
    currentLocation: "Current Location",
    selectStop: "Select your current stop",
    youAreHere: "You are here",
    seatAvailability: "Seat Availability",
    howCrowded: "How crowded is your bus?",
    tripStatusSub: "Your current trip situation",
    comment: "Comment",
    commentSub: "Optional note for students",
    commentPlaceholder: "e.g. Slight delay due to traffic",
    notifiedNote: "Updates are pushed to all students tracking your bus instantly.",
    liveSummary: "Live Summary",
    route: "Route",
    driver: "Driver",
    service: "Service",
    status: "Status",
    crowd: "Crowd",
    location: "Location",
    updatedAt: "Updated at",
    saving: "Saving...",
    notified: "✓ Students Notified!",
    updateNotify: "Update & Notify Students",
    tapToPush: "Tap to push your status live to all students",
    liveTracking: "Live tracking",
    studentsInstant: "students see updates instantly",
    live: "LIVE",
    notDepartedYet: "Not departed yet",
    arrivedCampus: "Arrived at Campus",
    studentsNotifiedAt: "Students notified at",
    crowdOptions: [
      { key: "Seats Available", label: "Seats Available" },
      { key: "Standing Only",   label: "Standing Only"   },
      { key: "Overcrowded",     label: "Overcrowded"     },
    ],
    statusOptions: [
      { key: "not_departed", label: "Not Departed" },
      { key: "running",      label: "On the Road"  },
      { key: "arrived",      label: "At Campus"    },
    ],
    failedUpdate: "Failed to update. Please try again.",
    fmtTime:      (d) => d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    fmtTimeShort: (d) => d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    fmtDate:      (d) => d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
    fmtDep:       (s) => s,
    fmtStop:      (s) => s,
    fmtRoute:     (s) => s,
    fmtService:   (s) => s,
    fmtBusNum:    (s) => s,
    fmtDriver:    (s) => s,
    fmtProgress:  (n) => n,
  },
  bn: {
    brandName: "বাসভয়েজ",
    brandSub: "মেট্রোপলিটন বিশ্ববিদ্যালয়",
    onDuty: "দায়িত্বে আছেন",
    busesAssigned: (n) => `${toBnNum(n)}টি বাস নির্ধারিত`,
    noBusesAssigned: "কোনো বাস নির্ধারিত নেই",
    scheduledDeparture: "নির্ধারিত প্রস্থান",
    selectBus: "বাস নির্বাচন করুন",
    activeBus: "সক্রিয় বাস",
    notStarted: "শুরু হয়নি",
    driverTips: "চালকের পরামর্শ",
    tips: [
      "প্রতিটি স্টপ ছাড়ার সময় লোকেশন আপডেট করুন।",
      "MU গেটে পৌঁছালে 'ক্যাম্পাসে' চিহ্নিত করুন।",
      "প্রতিটি যাত্রার আগে ভিড়ের স্তর সেট করুন।",
      "শিক্ষার্থীরা তাৎক্ষণিকভাবে আপডেট দেখতে পায়।",
    ],
    logout: "লগআউট",
    driverTerminal: "ড্রাইভার টার্মিনাল",
    updateRealtime: "রিয়েল টাইমে আপনার বাসের অবস্থা আপডেট করুন",
    loadingBuses: "বাস লোড হচ্ছে...",
    noBusesTitle: "কোনো বাস নির্ধারিত নেই",
    noBusesSub: "বাস পেতে অ্যাডমিনের সাথে যোগাযোগ করুন।",
    busNumber: "বাস নম্বর",
    departureTime: "প্রস্থানের সময়",
    notSet: "নির্ধারিত নয়",
    tripStatus: "যাত্রার অবস্থা",
    crowdLevel: "ভিড়ের মাত্রা",
    currentStop: "বর্তমান স্টপ",
    currentLocation: "বর্তমান অবস্থান",
    selectStop: "আপনার বর্তমান স্টপ নির্বাচন করুন",
    youAreHere: "আপনি এখানে আছেন",
    seatAvailability: "আসন প্রাপ্যতা",
    howCrowded: "আপনার বাসে কতটা ভিড়?",
    tripStatusSub: "আপনার বর্তমান যাত্রার পরিস্থিতি",
    comment: "মন্তব্য",
    commentSub: "শিক্ষার্থীদের জন্য ঐচ্ছিক নোট",
    commentPlaceholder: "যেমন: ট্রাফিকের কারণে সামান্য বিলম্ব",
    notifiedNote: "আপডেটগুলি তাৎক্ষণিকভাবে সকল শিক্ষার্থীর কাছে পাঠানো হয়।",
    liveSummary: "লাইভ সারসংক্ষেপ",
    route: "রুট",
    driver: "চালক",
    service: "সেবা",
    status: "অবস্থা",
    crowd: "ভিড়",
    location: "অবস্থান",
    updatedAt: "আপডেট হয়েছে",
    saving: "সংরক্ষণ হচ্ছে...",
    notified: "✓ শিক্ষার্থীরা জানানো হয়েছে!",
    updateNotify: "আপডেট করুন ও শিক্ষার্থীদের জানান",
    tapToPush: "সকল শিক্ষার্থীর কাছে লাইভ স্ট্যাটাস পাঠাতে ট্যাপ করুন",
    liveTracking: "লাইভ ট্র্যাকিং",
    studentsInstant: "শিক্ষার্থীরা তাৎক্ষণিক আপডেট দেখতে পায়",
    live: "লাইভ",
    notDepartedYet: "এখনো ছাড়েনি",
    arrivedCampus: "ক্যাম্পাসে পৌঁছেছে",
    studentsNotifiedAt: "শিক্ষার্থীদের জানানো হয়েছে",
    crowdOptions: [
      { key: "Seats Available", label: "আসন আছে"      },
      { key: "Standing Only",   label: "দাঁড়িয়ে শুধু"  },
      { key: "Overcrowded",     label: "অতিরিক্ত ভিড়"  },
    ],
    statusOptions: [
      { key: "not_departed", label: "ছাড়েনি"    },
      { key: "running",      label: "পথে আছে"   },
      { key: "arrived",      label: "ক্যাম্পাসে" },
    ],
    failedUpdate: "আপডেট ব্যর্থ হয়েছে। আবার চেষ্টা করুন।",
    fmtTime:      fmtTimeBn,
    fmtTimeShort: fmtTimeShortBn,
    fmtDate:      fmtDateBn,
    fmtDep:       fmtDepTimeBn,
    fmtStop:      toStopBn,
    fmtRoute:     toRouteBn,
    fmtService:   toServiceBn,
    fmtBusNum:    toBnNum,
    fmtDriver:    toDriverBn,
    fmtProgress:  (n) => toBnNum(n),
  },
};

const CROWD_COLORS = {
  "Seats Available": { color: "#16a34a", light: "#dcfce7", border: "#86efac" },
  "Standing Only":   { color: "#d97706", light: "#fef3c7", border: "#fcd34d" },
  "Overcrowded":     { color: "#E31E24", light: "#fee2e2", border: "#fca5a5" },
};

const STATUS_COLORS = {
  not_departed: { color: "#475569", light: "#f1f5f9", border: "#cbd5e1" },
  running:      { color: "#f39c12", light: "#fef3c7", border: "#fcd34d" },
  arrived:      { color: "#16a34a", light: "#dcfce7", border: "#86efac" },
};

export default function DriverDashboard() {
  const navigate = useNavigate();
  const [lang, setLang]           = useState("en");
  const [user, setUser]           = useState(null);
  const [buses, setBuses]         = useState([]);
  const [edits, setEdits]         = useState({});
  const [saving, setSaving]       = useState(null);
  const [saved, setSaved]         = useState(null);
  const [loading, setLoading]     = useState(true);
  const [sideOpen, setSideOpen]   = useState(false);
  const [time, setTime]           = useState(new Date());
  const [activeBus, setActiveBus] = useState(null);

  const t      = TRANSLATIONS[lang];
  const CROWD  = t.crowdOptions.map(o => ({ ...o, ...CROWD_COLORS[o.key] }));
  const STATUS = t.statusOptions.map(o => ({ ...o, ...STATUS_COLORS[o.key] }));

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) { navigate("/login"); return; }
    const parsed = JSON.parse(savedUser);
    if (parsed.role !== "driver") { navigate("/login"); return; }
    setUser(parsed);
    fetchMyBuses(parsed.name);
  }, []);

  useEffect(() => {
    const tick = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);

  const fetchMyBuses = async (name) => {
    try {
      const res = await axios.get(`${API}/api/buses/driver/${name}`);
      setBuses(res.data);
      if (res.data.length > 0) setActiveBus(res.data[0]._id);
      const initEdits = {};
      res.data.forEach(b => {
        initEdits[b._id] = {
          isActive:        b.isActive || false,
          currentLocation: b.currentLocation || "",
          crowdStatus:     b.crowdStatus || "Unknown",
          tripStatus:      b.isActive ? "running" : "not_departed",
          comment:         b.comment || "",
        };
      });
      setEdits(initEdits);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (busId, field, value) => {
    setEdits(prev => ({ ...prev, [busId]: { ...prev[busId], [field]: value } }));
  };

  const handleSave = async (busId) => {
    setSaving(busId);
    try {
      const edit    = edits[busId];
      const isActive = edit.tripStatus === "running" || edit.tripStatus === "arrived";
      await axios.patch(`${API}/api/buses/${busId}/status`, {
        isActive,
        currentLocation: edit.currentLocation,
        crowdStatus:     edit.crowdStatus,
        comment:         edit.comment,
      });
      setSaved(busId);
      setTimeout(() => setSaved(null), 3000);
      fetchMyBuses(user.name);
    } catch (err) {
      alert(t.failedUpdate);
    } finally {
      setSaving(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const currentBus  = buses.find(b => b._id === activeBus);
  const currentEdit = activeBus ? (edits[activeBus] || {}) : {};
  const cInfo       = CROWD.find(c => c.key === currentEdit.crowdStatus)  || CROWD[0];
  const sInfo       = STATUS.find(s => s.key === currentEdit.tripStatus)  || STATUS[0];
  const busStops    = currentBus ? parseStops(currentBus.route, t) : [t.notDepartedYet];
  const stopIdx     = busStops.indexOf(currentEdit.currentLocation);
  const progress    = stopIdx > 0 ? Math.round((stopIdx / (busStops.length - 1)) * 100) : 0;

  const ds = (s) => s ? t.fmtStop(s) : s;

  if (!user) return null;

  return (
    <div className="dr-root">
      <style>{CSS}</style>
      {sideOpen && <div className="dr-overlay" onClick={() => setSideOpen(false)} />}

      <aside className={`dr-side ${sideOpen ? "dr-side-open" : ""}`}>
        <div className="dr-brand">
          <div className="dr-brand-dot" />
          <div>
            <div className="dr-brand-name">{t.brandName}</div>
            <div className="dr-brand-sub">{t.brandSub}</div>
          </div>
          <button className="dr-side-close" onClick={() => setSideOpen(false)}>✕</button>
        </div>

        <div className="dr-profile">
          <div className="dr-avatar">
            {user.name ? user.name.charAt(0).toUpperCase() : "D"}
          </div>
          <div className="dr-profile-info">
            <div className="dr-profile-name">{t.fmtDriver(user.name)}</div>
            <div className="dr-profile-meta">
              {buses.length > 0 ? t.busesAssigned(buses.length) : t.noBusesAssigned}
            </div>
          </div>
          <div className="dr-duty">
            <span className="dr-duty-dot" />
            {t.onDuty}
          </div>
        </div>

        <div className="dr-clock">
          <div className="dr-clock-time">{t.fmtTime(time)}</div>
          <div className="dr-clock-date">{t.fmtDate(time)}</div>
        </div>

        {buses.length > 1 && (
          <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 8 }}>
              {t.selectBus}
            </div>
            {buses.map(b => (
              <div key={b._id} onClick={() => setActiveBus(b._id)} style={{
                padding: "8px 10px", borderRadius: 8, marginBottom: 4, cursor: "pointer",
                fontSize: 12, fontWeight: 600,
                background: activeBus === b._id ? "rgba(243,156,18,0.15)" : "rgba(255,255,255,0.04)",
                color:      activeBus === b._id ? "#f39c12" : "rgba(255,255,255,0.5)",
                border: `1px solid ${activeBus === b._id ? "rgba(243,156,18,0.3)" : "rgba(255,255,255,0.06)"}`,
              }}>
                🚌 {t.fmtBusNum(b.busNumber)} — {t.fmtService(b.serviceType)}
              </div>
            ))}
          </div>
        )}

        {currentBus && (
          <div className="dr-route-box">
            <div className="dr-route-label">{t.activeBus}</div>
            <div className="dr-route-name">{t.fmtBusNum(currentBus.busNumber)}</div>
            <div className="dr-route-meta">{t.fmtRoute(currentBus.route)}</div>
            {currentBus.departureTime && (
              <div style={{ marginTop: 8, marginBottom: 10, background: "rgba(243,156,18,0.12)", border: "1px solid rgba(243,156,18,0.3)", borderRadius: 8, padding: "6px 10px", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 12 }}>🕐</span>
                <div>
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>{t.scheduledDeparture}</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: "#f39c12" }}>{t.fmtDep(currentBus.departureTime)}</div>
                </div>
              </div>
            )}
            <div className="dr-prog-wrap">
              <div className="dr-prog-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="dr-prog-label">
              {currentEdit.currentLocation ? ds(currentEdit.currentLocation) : t.notStarted} — {t.fmtProgress(progress)}%
            </div>
          </div>
        )}

        <div className="dr-sb-pills">
          <div className="dr-sb-pill" style={{ background: sInfo.light, color: sInfo.color, border: `1px solid ${sInfo.border}` }}>{sInfo.label}</div>
          <div className="dr-sb-pill" style={{ background: cInfo.light, color: cInfo.color, border: `1px solid ${cInfo.border}` }}>{cInfo.label}</div>
        </div>

        {saved && (
          <div className="dr-notified">
            <span className="dr-notified-dot" />
            {t.studentsNotifiedAt} {t.fmtTimeShort(new Date())}
          </div>
        )}

        <div style={{ flex: 1 }} />

        <div className="dr-tips">
          <div className="dr-tips-title">{t.driverTips}</div>
          {t.tips.map((tip, i) => (
            <div key={i} className="dr-tip-row">
              <span className="dr-tip-num">{t.fmtProgress(i + 1)}</span>
              <span className="dr-tip-text">{tip}</span>
            </div>
          ))}
        </div>

        <div style={{ padding: "14px 16px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <button onClick={handleLogout} style={{ width: "100%", padding: 9, background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)", borderRadius: 8, cursor: "pointer", fontSize: 13 }}>
            ↪ {t.logout}
          </button>
        </div>
      </aside>

      <div className="dr-main">
        <header className="dr-topbar">
          <div className="dr-topbar-left">
            <button className="dr-hamburger" onClick={() => setSideOpen(true)}>
              <span /><span /><span />
            </button>
            <div>
              <div className="dr-topbar-title">{t.driverTerminal}</div>
              <div className="dr-topbar-sub">{t.updateRealtime}</div>
            </div>
          </div>
          <div className="dr-topbar-right">
            <div className="dr-topbar-clock">{t.fmtTime(time)}</div>
            <div className="dr-topbar-pill" style={{ background: sInfo.light, color: sInfo.color, border: `1px solid ${sInfo.border}` }}>
              {sInfo.label}
            </div>
            <div className="dr-lang-switch">
              <button className={`dr-lang-btn ${lang === "en" ? "dr-lang-active" : ""}`} onClick={() => setLang("en")}>EN</button>
              <button className={`dr-lang-btn ${lang === "bn" ? "dr-lang-active" : ""}`} onClick={() => setLang("bn")}>বাং</button>
            </div>
          </div>
        </header>

        <div className="dr-body">
          {loading && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 300, gap: 12 }}>
              <div style={{ width: 32, height: 32, border: "3px solid rgba(255,255,255,0.1)", borderTop: "3px solid #f39c12", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>{t.loadingBuses}</p>
            </div>
          )}

          {!loading && buses.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 24px", color: "rgba(255,255,255,0.3)" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🚍</div>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.noBusesTitle}</div>
              <div style={{ fontSize: 13 }}>{t.noBusesSub}</div>
            </div>
          )}

          {!loading && currentBus && (
            <>
              <div className="dr-stats">
                {[
                  {
                    label: t.busNumber,
                    value: t.fmtBusNum(currentBus.busNumber),
                    color: "#f39c12", light: "#fef3c7", border: "#fcd34d",
                  },
                  {
                    label: t.departureTime,
                    value: currentBus.departureTime ? t.fmtDep(currentBus.departureTime) : t.notSet,
                    color: "#f39c12", light: "#fef3c7", border: "#fcd34d",
                  },
                  { label: t.tripStatus, value: sInfo.label, color: sInfo.color, light: sInfo.light, border: sInfo.border },
                  { label: t.crowdLevel, value: cInfo.label, color: cInfo.color, light: cInfo.light, border: cInfo.border },
                  {
                    label: t.currentStop,
                    value: currentEdit.currentLocation ? ds(currentEdit.currentLocation) : t.notSet,
                    color: "#0f172a", light: "#f1f5f9", border: "#cbd5e1",
                  },
                ].map((st, i) => (
                  <div key={i} className="dr-stat-card" style={{ borderTop: `3px solid ${st.color}` }}>
                    <div className="dr-stat-label">{st.label}</div>
                    <span className="dr-stat-val" style={{ background: st.light, color: st.color, border: `1px solid ${st.border}` }}>
                      {st.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="dr-grid">
                <div className="dr-panel">
                  <PanelHead title={t.currentLocation} sub={t.selectStop} accent="#f39c12" />
                  <div className="dr-stops">
                    {busStops.map((stop, i) => {
                      const done    = i < stopIdx;
                      const current = stop === currentEdit.currentLocation;
                      return (
                        <div key={stop} className="dr-stop-row" onClick={() => handleEdit(activeBus, "currentLocation", stop)}>
                          <div className="dr-track-col">
                            {i > 0 && <div className="dr-track-line" style={{ background: done || current ? "#f39c12" : "#e2e8f0" }} />}
                            <div className="dr-track-dot" style={{
                              background:  current ? "#f39c12" : done ? "#16a34a" : "#e2e8f0",
                              border:      current ? "3px solid #fcd34d" : done ? "3px solid #86efac" : "3px solid #e2e8f0",
                              transform:   current ? "scale(1.3)" : "scale(1)",
                              boxShadow:   current ? "0 0 0 4px rgba(243,156,18,0.15)" : "none",
                            }} />
                          </div>
                          <div className="dr-stop-content" style={{
                            background: current ? "#fef3c7" : "transparent",
                            border:     current ? "1px solid #fcd34d" : "1px solid transparent",
                          }}>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{
                                fontSize: 13, fontWeight: current ? 700 : done ? 400 : 500,
                                color: current ? "#fbbf24" : done ? "#4b5563" : "#e2e8f0",
                                textDecoration: done ? "line-through" : "none",
                              }}>
                                {ds(stop)}
                              </div>
                              {current && <div style={{ fontSize: 9, color: "#d97706", fontWeight: 700, marginTop: 2 }}>{t.youAreHere}</div>}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="dr-col2">
                  <div className="dr-panel">
                    <PanelHead title={t.seatAvailability} sub={t.howCrowded} accent="#f39c12" />
                    <div className="dr-opt-grid">
                      {CROWD.map(opt => (
                        <SelCard key={opt.key} opt={opt}
                          selected={currentEdit.crowdStatus === opt.key}
                          onClick={() => handleEdit(activeBus, "crowdStatus", opt.key)} />
                      ))}
                    </div>
                  </div>

                  <div className="dr-panel">
                    <PanelHead title={t.tripStatus} sub={t.tripStatusSub} accent="#2d3436" />
                    <div className="dr-opt-grid">
                      {STATUS.map(opt => (
                        <SelCard key={opt.key} opt={opt}
                          selected={currentEdit.tripStatus === opt.key}
                          onClick={() => handleEdit(activeBus, "tripStatus", opt.key)} />
                      ))}
                    </div>
                  </div>

                  <div className="dr-panel">
                    <PanelHead title={t.comment} sub={t.commentSub} accent="#475569" />
                    <input
                      style={{ width: "100%", padding: "9px 12px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e2e8f0", fontSize: 13, fontFamily: "inherit", boxSizing: "border-box" }}
                      placeholder={t.commentPlaceholder}
                      value={currentEdit.comment || ""}
                      onChange={e => handleEdit(activeBus, "comment", e.target.value)}
                    />
                  </div>

                  <div className="dr-note-strip">{t.notifiedNote}</div>
                </div>

                <div className="dr-col3">
                  <div className="dr-summary">
                    <div className="dr-sum-head">
                      <span className="dr-sum-live-dot" />
                      {t.liveSummary}
                    </div>
                    {[
                      [t.busNumber, t.fmtBusNum(currentBus.busNumber)],
                      [t.route,     t.fmtRoute(currentBus.route)],
                      [t.driver,    t.fmtDriver(user.name)],
                      [t.service,   t.fmtService(currentBus.serviceType)],
                    ].map(([l, v]) => (
                      <div key={l} className="dr-sum-row">
                        <span className="dr-sum-lbl">{l}</span>
                        <span className="dr-sum-val">{v}</span>
                      </div>
                    ))}
                    <div className="dr-sum-row">
                      <span className="dr-sum-lbl">{t.status}</span>
                      <span className="dr-sum-badge" style={{ color: sInfo.color, background: sInfo.light, border: `1px solid ${sInfo.border}` }}>{sInfo.label}</span>
                    </div>
                    <div className="dr-sum-row">
                      <span className="dr-sum-lbl">{t.crowd}</span>
                      <span className="dr-sum-badge" style={{ color: cInfo.color, background: cInfo.light, border: `1px solid ${cInfo.border}` }}>{cInfo.label}</span>
                    </div>
                    <div className="dr-sum-row" style={{ border: "none" }}>
                      <span className="dr-sum-lbl">{t.location}</span>
                      <span className="dr-sum-val" style={{ fontSize: 11 }}>
                        {currentEdit.currentLocation ? ds(currentEdit.currentLocation) : "—"}
                      </span>
                    </div>
                    {saved === activeBus && (
                      <div className="dr-sum-updated">✅ {t.updatedAt} {t.fmtTimeShort(new Date())}</div>
                    )}
                  </div>

                  <button
                    className="dr-notify-btn"
                    style={{
                      background: saved === activeBus
                        ? "linear-gradient(135deg,#15803d,#16a34a)"
                        : "linear-gradient(135deg,#2d3436,#1a1a2e)",
                      boxShadow: saved === activeBus
                        ? "0 6px 24px rgba(22,163,74,0.35)"
                        : "0 6px 24px rgba(45,52,54,0.4)",
                      opacity: saving === activeBus ? 0.7 : 1,
                    }}
                    onClick={() => handleSave(activeBus)}
                    disabled={saving === activeBus}
                  >
                    {saving === activeBus ? t.saving : saved === activeBus ? t.notified : t.updateNotify}
                  </button>

                  <p className="dr-notify-hint">{t.tapToPush}</p>

                  <div className="dr-watchers">
                    <div className="dr-watcher-ico">👁</div>
                    <div>
                      <div className="dr-watcher-count">{t.liveTracking}</div>
                      <div className="dr-watcher-sub">{t.studentsInstant}</div>
                    </div>
                    <span className="dr-live-tag">{t.live}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function PanelHead({ title, sub, accent }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
        <div style={{ width: 4, height: 16, borderRadius: 2, background: accent, flexShrink: 0 }} />
        <span style={{ fontSize: 14, fontWeight: 700, color: "#e2e8f0" }}>{title}</span>
      </div>
      <span style={{ fontSize: 11, color: "#94a3b8", paddingLeft: 12 }}>{sub}</span>
    </div>
  );
}

function SelCard({ opt, selected, onClick }) {
  return (
    <div onClick={onClick} className="dr-sel-card" style={{
      border: `2px solid ${selected ? opt.color : "#e2e8f0"}`,
      background: selected ? opt.light : "#fafafa",
      boxShadow: selected ? `0 0 0 3px ${opt.color}22` : "none",
    }}>
      <div style={{
        width: 10, height: 10, borderRadius: "50%",
        background: selected ? opt.color : "#e2e8f0",
        margin: "0 auto 10px",
        boxShadow: selected ? `0 0 0 3px ${opt.color}33` : "none",
      }} />
      <div style={{ fontSize: 11, fontWeight: selected ? 700 : 500, color: selected ? opt.color : "#64748b", lineHeight: 1.4 }}>
        {opt.label}
      </div>
    </div>
  );
}

const CSS = `
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.3} }
  @keyframes spin { to { transform: rotate(360deg); } }

  .dr-root { display:flex; min-height:100vh; font-family:'Inter','Segoe UI',system-ui,sans-serif; background:#1e2530; }
  .dr-side { width:252px; background:linear-gradient(180deg,#1a1a2e 0%,#0f172a 50%,#001225 100%); display:flex; flex-direction:column; flex-shrink:0; height:100vh; position:sticky; top:0; overflow-y:auto; border-right:1px solid rgba(255,255,255,0.06); transition:transform 0.28s cubic-bezier(0.4,0,0.2,1); }
  .dr-side::-webkit-scrollbar { width:3px; } .dr-side::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.08); border-radius:3px; }
  .dr-brand { display:flex; align-items:center; gap:10px; padding:18px 16px 15px; border-bottom:1px solid rgba(255,255,255,0.07); }
  .dr-brand-dot { width:10px; height:10px; border-radius:50%; background:#E31E24; flex-shrink:0; animation:pulse 2.5s infinite; }
  .dr-brand-name { color:#fff; font-size:16px; font-weight:900; letter-spacing:-0.03em; }
  .dr-brand-sub { color:rgba(255,255,255,0.3); font-size:10px; margin-top:1px; }
  .dr-side-close { margin-left:auto; background:none; border:none; color:rgba(255,255,255,0.4); font-size:16px; cursor:pointer; display:none; padding:4px; }
  .dr-profile { display:flex; align-items:center; gap:10px; padding:13px 16px; border-bottom:1px solid rgba(255,255,255,0.07); }
  .dr-avatar { width:38px; height:38px; border-radius:50%; background:linear-gradient(135deg,#2d3436,#f39c12); border:2px solid rgba(243,156,18,0.35); display:flex; align-items:center; justify-content:center; color:#fff; font-size:14px; font-weight:800; flex-shrink:0; }
  .dr-profile-name { color:#e2e8f0; font-size:12px; font-weight:600; } .dr-profile-meta { color:rgba(255,255,255,0.3); font-size:10px; margin-top:2px; }
  .dr-duty { display:flex; align-items:center; gap:5px; background:rgba(22,163,74,0.12); border:1px solid rgba(134,239,172,0.22); border-radius:20px; padding:4px 9px; font-size:10px; font-weight:700; color:#4ade80; margin-left:auto; flex-shrink:0; }
  .dr-duty-dot { width:6px; height:6px; border-radius:50%; background:#4ade80; animation:pulse 2s infinite; }
  .dr-clock { padding:14px 16px 12px; border-bottom:1px solid rgba(255,255,255,0.06); text-align:center; }
  .dr-clock-time { color:#f39c12; font-size:19px; font-weight:900; letter-spacing:0.3px; line-height:1.3; word-break:keep-all; } .dr-clock-date { color:rgba(255,255,255,0.28); font-size:10px; margin-top:3px; }
  .dr-route-box { padding:14px 16px; border-bottom:1px solid rgba(255,255,255,0.06); }
  .dr-route-label { color:rgba(255,255,255,0.3); font-size:9px; font-weight:700; text-transform:uppercase; letter-spacing:1.2px; margin-bottom:5px; }
  .dr-route-name { color:#fff; font-size:13px; font-weight:700; margin-bottom:2px; } .dr-route-meta { color:rgba(255,255,255,0.3); font-size:10px; margin-bottom:11px; }
  .dr-prog-wrap { height:5px; background:rgba(255,255,255,0.07); border-radius:3px; overflow:hidden; margin-bottom:5px; }
  .dr-prog-fill { height:100%; background:linear-gradient(90deg,#f39c12,#fbbf24); border-radius:3px; transition:width 0.4s ease; }
  .dr-prog-label { color:rgba(255,255,255,0.3); font-size:9px; }
  .dr-sb-pills { padding:12px 16px; display:flex; flex-direction:column; gap:7px; border-bottom:1px solid rgba(255,255,255,0.06); }
  .dr-sb-pill { font-size:11px; font-weight:600; padding:5px 12px; border-radius:20px; text-align:center; }
  .dr-notified { display:flex; align-items:center; gap:6px; padding:10px 16px; font-size:10px; color:#4ade80; }
  .dr-notified-dot { width:6px; height:6px; border-radius:50%; background:#4ade80; flex-shrink:0; }
  .dr-tips { padding:14px 16px; margin:0 12px; background:rgba(243,156,18,0.07); border-radius:12px; border:1px solid rgba(243,156,18,0.15); }
  .dr-tips-title { color:#f39c12; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:1px; margin-bottom:10px; }
  .dr-tip-row { display:flex; gap:8px; align-items:flex-start; margin-bottom:8px; }
  .dr-tip-num { width:16px; height:16px; border-radius:50%; background:rgba(243,156,18,0.18); color:#f39c12; font-size:9px; font-weight:700; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:1px; }
  .dr-tip-text { font-size:11px; color:rgba(255,255,255,0.4); line-height:1.5; }
  .dr-main { flex:1; display:flex; flex-direction:column; min-width:0; }
  .dr-topbar { background:#fff; padding:0 24px; height:58px; display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid #e2e8f0; flex-shrink:0; gap:12px; }
  .dr-topbar-left { display:flex; align-items:center; gap:12px; min-width:0; }
  .dr-topbar-title { font-size:16px; font-weight:800; color:#0f172a; } .dr-topbar-sub { font-size:10px; color:#94a3b8; margin-top:1px; }
  .dr-topbar-right { display:flex; align-items:center; gap:8px; flex-shrink:0; }
  .dr-topbar-clock { font-size:11px; font-weight:700; color:#0f172a; background:#f8fafc; border:1px solid #e2e8f0; padding:5px 10px; border-radius:8px; white-space:nowrap; }
  .dr-topbar-pill { font-size:11px; font-weight:600; padding:5px 13px; border-radius:20px; white-space:nowrap; }
  .dr-lang-switch { display:flex; align-items:center; background:#f1f5f9; border:1px solid #e2e8f0; border-radius:8px; overflow:hidden; flex-shrink:0; }
  .dr-lang-btn { background:none; border:none; cursor:pointer; font-size:11px; font-weight:700; padding:5px 10px; color:#64748b; font-family:inherit; transition:all 0.15s; white-space:nowrap; }
  .dr-lang-btn:hover { color:#0f172a; }
  .dr-lang-active { background:#0f172a !important; color:#fff !important; border-radius:6px; }
  .dr-hamburger { display:none; flex-direction:column; gap:4px; background:none; border:none; cursor:pointer; padding:4px; flex-shrink:0; }
  .dr-hamburger span { display:block; width:20px; height:2px; background:#0f172a; border-radius:1px; }
  .dr-overlay { display:none; position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:99; }
  .dr-body { flex:1; overflow-y:auto; padding:20px 24px 32px; }
  .dr-stats { display:grid; grid-template-columns:repeat(5,1fr); gap:12px; margin-bottom:20px; }
  .dr-stat-card { background:#252d3a; border-radius:13px; padding:14px 16px; border:1px solid rgba(255,255,255,0.07); }
  .dr-stat-label { font-size:10px; color:rgba(255,255,255,0.4); font-weight:600; text-transform:uppercase; letter-spacing:0.6px; margin-bottom:8px; }
  .dr-stat-val { font-size:11px; font-weight:700; padding:4px 10px; border-radius:20px; display:inline-block; }
  .dr-grid { display:grid; grid-template-columns:252px 1fr 236px; gap:16px; align-items:start; }
  .dr-panel { background:#252d3a; border-radius:16px; padding:20px 18px; border:1px solid rgba(255,255,255,0.07); }
  .dr-stops { display:flex; flex-direction:column; }
  .dr-stop-row { display:flex; align-items:stretch; gap:10px; cursor:pointer; }
  .dr-stop-row:hover .dr-stop-content { background:rgba(243,156,18,0.1)!important; border-color:rgba(243,156,18,0.3)!important; }
  .dr-track-col { display:flex; flex-direction:column; align-items:center; width:18px; flex-shrink:0; padding-top:2px; }
  .dr-track-line { width:2px; height:14px; border-radius:1px; flex-shrink:0; }
  .dr-track-dot { width:14px; height:14px; border-radius:50%; flex-shrink:0; transition:all 0.22s; box-sizing:border-box; }
  .dr-stop-content { flex:1; display:flex; align-items:center; gap:8px; padding:6px 10px; border-radius:9px; margin:1px 0; transition:background 0.15s; min-width:0; }
  .dr-opt-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
  .dr-col2 { display:flex; flex-direction:column; gap:16px; } .dr-col3 { display:flex; flex-direction:column; gap:14px; }
  .dr-sel-card { border-radius:12px; padding:14px 10px; text-align:center; cursor:pointer; transition:all 0.18s; user-select:none; }
  .dr-sel-card:hover { transform:translateY(-2px); }
  .dr-note-strip { background:#fef3c7; border:1px solid #fcd34d; border-radius:12px; padding:12px 14px; font-size:12px; color:#92400e; line-height:1.5; }
  .dr-summary { background:linear-gradient(145deg,#1a1a2e 0%,#2d3436 100%); border-radius:16px; padding:20px 18px; }
  .dr-sum-head { display:flex; align-items:center; gap:8px; font-size:11px; font-weight:700; color:#f39c12; text-transform:uppercase; letter-spacing:1.2px; margin-bottom:16px; }
  .dr-sum-live-dot { width:7px; height:7px; border-radius:50%; background:#4ade80; animation:pulse 1.8s infinite; display:inline-block; }
  .dr-sum-row { display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.07); }
  .dr-sum-lbl { font-size:11px; color:rgba(255,255,255,0.42); flex-shrink:0; } .dr-sum-val { font-size:12px; font-weight:600; color:#fff; max-width:62%; text-align:right; word-break:break-word; }
  .dr-sum-badge { font-size:10px; font-weight:700; padding:3px 10px; border-radius:20px; }
  .dr-sum-updated { margin-top:12px; font-size:11px; color:#4ade80; text-align:center; }
  .dr-notify-btn { width:100%; color:#fff; border:none; border-radius:13px; padding:15px; font-size:14px; font-weight:800; cursor:pointer; transition:all 0.22s; font-family:inherit; }
  .dr-notify-btn:hover { transform:translateY(-2px); filter:brightness(1.08); }
  .dr-notify-hint { font-size:10px; color:#94a3b8; text-align:center; }
  .dr-watchers { display:flex; align-items:center; gap:12px; background:#fff; border:1px solid #e8edf4; border-radius:13px; padding:13px 15px; }
  .dr-watcher-ico { font-size:20px; } .dr-watcher-count { font-size:14px; font-weight:800; color:#0f172a; } .dr-watcher-sub { font-size:10px; color:#94a3b8; }
  .dr-live-tag { margin-left:auto; background:#fef3c7; color:#d97706; font-size:9px; font-weight:800; padding:3px 8px; border-radius:6px; letter-spacing:1px; border:1px solid #fcd34d; }

  @media(max-width:1200px){
    .dr-grid { grid-template-columns:220px 1fr 210px; gap:12px; }
    .dr-side { width:220px; }
  }
  @media(max-width:1100px){ .dr-stats { grid-template-columns:repeat(3,1fr); } }
  @media(max-width:960px){
    .dr-grid { grid-template-columns:1fr 1fr; }
    .dr-col3 { grid-column:1/-1; display:grid; grid-template-columns:1fr 1fr; gap:12px; }
    .dr-notify-btn,.dr-notify-hint { grid-column:1/-1; }
  }
  @media(max-width:768px){
    .dr-side { position:fixed; z-index:100; transform:translateX(-100%); height:100vh; top:0; left:0; width:270px!important; }
    .dr-side-open { transform:translateX(0)!important; }
    .dr-side-close { display:flex!important; }
    .dr-overlay { display:block!important; }
    .dr-hamburger { display:flex!important; }
    .dr-grid { grid-template-columns:1fr!important; }
    .dr-col3 { grid-template-columns:1fr!important; }
    .dr-stats { grid-template-columns:repeat(2,1fr)!important; }
    .dr-body { padding:14px 16px 28px; }
    .dr-topbar { padding:0 14px; height:54px; }
    .dr-topbar-sub { display:none; }
  }
  @media(max-width:600px){
    .dr-topbar-clock { display:none; }
    .dr-topbar-pill { display:none; }
    .dr-topbar-title { font-size:14px; }
    .dr-lang-btn { padding:5px 8px; font-size:10px; }
    .dr-opt-grid { grid-template-columns:1fr 1fr!important; }
  }
  @media(max-width:420px){
    .dr-stats { grid-template-columns:1fr 1fr!important; }
    .dr-body { padding:10px 10px 24px; }
    .dr-topbar { padding:0 10px; }
  }
  @media(max-width:340px){ .dr-stats { grid-template-columns:1fr!important; } }
`;