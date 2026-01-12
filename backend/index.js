import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import { getConfig } from "./src/config.js";
import { connectDB } from "./src/db.js";
import authRoutes from "./src/routes/auth.routes.js";
import jobsRoutes from "./src/routes/jobs.routes.js";
import { notFound, errorHandler } from "./src/middleware/error.js";

// Optional: support .env if present (but config.local.json also works)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

const cfg = getConfig();

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Backend working", env: cfg.nodeEnv });
});

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobsRoutes);

app.use(notFound);
app.use(errorHandler);

connectDB(cfg.mongoUri)
  .then(() => {
    app.listen(cfg.port, () => console.log(`Backend running on http://localhost:${cfg.port}`));
  })
  .catch((e) => {
    console.error("MongoDB error:", e.message);
    console.error("Fix: set MONGO_URI in backend/config.local.json (recommended) or backend/.env");
    process.exit(1);
  });
