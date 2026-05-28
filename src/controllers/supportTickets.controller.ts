import { Request, Response } from "express";
import { getSupportTickets, addSupportTicketMessage } from "../services/supportTickets.service";
import { sendError, sendSuccess } from "../utils/response.util";

export const supportTicketController = {
  async getTickets(_req: Request, res: Response) {
    try {
      const tickets = await getSupportTickets();
      return sendSuccess(res, { tickets });
    } catch (error) {
      return sendError(res, 500, error instanceof Error ? error.message : "Unable to fetch support tickets");
    }
  },

  async addMessage(req: Request, res: Response) {
    try {
      const ticketId = String(req.params.ticketId || "");
      const text = String(req.body.text || "");
      const sender = String(req.body.sender || "");
      const senderName = String(req.body.senderName || "");
      if (!text || !sender || !senderName) {
        return sendError(res, 400, "text, sender, and senderName are required");
      }

      const messageId = await addSupportTicketMessage(ticketId, { text, sender, senderName });
      return sendSuccess(res, { messageId });
    } catch (error) {
      return sendError(res, 500, error instanceof Error ? error.message : "Unable to add support ticket message");
    }
  }
};
