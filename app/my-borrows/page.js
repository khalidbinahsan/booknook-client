import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { serverApiFetch } from "@/lib/api-server";
import MyBorrowsTable from "@/components/borrows/MyBorrowsTable";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export const metadata = {
  title: "My Borrows",
};

export default function MyBorrowsPage() {
  return (
    <section className="container-x py-14 md:py-20">
      <div className="mb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
          On your nightstand
        </p>
        <h1 className="section-title mt-2">My Borrows</h1>
        <p className="section-subtitle">
          Books you are reading right now. Return them when you are done so
          the next reader can enjoy them.
        </p>
      </div>

      <Suspense fallback={<LoadingSpinner message="Loading your borrowed books..." />}>
        <MyBorrows />
      </Suspense>
    </section>
  );
}

async function MyBorrows() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?callbackUrl=/my-borrows");

  const { data, status, fetchedAt } = await serverApiFetch("/borrows");

  if (status !== 200 || !Array.isArray(data)) {
    return (
      <p className="mx-auto max-w-lg rounded-2xl bg-error/10 px-6 py-4 text-center text-error">
        We could not load your borrowed books right now. Please try again shortly.
      </p>
    );
  }

  // "now" comes from the server so server and client render the same badges
  return <MyBorrowsTable initialBorrows={data} now={fetchedAt} />;
}
