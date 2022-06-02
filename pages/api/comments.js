export default function handler(req, res) {
  console.log(req.body);

  if (req.method === "POST") {
    // find document by id
    // create new comment object
    // foundItem - save comment object
    // return response
  }

  // if get -- fetch all comments from an ID and return in response

  const dummyCommentArray = [
    { comment: "hello alvin", user: "Alvin", id: 1 },
    { comment: "What is up?", user: "David", id: 2 },
  ];

  res.json({ message: "success", data: dummyCommentArray });
}
