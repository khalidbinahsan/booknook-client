"use client";

import { Toaster } from "sonner";

// One toaster for the whole app. Use it anywhere with:
//   import { toast } from "sonner";
//   toast.success("Book added!");  toast.error("Something went wrong");
export default function AppToaster() {
  return (
    <Toaster
      position="top-center"
      richColors
      closeButton
      duration={3500}
      toastOptions={{
        style: { fontFamily: "var(--font-inter)", borderRadius: "0.9rem" },
      }}
    />
  );
}
