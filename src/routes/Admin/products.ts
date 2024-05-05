import ProductController from "../../app/Controllers/V1/Admin/ProductController";
import { Router } from "express";

const router = Router();

router.post("/", ProductController.store);
router.patch("/:productId", ProductController.update);

export const adminProducts = router;
