import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const main = async () => {
  const user = await prisma.user.create({
    data: {
      email: "abcde@b.com",
    },
  });

  const website = await prisma.website.create({
    data: {
      url: "https://example.com",
      userId: user.id,
    },
  });

  const validator = await prisma.validator.create({
    data: {
      publicKey: "udh9398293",
      location: "Delhi",
      ip: "127.0.0.1",
    },
  });
  await prisma.websiteTick.create({
    data: {
      websiteId: website.id,
      status: "Good",
      createdAt: new Date(),
      latency: 100,
      validatorId: validator.id,
    },
  });
  await prisma.websiteTick.create({
    data: {
      websiteId: website.id,
      status: "Good",
      createdAt: new Date(Date.now() - 1000 * 60 * 10),
      latency: 100,
      validatorId: validator.id,
    },
  });
  await prisma.websiteTick.create({
    data: {
      websiteId: website.id,
      status: "Bad",
      createdAt: new Date(Date.now() - 1000 * 60 * 20),
      latency: 100,
      validatorId: validator.id,
    },
  });
};
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
