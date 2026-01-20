import { auth } from "@/lib/auth";
export default async function Dashboard() {
  const session = await auth();

  return (
    <div className="mt-40 flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold text-gray-700">
        Email: {session!.user.email}
      </h2>
      <h2 className="text-xl font-bold text-gray-700">
        Role: {session!.user.role}
      </h2>
    </div>
  );
}
