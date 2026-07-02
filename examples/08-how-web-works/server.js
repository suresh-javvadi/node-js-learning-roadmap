const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/secret") {
    res.end("There is no secret page");
  }
  res.end("Hello World");
});
server.listen(7104);
