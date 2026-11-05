import "server-only";
import { headers } from "next/headers";
import { unstable_rethrow } from "next/navigation";
import { auth } from "./auth";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/$/, "");

// Calls a protected Express route from a Server Component, using a JWT that
// BetterAuth issues for the current session.
// Returns { data, status, fetchedAt } - status 0 means the API could not be reached.
export async function serverApiFetch(path) {
  let token;
  try {
    ({ token } = await auth.api.getToken({ headers: await headers() }));
  } catch (error) {
    unstable_rethrow(error);
    return { data: null, status: 401 };
  }

  try {
    const res = await fetch(`${API_URL}${path}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const data = await res.json().catch(() => null);
    // fetchedAt: one fixed "now" so server and client render dates the same way
    return { data, status: res.status, fetchedAt: Date.now() };
  } catch (error) {
    unstable_rethrow(error);
    console.error("serverApiFetch failed:", error.message);
    return { data: null, status: 0 };
  }
}
