import React from "react";
import "./Footer.css";

const COLS = [
  ["Nosotros", ["Historia", "Visión", "Valores", "Restaurantes"]],
  ["Servicios", ["Reservas", "Catering", "Fiestas Infantiles", "Vales y Giftcards"]],
  ["Información Adicional", ["Valores Nutricionales", "Cartilla de Alérgenos"]],
  ["Políticas y Términos", ["Política y Privacidad", "Términos y Condiciones"]],
];

export default function Footer({ settings }) {
  return (
    <footer className="footer">
      <div className="footer-grid">
        {COLS.map(([title, links]) => (
          <div key={title}>
            <p className="footer-col-title">{title}</p>
            {links.map((l) => (
              <p key={l} className="footer-link">{l}</p>
            ))}
          </div>
        ))}
        <div>
          <p className="footer-col-title">Contáctanos</p>
          <p className="footer-link">{settings?.phone || "958 232 771"}</p>
          <p className="footer-link">{settings?.contactEmail || "contacto@pardoschicken.com"}</p>
          <p className="footer-link">{settings?.address || ""}</p>
        </div>
      </div>
      <p className="footer-copy">© 2026 {settings?.restaurantName || "Pardos Chicken"}. Todos los derechos reservados.</p>
    </footer>
  );
}
