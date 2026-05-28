import prisma from "../db/client";

export async function getConsultations() {
  const consultations = await prisma.consultation.findMany({ orderBy: { createdAt: "desc" } });
  return consultations.map((consultation) => ({
    id: consultation.id,
    name: consultation.name,
    email: consultation.email,
    phone: consultation.phone,
    request: consultation.request,
    status: consultation.status,
    remarks: consultation.remarks || "",
    createdAt: consultation.createdAt.toISOString()
  }));
}

export async function updateConsultation(consultationId: string, payload: { status?: string; remarks?: string }) {
  const consultation = await prisma.consultation.update({
    where: { id: consultationId },
    data: {
      status: payload.status,
      remarks: payload.remarks
    }
  });
  return consultation.id;
}
