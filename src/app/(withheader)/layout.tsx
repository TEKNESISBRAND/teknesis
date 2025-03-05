"use client";

import { Footer, Header } from "@/teknesis/components";
import ScrollToTop from "@/teknesis/components/ScrollToTop";

export default function WithHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
