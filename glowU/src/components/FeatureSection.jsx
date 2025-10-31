import React, { useEffect } from "react";
import "../styles/feature.css";
import features from "../data/features";

export default function FeatureSection() {
  // Efek animasi muncul saat scroll
  useEffect(() => {
    const cards = document.querySelectorAll(".feature-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );
    cards.forEach((card) => observer.observe(card));
    return () => cards.forEach((card) => observer.unobserve(card));
  }, []);

  return (
    <section className="feature-section">
      <h2 className="feature-title">Why Glow With Us, Bestie?💞</h2>
      <div className="feature-grid">
        {features.map((f, i) => (
          <div key={i} className="feature-card">
            <img src={f.icon} alt={f.title} className="feature-img"/>
            <h3 className="feature-name">{f.title}</h3>
            <p className="feature-description">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
