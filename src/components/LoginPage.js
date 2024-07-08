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

      const userDoc = await getDoc(doc(db, "Users", user.uid));

      if (!userDoc.exists()) {
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
    <div className="login-page">
      <div className="head-container">
        <img src={GenieIcon} alt="head-icon" className="logo-img" />
        <span className="c-text">GiggleGenie</span>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <InputWithLabel
            label="Email"
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <InputWithLabel
            label="Password"
            type="password"
            id="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <label className="remember-me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember me
          </label>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-button">
            Log In
          </button>
        </form>

        <div className="olw">Or login with</div>

        <button className="google-signin-button" onClick={handleGoogleSignIn}>
          <img src={GoogleIcon} alt="Google Logo" className="google-icon" />
          <span>Sign in with Google</span>
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
