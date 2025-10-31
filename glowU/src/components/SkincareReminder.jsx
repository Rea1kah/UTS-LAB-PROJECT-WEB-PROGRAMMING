import React from "react";
import "../styles/reminder.css";

export default function SkincareReminder({ message, onClose }) {
  return (
    <div className="reminder-overlay">
      <div className="reminder-box">
        <h3>✨ Glow Reminder! ✨</h3>
        <p>{message}</p>

        <button className="close-reminder" onClick={onClose}>
          Oke 💕
        </button>
      </div>
    </div>
  );
}
