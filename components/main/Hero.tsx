import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative py-12 md:py-20 bg-blueLTK">
      <div className="flex flex-col max-w-7xl justify-center mx-auto px-6">
        <div className="flex flex-col">
          <h1 className="uppercase text-white font-bold text-lg md:text-2xl lg:text-4xl text-center md:max-w-4xl mx-auto">
            COLLABORATIVE SPACE FOR{" "}
            <span className="text-yellowLTK">SOCIO-ENVIRONMENTAL</span> ISSUES
          </h1>
          <p className="text-center mx-auto text-white md:max-w-2xl text-xs md:text-base lg:text-lg mt-5">
            We are founded to be initiator in creating real contributions in
            increasing understanding and awareness of the global community.
          </p>
          <Button
            variant={"yellowLTK"}
            className="w-fit mx-auto font-bold mt-5 text-xs md:text-base md:px-10 md:py-6"
            asChild
          >
            <Link href={"/about-us"}>KNOW US BETTER</Link>
          </Button>
        </div>
        <div className="">
          <Image
            src={"/main/Hero.png"}
            className="w-full"
            alt="Hero Image"
            width={1400}
            height={1400}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
