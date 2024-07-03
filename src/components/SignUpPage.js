import React, { useState } from "react";
import "../styles/SignUpPage.css";
import { Link, useNavigate } from "react-router-dom";
import { InputWithLabel } from "./InputWithLabel";
import GoogleIcon from "../pictures/google-icon.png";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";

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
      console.log("User logged in successfully");
      navigate("/login"); // Redirect to login page after successful registration
    } catch (error) {
      setError(error.message);
      console.error("Error registering user:", error);
    }
  };

  return (
    <div>
      <div className="text">
        <div className="head">Step into your AtmosSphere!</div>

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
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid white",
            width: "600px",
            height: "58px",
            marginLeft: "70px",
            marginTop: "15px",
          }}
        >
          <img
            className="logo-img"
            src={GoogleIcon}
            alt="Logo"
            style={{ marginRight: "10px", height: "32px", width: "32px" }}
          />
          <span className="b-text" style={{ color: "white" }}>
            Sign up with Google
          </span>
        </button>

        <span className="login">
          If you already have an account,
          <Link to="/login" className="login-link">
            Log in
          </Link>
        </span>
      </div>
    </div>
  );
}

export default SignUpPage;
