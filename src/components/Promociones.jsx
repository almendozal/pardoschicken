import React from "react";
import { ArrowLeft } from "lucide-react";
import { PROMOS as DEFAULT_PROMOS, CATEGORIES as DEFAULT_CATEGORIES } from "../data.js";
import "./Promociones.css";

export default function Promociones({ nav, openPromo, promos = DEFAULT_PROMOS, categories = DEFAULT_CATEGORIES }) {
  return (
    <div className="promos-page">
      <button className="promos-back" onClick={() => nav("home")}>
        <ArrowLeft size={16} /> Volver
      </button>
      <h1 className="promos-title">Promociones</h1>
      <div className="promos-grid">
        {promos.map((p, i) => {
          const grad = categories[(i + 1) % categories.length].grad;
          const background = `url(${p.img}) center/cover, linear-gradient(140deg, ${grad[0]}, ${grad[1]})`;
          return (
            <button key={p.id} className="promo-card" onClick={() => openPromo(p.id)}>
              <div className="promo-card-img" style={{ background }}>
              
                {p.tag && <span className="promo-card-tag">{p.tag}</span>}
              </div>
              <div className="promo-card-body">
                <p className="promo-card-name">{p.name}</p>
                <p className="promo-card-price">S/ {p.price.toFixed(2)}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
