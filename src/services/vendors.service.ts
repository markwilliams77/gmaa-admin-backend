import prisma from "../db/client";

export async function getVendors() {
  const vendors = await prisma.vendor.findMany({
    orderBy: { name: "asc" }
  });

  return vendors.map((vendor) => ({
    id: vendor.id,
    name: vendor.name,
    email: vendor.email,
    location: vendor.location || "",
    specialty: vendor.specialty || "",
    status: vendor.status
  }));
}
