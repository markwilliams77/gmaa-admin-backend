import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import prisma from "../db/client";

export interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

export async function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Missing authorization token" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET) as { userId: string };
    const admin = await prisma.admin.findUnique({ where: { id: decoded.userId } });

    if (!admin) {
      return res.status(401).json({ success: false, message: "Invalid authorization token" });
    }

    req.user = { id: admin.id };
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
}

export function adminOnly(req: AuthRequest, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(403).json({ success: false, message: "Admin access required" });
  }
  next();
}
