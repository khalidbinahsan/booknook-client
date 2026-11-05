import { Fraunces, Inter } from "next/font/google";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import AppToaster from "@/components/shared/AppToaster";
import { getCurrentUser } from "@/lib/session";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "BookNook | %s",
    default: "BookNook | Home",
  },
  description:
    "BookNook is a small online library. Add a book, borrow a book, return a book.",
};

// Applies the saved theme before the page paints, so there is no light/dark flash
const themeScript = `
(function () {
  try {
    var saved = localStorage.getItem("booknook-theme");
    if (saved) document.documentElement.setAttribute("data-theme", saved);
  } catch (e) {}
})();
`;

export default async function RootLayout({ children }) {
  const user = await getCurrentUser();
  const initialUser = user
    ? { id: user.id, name: user.name, email: user.email, image: user.image }
    : null;

  return (
    <html
      lang="en"
      data-theme="booknook"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      {/* suppressHydrationWarning: browser extensions (Grammarly etc.) add attributes to <body> */}
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Navbar initialUser={initialUser} />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
        <AppToaster />
      </body>
    </html>
  );
}
