import Link from "next/link";
import { FiArrowRight, FiPlusCircle } from "react-icons/fi";
import BookCard from "@/components/books/BookCard";
import { fetchBooks } from "@/lib/books-server";

// Server Component: loads the newest 6 books (sorted by createdAt, limited in MongoDB)
export default async function NewArrivals() {
  const { books, error } = await fetchBooks({ limit: 6 });

  if (error) {
    return (
      <p className="mx-auto max-w-lg rounded-2xl bg-error/10 px-6 py-4 text-center text-error">
        {error}
      </p>
    );
  }

  if (!books.length) {
    return (
      <div className="mx-auto max-w-lg rounded-3xl border border-dashed border-base-300 px-6 py-12 text-center">
        <p className="text-lg font-semibold">The shelf is empty for now</p>
        <p className="mt-2 text-base-content/70">Be the first reader to share a book.</p>
        <Link href="/add-book" className="btn btn-primary rounded-full mt-6 px-8">
          <FiPlusCircle className="size-4" />
          Add a Book
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link href="/books" className="btn btn-primary rounded-full px-8">
          See All Books
          <FiArrowRight className="size-4" />
        </Link>
      </div>
    </>
  );
}
