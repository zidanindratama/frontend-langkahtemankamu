import { Lightbulb, LucideIcon, Pencil, UserRound } from "lucide-react";
import Image from "next/image";
import React from "react";

interface CoreValue {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

const coreValues: CoreValue[] = [
  {
    id: 1,
    icon: Pencil,
    title: "Lead by Example",
    description:
      "The elements of Langkah Teman Kamu should become a pioneer to exemplify for youth in contributing to the actualization of SDGs.",
  },
  {
    id: 2,
    icon: UserRound,
    title: "Together as One",
    description:
      "As a team, Langkah Teman Kamu would be stronger. Collaboration is a key of success to realize our vision.",
  },
  {
    id: 3,
    icon: Lightbulb,
    title: "Know the Universe",
    description:
      "Knowledge is power. Knowing about the universe gives us the power to make a good shift in society.",
  },
];

const CoreValues = () => {
  return (
    <div className="relative py-12 md:py-20 bg-white">
      <div className="flex flex-col max-w-7xl justify-center mx-auto px-6">
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-5 md:gap-10">
          <div className="flex flex-col gap-5 md:gap-10">
            <h1 className="text-left font-bold text-lg md:text-2xl lg:text-4xl">
              CORE VALUES
            </h1>
            {coreValues.map((coreValue) => {
              return (
                <div
                  className="p-6 bg-[#C3E7FB] flex flex-col md:flex-row gap-5 drop-shadow-sm rounded-sm shadow-md shadow-[#C3E7FB]/90"
                  key={coreValue.id}
                >
                  <div className="">
                    <coreValue.icon className="w-7 h-7" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h1 className="font-bold text-base md:text-lg lg:text-xl">
                      {coreValue.title}
                    </h1>
                    <p className="text-sm md:text-base">
                      {coreValue.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="">
            <Image
              src={"/main/Core-Values.png"}
              alt="Core Value"
              width={1000}
              height={1000}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoreValues;
