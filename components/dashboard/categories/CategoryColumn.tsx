import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export const CategoryColumn: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button className="font-Sora" variant="ghost">
          Nama
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "edit",
    header: ({ column }) => {
      return <h1>Edit</h1>;
    },
    cell: ({ row }) => {
      const storeCategory = row.original;

      return (
        <div className="p-2 rounded-full w-fit bg-[#FEF4E8]">
          <Link href={`/dashboard/categories/${storeCategory.slug}`}>
            <Pencil className="w-5 h-5 text-[#F1901A]" />
          </Link>
        </div>
      );
    },
  },
];