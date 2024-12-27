import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";

interface LottieAnimationProps {
  animationData: object; // Replace with the appropriate type for your animation data
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({ animationData }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      const animation = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData, // Use the passed animation data
      });

      return () => {
        animation.destroy();
      };
    }
  }, [animationData]);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
};

export default LottieAnimation;
