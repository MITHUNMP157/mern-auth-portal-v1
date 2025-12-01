import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ProfilePage.module.css";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = response.data;
      setProfile(data);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else {
        console.log(`Error: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>User Profile</h1>

      {profile && (
        <div className={styles.card}>
          <h3 className={styles.name}>{profile.name}</h3>
          <p className={styles.email}>{profile.email}</p>
        </div>
      )}
    </div>
  );
}
