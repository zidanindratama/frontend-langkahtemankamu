import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";
import Image from "next/image";

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

interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  image: string;
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
          width={1000}
          height={1000}
          className="md:w-96 md:h-72 object-cover"
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
      return <div className="capitalize">{blog.title}</div>;
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
