import "./styles.css";

document.getElementById("loginBtn").onclick = () => {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === "admin" && pass === "1234") {
    window.location.href = "form.html";
  } else {
    document.getElementById("error").textContent = "Invalid credentials";
  }
};