import Image from "next/image";
import styles from "../../styles/EventByIdCard.module.css";
import { HiOutlineCalendar, HiOutlineLocationMarker } from "react-icons/hi";

function EventByIdCard({ event }) {
  const { date, location, image } = event;

  const formattedDate = new Date(date).toDateString();
  const formattedLocation = location.replace(", ", "\n");

  return (
    <div className={styles.container}>
      <div className={styles.imageDiv}>
        <Image src={image} alt="aaa" width={200} height={200} />
      </div>
      <div className={styles.textDetails}>
        <div className={styles.date}>
          <HiOutlineCalendar style={{ marginRight: 6, minWidth: "1em" }} />
          <time>{formattedDate}</time>
        </div>
        <div className={styles.location}>
          <HiOutlineLocationMarker
            style={{ marginRight: 6, minWidth: "1em" }}
          />
          <address>{formattedLocation}</address>
        </div>
      </div>
    </div>
  );
}

export default EventByIdCard;
