import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];
  if (!token) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }

  const decoded = jwt.verify(token, process.env.JWT_PUBLIC_KEY ?? "");
  if (!decoded || !decoded.sub) {
    res.status(401).json({
      error: "Unauthorized",
    });
  }
  req.userId = decoded.sub as string;
  next();
};
