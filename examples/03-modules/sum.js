// Module protects the variables and functions from being accessed outside the module by default.

console.log("Sum module");

var x = "Variable a from sum.js";
function calculateSum(a, b) {
  console.log(a + b);
}

module.exports = { calculateSum }; // To make the function accessible outside the module, we need to export it using module.exports.

module.exports = {
  x: x,
  calculateSum: calculateSum,
}; // We can export multiple variables and functions by wrapping them in an object

module.exports = {
  x,
  calculateSum,
}; // both are same, different syntax of exporting multiple variables and functions

console.log(module.exports); //  By default, it is an empty object.

// you can export like this also

module.exports.x = x;
module.exports.calculateSum = calculateSum; // This is another way of exporting variables and functions.
