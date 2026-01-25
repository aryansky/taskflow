import { PrismaClient, Status } from "@/lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { seedEmails } from "./data/users";
import { seedTaskTitles } from "./data/tasks";
import { pickRandom } from "./utils/random";
import { seedComments } from "./data/comments";
import { randomDate } from "./utils/randomDate";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

async function main() {
  // clear db
  await prisma.comment.deleteMany();
  await prisma.task.deleteMany();

  //create admin
  await prisma.user.upsert({
    where: { email: "admin@test.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@test.com",
      role: "ADMIN",
    },
  });

  // Create users
  await prisma.user.createMany({
    data: seedEmails.map((email) => {
      const [first, last] = email.split("@")[0].split(".");

      return {
        name: `${capitalize(first)} ${capitalize(last)}`,
        email: email,
      };
    }),
    skipDuplicates: true,
  });

  const users = await prisma.user.findMany();

  // Create tasks
  const TASK_COUNT = 50;
  for (let i = 0; i < TASK_COUNT; i++) {
    const creator = pickRandom(users);
    const assignee = pickRandom(users);
    const date = randomDate(new Date("2026-01-01"), new Date("2026-03-01"));

    await prisma.task.create({
      data: {
        title: pickRandom(seedTaskTitles),
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        status: pickRandom(["TBD", "IN_PROGRESS", "DONE"]) as Status,
        createdBy: { connect: { id: creator.id } },
        assignedTo: { connect: { id: assignee.id } },
        dueDate: date,
      },
    });
  }

  const tasks = await prisma.task.findMany();

  for (const task of tasks) {
    for (let i = 0; i < Math.floor(Math.random() * 14); i++) {
      await prisma.comment.create({
        data: {
          text: pickRandom(seedComments),
          taskId: task.id,
          userId: pickRandom(users).id,
        },
      });
    }
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
