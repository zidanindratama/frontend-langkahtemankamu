"use client";

import { DataTable } from "@/components/DataTable";
import { useFetchData } from "@/hooks/useFetchData";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { EventCategoryColumn } from "./EventCategoryColumn";

const EventCategoryDataTable = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce<string>(search, 1000);

  const {
    data: eventCategoriesData,
    isLoading: isLoadingeventCategoriesData,
    isSuccess: isSuccesseventCategoriesData,
    refetch,
    isRefetching,
  } = useFetchData({
    queryKey: ["eventeventCategoriesData", pageIndex.toString()],
    dataProtected: `event-categories?pgNum=${
      pageIndex + 1
    }&pgSize=${pageSize}&name=${debouncedSearch}`,
  });

  const categories = eventCategoriesData?.data.eventCategories;
  const categoriesMeta = eventCategoriesData?.data.meta;

  const resetFilter = () => {
    setSearch("");
  };

  useEffect(() => {
    refetch();
  }, [debouncedSearch, refetch]);

  return (
    <div>
      {(isLoadingeventCategoriesData || isRefetching) && (
        <Skeleton className="w-full h-96" />
      )}
      {isSuccesseventCategoriesData && !isRefetching && (
        <>
          <div className="flex flex-row justify-end mb-5">
            <Button variant={"yellowLTK"} asChild>
              <Link href={"/dashboard/event-categories/add"}>
                Add Event Category
              </Link>
            </Button>
          </div>
          <Card>
            <CardHeader className="flex flex-col md:flex-row  gap-5 md:items-center justify-between mb-8">
              <CardTitle>Event Categories</CardTitle>
              <div className="flex flex-row gap-2 items-center">
                <Input
                  type="text"
                  className="md:w-fit"
                  placeholder="Search event category"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant={"destructive"} onClick={resetFilter}>
                  Reset
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                data={categories}
                columns={EventCategoryColumn}
                pageCount={Math.ceil(categoriesMeta.count / pageSize)}
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

export default EventCategoryDataTable;
