import Link from "next/link";
import { FiArrowLeft, FiBookOpen } from "react-icons/fi";

export const metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <section className="container-x flex-1 flex flex-col items-center justify-center py-20 text-center">
      <div className="relative">
        <p className="font-serif text-[7rem] sm:text-[10rem] font-bold leading-none text-base-300 select-none">
          404
        </p>
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid place-items-center size-20 rounded-2xl bg-primary text-primary-content shadow-lg rotate-[-8deg]">
            <FiBookOpen className="size-10" />
          </span>
        </span>
      </div>

      <h1 className="section-title mt-6">This page is missing from our shelf</h1>
      <p className="section-subtitle">
        Maybe it was borrowed and never returned, or the link has a typo. Let
        us take you back to the front desk.
      </p>

      <Link href="/" className="btn btn-primary rounded-full px-8 mt-8">
        <FiArrowLeft className="size-4" />
        Back to Home
      </Link>
    </section>
  );
}
