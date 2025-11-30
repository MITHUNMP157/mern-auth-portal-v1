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
      {user ? (
        <>
          <h1>Welcome Back..!</h1>
          <p>You are successfully logged in.</p>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
            style={{
              marginTop: 20,
              padding: "10px 18px",
              background: "tomato",
              color: "#fff",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </>
      ) : (
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
      )}
    </div>
  );
}
