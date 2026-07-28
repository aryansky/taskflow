"use client";

import { usePathname } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "./sidebar";

interface SidebarDataType {
  data: {
    title: string;
    url: string;
    isActive?: boolean;
    items?: {
      id: string;
      title: string;
      url: string;
      isActive?: boolean;
    }[];
  }[];
}

export default function AppSidebarMenu({
  sidebarData,
}: {
  sidebarData: SidebarDataType;
}) {
  const pathname = usePathname();

  console.log("URL Requested is: ", pathname);

  return (
    <SidebarMenu className="gap-2">
      {sidebarData.data.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild isActive={item.url === pathname}>
            <a href={item.url} className="font-medium">
              {item.title}
            </a>
          </SidebarMenuButton>
          {item.items?.length ? (
            <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
              {item.items.map((item) => (
                <SidebarMenuSubItem key={item.id}>
                  <SidebarMenuSubButton
                    asChild
                    isActive={pathname.startsWith(item.url)}
                  >
                    <a href={item.url}>{item.title}</a>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          ) : null}
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
