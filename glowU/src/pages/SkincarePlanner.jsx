// src/pages/SkincarePlanner.jsx
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import RoutineToggle from "../components/RoutineToggle";
import RoutineChecklist from "../components/RoutineChecklist";
import SkincareReminder from "../components/SkincareReminder";
import skinTypes from "../data/skinTypes";
import "../styles/planner.css";

const presets = {
  morning: [
    { key: "cleanser", label: "Cleanser 🫧", hint: "Bersihkan kotoran & minyak" },
    { key: "toner", label: "Toner 🍃", hint: "Seimbangkan pH kulit" },
    { key: "serum", label: "Serum ✨", hint: "Vit C / Niacinamide" },
    { key: "moisturizer", label: "Moisturizer 💧", hint: "Kunci kelembapan" },
    { key: "sunscreen", label: "Sunscreen ☀️", hint: "SPF minimal 30" },
  ],
  night: [
    { key: "cleanser", label: "Cleanser 🫧", hint: "Double-cleanse jika pakai makeup" },
    { key: "treatment", label: "Treatment ✨", hint: "Retinol / AHA seminggu 2–3x" },
    { key: "moisturizer", label: "Moisturizer 💧", hint: "Lebih rich di malam hari" },
    { key: "eye", label: "Eye Care 👀", hint: "Perawatan area mata" },
    { key: "mask", label: "Mask 🧖‍♀️", hint: "1–2x per minggu" },
  ],
};

export default function SkincarePlanner() {
  const navigate = useNavigate();

  const savedSkin = localStorage.getItem("skinType") || null;
  const [skinType, setSkinType] = useState(savedSkin);
  const [mode, setMode] = useState("morning");
  const items = useMemo(() => presets[mode], [mode]);

  const [checkedMap, setCheckedMap] = useState(
    () => JSON.parse(localStorage.getItem("routineState")) || {}
  );

  const [showReminder, setShowReminder] = useState(false);
  const [reminderMsg, setReminderMsg] = useState("");

  // ⏰ TIME reminder stored in localStorage
  const [reminderTime, setReminderTime] = useState(
    localStorage.getItem("reminderTime") || ""
  );

  // Save skin type
  useEffect(() => {
    if (skinType) localStorage.setItem("skinType", skinType);
  }, [skinType]);

  // Save checklist to localStorage
  useEffect(() => {
    localStorage.setItem("routineState", JSON.stringify(checkedMap));
  }, [checkedMap]);

  // Request browser notification permission once
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // Auto reminder scheduler
  useEffect(() => {
    if (!reminderTime) return;
    
    const timer = setInterval(() => {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5);

      if (currentTime === reminderTime) {
        triggerReminder();
      }
    }, 30000); // cek setiap 30 detik

    return () => clearInterval(timer);
  }, [reminderTime, triggerReminder]);

  const triggerReminder = useCallback(() => {
  const message =
    mode === "morning"
      ? "Saatnya skincare pagi! ☀️ Glow up mulai dari pagi 💕"
      : "Saatnya skincare malam 🌙 biar kulit glowing pas bangun!";

  setReminderMsg(message);
  setShowReminder(true);

  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("✨ Glow.U Reminder ✨", { body: message });
  }
}, [mode]);

  function handleToggle(key) {
    setCheckedMap((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function handleReset() {
    if (window.confirm("Reset checklist ini?")) {
      setCheckedMap({});
      localStorage.removeItem("routineState");
    }
  }

  // If no skin type chosen
  if (!skinType)
    return (
      <section className="planner-empty">
        <div className="planner-card">
          <h2>Halo, Glow Girl! 🌸</h2>
          <p>Pilih dulu jenis kulit kamu ya ✨</p>
          <button onClick={() => navigate("/skin-type")} className="choose-btn">
            Pilih Jenis Kulit 💖
          </button>
        </div>
      </section>
    );

  const skinInfo = skinTypes.find((s) => s.type === skinType);

  return (
    <section className="planner-page">
      <div className="planner-top">
        <div>
          <h1>My Glow Routine ✨</h1>
          <div className="skin-badge">
            ✨ {skinInfo?.type} — {skinInfo?.desc}
          </div>
        </div>
        <div className="tips">
          Tip: {skinType === "Sensitif" ? "Gunakan produk fragrance-free" : "Jangan lupa sunscreen!"}
        </div>
      </div>

      {/* Change Skin Type */}
      <button
        className="change-skin-btn"
        onClick={() => {
          setSkinType(null);
          localStorage.removeItem("skinType");
          navigate("/skin-type");
        }}
      >
        🔄 Ganti Jenis Kulit
      </button>

      <div className="planner-grid">
        <div className="planner-left">
          <RoutineToggle mode={mode} onChange={setMode} />
          <RoutineChecklist items={items} checkedMap={checkedMap} onToggle={handleToggle} />

          {/* Reminder Time Picker */}
          <div className="reminder-set">
            <label>🕒 Set waktu reminder:</label>
            <input
              type="time"
              value={reminderTime}
              onChange={(e) => {
                setReminderTime(e.target.value);
                localStorage.setItem("reminderTime", e.target.value);
              }}
            />

            {reminderTime && (
              <button
                className="reset-reminder"
                onClick={() => {
                  setReminderTime("");
                  localStorage.removeItem("reminderTime");
                }}
              >
                ❌ Hapus Reminder
              </button>
            )}
          </div>
        </div>

        {/* Summary Card */}
        <aside className="planner-right">
          <div className="card">
            <h3>Rangkuman</h3>
            <p><strong>Mode:</strong> {mode === "morning" ? "Pagi ☀️" : "Malam 🌙"}</p>
            <p><strong>Jenis Kulit:</strong> {skinInfo?.type}</p>
            <p><strong>Jumlah langkah:</strong> {items.length}</p>

            <div className="card-actions">
              <button className="next-btn" onClick={triggerReminder}>🔔 Reminder</button>
              <button className="next-btn" onClick={() => alert("Rutinitas tersimpan! 💾")}>💾 Save</button>
              <button className="reset-btn" onClick={handleReset}>🔄 Reset</button>
              <button className="back-home" onClick={() => navigate("/")}>🏠 Home</button>
            </div>
          </div>
        </aside>
      </div>

      {showReminder && (
        <SkincareReminder message={reminderMsg} onClose={() => setShowReminder(false)} />
      )}
    </section>
  );
}
