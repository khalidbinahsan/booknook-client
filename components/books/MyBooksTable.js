"use client";

import { useState } from "react";
import Link from "next/link";
import { FiEdit2, FiEye, FiPlusCircle, FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import ConfirmModal from "@/components/shared/ConfirmModal";
import EditBookModal from "./EditBookModal";
import { categoryColors } from "./BookCard";

const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

export default function MyBooksTable({ initialBooks, user }) {
  const [books, setBooks] = useState(initialBooks);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [busy, setBusy] = useState(false);

  const handleSaved = (updated) => {
    setBooks((list) => list.map((b) => (b._id === updated._id ? updated : b)));
    setEditing(null);
  };

  const handleDelete = async () => {
    setBusy(true);
    try {
      await apiFetch(`/books/${deleting._id}`, { method: "DELETE" });
      setBooks((list) => list.filter((b) => b._id !== deleting._id));
      toast.success(`"${deleting.title}" was removed from the shelf.`);
      setDeleting(null);
    } catch (error) {
      toast.error(error.message || "Could not delete the book.");
    } finally {
      setBusy(false);
    }
  };

  if (!books.length) {
    return (
      <div className="mx-auto max-w-lg rounded-3xl border border-dashed border-base-300 px-6 py-14 text-center">
        <p className="text-lg font-semibold">You have not added any books yet</p>
        <p className="mt-2 text-base-content/70">Share one from your shelf and it will show up here.</p>
        <Link href="/add-book" className="btn btn-primary rounded-full mt-6 px-8">
          <FiPlusCircle className="size-4" />
          Add a Book
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-base-content/60">
          {books.length} {books.length === 1 ? "book" : "books"} on your shelf
        </p>
        <Link href="/add-book" className="btn btn-primary btn-sm rounded-full">
          <FiPlusCircle className="size-4" />
          Add Book
        </Link>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-base-300 bg-base-100 shadow-sm">
        <table className="table">
          <thead className="bg-base-200 text-base-content/70">
            <tr>
              <th>Book</th>
              <th className="hidden md:table-cell">Category</th>
              <th>Copies</th>
              <th className="hidden lg:table-cell">Added</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id} className="hover:bg-base-200/50">
                <td>
                  <div className="flex items-center gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={book.image} alt="" className="h-20 w-16 shrink-0 rounded-lg object-cover" />
                    <div className="min-w-0">
                      <p className="line-clamp-2 font-semibold">{book.title}</p>
                      <p className="truncate text-sm text-base-content/60">{book.author}</p>
                    </div>
                  </div>
                </td>
                <td className="hidden md:table-cell">
                  <span className={`font-medium ${categoryColors[book.category] || ""}`}>{book.category}</span>
                </td>
                <td className="whitespace-nowrap">
                  <span className="font-semibold">{book.availableCopies}</span>
                  <span className="text-base-content/60"> / {book.totalCopies}</span>
                </td>
                <td className="hidden whitespace-nowrap lg:table-cell">{formatDate(book.createdAt)}</td>
                <td>
                  <div className="flex justify-end gap-1">
                    <Link href={`/books/${book._id}`} className="btn btn-ghost btn-sm btn-circle" aria-label={`View ${book.title}`} title="View">
                      <FiEye className="size-4" />
                    </Link>
                    <button type="button" onClick={() => setEditing(book)} className="btn btn-ghost btn-sm rounded-full text-primary" title="Edit">
                      <FiEdit2 className="size-4" />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                    <button type="button" onClick={() => setDeleting(book)} className="btn btn-ghost btn-sm rounded-full text-error" title="Delete">
                      <FiTrash2 className="size-4" />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditBookModal book={editing} user={user} onClose={() => setEditing(null)} onSaved={handleSaved} />

      <ConfirmModal
        open={Boolean(deleting)}
        title="Delete this book?"
        message={deleting ? `"${deleting.title}" will be removed from BookNook for good. This cannot be undone.` : ""}
        confirmLabel="Yes, delete"
        busy={busy}
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
      />
    </>
  );
}
