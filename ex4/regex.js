const examples = [
  "baaaad",
  "aardvark",
  "caabaad",
  "a a aaa aa",
];

for (const s of examples) {
  const out = s.replace(/a{2,}/g, "b");
  console.log("IN :", JSON.stringify(s));
  console.log("OUT:", JSON.stringify(out));
  console.log("---");
}
