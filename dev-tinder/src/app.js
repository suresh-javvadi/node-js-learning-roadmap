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

app.use("/middleware", (req, res) => {
  console.log("Middleware executed");
  // res.send("Middleware executed");
});

app.use(
  "/middlewareMulti",
  (req, res, next) => {
    console.log("Middleware executed");
    next(); // call next middleware
  },
  (req, res, next) => {
    console.log("2 Middleware executed");
    res.send(" 2 Middleware executed");
    next();
  },
);

app.use(
  "/middlewareMultiWithResponse",
  (req, res, next) => {
    console.log("Middleware executed");
    res.send("Middleware executed");
    next(); // call next middleware
  },
  (req, res, next) => {
    console.log("2 Middleware executed");
    res.send(" 2 Middleware executed");
  },
);

app.use(
  "/middlewareMultiWithoutHandler",
  (req, res, next) => {
    console.log("Middleware executed");
    next(); // call next middleware
  },
  (req, res, next) => {
    console.log("2 Middleware executed");
    next();
  },
);

// app.use("/path", [rh1, rh2, rh3, rh4, rh5]) wrap all and pass

// app.use("/path", rh1, [rh2, rh3], rh4, rh5) wrap some and pass

app.use("/wrapall", [
  (req, res, next) => {
    console.log("Middleware executed");
    next(); // call next middleware
  },
  (req, res, next) => {
    console.log("2 Middleware executed");
    next();
  },
  (req, res, next) => {
    console.log("3 Middleware executed");
    next();
  },
  (req, res, next) => {
    console.log("4 Middleware executed");
    next();
  },
  (req, res, next) => {
    console.log("5 Middleware executed");
    res.send("5 Middleware executed with wrap all");
  },
]);

app.use(
  "/wrapsome",
  (req, res, next) => {
    console.log("Middleware executed");
    next(); // call next middleware
  },
  (req, res, next) => {
    console.log("2 Middleware executed");
    next();
  },
  [
    (req, res, next) => {
      console.log("3 Middleware executed");
      next();
    },
    (req, res, next) => {
      console.log("4 Middleware executed");
      next();
    },
  ],
  (req, res, next) => {
    console.log("5 Middleware executed");
    res.send("5 Middleware executed with wrap some");
  },
);

app.use("/independent", (req, res, next) => {
  console.log("Independent Middleware executed");
  next();
});
app.use("/independent", (req, res, next) => {
  console.log("2 Independent Middleware executed");
  res.send("2 Independent Middleware executed");
});

// 1, 2,3 are middlewares
app.use("/middlewares", (req, res, next) => {
  console.log("1 Middleware executed");
  next(); // call next middleware
});
app.use("/middlewares", (req, res, next) => {
  console.log("2 Middleware executed");
  next(); // call next middleware
});
app.use("/middlewares", (req, res, next) => {
  console.log("3 Middleware executed");
  next(); // call next middleware
});
app.use("/middlewares", (req, res, next) => {
  console.log("4 Middleware executed");
  res.send("4 Middleware executed");
});

// // Actual importance and use case of middleware

// app.get("/admin/getalldata", (req, res) => {
//   const token = "admin-token"; //req.headers.authorization; // get token from headers
//   if (token !== "admin-token") {
//     return res.status(401).send("Unauthorized request ");
//   }
//   res.send("All data retrieved");
// });

// app.delete("/admin/deleteuser", (req, res) => {
//   const token = "admin-token"; //req.headers.authorization; // get token from headers
//   if (token !== "admin-token") {
//     return res.status(401).send("Unauthorized request");
//   }
//   res.send("User deleted");
// });

// // to stop code redundancy, we can use middleware to check for authorization

// app.use("/admin", (req, res, next) => {
//   console.log("admin auth getting check");
//   const token = "admin-tokenss"; //req.headers.authorization; // get token from headers
//   if (token !== "admin-token") {
//     return res.status(401).send("Unauthorized request");
//   }
//   next();
// });

// app.get("/admin/getalldata", (req, res) => {
//   res.send("All data retrieved"); // this will be executed only if the admin auth middleware passes
// });

// app.delete("/admin/deleteuser", (req, res) => {
//   res.send("User deleted");
// });

// standard way to use middleware is to create a separate file for it and import it in the main file

const { adminAuth, userAuth } = require("./middlewares/auth");

app.use("/admin", adminAuth);

app.get("/admin/getalldata", (req, res) => {
  res.send("All data retrieved"); // this will be executed only if the admin auth middleware passes
});

app.delete("/admin/deleteuser", (req, res) => {
  res.send("User deleted");
});

app.get("/user/getprofile", userAuth, (req, res) => {
  res.send("User profile retrieved"); // this will be executed only if the user auth middleware passes
});

app.get("/user/login", (req, res) => {
  res.send("User logged in");
});

// Error handling

app.get("/errorhandler", (req, res) => {
  throw new Error("This is a test error");
});

app.get("/trycatcherror", (req, res) => {
  try {
    // code that may throw an error
    throw new Error("This is a test error");
  } catch (err) {
    console.error(err.stack);
    res.status(500).send("Something went wrong contact support!");
  }
});

// error middleware only catches errors from routes registered above it, so keep it last
app.use("/", (err, req, res, next) => {
  console.error(err.stack);
  // store the error in a log file or database for further analysis
  res.status(500).send("Something went wrong!");
});

// Database, schema and model

const { connectDB } = require("./config/database");
const User = require("./models/user");

app.use(express.json()); // every request passes through it

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Virat",
    lastName: "Kohli",
    emailId: "virat@kohli.com",
  };
  // Creating a new instance of the user model
  const user = new User(userObj);
  try {
    await user.save(); // saving the instance into database
    res.send("User add successfully");
  } catch (error) {
    res.status(400).send("Error saving user" + error.message);
  }
});

// Dynamic api request

app.post("/signupdynamic", async (req, res) => {
  console.log(req.body);
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User add successfully");
  } catch (error) {
    res.status(400).send("Error saving user" + error.message);
  }
});

// get user by email

app.get("/userbyemail", async (req, res) => {
  const userEmailId = req.body.emailId;

  try {
    const user = await User.find({ emailId: userEmailId });

    if (user.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.send("Something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});

    // find({}) returns an empty array when there are no documents, and [] is truthy
    if (users.length === 0) {
      res.status(404).send("Users not found");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.send("Something went wrong");
  }
});

app.delete("/userbyid", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete(userId);
    console.log(user);
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send("User deleted successfully");
    }
  } catch (error) {
    res.send("Something went wrong");
  }
});

app.patch("/userbyid", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, data);
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send("User updated successfully");
    }
  } catch (error) {
    res.send("Something went wrong");
  }
});

app.patch("/userbyemailid", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { emailId: req.body.emailId },
      req.body,
      { returnDocument: "before" }, // this will return the doc before update, After will give doc after update
    );
    console.log(user);
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send("User updated successfully");
    }
  } catch (error) {
    res.send("Something went wrong");
  }
});

app.patch("/userbyidwithvalidations", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
    });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send("User updated successfully");
    }
  } catch (error) {
    res.send("Update failed " + error.message);
  }
});

// API Level validations

app.patch("/userbyidwithapivalidations", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try {
    const allowedUpdates = [
      "userId",
      "age",
      "gender",
      "photoUrl",
      "about",
      "skills",
    ];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      allowedUpdates.includes(k),
    );

    if (!isUpdateAllowed) {
      throw new Error("Update is not allowed");
    }

    const user = await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
    });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send("User updated successfully");
    }
  } catch (error) {
    res.send("Update failed " + error.message);
  }
});

app.patch("/userbyidwithapivalidations/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const allowedUpdates = ["age", "gender", "photoUrl", "about", "skills"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      allowedUpdates.includes(k),
    );

    if (!isUpdateAllowed) {
      throw new Error("Update is not allowed");
    }

    // guard the field first: data.skills is undefined when the body has no skills
    if (data.skills && data.skills.length > 10) {
      throw new Error("Skill cannot be more than 10");
    }

    const user = await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
    });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send("User updated successfully");
    }
  } catch (error) {
    res.send("Update failed " + error.message);
  }
});

// password encryption

const { signupValidation } = require("./utils/validation");
const bcrypt = require("bcrypt");

app.post("/usersignup", async (req, res) => {
  const { firstName, lastName, emailId, password } = req.body;

  try {
    await signupValidation(req); // validate first
    const encryptedPassword = await bcrypt.hash(password, 10); // then hash
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: encryptedPassword,
    });

    await user.save();
    res.send("User added successfully!");
  } catch (error) {
    res.send("ERROR: " + error.message);
  }
});

app.post("/userlogin", async (req, res) => {
  const { emailId, password } = req.body;

  try {
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }

    res.send("Login successfully");
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

const startServer = async () => {
  try {
    await connectDB();
    console.log("Database connected successfully!!");
    app.listen(3000, () => {
      console.log("Server is listening on port 3000");
    }); // listen to port 3000, we can request the server using localhost:3000
  } catch (error) {
    console.error("Error connecting to MongoDB");
  }
};
startServer();
