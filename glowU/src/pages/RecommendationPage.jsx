import { useLocation, Link } from "react-router-dom";
import "../styles/recommendation.css";
import skincareSets from "../data/skincareSets";


export default function Recommendations() {
  const location = useLocation();
  const storedSkinType = localStorage.getItem("skinType");
  const { skinType } = location.state || { skinType: storedSkinType || "Normal" };

  const skinToCategory = {
    Normal: "bright",
    Kering: "barrier",
    Berminyak: "acne",
    Kombinasi: "glowing",
    Sensitif: "barrier",
    Jerawat: "acne",
  };

  const category = skinToCategory[skinType];
  const data = skincareSets[category];

  return (
    
    <section className="rec-page">
      <h2 className="rec-title">✨ Rekomendasi untuk Kulit {skinType} ✨</h2>
      <p className="rec-sub">
        Kamu cocok dengan kategori skincare <strong>{data.title}</strong> 💖
      </p>

      <Link to="/skin-type" className="rec-back">
        Pilih jenis kulit lagi
      </Link>


      <div className="rec-grid">
        {data.brands.map((brand, i) => (
          <div key={i} className="rec-card">
            <img className="rec-img" src={brand.img} alt={brand.name} />
            <h3 className="rec-brand">{brand.name}</h3>
            <button className="rec-btn">
              <a href={brand.link} target="_blank" rel="noreferrer" style={{ color: "white", textDecoration: "none" }}>
                Lihat di Shopee &gt;
              </a>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
