"use client";

import Image from "next/image";
import React from "react";
import { navLinks } from "./Navbar";
import Link from "next/link";
import { Button } from "../ui/button";
import { platforms } from "./Platforms";

const Footer = () => {
  return (
    <>
      <div className="relative py-12 md:py-20 bg-blueLTK">
        <div className="flex flex-col max-w-7xl justify-center mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5 md:gap-10">
            <div className="md:col-span-3">
              <Image
                src={"/main/Logo-LTK.png"}
                alt="Logo LTK"
                width={300}
                height={300}
              />
              <p className="md:max-w-sm text-sm md:text-base text-white">
                Creating a collaborative space for youth worldwide to contribute
                to the actualization of sustainable development goals.
              </p>
            </div>
            <div className="flex flex-col text-white">
              <h1 className="font-bold text-base md:text-lg lg:text-xl mb-2 md:mb-5">
                Links
              </h1>
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  return (
                    <Link
                      href={link.href}
                      key={link.id}
                      className="hover:text-yellowLTK"
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col text-white">
                <h1 className="font-bold text-base md:text-lg lg:text-xl mb-2 md:mb-5">
                  Address
                </h1>
                <div className="flex flex-col gap-2">
                  <h1 className="hover:text-yellowLTK">
                    Kota Administrasi Jakarta Selatan, DKI Jakarta
                  </h1>
                </div>
              </div>
              <div className="flex flex-col text-white">
                <h1 className="font-bold text-base md:text-lg lg:text-xl mb-2 md:mb-5">
                  E-mail
                </h1>
                <div className="flex flex-col gap-2">
                  <Link
                    href={`mailto:info@langkahtemankamu.my.id`}
                    className="hover:text-yellowLTK"
                  >
                    info@langkahtemankamu.my.id
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative py-6 md:py-10 bg-[#095882]">
        <div className="flex flex-col max-w-7xl justify-center mx-auto px-6">
          <div className="flex flex-col-reverse md:flex-row gap-5 justify-between items-center">
            <div className="flex flex-col text-white">
              <h1 className="text-xs md:text-sm">
                &copy; 2024 Langkah Teman Kamu
              </h1>
            </div>
            <div className="flex flex-row items-center gap-5">
              {platforms.slice(0, 3).map((platform) => {
                return (
                  <Button
                    variant={"yellowLTK"}
                    size={"icon"}
                    asChild
                    key={platform.id}
                  >
                    <Link target="_blank" href={platform.url}>
                      <platform.icon className="w-5 h-5" />
                    </Link>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
