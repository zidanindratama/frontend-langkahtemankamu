import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";

interface BlogCategory {
  id: string;
  blogId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  blog: Blog;
  category: Category;
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
}

interface Category {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export const BlogCategoryColumn: ColumnDef<BlogCategory>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button className="font-Sora" variant="ghost">
          Nama
        </Button>
      );
    },
    cell: ({ row }) => {
      const blogCategory = row.original;
      return <div className="capitalize">{blogCategory.category.name}</div>;
    },
  },
  {
    accessorKey: "edit",
    header: ({ column }) => {
      return <h1>Update</h1>;
    },
    cell: ({ row }) => {
      const blogCategory = row.original;

      return (
        <div className="p-2 rounded-full w-fit bg-[#FEF4E8]">
          <Link
            href={`/dashboard/blogs/${blogCategory.blog.slug}/categories/${blogCategory.id}`}
          >
            <Pencil className="w-5 h-5 text-[#F1901A]" />
          </Link>
        </div>
      );
    },
  },
];
