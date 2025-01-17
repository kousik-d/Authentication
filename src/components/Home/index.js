import React, { useState } from "react";
import { withAuthorization } from "../Session";
import "./PlanSelection.css";

const plans = [
  {
    id: "1",
    name: "Mobile",
    price: "₹149",
    quality: "Fair",
    resolution: "480p",
    devices: "Mobile phone, tablet",
    watchLimit: 1,
    downloadDevices: 1,
  },
  {
    id: "2",
    name: "Basic",
    price: "₹199",
    quality: "Good",
    resolution: "720p",
    devices: "TV, computer, mobile phone, tablet",
    watchLimit: 1,
    downloadDevices: 1,
  },
  {
    id: "3",
    name: "Standard",
    price: "₹499",
    quality: "Great",
    resolution: "1080p (Full HD)",
    devices: "TV, computer, mobile phone, tablet",
    watchLimit: 2,
    downloadDevices: 2,
  },
  {
    id: "4",
    name: "Premium",
    price: "₹649",
    quality: "Best",
    resolution: "4K (Ultra HD) + HDR",
    specialFeature: "Spatial audio (immersive sound)",
    devices: "TV, computer, mobile phone, tablet",
    watchLimit: 4,
    downloadDevices: 6,
  },
];

const Home = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanSelection = (id) => {
    setSelectedPlan(id);
  };

  const handleNext = () => {
    alert(`Selected Plan: ${selectedPlan}`);
  };

  return (
    <div className="plan-selection">
      <center>
        <h1>Welcome</h1>
        <p>Select a plan to continue</p>
      </center>
      <div className="plan-container">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`plan-card ${selectedPlan === plan.id ? "selected" : ""}`}
            onClick={() => handlePlanSelection(plan.id)}
          >
            <h2>{plan.name}</h2>
            <p className="price">{plan.price}</p>
            <p>Video and sound quality: {plan.quality}</p>
            <p>Resolution: {plan.resolution}</p>
            <p>Supported devices: {plan.devices}</p>
            <p>Devices your household can watch at the same time: {plan.watchLimit}</p>
            <p>Download devices: {plan.downloadDevices}</p>
            {plan.specialFeature && <p>Special Feature: {plan.specialFeature}</p>}
          </div>
        ))}
      </div>
      <button
        className="next-button"
        onClick={handleNext}
        disabled={!selectedPlan}
      >
        Next
      </button>
    </div>
  );
};

const condition = (authUser) => authUser != null;
export default withAuthorization(condition)(Home);
