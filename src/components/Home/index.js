import React, { useState } from "react";
import "./PlanSelection.css";

const houses = [
  {
    id: "1",
    name: "Sunny Villa",
    price: "$350,000",
    location: "Los Angeles, CA",
    size: "2,500 sq.ft.",
    bedrooms: 4,
    bathrooms: 3,
    specialFeature: "Private garden and pool",
  },
  {
    id: "2",
    name: "Ocean View Apartment",
    price: "$1,200,000",
    location: "Miami, FL",
    size: "1,800 sq.ft.",
    bedrooms: 3,
    bathrooms: 2,
    specialFeature: "Sea-facing balcony",
  },
  {
    id: "3",
    name: "Hilltop Cottage",
    price: "$500,000",
    location: "Denver, CO",
    size: "2,000 sq.ft.",
    bedrooms: 3,
    bathrooms: 2,
    specialFeature: "Panoramic mountain views",
  },
  {
    id: "4",
    name: "Urban Studio",
    price: "$250,000",
    location: "New York City, NY",
    size: "800 sq.ft.",
    bedrooms: 1,
    bathrooms: 1,
    specialFeature: "Modern interiors with skyline view",
  },
  {
    id: "5",
    name: "Lakeside Retreat",
    price: "$750,000",
    location: "Chicago, IL",
    size: "2,200 sq.ft.",
    bedrooms: 4,
    bathrooms: 3,
    specialFeature: "Lakefront property with private dock",
  },
  {
    id: "6",
    name: "Mountain Chalet",
    price: "$950,000",
    location: "Aspen, CO",
    size: "3,000 sq.ft.",
    bedrooms: 5,
    bathrooms: 4,
    specialFeature: "Cozy fireplace and ski-in access",
  },
  {
    id: "7",
    name: "City Penthouse",
    price: "$2,500,000",
    location: "San Francisco, CA",
    size: "3,500 sq.ft.",
    bedrooms: 4,
    bathrooms: 3,
    specialFeature: "360-degree city views with rooftop garden",
  },
  {
    id: "8",
    name: "Countryside Manor",
    price: "$1,000,000",
    location: "Napa Valley, CA",
    size: "4,500 sq.ft.",
    bedrooms: 5,
    bathrooms: 5,
    specialFeature: "Vineyard views and wine cellar",
  },
  {
    id: "9",
    name: "Beachfront Bungalow",
    price: "$650,000",
    location: "Honolulu, HI",
    size: "1,500 sq.ft.",
    bedrooms: 3,
    bathrooms: 2,
    specialFeature: "Steps away from the beach",
  },
  {
    id: "10",
    name: "Suburban Family Home",
    price: "$400,000",
    location: "Dallas, TX",
    size: "2,100 sq.ft.",
    bedrooms: 4,
    bathrooms: 3,
    specialFeature: "Large backyard and community park",
  }
];

// Sorting the houses array by price (low to high)
const sortedHouses = houses.sort((a, b) => {
  const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g, ""));
  const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g, ""));
  return priceA - priceB;
});

const PlanSelection = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };

  const handleNextClick = () => {
    alert(`You selected the plan with ID: ${selectedPlan}`);
    // Navigate to the next page or perform another action here
  };

  return (
    <div className="plan-selection">
      <h1 className="title">Welcome</h1>
      <p>Select Desired property</p>
      <div className="plan-container">
        {sortedHouses.map((plan) => (
          <div
            key={plan.id}
            className={`plan-card ${selectedPlan === plan.id ? "selected" : ""}`}
            onClick={() => handlePlanSelect(plan.id)}
          >
            <h2>{plan.name}</h2>
            <p className="price">{plan.price}</p>
            <p><strong>Location: </strong>{plan.location}</p>
            <p><strong>Size: </strong> {plan.size}</p>
            <p><strong>Bedrooms: </strong> {plan.bedrooms}</p>
            <p><strong>Bathrooms: </strong> {plan.bathrooms}</p>
            {plan.specialFeature && <p><strong>Special Feature: </strong>{plan.specialFeature}</p>}
          </div>
        ))}
      </div>
      <button
        className={`next-button ${selectedPlan ? "active" : "disabled"}`}
        onClick={handleNextClick}
        disabled={!selectedPlan}
      >
        Next
      </button>
    </div>
  );
};

export default PlanSelection;
