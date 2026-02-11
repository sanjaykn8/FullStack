import http from "http";

function parseCookies(cookieHeader = "") {
  return cookieHeader
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean)
    .reduce((acc, pair) => {
      const idx = pair.indexOf("=");
      if (idx === -1) return acc;
      const name = pair.slice(0, idx).trim();
      const value = pair.slice(idx + 1).trim();
      acc[name] = decodeURIComponent(value);
      return acc;
    }, {});
}

const server = http.createServer((req, res) => {
  const cookieHeader = req.headers.cookie || "";
  const cookies = parseCookies(cookieHeader);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ cookieHeader, cookies }, null, 2));
});

server.listen(3000, () => {
  console.log("Server listening on http://localhost:3000/");
});
