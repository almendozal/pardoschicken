import React, { useState } from "react";
import { ArrowLeft, ChevronDown, Check } from "lucide-react";
import { PROMO_DETAIL as DEFAULT_PROMO_DETAIL } from "../data.js";
import "./PromoDetail.css";

function Field({ label, value, onChange, options, placeholder }) {
  return (
    <div className="pd-field">
      <p className="pd-field-label">{label}</p>
      <div className="pd-select-wrap">
        <select className="pd-select" value={value} onChange={(e) => onChange(e.target.value)}>
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <ChevronDown size={15} className="pd-select-chevron" />
      </div>
    </div>
  );
}

function RadioField({ label, value, onChange, options }) {
  return (
    <div className="pd-field">
      <p className="pd-field-label">{label}</p>
      <div className="pd-radio-group">
        {options.map((o) => (
          <label key={o} className="pd-radio-label">
            <span
              className={`pd-radio-dot ${value === o ? "selected" : ""}`}
              onClick={() => onChange(o)}
            >
              {value === o && <span className="pd-radio-dot-inner" />}
            </span>
            {o}
          </label>
        ))}
      </div>
    </div>
  );
}

export default function PromoDetail({ nav, addToCart, promoId = 1, promoDetail = DEFAULT_PROMO_DETAIL }) {
  const d = promoDetail[promoId] || promoDetail[1];
  const [porcion, setPorcion] = useState(d.porciones[0]);
  const [complemento, setComplemento] = useState(d.complementos[0]);
  const [guarnicion, setGuarnicion] = useState("");
  const [bebida, setBebida] = useState("");
  const [gaseosa, setGaseosa] = useState(d.gaseosas[0]);

  const ready = guarnicion && bebida;

  return (
    <div className="promo-detail-page">
      <button className="promo-detail-back" onClick={() => nav("promociones")}>
        <ArrowLeft size={16} /> Volver
      </button>

      <h1 className="promo-detail-title">{d.name}</h1>
      <p className="promo-detail-price">S/ {d.price.toFixed(2)}</p>

<div className="promo-detail-image-container">
  <img src={d.img} alt={d.name} className="promo-detail-img" />
</div>

      <p className="promo-detail-desc">{d.desc}</p>

      <Field label="Porción de Pollo" value={porcion} onChange={setPorcion} options={d.porciones} />
      <RadioField label="Complemento · Obligatorio" value={complemento} onChange={setComplemento} options={d.complementos} />
      <Field label="Escoge tu guarnición · Obligatorio" value={guarnicion} onChange={setGuarnicion} options={d.guarniciones} placeholder="Selecciona una opción" />
      <Field label="Bebida · Obligatorio" value={bebida} onChange={setBebida} options={d.bebidas} placeholder="Selecciona una opción" />

      <p className="pd-gaseosa-label">Elige tu gaseosa</p>
      <div className="pd-gaseosa-grid">
        {d.gaseosas.map((g) => (
          <button
            key={g}
            className={`pd-gaseosa-btn ${gaseosa === g ? "selected" : ""}`}
            onClick={() => setGaseosa(g)}
          >
            {gaseosa === g && <Check size={13} className="pd-gaseosa-check" />}
            <span className="pd-gaseosa-emoji">AD</span>
            <span className="pd-gaseosa-name">{g}</span>
          </button>
        ))}
      </div>

      <div className="pd-bar">
        <span className="pd-bar-price">S/ {d.price.toFixed(2)}</span>
        <button
          className="pd-bar-btn"
          disabled={!ready}
          onClick={() => { addToCart(d); nav("promociones"); }}
        >
          Agregar al pedido
        </button>
      </div>
      {!ready && <p className="pd-hint">Completa las opciones obligatorias para continuar.</p>}
    </div>
  );
}
