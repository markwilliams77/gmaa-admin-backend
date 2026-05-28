import prisma from "../db/client";

export async function getSupportTickets() {
  const tickets = await prisma.supportTicket.findMany({
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

export async function addSupportTicketMessage(ticketId: string, messageData: { text: string; sender: string; senderName: string }) {
  const message = await prisma.supportTicketMessage.create({
    data: {
      ticketId,
      text: messageData.text,
      sender: messageData.sender,
      senderName: messageData.senderName
    }
  });

  await prisma.supportTicket.update({
    where: { id: ticketId },
    data: {
      lastMessage: message.text,
      lastUpdated: message.createdAt
    }
  });

  return message.id;
}
