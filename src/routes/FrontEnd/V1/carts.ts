import { Router } from "express";
import CartController from "../../../app/Controllers/V1/FrontEnd/CartController";
const router = Router();

router.post("/:productId", CartController.store);
router.get("/:prooductId", CartController.getOne);
router.get("/category/:category", CartController.getByCategory);
export const carts = router;
