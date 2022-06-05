import { useState, useContext } from "react";

import CommentList from "./CommentList";
import NewComment from "./NewComment";
import styles from "../../styles/Comments.module.css";
import { NotificationCtx } from "../../context/notification-context";
import {
  error,
  pending,
  reset,
  success,
} from "../../helpers/notification-util";

function Comments(props) {
  const { eventId } = props;
  const { setState } = useContext(NotificationCtx);

  const [showComments, setShowComments] = useState(false);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    const { email, name, text } = commentData;

    if (email && name && text) {
      setState(pending);

      fetch(`/api/comments/${eventId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          text,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.data) {
            setState(success);
          }

          if (data.error) {
            setState(error);

            throw new Error(data.error);
          }

          setTimeout(() => {
            setShowComments(false);
            setState(reset);
          }, 2000);
        });
    }
  }

  return (
    <section className={styles.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList eventId={eventId} />}
    </section>
  );
}

export default Comments;
