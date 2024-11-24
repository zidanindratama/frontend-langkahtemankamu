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
import { BlogCategoryColumn } from "./BlogCategoriesColumn";

type Props = {
  blogSlug: string;
};

const BlogCategoriesDataTable = ({ blogSlug }: Props) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: blogCategoriesData,
    isLoading: isLoadingBlogCategoriesData,
    isSuccess: isSuccessBlogCategoriesData,
    refetch,
    isRefetching,
  } = useFetchData({
    queryKey: ["blogCategoriesData", pageIndex.toString()],
    dataProtected: `categories-on-blogs/${blogSlug}?pgNum=${
      pageIndex + 1
    }&pgSize=${pageSize}`,
  });

  const blogCategories = blogCategoriesData?.data.blogCategories;
  const blogCategoriesMeta = blogCategoriesData?.data.meta;

  return (
    <div className="overflow-hidden">
      {(isLoadingBlogCategoriesData || isRefetching) && (
        <Skeleton className="w-full h-96" />
      )}
      {isSuccessBlogCategoriesData && !isRefetching && (
        <>
          <Card className="max-w-full">
            <CardHeader>
              <div className="flex flex-col md:flex-row gap-5 md:items-center justify-between mb-8">
                <CardTitle>Article Categories</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                data={blogCategories}
                columns={BlogCategoryColumn}
                pageCount={Math.ceil(blogCategoriesMeta.count / pageSize)}
                pageIndex={pageIndex}
                pageSize={pageSize}
                setPageIndex={setPageIndex}
                setPageSize={setPageSize}
              />
            </CardContent>
            <CardFooter>
              <div className="flex flex-row justify-end mb-5">
                <Button variant={"yellowLTK"} asChild>
                  <Link href={`/dashboard/articles/${blogSlug}/categories/add`}>
                    Add Article Category
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

export default BlogCategoriesDataTable;
