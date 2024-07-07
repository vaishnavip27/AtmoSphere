import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import twitterIcon from "../pictures/twitter-logo.png";

export default function Dashboard() {
  const [userName, setUserName] = useState("");
  const [joke, setJoke] = useState("Click the button to get the joke");

  useEffect(() => {
    const fetchUserName = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "Users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserName(userData.name);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserName();
  }, []);

  const fetchJoke = async () => {
    try {
      const response = await fetch("https://icanhazdadjoke.com/", {
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status : ${response.status}`);
      }

      const data = await response.json();
      setJoke(data.joke);
    } catch (error) {
      console.error("Error fetching joke:", error);
      setJoke("Failed to fetch a joke. Please try again!");
    }
  };

  const postTotwitter = () => {
    const tweetText = encodeURIComponent(
      `${joke}\n\n~ GiggleGenie made by Vaishnavi`
    );
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(twitterUrl, "_blank");
  };
  return (
    <div className="container">
      <div className="head">Hey {userName}, here is your joke</div>
      <div className="joke">{joke}</div>
      <div className="button-container">
        <button onClick={fetchJoke}>Get a joke</button>
        <button onClick={postTotwitter}>
          <img src={twitterIcon} alt="Twitter" className="twitter-icon" /> Post
          it on Twitter
        </button>
      </div>
    </div>
  );
}
