import "../styles/planner.css";

export default function RoutineToggle({ mode, onChange }) {
  return (
    <div className="routine-toggle" role="tablist" aria-label="Mode">
      <button
        className={`toggle-btn ${mode === "morning" ? "active" : ""}`}
        onClick={() => onChange("morning")}
        aria-pressed={mode === "morning"}
      >
        ☀️ Morning
      </button>
      <button
        className={`toggle-btn ${mode === "night" ? "active" : ""}`}
        onClick={() => onChange("night")}
        aria-pressed={mode === "night"}
      >
        🌙 Night
      </button>
    </div>
  );
}
