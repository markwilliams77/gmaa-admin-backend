"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_1 = require("../services/auth.service");
const response_util_1 = require("../utils/response.util");
exports.authController = {
    async login(req, res) {
        try {
            const { email, username, identifier, password } = req.body;
            const loginIdentifier = identifier || email || username;
            if (!loginIdentifier || !password) {
                return (0, response_util_1.sendError)(res, 400, "Username/email and password are required");
            }
            const payload = await (0, auth_service_1.loginUser)(loginIdentifier, password);
            return (0, response_util_1.sendSuccess)(res, payload);
        }
        catch (error) {
            return (0, response_util_1.sendError)(res, 401, error instanceof Error ? error.message : "Unable to login");
        }
    },
    async generateAdmin(req, res) {
        try {
            const { secret } = req.body;
            if (!secret) {
                return (0, response_util_1.sendError)(res, 400, "Admin generation secret is required");
            }
            const credentials = await (0, auth_service_1.generateAdminCredentials)(secret);
            return (0, response_util_1.sendSuccess)(res, { credentials });
        }
        catch (error) {
            return (0, response_util_1.sendError)(res, 401, error instanceof Error ? error.message : "Unable to generate admin user");
        }
    }
};
