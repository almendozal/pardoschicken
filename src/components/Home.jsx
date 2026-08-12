import React from "react";
import { CATEGORIES as DEFAULT_CATEGORIES } from "../data.js";
import Tile from "./Tile.jsx";
import "./Home.css"; 
import hamburguesa from '../img/hamburguesa.jpg'
export default function Home({ nav, categories = DEFAULT_CATEGORIES, onSelectCategory }) {
  return (
    <>
      <div className="home-hero-wrap">
        <div className="home-hero">
          
          <img
            className="home-hero-img"
            src={hamburguesa}
            alt="Promoción destacada"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />

          <div className="home-hero-content">
            <p className="home-hero-eyebrow">Edición a la brasa</p>
            <h1 className="home-hero-title">Sánguche Brioche Brasa</h1>
            <button className="home-hero-cta" onClick={() => nav("promociones")}>
              Pide aquí →
            </button>
          </div>
        </div>
      </div>

      <div className="home-carta-wrap">
        <h2 className="home-carta-title">Explora la carta</h2>
        <div className="home-carta-grid">
          {categories.map((c) => (
            <Tile key={c.name} cat={c} onClick={() => (onSelectCategory ? onSelectCategory(c.name) : nav("home"))} />
          ))}
        </div>
      </div>
    </>
  );
}
