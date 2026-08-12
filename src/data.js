export const CATEGORIES = [
  { name: "Sánguches", grad: ["#3a2620", "#161010"], img: "src/img/hamburguesa.jpg" },
  { name: "Promociones", grad: ["#D62E1F", "#8f1c11"], img: "src/img/promocion1.jpg" },
  { name: "Pardos Brasa", grad: ["#5a2f14", "#2c150a"], img: "src/img/pardosbrasa.jpg" },
  { name: "Pardos Parrillero", grad: ["#3d3d3d", "#161616"], img: "src/img/pardosparrillero.jpg" },
  { name: "Ensaladas", grad: ["#3f6e3a", "#1c3419"], img: "src/img/ensalada.jpg" },
  { name: "Anticuchos y Mollejitas", emoji: "🍢", grad: ["#7a3a12", "#3c1c08"], img: "src/img/anticuchos.webp" },
  { name: "Guarniciones", grad: ["#e0a021", "#a3700f"], img: "src/img/guarniciones.jpg" },
  { name: "Adicionales", grad: ["#caa96a", "#8a723f"], img: "src/img/papasfritaspersonal.jpg" },
  { name: "Chicharrones", grad: ["#8a3d24", "#4a1e11"], img: "src/img/chicharrones.jpg" },
  { name: "Bebidas", grad: ["#1e1e1e", "#000"], img: "src/img/chichamorada.jpg" },
  { name: "Postres", grad: ["#7d3f2e", "#3a1a12"], img: "src/img/postres.jpg" },
];

export const UBICACIONES = ["Lima", "Provincia", "Asia", "Aeropuerto"];

export const PROMOS = [
  { id: 1, name: "Tú Eliges con Gaseosa 1.5 Lt.", price: 85.9, tag: "Más pedido", img: "src/img/cocacolapersonal.jpg" },
  { id: 2, name: "Combo Familiar Brasa x4", price: 149.9, tag: "Para 4", img: "src/img/promocion9.jpg" },
  { id: 3, name: "Dúo Sánguche + Gaseosa", price: 39.9, tag: "", img: "src/img/duosanguche.jpg" },
  { id: 4, name: "Pardos Parrillero Clásico", price: 69.9, tag: "", img: "src/img/promocion2.jpg" },
  { id: 5, name: "Combo Pollo a la Brasa 1/4", price: 32.9, tag: "", img: "src/img/pollopersonal.jpg" },
  { id: 6, name: "Anticuchos x2 + Papas", price: 44.9, tag: "", img: "src/img/anticuchos.webp" },
];

export const PROMO_DETAIL = {
  1: {
    name: "Promoción Tú Eliges con Gaseosa 1.5 Lt.",
    price: 85.9,
    desc: "1 Pardos Brasa + papas fritas + guarnición + Inca Kola personal de 1.5 Lt. Esta promoción incluye propina.",
    img: "/src/assets/images/promociones/promo-1-detalle.jpg",
    porciones: ["Pardos Brasa", "Pardos Parrillero", "Anticuchos"],
    complementos: ["Papas Fritas", "Papas Doradas"],
    guarniciones: ["Ensalada Criolla", "Puré de Papas", "Arroz Chaufa"],
    bebidas: ["Inca Kola 1.5L", "Coca Cola 1.5L", "Chicha Morada 1.5L"],
    gaseosas: ["Inca Kola", "Coca Cola", "Chicha Morada", "Agua San Luis"],
  },
};

export const PRODUCTS = [
  { id: 1, name: "Sánguche de Pollo", category: "Sánguches", price: 25.0, stock: 18, active: true, img: "src/img/hamburguesa.jpg" },
  { id: 2, name: "1/4 Pollo a la Brasa", category: "Pardos Brasa", price: 78.9, stock: 20, active: true, img: "src/img/polloalabrasa.jpg" },
  { id: 3, name: "Papas Fritas", category: "Guarniciones", price: 15.0, stock: 20, active: true, img: "src/img/papasfritaspersonal.jpg" },
  { id: 4, name: "Gaseosa 500 ml", category: "Bebidas", price: 4.0, stock: 20, active: true, img: "src/img/cocacolapersonal.jpg" },
  { id: 5, name: "Ensalada Mixta", category: "Ensaladas", price: 10.0, stock: 20, active: true, img: "src/img/ensaladapersonal.jpg" },
  { id: 6, name: "Anticuchos x2", category: "Anticuchos y Mollejitas", price: 34.9, stock: 15, active: true, img: "src/img/anticuchos.webp" },
  { id: 7, name: "Chicharrón Mixto", category: "Chicharrones", price: 42.0, stock: 12, active: true, img: "src/img/chicharrones.jpg" },
  { id: 8, name: "Pardos Parrillero Clásico", category: "Pardos Parrillero", price: 69.9, stock: 10, active: true, img: "src/img/pardosparrillero.jpg" },
  { id: 9, name: "Chicha Morada 1.5L", category: "Bebidas", price: 14.0, stock: 25, active: true, img: "src/img/chichamorada.jpg" },
  { id: 10, name: "Postre de la Casa", category: "Postres", price: 12.0, stock: 14, active: true, img: "src/img/postres.jpg" },
];

export const CLIENTES = [
  { id: 1, name: "Ana Palomino", email: "anap@gmail.com", orders: 10, active: true },
  { id: 2, name: "Edu Sivi Paucar", email: "edusivi@gmail.com", orders: 8, active: true },
  { id: 3, name: "Pamela Alvarez", email: "pamelaa@gmail.com", orders: 5, active: true },
  { id: 4, name: "Milagros Montalvo", email: "milagrosm@gmail.com", orders: 7, active: true },
  { id: 5, name: "Jorge Sencia", email: "jorges@gmail.com", orders: 3, active: false },
];

export const ORDER_STATES = ["Pendiente", "Preparado", "En camino", "Entregado"];

export const ORDERS = [
  { id: "#00125", cliente: "Ana Palomino", fecha: "08/08/26 10:30 AM", productos: 2, total: 50, estado: "Preparado" },
  { id: "#00124", cliente: "Edu Sivi Paucar", fecha: "08/08/26 9:45 AM", productos: 3, total: 48, estado: "En camino" },
  { id: "#00123", cliente: "Pamela Alvarez", fecha: "07/08/26 8:20 PM", productos: 1, total: 55, estado: "Entregado" },
  { id: "#00122", cliente: "Milagros Montalvo", fecha: "07/08/26 7:15 PM", productos: 2, total: 60, estado: "Pendiente" },
  { id: "#00121", cliente: "Jorge Sencia", fecha: "07/08/26 6:50 PM", productos: 4, total: 40, estado: "Entregado" },
];

export const SETTINGS = {
  restaurantName: "Pardos Chicken",
  phone: "958 232 771",
  address: "Av. Javier Prado Este 6495, La Molina 15024 Lima",
  hours: "11:00 AM - 11:pm",
  contactEmail: "admin@pardoschicken.com",
  description: "Disfruta los mejores sabores de pardos chicken con ingredientes frescos y de calidad... ¡Te esperamos!",
};
