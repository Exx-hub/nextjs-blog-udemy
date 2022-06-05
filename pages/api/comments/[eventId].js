import {
  connectDatabase,
  fetchComments,
  insertOneDocument,
} from "../../../helpers/db-utils";

export default async function handler(req, res) {
  console.log(req.body);

  const { email, name, text } = req.body;
  const { eventId } = req.query;

  // add req.body validation. if values are correct like email etc.

  let client;
  const dbName = "eventsProject";
  const collectionName = "comments";

  // DB connection
  try {
    client = await connectDatabase();
    console.log("DB Connected");
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to connect to DB", error: err.message });
  }

  // create new comment object
  const newCommentItem = {
    email,
    name,
    comment: text,
    eventId,
  };

  // for post request, add comment to DB
  if (req.method === "POST") {
    try {
      const result = await insertOneDocument(
        client,
        dbName,
        collectionName,
        newCommentItem
      );
      client.close();
      res
        .status(201)
        .json({ message: "successfully posted comment", data: result });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error Inserting New Comment", error: err.message });
    }
  }

  // for get request, fetch all comments via eventId
  if (req.method === "GET") {
    try {
      const fetchedComments = await fetchComments(
        client,
        dbName,
        collectionName,
        eventId
      );
      client.close();
      res.json({ message: "fetched comments!", data: fetchedComments });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error Fetching Comments", error: err.message });
    }
  }
}
