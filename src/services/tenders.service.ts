import prisma from "../db/client";

export async function getTenders() {
  const tenders = await prisma.tender.findMany({
    orderBy: { createdAt: "desc" },
    include: { bids: true }
  });

  return tenders.map((tender) => ({
    id: tender.id,
    service: tender.service,
    category: tender.category,
    region: tender.region,
    budget: tender.budget,
    description: tender.description,
    requirements: tender.requirements,
    bids: tender.bids.length,
    status: tender.status,
    createdAt: tender.createdAt.toISOString(),
    awardedBidId: tender.awardedBidId,
    awardedVendorId: tender.awardedVendorId
  }));
}

export async function createTender(data: {
  service: string;
  category: string;
  region: string;
  budget: string;
  deadline: string;
  description: string;
  requirements?: string[];
  vendorEmails?: string[];
}) {
  const tender = await prisma.tender.create({
    data: {
      service: data.service,
      category: data.category,
      region: data.region,
      budget: data.budget,
      deadline: data.deadline,
      description: data.description,
      requirements: data.requirements ?? []
    }
  });

  if (data.vendorEmails && data.vendorEmails.length > 0) {
    console.log("Simulated broadcast to vendors:", data.vendorEmails);
  }

  return tender.id;
}

export async function updateTender(tenderId: string, data: Partial<{ status: string; awardedBidId: string; awardedVendorId: string }>) {
  const tender = await prisma.tender.update({
    where: { id: tenderId },
    data: {
      status: data.status,
      awardedBidId: data.awardedBidId,
      awardedVendorId: data.awardedVendorId
    }
  });
  return tender.id;
}
