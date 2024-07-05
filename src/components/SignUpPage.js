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
      navigate("/login"); // Redirect to login page after successful registration
    } catch (error) {
      setError(error.message);
      console.error("Error registering user:", error);
    }
  };

  const handleGoogleSignUp = async () => {
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
        console.log("New user registered with Google");
      } else {
        console.log("Existing user signed in with Google");
      }

      navigate("/dashboard"); // Redirect to dashboard after successful Google sign-up/sign-in
    } catch (error) {
      setError(error.message);
      console.error("Google sign-up error:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        flexDirection: "column",
        marginLeft: "470px",
        width: "700px",
        height: "700px",
        marginTop: "40px",
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

      <div className="form-container">
        <form onSubmit={handleRegister} style={{ marginLeft: "70px" }}>
          <InputWithLabel
            label="Name"
            type="text"
            id="text"
            placeholder="Your name"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            required
          />

          <InputWithLabel
            label="Email or phone number"
            type="email"
            id="email"
            placeholder="Your email address or phone number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <InputWithLabel
            label="Password"
            type="password"
            id="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" className="sign-button">
            Sign up
          </button>
        </form>

        <div className="or">or</div>

        <button
          onClick={handleGoogleSignUp}
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid white",
            width: "520px",
            height: "54px",
            transform: "translate(2%,16%)",
          }}
        >
          <img
            className="logo-img"
            src={GoogleIcon}
            alt="Logo"
            style={{ marginRight: "19px", height: "28px", width: "28px" }}
          />
          <span
            className="b-text"
            style={{ color: "white", fontSize: "17px", marginRight: "8px" }}
          >
            Sign up with Google
          </span>
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
