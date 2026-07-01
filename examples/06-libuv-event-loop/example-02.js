// Example of the libuv event loop in Node.js with Promises and process.nextTick

const fs = require("fs");

const a = 100;

setImmediate(() => console.log("setImmediate"));

Promise.resolve().then(() => console.log("Promise"));

fs.readFile("./file.txt", "utf8", () => {
  console.log("fs.readFile");
});

setTimeout(() => console.log("setTimeout"), 0);

process.nextTick(() => console.log("process.nextTick"));

function printA() {
  console.log("printA:", a);
}

printA();
console.log("Last line of the file");
