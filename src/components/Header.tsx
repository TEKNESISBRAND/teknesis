"use client";

import Image from "next/image";
import Contact from "./Contact";
import { usePathname, useRouter } from "next/navigation";
import { nav } from "../data";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import SideNav from "./SideNav";
import { useState } from "react";

export default function Header() {
  const router = useRouter();
  const pathName = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <header className="px-12 bg-white md:px-40 py-10">
      <nav className="flex justify-between items-center">
        <SideNav setIsMenuOpenFunc={setIsMenuOpen} isMenuOpen={isMenuOpen} />
        <div className="flex items-center gap-8">
          <HiMiniBars3BottomRight
            onClick={() => {
              setIsMenuOpen((open) => !open);
            }}
            size={25}
            className="cursor-pointer relative md:hidden"
          />
          <Image
            src="/logo.png"
            className="w-[39px] h-[29px] md:w-[49px] md:h-[39px]"
            width={49}
            height={39}
            alt="teknesis logo"
          />
        </div>

        <ul className="text-[2.6rem] absolute md:relative hidden md:flex text-[#1b1b1b]">
          {nav.map(({ name, link }, index) => (
            <li
              key={index}
              className={`ml-10 cursor-pointer ${
                link === pathName ? "font-bold" : "font-normal"
              }`}
              onClick={async () => router.push(link)}
            >
              {name[0].toUpperCase() + name.slice(1)}
            </li>
          ))}
        </ul>

        <Contact />
      </nav>
    </header>
  );
}
