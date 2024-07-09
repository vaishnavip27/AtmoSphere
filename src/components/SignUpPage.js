import React, { useState } from "react";
import "../styles/SignUpPage.css";
import { Link, useNavigate } from "react-router-dom";
import { InputWithLabel } from "./InputWithLabel";
import GoogleIcon from "../pictures/google-icon.png";
import GenieIcon from "../pictures/genie.png";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, googleProvider } from "./firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        name: fname,
      });
      console.log("User registered successfully");
      navigate("/login");
    } catch (error) {
      setError(error.message);
      console.error("Error registering user:", error);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const userDoc = await getDoc(doc(db, "Users", user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          name: user.displayName,
        });
        console.log("New user registered with Google");
      } else {
        console.log("Existing user signed in with Google");
      }
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
      console.error("Google sign-up error:", error);
    }
  };

  return (
    <div className="signup-page">
      <div className="head-container">
        <img src={GenieIcon} alt="head-icon" className="logo-img" />
        <span className="c-text">GiggleGenie</span>
      </div>

      <div className="form-container">
        <form onSubmit={handleRegister}>
          <InputWithLabel
            label="Name"
            type="text"
            id="text"
            placeholder="Your name"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            required
            className="ph-value"
          />
          <InputWithLabel
            label="Email or phone number"
            type="email"
            id="email"
            placeholder="Your email address or phone number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="ph-value"
          />
          <InputWithLabel
            label="Password"
            type="password"
            id="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="ph-value"
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="sign-button">
            Sign up
          </button>
        </form>

        <div className="or">or</div>

        <button onClick={handleGoogleSignUp} className="google-signup-button">
          <img className="google-icon" src={GoogleIcon} alt="Google Logo" />
          <span className="tt">Sign up with Google</span>
        </button>

        <span className="login">
          If you already have an account,{" "}
          <Link to="/login" className="login-link">
            Log in
          </Link>
        </span>
      </div>
    </div>
  );
}

export default SignUpPage;
