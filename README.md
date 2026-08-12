# Pardos Chicken · Prototipo

Prototipo de React (Vite) que recrea el flujo de la web de Pardos Chicken:
Home → Promociones → Detalle de promoción, Login → Cuenta, y el modal de
método de entrega, todo conectado con estado real (no es solo maqueta visual).

## Estructura

```
pardos-chicken/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx          # punto de entrada
    ├── App.jsx           # estado global + navegación entre vistas
    ├── theme.js           # paleta y tokens de diseño
    ├── data.js            # datos mock (categorías, promos, detalle)
    └── components/
        ├── Header.jsx
        ├── Dropdown.jsx
        ├── Tile.jsx
        ├── Home.jsx
        ├── Promociones.jsx
        ├── PromoDetail.jsx
        ├── Login.jsx
        ├── Account.jsx
        ├── DeliveryModal.jsx
        └── Footer.jsx
```

## Cómo correrlo

```bash
npm install
npm run dev
```

Abre la URL que muestra Vite (por defecto http://localhost:5173).

## Flujo conectado

- **Header** → "Entrega a Lima" abre el modal de delivery/recojo con
  buscador de dirección. "Categorías" y "Carta salón" abren dropdowns.
- **Home** → tiles de categorías; "Promociones" en el tile o en el banner
  navega a la vista de Promociones.
- **Promociones** → clic en una tarjeta abre el Detalle de promoción, con
  selects y radios obligatorios; "Agregar al pedido" se habilita solo
  cuando se completan las opciones requeridas.
- **Ingresar** → login con "Continuar como invitado" o "Ingresar con
  Google" (ambos autentican en este prototipo); redirige a Home con el
  avatar visible en el header.
- **Avatar** → abre Cuenta, con "Cerrar sesión" que vuelve al estado de
  invitado.

## Dependencias

- React 18 + Vite
- lucide-react (íconos)
- Google Fonts: Fraunces (display) + Inter (texto)
