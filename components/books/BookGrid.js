import Link from "next/link";
import BookCard from "./BookCard";
import { fetchBooks } from "@/lib/books-server";

export default async function BookGrid({ category, search }) {
  const { books, error } = await fetchBooks({ category, search });

  if (error) {
    return (
      <p className="mx-auto max-w-lg rounded-2xl bg-error/10 px-6 py-4 text-center text-error">
        {error}
      </p>
    );
  }

  if (!books.length) {
    const filtered = (category && category !== "All") || search;
    return (
      <div className="mx-auto max-w-lg rounded-3xl border border-dashed border-base-300 px-6 py-14 text-center">
        <p className="text-lg font-semibold">
          {filtered ? "No books match your search" : "No books on the shelf yet"}
        </p>
        <p className="mt-2 text-base-content/70">
          {filtered
            ? "Try another category or a different word."
            : "Be the first reader to share a book with the community."}
        </p>
        <Link
          href={filtered ? "/books" : "/add-book"}
          className="btn btn-primary rounded-full mt-6 px-8"
        >
          {filtered ? "Show All Books" : "Add a Book"}
        </Link>
      </div>
    );
  }

  return (
    <>
      <p className="mb-6 text-sm text-base-content/60">
        Showing {books.length} {books.length === 1 ? "book" : "books"}
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </>
  );
}
