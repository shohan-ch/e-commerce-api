import { Router } from "express";
import PaymentController from "../../../app/Controllers/V1/FrontEnd/PaymentController";
const router = Router();

router.post("/", PaymentController.store);
router.post("/bkash-callback", PaymentController.bkashCallback);

export const payments = router;
