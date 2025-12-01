import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [access, setAccess] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    setLoggedIn(!!token);
    setAccess(role);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    navigate("/");
    setLoggedIn(false);
  };

  return (
    <nav className={styles.navbar}>
      <h1 className={styles.logo}>
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          MERN Auth
        </Link>
      </h1>

      <ul className={styles.navLinks}>
        <li>
          <Link className={styles.link} to="/home">
            Home
          </Link>
        </li>

        <>
          <li>
            <Link className={styles.link} to="/profile">
              Profile
            </Link>
          </li>
          {access === "admin" ? (
            <li>
              <Link className={styles.link} to="/admin">
                Admin
              </Link>
            </li>
          ) : (
            ""
          )}

          <li>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          </li>
        </>
      </ul>
    </nav>
  );
}
