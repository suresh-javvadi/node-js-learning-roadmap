const fs = require("fs");
const crypto = require("crypto");

var a = 324242;
var b = 7104;

// async function
fs.readFile("./file.txt", "utf8", (err, data) => {
  console.log("File data", data);
});

// We can block the main thread using sync functions

fs.readFileSync("./file.txt", "utf8");
console.log("Sync File data");

// pbkdf2 - Password Base Ley Derivative Function

const key = crypto.pbkdf2Sync("Suresh@123", "salt", 500000, 50, "sha512");
console.log("sync Key is generated", key);

crypto.pbkdf2("Suresh@123", "salt", 50000, 50, "sha512", (err, key) => {
  console.log("Async Key is generated", key);
});

function multiply(a, b) {
  return a * b;
}

var c = multiply(a, b);
console.log("The result is:", c);

console.log("The End");
