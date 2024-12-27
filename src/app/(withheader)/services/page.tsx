"use client";

import Lottie from "lottie-react";
import React, { useEffect } from "react";
import graphics from "../../../../public/graphics.json";
import branding from "../../../../public/branding.json";
import motion from "../../../../public/graphics.json";
import illustration from "../../../../public/graphics.json";
import webDev from "../../../../public/graphics.json";
import appDev from "../../../../public/graphics.json";
import mlAi from "../../../../public/graphics.json";

import AOS from "aos";
import "aos/dist/aos.css";

const AnimateInit = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return <></>;
};

const page = () => {
  const services = [
    { name: "graphic design", animation: graphics },
    { name: "full branding", animation: branding },
    { name: "motion design", animation: motion },
    { name: "illustration", animation: illustration },
    { name: "web development", animation: webDev },
    { name: "App development", animation: appDev },
    { name: "Ml and AI research and development", animation: mlAi },
  ];

  return (
    <div>
      <AnimateInit />
      <section className="text-left min-h-[5rem] bg-white pt-20 md:pt-60 md:text-center px-[2rem] md:px-[10rem] pb-10">
        <div className="flex flex-col px-8 pb-40 md:items-center">
          <h1 className="text-[6rem] mb-[1.2rem] text-[#1b1b1b] [font-kerning:none]  md:text-[14rem] max-w-[120rem] leading-none">
            All of our
            <span className="font-bold text-[#001219]"> SERVICES</span>
          </h1>
          <p className=" text-[2.4rem] md:text-[2.8rem] leading-[140%] opacity-70 max-w-[90rem]">
            Below are the services we offer
          </p>
        </div>

        <div className="flex flex-row flex-wrap gap-10 md:gap-20 w-full justify-between">
          {services.map((service, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-anchor-placement="top-center"
              className={`${
                index % 3 === 0
                  ? "mt-0"
                  : index % 3 === 1
                  ? "mt-[15rem]"
                  : "mt-[30rem]"
              } md:w-1/4 w-full cursor-pointer transition-all duration-300 hover:scale-100 bg-black text-white p-10 h-[50rem] flex flex-col justify-center items-center`}
            >
              <Lottie animationData={service.animation} loop={true} />
              <p className="text-center text-[2.4rem] md:text-[4rem] leading-[140%] uppercase font-bold">
                {service.name}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default page;
