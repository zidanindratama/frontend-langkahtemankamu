"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { truncateText } from "@/helpers/truncateText";
import { useFetchData } from "@/hooks/useFetchData";
import { Skeleton } from "@/components/ui/skeleton";
import { Blog } from "@/components/dashboard/blogs/BlogColumn";
import { formatDate } from "@/helpers/formatDate";
import { useDebounce } from "@/hooks/useDebounce";
import { Category } from "@/components/dashboard/categories/CategoryColumn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AllArticles = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(4);
  const [totalPages, setTotalPages] = useState(0);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSortOrderBy, setSelectedSortOrderBy] = useState<string | null>(
    null
  );
  const debouncedSearch = useDebounce<string>(search, 1000);

  const { data: categoriesData } = useFetchData({
    queryKey: ["categoriesData"],
    dataProtected: `categories`,
  });

  const {
    data: allBlogsData,
    refetch,
    isLoading,
  } = useFetchData({
    queryKey: ["allBlogsData", pageIndex.toString()],
    dataProtected: `blogs?pgNum=${pageIndex + 1}&pgSize=${pageSize}&sortOrder=${
      selectedSortOrderBy || ""
    }&title=${debouncedSearch}&category=${selectedCategory || ""}`,
  });

  const {
    data: allFeaturedBlogsData,
    isSuccess: isSuccessAllFeaturedBlogsData,
    isLoading: isLoadingAllFeaturedBlogsData,
  } = useFetchData({
    queryKey: ["allFeaturedBlogsData"],
    dataProtected: `blogs?isPaginated=false&sortOrder=newest&featured=true`,
  });

  useEffect(() => {
    if (allBlogsData?.data.meta?.count) {
      setTotalPages(Math.ceil(allBlogsData?.data.meta.count / pageSize));
    }
  }, [allBlogsData, pageSize]);

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
    setPageIndex(0); // Reset page index when resetting filters
  };

  const handlePageChange = (newPageIndex: number) => {
    setPageIndex(newPageIndex);
  };

  const blogs = allBlogsData?.data.blogs as Blog[];
  const categories = categoriesData?.data.categories;
  const featured = allFeaturedBlogsData?.data.blogs as Blog[];

  return (
    <>
      <div className="relative py-12 md:py-20">
        <div className="flex flex-col max-w-7xl justify-center mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="md:col-span-2">
              <div className="flex flex-col">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                  <h1 className="font-bold sm:text-xl md:text-3xl xl:text-3xl">
                    All Articles
                  </h1>
                  <div className="flex flex-row gap-5">
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
                        {categories?.map((category: Category) => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                <Input
                  type="text"
                  className="md:w-full my-5"
                  placeholder="Search articles"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className="h-[1px] w-full bg-[#D0D1D3] my-5"></div>
              </div>
              {isLoading ? (
                <div className="grid grid-cols-1 gap-5">
                  <Skeleton className="w-full h-44" />
                  <Skeleton className="w-full h-44" />
                  <Skeleton className="w-full h-44" />
                </div>
              ) : (
                blogs && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
                    {blogs.map((blog) => (
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
                    ))}
                  </div>
                )
              )}
              <div className="flex md:hidden justify-center gap-3 mt-8">
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
                    <div
                      className="bg-[#FBF6EA] hover:bg-yellowLTK/20"
                      key={blog.id}
                    >
                      <Link
                        href={`/articles/${blog.slug}`}
                        className="bg-[#FBF6EA] hover:bg-yellowLTK/20"
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
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <div className="hidden md:flex justify-center gap-3 mt-8">
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

export default AllArticles;
