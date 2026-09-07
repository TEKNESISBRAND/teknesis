import { Darker_Grotesque } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import Script from "next/script";

const GA_MEASUREMENT_ID = "G-4MJ9FDHWPL";

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
        {children}

        {/* Google tag (gtag.js) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
