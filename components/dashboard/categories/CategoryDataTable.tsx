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
import { CategoryColumn } from "./CategoryColumn";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

const CategoryDataTable = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce<string>(search, 1000);

  const {
    data: categoriesData,
    isLoading: isLoadingCategoriesData,
    isSuccess: isSuccessCategoriesData,
    refetch,
    isRefetching,
  } = useFetchData({
    queryKey: ["categoriesData", pageIndex.toString()],
    dataProtected: `categories?pgNum=${
      pageIndex + 1
    }&pgSize=${pageSize}&name=${debouncedSearch}`,
  });

  const categories = categoriesData?.data.categories;
  const categoriesMeta = categoriesData?.data.meta;

  const resetFilter = () => {
    setSearch("");
  };

  useEffect(() => {
    refetch();
  }, [debouncedSearch, refetch]);

  return (
    <div>
      {(isLoadingCategoriesData || isRefetching) && (
        <Skeleton className="w-full h-96" />
      )}
      {isSuccessCategoriesData && !isRefetching && (
        <>
          <div className="flex flex-row justify-end mb-5">
            <Button variant={"yellowLTK"} asChild>
              <Link href={"/dashboard/categories/add"}>Add Category</Link>
            </Button>
          </div>
          <Card>
            <CardHeader className="flex flex-col md:flex-row  gap-5 md:items-center justify-between mb-8">
              <CardTitle>Categories</CardTitle>
              <div className="flex flex-row gap-2 items-center">
                <Input
                  type="text"
                  className="md:w-fit"
                  placeholder="Search category"
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
                columns={CategoryColumn}
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

export default CategoryDataTable;
