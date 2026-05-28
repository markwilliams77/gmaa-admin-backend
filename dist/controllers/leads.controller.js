"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leadController = void 0;
const leads_service_1 = require("../services/leads.service");
const response_util_1 = require("../utils/response.util");
exports.leadController = {
    async addMessage(req, res) {
        try {
            const leadId = String(req.params.leadId || "");
            const text = String(req.body.text || "");
            const sender = String(req.body.sender || "");
            const senderName = String(req.body.senderName || "");
            if (!text || !sender || !senderName) {
                return (0, response_util_1.sendError)(res, 400, "text, sender, and senderName are required");
            }
            const messageId = await (0, leads_service_1.addLeadMessage)(leadId, { text, sender, senderName });
            return (0, response_util_1.sendSuccess)(res, { messageId });
        }
        catch (error) {
            return (0, response_util_1.sendError)(res, 500, error instanceof Error ? error.message : "Unable to add lead message");
        }
    }
};
