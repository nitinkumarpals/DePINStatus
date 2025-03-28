import express, { Request, Response } from "express";
import { authMiddleware } from "./middlewares/auth.middleware";
import { prisma } from "db/client";
const app = express();
const port = 3000;
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "hello world" });
});

app.post(
  "/api/v1/website",
  authMiddleware,
  (req: Request, res: Response) => {}
);

app.post(
  "/api/v1/website/status",
  authMiddleware,
  (req: Request, res: Response) => {}
);

app.post(
  "/api/v1/websites",
  authMiddleware,
  (req: Request, res: Response) => {}
);

app.delete(
  "/api/v1/website",
  authMiddleware,
  (req: Request, res: Response) => {}
);

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
