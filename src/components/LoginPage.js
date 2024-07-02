import React from "react";
import "../styles/LoginPage.css";
import { InputWithLabel } from "./InputWithLabel";
import GoogleIcon from "../pictures/google-icon.png";
import { Link } from "react-router-dom";

export default function LoginPage() {
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
            label="Email"
            type="email"
            id="email"
            placeholder="Email"
          />

          <InputWithLabel
            label="Password"
            type="password"
            id="password"
            placeholder="Password"
          />

          <label style={{ color: "white" }}>
            <input
              type="checkbox"
              value="option1"
              defaultChecked={true}
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
            className="logo-img"
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
