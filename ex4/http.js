import https from "https";
import { URL } from "url";

const url = new URL("https://github.com/");

https
  .get(url, (res) => {
    const { statusCode } = res;
    const contentType = res.headers["content-type"] || "";

    let raw = "";
    res.setEncoding("utf8");
    res.on("data", (chunk) => (raw += chunk));
    res.on("end", () => {
      console.log("Status:", statusCode);
      console.log("Content-Type:", contentType);
      try {
        const parsed = JSON.parse(raw);
        console.log("Body (parsed):", parsed);
      } catch {
        console.log("Body (raw):", raw.slice(0, 1000));
      }
    });
  })
  .on("error", (e) => {
    console.error("Request error:", e.message);
  });
