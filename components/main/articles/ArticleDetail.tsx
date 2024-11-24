"use client";

import { Blog } from "@/components/dashboard/blogs/BlogColumn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import axiosInstance from "@/helpers/axioosInstance";
import { formatDate } from "@/helpers/formatDate";
import { truncateText } from "@/helpers/truncateText";
import { useFetchData } from "@/hooks/useFetchData";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
  blogSlug: string;
};

const ArticleDetail = ({ blogSlug }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [blogData, setBlogData] = useState<Blog | null>(null);
  const [featuredBlogData, setFeaturedBlogsData] = useState<Blog[] | null>(
    null
  );

  const fetchBlog = async () => {
    try {
      setIsLoading(true);
      const responseBlog = await axiosInstance.get(
        `/protected/blogs/${blogSlug}`
      );
      const responseFeaturedBlogs = await axiosInstance.get(
        `/protected/blogs?isPaginated=false&sortOrder=newest&featured=true`
      );
      setBlogData(responseBlog?.data);
      setFeaturedBlogsData(responseFeaturedBlogs?.data.blogs);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [blogSlug]);

  return (
    <div className="relative py-12 md:py-20 bg-gradient-to-t from-white to-gray-100">
      {isLoading ? (
        <div className="max-w-7xl mx-auto px-6">
          <Skeleton className="h-96 w-full mb-6" />
          <Skeleton className="h-6 w-1/2 mb-4" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      ) : (
        blogData && (
          <>
            <div className="flex flex-col max-w-7xl mx-auto px-6">
              <div className="flex items-center gap-5">
                <Avatar className="w-14 h-14">
                  <AvatarImage src={blogData.author.image || undefined} />
                  <AvatarFallback className="bg-yellowLTK/20 border">
                    {blogData.author.name?.[0]?.toUpperCase() || "A"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-lg font-semibold text-gray-800">
                    {blogData.author.name}
                  </h1>
                  <p className="text-sm text-gray-500">
                    Posted on {formatDate(blogData.createdAt)}
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight">
                  {blogData.title}
                </h1>
                <p className="mt-4 text-gray-600 text-sm md:text-base">
                  {blogData.shortDescription}
                </p>
              </div>
            </div>
            <div className="mt-10 p-3 flex justify-center">
              <div className="max-w-xl w-full">
                <Image
                  src={blogData.image}
                  className="w-full h-auto object-contain shadow-md"
                  alt={blogData.slug}
                  width={1400}
                  height={800}
                  priority
                />
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 mt-10">
              <div
                className="prose prose-gray max-w-full"
                dangerouslySetInnerHTML={{ __html: blogData.content }}
              />
              <div className="mt-10">
                <h1 className="font-bold sm:text-xl md:text-3xl xl:text-3xl">
                  Featured Articles
                </h1>
                <div className="h-[1px] w-full bg-[#D0D1D3] my-5"></div>
                {isLoading ? (
                  <div className="grid grid-cols-1 gap-5">
                    <Skeleton className="w-full h-44" />
                    <Skeleton className="w-full h-44" />
                    <Skeleton className="w-full h-44" />
                  </div>
                ) : (
                  featuredBlogData && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10">
                      {featuredBlogData.map((blog) => {
                        return (
                          <Link
                            href={`/articles/${blog.slug}`}
                            className="w-fit border rounded-xl drop-shadow-sm"
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
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default ArticleDetail;
