import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/EventsSearch";
import Head from "next/head";

function AllEvents(props) {
  const { events } = props;
  const router = useRouter();

  const onSearch = (year, month) => {
    router.push(`events/${year}/${month}`);
  };
  return (
    <>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="A list of all events listed for Software Development"
        />
      </Head>
      <main>
        <EventsSearch onSearch={onSearch} />
        <EventList events={events} />
      </main>
    </>
  );
}

export default AllEvents;

export const getStaticProps = async () => {
  const response = await axios.get(
    "https://nextjs-course-85a4e-default-rtdb.firebaseio.com/events.json"
  );

  let allEvents = [];
  for (let key in response.data) {
    allEvents.push(response.data[key]);
  }

  return {
    props: {
      events: allEvents,
    },
    revalidate: 60,
  };
};
