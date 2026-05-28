import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { tenderController } from "../controllers/tenders.controller";
import { bidController } from "../controllers/bids.controller";
import { vendorController } from "../controllers/vendors.controller";
import { supportTicketController } from "../controllers/supportTickets.controller";
import { consultationController } from "../controllers/consultations.controller";
import { leadController } from "../controllers/leads.controller";
import { systemController } from "../controllers/system.controller";
import { authMiddleware, adminOnly } from "../middleware/auth.middleware";

const router = Router();

router.post("/auth/login", authController.login);
router.post("/auth/admin/generate", authController.generateAdmin);

router.get("/tenders", authMiddleware, tenderController.getTenders);
router.post("/tenders", authMiddleware, tenderController.createTender);
router.put("/tenders/:tenderId", authMiddleware, tenderController.updateTender);

router.get("/bids", authMiddleware, bidController.getBids);
router.put("/bids/:bidId", authMiddleware, bidController.updateBid);

router.get("/vendors", authMiddleware, vendorController.getVendors);

router.get("/support-tickets", authMiddleware, supportTicketController.getTickets);
router.post(
  "/support-tickets/:ticketId/messages",
  authMiddleware,
  supportTicketController.addMessage
);

router.get("/consultations", authMiddleware, consultationController.getConsultations);
router.put("/consultations/:consultationId", authMiddleware, consultationController.updateConsultation);

router.post("/leads/:leadId/messages", authMiddleware, leadController.addMessage);

router.post("/system/seed", authMiddleware, adminOnly, systemController.seedDemoData);
router.post("/system/purge", authMiddleware, adminOnly, systemController.purgeDemoData);

export default router;
