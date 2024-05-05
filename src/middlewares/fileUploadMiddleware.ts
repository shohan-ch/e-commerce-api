import { Request } from "express";
import { existsSync, mkdirSync } from "fs";
import multer from "multer";

const diskStorage = multer.diskStorage({
  destination: function (req: Request | any, file, cb) {
    let uploadPath = `src/public/uploads/${req.filePath || ""}`; // upload path sent dynamically from controller
    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    let ext = file.originalname.split(".")[1].toLocaleLowerCase();
    cb(null, Date.now() + "." + ext);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("not valid image type"), false);
  }
};

const fileUploadMiddleware = multer({
  storage: diskStorage,
  fileFilter: fileFilter,
  limits: { fileSize: 2048 * 1000 }, // 1000 is byte other value is kb
});

export default fileUploadMiddleware;
