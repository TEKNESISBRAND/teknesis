"use client";

import { Header } from "@/teknesis/components";
import Project from "@/teknesis/components/Project";
import { smoothScroll } from "@/teknesis/utils";
import { useLayoutEffect, useState } from "react";

export default function ProjectsPage() {
  const [selectedType, setSelectedType] = useState<string>("all");
  const projects = JSON.parse(localStorage.getItem("projects") || "[]");
  useLayoutEffect(() => {
    (async () => {
      const destroy = await smoothScroll();
      return () => {
        destroy();
      };
    })();
  }, []);
  return (
    <>
      <Header />
      <section className="px-12">
        <ul className="flex py-20">
          {Array.from(
            new Set(["all", ...projects.map(({ type }: any) => type)])
          ).map((type, index) => {
            return (
              <li
                key={index}
                onClick={() => setSelectedType(type)}
                className={`text-[2.5rem] py-6 px-10 rounded-full ${
                  selectedType === type
                    ? "bg-[#1b1b1b] text-white"
                    : "text-[#1b1b1b] bg-transparent"
                } cursor-pointer mr-2`}
              >
                {type[0].toUpperCase() + type.slice(1)}
              </li>
            );
          })}
        </ul>
        {projects
          .filter(({ type }: any) =>
            selectedType && selectedType !== "all"
              ? selectedType === type
              : true
          )
          .map(({ name, tags, slug, type }: any, index: number) => {
            return (
              <Project
                key={index}
                slug={slug}
                index={index}
                name={name}
                tags={tags}
                type={type}
              />
            );
          })}
      </section>
    </>
  );
}
