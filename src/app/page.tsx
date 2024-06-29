"use client";

import { smoothScroll } from "../utils";
import { useEffect, useLayoutEffect } from "react";
import {
  Faqs,
  Footer,
  Header,
  Hero,
  Projects,
  ServicesSection,
} from "../components";
import { supabase } from "../utils/supabase";

export default function Home() {
  useLayoutEffect(() => {
    (async () => {
      const destroy = await smoothScroll();
      return () => {
        destroy();
      };
    })();
  }, []);

  useEffect(() => {
    const getProjects = async () => {
      let { data: Projects }: any = await supabase.from("Projects").select("*");

      localStorage.setItem("projects", JSON.stringify(Projects));
    };

    getProjects();
  }, []);

  return (
    <main className="relative z-10">
      <Header />
      <Hero />
      <ServicesSection />
      <Projects showTitle limit={3} />
      <Faqs />
      <Footer />
    </main>
  );
}
