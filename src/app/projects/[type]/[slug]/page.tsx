"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/teknesis/utils/supabase";
import "./page.css";
import Link from "next/link";

export default function ProjectPage() {
  const { slug, type } = useParams();
  const [project, setProject] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const getProjects = async () => {
      let { data: Projects, error }: any = await supabase
        .from("Projects")
        .select("*")
        // Filters
        .eq("type", type)
        .eq("slug", slug);

      error && setError(error.message || error);

      Projects.length > 0
        ? setProject(Projects[0])
        : setError("No Project Found");
    };

    getProjects();
  }, []);

  return (
    <>
      {error && (
        <div className="loader_container">
          <h1>{error}</h1>
          <Link href={`/projects`}>
            <button>Go back to Project</button>
          </Link>
        </div>
      )}
      {project ? (
        <>
          <img
            className="w-full h-full object-cover"
            src={project?.images?.header_image}
            alt="project"
          />

          <section className="text-[#1b1b1b] mt-20 md:mt-40 px-20">
            <div>
              <p className="text-[18px] md:text-[24px] leading-none font-medium">
                <span style={{ display: "block" }} className="mb-2 font-bold">
                  Brand Overview
                </span>
                {project?.brand_overview}
              </p>
            </div>

            <img
              className="w-full h-full mt-20 md:mt-40 object-cover"
              src={project?.images?.image1}
              alt="project"
            />

            <div
              className="mt-10 md:mt-20"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <img
                className="object-cover"
                style={{ width: "55%", borderRadius: "10px" }}
                src={project?.images?.image2}
                alt="project"
              />
              <img
                className="object-cover"
                style={{ width: "40%", borderRadius: "10%" }}
                src={project?.images?.image3}
                alt="project"
              />
            </div>

            <div className="mt-20 md:mt-40">
              <p className="text-[18px] md:text-[24px] leading-none font-medium">
                {project?.details[0]}
              </p>
            </div>

            <img
              className="w-full h-full mt-20 md:mt-40 object-cover"
              src={project?.images?.image4}
              alt="project"
            />

            <div
              className="mt-10 md:mt-20"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <img
                className="object-cover"
                style={{ width: "30%", borderRadius: "10px" }}
                src={project?.images?.image5}
                alt="project"
              />
              <img
                className="object-cover"
                style={{ width: "30%", borderRadius: "10%" }}
                src={project?.images?.image6}
                alt="project"
              />
              <img
                className="object-cover"
                style={{ width: "30%", borderRadius: "10%" }}
                src={project?.images?.image7}
                alt="project"
              />
            </div>

            <div className="my-20 md:my-40">
              {project.details.map((detail: any, index: number) => {
                if (index === 0) return;
                return (
                  <p className="text-[18px] md:text-[24px] mb-10 leading-none font-medium">
                    {detail}
                  </p>
                );
              })}
            </div>
          </section>

          <img
            className="w-full h-full object-cover"
            src={project?.images?.footer_image}
            alt="project"
          />
        </>
      ) : (
        <div className="loader_container">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
}
