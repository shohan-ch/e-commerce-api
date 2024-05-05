import { Router } from "express";
import PostController from "../../../app/Controllers/V1/FrontEnd/PostController";
const router = Router();

router.post("/", PostController.store);
router.get("/", PostController.getAll);
export const posts = router;
