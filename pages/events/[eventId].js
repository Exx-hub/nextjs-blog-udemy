import axios from "axios";
import Head from "next/head";
import EventByIdCard from "../../components/events/EventByIdCard";
import styles from "../../styles/EventDetailPage.module.css";
import Comments from "../../components/input/Comments";

function EventDetailPage({ event }) {
  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <main>
        <header className={styles.jumbotron}>{event.title}</header>
        <EventByIdCard event={event} />
        <section className={styles.description}>{event.description}</section>
        <Comments eventId={event._id} />
      </main>
    </>
  );
}

export default EventDetailPage;

export const getStaticPaths = async () => {
  const response = await axios.get(
    "https://nextjs-course-85a4e-default-rtdb.firebaseio.com/events.json"
  );

  let allEvents = [];
  for (let key in response.data) {
    allEvents.push(response.data[key]);
  }

  const featuredEvents = allEvents.filter((item) => item.isFeatured);

  const paths = featuredEvents.map((item) => {
    return {
      params: { eventId: item._id },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (context) => {
  const { eventId } = context.params;

  const response = await axios.get(
    `https://nextjs-course-85a4e-default-rtdb.firebaseio.com/events/${eventId}.json`
  );

  if (!response.data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      event: response.data,
    },
    revalidate: 30,
  };
};
