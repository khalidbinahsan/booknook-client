"use client";

import { useState } from "react";

function getInitials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const initials = parts.slice(0, 2).map((p) => p[0]?.toUpperCase()).join("");
  return initials || "R";
}

// User photos can come from any host (Google, imgbb, a pasted URL), so a plain
// <img> is used with an initials fallback when the photo is missing or broken.
export default function UserAvatar({ user, size = "size-10", className = "" }) {
  const [broken, setBroken] = useState(false);
  const showImage = user?.image && !broken;

  return (
    <span
      className={`inline-grid place-items-center overflow-hidden rounded-full bg-secondary text-secondary-content font-semibold ring-2 ring-primary/30 ${size} ${className}`}
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={user.image}
          alt={user.name || "User photo"}
          referrerPolicy="no-referrer"
          className="size-full object-cover"
          onError={() => setBroken(true)}
        />
      ) : (
        <span aria-hidden="true">{getInitials(user?.name)}</span>
      )}
    </span>
  );
}
