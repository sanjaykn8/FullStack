import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <style>{`
        .app {
          font-family: Arial;
          min-height: 100vh;
          display: grid;
          place-items: center;
          background: #f4f4f4;
        }

        .card {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          text-align: center;
          min-width: 300px;
        }

        .counter {
          font-size: 48px;
          font-weight: bold;
          margin: 10px 0;
          color: #111;
        }

        .btn-group {
          display: flex;
          gap: 20px;
          justify-content: center;
          align-items: center;
        }

        .img-btn {
          width: 50px;
          height: 50px;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .img-btn:hover {
          transform: scale(1.1);
        }
      `}</style>

      <div className="app">
        <div className="card">
          <h2>Counter App</h2>
          <div className="counter">{count}</div>

          <div className="btn-group">
            <img
              src="src/assets/minus.png"   // put in public folder
              alt="Decrease"
              className="img-btn"
              onClick={() => setCount(count - 1)}
            />

            <img
              src="src/assets/plus.png"    // put in public folder
              alt="Increase"
              className="img-btn"
              onClick={() => setCount(count + 1)}
            />
          </div>
        </div>
      </div>
    </>
  );
}