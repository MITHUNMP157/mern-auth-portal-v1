import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ProfilePage.module.css";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProfile(res.data))
      .catch((err) => console.log(err));
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
