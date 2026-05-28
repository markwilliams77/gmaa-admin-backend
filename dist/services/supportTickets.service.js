"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSupportTickets = getSupportTickets;
exports.addSupportTicketMessage = addSupportTicketMessage;
const client_1 = __importDefault(require("../db/client"));
async function getSupportTickets() {
    const tickets = await client_1.default.supportTicket.findMany({
        orderBy: { lastUpdated: "desc" },
        include: { messages: true }
    });
    return tickets.map((ticket) => ({
        id: ticket.id,
        subject: ticket.subject,
        status: ticket.status,
        lastUpdated: ticket.lastUpdated.toISOString(),
        lastMessage: ticket.lastMessage
    }));
}
async function addSupportTicketMessage(ticketId, messageData) {
    const message = await client_1.default.supportTicketMessage.create({
        data: {
            ticketId,
            text: messageData.text,
            sender: messageData.sender,
            senderName: messageData.senderName
        }
    });
    await client_1.default.supportTicket.update({
        where: { id: ticketId },
        data: {
            lastMessage: message.text,
            lastUpdated: message.createdAt
        }
    });
    return message.id;
}
