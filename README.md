# MERN Intern & Job Vacancy App (Responsive)

Folders:
- `backend/` Express + MongoDB + JWT
- `frontend/` React (Vite) + Tailwind (mobile responsive)

## Run (Step-by-step)

### 1) Backend config (NO .env needed)
1. Copy `backend/config.local.json.example` -> `backend/config.local.json`
2. Put your MongoDB URI in `backend/config.local.json`

### 2) Start backend
```bash
cd backend
npm install
npm run dev
```
Test: http://localhost:5000/api/health

### 3) Start frontend
```bash
cd ../frontend
npm install
```

Create `frontend/.env` (or copy from `.env.example`) and set:
```
VITE_API_URL=http://localhost:5000
```

Run:
```bash
npm run dev
```

Open: http://localhost:3000

## Demo accounts
Register from UI as:
- Candidate (apply)
- Employer (post jobs)

## Notes
- This is MVP structure. You can extend with CV upload, saved jobs, application tracking list, admin moderation, etc.
