import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AdminPage.module.css";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure want to delete this user?")) return;

    const token = localStorage.getItem("token");

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("User Deleted Successfully");
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      console.log(err.message);
      alert("Delete Failed");
    }
  };

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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className={styles.updateBtn}
                  onClick={() => navigate(`/update/${user._id}`)}
                >
                  Update
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
