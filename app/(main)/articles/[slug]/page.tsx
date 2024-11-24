import { Blog } from "@/components/dashboard/blogs/BlogColumn";
import ArticleDetail from "@/components/main/articles/ArticleDetail";
import Footer from "@/components/main/Footer";
import Navbar from "@/components/main/Navbar";
import Platforms from "@/components/main/Platforms";
import axiosInstance from "@/helpers/axioosInstance";
import { Metadata } from "next";
import React from "react";

type Param = {
  slug: string;
};

type Props = {
  params: Param;
};

export async function generateStaticParams() {
  try {
    const responseBlogs = await axiosInstance.get(
      `/protected/blogs?isPaginated=false`
    );

    const blogs = responseBlogs?.data.blogs as Blog[];

    return blogs.map((blog) => ({ slug: blog.slug })).slice(0, 5);
  } catch (error) {
    console.error("Error fetching blogs for static params:", error);
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const responseBlog = await axiosInstance.get(
    `/protected/blogs/${params.slug}`
  );

  const blog = responseBlog?.data as Blog;

  return {
    title: blog.title,
    description: blog.shortDescription,
    openGraph: {
      images: [
        {
          url: blog.image,
        },
      ],
    },
  };
}

const page = ({ params }: Props) => {
  return (
    <div className="">
      <Navbar />
      <ArticleDetail blogSlug={params.slug} />
      <Platforms />
      <Footer />
    </div>
  );
};

export default page;
