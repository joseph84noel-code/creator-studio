import { useState } from "react";

// ── TRANSLATIONS ──────────────────────────────────────────────────────────────
const TRANSLATIONS = {
  en: {
    appTitle: "Creator Studio",
    dashTitle: "My Dashboard",
    addAppointment: "+ Appointment",
    addTask: "+ Task",
    stats: {
      todayAppts: "Today's Appointments",
      pending: "Pending Tasks",
      overdue: "Overdue",
      completed: "Completed",
    },
    tabs: { calendar: "📅 Calendar", tasks: "📝 To-Do List" },
    days: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
    months: ["January","February","March","April","May","June","July","August","September","October","November","December"],
    todaySchedule: "Today's Schedule",
    noEvents: "No events on this day",
    addEvent: "+ Add",
    taskFilters: { all: "All", pending: "Pending", overdue: "🚨 Overdue", done: "Completed" },
    allClear: "All clear!",
    modalAppt: { add: "New Appointment", edit: "Edit Appointment" },
    modalTask: { add: "New Task", edit: "Edit Task" },
    titlePlaceholder: "Title *",
    taskTitlePlaceholder: "Task title *",
    notesPlaceholder: "Notes (optional)",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    priorities: { high: "🔴 High Priority", medium: "🟡 Medium", low: "🟢 Low" },
    priorityLabels: { high: "high", medium: "medium", low: "low" },
    overdueLabel: "⚠️ Overdue · ",
    datePrefix: "📅 ",
    locale: "en-US",
    categories: {
      review:   "Restaurant Review",
      brand:    "Brand Collab / PR",
      filming:  "Filming Session",
      content:  "Content & Filming Task",
      shop:     "TikTok Shop Task",
      followup: "Follow-up & Deadline",
      personal: "Personal Errand",
    },
  },
  it: {
    appTitle: "Creator Studio",
    dashTitle: "La Mia Dashboard",
    addAppointment: "+ Appuntamento",
    addTask: "+ Attività",
    stats: {
      todayAppts: "Appuntamenti Oggi",
      pending: "Attività in Sospeso",
      overdue: "In Ritardo",
      completed: "Completate",
    },
    tabs: { calendar: "📅 Calendario", tasks: "📝 Lista Attività" },
    days: ["Dom","Lun","Mar","Mer","Gio","Ven","Sab"],
    months: ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"],
    todaySchedule: "Programma di Oggi",
    noEvents: "Nessun evento in questo giorno",
    addEvent: "+ Aggiungi",
    taskFilters: { all: "Tutte", pending: "In Sospeso", overdue: "🚨 In Ritardo", done: "Completate" },
    allClear: "Tutto in ordine!",
    modalAppt: { add: "Nuovo Appuntamento", edit: "Modifica Appuntamento" },
    modalTask: { add: "Nuova Attività", edit: "Modifica Attività" },
    titlePlaceholder: "Titolo *",
    taskTitlePlaceholder: "Titolo attività *",
    notesPlaceholder: "Note (opzionale)",
    save: "Salva",
    cancel: "Annulla",
    delete: "Elimina",
    priorities: { high: "🔴 Alta Priorità", medium: "🟡 Media", low: "🟢 Bassa" },
    priorityLabels: { high: "alta", medium: "media", low: "bassa" },
    overdueLabel: "⚠️ In ritardo · ",
    datePrefix: "📅 ",
    locale: "it-IT",
    categories: {
      review:   "Recensione Ristorante",
      brand:    "Collab / Evento PR",
      filming:  "Sessione Riprese",
      content:  "Attività Contenuti",
      shop:     "Attività TikTok Shop",
      followup: "Follow-up & Scadenza",
      personal: "Commissione Personale",
    },
  },
};

const CATEGORY_META = {
  review:   { color: "#FF6B6B", emoji: "🍽️" },
  brand:    { color: "#FFB347", emoji: "🤝" },
  filming:  { color: "#A78BFA", emoji: "🎬" },
  content:  { color: "#34D399", emoji: "✨" },
  shop:     { color: "#F472B6", emoji: "🛍️" },
  followup: { color: "#60A5FA", emoji: "⏰" },
  personal: { color: "#FBBF24", emoji: "🗒️" },
};

const today = new Date();
const pad = (n) => String(n).padStart(2, "0");
const fmtDate = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;
const todayStr = fmtDate(today.getFullYear(), today.getMonth(), today.getDate());
function getDaysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDayOfMonth(y, m) { return new Date(y, m, 1).getDay(); }

const sampleAppointments = [
  { id: 1, title: "Nobu Tokyo Pop-up Review", date: fmtDate(today.getFullYear(), today.getMonth(), today.getDate()),   time: "13:00", category: "review",  notes: "VIP reservation, bring camera kit" },
  { id: 2, title: "Chanel Beauty PR Event",   date: fmtDate(today.getFullYear(), today.getMonth(), today.getDate()+2), time: "10:00", category: "brand",   notes: "New fragrance launch" },
  { id: 3, title: "Perfume Haul Video Shoot", date: fmtDate(today.getFullYear(), today.getMonth(), today.getDate()+4), time: "15:00", category: "filming", notes: "Feature spring collection" },
];
const sampleTasks = [
  { id: 1, title: "Edit ramen spot TikTok video",  category: "content",  priority: "high",   done: false, due: fmtDate(today.getFullYear(), today.getMonth(), today.getDate()+1) },
  { id: 2, title: "Restock Rose Elixir perfume",   category: "shop",     priority: "high",   done: false, due: fmtDate(today.getFullYear(), today.getMonth(), today.getDate()) },
  { id: 3, title: "Reply to collab DMs",           category: "followup", priority: "medium", done: false, due: fmtDate(today.getFullYear(), today.getMonth(), today.getDate()+3) },
  { id: 4, title: "Groceries + dry cleaning",      category: "personal", priority: "low",    done: false, due: null },
  { id: 5, title: "Script for cosmetics unboxing", category: "content",  priority: "medium", done: true,  due: null },
];

const DARK = {
  bg:"#0F0F13", header:"#13131A", card:"#16161F", border:"#2E2E3A", border2:"#3E3E52",
  text:"#F0EBE3", muted:"#888", muted2:"#666", muted3:"#555",
  pill:"#2E2E3A", pillText:"#aaa", inputBg:"#1A1A22",
  todayBg:"#FF6B6B18", todayBorder:"#FF6B6B55", selBg:"#FF6B6B30", selBorder:"#FF6B6BAA",
  calHover:"#1F1F2B", modalBg:"#16161F", overlayBg:"#00000080",
};
const LIGHT = {
  bg:"#FAF8F5", header:"#FFFFFF", card:"#FFFFFF", border:"#E8E2DA", border2:"#C8BEB4",
  text:"#1A1118", muted:"#7A6E6A", muted2:"#9E948F", muted3:"#B0A8A2",
  pill:"#EDE8E2", pillText:"#5A5250", inputBg:"#F4F0EB",
  todayBg:"#FF6B6B10", todayBorder:"#FF6B6B50", selBg:"#FF6B6B18", selBorder:"#FF6B6B88",
  calHover:"#F5EFE9", modalBg:"#FFFFFF", overlayBg:"#00000055",
};

const inp = (T) => ({
  background: T.inputBg, border: `1.5px solid ${T.border}`, color: T.text,
  borderRadius: 10, padding: "10px 14px", fontFamily: "'DM Sans', sans-serif",
  fontSize: 14, outline: "none", width: "100%",
});

export default function App() {
  const [dark, setDark] = useState(true);
  const [lang, setLang] = useState("en");
  const T = dark ? DARK : LIGHT;
  const L = TRANSLATIONS[lang];

  const CATEGORIES = Object.fromEntries(
    Object.entries(CATEGORY_META).map(([k, v]) => [k, { ...v, label: L.categories[k] }])
  );

  const [tab, setTab] = useState("calendar");
  const [appointments, setAppointments] = useState(sampleAppointments);
  const [tasks, setTasks] = useState(sampleTasks);
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showApptModal, setShowApptModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editAppt, setEditAppt] = useState(null);
  const [editTask, setEditTask] = useState(null);
  const [taskFilter, setTaskFilter] = useState("all");
  const [apptForm, setApptForm] = useState({ title:"", date:"", time:"", category:"review", notes:"" });
  const [taskForm, setTaskForm] = useState({ title:"", category:"content", priority:"medium", due:"" });

  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay    = getFirstDayOfMonth(calYear, calMonth);
  const getApptsForDate = (d) => appointments.filter(a => a.date === d);
  const getTasksForDate = (d) => tasks.filter(t => t.due === d);

  function openAddAppt(date) { setEditAppt(null); setApptForm({ title:"", date:date||"", time:"", category:"review", notes:"" }); setShowApptModal(true); }
  function openEditAppt(a)   { setEditAppt(a);    setApptForm({ title:a.title, date:a.date, time:a.time, category:a.category, notes:a.notes||"" }); setShowApptModal(true); }
  function saveAppt() {
    if (!apptForm.title || !apptForm.date) return;
    editAppt ? setAppointments(p => p.map(a => a.id===editAppt.id ? {...a,...apptForm} : a)) : setAppointments(p => [...p, {...apptForm, id:Date.now()}]);
    setShowApptModal(false);
  }
  function deleteAppt(id) { setAppointments(p => p.filter(a => a.id!==id)); setShowApptModal(false); }

  function openAddTask() { setEditTask(null); setTaskForm({ title:"", category:"content", priority:"medium", due:"" }); setShowTaskModal(true); }
  function openEditTask(t)  { setEditTask(t);   setTaskForm({ title:t.title, category:t.category, priority:t.priority, due:t.due||"" }); setShowTaskModal(true); }
  function saveTask() {
    if (!taskForm.title) return;
    editTask ? setTasks(p => p.map(t => t.id===editTask.id ? {...t,...taskForm} : t)) : setTasks(p => [...p, {...taskForm, id:Date.now(), done:false}]);
    setShowTaskModal(false);
  }
  function deleteTask(id) { setTasks(p => p.filter(t => t.id!==id)); setShowTaskModal(false); }
  function toggleDone(id)  { setTasks(p => p.map(t => t.id===id ? {...t, done:!t.done} : t)); }

  const todayAppts   = appointments.filter(a => a.date===todayStr).sort((a,b)=>a.time.localeCompare(b.time));
  const pendingTasks = tasks.filter(t => !t.done);
  const overdueTasks = pendingTasks.filter(t => t.due && t.due < todayStr);
  const filteredTasks = tasks.filter(t => {
    if (taskFilter==="done")    return t.done;
    if (taskFilter==="pending") return !t.done;
    if (taskFilter==="overdue") return !t.done && t.due && t.due < todayStr;
    return true;
  });
  const selectedDateAppts = selectedDate ? getApptsForDate(selectedDate) : [];
  const selectedDateTasks = selectedDate ? getTasksForDate(selectedDate) : [];

  const cardStyle    = { background:T.card, border:`1.5px solid ${T.border}`, borderRadius:14, padding:14, marginBottom:10, cursor:"pointer", transition:"all 0.2s" };
  const taskRowStyle = (done) => ({ display:"flex", alignItems:"center", gap:12, padding:"12px 14px", borderRadius:12, background:T.card, border:`1.5px solid ${T.border}`, marginBottom:8, cursor:"pointer", opacity:done?0.45:1, transition:"all 0.2s" });
  const checkStyle   = (done, color) => ({ width:20, height:20, borderRadius:6, border:`2px solid ${done?"#34D399":color}`, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, background:done?"#34D399":"transparent", transition:"all 0.2s" });
  const fmtDisplayDate = (ds) => new Date(ds+"T00:00:00").toLocaleDateString(L.locale, { weekday:"long", month:"long", day:"numeric" });
  const fmtShortDate   = (ds) => new Date(ds+"T00:00:00").toLocaleDateString(L.locale, { month:"short", day:"numeric" });

  return (
    <div style={{ fontFamily:"'DM Sans', sans-serif", minHeight:"100vh", background:T.bg, color:T.text, transition:"background 0.3s, color 0.3s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,700;1,400&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        body { -webkit-tap-highlight-color: transparent; }
        ::-webkit-scrollbar { width:4px; } ::-webkit-scrollbar-thumb { background:#FF6B6B55; border-radius:2px; }
        .pill-btn { border:none; cursor:pointer; border-radius:100px; padding:8px 18px; font-size:13px; font-weight:600; font-family:'DM Sans',sans-serif; transition:all 0.2s; -webkit-tap-highlight-color:transparent; }
        .badge { font-size:11px; font-weight:700; padding:3px 9px; border-radius:100px; }
        .lang-btn { border:none; cursor:pointer; border-radius:8px; padding:5px 10px; font-size:13px; font-weight:700; font-family:'DM Sans',sans-serif; transition:all 0.2s; letter-spacing:0.5px; -webkit-tap-highlight-color:transparent; }
      `}</style>

      {/* HEADER */}
      <div style={{ background:T.header, borderBottom:`1px solid ${T.border}`, padding:"16px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:50, transition:"background 0.3s", flexWrap:"wrap", gap:10 }}>
        <div>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:3, color:"#FF6B6B", textTransform:"uppercase", marginBottom:2 }}>{L.appTitle}</div>
          <div style={{ fontFamily:"'Playfair Display', serif", fontSize:22, fontWeight:700 }}>{L.dashTitle}</div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap", justifyContent:"flex-end" }}>
          {/* Language toggle */}
          <div style={{ display:"flex", alignItems:"center", background:T.pill, borderRadius:100, padding:"3px 4px", gap:2 }}>
            {["en","it"].map(l => (
              <button key={l} className="lang-btn"
                style={{ background:lang===l?"#FF6B6B":"transparent", color:lang===l?"#fff":T.pillText, padding:"5px 11px" }}
                onClick={() => setLang(l)}>
                {l === "en" ? "🇬🇧 EN" : "🇮🇹 IT"}
              </button>
            ))}
          </div>
          {/* Dark/Light toggle */}
          <div style={{ display:"flex", alignItems:"center", gap:7, background:T.pill, borderRadius:100, padding:"5px 10px" }}>
            <span style={{ fontSize:13 }}>☀️</span>
            <div onClick={() => setDark(d=>!d)} style={{ width:40, height:22, borderRadius:100, background:dark?"#FF6B6B":"#C8BEB4", cursor:"pointer", position:"relative", transition:"background 0.3s", flexShrink:0 }}>
              <div style={{ width:16, height:16, borderRadius:"50%", background:"#fff", position:"absolute", top:3, left:dark?21:3, transition:"left 0.3s", boxShadow:"0 1px 4px #00000030" }} />
            </div>
            <span style={{ fontSize:13 }}>🌙</span>
          </div>
          <button className="pill-btn" style={{ background:"#FF6B6B", color:"#fff" }} onClick={()=>openAddAppt("")}>{L.addAppointment}</button>
          <button className="pill-btn" style={{ background:T.pill, color:T.pillText }} onClick={openAddTask}>{L.addTask}</button>
        </div>
      </div>

      {/* STATS */}
      <div style={{ padding:"20px 24px 0" }}>
        <div style={{ display:"flex", gap:12, overflowX:"auto", paddingBottom:4 }}>
          {[
            { label:L.stats.todayAppts, value:todayAppts.length,             color:"#FF6B6B", emoji:"📅" },
            { label:L.stats.pending,    value:pendingTasks.length,            color:"#A78BFA", emoji:"📝" },
            { label:L.stats.overdue,    value:overdueTasks.length,            color:"#F87171", emoji:"🚨" },
            { label:L.stats.completed,  value:tasks.filter(t=>t.done).length, color:"#34D399", emoji:"✅" },
          ].map(s => (
            <div key={s.label} style={{ background:T.card, border:`1.5px solid ${T.border}`, borderRadius:14, padding:"14px 18px", minWidth:130, flexShrink:0, transition:"background 0.3s" }}>
              <div style={{ fontSize:22 }}>{s.emoji}</div>
              <div style={{ fontSize:28, fontWeight:700, color:s.color, lineHeight:1.2 }}>{s.value}</div>
              <div style={{ fontSize:12, color:T.muted, marginTop:2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TABS */}
      <div style={{ padding:"20px 24px 0", borderBottom:`1px solid ${T.border}`, display:"flex", transition:"border-color 0.3s" }}>
        {["calendar","tasks"].map(t => (
          <button key={t} onClick={()=>setTab(t)} style={{ border:"none", background:"transparent", color:tab===t?"#FF6B6B":T.muted, cursor:"pointer", padding:"10px 20px", fontSize:14, fontWeight:600, fontFamily:"'DM Sans',sans-serif", borderBottom:tab===t?"2px solid #FF6B6B":"2px solid transparent", transition:"all 0.2s" }}>
            {t==="calendar" ? L.tabs.calendar : L.tabs.tasks}
          </button>
        ))}
      </div>

      {/* CALENDAR */}
      {tab==="calendar" && (
        <div style={{ padding:24 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
            <button onClick={()=>{ if(calMonth===0){setCalMonth(11);setCalYear(y=>y-1);}else setCalMonth(m=>m-1); }} style={{ border:"none", cursor:"pointer", background:"transparent", color:T.text, fontSize:22, padding:"4px 10px", borderRadius:8 }}>‹</button>
            <div style={{ fontFamily:"'Playfair Display', serif", fontSize:20, fontWeight:700 }}>{L.months[calMonth]} {calYear}</div>
            <button onClick={()=>{ if(calMonth===11){setCalMonth(0);setCalYear(y=>y+1);}else setCalMonth(m=>m+1); }} style={{ border:"none", cursor:"pointer", background:"transparent", color:T.text, fontSize:22, padding:"4px 10px", borderRadius:8 }}>›</button>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(7, 1fr)", gap:4, marginBottom:4 }}>
            {L.days.map(d => <div key={d} style={{ textAlign:"center", fontSize:11, fontWeight:700, color:T.muted, padding:"4px 0", letterSpacing:1 }}>{d}</div>)}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(7, 1fr)", gap:4 }}>
            {Array(firstDay).fill(null).map((_,i)=><div key={`e${i}`}/>)}
            {Array(daysInMonth).fill(null).map((_,i)=>{
              const d = i+1;
              const dateStr = fmtDate(calYear, calMonth, d);
              const dayAppts = getApptsForDate(dateStr);
              const dayTasks = getTasksForDate(dateStr);
              const isToday = dateStr===todayStr;
              const isSel   = dateStr===selectedDate;
              return (
                <div key={d} onClick={()=>setSelectedDate(isSel?null:dateStr)}
                  style={{ borderRadius:10, cursor:"pointer", minHeight:70, padding:6, background:isSel?T.selBg:isToday?T.todayBg:"transparent", border:isSel?`1.5px solid ${T.selBorder}`:isToday?`1.5px solid ${T.todayBorder}`:"1.5px solid transparent", transition:"all 0.15s" }}
                  onMouseEnter={e=>{ if(!isSel&&!isToday) e.currentTarget.style.background=T.calHover; }}
                  onMouseLeave={e=>{ if(!isSel&&!isToday) e.currentTarget.style.background="transparent"; }}>
                  <div style={{ fontSize:13, fontWeight:isToday?700:400, color:isToday?"#FF6B6B":T.text, marginBottom:4 }}>{d}</div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:2 }}>
                    {dayAppts.map(a=><span key={a.id} style={{ width:7, height:7, borderRadius:"50%", display:"inline-block", background:CATEGORIES[a.category]?.color }}/>)}
                    {dayTasks.map(t=><span key={t.id} style={{ width:7, height:7, borderRadius:"50%", display:"inline-block", background:CATEGORIES[t.category]?.color, opacity:0.55 }}/>)}
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop:16, display:"flex", flexWrap:"wrap", gap:10 }}>
            {Object.entries(CATEGORIES).slice(0,3).map(([k,v])=>(
              <div key={k} style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, color:T.muted }}>
                <span style={{ width:7, height:7, borderRadius:"50%", display:"inline-block", background:v.color }}/>{v.label}
              </div>
            ))}
          </div>
          {selectedDate && (
            <div style={{ marginTop:24, background:T.card, border:`1.5px solid ${T.border}`, borderRadius:16, padding:20, transition:"background 0.3s" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
                <div style={{ fontFamily:"'Playfair Display', serif", fontSize:16, fontWeight:700 }}>{fmtDisplayDate(selectedDate)}</div>
                <button className="pill-btn" style={{ background:"#FF6B6B22", color:"#FF6B6B", fontSize:12 }} onClick={()=>openAddAppt(selectedDate)}>{L.addEvent}</button>
              </div>
              {selectedDateAppts.length===0 && selectedDateTasks.length===0 && <div style={{ color:T.muted3, fontSize:14, textAlign:"center", padding:"12px 0" }}>{L.noEvents}</div>}
              {selectedDateAppts.map(a=>(
                <div key={a.id} style={cardStyle} onClick={()=>openEditAppt(a)}>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <span style={{ fontSize:18 }}>{CATEGORIES[a.category]?.emoji}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:600, fontSize:14 }}>{a.title}</div>
                      <div style={{ fontSize:12, color:T.muted }}>{a.time&&`🕐 ${a.time}`}{a.notes&&` · ${a.notes}`}</div>
                    </div>
                    <span className="badge" style={{ background:CATEGORIES[a.category]?.color+"25", color:CATEGORIES[a.category]?.color }}>{CATEGORIES[a.category]?.label}</span>
                  </div>
                </div>
              ))}
              {selectedDateTasks.map(t=>(
                <div key={t.id} style={taskRowStyle(t.done)} onClick={()=>openEditTask(t)}>
                  <div style={checkStyle(t.done, T.border2)} onClick={e=>{e.stopPropagation();toggleDone(t.id);}}>
                    {t.done&&<span style={{ color:"#fff", fontSize:12 }}>✓</span>}
                  </div>
                  <span style={{ fontSize:16 }}>{CATEGORIES[t.category]?.emoji}</span>
                  <span style={{ fontSize:14, flex:1, textDecoration:t.done?"line-through":"none" }}>{t.title}</span>
                </div>
              ))}
            </div>
          )}
          {todayAppts.length>0&&(
            <div style={{ marginTop:24 }}>
              <div style={{ fontSize:13, fontWeight:700, color:"#FF6B6B", letterSpacing:2, textTransform:"uppercase", marginBottom:12 }}>{L.todaySchedule}</div>
              {todayAppts.map(a=>(
                <div key={a.id} style={{ ...cardStyle, borderLeft:`3px solid ${CATEGORIES[a.category]?.color}` }} onClick={()=>openEditAppt(a)}>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <span style={{ fontSize:22 }}>{CATEGORIES[a.category]?.emoji}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:600 }}>{a.title}</div>
                      <div style={{ fontSize:12, color:T.muted }}>{a.time} · {CATEGORIES[a.category]?.label}</div>
                      {a.notes&&<div style={{ fontSize:12, color:T.muted2, marginTop:2 }}>{a.notes}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TASKS */}
      {tab==="tasks"&&(
        <div style={{ padding:24 }}>
          <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
            {["all","pending","overdue","done"].map(v=>(
              <button key={v} className="pill-btn" style={{ background:taskFilter===v?"#FF6B6B":T.pill, color:taskFilter===v?"#fff":T.pillText }} onClick={()=>setTaskFilter(v)}>
                {L.taskFilters[v]}
              </button>
            ))}
          </div>
          {Object.entries(CATEGORIES).slice(3).map(([catKey,cat])=>{
            const catTasks = filteredTasks.filter(t=>t.category===catKey);
            if(!catTasks.length) return null;
            return (
              <div key={catKey} style={{ marginBottom:24 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                  <span style={{ fontSize:16 }}>{cat.emoji}</span>
                  <span style={{ fontSize:12, fontWeight:700, letterSpacing:2, textTransform:"uppercase", color:cat.color }}>{cat.label}</span>
                </div>
                {catTasks.map(t=>{
                  const isOverdue = !t.done && t.due && t.due<todayStr;
                  return (
                    <div key={t.id} style={taskRowStyle(t.done)}>
                      <div style={checkStyle(t.done, cat.color+"88")} onClick={()=>toggleDone(t.id)}>
                        {t.done&&<span style={{ color:"#fff", fontSize:12 }}>✓</span>}
                      </div>
                      <div style={{ flex:1 }} onClick={()=>openEditTask(t)}>
                        <div style={{ fontSize:14, fontWeight:500, textDecoration:t.done?"line-through":"none" }}>{t.title}</div>
                        {t.due&&<div style={{ fontSize:11, color:isOverdue?"#F87171":T.muted2, marginTop:2 }}>
                          {isOverdue?L.overdueLabel:L.datePrefix}{fmtShortDate(t.due)}
                        </div>}
                      </div>
                      <span className="badge" style={{ background:t.priority==="high"?"#F8717122":t.priority==="medium"?"#FBBF2422":"#34D39922", color:t.priority==="high"?"#F87171":t.priority==="medium"?"#FBBF24":"#34D399" }}>
                        {L.priorityLabels[t.priority]}
                      </span>
                    </div>
                  );
                })}
              </div>
            );
          })}
          {filteredTasks.length===0&&<div style={{ textAlign:"center", color:T.muted3, padding:"40px 0", fontSize:15 }}><div style={{ fontSize:40, marginBottom:12 }}>✨</div>{L.allClear}</div>}
        </div>
      )}

      {/* APPOINTMENT MODAL */}
      {showApptModal&&(
        <div onClick={()=>setShowApptModal(false)} style={{ position:"fixed", inset:0, background:T.overlayBg, display:"flex", alignItems:"center", justifyContent:"center", zIndex:100, backdropFilter:"blur(4px)" }}>
          <div onClick={e=>e.stopPropagation()} style={{ background:T.modalBg, border:`1.5px solid ${T.border}`, borderRadius:20, padding:28, width:"90%", maxWidth:440, transition:"background 0.3s" }}>
            <div style={{ fontFamily:"'Playfair Display', serif", fontSize:20, fontWeight:700, marginBottom:20, color:T.text }}>
              {editAppt?L.modalAppt.edit:L.modalAppt.add}
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              <input placeholder={L.titlePlaceholder} value={apptForm.title} onChange={e=>setApptForm(f=>({...f,title:e.target.value}))} style={inp(T)}/>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                <input type="date" value={apptForm.date} onChange={e=>setApptForm(f=>({...f,date:e.target.value}))} style={inp(T)}/>
                <input type="time" value={apptForm.time} onChange={e=>setApptForm(f=>({...f,time:e.target.value}))} style={inp(T)}/>
              </div>
              <select value={apptForm.category} onChange={e=>setApptForm(f=>({...f,category:e.target.value}))} style={inp(T)}>
                {Object.entries(CATEGORIES).slice(0,3).map(([k,v])=><option key={k} value={k}>{v.emoji} {v.label}</option>)}
              </select>
              <textarea rows={3} placeholder={L.notesPlaceholder} value={apptForm.notes} onChange={e=>setApptForm(f=>({...f,notes:e.target.value}))} style={{ ...inp(T), resize:"none" }}/>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:20 }}>
              <div style={{ display:"flex", gap:8 }}>
                <button className="pill-btn" style={{ background:"#FF6B6B", color:"#fff" }} onClick={saveAppt}>{L.save}</button>
                <button className="pill-btn" style={{ background:T.pill, color:T.pillText }} onClick={()=>setShowApptModal(false)}>{L.cancel}</button>
              </div>
              {editAppt&&<button className="pill-btn" style={{ background:"#F8717122", color:"#F87171" }} onClick={()=>deleteAppt(editAppt.id)}>{L.delete}</button>}
            </div>
          </div>
        </div>
      )}

      {/* TASK MODAL */}
      {showTaskModal&&(
        <div onClick={()=>setShowTaskModal(false)} style={{ position:"fixed", inset:0, background:T.overlayBg, display:"flex", alignItems:"center", justifyContent:"center", zIndex:100, backdropFilter:"blur(4px)" }}>
          <div onClick={e=>e.stopPropagation()} style={{ background:T.modalBg, border:`1.5px solid ${T.border}`, borderRadius:20, padding:28, width:"90%", maxWidth:440, transition:"background 0.3s" }}>
            <div style={{ fontFamily:"'Playfair Display', serif", fontSize:20, fontWeight:700, marginBottom:20, color:T.text }}>
              {editTask?L.modalTask.edit:L.modalTask.add}
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              <input placeholder={L.taskTitlePlaceholder} value={taskForm.title} onChange={e=>setTaskForm(f=>({...f,title:e.target.value}))} style={inp(T)}/>
              <select value={taskForm.category} onChange={e=>setTaskForm(f=>({...f,category:e.target.value}))} style={inp(T)}>
                {Object.entries(CATEGORIES).slice(3).map(([k,v])=><option key={k} value={k}>{v.emoji} {v.label}</option>)}
              </select>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                <select value={taskForm.priority} onChange={e=>setTaskForm(f=>({...f,priority:e.target.value}))} style={inp(T)}>
                  <option value="high">{L.priorities.high}</option>
                  <option value="medium">{L.priorities.medium}</option>
                  <option value="low">{L.priorities.low}</option>
                </select>
                <input type="date" value={taskForm.due} onChange={e=>setTaskForm(f=>({...f,due:e.target.value}))} style={inp(T)}/>
              </div>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:20 }}>
              <div style={{ display:"flex", gap:8 }}>
                <button className="pill-btn" style={{ background:"#FF6B6B", color:"#fff" }} onClick={saveTask}>{L.save}</button>
                <button className="pill-btn" style={{ background:T.pill, color:T.pillText }} onClick={()=>setShowTaskModal(false)}>{L.cancel}</button>
              </div>
              {editTask&&<button className="pill-btn" style={{ background:"#F8717122", color:"#F87171" }} onClick={()=>deleteTask(editTask.id)}>{L.delete}</button>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
