"use client";

import { Input } from "@/components/ui/input";
import { useFetchData } from "@/hooks/useFetchData";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { Category } from "@/components/dashboard/categories/CategoryColumn";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { truncateText } from "@/helpers/truncateText";
import { useDebounce } from "@/hooks/useDebounce";
import { Event } from "@/components/dashboard/events/EventColumn";
import { formatDate } from "@/helpers/formatDate";
import { Skeleton } from "@/components/ui/skeleton";

const Events = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(6);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSortOrderBy, setSelectedSortOrderBy] = useState<string | null>(
    null
  );
  const debouncedSearch = useDebounce<string>(search, 1000);

  const { data: eventCategoriesData } = useFetchData({
    queryKey: ["eventCategoriesData"],
    dataProtected: `event-categories`,
  });

  const {
    data: eventsData,
    refetch,
    isLoading,
  } = useFetchData({
    queryKey: ["eventsData", pageIndex.toString()],
    dataProtected: `events?pgNum=${
      pageIndex + 1
    }&pgSize=${pageSize}&sortOrder=${
      selectedSortOrderBy || ""
    }&title=${debouncedSearch}&eventCategory=${selectedCategory || ""}`,
  });

  useEffect(() => {
    if (eventsData?.data.meta?.count) {
      setTotalPages(Math.ceil(eventsData?.data.meta.count / pageSize));
    }
  }, [eventsData, pageSize]);

  useEffect(() => {
    refetch();
  }, [
    debouncedSearch,
    selectedCategory,
    selectedSortOrderBy,
    pageIndex,
    refetch,
  ]);

  const resetFilter = () => {
    setSearch("");
    setSelectedSortOrderBy(null);
    setSelectedCategory(null);
    setPageIndex(0);
  };

  const handlePageChange = (newPageIndex: number) => {
    setPageIndex(newPageIndex);
  };

  const eventCategories = eventCategoriesData?.data.eventCategories;
  const events = eventsData?.data.events as Event[];

  return (
    <>
      <div className="relative py-12 md:py-20 bg-yellowLTK/10">
        <div className="flex flex-col max-w-7xl justify-center mx-auto px-6">
          <div className="flex flex-col text-center">
            <h1 className="font-bold text-xl xl:text-4xl mt-2 md:mt-5 md:max-w-3xl mx-auto">
              Discover Events That{" "}
              <span className="text-yellowLTK">Promote Sustainability</span>,{" "}
              <span className="text-yellowLTK">Inspire Change</span>, and{" "}
              <span className="text-yellowLTK">Foster a Greener Future</span>
            </h1>

            <Input
              type="text"
              className="md:col-span-2 md:w-full my-5 border border-blueLTK p-6"
              placeholder="Search events"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="relative py-12 md:py-20 bg-white">
        <div className="flex flex-col max-w-7xl justify-center mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 md:gap-10">
            <div className="hidden md:block md:border-r">
              <h1 className="font-bold sm:text-xl md:text-3xl xl:text-3xl">
                Filters
              </h1>
              <RadioGroup
                defaultValue="all"
                className="mt-5"
                onValueChange={(value) => setSelectedCategory(value)}
              >
                <div className="flex items-center space-x-2" key={"all"}>
                  <RadioGroupItem value="all" id={"all"} />
                  <Label htmlFor={"all"}>All</Label>
                </div>
                {eventCategories?.map((category: Category) => (
                  <div
                    className="flex items-center space-x-2"
                    key={category.id}
                  >
                    <RadioGroupItem value={category.name} id={category.id} />
                    <Label htmlFor={category.id}>{category.name}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="md:col-span-3">
              <div className="flex flex-col md:flex-row gap-5 justify-between md:items-center">
                <h1 className="font-bold sm:text-xl md:text-3xl xl:text-3xl">
                  All Events
                </h1>
                <div className="flex flex-row gap-5">
                  <div className="block md:hidden">
                    <Select
                      onValueChange={(value) => {
                        setSelectedCategory(value === "all" ? null : value);
                        setPageIndex(0); // Reset page index when filter changes
                      }}
                    >
                      <SelectTrigger className="md:w-[180px]">
                        <SelectValue
                          placeholder={
                            selectedCategory !== null
                              ? selectedCategory
                              : "Category"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={"all"}>All</SelectItem>
                        {eventCategories?.map((category: Category) => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Select
                    onValueChange={(value) => {
                      setSelectedSortOrderBy(value);
                      setPageIndex(0); // Reset page index when filter changes
                    }}
                  >
                    <SelectTrigger className="md:w-[180px]">
                      <SelectValue
                        placeholder={
                          selectedSortOrderBy !== null
                            ? selectedSortOrderBy
                            : "Sort By"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="oldest">Oldest</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant={"destructive"} onClick={resetFilter}>
                    Reset
                  </Button>
                </div>
              </div>
              {isLoading ? (
                <div className="mt-5 grid grid-cols-1 gap-5">
                  <Skeleton className="w-full h-44" />
                  <Skeleton className="w-full h-44" />
                  <Skeleton className="w-full h-44" />
                </div>
              ) : (
                events && (
                  <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5 md:gap-10">
                    {events.map((event) => {
                      return (
                        <Link
                          key={event.id}
                          href={`/events/${event.slug}`}
                          className="w-fit border rounded-xl drop-shadow-sm"
                        >
                          <div className="bg-white rounded-b-md rounded-t-xl">
                            <Image
                              src={event.image}
                              alt={event.slug}
                              width={1000}
                              height={1000}
                              className="rounded-md"
                            />
                            <div className="p-5">
                              <h1 className="px-3 py-1 text-xs md:text-sm bg-yellowLTK w-fit rounded-md shadow-sm shadow-yellowLTK/90 mb-3">
                                {formatDate(event.startEvent)}
                              </h1>
                              <h1 className="text-blueLTK uppercase font-bold text-base md:text-lg lg:text-2xl md:max-w-xs">
                                {truncateText(event.title, 30)}
                              </h1>
                              <p className="text-sm md:text-base mt-3">
                                {truncateText(event.shortDescription, 100)}
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
          <div className="flex justify-center gap-3 mt-8">
            <Button
              variant={"outline"}
              onClick={() => handlePageChange(pageIndex - 1)}
              disabled={pageIndex === 0}
            >
              Previous
            </Button>
            <Button
              variant={"outline"}
              onClick={() => handlePageChange(pageIndex + 1)}
              disabled={pageIndex + 1 === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Events;
