import Head from "next/head";
import Navbar from "./Navbar";

function Layout({ children }) {
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
    </>
  );
}

export default Layout;
