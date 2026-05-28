"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDemoData = seedDemoData;
exports.purgeDemoData = purgeDemoData;
const client_1 = __importDefault(require("../db/client"));
async function seedDemoData() {
    const vendor = await client_1.default.vendor.upsert({
        where: { email: "vendor-relations@med-global.com" },
        update: {},
        create: {
            email: "vendor-relations@med-global.com",
            name: "Apollo Integrated",
            location: "India",
            specialty: "Cardiology"
        }
    });
    const tender = await client_1.default.tender.create({
        data: {
            service: "Robotic Knee Replacement",
            category: "Orthopaedics",
            region: "Southeast Asia",
            budget: "USD 360,000",
            deadline: "72 Hours",
            description: "Institutional request for Robotic Knee Replacement excellence in Southeast Asia.",
            requirements: ["Qualified surgical provider", "Equipment delivery within 10 weeks"]
        }
    });
    await client_1.default.bid.create({
        data: {
            tenderId: tender.id,
            vendorId: vendor.id,
            vendorName: "Apollo Integrated",
            amount: "USD 320,000",
            status: "pending"
        }
    });
    await client_1.default.supportTicket.create({
        data: {
            subject: "Vendor enrollment issue",
            status: "pending",
            lastMessage: "Please provide required documents.",
            messages: {
                create: {
                    text: "Please provide required documents.",
                    sender: "vendor",
                    senderName: "Apollo Integrated"
                }
            }
        }
    });
    await client_1.default.consultation.create({
        data: {
            name: "Dr. Jane Doe",
            email: "jane.doe@hospital.org",
            phone: "+1-555-0100",
            request: "Need supplier for cardiology equipment",
            status: "processing",
            remarks: "Escalated to procurement team"
        }
    });
    await client_1.default.lead.create({
        data: {
            name: "Primary Care Network",
            email: "contact@pcn.health",
            phone: "+1-555-0200",
            status: "open",
            messages: {
                create: {
                    text: "Your inquiry is now being handled by our care coordination team.",
                    sender: "admin",
                    senderName: "GMAA Support"
                }
            }
        }
    });
    return "Demo data seeded";
}
async function purgeDemoData() {
    await client_1.default.leadMessage.deleteMany();
    await client_1.default.lead.deleteMany();
    await client_1.default.consultation.deleteMany();
    await client_1.default.supportTicketMessage.deleteMany();
    await client_1.default.supportTicket.deleteMany();
    await client_1.default.bid.deleteMany();
    await client_1.default.tender.deleteMany();
    await client_1.default.vendor.deleteMany();
    return "Demo data cleared";
}
