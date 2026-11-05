import { cache, Suspense } from "react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { FiArrowLeft, FiCalendar, FiLayers, FiUser } from "react-icons/fi";
import { getCurrentUser } from "@/lib/session";
import { serverApiFetch } from "@/lib/api-server";
import { categoryColors } from "@/components/books/BookCard";
import BorrowPanel from "@/components/books/BorrowPanel";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

// Fetch once per request, shared by generateMetadata and the page
const getBook = cache((id) => serverApiFetch(`/books/${id}`));

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { data, status } = await getBook(id);
  return { title: status === 200 ? data.title : "Book Details" };
}

export default async function BookDetailsPage({ params }) {
  const { id } = await params;

  // Check before streaming starts so a missing book returns a real 404 status
  const { status } = await getBook(id);
  if (status === 400 || status === 404) notFound();

  return (
    <section className="container-x py-10 md:py-16">
      <Link href="/books" className="btn btn-ghost btn-sm rounded-full mb-6">
        <FiArrowLeft className="size-4" />
        Back to All Books
      </Link>
      <Suspense fallback={<LoadingSpinner message="Opening the book..." />}>
        <BookDetails id={id} />
      </Suspense>
    </section>
  );
}

async function BookDetails({ id }) {
  const user = await getCurrentUser();
  if (!user) redirect(`/login?callbackUrl=/books/${id}`);

  const [{ data: book, status }, { data: borrows }] = await Promise.all([
    getBook(id),
    serverApiFetch("/borrows"),
  ]);

  if (status !== 200 || !book) {
    return (
      <p className="mx-auto max-w-lg rounded-2xl bg-error/10 px-6 py-4 text-center text-error">
        We could not load this book right now. Please try again shortly.
      </p>
    );
  }

  const alreadyBorrowed = Array.isArray(borrows) && borrows.some((b) => b.bookId === book._id);
  const addedOn = new Date(book.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="grid gap-10 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-14">
      <div className="mx-auto w-full max-w-sm lg:max-w-none">
        <div className="aspect-4/5 overflow-hidden rounded-3xl bg-base-200 shadow-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={book.image} alt={`Cover of ${book.title}`} className="size-full object-cover" />
        </div>
      </div>

      <div className="flex flex-col">
        <span
          className={`w-fit rounded-full bg-base-200 px-4 py-1 text-sm font-semibold ${
            categoryColors[book.category] || categoryColors.Others
          }`}
        >
          {book.category}
        </span>
        <h1 className="mt-4 font-serif text-4xl font-bold leading-tight md:text-5xl">{book.title}</h1>
        <p className="mt-3 flex items-center gap-2 text-lg text-base-content/70">
          <FiUser className="size-5" />
          by <span className="font-semibold text-base-content">{book.author}</span>
        </p>

        <div className="mt-8">
          <h2 className="text-xl font-bold">About this book</h2>
          <p className="mt-3 whitespace-pre-line leading-relaxed text-base-content/80">{book.description}</p>
        </div>

        <dl className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-base-300 p-4">
            <dt className="flex items-center gap-2 text-xs uppercase tracking-wide text-base-content/60">
              <FiUser className="size-4" /> Added by
            </dt>
            <dd className="mt-1 font-semibold">{book.addedBy?.name}</dd>
            <dd className="truncate text-sm text-base-content/60">{book.addedBy?.email}</dd>
          </div>
          <div className="rounded-2xl border border-base-300 p-4">
            <dt className="flex items-center gap-2 text-xs uppercase tracking-wide text-base-content/60">
              <FiCalendar className="size-4" /> Added on
            </dt>
            <dd className="mt-1 font-semibold">{addedOn}</dd>
          </div>
          <div className="rounded-2xl border border-base-300 p-4">
            <dt className="flex items-center gap-2 text-xs uppercase tracking-wide text-base-content/60">
              <FiLayers className="size-4" /> Total copies
            </dt>
            <dd className="mt-1 font-semibold">{book.totalCopies}</dd>
          </div>
        </dl>

        <div className="mt-8">
          <BorrowPanel
            book={book}
            user={{ name: user.name, email: user.email }}
            alreadyBorrowed={alreadyBorrowed}
          />
        </div>
      </div>
    </article>
  );
}
