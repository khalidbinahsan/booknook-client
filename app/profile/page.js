import Link from "next/link";
import { redirect } from "next/navigation";
import { FiBookOpen, FiCalendar, FiMail, FiPlusCircle, FiRepeat } from "react-icons/fi";
import { getCurrentUser } from "@/lib/session";
import UserAvatar from "@/components/shared/UserAvatar";

export const metadata = {
  title: "My Profile",
};

const shortcuts = [
  { href: "/add-book", label: "Add a Book", text: "Share a book from your shelf", icon: FiPlusCircle },
  { href: "/my-books", label: "My Books", text: "Edit or remove books you added", icon: FiBookOpen },
  { href: "/my-borrows", label: "My Borrows", text: "See and return borrowed books", icon: FiRepeat },
];

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?callbackUrl=/profile");

  const joined = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="container-x py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-lg">
          <div className="h-32 bg-gradient-to-r from-primary to-secondary" />
          <div className="px-6 pb-8 sm:px-10">
            <div className="-mt-14 flex flex-col items-center text-center sm:flex-row sm:items-end sm:text-left sm:gap-6">
              <UserAvatar
                user={{ name: user.name, image: user.image }}
                size="size-28"
                className="text-3xl ring-4 ring-base-100"
              />
              <div className="mt-4 sm:mt-0 sm:pb-2">
                <h1 className="font-serif text-3xl font-bold">{user.name}</h1>
                <p className="text-base-content/60">BookNook reader</p>
              </div>
            </div>

            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-2xl bg-base-200 p-4">
                <FiMail className="size-5 shrink-0 text-primary" />
                <div className="min-w-0">
                  <dt className="text-xs uppercase tracking-wide text-base-content/60">Email</dt>
                  <dd className="truncate font-medium">{user.email}</dd>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-base-200 p-4">
                <FiCalendar className="size-5 shrink-0 text-primary" />
                <div>
                  <dt className="text-xs uppercase tracking-wide text-base-content/60">Member since</dt>
                  <dd className="font-medium">{joined}</dd>
                </div>
              </div>
            </dl>
          </div>
        </div>

        <h2 className="section-title mt-12 text-center">Your shelf at a glance</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {shortcuts.map(({ href, label, text, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col rounded-2xl border border-base-300 bg-base-100 p-5 transition hover:-translate-y-1 hover:border-primary hover:shadow-md"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-content">
                <Icon className="size-5" />
              </span>
              <span className="mt-4 font-semibold">{label}</span>
              <span className="mt-1 text-sm text-base-content/60">{text}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
