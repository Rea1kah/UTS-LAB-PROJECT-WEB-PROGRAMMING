// src/components/RoutineChecklist.jsx
import React from "react";
import "../styles/planner.css";

export default function RoutineChecklist({ items, checkedMap, onToggle }) {
  const total = items.length;
  const done = items.filter((it) => checkedMap[it.key]).length;
  const percent = Math.round((done / Math.max(total, 1)) * 100);

  return (
    <div className="routine-checklist">
      <div className="routine-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${percent}%` }} />
        </div>
        <div className="progress-text">{percent}% complete</div>
      </div>

      <ul className="checklist-list">
        {items.map((it) => (
          <li key={it.key} className="check-item">
            <label>
              <input
                type="checkbox"
                checked={!!checkedMap[it.key]}
                onChange={() => onToggle(it.key)}
              />
              <span className="item-emoji">{it.emoji}</span>
              <span className="item-title">{it.label}</span>
              <div className="item-desc">{it.hint}</div>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
