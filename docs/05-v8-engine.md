# Episode 05: V8 Engine Architecture

## How V8 Executes Code

When code is given to the V8 engine, it goes through several stages.

## Stage 1: Parsing

### Lexical Analysis (Tokenization)

Code is converted into tokens. Tokenization is the process of converting source code into a series of tokens. Each token represents a fundamental element of the language, such as keywords, operators, identifiers, and literals.

Example: for the code `var a = 10;`, the tokens are:

- `var` (keyword)
- `a` (identifier)
- `=` (operator)
- `10` (literal)
- `;` (punctuation)

### Syntax Analysis (Abstract Syntax Tree)

The tokens are converted into a syntax tree, also called the Abstract Syntax Tree (AST). The AST is a tree-like data structure that represents the syntactic structure of the source code. Each node in the tree corresponds to a construct in the code, such as variables, expressions, or statements.

To check the AST of your code: [AST Explorer](https://astexplorer.net/)

If the AST cannot be generated, a syntax error is shown. When the V8 engine encounters an unexpected token that does not fit the grammar rules, it cannot generate a valid AST and throws a syntax error.

## Stage 2: Interpretation (JIT Compilation)

JavaScript is a Just-In-Time (JIT) compiled language. It has both an interpreter and a compiler.

JavaScript is neither purely interpreted nor purely compiled. It uses a combination of both:

- **Interpreted languages** (like Python): executed line by line. Faster to start, easier to debug, but slower execution.
- **Compiled languages** (like C, C++): first translated into machine code through compilation. Faster execution, but longer initial compilation time.

JavaScript uses an interpreter for initial execution and a JIT compiler to optimize frequently executed code paths into machine code at runtime.

### Ignition Interpreter

The AST is given to the interpreter named **Ignition**. Ignition converts the AST into bytecode. Bytecode is a lower-level, intermediate representation of the code that the JavaScript engine can execute more efficiently than raw source code. Ignition reads and executes the bytecode line by line.

### Hot Code and TurboFan Compiler

When some code or function is used repeatedly and needs optimization, that code is called **hot code**. The hot code is given to the compiler named **TurboFan**. TurboFan converts the bytecode into optimized machine code, which improves performance for repeated executions.

### De-optimization

Sometimes de-optimization is required. When TurboFan's optimization assumptions are violated, the code is sent back to the Ignition interpreter, converted back into bytecode, and executed.

TurboFan makes assumptions based on the types and values it encounters during optimization. If a function is optimized for numbers but then receives strings, the optimization fails and the code is de-optimized.

```js
function sum(a, b) {
  console.log("The result is:", a + b);
}

sum(2, 3);
sum(9, 7);
sum(26, 39);
sum("a", "b"); // needs de-optimization here
```

When the interpreter sees `sum` called repeatedly with numbers, it marks it as hot code and sends it to TurboFan. TurboFan optimizes it assuming it only receives numbers. When `sum("a", "b")` is called, the assumption is violated and the code is de-optimized, sending it back to the interpreter.

> **Best Practice:** Pass consistent types and values to functions. If a function is optimized for numeric calculations, avoid passing strings to prevent de-optimization.

## Garbage Collection

V8 has garbage collectors named **Orinoco**, **OilPan**, **Scavenger**, and **MCompact**. They use different algorithms to make code execution fast and prevent memory leaks.

## References

- [AST Explorer](https://astexplorer.net/) - check the AST of your code
- [V8 Engine](https://v8.dev/) - official V8 website
- [V8 Source Code](https://github.com/v8/v8) - V8 source code on GitHub
