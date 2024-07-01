import LoginPage from "./components/LoginPage";
import React from "react";
import SignUpPage from "./components/SignUpPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} /> {/* Login route */}
        <Route path="/signup" element={<SignUpPage />} /> {/* Signup route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
