"use client";

import { DataTable } from "@/components/DataTable";
import { useFetchData } from "@/hooks/useFetchData";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { EventCategoryonEventColumn } from "./EventCategoriesColumn";

type Props = {
  eventSlug: string;
};

const EventCategoryDataTable = ({ eventSlug }: Props) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: eventCategoriesOnEventData,
    isLoading: isLoadingEventCategoriesOnEventData,
    isSuccess: isSuccessEventCategoriesOnEventData,
    refetch,
    isRefetching,
  } = useFetchData({
    queryKey: ["eventCategoriesOnEventData", pageIndex.toString()],
    dataProtected: `event-categories-on-events/${eventSlug}?pgNum=${
      pageIndex + 1
    }&pgSize=${pageSize}`,
  });

  const eventCategoriesOnEvents =
    eventCategoriesOnEventData?.data.eventCategoriesOnEvents;
  const eventCategoriesOnEventsMeta = eventCategoriesOnEventData?.data.meta;

  return (
    <div className="overflow-hidden">
      {(isLoadingEventCategoriesOnEventData || isRefetching) && (
        <Skeleton className="w-full h-96" />
      )}
      {isSuccessEventCategoriesOnEventData && !isRefetching && (
        <>
          <Card className="max-w-full">
            <CardHeader>
              <div className="flex flex-col md:flex-row gap-5 md:items-center justify-between mb-8">
                <CardTitle>Event Categories</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                data={eventCategoriesOnEvents}
                columns={EventCategoryonEventColumn}
                pageCount={Math.ceil(
                  eventCategoriesOnEventsMeta.count / pageSize
                )}
                pageIndex={pageIndex}
                pageSize={pageSize}
                setPageIndex={setPageIndex}
                setPageSize={setPageSize}
              />
            </CardContent>
            <CardFooter>
              <div className="flex flex-row justify-end mb-5">
                <Button variant={"yellowLTK"} asChild>
                  <Link href={`/dashboard/events/${eventSlug}/categories/add`}>
                    Add Event Category
                  </Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  );
};

export default EventCategoryDataTable;
