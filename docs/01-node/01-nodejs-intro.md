# Node.js Introduction

## What is Node.js?

- Node.js is a **JS runtime built on Chrome's V8 JS engine** that executes JS code outside the web browser
- It is a **cross-platform, open-source** environment maintained by the **OpenJS Foundation**
- Node.js has an **event-driven architecture** and is capable of **asynchronous I/O (Non-blocking I/O)**
- "Run outside the browser" means on the server, or any device that has a JS engine
- With Node.js we can write both **frontend and backend** with JavaScript
- Node.js is a **C++ application with V8 embedded** into it
- V8 can be embedded into any C++ app. V8 converts JS code to low-level and binary-level code
- Every JS engine must follow the **ECMAScript standards**

## History & Context

- Created by **Ryan Dahl** and first released in **2009**
- Ryan Dahl was frustrated that Apache HTTP Server blocked the entire thread while waiting for I/O - Node.js was built to solve this with non-blocking I/O
- Originally built on top of **SpiderMonkey** (Firefox's JS engine), then switched to **V8** (Chrome's engine)
- Node.js is now governed by the **OpenJS Foundation** (formed by merging the Node.js Foundation and JS Foundation in 2019)

## Why Node.js?

- **Fast execution**: V8 compiles JS directly to machine code, making it very performant
- **Non-blocking I/O**: handles thousands of concurrent connections without creating a new thread for each
- **Single language**: use JavaScript for both frontend and backend (no context switching)
- **Huge ecosystem**: **npm** (Node Package Manager) has over 2 million packages, the largest package registry in the world
- **Great for real-time apps**: chat apps, live notifications, collaborative tools benefit from Node's event-driven model
- **Active community**: widely adopted by companies like Netflix, LinkedIn, Uber, PayPal, and NASA

## Node.js vs Browser JavaScript

- Both run JavaScript but in **different environments** with different capabilities
- **Browser JS** has access to the DOM (`document`, `window`, `navigator`) but Node.js does NOT
- **Node.js** has access to the file system (`fs`), OS info (`os`), network (`http`, `net`) but Browser JS does NOT
- Browser JS is **sandboxed** for security; Node.js has full access to the machine it runs on
- **`process`** object is available in Node.js (gives access to env variables, CLI args, exit codes); not in the browser
- Both support **ES Modules** (`import/export`) and the modern ECMAScript standards, but Node.js also supports **CommonJS** (`require/module.exports`)

## npm - Node Package Manager

- **npm** is the default package manager that comes bundled with Node.js
- It lets you install, share, and manage third-party packages (libraries and tools)
- `package.json` is the config file that tracks your project's dependencies and scripts
- Key commands: `npm init`, `npm install`, `npm run`, `npm uninstall`
- Alternatives to npm: **yarn** and **pnpm** (faster, more efficient disk usage)

## What Can You Build with Node.js?

- **REST APIs & GraphQL APIs**: backend services consumed by web/mobile apps
- **Real-time applications**: chat apps, live sports scores, collaborative editing (e.g., Google Docs-like)
- **CLI tools**: command-line utilities and developer tools (e.g., ESLint, Webpack, Vue CLI are all Node.js tools)
- **Microservices**: small, independent services that make up a larger application
- **Streaming applications**: video/audio streaming, file processing pipelines
- **Serverless functions**: AWS Lambda, Vercel, and Netlify all support Node.js functions

## What is a Server?

- A **server** is essentially a remote computer, you can think of it as a computer whose CPU works remotely
- Servers can be accessed over a network to provide **resources and services** to other computer programs
- A server is a computer or system that provides **data, services, resources, or programs** to other computers, known as **clients**, over a network
- When a computer needs to communicate with a server, it sends a request using the server's **IP address**
- Initially, JavaScript could only run inside web browsers (client-side). With Node.js, JS can now run on servers too

## What is an IP Address?

- An **IP address** (Internet Protocol address) is a **unique number** that identifies every device connected to the internet
- It is how computers find and communicate with each other over a network

## Node.js as a JS Runtime (Superpowers)

- V8 alone can only do what **ECMAScript standards** allow, it cannot do database connections, file system access, or API calls on servers
- Node.js wraps V8 and adds **extra superpowers** on top: Node API & Modules (e.g., `fs`, `http`, `os`, `net`)
- This combination of V8 + Node APIs is what makes Node.js a **JS Runtime**, more powerful than V8 alone
- **ECMAScript** is the standard for scripting languages including JavaScript, JScript, and ActionScript. All JS engines (V8, SpiderMonkey, Chakra) must follow it to ensure consistent behavior

## How V8 Compiles JavaScript (Low-level Code)

- We write JS (high-level language), V8 (written in C++) compiles it to **machine code / assembly code** (low-level), then the computer executes it
- **Machine Language**: the most basic form, consisting of binary (0s and 1s) instructions that the CPU directly executes
- **Assembly Language**: a step above machine language, uses symbolic representations (mnemonics) for operations and memory addresses; each assembly instruction maps to one machine language instruction
- V8 is Google's open-source high-performance JS and **WebAssembly** engine, runs on Windows, macOS, and Linux (x64, IA-32, ARM processors)
