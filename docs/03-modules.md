# Node.js Modules

## What is a Module

- A module is a collection of JS code/file which is private to itself by default
- Every file in Node.js is treated as a separate module

## Entry Point

- To run JS code in Node, it needs an entry point
- The entry point is the file name passed after the `node` command

```js
node app.js // here app.js is the entry point to run the code
```

## require()

- To work with multiple modules together using a single entry point, we use the `require` function
- `require` function is always available in Node.js (no need to import it)
- Need to pass the **relative path** to the `require` function

```js
require("./xyz.js"); // executes the code in xyz.js file and then continues with the below code
```

- Example file: [app.js](../examples/03-modules/app.js)

## Module Scope (Privacy)

- By default, module protects the variables and functions from being accessed outside the module
- `require` just executes the module, we cannot use the variables and functions from the other module directly

```js
calculateSum(a, b); // gives reference error because we can't access the function defined in sum.js
```

## Exporting with module.exports

- To make variables/functions accessible outside the module, export them using `module.exports`
- The `require` function returns the exported things
- By default `module.exports` is an empty object

```js
console.log(module.exports); // {} - By default, it is an empty object
```

**Export a single function:**

```js
module.exports = { calculateSum };
```

**Export multiple variables and functions by wrapping in an object:**

```js
module.exports = {
  x: x,
  calculateSum: calculateSum,
};

// shorthand, both are the same
module.exports = {
  x,
  calculateSum,
};
```

**Another way of exporting:**

```js
module.exports.x = x;
module.exports.calculateSum = calculateSum;
```

- Example file: [sum.js](../examples/03-modules/sum.js)

## Importing with require

```js
const calculate = require("./sum.js");
calculate.calculateSum(a, b);

// using destructuring
const { x, calculateSum } = require("./sum.js");
console.log(x);
```

- You can omit the `.js` extension in `require` and it will still work, Node.js automatically resolves the file extension

```js
const { x, calculateSum } = require("./sum"); // .js extension is optional
```

## Folder as a Module

- We can make a whole folder a module by writing an `index.js` inside the folder
- `index.js` imports all required exports and re-exports them as a combined exporter

```js
// calculate/index.js
const { calculateAddition } = require("./addition");
const { calculateMultiply } = require("./multiply");

module.exports = { calculateAddition, calculateMultiply };
```

```js
// app.js - importing the folder module
const { calculateAddition, calculateMultiply } = require("./calculate"); // calculate is a folder
calculateAddition(a, b);
calculateMultiply(a, b);
```

- Example files: [calculate/index.js](../examples/03-modules/calculate/index.js), [calculate/addition.js](../examples/03-modules/calculate/addition.js), [calculate/multiply.js](../examples/03-modules/calculate/multiply.js)

## Importing JSON and Core Modules

- You can import any file type using `require` like `.js`, `.json` etc.
- You can also import Node's built-in core modules

```js
const data = require("./data.json");
console.log(data);

const util = require("node:util"); // importing Node's core module
```

- Example file: [data.json](../examples/03-modules/data.json)

## CJS vs ESM

There are two types of module systems in Node.js:

| Feature         | CJS (CommonJS)               | ESM (ES Modules)                        |
| --------------- | ---------------------------- | --------------------------------------- |
| Syntax          | `require` / `module.exports` | `import` / `export`                     |
| Execution       | Synchronous                  | Asynchronous                            |
| Mode            | Non-strict (loose)           | Strict mode                             |
| File extension  | `.js` / `.cjs`               | `.mjs` or `.js` with `"type": "module"` |
| Default in Node | Yes                          | No                                      |
| Used by         | Node.js by default           | React, Angular                          |
| Age             | Old, standard                | Modern                                  |

**To use ESM in Node.js**, add `"type": "module"` in `package.json`:

```json
{
  "type": "module"
}
```

**ESM syntax:**

```js
// exporting
export var x = "Variable a from sum.js";
export function calculateSum(a, b) {
  console.log(a + b);
}

// importing
import { x, calculateSum } from "./sum.js";
```

**CJS non-strict mode** - undeclared variables are allowed:

```js
z = 30.5; // works fine in CJS, no error
```

**ESM strict mode** - undeclared variables give a reference error:

```js
// z = 30.5; // ReferenceError in ESM strict mode
```

- Example files: [esm/app.js](../examples/03-modules/esm/app.js), [esm/sum.js](../examples/03-modules/esm/sum.js)
