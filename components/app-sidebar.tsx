"use client";

import * as React from "react";
import { GalleryVerticalEnd, PieChart, SquareTerminal } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavProjects } from "./nav-projects";
import { useTranslations } from "next-intl";

// This is sample data.

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const tSidebar = useTranslations("sidebar");
  const tDashboard = useTranslations("dashboard");
  const data = {
    teams: [
      {
        name: tSidebar("header.title"),
        logo: GalleryVerticalEnd,
        plan: tSidebar("header.subtitle"),
      },
    ],
    navMain: [
      {
        title: tDashboard("personalinfo.title"),
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: tDashboard("personalinform.title"),
            url: "/personal-info/basicinformationform",
          },
          {
            title: tDashboard("educationinfo.title"),
            url: "/personal-info/educationinformationform",
          },
        ],
      },
      {
        title: tDashboard("residentialinfo.title"),
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: tDashboard("addressinfo.title"),
            url: "/residential-info/addressinformationform",
          },
          {
            title: tDashboard("termsandconditions.title"),
            url: "/residential-info/termsandconditionsform",
          },
        ],
      },
    ],
    projects: [
      {
        name: tSidebar("dashsection.title"),
        url: "/dashboard",
        icon: PieChart,
      },
    ],
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
