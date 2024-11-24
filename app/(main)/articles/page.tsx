import AllArticles from "@/components/main/articles/AllArticles";
import FeaturedArticle from "@/components/main/articles/FeaturedArticle.";
import Footer from "@/components/main/Footer";
import Navbar from "@/components/main/Navbar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Articles",
};

const page = () => {
  return (
    <div className="">
      <Navbar />
      <FeaturedArticle />
      <AllArticles />
      <Footer />
    </div>
  );
};

export default page;
