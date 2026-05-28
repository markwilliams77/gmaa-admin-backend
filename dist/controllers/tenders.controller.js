"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tenderController = void 0;
const tenders_service_1 = require("../services/tenders.service");
const response_util_1 = require("../utils/response.util");
exports.tenderController = {
    async getTenders(_req, res) {
        try {
            const tenders = await (0, tenders_service_1.getTenders)();
            return (0, response_util_1.sendSuccess)(res, { tenders });
        }
        catch (error) {
            return (0, response_util_1.sendError)(res, 500, error instanceof Error ? error.message : "Unable to fetch tenders");
        }
    },
    async createTender(req, res) {
        try {
            const { tenderData, vendorEmails, broadcast } = req.body;
            if (!tenderData) {
                return (0, response_util_1.sendError)(res, 400, "tenderData is required");
            }
            const tenderId = await (0, tenders_service_1.createTender)({
                ...tenderData,
                vendorEmails: vendorEmails ?? []
            });
            return (0, response_util_1.sendSuccess)(res, { tenderId, broadcast: Boolean(broadcast), message: "Tender created" });
        }
        catch (error) {
            return (0, response_util_1.sendError)(res, 500, error instanceof Error ? error.message : "Unable to create tender");
        }
    },
    async updateTender(req, res) {
        try {
            const tenderId = String(req.params.tenderId || "");
            const payload = req.body;
            if (!tenderId) {
                return (0, response_util_1.sendError)(res, 400, "Tender ID is required");
            }
            const updatedId = await (0, tenders_service_1.updateTender)(tenderId, payload);
            return (0, response_util_1.sendSuccess)(res, { tenderId: updatedId });
        }
        catch (error) {
            return (0, response_util_1.sendError)(res, 500, error instanceof Error ? error.message : "Unable to update tender");
        }
    }
};
