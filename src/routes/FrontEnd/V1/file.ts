import { Router } from "express";
import FileController from "../../../app/Controllers/V1/FrontEnd/FileController";
import upload from "../../../middlewares/fileUploadMiddleware";
const router = Router();

router.post("/file-upload", FileController.store);
// router.post("/file-upload", upload.single("file"), FileController.store);

export const file = router;
