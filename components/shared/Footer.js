import Link from "next/link";
import { FaFacebookF, FaInstagram, FaGithub, FaXTwitter } from "react-icons/fa6";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import Logo from "./Logo";

const socials = [
  { href: "https://facebook.com", label: "Facebook", icon: FaFacebookF },
  { href: "https://x.com", label: "X", icon: FaXTwitter },
  { href: "https://instagram.com", label: "Instagram", icon: FaInstagram },
  { href: "https://github.com/khalidbinahsan", label: "GitHub", icon: FaGithub },
];

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/books", label: "All Books" },
  { href: "/add-book", label: "Add a Book" },
  { href: "/my-borrows", label: "My Borrows" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-base-200 border-t border-base-300">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="lg:col-span-2 max-w-sm">
          <Logo />
          <p className="mt-4 text-base-content/70 leading-relaxed">
            A small community library on the web. Share the books on your shelf,
            borrow what your neighbours are reading, and bring them back when
            you are done.
          </p>
          <div className="mt-6 flex gap-3">
            {socials.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="btn btn-circle btn-sm btn-ghost bg-base-100 hover:bg-primary hover:text-primary-content"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-lg font-semibold">Explore</h3>
          <ul className="mt-4 space-y-2">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-base-content/70 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold">Contact</h3>
          <ul className="mt-4 space-y-3 text-base-content/70">
            <li className="flex items-start gap-3">
              <FiMail className="mt-1 shrink-0 text-primary" />
              <a href="mailto:hello@booknook.app" className="hover:text-primary">
                hello@booknook.app
              </a>
            </li>
            <li className="flex items-start gap-3">
              <FiPhone className="mt-1 shrink-0 text-primary" />
              <a href="tel:+8801700000000" className="hover:text-primary">
                +880 1700-000000
              </a>
            </li>
            <li className="flex items-start gap-3">
              <FiMapPin className="mt-1 shrink-0 text-primary" />
              <span>House 12, Road 5, Dhanmondi, Dhaka</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-base-300">
        <p className="container-x py-5 text-center text-sm text-base-content/60">
          &copy; {year} BookNook. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
