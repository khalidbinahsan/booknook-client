import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { GiAncientColumns, GiBookshelf, GiMagnifyingGlass, GiSpellBook, GiBalloons } from "react-icons/gi";
import Reveal from "@/components/shared/Reveal";

const categories = [
  {
    name: "Fiction",
    icon: GiSpellBook,
    text: "Novels and short stories to get lost in.",
    tone: "from-secondary/20 to-secondary/5 text-secondary",
  },
  {
    name: "Science",
    icon: GiMagnifyingGlass,
    text: "Curious reads about how the world works.",
    tone: "from-info/20 to-info/5 text-info",
  },
  {
    name: "History",
    icon: GiAncientColumns,
    text: "People, places and moments that shaped us.",
    tone: "from-accent/25 to-accent/5 text-warning",
  },
  {
    name: "Kids",
    icon: GiBalloons,
    text: "Picture books and adventures for young readers.",
    tone: "from-success/20 to-success/5 text-success",
  },
  {
    name: "Others",
    icon: GiBookshelf,
    text: "Poetry, self-help, cooking and everything else.",
    tone: "from-primary/20 to-primary/5 text-primary",
  },
];

export default function TopCategories() {
  return (
    <section className="container-x py-20">
      <Reveal className="mb-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
          Find your shelf
        </p>
        <h2 className="section-title mt-2">Top Categories</h2>
        <p className="section-subtitle">
          Jump straight to the kind of book you are in the mood for.
        </p>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {categories.map(({ name, icon: Icon, text, tone }, index) => (
          <Reveal key={name} delay={index * 0.08} className="h-full">
            <Link
              href={`/books?category=${name}`}
              className={`group flex h-full flex-col rounded-2xl border border-base-300 bg-linear-to-br p-6 transition hover:-translate-y-1 hover:border-current hover:shadow-lg ${tone}`}
            >
              <div className="flex items-start justify-between">
                <Icon className="size-11" />
                <FiArrowUpRight className="size-5 opacity-0 transition group-hover:opacity-100" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-base-content">{name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-base-content/70">{text}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
