import React, { useState, useRef } from "react";
import "./App.css";

import Ubicaciones from "./components/ubicaciones.jsx";
import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import Menu from "./components/Menu.jsx";
import Promociones from "./components/Promociones.jsx";
import PromoDetail from "./components/PromoDetail.jsx";
import Cart from "./components/Cart.jsx";
import Login from "./components/Login.jsx";
import Account from "./components/Account.jsx";
import Admin from "./components/Admin.jsx";
import DeliveryModal from "./components/DeliveryModal.jsx";
import Footer from "./components/Footer.jsx";
import {
  CATEGORIES,
  PROMOS,
  PROMO_DETAIL,
  PRODUCTS,
  CLIENTES,
  ORDERS,
  SETTINGS,
} from "./data.js";

let orderCounter = ORDERS.length + 126;

export default function App() {
  const [view, setView] = useState("home");
  
  const [user, setUser] = useState(null);
  const [deliveryOpen, setDeliveryOpen] = useState(false);
  const [deliveryLoc, setDeliveryLoc] = useState("Lima");
  const [catOpen, setCatOpen] = useState(false);
  const [ubicOpen, setUbicOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const rootRef = useRef(null);

  const [cart, setCart] = useState([]);

  const [categories, setCategories] = useState(CATEGORIES);
  const [promos, setPromos] = useState(PROMOS);
  const [promoDetail, setPromoDetail] = useState(PROMO_DETAIL);
  const [products, setProducts] = useState(PRODUCTS);
  const [clients, setClients] = useState(CLIENTES);
  const [orders, setOrders] = useState(ORDERS);
  const [settings, setSettings] = useState(SETTINGS);
  const [activePromoId, setActivePromoId] = useState(1);

  const nav = (v) => {
    setView(v);
    rootRef.current?.scrollTo?.(0, 0);
    window.scrollTo?.(0, 0);
  };
  const closeAll = () => {
    setCatOpen(false);
    setUbicOpen(false);
  };

  const goToCategory = (name) => {
    if (name === "Promociones") { nav("promociones"); return; }
    setActiveCategory(name);
    nav("menu");
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((it) => it.id === item.id);
      if (existing) {
        return prev.map((it) => (it.id === item.id ? { ...it, qty: it.qty + 1 } : it));
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, img: item.img, qty: 1 }];
    });
  };
  const updateQty = (id, qty) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((it) => it.id !== id));
      return;
    }
    setCart((prev) => prev.map((it) => (it.id === id ? { ...it, qty } : it)));
  };
  const removeFromCart = (id) => setCart((prev) => prev.filter((it) => it.id !== id));

  const checkout = () => {
    if (cart.length === 0) return;
    const total = cart.reduce((s, it) => s + it.price * it.qty, 0);
    const now = new Date();
    const fecha = now.toLocaleDateString("es-PE", { day: "2-digit", month: "2-digit", year: "2-digit" }) +
      " " + now.toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" });
    const newOrder = {
      id: `#${String(orderCounter++)}`,
      cliente: user?.name || "Invitado",
      fecha,
      productos: cart.reduce((s, it) => s + it.qty, 0),
      total,
      estado: "Pendiente",
    };
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    nav(user ? "account" : "home");
  };

  const cartCount = cart.reduce((s, it) => s + it.qty, 0);

  return (
    <div className="app-root" ref={rootRef} onClick={() => closeAll()}>
      {view !== "admin" && (
        <div onClick={(e) => e.stopPropagation()}>
          <Header
            nav={nav}
            user={user}
            openDelivery={() => setDeliveryOpen(true)}
            openCats={() => { setUbicOpen(false); setCatOpen((v) => !v); }}
            openUbic={(k) => { setCatOpen(false); setUbicOpen((v) => (v === k ? false : k)); }}
            catOpen={catOpen}
            ubicOpen={ubicOpen}
            closeAll={closeAll}
            deliveryLoc={deliveryLoc}
            categories={categories}
            cartCount={cartCount}
            openCart={() => nav("cart")}
            onSelectCategory={goToCategory}
          />
        </div>
      )}

      {view === "home" && (
        <Home nav={nav} categories={categories} onSelectCategory={goToCategory} />
      )}

      {view === "menu" && (
        <Menu nav={nav} category={activeCategory} products={products} addToCart={addToCart} />
      )}

      {view === "promociones" && (
        <Promociones
          nav={nav}
          categories={categories}
          promos={promos}
          openPromo={(id) => { setActivePromoId(id); nav("promoDetail"); }}
        />
      )}
      {view === "ubicaciones" && (
  <Ubicaciones nav={nav} />
)}
      {view === "promoDetail" && (
        <PromoDetail
          nav={nav}
          promoId={activePromoId}
          promoDetail={promoDetail}
          addToCart={(item) =>
            addToCart({ id: `promo-${activePromoId}`, name: item.name, price: item.price, img: item.img })
          }
        />
      )}

      {view === "cart" && (
        <Cart
          nav={nav}
          cart={cart}
          updateQty={updateQty}
          removeItem={removeFromCart}
          checkout={checkout}
          user={user}
        />
      )}

      {view === "login" && (
        <Login
          nav={nav}
          onLogin={(loggedUser) => {
            setUser(loggedUser);

            nav(loggedUser.isAdmin ? "admin" : "home");
          }}
        />
      )}
      {view === "account" && user && (
        <Account user={user} onLogout={() => setUser(null)} nav={nav} />
      )}
      {view === "admin" && user?.isAdmin && (
        <Admin
          user={user}
          nav={nav}
          onLogout={() => setUser(null)}
          categories={categories}
          setCategories={setCategories}
          promos={promos}
          setPromos={setPromos}
          promoDetail={promoDetail}
          setPromoDetail={setPromoDetail}
          products={products}
          setProducts={setProducts}
          clients={clients}
          setClients={setClients}
          orders={orders}
          setOrders={setOrders}
          settings={settings}
          setSettings={setSettings}
        />
      )}

      {view !== "admin" && <Footer settings={settings} />}

      {deliveryOpen && (
        <DeliveryModal close={() => setDeliveryOpen(false)} setLoc={setDeliveryLoc} />
      )}
    </div>
  );
}
