"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consultationController = void 0;
const consultations_service_1 = require("../services/consultations.service");
const response_util_1 = require("../utils/response.util");
exports.consultationController = {
    async getConsultations(_req, res) {
        try {
            const consultations = await (0, consultations_service_1.getConsultations)();
            return (0, response_util_1.sendSuccess)(res, { consultations });
        }
        catch (error) {
            return (0, response_util_1.sendError)(res, 500, error instanceof Error ? error.message : "Unable to fetch consultations");
        }
    },
    async updateConsultation(req, res) {
        try {
            const consultationId = String(req.params.consultationId || "");
            const status = typeof req.body.status === "string" ? req.body.status : undefined;
            const remarks = typeof req.body.remarks === "string" ? req.body.remarks : undefined;
            if (!status && !remarks) {
                return (0, response_util_1.sendError)(res, 400, "At least one update field is required");
            }
            const id = await (0, consultations_service_1.updateConsultation)(consultationId, { status, remarks });
            return (0, response_util_1.sendSuccess)(res, { consultationId: id });
        }
        catch (error) {
            return (0, response_util_1.sendError)(res, 500, error instanceof Error ? error.message : "Unable to update consultation");
        }
    }
};
