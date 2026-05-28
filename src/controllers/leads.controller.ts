import { Request, Response } from "express";
import { addLeadMessage } from "../services/leads.service";
import { sendError, sendSuccess } from "../utils/response.util";

export const leadController = {
  async addMessage(req: Request, res: Response) {
    try {
      const leadId = String(req.params.leadId || "");
      const text = String(req.body.text || "");
      const sender = String(req.body.sender || "");
      const senderName = String(req.body.senderName || "");
      if (!text || !sender || !senderName) {
        return sendError(res, 400, "text, sender, and senderName are required");
      }

      const messageId = await addLeadMessage(leadId, { text, sender, senderName });
      return sendSuccess(res, { messageId });
    } catch (error) {
      return sendError(res, 500, error instanceof Error ? error.message : "Unable to add lead message");
    }
  }
};
