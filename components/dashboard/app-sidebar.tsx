"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Building2,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/dashboard/nav-main";
import { NavUser } from "@/components/dashboard/nav-user";
import { TeamSwitcher } from "@/components/dashboard/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useFetchData } from "@/hooks/useFetchData";

const data = {
  user: {
    name: "zidan indratama",
    email: "zidan@ltk.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "LTK",
      logo: Building2,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Categories",
      url: "/dashboard/categories",
      icon: SquareTerminal,
      items: [
        {
          title: "Add Category",
          url: "/dashboard/categories/add",
        },
        {
          title: "List of Categories",
          url: "/dashboard/categories",
        },
      ],
    },
    {
      title: "Blogs",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Add Blog",
          url: "/dashboard/blogs/add",
        },
        {
          title: "List of Blogs",
          url: "/dashboard/blogs",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: myProfile, isSuccess } = useFetchData({
    queryKey: ["myProfile"],
    dataProtected: `users/me`,
  });

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={myProfile?.data} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
