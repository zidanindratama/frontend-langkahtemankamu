"use client";

import { Blog } from "@/components/dashboard/blogs/BlogColumn";
import { Event } from "@/components/dashboard/events/EventColumn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import axiosInstance from "@/helpers/axioosInstance";
import { formatDate } from "@/helpers/formatDate";
import { truncateText } from "@/helpers/truncateText";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
  eventSlug: string;
};

function EventDetail({ eventSlug }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [eventData, setEventData] = useState<Event | null>(null);
  const [featuredBlogData, setFeaturedBlogsData] = useState<Blog[] | null>(
    null
  );

  const fetchBlog = async () => {
    try {
      setIsLoading(true);
      const responseBlog = await axiosInstance.get(
        `/protected/events/${eventSlug}`
      );
      const responseFeaturedBlogs = await axiosInstance.get(
        `/protected/blogs?isPaginated=false&sortOrder=newest&featured=true`
      );
      setEventData(responseBlog?.data);
      setFeaturedBlogsData(responseFeaturedBlogs?.data.blogs);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [eventSlug]);

  return (
    <div className="relative py-12 md:py-20 bg-gradient-to-t from-white to-gray-100">
      {isLoading ? (
        <div className="max-w-7xl mx-auto px-6">
          <Skeleton className="h-96 w-full mb-6" />
          <Skeleton className="h-6 w-1/2 mb-4" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      ) : (
        eventData && (
          <>
            <div className="flex flex-col max-w-7xl mx-auto px-6">
              <div className="flex items-center gap-5">
                <Avatar className="w-14 h-14">
                  <AvatarImage src={eventData.author.image || undefined} />
                  <AvatarFallback className="bg-yellowLTK/20 border">
                    {eventData.author.name?.[0]?.toUpperCase() || "A"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-lg font-semibold text-gray-800">
                    {eventData.author.name}
                  </h1>
                  <p className="text-sm text-gray-500">
                    This event will be held on{" "}
                    <span className="font-bold text-blueLTK">
                      {formatDate(eventData.startEvent)}
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight">
                  {eventData.title}
                </h1>
                <p className="mt-4 text-gray-600 text-sm md:text-base">
                  {eventData.shortDescription}
                </p>
              </div>
            </div>
            <div className="mt-10 p-3 flex justify-center">
              <div className="max-w-3xl w-full">
                <Image
                  src={eventData.image}
                  className="w-full h-auto object-contain shadow-md"
                  alt={eventData.slug}
                  width={1400}
                  height={800}
                  priority
                />
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 mt-10">
              <div
                className="prose prose-gray max-w-full"
                dangerouslySetInnerHTML={{ __html: eventData.content }}
              />
              {eventData.onlineUrl && (
                <div className="bg-yellowLTK/30 w-full shadow-sm drop-shadow-md p-8 my-10 rounded-sm max-w-2xl mx-auto flex flex-col items-center">
                  <h1 className="font-bold text-base md:text-xl xl:text-2xl text-center mx-auto">
                    Don&apos;t Miss Out!
                  </h1>
                  <p className="font-light text-sm md:text-base text-center mx-auto mt-4 mb-8">
                    Be part of an inspiring journey and connect with like-minded
                    individuals. Click below to join the event now!
                  </p>
                  <Button variant={"blueLTK"} asChild>
                    <Link target="_blank" href={eventData.onlineUrl}>
                      Join the Event
                    </Link>
                  </Button>
                </div>
              )}
              <iframe
                style={{ border: 0 }}
                allowFullScreen={true}
                aria-hidden={false}
                className={`w-full h-96 ${
                  eventData.onlineUrl ? "mt-0" : "mt-10"
                }`}
                loading="lazy"
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(
                  eventData ? eventData.location : "Jakarta"
                )}&zoom=15&maptype=roadmap`}
              ></iframe>
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
}

export default EventDetail;
