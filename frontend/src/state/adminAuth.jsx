import React, { createContext, useContext, useMemo, useState } from "react";

const AdminAuthContext = createContext(null);

const DEFAULT_CREDS = { username: "admin", password: "admin123" };
const CREDS_KEY = "admin_creds_v1";
const SESSION_KEY = "admin_session_v1";

function loadCreds() {
  const raw = localStorage.getItem(CREDS_KEY);
  if (!raw) {
    localStorage.setItem(CREDS_KEY, JSON.stringify(DEFAULT_CREDS));
    return DEFAULT_CREDS;
  }
  try {
    return JSON.parse(raw);
  } catch {
    localStorage.setItem(CREDS_KEY, JSON.stringify(DEFAULT_CREDS));
    return DEFAULT_CREDS;
  }
}

function loadSession() {
  return localStorage.getItem(SESSION_KEY) === "true";
}

export function AdminAuthProvider({ children }) {
  const [isAdminAuthed, setIsAdminAuthed] = useState(loadSession);

  const value = useMemo(() => {
    return {
      isAdminAuthed,
      login: (username, password) => {
        const creds = loadCreds();
        const ok = username === creds.username && password === creds.password;
        if (ok) {
          localStorage.setItem(SESSION_KEY, "true");
          setIsAdminAuthed(true);
        }
        return ok;
      },
      logout: () => {
        localStorage.setItem(SESSION_KEY, "false");
        setIsAdminAuthed(false);
      },
      changeCreds: ({ currentPassword, newUsername, newPassword }) => {
        const creds = loadCreds();
        if (currentPassword !== creds.password) return { ok: false, message: "Current password is wrong." };

        const updated = {
          username: (newUsername || creds.username).trim(),
          password: (newPassword || creds.password).trim(),
        };

        if (!updated.username || updated.username.length < 3) {
          return { ok: false, message: "Username must be at least 3 characters." };
        }
        if (!updated.password || updated.password.length < 6) {
          return { ok: false, message: "Password must be at least 6 characters." };
        }

        localStorage.setItem(CREDS_KEY, JSON.stringify(updated));
        return { ok: true, message: "Admin credentials updated successfully." };
      },
      getUsername: () => loadCreds().username,
    };
  }, [isAdminAuthed]);

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used inside AdminAuthProvider");
  return ctx;
}
