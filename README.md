# Catálogo Tecnológico Huaraz

Plataforma de catálogo con interfaz cyberpunk, API REST en Express y persistencia SQLite real.

## Por qué SQLite

El entorno local usa **Node.js 24**, que incluye `node:sqlite`. Eso permite una base de datos de archivo, consultas parametrizadas y migraciones reproducibles **sin instalar PostgreSQL/MySQL ni compilar módulos nativos** (poco fiable en PCs de laboratorio Windows). La capa de repositorios está aislada para poder cambiar el motor más adelante.

Los productos iniciales son **datos de demostración** (cada descripción lo indica). No hay administrador semilla: el primer usuario se crea con un script.

## Requisitos

- Node.js 22 o superior (probado en 24.19)
- npm 11+

## Instalación

```bash
cd C:\SENATIII\catalogo-huaraz
npm install
cd backend
npm install
copy .env.example .env
```

En `backend/.env` define un `JWT_SECRET` largo. El resto puede quedar como en el ejemplo.

## Base de datos

Al arrancar la API se crea `backend/data/catalogo.db` y, si está vacía, se insertan categorías y productos de demostración. No se duplica el seed si ya hay categorías.

Imágenes subidas: `backend/uploads/products/`.

## Primer administrador

```bash
cd backend
npm run create-admin -- --email=admin@localhost --password=EligeUnaClaveLarga
```

También puedes usar `ADMIN_EMAIL` y `ADMIN_PASSWORD` en `.env` y ejecutar `npm run create-admin`.

## Ejecución

Desde la raíz del proyecto:

```bash
npm run dev:all
```

O por separado:

```bash
npm run dev:api
npm run dev
```

| Servicio  | URL |
|-----------|-----|
| Frontend  | http://localhost:5173/ |
| API       | http://localhost:4000/ |
| Health    | http://localhost:4000/api/health |

Vite reenvía `/api` y `/uploads` al backend.

## Endpoints principales

- `GET /api/health`
- `GET /api/settings` (contacto y redes solo si están en `.env`)
- `GET /api/products` (paginación, `search`, `category`, `brand`, `availability`, `sort`, `featured`, `isNew`, `onSale`)
- `GET /api/products/:id` (id o slug)
- `GET /api/products/brands`
- `GET /api/categories`
- `POST /api/auth/login` (límite de intentos)
- `GET /api/auth/me` (Bearer JWT)
- `GET /api/admin/stats` y `GET /api/admin/products` (admin)
- `POST/PUT/DELETE /api/products` (admin)
- `POST /api/products/upload` (admin, JPG/PNG/WEBP/SVG, máx. 2 MB)
- `POST/PUT/DELETE /api/categories` (admin)

Ejemplo:

```bash
curl http://localhost:4000/api/health
curl http://localhost:4000/api/products
```

## Frontend

React 19 + Vite 8. El linter sigue siendo Oxlint. Animaciones en CSS (sin Framer Motion) y con `prefers-reduced-motion`.

## Scripts

| Comando | Acción |
|---------|--------|
| `npm run dev` | Vite |
| `npm run dev:api` | API con recarga |
| `npm run dev:all` | ambos |
| `npm run build` | build de producción del frontend |
| `npm run lint` | oxlint |
| `npm run create-admin` | alta del administrador |
