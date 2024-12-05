import React from "react";

const BrandProject = ({ project }: any) => {
  return (
    <>
      <img
        className="w-full h-full object-cover"
        src={project?.images?.header_image}
        alt="project"
      />

      <section className="text-[#1b1b1b] mt-20 md:mt-40 px-20">
        <div>
          <p className="text-[18px] md:text-[24px] leading-none font-medium">
            <span className="mb-2 font-bold block text-[3.5rem] md:text-[7rem]">
              Brand Overview
            </span>
            <span className="block md:text-[3rem] text-[2rem] leading-none font-medium md:text-left text-justify">
              {project?.brand_overview}
            </span>
          </p>
        </div>

        <img
          className="w-full h-full mt-20 md:mt-40 object-cover rounded-[20px] md:rounded-[60px]"
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
            className="object-cover rounded-[20px] md:rounded-[60px]"
            style={{ width: "55%" }}
            src={project?.images?.image2}
            alt="project"
          />
          <img
            className="object-cover rounded-[20px] md:rounded-[60px]"
            style={{ width: "40%" }}
            src={project?.images?.image3}
            alt="project"
          />
        </div>

        <div className="mt-20 md:mt-40">
          <p className="md:text-[3rem] text-[2rem] leading-none font-medium md:text-left text-justify">
            {project?.details[0]}
          </p>
        </div>

        <img
          className="w-full h-full mt-20 md:mt-40 object-cover rounded-[20px] md:rounded-[60px]"
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
            className="object-cover rounded-[20px] md:rounded-[60px]"
            style={{ width: "30%" }}
            src={project?.images?.image5}
            alt="project"
          />
          <img
            className="object-cover rounded-[20px] md:rounded-[60px]"
            style={{ width: "30%" }}
            src={project?.images?.image6}
            alt="project"
          />
          <img
            className="object-cover rounded-[20px] md:rounded-[60px]"
            style={{ width: "30%" }}
            src={project?.images?.image7}
            alt="project"
          />
        </div>

        <div className="my-20 md:my-40">
          {project.details.map((detail: any, index: number) => {
            if (index === 0) return;
            return (
              <p className="mb-10 md:text-[3rem] text-[2rem] leading-none font-medium md:text-left text-justify">
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
  );
};

export default BrandProject;
