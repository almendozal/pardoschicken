import React from "react";
import { ChevronDown } from "lucide-react";
import "./Dropdown.css";

export default function Dropdown({ label, items, open, onToggle, onSelect, align = "left" }) {
  return (
    <div className="dropdown-wrap">
      <button className="dropdown-toggle" onClick={onToggle}>
        {label}
        <ChevronDown size={14} className={`dropdown-chevron ${open ? "open" : ""}`} />
      </button>
      {open && (
        <div className={`dropdown-menu align-${align}`}>
          {items.map((it) => (
            <button key={it} className="dropdown-item" onClick={() => onSelect(it)}>
              {it}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
