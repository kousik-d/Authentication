import React from 'react'
import { useNavigate } from "react-router-dom";
import * as ROUTES from '../../constants/routes';
import "./Landing.css";

const Landing = () => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Welcome to Housing</h1>
        <p className="subtitle">
          Choose a plan that suits you and start your journey with us.
        </p>
      </div>
      <div className="buttons">
        <button className="primary-button" onClick={handleOnClick}>
          Select a Plan
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
    background: "linear-gradient(to right, #4facfe, #00f2fe)",
    color: "#ffffff",
  },
  header: {
    marginBottom: "30px",
  },
  title: {
    fontSize: "48px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "20px",
    color: "#e0e0e0",
  },
  buttons: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
  },
  primaryButton: {
    padding: "15px 30px",
    fontSize: "18px",
    backgroundColor: "#ffffff",
    color: "#4facfe",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  secondaryButton: {
    padding: "15px 30px",
    fontSize: "18px",
    backgroundColor: "transparent",
    color: "#ffffff",
    border: "2px solid #ffffff",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
};

export default Landing
