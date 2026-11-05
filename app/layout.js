import { Fraunces, Inter } from "next/font/google";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
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

export default function RootLayout({ children }) {
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
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
