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
import { BlogColumn } from "./BlogColumn";
import { Category } from "../categories/CategoryColumn";

const BlogDataTable = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFeatured, setSelectedFeatured] = useState<string | null>(null);
  const [selectedSortOrderBy, setSelectedSortOrderBy] = useState<string | null>(
    null
  );
  const debouncedSearch = useDebounce<string>(search, 1000);

  const {
    data: blogsData,
    isLoading: isLoadingBlogsData,
    isSuccess: isSuccessBlogsData,
    refetch,
    isRefetching,
  } = useFetchData({
    queryKey: ["blogsData", pageIndex.toString()],
    dataProtected: `blogs?pgNum=${
      pageIndex + 1
    }&pgSize=${pageSize}&title=${debouncedSearch}&category=${
      selectedCategory || ""
    }&featured=${selectedFeatured || ""}&sortOrder=${
      selectedSortOrderBy || ""
    }`,
  });

  const { data: categoriesData } = useFetchData({
    queryKey: ["categoriesData", pageIndex.toString()],
    dataProtected: `categories`,
  });

  const blogs = blogsData?.data.blogs;
  const categories = categoriesData?.data.categories;
  const blogsMeta = blogsData?.data.meta;

  const resetFilter = () => {
    setSearch("");
    setSelectedCategory(null);
    setSelectedFeatured(null);
    setSelectedSortOrderBy(null);
  };

  useEffect(() => {
    refetch();
  }, [
    debouncedSearch,
    selectedCategory,
    selectedFeatured,
    selectedSortOrderBy,
    refetch,
  ]);

  return (
    <div className="overflow-hidden">
      {(isLoadingBlogsData || isRefetching) && (
        <Skeleton className="w-full h-96" />
      )}
      {isSuccessBlogsData && !isRefetching && (
        <>
          <div className="flex flex-row justify-end mb-5">
            <Button variant={"yellowLTK"} asChild>
              <Link href={"/dashboard/articles/add"}>Add Articles</Link>
            </Button>
          </div>
          <Card className="max-w-full">
            <CardHeader>
              <div className="flex flex-col md:flex-row gap-5 md:items-center justify-between mb-8">
                <CardTitle>Articles</CardTitle>
                <div className="flex flex-row gap-2 items-center">
                  <Input
                    type="text"
                    className="md:w-fit"
                    placeholder="Search articles"
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
                    {categories?.map((category: Category) => {
                      return (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <Select onValueChange={(value) => setSelectedFeatured(value)}>
                  <SelectTrigger className="md:w-[180px]">
                    <SelectValue
                      placeholder={
                        selectedFeatured !== null
                          ? selectedFeatured === "true"
                            ? "Featured"
                            : "Not Featured"
                          : "Select Feature"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="true">Featured</SelectItem>
                    <SelectItem value="false">Not Featured</SelectItem>
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
                data={blogs}
                columns={BlogColumn}
                pageCount={Math.ceil(blogsMeta.count / pageSize)}
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

export default BlogDataTable;
