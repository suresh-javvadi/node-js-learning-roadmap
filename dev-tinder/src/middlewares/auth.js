const adminAuth = (req, res, next) => {
  console.log("admin auth getting check");
  const token = "admin-token"; //req.headers.authorization; // get token from headers
  if (token !== "admin-token") {
    return res.status(401).send("Unauthorized request");
  }
  next();
};

const userAuth = (req, res, next) => {
  console.log("user auth getting check");
  const token = "user-token"; //req.headers.authorization; // get token from headers
  if (token !== "user-token") {
    return res.status(401).send("Unauthorized request");
  }
  next();
};

module.exports = {
  adminAuth,
  userAuth,
};
