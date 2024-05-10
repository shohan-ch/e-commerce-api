import { Router } from "express";
import OrderController from "../../../app/Controllers/V1/FrontEnd/OrderController";
const router = Router();

router.post("/:productId", OrderController.store);
router.get("/", OrderController.getOne);
router.delete("/:productId", OrderController.deleteOne);
export const orders = router;
