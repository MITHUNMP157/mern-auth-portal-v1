import { useState } from "react";
import axios from "axios";
import { API } from "../api";
import styles from "./Login.module.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        form
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("userName", res.data.name);

      if (res.data.role === "admin") {
        window.location.href = "/";
      } else {
        window.location.href = "/";
      }

      alert("Logged in successfully!");
    } catch (error) {
      console.log("Login error:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button className={styles.button}>Login</button>
        <p className={styles.linkText}>
          Don't have an account? <a href="/register">Create</a>
        </p>
      </form>
    </div>
  );
}
