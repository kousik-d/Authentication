import React from "react";
import { useNavigate } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const PaymentSuccess = () => {
    const navigate = useNavigate();
  const handleRedirect = () => {
    navigate(ROUTES.LANDING);
  };

  return (
    <div style={styles.container}>
      <div style={styles.messageBox}>
        <div style={styles.iconContainer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            style={styles.icon}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
        <h1 style={styles.title}>Payment Successful!</h1>
        <p style={styles.subtitle}>
          Thank you for your payment. Your transaction has been completed.
          we will Update you shortly
        </p>
        <button onClick={handleRedirect} style={styles.button}>
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f9f9f9",
  },
  messageBox: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  iconContainer: {
    marginBottom: "15px",
  },
  icon: {
    width: "60px",
    height: "60px",
    color: "#28a745",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333333",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "16px",
    color: "#555555",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#ffffff",
    backgroundColor: "#28a745",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default PaymentSuccess;
