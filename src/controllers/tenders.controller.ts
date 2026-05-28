import { Request, Response } from "express";
import { getTenders, createTender, updateTender } from "../services/tenders.service";
import { sendError, sendSuccess } from "../utils/response.util";

export const tenderController = {
  async getTenders(_req: Request, res: Response) {
    try {
      const tenders = await getTenders();
      return sendSuccess(res, { tenders });
    } catch (error) {
      return sendError(res, 500, error instanceof Error ? error.message : "Unable to fetch tenders");
    }
  },

  async createTender(req: Request, res: Response) {
    try {
      const { tenderData, vendorEmails, broadcast } = req.body;
      if (!tenderData) {
        return sendError(res, 400, "tenderData is required");
      }

      const tenderId = await createTender({
        ...tenderData,
        vendorEmails: vendorEmails ?? []
      });

      return sendSuccess(res, { tenderId, broadcast: Boolean(broadcast), message: "Tender created" });
    } catch (error) {
      return sendError(res, 500, error instanceof Error ? error.message : "Unable to create tender");
    }
  },

  async updateTender(req: Request, res: Response) {
    try {
      const tenderId = String(req.params.tenderId || "");
      const payload = req.body;
      if (!tenderId) {
        return sendError(res, 400, "Tender ID is required");
      }

      const updatedId = await updateTender(tenderId, payload);
      return sendSuccess(res, { tenderId: updatedId });
    } catch (error) {
      return sendError(res, 500, error instanceof Error ? error.message : "Unable to update tender");
    }
  }
};
