import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const joi = await prisma.user.upsert({
    where: {
      email: "test1@gmail.com",
    },
    update: {},
    create: {
      email: "test1@gmail.com",
      name: "test1",
      id: 1,
      password: "12345678",
      profile: {
        create: {
          id: 1,
          bio: "I'm a programmer",
        },
      },
      posts: {
        create: [
          {
            id: 1,
            title: "its my first post",
            content: "I'm tring to learn relation db",
            published: true,
          },
          {
            id: 2,
            title: "Follow Nexus on Twitter",
            content: "https://twitter.com/nexusgql",
            published: true,
          },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
