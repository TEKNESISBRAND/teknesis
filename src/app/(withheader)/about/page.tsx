"use client";

import { ParallaxSection } from "@/teknesis/components";
import Image from "next/image";
import TextAnimation from "@/teknesis/components/TextAnimation";
import whatwedo from "@/teknesis/data/whatwedo.json";
import approaches from "@/teknesis/data/approach.json";
import { useLayoutEffect } from "react";
import { smoothScroll } from "@/teknesis/utils";

export default function AboutPage() {
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
      <section className="text-left min-h-[5rem] bg-white pt-20 md:pt-60 md:text-center">
        <div className="flex flex-col px-8 mb-20 md:items-center">
          <h1 className="text-[6rem] mb-[1.2rem] text-[#1b1b1b] [font-kerning:none]  md:text-[14rem] max-w-[120rem] leading-none">
            Welcome To{" "}
            <span className="font-bold text-[#001219]">TEKNESIS</span>
          </h1>
          <p className=" text-[2.4rem] md:text-[2.8rem] leading-[140%] opacity-70 max-w-[90rem]">
            We&apos;re a forward-thinking tech agency dedicated to empowering
            B2B2C businesses through innovative software solutions. Our mission
            is to drive growth, pride, and success for our clients, fostering
            meaningful connections with their customers.
          </p>
        </div>

        <div className="mt-20 md:mt-40 overflow-hidden w-full h-[50rem] md:h-[70rem]">
          <div className="bg-[#1b1b1b] w-full h-full shrink-0 overflow-hidden">
            <ParallaxSection>
              <Image
                src="/branding.png"
                alt="Branding"
                fill
                className="object-cover"
              />
            </ParallaxSection>
          </div>
        </div>

        <TextAnimation offset={"40%"} fromOpacity={1} toOpacity={0.3}>
          {(ref, parentRef) => {
            return (
              <section
                ref={parentRef}
                className="bg-[#1b1b1b] pt-20 md:h-[40rem] md:flex md:items-center md:justify-center"
              >
                <h2
                  ref={ref}
                  className="text-[#ffffff] [font-kerning:none] inline-block opacity-30 text-[3rem] px-8 md:text-[5.4rem] max-w-[96rem] md:text-center leading-[120%]"
                >
                  At Teknesis, we strive to:
                </h2>
              </section>
            );
          }}
        </TextAnimation>

        {whatwedo.map((what, index) => {
          return (
            <TextAnimation
              key={index}
              offset={"800%"}
              fromOpacity={1}
              toOpacity={0.1}
            >
              {(ref, parentRef) => {
                return (
                  <section
                    ref={parentRef}
                    className="bg-[#1b1b1b] pt-20 md:h-[50vh] md:flex md:items-center md:justify-around"
                  >
                    <div className="w-[40rem] relative hidden leading-none md:inline-block h-[20rem] object-cover rounded-full overflow-hidden">
                      {what.media.type === "video" && (
                        <video
                          loop
                          autoPlay
                          className="w-full h-full object-left-top object-cover"
                          src={what.media.src}
                        ></video>
                      )}

                      {what.media.type === "image" && (
                        <Image
                          className="w-full h-full object-left-top object-cover"
                          fill
                          alt={what.name}
                          src={what.media.src}
                        />
                      )}
                    </div>
                    <h2
                      ref={ref}
                      className="text-[#ffffff] [font-kerning:none] inline-block opacity-30 text-[3rem] px-8 md:text-[8rem] md:w-[70%] md:text-left leading-[120%]"
                    >
                      <span className="text-[1.5rem] md:text-[4rem] align-middle mr-4">{`(0${
                        index + 1
                      })`}</span>{" "}
                      {what.name}
                    </h2>
                  </section>
                );
              }}
            </TextAnimation>
          );
        })}
      </section>

      <section
        id="projects"
        className="bg-white px-[2rem] md:px-[10rem] overflow-x-hidden py-5 md:py-10"
      >
        <div>
          <h2 className="text-[2.8rem] md:text-[4.8rem] max-w-[90rem] leading-[150%] text-[#4e4e4e] my-20 md:my-40">
            Our Approach: We leverage strategic systems and cutting-edge tools
            to help businesses thrive. Our expert team will:
          </h2>
        </div>
        <div>
          {approaches.map((approach, index) => {
            return (
              <TextAnimation
                key={index}
                offset={"200%"}
                fromOpacity={1}
                toOpacity={0.1}
              >
                {(ref, parentRef) => {
                  return (
                    <>
                      <section
                        ref={parentRef}
                        className="pt-20 md:flex md:items-center md:justify-left"
                      >
                        <h2
                          ref={ref}
                          className="text-[#001219] [font-kerning:none] inline-block opacity-30 text-[3rem] px-8 mb-40 md:text-[10rem] leading-[120%]"
                        >
                          <span className="font-bold text-[#001219]">
                            {approach.title}:
                          </span>{" "}
                          {approach.description}
                        </h2>
                      </section>
                      <div className="border-t-2 border-[#6e6e6e] border-opacity-15"></div>
                    </>
                  );
                }}
              </TextAnimation>
            );
          })}
        </div>
      </section>

      <div className="bg-[#fff] flex flex-col px-8 mb-20 pb-20 md:items-center">
        <h1 className="text-[6rem] mb-[1.2rem] text-[#1b1b1b] [font-kerning:none] font-bold w-full md:text-[14rem] max-w-[150rem] text-center leading-none">
          Join the Teknesis journey and let&apos;s transform your business
          together!
        </h1>
      </div>
    </>
  );
}
