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
import { UserColumn } from "./UserColumn";

const UserDataTable = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const debouncedSearch = useDebounce<string>(search, 1000);

  const {
    data: usersData,
    isLoading: isLoadingUsersData,
    isSuccess: isSuccessUsersData,
    refetch,
    isRefetching,
  } = useFetchData({
    queryKey: ["usersData", pageIndex.toString()],
    dataProtected: `users?pgNum=${
      pageIndex + 1
    }&pgSize=${pageSize}&name=${debouncedSearch}&role=${selectedRole || ""}`,
  });

  const users = usersData?.data.user;
  const usersMeta = usersData?.data.meta;

  const resetFilter = () => {
    setSearch("");
    setSelectedRole(null);
  };

  useEffect(() => {
    refetch();
  }, [debouncedSearch, selectedRole, refetch]);

  return (
    <div className="overflow-hidden">
      {(isLoadingUsersData || isRefetching) && (
        <Skeleton className="w-full h-96" />
      )}
      {isSuccessUsersData && !isRefetching && (
        <>
          <Card className="max-w-full">
            <CardHeader>
              <div className="flex flex-col md:flex-row gap-5 md:items-center justify-between mb-8">
                <CardTitle>Users</CardTitle>
                <div className="flex flex-row gap-2 items-center">
                  <Input
                    type="text"
                    className="md:w-fit"
                    placeholder="Search user"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Button variant={"destructive"} onClick={resetFilter}>
                    Reset
                  </Button>
                </div>
              </div>
              <div>
                <Select onValueChange={(value) => setSelectedRole(value)}>
                  <SelectTrigger className="md:w-[180px]">
                    <SelectValue
                      placeholder={
                        selectedRole !== null ? selectedRole : "Role"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADMINISTRATOR">ADMINISTRATOR</SelectItem>
                    <SelectItem value="BLOGGER">BLOGGER</SelectItem>
                    <SelectItem value="MEMBER">MEMBER</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                data={users}
                columns={UserColumn}
                pageCount={Math.ceil(usersMeta.count / pageSize)}
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

export default UserDataTable;
