// import { useEffect, useState } from "react";
// import axios from "axios";

// const statusConfig = {
//   "Lost":     { bg: "#fee2e2", color: "#991b1b", dot: "#ef4444" },
//   "Found":    { bg: "#fef3c7", color: "#92400e", dot: "#f59e0b" },
//   "Returned": { bg: "#dcfce7", color: "#166534", dot: "#22c55e" },
// };

// export default function LostFound() {
//   const [items, setItems]         = useState([]);
//   const [loading, setLoading]     = useState(true);
//   const [showForm, setShowForm]   = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [success, setSuccess]     = useState("");
//   const [form, setForm] = useState({
//     itemName: "", description: "",
//     busNumber: "", route: "",
//     dateLost: "", contact: ""
//   });

//   const user = JSON.parse(localStorage.getItem("user"));

//   const fetchItems = () => {
//     axios.get(`${import.meta.env.VITE_API_URL}/api/lostfound`)
//       .then(res => { setItems(res.data); setLoading(false); })
//       .catch(() => setLoading(false));
//   };

//   useEffect(() => { fetchItems(); }, []);

//   const handleChange = e => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     if (!form.itemName || !form.description || !form.dateLost || !form.contact) {
//       return alert("Please fill in all required fields.");
//     }
//     setSubmitting(true);
//     try {
//       await axios.post(`${import.meta.env.VITE_API_URL}/api/lostfound`, {
//         ...form,
//         studentId: user.studentId,
//         studentName: user.name,
//       });
//       setSuccess("Your report has been submitted!");
//       setForm({ itemName: "", description: "", busNumber: "", route: "", dateLost: "", contact: "" });
//       setShowForm(false);
//       fetchItems();
//       setTimeout(() => setSuccess(""), 4000);
//     } catch {
//       alert("Failed to submit. Try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleFoundIt = async (id) => {
//     try {
//       await axios.patch(`${import.meta.env.VITE_API_URL}/api/lostfound/${id}/status`, { status: "Found" });
//       fetchItems();
//     } catch {
//       alert("Failed to update status.");
//     }
//   };

//   if (loading) return (
//     <div style={styles.centered}><div style={styles.spinner} /></div>
//   );

//   return (
//     <div style={styles.page}>

//       {/* Header */}
//       <div style={styles.header}>
//         <div>
//           <h2 style={styles.title}>🎒 Lost & Found</h2>
//           <p style={styles.subtitle}>
//             Report a lost item or help someone find theirs
//           </p>
//         </div>
//         <button
//           style={styles.reportBtn}
//           onClick={() => setShowForm(!showForm)}
//         >
//           {showForm ? "✕ Cancel" : "+ Report Lost Item"}
//         </button>
//       </div>

//       {success && <p style={styles.successTxt}>{success}</p>}

//       {/* Report form */}
//       {showForm && (
//         <div style={styles.formBox}>
//           <div style={styles.formTitle}>Report a Lost Item</div>
//           <div style={styles.formGrid}>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Item Name *</label>
//               <input style={styles.input} name="itemName"
//                 placeholder="e.g. Black backpack"
//                 value={form.itemName} onChange={handleChange} />
//             </div>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Date Lost *</label>
//               <input style={styles.input} name="dateLost"
//                 type="date" value={form.dateLost} onChange={handleChange} />
//             </div>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Bus Number</label>
//               <input style={styles.input} name="busNumber"
//                 placeholder="e.g. 11-001b"
//                 value={form.busNumber} onChange={handleChange} />
//             </div>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Route</label>
//               <input style={styles.input} name="route"
//                 placeholder="e.g. Tilagor Route"
//                 value={form.route} onChange={handleChange} />
//             </div>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Your Contact Number *</label>
//               <input style={styles.input} name="contact"
//                 placeholder="Your phone number"
//                 value={form.contact} onChange={handleChange} />
//             </div>
//           </div>
//           <div style={styles.formGroup}>
//             <label style={styles.label}>Description *</label>
//             <textarea style={styles.textarea} name="description"
//               placeholder="Describe the item in detail — color, brand, contents etc."
//               value={form.description} onChange={handleChange} rows={3} />
//           </div>
//           <button
//             style={{ ...styles.submitBtn, opacity: submitting ? 0.7 : 1 }}
//             onClick={handleSubmit} disabled={submitting}
//           >
//             {submitting ? "Submitting..." : "Submit Report →"}
//           </button>
//         </div>
//       )}

//       {/* Items list */}
//       {items.length === 0 && (
//         <div style={styles.empty}>
//           <div style={{ fontSize: "40px" }}>🎒</div>
//           <p style={styles.emptyTxt}>No lost items reported yet.</p>
//           <p style={styles.emptySubTxt}>
//             If you lost something on a university bus, report it above.
//           </p>
//         </div>
//       )}

//       {items.map(item => {
//         const sc = statusConfig[item.status] || statusConfig["Lost"];
//         const isMyItem = item.studentId === user.studentId;
//         return (
//           <div key={item._id} style={{
//             ...styles.itemCard,
//             borderLeft: `3px solid ${sc.dot}`
//           }}>
//             <div style={styles.itemTop}>
//               <div style={styles.itemLeft}>
//                 <div style={styles.itemName}>{item.itemName}</div>
//                 <div style={styles.itemMeta}>
//                   Reported by {isMyItem ? "you" : item.studentName} ·{" "}
//                   {new Date(item.createdAt).toLocaleDateString("en-US", {
//                     month: "short", day: "numeric", year: "numeric"
//                   })}
//                 </div>
//               </div>
//               <div style={{
//                 ...styles.statusBadge,
//                 background: sc.bg, color: sc.color
//               }}>
//                 <div style={{ ...styles.statusDot, background: sc.dot }} />
//                 {item.status}
//               </div>
//             </div>

//             <p style={styles.itemDesc}>{item.description}</p>

//             <div style={styles.itemDetails}>
//               {item.busNumber && (
//                 <span style={styles.detailTag}>🚌 Bus: {item.busNumber}</span>
//               )}
//               {item.route && (
//                 <span style={styles.detailTag}>📍 {item.route}</span>
//               )}
//               <span style={styles.detailTag}>📅 Lost: {item.dateLost}</span>
//               <span style={styles.detailTag}>📞 {item.contact}</span>
//             </div>

//             {/* Show "I Found This" button only for Lost items not reported by you */}
//             {item.status === "Lost" && !isMyItem && (
//               <button
//                 style={styles.foundBtn}
//                 onClick={() => handleFoundIt(item._id)}
//               >
//                 ✋ I Found This Item
//               </button>
//             )}

//             {item.status === "Found" && (
//               <div style={styles.foundNote}>
//                 ✅ Someone found this item — please contact them or the admin.
//               </div>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// const styles = {
//   page: { display: "flex", flexDirection: "column", gap: "14px", paddingBottom: "24px" },
//   centered: { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" },
//   spinner: {
//     width: "28px", height: "28px", border: "3px solid #e2e8f0",
//     borderTop: "3px solid #3b82f6", borderRadius: "50%",
//     animation: "spin 0.8s linear infinite"
//   },
//   header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
//   title: { fontSize: "20px", fontWeight: 700, color: "#0f172a", margin: 0 },
//   subtitle: { fontSize: "13px", color: "#94a3b8", marginTop: "3px" },
//   reportBtn: {
//     padding: "9px 16px", background: "#0A1628",
//     color: "#fff", border: "none", borderRadius: "8px",
//     fontSize: "13px", fontWeight: 600, cursor: "pointer", flexShrink: 0
//   },
//   successTxt: {
//     color: "#166534", fontSize: "13px", background: "#dcfce7",
//     padding: "10px 14px", borderRadius: "8px"
//   },
//   formBox: {
//     background: "#fff", borderRadius: "12px",
//     border: "0.5px solid #e2e8f0", padding: "20px"
//   },
//   formTitle: { fontSize: "14px", fontWeight: 700, color: "#0f172a", marginBottom: "16px" },
//   formGrid: {
//     display: "grid", gridTemplateColumns: "repeat(2, 1fr)",
//     gap: "12px", marginBottom: "12px"
//   },
//   formGroup: { display: "flex", flexDirection: "column", gap: "5px" },
//   label: { fontSize: "12px", color: "#475569", fontWeight: 600 },
//   input: {
//     padding: "9px 12px", border: "0.5px solid #e2e8f0",
//     borderRadius: "8px", fontSize: "13px", color: "#0f172a",
//     boxSizing: "border-box"
//   },
//   textarea: {
//     padding: "10px 12px", border: "0.5px solid #e2e8f0",
//     borderRadius: "8px", fontSize: "13px", color: "#334155",
//     resize: "vertical", lineHeight: 1.6,
//     fontFamily: "'Segoe UI', Arial, sans-serif",
//     boxSizing: "border-box", width: "100%"
//   },
//   submitBtn: {
//     marginTop: "12px", padding: "10px 24px",
//     background: "#0A1628", color: "#fff", border: "none",
//     borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer"
//   },
//   empty: {
//     background: "#fff", borderRadius: "12px",
//     border: "0.5px solid #e2e8f0", padding: "60px 24px",
//     display: "flex", flexDirection: "column", alignItems: "center", gap: "8px"
//   },
//   emptyTxt: { fontSize: "16px", fontWeight: 600, color: "#0f172a", margin: 0 },
//   emptySubTxt: { fontSize: "13px", color: "#94a3b8" },
//   itemCard: {
//     background: "#fff", borderRadius: "12px",
//     border: "0.5px solid #e2e8f0", padding: "16px"
//   },
//   itemTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" },
//   itemLeft: {},
//   itemName: { fontSize: "15px", fontWeight: 700, color: "#0f172a" },
//   itemMeta: { fontSize: "11px", color: "#94a3b8", marginTop: "3px" },
//   statusBadge: {
//     display: "flex", alignItems: "center", gap: "5px",
//     fontSize: "11px", fontWeight: 700, padding: "4px 10px", borderRadius: "10px"
//   },
//   statusDot: { width: "6px", height: "6px", borderRadius: "50%" },
//   itemDesc: { fontSize: "13px", color: "#334155", lineHeight: 1.5, margin: "0 0 10px" },
//   itemDetails: { display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "10px" },
//   detailTag: {
//     fontSize: "11px", background: "#f1f5f9", color: "#475569",
//     padding: "3px 8px", borderRadius: "6px", fontWeight: 500
//   },
//   foundBtn: {
//     padding: "8px 16px", background: "#f0fdf4",
//     color: "#166534", border: "0.5px solid #bbf7d0",
//     borderRadius: "8px", fontSize: "12px", fontWeight: 600, cursor: "pointer"
//   },
//   foundNote: {
//     fontSize: "12px", color: "#166534",
//     background: "#f0fdf4", padding: "8px 12px",
//     borderRadius: "8px", fontWeight: 500
//   }
// };




import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const statusConfig = {
  "Lost":     { bg: "#fee2e2", color: "#991b1b", dot: "#ef4444" },
  "Found":    { bg: "#fef3c7", color: "#92400e", dot: "#f59e0b" },
  "Returned": { bg: "#dcfce7", color: "#166534", dot: "#22c55e" },
};

export default function LostFound() {
  const [items, setItems]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [showForm, setShowForm]     = useState(null); 
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess]       = useState("");
  const [activeTab, setActiveTab]   = useState("all"); 

  const [lostForm, setLostForm] = useState({
    itemName: "", description: "",
    busNumber: "", route: "",
    dateLost: "", contact: ""
  });

  const [foundForm, setFoundForm] = useState({
    itemName: "", description: "",
    busNumber: "", route: "",
    dateFound: "", contact: "",
    whereFound: ""
  });

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchItems = () => {
    axios.get(`${API}/api/lostfound`)
      .then(res => { setItems(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchItems(); }, []);

  const handleLostChange  = e => setLostForm({ ...lostForm,  [e.target.name]: e.target.value });
  const handleFoundChange = e => setFoundForm({ ...foundForm, [e.target.name]: e.target.value });

  const handleSubmitLost = async () => {
    if (!lostForm.itemName || !lostForm.description || !lostForm.dateLost || !lostForm.contact)
      return alert("Please fill in all required fields.");
    setSubmitting(true);
    try {
      await axios.post(`${API}/api/lostfound`, {
        ...lostForm,
        studentId:   user.studentId,
        studentName: user.name,
        status:      "Lost",
        dateLost:    lostForm.dateLost,
      });
      setSuccess("Your lost item report has been submitted!");
      setLostForm({ itemName:"", description:"", busNumber:"", route:"", dateLost:"", contact:"" });
      setShowForm(null);
      fetchItems();
      setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
    console.error("DEBUG ERROR:", err.response ? err.response.data : err.message);
    alert("Check console for error details.");
}
    finally { setSubmitting(false); }
  };

  const handleSubmitFound = async () => {
    if (!foundForm.itemName || !foundForm.description || !foundForm.contact)
      return alert("Please fill in all required fields.");
    setSubmitting(true);
    try {
      await axios.post(`${API}/api/lostfound`, {
        itemName:    foundForm.itemName,
        description: foundForm.description,
        busNumber:   foundForm.busNumber,
        route:       foundForm.route,
        dateLost:    foundForm.dateFound,
        contact:     foundForm.contact,
        studentId:   user.studentId,
        studentName: user.name,
        status:      "Found",
      });
      setSuccess("Your found item report has been submitted! The owner will be notified.");
      setFoundForm({ itemName:"", description:"", busNumber:"", route:"", dateFound:"", contact:"", whereFound:"" });
      setShowForm(null);
      fetchItems();
      setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
    console.error("DEBUG ERROR:", err.response ? err.response.data : err.message);
    alert("Check console for error details.");
}
    finally { setSubmitting(false); }
  };

  const handleFoundIt = async (id) => {
    try {
      await axios.patch(`${API}/api/lostfound/${id}/status`, { status: "Found" });
      fetchItems();
    } catch { alert("Failed to update status."); }
  };

  const filtered = items.filter(item => {
    if (activeTab === "all") return true;
    if (activeTab === "lost")     return item.status === "Lost";
    if (activeTab === "found")    return item.status === "Found";
    if (activeTab === "returned") return item.status === "Returned";
    return true;
  });

  if (loading) return (
    <div style={styles.centered}><div style={styles.spinner} /></div>
  );

  return (
    <div style={styles.page}>

      {/* Header */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>🎒 Lost & Found</h2>
          <p style={styles.subtitle}>Report lost or found items from university buses</p>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <button
            style={{
              ...styles.reportBtn,
              background: showForm === "lost" ? "#ef4444" : "#0A1628"
            }}
            onClick={() => setShowForm(showForm === "lost" ? null : "lost")}
          >
            {showForm === "lost" ? "✕ Cancel" : "📢 Report Lost"}
          </button>
          <button
            style={{
              ...styles.reportBtn,
              background: showForm === "found" ? "#ef4444" : "#166534"
            }}
            onClick={() => setShowForm(showForm === "found" ? null : "found")}
          >
            {showForm === "found" ? "✕ Cancel" : "✋ Report Found"}
          </button>
        </div>
      </div>

      {success && <p style={styles.successTxt}>{success}</p>}

      {/* Lost item form */}
      {showForm === "lost" && (
        <div style={{ ...styles.formBox, borderLeft:"3px solid #ef4444" }}>
          <div style={styles.formTitle}>📢 Report a Lost Item</div>
          <p style={styles.formSubtitle}>
            Fill in the details below. Other students and admin can help locate your item.
          </p>
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Item Name *</label>
              <input style={styles.input} name="itemName"
                placeholder="e.g. Black backpack"
                value={lostForm.itemName} onChange={handleLostChange} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Date Lost *</label>
              <input style={styles.input} name="dateLost"
                type="date" value={lostForm.dateLost} onChange={handleLostChange} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Bus Number</label>
              <input style={styles.input} name="busNumber"
                placeholder="e.g. 11-001b"
                value={lostForm.busNumber} onChange={handleLostChange} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Route</label>
              <input style={styles.input} name="route"
                placeholder="e.g. Tilagor Route"
                value={lostForm.route} onChange={handleLostChange} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Your Contact Number *</label>
              <input style={styles.input} name="contact"
                placeholder="Your phone number"
                value={lostForm.contact} onChange={handleLostChange} />
            </div>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Description *</label>
            <textarea style={styles.textarea} name="description"
              placeholder="Describe the item in detail — color, brand, size, contents etc."
              value={lostForm.description} onChange={handleLostChange} rows={3} />
          </div>
          <button
            style={{ ...styles.submitBtn, opacity: submitting ? 0.7 : 1, background:"#ef4444" }}
            onClick={handleSubmitLost} disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Lost Report →"}
          </button>
        </div>
      )}

      {/* Found item form */}
      {showForm === "found" && (
        <div style={{ ...styles.formBox, borderLeft:"3px solid #22c55e" }}>
          <div style={styles.formTitle}>✋ Report a Found Item</div>
          <p style={styles.formSubtitle}>
            Found something on the bus? Report it here so the owner can contact you.
          </p>
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Item Name *</label>
              <input style={styles.input} name="itemName"
                placeholder="e.g. Umbrella"
                value={foundForm.itemName} onChange={handleFoundChange} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Date Found *</label>
              <input style={styles.input} name="dateFound"
                type="date" value={foundForm.dateFound} onChange={handleFoundChange} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Bus Number</label>
              <input style={styles.input} name="busNumber"
                placeholder="e.g. 11-001b"
                value={foundForm.busNumber} onChange={handleFoundChange} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Route</label>
              <input style={styles.input} name="route"
                placeholder="e.g. Tilagor Route"
                value={foundForm.route} onChange={handleFoundChange} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Where is it now? *</label>
              <input style={styles.input} name="whereFound"
                placeholder="e.g. With me, at CSE dept, driver has it"
                value={foundForm.whereFound} onChange={handleFoundChange} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Your Contact Number *</label>
              <input style={styles.input} name="contact"
                placeholder="Owner can reach you here"
                value={foundForm.contact} onChange={handleFoundChange} />
            </div>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Description *</label>
            <textarea style={styles.textarea} name="description"
              placeholder="e.g. Describe the item — color, brand, any identifying features"
              value={foundForm.description} onChange={handleFoundChange} rows={3} />
          </div>
          <button
            style={{ ...styles.submitBtn, opacity: submitting ? 0.7 : 1, background:"#166534" }}
            onClick={handleSubmitFound} disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Found Report →"}
          </button>
        </div>
      )}

      {/* Stats row */}
      <div style={styles.statsRow}>
        {[
          { label:"All Items",  count: items.length,                                   tab:"all",      color:"#3b82f6" },
          { label:"Lost",       count: items.filter(i=>i.status==="Lost").length,      tab:"lost",     color:"#ef4444" },
          { label:"Found",      count: items.filter(i=>i.status==="Found").length,     tab:"found",    color:"#f59e0b" },
          { label:"Returned",   count: items.filter(i=>i.status==="Returned").length,  tab:"returned", color:"#22c55e" },
        ].map(s => (
          <div
            key={s.tab}
            style={{
              ...styles.statPill,
              background: activeTab === s.tab ? s.color : "#f1f5f9",
              color: activeTab === s.tab ? "#fff" : "#475569",
              cursor: "pointer"
            }}
            onClick={() => setActiveTab(s.tab)}
          >
            <span style={{ fontWeight:700 }}>{s.count}</span> {s.label}
          </div>
        ))}
      </div>

      {/* Items list */}
      {filtered.length === 0 && (
        <div style={styles.empty}>
          <div style={{ fontSize:"40px" }}>🎒</div>
          <p style={styles.emptyTxt}>
            {activeTab === "all" ? "No items reported yet." : `No ${activeTab} items.`}
          </p>
          <p style={styles.emptySubTxt}>
            {activeTab === "all" ? "If you lost something on a university bus, report it above." : ""}
          </p>
        </div>
      )}

      {filtered.map(item => {
        const sc = statusConfig[item.status] || statusConfig["Lost"];
        const isMyItem = item.studentId === user.studentId;
        return (
          <div key={item._id} style={{
            ...styles.itemCard,
            borderLeft: `3px solid ${sc.dot}`
          }}>
            <div style={styles.itemTop}>
              <div style={styles.itemLeft}>
                <div style={styles.itemName}>{item.itemName}</div>
                <div style={styles.itemMeta}>
                  {item.status === "Found" ? "Found" : "Reported"} by{" "}
                  {isMyItem ? "you" : item.studentName} ·{" "}
                  {new Date(item.createdAt).toLocaleDateString("en-US", {
                    month:"short", day:"numeric", year:"numeric"
                  })}
                </div>
              </div>
              <div style={{
                ...styles.statusBadge,
                background: sc.bg, color: sc.color
              }}>
                <div style={{ ...styles.statusDot, background: sc.dot }} />
                {item.status}
              </div>
            </div>

            <p style={styles.itemDesc}>{item.description}</p>

            <div style={styles.itemDetails}>
              {item.busNumber && (
                <span style={styles.detailTag}>🚌 Bus: {item.busNumber}</span>
              )}
              {item.route && (
                <span style={styles.detailTag}>📍 {item.route}</span>
              )}
              <span style={styles.detailTag}>📅 {item.dateLost}</span>
              <span style={styles.detailTag}>📞 {item.contact}</span>
            </div>

            {/* For Lost items — show "I Found This" to other students */}
            {item.status === "Lost" && !isMyItem && (
              <button style={styles.foundBtn} onClick={() => handleFoundIt(item._id)}>
                ✋ I Found This Item
              </button>
            )}

            {/* For Found items — show contact info prominently */}
            {item.status === "Found" && (
              <div style={styles.foundNote}>
                ✅ This item has been found! Contact <strong>{item.studentName}</strong> at{" "}
                <strong>{item.contact}</strong> to claim it.
              </div>
            )}

            {item.status === "Returned" && (
              <div style={{ ...styles.foundNote, background:"#f0fdf4", color:"#166534" }}>
                ✅ This item has been returned to its owner.
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  page:        { display:"flex", flexDirection:"column", gap:"14px", paddingBottom:"24px" },
  centered:    { display:"flex", justifyContent:"center", alignItems:"center", minHeight:"200px" },
  spinner:     { width:"28px", height:"28px", border:"3px solid #e2e8f0", borderTop:"3px solid #3b82f6", borderRadius:"50%", animation:"spin 0.8s linear infinite" },
  header:      { display:"flex", justifyContent:"space-between", alignItems:"flex-start" },
  title:       { fontSize:"20px", fontWeight:700, color:"#0f172a", margin:0 },
  subtitle:    { fontSize:"13px", color:"#94a3b8", marginTop:"3px" },
  reportBtn:   { padding:"9px 16px", color:"#fff", border:"none", borderRadius:"8px", fontSize:"13px", fontWeight:600, cursor:"pointer", flexShrink:0 },
  successTxt:  { color:"#166534", fontSize:"13px", background:"#dcfce7", padding:"10px 14px", borderRadius:"8px" },
  formBox:     { background:"#fff", borderRadius:"12px", border:"0.5px solid #e2e8f0", padding:"20px" },
  formTitle:   { fontSize:"15px", fontWeight:700, color:"#0f172a", marginBottom:"6px" },
  formSubtitle:{ fontSize:"12px", color:"#94a3b8", marginBottom:"16px" },
  formGrid:    { display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap:"12px", marginBottom:"12px" },
  formGroup:   { display:"flex", flexDirection:"column", gap:"5px" },
  label:       { fontSize:"12px", color:"#475569", fontWeight:600 },
  input:       { padding:"9px 12px", border:"0.5px solid #e2e8f0", borderRadius:"8px", fontSize:"13px", color:"#0f172a", boxSizing:"border-box" },
  textarea:    { padding:"10px 12px", border:"0.5px solid #e2e8f0", borderRadius:"8px", fontSize:"13px", color:"#334155", resize:"vertical", lineHeight:1.6, fontFamily:"'Segoe UI', Arial, sans-serif", boxSizing:"border-box", width:"100%" },
  submitBtn:   { marginTop:"12px", padding:"10px 24px", color:"#fff", border:"none", borderRadius:"8px", fontSize:"13px", fontWeight:600, cursor:"pointer" },
  statsRow:    { display:"flex", gap:"8px", flexWrap:"wrap" },
  statPill:    { padding:"6px 14px", borderRadius:"20px", fontSize:"13px", fontWeight:500, display:"flex", alignItems:"center", gap:"6px", transition:"all 0.15s" },
  empty:       { background:"#fff", borderRadius:"12px", border:"0.5px solid #e2e8f0", padding:"60px 24px", display:"flex", flexDirection:"column", alignItems:"center", gap:"8px" },
  emptyTxt:    { fontSize:"16px", fontWeight:600, color:"#0f172a", margin:0 },
  emptySubTxt: { fontSize:"13px", color:"#94a3b8" },
  itemCard:    { background:"#fff", borderRadius:"12px", border:"0.5px solid #e2e8f0", padding:"16px" },
  itemTop:     { display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"8px" },
  itemLeft:    {},
  itemName:    { fontSize:"15px", fontWeight:700, color:"#0f172a" },
  itemMeta:    { fontSize:"11px", color:"#94a3b8", marginTop:"3px" },
  statusBadge: { display:"flex", alignItems:"center", gap:"5px", fontSize:"11px", fontWeight:700, padding:"4px 10px", borderRadius:"10px" },
  statusDot:   { width:"6px", height:"6px", borderRadius:"50%" },
  itemDesc:    { fontSize:"13px", color:"#334155", lineHeight:1.5, margin:"0 0 10px" },
  itemDetails: { display:"flex", flexWrap:"wrap", gap:"6px", marginBottom:"10px" },
  detailTag:   { fontSize:"11px", background:"#f1f5f9", color:"#475569", padding:"3px 8px", borderRadius:"6px", fontWeight:500 },
  foundBtn:    { padding:"8px 16px", background:"#f0fdf4", color:"#166534", border:"0.5px solid #bbf7d0", borderRadius:"8px", fontSize:"12px", fontWeight:600, cursor:"pointer" },
  foundNote:   { fontSize:"12px", color:"#92400e", background:"#fef3c7", padding:"8px 12px", borderRadius:"8px", fontWeight:500 },
};