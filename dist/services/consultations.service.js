"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConsultations = getConsultations;
exports.updateConsultation = updateConsultation;
const client_1 = __importDefault(require("../db/client"));
async function getConsultations() {
    const consultations = await client_1.default.consultation.findMany({ orderBy: { createdAt: "desc" } });
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
async function updateConsultation(consultationId, payload) {
    const consultation = await client_1.default.consultation.update({
        where: { id: consultationId },
        data: {
            status: payload.status,
            remarks: payload.remarks
        }
    });
    return consultation.id;
}
