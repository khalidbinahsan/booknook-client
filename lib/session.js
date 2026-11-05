import "server-only";
import { headers } from "next/headers";
import { auth } from "./auth";

// Read the logged in user inside Server Components / route handlers.
export async function getCurrentUser() {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user ?? null;
}
