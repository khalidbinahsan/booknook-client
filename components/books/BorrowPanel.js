"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiBookmark, FiCalendar, FiCheckCircle, FiMail, FiUser, FiX } from "react-icons/fi";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";

const DURATIONS = [7, 14, 21, 30];

function addDays(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
}

const formatDate = (d) =>
  d.toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" });

export default function BorrowPanel({ book, user, alreadyBorrowed }) {
  const router = useRouter();
  const dialogRef = useRef(null);
  const [days, setDays] = useState(7);
  const [busy, setBusy] = useState(false);

  const available = book.availableCopies ?? 0;
  const isOwner = user.email === book.addedBy?.email;

  const openModal = () => dialogRef.current?.showModal();
  const closeModal = () => dialogRef.current?.close();

  const handleConfirm = async () => {
    setBusy(true);
    try {
      await apiFetch("/borrows", {
        method: "POST",
        body: { bookId: book._id, returnDate: addDays(days).toISOString() },
      });
      toast.success(`You borrowed "${book.title}". Enjoy your reading!`);
      closeModal();
      router.refresh(); // reload copies + "already borrowed" state from the server
    } catch (error) {
      toast.error(error.message || "Could not borrow this book. Please try again.");
      if (error.status === 409 || error.status === 400) router.refresh();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-2xl border border-base-300 bg-base-200/60 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-base-content/60">Availability</p>
          <p className={`text-lg font-bold ${available > 0 ? "text-success" : "text-error"}`}>
            {available > 0
              ? `${available} of ${book.totalCopies} ${book.totalCopies === 1 ? "copy" : "copies"} available`
              : "Not Available"}
          </p>
        </div>

        {alreadyBorrowed ? (
          <Link href="/my-borrows" className="btn btn-success rounded-full px-6">
            <FiCheckCircle className="size-4" />
            You borrowed this
          </Link>
        ) : available > 0 ? (
          <button type="button" onClick={openModal} className="btn btn-primary rounded-full px-8">
            <FiBookmark className="size-4" />
            Borrow This Book
          </button>
        ) : (
          <button type="button" disabled className="btn rounded-full px-8">
            Not Available
          </button>
        )}
      </div>

      {isOwner && (
        <p className="mt-3 text-xs text-base-content/60">
          You added this book. You can still borrow a copy yourself.
        </p>
      )}

      {/* Borrow modal (native <dialog>, not the browser confirm) */}
      <dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box rounded-3xl p-0">
          <div className="flex items-start gap-4 border-b border-base-300 p-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={book.image} alt="" className="h-20 w-16 shrink-0 rounded-lg object-cover" />
            <div className="min-w-0 flex-1">
              <h3 className="text-xl font-bold leading-snug">Borrow this book</h3>
              <p className="mt-1 truncate text-base-content/70">{book.title}</p>
            </div>
            <button type="button" onClick={closeModal} className="btn btn-ghost btn-sm btn-circle" aria-label="Close">
              <FiX className="size-4" />
            </button>
          </div>

          <div className="space-y-4 p-6">
            <fieldset className="fieldset">
              <label htmlFor="borrow-name" className="fieldset-legend">Your Name</label>
              <label className="input w-full rounded-xl bg-base-200">
                <FiUser className="size-4 opacity-60" />
                <input id="borrow-name" value={user.name} readOnly className="grow cursor-not-allowed" />
              </label>
            </fieldset>

            <fieldset className="fieldset">
              <label htmlFor="borrow-email" className="fieldset-legend">Your Email</label>
              <label className="input w-full rounded-xl bg-base-200">
                <FiMail className="size-4 opacity-60" />
                <input id="borrow-email" value={user.email} readOnly className="grow cursor-not-allowed" />
              </label>
            </fieldset>

            <fieldset className="fieldset">
              <label htmlFor="borrow-days" className="fieldset-legend">Borrow for</label>
              <select
                id="borrow-days"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="select w-full rounded-xl"
              >
                {DURATIONS.map((d) => (
                  <option key={d} value={d}>{d} days</option>
                ))}
              </select>
              <p className="mt-1 flex items-center gap-2 text-sm text-base-content/70">
                <FiCalendar className="size-4" />
                Return by {formatDate(addDays(days))}
              </p>
            </fieldset>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-base-300 p-6 sm:flex-row sm:justify-end">
            <button type="button" onClick={closeModal} disabled={busy} className="btn btn-ghost rounded-full px-6">
              Cancel
            </button>
            <button type="button" onClick={handleConfirm} disabled={busy} className="btn btn-primary rounded-full px-8">
              {busy && <span className="loading loading-spinner loading-sm" />}
              Confirm Borrow
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button aria-label="Close">close</button>
        </form>
      </dialog>
    </div>
  );
}
