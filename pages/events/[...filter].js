import EventList from "../../components/events/EventList";
import axios from "axios";
import Button from "../../components/layout/Button";
import { useRouter } from "next/router";
import TemplateButton from "../../components/layout/TemplateButton";
import Head from "next/head";

function EventFilter({ events, month, year }) {
  const router = useRouter();
  // console.log(events);

  const pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content="Find events for your career progress."
      />
    </Head>
  );

  if (events.length < 1) {
    return (
      <>
        {pageHeadData}
        <TemplateButton>No Events, Please Choose Another Date</TemplateButton>
      </>
    );
  }

  const date = new Date(year, month);
  return (
    <>
      {pageHeadData}
      <div>
        <TemplateButton>
          Events for {date.getFullYear()} - {date.getMonth()}
        </TemplateButton>
        <EventList events={events} />{" "}
      </div>
    </>
  );
}

export default EventFilter;

export const getServerSideProps = async (context) => {
  const { params } = context;

  const filteredYear = +params.filter[0];
  const filteredMonth = +params.filter[1];

  if (
    isNaN(filteredYear) ||
    isNaN(filteredMonth) ||
    filteredYear > 2022 ||
    filteredYear < 2021 ||
    filteredMonth > 12 ||
    filteredMonth < 1
  ) {
    return {
      notFound: true,
      // props: {
      //   hasError: true
      // } // then use this prop to show an error component instead.
    };
  }

  const response = await axios.get(
    "https://nextjs-course-85a4e-default-rtdb.firebaseio.com/events.json"
  );

  let allEvents = [];
  for (let key in response.data) {
    allEvents.push(response.data[key]);
  }

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);

    return (
      eventDate.getFullYear() === filteredYear &&
      eventDate.getMonth() === filteredMonth - 1
    );
  });

  return {
    props: {
      events: filteredEvents,
      year: filteredYear,
      month: filteredMonth,
    },
  };
};

// const router = useRouter();
//   const filterData = router.query.filter;
//   console.log("filter data:", filterData);

//   const filteredYear = filterData && +filterData[0];
//   const filteredMonth = filterData && +filterData[1];

//   const [events, setEvents] = useState([]);
//   console.log(events);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await axios.get(
//         "https://nextjs-course-85a4e-default-rtdb.firebaseio.com/events.json"
//       );

//       let allEvents = [];
//       for (let key in response.data) {
//         allEvents.push(response.data[key]);
//       }

//       let filteredEvents = allEvents.filter((event) => {
//         const eventDate = new Date(event.date);

//         return (
//           eventDate.getFullYear() === filteredYear &&
//           eventDate.getMonth() === filteredMonth - 1
//         );
//       });

//       if (filteredEvents.length > 0) {
//         setEvents(filteredEvents);
//       } else {
//         setEvents(null);
//       }
//     };

//     fetchData();
//   }, []);

//   if (!filterData) {
//     return <h2>No Results Found</h2>;
//   }
