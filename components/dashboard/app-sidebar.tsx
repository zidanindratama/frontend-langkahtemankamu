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
  Users,
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
      title: "Users",
      url: "/dashboard/users",
      icon: Users,
      items: [
        {
          title: "List of Users",
          url: "/dashboard/users",
        },
      ],
      roles: ["ADMINISTRATOR"],
    },
    {
      title: "Article Categories",
      url: "/dashboard/categories",
      icon: SquareTerminal,
      items: [
        {
          title: "Add Article Category",
          url: "/dashboard/categories/add",
        },
        {
          title: "List of Article Categories",
          url: "/dashboard/categories",
        },
      ],
      roles: ["ADMINISTRATOR"],
    },
    {
      title: "Event Categories",
      url: "/dashboard/event-categories",
      icon: SquareTerminal,
      items: [
        {
          title: "Add Event Category",
          url: "/dashboard/event-categories/add",
        },
        {
          title: "List of Event Categories",
          url: "/dashboard/event-categories",
        },
      ],
      roles: ["ADMINISTRATOR"],
    },
    {
      title: "Articles",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Add Article",
          url: "/dashboard/articles/add",
        },
        {
          title: "List of Articles",
          url: "/dashboard/articles",
        },
      ],
      roles: ["ADMINISTRATOR", "BLOGGER"],
    },
    {
      title: "Events",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Add Event",
          url: "/dashboard/events/add",
        },
        {
          title: "List of Events",
          url: "/dashboard/events",
        },
      ],
      roles: ["ADMINISTRATOR", "BLOGGER"],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: myProfile, isSuccess } = useFetchData({
    queryKey: ["myProfile"],
    dataProtected: `users/me`,
  });

  const filteredNavMain = data.navMain.filter(
    (item) => !item.roles || item.roles.includes(myProfile?.data.role)
  );

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={filteredNavMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={myProfile?.data} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
