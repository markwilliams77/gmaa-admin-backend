import prisma from "../db/client";

export async function getBids(filters: { tenderId?: string; vendorId?: string }) {
  const where: Record<string, unknown> = {};
  if (filters.tenderId) {
    where.tenderId = filters.tenderId;
  }
  if (filters.vendorId) {
    where.vendorId = filters.vendorId;
  }

  const bids = await prisma.bid.findMany({ where, orderBy: { createdAt: "desc" } });
  return bids.map((bid) => ({
    id: bid.id,
    tenderId: bid.tenderId,
    vendorId: bid.vendorId,
    vendorName: bid.vendorName,
    amount: bid.amount,
    status: bid.status,
    createdAt: bid.createdAt.toISOString()
  }));
}

export async function updateBid(bidId: string, status: string) {
  const bid = await prisma.bid.update({
    where: { id: bidId },
    data: { status }
  });
  return bid.id;
}
