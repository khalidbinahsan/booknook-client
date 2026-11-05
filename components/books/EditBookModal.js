"use client";

import { useEffect, useRef } from "react";
import { FiX } from "react-icons/fi";
import { toast } from "sonner";
import { apiFetch, uploadToImgbb } from "@/lib/api";
import BookForm from "./BookForm";

// Edit form in a modal, pre-filled with the book's current data
export default function EditBookModal({ book, user, onClose, onSaved }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (book && dialog && !dialog.open) dialog.showModal();
    if (!book && dialog?.open) dialog.close();
  }, [book]);

  const handleSave = async ({ imageFile, ...fields }) => {
    const toastId = toast.loading("Saving your changes...");
    try {
      const body = { ...fields };
      if (imageFile) {
        toast.loading("Uploading the new cover...", { id: toastId });
        body.image = await uploadToImgbb(imageFile);
      }

      const updated = await apiFetch(`/books/${book._id}`, { method: "PATCH", body });
      toast.success(`"${updated.title}" was updated.`, { id: toastId });
      onSaved(updated);
    } catch (error) {
      toast.error(error.message || "Could not update the book.", { id: toastId });
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
    >
      <div className="modal-box w-11/12 max-w-5xl rounded-3xl p-6 sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-serif text-2xl font-bold">Edit Book</h3>
            <p className="text-sm text-base-content/60">Update the details and save.</p>
          </div>
          <button type="button" onClick={onClose} className="btn btn-ghost btn-sm btn-circle" aria-label="Close">
            <FiX className="size-5" />
          </button>
        </div>

        {book && (
          <BookForm
            key={book._id} // fresh form for each book
            user={user}
            initialBook={book}
            submitLabel="Save Changes"
            busyLabel="Saving..."
            onSubmit={handleSave}
            onCancel={onClose}
          />
        )}
      </div>
    </dialog>
  );
}
