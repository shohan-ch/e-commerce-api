import { Router } from "express";
import PaymentController from "../../../app/Controllers/V1/FrontEnd/PaymentController";
const router = Router();

router.post("/", PaymentController.store);
router.post("/bkash-callback", PaymentController.bkashCallback);
router.get("/stripe-callback", PaymentController.stripeCallback);

export const payments = router;
