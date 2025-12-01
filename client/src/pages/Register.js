import { useState } from "react";
import styles from "./Register.module.css";
import axios from "axios";
import { login, register } from "../api/Auth";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [userRegisterData, setUserRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserRegisterData({ ...userRegisterData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = userRegisterData.name;
    const email = userRegisterData.email;
    const password = userRegisterData.password;
    const role = userRegisterData.role;

    if (!name || !email || !password) {
      setSuccess("");
      setError("Enter valid Inputs");
      return;
    }

    try {
      setLoading(true);
      await register(name, email, password, role);
      setSuccess("Register  Successfully");
      alert("Register  Successfully");
      setError("");
      navigate("/login");
    } catch (error) {
      setLoading(false);
      console.log("Register Error:", error.message);
      setError(error.message || "Register Failed");
      alert("Register Failed");
      setSuccess("");
      setUserRegisterData({
        name: "",
        email: "",
        password: "",
        role: "",
      });
    }
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create Account</h2>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          type="text"
          className={styles.input}
          name="name"
          value={userRegisterData.name}
          onChange={handleChange}
        />
        <input
          placeholder="Email"
          type="email"
          className={styles.input}
          name="email"
          value={userRegisterData.email}
          onChange={handleChange}
        />
        <input
          placeholder="Password"
          type="password"
          className={styles.input}
          name="password"
          value={userRegisterData.password}
          onChange={handleChange}
        />
        <select
          name="role"
          value={userRegisterData.role}
          className={styles.input}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select Role
          </option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <button className={styles.button} disabled={loading}>
          Register
        </button>
        {loading ? (
          <div className="d-flex justify-content-center mt-3">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          ""
        )}
        <p className={styles.linkText}>
          Already have an account? <Link to="/login">Login</Link> |{" "}
          <Link to="/">Back to Home</Link>
        </p>
      </form>
    </div>
  );
}
