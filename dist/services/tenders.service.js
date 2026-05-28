"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTenders = getTenders;
exports.createTender = createTender;
exports.updateTender = updateTender;
const client_1 = __importDefault(require("../db/client"));
async function getTenders() {
    const tenders = await client_1.default.tender.findMany({
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
async function createTender(data) {
    const tender = await client_1.default.tender.create({
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
async function updateTender(tenderId, data) {
    const tender = await client_1.default.tender.update({
        where: { id: tenderId },
        data: {
            status: data.status,
            awardedBidId: data.awardedBidId,
            awardedVendorId: data.awardedVendorId
        }
    });
    return tender.id;
}
