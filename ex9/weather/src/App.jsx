import React, { useState } from "react";

const weatherIcons = {
  Clear: "☀️", Clouds: "☁️", Rain: "🌧️", Drizzle: "🌦️",
  Thunderstorm: "⛈️", Snow: "❄️", Mist: "🌫️", Fog: "🌫️",
};

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const getWeather = async () => {
    if (!city.trim()) return;
    setLoading(true);
    setError("");
    setWeather(null);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) throw new Error(res.status === 404 ? "City not found." : "Failed to fetch weather.");
      setWeather(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const precipitation = weather?.rain?.["1h"] || weather?.snow?.["1h"] || 0;
  const icon = weather ? (weatherIcons[weather.weather[0].main] || "🌡️") : null;
  const bgGrad = weather?.weather[0].main === "Clear"
    ? "linear-gradient(160deg, #f9a825, #f57f17)"
    : weather?.weather[0].main === "Rain" || weather?.weather[0].main === "Drizzle"
    ? "linear-gradient(160deg, #546e7a, #263238)"
    : weather?.weather[0].main === "Snow"
    ? "linear-gradient(160deg, #b3e5fc, #4fc3f7)"
    : "linear-gradient(160deg, #1565c0, #0288d1)";

  return (
    <div style={{ minHeight: "100vh", background: weather ? bgGrad : "linear-gradient(160deg, #1565c0, #0288d1)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', Arial, sans-serif", transition: "background 1s ease", padding: "20px" }}>
      <div style={{ width: "100%", maxWidth: "380px" }}>
        {/* Search bar */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "28px" }}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && getWeather()}
            placeholder="Enter city name..."
            style={{ flex: 1, padding: "12px 16px", border: "none", borderRadius: "12px", fontSize: "1rem", outline: "none", background: "rgba(255,255,255,.2)", color: "#fff", backdropFilter: "blur(8px)" }}
          />
          <button
            onClick={getWeather}
            disabled={loading}
            style={{ padding: "12px 18px", border: "none", borderRadius: "12px", background: "rgba(255,255,255,.25)", color: "#fff", fontSize: "1.1rem", cursor: loading ? "not-allowed" : "pointer", transition: ".2s", backdropFilter: "blur(8px)" }}
          >{loading ? "…" : "🔍"}</button>
        </div>

        {error && (
          <div style={{ background: "rgba(255,255,255,.15)", borderRadius: "12px", padding: "14px 18px", color: "#fff", textAlign: "center", backdropFilter: "blur(8px)" }}>
            ⚠️ {error}
          </div>
        )}

        {weather && (
          <div style={{ background: "rgba(255,255,255,.15)", backdropFilter: "blur(12px)", borderRadius: "20px", padding: "32px 28px", color: "#fff", textAlign: "center" }}>
            <div style={{ fontSize: "5rem", lineHeight: 1, marginBottom: "8px" }}>{icon}</div>
            <div style={{ fontSize: "1rem", opacity: 0.85, textTransform: "uppercase", letterSpacing: "1px" }}>{weather.name}, {weather.sys.country}</div>
            <div style={{ fontSize: "4.5rem", fontWeight: 200, margin: "8px 0 4px" }}>{Math.round(weather.main.temp)}°</div>
            <div style={{ fontSize: "1rem", opacity: 0.75, textTransform: "capitalize", marginBottom: "28px" }}>{weather.weather[0].description}</div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", fontSize: "0.9rem" }}>
              {[
                ["💧 Humidity", `${weather.main.humidity}%`],
                ["💨 Wind", `${weather.wind.speed} m/s`],
                ["🌡️ Feels like", `${Math.round(weather.main.feels_like)}°C`],
                ["🌧️ Precipitation", `${precipitation} mm`],
              ].map(([label, val]) => (
                <div key={label} style={{ background: "rgba(255,255,255,.12)", borderRadius: "12px", padding: "12px" }}>
                  <div style={{ opacity: 0.75, marginBottom: "4px" }}>{label}</div>
                  <div style={{ fontWeight: 600, fontSize: "1rem" }}>{val}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
