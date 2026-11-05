"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiLogOut, FiUser } from "react-icons/fi";
import { toast } from "sonner";
import { signOut } from "@/lib/auth-client";
import { clearTokenCache } from "@/lib/api";
import UserAvatar from "./UserAvatar";

export default function UserMenu({ user }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const menuRef = useRef(null);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handleLogout = async () => {
    setLoggingOut(true);
    const { error } = await signOut();
    clearTokenCache();
    setLoggingOut(false);
    setOpen(false);

    if (error) {
      toast.error(error.message || "Could not log out. Please try again.");
      return;
    }
    toast.success("You have been logged out. See you soon!");
    router.push("/");
    router.refresh();
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="btn btn-ghost btn-circle p-0"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Open user menu"
        title={user.name}
      >
        <UserAvatar user={user} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-3 w-64 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-xl z-50"
        >
          <div className="flex items-center gap-3 px-3 py-3">
            <UserAvatar user={user} size="size-11" />
            <div className="min-w-0">
              <p className="font-semibold truncate">{user.name}</p>
              <p className="text-xs text-base-content/60 truncate">{user.email}</p>
            </div>
          </div>
          <div className="my-1 h-px bg-base-300" />
          <Link
            href="/profile"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-base-200"
          >
            <FiUser className="size-4" />
            My Profile
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-error hover:bg-error/10"
          >
            {loggingOut ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              <FiLogOut className="size-4" />
            )}
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
