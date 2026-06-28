var name = "Suresh Javvadi";

var a = 10;

var b = 20.1;

console.log(name);
console.log(a + b);

import { x, calculateSum } from "./sum.js";
console.log(x);
calculateSum(10, 20.1);

// z = 30.5; // esm is strict mode by default, so we can't use undeclared variables. This will give reference error.
