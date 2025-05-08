"use client"

import * as React from "react"
import {
  GalleryVerticalEnd,
  PieChart,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavProjects } from "./nav-projects"

// This is sample data.
const data = {
  teams: [
    {
      name: "Multi Step Form",
      logo: GalleryVerticalEnd,
      plan: "Forms",
    },
  ],
  navMain: [
    {
      title: "Personal Information",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Basic Information Form",
          url: "/personal-info/basicinformationform",
        },
        {
          title: "Education Information Form",
          url: "/personal-info/educationinformationform",
        },
      ],
    },
    {
        title: "Residential Information",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "Address Information Form",
            url: "/residential-info/addressinformationform",
          },
          {
            title: "Terms And Conditions Form",
            url: "/residential-info/termsandconditionsform",
          },
        ],
      },
  ],
  projects: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: PieChart,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
  )
}
