const fs = require("fs");

setImmediate(() => console.log("setImmediate"));

setTimeout(() => console.log("setTimeout"), 0);

Promise.resolve().then(() => console.log("Promise"));

fs.readFile("./file.txt", "utf8", () => {
  console.log("fs.readFile");
});

process.nextTick(() => {
  process.nextTick(() => console.log("Inner process.nextTick"));
  console.log("process.nextTick");
});

console.log("Last line of the file");
