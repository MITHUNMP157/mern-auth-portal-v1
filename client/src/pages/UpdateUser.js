import styles from "./UpdateUser.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await response.data;
        setUser(data);
      } catch (error) {
        console.error("Update Error:", error);
      }
    };
    userData();
  }, []);

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/user/${id}`, user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("User Updated Successfully");
      navigate("/admin");
    } catch (err) {
      alert("Update Failed");
    }
  };

  return (
    <div className={styles.updateContainer}>
      <h2>Update User Details</h2>

      <input
        name="name"
        className={styles.updateInput}
        value={user.name}
        onChange={handleChange}
        placeholder="Enter Name"
      />

      <input
        name="email"
        className={styles.updateInput}
        value={user.email}
        onChange={handleChange}
        placeholder="Enter Email"
      />

      <select
        name="role"
        className={styles.updateSelect}
        value={user.role}
        onChange={handleChange}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button className={styles.updateBtn} onClick={handleUpdate}>
        Save Changes
      </button>
    </div>
  );
}
