export default function LoadingSpinner({
  message = "Loading...",
  fullPage = false,
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center gap-4 ${
        fullPage ? "flex-1 min-h-[60vh]" : "py-16"
      }`}
    >
      <div className="relative grid place-items-center size-16">
        <span className="absolute inset-0 rounded-full border-4 border-base-300" />
        <span className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-secondary animate-spin" />
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-6 text-primary"
          aria-hidden="true"
        >
          <path d="M12 6.5C10.2 5.2 7.6 4.6 4 4.6v13.2c3.6 0 6.2.6 8 1.9" />
          <path d="M12 6.5c1.8-1.3 4.4-1.9 8-1.9v13.2c-3.6 0-6.2.6-8 1.9" />
          <path d="M12 6.5v13.2" />
        </svg>
      </div>
      <p className="text-sm font-medium text-base-content/70">{message}</p>
    </div>
  );
}
