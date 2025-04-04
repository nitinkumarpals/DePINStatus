import type { NextFunction, Request, Response } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  req.userId = "e306d8c9-62cf-4221-b786-66bbf01f9dfc";
  next();
};
