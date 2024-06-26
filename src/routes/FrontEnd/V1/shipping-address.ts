import { Router } from "express";
import ShippingAddressController from "../../../app/Controllers/V1/FrontEnd/ShippingAddressController";
import authMiddleware from "../../../middlewares/AuthMiddleware";
const router = Router();

router.use(authMiddleware);
router.post("/", ShippingAddressController.store);
router.patch("/:addressId", ShippingAddressController.update);

export const shippingAddress = router;
