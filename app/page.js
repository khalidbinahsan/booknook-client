import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 flex items-center">
      <section className="container-x py-24 text-center">
        <h1 className="section-title">Welcome to BookNook</h1>
        <p className="section-subtitle">
          A small online library where readers share their shelves. Add a book,
          borrow a book, return a book.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/books" className="btn btn-primary rounded-full px-8">
            Browse Books
          </Link>
        </div>
      </section>
    </main>
  );
}
