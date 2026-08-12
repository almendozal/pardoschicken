import React from "react";
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import "./Cart.css";

export default function Cart({ nav, cart, updateQty, removeItem, checkout, user }) {
  const total = cart.reduce((sum, it) => sum + it.price * it.qty, 0);

  return (
    <div className="cart-page">
      <button className="cart-back" onClick={() => nav("home")}>
        <ArrowLeft size={16} /> Seguir comprando
      </button>
      <h1 className="cart-title">Mi pedido</h1>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <ShoppingBag size={40} strokeWidth={1.2} />
          <p>Tu carrito está vacío.</p>
          <button className="cart-empty-btn" onClick={() => nav("promociones")}>Ver promociones</button>
        </div>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((it) => (
              <div className="cart-item" key={it.id}>
                <div className="cart-item-img" style={{ backgroundImage: `url(${it.img || ""})` }} />
                <div className="cart-item-info">
                  <p className="cart-item-name">{it.name}</p>
                  <p className="cart-item-price">S/ {it.price.toFixed(2)}</p>
                </div>
                <div className="cart-item-qty">
                  <button onClick={() => updateQty(it.id, it.qty - 1)}><Minus size={13} /></button>
                  <span>{it.qty}</span>
                  <button onClick={() => updateQty(it.id, it.qty + 1)}><Plus size={13} /></button>
                </div>
                <button className="cart-item-remove" onClick={() => removeItem(it.id)}>
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="cart-summary-row">
              <span>Total</span>
              <span>S/ {total.toFixed(2)}</span>
            </div>
            <button className="cart-checkout" onClick={checkout}>
              Confirmar pedido {!user && "(como invitado)"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
