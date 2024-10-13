"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { truncateText } from "@/helpers/truncateText";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";

interface OurProgram {
  id: number;
  image: string;
  title: string;
  slug: string;
  description: string;
}

const ourPrograms: OurProgram[] = [
  {
    id: 1,
    image: "/main/programs/programs-1.png",
    title: "social media education",
    slug: "social-media-education",
    description:
      "Social media education carried out by the Step Your Friends community aims to increase public awareness of social issues and environmental issues through the social media we own, Instagram, Linkedin, Twitter and Blog.",
  },
  {
    id: 2,
    image: "/main/programs/programs-2.png",
    title: "langkah teman kamu SDGS SUMMIT 2023",
    slug: "langkah-teman-kamu-sdgs-summit-2023",
    description:
      "This event aims to give volunteers a new experience by visiting an orphanage in order to carry out environmental education activities for early childhood. Providing education to young children has the hope of fostering a love of the environment from childhood",
  },
  {
    id: 3,
    image: "/main/programs/programs-3.png",
    title: "teman kami volunteer program",
    slug: "teman-kami-volunteer-program",
    description:
      "Langkah Teman Kamu Volunteer Program is an agenda that aims to provide a forum for young people from various backgrounds to be able to contribute to increasing public awareness of environmental and social issues. We believe that every individual has the same responsibility in increasing public awareness of environmental and social issues.",
  },
];

const OurPrograms = () => {
  return (
    <div className="relative py-12 md:py-20 bg-[#FFEE8E]" id="events">
      <div className="flex flex-col max-w-7xl justify-center mx-auto px-6">
        <h1 className="p-4 bg-yellowLTK w-fit uppercase font-bold text-base md:text-xl lg:text-2xl mx-auto md:mx-0 mb-10 rounded-md">
          OUR EVENTS
        </h1>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {ourPrograms.map((ourPogram) => {
              return (
                <>
                  <CarouselItem
                    className="md:basis-1/2 lg:basis-1/3"
                    key={ourPogram.id}
                  >
                    <Link href={`/events/${ourPogram.slug}`} className="w-fit">
                      <div className="bg-white rounded-b-md rounded-t-xl">
                        <Image
                          src={ourPogram.image}
                          alt={ourPogram.title}
                          width={1000}
                          height={1000}
                          className="rounded-md"
                        />
                        <div className="p-5">
                          <h1 className="text-blueLTK uppercase font-bold text-base md:text-lg lg:text-2xl md:max-w-xs">
                            {truncateText(ourPogram.title, 30)}
                          </h1>
                          <p className="text-sm md:text-base mt-3">
                            {truncateText(ourPogram.description, 100)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </CarouselItem>
                </>
              );
            })}
          </CarouselContent>
          <div className="hidden md:flex md:absolute md:-top-[4.5rem] md:right-32">
            <CarouselPrevious className="bg-yellowLTK rounded-none border-none h-10 w-10" />
            <CarouselNext className="bg-yellowLTK rounded-none border-none h-10 w-10" />
          </div>
        </Carousel>
        <Button
          variant={"yellowLTK"}
          className="w-fit mx-auto font-bold mt-5 md:mt-10 text-xs md:text-base px-5 py-6"
          asChild
        >
          <Link
            href={"/events"}
            className="flex flex-row justify-between gap-4 uppercase"
          >
            <span>View More</span>
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default OurPrograms;
