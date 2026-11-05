import Link from "next/link";
import { FiArrowRight, FiUser } from "react-icons/fi";

// Text colour for each category badge
export const categoryColors = {
  Fiction: "text-secondary",
  Science: "text-info",
  History: "text-warning",
  Kids: "text-success",
  Others: "text-base-content/80",
};

// Every card has the same size: fixed image ratio, clamped title, button pinned to the bottom
export default function BookCard({ book }) {
  const available = book.availableCopies ?? 0;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-4/5 overflow-hidden bg-base-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={book.image}
          alt={`Cover of ${book.title}`}
          loading="lazy"
          className="size-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span
          className={`absolute left-3 top-3 rounded-full bg-base-100/90 px-3 py-1 text-xs font-semibold backdrop-blur ${
            categoryColors[book.category] || categoryColors.Others
          }`}
        >
          {book.category}
        </span>
        {available === 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-error px-3 py-1 text-xs font-semibold text-error-content">
            Not Available
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 min-h-14 text-xl font-bold leading-snug" title={book.title}>
          {book.title}
        </h3>
        <p className="mt-2 flex items-center gap-2 text-sm text-base-content/70">
          <FiUser className="size-4 shrink-0" />
          <span className="truncate">{book.author}</span>
        </p>
        <p className="mt-1 text-xs text-base-content/60">
          {available} of {book.totalCopies} {book.totalCopies === 1 ? "copy" : "copies"} available
        </p>

        <div className="mt-auto pt-5">
          <Link href={`/books/${book._id}`} className="btn btn-primary btn-sm w-full rounded-full">
            View Details
            <FiArrowRight className="size-4 transition group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
