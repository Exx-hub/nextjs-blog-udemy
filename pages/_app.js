import Layout from "../components/layout/Layout";
import ContextProvider from "../context/notification-context";
import Notification from "../components/notification/Notification";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ContextProvider>
        <Layout>
          <Component {...pageProps} />
          <Notification />
        </Layout>
      </ContextProvider>
    </>
  );
}

export default MyApp;
