import { MongoClient } from "mongodb";

export const connectDatabase = async () => {
  const url =
    "mongodb+srv://AlvinAcosta:A7v1n@nextjscluster.xru866t.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(url);

  await client.connect();

  return client;
};

export const insertOneDocument = async (
  client,
  dbName,
  collectionName,
  doc
) => {
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  const result = await collection.insertOne(doc);

  return result;
};

export const fetchComments = async (
  client,
  dbName,
  collectionName,
  eventId
) => {
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  const result = await collection.find({ eventId }).sort({ _id: -1 }).toArray();

  return result;
};
