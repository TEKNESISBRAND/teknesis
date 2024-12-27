"use client";

import Project from "./Project";
import { IProject } from "./Home";

export default function Projects({
  showTitle,
  limit,
  projects,
}: {
  showTitle: boolean;
  limit?: number;
  projects?: IProject[];
}) {
  return (
    <section
      id="projects"
      className="bg-white px-[2rem] md:px-[10rem] overflow-x-hidden py-5 md:py-10"
    >
      {showTitle && (
        <div>
          <h2 className="text-[2.8rem] md:text-[4.8rem] max-w-[90rem] leading-[150%] text-[#4e4e4e] my-20 md:my-40">
            Here&apos;s a glimpse into some of the remarkable projects our web
            agency has had the privilege of working on.
          </h2>
        </div>
      )}
      <div>
        {projects &&
          (limit ? projects?.slice(0, limit) : projects).map(
            (project: any, i: number) => (
              <Project
                key={i}
                slug={project.slug}
                name={project.name}
                index={i}
                tags={project.tags}
                type={project.type}
              />
            )
          )}
        <div className="border-t-2 border-[#6e6e6e] border-opacity-15"></div>
      </div>
    </section>
  );
}
