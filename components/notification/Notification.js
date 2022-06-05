import { useContext } from "react";
import { NotificationCtx } from "../../context/notification-context";
import styles from "../../styles/Notification.module.css";

function Notification() {
  const { state } = useContext(NotificationCtx);
  const { status, title, message, notifVisible } = state;

  let statusClasses = "";

  if (status === "success") {
    statusClasses = styles.success;
  }

  if (status === "error") {
    statusClasses = styles.error;
  }

  if (status === "pending") {
    statusClasses = styles.pending;
  }

  const activeClasses = `${styles.notification} ${statusClasses}`;

  return (
    <>
      {notifVisible && (
        <div className={activeClasses} onClick={() => setNotifVisible(false)}>
          <h2>{title}</h2>
          <p>{message}</p>
        </div>
      )}
    </>
  );
}

export default Notification;
