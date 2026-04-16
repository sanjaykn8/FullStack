import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        fontFamily: "Arial",
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#f4f4f4",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "24px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          textAlign: "center",
          minWidth: "300px",
        }}
      >
        <h2>Counter App</h2>
        <h1>{count}</h1>

        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <button onClick={() => setCount(count - 1)}>Decrease</button>
          <button onClick={() => setCount(count + 1)}>Increase</button>
        </div>
      </div>
    </div>
  );
}