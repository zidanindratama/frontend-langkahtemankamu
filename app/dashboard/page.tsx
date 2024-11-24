"use client";

import BlogDataTable from "@/components/dashboard/blogs/BlogDataTable";
import CategoryDataTable from "@/components/dashboard/categories/CategoryDataTable";
import Stats from "@/components/dashboard/Stats";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useFetchData } from "@/hooks/useFetchData";
import React from "react";
import UserSettingPage from "./settings/page";

const DashboardPage = () => {
  const { data: myProfile, isSuccess } = useFetchData({
    queryKey: ["myProfile"],
    dataProtected: `users/me`,
  });

  return (
    <div>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="p-4">
        <Stats />
        {myProfile && myProfile.data.role === "ADMINISTRATOR" && (
          <div className="mt-10 grid grid-cols-1 gap-5 md:gap-10">
            <CategoryDataTable />
            <div className="w-full h-[1px] bg-black/30"></div>
            <BlogDataTable />
          </div>
        )}
        {myProfile && myProfile.data.role === "BLOGGER" && (
          <div className="mt-10 grid grid-cols-1 gap-5 md:gap-10">
            <BlogDataTable />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
