import { useEffect, useState, } from "react";
import "../styles/testimonials.css";
import testimonials from "../data/testimonials";

export default function Testimonials() {
  const [liked, setLiked] = useState({});

  useEffect(() => {
    const cards = document.querySelectorAll(".test-card");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.25 }
    );

    cards.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  const handleLike = (id) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));

    const heart = document.getElementById(`heart-${id}`);
    if (heart) {
      heart.classList.remove("pop");
      void heart.offsetWidth; // Trigger reflow
      heart.classList.add("pop");
    }
  }

  return (
    <section className="testimonials-section scroll-animate" id="testimonials">
      <h2 className="test-title">Voices From Glow Girls 🎀</h2>
      <p className="test-sub">
        Pendapat jujur dari para bestie <strong>Glow.U</strong> yang sudah merasakan skincare journey lebih terarah & percaya diri
      </p>

      <div className="test-grid">
        {Array.isArray(testimonials) && testimonials.length > 0 ? (
          testimonials.map((t, i) => (
            <article
              key={t.id ?? `testimonial-${i}`}
              className="test-card"
            >
              <div className="test-top">
                <img
                  className="test-avatar"
                  src={t.avatar}
                  alt={t.name}
                />
                <div className="test-who">
                  <div className="test-name">{t.name}</div>
                  <div className="test-role">{t.role}</div>
                </div>
              </div>

              <p className="test-text">“{t.text}”</p>

              <div className="test-footer">
                <button className={`like-btn ${liked[t.id] ? "active" : ""}`} onClick={() => handleLike(t.id)}>
                  <span id={`heart-${t.id}`} className="heart-icon">
                    {liked[t.id] ? "❤️" : "🤍"}
                  </span>
                </button>
              </div>
            </article>
          ))
        ) : (
          <p>Tidak ada testimonial untuk ditampilkan.</p>
        )}
      </div>
    </section>
  );
}
