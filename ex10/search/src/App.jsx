import React, { useState } from "react";

export default function App() {
  const terms = [
    "React",
    "Angular",
    "Vue",
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "Node.js",
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredTerms = terms.filter((term) =>
    term.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <h2>Search Filter</h2>

      <form>
        <input
          type="text"
          placeholder="Search term..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>

      <ul>
        {filteredTerms.map((term, index) => (
          <li key={index}>{term}</li>
        ))}
      </ul>
    </div>
  );
}