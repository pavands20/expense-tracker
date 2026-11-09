import { useSyncExternalStore } from "react";

import {
  apiFetch,
  clearSessionToken,
  getSessionToken,
  onUnauthorized,
  setSessionToken,
} from "@/lib/api";

export type Role = "Employee" | "Manager" | "Finance";
export type User = {
  id: string;
  full_name: string;
  email: string;
  role: Role;
  manager_id: string | null;
  is_active: boolean;
};
type LoginResponse = { token: string; token_type: string; expires_at: string; user: User };

const USER_KEY = "session_user";
const listeners = new Set<() => void>();

function load(): User | null {
  try {
    const raw = sessionStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

let current: User | null = load();

function setUser(user: User | null): void {
  current = user;
  try {
    if (user) sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    else sessionStorage.removeItem(USER_KEY);
  } catch {
    // Storage unavailable: the user is held in memory only.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

onUnauthorized(() => setUser(null));

export function useUser(): User | null {
  const user = useSyncExternalStore(subscribe, () => current);
  return getSessionToken() ? user : null;
}

export async function login(email: string, password: string): Promise<User> {
  const res = await apiFetch<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  setSessionToken(res.token);
  setUser(res.user);
  return res.user;
}

export async function logout(): Promise<void> {
  try {
    await apiFetch<void>("/auth/logout", { method: "POST" });
  } catch {
    // The session is dropped locally regardless.
  }
  clearSessionToken();
  setUser(null);
}
