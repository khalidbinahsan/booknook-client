"use client";

import { FiMoon, FiSun } from "react-icons/fi";

export const LIGHT_THEME = "booknook";
export const DARK_THEME = "booknook-dark";

export default function ThemeToggle() {
  const toggleTheme = () => {
    const root = document.documentElement;
    const next =
      root.getAttribute("data-theme") === DARK_THEME ? LIGHT_THEME : DARK_THEME;

    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("booknook-theme", next);
    } catch {
      // storage can be blocked (private mode) - theme still switches for this visit
    }
  };

  // The icon is picked with the `dark:` variant, so it always matches the
  // theme set by the inline script - no state, no flicker on reload.
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="btn btn-ghost btn-circle"
      aria-label="Toggle light and dark theme"
      title="Toggle theme"
    >
      <FiMoon className="size-5 dark:hidden" />
      <FiSun className="size-5 hidden dark:block" />
    </button>
  );
}
