import Link from "next/link";

export default function Logo({ className = "" }) {
  return (
    <Link
      href="/"
      aria-label="BookNook home"
      className={`flex items-center gap-2 shrink-0 ${className}`}
    >
      <span className="grid place-items-center size-10 rounded-xl bg-primary text-primary-content shadow-sm">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-6"
          aria-hidden="true"
        >
          <path d="M12 6.5C10.2 5.2 7.6 4.6 4 4.6v13.2c3.6 0 6.2.6 8 1.9" />
          <path d="M12 6.5c1.8-1.3 4.4-1.9 8-1.9v13.2c-3.6 0-6.2.6-8 1.9" />
          <path d="M12 6.5v13.2" />
        </svg>
      </span>
      <span className="font-serif text-2xl font-bold tracking-tight text-base-content">
        Book<span className="text-secondary">Nook</span>
      </span>
    </Link>
  );
}
