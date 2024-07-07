import React, { useState } from "react";
import "../styles/LoginPage.css";
import { InputWithLabel } from "./InputWithLabel";
import GenieIcon from "../pictures/genie.png";
import GoogleIcon from "../pictures/google-icon.png";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider, db } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in successfully:", userCredential);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError("Failed to log in. Please check your email and password.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if user exists in Firestore
      const userDoc = await getDoc(doc(db, "Users", user.uid));

      if (!userDoc.exists()) {
        // If user doesn't exist, create a new document
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          name: user.displayName,
        });
      }

      console.log("User logged in successfully with Google:", user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Google sign-in error:", error);
      setError("Failed to sign in with Google. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        flexDirection: "column",
        marginLeft: "470px",
        height: "630px",
        width: "700px",
        marginTop: "100px",
      }}
    >
      <div
        className="head-container"
        style={{ transform: "translate(0%,-50%)", display: "flex" }}
      >
        <img
          src={GenieIcon}
          alt="head-icon"
          style={{
            marginRight: "24px",
            height: "45px",
            width: "45px",
            transform: "translateX(12px)",
          }}
          className="logo-img"
        />
        <span
          className="c-text"
          style={{
            color: "white",
            fontSize: "30px",
            fontWeight: "600",
            marginTop: "3px",
            transform: "translateX(8px)",
          }}
        >
          GiggleGenie
        </span>
      </div>
      <div class="form-container">
        <form onSubmit={handleSubmit} style={{ marginLeft: "70px" }}>
          <InputWithLabel
            label="Email"
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginLeft: "28px" }}
            required
          />

          <InputWithLabel
            label="Password"
            type="password"
            id="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginLeft: "20px" }}
          />

          <label
            style={{
              display: "flex",
              alignItems: "center",
              color: "white",
              fontSize: "17px",
              transform: "translate(-4%,90%)",
              // marginLeft: "150px",
              // marginTop: "24px",
            }}
          >
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{
                width: "20px",
                height: "20px",
                marginRight: "12px",
              }}
            />
            Remember me
          </label>

          {error && <p style={{ color: "red" }}>{error}</p>}

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
            justifyContent: "center",
            border: "1px solid white",
            width: "520px",
            height: "54px",
            transform: "translate(-11%,34%)",
            backgroundColor: "black",
          }}
        >
          <img
            src={GoogleIcon}
            alt="Logo"
            style={{ marginRight: "16px", height: "26px", width: "26px" }}
            className="logo-img"
          />
          <span className="b-text" style={{ color: "white", fontSize: "17px" }}>
            Sign in with Google
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
