const express = require("express");

const app = express(); // create an server instance using express

// app.use((req, res) => {
//   res.send("Hello from the server!"); // request handler, send response to every request, every path
// });

app.use("/home", (req, res) => {
  res.send("Home home home!"); // for home path
});

app.use("/me", (req, res) => {
  res.send("Hello, I'm Suresh Javvadi!");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
}); // listen to port 3000, we can request the server using localhost:3000
