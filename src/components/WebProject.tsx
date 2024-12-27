import React from "react";

const WebProject = ({ project }: any) => {
  console.log(project);
  return (
    <>
      <section className="text-[#1b1b1b] mt-20 md:mt-40 md:px-20 px-10">
        <h1 className="text-[5rem] md:text-[10rem] font-bold">
          {project.name}
        </h1>
        <h1 className="text-[5rem] md:text-[10rem] md:-mt-20 -mt-10 capitalize">
          {project.type}
        </h1>

        <video
          loop
          autoPlay
          muted
          className="w-full md:h-[60rem] h-[25rem] mt-20 md:mt-40 object-cover rounded-[20px] md:rounded-[60px]"
          src={project?.images?.video}
        ></video>

        <div className="mt-10 md:mt-20 gap-20 flex justify-between w-full md:flex-row flex-col">
          <div>
            <h2 className="text-[3.5rem] md:text-[7rem]">
              <span className="font-bold">Product</span> Overview
            </h2>
            <p className="md:text-[3rem] text-[2rem] leading-none font-medium md:text-left text-justify">
              {project?.brand_overview}
            </p>
          </div>
          <img
            className="object-cover rounded-[20px] md:rounded-[60px] md:h-[70rem] h-[40rem] md:w-[45%] w-full"
            src={project?.images?.image1}
            alt="project"
          />
        </div>

        {project.details &&
          project.details.splice(-1, 1).map((detail: any, index: number) => {
            return (
              <div
                key={index}
                className={`${
                  index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                } mt-10 md:mt-20 gap-20 flex justify-between w-full items-center flex-col`}
              >
                <div>
                  <p className="md:text-[3rem] text-[2rem] leading-none font-medium md:text-left text-justify">
                    {detail}
                  </p>
                </div>
                <img
                  className="object-cover rounded-[20px] md:rounded-[60px] md:h-[70rem] h-[40rem] w-full md:w-[45%]"
                  src={project?.images[`image${index + 2}`]}
                  alt="project"
                />
              </div>
            );
          })}

        <div className="my-20 md:my-40">
          <p className="md:text-[3rem] text-[2rem] mb-10 leading-none font-medium md:text-left text-justify">
            {project.details && project?.details[project?.details.length - 1]}
          </p>
        </div>

        <img
          className="w-full md:h-[70rem] h-[40rem] mt-20 md:mt-40 object-cover rounded-[20px] md:rounded-[60px] mb-20"
          src={project.images ? project?.images.image3 : ""}
          alt="project"
        />
      </section>
    </>
  );
};

export default WebProject;
