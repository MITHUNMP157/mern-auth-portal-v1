import { useState } from "react";
import axios from "axios";
import styles from "./Login.module.css";
import { login } from "../api/Auth";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [userLoginData, setUserLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserLoginData({ ...userLoginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = userLoginData.email;
    const password = userLoginData.password;

    if (!email || !password) {
      setSuccess("");
      setError("Enter valid Credential");
      return;
    }

    try {
      await login(email, password);
      setSuccess("Login  Successfully");
      alert("Login  Successfully");
      setError("");
      navigate("/home");
    } catch (error) {
      console.log("Login Error:", error.message);
      alert("Login Failed");
      setError(error.message || "Login Failed");
      setSuccess("");
      setUserLoginData({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          type="email"
          className={styles.input}
          name="email"
          value={userLoginData.email}
          onChange={handleChange}
        />
        <input
          placeholder="Password"
          type="password"
          className={styles.input}
          name="password"
          value={userLoginData.password}
          onChange={handleChange}
        />
        <button className={styles.button}>Login</button>
        <p className={styles.linkText}>
          Don't have an account? <Link to="/register">Create</Link>|{" "}
          <Link to="/">Back to Home</Link>
        </p>
      </form>
    </div>
  );
}
