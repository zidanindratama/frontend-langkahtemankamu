import Articles from "@/components/main/Articles";
import CoreValues from "@/components/main/CoreValues";
import Footer from "@/components/main/Footer";
import Hero from "@/components/main/Hero";
import Missions from "@/components/main/Missions";
import Navbar from "@/components/main/Navbar";
import OurPrograms from "@/components/main/OurPrograms";
import PartnersAndAchievements from "@/components/main/PartnersAndAchievements";
import Platforms from "@/components/main/Platforms";
import React from "react";

const MainPageLTK = () => {
  return (
    <div className="">
      <Navbar />
      <Hero />
      <Missions />
      <CoreValues />
      <OurPrograms />
      <PartnersAndAchievements />
      <Articles />
      <Platforms />
      <Footer />
    </div>
  );
};

export default MainPageLTK;
