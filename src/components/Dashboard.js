import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

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

  return (
    <div className="container">
      <div className="head">Hey {userName}, here is your joke</div>
      <div className="joke">{joke}</div>
      <button onClick={fetchJoke}>Get a joke</button>
    </div>
  );
}
