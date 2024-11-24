import Image from "next/image";
import React from "react";

const Story = () => {
  return (
    <div className="relative py-12 md:py-20">
      <div className="flex flex-col max-w-7xl justify-center mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 items-center">
          <div className="flex flex-col">
            <h1 className="t font-bold text-lg md:text-2xl lg:text-4xl capitalize">
              Our Story
            </h1>
            <h4 className="my-3 font-semibold text-base md:text-lg lg:text-xl">
              Empowering youth, fostering collaboration, and driving change for
              a better future.
            </h4>
            <p className="text-sm md:text-base">
              Langkah Teman Kamu, founded in 2022, is a non-profit community
              addressing social and environmental challenges in Indonesia.
              Through online and offline programs, we empower youth to connect,
              collaborate, and create impactful solutions. Committed to
              fostering awareness and sustainable action, we believe in uniting
              innovation and inclusivity for a brighter future.
            </p>
          </div>

          <Image
            src={"/main/story.png"}
            alt="story"
            width={1000}
            height={1000}
            className="md:order-first"
          />
        </div>
      </div>
    </div>
  );
};

export default Story;
