import { Router } from "express";
import PaymentController from "../../../app/Controllers/V1/FrontEnd/PaymentController";
import authMiddleware from "../../../middlewares/AuthMiddleware";
const router = Router();

router.post("/bkash-callback", PaymentController.bkashCallback);
router.get("/stripe-callback", PaymentController.stripeCallback);

router.use(authMiddleware);
router.post("/", PaymentController.store);

export const payments = router;
