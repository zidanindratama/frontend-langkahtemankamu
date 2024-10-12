"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { IconType } from "react-icons/lib";

interface Platform {
  id: number;
  name: string;
  placeholder: string;
  url: string;
  icon: IconType;
}

export const platforms: Platform[] = [
  {
    id: 1,
    name: "Instagram",
    placeholder: "@langkahtemankamu",
    url: "https://www.instagram.com/langkahtemankamu",
    icon: FaInstagram,
  },
  {
    id: 2,
    name: "Twitter",
    placeholder: "@LangkahKamu",
    url: "https://x.com/LangkahKamu",
    icon: IoLogoTwitter,
  },
  {
    id: 3,
    name: "LinkedIn",
    placeholder: "Langkah Teman Kamu",
    url: "https://www.linkedin.com/company/langkahtemankamu",
    icon: FaLinkedin,
  },
  {
    id: 4,
    name: "E-Mail",
    placeholder: "info@langkahtemankamu.my.id",
    url: "info@langkahtemankamu.my.id",
    icon: MdEmail,
  },
];

const Platforms = () => {
  return (
    <div className="relative py-12 md:py-20 bg-white">
      <div className="flex flex-col max-w-7xl justify-center mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5 md:gap-10">
          <div className="">
            <Image
              src={"/main/Platform.png"}
              alt="Platforms"
              width={1000}
              height={1000}
            />
          </div>
          <div className="flex flex-col gap-5 md:gap-10">
            <h1 className="text-left font-bold text-lg md:text-2xl lg:text-4xl">
              PLATFORMS
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
              {platforms.slice(0, 3).map((platform) => {
                return (
                  <Link
                    target="_blank"
                    href={platform.url}
                    key={platform.id}
                    className="p-6 bg-[#C3E7FB] flex flex-col drop-shadow-sm rounded-sm shadow-md shadow-[#C3E7FB]/90 justify-center items-center"
                  >
                    <platform.icon className="w-12 h-12" />
                    <h1 className="font-bold text-base md:text-lg lg:text-xl my-3">
                      {platform.name}
                    </h1>
                    <p className="text-sm md:text-base">
                      {platform.placeholder}
                    </p>
                  </Link>
                );
              })}
              <Link
                href={`mailto:${platforms[3].url}`}
                className="p-6 bg-[#C3E7FB] flex flex-col drop-shadow-sm rounded-sm shadow-md shadow-[#C3E7FB]/90 justify-center items-center"
              >
                <MdEmail className="w-12 h-12" />
                <h1 className="font-bold text-base md:text-lg lg:text-xl my-3">
                  {platforms[3].name}
                </h1>
                <p className="text-sm md:text-base">
                  {platforms[3].placeholder}
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Platforms;
