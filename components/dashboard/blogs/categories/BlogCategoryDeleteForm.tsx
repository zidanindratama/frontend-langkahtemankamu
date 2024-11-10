"use client";

import { Button } from "@/components/ui/button";
import { useDeleteData } from "@/hooks/useDeleteData";
import { Trash } from "lucide-react";
import React from "react";

type Props = {
  blogSlug: string;
  blogCategoryId: string;
};

const BlogCategoryDeleteForm = ({ blogCategoryId, blogSlug }: Props) => {
  const mutationBlogCategoryDelete = useDeleteData({
    queryKey: "blogData",
    dataProtected: `categories-on-blogs/${blogCategoryId}`,
    backUrl: `/dashboard/blogs/${blogSlug}`,
  });

  const handleDelete = (e: any) => {
    e.preventDefault();
    mutationBlogCategoryDelete.mutate();
  };

  return (
    <div className="flex flex-row justify-end">
      <Button
        variant={"destructive"}
        className="flex flex-row gap-2"
        onClick={handleDelete}
      >
        <Trash className="w-4 h-4" />
        Delete Blog Category
      </Button>
    </div>
  );
};

export default BlogCategoryDeleteForm;
