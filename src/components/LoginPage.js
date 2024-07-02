import React from "react";
import "../styles/LoginPage.css";
import { InputWithLabel } from "./InputWithLabel";
import GoogleIcon from "../pictures/google-icon.png";
import { Link } from "react-router-dom";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../firebase/auth";
import { useAuth } from "../contexts/authContext";

export default function LoginPage() {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      await doSignInWithEmailAndPassword(email, password);
    }
  };

  const onGoogleSignIn = (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithGoogle().catch;
    }
  };
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
              checked={true}
              style={{
                width: "17px",
                height: "17px",
                marginTop: "24px",
                marginRight: "8px",
              }}
            />
            Remember me
          </label>
        </form>
        <button type="submit" className="login-button">
          Log In
        </button>
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
            Sign up with google
          </span>
        </button>

        <span className="sign">
          Don't have an account ?{" "}
          <Link to="/signup" className="registerLink">
            Register here
          </Link>
        </span>
      </div>
    </div>
  );
}
