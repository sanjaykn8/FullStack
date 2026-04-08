import React, { useState } from "react";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const getWeather = async () => {
    try {
      setError("");
      setWeather(null);

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!res.ok) {
        throw new Error("Location not found");
      }

      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const precipitation =
    weather?.rain?.["1h"] || weather?.snow?.["1h"] || 0;

  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <h2>Weather App</h2>

      <input
        type="text"
        value={city}
        placeholder="Enter city"
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather} style={{ marginLeft: "8px" }}>
        Search
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: "20px" }}>
          <h3>{weather.name}</h3>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Humidity: {weather.main.humidity} %</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
          <p>Precipitation: {precipitation} mm</p>
        </div>
      )}
    </div>
  );
}