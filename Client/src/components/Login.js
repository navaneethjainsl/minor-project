import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import styles from "./Login.module.css";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const history = useHistory();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/login",{
        withCredentials: true,
      }, {
        username: formData.username,
        password: formData.password,
      });
      console.log(response);
      if (response.data.success) {
        console.log("Login successful!");
        history.push("/home"); // Navigate to the home page after successful login
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error logging in");
      // Handle error, show error message or retry logic
    }
  };
  return (
    <div className={styles.formContainer} style={{ background: "#252424" }}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2
          id="heading"
          style={{
            color: "white",
            display: "flex",
            padding: "20px",
            alignContent: "center",
            flexWrap: "wrap",
            flexDirection: "column-reverse",
          }}
        >
          Login
        </h2>

        <div className={styles.field}>
          <svg
            className={styles.inputIcon}
            style={{ color: "white" }}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
          </svg>
          <input
            autoComplete="off"
            placeholder="Username"
            className={styles.inputField}
            type="name"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <svg
            className={styles.inputIcon}
            style={{ color: "white" }}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
          </svg>
          <input
            placeholder="Password"
            className={styles.inputField}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.btn}>
          <button className={styles.button1} type="submit">
            Login
          </button>
        </div>

        <p className={styles.registerLink} style={{ paddingBottom: "34px" }}>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
