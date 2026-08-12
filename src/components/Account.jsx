import React from "react";
import { History, Heart, User, ShoppingCart, LogOut, ShieldCheck } from "lucide-react";
import "./Account.css";

export default function Account({ user, onLogout, nav }) {
  const items = [
    { icon: History, label: "Historial de pedidos", sub: "Revisa todos los pedidos que has hecho" },
    { icon: Heart, label: "Historial de pedidos", sub: "Revisa todos los pedidos que has hecho" },
    { icon: User, label: "Historial de pedidos", sub: "Puntos de todos los pedidos que has hecho" },
    { icon: ShoppingCart, label: "Historial de pedidos", sub: "Revisa todos los pedidos que has hecho" },
  ];
  return (
    <div className="account-page">
      <div className="account-inner">
        <div className="account-avatar">

          <img
            src="/src/assets/images/avatar.jpg"
            alt=""
            onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.nextSibling.style.display = "inline"; }}
          />
          <span style={{ display: "none" }}>{user.name[0]}</span>
        </div>
        <h1 className="account-name">{user.name}</h1>
        <p className="account-email">{user.email}</p>
        {user.isAdmin && <span className="account-admin-badge"><ShieldCheck size={13} /> Administrador</span>}

        <div className="account-grid">
          {items.map((it, i) => (
            <div key={i} className="account-item">
              <it.icon size={26} className="account-item-icon" />
              <p className="account-item-label">{it.label}</p>
              <p className="account-item-sub">{it.sub}</p>
            </div>
          ))}
        </div>

        {user.isAdmin && (
          <button className="account-admin-btn" onClick={() => nav("admin")}>
            <ShieldCheck size={15} /> Ir al panel de administrador
          </button>
        )}

        <button className="account-logout" onClick={() => { onLogout(); nav("home"); }}>
          <LogOut size={14} /> Cerrar sesión
        </button>
      </div>
    </div>
  );
}
