import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Loads config from (1) environment variables OR (2) backend/config.local.json
// This avoids Windows ".env.txt" issues. You can still use .env if you want.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

function readJsonIfExists(filePath) {
  try {
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
  } catch (e) {
    console.warn(`Config file found but could not be read: ${filePath}`);
    console.warn(e?.message || e);
    return null;
  }
}

export function getConfig() {
  const localPath = path.join(projectRoot, "config.local.json");
  const local = readJsonIfExists(localPath) || {};

  const cfg = {
    port: Number(process.env.PORT || local.PORT || 5000),
    mongoUri: process.env.MONGO_URI || local.MONGO_URI || "",
    jwtSecret: process.env.JWT_SECRET || local.JWT_SECRET || "change_this_secret",
    nodeEnv: process.env.NODE_ENV || "development"
  };

  return cfg;
}
