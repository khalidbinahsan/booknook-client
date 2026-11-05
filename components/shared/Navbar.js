"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import { useSession } from "@/lib/auth-client";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import UserMenu from "./UserMenu";

const navLinks = [
  { href: "/", label: "Home", private: false },
  { href: "/books", label: "All Books", private: false },
  { href: "/add-book", label: "Add Book", private: true },
  { href: "/my-books", label: "My Books", private: true },
  { href: "/my-borrows", label: "My Borrows", private: true },
];

export default function Navbar({ initialUser = null }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();

  // The server already knows the user (initialUser), so the navbar is correct
  // on the very first paint after a reload. Once the client session loads it
  // takes over, so login / logout update the navbar instantly.
  const user = isPending ? initialUser : (session?.user ?? null);

  const closeMenu = () => setMenuOpen(false);

  const visibleLinks = navLinks.filter((link) => !link.private || user);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const linkClass = (href) =>
    `px-3 py-2 rounded-full text-sm font-medium transition-colors ${
      isActive(href)
        ? "bg-primary text-primary-content"
        : "text-base-content/80 hover:bg-base-200 hover:text-base-content"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/85 backdrop-blur">
      <nav className="container-x flex h-18 items-center justify-between gap-4">
        <Logo />

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-1">
          {visibleLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={linkClass(link.href)}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {user && <UserMenu user={user} />}

          {!user && (
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/login" className="btn btn-ghost rounded-full">
                Login
              </Link>
              <Link href="/register" className="btn btn-primary rounded-full">
                Register
              </Link>
            </div>
          )}

          <button
            type="button"
            className="btn btn-ghost btn-circle lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FiX className="size-6" /> : <FiMenu className="size-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-base-300 bg-base-100">
          <ul className="container-x flex flex-col gap-1 py-4">
            {visibleLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className={`block ${linkClass(link.href)}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {!user && (
              <li className="mt-3 flex gap-2 sm:hidden">
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="btn btn-outline btn-primary rounded-full flex-1"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={closeMenu}
                  className="btn btn-primary rounded-full flex-1"
                >
                  Register
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
