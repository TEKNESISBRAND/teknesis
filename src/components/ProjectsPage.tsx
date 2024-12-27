"use client";

import Project from "@/teknesis/components/Project";
import { smoothScroll } from "@/teknesis/utils";
import Link from "next/link";
import { useLayoutEffect, useState } from "react";
import "../app/(withheader)/projects/[type]/[slug]/page.css";
import { collection, query, where } from "firebase/firestore";
import { IProject } from "@/teknesis/components/Home";
import { getDocs } from "firebase/firestore";
import { db } from "@/teknesis/utils/firebase";

export default function ProjectsPage() {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [error, setError] = useState<any>(null);
  const [projects, setProjects] = useState<IProject[] | null>(
    JSON.parse(localStorage.getItem("projects") || "[]")
  );

  const types = JSON.parse(localStorage.getItem("types") || "[]");

  useLayoutEffect(() => {
    (async () => {
      const destroy = await smoothScroll();
      return () => {
        destroy();
      };
    })();
  }, []);

  const getProjects = async (selectedType: string) => {
    const Projects: IProject[] = [];
    // console.log(selectedType);
    if (selectedType === "all") {
      const querySnapshot = await getDocs(collection(db, "projects"));
      querySnapshot.forEach((doc) => {
        Projects.push(doc.data() as IProject);
      });

      Projects.length > 0
        ? setProjects(Projects)
        : setError("No Project Found");
    } else {
      const q = query(
        collection(db, "projects"),
        where("type", "==", selectedType)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        Projects.push(doc.data() as IProject);
      });

      Projects.length > 0
        ? setProjects(Projects)
        : setError("No Project Found");
    }
  };

  useLayoutEffect(() => {
    localStorage.setItem("projectType", JSON.stringify(selectedType));
    setProjects(null);
    getProjects(selectedType);
  }, [selectedType]);

  if (error) {
    return (
      <>
        {error && (
          <div className="loader_container">
            <h1>{error}</h1>
            <Link href={`/`}>
              <button>Go back Home</button>
            </Link>
          </div>
        )}
      </>
    );
  }
  return (
    <>
      {projects ? (
        <section className="px-12 bg-white">
          <ul className="flex py-20">
            {projects &&
              types.map((type: string, index: number) => {
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
          {projects &&
            projects
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
      ) : (
        <div className="loader_container">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
}
