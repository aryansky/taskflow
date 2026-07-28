import PageContainer from "@/components/ui/layout/page-container";
import { auth } from "@/lib/auth";
import { getMainNavItems, getMobileMainNavItems } from "@/lib/navigation";

export default async function MainNavLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <PageContainer
      user={session!.user}
      sidebarItems={getMainNavItems()}
      mobileNavItems={getMobileMainNavItems()}
    >
      {children}
    </PageContainer>
  );
}
