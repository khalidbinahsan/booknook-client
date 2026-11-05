import { Suspense } from "react";
import BookFilters, { CATEGORIES } from "@/components/books/BookFilters";
import BookGrid from "@/components/books/BookGrid";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export const metadata = {
  title: "All Books",
};

export default async function AllBooksPage({ searchParams }) {
  const params = await searchParams;
  const category = CATEGORIES.includes(params.category) ? params.category : "All";
  const search = typeof params.search === "string" ? params.search.trim().slice(0, 100) : "";

  return (
    <section className="container-x py-14 md:py-20">
      <div className="mb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
          The community shelf
        </p>
        <h1 className="section-title mt-2">All Books</h1>
        <p className="section-subtitle">
          Every book shared by BookNook readers. Filter by category or search
          for a title or author.
        </p>
      </div>

      <div className="mb-10 rounded-3xl border border-base-300 bg-base-100 p-4 sm:p-5 shadow-sm">
        <BookFilters category={category} search={search} />
      </div>

      {/* key: show the spinner again whenever the filter changes */}
      <Suspense
        key={`${category}|${search}`}
        fallback={<LoadingSpinner message="Pulling books off the shelf..." />}
      >
        <BookGrid category={category} search={search} />
      </Suspense>
    </section>
  );
}
