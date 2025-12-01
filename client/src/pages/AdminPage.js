import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AdminPage.module.css";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${process.env.REACT_APP_API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div className={styles.adminContainer}>
      <h1 className={styles.adminTitle}>All Registered Users</h1>

      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
