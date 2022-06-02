import Link from "next/link";
import styles from "../../styles/Navbar.module.css";

function Navbar() {
  return (
    <header className={styles.container}>
      <Link href="/">
        <a className={styles.logo}>NextEvents</a>
      </Link>
      <nav>
        <Link href="/events">
          <a>Browse All Events</a>
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
