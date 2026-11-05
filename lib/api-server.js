import "server-only";
import { headers } from "next/headers";
import { auth } from "./auth";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/$/, "");

// Calls a protected Express route from a Server Component, using a JWT that
// BetterAuth issues for the current session.
// Returns { data, status } - status 0 means the API could not be reached.
export async function serverApiFetch(path) {
  let token;
  try {
    ({ token } = await auth.api.getToken({ headers: await headers() }));
  } catch {
    return { data: null, status: 401 };
  }

  try {
    const res = await fetch(`${API_URL}${path}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const data = await res.json().catch(() => null);
    return { data, status: res.status };
  } catch (error) {
    console.error("serverApiFetch failed:", error.message);
    return { data: null, status: 0 };
  }
}
