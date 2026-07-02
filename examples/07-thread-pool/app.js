const crypto = require("crypto");

crypto.pbkdf2("password", "salt", 100000, 512, "sha512", () => {
  console.log("1- crypto.pbkdf2 done");
});

crypto.pbkdf2("password", "salt", 100000, 512, "sha512", () => {
  console.log("2- crypto.pbkdf2 done");
});

crypto.pbkdf2("password", "salt", 100000, 512, "sha512", () => {
  console.log("3- crypto.pbkdf2 done");
});

crypto.pbkdf2("password", "salt", 100000, 512, "sha512", () => {
  console.log("4- crypto.pbkdf2 done");
});

crypto.pbkdf2("password", "salt", 100000, 512, "sha512", () => {
  console.log("5- crypto.pbkdf2 done");
});

// 1, 2, 3, 4, gives the output at a time but 5 run after 1, 2, 3, 4
// because the default thread pool size is 4.
