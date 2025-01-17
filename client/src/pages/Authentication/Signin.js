import React, { use, useState } from "react";
import { Link } from "react-router-dom";
import "./Signin.css"; // Custom CSS for Signin

import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Signin successful:", result);
        localStorage.setItem("username", result.username);
        localStorage.setItem("token", result.token)
        // redirect to home route with the username
        navigate("/");

      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error("Signin error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="signin-container">
      {/* Logo Section */}
      <div className="logo-container">
        <img src="lenscape_logo.jpg" alt="Lenscape Logo" className="logo" />
      </div>

      {/* Title */}
      {/* <h2 className="signin-title">Sign In</h2> */}

      {/* Form */}
      <form className="signin-form" onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label htmlFor="email" className="label"></label>
          <input
            type="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="input-field"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="label"></label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="input-field"
            required
          />
        </div>
        <button type="submit" className="btn-submit">
          Sign In
        </button>
      </form>

      {/* Signup Prompt */}
      <p className="signup-prompt">
        Don't have an account?{" "}
        <Link to="/signup" className="signup-link">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Signin;
