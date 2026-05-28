"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSuccess = sendSuccess;
exports.sendError = sendError;
function sendSuccess(res, data = {}) {
    return res.json({ success: true, ...data });
}
function sendError(res, status, message) {
    return res.status(status).json({ success: false, message });
}
