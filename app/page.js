import Link from "next/link";

export default function Home() {
  return (
    <section className="container-x flex-1 flex flex-col items-center justify-center py-24 text-center">
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
  );
}
