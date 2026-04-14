import React from "react";

const gradeInfo = (mark) => {
  if (mark >= 90) return { grade: "A+", color: "#16a34a", bg: "#f0fdf4" };
  if (mark >= 80) return { grade: "A",  color: "#2563eb", bg: "#eff6ff" };
  if (mark >= 70) return { grade: "B",  color: "#7c3aed", bg: "#f5f3ff" };
  if (mark >= 60) return { grade: "C",  color: "#d97706", bg: "#fffbeb" };
  return { grade: "F", color: "#dc2626", bg: "#fef2f2" };
};

function StudentMarks({ name, rollNo, subjects }) {
  const total = Object.values(subjects).reduce((s, m) => s + m, 0);
  const avg = (total / Object.keys(subjects).length).toFixed(1);
  const { grade, color } = gradeInfo(avg);
  const maxMark = 100;

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', Arial, sans-serif", padding: "24px" }}>
      <div style={{ background: "#fff", borderRadius: "16px", boxShadow: "0 4px 24px rgba(0,0,0,.1)", width: "100%", maxWidth: "560px", overflow: "hidden" }}>

        {/* Header */}
        <div style={{ background: "linear-gradient(135deg, #1e3a8a, #3b82f6)", padding: "28px 32px", color: "#fff" }}>
          <div style={{ fontSize: "0.8rem", opacity: 0.8, marginBottom: "4px", textTransform: "uppercase", letterSpacing: "1px" }}>Student Report</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 700 }}>{name}</div>
          {rollNo && <div style={{ fontSize: "0.9rem", opacity: 0.75, marginTop: "4px" }}>Roll No: {rollNo}</div>}
        </div>

        {/* Grade banner */}
        <div style={{ display: "flex", justifyContent: "space-around", padding: "20px 32px", borderBottom: "1px solid #f0f0f0", background: "#fafbff" }}>
          {[["Total", `${total} / ${Object.keys(subjects).length * maxMark}`], ["Average", `${avg}%`], ["Grade", grade]].map(([label, val]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "0.75rem", color: "#888", textTransform: "uppercase", letterSpacing: ".8px", marginBottom: "4px" }}>{label}</div>
              <div style={{ fontSize: "1.4rem", fontWeight: 700, color }}>{val}</div>
            </div>
          ))}
        </div>

        {/* Subject rows */}
        <div style={{ padding: "20px 32px 28px" }}>
          <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: ".8px", marginBottom: "14px" }}>Subject Breakdown</div>
          {Object.entries(subjects).map(([subject, mark]) => {
            const { grade: g, color: c, bg } = gradeInfo(mark);
            const pct = (mark / maxMark) * 100;
            return (
              <div key={subject} style={{ marginBottom: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                  <span style={{ fontWeight: 500 }}>{subject}</span>
                  <span style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <span style={{ background: bg, color: c, padding: "2px 8px", borderRadius: "20px", fontSize: "0.78rem", fontWeight: 700 }}>{g}</span>
                    <span style={{ fontWeight: 700, color: "#333" }}>{mark}</span>
                  </span>
                </div>
                <div style={{ background: "#f0f0f0", borderRadius: "999px", height: "6px", overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, background: c, height: "100%", borderRadius: "999px", transition: "width .6s ease" }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <StudentMarks
      name="Arun Kumar"
      rollNo="21CS042"
      subjects={{ Math: 92, Science: 88, English: 79, Computer: 95 }}
    />
  );
}
