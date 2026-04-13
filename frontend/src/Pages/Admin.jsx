import { useState, useEffect, useRef } from "react";

/* ── SVG icon helper ── */
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
  lost:      "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 7v5l3 3",
  plus:      "M12 5v14M5 12h14",
  route:     "M3 12h18M3 6h18M3 18h18",
  menu:      "M3 12h18M3 6h18M3 18h18",
  close:     "M18 6 6 18M6 6l12 12",
};

/* ── color tokens — matched to Home/Driver ── */
const T = {
  pageBg:    "#1a1f2e",
  sideGrad:  "linear-gradient(180deg, #0f1219 0%, #141927 100%)",
  cardBg:    "#242b3d",
  cardBord:  "rgba(255,255,255,0.07)",
  topbarBg:  "#1e2536",
  orange:    "#f39c12",
  red:       "#E31E24",
  textPri:   "#e2e8f0",
  textMut:   "rgba(255,255,255,0.4)",
  textHint:  "rgba(255,255,255,0.22)",
  divider:   "rgba(255,255,255,0.07)",
};

/* ── data ── */
const STATS = [
  { label: "Buses Active",    value: "5",  sub: "out of 8",      color: "#f39c12", light: "rgba(243,156,18,0.12)",  border: "rgba(243,156,18,0.3)",  icon: ICONS.bus       },
  { label: "Routes Running",  value: "3",  sub: "2 done today",  color: "#22c55e", light: "rgba(34,197,94,0.12)",   border: "rgba(34,197,94,0.3)",   icon: ICONS.route     },
  { label: "Open Complaints", value: "12", sub: "4 urgent",      color: "#E31E24", light: "rgba(227,30,36,0.12)",   border: "rgba(227,30,36,0.3)",   icon: ICONS.complaint },
  { label: "Lost Items",      value: "7",  sub: "3 unclaimed",   color: "#a78bfa", light: "rgba(167,139,250,0.12)", border: "rgba(167,139,250,0.3)", icon: ICONS.lost      },
];

const BUSES = [
  { id: "MU-01", route: "Tilagor → Campus",     driver: "Karim Uddin",   status: "running",      crowd: "available"   },
  { id: "MU-02", route: "Zindabazar → Campus",  driver: "Rafiqul Islam", status: "running",      crowd: "standing"    },
  { id: "MU-03", route: "Bondor → Campus",      driver: "Jahangir Ali",  status: "arrived",      crowd: "available"   },
  { id: "MU-04", route: "Amberkhana → Campus",  driver: "Sohel Rana",    status: "not_departed", crowd: "available"   },
  { id: "MU-05", route: "City Centre → Campus", driver: "Mizanur R.",    status: "running",      crowd: "overcrowded" },
];

const ANNOUNCEMENTS_DATA = [
  { id: 1, title: "Bus MU-03 delayed by 20 minutes",  type: "urgent",  time: "10 min ago" },
  { id: 2, title: "Route change for MU-02 on Friday", type: "general", time: "1 hr ago"   },
  { id: 3, title: "Schedule update for Eid holidays", type: "general", time: "2 hrs ago"  },
];

const COMPLAINTS_DATA = [
  { id: 1, student: "Nusrat Jahan", issue: "Bus MU-02 left early without waiting", status: "open",      time: "30 min ago" },
  { id: 2, student: "Tanvir Ahmed", issue: "Driver was rude to passengers",         status: "reviewing", time: "2 hrs ago"  },
  { id: 3, student: "Sadia Islam",  issue: "Bus was overcrowded, no AC",            status: "resolved",  time: "Yesterday"  },
  { id: 4, student: "Rakib Hassan", issue: "Wrong route information on app",        status: "open",      time: "Yesterday"  },
];

const LOST_DATA = [
  { id: 1, item: "Black backpack",  bus: "MU-02", reporter: "Mehedi Hasan", status: "unclaimed", time: "Today"      },
  { id: 2, item: "Student ID card", bus: "MU-01", reporter: "Fariha Akter", status: "claimed",   time: "Yesterday"  },
  { id: 3, item: "Blue umbrella",   bus: "MU-03", reporter: "Imran Khan",   status: "unclaimed", time: "2 days ago" },
];

const CROWD_MAP = {
  available:   { label: "Seats Available", color: "#22c55e", bg: "rgba(34,197,94,0.12)",   border: "rgba(34,197,94,0.3)"   },
  standing:    { label: "Standing Only",   color: "#f39c12", bg: "rgba(243,156,18,0.12)",  border: "rgba(243,156,18,0.3)"  },
  overcrowded: { label: "Overcrowded",     color: "#E31E24", bg: "rgba(227,30,36,0.12)",   border: "rgba(227,30,36,0.3)"   },
};
const STATUS_MAP = {
  running:      { label: "Running",      color: "#60a5fa", bg: "rgba(96,165,250,0.12)",  border: "rgba(96,165,250,0.3)"  },
  arrived:      { label: "Arrived",      color: "#22c55e", bg: "rgba(34,197,94,0.12)",   border: "rgba(34,197,94,0.3)"   },
  not_departed: { label: "Not Departed", color: "#94a3b8", bg: "rgba(148,163,184,0.12)", border: "rgba(148,163,184,0.3)" },
};
const COMPLAINT_MAP = {
  open:      { label: "Open",      color: "#E31E24", bg: "rgba(227,30,36,0.12)",   border: "rgba(227,30,36,0.3)"   },
  reviewing: { label: "Reviewing", color: "#f39c12", bg: "rgba(243,156,18,0.12)",  border: "rgba(243,156,18,0.3)"  },
  resolved:  { label: "Resolved",  color: "#22c55e", bg: "rgba(34,197,94,0.12)",   border: "rgba(34,197,94,0.3)"   },
};

/* ── shared components ── */
function Badge({ label, color, bg, border }) {
  return (
    <span style={{
      fontSize: 11, fontWeight: 700, padding: "3px 10px",
      borderRadius: 20, background: bg, color,
      border: `1px solid ${border}`, whiteSpace: "nowrap",
    }}>
      {label}
    </span>
  );
}

function CardHead({ title, sub, accent }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
        <div style={{ width: 3, height: 16, borderRadius: 2, background: accent ?? T.orange, flexShrink: 0 }} />
        <span style={{ fontSize: 14, fontWeight: 700, color: T.textPri }}>{title}</span>
      </div>
      {sub && <span style={{ fontSize: 12, color: T.textMut, paddingLeft: 11 }}>{sub}</span>}
    </div>
  );
}

function SecTitle({ children }) {
  return <div style={{ fontSize: 18, fontWeight: 800, color: T.textPri, marginBottom: 20 }}>{children}</div>;
}

const darkInput = {
  border: `1.5px solid ${T.cardBord}`,
  borderRadius: 8,
  padding: "9px 12px",
  fontSize: 13,
  color: T.textPri,
  outline: "none",
  background: "rgba(255,255,255,0.06)",
  width: "100%",
  boxSizing: "border-box",
};

const aBtn = (color, bg) => ({
  fontSize: 11, fontWeight: 700, color, background: bg,
  border: "none", borderRadius: 6, padding: "5px 12px", cursor: "pointer",
});

const pBtn = (color) => ({
  display: "flex", alignItems: "center", gap: 6,
  background: color, color: "#fff", border: "none",
  borderRadius: 8, padding: "9px 16px", fontSize: 13,
  fontWeight: 600, cursor: "pointer",
  boxShadow: `0 3px 12px ${color}44`,
});

/* dark table */
function DTable({ heads, rows }) {
  return (
    <div style={{ borderRadius: 14, overflow: "hidden", border: `1px solid ${T.cardBord}` }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "rgba(255,255,255,0.04)" }}>
            {heads.map(h => (
              <th key={h} style={{
                padding: "12px 16px", fontSize: 10, fontWeight: 700,
                color: T.textMut, textAlign: "left", whiteSpace: "nowrap",
                textTransform: "uppercase", letterSpacing: 0.8,
                borderBottom: `1px solid ${T.divider}`,
              }}>
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

const tdS = {
  padding: "13px 16px", fontSize: 13, color: T.textPri,
  verticalAlign: "middle", borderBottom: `1px solid ${T.divider}`,
};

/* ══════════════
   CHARTS
══════════════ */
function BarChart() {
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
        type: "bar",
        data: {
          labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
          datasets: [{ label:"Complaints", data:[3,5,2,8,4,1,6],
            backgroundColor:"rgba(227,30,36,0.18)", borderColor:"#E31E24",
            borderWidth:2, borderRadius:6, borderSkipped:false }],
        },
        options: {
          responsive:true, maintainAspectRatio:false,
          plugins:{ legend:{display:false}, tooltip:{ backgroundColor:"#1a1f2e", titleColor:"#fff", bodyColor:"rgba(255,255,255,0.5)", padding:10, cornerRadius:8 }},
          scales:{
            x:{ grid:{display:false}, ticks:{color:"rgba(255,255,255,0.3)",font:{size:11}}, border:{display:false} },
            y:{ grid:{color:"rgba(255,255,255,0.05)"}, ticks:{color:"rgba(255,255,255,0.3)",font:{size:11},stepSize:2}, border:{display:false} },
          },
        },
      });
    };
    document.head.appendChild(s);
    return () => { dead=true; if(chartRef.current){chartRef.current.destroy();chartRef.current=null;} };
  }, []);
  return (
    <div style={c.chartCard}>
      <CardHead title="Weekly Complaints" sub="Complaints per day this week" accent="#E31E24" />
      <div style={{ height:200 }}><canvas ref={ref} /></div>
    </div>
  );
}

function DoughnutChart() {
  const ref = useRef(null);
  const chartRef = useRef(null);
  useEffect(() => {
    let dead = false;
    function draw() {
      if (dead || !ref.current || !window.Chart) { if(!window.Chart) setTimeout(draw,200); return; }
      if (chartRef.current) chartRef.current.destroy();
      chartRef.current = new window.Chart(ref.current, {
        type:"doughnut",
        data:{
          labels:["Running","Arrived","Not Departed"],
          datasets:[{ data:[3,1,1],
            backgroundColor:["rgba(96,165,250,0.2)","rgba(34,197,94,0.2)","rgba(148,163,184,0.15)"],
            borderColor:["#60a5fa","#22c55e","#94a3b8"], borderWidth:2, hoverOffset:6 }],
        },
        options:{
          responsive:true, maintainAspectRatio:false, cutout:"68%",
          plugins:{
            legend:{ position:"bottom", labels:{ padding:16, color:"rgba(255,255,255,0.5)", font:{size:12}, usePointStyle:true, pointStyleWidth:8 }},
            tooltip:{ backgroundColor:"#1a1f2e", titleColor:"#fff", bodyColor:"rgba(255,255,255,0.5)", padding:10, cornerRadius:8 },
          },
        },
      });
    }
    window.Chart ? draw() : setTimeout(draw,200);
    return () => { dead=true; if(chartRef.current){chartRef.current.destroy();chartRef.current=null;} };
  }, []);
  return (
    <div style={c.chartCard}>
      <CardHead title="Bus Status Breakdown" sub="Current fleet distribution" accent="#60a5fa" />
      <div style={{ height:200 }}><canvas ref={ref} /></div>
    </div>
  );
}

function LineChart() {
  const ref = useRef(null);
  const chartRef = useRef(null);
  useEffect(() => {
    let dead = false;
    function draw() {
      if (dead || !ref.current || !window.Chart) { if(!window.Chart) setTimeout(draw,200); return; }
      if (chartRef.current) chartRef.current.destroy();
      chartRef.current = new window.Chart(ref.current, {
        type:"line",
        data:{
          labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
          datasets:[
            { label:"Morning", data:[5,5,4,5,5,3,2], borderColor:"#f39c12", backgroundColor:"rgba(243,156,18,0.07)", borderWidth:2, tension:0.4, fill:true, pointBackgroundColor:"#f39c12", pointRadius:4 },
            { label:"Afternoon", data:[4,5,5,4,5,2,2], borderColor:"#22c55e", backgroundColor:"rgba(34,197,94,0.07)", borderWidth:2, tension:0.4, fill:true, pointBackgroundColor:"#22c55e", pointRadius:4 },
          ],
        },
        options:{
          responsive:true, maintainAspectRatio:false,
          interaction:{ mode:"index", intersect:false },
          plugins:{
            legend:{ position:"bottom", labels:{ padding:16, color:"rgba(255,255,255,0.5)", font:{size:12}, usePointStyle:true, pointStyleWidth:8 }},
            tooltip:{ backgroundColor:"#1a1f2e", titleColor:"#fff", bodyColor:"rgba(255,255,255,0.5)", padding:10, cornerRadius:8 },
          },
          scales:{
            x:{ grid:{display:false}, ticks:{color:"rgba(255,255,255,0.3)",font:{size:11}}, border:{display:false} },
            y:{ grid:{color:"rgba(255,255,255,0.05)"}, ticks:{color:"rgba(255,255,255,0.3)",font:{size:11},stepSize:1}, border:{display:false}, min:0, max:6 },
          },
        },
      });
    }
    window.Chart ? draw() : setTimeout(draw,200);
    return () => { dead=true; if(chartRef.current){chartRef.current.destroy();chartRef.current=null;} };
  }, []);
  return (
    <div style={c.chartCard}>
      <CardHead title="Daily Trip Count" sub="Morning vs afternoon this week" accent="#22c55e" />
      <div style={{ height:200 }}><canvas ref={ref} /></div>
    </div>
  );
}

/* ══════════════
   PAGES
══════════════ */
function Overview() {
  return (
    <div>
      {/* stat cards */}
      <div className="ad-stats-grid">
        {STATS.map(st => (
          <div key={st.label} style={{ ...c.statCard, borderTop:`3px solid ${st.color}` }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
              <div>
                <div style={{ fontSize:30, fontWeight:900, color:st.color, lineHeight:1 }}>{st.value}</div>
                <div style={{ fontSize:13, fontWeight:700, color:T.textPri, marginTop:6 }}>{st.label}</div>
                <div style={{ fontSize:11, color:T.textMut, marginTop:3 }}>{st.sub}</div>
              </div>
              <div style={{ background:st.light, border:`1px solid ${st.border}`, borderRadius:10, padding:10 }}>
                <Icon d={st.icon} size={20} color={st.color} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* charts */}
      <div className="ad-charts-grid">
        <LineChart /><BarChart /><DoughnutChart />
      </div>

      {/* live buses */}
      <div style={c.card}>
        <CardHead title="Live Bus Summary" sub="Real-time status of all active buses" />
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {BUSES.map((bus, i) => {
            const st = STATUS_MAP[bus.status];
            const cr = CROWD_MAP[bus.crowd];
            return (
              <div key={bus.id} style={{ display:"flex", alignItems:"center", gap:14, padding:"11px 16px", borderRadius:10, background: i%2===0 ? "rgba(255,255,255,0.03)" : "transparent", border:`1px solid ${T.divider}` }}>
                <span style={{ fontWeight:800, color:T.orange, fontSize:13, minWidth:56, background:"rgba(243,156,18,0.12)", padding:"3px 8px", borderRadius:6, border:"1px solid rgba(243,156,18,0.3)" }}>
                  {bus.id}
                </span>
                <span style={{ fontSize:13, color:T.textMut, flex:1 }}>{bus.route}</span>
                <span style={{ fontSize:12, color:T.textHint }} className="ad-hide-sm">{bus.driver}</span>
                <Badge {...st} />
                <Badge {...cr} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function BusManagement() {
  const [buses, setBuses] = useState(BUSES);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ id:"", route:"", driver:"" });

  function addBus() {
    if (!form.id || !form.route || !form.driver) return;
    setBuses(b => [...b, { ...form, status:"not_departed", crowd:"available" }]);
    setForm({ id:"", route:"", driver:"" });
    setShowForm(false);
  }

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
        <SecTitle>Bus & Route Management</SecTitle>
        <button onClick={() => setShowForm(v=>!v)} style={pBtn("#f39c12")}>
          <Icon d={ICONS.plus} size={15} color="#fff" /> Add Bus
        </button>
      </div>

      {showForm && (
        <div style={{ ...c.card, marginBottom:20 }}>
          <CardHead title="Add New Bus" sub="Fill in the details below" accent="#f39c12" />
          <div className="ad-form-grid">
            {[["Bus ID","id","e.g. MU-06"],["Route","route","e.g. Shibganj → Campus"],["Driver","driver","Driver full name"]].map(([lbl,key,ph]) => (
              <div key={key}>
                <div style={{ fontSize:12, fontWeight:600, color:T.textMut, marginBottom:6 }}>{lbl}</div>
                <input placeholder={ph} value={form[key]}
                  onChange={e => setForm(f=>({...f,[key]:e.target.value}))}
                  style={darkInput} />
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:10, marginTop:16 }}>
            <button onClick={addBus} style={pBtn("#22c55e")}>Save Bus</button>
            <button onClick={()=>setShowForm(false)} style={{ ...pBtn("#64748b"), boxShadow:"none", background:"transparent", color:T.textMut, border:`1px solid ${T.cardBord}` }}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ ...c.card, padding:0, overflow:"hidden" }}>
        <DTable
          heads={["Bus ID","Route","Driver","Status","Crowd","Action"]}
          rows={buses.map((bus,i) => {
            const st=STATUS_MAP[bus.status]; const cr=CROWD_MAP[bus.crowd];
            return (
              <tr key={bus.id} style={{ background: i%2===0?"rgba(255,255,255,0.02)":"transparent" }}>
                <td style={tdS}><span style={{ fontWeight:800, color:T.orange, background:"rgba(243,156,18,0.12)", padding:"3px 10px", borderRadius:6, fontSize:12, border:"1px solid rgba(243,156,18,0.3)" }}>{bus.id}</span></td>
                <td style={tdS}>{bus.route}</td>
                <td style={{ ...tdS, color:T.textMut }} className="ad-hide-sm">{bus.driver}</td>
                <td style={tdS}><Badge {...st} /></td>
                <td style={tdS}><Badge {...cr} /></td>
                <td style={tdS}><button onClick={()=>setBuses(b=>b.filter(x=>x.id!==bus.id))} style={aBtn("#E31E24","rgba(227,30,36,0.12)")}>Remove</button></td>
              </tr>
            );
          })}
        />
      </div>
    </div>
  );
}

function Announcements() {
  const [items, setItems] = useState(ANNOUNCEMENTS_DATA);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title:"", type:"general" });

  function add() {
    if (!form.title) return;
    setItems(a=>[{id:Date.now(),...form,time:"Just now"},,...a]);
    setForm({ title:"", type:"general" });
    setShowForm(false);
  }

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
        <SecTitle>Announcements</SecTitle>
        <button onClick={()=>setShowForm(v=>!v)} style={pBtn("#E31E24")}>
          <Icon d={ICONS.plus} size={15} color="#fff" /> Post Notice
        </button>
      </div>

      {showForm && (
        <div style={{ ...c.card, marginBottom:20 }}>
          <CardHead title="New Announcement" accent="#E31E24" />
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:12, fontWeight:600, color:T.textMut, marginBottom:6 }}>Title</div>
            <input placeholder="Announcement text..." value={form.title}
              onChange={e=>setForm(f=>({...f,title:e.target.value}))} style={darkInput} />
          </div>
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:12, fontWeight:600, color:T.textMut, marginBottom:8 }}>Type</div>
            <div style={{ display:"flex", gap:10 }}>
              {[["urgent","Urgent"],["general","General"]].map(([val,lbl])=>(
                <div key={val} onClick={()=>setForm(f=>({...f,type:val}))}
                  style={{ padding:"8px 20px", borderRadius:8, cursor:"pointer", fontSize:13, fontWeight:600, transition:"all 0.15s",
                    background: form.type===val?(val==="urgent"?"#E31E24":"#f39c12"):"rgba(255,255,255,0.06)",
                    color: form.type===val?"#fff":T.textMut,
                    border:`1.5px solid ${form.type===val?"transparent":T.cardBord}` }}>
                  {lbl}
                </div>
              ))}
            </div>
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <button onClick={add} style={pBtn("#22c55e")}>Post</button>
            <button onClick={()=>setShowForm(false)} style={{ ...pBtn("#64748b"), boxShadow:"none", background:"transparent", color:T.textMut, border:`1px solid ${T.cardBord}` }}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {items.map(item => (
          <div key={item.id} style={{ ...c.card, padding:"16px 20px", borderLeft:`4px solid ${item.type==="urgent"?"#E31E24":"#f39c12"}` }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12 }}>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:7 }}>
                  <Badge
                    label={item.type==="urgent"?"Urgent":"General"}
                    color={item.type==="urgent"?"#E31E24":"#f39c12"}
                    bg={item.type==="urgent"?"rgba(227,30,36,0.12)":"rgba(243,156,18,0.12)"}
                    border={item.type==="urgent"?"rgba(227,30,36,0.3)":"rgba(243,156,18,0.3)"}
                  />
                  <span style={{ fontSize:11, color:T.textHint }}>{item.time}</span>
                </div>
                <div style={{ fontSize:14, color:T.textPri, fontWeight:500 }}>{item.title}</div>
              </div>
              <button onClick={()=>setItems(a=>a.filter(x=>x.id!==item.id))}
                style={aBtn(T.textMut,"rgba(255,255,255,0.06)")}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Complaints() {
  const [items, setItems] = useState(COMPLAINTS_DATA);
  function cycle(id) {
    const order=["open","reviewing","resolved"];
    setItems(c=>c.map(x=>x.id===id?{...x,status:order[(order.indexOf(x.status)+1)%order.length]}:x));
  }
  return (
    <div>
      <SecTitle>Complaints & Feedback</SecTitle>
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {items.map(item => {
          const st=COMPLAINT_MAP[item.status];
          return (
            <div key={item.id} style={{ ...c.card, padding:"16px 20px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:16 }}>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:7 }}>
                    <span style={{ fontSize:13, fontWeight:700, color:T.textPri }}>{item.student}</span>
                    <span style={{ fontSize:11, color:T.textHint }}>· {item.time}</span>
                  </div>
                  <div style={{ fontSize:13, color:T.textMut, lineHeight:1.5 }}>{item.issue}</div>
                </div>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:8, flexShrink:0 }}>
                  <Badge {...st} />
                  <button onClick={()=>cycle(item.id)} style={aBtn("#f39c12","rgba(243,156,18,0.12)")}>
                    {item.status==="resolved"?"Reopen":"Next →"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LostFound() {
  const [items, setItems] = useState(LOST_DATA);
  return (
    <div>
      <SecTitle>Lost & Found</SecTitle>
      <div style={{ ...c.card, padding:0, overflow:"hidden" }}>
        <DTable
          heads={["Item","Bus","Reported By","Status","Time","Action"]}
          rows={items.map((item,i)=>(
            <tr key={item.id} style={{ background: i%2===0?"rgba(255,255,255,0.02)":"transparent" }}>
              <td style={tdS}><span style={{ fontWeight:600, color:T.textPri }}>{item.item}</span></td>
              <td style={tdS}><span style={{ fontWeight:700, color:T.orange, background:"rgba(243,156,18,0.12)", padding:"3px 8px", borderRadius:6, fontSize:12, border:"1px solid rgba(243,156,18,0.3)" }}>{item.bus}</span></td>
              <td style={{ ...tdS, color:T.textMut }} className="ad-hide-sm">{item.reporter}</td>
              <td style={tdS}>
                <Badge
                  label={item.status==="claimed"?"Claimed":"Unclaimed"}
                  color={item.status==="claimed"?"#22c55e":"#f39c12"}
                  bg={item.status==="claimed"?"rgba(34,197,94,0.12)":"rgba(243,156,18,0.12)"}
                  border={item.status==="claimed"?"rgba(34,197,94,0.3)":"rgba(243,156,18,0.3)"}
                />
              </td>
              <td style={{ ...tdS, color:T.textHint }}>{item.time}</td>
              <td style={tdS}>
                <button onClick={()=>setItems(a=>a.map(x=>x.id===item.id?{...x,status:x.status==="claimed"?"unclaimed":"claimed"}:x))}
                  style={aBtn("#f39c12","rgba(243,156,18,0.12)")}>Toggle</button>
              </td>
            </tr>
          ))}
        />
      </div>
    </div>
  );
}

const NAV = [
  { key:"overview",   label:"Overview",      icon:ICONS.overview   },
  { key:"buses",      label:"Buses",         icon:ICONS.bus        },
  { key:"announce",   label:"Announcements", icon:ICONS.announce   },
  { key:"complaints", label:"Complaints",    icon:ICONS.complaint  },
  { key:"lostfound",  label:"Lost & Found",  icon:ICONS.lost       },
];

/* ══════════════
   ROOT
══════════════ */
export default function AdminDashboard() {
  const [active,   setActive]   = useState("overview");
  const [sideOpen, setSideOpen] = useState(false);

  const PAGES = {
    overview:   <Overview />,
    buses:      <BusManagement />,
    announce:   <Announcements />,
    complaints: <Complaints />,
    lostfound:  <LostFound />,
  };

  const current = NAV.find(n => n.key === active);

  return (
    <div className="ad-root">
      <style>{CSS}</style>

      {sideOpen && <div className="ad-overlay" onClick={()=>setSideOpen(false)} />}

      {/* ── SIDEBAR ── */}
      <aside className={`ad-side ${sideOpen ? "ad-side-open" : ""}`}>

        {/* brand */}
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

        {/* nav */}
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
                {item.key==="complaints" && (
                  <span className="ad-nav-badge">12</span>
                )}
              </div>
            );
          })}
        </nav>

        <div style={{ flex:1 }} />

        {/* admin profile */}
        <div className="ad-profile">
          <div className="ad-avatar">AD</div>
          <div>
            <div className="ad-profile-name">Admin</div>
            <div className="ad-profile-sub">Transport Dept.</div>
          </div>
          <span className="ad-online-dot" />
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="ad-main">

        {/* topbar */}
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
              {new Date().toLocaleDateString("en-BD",{weekday:"short",month:"short",day:"numeric"})}
            </div>
          </div>
        </header>

        {/* content */}
        <div className="ad-body">
          {PAGES[active]}
        </div>
      </div>
    </div>
  );
}

/* ── card styles ── */
const c = {
  card: {
    background: T.cardBg,
    borderRadius: 14,
    padding: "20px 22px",
    border: `1px solid ${T.cardBord}`,
    boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
    marginBottom: 16,
  },
  statCard: {
    background: T.cardBg,
    borderRadius: 14,
    padding: "18px 20px",
    border: `1px solid ${T.cardBord}`,
    boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
  },
  chartCard: {
    background: T.cardBg,
    borderRadius: 14,
    padding: "20px 22px",
    border: `1px solid ${T.cardBord}`,
    boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
  },
};

/* ══ CSS ══ */
const CSS = `
  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.3} }

  .ad-root {
    display: flex;
    min-height: 100vh;
    font-family: 'Inter','Segoe UI',system-ui,sans-serif;
    background: ${T.pageBg};
  }

  /* ── SIDEBAR ── */
  .ad-side {
    width: 230px;
    background: ${T.sideGrad};
    display: flex; flex-direction: column;
    flex-shrink: 0;
    height: 100vh; position: sticky; top: 0;
    overflow-y: auto;
    border-right: 1px solid ${T.divider};
    transition: transform 0.28s cubic-bezier(0.4,0,0.2,1);
  }
  .ad-side::-webkit-scrollbar { width:3px; }
  .ad-side::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.08); border-radius:3px; }
  .ad-side-close { display:none; background:none; border:none; cursor:pointer; margin-left:auto; padding:4px; }
  .ad-overlay { display:none; position:fixed; inset:0; background:rgba(0,0,0,0.6); z-index:99; }

  /* brand */
  .ad-brand {
    display: flex; align-items: center; gap: 10px;
    padding: 20px 18px 16px;
    border-bottom: 1px solid ${T.divider};
  }
  .ad-brand-dot {
    width: 9px; height: 9px; border-radius: 50%;
    background: ${T.red}; flex-shrink: 0;
    animation: pulse 2.5s infinite;
  }
  .ad-brand-name { color: #fff; font-size: 16px; font-weight: 900; letter-spacing: -0.03em; }
  .ad-brand-sub  { color: ${T.textHint}; font-size: 10px; margin-top:1px; }

  /* nav */
  .ad-nav { padding: 16px 12px; flex:1; }
  .ad-nav-label { font-size:9px; font-weight:700; color:${T.textHint}; text-transform:uppercase; letter-spacing:1.5px; padding:0 10px; margin-bottom:8px; }
  .ad-nav-item {
    display: flex; align-items: center; gap: 11px;
    padding: 10px 12px; border-radius: 10px;
    cursor: pointer; margin-bottom: 3px;
    transition: all 0.15s;
    color: rgba(255,255,255,0.5); font-size: 13px; font-weight: 400;
    border-left: 3px solid transparent;
  }
  .ad-nav-item:hover { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.8); }
  .ad-nav-active {
    background: rgba(243,156,18,0.1) !important;
    color: #fff !important; font-weight: 700 !important;
    border-left-color: ${T.orange} !important;
  }
  .ad-nav-badge {
    margin-left: auto; background: ${T.red}; color:#fff;
    font-size:10px; font-weight:700; padding:1px 6px; border-radius:20px;
  }

  /* profile */
  .ad-profile {
    display: flex; align-items: center; gap: 10px;
    margin: 0 12px 20px;
    background: rgba(243,156,18,0.07);
    border: 1px solid rgba(243,156,18,0.15);
    border-radius: 12px; padding: 12px 14px;
  }
  .ad-avatar {
    width: 34px; height: 34px; border-radius: 50%;
    background: linear-gradient(135deg,${T.red},#ff4d4d);
    display:flex; align-items:center; justify-content:center;
    font-weight:700; font-size:12px; color:#fff; flex-shrink:0;
  }
  .ad-profile-name { font-size:13px; font-weight:700; color:#fff; }
  .ad-profile-sub  { font-size:10px; color:${T.textHint}; }
  .ad-online-dot   { width:7px; height:7px; border-radius:50%; background:#22c55e; margin-left:auto; flex-shrink:0; animation:pulse 2s infinite; }

  /* hamburger */
  .ad-hamburger { display:none; background:none; border:none; cursor:pointer; padding:6px; border-radius:8px; }
  .ad-hamburger:hover { background:rgba(255,255,255,0.07); }

  /* ── MAIN ── */
  .ad-main { flex:1; display:flex; flex-direction:column; min-width:0; overflow:hidden; }

  /* topbar */
  .ad-topbar {
    background: ${T.topbarBg};
    padding: 0 28px; height: 58px;
    display: flex; align-items: center; justify-content: space-between;
    border-bottom: 1px solid ${T.divider};
    flex-shrink: 0; gap: 12px;
    position: sticky; top: 0; z-index: 40;
  }
  .ad-topbar-left  { display:flex; align-items:center; gap:14px; }
  .ad-topbar-crumb { font-size:11px; color:${T.textHint}; margin-bottom:2px; }
  .ad-topbar-title { font-size:18px; font-weight:800; color:${T.textPri}; }
  .ad-topbar-right { display:flex; align-items:center; gap:10px; flex-shrink:0; }
  .ad-online-pill  { display:flex; align-items:center; gap:6px; background:rgba(34,197,94,0.1); color:#22c55e; border:1px solid rgba(34,197,94,0.25); font-size:12px; font-weight:700; padding:5px 13px; border-radius:20px; }
  .ad-date-pill    { background:rgba(255,255,255,0.06); border:1px solid ${T.cardBord}; font-size:12px; color:${T.textMut}; padding:5px 13px; border-radius:20px; }

  /* body */
  .ad-body { flex:1; overflow-y:auto; padding:24px 28px 40px; }
  .ad-body::-webkit-scrollbar { width:5px; }
  .ad-body::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.1); border-radius:4px; }

  /* grids */
  .ad-stats-grid  { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:20px; }
  .ad-charts-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:20px; }
  .ad-form-grid   { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }

  /* ── RESPONSIVE ── */
  @media (max-width: 1100px) {
    .ad-stats-grid  { grid-template-columns:repeat(2,1fr); }
    .ad-charts-grid { grid-template-columns:1fr 1fr; }
  }

  @media (max-width: 900px) {
    .ad-charts-grid { grid-template-columns:1fr; }
    .ad-form-grid   { grid-template-columns:1fr 1fr; }
  }

  @media (max-width: 768px) {
    .ad-side {
      position: fixed; z-index:100;
      transform: translateX(-100%);
      height:100vh; top:0; left:0; width:230px !important;
    }
    .ad-side-open    { transform: translateX(0) !important; }
    .ad-side-close   { display:flex !important; }
    .ad-overlay      { display:block !important; }
    .ad-hamburger    { display:flex !important; }
    .ad-stats-grid   { grid-template-columns:repeat(2,1fr); }
    .ad-topbar       { padding:0 16px; }
    .ad-body         { padding:16px 16px 32px; }
    .ad-hide-sm      { display:none !important; }
    .ad-date-pill    { display:none; }
  }

  @media (max-width: 480px) {
    .ad-stats-grid  { grid-template-columns:1fr 1fr; }
    .ad-form-grid   { grid-template-columns:1fr; }
    .ad-topbar-title{ font-size:15px; }
    .ad-body        { padding:12px 12px 28px; }
  }
`;