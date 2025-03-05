"use client";

import { smoothScroll } from "../utils";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  Faqs,
  Footer,
  Header,
  Hero,
  Projects,
  ServicesSection,
} from "../components";
import ScrollToTop from "../components/ScrollToTop";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";

export interface IProject {
  name: string;
  type: "brand" | "web" | "app";
  tags: string[];
  images: Record<string, string>;
  details: string[];
  brand_overview: string;
}

export default function Home() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const getProjects = async () => {
      try {
        let Projects: IProject[] = [];
        const querySnapshot = await getDocs(collection(db, "projects"));
        querySnapshot.forEach((doc) => {
          Projects.push(doc.data() as IProject);
        });

        setProjects(Projects);
        localStorage.setItem("projects", JSON.stringify(Projects));

        const types = Array.from(
          new Set(["all", ...Projects.map(({ type }: any) => type)])
        );
        localStorage.setItem("types", JSON.stringify(types));
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects(JSON.parse(localStorage.getItem("projects") || "[]"));
      }
    };

    getProjects();
  }, [isClient]);

  useLayoutEffect(() => {
    if (!isClient) return;

    let destroy: (() => void) | undefined;
    const initScroll = async () => {
      destroy = await smoothScroll();
    };
    initScroll();

    return () => {
      if (destroy) destroy();
    };
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <main className="relative z-10">
      <Header />
      <Hero />
      <ServicesSection />
      {projects && <Projects showTitle limit={3} projects={projects} />}
      <Faqs />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
