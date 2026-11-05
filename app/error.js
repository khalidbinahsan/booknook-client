"use client";

import Link from "next/link";
import { FiRefreshCw } from "react-icons/fi";

export default function Error({ error, reset }) {
  return (
    <section className="container-x flex-1 flex flex-col items-center justify-center py-20 text-center">
      <h1 className="section-title">Something went wrong</h1>
      <p className="section-subtitle">
        {error?.message || "We could not load this page right now."} Please try
        again in a moment.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="btn btn-primary rounded-full px-8"
        >
          <FiRefreshCw className="size-4" />
          Try Again
        </button>
        <Link href="/" className="btn btn-outline btn-primary rounded-full px-8">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
