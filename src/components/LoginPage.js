import React from "react";
import "../styles/LoginPage.css";
import loginIcon from "../pictures/login-icon.png";
import { InputWithLabel } from "./InputWithLabel";

export default function LoginPage() {
  return (
    <div>
      <div className="img-container">
        <img src={loginIcon} alt="Login Icon" className="login-icon" />
      </div>
      <div className="text">
        <div className="head">Step into your AtmosSphere!</div>
        <div className="sub-head">
          Personalized weather insights for your world. Sign up and stay in tune
          with nature
        </div>
        <form>
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
        </form>
      </div>
    </div>
  );
}
