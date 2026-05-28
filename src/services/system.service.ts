import prisma from "../db/client";

export async function seedDemoData() {
  const vendor = await prisma.vendor.upsert({
    where: { email: "vendor-relations@med-global.com" },
    update: {},
    create: {
      email: "vendor-relations@med-global.com",
      name: "Apollo Integrated",
      location: "India",
      specialty: "Cardiology"
    }
  });

  const tender = await prisma.tender.create({
    data: {
      service: "Robotic Knee Replacement",
      category: "Orthopaedics",
      region: "Southeast Asia",
      budget: "USD 360,000",
      deadline: "72 Hours",
      description: "Institutional request for Robotic Knee Replacement excellence in Southeast Asia.",
      requirements: ["Qualified surgical provider", "Equipment delivery within 10 weeks"]
    }
  });

  await prisma.bid.create({
    data: {
      tenderId: tender.id,
      vendorId: vendor.id,
      vendorName: "Apollo Integrated",
      amount: "USD 320,000",
      status: "pending"
    }
  });

  await prisma.supportTicket.create({
    data: {
      subject: "Vendor enrollment issue",
      status: "pending",
      lastMessage: "Please provide required documents.",
      messages: {
        create: {
          text: "Please provide required documents.",
          sender: "vendor",
          senderName: "Apollo Integrated"
        }
      }
    }
  });

  await prisma.consultation.create({
    data: {
      name: "Dr. Jane Doe",
      email: "jane.doe@hospital.org",
      phone: "+1-555-0100",
      request: "Need supplier for cardiology equipment",
      status: "processing",
      remarks: "Escalated to procurement team"
    }
  });

  await prisma.lead.create({
    data: {
      name: "Primary Care Network",
      email: "contact@pcn.health",
      phone: "+1-555-0200",
      status: "open",
      messages: {
        create: {
          text: "Your inquiry is now being handled by our care coordination team.",
          sender: "admin",
          senderName: "GMAA Support"
        }
      }
    }
  });

  return "Demo data seeded";
}

export async function purgeDemoData() {
  await prisma.leadMessage.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.consultation.deleteMany();
  await prisma.supportTicketMessage.deleteMany();
  await prisma.supportTicket.deleteMany();
  await prisma.bid.deleteMany();
  await prisma.tender.deleteMany();
  await prisma.vendor.deleteMany();
  return "Demo data cleared";
}
