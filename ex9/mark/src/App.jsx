import React, { useState } from "react";

const gradeInfo = (mark) => {
  if (mark >= 90) return { grade: "A+", color: "#16a34a", bg: "#f0fdf4" };
  if (mark >= 80) return { grade: "A", color: "#2563eb", bg: "#eff6ff" };
  if (mark >= 70) return { grade: "B", color: "#7c3aed", bg: "#f5f3ff" };
  if (mark >= 60) return { grade: "C", color: "#d97706", bg: "#fffbeb" };
  return { grade: "F", color: "#dc2626", bg: "#fef2f2" };
};

function StudentMarks({ name, rollNo, subjects }) {
  const total = Object.values(subjects).reduce((s, m) => s + m, 0);
  const avg = (total / Object.keys(subjects).length).toFixed(1);
  const { grade, color } = gradeInfo(avg);
  const maxMark = 100;

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>{name} ({rollNo})</h2>
      <p><b>Total:</b> {total}</p>
      <p><b>Average:</b> {avg}%</p>
      <p><b>Grade:</b> <span style={{ color }}>{grade}</span></p>

      <ul>
        {Object.entries(subjects).map(([sub, mark]) => (
          <li key={sub}>{sub}: {mark}</li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [subject, setSubject] = useState("");
  const [mark, setMark] = useState("");
  const [subjects, setSubjects] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const addSubject = () => {
    if (!subject || !mark) return;

    setSubjects({
      ...subjects,
      [subject]: Number(mark),
    });

    setSubject("");
    setMark("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(subjects).length === 0) return;
    setSubmitted(true);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Student Marks Input</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br /><br />

        <input
          type="text"
          placeholder="Roll No"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
        />
        <br /><br />

        <h3>Add Subject</h3>
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input
          type="number"
          placeholder="Marks"
          value={mark}
          onChange={(e) => setMark(e.target.value)}
        />
        <button type="button" onClick={addSubject}>
          Add
        </button>

        <br /><br />
        <button type="submit">Generate Report</button>
      </form>

      {/* Show entered subjects */}
      {Object.keys(subjects).length > 0 && (
        <div>
          <h3>Subjects Added:</h3>
          <ul>
            {Object.entries(subjects).map(([s, m]) => (
              <li key={s}>{s}: {m}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Show result */}
      {submitted && (
        <StudentMarks
          name={name}
          rollNo={rollNo}
          subjects={subjects}
        />
      )}
    </div>
  );
}