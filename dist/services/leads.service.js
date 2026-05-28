"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addLeadMessage = addLeadMessage;
const client_1 = __importDefault(require("../db/client"));
async function addLeadMessage(leadId, payload) {
    const lead = await client_1.default.lead.findUnique({ where: { id: leadId } });
    if (!lead) {
        throw new Error("Lead not found");
    }
    const message = await client_1.default.leadMessage.create({
        data: {
            leadId,
            text: payload.text,
            sender: payload.sender,
            senderName: payload.senderName
        }
    });
    return message.id;
}
