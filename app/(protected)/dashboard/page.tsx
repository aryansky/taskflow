import { auth } from "@/lib/auth";
export default async function Dashboard() {
  const session = await auth();

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Email: {session!.user.email}</h2>
      <h2>Role: {session!.user.role}</h2>
    </div>
  );
}
