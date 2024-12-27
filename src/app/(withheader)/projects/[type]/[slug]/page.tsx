"use client";
import { useParams } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import "./page.css";
import Link from "next/link";
import BrandProject from "@/teknesis/components/BrandProject";
import WebProject from "@/teknesis/components/WebProject";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/teknesis/utils/firebase";
import { IProject } from "@/teknesis/app/page";
import { smoothScroll } from "@/teknesis/utils";

export default function ProjectPage() {
  const { slug } = useParams();
  const [project, setProject] = useState<IProject | null>(null);
  const [error, setError] = useState<any>(null);

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
      if (slug) {
        const docRef = doc(db, "projects", decodeURI(slug as string));
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProject(docSnap.data() as IProject);
        } else {
          setError("No Project Found");
        }

        error && setError(error.message || error);
      }
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
        <div className="bg-white">
          {project.type === "brand" && <BrandProject project={project} />}
          {(project.type === "web" || project.type === "app") && (
            <WebProject project={project} />
          )}
        </div>
      ) : (
        <div className="loader_container">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
}
