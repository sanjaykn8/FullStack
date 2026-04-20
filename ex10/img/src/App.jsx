import React, { useState, useEffect, useCallback } from "react";
import img1 from "./assets/img1.jpg";
import img2 from "./assets/img2.jfif";
import img3 from "./assets/img3.jfif";
import img4 from "./assets/img4.jfif";

const images = [
  { name: "Mountain Sunrise", url: img1 },
  { name: "Misty Forest",      url: img2 },
  { name: "Ocean View",        url: img3 },
  { name: "Desert Road",       url: img4 },
];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);

  const goTo = useCallback((idx) => {
    setFade(false);
    setTimeout(() => {
      setCurrent((idx + images.length) % images.length);
      setFade(true);
    }, 250);
  }, []);

  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  useEffect(() => {
    if (!autoPlay) return;
    const id = setInterval(() => goTo(current + 1), 3000);
    return () => clearInterval(id);
  }, [autoPlay, current, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f0f", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', Arial, sans-serif", padding: "20px" }}>
      <h1 style={{ color: "#fff", fontSize: "1.4rem", fontWeight: 300, letterSpacing: "4px", textTransform: "uppercase", marginBottom: "28px", opacity: 0.7 }}>Gallery</h1>

      {/* Main image */}
      <div style={{ position: "relative", width: "100%", maxWidth: "800px", borderRadius: "16px", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,.6)" }}>
        <img
          src={images[current].url}
          alt={images[current].name}
          style={{ width: "100%", height: "420px", objectFit: "cover", display: "block", opacity: fade ? 1 : 0, transition: "opacity .25s ease" }}
        />

        {/* Overlay gradient + info */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,.8))", padding: "40px 24px 20px" }}>
          <span style={{ background: "rgba(255,255,255,.2)", color: "#fff", fontSize: "0.75rem", padding: "3px 10px", borderRadius: "20px", textTransform: "uppercase", letterSpacing: "1px", backdropFilter: "blur(4px)" }}>
            {images[current].tag}
          </span>
          <div style={{ color: "#fff", fontSize: "1.3rem", fontWeight: 600, marginTop: "8px" }}>{images[current].name}</div>
          <div style={{ color: "rgba(255,255,255,.5)", fontSize: "0.85rem" }}>{current + 1} / {images.length}</div>
        </div>

        {/* Prev / Next buttons */}
        {["‹", "›"].map((arrow, i) => (
          <button
            key={i}
            onClick={i === 0 ? prev : next}
            style={{ position: "absolute", top: "50%", [i === 0 ? "left" : "right"]: "14px", transform: "translateY(-50%)", background: "rgba(0,0,0,.4)", border: "none", color: "#fff", fontSize: "2rem", width: "44px", height: "44px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)", transition: "background .2s", lineHeight: 1 }}
            onMouseEnter={(e) => (e.target.style.background = "rgba(0,0,0,.7)")}
            onMouseLeave={(e) => (e.target.style.background = "rgba(0,0,0,.4)")}
          >{arrow}</button>
        ))}
      </div>

      {/* Dot indicators */}
      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            title={img.name}
            style={{ width: i === current ? "28px" : "10px", height: "10px", borderRadius: "5px", border: "none", background: i === current ? "#fff" : "rgba(255,255,255,.3)", cursor: "pointer", transition: "all .3s ease", padding: 0 }}
          />
        ))}
      </div>

      {/* Thumbnails + autoplay */}
      <div style={{ display: "flex", gap: "10px", marginTop: "16px", flexWrap: "wrap", justifyContent: "center" }}>
        {images.map((img, i) => (
          <img
            key={i}
            src={img.url}
            alt={img.name}
            onClick={() => goTo(i)}
            style={{ width: "72px", height: "48px", objectFit: "cover", borderRadius: "6px", cursor: "pointer", opacity: i === current ? 1 : 0.45, border: i === current ? "2px solid #fff" : "2px solid transparent", transition: "all .2s" }}
          />
        ))}
        <button
          onClick={() => setAutoPlay(!autoPlay)}
          style={{ background: autoPlay ? "rgba(255,255,255,.25)" : "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.2)", color: "#fff", borderRadius: "6px", cursor: "pointer", padding: "0 14px", fontSize: "0.82rem" }}
        >{autoPlay ? "⏸ Pause" : "▶ Auto"}</button>
      </div>

      <div style={{ color: "rgba(255,255,255,.25)", fontSize: "0.75rem", marginTop: "14px" }}>Use ← → arrow keys to navigate</div>
    </div>
  );
}
