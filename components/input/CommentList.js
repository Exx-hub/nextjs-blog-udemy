import styles from "../../styles/CommentList.module.css";
import { useState, useEffect } from "react";

function CommentList({ eventId }) {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/comments/${eventId}`)
      .then((res) => res.json())
      .then((e) => {
        console.log(e);

        if (e.error) {
          setError(true);
        }

        if (e.data) {
          setComments(e.data);
        }
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <h1>Loading Data..</h1>
      ) : error ? (
        <h1>Error Fetching Data..</h1>
      ) : (
        <ul className={styles.comments}>
          {comments.length > 0 ? (
            comments.map((item) => (
              <li key={item._id}>
                <p>{item.comment}</p>
                <div>
                  By <address>{item.name}</address>
                </div>
              </li>
            ))
          ) : (
            <h2>No Comments yet. Write a first one!</h2>
          )}
        </ul>
      )}
    </>
  );
}

export default CommentList;
