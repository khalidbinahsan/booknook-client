"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiFetch, uploadToImgbb } from "@/lib/api";
import BookForm from "./BookForm";

export default function AddBookForm({ user }) {
  const router = useRouter();

  const handleAdd = async ({ imageFile, ...fields }) => {
    const toastId = toast.loading("Uploading the cover image...");
    try {
      const image = await uploadToImgbb(imageFile);
      toast.loading("Saving your book...", { id: toastId });

      const book = await apiFetch("/books", {
        method: "POST",
        body: { ...fields, image },
      });

      toast.success(`"${book.title}" was added to the shelf!`, { id: toastId });
      router.push("/my-books");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Could not add the book. Please try again.", { id: toastId });
    }
  };

  return <BookForm user={user} submitLabel="Add Book" busyLabel="Adding..." onSubmit={handleAdd} />;
}
