var name = "Suresh Javvadi";

var a = 10;

var b = 20.1;

console.log(name);
console.log(a + b);

console.log(global); // global object, one of the super powers of Node.js

console.log(this); // it gives empty, this is not a global object

console.log(globalThis); // globalThis refers to the global object across all the JS environments, including Node.js and browsers.

console.log(globalThis === global); // true
