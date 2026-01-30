import "dotenv/config";
import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const users = await prisma.user.findMany();

  for (const user of users) {
    await prisma.$transaction(async (tx) => {
      // 1. Find existing owned workspace
      let workspace = await tx.workspace.findFirst({
        where: {
          members: {
            some: {
              userId: user.id,
              role: "OWNER",
            },
          },
        },
      });

      // 2. Create workspace if none exists
      if (!workspace) {
        workspace = await tx.workspace.create({
          data: {
            name: `${user.name ?? user.email}'s workspace`,
            members: {
              create: {
                userId: user.id,
                role: "OWNER",
              },
            },
          },
        });
        console.log(`Created workspace for ${user.email}`);
      }

      // 3. Fetch tasks created by user
      const tasks = await tx.task.findMany({
        where: {
          createdById: user.id,
        },
      });

      for (const task of tasks) {
        // 4. Add assignee to workspace if needed

        await tx.workspaceMember.upsert({
          where: {
            userId_workspaceId: {
              userId: task.assignedToId,
              workspaceId: workspace.id,
            },
          },
          update: {},
          create: {
            userId: task.assignedToId,
            workspaceId: workspace.id,
            role: "MEMBER",
          },
        });

        // 5. Assign task to workspace
        await tx.task.update({
          where: { id: task.id },
          data: { workspaceId: workspace.id },
        });
      }
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
