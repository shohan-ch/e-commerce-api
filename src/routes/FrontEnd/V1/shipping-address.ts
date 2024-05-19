import { Router } from "express";
import ShippingAddressController from "../../../app/Controllers/V1/FrontEnd/ShippingAddressController";
const router = Router();

router.post("/", ShippingAddressController.store);

export const shippingAddress = router;
