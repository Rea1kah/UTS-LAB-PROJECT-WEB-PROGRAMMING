import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SkinTypePage from "./pages/SkinTypePage";
import RecommendationsPage from "./pages/RecommendationPage";
import SkincarePlanner from "./pages/SkincarePlanner";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./styles/global.css";

export default function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/skin-type" element={<SkinTypePage />} />
        <Route path="/recommendations" element={<RecommendationsPage />} />
        <Route path="/planner" element={<SkincarePlanner />} />
      </Routes>

      <Footer />
    </Router>
  );
}
