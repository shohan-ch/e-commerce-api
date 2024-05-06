import AdminProductController from "../../app/Controllers/V1/Admin/AdminProductController";
import { Router } from "express";

const router = Router();

router.post("/", AdminProductController.store);
router.patch("/:productId", AdminProductController.update);

export const adminProducts = router;
