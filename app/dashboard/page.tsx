import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/")
    }

    return <div>
        <h1>Dashboard</h1>
        <h2>{session.user.email}</h2>
    </div>
}