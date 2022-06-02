import { useState } from "react";

import CommentList from "./CommentList";
import NewComment from "./NewComment";
import styles from "../../styles/Comments.module.css";

function Comments(props) {
  const { eventId } = props;
  console.log(eventId);

  const [showComments, setShowComments] = useState(false);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    // send data to API
    console.log(commentData);
    const { email, name, text } = commentData;

    fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        text,
        eventId,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  return (
    <section className={styles.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList />}
    </section>
  );
}

export default Comments;
