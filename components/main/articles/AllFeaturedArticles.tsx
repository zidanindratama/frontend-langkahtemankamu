"use client";

import { Blog } from "@/components/dashboard/blogs/BlogColumn";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/helpers/formatDate";
import { truncateText } from "@/helpers/truncateText";
import { useFetchData } from "@/hooks/useFetchData";
import Link from "next/link";
import React from "react";

const AllFeaturedArticles = () => {
  const {
    data: allFeaturedBlogsData,
    isSuccess,
    isLoading,
  } = useFetchData({
    queryKey: ["allFeaturedBlogsData"],
    dataProtected: `blogs?isPaginated=false&sortOrder=newest&featured=true`,
  });

  const featured = allFeaturedBlogsData?.data.blogs as Blog[];
  console.log(featured);

  return (
    <div>
      <div className="flex flex-col">
        <h1 className="font-bold sm:text-xl md:text-3xl xl:text-3xl">
          Featured Articles
        </h1>
        <div className="h-[1px] w-full bg-[#D0D1D3] my-5"></div>
      </div>
      {isLoading ? (
        <div className="grid gap-5">
          <Skeleton className="w-full h-24" />
          <Skeleton className="w-full h-24" />
          <Skeleton className="w-full h-24" />
        </div>
      ) : (
        featured &&
        featured.map((blog) => {
          return (
            <Link
              href={`/articles/${blog.slug}`}
              className="bg-[#FBF6EA] hover:bg-yellowLTK/20"
              key={blog.id}
            >
              <div className="p-4">
                <div className="flex flex-col-reverse md:flex-row justify-between md:items-center font-medium my-2 md:my-5 gap-1">
                  <h1 className="text-sm md:text-base">
                    By{" "}
                    <Link href={"#"} className="text-[#592EA9]">
                      {blog.author.name}
                    </Link>
                  </h1>
                  <p className="text-xs md:text-base">
                    {formatDate(blog.createdAt)}
                  </p>
                </div>
                <h1 className="font-bold sm:text-lg md:text-xl xl:text-2xl">
                  {blog.title}
                </h1>
                <p className="font-light text-xs md:text-base mt-2">
                  {truncateText(blog.shortDescription, 70)}
                </p>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default AllFeaturedArticles;
