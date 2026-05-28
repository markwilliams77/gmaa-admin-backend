"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bidController = void 0;
const bids_service_1 = require("../services/bids.service");
const response_util_1 = require("../utils/response.util");
exports.bidController = {
    async getBids(req, res) {
        try {
            const { tenderId, vendorId } = req.query;
            const bids = await (0, bids_service_1.getBids)({
                tenderId: typeof tenderId === "string" ? tenderId : undefined,
                vendorId: typeof vendorId === "string" ? vendorId : undefined
            });
            return (0, response_util_1.sendSuccess)(res, { bids });
        }
        catch (error) {
            return (0, response_util_1.sendError)(res, 500, error instanceof Error ? error.message : "Unable to fetch bids");
        }
    },
    async updateBid(req, res) {
        try {
            const bidId = String(req.params.bidId || "");
            const status = String(req.body.status || "");
            if (!status) {
                return (0, response_util_1.sendError)(res, 400, "status is required");
            }
            const updatedId = await (0, bids_service_1.updateBid)(bidId, status);
            return (0, response_util_1.sendSuccess)(res, { bidId: updatedId });
        }
        catch (error) {
            return (0, response_util_1.sendError)(res, 500, error instanceof Error ? error.message : "Unable to update bid");
        }
    }
};
