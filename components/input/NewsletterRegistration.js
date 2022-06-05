import styles from "../../styles/NewsletterRegistration.module.css";
import { useRef } from "react";
import { useContext } from "react";
import { NotificationCtx } from "../../context/notification-context";
import {
  error,
  pending,
  reset,
  success,
} from "../../helpers/notification-util";

function NewsletterRegistration() {
  const emailRef = useRef();
  const { setState } = useContext(NotificationCtx);

  function registrationHandler(event) {
    event.preventDefault();

    if (emailRef.current.value) {
      setState(pending);

      fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailRef.current.value,
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

          emailRef.current.value = "";

          setTimeout(() => {
            setState(reset);
          }, 2000);
        });
    }
  }

  return (
    <section className={styles.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={styles.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
