import "server-only";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/$/, "");

// Public book list, fetched on the server (used by Home and All Books).
// Returns { books, error } so pages can show a friendly message if the API is down.
export async function fetchBooks(params = {}) {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== "")
  ).toString();

  try {
    const res = await fetch(`${API_URL}/books${query ? `?${query}` : ""}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`API responded with ${res.status}`);
    return { books: await res.json(), error: null };
  } catch (error) {
    console.error("fetchBooks failed:", error.message);
    return { books: [], error: "We could not load books right now. Please try again shortly." };
  }
}
