import React, { useState } from "react";
import skinTypes from "../data/skinTypes";
import "../styles/skinType.css";
import { useNavigate } from "react-router-dom";

export default function SkinTypePage() 
{
    const [selected, setSelected] = useState(null);
    const navigate = useNavigate();

    const handleSelect = (type) => {
        setSelected(type);
        localStorage.setItem("skinType", type);
        setTimeout(() => navigate("/recommendations"), 600);
    };

    return (
        <section className="skin-page">
            <h2 className="skin-title">Bestie, kulit kamu tipe apa nih? </h2>
            <p className="skin-sub">Biar Glow•U bisa bantu kamu glow-up tanpa salah produk</p>

            <div className="skin-grid">
                {skinTypes.map((s) => (
                    <div
                        key={s.id}
                        className={`skin-card ${selected === s.type ? "selected" : ""}`}
                        onClick={() => handleSelect(s.type)}
                    >
                        <img src={s.image} alt={s.type} className="skin-image" />
                        <h3 className="skin-name">{s.type}</h3>
                        <p className="skin-desc">{s.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}