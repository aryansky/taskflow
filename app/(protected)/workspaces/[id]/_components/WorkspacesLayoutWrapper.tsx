"use client";

import { MobileNavItemType } from "@/components/ui/layout/MobileNavigation";
import PageContainer from "@/components/ui/layout/page-container";
import { SidebarItemType } from "@/components/ui/layout/Sidebar";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function WorkspacesLayoutWrapper({
  workspaceId,
  children,
  sidebarItems,
  mobileNavItems,
  user,
}: {
  user: {
    name: string;
    email: string;
    imageUrl: string;
  };
  workspaceId: string;
  children: ReactNode;
  sidebarItems: SidebarItemType[];
  mobileNavItems: MobileNavItemType[];
}) {
  const pathname = usePathname();

  const backPath =
    pathname === `/workspaces/${workspaceId}`
      ? "/workspaces"
      : `/workspaces/${workspaceId}`;

  return (
    <PageContainer
      mobileNavItems={mobileNavItems}
      user={user}
      backPath={backPath}
      sidebarItems={sidebarItems}
    >
      {children}
    </PageContainer>
  );
}
