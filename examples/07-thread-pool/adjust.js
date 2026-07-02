const crypto = require("crypto");

// This line is ignored on modern Node. The pool size should set at startup, before code runs.
// Set it before node starts instead:

// The ONLY reliable way is to set the real environment variable before
// Node starts:
//   PowerShell : $env:UV_THREADPOOL_SIZE=2; node adjust.js
//   Git Bash   : UV_THREADPOOL_SIZE=2 node adjust.js

process.env.UV_THREADPOOL_SIZE = 2; // adding this line in the js file is not working in modern node

crypto.pbkdf2("password", "salt", 100000, 512, "sha512", () => {
  console.log("1- crypto.pbkdf2 done");
});

crypto.pbkdf2("password", "salt", 100000, 512, "sha512", () => {
  console.log("2- crypto.pbkdf2 done");
});

crypto.pbkdf2("password", "salt", 100000, 512, "sha512", () => {
  console.log("3- crypto.pbkdf2 done");
});

// With a pool size of 2 (set via the env var), tasks finish in pairs:
//   1 & 2 first, then 3 after a thread frees up.
// Setting it in code (above) is ignored -> you'll still see the default 4.
