import { prisma } from "../src/index";
export const seed = async () => {
  await prisma.user.create({
    data: {
      id: "1",
      email: "a@b.com",
    },
  });

  await prisma.website.create({
    data: {
      id: "1",
      url: "https://example.com",
      userId: "1",
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
      id: "1",
      websiteId: "1",
      status: "Good",
      createdAt: new Date(),
      latency: 100,
      validatorId: validator.id,
    },
  });
  await prisma.websiteTick.create({
    data: {
      id: "1",
      websiteId: "1",
      status: "Good",
      createdAt: new Date(Date.now() - 1000 * 60 * 10),
      latency: 100,
      validatorId: validator.id,
    },
  });
  await prisma.websiteTick.create({
    data: {
      id: "1",
      websiteId: "1",
      status: "Bad",
      createdAt: new Date(Date.now() - 1000 * 60 * 20),
      latency: 100,
      validatorId: validator.id,
    },
  });
};
