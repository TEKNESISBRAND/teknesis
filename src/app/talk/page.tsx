"use client";
import React, { MouseEventHandler, useRef, useState } from "react";
import Lottie from "lottie-react";
import talkbg from "../../../public/talkbg.json";
import { gsap } from "../../utils";
import Link from "next/link";

const page = () => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [mouseData, setMouseData] = useState({
    x: 0,
    y: 0,
  });

  const onMouseEnter: MouseEventHandler = (e) => {
    if (!elementRef.current || !e.currentTarget) return;
    const element = elementRef.current;

    const { left, top } = e.currentTarget.getBoundingClientRect();

    const { width } = element.getBoundingClientRect();

    const { x, y } = {
      x: e.clientX - left - width / 2,
      y: e.clientY - top,
    };

    gsap.to(element, {
      opacity: 1,
      scale: 1,
      x,
      y,
      overwrite: true,
      ease: "expo.out",
    });
  };

  const onMouseMove: MouseEventHandler = (e) => {
    if (!elementRef.current) return;

    const element = elementRef.current;

    const { width, height } = element.getBoundingClientRect();

    const { left, top } = e.currentTarget.getBoundingClientRect();

    const { x, y } = {
      x: e.clientX - left - width / 2,
      y: e.clientY - top - height / 2,
    };

    setMouseData({
      x,
      y,
    });

    gsap.to(element, {
      x,
      y,
      ease: "power2.out",
      duration: 0.4,
      overwrite: "auto",
      rotate: `${gsap.utils.clamp(-25, 25)(x - mouseData.x)}deg`,
      onComplete: () => {
        gsap.to(element, {
          rotate: 0,
          ease: "power2.out",
          duration: 0.2,
          overwrite: true,
        });
      },
    });
  };

  const onMouseLeave: MouseEventHandler = () => {
    if (!elementRef.current) return;

    const element = elementRef.current;

    setMouseData({
      x: 0,
      y: 0,
    });

    gsap.to(element, {
      opacity: 0,
      rotate: 0,
      scale: 0,
      duration: 0.8,
      x: 0,
      y: 0,
      overwrite: true,
      ease: "power2.out",
    });
  };
  return (
    <div
      className="h-[100vh] w-full bg-black relative"
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <Lottie
        animationData={talkbg}
        className="flex justify-center items-center h-full absolute top-0 left-0"
        loop={true}
      />

      <div className="w-full h-full bg-black/60 backdrop-opacity-10 backdrop-invert text-white relative flex flex-col gap-[50px] justify-center items-center">
        <div
          ref={elementRef}
          className="absolute z-10 p-[30px] pointer-events-none rounded-full bg-white overflow-hidden hidden md:block opacity-0 scale-0 top-0 left-0 w-[100px] h-[100px] mix-blend-difference"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            viewBox="0 0 24 24"
          >
            <path
              fill="#fff"
              d="m16.004 9.414l-8.607 8.607l-1.414-1.414L14.59 8H7.003V6h11v11h-2z"
            />
          </svg>
        </div>

        <p className="py-5 text-[4.4rem] md:text-[20.6rem] leading-none font-extrabold cursor-default w-full md:w-[50%] text-center">
          Have an idea?
        </p>

        <div className="flex flex-row gap-[20px] justify-center items-center">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSd0XwvaTpAp1Tv9P1_1G0iW21jDgaYHMZpi7nd28OYtnBvJxg/viewform"
            className="border bg-white text-[#1b1b1b] px-[40px] m-0 pb-[10px] flex flex-row items-center justify-center rounded-full leading-none border-[#white] text-[2rem] md:text-[5rem] h-[80px] w-max"
          >
            Let&apos;s talk
          </a>

          <Link
            href={"/"}
            className="border bg-transparent text-white px-[40px] m-0 pb-[10px] flex items-center justify-center rounded-full leading-none border-white text-[2rem] md:text-[5rem] h-[80px] w-max"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
