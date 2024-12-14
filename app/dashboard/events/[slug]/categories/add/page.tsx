import BlogCategoryAddForm from "@/components/dashboard/blogs/categories/BlogCategoryAddForm";
import EventCategoryAddForm from "@/components/dashboard/events/categories/EventCategoryAddForm";
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
import { TooltipProvider } from "@/components/ui/tooltip";
import React from "react";

type Param = {
  slug: string;
};

type Props = {
  params: Param;
};

const EventCategoryAddPage = ({ params: { slug } }: Props) => {
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
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard/events">Events</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/dashbooard/events/${slug}`}>
                  Category
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="p-4">
        <EventCategoryAddForm eventSlug={slug} />
      </div>
    </div>
  );
};

export default EventCategoryAddPage;