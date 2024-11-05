"use client";

import { Button } from "@/components/ui/button";
import { useDeleteData } from "@/hooks/useDeleteData";
import { Trash } from "lucide-react";
import React from "react";

type Props = {
  slug: string;
};

const CategoryDeleteForm = ({ slug }: Props) => {
  const mutationCategoryDelete = useDeleteData({
    queryKey: "categoriesData",
    dataProtected: `categories/${slug}`,
    backUrl: `/dashboard/categories`,
  });

  const handleDelete = (e: any) => {
    e.preventDefault();
    mutationCategoryDelete.mutate();
  };

  return (
    <div className="flex flex-row justify-end">
      <Button
        variant={"destructive"}
        className="flex flex-row gap-2"
        onClick={handleDelete}
      >
        <Trash className="w-4 h-4" />
        Delete Category
      </Button>
    </div>
  );
};

export default CategoryDeleteForm;
