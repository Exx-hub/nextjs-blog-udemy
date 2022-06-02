import styles from "../../styles/CommentList.module.css";
import { useState, useEffect } from "react";

function CommentList() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch("/api/comments")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setComments(data.data);
      });
  }, []);

  return (
    <ul className={styles.comments}>
      {/* Render list of comments - fetched from API */}
      {comments.length > 0 ? (
        comments.map((item) => (
          <li key={item.id}>
            <p>{item.comment}</p>
            <div>
              By <address>{item.user}</address>
            </div>
          </li>
        ))
      ) : (
        <h2>Write a comment!</h2>
      )}
    </ul>
  );
}

export default CommentList;
