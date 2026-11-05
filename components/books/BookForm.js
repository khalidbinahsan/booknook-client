"use client";

import { useState } from "react";
import { FiBookOpen, FiCheckCircle, FiHash, FiMail, FiUploadCloud, FiUser } from "react-icons/fi";
import { CATEGORIES } from "./BookFilters";

const DESCRIPTION_MAX = 1000;

// Shared by "Add Book" and "Edit Book".
// onSubmit receives { title, author, category, description, totalCopies, imageFile }
// and should throw an Error with a readable message when it fails.
export default function BookForm({
  user,
  initialBook = null,
  submitLabel = "Add Book",
  busyLabel = "Saving...",
  onSubmit,
  onCancel,
}) {
  const isEdit = Boolean(initialBook);
  const [preview, setPreview] = useState(initialBook?.image || "");
  const [imageFile, setImageFile] = useState(null);
  const [description, setDescription] = useState(initialBook?.description || "");
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, image: "Please choose an image file." }));
      return;
    }
    setErrors((prev) => ({ ...prev, image: "" }));
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const values = {
      title: String(data.get("title") || "").trim(),
      author: String(data.get("author") || "").trim(),
      category: String(data.get("category") || ""),
      description: description.trim(),
      totalCopies: Number(data.get("totalCopies")),
      imageFile,
    };

    const nextErrors = {};
    if (!values.title) nextErrors.title = "Book title is required.";
    if (!values.author) nextErrors.author = "Author name is required.";
    if (!CATEGORIES.includes(values.category)) nextErrors.category = "Please pick a category.";
    if (!values.description) nextErrors.description = "Please add a short description.";
    if (!Number.isInteger(values.totalCopies) || values.totalCopies < 1) {
      nextErrors.totalCopies = "Total copies must be 1 or more.";
    }
    if (!isEdit && !imageFile) nextErrors.image = "Please upload a cover image.";

    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setBusy(true);
    try {
      await onSubmit(values);
      if (!isEdit) {
        form.reset();
        setDescription("");
        setPreview("");
        setImageFile(null);
      }
    } finally {
      setBusy(false);
    }
  };

  const errorText = (key) =>
    errors[key] ? <p className="mt-1 text-sm text-error">{errors[key]}</p> : null;

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-8 lg:grid-cols-[280px_1fr]">
      {/* Cover image */}
      <div>
        <span className="fieldset-legend text-sm font-semibold">Book Image</span>
        <label
          htmlFor={isEdit ? "edit-image" : "image"}
          className={`group relative mt-2 flex aspect-4/5 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed bg-base-200 text-center transition hover:border-primary ${
            errors.image ? "border-error" : "border-base-300"
          }`}
        >
          {preview ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="Cover preview" className="absolute inset-0 size-full object-cover" />
              <span className="absolute inset-x-0 bottom-0 bg-black/60 py-2 text-sm text-white opacity-0 transition group-hover:opacity-100">
                Click to change image
              </span>
            </>
          ) : (
            <span className="px-6 text-base-content/60">
              <FiUploadCloud className="mx-auto size-10 text-primary" />
              <span className="mt-3 block font-medium text-base-content">Upload a cover</span>
              <span className="mt-1 block text-xs">JPG, PNG or WEBP, up to 5 MB</span>
            </span>
          )}
        </label>
        <input
          id={isEdit ? "edit-image" : "image"}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleImage}
          className="sr-only"
        />
        {errorText("image")}
        {isEdit && !imageFile && (
          <p className="mt-2 text-xs text-base-content/60">Leave as is to keep the current cover.</p>
        )}
      </div>

      {/* Details */}
      <div className="grid gap-4 sm:grid-cols-2">
        <fieldset className="fieldset sm:col-span-2">
          <label htmlFor="title" className="fieldset-legend">Book Title</label>
          <label className={`input w-full rounded-xl ${errors.title ? "input-error" : ""}`}>
            <FiBookOpen className="size-4 opacity-60" />
            <input id="title" name="title" defaultValue={initialBook?.title} placeholder="e.g. The Silent River" className="grow" />
          </label>
          {errorText("title")}
        </fieldset>

        <fieldset className="fieldset">
          <label htmlFor="author" className="fieldset-legend">Author Name</label>
          <label className={`input w-full rounded-xl ${errors.author ? "input-error" : ""}`}>
            <FiUser className="size-4 opacity-60" />
            <input id="author" name="author" defaultValue={initialBook?.author} placeholder="Who wrote it?" className="grow" />
          </label>
          {errorText("author")}
        </fieldset>

        <fieldset className="fieldset">
          <label htmlFor="category" className="fieldset-legend">Category</label>
          <select
            id="category"
            name="category"
            defaultValue={initialBook?.category || ""}
            className={`select w-full rounded-xl ${errors.category ? "select-error" : ""}`}
          >
            <option value="" disabled>Choose a category</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errorText("category")}
        </fieldset>

        <fieldset className="fieldset">
          <label htmlFor="totalCopies" className="fieldset-legend">Total Copies</label>
          <label className={`input w-full rounded-xl ${errors.totalCopies ? "input-error" : ""}`}>
            <FiHash className="size-4 opacity-60" />
            <input
              id="totalCopies"
              name="totalCopies"
              type="number"
              min="1"
              max="1000"
              step="1"
              defaultValue={initialBook?.totalCopies ?? 1}
              className="grow"
            />
          </label>
          {errorText("totalCopies")}
        </fieldset>

        <div className="hidden sm:block" />

        <fieldset className="fieldset sm:col-span-2">
          <label htmlFor="description" className="fieldset-legend">Short Description</label>
          <textarea
            id="description"
            name="description"
            rows={4}
            maxLength={DESCRIPTION_MAX}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What is this book about? Why would another reader enjoy it?"
            className={`textarea w-full rounded-xl ${errors.description ? "textarea-error" : ""}`}
          />
          <div className="flex justify-between">
            {errorText("description") || <span />}
            <span className="text-xs text-base-content/50">
              {description.length}/{DESCRIPTION_MAX}
            </span>
          </div>
        </fieldset>

        <fieldset className="fieldset">
          <label htmlFor="ownerName" className="fieldset-legend">Your Name</label>
          <label className="input w-full rounded-xl bg-base-200">
            <FiUser className="size-4 opacity-60" />
            <input id="ownerName" value={user?.name || ""} readOnly className="grow cursor-not-allowed" />
          </label>
        </fieldset>

        <fieldset className="fieldset">
          <label htmlFor="ownerEmail" className="fieldset-legend">Your Email</label>
          <label className="input w-full rounded-xl bg-base-200">
            <FiMail className="size-4 opacity-60" />
            <input id="ownerEmail" value={user?.email || ""} readOnly className="grow cursor-not-allowed" />
          </label>
        </fieldset>

        <div className="mt-2 flex flex-col-reverse gap-3 sm:col-span-2 sm:flex-row sm:justify-end">
          {onCancel && (
            <button type="button" onClick={onCancel} disabled={busy} className="btn btn-ghost rounded-full px-8">
              Cancel
            </button>
          )}
          <button type="submit" disabled={busy} className="btn btn-primary rounded-full px-10">
            {busy ? <span className="loading loading-spinner loading-sm" /> : <FiCheckCircle className="size-4" />}
            {busy ? busyLabel : submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}
