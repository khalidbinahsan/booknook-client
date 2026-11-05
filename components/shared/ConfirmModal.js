"use client";

import { useEffect, useRef } from "react";
import { FiAlertTriangle } from "react-icons/fi";

// A styled confirm dialog (replaces the browser's window.confirm).
// Controlled with `open`; calls onConfirm / onCancel.
export default function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  tone = "error", // "error" | "primary"
  busy = false,
  onConfirm,
  onCancel,
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="modal modal-bottom sm:modal-middle"
      onCancel={(e) => {
        e.preventDefault(); // Esc key: let the parent decide
        if (!busy) onCancel();
      }}
    >
      <div className="modal-box rounded-3xl">
        <div className="flex items-start gap-4">
          <span
            className={`grid size-12 shrink-0 place-items-center rounded-2xl ${
              tone === "error" ? "bg-error/10 text-error" : "bg-primary/10 text-primary"
            }`}
          >
            <FiAlertTriangle className="size-6" />
          </span>
          <div>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="mt-2 leading-relaxed text-base-content/70">{message}</p>
          </div>
        </div>
        <div className="modal-action">
          <button type="button" onClick={onCancel} disabled={busy} className="btn btn-ghost rounded-full px-6">
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className={`btn rounded-full px-6 ${tone === "error" ? "btn-error" : "btn-primary"}`}
          >
            {busy && <span className="loading loading-spinner loading-sm" />}
            {confirmLabel}
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={() => !busy && onCancel()} />
    </dialog>
  );
}
