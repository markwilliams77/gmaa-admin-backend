import { Request, Response } from "express";
import { seedDemoData, purgeDemoData } from "../services/system.service";
import { sendError, sendSuccess } from "../utils/response.util";

export const systemController = {
  async seedDemoData(_req: Request, res: Response) {
    try {
      const message = await seedDemoData();
      return sendSuccess(res, { message });
    } catch (error) {
      return sendError(res, 500, error instanceof Error ? error.message : "Unable to seed demo data");
    }
  },

  async purgeDemoData(_req: Request, res: Response) {
    try {
      const message = await purgeDemoData();
      return sendSuccess(res, { message });
    } catch (error) {
      return sendError(res, 500, error instanceof Error ? error.message : "Unable to purge demo data");
    }
  }
};
