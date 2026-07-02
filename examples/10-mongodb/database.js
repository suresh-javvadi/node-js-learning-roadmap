const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://sureshjavvadi:<db_password>@learningnode.p0acwhb.mongodb.net/";

const client = new MongoClient(url);

const dbName = "helloWorld";

async function main() {
  await client.connect();
  console.log("Connected to MongoDB");

  const db = client.db(dbName);
  const collection = db.collection("user");

  const insertResult = await collection.insertMany([
    {
      firstName: "Surya",
      lastName: "J",
      city: "Hyderabad",
    },
  ]);

  console.log("Inserted resulted", insertResult);

  const findResults = await collection.find({}).toArray();
  console.log("Found documents =>", findResults);

  const countResult = await collection.countDocuments();
  console.log("Total documents in collection =>", countResult);

  const findResult = await collection.find({ firstName: "Surya" }).toArray(); // It will give the cursor object
  console.log("Found documents =>", findResult);

  const updateResult = await collection.updateOne(
    { firstName: "Surya" },
    { $set: { city: "Bangalore" } },
  );
  console.log("Updated documents =>", updateResult);

  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
