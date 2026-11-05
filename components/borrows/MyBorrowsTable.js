"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiBookOpen, FiRotateCcw } from "react-icons/fi";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import ConfirmModal from "@/components/shared/ConfirmModal";

const DAY_MS = 24 * 60 * 60 * 1000;

const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

function dueStatus(returnDate, now) {
  const daysLeft = Math.ceil((new Date(returnDate) - now) / DAY_MS);
  if (daysLeft < 0) return { label: `Overdue by ${-daysLeft} day${daysLeft === -1 ? "" : "s"}`, tone: "badge-error" };
  if (daysLeft === 0) return { label: "Due today", tone: "badge-warning" };
  if (daysLeft <= 3) return { label: `Due in ${daysLeft} day${daysLeft === 1 ? "" : "s"}`, tone: "badge-warning" };
  return { label: `${daysLeft} days left`, tone: "badge-success" };
}

export default function MyBorrowsTable({ initialBorrows, now }) {
  const router = useRouter();
  const [borrows, setBorrows] = useState(initialBorrows);
  const [returning, setReturning] = useState(null);
  const [busy, setBusy] = useState(false);

  const handleReturn = async () => {
    setBusy(true);
    try {
      await apiFetch(`/borrows/${returning._id}`, { method: "DELETE" });
      setBorrows((list) => list.filter((b) => b._id !== returning._id));
      toast.success(`Thanks for returning "${returning.bookTitle}"!`);
      setReturning(null);
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Could not return the book.");
    } finally {
      setBusy(false);
    }
  };

  if (!borrows.length) {
    return (
      <div className="mx-auto max-w-lg rounded-3xl border border-dashed border-base-300 px-6 py-14 text-center">
        <p className="text-lg font-semibold">You are not borrowing any books</p>
        <p className="mt-2 text-base-content/70">Find something good on the shelf and borrow it in one click.</p>
        <Link href="/books" className="btn btn-primary rounded-full mt-6 px-8">
          <FiBookOpen className="size-4" />
          Browse Books
        </Link>
      </div>
    );
  }

  return (
    <>
      <p className="mb-4 text-sm text-base-content/60">
        {borrows.length} {borrows.length === 1 ? "book" : "books"} borrowed
      </p>

      <div className="overflow-x-auto rounded-3xl border border-base-300 bg-base-100 shadow-sm">
        <table className="table">
          <thead className="bg-base-200 text-base-content/70">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th className="whitespace-nowrap">Borrow Date</th>
              <th className="whitespace-nowrap">Return Date</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {borrows.map((borrow) => {
              const status = dueStatus(borrow.returnDate, now);
              return (
                <tr key={borrow._id} className="hover:bg-base-200/50">
                  <td>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={borrow.bookImage} alt="" className="h-20 w-16 min-w-16 rounded-lg object-cover" />
                  </td>
                  <td className="min-w-48">
                    <Link href={`/books/${borrow.bookId}`} className="line-clamp-2 font-semibold hover:text-primary">
                      {borrow.bookTitle}
                    </Link>
                    {borrow.bookAuthor && (
                      <p className="truncate text-sm text-base-content/60">{borrow.bookAuthor}</p>
                    )}
                  </td>
                  <td className="whitespace-nowrap">{formatDate(borrow.borrowDate)}</td>
                  <td className="whitespace-nowrap">
                    <p>{formatDate(borrow.returnDate)}</p>
                    <span className={`badge badge-sm badge-soft mt-1 ${status.tone}`}>{status.label}</span>
                  </td>
                  <td className="text-right">
                    <button
                      type="button"
                      onClick={() => setReturning(borrow)}
                      className="btn btn-outline btn-primary btn-sm rounded-full whitespace-nowrap"
                    >
                      <FiRotateCcw className="size-4" />
                      Return Book
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        open={Boolean(returning)}
        title="Return this book?"
        message={returning ? `"${returning.bookTitle}" will go back on the shelf for the next reader.` : ""}
        confirmLabel="Return Book"
        tone="primary"
        busy={busy}
        onConfirm={handleReturn}
        onCancel={() => setReturning(null)}
      />
    </>
  );
}
