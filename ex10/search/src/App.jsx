import React, { useState, useRef } from "react";

const TERMS = [
  { name: "React",      tag: "Frontend",  color: "#61dafb", icon: "⚛️" },
  { name: "Angular",   tag: "Frontend",  color: "#dd1b16", icon: "🅰️" },
  { name: "Vue",       tag: "Frontend",  color: "#42b883", icon: "💚" },
  { name: "JavaScript",tag: "Language",  color: "#f7df1e", icon: "🟨" },
  { name: "Python",    tag: "Language",  color: "#3776ab", icon: "🐍" },
  { name: "Java",      tag: "Language",  color: "#f89820", icon: "☕" },
  { name: "C++",       tag: "Language",  color: "#00599c", icon: "⚙️" },
  { name: "Node.js",   tag: "Backend",   color: "#339933", icon: "🟢" },
];

function highlight(text, query) {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark style={{ background: "#fef08a", borderRadius: "2px", padding: "0 1px" }}>
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  const filtered = TERMS.filter((t) =>
    t.name.toLowerCase().includes(query.toLowerCase()) ||
    t.tag.toLowerCase().includes(query.toLowerCase())
  );

  const tagCounts = TERMS.reduce((acc, t) => {
    acc[t.tag] = (acc[t.tag] || 0) + 1; return acc;
  }, {});

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1e293b, #334155)", padding: "40px 20px 60px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: "1.8rem", fontWeight: 700, marginBottom: "8px" }}>🔍 Tech Search</h1>
        <p style={{ color: "rgba(255,255,255,.55)", fontSize: "0.9rem", marginBottom: "28px" }}>
          {Object.entries(tagCounts).map(([t, c]) => `${c} ${t}`).join(" · ")}
        </p>
        {/* Search box */}
        <div style={{ position: "relative", maxWidth: "420px", margin: "0 auto" }}>
          <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: "1rem", pointerEvents: "none" }}>🔍</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search technologies…"
            style={{ width: "100%", padding: "13px 40px 13px 42px", border: "none", borderRadius: "12px", fontSize: "1rem", outline: "none", background: "rgba(255,255,255,.95)", color: "#1e293b", boxSizing: "border-box", boxShadow: "0 4px 20px rgba(0,0,0,.2)" }}
          />
          {query && (
            <button
              onClick={() => { setQuery(""); inputRef.current.focus(); }}
              style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#94a3b8", fontSize: "1.1rem", cursor: "pointer", lineHeight: 1 }}
            >×</button>
          )}
        </div>
      </div>

      {/* Results */}
      <div style={{ maxWidth: "640px", margin: "-28px auto 0", padding: "0 20px 40px" }}>
        {/* Count badge */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <span style={{ background: "#fff", borderRadius: "999px", padding: "6px 14px", fontSize: "0.82rem", color: "#64748b", boxShadow: "0 1px 4px rgba(0,0,0,.08)", fontWeight: 500 }}>
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            {query && ` for "${query}"`}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#94a3b8" }}>
            <div style={{ fontSize: "3rem", marginBottom: "12px" }}>🤷</div>
            <div style={{ fontSize: "1rem", fontWeight: 500 }}>No results found</div>
            <div style={{ fontSize: "0.85rem", marginTop: "6px" }}>Try a different search term</div>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "10px" }}>
            {filtered.map((term) => (
              <div
                key={term.name}
                style={{ background: "#fff", borderRadius: "12px", padding: "16px 20px", boxShadow: "0 1px 6px rgba(0,0,0,.07)", display: "flex", alignItems: "center", gap: "16px", borderLeft: `4px solid ${term.color}`, transition: "box-shadow .2s, transform .15s", cursor: "default" }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,.13)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 6px rgba(0,0,0,.07)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <span style={{ fontSize: "1.8rem", flexShrink: 0 }}>{term.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: "1rem", color: "#1e293b" }}>
                    {highlight(term.name, query)}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#94a3b8", marginTop: "2px" }}>
                    {highlight(term.tag, query)}
                  </div>
                </div>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: term.color, flexShrink: 0 }} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
