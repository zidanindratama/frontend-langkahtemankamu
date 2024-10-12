import Image from "next/image";
import React from "react";

interface Partner {
  id: number;
  name: string;
  image: string;
}

const partners: Partner[] = [
  {
    id: 1,
    name: "partner-1",
    image: "/main/partners/partner-1.png",
  },
  {
    id: 2,
    name: "partner-2",
    image: "/main/partners/partner-2.png",
  },
  {
    id: 3,
    name: "partner-3",
    image: "/main/partners/partner-3.png",
  },
  {
    id: 4,
    name: "partner-4",
    image: "/main/partners/partner-4.png",
  },
];

const PartnersAndAchievements = () => {
  return (
    <div className="relative py-12 md:py-20 bg-white">
      <div className="flex flex-col max-w-7xl justify-center mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
          <div className="flex flex-col gap-4">
            <h1 className="text-left font-bold text-lg md:text-2xl lg:text-4xl">
              PARTNERS
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 mt-5 md:mt-10">
              {partners.map((partner) => {
                return (
                  <div
                    className="p-3 bg-[#C3E7FB] rounded-sm shadow-md shadow-[#C3E7FB]/90 flex justify-center items-center"
                    key={partner.id}
                  >
                    <Image
                      src={partner.image}
                      alt={partner.name}
                      width={1000}
                      height={1000}
                      className="object-contain h-24 w-24 md:w-48 md:h-full"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-10 md:mt-0">
            <h1 className="text-left font-bold text-lg md:text-2xl lg:text-4xl">
              ACHIEVEMENTS
            </h1>
            <div className="p-6 bg-[#C3E7FB] rounded-sm shadow-md shadow-[#C3E7FB]/90 mt-5 md:mt-10 w-full flex flex-col md:flex-row gap-10 items-center">
              <Image
                src="/main/partners/partner-5.png"
                alt="Unilever"
                width={1000}
                height={1000}
                className="object-contain w-28 h-28 md:w-44 md:h-full"
              />
              <div className="flex flex-col">
                <h1 className="font-bold text-base md:text-xl lg:text-2xl">
                  EVERY U DOES GOOD HEROES Top 100 Finalist
                </h1>
                <p className="text-sm md:text-base mt-3">
                  Through this event, we were connected with various
                  organizations and were mentored directly by Unilever ID.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersAndAchievements;
