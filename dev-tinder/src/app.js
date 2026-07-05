const express = require("express");

const app = express(); // create an server instance using express

// app.use((req, res) => {
//   res.send("Hello from the server!"); // request handler, send response to every request, every path
// });

// app.use("/", (req, res) => {
//   res.send("Hello from the server!"); // request handler, send response to every request, every path
// });

app.use("/home/number", (req, res) => {
  res.send("Home number number!"); // for home path
});

app.use("/home", (req, res) => {
  res.send("Home home home!"); // for home path
});

app.use("/me", (req, res) => {
  res.send("Hello, I'm Suresh Javvadi!");
});

// this will handle only get requests to the /user endpoint
app.get("/user", (req, res) => {
  res.send({
    firstName: "Suresh",
    lastName: "Javvadi",
  });
});

app.post("/user", (req, res) => {
  res.send("Data has been posted to the server!");
});

app.delete("/user", (req, res) => {
  res.send("Data has been deleted from the server!");
});

// b is optional to request, so this will handle both /ac and /abc
app.get("/a{b}c", (req, res) => {
  res.send("Hello, Hihii");
});

app.get(/^\/ab+c$/, (req, res) => {
  res.send("Hello from ab+c");
});

app.get("/users", (req, res) => {
  console.log(req.query);
  res.send({
    firstName: "Suresh",
    lastName: "Javvadi",
  });
});

app.get("/username/:userId", (req, res) => {
  console.log(req.params);
  res.send({
    firstName: "Suresh",
    lastName: "Javvadi",
  });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
}); // listen to port 3000, we can request the server using localhost:3000
