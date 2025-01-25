import React from 'react'
import {useCallback} from 'react';
import {loadStripe} from '@stripe/stripe-js';
import { useLocation } from "react-router-dom";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51QYGaeFP3CHwen7Fg52R67HAiHKxha7ET3qOu8hM97xCVyRLjyXZKUOCqa5KwJsDqxllqQTRXZZOrUYQdyuRJond00JHDJ9VWo');

const Payment = () => {
  const location = useLocation();
  const { plan } = location.state || {}; // Access the passed state

  const priceA = parseFloat(plan.price.replace(/[^0-9.-]+/g, ""));
  const requestBody = plan
    ? {
        amount: priceA * 100, // Example amount in cents
        currency:"usd", // Example currency
        name: plan.name, // Use the selected plan name
      }
    : null;

  const fetchClientSecret = useCallback(() => {
    if (!requestBody) {
      throw new Error("No plan selected");
    }

    return fetch("http://localhost:8080/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, [requestBody]);

  const options = { fetchClientSecret };

  if (!plan) {
    return <p>No plan selected. Please go back and select a plan.</p>;
  }

  return (
    <div>
      <div id="checkout">
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  );
};

export default Payment;


