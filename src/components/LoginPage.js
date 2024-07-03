import React, { useState } from "react";
import "../styles/LoginPage.css";
import { InputWithLabel } from "./InputWithLabel";
import GoogleIcon from "../pictures/google-icon.png";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const navigate = useNavigate(); //import useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in successfully:", userCredential);
      navigate("/dashboard");
      // Handle successful login (e.g., redirect to protected routes)
    } catch (error) {
      console.error("Login error:", error);
      // Handle login errors (e.g., display error message to the user)
    }
  };

  const handleGoogleSignIn = () => {
    console.log("Google sign-in attempted");
  };

  return (
    <div>
      <div className="text">
        <form onSubmit={handleSubmit} style={{ marginLeft: "70px" }}>
          <div className="head">Step into your AtmosSphere!</div>
          <InputWithLabel
            label="Email"
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputWithLabel
            label="Password"
            type="password"
            id="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <label style={{ color: "white" }}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{
                width: "17px",
                height: "17px",
                marginTop: "24px",
                marginRight: "8px",
              }}
            />
            Remember me
          </label>

          <button type="submit" className="login-button">
            Log In
          </button>
        </form>

        <div className="olw">Or login with</div>
        <button
          className="logo-img"
          onClick={handleGoogleSignIn}
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid white",
            width: "600px",
            height: "58px",
            marginLeft: "70px",
            marginTop: "24px",
          }}
        >
          <img
            src={GoogleIcon}
            alt="Logo"
            style={{ marginRight: "10px", height: "32px", width: "32px" }}
          />
          <span className="b-text" style={{ color: "white" }}>
            Sign up with Google
          </span>
        </button>

        <span className="sign">
          Don't have an account?{" "}
          <Link to="/signup" className="registerLink">
            Register here
          </Link>
        </span>
      </div>
    </div>
  );
}
