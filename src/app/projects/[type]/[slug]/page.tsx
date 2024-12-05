"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/teknesis/utils/supabase";
import "./page.css";
import Link from "next/link";
import BrandProject from "@/teknesis/components/BrandProject";
import WebProject from "@/teknesis/components/WebProject";

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

  // console.log(project);

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
          {project.type === "brand" && <BrandProject project={project} />}
          {(project.type === "web" || project.type === "app") && (
            <WebProject project={project} />
          )}
        </>
      ) : (
        <div className="loader_container">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
}
