import Link from "next/link";
import styles from "../../styles/Button.module.css";

function Button(props) {
  if (props.path) {
    return (
      <Link href={props.path}>
        <a className={styles.btn}>{props.children}</a>
      </Link>
    );
  }

  return (
    <button className={styles.filterBtn} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Button;
