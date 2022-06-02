import Image from "next/image";
import styles from "../../styles/EventCard.module.css";
import {
  HiOutlineCalendar,
  HiOutlineLocationMarker,
  HiArrowRight,
} from "react-icons/hi";
import Button from "../layout/Button";

function EventCard({ event }) {
  const { title, location, date, image, _id } = event;

  const formattedDate = new Date(date).toDateString();
  const formattedLocation = location.replace(", ", "\n");
  const exploreLink = `/events/${_id}`;

  return (
    <li className={styles.container}>
      <Image src={image} width={250} height={200} alt="event" />

      <article className={styles.textContainer}>
        <section>
          <h2 className={styles.title}>{title}</h2>

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
        </section>

        <Button path={exploreLink}>
          <span>Explore Event</span> <HiArrowRight />
        </Button>
      </article>
    </li>
  );
}

export default EventCard;
