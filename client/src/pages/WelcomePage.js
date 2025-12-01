import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);

  const fetchData = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      return setUser(token);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <>
        <h1>Welcome to MERN Auth System</h1>
        <p>Manage your account with secure authentication.</p>
        <div className={styles.buttons}>
          <Link to="/login">
            <button className={styles.btnPrimary}>Login</button>
          </Link>

          <Link to="/register">
            <button className={styles.btnSecondary}>Register</button>
          </Link>
        </div>
      </>
    </div>
  );
}
