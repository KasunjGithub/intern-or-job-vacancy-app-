import jwt from "jsonwebtoken";
import { getConfig } from "../config.js";

export function requireAuth(req, res, next) {
  try {
    const cfg = getConfig();
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) return res.status(401).json({ message: "Missing token" });

    const payload = jwt.verify(token, cfg.jwtSecret);
    req.user = payload; // { id, role, email, name }
    return next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid/expired token" });
  }
}
