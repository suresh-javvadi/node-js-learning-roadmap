const fs = require("fs");

setImmediate(() => console.log("setImmediate"));

setTimeout(() => console.log("setTimeout"), 0);

Promise.resolve().then(() => console.log("Promise"));

fs.readFile("./file.txt", "utf8", () => {
  setTimeout(() => console.log("setTimeout inside fs.readFile"), 0);

  process.nextTick(() => console.log("process.nextTick inside fs.readFile"));

  setImmediate(() => console.log("setImmediate inside fs.readFile"));

  console.log("fs.readFile");
});

process.nextTick(() => console.log("process.nextTick"));

console.log("Last line of the file");

/* 
    Last line of the file
    process.nextTick
    Promise
    setTimeout
    setImmediate
    fs.readFile
    process.nextTick inside fs.readFile
    setImmediate inside fs.readFile
    setTimeout inside fs.readFile
*/
