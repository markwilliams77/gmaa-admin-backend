"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBids = getBids;
exports.updateBid = updateBid;
const client_1 = __importDefault(require("../db/client"));
async function getBids(filters) {
    const where = {};
    if (filters.tenderId) {
        where.tenderId = filters.tenderId;
    }
    if (filters.vendorId) {
        where.vendorId = filters.vendorId;
    }
    const bids = await client_1.default.bid.findMany({ where, orderBy: { createdAt: "desc" } });
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
async function updateBid(bidId, status) {
    const bid = await client_1.default.bid.update({
        where: { id: bidId },
        data: { status }
    });
    return bid.id;
}
