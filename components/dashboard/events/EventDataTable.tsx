"use client";

import { DataTable } from "@/components/DataTable";
import { useFetchData } from "@/hooks/useFetchData";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { EventCategory } from "../event-categories/EventCategoryColumn";
import { EventColumn } from "./EventColumn";

const EventDataTable = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSortOrderBy, setSelectedSortOrderBy] = useState<string | null>(
    null
  );
  const debouncedSearch = useDebounce<string>(search, 1000);

  const {
    data: eventsData,
    isLoading: isLoadingEventsData,
    isSuccess: isSuccessEventsData,
    refetch,
    isRefetching,
  } = useFetchData({
    queryKey: ["eventsData", pageIndex.toString()],
    dataProtected: `events?pgNum=${
      pageIndex + 1
    }&pgSize=${pageSize}&title=${debouncedSearch}&eventCategory=${
      selectedCategory || ""
    }&sortOrder=${selectedSortOrderBy || ""}`,
  });

  const { data: eventCategoriesData } = useFetchData({
    queryKey: ["eventCategoriesData", pageIndex.toString()],
    dataProtected: `event-categories`,
  });

  const events = eventsData?.data.events;
  const categories = eventCategoriesData?.data.eventCategories;
  const eventsMeta = eventsData?.data.meta;

  const resetFilter = () => {
    setSearch("");
    setSelectedCategory(null);
    setSelectedSortOrderBy(null);
  };

  useEffect(() => {
    refetch();
  }, [debouncedSearch, selectedCategory, selectedSortOrderBy, refetch]);

  return (
    <div className="overflow-hidden">
      {(isLoadingEventsData || isRefetching) && (
        <Skeleton className="w-full h-96" />
      )}
      {isSuccessEventsData && !isRefetching && (
        <>
          <div className="flex flex-row justify-end mb-5">
            <Button variant={"yellowLTK"} asChild>
              <Link href={"/dashboard/events/add"}>Add Event</Link>
            </Button>
          </div>
          <Card className="max-w-full">
            <CardHeader>
              <div className="flex flex-col md:flex-row gap-5 md:items-center justify-between mb-8">
                <CardTitle>Events</CardTitle>
                <div className="flex flex-row gap-2 items-center">
                  <Input
                    type="text"
                    className="md:w-fit"
                    placeholder="Search events"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Button variant={"destructive"} onClick={resetFilter}>
                    Reset
                  </Button>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-5">
                <Select onValueChange={(value) => setSelectedCategory(value)}>
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
                    {categories?.map((category: EventCategory) => {
                      return (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <Select
                  onValueChange={(value) => setSelectedSortOrderBy(value)}
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
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                data={events}
                columns={EventColumn}
                pageCount={Math.ceil(eventsMeta.count / pageSize)}
                pageIndex={pageIndex}
                pageSize={pageSize}
                setPageIndex={setPageIndex}
                setPageSize={setPageSize}
              />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default EventDataTable;
