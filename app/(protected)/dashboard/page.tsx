import { auth } from "@/lib/auth";
export default async function Dashboard() {
  const session = await auth();

  return (
    <div className="flex flex-col items-center w-full">
      <article className="prose prose-sm mt-8">
        <h3 className="flex justify-between items-center mb-0 w-xl">
          Email: {session!.user.email}
        </h3>
        <h3 className="flex justify-between items-center mb-0 w-xl">
          Role: {session!.user.role}
        </h3>
      </article>
    </div>
  );
}
