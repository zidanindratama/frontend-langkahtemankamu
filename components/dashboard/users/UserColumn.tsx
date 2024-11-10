import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";
import RoleBadge from "@/components/RoleBadge";

interface UserProfile {
  id: string;
  role: "ADMINISTRATOR" | "BLOGGER" | "MEMBER";
  email: string;
  name: string;
  image: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export const UserColumn: ColumnDef<UserProfile>[] = [
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button className="font-Sora" variant="ghost">
          Role
        </Button>
      );
    },
    cell: ({ row }) => {
      const user = row.original;
      return <RoleBadge user={user} />;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button className="font-Sora" variant="ghost">
          Email
        </Button>
      );
    },
    cell: ({ row }) => {
      const user = row.original;
      return <div className="lowercase">{user.email}</div>;
    },
  },
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
      const user = row.original;
      return <div className="capitalize">{user.name}</div>;
    },
  },
  {
    accessorKey: "edit",
    header: ({ column }) => {
      return <h1>Update</h1>;
    },
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="p-2 rounded-full w-fit bg-[#FEF4E8]">
          <Link href={`/dashboard/users/${user.id}`}>
            <Pencil className="w-5 h-5 text-[#F1901A]" />
          </Link>
        </div>
      );
    },
  },
];
