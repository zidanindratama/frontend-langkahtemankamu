"use client";

import { Button } from "@/components/ui/button";
import { useDeleteData } from "@/hooks/useDeleteData";
import { Trash } from "lucide-react";
import React from "react";

type Props = {
  eventSlug: string;
  eventCategoryId: string;
};

const EventCategoryDeleteForm = ({ eventCategoryId, eventSlug }: Props) => {
  const mutationEventCategory = useDeleteData({
    queryKey: "blogData",
    dataProtected: `event-categories-on-events/${eventCategoryId}`,
    backUrl: `/dashboard/events/${eventSlug}`,
  });

  const handleDelete = (e: any) => {
    e.preventDefault();
    mutationEventCategory.mutate();
  };

  return (
    <div className="flex flex-row justify-end">
      <Button
        variant={"destructive"}
        className="flex flex-row gap-2"
        onClick={handleDelete}
      >
        <Trash className="w-4 h-4" />
        Delete Event Category
      </Button>
    </div>
  );
};

export default EventCategoryDeleteForm;
