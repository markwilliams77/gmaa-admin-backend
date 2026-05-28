import { Response } from "express";

export function sendSuccess(res: Response, data: Record<string, unknown> = {}) {
  return res.json({ success: true, ...data });
}

export function sendError(res: Response, status: number, message: string) {
  return res.status(status).json({ success: false, message });
}
