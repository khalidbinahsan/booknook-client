"use client";

import { useState } from "react";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";

export default function PasswordInput({ id = "password", hasError = false, ...props }) {
  const [visible, setVisible] = useState(false);

  return (
    <label className={`input w-full rounded-xl ${hasError ? "input-error" : ""}`}>
      <FiLock className="size-4 opacity-60" />
      <input
        id={id}
        name="password"
        type={visible ? "text" : "password"}
        className="grow"
        {...props}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="opacity-60 hover:opacity-100"
        aria-label={visible ? "Hide password" : "Show password"}
      >
        {visible ? <FiEyeOff className="size-4" /> : <FiEye className="size-4" />}
      </button>
    </label>
  );
}
