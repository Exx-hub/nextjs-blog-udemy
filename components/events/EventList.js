import EventCard from "./EventCard";
import styles from "../../styles/EventList.module.css";

function EventList({ events }) {
  return (
    <ul className={styles.list}>
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </ul>
  );
}

export default EventList;
