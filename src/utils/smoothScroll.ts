"use client";

import gsap from "./customGsap";
import { LenisProps } from "../types";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Lenis = async (props: LenisProps) => {
  return new (await import("@studio-freight/lenis")).default(props);
};

let lenisInstance: any = null;

const init = async () => {
  if (typeof window === "undefined") return () => {};

  const context = gsap.context(async () => {
    try {
      lenisInstance = await Lenis({
        duration: 2,
        easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        smoothWheel: true,
      });

      lenisInstance.on("scroll", () => {
        ScrollTrigger.update();
      });

      const loop = (time: DOMHighResTimeStamp) => {
        lenisInstance.raf(time);
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    } catch (error) {
      console.error("Error initializing Lenis:", error);
    }
  });

  return () => {
    if (lenisInstance) {
      lenisInstance.destroy();
    }
    context.revert();
  };
};

export default init;
