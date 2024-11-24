"use client";

import { Button } from "@/components/ui/button";
import { useFetchData } from "@/hooks/useFetchData";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { formatDate } from "@/helpers/formatDate";
import { truncateText } from "@/helpers/truncateText";
import { Skeleton } from "@/components/ui/skeleton";
import { Blog } from "@/components/dashboard/blogs/BlogColumn";

const FeaturedArticle = () => {
  const {
    data: featuredBlogsData,
    isSuccess,
    isLoading,
  } = useFetchData({
    queryKey: ["featuredBlogsData"],
    dataProtected: `blogs?isPaginated=false&sortOrder=newest&featured=true`,
  });

  const featured = featuredBlogsData?.data.blogs.at(-1) as Blog;

  return (
    <div className="relative py-12 md:py-20 bg-yellowLTK/10">
      <div className="flex flex-col max-w-7xl justify-center mx-auto px-6">
        {isLoading ? (
          <Skeleton className="w-full h-96" />
        ) : (
          featured && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 items-center">
              <div className="flex flex-col">
                <div className="flex flex-col-reverse md:flex-row justify-between md:items-center font-medium my-2 md:my-5 gap-1">
                  <h1 className="text-sm md:text-base">
                    By{" "}
                    <Link href={"#"} className="text-[#592EA9]">
                      {featured.author.name}
                    </Link>
                  </h1>
                  <p className="text-xs md:text-base">
                    {formatDate(featured.createdAt)}
                  </p>
                </div>
                <h1 className="font-bold text-base md:text-xl xl:text-2xl mb-2">
                  {featured.title}
                </h1>
                <p className="font-light text-xs md:text-base">
                  {featured.shortDescription}
                </p>
                <Button
                  variant={"yellowLTK"}
                  className="md:w-fit font-bold mt-5 text-xs md:text-base md:px-10 md:py-6 rounded-none capitalize"
                  asChild
                >
                  <Link href={`/articles/${featured.slug}`}>Read More</Link>
                </Button>
              </div>
              <Image
                src={featured.image}
                alt={featured.slug}
                width={1500}
                height={1500}
                className="order-first md:order-last"
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default FeaturedArticle;
