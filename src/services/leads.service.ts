import prisma from "../db/client";

export async function addLeadMessage(leadId: string, payload: { text: string; sender: string; senderName: string }) {
  const lead = await prisma.lead.findUnique({ where: { id: leadId } });
  if (!lead) {
    throw new Error("Lead not found");
  }

  const message = await prisma.leadMessage.create({
    data: {
      leadId,
      text: payload.text,
      sender: payload.sender,
      senderName: payload.senderName
    }
  });

  return message.id;
}
