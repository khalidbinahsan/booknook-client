import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { serverApiFetch } from "@/lib/api-server";
import MyBooksTable from "@/components/books/MyBooksTable";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export const metadata = {
  title: "My Books",
};

export default function MyBooksPage() {
  return (
    <section className="container-x py-14 md:py-20">
      <div className="mb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
          Your contributions
        </p>
        <h1 className="section-title mt-2">My Books</h1>
        <p className="section-subtitle">
          Books you have added to BookNook. Edit their details or remove them
          from the shelf.
        </p>
      </div>

      <Suspense fallback={<LoadingSpinner message="Loading your books..." />}>
        <MyBooks />
      </Suspense>
    </section>
  );
}

async function MyBooks() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?callbackUrl=/my-books");

  const { data, status } = await serverApiFetch(`/books?email=${encodeURIComponent(user.email)}`);

  if (status !== 200 || !Array.isArray(data)) {
    return (
      <p className="mx-auto max-w-lg rounded-2xl bg-error/10 px-6 py-4 text-center text-error">
        We could not load your books right now. Please try again shortly.
      </p>
    );
  }

  return <MyBooksTable initialBooks={data} user={{ name: user.name, email: user.email }} />;
}
