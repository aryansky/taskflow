import { PrismaClient, Status } from "@/lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

export const seedEmails: string[] = [
  "alex.morgan@example.com",
  "rahul.verma@example.com",
  "john.doe@example.com",
  "sarah.connor@example.com",
  "arjun.patel@example.com",
  "emily.watson@example.com",
  "michael.brown@example.com",
  "neha.sharma@example.com",
  "daniel.kim@example.com",
  "priya.singh@example.com",
  "robert.johnson@example.com",
  "ananya.iyer@example.com",
  "kevin.lee@example.com",
  "meera.nair@example.com",
  "chris.anderson@example.com",
  "vikram.malhotra@example.com",
  "laura.thompson@example.com",
  "amit.kapoor@example.com",
  "jessica.miller@example.com",
  "siddharth.jain@example.com",
];

export const seedTaskTitles: string[] = [
  "Fix login redirect bug",
  "Refactor auth middleware",
  "Add email verification flow",
  "Optimize database indexes",
  "Create reusable form input",
  "Fix mobile navbar overflow",
  "Add loading skeletons",
  "Implement rate limiting",
  "Cleanup unused API routes",
  "Improve error handling",
  "Add password strength validation",
  "Fix comment pagination bug",
  "Add user profile page",
  "Optimize image uploads",
  "Add dark mode toggle",
  "Audit environment variables",
  "Implement search debounce",
  "Fix logout on token expiry",
  "Add basic analytics logging",
  "Refactor vote logic",
  "Improve accessibility labels",
  "Add server health endpoint",
  "Fix duplicate notifications",
  "Standardize API response format",
  "Add basic admin role",
  "Reduce frontend bundle size",
  "Add task status filters",
  "Fix timezone issues in dates",
  "Write database seed script",
  "Update README documentation",
];

async function main() {
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
      return {
        name: email.split(".")[0],
        email: email,
      };
    }),
    skipDuplicates: true,
  });

  const users = await prisma.user.findMany();

  // Create tasks
  for (const user of users) {
    const assignee = users[Math.floor(Math.random() * users.length)];

    await prisma.task.create({
      data: {
        title:
          seedTaskTitles[Math.floor(Math.random() * seedTaskTitles.length)],
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        status: ["TBD", "IN_PROGRESS", "DONE"][
          Math.floor(Math.random() * 3)
        ] as Status,
        assignedTo: {
          connect: {
            id: assignee.id,
          },
        },
        createdBy: {
          connect: {
            id: user.id,
          },
        },
      },
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
