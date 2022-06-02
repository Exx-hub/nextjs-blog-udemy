import EventList from "../components/events/EventList";
import axios from "axios";
import Head from "next/head";
import NewsletterRegistration from "../components/input/NewsletterRegistration";

function Home({ featuredEvents }) {
  return (
    <>
      <Head>
        <title>Next Events</title>
        <meta
          name="description"
          content="Find events for your career progress."
        />
      </Head>
      <main>
        <NewsletterRegistration />
        <EventList events={featuredEvents} />
      </main>
    </>
  );
}

export default Home;

export const getStaticProps = async () => {
  const response = await axios.get(
    "https://nextjs-course-85a4e-default-rtdb.firebaseio.com/events.json"
  );

  let allEvents = [];
  for (let key in response.data) {
    allEvents.push(response.data[key]);
  }

  const featuredEvents = allEvents.filter((item) => item.isFeatured);

  return {
    props: {
      featuredEvents,
    },
    revalidate: 1800,
  };
};
