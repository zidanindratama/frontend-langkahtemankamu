import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { Event } from "../EventColumn";
import { EventCategory } from "../../event-categories/EventCategoryColumn";

interface EventCategoryonEvent {
  id: string;
  blogId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  event: Event;
  eventCategory: EventCategory;
}

export const EventCategoryonEventColumn: ColumnDef<EventCategoryonEvent>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button className="font-Sora" variant="ghost">
          Name
        </Button>
      );
    },
    cell: ({ row }) => {
      const blogCategory = row.original;
      return (
        <div className="capitalize">{blogCategory.eventCategory.name}</div>
      );
    },
  },
  {
    accessorKey: "edit",
    header: ({ column }) => {
      return <h1>Update</h1>;
    },
    cell: ({ row }) => {
      const eventCategory = row.original;

      return (
        <div className="p-2 rounded-full w-fit bg-[#FEF4E8]">
          <Link
            href={`/dashboard/events/${eventCategory.event.slug}/categories/${eventCategory.id}`}
          >
            <Pencil className="w-5 h-5 text-[#F1901A]" />
          </Link>
        </div>
      );
    },
  },
];
