"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVendors = getVendors;
const client_1 = __importDefault(require("../db/client"));
async function getVendors() {
    const vendors = await client_1.default.vendor.findMany({
        orderBy: { name: "asc" }
    });
    return vendors.map((vendor) => ({
        id: vendor.id,
        name: vendor.name,
        email: vendor.email,
        location: vendor.location || "",
        specialty: vendor.specialty || "",
        status: vendor.status
    }));
}
