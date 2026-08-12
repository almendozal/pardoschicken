import React, { useState } from "react";
import { X, Navigation, Search } from "lucide-react";
import "./DeliveryModal.css";

export default function DeliveryModal({ close, setLoc }) {
  const [mode, setMode] = useState("Delivery");
  const [addr, setAddr] = useState("");
  return (
    <div className="delivery-overlay" onClick={close}>
      <div className="delivery-card" onClick={(e) => e.stopPropagation()}>
        <div className="delivery-header">
          <p className="delivery-title">Elige método de entrega</p>
          <button className="delivery-close" onClick={close}>
            <X size={14} />
          </button>
        </div>

        <div className="delivery-modes">
          {["Delivery", "Recojo en restaurante"].map((m) => (
            <button
              key={m}
              className={`delivery-mode-btn ${mode === m ? "active" : ""}`}
              onClick={() => setMode(m)}
            >
              {m}
            </button>
          ))}
        </div>

        <button className="delivery-locate" onClick={() => setAddr("Mi ubicación actual")}>
          <Navigation size={14} /> Usa tu ubicación actual
        </button>

        <div className="delivery-addr-wrap">
          <input
            className="delivery-addr-input"
            value={addr}
            onChange={(e) => setAddr(e.target.value)}
            placeholder="Ingresa tu dirección"
          />
          <Search size={15} className="delivery-addr-icon" />
        </div>

        <button className="delivery-confirm" onClick={() => { setLoc(addr || "Lima"); close(); }}>
          Confirmar dirección
        </button>
      </div>
    </div>
  );
}
