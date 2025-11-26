import { useState } from "react";
import { API } from "../api";
import axios from "axios";
import styles from "./Register.module.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form) {
      return console.log("No form data found");
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );
      alert(res.data.message);
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          type="text"
          className={styles.input}
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          placeholder="Email"
          type="email"
          className={styles.input}
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          placeholder="Password"
          type="password"
          className={styles.input}
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <input
          placeholder="Role"
          type="text"
          className={styles.input}
          name="role"
          value={form.role}
          onChange={handleChange}
        />
        <button className={styles.button}>Register</button>
        <p className={styles.linkText}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}
