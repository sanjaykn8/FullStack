import React, { useState } from "react";

const FILTERS = ["all", "active", "completed"];

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");

  const addTodo = () => {
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now(), text: text.trim(), completed: false }]);
    setText("");
  };

  const deleteTodo = (id) => setTodos(todos.filter((t) => t.id !== id));
  const toggleTodo = (id) => setTodos(todos.map((t) => t.id === id ? { ...t, completed: !t.completed } : t));
  const clearCompleted = () => setTodos(todos.filter((t) => !t.completed));

  const filtered = todos.filter((t) =>
    filter === "completed" ? t.completed : filter === "active" ? !t.completed : true
  );

  const activeCount = todos.filter((t) => !t.completed).length;

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", display: "flex", alignItems: "flex-start", justifyContent: "center", fontFamily: "'Segoe UI', Arial, sans-serif", padding: "60px 20px" }}>
      <div style={{ width: "100%", maxWidth: "500px" }}>
        <h1 style={{ color: "#fff", fontSize: "2.8rem", fontWeight: 300, textAlign: "center", marginBottom: "32px", letterSpacing: "3px", textTransform: "uppercase" }}>todos</h1>

        {/* Input */}
        <div style={{ background: "#fff", borderRadius: "8px", display: "flex", alignItems: "center", boxShadow: "0 2px 20px rgba(0,0,0,.15)", marginBottom: "4px", overflow: "hidden" }}>
          <div
            onClick={() => setTodos(todos.map((t) => ({ ...t, completed: activeCount === 0 ? false : true })))}
            style={{ padding: "0 18px", fontSize: "1.3rem", cursor: "pointer", color: activeCount === 0 && todos.length > 0 ? "#737373" : "#ccc" }}
            title="Toggle all"
          >❯</div>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder="What needs to be done?"
            style={{ flex: 1, border: "none", outline: "none", padding: "18px 8px", fontSize: "1.1rem", color: "#333" }}
          />
        </div>

        {/* Todo list */}
        <div style={{ background: "#fff", borderRadius: "8px", boxShadow: "0 2px 20px rgba(0,0,0,.15)" }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#ccc", fontSize: "1rem" }}>
              {todos.length === 0 ? "Add your first task above ↑" : "Nothing to show for this filter."}
            </div>
          ) : (
            filtered.map((todo, i) => (
              <div
                key={todo.id}
                style={{ display: "flex", alignItems: "center", padding: "16px 20px", borderBottom: i < filtered.length - 1 ? "1px solid #f0f0f0" : "none" }}
              >
                <div
                  onClick={() => toggleTodo(todo.id)}
                  style={{ width: "26px", height: "26px", borderRadius: "50%", border: `2px solid ${todo.completed ? "#6d67e4" : "#ddd"}`, background: todo.completed ? "#6d67e4" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, transition: "all .2s" }}
                >
                  {todo.completed && <span style={{ color: "#fff", fontSize: "0.75rem" }}>✓</span>}
                </div>
                <span style={{ flex: 1, marginLeft: "14px", fontSize: "1rem", color: todo.completed ? "#ccc" : "#333", textDecoration: todo.completed ? "line-through" : "none", transition: "all .2s" }}>
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  style={{ background: "none", border: "none", color: "#ccc", fontSize: "1.3rem", cursor: "pointer", padding: "0 4px", lineHeight: 1 }}
                  title="Delete"
                >×</button>
              </div>
            ))
          )}

          {/* Footer */}
          {todos.length > 0 && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", borderTop: "1px solid #f0f0f0", fontSize: "0.83rem", color: "#777" }}>
              <span>{activeCount} item{activeCount !== 1 ? "s" : ""} left</span>
              <div style={{ display: "flex", gap: "4px" }}>
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    style={{ background: "none", border: filter === f ? "1px solid rgba(109,103,228,.4)" : "1px solid transparent", borderRadius: "4px", padding: "3px 8px", cursor: "pointer", color: filter === f ? "#6d67e4" : "#777", fontWeight: filter === f ? 600 : 400, textTransform: "capitalize" }}
                  >{f}</button>
                ))}
              </div>
              <button
                onClick={clearCompleted}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#bbb" }}
              >Clear completed</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
