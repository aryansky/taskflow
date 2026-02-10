import * as React from "react";
import { ClipboardCheck } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { auth } from "@/lib/auth";
import { forbidden } from "next/navigation";
import prisma from "@/lib/prisma";

interface SidebarData {
  user: {
    name: string;
    email: string;
    imageUrl: string;
  };
  navMain: {
    title: string;
    url: string;
    isActive: boolean;
    items?: {
      title: string;
      url: string;
      isActive: boolean;
    }[];
  }[];
}

export async function AppSidebar({
  activeUrl,
  ...props
}: React.ComponentProps<typeof Sidebar> & { activeUrl: string }) {
  const session = await auth();
  if (!session) forbidden();
  const user = session.user;

  const memberships = await prisma.workspaceMember.findMany({
    where: { userId: session.user.id },
    include: { workspace: { select: { id: true, name: true } } },
    orderBy: { workspace: { name: "asc" } },
  });

  const data: SidebarData = {
    user: {
      name: user.name,
      email: user.email,
      imageUrl: user.imageUrl,
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        isActive: activeUrl.startsWith("/dashboard"),
      },
      {
        title: "Your Workspaces",
        url: "/workspaces",
        isActive: activeUrl === "/workspaces",
        items: [],
      },
    ],
  };

  memberships.forEach((membership) => {
    data.navMain[1].items!.push({
      title: membership.workspace.name,
      url: `/workspaces/${membership.workspace.id}`,
      isActive: activeUrl.startsWith(`/workspaces/${membership.workspace.id}`),
    });
  });

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <ClipboardCheck className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold text-xl">TaskFlow</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={item.isActive}>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem
                        className="text-nowrap"
                        key={item.title}
                      >
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
