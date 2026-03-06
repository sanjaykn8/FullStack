import { URL } from "url";

const u = new URL("https://google.com");

console.log("Input:", u);
console.log("Protocol:", u.protocol);
console.log("Username:", u.username);
console.log("Password:", u.password);
console.log("Host:", u.host);
console.log("Hostname:", u.hostname);
console.log("Port:", u.port);
console.log("Pathname:", u.pathname);
console.log("Search:", u.search);
console.log("SearchParams:");
for (const [k, v] of u.searchParams) console.log("  ", k, "=", v);
console.log("Hash:", u.hash);
