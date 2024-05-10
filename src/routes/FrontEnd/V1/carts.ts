import { Router } from "express";
import CartController from "../../../app/Controllers/V1/FrontEnd/CartController";
const router = Router();

router.post("/:productId", CartController.store);
router.get("/", CartController.getAll);

router.delete("/", CartController.getByCategory);
export const carts = router;
