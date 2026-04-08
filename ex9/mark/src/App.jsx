import React from "react";

function StudentMarks({ name, subjects }) {
  const total = Object.values(subjects).reduce((sum, mark) => sum + mark, 0);

  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <h2>Student Mark Details</h2>
      <h3>{name}</h3>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(subjects).map(([subject, mark]) => (
            <tr key={subject}>
              <td>{subject}</td>
              <td>{mark}</td>
            </tr>
          ))}
          <tr>
            <td><b>Total</b></td>
            <td><b>{total}</b></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default function App() {
  return (
    <StudentMarks
      name="Arun"
      subjects={{
        Math: 92,
        Science: 88,
        English: 79,
        Computer: 95,
      }}
    />
  );
}