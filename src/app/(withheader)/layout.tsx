import { Darker_Grotesque } from "next/font/google";
import "../globals.css";
import { Metadata } from "next";
import { Footer, Header } from "@/teknesis/components";
import ScrollToTop from "@/teknesis/components/ScrollToTop";

const darkerGrotesque = Darker_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-grotesque",
  // display: "swap",
  // preload: true,
  fallback: ["serif"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Teknesis | Digital Agency",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="text-[2.66vw] md:text-[0.625vw]">
      <body
        className={`${darkerGrotesque.variable} font-sans`}
        suppressHydrationWarning
      >
        <Header />
        <ScrollToTop />
        {children}
        <Footer />
      </body>
    </html>
  );
}
