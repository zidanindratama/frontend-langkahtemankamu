import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { truncateText } from "@/helpers/truncateText";
import { formatDate } from "@/helpers/formatDate";

interface Author {
  id: string;
  role: "BLOGGER";
  email: string;
  name: string;
  bio: string | null;
  image: string | null;
  password: string;
  createdAt: string;
  updatedAt: string;
}

interface EventCategory {
  id: string;
  eventId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  content: string;
  image: string;
  startEvent: string;
  onlineUrl: string;
  location: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
  eventCategories: EventCategory[];
}

export const EventColumn: ColumnDef<Event>[] = [
  {
    accessorKey: "image",
    header: ({ column }) => {
      return (
        <Button className="font-Sora" variant="ghost">
          Image
        </Button>
      );
    },
    cell: ({ row }) => {
      const blog = row.original;
      return (
        <Image
          src={blog.image}
          alt={blog.slug}
          width={612}
          height={344}
          className="w-full md:w-96 md:h-72 object-contain"
        />
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button className="font-Sora" variant="ghost">
          Title
        </Button>
      );
    },
    cell: ({ row }) => {
      const blog = row.original;
      return <div className="capitalize">{truncateText(blog.title, 30)}</div>;
    },
  },
  {
    accessorKey: "author",
    header: ({ column }) => {
      return (
        <Button className="font-Sora" variant="ghost">
          Author
        </Button>
      );
    },
    cell: ({ row }) => {
      const blog = row.original;
      return <div className="capitalize">{blog.author.name}</div>;
    },
  },
  {
    accessorKey: "startEvent",
    header: ({ column }) => {
      return (
        <Button className="font-Sora" variant="ghost">
          Date
        </Button>
      );
    },
    cell: ({ row }) => {
      const blog = row.original;
      return <div className="capitalize">{formatDate(blog.startEvent)}</div>;
    },
  },
  {
    accessorKey: "edit",
    header: ({ column }) => {
      return <h1>Update</h1>;
    },
    cell: ({ row }) => {
      const blog = row.original;

      return (
        <div className="p-2 rounded-full w-fit bg-[#FEF4E8]">
          <Link href={`/dashboard/events/${blog.slug}`}>
            <Pencil className="w-5 h-5 text-[#F1901A]" />
          </Link>
        </div>
      );
    },
  },
];
