"use client";

import { Button } from "@/components/ui/button";
import { useDeleteData } from "@/hooks/useDeleteData";
import { Trash } from "lucide-react";
import React from "react";

type Props = {
  slug: string;
};

const EventDeleteForm = ({ slug }: Props) => {
  const mutationEventDelete = useDeleteData({
    queryKey: "eventsData",
    dataProtected: `events/${slug}`,
    backUrl: `/dashboard/events`,
  });

  const handleDelete = (e: any) => {
    e.preventDefault();
    mutationEventDelete.mutate();
  };

  return (
    <div className="flex flex-row justify-end">
      <Button
        variant={"destructive"}
        className="flex flex-row gap-2"
        onClick={handleDelete}
      >
        <Trash className="w-4 h-4" />
        Delete Event
      </Button>
    </div>
  );
};

export default EventDeleteForm;
