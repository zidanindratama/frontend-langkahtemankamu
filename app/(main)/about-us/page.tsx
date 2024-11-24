import Hero from "@/components/main/about-us/Hero";
import Story from "@/components/main/about-us/Story";
import Vision from "@/components/main/about-us/Vision";
import CoreValues from "@/components/main/CoreValues";
import Footer from "@/components/main/Footer";
import Navbar from "@/components/main/Navbar";
import PartnersAndAchievements from "@/components/main/PartnersAndAchievements";
import Platforms from "@/components/main/Platforms";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "About Us",
};

const page = () => {
  return (
    <div className="">
      <Navbar />
      <Hero />
      <Story />
      <Vision />
      <PartnersAndAchievements />
      <CoreValues />
      <Platforms />
      <Footer />
    </div>
  );
};

export default page;
