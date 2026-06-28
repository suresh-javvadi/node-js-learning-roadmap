require("./xyz.js"); // Importing xyz.js file, here this will execute the code in xyz.js file and then it will execute the below code.

var name = "Suresh Javvadi";

var a = 10;

var b = 20.1;

// calculateSum(a, b); // gives reference error because we can't access the function defined in sum.js file

console.log(name);
console.log(a + b);

const calculate = require("./sum.js");
calculate.calculateSum(a, b); // Now we can access the function defined in sum.js file because we have exported it using module.exports.

const sumObj = require("./sum.js");
console.log(sumObj.x); // Now we can access the variables

const { x, calculateSum } = require("./sum.js"); // We can also use destructuring to access the variables and functions defined in sum.js file.
console.log(x);

z = 30.5; // CommonJS is not strict mode by default, so we can use undeclared variables. This will not give reference error.
console.log(z);

const { calculateAddition, calculateMultiply } = require("./calculate"); // here calculate is folder group
calculateAddition(a, b);
calculateMultiply(a, b);

const data = require("./data.json");
console.log(data);

const util = require("node:util"); // importing core node's core modules
