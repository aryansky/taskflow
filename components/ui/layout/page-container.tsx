import { ReactNode } from "react";
import { Sidebar, SidebarItemType } from "./Sidebar";
import { MobileNavigation, MobileNavItemType } from "./MobileNavigation";

export type BreadcrumbType = {
  title: string;
  href: string;
};

export type LayoutProps = {
  backPath?: string;
  sidebarItems: SidebarItemType[];
  mobileNavItems: MobileNavItemType[];
  children: ReactNode;
};

export default function PageContainer({
  backPath,
  user,
  sidebarItems,
  mobileNavItems,
  children,
}: LayoutProps & {
  user: {
    name: string;
    email: string;
    imageUrl: string;
  };
}) {
  return (
    <main className="flex">
      <div>
        <Sidebar user={user} backPath={backPath} sidebarItems={sidebarItems} />
      </div>
      {children}
      <MobileNavigation mobileNavItems={mobileNavItems} />
    </main>
  );
}
