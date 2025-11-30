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
        `${process.env.REACT_APP_API_URL}/profile/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = response.data;
      setProfile(data);
      console.log(data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else {
        console.log(`Error: ${error}`);
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
