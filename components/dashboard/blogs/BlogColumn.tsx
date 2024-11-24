import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { truncateText } from "@/helpers/truncateText";

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

interface Category {
  id: string;
  blogId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  content: string;
  image: string;
  featured: boolean;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
  categories: Category[];
}

export const BlogColumn: ColumnDef<Blog>[] = [
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
    accessorKey: "featured",
    header: ({ column }) => {
      return (
        <Button className="font-Sora" variant="ghost">
          Featured
        </Button>
      );
    },
    cell: ({ row }) => {
      const blog = row.original;
      return (
        <div>
          {blog.featured === false ? (
            <Badge variant={"outline"}>Not Featured</Badge>
          ) : (
            <Badge variant={"default"}>Featured</Badge>
          )}
        </div>
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
    accessorKey: "edit",
    header: ({ column }) => {
      return <h1>Update</h1>;
    },
    cell: ({ row }) => {
      const blog = row.original;

      return (
        <div className="p-2 rounded-full w-fit bg-[#FEF4E8]">
          <Link href={`/dashboard/blogs/${blog.slug}`}>
            <Pencil className="w-5 h-5 text-[#F1901A]" />
          </Link>
        </div>
      );
    },
  },
];
