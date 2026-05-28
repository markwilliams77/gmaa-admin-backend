import { Request, Response } from "express";
import { getBids, updateBid } from "../services/bids.service";
import { sendError, sendSuccess } from "../utils/response.util";

export const bidController = {
  async getBids(req: Request, res: Response) {
    try {
      const { tenderId, vendorId } = req.query;
      const bids = await getBids({
        tenderId: typeof tenderId === "string" ? tenderId : undefined,
        vendorId: typeof vendorId === "string" ? vendorId : undefined
      });
      return sendSuccess(res, { bids });
    } catch (error) {
      return sendError(res, 500, error instanceof Error ? error.message : "Unable to fetch bids");
    }
  },

  async updateBid(req: Request, res: Response) {
    try {
      const bidId = String(req.params.bidId || "");
      const status = String(req.body.status || "");
      if (!status) {
        return sendError(res, 400, "status is required");
      }

      const updatedId = await updateBid(bidId, status);
      return sendSuccess(res, { bidId: updatedId });
    } catch (error) {
      return sendError(res, 500, error instanceof Error ? error.message : "Unable to update bid");
    }
  }
};
