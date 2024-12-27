import React from "react";
import dynamic from "next/dynamic";
const ProjectsPage = dynamic(
  () => import("@/teknesis/components/ProjectsPage"),
  { ssr: false }
);

const Page = () => {
  return <> {typeof window !== "undefined" && <ProjectsPage />}</>;
};

export default Page;
