# Database Schemas and Models

## Connecting to the Database

- To connect to the database/cluster you need the connection string. We already created a cluster in MongoDB: get the connection string from the MongoDB website or Compass
- To connect and talk to the database, use an important npm library called **mongoose**
- Mongoose is the standard for building MERN applications
- When connecting a Node.js application with MongoDB, Mongoose is a very good library to create schemas, models, and talk to MongoDB
- To use mongoose in the project:
  - Install it using `npm i mongoose`
  - Import mongoose
  - Create an async function, pass the connection string to `mongoose.connect()`, and invoke the function

```js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://sureshjavvadi:xxx@learningnode.p0acwhb.mongodb.net/dev_tinder",
    );
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

connectDB();
```

- To connect to a specific database in the cluster, append `/database_name` to the connection string

### Connect the database first, then start the server

- Ideally you need to start the server after the DB connection, because without the DB the data flow won't happen
- To handle that, call the `connectDB` function in `app.js`, and on success of the DB connection make the server listen for requests

```js
const { connectDB } = require("./config/database");

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
```

```mermaid
flowchart TD
    A[App starts] --> B["connectDB()"]
    B --> C["mongoose.connect<br>to the Atlas cluster"]
    C -->|Success| D["app.listen(3000)"]
    D --> E[Server ready<br>for requests]
    C -->|Connection error| F[Log the error<br>server never starts]
```

Code: [config/database.js](../../dev-tinder/src/config/database.js), [app.js](../../dev-tinder/src/app.js)

## Schema

- Schema: an identity of a collection. It has all the fields, datatypes, and required things for the collection
- Creating a schema using mongoose:

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
});
```

## Model

- Model: is like a class of the schema. You can create instances of the model to store documents in the collections
- Creating a model using mongoose:

```js
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
```

- Pass the name and the schema definition

Code: [models/user.js](../../dev-tinder/src/models/user.js)

## Writing the First API to Create Documents

```js
app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Suresh",
    lastName: "Javvadi",
    emailId: "suresh@javvadi.com",
  };
  // Creating a new instance of the user model
  const user = new User(userObj);
  await user.save(); // saving the instance into database

  res.send("User add successfully");
});
```

- Create a new instance from the user model and use the `save` function: that will save the user document in the database
- When you make the request to that server:
  - If the database is not there, then the database will be created in the cluster with the name in the URL
  - A collection is also created by pluralizing the model name, and then the document will be reflected in the database/cluster

![User document in Compass](../../assets/images/15-compass.png)

- `_id` and `__v` are extra fields added to every document:
  - `_id`: a unique id/string in the database, added by MongoDB
  - `__v`: the version of the document, added by Mongoose (it is Mongoose's version key; a document inserted without Mongoose would have no `__v`)
- We can pass these (`_id`, `__v`) using the model instance, but that is not recommended

### Always wrap DB operations in try catch

- Always wrap any DB operation in a try catch block, this is a best practice

```js
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
```

Code: [app.js](../../dev-tinder/src/app.js)
