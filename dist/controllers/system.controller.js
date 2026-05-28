"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.systemController = void 0;
const system_service_1 = require("../services/system.service");
const response_util_1 = require("../utils/response.util");
exports.systemController = {
    async seedDemoData(_req, res) {
        try {
            const message = await (0, system_service_1.seedDemoData)();
            return (0, response_util_1.sendSuccess)(res, { message });
        }
        catch (error) {
            return (0, response_util_1.sendError)(res, 500, error instanceof Error ? error.message : "Unable to seed demo data");
        }
    },
    async purgeDemoData(_req, res) {
        try {
            const message = await (0, system_service_1.purgeDemoData)();
            return (0, response_util_1.sendSuccess)(res, { message });
        }
        catch (error) {
            return (0, response_util_1.sendError)(res, 500, error instanceof Error ? error.message : "Unable to purge demo data");
        }
    }
};
