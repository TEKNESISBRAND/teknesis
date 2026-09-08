"use client";
import React, { MouseEventHandler, useRef, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import talkbg from "../../../public/talkbg.json";
import { gsap } from "../../utils";
import ContactForm from "@/teknesis/components/ContactForm";

// Dynamically import the LottieAnimation component with SSR disabled
const LottieAnimation = dynamic(() => import("./LottieAnimation"), {
  ssr: false,
});

const Page = () => {
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
    <div className="min-h-screen w-full bg-black relative">
      <div className="fixed inset-0 w-full h-full">
        <Suspense fallback={null}>
          <LottieAnimation animationData={talkbg} />
        </Suspense>
      </div>

      <div className="relative w-full min-h-screen bg-black/60 backdrop-opacity-10 backdrop-invert text-white">
        <div className="mx-auto w-full max-w-[1600px] px-[24px] md:px-40 py-24 md:py-32 flex flex-col md:flex-row md:items-start gap-16 md:gap-24">
          {/* The magnetic blob lives here only — it would fight the form fields. */}
          <div
            className="md:flex-1 md:sticky md:top-32 relative"
            onMouseEnter={onMouseEnter}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
          >
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

            <h1 className="text-[5.6rem] md:text-[9rem] leading-none font-extrabold cursor-default">
              Have an idea?
            </h1>
            <p className="mt-8 text-[2.2rem] md:text-[2.6rem] leading-snug text-white/70 md:max-w-[80%]">
              Tell us what you&apos;re building. Share a few details and we&apos;ll
              come back to you with next steps.
            </p>
          </div>

          {/* The Lottie art is busy — the form needs its own ground to stay legible.
              A solid fill rather than backdrop-blur: blurring over an always-animating
              background recomposites every frame, which is costly on low-end mobile. */}
          <div className="md:flex-1 w-full bg-white rounded-[16px] md:rounded-[32px] p-10 md:p-16">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
