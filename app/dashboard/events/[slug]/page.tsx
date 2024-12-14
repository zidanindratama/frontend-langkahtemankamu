import EventCategoryDataTable from "@/components/dashboard/events/categories/EventCategoryDataTable";
import EventDeleteForm from "@/components/dashboard/events/EventDeleteForm";
import EventUpdateForm from "@/components/dashboard/events/EventUpdateForm";
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

const EditBlogPage = ({ params: { slug } }: Props) => {
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
              <BreadcrumbLink href="/dashboard/events">Events</BreadcrumbLink>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/dashbooard/events/${slug}`}>
                  Update
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="p-4">
        <div className="mb-5">
          <EventDeleteForm slug={slug} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10">
          <div className="md:col-span-2">
            <TooltipProvider>
              <EventUpdateForm slug={slug} />
            </TooltipProvider>
          </div>
          <EventCategoryDataTable eventSlug={slug} />
        </div>
      </div>
    </div>
  );
};

export default EditBlogPage;
