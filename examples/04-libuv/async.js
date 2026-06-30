const https = require("https");
const fs = require("fs");

console.log("Async started");

var a = 324242;
var b = 7104;

https.get("https://dummyjson.com/products/1", (res) => {
  console.log("Fetched dummy data successfully");
});

setTimeout(() => {
  console.log("setTimeout called after delay of 5 Seconds");
}, 5000);

console.log("Surprise....!");

fs.readFile("./file.txt", "utf8", (err, data) => {
  console.log("File data", data);
});

function multiply(a, b) {
  return a * b;
}

var c = multiply(a, b);
console.log("The result is:", c);

console.log("The End");
