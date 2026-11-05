import Form from "next/form";
import Link from "next/link";
import { FiSearch, FiX } from "react-icons/fi";

export const CATEGORIES = ["Fiction", "Science", "History", "Kids", "Others"];

function booksUrl({ category, search }) {
  const params = new URLSearchParams();
  if (category && category !== "All") params.set("category", category);
  if (search) params.set("search", search);
  const query = params.toString();
  return query ? `/books?${query}` : "/books";
}

// Search box + category pills. Both just change the URL (?search=&category=),
// so filtered pages can be shared and survive a reload.
export default function BookFilters({ category = "All", search = "" }) {
  const pillClass = (active) =>
    `btn btn-sm rounded-full ${active ? "btn-primary" : "btn-ghost bg-base-200 hover:bg-base-300"}`;

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <nav aria-label="Filter by category" className="flex flex-wrap gap-2">
        {["All", ...CATEGORIES].map((name) => (
          <Link
            key={name}
            href={booksUrl({ category: name, search })}
            scroll={false}
            className={pillClass(category === name)}
          >
            {name}
          </Link>
        ))}
      </nav>

      <Form action="/books" scroll={false} className="flex w-full gap-2 lg:max-w-sm">
        {category !== "All" && <input type="hidden" name="category" value={category} />}
        <label className="input w-full rounded-full">
          <FiSearch className="size-4 opacity-60" />
          <input
            type="search"
            name="search"
            defaultValue={search}
            placeholder="Search title or author"
            className="grow"
            aria-label="Search books by title or author"
          />
        </label>
        <button type="submit" className="btn btn-primary rounded-full">
          Search
        </button>
        {search && (
          <Link
            href={booksUrl({ category })}
            scroll={false}
            className="btn btn-ghost btn-circle"
            aria-label="Clear search"
          >
            <FiX className="size-4" />
          </Link>
        )}
      </Form>
    </div>
  );
}
