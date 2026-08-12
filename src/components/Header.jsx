import React, { useState } from "react";
import { Search, ShoppingCart, User, ChevronDown, MapPin } from "lucide-react";
import { CATEGORIES as DEFAULT_CATEGORIES } from "../data.js";
import Dropdown from "./Dropdown.jsx";
import "./Header.css";
import pardoschicken from '../img/pardoschicken.jpg'

export default function Header({
  nav,
  user,
  openDelivery,
  openCats,
  openUbic,
  catOpen,
  ubicOpen,
  closeAll,
  deliveryLoc,
  categories = DEFAULT_CATEGORIES,
  cartCount = 0,
  openCart,
  onSelectCategory,
}) 
{
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const runSearch = () => {
    const q = query.trim().toLowerCase();
    if (!q) return;
    const matchedCategory = categories.find((c) => c.name.toLowerCase().includes(q));
    if (matchedCategory) {
      onSelectCategory?.(matchedCategory.name);
    } else {
      nav("promociones");
    }
    setSearchOpen(false);
    setQuery("");
  };

  return (
    <header className="header">
      <div className="header-inner">
        <button
          className="header-logo"
          onClick={() => { closeAll(); nav("home"); }}
          title="Inicio"
        >
          <img
            src={pardoschicken}
            alt="Logo"
            onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.nextSibling.style.display = "block"; }}
          />
          <span style={{ display: "none" }}>PC</span>
        </button>

        <button className="header-delivery" onClick={openDelivery}>
          <MapPin size={15} /> Entrega a {deliveryLoc} <ChevronDown size={13} />
        </button>

        <button className="header-link" onClick={() => { closeAll(); nav("promociones"); }}>
          Promociones
        </button>

        <Dropdown
          label="Categorías"
          items={categories.map((c) => c.name)}
          open={catOpen}
          onToggle={openCats}
          onSelect={(item) => { closeAll(); onSelectCategory ? onSelectCategory(item) : nav("home"); }}
        />

<button
  className="header-link"
  onClick={() => {
    closeAll();
    nav("ubicaciones");
  }}
>
  Ubicaciones
</button>

        <div className="header-spacer" />

        <div className="header-search-wrap" onClick={(e) => e.stopPropagation()}>
          {searchOpen ? (
            <div className="header-search open">
              <Search size={15} />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && runSearch()}
                onBlur={() => !query && setSearchOpen(false)}
                placeholder="¿Qué se te antoja?"
              />
            </div>
          ) : (
            <button className="header-search" onClick={() => setSearchOpen(true)}>
              <Search size={15} /> ¿Qué se te antoja?
            </button>
          )}
        </div>

        <button className="header-cart" onClick={() => { closeAll(); openCart ? openCart() : nav("cart"); }}>
          <ShoppingCart size={17} /> Mi pedido
          {cartCount > 0 && <span className="header-cart-badge">{cartCount}</span>}
        </button>

        {user ? (
          <button className="header-avatar" onClick={() => { closeAll(); nav("account"); }}>
            {user.name[0]}
          </button>
        ) : (
          <button className="header-login" onClick={() => { closeAll(); nav("login"); }}>
            <User size={15} /> Ingresar
          </button>
        )}
      </div>
    </header>
  );
}
