import { FiBookOpen, FiRepeat, FiUsers } from "react-icons/fi";

const perks = [
  { icon: FiBookOpen, text: "Browse every book our readers have shared" },
  { icon: FiRepeat, text: "Borrow a title and return it when you finish" },
  { icon: FiUsers, text: "Add your own books to the community shelf" },
];

// Two-column card used by the Login and Register pages
export default function AuthShell({ title, subtitle, children }) {
  return (
    <section className="container-x flex-1 flex items-center justify-center py-12 md:py-16">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-xl lg:grid-cols-2">
        {/* Decorative side panel */}
        <div className="relative hidden lg:flex flex-col justify-between bg-primary p-10 text-primary-content">
          <div
            aria-hidden="true"
            className="absolute -right-16 -top-16 size-64 rounded-full bg-secondary/30 blur-2xl"
          />
          <div className="relative">
            <p className="text-sm uppercase tracking-[0.2em] opacity-80">
              BookNook Library
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-tight">
              Every shelf has a story waiting for you.
            </h2>
          </div>

          <ul className="relative mt-10 space-y-4">
            {perks.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <span className="grid place-items-center size-10 rounded-xl bg-primary-content/15">
                  <Icon className="size-5" />
                </span>
                <span className="opacity-90">{text}</span>
              </li>
            ))}
          </ul>

          <blockquote className="relative mt-10 border-l-2 border-accent pl-4 italic opacity-90">
            &ldquo;A library is not a luxury but one of the necessities of
            life.&rdquo;
            <span className="mt-1 block not-italic text-sm opacity-80">
              Henry Ward Beecher
            </span>
          </blockquote>
        </div>

        {/* Form side */}
        <div className="p-6 sm:p-10">
          <h1 className="font-serif text-3xl md:text-4xl font-bold">{title}</h1>
          {subtitle && (
            <p className="mt-2 text-base-content/70 leading-relaxed">{subtitle}</p>
          )}
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </section>
  );
}
