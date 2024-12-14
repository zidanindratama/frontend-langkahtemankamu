import Events from "@/components/main/events/Events";
import Footer from "@/components/main/Footer";
import Navbar from "@/components/main/Navbar";
import Platforms from "@/components/main/Platforms";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <Events />
      <Footer />
    </div>
  );
};

export default page;
