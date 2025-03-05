import { Darker_Grotesque } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";

const darkerGrotesque = Darker_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-grotesque",
  display: "swap",
  preload: true,
  fallback: ["serif"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Teknesis | Digital Agency",
  description:
    "Digital Agency specializing in web development, branding, and design",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${darkerGrotesque.variable} text-[2.66vw] md:text-[0.625vw]`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
