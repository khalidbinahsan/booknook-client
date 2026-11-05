"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiMail } from "react-icons/fi";
import { toast } from "sonner";
import { signIn } from "@/lib/auth-client";
import GoogleButton from "./GoogleButton";
import PasswordInput from "./PasswordInput";

export default function LoginForm({ callbackUrl = "/" }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") || "").trim();
    const password = String(data.get("password") || "");

    setFormError("");
    setLoading(true);
    const { error } = await signIn.email({ email, password });
    setLoading(false);

    if (error) {
      const message =
        error.status === 401 || error.code === "INVALID_EMAIL_OR_PASSWORD"
          ? "Incorrect email or password."
          : error.message || "Login failed. Please try again.";
      setFormError(message);
      toast.error(message);
      return;
    }

    toast.success("Welcome back to BookNook!");
    router.push(callbackUrl);
    router.refresh();
  };

  const handleForgotPassword = () => {
    toast.info("Password reset is coming soon. Please contact hello@booknook.app for help.");
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <fieldset className="fieldset">
          <label htmlFor="email" className="fieldset-legend">Email</label>
          <label className="input w-full rounded-xl">
            <FiMail className="size-4 opacity-60" />
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="grow"
            />
          </label>
        </fieldset>

        <fieldset className="fieldset">
          <label htmlFor="password" className="fieldset-legend">Password</label>
          <PasswordInput
            required
            autoComplete="current-password"
            placeholder="Your password"
            hasError={Boolean(formError)}
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="link link-hover text-sm text-primary mt-1"
            >
              Forget Password?
            </button>
          </div>
        </fieldset>

        {formError && (
          <p role="alert" className="rounded-xl bg-error/10 px-4 py-2 text-sm text-error">
            {formError}
          </p>
        )}

        <button type="submit" disabled={loading} className="btn btn-primary w-full rounded-full">
          {loading && <span className="loading loading-spinner loading-sm" />}
          Login
        </button>
      </form>

      <div className="divider text-sm text-base-content/60">or</div>

      <GoogleButton callbackURL={callbackUrl} label="Login with Google" />

      <p className="text-center text-sm text-base-content/70">
        New to BookNook?{" "}
        <Link href="/register" className="font-semibold text-primary hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
