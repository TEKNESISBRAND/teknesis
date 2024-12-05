import React, { Dispatch, SetStateAction } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { nav } from "../data";
import { usePathname, useRouter } from "next/navigation";

const SideNav = ({
  setIsMenuOpenFunc,
  isMenuOpen,
}: {
  setIsMenuOpenFunc: Dispatch<SetStateAction<boolean>>;
  isMenuOpen: boolean;
}) => {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <div
      className={`${
        isMenuOpen ? "left-0 animate-fade" : "-left-[100%]"
      } w-full fixed top-0 z-20 h-full bg-white transition-all duration-300`}
    >
      <IoCloseCircleOutline
        onClick={() => {
          setIsMenuOpenFunc((open: boolean) => !open);
        }}
        size={25}
        className="absolute top-10 right-10 cursor-pointer"
      />

      <div className="flex gap-10 flex-col items-center justify-center h-full">
        {nav.map(({ name, link }, index) => {
          return (
            <div key={index}>
              <li
                className={`cursor-pointer list-none text-[5rem] ${
                  link === pathName ? "font-bold" : "font-normal"
                }`}
                onClick={async () => router.push(link)}
              >
                {name[0].toUpperCase() + name.slice(1)}
              </li>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideNav;
