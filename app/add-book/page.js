import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import AddBookForm from "@/components/books/AddBookForm";

export const metadata = {
  title: "Add Book",
};

export default async function AddBookPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?callbackUrl=/add-book");

  return (
    <section className="container-x py-14 md:py-20">
      <div className="mb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
          Share your shelf
        </p>
        <h1 className="section-title mt-2">Add a Book</h1>
        <p className="section-subtitle">
          Put a book from your collection on the community shelf so other
          readers can borrow it.
        </p>
      </div>

      <div className="mx-auto max-w-5xl rounded-3xl border border-base-300 bg-base-100 p-6 shadow-lg sm:p-10">
        <AddBookForm user={{ name: user.name, email: user.email }} />
      </div>
    </section>
  );
}
