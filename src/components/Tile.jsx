import React from "react";
import "./Tile.css";

export default function Tile({ cat, onClick }) {
  const background = `url(${cat.img}) center/cover, linear-gradient(150deg, ${cat.grad[0]}, ${cat.grad[1]})`;

  return (
    <button className="tile" style={{ background }} onClick={onClick}>
      <span className="tile-emoji">{cat.emoji}</span>
      <span className="tile-label">{cat.name}</span>
    </button>
  );
}
