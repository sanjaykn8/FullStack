import React, { useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");

  const addTodo = () => {
    if (text.trim() === "") return;

    setTodos([
      ...todos,
      { id: Date.now(), text: text, completed: false },
    ]);
    setText("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleStatus = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true;
  });

  return (
    <div style={{ fontFamily: "Arial", padding: "20px", maxWidth: "500px" }}>
      <h2>Todo List</h2>

      <input
        type="text"
        value={text}
        placeholder="Enter task"
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={addTodo} style={{ marginLeft: "8px" }}>
        Add
      </button>

      <div style={{ marginTop: "15px" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")} style={{ marginLeft: "8px" }}>
          Completed
        </button>
        <button onClick={() => setFilter("active")} style={{ marginLeft: "8px" }}>
          Active
        </button>
      </div>

      <ul style={{ marginTop: "20px" }}>
        {filteredTodos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: "10px" }}>
            <span
              onClick={() => toggleStatus(todo.id)}
              style={{
                cursor: "pointer",
                textDecoration: todo.completed ? "line-through" : "none",
                marginRight: "10px",
              }}
            >
              {todo.text} [{todo.completed ? "Completed" : "Active"}]
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}