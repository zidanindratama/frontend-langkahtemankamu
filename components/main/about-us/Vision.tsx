import Image from "next/image";
import React from "react";

const Vision = () => {
  return (
    <div className="relative py-12 md:py-20">
      <div className="flex flex-col max-w-7xl justify-center mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 items-center">
          <div className="flex flex-col">
            <h1 className="t font-bold text-lg md:text-2xl lg:text-4xl capitalize">
              Our Vision
            </h1>
            <h4 className="my-3 font-semibold text-base md:text-lg lg:text-xl">
              Inspiring Youth to Lead Change and Build a Sustainable, Inclusive
              Tomorrow
            </h4>
            <p className="text-sm md:text-base">
              Our vision is to create a global, inclusive space where Indonesian
              youth unite to drive meaningful change. By empowering young minds,
              we inspire innovation and collaboration to tackle pressing
              challenges, shaping a sustainable and prosperous future for all.
            </p>
          </div>

          <Image
            src={"/main/vision.png"}
            alt="creative"
            width={1000}
            height={1000}
          />
        </div>
      </div>
    </div>
  );
};

export default Vision;
