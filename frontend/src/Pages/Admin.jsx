import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const Icon = ({ d, size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const ICONS = {
  overview:  "M3 3h7v7H3zm11 0h7v7h-7zM3 14h7v7H3zm11 3a4 4 0 1 0 8 0 4 4 0 0 0-8 0",
  bus:       "M8 6v6m8-6v6M3 10h18M5 18H3v-1a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1h-2m-2 0v2a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-2m10 0H7M5 6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2",
  announce:  "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9m-4.27 13a2 2 0 0 1-3.46 0",
  complaint: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  lost:      "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z",
  plus:      "M12 5v14M5 12h14",
  menu:      "M3 12h18M3 6h18M3 18h18",
  close:     "M18 6 6 18M6 6l12 12",
  student:   "M12 2a5 5 0 1 0 0 10A5 5 0 0 0 12 2zm0 12c-5.33 0-8 2.67-8 4v2h16v-2c0-1.33-2.67-4-8-4z",
  driver:    "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z",
};

const T = {
  pageBg:   "#1a1f2e",
  sideGrad: "linear-gradient(180deg, #0f1219 0%, #141927 100%)",
  cardBg:   "#242b3d",
  cardBord: "rgba(255,255,255,0.07)",
  topbarBg: "#1e2536",
  orange:   "#f39c12",
  red:      "#E31E24",
  textPri:  "#e2e8f0",
  textMut:  "rgba(255,255,255,0.4)",
  textHint: "rgba(255,255,255,0.22)",
  divider:  "rgba(255,255,255,0.07)",
};

// ── Shared components ──
function Badge({ label, color, bg, border }) {
  return (
    <span style={{ fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:20, background:bg, color, border:`1px solid ${border}`, whiteSpace:"nowrap" }}>
      {label}
    </span>
  );
}

function CardHead({ title, sub, accent }) {
  return (
    <div style={{ marginBottom:16 }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:3 }}>
        <div style={{ width:3, height:16, borderRadius:2, background:accent??T.orange, flexShrink:0 }} />
        <span style={{ fontSize:14, fontWeight:700, color:T.textPri }}>{title}</span>
      </div>
      {sub && <span style={{ fontSize:12, color:T.textMut, paddingLeft:11 }}>{sub}</span>}
    </div>
  );
}

const darkInput = {
  border:`1.5px solid ${T.cardBord}`, borderRadius:8, padding:"9px 12px",
  fontSize:13, color:T.textPri, outline:"none",
  background:"rgba(255,255,255,0.06)", width:"100%", boxSizing:"border-box",
  fontFamily:"inherit"
};

const pBtn = (color) => ({
  display:"flex", alignItems:"center", gap:6,
  background:color, color:"#fff", border:"none",
  borderRadius:8, padding:"9px 16px", fontSize:13,
  fontWeight:600, cursor:"pointer",
  boxShadow:`0 3px 12px ${color}44`
});

function DTable({ heads, rows }) {
  return (
    <div style={{ borderRadius:14, overflow:"hidden", border:`1px solid ${T.cardBord}` }}>
      <table style={{ width:"100%", borderCollapse:"collapse" }}>
        <thead>
          <tr style={{ background:"rgba(255,255,255,0.04)" }}>
            {heads.map(h => (
              <th key={h} style={{ padding:"12px 16px", fontSize:10, fontWeight:700, color:T.textMut, textAlign:"left", whiteSpace:"nowrap", textTransform:"uppercase", letterSpacing:0.8, borderBottom:`1px solid ${T.divider}` }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

const tdS = { padding:"13px 16px", fontSize:13, color:T.textPri, verticalAlign:"middle", borderBottom:`1px solid ${T.divider}` };

// ── Charts ──
function BarChart({ data }) {
  const ref = useRef(null);
  const chartRef = useRef(null);
  useEffect(() => {
    let dead = false;
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js";
    s.onload = () => {
      if (dead || !ref.current) return;
      if (chartRef.current) chartRef.current.destroy();
      chartRef.current = new window.Chart(ref.current, {
        type:"bar",
        data:{ labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"], datasets:[{ label:"Complaints", data:data||[3,5,2,8,4,1,6], backgroundColor:"rgba(227,30,36,0.18)", borderColor:"#E31E24", borderWidth:2, borderRadius:6, borderSkipped:false }]},
        options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{display:false}, tooltip:{ backgroundColor:"#1a1f2e", titleColor:"#fff", bodyColor:"rgba(255,255,255,0.5)", padding:10, cornerRadius:8 }}, scales:{ x:{grid:{display:false},ticks:{color:"rgba(255,255,255,0.3)",font:{size:11}},border:{display:false}}, y:{grid:{color:"rgba(255,255,255,0.05)"},ticks:{color:"rgba(255,255,255,0.3)",font:{size:11},stepSize:2},border:{display:false}} }},
      });
    };
    document.head.appendChild(s);
    return () => { dead=true; if(chartRef.current){chartRef.current.destroy();chartRef.current=null;} };
  }, []);
  return (
    <div style={crd.chartCard}>
      <CardHead title="Weekly Complaints" sub="Complaints received this week" accent="#E31E24" />
      <div style={{ height:200 }}><canvas ref={ref} /></div>
    </div>
  );
}

function DoughnutChart({ active, total }) {
  const ref = useRef(null);
  const chartRef = useRef(null);
  useEffect(() => {
    let dead = false;
    function draw() {
      if (dead||!ref.current||!window.Chart){if(!window.Chart)setTimeout(draw,200);return;}
      if (chartRef.current) chartRef.current.destroy();
      chartRef.current = new window.Chart(ref.current, {
        type:"doughnut",
        data:{ labels:["Active","Inactive"], datasets:[{ data:[active||0,(total||0)-(active||0)], backgroundColor:["rgba(34,197,94,0.2)","rgba(148,163,184,0.15)"], borderColor:["#22c55e","#94a3b8"], borderWidth:2, hoverOffset:6 }]},
        options:{ responsive:true, maintainAspectRatio:false, cutout:"68%", plugins:{ legend:{ position:"bottom", labels:{ padding:16, color:"rgba(255,255,255,0.5)", font:{size:12}, usePointStyle:true, pointStyleWidth:8 }}, tooltip:{ backgroundColor:"#1a1f2e", titleColor:"#fff", bodyColor:"rgba(255,255,255,0.5)", padding:10, cornerRadius:8 } } },
      });
    }
    window.Chart?draw():setTimeout(draw,200);
    return () => { dead=true; if(chartRef.current){chartRef.current.destroy();chartRef.current=null;} };
  }, [active, total]);
  return (
    <div style={crd.chartCard}>
      <CardHead title="Bus Status Breakdown" sub="Active vs inactive" accent="#22c55e" />
      <div style={{ height:200 }}><canvas ref={ref} /></div>
    </div>
  );
}


function Overview({ setActive }) {
  const [stats, setStats]           = useState({ buses:0, active:0, complaints:0, announcements:0, registeredStudents:0, lostItems:0 });
  const [buses, setBuses]           = useState([]);
  const [showStudents, setShowStudents] = useState(false);
  const [showActiveBuses, setShowActiveBuses] = useState(false);
  const [registeredStudents, setRegisteredStudents] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [b, c, a, s, l] = await Promise.all([
          axios.get(`${API}/api/buses`),
          axios.get(`${API}/api/complaints`),
          axios.get(`${API}/api/announcements`),
          axios.get(`${API}/api/admin/students`),
          axios.get(`${API}/api/lostfound`),
        ]);
        setBuses(b.data);
        // Only students who have isRegistered = true
        const registered = s.data.filter(st => st.isRegistered === true);
        setRegisteredStudents(registered);
        setStats({
          buses:              b.data.length,
          active:             b.data.filter(x => x.isActive).length,
          complaints:         c.data.filter(x => x.status === "Pending").length,
          announcements:      a.data.length,
          registeredStudents: registered.length,
          lostItems:          l.data.filter(x => x.status === "Lost").length,
        });
      } catch(err) { console.error(err); }
    };
    fetchAll();
  }, []);

  const STATS_CARDS = [
    { label:"Total Buses",          value:stats.buses,              color:"#f39c12", light:"rgba(243,156,18,0.12)",  border:"rgba(243,156,18,0.3)",  action: () => setActive("buses")      },
    { label:"Active Now",           value:stats.active,             color:"#22c55e", light:"rgba(34,197,94,0.12)",   border:"rgba(34,197,94,0.3)",   action: () => setShowActiveBuses(v=>!v) },
    { label:"Pending Complaints",   value:stats.complaints,         color:"#E31E24", light:"rgba(227,30,36,0.12)",   border:"rgba(227,30,36,0.3)",   action: () => setActive("complaints") },
    { label:"Announcements",        value:stats.announcements,      color:"#60a5fa", light:"rgba(96,165,250,0.12)",  border:"rgba(96,165,250,0.3)",  action: () => setActive("announce")   },
    { label:"Registered Students",  value:stats.registeredStudents, color:"#a78bfa", light:"rgba(167,139,250,0.12)", border:"rgba(167,139,250,0.3)", action: () => setShowStudents(v=>!v)  },
    { label:"Active Lost Items",    value:stats.lostItems,          color:"#fb923c", light:"rgba(251,146,60,0.12)",  border:"rgba(251,146,60,0.3)",  action: () => setActive("lostfound")  },
  ];

  const STATUS_MAP = {
    true:  { label:"Active",   color:"#22c55e", bg:"rgba(34,197,94,0.12)",   border:"rgba(34,197,94,0.3)"   },
    false: { label:"Inactive", color:"#94a3b8", bg:"rgba(148,163,184,0.12)", border:"rgba(148,163,184,0.3)" },
  };
  const CROWD_MAP = {
    "Seats Available": { label:"Seats Available", color:"#22c55e", bg:"rgba(34,197,94,0.12)",  border:"rgba(34,197,94,0.3)"  },
    "Standing Only":   { label:"Standing Only",   color:"#f39c12", bg:"rgba(243,156,18,0.12)", border:"rgba(243,156,18,0.3)" },
    "Overcrowded":     { label:"Overcrowded",     color:"#E31E24", bg:"rgba(227,30,36,0.12)",  border:"rgba(227,30,36,0.3)"  },
    "Unknown":         { label:"Unknown",         color:"#94a3b8", bg:"rgba(148,163,184,0.12)",border:"rgba(148,163,184,0.3)"},
  };

  const activeBuses = buses.filter(b => b.isActive === true || b.isActive === "true");

  return (
    <div>
      {/* Stat cards */}
      <div className="ad-stats-grid">
        {STATS_CARDS.map(st => (
          <div key={st.label}
            style={{ ...crd.statCard, borderTop:`3px solid ${st.color}`, cursor:"pointer" }}
            onClick={st.action}>
            <div style={{ fontSize:32, fontWeight:900, color:st.color, lineHeight:1 }}>{st.value}</div>
            <div style={{ fontSize:13, fontWeight:700, color:T.textPri, marginTop:6 }}>{st.label}</div>
          </div>
        ))}
      </div>

      {/* Active buses panel — shows when "Active Now" is clicked */}
      {showActiveBuses && (
        <div style={{ ...crd.card, marginBottom:16, borderLeft:`3px solid #22c55e` }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <CardHead title={`🟢 Active Buses (${activeBuses.length})`} sub="Buses currently on the road" accent="#22c55e" />
            <button onClick={() => setShowActiveBuses(false)}
              style={{ background:"rgba(255,255,255,0.06)", border:"none", color:T.textMut, borderRadius:6, padding:"4px 10px", cursor:"pointer", fontSize:12 }}>
              ✕ Close
            </button>
          </div>
          {activeBuses.length === 0 ? (
            <div style={{ textAlign:"center", padding:24, color:T.textMut, fontSize:13 }}>
              No buses are active right now.
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {activeBuses.map((bus, i) => {
                const cr = CROWD_MAP[bus.crowdStatus] || CROWD_MAP["Unknown"];
                return (
                  <div key={bus._id} style={{ display:"flex", alignItems:"center", gap:14, padding:"11px 16px", borderRadius:10, background:i%2===0?"rgba(255,255,255,0.03)":"transparent", border:`1px solid ${T.divider}` }}>
                    <span style={{ fontWeight:800, color:"#22c55e", fontSize:13, minWidth:70, background:"rgba(34,197,94,0.12)", padding:"3px 8px", borderRadius:6, border:"1px solid rgba(34,197,94,0.3)" }}>
                      {bus.busNumber}
                    </span>
                    <span style={{ fontSize:13, color:T.textMut, flex:1 }}>{bus.route}</span>
                    <span style={{ fontSize:12, color:T.textHint }} className="ad-hide-sm">📍 {bus.currentLocation}</span>
                    <span style={{ fontSize:12, color:T.textHint }} className="ad-hide-sm">👤 {bus.driverName}</span>
                    <Badge {...cr} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Registered students panel — shows when "Registered Students" is clicked */}
      {showStudents && (
        <div style={{ ...crd.card, marginBottom:16, borderLeft:`3px solid #a78bfa` }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <CardHead title={`🎓 Registered Students (${registeredStudents.length})`} sub="Students who have completed registration" accent="#a78bfa" />
            <button onClick={() => setShowStudents(false)}
              style={{ background:"rgba(255,255,255,0.06)", border:"none", color:T.textMut, borderRadius:6, padding:"4px 10px", cursor:"pointer", fontSize:12 }}>
              ✕ Close
            </button>
          </div>
          {registeredStudents.length === 0 ? (
            <div style={{ textAlign:"center", padding:24, color:T.textMut, fontSize:13 }}>
              No students have registered yet.
            </div>
          ) : (
            <DTable
              heads={["Name", "Student ID", "Phone"]}
              rows={registeredStudents.map((s, i) => (
                <tr key={s._id} style={{ background:i%2===0?"rgba(255,255,255,0.02)":"transparent" }}>
                  <td style={tdS}><span style={{ fontWeight:600 }}>🎓 {s.name}</span></td>
                  <td style={{ ...tdS, color:T.textMut }}>{s.studentId}</td>
                  <td style={{ ...tdS, color:T.textMut }}>{s.phone}</td>
                </tr>
              ))}
            />
          )}
        </div>
      )}

      {/* Charts */}
      <div className="ad-charts-grid">
        <BarChart />
        <DoughnutChart active={stats.active} total={stats.buses} />
      </div>

      {/* Live bus summary */}
      <div style={crd.card}>
        <CardHead title="Live Bus Summary" sub="Real-time status of all buses" />
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {buses.map((bus, i) => {
            const st = STATUS_MAP[String(bus.isActive)] || STATUS_MAP["false"];
            const cr = CROWD_MAP[bus.crowdStatus] || CROWD_MAP["Unknown"];
            return (
              <div key={bus._id} style={{ display:"flex", alignItems:"center", gap:14, padding:"11px 16px", borderRadius:10, background:i%2===0?"rgba(255,255,255,0.03)":"transparent", border:`1px solid ${T.divider}` }}>
                <span style={{ fontWeight:800, color:T.orange, fontSize:13, minWidth:70, background:"rgba(243,156,18,0.12)", padding:"3px 8px", borderRadius:6, border:"1px solid rgba(243,156,18,0.3)" }}>
                  {bus.busNumber}
                </span>
                <span style={{ fontSize:13, color:T.textMut, flex:1 }}>{bus.route}</span>
                <span style={{ fontSize:12, color:T.textHint }} className="ad-hide-sm">{bus.driverName}</span>
                <Badge {...st} />
                <Badge {...cr} />
              </div>
            );
          })}
          {buses.length === 0 && <div style={{ textAlign:"center", padding:24, color:T.textMut, fontSize:13 }}>No buses found.</div>}
        </div>
      </div>
    </div>
  );
}

function BusManagement() {
  const [buses, setBuses]     = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm]       = useState({ busNumber:"", busType:"Metro", route:"", driverName:"", departureTime:"", serviceType:"Regular" });
  const [saving, setSaving]   = useState(false);

  const fetchBuses = () => axios.get(`${API}/api/buses`).then(r => setBuses(r.data));
  useEffect(() => { fetchBuses(); }, []);

  const handleSubmit = async () => {
    if (!form.busNumber||!form.route||!form.driverName) return alert("Bus number, route and driver are required.");
    setSaving(true);
    try {
      await axios.post(`${API}/api/buses`, form);
      setForm({ busNumber:"", busType:"Metro", route:"", driverName:"", departureTime:"", serviceType:"Regular" });
      setShowForm(false);
      fetchBuses();
    } catch { alert("Failed to add bus."); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this bus?")) return;
    await axios.delete(`${API}/api/buses/${id}`);
    fetchBuses();
  };

  const STATUS_MAP = {
    true:  { label:"Active",   color:"#22c55e", bg:"rgba(34,197,94,0.12)",   border:"rgba(34,197,94,0.3)"   },
    false: { label:"Inactive", color:"#94a3b8", bg:"rgba(148,163,184,0.12)", border:"rgba(148,163,184,0.3)" },
  };

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
        <div style={{ fontSize:18, fontWeight:800, color:T.textPri }}>Bus & Route Management</div>
        <button onClick={() => setShowForm(v=>!v)} style={pBtn("#f39c12")}>
          <Icon d={ICONS.plus} size={15} color="#fff" />
          {showForm ? "Cancel" : "Add Bus"}
        </button>
      </div>

      {showForm && (
        <div style={{ ...crd.card, marginBottom:20 }}>
          <CardHead title="Add New Bus" sub="Fill in the details" accent="#f39c12" />
          <div className="ad-form-grid">
            {[
              ["Bus Number","busNumber","e.g. 11-001b"],
              ["Driver Name","driverName","e.g. Sajib"],
              ["Departure Time","departureTime","e.g. 08:10"],
            ].map(([lbl,key,ph]) => (
              <div key={key}>
                <div style={{ fontSize:12, fontWeight:600, color:T.textMut, marginBottom:6 }}>{lbl}</div>
                <input placeholder={ph} value={form[key]}
                  onChange={e => setForm(f=>({...f,[key]:e.target.value}))} style={darkInput} />
              </div>
            ))}
            <div>
              <div style={{ fontSize:12, fontWeight:600, color:T.textMut, marginBottom:6 }}>Bus Type</div>
              <select value={form.busType} onChange={e=>setForm(f=>({...f,busType:e.target.value}))} style={darkInput}>
                <option>Metro</option><option>BRTC</option>
              </select>
            </div>
            <div>
              <div style={{ fontSize:12, fontWeight:600, color:T.textMut, marginBottom:6 }}>Service Type</div>
              <select value={form.serviceType} onChange={e=>setForm(f=>({...f,serviceType:e.target.value}))} style={darkInput}>
                <option>Regular</option>
                <option>Tilagor Shuttle</option>
                <option>Rickabibazar Shuttle</option>
                <option>Darbesht Shuttle</option>
              </select>
            </div>
          </div>
          <div style={{ marginTop:12 }}>
            <div style={{ fontSize:12, fontWeight:600, color:T.textMut, marginBottom:6 }}>Route</div>
            <input placeholder="Full route e.g. Medina Market, Amberkhana → Campus"
              value={form.route} onChange={e=>setForm(f=>({...f,route:e.target.value}))} style={darkInput} />
          </div>
          <div style={{ display:"flex", gap:10, marginTop:16 }}>
            <button onClick={handleSubmit} style={pBtn("#22c55e")} disabled={saving}>
              {saving ? "Saving..." : "Save Bus"}
            </button>
          </div>
        </div>
      )}

      <div style={{ ...crd.card, padding:0, overflow:"hidden" }}>
        <DTable
          heads={["Bus No.","Route","Driver","Type","Status","Action"]}
          rows={buses.map((bus,i) => {
            const st = STATUS_MAP[String(bus.isActive)] || STATUS_MAP["false"];
            return (
              <tr key={bus._id} style={{ background:i%2===0?"rgba(255,255,255,0.02)":"transparent" }}>
                <td style={tdS}><span style={{ fontWeight:800, color:T.orange, background:"rgba(243,156,18,0.12)", padding:"3px 10px", borderRadius:6, fontSize:12, border:"1px solid rgba(243,156,18,0.3)" }}>{bus.busNumber}</span></td>
                <td style={{ ...tdS, maxWidth:200, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{bus.route}</td>
                <td style={{ ...tdS, color:T.textMut }} className="ad-hide-sm">{bus.driverName}</td>
                <td style={tdS}><span style={{ fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:10, background:bus.busType==="BRTC"?"rgba(251,146,60,0.12)":"rgba(96,165,250,0.12)", color:bus.busType==="BRTC"?"#fb923c":"#60a5fa", border:`1px solid ${bus.busType==="BRTC"?"rgba(251,146,60,0.3)":"rgba(96,165,250,0.3)"}` }}>{bus.busType}</span></td>
                <td style={tdS}><Badge {...st} /></td>
                <td style={tdS}><button onClick={()=>handleDelete(bus._id)} style={{ fontSize:11, fontWeight:700, color:"#E31E24", background:"rgba(227,30,36,0.12)", border:"none", borderRadius:6, padding:"5px 12px", cursor:"pointer" }}>Delete</button></td>
              </tr>
            );
          })}
        />
        {buses.length === 0 && <div style={{ textAlign:"center", padding:32, color:T.textMut, fontSize:13 }}>No buses yet. Add one above.</div>}
      </div>
    </div>
  );
}

function DriversStudents() {
  const [drivers, setDrivers]   = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [dForm, setDForm]       = useState({ name:"", username:"", password:"" });
  const [saving, setSaving]     = useState(false);

  const fetchDrivers = () => axios.get(`${API}/api/admin/drivers`).then(r => setDrivers(r.data));
  useEffect(() => { fetchDrivers(); }, []);

  const handleAddDriver = async () => {
    if (!dForm.name||!dForm.username||!dForm.password) return alert("All fields required.");
    setSaving(true);
    try {
      await axios.post(`${API}/api/admin/drivers`, dForm);
      setDForm({ name:"", username:"", password:"" });
      setShowForm(false);
      fetchDrivers();
    } catch(err) { alert(err.response?.data?.message || "Failed."); }
    finally { setSaving(false); }
  };

  const handleDeleteDriver = async (id) => {
    if (!window.confirm("Delete this driver?")) return;
    await axios.delete(`${API}/api/admin/drivers/${id}`);
    fetchDrivers();
  };

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
        <div style={{ fontSize:18, fontWeight:800, color:T.textPri }}>👤 Manage Drivers</div>
        <button onClick={() => setShowForm(v=>!v)} style={pBtn("#60a5fa")}>
          <Icon d={ICONS.plus} size={15} color="#fff" />
          {showForm ? "Cancel" : "Add Driver"}
        </button>
      </div>

      {showForm && (
        <div style={{ ...crd.card, marginBottom:20 }}>
          <CardHead title="Add New Driver" sub="Driver will use these credentials to login" accent="#60a5fa" />
          <div className="ad-form-grid">
            {[
              ["Full Name",  "name",     "e.g. Sajib"],
              ["Username",   "username", "e.g. driver_sajib"],
              ["Password",   "password", "Set a password"],
            ].map(([lbl, key, ph]) => (
              <div key={key}>
                <div style={{ fontSize:12, fontWeight:600, color:T.textMut, marginBottom:6 }}>{lbl}</div>
                <input
                  type={key === "password" ? "password" : "text"}
                  placeholder={ph}
                  value={dForm[key]}
                  onChange={e => setDForm(f => ({...f, [key]: e.target.value}))}
                  style={darkInput}
                />
              </div>
            ))}
          </div>
          <button onClick={handleAddDriver} style={{ ...pBtn("#22c55e"), marginTop:14 }} disabled={saving}>
            {saving ? "Saving..." : "Add Driver"}
          </button>
        </div>
      )}

      <div style={{ ...crd.card, padding:0, overflow:"hidden" }}>
        <DTable
          heads={["Name", "Username", "Role", "Action"]}
          rows={drivers.map((d, i) => (
            <tr key={d._id} style={{ background:i%2===0?"rgba(255,255,255,0.02)":"transparent" }}>
              <td style={tdS}><span style={{ fontWeight:600 }}>👤 {d.name}</span></td>
              <td style={{ ...tdS, color:T.textMut }}>{d.username}</td>
              <td style={tdS}>
                <Badge label="Driver" color="#60a5fa" bg="rgba(96,165,250,0.12)" border="rgba(96,165,250,0.3)" />
              </td>
              <td style={tdS}>
                <button
                  onClick={() => handleDeleteDriver(d._id)}
                  style={{ fontSize:11, fontWeight:700, color:"#E31E24", background:"rgba(227,30,36,0.12)", border:"none", borderRadius:6, padding:"5px 12px", cursor:"pointer" }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        />
        {drivers.length === 0 && (
          <div style={{ textAlign:"center", padding:32, color:T.textMut, fontSize:13 }}>
            No drivers yet. Add one above.
          </div>
        )}
      </div>
    </div>
  );
}

function Announcements() {
  const [items, setItems]     = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle]     = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage]     = useState(null);
  const [saving, setSaving]   = useState(false);

  const fetch = () => axios.get(`${API}/api/announcements`).then(r => setItems(r.data));
  useEffect(() => { fetch(); }, []);

  const handleSubmit = async () => {
    if (!title.trim()||!message.trim()) return alert("Title and message required.");
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("title", title); fd.append("message", message); fd.append("postedBy","Admin");
      if (image) fd.append("image", image);
      await axios.post(`${API}/api/announcements`, fd, { headers:{ "Content-Type":"multipart/form-data" } });
      setTitle(""); setMessage(""); setImage(null);
      setShowForm(false); fetch();
    } catch { alert("Failed to post."); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this announcement?")) return;
    await axios.delete(`${API}/api/announcements/${id}`);
    fetch();
  };

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
        <div style={{ fontSize:18, fontWeight:800, color:T.textPri }}>Announcements</div>
        <button onClick={()=>setShowForm(v=>!v)} style={pBtn("#E31E24")}>
          <Icon d={ICONS.plus} size={15} color="#fff" />
          {showForm?"Cancel":"Post Notice"}
        </button>
      </div>

      {showForm && (
        <div style={{ ...crd.card, marginBottom:20 }}>
          <CardHead title="New Announcement" accent="#E31E24" />
          <div style={{ marginBottom:12 }}>
            <div style={{ fontSize:12, fontWeight:600, color:T.textMut, marginBottom:6 }}>Title</div>
            <input placeholder="Announcement title" value={title}
              onChange={e=>setTitle(e.target.value)} style={darkInput} />
          </div>
          <div style={{ marginBottom:12 }}>
            <div style={{ fontSize:12, fontWeight:600, color:T.textMut, marginBottom:6 }}>Message</div>
            <textarea placeholder="Write your announcement..." value={message}
              onChange={e=>setMessage(e.target.value)} rows={4}
              style={{ ...darkInput, resize:"vertical" }} />
          </div>
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:12, fontWeight:600, color:T.textMut, marginBottom:6 }}>Attach Image (optional)</div>
            <input type="file" accept="image/*" onChange={e=>setImage(e.target.files[0])}
              style={{ color:T.textMut, fontSize:13 }} />
          </div>
          <button onClick={handleSubmit} style={pBtn("#22c55e")} disabled={saving}>
            {saving?"Posting...":"Post Announcement"}
          </button>
        </div>
      )}

      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {items.map(item => (
          <div key={item._id} style={{ ...crd.card, padding:"16px 20px", borderLeft:"4px solid #E31E24" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12 }}>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:7 }}>
                  <Badge label="Notice" color="#60a5fa" bg="rgba(96,165,250,0.12)" border="rgba(96,165,250,0.3)" />
                  <span style={{ fontSize:11, color:T.textHint }}>
                    {new Date(item.createdAt).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}
                  </span>
                </div>
                <div style={{ fontSize:14, color:T.textPri, fontWeight:700, marginBottom:6 }}>{item.title}</div>
                <div style={{ fontSize:13, color:T.textMut, lineHeight:1.5 }}>{item.message}</div>
                {item.imageUrl && (
                  <img src={`${API}${item.imageUrl}`} alt="Notice"
                    style={{ maxWidth:200, borderRadius:8, marginTop:10, border:`1px solid ${T.cardBord}` }} />
                )}
              </div>
              <button onClick={()=>handleDelete(item._id)}
                style={{ fontSize:11, fontWeight:700, color:"#E31E24", background:"rgba(227,30,36,0.12)", border:"none", borderRadius:6, padding:"5px 12px", cursor:"pointer", flexShrink:0 }}>
                Delete
              </button>
            </div>
          </div>
        ))}
        {items.length===0 && <div style={{ ...crd.card, textAlign:"center", padding:40, color:T.textMut, fontSize:13 }}>No announcements yet.</div>}
      </div>
    </div>
  );
}

function Complaints() {
  const [items, setItems]   = useState([]);
  const [replies, setReplies] = useState({});
  const [saving, setSaving] = useState(null);

  const fetch = () => axios.get(`${API}/api/complaints`).then(r => setItems(r.data));
  useEffect(() => { fetch(); }, []);

  const handleReply = async (id) => {
    if (!replies[id]?.trim()) return alert("Write a reply first.");
    setSaving(id);
    try {
      await axios.patch(`${API}/api/complaints/${id}/reply`, { adminReply:replies[id], status:"Reviewed" });
      fetch();
    } catch { alert("Failed."); }
    finally { setSaving(null); }
  };

  const handleResolve = async (id) => {
    await axios.patch(`${API}/api/complaints/${id}/reply`, { status:"Resolved" });
    fetch();
  };

  const CM = {
    "Pending":  { label:"Pending",  color:"#E31E24", bg:"rgba(227,30,36,0.12)",   border:"rgba(227,30,36,0.3)"   },
    "Reviewed": { label:"Reviewed", color:"#f39c12", bg:"rgba(243,156,18,0.12)",  border:"rgba(243,156,18,0.3)"  },
    "Resolved": { label:"Resolved", color:"#22c55e", bg:"rgba(34,197,94,0.12)",   border:"rgba(34,197,94,0.3)"   },
  };

  return (
    <div>
      <div style={{ fontSize:18, fontWeight:800, color:T.textPri, marginBottom:8 }}>Complaints & Feedback</div>
      <div style={{ fontSize:13, color:T.textMut, marginBottom:20 }}>
        {items.filter(c=>c.status==="Pending").length} pending · {items.length} total
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        {items.map(item => {
          const st = CM[item.status] || CM["Pending"];
          return (
            <div key={item._id} style={{ ...crd.card, borderLeft:"4px solid #E31E24" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:16, marginBottom:12 }}>
                <div>
                  <span style={{ fontSize:13, fontWeight:700, color:T.textPri }}>🎓 {item.studentName}</span>
                  <span style={{ fontSize:11, color:T.textHint, marginLeft:8 }}>· {item.studentId}</span>
                  <span style={{ fontSize:11, color:T.textHint, marginLeft:8 }}>· {new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
                <Badge {...st} />
              </div>
              <div style={{ background:"rgba(255,255,255,0.04)", borderRadius:8, padding:"10px 14px", fontSize:13, color:T.textMut, marginBottom:12, lineHeight:1.5 }}>
                {item.message}
              </div>
              {item.adminReply && (
                <div style={{ background:"rgba(34,197,94,0.08)", borderRadius:8, padding:"10px 14px", fontSize:13, color:"#4ade80", marginBottom:12, border:"1px solid rgba(34,197,94,0.2)" }}>
                  💬 Your reply: {item.adminReply}
                </div>
              )}
              {item.status !== "Resolved" && (
                <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                  <input style={{ ...darkInput, flex:1 }}
                    placeholder="Write a reply to this student..."
                    value={replies[item._id]||""}
                    onChange={e=>setReplies({...replies,[item._id]:e.target.value})} />
                  <button onClick={()=>handleReply(item._id)} style={pBtn("#f39c12")} disabled={saving===item._id}>
                    {saving===item._id?"Sending...":"Reply"}
                  </button>
                  <button onClick={()=>handleResolve(item._id)}
                    style={{ ...pBtn("#22c55e"), boxShadow:"none" }}>
                    Resolve
                  </button>
                </div>
              )}
            </div>
          );
        })}
        {items.length===0 && <div style={{ ...crd.card, textAlign:"center", padding:40, color:T.textMut, fontSize:13 }}>No complaints yet.</div>}
      </div>
    </div>
  );
}

function LostFound() {
  const [items, setItems] = useState([]);

  const fetch = () => axios.get(`${API}/api/lostfound`).then(r => setItems(r.data));
  useEffect(() => { fetch(); }, []);

  const handleStatus = async (id, status) => {
    await axios.patch(`${API}/api/lostfound/${id}/status`, { status });
    fetch();
  };

  const SM = {
    "Lost":     { label:"Lost",     color:"#E31E24", bg:"rgba(227,30,36,0.12)",   border:"rgba(227,30,36,0.3)"   },
    "Found":    { label:"Found",    color:"#f39c12", bg:"rgba(243,156,18,0.12)",  border:"rgba(243,156,18,0.3)"  },
    "Returned": { label:"Returned", color:"#22c55e", bg:"rgba(34,197,94,0.12)",   border:"rgba(34,197,94,0.3)"   },
  };

  return (
    <div>
      <div style={{ fontSize:18, fontWeight:800, color:T.textPri, marginBottom:8 }}>Lost & Found</div>
      <div style={{ fontSize:13, color:T.textMut, marginBottom:20 }}>
        {items.filter(i=>i.status==="Lost").length} active · {items.length} total
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        {items.map(item => {
          const st = SM[item.status] || SM["Lost"];
          return (
            <div key={item._id} style={{ ...crd.card, borderLeft:"4px solid #a78bfa" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                <div style={{ fontSize:15, fontWeight:700, color:T.textPri }}>🎒 {item.itemName}</div>
                <Badge {...st} />
              </div>
              <div style={{ fontSize:13, color:T.textMut, lineHeight:1.5, marginBottom:10 }}>{item.description}</div>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:12 }}>
                {[
                  `👤 ${item.studentName}`,
                  `📞 ${item.contact}`,
                  item.busNumber && `🚌 ${item.busNumber}`,
                  `📅 ${item.dateLost}`,
                ].filter(Boolean).map((tag,i) => (
                  <span key={i} style={{ fontSize:11, background:"rgba(255,255,255,0.06)", color:T.textMut, padding:"3px 8px", borderRadius:6, border:`1px solid ${T.cardBord}` }}>{tag}</span>
                ))}
              </div>
              {item.status !== "Returned" && (
                <div style={{ display:"flex", gap:8 }}>
                  {item.status==="Lost" && (
                    <button onClick={()=>handleStatus(item._id,"Found")} style={pBtn("#f39c12")}>Mark as Found</button>
                  )}
                  <button onClick={()=>handleStatus(item._id,"Returned")} style={pBtn("#22c55e")}>Mark as Returned</button>
                </div>
              )}
            </div>
          );
        })}
        {items.length===0 && <div style={{ ...crd.card, textAlign:"center", padding:40, color:T.textMut, fontSize:13 }}>No lost items yet.</div>}
      </div>
    </div>
  );
}

const NAV = [
  { key:"overview",   label:"Overview",       icon:ICONS.overview   },
  { key:"buses",      label:"Buses & Routes", icon:ICONS.bus        },
  { key:"people",     label:"Drivers",        icon:ICONS.driver     },  
  { key:"announce",   label:"Announcements",  icon:ICONS.announce   },
  { key:"complaints", label:"Complaints",     icon:ICONS.complaint  },
  { key:"lostfound",  label:"Lost & Found",   icon:ICONS.lost       },
];

export default function AdminDashboard() {
  const navigate   = useNavigate();
  const [user, setUser]         = useState(null);
  const [active, setActive]     = useState("overview");
  const [sideOpen, setSideOpen] = useState(false);
  const [time, setTime]         = useState(new Date());

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) { navigate("/login"); return; }
    const parsed = JSON.parse(savedUser);
    if (parsed.role !== "admin") { navigate("/login"); return; }
    setUser(parsed);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const PAGES = {
    overview:   <Overview setActive={setActive} />,
    buses:      <BusManagement />,
    people:     <DriversStudents />,
    announce:   <Announcements />,
    complaints: <Complaints />,
    lostfound:  <LostFound />,
  };

  const current = NAV.find(n => n.key === active);
  if (!user) return null;

  return (
    <div className="ad-root">
      <style>{CSS}</style>

      {sideOpen && <div className="ad-overlay" onClick={()=>setSideOpen(false)} />}

      <aside className={`ad-side ${sideOpen?"ad-side-open":""}`}>
        <div className="ad-brand">
          <span className="ad-brand-dot" />
          <div>
            <div className="ad-brand-name">BusVoyage</div>
            <div className="ad-brand-sub">Admin Control Panel</div>
          </div>
          <button className="ad-side-close" onClick={()=>setSideOpen(false)}>
            <Icon d={ICONS.close} size={16} color="rgba(255,255,255,0.5)" />
          </button>
        </div>

        <nav className="ad-nav">
          <div className="ad-nav-label">Navigation</div>
          {NAV.map(item => {
            const on = active===item.key;
            return (
              <div key={item.key}
                className={`ad-nav-item ${on?"ad-nav-active":""}`}
                onClick={()=>{ setActive(item.key); setSideOpen(false); }}>
                <Icon d={item.icon} size={16} color={on?"#fff":"rgba(255,255,255,0.45)"} />
                <span>{item.label}</span>
              </div>
            );
          })}
        </nav>

        <div style={{ flex:1 }} />

        <div className="ad-profile">
          <div className="ad-avatar">AD</div>
          <div>
            <div className="ad-profile-name">{user.name}</div>
            <div className="ad-profile-sub">Transport Dept.</div>
          </div>
          <span className="ad-online-dot" />
        </div>

        <div style={{ padding:"12px 16px", borderTop:`1px solid ${T.divider}` }}>
          <button onClick={handleLogout}
            style={{ width:"100%", padding:9, background:"transparent", border:`1px solid ${T.cardBord}`, color:T.textMut, borderRadius:8, cursor:"pointer", fontSize:13 }}>
            ↪ Logout
          </button>
        </div>
      </aside>

      <div className="ad-main">
        <header className="ad-topbar">
          <div className="ad-topbar-left">
            <button className="ad-hamburger" onClick={()=>setSideOpen(true)}>
              <Icon d={ICONS.menu} size={20} color={T.textPri} />
            </button>
            <div>
              <div className="ad-topbar-crumb">Metropolitan University · Transport</div>
              <div className="ad-topbar-title">{current?.label}</div>
            </div>
          </div>
          <div className="ad-topbar-right">
            <div className="ad-online-pill">
              <span className="ad-online-dot" />
              System Online
            </div>
            <div className="ad-date-pill">
              {time.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})} · {time.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}
            </div>
          </div>
        </header>

        <div className="ad-body">
          {PAGES[active]}
        </div>
      </div>
    </div>
  );
}

const crd = {
  card:      { background:T.cardBg, borderRadius:14, padding:"20px 22px", border:`1px solid ${T.cardBord}`, marginBottom:16 },
  statCard:  { background:T.cardBg, borderRadius:14, padding:"18px 20px", border:`1px solid ${T.cardBord}` },
  chartCard: { background:T.cardBg, borderRadius:14, padding:"20px 22px", border:`1px solid ${T.cardBord}` },
};

const CSS = `
  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.3} }
  @keyframes spin { to{transform:rotate(360deg)} }

  .ad-root { display:flex; min-height:100vh; font-family:'Inter','Segoe UI',system-ui,sans-serif; background:${T.pageBg}; }
  .ad-side { width:230px; background:${T.sideGrad}; display:flex; flex-direction:column; flex-shrink:0; height:100vh; position:sticky; top:0; overflow-y:auto; border-right:1px solid ${T.divider}; transition:transform 0.28s cubic-bezier(0.4,0,0.2,1); }
  .ad-side::-webkit-scrollbar{width:3px;} .ad-side::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.08);border-radius:3px;}
  .ad-side-close{display:none;background:none;border:none;cursor:pointer;margin-left:auto;padding:4px;}
  .ad-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:99;}
  .ad-brand{display:flex;align-items:center;gap:10px;padding:20px 18px 16px;border-bottom:1px solid ${T.divider};}
  .ad-brand-dot{width:9px;height:9px;border-radius:50%;background:${T.red};flex-shrink:0;animation:pulse 2.5s infinite;}
  .ad-brand-name{color:#fff;font-size:16px;font-weight:900;letter-spacing:-0.03em;}
  .ad-brand-sub{color:${T.textHint};font-size:10px;margin-top:1px;}
  .ad-nav{padding:16px 12px;flex:1;}
  .ad-nav-label{font-size:9px;font-weight:700;color:${T.textHint};text-transform:uppercase;letter-spacing:1.5px;padding:0 10px;margin-bottom:8px;}
  .ad-nav-item{display:flex;align-items:center;gap:11px;padding:10px 12px;border-radius:10px;cursor:pointer;margin-bottom:3px;transition:all 0.15s;color:rgba(255,255,255,0.5);font-size:13px;font-weight:400;border-left:3px solid transparent;}
  .ad-nav-item:hover{background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.8);}
  .ad-nav-active{background:rgba(243,156,18,0.1)!important;color:#fff!important;font-weight:700!important;border-left-color:${T.orange}!important;}
  .ad-profile{display:flex;align-items:center;gap:10px;margin:0 12px 16px;background:rgba(243,156,18,0.07);border:1px solid rgba(243,156,18,0.15);border-radius:12px;padding:12px 14px;}
  .ad-avatar{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,${T.red},#ff4d4d);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;color:#fff;flex-shrink:0;}
  .ad-profile-name{font-size:13px;font-weight:700;color:#fff;}
  .ad-profile-sub{font-size:10px;color:${T.textHint};}
  .ad-online-dot{width:7px;height:7px;border-radius:50%;background:#22c55e;margin-left:auto;flex-shrink:0;animation:pulse 2s infinite;}
  .ad-hamburger{display:none;background:none;border:none;cursor:pointer;padding:6px;border-radius:8px;}
  .ad-hamburger:hover{background:rgba(255,255,255,0.07);}
  .ad-main{flex:1;display:flex;flex-direction:column;min-width:0;overflow:hidden;}
  .ad-topbar{background:${T.topbarBg};padding:0 28px;height:58px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid ${T.divider};flex-shrink:0;gap:12px;position:sticky;top:0;z-index:40;}
  .ad-topbar-left{display:flex;align-items:center;gap:14px;}
  .ad-topbar-crumb{font-size:11px;color:${T.textHint};margin-bottom:2px;}
  .ad-topbar-title{font-size:18px;font-weight:800;color:${T.textPri};}
  .ad-topbar-right{display:flex;align-items:center;gap:10px;flex-shrink:0;}
  .ad-online-pill{display:flex;align-items:center;gap:6px;background:rgba(34,197,94,0.1);color:#22c55e;border:1px solid rgba(34,197,94,0.25);font-size:12px;font-weight:700;padding:5px 13px;border-radius:20px;}
  .ad-date-pill{background:rgba(255,255,255,0.06);border:1px solid ${T.cardBord};font-size:12px;color:${T.textMut};padding:5px 13px;border-radius:20px;}
  .ad-body{flex:1;overflow-y:auto;padding:24px 28px 40px;}
  .ad-body::-webkit-scrollbar{width:5px;} .ad-body::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:4px;}
  .ad-stats-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:20px;}
  .ad-charts-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:20px;}
  .ad-form-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;}
  @media(max-width:1100px){.ad-stats-grid{grid-template-columns:repeat(3,1fr);} .ad-charts-grid{grid-template-columns:1fr 1fr;}}
  @media(max-width:900px){.ad-charts-grid{grid-template-columns:1fr;} .ad-form-grid{grid-template-columns:1fr 1fr;}}
  @media(max-width:768px){.ad-side{position:fixed;z-index:100;transform:translateX(-100%);height:100vh;top:0;left:0;width:230px!important;} .ad-side-open{transform:translateX(0)!important;} .ad-side-close{display:flex!important;} .ad-overlay{display:block!important;} .ad-hamburger{display:flex!important;} .ad-stats-grid{grid-template-columns:repeat(2,1fr);} .ad-topbar{padding:0 16px;} .ad-body{padding:16px 16px 32px;} .ad-hide-sm{display:none!important;} .ad-date-pill{display:none;}}
  @media(max-width:480px){.ad-stats-grid{grid-template-columns:1fr 1fr;} .ad-form-grid{grid-template-columns:1fr;} .ad-topbar-title{font-size:15px;} .ad-body{padding:12px 12px 28px;}}
`;