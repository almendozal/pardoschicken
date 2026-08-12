import React from "react";
import { ArrowLeft, MapPin, ExternalLink } from "lucide-react";
import "./Ubicaciones.css";

const ubicaciones = [
  {
    nombre: "Pardos Chicken Salaverry",
    direccion: "Jesús María",
    telefono: "(01) 2198000",
  },
  {
    nombre: "Pardos Chicken Centro Cívico",
    direccion: "Lima",
    telefono: "(01) 2198000",
  },
  {
    nombre: "Pardos Chicken Plaza San Martín",
    direccion: "Lima",
    telefono: "(01) 2198000",
  },
];

export default function Ubicaciones({ nav }) {
  return (
    <main className="ubicaciones-page">

      <button className="ubicaciones-back" onClick={() => nav("home")}>
        <ArrowLeft size={16} />
        Volver al inicio
      </button>

      <h1 className="ubicaciones-title">Ubicaciones</h1>

      <div className="ubicaciones-content">

        <div className="ubicaciones-list">

          {ubicaciones.map((local) => (
            <div className="ubicacion-item" key={local.nombre}>

              <h2>{local.nombre}</h2>

              <p>
                {local.direccion} · {local.telefono}
              </p>

            </div>
          ))}

        </div>

        <div className="ubicaciones-map">

          <iframe
            title="Mapa de ubicaciones Pardos Chicken"
            src="https://www.google.com/maps?q=Pardos%20Chicken%20Salaverry%20Lima&output=embed"
            loading="lazy"
          />

          <a
            className="map-button"
            href="https://www.google.com/maps/search/Pardos+Chicken+Lima"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MapPin size={14} />
            Abrir en Maps
            <ExternalLink size={13} />
          </a>

        </div>

      </div>

    </main>
  );
}