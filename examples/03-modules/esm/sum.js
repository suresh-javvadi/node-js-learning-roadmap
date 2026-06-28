// Module protects the variables and functions from being accessed outside the module by default.

console.log("Sum module");

export var x = "Variable a from sum.js";
export function calculateSum(a, b) {
  console.log(a + b);
}
