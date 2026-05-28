import { Request, Response } from "express";
import { getVendors } from "../services/vendors.service";
import { sendError, sendSuccess } from "../utils/response.util";

export const vendorController = {
  async getVendors(_req: Request, res: Response) {
    try {
      const vendors = await getVendors();
      return sendSuccess(res, { vendors });
    } catch (error) {
      return sendError(res, 500, error instanceof Error ? error.message : "Unable to fetch vendors");
    }
  }
};
