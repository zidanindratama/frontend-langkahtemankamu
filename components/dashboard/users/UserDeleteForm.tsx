"use client";

import { Button } from "@/components/ui/button";
import { useDeleteData } from "@/hooks/useDeleteData";
import { Trash } from "lucide-react";
import React from "react";

type Props = {
  userId: string;
};

const UserDeleteForm = ({ userId }: Props) => {
  const mutationUserDelete = useDeleteData({
    queryKey: "usersData",
    dataProtected: `users/${userId}`,
    backUrl: `/dashboard/users`,
  });

  const handleDelete = (e: any) => {
    e.preventDefault();
    mutationUserDelete.mutate();
  };

  return (
    <div className="flex flex-row justify-end">
      <Button
        variant={"destructive"}
        className="flex flex-row gap-2"
        onClick={handleDelete}
      >
        <Trash className="w-4 h-4" />
        Delete User
      </Button>
    </div>
  );
};

export default UserDeleteForm;
