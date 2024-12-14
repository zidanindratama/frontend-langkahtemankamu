import EventCategoryDeleteForm from "@/components/dashboard/events/categories/EventCategoryDeleteFom";
import EventCategoryUpdateForm from "@/components/dashboard/events/categories/EventCategoryUpdateForm";
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
  id: string;
};

type Props = {
  params: Param;
};

const EventCategoryUpdatePage = ({
  params: { slug, id: eventCategoryId },
}: Props) => {
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
                <BreadcrumbLink href="/dashboard/events">events</BreadcrumbLink>
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
        <div className="mb-5">
          <EventCategoryDeleteForm
            eventCategoryId={eventCategoryId}
            eventSlug={slug}
          />
        </div>
        <EventCategoryUpdateForm
          eventCategoryId={eventCategoryId}
          eventSlug={slug}
        />
      </div>
    </div>
  );
};

export default EventCategoryUpdatePage;
