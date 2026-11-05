"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { signIn } from "@/lib/auth-client";

export default function GoogleButton({ callbackURL = "/", label = "Continue with Google" }) {
  const [loading, setLoading] = useState(false);

  const handleGoogle = async () => {
    setLoading(true);
    const { error } = await signIn.social({
      provider: "google",
      callbackURL,
      errorCallbackURL: "/login",
    });

    // On success the browser is redirected to Google, so we only handle errors
    if (error) {
      toast.error(error.message || "Google sign in is not available right now.");
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogle}
      disabled={loading}
      className="btn btn-outline w-full rounded-full border-base-300 bg-base-100 hover:bg-base-200 hover:border-base-300 hover:text-base-content"
    >
      {loading ? (
        <span className="loading loading-spinner loading-sm" />
      ) : (
        <FcGoogle className="size-5" />
      )}
      {label}
    </button>
  );
}
