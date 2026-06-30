var a = 324242;
var b = 7104;

// even the callback timer done i won't print
setTimeout(() => {
  console.log("Call me right now");
}, 0);

setTimeout(() => {
  console.log("Call me after 3 seconds");
}, 3000);

function multiply(a, b) {
  return a * b;
}

var c = multiply(a, b);
console.log("The result is:", c);

console.log("The End");
