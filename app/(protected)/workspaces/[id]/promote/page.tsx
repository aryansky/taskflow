import { requireWorkspaceMember } from "@/lib/workspace/guards";
import AdminPromoteForm from "./AdminPromoteForm";
import { forbidden, notFound } from "next/navigation";
import { getWorkspace } from "@/lib/workspace/queries";
import MainContainer from "@/components/ui/layout/main-container";

export default async function Promote({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workspace = await getWorkspace(id);
  if (!workspace) notFound();

  const membership = await requireWorkspaceMember(id);

  if (membership.role !== "OWNER") forbidden();

  return (
    <MainContainer
      breadcrumbs={[
        { title: "workspaces", href: "/workspaces" },
        { title: `${workspace.name}`, href: `/workspaces/${workspace.id}` },
        { title: "Promote", href: `/workspaces/${workspace.id}/promote` },
      ]}
      heading={"Promote"}
    >
      <div className="max-w-2xl">
        <AdminPromoteForm workspaceId={membership.workspaceId} />
      </div>
    </MainContainer>
  );
}
