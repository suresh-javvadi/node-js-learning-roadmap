// Example of the libuv event loop in Node.js

const fs = require("fs");

const a = 100;

setImmediate(() => console.log("setImmediate"));

fs.readFile("./file.txt", "utf8", () => {
  console.log("fs.readFile");
});

setTimeout(() => console.log("setTimeout"), 0);

function printA() {
  console.log("printA:", a);
}

printA();
console.log("Last line of the file");
