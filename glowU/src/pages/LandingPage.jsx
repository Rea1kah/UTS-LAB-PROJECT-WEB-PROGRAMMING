import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeatureSection from "../components/FeatureSection";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import "../styles/landing.css";

export default function LandingPage() {
  return (
    <div className="landing-page">

      {/* Hero / CTA to Skin Type */}
      <HeroSection />

      {/* Features */}
      <FeatureSection />

      {/* Testimonials */}
      <Testimonials />

    </div>
  );
}
