# TaskFlow Pro

## Project Layout

- **backend/** – Express + PostgreSQL API (auth, projects, tasks, teams).
- **frontend/** – Vite + Vue 3 SPA with Pinia, Tailwind, and Axios auth interceptors.
- **rust/analytics_service/** – Toy Rust microservice (Axum) that fetches `/api/tasks` and exposes light-weight metrics so you can compare resource usage when introducing Rust helpers.

## Running the stack

1. Run the backend (port 5000):
   ```bash
   cd "D:/VueJs Projects/taskflow-pro/backend"
   npm run dev
   ```
2. Run the frontend (port 3000):
   ```bash
   cd "D:/VueJs Projects/taskflow-pro/frontend"
   npm run dev
   ```
3. (Optional) Run the Rust analytics service on port 6000:
   ```bash
   cd "D:/VueJs Projects/taskflow-pro/rust/analytics_service"
   cargo run
   ```
   - The service will request `http://localhost:5000/api/tasks` and expose aggregated metrics at `http://localhost:6000/analytics` for the dashboard to read.
   - Override the backend target via `BACKEND_BASE_URL` or port via `RUST_ANALYTICS_PORT` env vars.

## Frontend Notes

- The dashboard already fetches the Rust analytics response; the `Create project` and `Create task` buttons now route to the dashboard form safely.
- The Projects, Tasks, and Team views consume shared stores + the new Rust metrics service for richer UX.
