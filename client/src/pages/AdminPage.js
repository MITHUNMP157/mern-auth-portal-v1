import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AdminPage.module.css";

export default function AdminPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/auth/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div className={styles.adminContainer}>
      <h1 className="admin-title">All Registered Users</h1>

      <div className={styles.usersGrid}>
        {users.map((user) => (
          <div key={user._id} className={styles.userCard}>
            <h3 className={styles.username}>{user.name}</h3>
            <p className={styles.useremail}>{user.email}</p>
            <p className={styles.userrole}>{user.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
