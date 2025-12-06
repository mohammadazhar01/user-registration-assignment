import React from "react";
import { useNavigate } from "react-router-dom";
import landingVector from "../assets/admin-panel-vector.webp";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-left">
        <img src={landingVector} alt="vector art" className="landing-img" />
      </div>

      <div className="landing-right">
        <h1>Welcome to Our World of Automation</h1>
        <p>Your one-stop place for seamless experience.</p>

        <button className="lp-btn signup-btn" onClick={() => navigate("/signup")}> Sign Up </button>

        <button className="lp-btn login-btn" onClick={() => navigate("/login")}> Login </button>
      </div>
    </div>
  );
};

export default LandingPage;
