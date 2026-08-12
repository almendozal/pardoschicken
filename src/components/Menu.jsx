import React from "react";
import { ArrowLeft, Plus } from "lucide-react";
import "./Menu.css";

export default function Menu({ nav, category, products, addToCart }) {
  const items = products.filter((p) => p.category === category && p.active);

  return (
    <div className="menu-page">
      <button className="menu-back" onClick={() => nav("home")}>
        <ArrowLeft size={16} /> Volver
      </button>
      <h1 className="menu-title">{category}</h1>

      {items.length === 0 ? (
        <p className="menu-empty">Por ahora no hay productos disponibles en esta categoría.</p>
      ) : (
        <div className="menu-grid">
          {items.map((p) => (
            <div className="menu-card" key={p.id}>
              <div className="menu-card-img" style={{ backgroundImage: `url(${p.img})` }} />
              <div className="menu-card-body">
                <p className="menu-card-name">{p.name}</p>
                <p className="menu-card-price">S/ {p.price.toFixed(2)}</p>
                <button className="menu-card-add" onClick={() => addToCart(p)}>
                  <Plus size={14} /> Agregar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
