"use client";

import { truncateText } from "@/helpers/truncateText";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";
import { useFetchData } from "@/hooks/useFetchData";
import { Blog } from "../dashboard/blogs/BlogColumn";
import { Skeleton } from "../ui/skeleton";
import { formatDate } from "@/helpers/formatDate";

const Articles = () => {
  const {
    data: blogsData,
    isLoading,
    isSuccess,
  } = useFetchData({
    queryKey: ["blogsDataLanding"],
    dataProtected: `blogs?isPaginated=false&sortOrder=newest&&featured=false`,
  });

  const firstBlog = blogsData?.data.blogs[0] as Blog;
  const restBlogs = blogsData?.data.blogs.slice(1, 3) as Blog[];

  return (
    <div className="relative py-12 md:py-20 bg-[#FFEE8E]" id="articles">
      <div className="flex flex-col max-w-7xl justify-center mx-auto px-6">
        <h1 className="p-4 bg-yellowLTK w-fit uppercase font-bold text-base md:text-xl lg:text-2xl text-center mx-auto rounded-md">
          ARTICLES
        </h1>

        {isLoading ? (
          <Skeleton className="w-full h-72 mt-5 md:mt-10" />
        ) : (
          isSuccess && (
            <Link
              href={`/articles/${firstBlog.slug}`}
              className="flex flex-col mt-5 md:mt-10"
            >
              <div className="relative">
                <Image
                  src={firstBlog.image}
                  alt={firstBlog.slug}
                  width={1500}
                  height={1500}
                  className="object-contain w-full h-full rounded-md"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-md"></div>
                <div className="absolute bottom-0 left-0">
                  <div className="flex flex-col text-white p-2 md:p-6">
                    <div className="flex flex-row">
                      <h1 className="md:font-semibold text-xs md:text-base">
                        {formatDate(firstBlog.createdAt)}
                      </h1>
                    </div>
                    <h1 className="font-bold text-xs md:text-2xl lg:text-4xl mt-1 md:mt-3">
                      {truncateText(firstBlog.title, 40)}
                    </h1>
                    <p className="hidden md:block mt-5">
                      {truncateText(firstBlog.shortDescription, 300)}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          )
        )}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 mt-5 md:mt-10">
            <Skeleton className="w-full h-48" />
            <Skeleton className="w-full h-48" />
          </div>
        ) : (
          isSuccess && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 mt-5 md:mt-10">
              {restBlogs.map((blog) => {
                return (
                  <Link
                    href={`/articles/${blog.slug}`}
                    className="w-fit"
                    key={blog.id}
                  >
                    <div className="bg-white rounded-b-md rounded-t-xl">
                      <Image
                        src={blog.image}
                        alt={blog.slug}
                        width={1000}
                        height={1000}
                        className="rounded-md"
                      />
                      <div className="p-5">
                        <h1 className="px-3 py-1 text-xs md:text-sm bg-yellowLTK w-fit rounded-md shadow-sm shadow-yellowLTK/90 mb-3">
                          {formatDate(blog.createdAt)}
                        </h1>
                        <h1 className="text-blueLTK uppercase font-bold text-base md:text-lg lg:text-2xl md:max-w-xs">
                          {truncateText(blog.title, 30)}
                        </h1>
                        <p className="text-sm md:text-base mt-3">
                          {truncateText(blog.shortDescription, 100)}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )
        )}
        <Button
          variant={"yellowLTK"}
          className="w-fit mx-auto font-bold mt-5 md:mt-10 text-xs md:text-base px-5 py-6"
          asChild
        >
          <Link
            href={"/articles"}
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

export default Articles;
