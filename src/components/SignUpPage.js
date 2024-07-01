import React from "react";
import "../styles/SignUpPage.css";
import { Link } from "react-router-dom";
import { InputWithLabel } from "./InputWithLabel";
import GoogleIcon from "../pictures/google-icon.png";

function SignUpPage() {
  return (
    <div>
      <div className="text">
        <div className="head">Step into your AtmosSphere!</div>
        <div className="sub-head">
          Personalized weather insights for your world. Sign up and stay in tune
          with nature
        </div>

        <form style={{ marginLeft: "70px" }}>
          <InputWithLabel
            label="Name"
            type="text"
            id="text"
            placeholder="Your name"
          />

          <InputWithLabel
            label="Email or phone number"
            type="password"
            id="password"
            placeholder="Your email address or phone number"
          />

          <InputWithLabel
            label="Password"
            type="password"
            id="password"
            placeholder="Create password"
          />
        </form>

        <button type="submit" className="sign-button">
          Sign up
        </button>
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
            Sign up with google
          </span>
        </button>

        <span class="login">
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
