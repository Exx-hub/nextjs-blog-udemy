import { connectDatabase, insertOneDocument } from "../../helpers/db-utils";

export default async function handler(req, res) {
  const email = req.body.email;

  let client;

  // connect to db
  try {
    client = await connectDatabase();
    console.log("DB Connected");
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to connect to DB", error: err.message });
  }

  // check http method, if POST run code
  if (req.method === "POST") {
    // validate email, return 422 if invalid
    if (!email || !email.includes("@")) {
      res.status(422).json("Invalid Email Format.");
      return;
    }

    // insert document to DB collection
    try {
      await insertOneDocument(client, "eventsProject", "emails", { email });
      client.close();
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error saving email.", error: err.message });
    }

    // if insert is successful return success reponse
    res
      .status(201)
      .json({ message: "successfully registered email", data: email });
  }
}
