import { Router } from "express";
import CartController from "../../../app/Controllers/V1/FrontEnd/CartController";
const router = Router();

router.post("/:productId", CartController.store);
router.get("/", CartController.getOne);
router.delete("/:productId", CartController.deleteOne);
export const carts = router;
