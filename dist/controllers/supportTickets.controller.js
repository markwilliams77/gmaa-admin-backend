"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supportTicketController = void 0;
const supportTickets_service_1 = require("../services/supportTickets.service");
const response_util_1 = require("../utils/response.util");
exports.supportTicketController = {
    async getTickets(_req, res) {
        try {
            const tickets = await (0, supportTickets_service_1.getSupportTickets)();
            return (0, response_util_1.sendSuccess)(res, { tickets });
        }
        catch (error) {
            return (0, response_util_1.sendError)(res, 500, error instanceof Error ? error.message : "Unable to fetch support tickets");
        }
    },
    async addMessage(req, res) {
        try {
            const ticketId = String(req.params.ticketId || "");
            const text = String(req.body.text || "");
            const sender = String(req.body.sender || "");
            const senderName = String(req.body.senderName || "");
            if (!text || !sender || !senderName) {
                return (0, response_util_1.sendError)(res, 400, "text, sender, and senderName are required");
            }
            const messageId = await (0, supportTickets_service_1.addSupportTicketMessage)(ticketId, { text, sender, senderName });
            return (0, response_util_1.sendSuccess)(res, { messageId });
        }
        catch (error) {
            return (0, response_util_1.sendError)(res, 500, error instanceof Error ? error.message : "Unable to add support ticket message");
        }
    }
};
