import React from "react";
import { Earth, Heart, LucideIcon, Users } from "lucide-react";

interface Mission {
  id: number;
  icon: LucideIcon;
  description: string;
}

const missions: Mission[] = [
  {
    id: 1,
    icon: Earth,
    description: `Grow to ensure that Langkah Teman Kamu are widely accessible to all youth worldwide.`,
  },
  {
    id: 2,
    icon: Users,
    description: `Increase the connection and collaboration of Langkah Teman Kamu.`,
  },
  {
    id: 3,
    icon: Heart,
    description: `Empower youth worldwide to provide real contribution of Langkah Teman Kamu.`,
  },
];

const Missions = () => {
  return (
    <>
      <div className="relative py-12 md:py-20 bg-white">
        <div className="flex flex-col max-w-7xl justify-center mx-auto px-6">
          <div className="flex flex-row justify-center">
            <h1 className="text-left font-bold text-lg md:text-2xl lg:text-4xl">
              We aim to <span className="text-blueLTK">initiate</span> in
              creating a <span className="text-blueLTK">collaborative</span>{" "}
              space for youth worldwide to contribute to the actualization of{" "}
              <span className="text-blueLTK">
                sustainable development goals
              </span>
              .
            </h1>
          </div>
        </div>
      </div>
      <div className="relative py-12 md:py-20 bg-[#FFEE8E]">
        <div className="flex flex-col max-w-7xl justify-center mx-auto px-6">
          <h1 className="p-4 bg-yellowLTK w-fit uppercase font-bold text-base md:text-xl lg:text-2xl text-center mx-auto rounded-md">
            OUR MISSIONS
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10 mt-10">
            {missions.map((mission) => {
              return (
                <div
                  className="bg-[#FFEB8C] p-6 flex flex-col drop-shadow-sm shadow-md shadow-[#FFEB8C]/90"
                  key={mission.id}
                >
                  <mission.icon className="w-10 h-10 mx-auto" />
                  <p className="font-semibold text-sm md:text-base xl:text-lg text-center mt-5">
                    {mission.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Missions;
