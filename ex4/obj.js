const obj = {
  Name: "KN",
  age: 20,
  city: "Sivakasi",
  profession: "Student",
};

console.log("Original object:", obj);

// 1) Print properties (key and value) in insertion order
console.log("\nProperties:");
Object.keys(obj).forEach((k, i) => {
  console.log(`${i + 1}. ${k}:`, obj[k]);
});

// 2) Delete the second property (if present)
const keys = Object.keys(obj);
if (keys.length >= 2) {
  const secondKey = keys[1];
  delete obj[secondKey];
  console.log(`\nDeleted second property: ${secondKey}`);
} else {
  console.log("\nNo second property to delete.");
}

// 3) Get length of object (number of own enumerable properties)
const length = Object.keys(obj).length;
console.log("\nResulting object:", obj);
console.log("Number of properties:", length);
