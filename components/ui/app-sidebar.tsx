import * as React from "react";
import { GalleryVerticalEnd } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AppSidebarMenu from "./app-sidebar-menu";
import prisma from "@/lib/prisma";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const workspaces = await prisma.workspaceMember.findMany({
    where: { userId: session.user.id },
    select: {
      workspace: { select: { name: true, id: true } },
    },
  });

  const sidebarData = {
    data: [
      {
        title: "Dashboard",
        url: "/dashboard",
      },
      {
        title: "Workspaces",
        url: "/workspaces",
        items: workspaces.map((w) => {
          return {
            id: w.workspace.id,
            title: w.workspace.name,
            url: `/workspaces/${w.workspace.id}`,
          };
        }),
      },
    ],
  };

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">TaskFlow</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <AppSidebarMenu sidebarData={sidebarData} />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={session.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
