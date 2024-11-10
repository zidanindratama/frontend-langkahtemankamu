"use client";

import { Button } from "@/components/ui/button";
import { useDeleteData } from "@/hooks/useDeleteData";
import { Trash } from "lucide-react";
import React from "react";

type Props = {
  slug: string;
};

const BlogDeleteForm = ({ slug }: Props) => {
  const mutationBlogDelete = useDeleteData({
    queryKey: "blogsData",
    dataProtected: `blogs/${slug}`,
    backUrl: `/dashboard/blogs`,
  });

  const handleDelete = (e: any) => {
    e.preventDefault();
    mutationBlogDelete.mutate();
  };

  return (
    <div className="flex flex-row justify-end">
      <Button
        variant={"destructive"}
        className="flex flex-row gap-2"
        onClick={handleDelete}
      >
        <Trash className="w-4 h-4" />
        Delete Blog
      </Button>
    </div>
  );
};

export default BlogDeleteForm;
