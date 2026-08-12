import React, { useMemo, useState } from "react";
import {
  Menu as MenuIcon,
  Bell,
  Home as HomeIcon,
  ClipboardList,
  Tag,
  Users,
  Settings as SettingsIcon,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Eye,
  Search,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  UserPlus,
  Package,
  DollarSign,
} from "lucide-react";
import { ORDER_STATES } from "../data.js";
import "./Admin.css";
import pardoschicken from "../img/pardoschicken.jpg";

const PAGE_SIZE = 5;

function usePagination(items) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const slice = items.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  return { page: safePage, setPage, totalPages, slice };
}

function Pagination({ page, totalPages, setPage, count, label }) {
  if (count === 0) return null;
  return (
    <div className="admin-pagination">
      <span className="admin-pagination-count">
        Mostrando {Math.min((page - 1) * PAGE_SIZE + 1, count)} a {Math.min(page * PAGE_SIZE, count)} de {count} {label}
      </span>
      <div className="admin-pagination-btns">
        <button disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
          <ChevronLeft size={14} />
        </button>
        {Array.from({ length: totalPages }).slice(0, 5).map((_, i) => (
          <button key={i} className={page === i + 1 ? "active" : ""} onClick={() => setPage(i + 1)}>
            {i + 1}
          </button>
        ))}
        <button disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const cls = {
    Pendiente: "badge-gray",
    Preparado: "badge-orange",
    "En camino": "badge-blue",
    Entregado: "badge-green",
    Activo: "badge-green",
    Inactivo: "badge-red",
    Activa: "badge-green",
    Inactiva: "badge-red",
  }[status] || "badge-gray";
  return <span className={`admin-badge ${cls}`}>{status}</span>;
}

const emptyProduct = (categories) => ({
  id: Date.now(),
  name: "Nuevo producto",
  category: categories[0]?.name || "",
  price: 0,
  stock: 0,
  active: true,
  img: "",
});
const emptyPromo = () => ({ id: Date.now(), name: "Nueva promoción", price: 0, tag: "", img: "" });
const emptyDetail = () => ({
  name: "", price: 0, desc: "", img: "",
  porciones: [], complementos: [], guarniciones: [], bebidas: [], gaseosas: [],
});
const listToText = (arr) => (arr || []).join(", ");
const textToList = (txt) => txt.split(",").map((s) => s.trim()).filter(Boolean);

export default function Admin({
  user, nav, onLogout,
  categories, setCategories,
  promos, setPromos,
  promoDetail, setPromoDetail,
  products, setProducts,
  clients, setClients,
  orders, setOrders,
  settings, setSettings,
}) {
  const [section, setSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const today = new Date().toLocaleDateString("es-PE", { day: "2-digit", month: "long", year: "numeric" });

  const SECTIONS = [
    { key: "dashboard", label: "Dashboard", icon: HomeIcon },
    { key: "productos", label: "Productos", icon: Package },
    { key: "promociones", label: "Promociones", icon: Tag },
    { key: "pedidos", label: "Pedidos", icon: ClipboardList },
    { key: "clientes", label: "Clientes", icon: Users },
    { key: "configuracion", label: "Configuración", icon: SettingsIcon },
  ];

  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar ${sidebarOpen ? "" : "collapsed"}`}>
        <div className="admin-side-profile">
          <div className="admin-side-avatar">{user.name[0]}</div>
          {sidebarOpen && <span>Administrador</span>}
        </div>
        <nav className="admin-side-nav">
          {SECTIONS.map((s) => (
            <button
              key={s.key}
              className={`admin-side-link ${section === s.key ? "active" : ""}`}
              onClick={() => setSection(s.key)}
              title={s.label}
            >
              <s.icon size={17} />
              {sidebarOpen && <span>{s.label}</span>}
            </button>
          ))}
        </nav>
        <div className="admin-side-footer">
          <button className="admin-side-logout" onClick={() => { onLogout(); nav("home"); }}>
            <LogOut size={15} /> {sidebarOpen && "Cerrar Sesión"}
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-header">
          <div className="admin-header-left">
            <button className="admin-hamburger" onClick={() => setSidebarOpen((v) => !v)}>
              <MenuIcon size={20} />
            </button>
            <img
              src={pardoschicken}
              alt="Pardos Chicken"
              className="admin-header-logo"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
            <span className="admin-header-brand">Pardos Chicken</span>
          </div>
          <button className="admin-bell" onClick={() => setSection("pedidos")} title="Pedidos pendientes">
            <Bell size={18} />
            {orders.some((o) => o.estado === "Pendiente") && <span className="admin-bell-dot" />}
          </button>
        </header>

        <div className="admin-breadcrumb">{section}</div>

        <main className="admin-content">
          {section === "dashboard" && (
            <DashboardSection
              orders={orders} clients={clients} products={products} today={today}
              goTo={setSection}
            />
          )}
          {section === "productos" && (
            <ProductosSection
              products={products} setProducts={setProducts}
              categories={categories} setCategories={setCategories}
            />
          )}
          {section === "promociones" && (
            <PromocionesSection
              promos={promos} setPromos={setPromos}
              promoDetail={promoDetail} setPromoDetail={setPromoDetail}
            />
          )}
          {section === "pedidos" && (
            <PedidosSection orders={orders} setOrders={setOrders} clients={clients} />
          )}
          {section === "clientes" && (
            <ClientesSection clients={clients} setClients={setClients} />
          )}
          {section === "configuracion" && (
            <ConfiguracionSection settings={settings} setSettings={setSettings} user={user} />
          )}
        </main>

        <footer className="admin-footer">
          <span>@pardos Chicken Todos los derechos Reservados</span>
        </footer>
      </div>
    </div>
  );
}
function DashboardSection({ orders, clients, products, today, goTo }) {
  const ventasMes = orders.reduce((s, o) => s + o.total, 0);
  const recientes = orders.slice(0, 4);

  return (
    <>
      <div className="admin-section-topline">
        <div>
          <h1>Dashboard</h1>
          <p className="admin-subtitle">Resumen general de tu restaurante</p>
        </div>
        <div className="admin-today"><Calendar size={14} /> Hoy: {today}</div>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <ShoppingBag size={20} className="stat-icon icon-red" />
          <div>
            <p className="stat-label">Pedidos</p>
            <p className="stat-value">{orders.length}</p>
            <p className="stat-sub">Este mes</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <UserPlus size={20} className="stat-icon icon-purple" />
          <div>
            <p className="stat-label">Clientes</p>
            <p className="stat-value">{clients.length}</p>
            <p className="stat-sub">Registrados</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <Package size={20} className="stat-icon icon-orange" />
          <div>
            <p className="stat-label">Productos</p>
            <p className="stat-value">{products.length}</p>
            <p className="stat-sub">Disponibles</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <DollarSign size={20} className="stat-icon icon-green" />
          <div>
            <p className="stat-label">Ventas</p>
            <p className="stat-value">S/ {ventasMes.toFixed(0)}</p>
            <p className="stat-sub">Este mes</p>
          </div>
        </div>
      </div>

      <div className="admin-panel">
        <div className="admin-panel-head">
          <h2>Pedidos recientes</h2>
          <button className="admin-textlink" onClick={() => goTo("pedidos")}>Ver todos los pedidos</button>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Pedido</th><th>Cliente</th><th>Fecha</th><th>Total</th><th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {recientes.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.cliente}</td>
                <td>{o.fecha}</td>
                <td>S/ {o.total.toFixed(0)}</td>
                <td><StatusBadge status={o.estado} /></td>
              </tr>
            ))}
            {recientes.length === 0 && (
              <tr><td colSpan={5} className="admin-empty-row">Aún no hay pedidos.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
function ProductosSection({ products, setProducts, categories, setCategories }) {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("Todas");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [editingId, setEditingId] = useState(null);
  const [showCats, setShowCats] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (catFilter !== "Todas" && p.category !== catFilter) return false;
      if (statusFilter !== "Todos" && (statusFilter === "Activo") !== p.active) return false;
      return true;
    });
  }, [products, search, catFilter, statusFilter]);

  const { page, setPage, totalPages, slice } = usePagination(filtered);

  const updateProduct = (id, patch) => setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  const removeProduct = (id) => setProducts((prev) => prev.filter((p) => p.id !== id));
  const addProduct = () => {
    const p = emptyProduct(categories);
    setProducts((prev) => [p, ...prev]);
    setEditingId(p.id);
  };

  const addCategory = () => setCategories((prev) => [...prev, { name: "Nueva categoría", grad: ["#3a2620", "#161010"], img: "" }]);
  const updateCategory = (idx, patch) => setCategories((prev) => prev.map((c, i) => (i === idx ? { ...c, ...patch } : c)));
  const removeCategory = (idx) => setCategories((prev) => prev.filter((_, i) => i !== idx));

  return (
    <>
      <div className="admin-section-topline">
        <div>
          <h1>Productos</h1>
          <p className="admin-subtitle">Gestiona los productos de tu restaurante</p>
        </div>
        <button className="admin-primary-btn" onClick={addProduct}><Plus size={15} /> Agregar Producto</button>
      </div>

      <div className="admin-filters">
        <div className="admin-search-input">
          <Search size={14} />
          <input placeholder="Buscar producto..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)}>
          <option value="Todas">Categoría: Todas</option>
          {categories.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option>Todos</option>
          <option>Activo</option>
          <option>Inactivo</option>
        </select>
        <button className="admin-textlink" onClick={() => setShowCats((v) => !v)}>
          {showCats ? "Ocultar categorías" : "Gestionar categorías"}
        </button>
      </div>

      {showCats && (
        <div className="admin-panel admin-cats-panel">
          <div className="admin-panel-head">
            <h2>Categorías del menú</h2>
            <button className="admin-add-btn" onClick={addCategory}><Plus size={13} /> Nueva categoría</button>
          </div>
          <div className="admin-cats-list">
            {categories.map((c, idx) => (
              <div className="admin-cat-row" key={idx}>
                <input value={c.name} onChange={(e) => updateCategory(idx, { name: e.target.value })} />
                <input type="color" value={c.grad?.[0] || "#3a2620"} onChange={(e) => updateCategory(idx, { grad: [e.target.value, c.grad?.[1] || "#161010"] })} />
                <input type="color" value={c.grad?.[1] || "#161010"} onChange={(e) => updateCategory(idx, { grad: [c.grad?.[0] || "#3a2620", e.target.value] })} />
                <button className="admin-icon-btn danger" onClick={() => removeCategory(idx)}><Trash2 size={14} /></button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="admin-panel">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Imagen</th><th>Producto</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Estado</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {slice.map((p) => {
              const editing = editingId === p.id;
              return (
                <tr key={p.id}>
                  <td>
                    <div className="admin-thumb" style={{ backgroundImage: p.img ? `url(${p.img})` : "none" }} />
                  </td>
                  <td>
                    {editing ? (
                      <input className="admin-inline-input" value={p.name} onChange={(e) => updateProduct(p.id, { name: e.target.value })} />
                    ) : p.name}
                  </td>
                  <td>
                    {editing ? (
                      <select className="admin-inline-input" value={p.category} onChange={(e) => updateProduct(p.id, { category: e.target.value })}>
                        {categories.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
                      </select>
                    ) : p.category}
                  </td>
                  <td>
                    {editing ? (
                      <input className="admin-inline-input admin-inline-small" type="number" step="0.10" value={p.price} onChange={(e) => updateProduct(p.id, { price: parseFloat(e.target.value) || 0 })} />
                    ) : `S/ ${p.price.toFixed(2)}`}
                  </td>
                  <td>
                    {editing ? (
                      <input className="admin-inline-input admin-inline-small" type="number" value={p.stock} onChange={(e) => updateProduct(p.id, { stock: parseInt(e.target.value) || 0 })} />
                    ) : p.stock}
                  </td>
                  <td>
                    <button className="admin-badge-btn" onClick={() => updateProduct(p.id, { active: !p.active })}>
                      <StatusBadge status={p.active ? "Activo" : "Inactivo"} />
                    </button>
                  </td>
                  <td className="admin-actions-cell">
                    <button className="admin-icon-btn" onClick={() => setEditingId(editing ? null : p.id)}><Pencil size={14} /></button>
                    <button className="admin-icon-btn danger" onClick={() => removeProduct(p.id)}><Trash2 size={14} /></button>
                  </td>
                </tr>
              );
            })}
            {slice.length === 0 && (
              <tr><td colSpan={7} className="admin-empty-row">No se encontraron productos.</td></tr>
            )}
          </tbody>
        </table>
        <Pagination page={page} totalPages={totalPages} setPage={setPage} count={filtered.length} label="productos" />
      </div>
    </>
  );
}

function PromocionesSection({ promos, setPromos, promoDetail, setPromoDetail }) {
  const [editingId, setEditingId] = useState(null);
  const { page, setPage, totalPages, slice } = usePagination(promos);

  const updatePromo = (id, patch) => setPromos((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  const removePromo = (id) => {
    setPromos((prev) => prev.filter((p) => p.id !== id));
    setPromoDetail((prev) => { const n = { ...prev }; delete n[id]; return n; });
  };
  const addPromo = () => {
    const p = emptyPromo();
    setPromos((prev) => [p, ...prev]);
    setPromoDetail((prev) => ({ ...prev, [p.id]: { ...emptyDetail(), name: p.name, price: p.price } }));
    setEditingId(p.id);
  };
  const updateDetail = (id, patch) => setPromoDetail((prev) => ({ ...prev, [id]: { ...(prev[id] || emptyDetail()), ...patch } }));

  return (
    <>
      <div className="admin-section-topline">
        <div>
          <h1>Promociones</h1>
          <p className="admin-subtitle">Gestiona las promociones de tu restaurante</p>
        </div>
        <button className="admin-primary-btn admin-primary-btn-green" onClick={addPromo}><Plus size={15} /> Crear Promoción</button>
      </div>

      <div className="admin-promo-grid">
        {slice.map((p) => {
          const d = promoDetail[p.id];
          const editing = editingId === p.id;
          return (
            <div className="admin-promo-card" key={p.id}>
              <div className="admin-promo-img" style={{ backgroundImage: p.img ? `url(${p.img})` : "none" }} />
              <div className="admin-promo-body">
                {editing ? (
                  <>
                    <input className="admin-inline-input" value={p.name} onChange={(e) => updatePromo(p.id, { name: e.target.value })} />
                    <div className="admin-card-row">
                      <input className="admin-inline-input admin-inline-small" type="number" step="0.10" value={p.price} onChange={(e) => updatePromo(p.id, { price: parseFloat(e.target.value) || 0 })} />
                      <input className="admin-inline-input admin-inline-small" value={p.tag} placeholder="Etiqueta" onChange={(e) => updatePromo(p.id, { tag: e.target.value })} />
                    </div>
                    <input className="admin-inline-input" value={p.img} placeholder="Ruta de imagen" onChange={(e) => updatePromo(p.id, { img: e.target.value })} />
                    {d && (
                      <textarea
                        className="admin-inline-input"
                        rows={2}
                        placeholder="Descripción"
                        value={d.desc}
                        onChange={(e) => updateDetail(p.id, { desc: e.target.value })}
                      />
                    )}
                  </>
                ) : (
                  <>
                    <p className="admin-promo-name">{p.name}</p>
                    <p className="admin-promo-desc">{d?.desc ? d.desc.slice(0, 60) + (d.desc.length > 60 ? "…" : "") : (p.tag || "Sin descripción")}</p>
                    <p className="admin-promo-price">S/ {p.price.toFixed(2)}</p>
                    <StatusBadge status="Activa" />
                  </>
                )}
              </div>
              <div className="admin-promo-actions">
                <button className="admin-icon-btn" onClick={() => setEditingId(editing ? null : p.id)}><Pencil size={14} /></button>
                <button className="admin-icon-btn danger" onClick={() => removePromo(p.id)}><Trash2 size={14} /></button>
              </div>
            </div>
          );
        })}
        {slice.length === 0 && <p className="admin-empty-row">No hay promociones creadas.</p>}
      </div>
      <Pagination page={page} totalPages={totalPages} setPage={setPage} count={promos.length} label="promociones" />
    </>
  );
}

function PedidosSection({ orders, setOrders, clients }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todas");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [applied, setApplied] = useState({ search: "", statusFilter: "Todas", desde: "", hasta: "" });
  const [expandedId, setExpandedId] = useState(null);

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      if (applied.search && !(`${o.id} ${o.cliente}`.toLowerCase().includes(applied.search.toLowerCase()))) return false;
      if (applied.statusFilter !== "Todas" && o.estado !== applied.statusFilter) return false;
      return true;
    });
  }, [orders, applied]);

  const { page, setPage, totalPages, slice } = usePagination(filtered);
  const updateOrder = (id, patch) => setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, ...patch } : o)));

  return (
    <>
      <div className="admin-section-topline">
        <div>
          <h1>Pedidos</h1>
          <p className="admin-subtitle">Gestiona los pedidos realizados</p>
        </div>
      </div>

      <div className="admin-filters">
        <div className="admin-search-input">
          <Search size={14} />
          <input placeholder="Buscar pedido..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option>Todas</option>
          {ORDER_STATES.map((s) => <option key={s}>{s}</option>)}
        </select>
        <input type="date" value={desde} onChange={(e) => setDesde(e.target.value)} />
        <input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)} />
        <button className="admin-primary-btn" onClick={() => { setApplied({ search, statusFilter, desde, hasta }); setPage?.(1); }}>Buscar</button>
      </div>

      <div className="admin-panel">
        <table className="admin-table">
          <thead>
            <tr>
              <th>N° Pedido</th><th>Cliente</th><th>Fecha</th><th>Productos</th><th>Total</th><th>Estado</th><th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {slice.map((o) => (
              <React.Fragment key={o.id}>
                <tr>
                  <td>{o.id}</td>
                  <td>{o.cliente}</td>
                  <td>{o.fecha}</td>
                  <td>{o.productos} Productos</td>
                  <td>S/ {o.total.toFixed(0)}</td>
                  <td><StatusBadge status={o.estado} /></td>
                  <td>
                    <button className="admin-icon-btn" onClick={() => setExpandedId(expandedId === o.id ? null : o.id)}>
                      <Eye size={14} />
                    </button>
                  </td>
                </tr>
                {expandedId === o.id && (
                  <tr className="admin-expand-row">
                    <td colSpan={7}>
                      <div className="admin-expand-body">
                        <span>Cambiar estado:</span>
                        <select value={o.estado} onChange={(e) => updateOrder(o.id, { estado: e.target.value })}>
                          {ORDER_STATES.map((s) => <option key={s}>{s}</option>)}
                        </select>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            {slice.length === 0 && (
              <tr><td colSpan={7} className="admin-empty-row">No se encontraron pedidos.</td></tr>
            )}
          </tbody>
        </table>
        <Pagination page={page} totalPages={totalPages} setPage={setPage} count={filtered.length} label="pedidos" />
      </div>
    </>
  );
}

function ClientesSection({ clients, setClients }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [expandedId, setExpandedId] = useState(null);

  const filtered = useMemo(() => {
    return clients.filter((c) => {
      if (search && !(`${c.name} ${c.email}`.toLowerCase().includes(search.toLowerCase()))) return false;
      if (statusFilter !== "Todos" && (statusFilter === "Activo") !== c.active) return false;
      return true;
    });
  }, [clients, search, statusFilter]);

  const { page, setPage, totalPages, slice } = usePagination(filtered);
  const toggleActive = (id) => setClients((prev) => prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c)));

  return (
    <>
      <div className="admin-section-topline">
        <div>
          <h1>Clientes</h1>
          <p className="admin-subtitle">Gestiona los clientes registrados</p>
        </div>
      </div>

      <div className="admin-filters">
        <div className="admin-search-input">
          <Search size={14} />
          <input placeholder="Buscar cliente..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option>Todos</option>
          <option>Activo</option>
          <option>Inactivo</option>
        </select>
      </div>

      <div className="admin-panel">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th><th>Nombre</th><th>Correo</th><th>Pedidos</th><th>Estado</th><th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {slice.map((c) => (
              <React.Fragment key={c.id}>
                <tr>
                  <td>{String(c.id).padStart(2, "0")}</td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.orders} pedidos</td>
                  <td>
                    <button className="admin-badge-btn" onClick={() => toggleActive(c.id)}>
                      <StatusBadge status={c.active ? "Activo" : "Inactivo"} />
                    </button>
                  </td>
                  <td>
                    <button className="admin-icon-btn" onClick={() => setExpandedId(expandedId === c.id ? null : c.id)}>
                      <Eye size={14} />
                    </button>
                  </td>
                </tr>
                {expandedId === c.id && (
                  <tr className="admin-expand-row">
                    <td colSpan={6}>
                      <div className="admin-expand-body">
                        Cliente #{c.id} · {c.email} · {c.orders} pedidos realizados · Estado: {c.active ? "Activo" : "Inactivo"}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            {slice.length === 0 && (
              <tr><td colSpan={6} className="admin-empty-row">No se encontraron clientes.</td></tr>
            )}
          </tbody>
        </table>
        <Pagination page={page} totalPages={totalPages} setPage={setPage} count={filtered.length} label="clientes" />
      </div>
    </>
  );
}

function ConfiguracionSection({ settings, setSettings, user }) {
  const [tab, setTab] = useState("general");
  const [draft, setDraft] = useState(settings);
  const [saved, setSaved] = useState(false);
  const [pwd, setPwd] = useState({ current: "", next: "", confirm: "" });
  const [pwdMsg, setPwdMsg] = useState("");

  const save = () => {
    setSettings(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const savePassword = () => {
    if (!pwd.current || !pwd.next) { setPwdMsg("Completa todos los campos."); return; }
    if (pwd.next !== pwd.confirm) { setPwdMsg("Las contraseñas nuevas no coinciden."); return; }
    setPwdMsg("Contraseña actualizada correctamente.");
    setPwd({ current: "", next: "", confirm: "" });
  };

  return (
    <>
      <div className="admin-section-topline">
        <div>
          <h1>Configuración</h1>
          <p className="admin-subtitle">Administra la configuración de tu restaurante</p>
        </div>
      </div>

      <div className="admin-config-tabs">
        <button className={tab === "general" ? "active" : ""} onClick={() => setTab("general")}>Información general</button>
        <button className={tab === "cuenta" ? "active" : ""} onClick={() => setTab("cuenta")}>Cuenta</button>
        <button className={tab === "seguridad" ? "active" : ""} onClick={() => setTab("seguridad")}>Seguridad</button>
      </div>

      {tab === "general" && (
        <div className="admin-panel">
          <div className="admin-config-grid">
            <div className="admin-config-col">
              <h3>Información de restaurante</h3>
              <label>Nombre del restaurante</label>
              <input value={draft.restaurantName} onChange={(e) => setDraft({ ...draft, restaurantName: e.target.value })} />
              <label>Teléfono</label>
              <input value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} />
              <label>Dirección</label>
              <input value={draft.address} onChange={(e) => setDraft({ ...draft, address: e.target.value })} />
              <label>Horario de atención</label>
              <input value={draft.hours} onChange={(e) => setDraft({ ...draft, hours: e.target.value })} />
            </div>
            <div className="admin-config-col">
              <h3>Información del contacto</h3>
              <label>Correo</label>
              <input value={draft.contactEmail} onChange={(e) => setDraft({ ...draft, contactEmail: e.target.value })} />
              <label>Descripción del restaurante</label>
              <textarea rows={5} value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
            </div>
          </div>
          <div className="admin-config-save">
            {saved && <span className="admin-saved-msg">Cambios guardados ✓</span>}
            <button className="admin-primary-btn" onClick={save}>GUARDAR CAMBIOS</button>
          </div>
        </div>
      )}

      {tab === "cuenta" && (
        <div className="admin-panel">
          <div className="admin-config-col" style={{ maxWidth: 420 }}>
            <h3>Cuenta de administrador</h3>
            <label>Nombre</label>
            <input value={user.name} disabled />
            <label>Correo</label>
            <input value={user.email} disabled />
            <p className="admin-hint">Esta es la cuenta con la que accediste desde el login principal.</p>
          </div>
        </div>
      )}

      {tab === "seguridad" && (
        <div className="admin-panel">
          <div className="admin-config-col" style={{ maxWidth: 420 }}>
            <h3>Cambiar contraseña</h3>
            <label>Contraseña actual</label>
            <input type="password" value={pwd.current} onChange={(e) => setPwd({ ...pwd, current: e.target.value })} />
            <label>Nueva contraseña</label>
            <input type="password" value={pwd.next} onChange={(e) => setPwd({ ...pwd, next: e.target.value })} />
            <label>Confirmar nueva contraseña</label>
            <input type="password" value={pwd.confirm} onChange={(e) => setPwd({ ...pwd, confirm: e.target.value })} />
            {pwdMsg && <p className="admin-hint">{pwdMsg}</p>}
            <div className="admin-config-save">
              <button className="admin-primary-btn" onClick={savePassword}>ACTUALIZAR CONTRASEÑA</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
