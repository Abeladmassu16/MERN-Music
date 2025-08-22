Full-stack CRUD app for songs with statistics (per genre/artist/album).
Frontend: React + TypeScript + Redux Toolkit + Redux-Saga + Emotion + Styled System
Backend: Node + Express + MongoDB (Mongoose)
Genre filter + optional Docker 

⸻

✨ Features
	•	Songs CRUD: Title, Artist, Album, Genre (+ optional durationSec)
	•	Live updates (no page reload) via Redux-Saga refetch
	•	Statistics: totals + per-genre / per-artist / per-album
	•	Filter by genre
	•	Glassy mint UI (Emotion + Styled System)
	•	Configurable API base & paths via .env

⸻

🗂️ Repo layout
 repo-root/
├─ .gitignore
├─ README.md
├─ backend/
│  ├─ server.js (or app.js)
│  ├─ models/musicModel.js
│  ├─ controllers/songController.js
│  ├─ routes/music.js
│  ├─ package.json
│  ├─ Dockerfile
│  └─ docker-compose.yml   (optional, can live here or at root)
└─ front-end/
   └─ mint-glass-music/
      ├─ index.html
      ├─ src/
      │  ├─ api/ (client.ts, endpoints.ts)
      │  ├─ app/ (store, hooks)
      │  ├─ components/ (SongList, SongForm, FilterBar, StatsPanel, Layout)
      │  ├─ features/ (songs, stats, ui)
      │  ├─ theme.ts
      │  └─ vite-env.d.ts
      ├─ package.json
      ├─ tsconfig.json
      └─ vite.config.ts

🔑 Environment variables
Backend – backend/.env
PORT=4000
MONGO_URI=mongodb://localhost:27017/musicdb
# For Docker compose: MONGO_URI=mongodb://mongo:27017/musicdb
Frontend – front-end/mint-glass-music/.env
Matches current router (mounted at /api/music, songs at /, stats at /stats/all)
VITE_API_BASE_URL=http://localhost:4000/api/music
VITE_API_SONGS_PATH=/
VITE_API_STATS_PATH=/stats/all


✅ Prerequisites
	•	Node.js 18+ and npm
	•	MongoDB 6+ (local or Atlas)
(or run Mongo via Docker — see “Docker” below)

⸻

🚀 Getting started (local, no Docker)

0) Start MongoDB
	•	Local mongod or Docker one-liner:
docker run -p 27017:27017 -v mongo_data:/data/db mongo:6


1) Backend
cd backend
npm install
# create backend/.env (see above)
node server.js   # or: npm run start (if you add a script)
# API at http://localhost:4000

2) Frontend
cd front-end/mint-glass-music
npm install
# create .env (see above)
npm run dev
# Vite on http://localhost:5173



