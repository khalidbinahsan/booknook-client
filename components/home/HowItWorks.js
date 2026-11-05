import { FiBookOpen, FiCheckCircle, FiRotateCcw, FiUserPlus } from "react-icons/fi";
import Reveal from "@/components/shared/Reveal";

const steps = [
  {
    icon: FiUserPlus,
    title: "Create an account",
    text: "Sign up with your email or Google in under a minute. Your profile keeps track of everything you borrow.",
  },
  {
    icon: FiBookOpen,
    title: "Pick a book",
    text: "Browse the shelf, open a book to read its details and check how many copies are free right now.",
  },
  {
    icon: FiCheckCircle,
    title: "Confirm the borrow",
    text: "Tap Borrow, confirm your details and the book is yours. We note the borrow date and your return date.",
  },
  {
    icon: FiRotateCcw,
    title: "Return and repeat",
    text: "Finished reading? Return it from My Borrows so the copy goes back on the shelf for the next reader.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-base-200 py-20">
      <div className="container-x">
        <Reveal className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
            Simple as one, two, three
          </p>
          <h2 className="section-title mt-2">How Borrowing Works</h2>
          <p className="section-subtitle">
            Add a book, borrow a book, return a book. Here is the whole journey
            from signing up to bringing a book back.
          </p>
        </Reveal>

        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, text }, index) => (
            <li key={title} className="h-full">
              <Reveal delay={index * 0.12} className="h-full">
                <div className="relative flex h-full flex-col rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <span className="absolute right-5 top-4 font-serif text-5xl font-bold text-base-300 select-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="grid size-14 place-items-center rounded-2xl bg-primary text-primary-content">
                    <Icon className="size-7" />
                  </span>
                  <h3 className="mt-6 text-xl font-bold">{title}</h3>
                  <p className="mt-3 leading-relaxed text-base-content/70">{text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
