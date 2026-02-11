import { requireWorkspaceMember } from "@/lib/workspace/guards";
import AdminPromoteForm from "./AdminPromoteForm";
import { forbidden, notFound } from "next/navigation";
import PageTitle from "@/components/ui/page-title";

import { getWorkspace } from "@/lib/workspace/queries";

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
    <div className="max-w-xl mx-auto p-6">
      <PageTitle>{workspace.name}</PageTitle>
      <hr className="mb-12" />
      <AdminPromoteForm workspaceId={membership.workspaceId} />
    </div>
  );
}
