"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
exports.adminOnly = adminOnly;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const client_1 = __importDefault(require("../db/client"));
async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Missing authorization token" });
    }
    const token = authHeader.replace("Bearer ", "");
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.config.JWT_SECRET);
        const admin = await client_1.default.admin.findUnique({ where: { id: decoded.userId } });
        if (!admin) {
            return res.status(401).json({ success: false, message: "Invalid authorization token" });
        }
        req.user = { id: admin.id };
        next();
    }
    catch (error) {
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
}
function adminOnly(req, res, next) {
    if (!req.user) {
        return res.status(403).json({ success: false, message: "Admin access required" });
    }
    next();
}
