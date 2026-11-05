// Client-side helpers for talking to the Express API and imgbb.

export const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/$/, "");

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

// ---------- JWT from BetterAuth (cached until shortly before it expires) ----------
let tokenCache = { token: null, expiresAt: 0 };

function readExpiry(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
    return (payload.exp || 0) * 1000;
  } catch {
    return 0;
  }
}

export function clearTokenCache() {
  tokenCache = { token: null, expiresAt: 0 };
}

export async function getToken() {
  if (tokenCache.token && Date.now() < tokenCache.expiresAt - 60_000) {
    return tokenCache.token;
  }

  const res = await fetch("/api/auth/token", { credentials: "include", cache: "no-store" });
  if (!res.ok) {
    clearTokenCache();
    return null;
  }

  const { token } = await res.json();
  tokenCache = { token, expiresAt: readExpiry(token) };
  return token;
}

// ---------- Express API ----------
// apiFetch("/books", { method: "POST", body: {...} })
// auth: true (default) sends "Authorization: Bearer <jwt>"
export async function apiFetch(path, { method = "GET", body, auth = true } = {}) {
  const headers = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";

  if (auth) {
    const token = await getToken();
    if (!token) throw new ApiError("Your session has ended. Please log in again.", 401);
    headers.Authorization = `Bearer ${token}`;
  }

  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
  } catch {
    throw new ApiError("Cannot reach the BookNook server. Please try again shortly.", 0);
  }

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    if (res.status === 401) clearTokenCache();
    throw new ApiError(data?.message || `Request failed (${res.status})`, res.status);
  }
  return data;
}

// ---------- imgbb image upload ----------
const MAX_IMAGE_MB = 5;
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function uploadToImgbb(file) {
  const key = process.env.NEXT_PUBLIC_IMGBB_KEY;
  if (!key) throw new Error("Image upload is not configured (missing imgbb key).");
  if (!file) throw new Error("Please choose an image.");
  if (!IMAGE_TYPES.includes(file.type)) {
    throw new Error("Please choose a JPG, PNG, WEBP or GIF image.");
  }
  if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
    throw new Error(`Image must be smaller than ${MAX_IMAGE_MB} MB.`);
  }

  const form = new FormData();
  form.append("image", file);

  let res;
  try {
    res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
      method: "POST",
      body: form,
    });
  } catch {
    throw new Error("Image upload failed. Check your connection and try again.");
  }

  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.success) {
    throw new Error(data?.error?.message || "Image upload failed. Please try another image.");
  }
  return data.data.display_url || data.data.url;
}
