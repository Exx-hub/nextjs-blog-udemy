import Head from "next/head";
import { useContext } from "react";
import { NotificationCtx } from "../../context/notification-context";
import Notification from "../notification/Notification";
import Navbar from "./Navbar";

function Layout({ children }) {
  const { state } = useContext(NotificationCtx);
  return (
    <>
      <Head>
        <title>NextEvents</title>
        <meta
          name="description"
          content="Events for everyone with a dream of breaking through the tech world."
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />
      <main>{children}</main>
      <Notification />
    </>
  );
}

export default Layout;
