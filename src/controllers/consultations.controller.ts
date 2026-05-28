import { Request, Response } from "express";
import { getConsultations, updateConsultation } from "../services/consultations.service";
import { sendError, sendSuccess } from "../utils/response.util";

export const consultationController = {
  async getConsultations(_req: Request, res: Response) {
    try {
      const consultations = await getConsultations();
      return sendSuccess(res, { consultations });
    } catch (error) {
      return sendError(res, 500, error instanceof Error ? error.message : "Unable to fetch consultations");
    }
  },

  async updateConsultation(req: Request, res: Response) {
    try {
      const consultationId = String(req.params.consultationId || "");
      const status = typeof req.body.status === "string" ? req.body.status : undefined;
      const remarks = typeof req.body.remarks === "string" ? req.body.remarks : undefined;
      if (!status && !remarks) {
        return sendError(res, 400, "At least one update field is required");
      }

      const id = await updateConsultation(consultationId, { status, remarks });
      return sendSuccess(res, { consultationId: id });
    } catch (error) {
      return sendError(res, 500, error instanceof Error ? error.message : "Unable to update consultation");
    }
  }
};
