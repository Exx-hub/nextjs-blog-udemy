export default function handler(req, res) {
  const email = req.body.email;

  // create new user
  // save user in database
  // return success and new saved user object

  res.json({ message: "success", data: email });
}
