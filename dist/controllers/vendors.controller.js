"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorController = void 0;
const vendors_service_1 = require("../services/vendors.service");
const response_util_1 = require("../utils/response.util");
exports.vendorController = {
    async getVendors(_req, res) {
        try {
            const vendors = await (0, vendors_service_1.getVendors)();
            return (0, response_util_1.sendSuccess)(res, { vendors });
        }
        catch (error) {
            return (0, response_util_1.sendError)(res, 500, error instanceof Error ? error.message : "Unable to fetch vendors");
        }
    }
};
