import { useState, useEffect } from "react";

// ─── Styles ───────────────────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Source+Serif+4:ital,wght@0,300;0,400;0,600;1,400&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy:    #0f1f3d;
    --navy2:   #162747;
    --gold:    #c9a84c;
    --gold2:   #e8c97a;
    --cream:   #f5f0e8;
    --white:   #fdfaf5;
    --muted:   #8a9bb5;
    --border:  #2a3f5f;
    --green:   #2d6a4f;
    --red:     #8b1a1a;
    --orange:  #b85c00;
    --card:    #162747;
    --card2:   #1c2f52;
  }

  body { font-family: 'Source Serif 4', Georgia, serif; background: var(--navy); color: var(--cream); min-height: 100vh; }

  .app { display: flex; min-height: 100vh; }

  /* ── Sidebar ── */
  .sidebar {
    width: 260px; min-height: 100vh; background: var(--navy2);
    border-right: 1px solid var(--border); display: flex; flex-direction: column;
    position: fixed; top: 0; left: 0; z-index: 100;
  }
  .sidebar-brand {
    padding: 24px 20px 20px; border-bottom: 1px solid var(--border);
  }
  .sidebar-brand h1 {
    font-family: 'Playfair Display', serif; font-size: 18px; color: var(--gold);
    line-height: 1.2; letter-spacing: 0.02em;
  }
  .sidebar-brand p { font-size: 11px; color: var(--muted); margin-top: 4px; font-family: 'JetBrains Mono', monospace; }
  .sidebar-role {
    margin: 16px 20px; padding: 8px 12px; border-radius: 6px;
    background: rgba(201,168,76,0.12); border: 1px solid rgba(201,168,76,0.3);
    font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--gold2);
    text-transform: uppercase; letter-spacing: 0.1em;
  }
  .sidebar-nav { flex: 1; padding: 8px 12px; }
  .nav-section { font-size: 10px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.12em; padding: 12px 8px 6px; font-family: 'JetBrains Mono', monospace; }
  .nav-item {
    display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 6px;
    cursor: pointer; font-size: 14px; color: var(--muted); transition: all 0.18s; margin-bottom: 2px;
  }
  .nav-item:hover { background: rgba(255,255,255,0.05); color: var(--cream); }
  .nav-item.active { background: rgba(201,168,76,0.15); color: var(--gold2); border-left: 3px solid var(--gold); padding-left: 9px; }
  .nav-item .icon { font-size: 16px; width: 20px; text-align: center; }
  .nav-badge { margin-left: auto; background: var(--gold); color: var(--navy); font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 10px; font-family: 'JetBrains Mono', monospace; }
  .sidebar-footer { padding: 16px 20px; border-top: 1px solid var(--border); }
  .user-chip { display: flex; align-items: center; gap: 10px; cursor: pointer; }
  .user-avatar { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, var(--gold), var(--navy)); display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-size: 14px; color: var(--navy); font-weight: 700; }
  .user-info { flex: 1; }
  .user-name { font-size: 13px; color: var(--cream); }
  .user-id { font-size: 11px; color: var(--muted); font-family: 'JetBrains Mono', monospace; }

  /* ── Main ── */
  .main { margin-left: 260px; flex: 1; min-height: 100vh; }
  .topbar {
    position: sticky; top: 0; z-index: 50; background: rgba(15,31,61,0.95);
    backdrop-filter: blur(12px); border-bottom: 1px solid var(--border);
    padding: 14px 32px; display: flex; align-items: center; justify-content: space-between;
  }
  .topbar-title { font-family: 'Playfair Display', serif; font-size: 20px; color: var(--cream); }
  .topbar-right { display: flex; align-items: center; gap: 16px; }
  .topbar-date { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--muted); }
  .btn {
    padding: 8px 18px; border-radius: 6px; border: none; cursor: pointer;
    font-family: 'Source Serif 4', serif; font-size: 13px; font-weight: 600; transition: all 0.18s;
  }
  .btn-primary { background: var(--gold); color: var(--navy); }
  .btn-primary:hover { background: var(--gold2); transform: translateY(-1px); }
  .btn-outline { background: transparent; color: var(--gold); border: 1px solid var(--gold); }
  .btn-outline:hover { background: rgba(201,168,76,0.1); }
  .btn-sm { padding: 5px 12px; font-size: 12px; }
  .btn-danger { background: var(--red); color: #fff; }
  .btn-success { background: var(--green); color: #fff; }

  .page { padding: 32px; }

  /* ── Cards ── */
  .card { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 24px; }
  .card-sm { padding: 16px; }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
  .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }

  /* ── Stat Cards ── */
  .stat-card { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 20px; position: relative; overflow: hidden; }
  .stat-card::before { content:''; position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: var(--accent, var(--gold)); border-radius: 10px 0 0 10px; }
  .stat-label { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; font-family: 'JetBrains Mono', monospace; }
  .stat-value { font-family: 'Playfair Display', serif; font-size: 32px; color: var(--cream); margin: 6px 0 4px; }
  .stat-sub { font-size: 12px; color: var(--muted); }

  /* ── Tables ── */
  .table-wrap { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; }
  thead { border-bottom: 1px solid var(--border); }
  th { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; font-family: 'JetBrains Mono', monospace; padding: 10px 14px; text-align: left; font-weight: 500; }
  td { padding: 12px 14px; font-size: 14px; color: var(--cream); border-bottom: 1px solid rgba(42,63,95,0.5); }
  tr:hover td { background: rgba(255,255,255,0.02); }
  tr:last-child td { border-bottom: none; }

  /* ── Badges ── */
  .badge { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-family: 'JetBrains Mono', monospace; font-weight: 500; }
  .badge-green { background: rgba(45,106,79,0.25); color: #52b788; border: 1px solid rgba(45,106,79,0.4); }
  .badge-red { background: rgba(139,26,26,0.25); color: #f08080; border: 1px solid rgba(139,26,26,0.4); }
  .badge-gold { background: rgba(201,168,76,0.2); color: var(--gold2); border: 1px solid rgba(201,168,76,0.35); }
  .badge-blue { background: rgba(30,80,160,0.3); color: #7eb3f5; border: 1px solid rgba(30,80,160,0.5); }
  .badge-orange { background: rgba(184,92,0,0.25); color: #f4a261; border: 1px solid rgba(184,92,0,0.4); }

  /* ── Forms ── */
  .form-group { margin-bottom: 18px; }
  label { display: block; font-size: 12px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; font-family: 'JetBrains Mono', monospace; margin-bottom: 6px; }
  input, textarea, select {
    width: 100%; background: var(--navy); border: 1px solid var(--border); border-radius: 6px;
    padding: 10px 14px; color: var(--cream); font-family: 'Source Serif 4', serif; font-size: 14px;
    transition: border-color 0.18s; outline: none;
  }
  input:focus, textarea:focus, select:focus { border-color: var(--gold); }
  textarea { resize: vertical; min-height: 90px; }
  select option { background: var(--navy2); }

  /* ── Modals ── */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 200;
    display: flex; align-items: center; justify-content: center;
    animation: fadeIn 0.18s ease;
  }
  .modal {
    background: var(--navy2); border: 1px solid var(--border); border-radius: 12px;
    padding: 28px; width: 520px; max-width: 95vw; max-height: 90vh; overflow-y: auto;
    animation: slideUp 0.22s ease;
  }
  .modal-title { font-family: 'Playfair Display', serif; font-size: 20px; color: var(--gold); margin-bottom: 20px; }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

  /* ── Progress ── */
  .progress-bar { background: var(--border); border-radius: 20px; height: 6px; overflow: hidden; }
  .progress-fill { height: 100%; border-radius: 20px; background: linear-gradient(90deg, var(--gold), var(--gold2)); transition: width 0.4s ease; }

  /* ── Login ── */
  .login-page {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    background: var(--navy);
    background-image: radial-gradient(ellipse at 20% 50%, rgba(201,168,76,0.06) 0%, transparent 60%),
                      radial-gradient(ellipse at 80% 20%, rgba(22,39,71,0.8) 0%, transparent 50%);
  }
  .login-card {
    width: 420px; background: var(--navy2); border: 1px solid var(--border);
    border-radius: 16px; padding: 40px; box-shadow: 0 24px 64px rgba(0,0,0,0.5);
  }
  .login-logo { font-family: 'Playfair Display', serif; font-size: 26px; color: var(--gold); text-align: center; margin-bottom: 6px; }
  .login-sub { font-size: 13px; color: var(--muted); text-align: center; margin-bottom: 28px; font-family: 'JetBrains Mono', monospace; }
  .role-selector { display: flex; gap: 8px; margin-bottom: 24px; }
  .role-btn {
    flex: 1; padding: 10px 8px; border-radius: 8px; cursor: pointer; border: 1px solid var(--border);
    background: transparent; color: var(--muted); font-family: 'JetBrains Mono', monospace; font-size: 11px;
    text-transform: uppercase; letter-spacing: 0.08em; transition: all 0.18s; text-align: center;
  }
  .role-btn.active { background: rgba(201,168,76,0.15); border-color: var(--gold); color: var(--gold2); }

  /* ── Section dividers ── */
  .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
  .section-title { font-family: 'Playfair Display', serif; font-size: 18px; color: var(--cream); }
  .section-sub { font-size: 13px; color: var(--muted); margin-top: 2px; }
  .divider { height: 1px; background: var(--border); margin: 28px 0; }

  /* ── Assignment card ── */
  .asgn-card {
    background: var(--card2); border: 1px solid var(--border); border-radius: 8px;
    padding: 18px; transition: border-color 0.18s;
  }
  .asgn-card:hover { border-color: rgba(201,168,76,0.4); }
  .asgn-title { font-family: 'Playfair Display', serif; font-size: 16px; color: var(--cream); margin-bottom: 6px; }
  .asgn-meta { display: flex; gap: 16px; flex-wrap: wrap; margin: 10px 0; }
  .asgn-meta-item { font-size: 12px; color: var(--muted); font-family: 'JetBrains Mono', monospace; display: flex; align-items: center; gap: 4px; }

  /* ── Grade display ── */
  .grade-circle {
    width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
    font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700;
    border: 2px solid; flex-shrink: 0;
  }

  /* ── Tabs ── */
  .tabs { display: flex; gap: 4px; border-bottom: 1px solid var(--border); margin-bottom: 24px; }
  .tab {
    padding: 10px 18px; cursor: pointer; font-size: 13px; color: var(--muted);
    border-bottom: 2px solid transparent; margin-bottom: -1px; transition: all 0.18s;
  }
  .tab.active { color: var(--gold2); border-bottom-color: var(--gold); }
  .tab:hover:not(.active) { color: var(--cream); }

  .mt-16 { margin-top: 16px; }
  .mt-24 { margin-top: 24px; }
  .mb-8 { margin-bottom: 8px; }
  .mb-16 { margin-bottom: 16px; }
  .mb-24 { margin-bottom: 24px; }
  .gap-12 { gap: 12px; }
  .flex { display: flex; }
  .items-center { align-items: center; }
  .justify-between { justify-content: space-between; }
  .flex-col { flex-direction: column; }
  .gap-16 { gap: 16px; }
  .text-muted { color: var(--muted); font-size: 13px; }
  .text-gold { color: var(--gold2); }
  .text-sm { font-size: 12px; font-family: 'JetBrains Mono', monospace; }
  .w-full { width: 100%; }
  .scroll-list { display: flex; flex-direction: column; gap: 10px; max-height: 380px; overflow-y: auto; }
`;

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_USERS = {
  student: { id: "STU2024001", name: "Arjun Sharma", role: "student", section: "CS-3A", email: "arjun@edu.ac.in" },
  teacher: { id: "FAC2024010", name: "Dr. Priya Mehta", role: "teacher", dept: "Computer Science", email: "priya@edu.ac.in" },
  admin: { id: "ADM2024001", name: "Mr. Rajesh Kumar", role: "admin", dept: "Academic Administration", email: "admin@edu.ac.in" },
};

const COURSES = [
  { id: "CS301", name: "Data Structures & Algorithms", teacher: "Dr. Priya Mehta", students: 42 },
  { id: "CS302", name: "Database Management Systems", teacher: "Dr. Priya Mehta", students: 38 },
  { id: "CS303", name: "Operating Systems", teacher: "Prof. Anil Kapoor", students: 45 },
];

const initAssignments = [
  { id: "A001", title: "Linked List Implementation", course: "CS301", courseId: "CS301", dueDate: "2025-03-10", totalMarks: 100, description: "Implement a doubly linked list with all standard operations including insert, delete, search, and reverse.", submitted: 32, graded: 28, status: "active" },
  { id: "A002", title: "ER Diagram – Library System", course: "CS302", courseId: "CS302", dueDate: "2025-03-08", totalMarks: 50, description: "Design a complete ER diagram for a library management system with all entities, attributes, and relationships.", submitted: 38, graded: 38, status: "closed" },
  { id: "A003", title: "Process Scheduling Report", course: "CS303", courseId: "CS303", dueDate: "2025-03-15", totalMarks: 75, description: "Write a comparative analysis report on CPU scheduling algorithms: FCFS, SJF, Round Robin, and Priority Scheduling.", submitted: 10, graded: 0, status: "active" },
  { id: "A004", title: "Binary Tree Traversal", course: "CS301", courseId: "CS301", dueDate: "2025-03-20", totalMarks: 80, description: "Implement all four traversal methods (Inorder, Preorder, Postorder, Level-order) with time complexity analysis.", submitted: 0, graded: 0, status: "active" },
];

const initSubmissions = [
  { id: "S001", assignmentId: "A001", studentId: "STU2024001", studentName: "Arjun Sharma", submittedAt: "2025-03-09 14:32", filename: "linked_list_arjun.py", grade: 88, feedback: "Excellent implementation! Clean code and good edge case handling. Minor: add comments for each method.", graded: true },
  { id: "S002", assignmentId: "A002", studentId: "STU2024001", studentName: "Arjun Sharma", submittedAt: "2025-03-07 11:15", filename: "er_diagram_arjun.pdf", grade: 44, feedback: "Good diagram overall. The cardinality notations were accurate. Add weak entities for ISBN.", graded: true },
  { id: "S003", assignmentId: "A001", studentId: "STU2024002", studentName: "Sneha Patel", submittedAt: "2025-03-10 09:45", filename: "linked_list_sneha.cpp", grade: 92, feedback: "Outstanding work! Excellent use of pointers and memory management.", graded: true },
  { id: "S004", assignmentId: "A001", studentId: "STU2024003", studentName: "Ravi Verma", submittedAt: "2025-03-10 22:10", filename: "linkedlist_ravi.java", grade: null, feedback: "", graded: false },
  { id: "S005", assignmentId: "A003", studentId: "STU2024001", studentName: "Arjun Sharma", submittedAt: "2025-03-12 16:00", filename: "scheduling_report_arjun.pdf", grade: null, feedback: "", graded: false },
  { id: "S006", assignmentId: "A002", studentId: "STU2024004", studentName: "Meena Iyer", submittedAt: "2025-03-07 23:55", filename: "er_library_meena.pdf", grade: 48, feedback: "Near perfect! Small notation inconsistency on page 3.", graded: true },
];

const STUDENTS = [
  { id: "STU2024001", name: "Arjun Sharma", section: "CS-3A", cgpa: 8.7, email: "arjun@edu.ac.in" },
  { id: "STU2024002", name: "Sneha Patel", section: "CS-3A", cgpa: 9.1, email: "sneha@edu.ac.in" },
  { id: "STU2024003", name: "Ravi Verma", section: "CS-3B", cgpa: 7.9, email: "ravi@edu.ac.in" },
  { id: "STU2024004", name: "Meena Iyer", section: "CS-3B", cgpa: 9.3, email: "meena@edu.ac.in" },
  { id: "STU2024005", name: "Karan Singh", section: "CS-3A", cgpa: 8.2, email: "karan@edu.ac.in" },
];

const FACULTY = [
  { id: "FAC2024010", name: "Dr. Priya Mehta", dept: "Computer Science", courses: ["CS301", "CS302"], email: "priya@edu.ac.in" },
  { id: "FAC2024011", name: "Prof. Anil Kapoor", dept: "Computer Science", courses: ["CS303"], email: "anil@edu.ac.in" },
  { id: "FAC2024012", name: "Dr. Sunita Rao", dept: "Mathematics", courses: [], email: "sunita@edu.ac.in" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const today = () => new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
const daysLeft = (dateStr) => {
  const d = Math.ceil((new Date(dateStr) - new Date()) / 86400000);
  return d;
};
const gradeColor = (g) => g >= 80 ? "#52b788" : g >= 60 ? "#f4a261" : "#f08080";
const gradeLabel = (g, total) => {
  const p = (g / total) * 100;
  if (p >= 90) return "A+"; if (p >= 80) return "A"; if (p >= 70) return "B+";
  if (p >= 60) return "B"; if (p >= 50) return "C"; return "F";
};

// ─── Components ───────────────────────────────────────────────────────────────

function GradeCircle({ grade, total }) {
  const color = gradeColor(grade);
  return (
    <div className="grade-circle" style={{ borderColor: color, color }}>
      {gradeLabel(grade, total)}
    </div>
  );
}

// ─── STUDENT PAGES ────────────────────────────────────────────────────────────
function StudentDashboard({ user, assignments, submissions }) {
  const mySubmissions = submissions.filter(s => s.studentId === user.id);
  const pending = assignments.filter(a => a.status === "active" && !mySubmissions.find(s => s.assignmentId === a.id));
  const submitted = mySubmissions.length;
  const graded = mySubmissions.filter(s => s.graded).length;
  const avg = mySubmissions.filter(s => s.graded).reduce((acc, s) => {
    const a = assignments.find(x => x.id === s.assignmentId);
    return acc + (a ? (s.grade / a.totalMarks) * 100 : 0);
  }, 0) / (graded || 1);

  return (
    <div className="page">
      <div className="grid-4 mb-24">
        {[
          { label: "Pending Assignments", value: pending.length, accent: "#f4a261" },
          { label: "Submitted", value: submitted, accent: "#52b788" },
          { label: "Graded", value: graded, accent: "#7eb3f5" },
          { label: "Avg. Score", value: `${avg.toFixed(1)}%`, accent: "#e8c97a" },
        ].map(s => (
          <div className="stat-card" key={s.label} style={{ "--accent": s.accent }}>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div>
          <div className="section-header mb-16">
            <div><div className="section-title">Pending Assignments</div><div className="section-sub">Due soon</div></div>
          </div>
          <div className="scroll-list">
            {pending.length === 0 && <div className="text-muted" style={{padding:"16px 0"}}>All caught up! No pending assignments.</div>}
            {pending.map(a => {
              const dl = daysLeft(a.dueDate);
              return (
                <div className="asgn-card" key={a.id}>
                  <div className="asgn-title">{a.title}</div>
                  <div className="asgn-meta">
                    <span className="asgn-meta-item">📚 {a.course}</span>
                    <span className="asgn-meta-item">🏆 {a.totalMarks} marks</span>
                    <span className="asgn-meta-item" style={{ color: dl <= 2 ? "#f08080" : dl <= 5 ? "#f4a261" : "var(--muted)" }}>
                      ⏰ {dl > 0 ? `${dl} day${dl !== 1 ? "s" : ""} left` : "Overdue"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <div className="section-header mb-16">
            <div><div className="section-title">Recent Grades</div><div className="section-sub">Latest results</div></div>
          </div>
          <div className="scroll-list">
            {mySubmissions.filter(s => s.graded).map(s => {
              const a = assignments.find(x => x.id === s.assignmentId);
              return (
                <div className="asgn-card flex items-center gap-16" key={s.id}>
                  <GradeCircle grade={s.grade} total={a?.totalMarks || 100} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, color: "var(--cream)", fontWeight: 600 }}>{a?.title}</div>
                    <div className="text-sm text-muted mt-16" style={{ marginTop: 4 }}>{a?.course} • {s.grade}/{a?.totalMarks} marks</div>
                    {s.feedback && <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 6, fontStyle: "italic" }}>"{s.feedback.slice(0, 60)}..."</div>}
                  </div>
                </div>
              );
            })}
            {mySubmissions.filter(s => s.graded).length === 0 && <div className="text-muted" style={{padding:"16px 0"}}>No grades yet.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

function StudentAssignments({ user, assignments, submissions, onSubmit }) {
  const [tab, setTab] = useState("pending");
  const [modal, setModal] = useState(null);
  const [file, setFile] = useState("");
  const mySubmissions = submissions.filter(s => s.studentId === user.id);

  const pending = assignments.filter(a => a.status === "active" && !mySubmissions.find(s => s.assignmentId === a.id));
  const submitted = assignments.filter(a => mySubmissions.find(s => s.assignmentId === a.id));

  const handleSubmit = () => {
    if (!file.trim()) return;
    onSubmit(modal.id, file);
    setModal(null); setFile("");
  };

  const list = tab === "pending" ? pending : submitted;

  return (
    <div className="page">
      <div className="tabs">
        <div className={`tab ${tab === "pending" ? "active" : ""}`} onClick={() => setTab("pending")}>Pending ({pending.length})</div>
        <div className={`tab ${tab === "submitted" ? "active" : ""}`} onClick={() => setTab("submitted")}>Submitted ({submitted.length})</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {list.map(a => {
          const sub = mySubmissions.find(s => s.assignmentId === a.id);
          const dl = daysLeft(a.dueDate);
          return (
            <div className="card" key={a.id}>
              <div className="flex justify-between items-center">
                <div>
                  <div className="section-title">{a.title}</div>
                  <div className="asgn-meta" style={{ marginTop: 8 }}>
                    <span className="asgn-meta-item">📚 {a.course}</span>
                    <span className="asgn-meta-item">🏆 {a.totalMarks} marks</span>
                    <span className="asgn-meta-item">📅 Due: {a.dueDate}</span>
                    {!sub && <span className="asgn-meta-item" style={{ color: dl <= 2 ? "#f08080" : dl <= 5 ? "#f4a261" : "var(--muted)" }}>
                      ⏰ {dl > 0 ? `${dl} days left` : "Overdue"}
                    </span>}
                  </div>
                </div>
                {!sub ? (
                  <button className="btn btn-primary btn-sm" onClick={() => setModal(a)}>Submit</button>
                ) : (
                  <div className="flex items-center gap-12">
                    {sub.graded && <GradeCircle grade={sub.grade} total={a.totalMarks} />}
                    <span className={`badge ${sub.graded ? "badge-green" : "badge-orange"}`}>{sub.graded ? `${sub.grade}/${a.totalMarks}` : "Pending Review"}</span>
                  </div>
                )}
              </div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 12 }}>{a.description}</div>
              {sub && (
                <div style={{ marginTop: 12, padding: "12px", background: "rgba(0,0,0,0.2)", borderRadius: 6 }}>
                  <div className="text-sm text-muted">📎 {sub.filename} • Submitted {sub.submittedAt}</div>
                  {sub.feedback && <div style={{ fontSize: 13, color: "#a8d5b5", marginTop: 6, fontStyle: "italic" }}>💬 {sub.feedback}</div>}
                </div>
              )}
            </div>
          );
        })}
        {list.length === 0 && <div className="card text-muted">No assignments in this category.</div>}
      </div>

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">Submit Assignment</div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 600, color: "var(--cream)" }}>{modal.title}</div>
              <div className="text-sm text-muted" style={{ marginTop: 4 }}>{modal.course} • {modal.totalMarks} marks • Due {modal.dueDate}</div>
            </div>
            <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 16 }}>{modal.description}</div>
            <div className="form-group">
              <label>Filename / Link</label>
              <input value={file} onChange={e => setFile(e.target.value)} placeholder="e.g., assignment1_arjun.pdf or github.com/..." />
            </div>
            <div className="flex gap-12" style={{ marginTop: 20 }}>
              <button className="btn btn-primary w-full" onClick={handleSubmit}>Submit Assignment</button>
              <button className="btn btn-outline" onClick={() => setModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StudentProfile({ user }) {
  const mySubmissions = initSubmissions.filter(s => s.studentId === user.id);
  const graded = mySubmissions.filter(s => s.graded);
  const avg = graded.reduce((acc, s) => {
    const a = initAssignments.find(x => x.id === s.assignmentId);
    return acc + (a ? (s.grade / a.totalMarks) * 100 : 0);
  }, 0) / (graded.length || 1);

  return (
    <div className="page">
      <div className="grid-2">
        <div className="card">
          <div className="flex items-center gap-16 mb-24">
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, var(--gold), var(--navy))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontFamily: "'Playfair Display', serif", color: "var(--navy)", fontWeight: 700 }}>
              {user.name[0]}
            </div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "var(--cream)" }}>{user.name}</div>
              <div className="text-sm text-muted">{user.id}</div>
              <span className="badge badge-blue" style={{ marginTop: 6 }}>Student</span>
            </div>
          </div>
          <div className="divider" style={{ margin: "0 0 16px" }} />
          {[
            ["Section", user.section],
            ["Email", user.email],
            ["Academic Year", "2024–25"],
            ["Programme", "B.Tech Computer Science"],
            ["CGPA", "8.7 / 10.0"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between" style={{ padding: "8px 0", borderBottom: "1px solid rgba(42,63,95,0.4)" }}>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>{k}</span>
              <span style={{ fontSize: 13, color: "var(--cream)" }}>{v}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card">
            <div className="section-title mb-16">Academic Performance</div>
            <div style={{ marginBottom: 12 }}>
              <div className="flex justify-between mb-8"><span className="text-sm text-muted">Overall Average</span><span className="text-sm text-gold">{avg.toFixed(1)}%</span></div>
              <div className="progress-bar"><div className="progress-fill" style={{ width: `${avg}%` }} /></div>
            </div>
            {graded.map(s => {
              const a = initAssignments.find(x => x.id === s.assignmentId);
              const pct = a ? (s.grade / a.totalMarks) * 100 : 0;
              return (
                <div key={s.id} style={{ marginBottom: 10 }}>
                  <div className="flex justify-between mb-8"><span style={{ fontSize: 12, color: "var(--cream)" }}>{a?.title}</span><span className="text-sm" style={{ color: gradeColor(pct) }}>{s.grade}/{a?.totalMarks}</span></div>
                  <div className="progress-bar"><div className="progress-fill" style={{ width: `${pct}%`, background: gradeColor(pct) }} /></div>
                </div>
              );
            })}
          </div>
          <div className="card">
            <div className="section-title mb-16">Enrolled Courses</div>
            {COURSES.map(c => (
              <div key={c.id} className="flex justify-between items-center" style={{ padding: "10px 0", borderBottom: "1px solid rgba(42,63,95,0.4)" }}>
                <div>
                  <div style={{ fontSize: 13, color: "var(--cream)" }}>{c.name}</div>
                  <div className="text-sm text-muted">{c.teacher}</div>
                </div>
                <span className="badge badge-blue">{c.id}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TEACHER PAGES ────────────────────────────────────────────────────────────
function TeacherDashboard({ assignments, submissions }) {
  const myAssignments = assignments.filter(a => ["CS301", "CS302"].includes(a.courseId));
  const totalSubs = submissions.filter(s => myAssignments.find(a => a.id === s.assignmentId));
  const pending = totalSubs.filter(s => !s.graded).length;

  return (
    <div className="page">
      <div className="grid-4 mb-24">
        {[
          { label: "My Assignments", value: myAssignments.length, accent: "var(--gold)" },
          { label: "Total Submissions", value: totalSubs.length, accent: "#7eb3f5" },
          { label: "Pending Grading", value: pending, accent: "#f4a261" },
          { label: "Students", value: STUDENTS.length, accent: "#52b788" },
        ].map(s => (
          <div className="stat-card" key={s.label} style={{ "--accent": s.accent }}>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div>
          <div className="section-header mb-16"><div className="section-title">My Assignments</div></div>
          <div className="scroll-list">
            {myAssignments.map(a => {
              const subs = submissions.filter(s => s.assignmentId === a.id);
              const graded = subs.filter(s => s.graded).length;
              return (
                <div className="asgn-card" key={a.id}>
                  <div className="flex justify-between items-center">
                    <div className="asgn-title">{a.title}</div>
                    <span className={`badge ${a.status === "active" ? "badge-green" : "badge-red"}`}>{a.status}</span>
                  </div>
                  <div className="asgn-meta">
                    <span className="asgn-meta-item">📚 {a.course}</span>
                    <span className="asgn-meta-item">📅 {a.dueDate}</span>
                    <span className="asgn-meta-item">✅ {graded}/{subs.length} graded</span>
                  </div>
                  <div className="progress-bar" style={{ marginTop: 8 }}>
                    <div className="progress-fill" style={{ width: subs.length ? `${(graded / subs.length) * 100}%` : "0%" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div className="section-header mb-16"><div className="section-title">Pending Reviews</div></div>
          <div className="scroll-list">
            {totalSubs.filter(s => !s.graded).map(s => {
              const a = myAssignments.find(x => x.id === s.assignmentId);
              return (
                <div className="asgn-card" key={s.id}>
                  <div style={{ fontSize: 14, color: "var(--cream)", fontWeight: 600 }}>{s.studentName}</div>
                  <div className="text-sm text-muted" style={{ marginTop: 4 }}>{a?.title} • {s.submittedAt}</div>
                  <div className="text-sm text-muted">📎 {s.filename}</div>
                </div>
              );
            })}
            {totalSubs.filter(s => !s.graded).length === 0 && <div className="text-muted" style={{ padding: "16px 0" }}>All submissions graded!</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

function TeacherGrading({ assignments, submissions, onGrade }) {
  const myAssignments = assignments.filter(a => ["CS301", "CS302"].includes(a.courseId));
  const [selected, setSelected] = useState(myAssignments[0]?.id || "");
  const [gradingModal, setGradingModal] = useState(null);
  const [gradeVal, setGradeVal] = useState("");
  const [feedback, setFeedback] = useState("");

  const subs = submissions.filter(s => s.assignmentId === selected);
  const assignment = myAssignments.find(a => a.id === selected);

  const handleGrade = () => {
    onGrade(gradingModal.id, parseInt(gradeVal), feedback);
    setGradingModal(null); setGradeVal(""); setFeedback("");
  };

  return (
    <div className="page">
      <div className="form-group" style={{ maxWidth: 320, marginBottom: 24 }}>
        <label>Select Assignment</label>
        <select value={selected} onChange={e => setSelected(e.target.value)}>
          {myAssignments.map(a => <option key={a.id} value={a.id}>{a.title}</option>)}
        </select>
      </div>

      {assignment && (
        <div className="card mb-24" style={{ padding: "14px 20px" }}>
          <div className="flex gap-16 flex-wrap">
            <span className="text-sm text-muted">📚 {assignment.course}</span>
            <span className="text-sm text-muted">🏆 Max: {assignment.totalMarks}</span>
            <span className="text-sm text-muted">📅 Due: {assignment.dueDate}</span>
            <span className="text-sm text-muted">📥 {subs.length} submissions</span>
          </div>
        </div>
      )}

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Student</th><th>Submitted At</th><th>File</th><th>Status</th><th>Grade</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {subs.map(s => (
              <tr key={s.id}>
                <td>{s.studentName}<br /><span className="text-sm text-muted">{s.studentId}</span></td>
                <td><span className="text-sm">{s.submittedAt}</span></td>
                <td><span className="text-sm text-gold">📎 {s.filename}</span></td>
                <td><span className={`badge ${s.graded ? "badge-green" : "badge-orange"}`}>{s.graded ? "Graded" : "Pending"}</span></td>
                <td>{s.graded ? <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--gold2)" }}>{s.grade}/{assignment?.totalMarks}</span> : "—"}</td>
                <td>
                  <button className="btn btn-sm btn-outline" onClick={() => { setGradingModal(s); setGradeVal(s.grade || ""); setFeedback(s.feedback || ""); }}>
                    {s.graded ? "Edit" : "Grade"}
                  </button>
                </td>
              </tr>
            ))}
            {subs.length === 0 && <tr><td colSpan={6} className="text-muted">No submissions yet.</td></tr>}
          </tbody>
        </table>
      </div>

      {gradingModal && (
        <div className="modal-overlay" onClick={() => setGradingModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">Grade Submission</div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ color: "var(--cream)", fontWeight: 600 }}>{gradingModal.studentName}</div>
              <div className="text-sm text-muted">📎 {gradingModal.filename} • {gradingModal.submittedAt}</div>
            </div>
            <div className="form-group">
              <label>Grade (out of {assignment?.totalMarks})</label>
              <input type="number" value={gradeVal} onChange={e => setGradeVal(e.target.value)} placeholder={`0 – ${assignment?.totalMarks}`} min={0} max={assignment?.totalMarks} />
            </div>
            <div className="form-group">
              <label>Feedback</label>
              <textarea value={feedback} onChange={e => setFeedback(e.target.value)} placeholder="Provide detailed feedback for the student..." />
            </div>
            <div className="flex gap-12" style={{ marginTop: 20 }}>
              <button className="btn btn-success w-full" onClick={handleGrade}>Save Grade</button>
              <button className="btn btn-outline" onClick={() => setGradingModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TeacherCreateAssignment({ onAdd }) {
  const [form, setForm] = useState({ title: "", courseId: "CS301", dueDate: "", totalMarks: "", description: "" });
  const [success, setSuccess] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleCreate = () => {
    if (!form.title || !form.dueDate || !form.totalMarks || !form.description) return;
    onAdd({ ...form, totalMarks: parseInt(form.totalMarks), course: COURSES.find(c => c.id === form.courseId)?.name });
    setForm({ title: "", courseId: "CS301", dueDate: "", totalMarks: "", description: "" });
    setSuccess(true); setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="page">
      <div className="card" style={{ maxWidth: 640 }}>
        <div className="modal-title">Create New Assignment</div>
        {success && <div style={{ background: "rgba(45,106,79,0.2)", border: "1px solid rgba(45,106,79,0.5)", borderRadius: 6, padding: "10px 14px", color: "#52b788", marginBottom: 16, fontSize: 13 }}>✅ Assignment created successfully!</div>}
        <div className="form-group"><label>Assignment Title</label><input value={form.title} onChange={e => set("title", e.target.value)} placeholder="e.g., Binary Tree Implementation" /></div>
        <div className="grid-2">
          <div className="form-group">
            <label>Course</label>
            <select value={form.courseId} onChange={e => set("courseId", e.target.value)}>
              {COURSES.filter(c => ["CS301", "CS302"].includes(c.id)).map(c => <option key={c.id} value={c.id}>{c.id} – {c.name}</option>)}
            </select>
          </div>
          <div className="form-group"><label>Total Marks</label><input type="number" value={form.totalMarks} onChange={e => set("totalMarks", e.target.value)} placeholder="e.g., 100" /></div>
        </div>
        <div className="form-group"><label>Due Date</label><input type="date" value={form.dueDate} onChange={e => set("dueDate", e.target.value)} /></div>
        <div className="form-group"><label>Description / Instructions</label><textarea value={form.description} onChange={e => set("description", e.target.value)} placeholder="Describe the task, requirements, and evaluation criteria..." /></div>
        <button className="btn btn-primary" onClick={handleCreate}>Create Assignment</button>
      </div>
    </div>
  );
}

function TeacherProfile({ user }) {
  return (
    <div className="page">
      <div className="grid-2">
        <div className="card">
          <div className="flex items-center gap-16 mb-24">
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, #7eb3f5, var(--navy))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontFamily: "'Playfair Display', serif", color: "var(--navy)", fontWeight: 700 }}>
              {user.name[3]}
            </div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "var(--cream)" }}>{user.name}</div>
              <div className="text-sm text-muted">{user.id}</div>
              <span className="badge badge-blue" style={{ marginTop: 6 }}>Faculty</span>
            </div>
          </div>
          <div className="divider" style={{ margin: "0 0 16px" }} />
          {[
            ["Department", user.dept],
            ["Email", user.email],
            ["Designation", "Assistant Professor"],
            ["Experience", "8 Years"],
            ["Courses Taught", "2 Active"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between" style={{ padding: "8px 0", borderBottom: "1px solid rgba(42,63,95,0.4)" }}>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>{k}</span>
              <span style={{ fontSize: 13, color: "var(--cream)" }}>{v}</span>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="section-title mb-16">Courses Assigned</div>
          {COURSES.filter(c => ["CS301", "CS302"].includes(c.id)).map(c => (
            <div key={c.id} style={{ padding: "12px 0", borderBottom: "1px solid rgba(42,63,95,0.4)" }}>
              <div className="flex justify-between items-center">
                <div>
                  <div style={{ fontSize: 14, color: "var(--cream)" }}>{c.name}</div>
                  <div className="text-sm text-muted">Code: {c.id} • {c.students} students</div>
                </div>
                <span className="badge badge-green">Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN PAGES ──────────────────────────────────────────────────────────────
function AdminDashboard({ assignments, submissions }) {
  const graded = submissions.filter(s => s.graded).length;
  return (
    <div className="page">
      <div className="grid-4 mb-24">
        {[
          { label: "Total Students", value: STUDENTS.length, accent: "#52b788" },
          { label: "Faculty Members", value: FACULTY.length, accent: "#7eb3f5" },
          { label: "Assignments", value: assignments.length, accent: "var(--gold)" },
          { label: "Submissions", value: submissions.length, accent: "#f4a261" },
        ].map(s => (
          <div className="stat-card" key={s.label} style={{ "--accent": s.accent }}>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="section-title mb-16">Courses Overview</div>
          <table><thead><tr><th>Code</th><th>Course</th><th>Faculty</th><th>Students</th></tr></thead>
            <tbody>{COURSES.map(c => (
              <tr key={c.id}><td><span className="badge badge-blue">{c.id}</span></td><td>{c.name}</td><td>{c.teacher}</td><td>{c.students}</td></tr>
            ))}</tbody>
          </table>
        </div>
        <div className="card">
          <div className="section-title mb-16">Submission Stats</div>
          {assignments.map(a => {
            const subs = submissions.filter(s => s.assignmentId === a.id);
            const g = subs.filter(s => s.graded).length;
            return (
              <div key={a.id} style={{ marginBottom: 14 }}>
                <div className="flex justify-between mb-8"><span style={{ fontSize: 12, color: "var(--cream)" }}>{a.title}</span><span className="text-sm text-muted">{g}/{subs.length}</span></div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: subs.length ? `${(g / subs.length) * 100}%` : "0%" }} /></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function AdminStudents() {
  return (
    <div className="page">
      <div className="section-header mb-24"><div className="section-title">All Students</div><span className="badge badge-blue">{STUDENTS.length} enrolled</span></div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>ID</th><th>Name</th><th>Section</th><th>CGPA</th><th>Email</th><th>Status</th></tr></thead>
            <tbody>
              {STUDENTS.map(s => (
                <tr key={s.id}>
                  <td><span className="text-sm text-gold">{s.id}</span></td>
                  <td style={{ fontWeight: 600 }}>{s.name}</td>
                  <td>{s.section}</td>
                  <td><span style={{ fontFamily: "'JetBrains Mono', monospace", color: s.cgpa >= 9 ? "#52b788" : s.cgpa >= 8 ? "#e8c97a" : "var(--muted)" }}>{s.cgpa}</span></td>
                  <td className="text-muted">{s.email}</td>
                  <td><span className="badge badge-green">Active</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AdminFaculty() {
  return (
    <div className="page">
      <div className="section-header mb-24"><div className="section-title">All Faculty</div><span className="badge badge-blue">{FACULTY.length} members</span></div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>ID</th><th>Name</th><th>Department</th><th>Courses</th><th>Email</th><th>Status</th></tr></thead>
            <tbody>
              {FACULTY.map(f => (
                <tr key={f.id}>
                  <td><span className="text-sm text-gold">{f.id}</span></td>
                  <td style={{ fontWeight: 600 }}>{f.name}</td>
                  <td>{f.dept}</td>
                  <td>{f.courses.map(c => <span key={c} className="badge badge-gold" style={{ marginRight: 4 }}>{c}</span>)}</td>
                  <td className="text-muted">{f.email}</td>
                  <td><span className="badge badge-green">Active</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AdminAllAssignments({ assignments, submissions }) {
  return (
    <div className="page">
      <div className="section-header mb-24"><div className="section-title">All Assignments</div></div>
      <div className="card table-wrap">
        <table>
          <thead><tr><th>ID</th><th>Title</th><th>Course</th><th>Due Date</th><th>Marks</th><th>Submitted</th><th>Graded</th><th>Status</th></tr></thead>
          <tbody>
            {assignments.map(a => {
              const subs = submissions.filter(s => s.assignmentId === a.id);
              const graded = subs.filter(s => s.graded).length;
              return (
                <tr key={a.id}>
                  <td><span className="text-sm text-gold">{a.id}</span></td>
                  <td style={{ fontWeight: 600 }}>{a.title}</td>
                  <td><span className="badge badge-blue">{a.courseId}</span></td>
                  <td className="text-sm">{a.dueDate}</td>
                  <td><span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{a.totalMarks}</span></td>
                  <td>{subs.length}</td>
                  <td>{graded}</td>
                  <td><span className={`badge ${a.status === "active" ? "badge-green" : "badge-red"}`}>{a.status}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminProfile({ user }) {
  return (
    <div className="page">
      <div style={{ maxWidth: 480 }}>
        <div className="card">
          <div className="flex items-center gap-16 mb-24">
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, #f4a261, var(--navy))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontFamily: "'Playfair Display', serif", color: "var(--navy)", fontWeight: 700 }}>A</div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "var(--cream)" }}>{user.name}</div>
              <div className="text-sm text-muted">{user.id}</div>
              <span className="badge badge-gold" style={{ marginTop: 6 }}>Administrator</span>
            </div>
          </div>
          <div className="divider" style={{ margin: "0 0 16px" }} />
          {[["Department", user.dept], ["Email", user.email], ["Access Level", "Full System Admin"], ["Institution", "Academic Institute"], ["Year", "2024–25"]].map(([k, v]) => (
            <div key={k} className="flex justify-between" style={{ padding: "8px 0", borderBottom: "1px solid rgba(42,63,95,0.4)" }}>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>{k}</span>
              <span style={{ fontSize: 13, color: "var(--cream)" }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Nav Configs ──────────────────────────────────────────────────────────────
const NAV = {
  student: [
    { key: "dashboard", icon: "🏛️", label: "Dashboard" },
    { key: "assignments", icon: "📝", label: "Assignments" },
    { key: "profile", icon: "👤", label: "My Profile" },
  ],
  teacher: [
    { key: "dashboard", icon: "🏛️", label: "Dashboard" },
    { key: "grading", icon: "✅", label: "Grade Submissions" },
    { key: "create", icon: "➕", label: "Create Assignment" },
    { key: "profile", icon: "👤", label: "My Profile" },
  ],
  admin: [
    { key: "dashboard", icon: "🏛️", label: "Dashboard" },
    { key: "students", icon: "🎓", label: "Students" },
    { key: "faculty", icon: "👨‍🏫", label: "Faculty" },
    { key: "assignments", icon: "📋", label: "All Assignments" },
    { key: "profile", icon: "👤", label: "My Profile" },
  ],
};

const PAGE_TITLES = {
  dashboard: "Dashboard", assignments: "Assignments", profile: "Profile",
  grading: "Grade Submissions", create: "Create Assignment",
  students: "Manage Students", faculty: "Manage Faculty",
};

// ─── Login ────────────────────────────────────────────────────────────────────
function Login({ onLogin }) {
  const [role, setRole] = useState("student");
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const DEMO = { student: ["STU2024001", "1234"], teacher: ["FAC2024010", "1234"], admin: ["ADM2024001", "1234"] };

  const handle = () => {
    const [did, dp] = DEMO[role];
    if (id === did && pass === dp) { onLogin(MOCK_USERS[role]); }
    else if (!id && !pass) { onLogin(MOCK_USERS[role]); }
    else setErr("Invalid credentials. Use demo credentials or leave blank.");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">EduPortal</div>
        <div className="login-sub">Assignment & Grading System</div>
        <div className="role-selector">
          {["student", "teacher", "admin"].map(r => (
            <div key={r} className={`role-btn ${role === r ? "active" : ""}`} onClick={() => setRole(r)}>
              {r === "student" ? "🎓" : r === "teacher" ? "👨‍🏫" : "⚙️"}<br />{r.charAt(0).toUpperCase() + r.slice(1)}
            </div>
          ))}
        </div>
        <div style={{ fontSize: 11, color: "var(--muted)", fontFamily: "'JetBrains Mono', monospace", marginBottom: 16, padding: "8px 10px", background: "rgba(201,168,76,0.06)", borderRadius: 6 }}>
          Demo: ID {DEMO[role][0]} / Pass {DEMO[role][1]}<br />Or leave blank to auto-login
        </div>
        <div className="form-group"><label>ID / Username</label><input value={id} onChange={e => setId(e.target.value)} placeholder={DEMO[role][0]} /></div>
        <div className="form-group"><label>Password</label><input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••" /></div>
        {err && <div style={{ color: "#f08080", fontSize: 12, marginBottom: 12 }}>{err}</div>}
        <button className="btn btn-primary w-full" onClick={handle}>Sign In</button>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [assignments, setAssignments] = useState(initAssignments);
  const [submissions, setSubmissions] = useState(initSubmissions);

  if (!user) return (<><style>{STYLES}</style><Login onLogin={u => { setUser(u); setPage("dashboard"); }} /></>);

  const handleSubmit = (assignmentId, filename) => {
    const newSub = {
      id: `S0${submissions.length + 1}`, assignmentId, studentId: user.id,
      studentName: user.name, submittedAt: new Date().toLocaleString("sv").slice(0, 16),
      filename, grade: null, feedback: "", graded: false,
    };
    setSubmissions(s => [...s, newSub]);
    setAssignments(a => a.map(x => x.id === assignmentId ? { ...x, submitted: x.submitted + 1 } : x));
  };

  const handleGrade = (subId, grade, feedback) => {
    setSubmissions(s => s.map(x => x.id === subId ? { ...x, grade, feedback, graded: true } : x));
  };

  const handleAddAssignment = (data) => {
    const id = `A00${assignments.length + 1}`;
    setAssignments(a => [...a, { ...data, id, status: "active", submitted: 0, graded: 0 }]);
  };

  const nav = NAV[user.role];
  const pendingCount = user.role === "teacher"
    ? submissions.filter(s => !s.graded && assignments.find(a => a.id === s.assignmentId && ["CS301", "CS302"].includes(a.courseId))).length
    : 0;

  const renderPage = () => {
    if (user.role === "student") {
      if (page === "dashboard") return <StudentDashboard user={user} assignments={assignments} submissions={submissions} />;
      if (page === "assignments") return <StudentAssignments user={user} assignments={assignments} submissions={submissions} onSubmit={handleSubmit} />;
      if (page === "profile") return <StudentProfile user={user} />;
    }
    if (user.role === "teacher") {
      if (page === "dashboard") return <TeacherDashboard assignments={assignments} submissions={submissions} />;
      if (page === "grading") return <TeacherGrading assignments={assignments} submissions={submissions} onGrade={handleGrade} />;
      if (page === "create") return <TeacherCreateAssignment onAdd={handleAddAssignment} />;
      if (page === "profile") return <TeacherProfile user={user} />;
    }
    if (user.role === "admin") {
      if (page === "dashboard") return <AdminDashboard assignments={assignments} submissions={submissions} />;
      if (page === "students") return <AdminStudents />;
      if (page === "faculty") return <AdminFaculty />;
      if (page === "assignments") return <AdminAllAssignments assignments={assignments} submissions={submissions} />;
      if (page === "profile") return <AdminProfile user={user} />;
    }
    return null;
  };

  return (
    <>
      <style>{STYLES}</style>
      <div className="app">
        <aside className="sidebar">
          <div className="sidebar-brand">
            <h1>EduPortal</h1>
            <p>Assignment & Grading System</p>
          </div>
          <div className="sidebar-role">
            {user.role === "student" ? "🎓" : user.role === "teacher" ? "👨‍🏫" : "⚙️"} {user.role}
          </div>
          <nav className="sidebar-nav">
            <div className="nav-section">Navigation</div>
            {nav.map(n => (
              <div key={n.key} className={`nav-item ${page === n.key ? "active" : ""}`} onClick={() => setPage(n.key)}>
                <span className="icon">{n.icon}</span>
                {n.label}
                {n.key === "grading" && pendingCount > 0 && <span className="nav-badge">{pendingCount}</span>}
              </div>
            ))}
          </nav>
          <div className="sidebar-footer">
            <div className="user-chip" onClick={() => setPage("profile")}>
              <div className="user-avatar">{user.name[0]}</div>
              <div className="user-info">
                <div className="user-name">{user.name}</div>
                <div className="user-id">{user.id}</div>
              </div>
              <span style={{ color: "var(--muted)", fontSize: 12 }}>›</span>
            </div>
            <button className="btn btn-outline btn-sm w-full" style={{ marginTop: 10 }} onClick={() => setUser(null)}>Sign Out</button>
          </div>
        </aside>

        <main className="main">
          <div className="topbar">
            <div className="topbar-title">{PAGE_TITLES[page]}</div>
            <div className="topbar-right">
              <span className="topbar-date">{today()}</span>
            </div>
          </div>
          {renderPage()}
        </main>
      </div>
    </>
  );
}
