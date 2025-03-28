import express, { Request, Response } from "express";
import { authMiddleware } from "./middlewares/auth.middleware";
import { prisma } from "db/client";
import { websiteSchema, websiteStatusSchema } from "schema/schema";
const app = express();
const port = 3000;
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "hello world" });
});

app.post(
  "/api/v1/website",
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.userId!;
      const parsedBody = websiteSchema.safeParse(req.body);
      if (!parsedBody.success) {
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: parsedBody.error.errors.map((err) => ({
            field: err.path[0],
            message: err.message,
          })),
        });
        return;
      }
      const { url } = parsedBody.data;
      const data = await prisma.website.create({
        data: {
          userId,
          url,
        },
      });
      res.status(201).json({ id: data.id });
      return;
    } catch (error: Error | any) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      });
      return;
    }
  }
);

app.post(
  "/api/v1/website/status",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const userId = req.userId!;
      const parsedBody = websiteStatusSchema.safeParse(req.query);

      if (!parsedBody.success) {
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: parsedBody.error.errors.map((err) => ({
            field: err.path[0],
            message: err.message,
          })),
        });
        return;
      }

      const { websiteId } = parsedBody.data;
      const data = await prisma.website.findFirst({
        where: {
          id: websiteId,
          userId,
          disabled: false,
        },
        include: {
          ticks: true,
        },
      });
      res.status(200).json(data);
      return;
    } catch (error: Error | any) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      });
      return;
    }
  }
);

app.post(
  "/api/v1/websites",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const userId = req.userId!;
      const data = await prisma.website.findMany({
        where: {
          userId,
          disabled: false,
        },
      });
      res.status(200).json(data);
      return;
    } catch (error: Error | any) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      });
      return;
    }
  }
);

app.delete(
  "/api/v1/website",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const userId = req.userId!;
      const parsedBody = websiteStatusSchema.safeParse(req.query);

      if (!parsedBody.success) {
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: parsedBody.error.errors.map((err) => ({
            field: err.path[0],
            message: err.message,
          })),
        });
        return;
      }

      const { websiteId } = parsedBody.data;
      await prisma.website.update({
        where: {
          id: websiteId,
          userId,
        },
        data: {
          disabled: true,
        },
      });
      res.status(200).json({ success: true });
      return;
    } catch (error: Error | any) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      });
      return;
    }
  }
);

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
