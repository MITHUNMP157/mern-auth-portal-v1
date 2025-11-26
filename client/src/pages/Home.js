import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Welcome to MERN Auth System</h1>
        <p className={styles.subtitle}>
          Manage your account with secure authentication.
        </p>
      </div>
    </div>
  );
}
