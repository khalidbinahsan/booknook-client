"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiImage, FiMail, FiUser } from "react-icons/fi";
import { toast } from "sonner";
import { signUp } from "@/lib/auth-client";
import GoogleButton from "./GoogleButton";
import PasswordInput from "./PasswordInput";

// Assignment rules: uppercase, lowercase, at least 6 characters
export function validatePassword(password) {
  if (password.length < 6) return "Password must be at least 6 characters long.";
  if (!/[A-Z]/.test(password)) return "Password must have at least one uppercase letter.";
  if (!/[a-z]/.test(password)) return "Password must have at least one lowercase letter.";
  return "";
}

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const image = String(data.get("photo") || "").trim();
    const password = String(data.get("password") || "");

    const pwError = validatePassword(password);
    setPasswordError(pwError);
    if (pwError) {
      toast.error(pwError);
      return;
    }

    setLoading(true);
    const { error } = await signUp.email({
      name,
      email,
      password,
      ...(image && { image }),
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Registration failed. Please try again.");
      return;
    }

    toast.success("Account created! Please log in to continue.");
    form.reset();
    router.push("/login");
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <fieldset className="fieldset">
          <label htmlFor="name" className="fieldset-legend">Full Name</label>
          <label className="input w-full rounded-xl">
            <FiUser className="size-4 opacity-60" />
            <input id="name" name="name" type="text" required placeholder="Your name" className="grow" />
          </label>
        </fieldset>

        <fieldset className="fieldset">
          <label htmlFor="email" className="fieldset-legend">Email</label>
          <label className="input w-full rounded-xl">
            <FiMail className="size-4 opacity-60" />
            <input id="email" name="email" type="email" required placeholder="you@example.com" className="grow" />
          </label>
        </fieldset>

        <fieldset className="fieldset">
          <label htmlFor="photo" className="fieldset-legend">Photo URL</label>
          <label className="input w-full rounded-xl">
            <FiImage className="size-4 opacity-60" />
            <input id="photo" name="photo" type="url" placeholder="https://i.ibb.co/your-photo.jpg" className="grow" />
          </label>
        </fieldset>

        <fieldset className="fieldset">
          <label htmlFor="password" className="fieldset-legend">Password</label>
          <PasswordInput
            required
            placeholder="At least 6 characters"
            autoComplete="new-password"
            hasError={Boolean(passwordError)}
            onChange={() => passwordError && setPasswordError("")}
          />
          {passwordError ? (
            <p className="text-error text-sm mt-1">{passwordError}</p>
          ) : (
            <p className="text-base-content/60 text-xs mt-1">
              Use 6+ characters with an uppercase and a lowercase letter.
            </p>
          )}
        </fieldset>

        <button type="submit" disabled={loading} className="btn btn-primary w-full rounded-full">
          {loading && <span className="loading loading-spinner loading-sm" />}
          Register
        </button>
      </form>

      <div className="divider text-sm text-base-content/60">or</div>

      <GoogleButton callbackURL="/" label="Sign up with Google" />

      <p className="text-center text-sm text-base-content/70">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
