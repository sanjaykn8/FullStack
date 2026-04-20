import "./styles.css";
import panzoom from "panzoom";

const zoomArea = document.getElementById("zoomArea");

// Apply panzoom
panzoom(zoomArea, {
  maxZoom: 2,
  minZoom: 1,
});

// Handle form submit
const form = document.getElementById("userForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // Convert to JSON
  const json = JSON.stringify(data, null, 2);

  // Create downloadable file
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "form-data.json";
  a.click();

  URL.revokeObjectURL(url);

  // Replace UI with success screen
  zoomArea.innerHTML = `
    <h2>Form Submitted</h2>
    <p>Your data has been saved as JSON.</p>
    <button id="backBtn">Go Back to Login</button>
  `;

  // Back button
  document.getElementById("backBtn").onclick = () => {
    window.location.href = "login.html";
  };
});