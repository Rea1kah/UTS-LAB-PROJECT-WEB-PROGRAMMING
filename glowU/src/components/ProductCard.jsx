// src/components/ProductCard.jsx
import React from "react";
import "../styles/recommendation.css";

export default function ProductCard({ product }) {
  return (
    <div className="prod-card">
      <img src={product.image} alt={product.name} className="prod-img" />
      <div className="prod-body">
        <div className="prod-name">{product.name}</div>
        <div className="prod-desc">{product.desc}</div>
      </div>
    </div>
  );
}
