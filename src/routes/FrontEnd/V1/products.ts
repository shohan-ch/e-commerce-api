import { Router } from "express";
import PostController from "../../../app/Controllers/V1/FrontEnd/PostController";
import ProductController from "../../../app/Controllers/V1/FrontEnd/ProductController";
const router = Router();

router.get("/", ProductController.getAll);
router.get("/:prooductId", ProductController.getOne);
router.get("/category/:category", ProductController.getByCategory);
export const products = router;
