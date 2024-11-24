import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative py-12 md:py-20 flex flex-col bg-blueLTK text-white">
      <div className="flex flex-col max-w-7xl justify-center mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center md:gap-10 mb-5 md:mb-10">
          <div className="flex flex-col">
            <h3 className="uppercase text-sm md:text-base font-semibold">
              Our Story
            </h3>
            <h1 className="font-bold text-2xl md:text-3xl xl:text-4xl mt-2 md:mt-5">
              Get to Know About Us Better
            </h1>
          </div>
          <div className="flex flex-col">
            <p className="font-light text-sm md:text-base mt-3">
              Langkah Teman Kamu was founded to serve as an initiator in
              creating a collaborative space for youths committed to{" "}
              <span className="text-yellowLTK font-bold">environmental</span>{" "}
              and{" "}
              <span className="text-yellowLTK font-bold">social issues</span>.
              We aim to empower them to make meaningful contributions in raising
              global understanding and awareness.
            </p>
            s
          </div>
        </div>
      </div>
      <div className="p-6 order-first md:order-last">
        <Image
          src={"/main/hero-about-us.png"}
          className="w-full object-cover md:h-[70vh]"
          alt="Hero Image"
          width={1400}
          height={1400}
        />
      </div>
    </div>
  );
};

export default Hero;
