import { Router } from "express";
import PaymentController from "../../../app/Controllers/V1/FrontEnd/PaymentController";
const router = Router();

router.post("/", PaymentController.store);

export const payments = router;
