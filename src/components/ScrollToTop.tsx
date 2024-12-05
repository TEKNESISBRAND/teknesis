"use client";

import React, { useEffect, useState } from "react";
import { BiArrowToTop } from "react-icons/bi";

const ScrollToTop = () => {
  const [open, setOpen] = useState(false);
  const getScrollPosition = () => {
    const top = window.pageYOffset || document.documentElement.scrollTop;
    setOpen(() => {
      return top > 200 ? true : false;
    });
  };

  useEffect(() => {
    setInterval(getScrollPosition, 1000);
  });
  return (
    <div
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className={`${
        open ? "bottom-10" : "-bottom-28"
      } bg-black text-white fixed right-10 text-[20px] w-[50px] h-[50px] rounded-[8px] flex items-center justify-center cursor-pointer transition-all duration-1000`}
    >
      <BiArrowToTop size={30} />
    </div>
  );
};

export default ScrollToTop;
