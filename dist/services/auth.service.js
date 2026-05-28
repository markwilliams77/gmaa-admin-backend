"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = loginUser;
exports.generateAdminCredentials = generateAdminCredentials;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = __importDefault(require("../db/client"));
const config_1 = require("../config");
const random_util_1 = require("../utils/random.util");
const SALT_ROUNDS = 12;
async function loginUser(identifier, password) {
    const admin = await client_1.default.admin.findFirst({
        where: {
            OR: [{ email: identifier }, { username: identifier }]
        }
    });
    if (!admin) {
        throw new Error("Invalid username/email or password");
    }
    const valid = await bcrypt_1.default.compare(password, admin.password);
    if (!valid) {
        throw new Error("Invalid username/email or password");
    }
    const token = jsonwebtoken_1.default.sign({ userId: admin.id }, config_1.config.JWT_SECRET, { expiresIn: "8h" });
    return { token, user: { id: admin.id, email: admin.email, username: admin.username } };
}
async function generateAdminCredentials(secret) {
    if (secret !== config_1.config.ADMIN_GENERATION_SECRET) {
        throw new Error("Invalid generation secret");
    }
    const username = await createUniqueAdminUsername();
    const password = (0, random_util_1.generateRandomPassword)();
    const email = `admin-${Date.now()}@gmaa.local`;
    const hashedPassword = await bcrypt_1.default.hash(password, SALT_ROUNDS);
    await client_1.default.admin.create({
        data: {
            email,
            username,
            password: hashedPassword
        }
    });
    return { username, password, email };
}
async function createUniqueAdminUsername() {
    for (let attempts = 0; attempts < 5; attempts += 1) {
        const candidate = (0, random_util_1.generateRandomUsername)();
        const existing = await client_1.default.admin.findUnique({ where: { username: candidate } });
        if (!existing) {
            return candidate;
        }
    }
    return `${(0, random_util_1.generateRandomUsername)()}-${Date.now()}`;
}
