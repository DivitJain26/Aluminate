# Aluminate
**Alumni–Student Engagement Platform**

Live Demo: https://aluminate-syvf.onrender.com

<p align="center"> 
  <img src="client/public/demo-picture.png" alt="Aluminate Demo" width="800"/> 
</p>

## About the Project
Aluminate is a MERN-based alumni networking platform designed to strengthen engagement between college students and alumni.

**Key Features**
- JWT-based authentication using HTTP-only cookies
- Alumni–student interaction and networking
- Well-structured MongoDB schemas
- Optimized database queries using indexes
- Full-stack MERN architecture (React + Express + MongoDB + Node.js)

**Tech Stack**

| Layer | Stack |
|---|---|
| Frontend | React 19, Vite 7, Tailwind CSS v4, React Router v7, React Hook Form + Zod |
| Backend | Node.js 20, Express 5, Mongoose 8, JWT, bcrypt |
| Database | MongoDB Atlas |
| Container | Docker + Docker Compose, nginx (static serving) |

---

## Project Setup Guide

### 1. Install Dependencies

```bash
npm run install:all
```

### 2. Configure Environment Variables

**This step is required — the server will not start without it.**

Create `server/.env` by copying the example file, then fill in your values:

```bash
cp server/.env.example server/.env
```

Open `server/.env` and replace the `MONGODB_URI` placeholders with your actual MongoDB
username and password. Do not rename any of the variables.

| Variable | Description |
|---|---|
| `NODE_ENV` | `development` or `production` |
| `CORS_ORIGIN` | Frontend origin (`http://localhost:5173` locally) |
| `PORT` | Backend port (default `5000`) |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_ACCESS_TOKEN_SECRET` | Secret for signing access tokens |
| `JWT_REFRESH_TOKEN_SECRET` | Secret for signing refresh tokens |
| `JWT_ACCESS_TOKEN_AND_COOKIE_EXPIRES_IN` | Access token lifetime (e.g. `1d`) |
| `JWT_REFRESH_TOKEN_AND_COOKIE_EXPIRES_IN` | Refresh token lifetime (e.g. `30d`) |
| `ACCESS_AND_REFRESH_TOKEN_COOKIE_SAME_SITE` | Cookie `SameSite` policy (e.g. `lax`) |

> ⚠️ Never put real credentials in `server/.env.example` — that file is tracked by git.
> Only `server/.env` is gitignored.

---

## Scripts & Commands
Run from the *root directory* 

Starts the React frontend   
```bash
npm run dev:client
```

Starts the Express backend       
```bash
npm run dev:server
```

Starts both frontend and backend concurrently (if configured) 
```bash
npm run dev:all
```

> Make sure `concurrently` is installed if using `npm run dev:all`.

The frontend runs on http://localhost:5173 and the backend on http://localhost:5000.

---

## Running with Docker

The project ships with a full container setup, so you can run the entire stack without
installing Node.js or matching versions locally.

### Prerequisites
- Docker Engine + Docker Compose plugin
- On Windows/WSL2: Docker Desktop with WSL integration enabled for your distro
- `server/.env` must exist (see [Configure Environment Variables](#2-configure-environment-variables)) — Compose reads it at startup

### Quick Start

```bash
docker compose up --build
```

| Service | URL | Description |
|---|---|---|
| `client` | http://localhost:5173 | React build served by nginx |
| `server` | http://localhost:5000 | Express API |

Wait for `MongoDB connected` in the server logs before using the app.

### Common Commands

```bash
docker compose up -d --build   # rebuild and start in the background
docker compose logs -f server  # tail the backend logs
docker compose restart server  # restart after changing server/.env
docker compose down            # stop and remove containers
```

### How It Works

- **`server/dockerfile`** — installs production dependencies on `node:20-slim` and runs
  the Express app as the non-root `node` user.
- **`client/dockerfile`** — multi-stage build: compiles the Vite bundle in Node, then
  serves the static output from a lightweight `nginx:alpine` image.
- **`client/nginx.conf`** — serves the SPA with a `try_files ... /index.html` fallback so
  deep links like `/dashboard/profile` work on refresh, and caches hashed assets.

### Notes & Gotchas

**Ports conflict with the dev servers.** Docker binds `5000` and `5173`, the same ports
`npm run dev:all` uses. Stop the dev servers before running `docker compose up`, or remap
the ports in `docker-compose.yml`.

**`VITE_API_BASE_URL` is baked in at build time.** Vite inlines `import.meta.env` values
during `npm run build`, so this is passed as a **build arg** in `docker-compose.yml`, not a
runtime environment variable. Changing it requires a rebuild:

```bash
docker compose up -d --build
```

It must also point at a **host-reachable** URL — the bundle runs in the user's browser, so
`http://server:5000` (the internal Compose hostname) will not resolve.

**Source changes need a rebuild.** Application code is copied into the images, so `docker
compose up` alone won't pick up edits. Use `npm run dev:all` for day-to-day development
with hot reload, and Docker for testing production builds and deployment.

**`injecting env (0) from .env` in the logs is expected.** `server/.env` is excluded from
the image by `.dockerignore`; the real values are supplied by Compose's `env_file`.

**MongoDB Atlas IP allowlist.** Containers share your host's outbound IP, so your existing
Atlas allowlist entry keeps working with no changes.
