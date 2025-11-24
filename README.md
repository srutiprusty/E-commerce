# Ecomm 

This repository contains a frontend (Client) and backend (server) for the Ecomm project.
This README provides a quick, common setup for running both parts locally on Windows (cmd.exe). Adjust commands if you use PowerShell, WSL, or a different OS.

## Structure

- `Client/` — React + Vite frontend
- `server/` — Node (Express) backend

## Prerequisites

- Node.js (v16+ recommended) and npm installed
- (Optional) MongoDB instance or MongoDB Atlas connection string

## Quick start (development)

Open two terminals (one for server, one for client).

1. Install and run the server

````cmd
cd server
npm install
# Create a `.env` file (see next section) then:
## Ecomm — repository quickstart

This repository contains two main parts:

- `Client/` — React app powered by Vite (frontend)
- `server/` — Express API (backend)

Below are straightforward steps to get both services running locally on Windows (cmd.exe). If you use a different shell or OS, adapt commands accordingly.

Prerequisites

- Node.js (v16 or newer) and npm
- A MongoDB connection (local or Atlas) if you want real data

Run locally (development)

1) Server

Open a terminal and run:

```cmd
cd server
npm install
# create server/.env with MONGO_URL and optional PORT
npm run dev
````

The server script uses `nodemon` for live reload and will listen on the port set in `server/.env` or `5000` by default.

2. Client

Open another terminal and run:

```cmd
cd Client
npm install
npm run dev
```

The frontend will start with Vite (commonly on `http://localhost:5173`). By default the client fetches API data from `http://localhost:5000/api` (see `Client/src/Utils/api.js`).

Environment variables (server)

Create `server/.env` with at least:

```
MONGO_URL=your_mongodb_connection_string
PORT=5000 # optional
```

Building the client for production

```cmd
cd Client
npm run build
```

This produces static files in `Client/dist` which you can serve with any static host or integrate into the server.

Quick commands summary

- Start server (dev): `cd server && npm install && npm run dev`
- Start client (dev): `cd Client && npm install && npm run dev`
- Build client: `cd Client && npm run build`

Recommendations (optional improvements)

- Add `server/.env.example` listing required environment variables.
- Use a Vite environment variable (for example `VITE_API_BASE`) instead of the hard-coded API URL in `Client/src/Utils/api.js`.
- Add a root script using `concurrently` or `docker-compose` to start both services with one command.

Want me to: add `server/.env.example`, convert the client to read `VITE_API_BASE`, or create a root `start` script? Reply with which option you prefer and I'll implement it.

---

Generated: November 24, 2025
