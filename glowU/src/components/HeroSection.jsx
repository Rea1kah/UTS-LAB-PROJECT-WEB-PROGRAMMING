import React, { useEffect, useRef, useState } from "react";
import "../styles/hero.css";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Aktifkan animasi saat section terlihat di layar
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false); // Biar bisa muncul lagi kalau discroll balik
          }
        });
      },
      { threshold: 0.8 } 
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`hero-section scroll-animate ${isVisible ? "visible" : ""}`}
    >
      <div className="hero-text">
        <h1>Find Your Perfect GLOW 🌸</h1>
        <p>
          Welcome to <strong>GLOW•U</strong> — your personal skincare buddy. 
          Let's discover what your skin really needs so you can glow confidently, 
          every single day 💕
        </p>
        <button
            className="hero-btn"
            onClick={() => navigate("/skin-type")}
        >
          Start Now!
        </button>
      </div>
    </section>
  );
}
